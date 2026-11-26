import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getVisibleDashboardNavItems } from '@/components/dashboard/dashboard-sidebar'
import { getUserActiveEntitlements } from '@/lib/commerce/user-entitlements'
import * as entitlementsModule from '@/lib/commerce/entitlements'

describe('Paid Customer Dashboard & Service-Scoped Sidebar', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows all 12 navigation items for free/unpaid users', () => {
    const items = getVisibleDashboardNavItems(false, [])
    expect(items.length).toBe(12)
    expect(items.find((i) => i.id === 'overview')?.label).toBe('Overview')
  })

  it('filters sidebar to only purchased assessment services for paid assessment customers', () => {
    const items = getVisibleDashboardNavItems(true, ['assessment'])
    const ids = items.map((i) => i.id)

    expect(ids).toContain('overview')
    expect(items.find((i) => i.id === 'overview')?.label).toBe('My Services')
    expect(ids).toContain('diagnostic')
    expect(ids).toContain('question-bank')
    expect(ids).toContain('reports')
    expect(ids).toContain('plans')
    expect(ids).toContain('settings')

    // Must NOT include unrelated domains
    expect(ids).not.toContain('skills')
    expect(ids).not.toContain('projects')
    expect(ids).not.toContain('academic')
    expect(ids).not.toContain('achievements')
    expect(ids).not.toContain('bookmarks')
  })

  it('filters sidebar to only purchased skill services for paid skill customers', () => {
    const items = getVisibleDashboardNavItems(true, ['skill'])
    const ids = items.map((i) => i.id)

    expect(ids).toContain('skills')
    expect(ids).toContain('projects')
    expect(ids).not.toContain('diagnostic')
    expect(ids).not.toContain('academic')
    expect(ids).not.toContain('question-bank')
  })

  it('deduplicates entitlements across userId and email and enriches product metadata', async () => {
    const sharedEnt = {
      id: 'ent_1',
      userId: 'user_123',
      productId: 'prod_assess_preboard_49',
      domain: 'assessment' as const,
      unlockedTargetId: 'assessment',
      attemptsRemaining: 5,
      validUntil: new Date(Date.now() + 86400000).toISOString(),
      isActive: true,
      grantedAt: new Date().toISOString(),
    }

    vi.spyOn(entitlementsModule, 'getActiveEntitlements').mockImplementation(async (identifier) => {
      if (identifier === 'user_123') return [sharedEnt]
      if (identifier === 'learner@example.com') return [sharedEnt]
      return []
    })

    const summary = await getUserActiveEntitlements('user_123', 'learner@example.com')
    expect(summary.isPaidCustomer).toBe(true)
    expect(summary.entitlements).toHaveLength(1)
    expect(summary.entitlements[0].productTitle).toBe('Pre-Board 2026 Revision Pass')
    expect(summary.activeDomains).toEqual(['assessment'])
  })

  it('returns isPaidCustomer=false when user has no active entitlements', async () => {
    vi.spyOn(entitlementsModule, 'getActiveEntitlements').mockResolvedValue([])
    const summary = await getUserActiveEntitlements('user_free', 'free@example.com')
    expect(summary.isPaidCustomer).toBe(false)
    expect(summary.entitlements).toHaveLength(0)
    expect(summary.activeDomains).toEqual([])
  })
})
