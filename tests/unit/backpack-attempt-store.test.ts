import { describe, it, expect, beforeEach } from 'vitest'
import {
  saveBackpackAttempt,
  loadBackpackAttempt,
  clearBackpackAttempt,
  BACKPACK_STORAGE_KEY,
  type BackpackAttemptState,
} from '../../lib/lms/backpack-attempt-store'

describe('Backpack Attempt Store (Client-Side Persistence & Recovery)', () => {
  const sampleAttempt: BackpackAttemptState = {
    version: '1.0.0',
    attemptId: 'att_test_123',
    learnerName: 'Aarav W.',
    updatedAt: Date.now(),
    stage: 2,
    packedItemIds: ['math_set', 'pencil_box'],
    itemPlacements: { math_set: 'back', pencil_box: 'front' },
    measuredWeightKg: 1.45,
    answers: {
      placementAttempts: 0,
      routineAttempts: 0,
    },
    status: 'in_progress',
  }

  // Robust universal localStorage mock for testing environment
  const storageMock = (() => {
    let store: Record<string, string> = {}
    return {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString()
      },
      removeItem: (key: string) => {
        delete store[key]
      },
      clear: () => {
        store = {}
      },
    }
  })()

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: storageMock,
      writable: true,
      configurable: true,
    })
    storageMock.clear()
  })

  it('returns freshness: "empty" when no attempt exists in localStorage', () => {
    const result = loadBackpackAttempt()
    expect(result.state).toBeNull()
    expect(result.freshness).toBe('empty')
  })

  it('saves and loads an active attempt within 7 days', () => {
    saveBackpackAttempt(sampleAttempt)

    const result = loadBackpackAttempt()
    expect(result.freshness).toBe('active')
    expect(result.state).not.toBeNull()
    expect(result.state?.attemptId).toBe('att_test_123')
    expect(result.state?.packedItemIds).toEqual(['math_set', 'pencil_box'])
  })

  it('marks attempt as "stale_archive" if older than 7 days without silently deleting it', () => {
    const eightDaysAgoMs = Date.now() - 8 * 24 * 60 * 60 * 1000
    const staleAttempt: BackpackAttemptState = {
      ...sampleAttempt,
      updatedAt: eightDaysAgoMs,
    }

    localStorage.setItem(BACKPACK_STORAGE_KEY, JSON.stringify(staleAttempt))

    const result = loadBackpackAttempt()
    // Invariant: ZERO silent deletion!
    expect(result.freshness).toBe('stale_archive')
    expect(result.state).not.toBeNull()
    expect(result.state?.status).toBe('stale_archive')
    expect(result.state?.attemptId).toBe('att_test_123')

    // Confirm it still exists in localStorage
    expect(localStorage.getItem(BACKPACK_STORAGE_KEY)).not.toBeNull()
  })

  it('clears attempt completely when clearBackpackAttempt is called', () => {
    saveBackpackAttempt(sampleAttempt)
    expect(localStorage.getItem(BACKPACK_STORAGE_KEY)).not.toBeNull()

    clearBackpackAttempt()
    expect(localStorage.getItem(BACKPACK_STORAGE_KEY)).toBeNull()
    expect(loadBackpackAttempt().freshness).toBe('empty')
  })

  it('handles corrupted JSON gracefully without crashing', () => {
    localStorage.setItem(BACKPACK_STORAGE_KEY, '{ invalid_malformed_json ::: ')

    const result = loadBackpackAttempt()
    expect(result.state).toBeNull()
    expect(result.freshness).toBe('empty')
  })
})
