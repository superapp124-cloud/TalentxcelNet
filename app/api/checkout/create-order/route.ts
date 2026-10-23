import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { calculateCommercialOrderSummary, ALL_COMMERCIAL_PRODUCTS } from '@/packages/core/src/data/product-catalog'
import { createRazorpayOrder } from '@/lib/commerce/razorpay'
import { recordFunnelEvent } from '@/lib/commerce/entitlements'
import { generateOrderNumber } from '@/lib/utils'

const createOrderSchema = z.object({
  productId: z.string(),
  couponCode: z.string().optional(),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  billingCycle: z.enum(['one_time', 'monthly', 'annual']).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = createOrderSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid order parameters', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const { productId, couponCode, customerEmail, customerPhone } = parsed.data
    const product = ALL_COMMERCIAL_PRODUCTS[productId]

    if (!product) {
      return NextResponse.json(
        { error: `Product not found: ${productId}` },
        { status: 404 }
      )
    }

    // Attempt to read authenticated user if available (optional for guest checkout)
    let authenticatedUserId: string | undefined = undefined
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        authenticatedUserId = user.id
      }
    } catch {
      // Continue as guest checkout
    }

    // 1. Calculate trusted server-side order summary & transparent GST breakdown
    const summary = calculateCommercialOrderSummary(productId, couponCode)
    const orderNumber = generateOrderNumber()
    const effectiveUserId = authenticatedUserId || customerEmail || `guest_${orderNumber}`

    // 2. Create Razorpay order (amount strictly in paise = rupees * 100)
    const rzpOrder = await createRazorpayOrder({
      amount: summary.totalPayablePaise,
      currency: summary.currency,
      receipt: orderNumber,
      notes: {
        orderNumber,
        productId,
        productTitle: product.title,
        domain: product.domain,
        userId: effectiveUserId,
        email: customerEmail || '',
        phone: customerPhone || '',
      },
    })

    // 3. Record verified funnel event: checkout_initiated
    await recordFunnelEvent({
      eventName: 'checkout_initiated',
      domain: product.domain,
      userId: effectiveUserId,
      sessionId: orderNumber,
      metadata: {
        productId: product.id,
        title: product.title,
        totalPayableRupees: summary.totalPayableRupees,
        isGuest: !authenticatedUserId,
      },
    })

    return NextResponse.json({
      success: true,
      orderNumber,
      summary,
      razorpayOrderId: rzpOrder.id,
      razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
      isMock: rzpOrder.isMock ?? false,
      product: {
        id: product.id,
        title: product.title,
        domain: product.domain,
        tagline: product.tagline,
        validityDays: product.validityDays,
        inclusions: product.inclusions,
      },
    })
  } catch (err: unknown) {
    console.error('[Commerce] Order creation failure:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create commercial order' },
      { status: 500 }
    )
  }
}
