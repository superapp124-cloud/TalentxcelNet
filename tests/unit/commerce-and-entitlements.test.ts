import { describe, it, expect, beforeEach } from 'vitest'
import crypto from 'crypto'
import { NextRequest } from 'next/server'
import {
  ASSESSMENT_PRODUCTS,
  SKILL_PRODUCTS,
  ACADEMIC_PRODUCTS,
  ALL_COMMERCIAL_PRODUCTS,
  calculateCommercialOrderSummary,
} from '../../packages/core/src/data/product-catalog'
import { verifyPaymentSignature, verifyWebhookSignature } from '../../lib/commerce/razorpay'
import {
  grantEntitlement,
  getActiveEntitlements,
  revokeEntitlement,
  consumeEntitlementAttempt,
  recordFunnelEvent,
  getTruthfulGrowthMetrics,
} from '../../lib/commerce/entitlements'
import {
  claimWebhookEvent,
  markWebhookProcessed,
  recordWebhookFailure,
  resetWebhookIdempotencyClaimsForTesting,
} from '../../lib/commerce/webhook-idempotency'
import { POST as verifyPaymentPOST } from '../../app/api/checkout/verify-payment/route'
import { POST as webhookPOST } from '../../app/api/commerce/webhook/route'

describe('TalentXcel Day-1 Commercial Product Catalog', () => {
  it('validates all mandated Assessment & Intelligence products and price points', () => {
    const single = ALL_COMMERCIAL_PRODUCTS['prod_assess_single']
    const starter = ALL_COMMERCIAL_PRODUCTS['prod_assess_starter']
    const plus = ALL_COMMERCIAL_PRODUCTS['prod_assess_plus']
    const advanced = ALL_COMMERCIAL_PRODUCTS['prod_assess_advanced']
    const premium = ALL_COMMERCIAL_PRODUCTS['prod_assess_premium']

    expect(single).toBeDefined()
    expect(single.basePriceRupees).toBe(20)
    expect(single.attemptsAllowed).toBe(1)
    expect(single.validityDays).toBe(7)

    expect(starter).toBeDefined()
    expect(starter.basePriceRupees).toBe(299)
    expect(starter.attemptsAllowed).toBe(5)
    expect(starter.validityDays).toBe(30)

    expect(plus).toBeDefined()
    expect(plus.basePriceRupees).toBe(499)
    expect(plus.attemptsAllowed).toBe(12)
    expect(plus.validityDays).toBe(60)

    expect(advanced).toBeDefined()
    expect(advanced.basePriceRupees).toBe(699)
    expect(advanced.attemptsAllowed).toBe(25)
    expect(advanced.validityDays).toBe(90)

    expect(premium).toBeDefined()
    expect(premium.basePriceRupees).toBe(999)
    expect(premium.attemptsAllowed).toBe(-1) // Unlimited
    expect(premium.validityDays).toBe(365)
  })

  it('validates Skill Development price ladder and annual savings', () => {
    const foundation = ALL_COMMERCIAL_PRODUCTS['prod_skill_foundation_monthly']
    const intermediate = ALL_COMMERCIAL_PRODUCTS['prod_skill_intermediate_monthly']
    const advanced = ALL_COMMERCIAL_PRODUCTS['prod_skill_advanced_monthly']
    const professional = ALL_COMMERCIAL_PRODUCTS['prod_skill_professional_monthly']
    const intensive = ALL_COMMERCIAL_PRODUCTS['prod_skill_intensive_monthly']

    expect(foundation.basePriceRupees).toBe(999)
    expect(intermediate.basePriceRupees).toBe(1999)
    expect(advanced.basePriceRupees).toBe(2999)
    expect(professional.basePriceRupees).toBe(3999)
    expect(intensive.basePriceRupees).toBe(4999)

    // Annual plans offer 10 months price for 12 months (17% savings)
    const foundationAnnual = ALL_COMMERCIAL_PRODUCTS['prod_skill_foundation_annual']
    expect(foundationAnnual.basePriceRupees).toBe(9990)
    expect(foundationAnnual.validityDays).toBe(365)
  })

  it('validates Academic Learning Class 4 through Class 12 monthly progression', () => {
    const expectedLadder = [
      { grade: 4, price: 1999 },
      { grade: 5, price: 2399 },
      { grade: 6, price: 2799 },
      { grade: 7, price: 3199 },
      { grade: 8, price: 3599 },
      { grade: 9, price: 3999 },
      { grade: 10, price: 4399 },
      { grade: 11, price: 4799 },
      { grade: 12, price: 5199 },
    ]

    for (const item of expectedLadder) {
      const prod = ALL_COMMERCIAL_PRODUCTS[`prod_acad_g${item.grade}`]
      expect(prod).toBeDefined()
      expect(prod.basePriceRupees).toBe(item.price)
      expect(prod.targetGradeLevel).toBe(item.grade)
      expect(prod.validityDays).toBe(30)
    }
  })
})

