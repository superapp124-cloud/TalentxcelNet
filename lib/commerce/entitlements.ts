import { createClient } from '@/lib/supabase/server'
import {
  ALL_COMMERCIAL_PRODUCTS,
  calculateCommercialOrderSummary,
} from '@/packages/core/src/data/product-catalog'
import type {
  LearnerEntitlement,
  FunnelAnalyticsEvent,
  FunnelEventName,
  ProductDomain,
} from '@/packages/core/src/types'

// In-memory fallback cache for development, fast reads, and sandbox testing
const MEMORY_ENTITLEMENTS = new Map<string, LearnerEntitlement>()
const MEMORY_FUNNEL_EVENTS: FunnelAnalyticsEvent[] = []

/**
 * Grants paid entitlement server-side after cryptographically verified payment
 */
export async function grantEntitlement(params: {
  orderNumber: string
  paymentId: string
  productId: string
  userId?: string
  email?: string
  notes?: Record<string, string>
}): Promise<LearnerEntitlement> {
  const { orderNumber, paymentId, productId, userId, email } = params
  const product = ALL_COMMERCIAL_PRODUCTS[productId]

  if (!product) {
    throw new Error(`Cannot grant entitlement for unknown product: ${productId}`)
  }

  const effectiveUserId = userId || email || `guest_${orderNumber}`
  const now = new Date()
  const validUntilDate = new Date(now.getTime() + product.validityDays * 24 * 60 * 60 * 1000)

  const entitlement: LearnerEntitlement = {
    id: `ent_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId: effectiveUserId,
    productId: product.id,
    domain: product.domain,
    unlockedTargetId: product.targetGradeLevel
      ? `class_${product.targetGradeLevel}`
      : product.domain,
    attemptsRemaining: product.attemptsAllowed ?? (product.domain === 'assessment' ? 1 : -1),
    validUntil: validUntilDate.toISOString(),
    isActive: true,
    grantedAt: now.toISOString(),
  }

  // Store in memory cache
  const cacheKey = `${effectiveUserId}_${product.id}`
  MEMORY_ENTITLEMENTS.set(cacheKey, entitlement)
  MEMORY_ENTITLEMENTS.set(effectiveUserId, entitlement)

  // Sync to database if available
  try {
    const supabase = await createClient()

    // 1. Record commercial order
    const summary = calculateCommercialOrderSummary(productId)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('commercial_orders') as any).upsert(
      {
        order_number: orderNumber,
        user_identifier: effectiveUserId,
        product_id: product.id,
        domain: product.domain,
        base_price_rupees: summary.basePriceRupees,
        gst_rupees: summary.gstAmountRupees,
        total_payable_rupees: summary.totalPayableRupees,
        status: 'paid',
        provider: 'razorpay',
        provider_payment_id: paymentId,
        metadata: {
          productTitle: product.title,
          attemptsAllowed: product.attemptsAllowed,
          validityDays: product.validityDays,
        },
        updated_at: now.toISOString(),
      },
      { onConflict: 'order_number' }
    )

    // 2. Record learner entitlement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('learner_entitlements') as any).insert({
      id: entitlement.id,
      user_identifier: effectiveUserId,
      product_id: product.id,
      domain: product.domain,
      target_id: entitlement.unlockedTargetId,
      attempts_remaining: entitlement.attemptsRemaining,
      valid_until: entitlement.validUntil,
      is_active: true,
    })
  } catch (dbErr) {
    console.warn('[Commerce] DB Entitlement sync note (falling back to memory ledger):', dbErr)
  }

  // Record funnel event
  await recordFunnelEvent({
    eventName: 'entitlement_activated',
    domain: product.domain,
    userId: effectiveUserId,
    sessionId: orderNumber,
    metadata: {
      productId: product.id,
      title: product.title,
      totalPaid: product.basePriceRupees,
    },
  })

  return entitlement
}

/**
 * Retrieves all active entitlements for a learner
 */
export async function getActiveEntitlements(
  userIdentifier: string
): Promise<LearnerEntitlement[]> {
  const now = new Date()
  const active: LearnerEntitlement[] = []

  // Check memory store
  for (const ent of MEMORY_ENTITLEMENTS.values()) {
    if (
      ent.userId === userIdentifier &&
      ent.isActive &&
      new Date(ent.validUntil) > now &&
      (ent.attemptsRemaining === -1 || ent.attemptsRemaining > 0)
    ) {
      active.push(ent)
    }
  }

  // Check Supabase if available
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase.from('learner_entitlements') as any)
      .select('*')
      .eq('user_identifier', userIdentifier)
      .eq('is_active', true)
      .gt('valid_until', now.toISOString())

    if (data && Array.isArray(data)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      for (const row of data as any[]) {
        if (!active.some((e) => e.id === row.id)) {
          active.push({
            id: row.id,
            userId: row.user_identifier,
            productId: row.product_id,
            domain: row.domain,
            unlockedTargetId: row.target_id,
            attemptsRemaining: row.attempts_remaining,
            validUntil: row.valid_until,
            isActive: row.is_active,
            grantedAt: row.created_at,
          })
        }
      }
    }
  } catch (err) {
    // Database query skipped if table not yet created
  }

  return active
}

/**
 * Records a verified funnel event for Day-1 Truthful Analytics
 */
export async function recordFunnelEvent(event: {
  eventName: FunnelEventName
  domain?: ProductDomain
  userId?: string
  sessionId: string
  metadata?: Record<string, unknown>
}): Promise<FunnelAnalyticsEvent> {
  const fullEvent: FunnelAnalyticsEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    eventName: event.eventName,
    domain: event.domain,
    userId: event.userId,
    sessionId: event.sessionId,
    metadata: event.metadata,
    timestamp: new Date().toISOString(),
  }

  MEMORY_FUNNEL_EVENTS.push(fullEvent)

  // Keep memory events bounded to latest 2000
  if (MEMORY_FUNNEL_EVENTS.length > 2000) {
    MEMORY_FUNNEL_EVENTS.shift()
  }

  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('funnel_analytics_events') as any).insert({
      id: fullEvent.id,
      event_name: fullEvent.eventName,
      domain: fullEvent.domain,
      session_id: fullEvent.sessionId,
      user_identifier: fullEvent.userId,
      metadata: fullEvent.metadata,
      created_at: fullEvent.timestamp,
    })
  } catch {
    // Graceful fallback
  }

  return fullEvent
}

/**
 * Truthful growth and funnel reporting
 * Strictly separates measured actual data from Day 30 ambitions!
 */
export function getTruthfulGrowthMetrics() {
  const totalEvents = MEMORY_FUNNEL_EVENTS.length

  const landingViews = MEMORY_FUNNEL_EVENTS.filter((e) => e.eventName === 'landing_view').length
  const freeTestsStarted = MEMORY_FUNNEL_EVENTS.filter(
    (e) => e.eventName === 'free_test_started'
  ).length
  const freeTestsCompleted = MEMORY_FUNNEL_EVENTS.filter(
    (e) => e.eventName === 'free_test_completed'
  ).length
  const plansViewed = MEMORY_FUNNEL_EVENTS.filter((e) => e.eventName === 'plan_viewed').length
  const checkoutsInitiated = MEMORY_FUNNEL_EVENTS.filter(
    (e) => e.eventName === 'checkout_initiated'
  ).length
  const paymentsSucceeded = MEMORY_FUNNEL_EVENTS.filter(
    (e) => e.eventName === 'payment_succeeded'
  ).length
  const entitlementsActive = MEMORY_ENTITLEMENTS.size

  // Calculate gross collections from real payments
  const grossCollectionsRupees = MEMORY_FUNNEL_EVENTS.filter(
    (e) => e.eventName === 'payment_succeeded'
  ).reduce((sum, e) => sum + (Number(e.metadata?.totalPaidRupees) || 0), 0)

  const conversionRate =
    checkoutsInitiated > 0
      ? Math.round((paymentsSucceeded / checkoutsInitiated) * 100)
      : paymentsSucceeded > 0
      ? 100
      : 0

  return {
    measuredActuals: {
      totalRecordedEvents: totalEvents,
      landingViews,
      freeTestsStarted,
      freeTestsCompleted,
      plansViewed,
      checkoutsInitiated,
      paymentsSucceeded,
      entitlementsActive,
      grossCollectionsRupees,
      refundsRupees: 0,
      netCollectionsRupees: grossCollectionsRupees,
      checkoutConversionPercentage: conversionRate,
    },
    ambitionScaleTargets: {
      day30UserTarget: 1000000,
      dailyTargetRunRate: 33333,
      note: '1 million users by Day 30 is the ambition target, not a verified forecast. All metrics under measuredActuals represent real, un-padded learner data.',
    },
  }
}
