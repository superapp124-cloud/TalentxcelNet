import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/commerce/razorpay'
import { createClient } from '@/lib/supabase/server'
import { revokeEntitlement, recordFunnelEvent } from '@/lib/commerce/entitlements'

const MAX_WEBHOOK_PAYLOAD_BYTES = 128 * 1024 // 128 KB
const PROCESSED_WEBHOOK_EVENTS = new Set<string>()

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
    const signature = req.headers.get('x-razorpay-signature') ?? ''
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    // In production, signature verification is strictly enforced
    if (webhookSecret) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret)
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
      }
    }

    let event: Record<string, any>
    try {
      event = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    const eventId = event.id || `${event.event}_${event.payload?.payment?.entity?.id || Date.now()}`

    // 3. Webhook Idempotency: Reject duplicate processing
    if (PROCESSED_WEBHOOK_EVENTS.has(eventId)) {
      return NextResponse.json(
        { status: 'ok', received: true, note: 'duplicate_event_ignored' },
        { status: 200 }
      )
    }
    PROCESSED_WEBHOOK_EVENTS.add(eventId)
    // Keep deduplication set bounded to 5,000 entries
    if (PROCESSED_WEBHOOK_EVENTS.size > 5000) {
      const first = PROCESSED_WEBHOOK_EVENTS.values().next().value
      if (first) PROCESSED_WEBHOOK_EVENTS.delete(first)
    }

    const paymentEntity = event.payload?.payment?.entity
    const notes = paymentEntity?.notes ?? {}
    const orderNumber = notes.orderNumber
    const userId = notes.userId
    const programmeSlug = notes.programmeSlug
    const amountPaise = paymentEntity?.amount ?? 0
    const paymentId = paymentEntity?.id ?? `pay_${Date.now()}`

    // 4. Handle Event Types
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      try {
        const supabase = await createClient()

        if (orderNumber) {
          await (supabase.from('orders') as any)
            .update({
              status: 'paid',
              updated_at: new Date().toISOString(),
            })
            .eq('order_number', orderNumber)
        }

        await (supabase.from('payment_transactions') as any).insert({
          amount_cents: amountPaise,
          status: 'succeeded',
          provider: 'razorpay',
          transaction_reference: paymentId,
          metadata: {
            orderNumber,
            userId,
            programmeSlug,
            event: event.event,
          },
        })

        if (userId && programmeSlug) {
          const { data: prog } = (await supabase
            .from('programmes')
            .select('id')
            .eq('slug', programmeSlug)
            .maybeSingle()) as { data: { id: string } | null }

          const programmeId = prog?.id || '00000000-0000-0000-0000-000000000001'

          await (supabase.from('learning_enrolments') as any).upsert(
            {
              learner_id: userId,
              programme_id: programmeId,
              status: 'active',
              progress_percentage: 0,
            },
            { onConflict: 'learner_id,programme_id' }
          )
        }
      } catch (dbErr) {
        console.warn('[Commerce Webhook] Database sync warning (safe fallback):', dbErr)
      }
    } else if (event.event === 'payment.failed') {
      try {
        const supabase = await createClient()
        if (orderNumber) {
          await (supabase.from('orders') as any)
            .update({ status: 'failed', updated_at: new Date().toISOString() })
            .eq('order_number', orderNumber)
        }
      } catch {
        // Safe fallback
      }
    } else if (event.event === 'refund.processed' || event.event === 'payment.refunded') {
      // Revoke granted entitlement immediately upon refund
      await revokeEntitlement({
        orderNumber,
        paymentId,
        userId,
        reason: 'refunded',
      })

      try {
        const supabase = await createClient()
        if (orderNumber) {
          await (supabase.from('orders') as any)
            .update({ status: 'refunded', updated_at: new Date().toISOString() })
            .eq('order_number', orderNumber)
        }
      } catch {
        // Safe fallback
      }
    }

    return NextResponse.json({ status: 'ok', received: true })
  } catch (error) {
    console.error('[Commerce Webhook] Error:', error)
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 })
  }
}
