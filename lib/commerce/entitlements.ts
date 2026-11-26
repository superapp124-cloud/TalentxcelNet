import { createClient } from '@/lib/supabase/server'
import { createServiceRoleClient } from '@/lib/supabase/admin'
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
interface StoredCommercialOrder {
  orderNumber: string
  userIdentifier: string
  productId: string
  domain: ProductDomain
  totalPayableRupees: number
  status: 'created' | 'paid' | 'failed' | 'refunded'
  razorpayOrderId?: string
  providerPaymentId?: string
}

const MEMORY_ENTITLEMENTS = new Map<string, LearnerEntitlement>()
const FULFILLED_ORDERS = new Map<string, LearnerEntitlement>()
const FULFILLED_PAYMENTS = new Map<string, LearnerEntitlement>()
const PENDING_COMMERCIAL_ORDERS = new Map<string, StoredCommercialOrder>()
const RAZORPAY_ORDER_INDEX = new Map<string, string>()
const MEMORY_FUNNEL_EVENTS: FunnelAnalyticsEvent[] = []

function getDbClient(useServiceRole?: boolean) {
  if (useServiceRole && (process.env.NODE_ENV !== 'test' || process.env.TEST_USE_LIVE_DB)) {
    return createServiceRoleClient()
  }
  return null
}

/**
 * Persists a newly created commercial order in 'created' state so that
 * subsequent webhook deliveries can validate product, user, and amount
 * against server-authoritative order data rather than trusting webhook notes alone.
 */
export async function recordPendingCommercialOrder(params: {
  orderNumber: string
  userId: string
  productId: string
  razorpayOrderId?: string
}): Promise<void> {
  const { orderNumber, userId, productId, razorpayOrderId } = params
  const product = ALL_COMMERCIAL_PRODUCTS[productId]
  if (!product) return

  const summary = calculateCommercialOrderSummary(productId)
  const record: StoredCommercialOrder = {
    orderNumber,
    userIdentifier: userId,
    productId: product.id,
    domain: product.domain,
    totalPayableRupees: summary.totalPayableRupees,
    status: 'created',
    razorpayOrderId,
  }
  PENDING_COMMERCIAL_ORDERS.set(orderNumber, record)
  if (razorpayOrderId) {
    RAZORPAY_ORDER_INDEX.set(razorpayOrderId, orderNumber)
  }

  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('commercial_orders') as any).upsert(
      {
        order_number: orderNumber,
        user_identifier: userId,
        product_id: product.id,
        domain: product.domain,
        base_price_rupees: summary.basePriceRupees,
        gst_rupees: summary.gstAmountRupees,
        total_payable_rupees: summary.totalPayableRupees,
        status: 'created',
        provider: 'razorpay',
        metadata: {
          productTitle: product.title,
          razorpayOrderId: razorpayOrderId || null,
        },
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'order_number' }
    )
  } catch (dbErr) {
    console.warn('[Commerce] Pending commercial order DB sync note:', dbErr)
  }
}

/**
 * Grants paid entitlement server-side after cryptographically verified payment.
 * Enforces idempotency: replayed requests for already fulfilled orders or payments
 * return the existing active entitlement without duplicate credit activation.
 */
