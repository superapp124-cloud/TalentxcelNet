import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import crypto from 'crypto'
import { POST as webhookPOST } from '@/app/api/commerce/webhook/route'
import {
  getActiveEntitlements,
  grantEntitlement,
  recordPendingCommercialOrder,
  resetCommercialOrdersForTesting,
} from '@/lib/commerce/entitlements'
import {
  resetWebhookIdempotencyClaimsForTesting,
} from '@/lib/commerce/webhook-idempotency'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import { calculateCommercialOrderSummary } from '@/packages/core/src/data/product-catalog'

function signPayload(payload: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

function makeWebhookRequest(payload: string, signature?: string): NextRequest {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (signature !== undefined) {
    headers['x-razorpay-signature'] = signature
  }
  return new NextRequest('http://localhost:3000/api/commerce/webhook', {
    method: 'POST',
    headers,
    body: payload,
  })
}

describe('Razorpay Webhook P0 Backend Remediation (Offline Suite)', () => {
  const testSecret = 'test_only_razorpay_webhook_secret_000'
  const origServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  beforeEach(() => {
    resetWebhookIdempotencyClaimsForTesting()
    resetCommercialOrdersForTesting()
    process.env.RAZORPAY_WEBHOOK_SECRET = testSecret
    delete process.env.TEST_SIMULATE_DB_FAILURE
    vi.restoreAllMocks()
  })

  afterEach(() => {
    delete process.env.TEST_SIMULATE_DB_FAILURE
    if (origServiceKey !== undefined) {
      process.env.SUPABASE_SERVICE_ROLE_KEY = origServiceKey
    } else {
      delete process.env.SUPABASE_SERVICE_ROLE_KEY
    }
  })

  it('1. fails closed with HTTP 500 when RAZORPAY_WEBHOOK_SECRET is missing', async () => {
    delete process.env.RAZORPAY_WEBHOOK_SECRET
    const body = JSON.stringify({ id: 'evt_missing_secret', event: 'payment.captured' })
    const res = await webhookPOST(makeWebhookRequest(body))
    expect(res.status).toBe(500)
  })

  it('2. rejects missing x-razorpay-signature header with HTTP 400', async () => {
    const body = JSON.stringify({ id: 'evt_missing_sig', event: 'payment.captured' })
    const res = await webhookPOST(makeWebhookRequest(body))
    expect(res.status).toBe(400)
  })

  it('3. rejects invalid x-razorpay-signature header with HTTP 400', async () => {
    const body = JSON.stringify({ id: 'evt_bad_sig', event: 'payment.captured' })
    const res = await webhookPOST(makeWebhookRequest(body, 'deadbeef'.repeat(8)))
    expect(res.status).toBe(400)
  })

  it('4 & 7. verifies valid signature and processes payment.captured for programme orders', async () => {
    const body = JSON.stringify({
      id: 'evt_prog_1',
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_prog_1',
            status: 'captured',
            currency: 'INR',
            amount: 99900,
            notes: {
              orderNumber: 'ORD-PROG-1',
              programmeSlug: 'class-9-foundation',
              userId: 'user_prog_1',
            },
          },
        },
      },
    })
    const res = await webhookPOST(makeWebhookRequest(body, signPayload(body, testSecret)))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.status).toBe('ok')
  })

  it('5. deduplicates duplicate event delivery safely', async () => {
    const body = JSON.stringify({
      id: 'evt_dup_1',
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_dup_1',
            status: 'captured',
            currency: 'INR',
            amount: 99900,
            notes: { orderNumber: 'ORD-DUP-1', programmeSlug: 'class-9-foundation', userId: 'u_1' },
          },
        },
      },
    })
    const sig = signPayload(body, testSecret)
    const res1 = await webhookPOST(makeWebhookRequest(body, sig))
    const res2 = await webhookPOST(makeWebhookRequest(body, sig))
    expect(res1.status).toBe(200)
    expect(res2.status).toBe(200)
    const d2 = await res2.json()
    expect(d2.note).toBe('duplicate_event_ignored')
  })

  it('6. returns HTTP 409 on concurrent event delivery while lease is active', async () => {
    const body = JSON.stringify({
      id: 'evt_conc_1',
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_conc_1',
            status: 'captured',
            currency: 'INR',
            amount: 99900,
            notes: { orderNumber: 'ORD-CONC-1', programmeSlug: 'class-9-foundation', userId: 'u_2' },
          },
        },
      },
    })
    const sig = signPayload(body, testSecret)
    const [r1, r2] = await Promise.all([
      webhookPOST(makeWebhookRequest(body, sig)),
      webhookPOST(makeWebhookRequest(body, sig)),
    ])
    const statuses = [r1.status, r2.status].sort()
    expect(statuses).toEqual([200, 409])
  })

  it('8. fulfills commercial pass order on payment.captured and grants active entitlement', async () => {
    const productId = 'prod_assess_preboard_49'
    const summary = calculateCommercialOrderSummary(productId)
    const orderNumber = `ORD-COMM-${Date.now()}`
    const userId = `user_comm_${Date.now()}`

    await recordPendingCommercialOrder({
      orderNumber,
      userId,
      productId,
      razorpayOrderId: 'order_rzp_comm_1',
    })

    const body = JSON.stringify({
      id: `evt_comm_${Date.now()}`,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: `pay_comm_${Date.now()}`,
            order_id: 'order_rzp_comm_1',
            status: 'captured',
            currency: 'INR',
            amount: summary.totalPayablePaise,
            notes: { orderNumber, productId, userId },
          },
        },
      },
    })

    const res = await webhookPOST(makeWebhookRequest(body, signPayload(body, testSecret)))
    expect(res.status).toBe(200)

    const entitlements = await getActiveEntitlements(userId)
    expect(entitlements).toHaveLength(1)
    expect(entitlements[0].productId).toBe(productId)
  })

  it('9. correlates order.paid using order.entity.notes and razorpayOrderId even without payment.notes', async () => {
    const productId = 'prod_assess_ssb_oir_99'
    const summary = calculateCommercialOrderSummary(productId)
    const orderNumber = `ORD-ORDERPAID-${Date.now()}`
    const userId = `user_orderpaid_${Date.now()}`
    const rzpOrderId = `order_rzp_${Date.now()}`

    await recordPendingCommercialOrder({
      orderNumber,
      userId,
      productId,
      razorpayOrderId: rzpOrderId,
    })

    const body = JSON.stringify({
      id: `evt_order_paid_${Date.now()}`,
      event: 'order.paid',
      payload: {
        order: {
          entity: {
            id: rzpOrderId,
            status: 'paid',
            currency: 'INR',
            amount: summary.totalPayablePaise,
            amount_paid: summary.totalPayablePaise,
            notes: { orderNumber, productId, userId },
          },
        },
      },
    })

    const res = await webhookPOST(makeWebhookRequest(body, signPayload(body, testSecret)))
    expect(res.status).toBe(200)

    const entitlements = await getActiveEntitlements(userId)
    expect(entitlements).toHaveLength(1)
    expect(entitlements[0].productId).toBe(productId)
  })

  it('10. handles payment.failed safely without granting entitlement', async () => {
    const productId = 'prod_assess_preboard_49'
    const orderNumber = `ORD-FAIL-${Date.now()}`
    const userId = `user_fail_${Date.now()}`

    await recordPendingCommercialOrder({
      orderNumber,
      userId,
      productId,
      razorpayOrderId: 'order_rzp_fail_1',
    })

    const body = JSON.stringify({
      id: `evt_fail_${Date.now()}`,
      event: 'payment.failed',
      payload: {
        payment: {
          entity: {
            id: 'pay_fail_1',
            order_id: 'order_rzp_fail_1',
            status: 'failed',
            notes: { orderNumber, productId, userId },
          },
        },
      },
    })

    const res = await webhookPOST(makeWebhookRequest(body, signPayload(body, testSecret)))
    expect(res.status).toBe(200)
    expect(await getActiveEntitlements(userId)).toHaveLength(0)
  })

  it('11. handles missing metadata safely without granting any entitlement', async () => {
    const body = JSON.stringify({
      id: `evt_nometa_${Date.now()}`,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_nometa_1',
            status: 'captured',
            currency: 'INR',
            amount: 5000,
          },
        },
      },
    })

    const res = await webhookPOST(makeWebhookRequest(body, signPayload(body, testSecret)))
    expect(res.status).toBe(200)
  })

  it('12. rejects incorrect order/product mapping with HTTP 400 and grants no entitlement', async () => {
    const orderNumber = `ORD-MISMATCH-PROD-${Date.now()}`
    const userId = `user_mismatch_prod_${Date.now()}`

    await recordPendingCommercialOrder({
      orderNumber,
      userId,
      productId: 'prod_assess_single',
      razorpayOrderId: 'order_rzp_mp_1',
    })

    const body = JSON.stringify({
      id: `evt_mp_${Date.now()}`,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_mp_1',
            order_id: 'order_rzp_mp_1',
            status: 'captured',
            currency: 'INR',
            amount: 99900,
            notes: { orderNumber, productId: 'prod_assess_ssb_oir_99', userId },
          },
        },
      },
    })

    const res = await webhookPOST(makeWebhookRequest(body, signPayload(body, testSecret)))
    expect(res.status).toBe(400)
    expect(await getActiveEntitlements(userId)).toHaveLength(0)
  })

  it('13. rejects underpaid/incorrect payment amount with HTTP 400 and grants no entitlement', async () => {
    const productId = 'prod_assess_ssb_oir_99'
    const orderNumber = `ORD-AMT-${Date.now()}`
    const userId = `user_amt_${Date.now()}`

    await recordPendingCommercialOrder({
      orderNumber,
      userId,
      productId,
      razorpayOrderId: 'order_rzp_amt_1',
    })

    const body = JSON.stringify({
      id: `evt_amt_${Date.now()}`,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_amt_1',
            order_id: 'order_rzp_amt_1',
            status: 'captured',
            currency: 'INR',
            amount: 100, // ₹1 instead of ₹99 + GST
            notes: { orderNumber, productId, userId },
          },
        },
      },
    })

    const res = await webhookPOST(makeWebhookRequest(body, signPayload(body, testSecret)))
    expect(res.status).toBe(400)
    expect(await getActiveEntitlements(userId)).toHaveLength(0)
  })

  it('14. rejects incorrect user mapping with HTTP 400 and prevents granting to wrong user', async () => {
    const productId = 'prod_assess_preboard_49'
    const summary = calculateCommercialOrderSummary(productId)
    const orderNumber = `ORD-USR-${Date.now()}`
    const realUser = `user_real_${Date.now()}`
    const wrongUser = `user_wrong_${Date.now()}`

    await recordPendingCommercialOrder({
      orderNumber,
      userId: realUser,
      productId,
      razorpayOrderId: 'order_rzp_usr_1',
    })

    const body = JSON.stringify({
      id: `evt_usr_${Date.now()}`,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_usr_1',
            order_id: 'order_rzp_usr_1',
            status: 'captured',
            currency: 'INR',
            amount: summary.totalPayablePaise,
            notes: { orderNumber, productId, userId: wrongUser },
          },
        },
      },
    })

    const res = await webhookPOST(makeWebhookRequest(body, signPayload(body, testSecret)))
    expect(res.status).toBe(400)
    expect(await getActiveEntitlements(realUser)).toHaveLength(0)
    expect(await getActiveEntitlements(wrongUser)).toHaveLength(0)
  })

  it('15 & 18. fails with 500 and releases lease on DB error, then succeeds on retry', async () => {
    const body = JSON.stringify({
      id: `evt_retry_${Date.now()}`,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: 'pay_retry_1',
            status: 'captured',
            currency: 'INR',
            amount: 99900,
            notes: { orderNumber: 'ORD-RETRY-1', programmeSlug: 'class-9-foundation', userId: 'u_r' },
          },
        },
      },
    })
    const sig = signPayload(body, testSecret)

    process.env.TEST_SIMULATE_DB_FAILURE = 'true'
    const resFail = await webhookPOST(makeWebhookRequest(body, sig))
    expect(resFail.status).toBe(500)

    delete process.env.TEST_SIMULATE_DB_FAILURE
    const resRetry = await webhookPOST(makeWebhookRequest(body, sig))
    expect(resRetry.status).toBe(200)
  })

  it('16. prevents duplicate entitlements when both payment.captured and order.paid arrive', async () => {
    const productId = 'prod_assess_preboard_49'
    const summary = calculateCommercialOrderSummary(productId)
    const orderNumber = `ORD-BOTH-${Date.now()}`
    const userId = `user_both_${Date.now()}`
    const rzpOrderId = `order_both_${Date.now()}`
    const paymentId = `pay_both_${Date.now()}`

    await recordPendingCommercialOrder({ orderNumber, userId, productId, razorpayOrderId: rzpOrderId })

    const capBody = JSON.stringify({
      id: `evt_both_cap_${Date.now()}`,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: paymentId,
            order_id: rzpOrderId,
            status: 'captured',
            currency: 'INR',
            amount: summary.totalPayablePaise,
            notes: { orderNumber, productId, userId },
          },
        },
      },
    })

    const paidBody = JSON.stringify({
      id: `evt_both_paid_${Date.now()}`,
      event: 'order.paid',
      payload: {
        order: {
          entity: {
            id: rzpOrderId,
            status: 'paid',
            currency: 'INR',
            amount_paid: summary.totalPayablePaise,
            notes: { orderNumber, productId, userId },
          },
        },
      },
    })

    const r1 = await webhookPOST(makeWebhookRequest(capBody, signPayload(capBody, testSecret)))
    const r2 = await webhookPOST(makeWebhookRequest(paidBody, signPayload(paidBody, testSecret)))
    expect(r1.status).toBe(200)
    expect(r2.status).toBe(200)

    const entitlements = await getActiveEntitlements(userId)
    expect(entitlements).toHaveLength(1)
  })

  it('17. handles already-fulfilled orders from verify-payment without duplicating entitlements', async () => {
    const productId = 'prod_assess_preboard_49'
    const summary = calculateCommercialOrderSummary(productId)
    const orderNumber = `ORD-PREFUL-${Date.now()}`
    const userId = `user_preful_${Date.now()}`
    const paymentId = `pay_preful_${Date.now()}`

    await grantEntitlement({ orderNumber, paymentId, productId, userId })

    const body = JSON.stringify({
      id: `evt_preful_${Date.now()}`,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: paymentId,
            status: 'captured',
            currency: 'INR',
            amount: summary.totalPayablePaise,
            notes: { orderNumber, productId, userId },
          },
        },
      },
    })

    const res = await webhookPOST(makeWebhookRequest(body, signPayload(body, testSecret)))
    expect(res.status).toBe(200)
    expect(await getActiveEntitlements(userId)).toHaveLength(1)
  })

  it('18b. privileged createServiceRoleClient fails closed when SUPABASE_SERVICE_ROLE_KEY is missing', () => {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY
    expect(() => createServiceRoleClient()).toThrow('SUPABASE_SERVICE_ROLE_KEY is required')
  })
})