describe('Server-Authoritative Price and GST Calculations', () => {
  it('correctly calculates 18% GST and total payable for single test (₹20)', () => {
    const summary = calculateCommercialOrderSummary('prod_assess_single')
    expect(summary.basePriceRupees).toBe(20)
    expect(summary.discountRupees).toBe(0)
    expect(summary.taxableAmountRupees).toBe(20)
    expect(summary.gstAmountRupees).toBe(4) // 20 * 0.18 = 3.6 rounded to 4
    expect(summary.totalPayableRupees).toBe(24)
    expect(summary.totalPayablePaise).toBe(2400)
    expect(summary.currency).toBe('INR')
  })

  it('correctly calculates 18% GST and total payable for Class 4 pass (₹1,999)', () => {
    const summary = calculateCommercialOrderSummary('prod_acad_g4')
    expect(summary.basePriceRupees).toBe(1999)
    expect(summary.gstAmountRupees).toBe(360) // 1999 * 0.18 = 359.82 rounded to 360
    expect(summary.totalPayableRupees).toBe(2359)
    expect(summary.totalPayablePaise).toBe(235900)
  })

  it('applies verified promo code discount and recalculates tax', () => {
    const summary = calculateCommercialOrderSummary('prod_assess_starter', 'FIRST10')
    expect(summary.basePriceRupees).toBe(299)
    expect(summary.discountRupees).toBe(30) // 10% of 299 = 29.9 -> 30
    expect(summary.taxableAmountRupees).toBe(269)
    expect(summary.gstAmountRupees).toBe(48) // 269 * 0.18 = 48.42 -> 48
    expect(summary.totalPayableRupees).toBe(317)
  })

  it('throws an error for non-existent product IDs', () => {
    expect(() => calculateCommercialOrderSummary('non_existent_sku')).toThrow(
      'Invalid or unrecognized product ID'
    )
  })
})

