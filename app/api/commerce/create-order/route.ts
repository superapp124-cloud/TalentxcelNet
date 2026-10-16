import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { calculateOrderSummary } from '@/lib/commerce/pricing'
import { createRazorpayOrder } from '@/lib/commerce/razorpay'
import { generateOrderNumber } from '@/lib/utils'

const orderSchema = z.object({
  programmeSlug: z.string(),
  paymentType: z.enum(['full', 'instalment']).default('instalment'),
  couponCode: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await req.json()
    const parsed = orderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid order parameters' }, { status: 400 })
    }

    const { programmeSlug, paymentType, couponCode } = parsed.data
    const summary = calculateOrderSummary(programmeSlug, paymentType, couponCode)
    const orderNumber = generateOrderNumber()

    // 1. Create Razorpay order (amount in paise = total * 100)
    const rzpOrder = await createRazorpayOrder({
      amount: summary.total * 100,
      currency: summary.currency,
      receipt: orderNumber,
      notes: {
        programmeSlug,
        userId: user.id,
        orderNumber,
      },
    })

    return NextResponse.json({
      success: true,
      orderNumber,
      amount: summary.total,
      currency: summary.currency,
      summary,
      razorpayOrderId: rzpOrder.id,
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? 'rzp_test_placeholder',
      isMock: rzpOrder.isMock ?? false,
    })
  } catch (err: unknown) {
    console.error('[Commerce] Order creation error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create order' },
      { status: 500 }
    )
  }
}