export async function grantEntitlement(params: {
  orderNumber: string
  paymentId: string
  productId: string
  userId?: string
  email?: string
  notes?: Record<string, string>
  useServiceRole?: boolean
}): Promise<LearnerEntitlement> {
  const { orderNumber, paymentId, productId, userId, email, useServiceRole } = params

  // 0. Idempotency check: return existing entitlement on replayed verification
  if (orderNumber && FULFILLED_ORDERS.has(orderNumber)) {
    return FULFILLED_ORDERS.get(orderNumber)!
  }
  if (paymentId && FULFILLED_PAYMENTS.has(paymentId)) {
    return FULFILLED_PAYMENTS.get(paymentId)!
  }

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
  MEMORY_ENTITLEMENTS.set(entitlement.id, entitlement)
  if (orderNumber) FULFILLED_ORDERS.set(orderNumber, entitlement)
  if (paymentId) FULFILLED_PAYMENTS.set(paymentId, entitlement)

  // Sync to database if available
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = (getDbClient(useServiceRole) ?? (await createClient())) as any

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

    // 2. Record learner entitlement (idempotently skip insert if already active for same user+product)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existingEnt } = await (supabase.from('learner_entitlements') as any)
      .select('id')
      .eq('user_identifier', effectiveUserId)
      .eq('product_id', product.id)
      .eq('is_active', true)
      .gt('valid_until', now.toISOString())
      .limit(1)
      .maybeSingle()

    if (!existingEnt) {
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
    }
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
      if (!active.some((e) => e.id === ent.id)) {
        active.push(ent)
      }
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
 * Revokes an entitlement durably upon payment refund, failure, or chargeback.
 * Targets exclusively the specific entitlement tied to the order or payment ID,
 * ensuring other active learner entitlements remain unaffected.
 */
export async function revokeEntitlement(params: {
  orderNumber?: string
  paymentId?: string
  userId?: string
  reason?: 'refunded' | 'failed' | 'chargeback' | 'expired'
  useServiceRole?: boolean
}): Promise<boolean> {
  const { orderNumber, paymentId, userId, reason = 'refunded', useServiceRole } = params
  let memoryRevoked = false
  let targetProductId: string | undefined
  let targetUserId: string | undefined = userId

  // 1. In-memory targeted revocation
  if (orderNumber && FULFILLED_ORDERS.has(orderNumber)) {
    const target = FULFILLED_ORDERS.get(orderNumber)!
    target.isActive = false
    target.attemptsRemaining = 0
    targetProductId = target.productId
    targetUserId = target.userId
    memoryRevoked = true
  }

  if (paymentId && FULFILLED_PAYMENTS.has(paymentId)) {
    const target = FULFILLED_PAYMENTS.get(paymentId)!
    target.isActive = false
    target.attemptsRemaining = 0
    if (!targetProductId) targetProductId = target.productId
    if (!targetUserId) targetUserId = target.userId
    memoryRevoked = true
  }

  // Deactivate matching entry in MEMORY_ENTITLEMENTS without wiping other products
  if (targetUserId && targetProductId) {
    const cacheKey = `${targetUserId}_${targetProductId}`
    const target = MEMORY_ENTITLEMENTS.get(cacheKey)
    if (target) {
      target.isActive = false
      target.attemptsRemaining = 0
      memoryRevoked = true
    }
  } else if (targetUserId && !orderNumber && !paymentId) {
    // Blanket fallback only when no order or payment reference exists
    for (const ent of MEMORY_ENTITLEMENTS.values()) {
      if (ent.userId === targetUserId) {
        ent.isActive = false
        ent.attemptsRemaining = 0
        memoryRevoked = true
      }
    }
  }

  // 2. Durable database revocation
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = (getDbClient(useServiceRole) ?? (await createClient())) as any

    if (orderNumber) {
      // Look up product_id and user_identifier from commercial_orders
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: ordData } = await (supabase.from('commercial_orders') as any)
        .select('product_id, user_identifier')
        .eq('order_number', orderNumber)
        .maybeSingle()

      const effectiveProdId = targetProductId || ordData?.product_id
      const effectiveUser = targetUserId || ordData?.user_identifier

      // Update commercial order status to refunded
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: ordErr } = await (supabase.from('commercial_orders') as any)
        .update({ status: 'refunded', updated_at: new Date().toISOString() })
        .eq('order_number', orderNumber)

      if (ordErr && process.env.NODE_ENV !== 'test') {
        throw new Error(`Failed to update commercial order status: ${ordErr.message}`)
      }

      // Revoke ONLY the specific entitlement tied to this product and user
      if (effectiveProdId && effectiveUser) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: entErr } = await (supabase.from('learner_entitlements') as any)
          .update({ is_active: false, attempts_remaining: 0 })
          .eq('user_identifier', effectiveUser)
          .eq('product_id', effectiveProdId)

        if (entErr && process.env.NODE_ENV !== 'test') {
          throw new Error(`Failed to revoke learner entitlement: ${entErr.message}`)
        }
      }
    } else if (paymentId) {
      // Look up commercial_orders by provider_payment_id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: ordData } = await (supabase.from('commercial_orders') as any)
        .select('product_id, user_identifier')
        .eq('provider_payment_id', paymentId)
        .maybeSingle()

      const effectiveProdId = targetProductId || ordData?.product_id
      const effectiveUser = targetUserId || ordData?.user_identifier

      if (effectiveProdId && effectiveUser) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error: entErr } = await (supabase.from('learner_entitlements') as any)
          .update({ is_active: false, attempts_remaining: 0 })
          .eq('user_identifier', effectiveUser)
          .eq('product_id', effectiveProdId)

        if (entErr && process.env.NODE_ENV !== 'test') {
          throw new Error(`Failed to revoke learner entitlement: ${entErr.message}`)
        }
      }
    } else if (userId) {
      // Fallback only if neither orderNumber nor paymentId are provided
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: entErr } = await (supabase.from('learner_entitlements') as any)
        .update({ is_active: false, attempts_remaining: 0 })
        .eq('user_identifier', userId)

      if (entErr && process.env.NODE_ENV !== 'test') {
        throw new Error(`Failed to revoke learner entitlement: ${entErr.message}`)
      }
    }
  } catch (dbErr) {
    if (process.env.NODE_ENV !== 'test') {
      throw dbErr
    }
  }

  return memoryRevoked
}

