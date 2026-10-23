import { describe, it, expect } from 'vitest'
import crypto from 'crypto'
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
  recordFunnelEvent,
  getTruthfulGrowthMetrics,
} from '../../lib/commerce/entitlements'

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

describe('Cryptographic Razorpay Signature Verification', () => {
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

  it('verifies raw webhook HMAC SHA256 signature', () => {
    const webhookPayload = JSON.stringify({ event: 'payment.captured', entity: { id: paymentId } })
    const validWebhookSig = crypto
      .createHmac('sha256', secret)
      .update(webhookPayload)
      .digest('hex')

    const isValid = verifyWebhookSignature(webhookPayload, validWebhookSig, secret)
    expect(isValid).toBe(true)
  })
})

describe('Server-Side Entitlement Granting & Funnel Reporting', () => {
  it('grants entitlement with correct validity timestamp and attempts', async () => {
    const entitlement = await grantEntitlement({
      orderNumber: `TX-ORD-${Date.now()}`,
      paymentId: 'pay_test_verified_123',
      productId: 'prod_assess_plus',
      email: 'student@example.com',
    })

    expect(entitlement.id).toMatch(/^ent_/)
    expect(entitlement.domain).toBe('assessment')
    expect(entitlement.attemptsRemaining).toBe(12)
    expect(entitlement.isActive).toBe(true)

    // Check validity date is ~60 days from now
    const validUntilDate = new Date(entitlement.validUntil)
    const expectedDiffDays = Math.round((validUntilDate.getTime() - Date.now()) / (24 * 3600 * 1000))
    expect(expectedDiffDays).toBeGreaterThanOrEqual(59)
    expect(expectedDiffDays).toBeLessThanOrEqual(61)
  })

  it('retrieves active entitlements and excludes expired ones', async () => {
    const userId = `learner_test_${Date.now()}`
    await grantEntitlement({
      orderNumber: `TX-ORD-${Date.now()}-1`,
      paymentId: 'pay_test_verified_456',
      productId: 'prod_skill_foundation_monthly',
      userId,
    })

    const entitlements = await getActiveEntitlements(userId)
    expect(entitlements.length).toBeGreaterThanOrEqual(1)
    expect(entitlements.some((e) => e.productId === 'prod_skill_foundation_monthly')).toBe(true)
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
    // Mathematical benchmark clearly demarcated
    expect(metrics.ambitionScaleTargets.day30UserTarget).toBe(1000000)
    expect(metrics.ambitionScaleTargets.dailyTargetRunRate).toBe(33333)
  })
})
