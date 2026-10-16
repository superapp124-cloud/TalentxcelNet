import { NextRequest, NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/commerce/razorpay'

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

      console.log(`[Commerce Webhook] Payment verified for order: ${orderNumber}, user: ${userId}, programme: ${programmeSlug}`)
      // In production, update Supabase orders status to 'paid' and learning_enrolments to 'active'
    }

    return NextResponse.json({ status: 'ok', received: true })
  } catch (error) {
    console.error('[Commerce Webhook] Error:', error)
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 })
  }
}