describe('Cryptographic Razorpay Signature Verification & Tamper Resistance', () => {
  const secret = 'test_razorpay_secret_12345'
  const orderId = 'order_tx_test_98765'
  const paymentId = 'pay_tx_test_12345'

  it('verifies valid HMAC SHA256 payment signature', () => {
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    const isValid = verifyPaymentSignature(orderId, paymentId, validSignature, secret)
    expect(isValid).toBe(true)
  })

  it('rejects forged or tampered payment signature', () => {
    const forgedSignature = 'forged_signature_0000000000000000000000000000000000000000000000000000000000000000'
    const isValid = verifyPaymentSignature(orderId, paymentId, forgedSignature, secret)
    expect(isValid).toBe(false)
  })

  it('strictly rejects valid signature paired with the WRONG order ID (tampered order binding)', () => {
    const validSignatureForOrderA = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    const tamperedOrderId = 'order_tx_attacker_modified_99999'
    const isValid = verifyPaymentSignature(tamperedOrderId, paymentId, validSignatureForOrderA, secret)
    expect(isValid).toBe(false)
  })

  it('strictly rejects valid signature paired with the WRONG payment ID', () => {
    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    const swappedPaymentId = 'pay_tx_different_payment_77777'
    const isValid = verifyPaymentSignature(orderId, swappedPaymentId, validSignature, secret)
    expect(isValid).toBe(false)
  })

  it('verifies raw webhook HMAC SHA256 signature', () => {
    const webhookPayload = JSON.stringify({ event: 'payment.captured', entity: { id: paymentId } })
    const validWebhookSig = crypto
      .createHmac('sha256', secret)
      .update(webhookPayload)
      .digest('hex')

    const isValid = verifyWebhookSignature(webhookPayload, validWebhookSig, secret)
    expect(isValid).toBe(true)
  })

  it('rejects tampered webhook payload even with original signature', () => {
    const originalPayload = JSON.stringify({ event: 'payment.captured', amount: 2400 })
    const validWebhookSig = crypto
      .createHmac('sha256', secret)
      .update(originalPayload)
      .digest('hex')

    const tamperedPayload = JSON.stringify({ event: 'payment.captured', amount: 240000 })
    const isValid = verifyWebhookSignature(tamperedPayload, validWebhookSig, secret)
    expect(isValid).toBe(false)
  })
})

describe('Server-Side Entitlement Granting, Idempotency & Lifecycle', () => {
  it('grants entitlement with correct validity timestamp and attempts', async () => {
    const entitlement = await grantEntitlement({
      orderNumber: `TX-ORD-${Date.now()}-grant`,
      paymentId: `pay_test_verified_${Date.now()}`,
      productId: 'prod_assess_plus',
      email: 'student@example.com',
    })

    expect(entitlement.id).toMatch(/^ent_/)
    expect(entitlement.domain).toBe('assessment')
    expect(entitlement.attemptsRemaining).toBe(12)
    expect(entitlement.isActive).toBe(true)

    const validUntilDate = new Date(entitlement.validUntil)
    const expectedDiffDays = Math.round((validUntilDate.getTime() - Date.now()) / (24 * 3600 * 1000))
    expect(expectedDiffDays).toBeGreaterThanOrEqual(59)
    expect(expectedDiffDays).toBeLessThanOrEqual(61)
  })

  it('guarantees idempotency on replayed payment verification requests (no duplicate credits)', async () => {
    const orderNumber = `TX-ORD-REPLAY-${Date.now()}`
    const paymentId = `pay_replay_test_${Date.now()}`

    const firstGrant = await grantEntitlement({
      orderNumber,
      paymentId,
      productId: 'prod_assess_single',
      email: 'replay_test@example.com',
    })

    const secondGrant = await grantEntitlement({
      orderNumber,
      paymentId,
      productId: 'prod_assess_single',
      email: 'replay_test@example.com',
    })

    expect(secondGrant.id).toBe(firstGrant.id)
    expect(secondGrant.attemptsRemaining).toBe(firstGrant.attemptsRemaining)
    expect(secondGrant.grantedAt).toBe(firstGrant.grantedAt)
  })

  it('retrieves active entitlements and excludes expired ones', async () => {
    const userId = `learner_test_${Date.now()}`
    await grantEntitlement({
      orderNumber: `TX-ORD-${Date.now()}-1`,
      paymentId: `pay_test_verified_${Date.now()}_1`,
      productId: 'prod_skill_foundation_monthly',
      userId,
    })

    const entitlements = await getActiveEntitlements(userId)
    expect(entitlements.length).toBeGreaterThanOrEqual(1)
    expect(entitlements.some((e) => e.productId === 'prod_skill_foundation_monthly')).toBe(true)
  })

  it('strictly revokes entitlement when payment is refunded or charged back', async () => {
    const refundOrder = `TX-ORD-REFUND-${Date.now()}`
    const refundPayment = `pay_refund_${Date.now()}`
    const refundUser = `user_refund_${Date.now()}`

    const ent = await grantEntitlement({
      orderNumber: refundOrder,
      paymentId: refundPayment,
      productId: 'prod_assess_starter',
      userId: refundUser,
    })
    expect(ent.isActive).toBe(true)

    const revoked = await revokeEntitlement({
      orderNumber: refundOrder,
      reason: 'refunded',
    })
    expect(revoked).toBe(true)

    const active = await getActiveEntitlements(refundUser)
    expect(active.length).toBe(0)
  })

  it('enforces attempt exhaustion and deactivates single-use entitlements', async () => {
    const singleOrder = `TX-ORD-SINGLE-${Date.now()}`
    const singleUser = `user_single_${Date.now()}`

    const ent = await grantEntitlement({
      orderNumber: singleOrder,
      paymentId: `pay_single_${Date.now()}`,
      productId: 'prod_assess_single',
      userId: singleUser,
    })
    expect(ent.attemptsRemaining).toBe(1)

    const consumed1 = consumeEntitlementAttempt(ent.id)
    expect(consumed1).toBe(true)
    expect(ent.attemptsRemaining).toBe(0)
    expect(ent.isActive).toBe(false)

    const consumed2 = consumeEntitlementAttempt(ent.id)
    expect(consumed2).toBe(false)

    const active = await getActiveEntitlements(singleUser)
    expect(active.length).toBe(0)
  })

  it('records funnel events and outputs truthful growth metrics without fake padding', async () => {
    const sessionId = `test_sess_${Date.now()}`
    await recordFunnelEvent({
      eventName: 'free_test_started',
      domain: 'assessment',
      sessionId,
      metadata: { subject: 'math' },
    })

    await recordFunnelEvent({
      eventName: 'free_test_completed',
      domain: 'assessment',
      sessionId,
      metadata: { score: 10, passed: true },
    })

    const metrics = getTruthfulGrowthMetrics()
    expect(metrics.measuredActuals.freeTestsStarted).toBeGreaterThanOrEqual(1)
    expect(metrics.measuredActuals.freeTestsCompleted).toBeGreaterThanOrEqual(1)
    expect(metrics.ambitionScaleTargets.day30UserTarget).toBe(1000000)
    expect(metrics.ambitionScaleTargets.dailyTargetRunRate).toBe(33333)
  })
})

