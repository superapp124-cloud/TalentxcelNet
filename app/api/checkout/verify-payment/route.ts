import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyPaymentSignature } from '@/lib/commerce/razorpay'
import { grantEntitlement, recordFunnelEvent } from '@/lib/commerce/entitlements'
import { ALL_COMMERCIAL_PRODUCTS } from '@/packages/core/src/data/product-catalog'

const verifyPaymentSchema = z.object({
  orderNumber: z.string(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  productId: z.string(),
  customerEmail: z.string().optional(),
  userId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = verifyPaymentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid verification payload', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const {
      orderNumber,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      productId,
      customerEmail,
      userId,
    } = parsed.data

    const product = ALL_COMMERCIAL_PRODUCTS[productId]
    if (!product) {
      return NextResponse.json({ error: `Unknown product ID: ${productId}` }, { status: 404 })
    }

    // 1. Cryptographically verify signature server-side using HMAC SHA256
    const isSignatureValid = verifyPaymentSignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    )

    if (!isSignatureValid) {
      console.error('[Commerce] Payment verification failed: Invalid HMAC SHA256 signature')
      await recordFunnelEvent({
        eventName: 'payment_failed',
        domain: product.domain,
        sessionId: orderNumber,
        metadata: {
          orderNumber,
          productId,
          razorpayOrderId,
          reason: 'signature_mismatch',
        },
      })

      return NextResponse.json(
        { error: 'Payment signature verification failed. Access not granted.' },
        { status: 400 }
      )
    }

    // 2. Grant real server-authoritative entitlement
    const entitlement = await grantEntitlement({
      orderNumber,
      paymentId: razorpayPaymentId,
      productId,
      userId,
      email: customerEmail,
    })

    // 3. Record verified payment success funnel event
    await recordFunnelEvent({
      eventName: 'payment_succeeded',
      domain: product.domain,
      userId: entitlement.userId,
      sessionId: orderNumber,
      metadata: {
        orderNumber,
        productId,
        totalPaidRupees: product.basePriceRupees,
        paymentId: razorpayPaymentId,
      },
    })

    return NextResponse.json({
      success: true,
      verified: true,
      orderNumber,
      paymentId: razorpayPaymentId,
      productTitle: product.title,
      domain: product.domain,
      entitlement: {
        id: entitlement.id,
        domain: entitlement.domain,
        attemptsRemaining: entitlement.attemptsRemaining,
        validUntil: entitlement.validUntil,
        unlockedTargetId: entitlement.unlockedTargetId,
        isActive: entitlement.isActive,
      },
      message: `Successfully unlocked ${product.title}! Your entitlement is active.`,
    })
  } catch (err: unknown) {
    console.error('[Commerce] Payment verification error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal payment verification error' },
      { status: 500 }
    )
  }
}
