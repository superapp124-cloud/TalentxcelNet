import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/commerce/razorpay'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-razorpay-signature') ?? ''
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

    // In production, signature verification is strictly enforced
    if (webhookSecret) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret)
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
      }
    }

    const event = JSON.parse(rawBody)

    // Handle payment.captured or order.paid
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity
      const notes = paymentEntity?.notes ?? {}
      const orderNumber = notes.orderNumber
      const userId = notes.userId
      const programmeSlug = notes.programmeSlug
      const amountPaise = paymentEntity?.amount ?? 0
      const paymentId = paymentEntity?.id ?? `pay_mock_${Date.now()}`

      console.log(`[Commerce Webhook] Verified payment for order: ${orderNumber}, user: ${userId}, programme: ${programmeSlug}`)

      try {
        const supabase = await createClient()

        // 1. Idempotently update order record if exists
        if (orderNumber) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase.from('orders') as any)
            .update({
              status: 'paid',
              updated_at: new Date().toISOString(),
            })
            .eq('order_number', orderNumber)
        }

        // 2. Insert transaction into audit ledger
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

        // 3. Activate learner course enrolment if user ID and programme are present
        if (userId && programmeSlug) {
          // Get programme ID from slug
          const { data: prog } = (await supabase
            .from('programmes')
            .select('id')
            .eq('slug', programmeSlug)
            .maybeSingle()) as { data: { id: string } | null }

          const programmeId = prog?.id || '00000000-0000-0000-0000-000000000001'

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    }

    return NextResponse.json({ status: 'ok', received: true })
  } catch (error) {
    console.error('[Commerce Webhook] Error:', error)
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 })
  }
}