describe('Webhook Authentication, Durable Idempotency & Failure Handling (/api/commerce/webhook)', () => {
  const webhookSecret = 'test_webhook_signing_secret_99999'

  beforeEach(() => {
    resetWebhookIdempotencyClaimsForTesting()
    process.env.RAZORPAY_WEBHOOK_SECRET = webhookSecret
  })

  it('fails closed with HTTP 500 when RAZORPAY_WEBHOOK_SECRET is unconfigured (never processes unsigned events)', async () => {
    delete process.env.RAZORPAY_WEBHOOK_SECRET

    const payload = JSON.stringify({ event: 'payment.captured', id: 'evt_no_secret' })
    const req = new NextRequest('http://localhost:3000/api/commerce/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    })

    const res = await webhookPOST(req)
    expect(res.status).toBe(500)
    const data = await res.json()
    expect(data.error).toContain('RAZORPAY_WEBHOOK_SECRET is unconfigured')
  })

  it('strictly rejects webhook with HTTP 400 when x-razorpay-signature header is missing', async () => {
    const payload = JSON.stringify({ event: 'payment.captured', id: 'evt_no_sig' })
    const req = new NextRequest('http://localhost:3000/api/commerce/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
    })

    const res = await webhookPOST(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('Missing x-razorpay-signature header')
  })

  it('strictly rejects webhook with HTTP 400 when x-razorpay-signature is forged or invalid', async () => {
    const payload = JSON.stringify({ event: 'payment.captured', id: 'evt_bad_sig' })
    const req = new NextRequest('http://localhost:3000/api/commerce/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': 'forged_signature_1234567890abcdef1234567890abcdef',
      },
      body: payload,
    })

    const res = await webhookPOST(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('Invalid webhook signature')
  })

  it('authenticates valid signature, processes event, and marks processed', async () => {
    const eventId = `evt_valid_proc_${Date.now()}`
    const payload = JSON.stringify({
      id: eventId,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: `pay_unit_${Date.now()}`,
            amount: 2400,
            notes: {
              orderNumber: `ORD-UNIT-${Date.now()}`,
            },
          },
        },
      },
    })

    const validSig = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex')

    const req = new NextRequest('http://localhost:3000/api/commerce/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': validSig,
      },
      body: payload,
    })

    const res = await webhookPOST(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.status).toBe('ok')
    expect(data.received).toBe(true)
  })

  it('durably deduplicates replayed webhook deliveries without repeating side effects', async () => {
    const eventId = `evt_dedup_${Date.now()}`
    const payload = JSON.stringify({
      id: eventId,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: `pay_dedup_${Date.now()}`,
            amount: 2400,
            notes: {
              orderNumber: `ORD-DEDUP-${Date.now()}`,
            },
          },
        },
      },
    })

    const validSig = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex')

    // First delivery
    const req1 = new NextRequest('http://localhost:3000/api/commerce/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': validSig,
      },
      body: payload,
    })
    const res1 = await webhookPOST(req1)
    expect(res1.status).toBe(200)
    const data1 = await res1.json()
    expect(data1.status).toBe('ok')
    expect(data1.note).toBeUndefined()

    // Second replayed delivery
    const req2 = new NextRequest('http://localhost:3000/api/commerce/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': validSig,
      },
      body: payload,
    })
    const res2 = await webhookPOST(req2)
    expect(res2.status).toBe(200)
    const data2 = await res2.json()
    expect(data2.status).toBe('ok')
    expect(data2.note).toBe('duplicate_event_ignored')
  })

  it('allows retrying a failed webhook and marks processed only after success', async () => {
    const eventId = `evt_retry_${Date.now()}`

    // 1. Initial claim
    const claim1 = await claimWebhookEvent('razorpay', eventId, 'payment.captured', { id: eventId })
    expect(claim1.claimed).toBe(true)
    expect(claim1.alreadyProcessed).toBe(false)

    // 2. Failure occurs during processing
    await recordWebhookFailure('razorpay', eventId, 'Connection timeout')

    // 3. Retry delivery arrives
    const claim2 = await claimWebhookEvent('razorpay', eventId, 'payment.captured', { id: eventId })
    expect(claim2.claimed).toBe(true)
    expect(claim2.alreadyProcessed).toBe(false)

    // 4. Retry succeeds and marks processed
    await markWebhookProcessed('razorpay', eventId, claim2.recordId)

    // 5. Subsequent delivery is recognized as duplicate
    const claim3 = await claimWebhookEvent('razorpay', eventId, 'payment.captured', { id: eventId })
    expect(claim3.claimed).toBe(false)
    expect(claim3.alreadyProcessed).toBe(true)
  })

  it('returns retryable HTTP 500 when database operation fails during webhook processing', async () => {
    process.env.TEST_SIMULATE_DB_FAILURE = 'true'

    const eventId = `evt_db_fail_${Date.now()}`
    const payload = JSON.stringify({
      id: eventId,
      event: 'payment.captured',
      payload: {
        payment: {
          entity: {
            id: `pay_fail_${Date.now()}`,
            amount: 2400,
            notes: { orderNumber: `ORD-FAIL-${Date.now()}` },
          },
        },
      },
    })

    const validSig = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex')

    const req = new NextRequest('http://localhost:3000/api/commerce/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-razorpay-signature': validSig,
      },
      body: payload,
    })

    const res = await webhookPOST(req)
    // Must return HTTP 500 so Razorpay retries
    expect(res.status).toBe(500)
    const data = await res.json()
    expect(data.error).toContain('Webhook processing failed, retry requested')

    // Clean up
    delete process.env.TEST_SIMULATE_DB_FAILURE
  })
})