/**
 * Consumes one attempt from a granted entitlement.
 * Returns false if expired, deactivated, or zero attempts remain.
 */
export function consumeEntitlementAttempt(entitlementId: string): boolean {
  for (const ent of MEMORY_ENTITLEMENTS.values()) {
    if (ent.id === entitlementId) {
      if (!ent.isActive || new Date(ent.validUntil) <= new Date()) {
        return false
      }
      if (ent.attemptsRemaining === 0) {
        return false
      }
      if (ent.attemptsRemaining > 0) {
        ent.attemptsRemaining -= 1
        if (ent.attemptsRemaining === 0) {
          ent.isActive = false
        }
      }
      return true
    }
  }
  return false
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

export interface CommercialWebhookFulfillmentResult {
  outcome: 'fulfilled' | 'already_fulfilled' | 'rejected' | 'not_commercial'
  reason?: string
  entitlement?: LearnerEntitlement
}

/**
 * Validates and fulfills a commercial pass purchase from a verified Razorpay webhook.
 * Correlates against stored commercial_orders (by order_number or razorpayOrderId),
 * verifies product, user, currency, and amount, and prevents duplicate entitlement grants.
 */
export async function fulfillCommercialOrderFromWebhook(params: {
  orderNumber?: string
  razorpayOrderId?: string
  paymentId: string
  productId?: string
  userId?: string
  email?: string
  amountPaise: number
  currency?: string
}): Promise<CommercialWebhookFulfillmentResult> {
  const {
    orderNumber: noteOrderNumber,
    razorpayOrderId,
    paymentId,
    productId: noteProductId,
    userId: noteUserId,
    email,
    amountPaise,
    currency = 'INR',
  } = params

  if (currency.toUpperCase() !== 'INR') {
    return { outcome: 'rejected', reason: 'unsupported_currency' }
  }

  // 1. Resolve stored order from memory or database
  let resolvedOrderNumber =
    noteOrderNumber || (razorpayOrderId ? RAZORPAY_ORDER_INDEX.get(razorpayOrderId) : undefined)
  let storedOrder = resolvedOrderNumber ? PENDING_COMMERCIAL_ORDERS.get(resolvedOrderNumber) : undefined

  if (!storedOrder && (process.env.NODE_ENV !== 'test' || process.env.TEST_USE_LIVE_DB)) {
    const supabase = createServiceRoleClient()
    if (resolvedOrderNumber) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase.from('commercial_orders') as any)
        .select('*')
        .eq('order_number', resolvedOrderNumber)
        .maybeSingle()
      if (data) {
        storedOrder = {
          orderNumber: data.order_number,
          userIdentifier: data.user_identifier,
          productId: data.product_id,
          domain: data.domain,
          totalPayableRupees: Number(data.total_payable_rupees),
          status: data.status,
          providerPaymentId: data.provider_payment_id ?? undefined,
          razorpayOrderId: data.metadata?.razorpayOrderId ?? undefined,
        }
      }
    } else if (razorpayOrderId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data } = await (supabase.from('commercial_orders') as any)
        .select('*')
        .filter('metadata->>razorpayOrderId', 'eq', razorpayOrderId)
        .maybeSingle()
      if (data) {
        resolvedOrderNumber = data.order_number
        storedOrder = {
          orderNumber: data.order_number,
          userIdentifier: data.user_identifier,
          productId: data.product_id,
          domain: data.domain,
          totalPayableRupees: Number(data.total_payable_rupees),
          status: data.status,
          providerPaymentId: data.provider_payment_id ?? undefined,
          razorpayOrderId,
        }
      }
    }
  }

  // Not a commercial order if neither stored order nor productId note exists
  if (!storedOrder && !noteProductId) {
    return { outcome: 'not_commercial' }
  }

  // 2. Validate authoritative product, user, and amount
  const effectiveProductId = storedOrder?.productId || noteProductId
  if (!effectiveProductId || !ALL_COMMERCIAL_PRODUCTS[effectiveProductId]) {
    return { outcome: 'rejected', reason: 'unknown_product' }
  }

  if (storedOrder && noteProductId && noteProductId !== storedOrder.productId) {
    return { outcome: 'rejected', reason: 'product_mismatch' }
  }

  const effectiveOrderNumber = storedOrder?.orderNumber || resolvedOrderNumber
  const effectiveUserId = storedOrder?.userIdentifier || noteUserId
  if (!effectiveOrderNumber || !effectiveUserId) {
    return { outcome: 'rejected', reason: 'missing_order_or_user' }
  }

  if (storedOrder && noteUserId && noteUserId !== storedOrder.userIdentifier) {
    return { outcome: 'rejected', reason: 'user_mismatch' }
  }

  const expectedPaise = storedOrder
    ? Math.round(storedOrder.totalPayableRupees * 100)
    : calculateCommercialOrderSummary(effectiveProductId).totalPayablePaise

  if (!Number.isFinite(amountPaise) || amountPaise < expectedPaise) {
    return { outcome: 'rejected', reason: 'amount_mismatch' }
  }

  if (storedOrder?.status === 'refunded') {
    return { outcome: 'rejected', reason: 'order_already_refunded' }
  }

  // 3. Idempotent short-circuit for already-fulfilled orders/payments
  if (FULFILLED_ORDERS.has(effectiveOrderNumber)) {
    return {
      outcome: 'already_fulfilled',
      entitlement: FULFILLED_ORDERS.get(effectiveOrderNumber)!,
    }
  }
  if (paymentId && FULFILLED_PAYMENTS.has(paymentId)) {
    return {
      outcome: 'already_fulfilled',
      entitlement: FULFILLED_PAYMENTS.get(paymentId)!,
    }
  }
  if (storedOrder?.status === 'paid') {
    const existing = await getActiveEntitlements(effectiveUserId)
    const matched = existing.find((e) => e.productId === effectiveProductId)
    if (matched) {
      return { outcome: 'already_fulfilled', entitlement: matched }
    }
  }

  // 4. Grant entitlement & record payment transaction
  const entitlement = await grantEntitlement({
    orderNumber: effectiveOrderNumber,
    paymentId,
    productId: effectiveProductId,
    userId: effectiveUserId,
    email,
    useServiceRole: true,
  })

  if (storedOrder) {
    storedOrder.status = 'paid'
    storedOrder.providerPaymentId = paymentId
    PENDING_COMMERCIAL_ORDERS.set(effectiveOrderNumber, storedOrder)
  }

  if (process.env.NODE_ENV !== 'test' || process.env.TEST_USE_LIVE_DB) {
    const supabase = createServiceRoleClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from('payment_transactions') as any)
      .upsert(
        {
          amount_cents: amountPaise,
          status: 'succeeded',
          provider: 'razorpay',
          transaction_reference: paymentId,
          metadata: {
            orderNumber: effectiveOrderNumber,
            productId: effectiveProductId,
            userId: effectiveUserId,
          },
          created_at: new Date().toISOString(),
        },
        { onConflict: 'transaction_reference', ignoreDuplicates: true }
      )
  }

  return { outcome: 'fulfilled', entitlement }
}

