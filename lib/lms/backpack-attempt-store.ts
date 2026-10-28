/**
 * TALENTXCEL SMART BACKPACK LAB - CLIENT PERSISTENCE & RECOVERY STORE
 * Manages device-local attempt persistence in localStorage:
 * - Versioned schema (v1)
 * - Zero cloud transmission during simulation
 * - Non-destructive 7-day stale archive policy (no silent deletion)
 * - Anti-corruption schema validation
 */

import type { CompartmentLocation } from '@/packages/core/src/skills-engine/backpack-evaluator'

export const BACKPACK_STORAGE_KEY = 'talentxcel_backpack_attempt_v1'
export const STALE_ARCHIVE_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export interface BackpackAttemptState {
  version: '1.0.0'
  attemptId: string
  learnerName: string
  updatedAt: number
  stage: 1 | 2 | 3 | 4 | 5
  packedItemIds: string[]
  itemPlacements: Record<string, CompartmentLocation>
  measuredWeightKg: number
  answers: {
    placementOptionId?: string
    routineOptionId?: string
    placementAttempts: number
    routineAttempts: number
  }
  rubricScores?: {
    timetableAccuracy: number
    weightBand: number
    placement: number
    reasoning: number
    totalScore: number
  }
  certificateId?: string
  verificationUrl?: string
  status: 'in_progress' | 'completed' | 'stale_archive'
}

export type AttemptFreshness = 'empty' | 'active' | 'stale_archive'

/**
 * Validate that an object has the expected BackpackAttemptState shape
 */
function isValidAttemptShape(obj: unknown): obj is BackpackAttemptState {
  if (!obj || typeof obj !== 'object') return false
  const candidate = obj as Record<string, unknown>
  return (
    candidate.version === '1.0.0' &&
    typeof candidate.attemptId === 'string' &&
    Array.isArray(candidate.packedItemIds) &&
    typeof candidate.updatedAt === 'number' &&
    typeof candidate.stage === 'number' &&
    candidate.answers !== undefined
  )
}

/**
 * Save in-progress backpack attempt to device localStorage
 */
export function saveBackpackAttempt(attempt: BackpackAttemptState): void {
  if (typeof window === 'undefined') return
  try {
    const payload = {
      ...attempt,
      updatedAt: Date.now(),
    }
    localStorage.setItem(BACKPACK_STORAGE_KEY, JSON.stringify(payload))
  } catch (err) {
    console.warn('[Backpack Store] Failed to save attempt to localStorage:', err)
  }
}

/**
 * Load backpack attempt with freshness status (active vs stale_archive)
 * Implements ZERO silent deletion.
 */
export function loadBackpackAttempt(): {
  state: BackpackAttemptState | null
  freshness: AttemptFreshness
} {
  if (typeof window === 'undefined') {
    return { state: null, freshness: 'empty' }
  }

  try {
    const raw = localStorage.getItem(BACKPACK_STORAGE_KEY)
    if (!raw) {
      return { state: null, freshness: 'empty' }
    }

    const parsed = JSON.parse(raw)
    if (!isValidAttemptShape(parsed)) {
      console.warn('[Backpack Store] Stored attempt has invalid shape, ignoring.')
      return { state: null, freshness: 'empty' }
    }

    const elapsed = Date.now() - parsed.updatedAt
    const isStale = elapsed > STALE_ARCHIVE_THRESHOLD_MS

    if (isStale) {
      const archivedState: BackpackAttemptState = {
        ...parsed,
        status: 'stale_archive',
      }
      return {
        state: archivedState,
        freshness: 'stale_archive',
      }
    }

    return {
      state: parsed,
      freshness: 'active',
    }
  } catch (err) {
    console.error('[Backpack Store] Error loading attempt:', err)
    return { state: null, freshness: 'empty' }
  }
}

/**
 * Explicit manual deletion / reset initiated by learner or parent
 */
export function clearBackpackAttempt(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(BACKPACK_STORAGE_KEY)
  } catch (err) {
    console.warn('[Backpack Store] Failed to remove attempt:', err)
  }
}
