import { createServiceRoleClient } from '@/lib/supabase/admin'
import { randomBytes } from 'crypto'

export type WebhookLeaseOutcome = 'acquired' | 'already_processed' | 'busy'

export interface WebhookLeaseResult {
  outcome: WebhookLeaseOutcome
  claimId: string
  leaseOwner: string
}

interface MockLeaseEntry {
  claimId: string
  provider: string
  eventId: string
  eventType: string
  status: 'processing' | 'processed' | 'failed'
  leaseOwner: string
  leaseExpiresAt: number // timestamp ms
  retryCount: number
}

// In-process mock store implementing identical atomic leasing semantics for test runners
const MOCK_LEASE_STORE = new Map<string, MockLeaseEntry>()

export function generateWorkerId(): string {
  const pid = typeof process !== 'undefined' && process.pid ? process.pid : 'srv'
  return `worker_${pid}_${randomBytes(6).toString('hex')}`
}

/**
 * Atomically acquires an exclusive processing lease for an incoming webhook event.
 * In production/staging, invokes PostgreSQL RPC `acquire_webhook_processing_lease` using row-level locking.
 * Fails closed with an error on database unavailability — never silently falls back in production.
 */
export async function acquireWebhookLease(params: {
  provider: string
  eventId: string
  eventType: string
  payload: Record<string, unknown>
  workerId: string
  leaseSeconds?: number
}): Promise<WebhookLeaseResult> {
  const { provider, eventId, eventType, payload, workerId, leaseSeconds = 60 } = params

  // In test runner without live Postgres, use the strict in-memory state machine
  if (process.env.NODE_ENV === 'test' && !process.env.TEST_USE_LIVE_DB) {
    return acquireMockWebhookLease(provider, eventId, eventType, workerId, leaseSeconds)
  }

  // Production & Staging: Atomic PostgreSQL RPC call with FOR UPDATE row locks (requires service_role)
  const supabase = createServiceRoleClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.rpc as any)('acquire_webhook_processing_lease', {
    p_provider: provider,
    p_event_id: eventId,
    p_event_type: eventType,
    p_payload: payload,
    p_worker_id: workerId,
    p_lease_seconds: leaseSeconds,
  })

  if (error) {
    console.error(`[Webhook Lease] Error acquiring lease for ${provider}:${eventId}:`, error)
    throw new Error(`Database lease acquisition failed: ${error.message}`)
  }

  const row = Array.isArray(data) ? data[0] : data
  if (!row || !row.outcome) {
    throw new Error(`Unexpected lease acquisition response from database: ${JSON.stringify(data)}`)
  }

  return {
    outcome: row.outcome as WebhookLeaseOutcome,
    claimId: row.claim_id,
    leaseOwner: row.lease_owner || workerId,
  }
}

/**
 * Marks webhook processing completed and verified durably in PostgreSQL.
 * Throws if the database write is not confirmed.
 */
export async function completeWebhookProcessing(params: {
  provider: string
  eventId: string
  workerId: string
}): Promise<void> {
  const { provider, eventId, workerId } = params

  if (process.env.NODE_ENV === 'test' && !process.env.TEST_USE_LIVE_DB) {
    completeMockWebhookProcessing(provider, eventId, workerId)
    return
  }

  const supabase = createServiceRoleClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: success, error } = await (supabase.rpc as any)('complete_webhook_processing', {
    p_provider: provider,
    p_event_id: eventId,
    p_worker_id: workerId,
  })

  if (error || !success) {
    throw new Error(
      `Failed to confirm durable webhook completion in database: ${error?.message || 'Row not updated'}`
    )
  }
}

/**
 * Releases the lease and marks status as failed so subsequent provider retries can acquire it.
 * Verifies the database RPC execution and throws if the lease cannot be released.
 */
export async function failWebhookProcessing(params: {
  provider: string
  eventId: string
  workerId: string
  errorMessage: string
}): Promise<boolean> {
  const { provider, eventId, workerId, errorMessage } = params

  if (process.env.NODE_ENV === 'test' && !process.env.TEST_USE_LIVE_DB) {
    return failMockWebhookProcessing(provider, eventId, workerId, errorMessage)
  }

  const supabase = createServiceRoleClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: success, error } = await (supabase.rpc as any)('fail_webhook_processing', {
    p_provider: provider,
    p_event_id: eventId,
    p_worker_id: workerId,
    p_error: errorMessage,
  })

  if (error) {
    console.error(`[Webhook Lease] Error marking lease as failed:`, error)
    throw new Error(`Failed to record webhook failure in database: ${error.message}`)
  }

  if (!success) {
    console.warn(`[Webhook Lease] Warning: fail_webhook_processing affected 0 rows for ${provider}:${eventId}`)
    return false
  }

  return true
}

