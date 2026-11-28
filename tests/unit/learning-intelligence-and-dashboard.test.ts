import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import {
  ANALYTICS_EVENT_NAMES,
  analyticsBatchSchema,
  checkAnalyticsRateLimit,
  classifyUserAgent,
  inferTrafficChannel,
  ingestAnalyticsEvents,
  reconcileAnonymousVisitor,
  sanitizeEventProperties,
  __getInMemoryAnalyticsSnapshot,
  __resetInMemoryAnalyticsForTest,
} from '@/lib/analytics/visitor-intelligence'
import {
  buildAdminIntelligenceReport,
  getAdminIntelligenceReport,
  resolveDateWindow,
} from '@/lib/analytics/admin-intelligence'
import {
  addLearnerBookmark,
  addRevisionNote,
  buildLearnerWorkspaceData,
  generatePersonalizedRecommendations,
  loadLearnerWorkspaceFromDb,
  upsertStudyPreferences,
  __resetLearnerWorkspaceMemoryForTest,
} from '@/lib/dashboard/learner-intelligence'
import {
  VISITOR_SIG_COOKIE,
  signVisitorId,
  verifyVisitorToken,
} from '@/lib/analytics/visitor-token'

const mockGetServerAccess = vi.fn()
const mockGetAuthUser = vi.fn()

vi.mock('@/lib/auth/server-access', () => ({
  getServerAccess: (...args: unknown[]) => mockGetServerAccess(...args),
}))

vi.mock('@/lib/supabase/server', () => ({
  createClient: async () => ({
    auth: {
      getUser: (...args: unknown[]) => mockGetAuthUser(...args),
    },
  }),
}))

