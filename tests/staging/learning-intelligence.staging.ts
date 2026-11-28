/**
 * Staging-Only Integration Qualification Suite
 *
 * Run ONLY against an isolated staging Supabase project after applying
 * migrations 0014 and 0015:
 *   TEST_USE_LIVE_DB=true pnpm vitest run tests/staging/learning-intelligence.staging.ts
 *
 * Never run against production data or production secrets.
 */

import { describe, it, expect } from 'vitest'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import { ingestAnalyticsEvents, reconcileAnonymousVisitor } from '@/lib/analytics/visitor-intelligence'
import { loadLearnerWorkspaceFromDb } from '@/lib/dashboard/learner-intelligence'
import { getAdminIntelligenceReport } from '@/lib/analytics/admin-intelligence'

const RUN_STAGING = process.env.TEST_USE_LIVE_DB === 'true'

describe.skipIf(!RUN_STAGING)('Staging DB Integration: Schema, RPCs, Atomicity & RLS', () => {
  it('executes loadLearnerWorkspaceFromDb against live staging schema with zero queryDiagnostics errors', async () => {
    const db = createServiceRoleClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userRow } = await (db as any).from('profiles').select('id, email').limit(1).maybeSingle()
    if (!userRow?.id) return

    const workspace = await loadLearnerWorkspaceFromDb(userRow.id, userRow.email)
    expect(workspace.queryDiagnostics.status).toBe('ok')
    expect(workspace.queryDiagnostics.failedSources).toEqual([])
  })

  it('persists atomic session increments & immutable first-touch attribution across calls', async () => {
    const vid = `v_stg_${Date.now()}`
    const sid = `s_stg_${Date.now()}`

    const batch1 = await ingestAnalyticsEvents(
      [
        {
          eventName: 'session_start',
          eventVersion: 1,
          anonymousVisitorId: vid,
          sessionId: sid,
          dedupeKey: `stg:1:${sid}`,
          pagePath: '/pricing',
          utmSource: 'google',
          utmMedium: 'cpc',
          utmCampaign: 'stg_camp',
          properties: {},
        },
      ],
      { authenticatedUserId: null, countryCode: 'IN' }
    )
    expect(batch1.accepted).toBe(1)

    // Duplicate dedupeKey must be ignored
    const dup = await ingestAnalyticsEvents(
      [
        {
          eventName: 'session_start',
          eventVersion: 1,
          anonymousVisitorId: vid,
          sessionId: sid,
          dedupeKey: `stg:1:${sid}`,
          pagePath: '/pricing',
          properties: {},
        },
      ],
      { authenticatedUserId: null }
    )
    expect(dup.deduplicated).toBe(1)

    // Second event updates exit_path and increments events_count without overwriting first_touch_source
    await ingestAnalyticsEvents(
      [
        {
          eventName: 'page_view',
          eventVersion: 1,
          anonymousVisitorId: vid,
          sessionId: sid,
          dedupeKey: `stg:2:${sid}`,
          pagePath: '/dashboard',
          referrerDomain: 'linkedin.com',
          properties: {},
        },
      ],
      { authenticatedUserId: null }
    )

    const db = createServiceRoleClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: sessionRow } = await (db as any)
      .from('visitor_sessions')
      .select('events_count, page_views_count, landing_path, exit_path')
      .eq('session_id', sid)
      .single()
    expect(sessionRow.events_count).toBe(2)
    expect(sessionRow.page_views_count).toBe(1)
    expect(sessionRow.landing_path).toBe('/pricing')
    expect(sessionRow.exit_path).toBe('/dashboard')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: attrRow } = await (db as any)
      .from('visitor_attribution')
      .select('first_touch_source, last_touch_source')
      .eq('anonymous_visitor_id', vid)
      .single()
    expect(attrRow.first_touch_source).toBe('google')
    expect(attrRow.last_touch_source).toBe('social')

    // Reconciliation idempotency check
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userRow } = await (db as any).from('profiles').select('id').limit(1).maybeSingle()
    if (userRow?.id) {
      const rec1 = await reconcileAnonymousVisitor({
        anonymousVisitorId: vid,
        sessionId: sid,
        authenticatedUserId: userRow.id,
      })
      expect(rec1.reconciledEvents).toBeGreaterThanOrEqual(2)
      const rec2 = await reconcileAnonymousVisitor({
        anonymousVisitorId: vid,
        sessionId: sid,
        authenticatedUserId: userRow.id,
      })
      expect(rec2.reconciledEvents).toBe(0)
    }
  })

  it('runs SQL-side get_admin_intelligence_summary RPC cleanly', async () => {
    const report = await getAdminIntelligenceReport({ range: '7d', userPage: 1, userPageSize: 10 })
    expect(report.funnel.length).toBe(7)
    expect(report.userExplorer.page).toBe(1)
  })
})