/**
 * Executes payment captured side effects within an atomic PostgreSQL transaction.
 */
export async function executeAtomicPaymentCaptured(params: {
  orderNumber?: string
  paymentId: string
  userId?: string
  programmeSlug?: string
  amountPaise: number
  eventName?: string
}): Promise<{ success: boolean; order_number?: string; payment_id: string }> {
  const { orderNumber = '', paymentId, userId = '', programmeSlug = '', amountPaise, eventName = 'payment.captured' } = params

  if (process.env.TEST_SIMULATE_DB_FAILURE === 'true') {
    throw new Error('Database connection failed during payment capture transaction')
  }

  if (process.env.NODE_ENV === 'test' && !process.env.TEST_USE_LIVE_DB) {
    return {
      success: true,
      order_number: orderNumber,
      payment_id: paymentId,
    }
  }

  const supabase = createServiceRoleClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.rpc as any)('apply_payment_captured_transaction', {
    p_order_number: orderNumber,
    p_payment_id: paymentId,
    p_user_id: userId,
    p_programme_slug: programmeSlug,
    p_amount_cents: amountPaise,
    p_event_name: eventName,
  })

  if (error) {
    console.error(`[Commerce] Atomic payment captured transaction failed:`, error)
    throw new Error(`Payment transaction execution failed: ${error.message}`)
  }

  return data || { success: true, order_number: orderNumber, payment_id: paymentId }
}

// ============================================================================
// IN-MEMORY MOCK LEASING IMPLEMENTATION (For Unit / Integration Testing)
// ============================================================================

function acquireMockWebhookLease(
  provider: string,
  eventId: string,
  eventType: string,
  workerId: string,
  leaseSeconds: number
): WebhookLeaseResult {
  const key = `${provider}:${eventId}`
  const now = Date.now()
  const leaseExpiresAt = now + leaseSeconds * 1000

  const existing = MOCK_LEASE_STORE.get(key)
  if (!existing) {
    const claimId = `claim_${now}_${Math.random().toString(36).substring(2, 7)}`
    MOCK_LEASE_STORE.set(key, {
      claimId,
      provider,
      eventId,
      eventType,
      status: 'processing',
      leaseOwner: workerId,
      leaseExpiresAt,
      retryCount: 0,
    })
    return { outcome: 'acquired', claimId, leaseOwner: workerId }
  }

  // Case A: Already processed
  if (existing.status === 'processed') {
    return { outcome: 'already_processed', claimId: existing.claimId, leaseOwner: existing.leaseOwner }
  }

  // Case B: In processing with active, unexpired lease -> BUSY
  if (existing.status === 'processing' && existing.leaseExpiresAt > now) {
    return { outcome: 'busy', claimId: existing.claimId, leaseOwner: existing.leaseOwner }
  }

  // Case C: Failed or lease expired -> acquire for retry
  existing.status = 'processing'
  existing.leaseOwner = workerId
  existing.leaseExpiresAt = leaseExpiresAt
  existing.retryCount += 1

  return { outcome: 'acquired', claimId: existing.claimId, leaseOwner: workerId }
}

function completeMockWebhookProcessing(provider: string, eventId: string, workerId: string): void {
  const key = `${provider}:${eventId}`
  const existing = MOCK_LEASE_STORE.get(key)
  if (!existing || existing.leaseOwner !== workerId || existing.status !== 'processing') {
    throw new Error('Failed to confirm durable webhook completion in database: Lease lock not held')
  }
  existing.status = 'processed'
}

function failMockWebhookProcessing(
  provider: string,
  eventId: string,
  workerId: string,
  _errorMessage: string
): boolean {
  const key = `${provider}:${eventId}`
  const existing = MOCK_LEASE_STORE.get(key)
  if (!existing || existing.leaseOwner !== workerId) {
    throw new Error('Failed to record webhook failure in database: Lease lock not held by caller')
  }
  existing.status = 'failed'
  // Expire lease immediately so retry can acquire
  existing.leaseExpiresAt = Date.now() - 1000
  return true
}

export function resetWebhookIdempotencyClaimsForTesting(): void {
  MOCK_LEASE_STORE.clear()
}

/**
 * Test helper to simulate an expired lease for timeout recovery testing
 */
export function expireWebhookLeaseForTesting(provider: string, eventId: string): void {
  const key = `${provider}:${eventId}`
  const existing = MOCK_LEASE_STORE.get(key)
  if (existing) {
    existing.leaseExpiresAt = Date.now() - 5000
  }
}