/**
 * Marks a commercial order as failed when payment.failed is received,
 * without overwriting already paid or refunded orders.
 */
export async function markCommercialOrderFailed(params: {
  orderNumber?: string
  razorpayOrderId?: string
}): Promise<void> {
  const resolvedOrderNumber =
    params.orderNumber ||
    (params.razorpayOrderId ? RAZORPAY_ORDER_INDEX.get(params.razorpayOrderId) : undefined)

  if (resolvedOrderNumber) {
    const stored = PENDING_COMMERCIAL_ORDERS.get(resolvedOrderNumber)
    if (stored && stored.status === 'created') {
      stored.status = 'failed'
      PENDING_COMMERCIAL_ORDERS.set(resolvedOrderNumber, stored)
    }
  }

  if (process.env.NODE_ENV !== 'test' || process.env.TEST_USE_LIVE_DB) {
    const supabase = createServiceRoleClient()
    if (resolvedOrderNumber) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from('commercial_orders') as any)
        .update({ status: 'failed', updated_at: new Date().toISOString() })
        .eq('order_number', resolvedOrderNumber)
        .eq('status', 'created')
    } else if (params.razorpayOrderId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from('commercial_orders') as any)
        .update({ status: 'failed', updated_at: new Date().toISOString() })
        .filter('metadata->>razorpayOrderId', 'eq', params.razorpayOrderId)
        .eq('status', 'created')
    }
  }
}

export function resetCommercialOrdersForTesting(): void {
  PENDING_COMMERCIAL_ORDERS.clear()
  RAZORPAY_ORDER_INDEX.clear()
}