describe('Learning Intelligence, Visitor Analytics & Unified Dashboard', () => {
  beforeEach(() => {
    __resetInMemoryAnalyticsForTest()
    __resetLearnerWorkspaceMemoryForTest()
    vi.clearAllMocks()
  })

  describe('Phase 1: Visitor Intelligence Schema, PII Filtering & Ingestion', () => {
    it('supports all 24 required first-party analytics events', () => {
      expect(ANALYTICS_EVENT_NAMES.length).toBe(24)
      expect(ANALYTICS_EVENT_NAMES).toContain('page_view')
      expect(ANALYTICS_EVENT_NAMES).toContain('diagnostic_complete')
      expect(ANALYTICS_EVENT_NAMES).toContain('recommendation_click')
    })

    it('rejects malformed event payloads and oversized property bags', () => {
      const invalid = analyticsBatchSchema.safeParse({
        events: [
          {
            eventName: 'unknown_hack_event',
            anonymousVisitorId: 'short',
            sessionId: 'sess_12345678',
            pagePath: '/pricing',
          },
        ],
      })
      expect(invalid.success).toBe(false)
    })

    it('strips PII keys and redacts embedded emails/phones from properties', () => {
      const cleaned = sanitizeEventProperties({
        subject: 'Mathematics',
        email: 'student@example.com',
        password: 'secret',
        rawPrompt: 'solve x+2=5',
        note: 'Contact student@example.com',
        callback: '+91 98765 43210',
      })

      expect(cleaned.subject).toBe('Mathematics')
      expect(cleaned.email).toBeUndefined()
      expect(cleaned.password).toBeUndefined()
      expect(cleaned.rawPrompt).toBeUndefined()
      expect(cleaned.note).toBeUndefined()
      expect(cleaned.callback).toBeUndefined()
    })

    it('deduplicates events by dedupeKey and enforces rate limiting', async () => {
      const payload = [
        {
          eventName: 'page_view' as const,
          eventVersion: 1,
          anonymousVisitorId: 'v_anon_12345678',
          sessionId: 's_sess_12345678',
          dedupeKey: 'pv:dedupe:1',
          pagePath: '/pricing?email=secret@test.com',
          utmSource: 'google',
          utmMedium: 'cpc',
          utmCampaign: 'jee_2027',
          properties: { plan: 'foundation' } as Record<string, string | number | boolean | null>,
        },
        {
          eventName: 'page_view' as const,
          eventVersion: 1,
          anonymousVisitorId: 'v_anon_12345678',
          sessionId: 's_sess_12345678',
          dedupeKey: 'pv:dedupe:1',
          pagePath: '/pricing',
          properties: {} as Record<string, string | number | boolean | null>,
        },
      ]

      const res = await ingestAnalyticsEvents(payload, {
        authenticatedUserId: null,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
        countryCode: 'in',
      })

      expect(res.accepted).toBe(1)
      expect(res.deduplicated).toBe(1)

      const snap = __getInMemoryAnalyticsSnapshot()
      expect(snap.events[0].pagePath).toBe('/pricing')
      expect(snap.events[0].countryCode).toBe('IN')
      expect(snap.events[0].deviceCategory).toBe('desktop')
      expect(snap.events[0].browserCategory).toBe('chrome')

      const key = 'test_client_rl'
      let allowedCount = 0
      for (let i = 0; i < 125; i += 1) {
        if (checkAnalyticsRateLimit(key, 1000 + i)) allowedCount += 1
      }
      expect(allowedCount).toBe(120)
    })

    it('reconciles anonymous visitor events & sessions to authenticated user safely', async () => {
      await ingestAnalyticsEvents(
        [
          {
            eventName: 'session_start',
            eventVersion: 1,
            anonymousVisitorId: 'v_guest_99887766',
            sessionId: 's_guest_99887766',
            pagePath: '/diagnostic',
            referrerDomain: 'google.com',
            properties: {},
          },
          {
            eventName: 'diagnostic_start',
            eventVersion: 1,
            anonymousVisitorId: 'v_guest_99887766',
            sessionId: 's_guest_99887766',
            pagePath: '/diagnostic',
            properties: { subject: 'math' },
          },
        ],
        { authenticatedUserId: null }
      )

      const reconciled = await reconcileAnonymousVisitor({
        anonymousVisitorId: 'v_guest_99887766',
        sessionId: 's_guest_99887766',
        authenticatedUserId: 'user_auth_123',
      })

      expect(reconciled.reconciledEvents).toBe(2)
      expect(reconciled.reconciledSessions).toBe(1)
      const snap = __getInMemoryAnalyticsSnapshot()
      expect(snap.events.every((e) => e.userId === 'user_auth_123')).toBe(true)
    })

    it('classifies user agents and traffic channels accurately', () => {
      expect(classifyUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/604.1')).toEqual({
        deviceCategory: 'mobile',
        browserCategory: 'safari',
      })
      expect(inferTrafficChannel('google', 'cpc', null)).toBe('campaign')
      expect(inferTrafficChannel(null, null, 'www.google.com')).toBe('search')
      expect(inferTrafficChannel(null, null, 'linkedin.com')).toBe('social')
      expect(inferTrafficChannel(null, null, null)).toBe('direct')
    })
  })

  describe('Phase 4-7: Learner Intelligence Engine & Tier Gating', () => {
    it('enforces server-side Free vs Paid gating on paidInsights', () => {
      const freeWorkspace = buildLearnerWorkspaceData({
        entitlements: [],
        isPaidCustomer: false,
        activeDomains: [],
        testsCompleted: 1,
        questionsAttempted: 10,
        accuracyPercent: 60,
        weakTopics: [
          {
            topicId: 'quadratics',
            topicLabel: 'Quadratics',
            subject: 'Mathematics',
            accuracyPercent: 45,
            attempts: 5,
            recommendedHref: '/dashboard/question-bank',
          },
        ],
      })

      expect(freeWorkspace.tier).toBe('free')
      expect(freeWorkspace.paidInsights).toBeNull()
      expect(freeWorkspace.lockedCapabilities.length).toBeGreaterThan(0)
      expect(freeWorkspace.recommendations[0].category).toBe('weak_topic')

      const paidWorkspace = buildLearnerWorkspaceData({
        entitlements: [
          {
            id: 'ent_1',
            userId: 'user_1',
            domain: 'assessment',
            productId: 'assessment_pro',
            isActive: true,
            attemptsRemaining: -1,
            validFrom: new Date().toISOString(),
            validUntil: new Date(Date.now() + 86_400_000).toISOString(),
          } as never,
        ],
        isPaidCustomer: true,
        activeDomains: ['assessment'],
        testsCompleted: 4,
        questionsAttempted: 80,
        accuracyPercent: 84,
        averagePaceSecondsPerQuestion: 32,
      })

      expect(paidWorkspace.tier).toBe('paid')
      expect(paidWorkspace.paidInsights).not.toBeNull()
      expect(paidWorkspace.paidInsights?.examReadinessPercent).toBeGreaterThan(0)
      expect(paidWorkspace.paidInsights?.averagePaceSecondsPerQuestion).toBe(32)
      expect(paidWorkspace.lockedCapabilities).toEqual([])
    })

    it('persists preferences, bookmarks, and revision notes in workspace storage', async () => {
      await upsertStudyPreferences('user_test_1', {
        classNumber: 12,
        boardCode: 'CBSE',
        examTarget: 'JEE Main',
        dailyTargetQuestions: 25,
        weeklyGoalMinutes: 300,
        onboardingCompleted: true,
      })
      await addLearnerBookmark('user_test_1', {
        itemType: 'question',
        itemId: 'q_101',
        title: 'Integration by Parts Formula',
        href: '/dashboard/question-bank',
        subjectCode: 'Mathematics',
      })
      await addRevisionNote('user_test_1', {
        title: 'Bayes Theorem',
        content: 'P(A|B) = P(B|A)P(A)/P(B)',
        subjectCode: 'Mathematics',
        nextReviewAt: new Date(Date.now() - 60_000).toISOString(),
      })

      const recs = generatePersonalizedRecommendations({
        isPaidCustomer: false,
        testsCompleted: 0,
        todayQuestionsAttempted: 0,
        dailyTargetQuestions: 25,
        weakTopics: [],
        dueRevisionNotesCount: 1,
        bookmarksCount: 1,
        classNumber: 12,
        examTarget: 'JEE Main',
      })
      expect(recs.some((r) => r.category === 'spaced_revision')).toBe(true)
      expect(recs.some((r) => r.category === 'incomplete_diagnostic')).toBe(true)

      const workspace = await loadLearnerWorkspaceFromDb('user_test_1', null)
      expect(workspace.preferences.classNumber).toBe(12)
      expect(workspace.bookmarks.length).toBe(1)
      expect(workspace.revisionNotes.length).toBe(1)
    })
  })

  describe('Phase 8 & 10: Admin Command Center Aggregations & Route Authorization', () => {
    it('computes 7-stage funnel, traffic attribution, date windows, and pagination accurately', async () => {
      const win = resolveDateWindow('7d')
      const nowIso = new Date().toISOString()

      const report = buildAdminIntelligenceReport({
        query: { range: '7d', userPage: 1, userPageSize: 1 },
        window: win,
        events: [
          {
            id: 'e1',
            eventName: 'page_view',
            eventVersion: 1,
            dedupeKey: null,
            anonymousVisitorId: 'v_1',
            sessionId: 's_1',
            userId: 'u_1',
            eventTimestamp: nowIso,
            pagePath: '/pricing',
            referrerDomain: 'google.com',
            utmSource: 'google',
            utmMedium: 'organic',
            utmCampaign: null,
            deviceCategory: 'desktop',
            browserCategory: 'chrome',
            countryCode: 'IN',
            properties: {},
            ingestedAt: nowIso,
          },
          {
            id: 'e2',
            eventName: 'diagnostic_start',
            eventVersion: 1,
            dedupeKey: null,
            anonymousVisitorId: 'v_1',
            sessionId: 's_1',
            userId: 'u_1',
            eventTimestamp: nowIso,
            pagePath: '/dashboard/diagnostic',
            referrerDomain: null,
            utmSource: null,
            utmMedium: null,
            utmCampaign: null,
            deviceCategory: 'desktop',
            browserCategory: 'chrome',
            countryCode: 'IN',
            properties: {},
            ingestedAt: nowIso,
          },
          {
            id: 'e3',
            eventName: 'page_view',
            eventVersion: 1,
            dedupeKey: null,
            anonymousVisitorId: 'v_2',
            sessionId: 's_2',
            userId: 'u_2',
            eventTimestamp: nowIso,
            pagePath: '/',
            referrerDomain: null,
            utmSource: null,
            utmMedium: null,
            utmCampaign: null,
            deviceCategory: 'mobile',
            browserCategory: 'safari',
            countryCode: 'IN',
            properties: {},
            ingestedAt: nowIso,
          },
        ],
        sessions: [
          {
            sessionId: 's_1',
            anonymousVisitorId: 'v_1',
            userId: 'u_1',
            landingPath: '/pricing',
            exitPath: '/dashboard/diagnostic',
            referrerDomain: 'google.com',
            utmSource: 'google',
            utmMedium: 'organic',
            utmCampaign: null,
            utmContent: null,
            utmTerm: null,
            deviceCategory: 'desktop',
            browserCategory: 'chrome',
            countryCode: 'IN',
            region: null,
            startedAt: nowIso,
            lastSeenAt: nowIso,
            pageViewsCount: 1,
            eventsCount: 2,
            engagementScore: 6,
            isEngaged: true,
          },
          {
            sessionId: 's_2',
            anonymousVisitorId: 'v_2',
            userId: 'u_2',
            landingPath: '/',
            exitPath: '/',
            referrerDomain: null,
            utmSource: null,
            utmMedium: null,
            utmCampaign: null,
            utmContent: null,
            utmTerm: null,
            deviceCategory: 'mobile',
            browserCategory: 'safari',
            countryCode: 'IN',
            region: null,
            startedAt: nowIso,
            lastSeenAt: nowIso,
            pageViewsCount: 1,
            eventsCount: 1,
            engagementScore: 1,
            isEngaged: false,
          },
        ],
        entitlements: [{ user_id: 'u_1', domain: 'assessment', status: 'active' }],
        orders: [{ user_id: 'u_1', amount_paise: 99900, status: 'paid', created_at: nowIso }],
      })

      expect(report.kpis.uniqueVisitors).toBe(2)
      expect(report.kpis.paidLearners).toBe(1)
      expect(report.kpis.verifiedRevenueRupees).toBe(999)
      expect(report.funnel.length).toBe(7)
      expect(report.userExplorer.total).toBe(2)
      expect(report.userExplorer.items.length).toBe(1)

      const fallbackReport = await getAdminIntelligenceReport({ range: '30d' })
      expect(fallbackReport.funnel.length).toBe(7)
    })

    it('enforces auth & admin role on API routes', async () => {
      // 1. Events POST accepts valid batch
      mockGetAuthUser.mockResolvedValue({ data: { user: null } })
      const { POST: eventsPost } = await import('@/app/api/analytics/events/route')
      const evReq = new NextRequest('http://localhost/api/analytics/events', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          events: [
            {
              eventName: 'page_view',
              anonymousVisitorId: 'v_route_12345678',
              sessionId: 's_route_12345678',
              pagePath: '/',
              properties: {},
            },
          ],
        }),
      })
      const evRes = await eventsPost(evReq)
      expect(evRes.status).toBe(202)
      const issuedCookie = evRes.cookies.get(VISITOR_SIG_COOKIE)?.value
      expect(issuedCookie).toBeTruthy()
      expect(await verifyVisitorToken(issuedCookie, 'v_route_12345678')).toBe(true)
      expect(await verifyVisitorToken(issuedCookie, 'v_other_visitor_99')).toBe(false)

      // 2. Reconcile POST rejects unauthenticated user (401)
      const { POST: reconcilePost } = await import('@/app/api/analytics/reconcile/route')
      const recReq = new NextRequest('http://localhost/api/analytics/reconcile', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ anonymousVisitorId: 'v_route_12345678' }),
      })
      const recRes = await reconcilePost(recReq)
      expect(recRes.status).toBe(401)

      // 2b. Reconcile POST rejects authenticated user WITHOUT valid signed visitor proof (403)
      mockGetAuthUser.mockResolvedValue({ data: { user: { id: 'auth_u_1', email: 'u@test.com' } } })
      const forgedRecReq = new NextRequest('http://localhost/api/analytics/reconcile', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ anonymousVisitorId: 'v_victim_87654321' }),
      })
      const forgedRes = await reconcilePost(forgedRecReq)
      expect(forgedRes.status).toBe(403)

      // 2c. Reconcile POST succeeds (200) ONLY with valid signed visitor token matching visitorId
      const validSig = await signVisitorId('v_route_12345678')
      const validRecReq = new NextRequest('http://localhost/api/analytics/reconcile', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          cookie: `${VISITOR_SIG_COOKIE}=${validSig}`,
        },
        body: JSON.stringify({ anonymousVisitorId: 'v_route_12345678' }),
      })
      const validRecRes = await reconcilePost(validRecReq)
      expect(validRecRes.status).toBe(200)

      // 3. Learner workspace GET rejects unauthenticated user (401)
      mockGetServerAccess.mockResolvedValue({
        user: null,
        roles: [],
        authorization: { allowed: false, status: 401, reason: 'Unauthorized' },
      })
      const { GET: workspaceGet } = await import('@/app/api/dashboard/workspace/route')
      const wsRes = await workspaceGet()
      expect(wsRes.status).toBe(401)

      // 4. Admin intelligence GET rejects non-admin learner (403) and allows admin (200)
      mockGetServerAccess.mockResolvedValueOnce({
        user: { id: 'learner_1', email: 'l@test.com' },
        roles: ['learner'],
        authorization: { allowed: false, status: 403, reason: 'Forbidden' },
      })
      const { GET: adminGet } = await import('@/app/api/admin/intelligence/route')
      const forbiddenRes = await adminGet(new NextRequest('http://localhost/api/admin/intelligence?range=7d'))
      expect(forbiddenRes.status).toBe(403)

      mockGetServerAccess.mockResolvedValueOnce({
        user: { id: 'admin_1', email: 'admin@test.com' },
        roles: ['admin'],
        authorization: { allowed: true, status: 200 },
      })
      const adminOkRes = await adminGet(new NextRequest('http://localhost/api/admin/intelligence?range=7d'))
      expect(adminOkRes.status).toBe(200)
    })
  })
})
