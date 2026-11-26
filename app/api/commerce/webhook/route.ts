import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/commerce/razorpay'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import {
  fulfillCommercialOrderFromWebhook,
  markCommercialOrderFailed,
  revokeEntitlement,
} from '@/lib/commerce/entitlements'
import {
  acquireWebhookLease,
  completeWebhookProcessing,
  failWebhookProcessing,
  generateWorkerId,
  executeAtomicPaymentCaptured,
} from '@/lib/commerce/webhook-idempotency'

const MAX_WEBHOOK_PAYLOAD_BYTES = 128 * 1024 // 128 KB

export async function POST(req: NextRequest) {
  try {
    // 1. Strict Content-Length header verification
    const contentLength = req.headers.get('content-length')
    if (contentLength !== null) {
      const trimmed = contentLength.trim()
      if (!/^\d+$/.test(trimmed) || Number(trimmed) > MAX_WEBHOOK_PAYLOAD_BYTES) {
        return NextResponse.json(
          { error: 'Payload exceeds maximum webhook size' },
          { status: 413 }
        )
      }
    }

    // 2. Stream raw body with early cancellation
    const chunks: Uint8Array[] = []
    let totalBytes = 0

    if (req.body && typeof req.body.getReader === 'function') {
      const reader = req.body.getReader()
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (value) {
            totalBytes += value.byteLength
            if (totalBytes > MAX_WEBHOOK_PAYLOAD_BYTES) {
              await reader.cancel('PAYLOAD_TOO_LARGE')
              return NextResponse.json(
                { error: 'Webhook payload too large' },
                { status: 413 }
              )
            }
            chunks.push(value)
          }
        }
      } finally {
        reader.releaseLock()
      }
    } else {
      const text = await req.text()
      if (Buffer.byteLength(text, 'utf-8') > MAX_WEBHOOK_PAYLOAD_BYTES) {
        return NextResponse.json({ error: 'Webhook payload too large' }, { status: 413 })
      }
      chunks.push(Buffer.from(text, 'utf-8'))
    }

    const rawBody = Buffer.concat(chunks).toString('utf-8')

    // 3. Fail-Closed Webhook Signature Authentication
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('[Commerce Webhook] Error: RAZORPAY_WEBHOOK_SECRET is unconfigured. Webhook rejected.')
      return NextResponse.json(
        { error: 'Webhook processing unavailable: RAZORPAY_WEBHOOK_SECRET is unconfigured' },
        { status: 500 }
      )
    }

    const signature = req.headers.get('x-razorpay-signature')
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing x-razorpay-signature header' },
        { status: 400 }
      )
    }

    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      )
    }

    let event: Record<string, any>
    try {
      event = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    const eventId =
      event.id ||
      `${event.event}_${event.payload?.payment?.entity?.id || event.payload?.order?.entity?.id || Date.now()}`

    // 4. Atomic Distributed Processing Lease (Mutex & Concurrency Protection)
    const workerId = generateWorkerId()
    const lease = await acquireWebhookLease({
      provider: 'razorpay',
      eventId,
      eventType: event.event || 'unknown',
      payload: event,
      workerId,
      leaseSeconds: 60,
    })

    if (lease.outcome === 'already_processed') {
      return NextResponse.json(
        { status: 'ok', received: true, note: 'duplicate_event_ignored' },
        { status: 200 }
      )
    }

    if (lease.outcome === 'busy') {
      return NextResponse.json(
        {
          error: 'Webhook event is currently being processed by another worker instance',
          retryAfterSeconds: 5,
        },
        { status: 409 }
      )
    }

    const paymentEntity = event.payload?.payment?.entity
    const orderEntity = event.payload?.order?.entity
    const notes = {
      ...(orderEntity?.notes ?? {}),
      ...(paymentEntity?.notes ?? {}),
    } as Record<string, string | undefined>

    const orderNumber = notes.orderNumber
    const userId = notes.userId
    const programmeSlug = notes.programmeSlug
    const productId = notes.productId
    const email = notes.email
    const razorpayOrderId: string | undefined = paymentEntity?.order_id || orderEntity?.id
    const currency: string = paymentEntity?.currency || orderEntity?.currency || 'INR'
    const amountPaise: number =
      paymentEntity?.amount ?? orderEntity?.amount_paid ?? orderEntity?.amount ?? 0
    const paymentId: string = paymentEntity?.id ?? razorpayOrderId ?? `pay_${eventId}`
    const paymentStatus: string | undefined = paymentEntity?.status
    const orderStatus: string | undefined = orderEntity?.status

    // 5. Execute Business Operations (Fails with 5xx on error so provider retries)
    try {
      if (event.event === 'payment.captured' || event.event === 'order.paid') {
        const isPaymentUncaptured = Boolean(paymentStatus && paymentStatus !== 'captured')
        const isOrderUnpaid = Boolean(
          event.event === 'order.paid' && orderStatus && orderStatus !== 'paid'
        )
        if (isPaymentUncaptured || isOrderUnpaid) {
          await completeWebhookProcessing({
            provider: 'razorpay',
            eventId,
            workerId,
          })
          return NextResponse.json(
            { status: 'ignored', reason: 'payment_or_order_not_captured' },
            { status: 400 }
          )
        }

        // A. Commercial Pass Fulfilment (when productId note or stored commercial_order matches)
        const commercialResult = await fulfillCommercialOrderFromWebhook({
          orderNumber,
          razorpayOrderId,
          paymentId,
          productId,
          userId,
          email,
          amountPaise,
          currency,
        })

        if (commercialResult.outcome === 'rejected') {
          await completeWebhookProcessing({
            provider: 'razorpay',
            eventId,
            workerId,
          })
          return NextResponse.json(
            { error: 'Webhook order validation failed', reason: commercialResult.reason },
            { status: 400 }
          )
        }

        // B. Programme Order Fulfilment (when not a commercial pass and programmeSlug is present)
        if (commercialResult.outcome === 'not_commercial') {
          if (programmeSlug || orderNumber) {
            await executeAtomicPaymentCaptured({
              orderNumber,
              paymentId,
              userId,
              programmeSlug,
              amountPaise,
              eventName: event.event,
            })
          } else {
            console.warn(`[Commerce Webhook] Event ${eventId} missing orderNumber/programmeSlug/productId; skipping fulfilment.`)
          }
        }
      } else if (event.event === 'payment.failed') {
        await markCommercialOrderFailed({ orderNumber, razorpayOrderId })

        if (process.env.NODE_ENV !== 'test' || process.env.TEST_USE_LIVE_DB) {
          const supabase = createServiceRoleClient()
          if (orderNumber) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase.from('orders') as any)
              .update({ status: 'failed', updated_at: new Date().toISOString() })
              .eq('order_number', orderNumber)
          }
        }
      } else if (event.event === 'refund.processed' || event.event === 'payment.refunded') {
        await revokeEntitlement({
          orderNumber,
          paymentId,
          userId,
          reason: 'refunded',
          useServiceRole: true,
        })

        if (process.env.NODE_ENV !== 'test' || process.env.TEST_USE_LIVE_DB) {
          const supabase = createServiceRoleClient()
          if (orderNumber) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await (supabase.from('orders') as any)
              .update({ status: 'refunded', updated_at: new Date().toISOString() })
              .eq('order_number', orderNumber)
          }
        }
      }

      // 6. Complete and verify durable completion in database
      await completeWebhookProcessing({
        provider: 'razorpay',
        eventId,
        workerId,
      })

      return NextResponse.json({ status: 'ok', received: true })
    } catch (opErr: unknown) {
      const errMsg = opErr instanceof Error ? opErr.message : 'Unknown database execution error'
      console.error(`[Commerce Webhook] Operation failure for event ${eventId}:`, errMsg)

      // Release lease and mark failed so future provider retries can be processed
      try {
        await failWebhookProcessing({
          provider: 'razorpay',
          eventId,
          workerId,
          errorMessage: errMsg,
        })
      } catch (leaseErr) {
        console.error(`[Commerce Webhook] Error releasing lease after operation failure:`, leaseErr)
      }

      return NextResponse.json(
        { error: 'Webhook processing failed, retry requested', details: errMsg },
        { status: 500 }
      )
    }
  } catch (error: unknown) {
    console.error('[Commerce Webhook] Uncaught error:', error)
    return NextResponse.json(
      { error: 'Webhook processing error', details: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    )
  }
}
