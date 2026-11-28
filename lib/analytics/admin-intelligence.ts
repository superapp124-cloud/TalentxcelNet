import { createServiceRoleClient } from '@/lib/supabase/admin'
import {
  __getInMemoryAnalyticsSnapshot,
  inferTrafficChannel,
  type StoredAnalyticsEvent,
  type VisitorSessionRecord,
} from '@/lib/analytics/visitor-intelligence'

export type DateRangePreset = 'today' | 'yesterday' | '7d' | '30d' | '90d' | 'custom'

export interface AdminIntelligenceQuery {
  range: DateRangePreset
  from?: string | null
  to?: string | null
  userPage?: number
  userPageSize?: number
  search?: string | null
}

export interface FunnelStageMetric {
  stage: string
  label: string
  count: number
  conversionFromPreviousPercent: number | null
  dropOffPercent: number | null
}

export interface AdminIntelligenceReport {
  range: {
    preset: DateRangePreset
    fromIso: string
    toIso: string
    previousFromIso: string
    previousToIso: string
  }
  kpis: {
    totalVisitors: number
    uniqueVisitors: number
    sessions: number
    newVisitors: number
    returningVisitors: number
    registrations: number
    dau: number
    wau: number
    mau: number
    activeLearners: number
    paidLearners: number
    visitorToRegRate: number
    regToActiveRate: number
    freeToPaidRate: number
    verifiedRevenueRupees: number
  }
  previousKpis: {
    uniqueVisitors: number
    sessions: number
    registrations: number
    paidLearners: number
    verifiedRevenueRupees: number
  }
  traffic: {
    channels: Array<{ channel: string; sessions: number; sharePercent: number }>
    utmCampaigns: Array<{ campaign: string; source: string; medium: string; sessions: number }>
    landingPages: Array<{ path: string; sessions: number }>
    exitPages: Array<{ path: string; sessions: number }>
    devices: Array<{ device: string; sessions: number }>
    browsers: Array<{ browser: string; sessions: number }>
    countries: Array<{ countryCode: string; sessions: number }>
  }
  funnel: FunnelStageMetric[]
  content: {
    topPages: Array<{ path: string; views: number }>
    diagnosticsStarted: number
    diagnosticsCompleted: number
    lessonsStarted: number
    lessonsCompleted: number
    skillLabsStarted: number
    aiTutorOpens: number
    aiTutorUsageEvents: number
  }
  freeVsPaid: {
    freeUsersCount: number
    paidUsersCount: number
    freeAvgEventsPerUser: number
    paidAvgEventsPerUser: number
    freeAvgTestsPerUser: number
    paidAvgTestsPerUser: number
  }
  retention: {
    returningSessionRatePercent: number
    multiDayLearnersCount: number
    weeklyActiveCohorts: Array<{ weekLabel: string; activeUsers: number }>
  }
  userExplorer: {
    page: number
    pageSize: number
    total: number
    items: Array<{
      userId: string
      displayLabel: string
      tier: 'free' | 'paid'
      activeDomains: string[]
      eventsCount: number
      testsCompleted: number
      lastActiveAt: string | null
    }>
  }
  generatedAt: string
}

function getDbClientOrNull() {
  if (process.env.NODE_ENV === 'test' && !process.env.TEST_USE_LIVE_DB) {
    return null
  }
  try {
    return createServiceRoleClient()
  } catch {
    return null
  }
}

export function resolveDateWindow(
  preset: DateRangePreset,
  from?: string | null,
  to?: string | null,
  now = new Date()
): { fromIso: string; toIso: string; previousFromIso: string; previousToIso: string } {
  const end = to && !Number.isNaN(Date.parse(to)) ? new Date(to) : new Date(now)
  let start: Date

  if (preset === 'custom' && from && !Number.isNaN(Date.parse(from))) {
    start = new Date(from)
  } else if (preset === 'today') {
    start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate(), 0, 0, 0))
  } else if (preset === 'yesterday') {
    const y = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() - 1, 0, 0, 0))
    const yEnd = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() - 1, 23, 59, 59, 999))
    const prevStart = new Date(y.getTime() - 24 * 60 * 60 * 1000)
    const prevEnd = new Date(y.getTime() - 1)
    return {
      fromIso: y.toISOString(),
      toIso: yEnd.toISOString(),
      previousFromIso: prevStart.toISOString(),
      previousToIso: prevEnd.toISOString(),
    }
  } else {
    const days = preset === '90d' ? 90 : preset === '30d' ? 30 : 7
    start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000)
  }

  const spanMs = Math.max(60_000, end.getTime() - start.getTime())
  const prevEnd = new Date(start.getTime() - 1)
  const prevStart = new Date(prevEnd.getTime() - spanMs)

  return {
    fromIso: start.toISOString(),
    toIso: end.toISOString(),
    previousFromIso: prevStart.toISOString(),
    previousToIso: prevEnd.toISOString(),
  }
}

function pct(part: number, whole: number): number {
  if (whole <= 0) return 0
  return Math.round((part / whole) * 1000) / 10
}

function countBy<T>(items: T[], keyFn: (item: T) => string): Array<{ key: string; count: number }> {
  const map = new Map<string, number>()
  for (const item of items) {
    const k = keyFn(item)
    map.set(k, (map.get(k) ?? 0) + 1)
  }
  return Array.from(map.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
}

export function buildAdminIntelligenceReport(params: {
  query: AdminIntelligenceQuery
  window: { fromIso: string; toIso: string; previousFromIso: string; previousToIso: string }
  events: StoredAnalyticsEvent[]
  sessions: VisitorSessionRecord[]
  allSessionsForVisitorHistory?: VisitorSessionRecord[]
  profiles?: Array<{ id: string; full_name?: string | null; created_at?: string }>
  entitlements?: Array<{ user_id: string; domain: string; status: string }>
  orders?: Array<{ user_id?: string | null; amount_rupees?: number | null; amount_paise?: number | null; status?: string | null; created_at?: string }>
  assessmentAttempts?: Array<{ user_id?: string | null; created_at?: string }>
  aiUsageEvents?: Array<{ user_id?: string | null; created_at?: string }>
}): AdminIntelligenceReport {
  const { query, window, events, sessions } = params
  const page = Math.max(1, query.userPage ?? 1)
  const pageSize = Math.min(50, Math.max(1, query.userPageSize ?? 15))
  const search = (query.search ?? '').trim().toLowerCase()

  const inCurrent = (ts?: string | null) =>
    Boolean(ts && ts >= window.fromIso && ts <= window.toIso)
  const inPrevious = (ts?: string | null) =>
    Boolean(ts && ts >= window.previousFromIso && ts <= window.previousToIso)

  const curEvents = events.filter((e) => inCurrent(e.eventTimestamp))
  const prevEvents = events.filter((e) => inPrevious(e.eventTimestamp))

  const curSessions = sessions.filter((s) => inCurrent(s.startedAt))
  const prevSessions = sessions.filter((s) => inPrevious(s.startedAt))

  const uniqueVisitorSet = new Set(curEvents.map((e) => e.anonymousVisitorId))
  for (const s of curSessions) uniqueVisitorSet.add(s.anonymousVisitorId)

  const prevUniqueVisitorSet = new Set(prevEvents.map((e) => e.anonymousVisitorId))
  for (const s of prevSessions) prevUniqueVisitorSet.add(s.anonymousVisitorId)

  const historySessions = params.allSessionsForVisitorHistory ?? sessions
  const priorVisitorIds = new Set(
    historySessions
      .filter((s) => s.startedAt < window.fromIso)
      .map((s) => s.anonymousVisitorId)
  )
  let returningVisitors = 0
  let newVisitors = 0
  for (const vid of uniqueVisitorSet) {
    if (priorVisitorIds.has(vid)) returningVisitors += 1
    else newVisitors += 1
  }

  const profiles = params.profiles ?? []
  const curRegistrations = profiles.filter((p) => inCurrent(p.created_at)).length ||
    curEvents.filter((e) => e.eventName === 'signup_complete').length
  const prevRegistrations = profiles.filter((p) => inPrevious(p.created_at)).length ||
    prevEvents.filter((e) => e.eventName === 'signup_complete').length

  const entitlements = (params.entitlements ?? []).filter((e) => e.status === 'active')
  const paidUserIds = new Set(entitlements.map((e) => e.user_id))

  const nowMs = Date.parse(window.toIso)
  const d1Iso = new Date(nowMs - 24 * 60 * 60 * 1000).toISOString()
  const d7Iso = new Date(nowMs - 7 * 24 * 60 * 60 * 1000).toISOString()
  const d30Iso = new Date(nowMs - 30 * 24 * 60 * 60 * 1000).toISOString()

  const dauUsers = new Set(events.filter((e) => e.userId && e.eventTimestamp >= d1Iso && e.eventTimestamp <= window.toIso).map((e) => e.userId as string))
  const wauUsers = new Set(events.filter((e) => e.userId && e.eventTimestamp >= d7Iso && e.eventTimestamp <= window.toIso).map((e) => e.userId as string))
  const mauUsers = new Set(events.filter((e) => e.userId && e.eventTimestamp >= d30Iso && e.eventTimestamp <= window.toIso).map((e) => e.userId as string))

  const learningEventNames = new Set([
    'question_attempt',
    'diagnostic_start',
    'diagnostic_complete',
    'lesson_start',
    'lesson_complete',
    'project_lab_start',
    'project_lab_complete',
    'ai_tutor_open',
  ])

  const activeLearnerIds = new Set(
    curEvents
      .filter((e) => e.userId && learningEventNames.has(e.eventName))
      .map((e) => e.userId as string)
  )
  for (const a of params.assessmentAttempts ?? []) {
    if (a.user_id && inCurrent(a.created_at)) activeLearnerIds.add(a.user_id)
  }

  const orders = params.orders ?? []
  const paidStatuses = new Set(['paid', 'captured', 'completed', 'active'])
  const curPaidOrders = orders.filter(
    (o) => inCurrent(o.created_at) && paidStatuses.has(String(o.status ?? '').toLowerCase())
  )
  const prevPaidOrders = orders.filter(
    (o) => inPrevious(o.created_at) && paidStatuses.has(String(o.status ?? '').toLowerCase())
  )

  const sumRevenue = (list: typeof orders) =>
    Math.round(
      list.reduce((acc, o) => {
        if (typeof o.amount_rupees === 'number') return acc + o.amount_rupees
        if (typeof o.amount_paise === 'number') return acc + o.amount_paise / 100
        return acc
      }, 0) * 100
    ) / 100

  const verifiedRevenueRupees = sumRevenue(curPaidOrders)
  const prevRevenueRupees = sumRevenue(prevPaidOrders)

  const totalVisitors = uniqueVisitorSet.size
  const uniqueVisitors = uniqueVisitorSet.size
  const paidLearners = paidUserIds.size

  // Traffic intelligence
  const totalSessCount = curSessions.length
  const channelCounts = countBy(curSessions, (s) =>
    inferTrafficChannel(s.utmSource, s.utmMedium, s.referrerDomain)
  )
  const channels = channelCounts.map((c) => ({
    channel: c.key,
    sessions: c.count,
    sharePercent: pct(c.count, totalSessCount),
  }))

  const campaignMap = new Map<string, { campaign: string; source: string; medium: string; sessions: number }>()
  for (const s of curSessions) {
    if (!s.utmCampaign && !s.utmSource) continue
    const campaign = s.utmCampaign || '(not set)'
    const source = s.utmSource || '(direct)'
    const medium = s.utmMedium || '(none)'
    const key = `${campaign}|${source}|${medium}`
    const existing = campaignMap.get(key) ?? { campaign, source, medium, sessions: 0 }
    existing.sessions += 1
    campaignMap.set(key, existing)
  }

  const landingPages = countBy(curSessions, (s) => s.landingPath || '/')
    .slice(0, 10)
    .map((x) => ({ path: x.key, sessions: x.count }))
  const exitPages = countBy(curSessions, (s) => s.exitPath || '/')
    .slice(0, 10)
    .map((x) => ({ path: x.key, sessions: x.count }))
  const devices = countBy(curSessions, (s) => s.deviceCategory || 'unknown').map((x) => ({
    device: x.key,
    sessions: x.count,
  }))
  const browsers = countBy(curSessions, (s) => s.browserCategory || 'other').map((x) => ({
    browser: x.key,
    sessions: x.count,
  }))
  const countries = countBy(curSessions, (s) => s.countryCode || 'UNKNOWN')
    .slice(0, 10)
    .map((x) => ({ countryCode: x.key, sessions: x.count }))

  // 7-stage funnel
  const engagedVisitors = new Set(
    curSessions.filter((s) => s.engagementScore >= 3 || s.eventsCount >= 2).map((s) => s.anonymousVisitorId)
  ).size
  const registeredUsersCount = Math.max(
    curRegistrations,
    new Set(curEvents.filter((e) => e.userId).map((e) => e.userId as string)).size
  )
  const onboardedUsers = new Set(
    curEvents.filter((e) => e.userId && (e.eventName === 'learning_plan_start' || e.eventName === 'diagnostic_start')).map((e) => e.userId as string)
  ).size
  const firstLearningUsers = activeLearnerIds.size
  const activeMultiEventLearners = Array.from(activeLearnerIds).filter((uid) => {
    const count = curEvents.filter((e) => e.userId === uid && learningEventNames.has(e.eventName)).length
    return count >= 2
  }).length
  const paidConvertedCount = Math.max(
    curPaidOrders.length,
    Array.from(activeLearnerIds).filter((uid) => paidUserIds.has(uid)).length
  )

  const rawStages = [
    { stage: 'anonymous_visitor', label: 'Anonymous Visitor', count: uniqueVisitors },
    { stage: 'engaged_visitor', label: 'Engaged Visitor', count: engagedVisitors },
    { stage: 'registration', label: 'Registration', count: registeredUsersCount },
    { stage: 'onboarding_completed', label: 'Onboarding Completed', count: onboardedUsers },
    { stage: 'first_learning_activity', label: 'First Learning Activity', count: firstLearningUsers },
    { stage: 'active_learner', label: 'Active Learner', count: activeMultiEventLearners },
    { stage: 'paid_conversion', label: 'Paid Conversion', count: paidConvertedCount },
  ]

  const funnel: FunnelStageMetric[] = rawStages.map((s, idx) => {
    if (idx === 0) {
      return { ...s, conversionFromPreviousPercent: null, dropOffPercent: null }
    }
    const prevCount = rawStages[idx - 1].count
    const conv = prevCount > 0 ? Math.min(100, pct(s.count, prevCount)) : 0
    return {
      ...s,
      conversionFromPreviousPercent: conv,
      dropOffPercent: prevCount > 0 ? Math.max(0, Math.round((100 - conv) * 10) / 10) : 0,
    }
  })

  // Content intelligence
  const topPages = countBy(
    curEvents.filter((e) => e.eventName === 'page_view'),
    (e) => e.pagePath
  )
    .slice(0, 10)
    .map((x) => ({ path: x.key, views: x.count }))

  const countEvent = (name: StoredAnalyticsEvent['eventName']) =>
    curEvents.filter((e) => e.eventName === name).length

  // Free vs Paid comparison
  const totalUsersCount = Math.max(profiles.length, new Set(events.filter((e) => e.userId).map((e) => e.userId as string)).size)
  const freeUsersCount = Math.max(0, totalUsersCount - paidLearners)
  const freeEvents = curEvents.filter((e) => e.userId && !paidUserIds.has(e.userId)).length
  const paidEvents = curEvents.filter((e) => e.userId && paidUserIds.has(e.userId)).length
  const freeTests = (params.assessmentAttempts ?? []).filter(
    (a) => a.user_id && !paidUserIds.has(a.user_id) && inCurrent(a.created_at)
  ).length
  const paidTests = (params.assessmentAttempts ?? []).filter(
    (a) => a.user_id && paidUserIds.has(a.user_id) && inCurrent(a.created_at)
  ).length

  // Retention / multi-day learners
  const userDays = new Map<string, Set<string>>()
  for (const e of curEvents) {
    if (!e.userId) continue
    const day = e.eventTimestamp.slice(0, 10)
    const set = userDays.get(e.userId) ?? new Set<string>()
    set.add(day)
    userDays.set(e.userId, set)
  }
  const multiDayLearnersCount = Array.from(userDays.values()).filter((s) => s.size >= 2).length

  // User explorer
  const userIdsSet = new Set<string>()
  for (const p of profiles) userIdsSet.add(p.id)
  for (const e of events) if (e.userId) userIdsSet.add(e.userId)
  for (const uid of paidUserIds) userIdsSet.add(uid)

  const profileMap = new Map(profiles.map((p) => [p.id, p]))
  const allUsers = Array.from(userIdsSet).map((uid) => {
    const prof = profileMap.get(uid)
    const userEvts = events.filter((e) => e.userId === uid)
    const userTests = (params.assessmentAttempts ?? []).filter((a) => a.user_id === uid).length
    const userDomains = entitlements.filter((e) => e.user_id === uid).map((e) => e.domain)
    const lastEvt = userEvts.reduce<string | null>(
      (latest, e) => (!latest || e.eventTimestamp > latest ? e.eventTimestamp : latest),
      null
    )
    const displayLabel = prof?.full_name || `Learner ${uid.slice(0, 8)}`
    return {
      userId: uid,
      displayLabel,
      tier: (paidUserIds.has(uid) ? 'paid' : 'free') as 'free' | 'paid',
      activeDomains: Array.from(new Set(userDomains)),
      eventsCount: userEvts.length,
      testsCompleted: userTests,
      lastActiveAt: lastEvt,
    }
  })

  const filteredUsers = search
    ? allUsers.filter(
        (u) =>
          u.userId.toLowerCase().includes(search) ||
          u.displayLabel.toLowerCase().includes(search) ||
          u.tier.includes(search)
      )
    : allUsers

  filteredUsers.sort((a, b) => b.eventsCount - a.eventsCount)
  const startIdx = (page - 1) * pageSize
  const pagedUsers = filteredUsers.slice(startIdx, startIdx + pageSize)

  return {
    range: {
      preset: query.range,
      fromIso: window.fromIso,
      toIso: window.toIso,
      previousFromIso: window.previousFromIso,
      previousToIso: window.previousToIso,
    },
    kpis: {
      totalVisitors,
      uniqueVisitors,
      sessions: totalSessCount,
      newVisitors,
      returningVisitors,
      registrations: curRegistrations,
      dau: dauUsers.size,
      wau: wauUsers.size,
      mau: mauUsers.size,
      activeLearners: activeLearnerIds.size,
      paidLearners,
      visitorToRegRate: pct(curRegistrations, uniqueVisitors),
      regToActiveRate: pct(activeLearnerIds.size, Math.max(curRegistrations, registeredUsersCount)),
      freeToPaidRate: pct(paidLearners, Math.max(totalUsersCount, paidLearners)),
      verifiedRevenueRupees,
    },
    previousKpis: {
      uniqueVisitors: prevUniqueVisitorSet.size,
      sessions: prevSessions.length,
      registrations: prevRegistrations,
      paidLearners: prevPaidOrders.length,
      verifiedRevenueRupees: prevRevenueRupees,
    },
    traffic: {
      channels,
      utmCampaigns: Array.from(campaignMap.values()).sort((a, b) => b.sessions - a.sessions).slice(0, 10),
      landingPages,
      exitPages,
      devices,
      browsers,
      countries,
    },
    funnel,
    content: {
      topPages,
      diagnosticsStarted: countEvent('diagnostic_start'),
      diagnosticsCompleted: countEvent('diagnostic_complete'),
      lessonsStarted: countEvent('lesson_start'),
      lessonsCompleted: countEvent('lesson_complete'),
      skillLabsStarted: countEvent('project_lab_start'),
      aiTutorOpens: countEvent('ai_tutor_open'),
      aiTutorUsageEvents:
        countEvent('ai_tutor_usage_metadata') +
        (params.aiUsageEvents ?? []).filter((a) => inCurrent(a.created_at)).length,
    },
    freeVsPaid: {
      freeUsersCount,
      paidUsersCount: paidLearners,
      freeAvgEventsPerUser: freeUsersCount > 0 ? Math.round((freeEvents / freeUsersCount) * 10) / 10 : 0,
      paidAvgEventsPerUser: paidLearners > 0 ? Math.round((paidEvents / paidLearners) * 10) / 10 : 0,
      freeAvgTestsPerUser: freeUsersCount > 0 ? Math.round((freeTests / freeUsersCount) * 10) / 10 : 0,
      paidAvgTestsPerUser: paidLearners > 0 ? Math.round((paidTests / paidLearners) * 10) / 10 : 0,
    },
    retention: {
      returningSessionRatePercent: pct(returningVisitors, uniqueVisitors),
      multiDayLearnersCount,
      weeklyActiveCohorts: [
        { weekLabel: 'Last 24h (DAU)', activeUsers: dauUsers.size },
        { weekLabel: 'Last 7d (WAU)', activeUsers: wauUsers.size },
        { weekLabel: 'Last 30d (MAU)', activeUsers: mauUsers.size },
      ],
    },
    userExplorer: {
      page,
      pageSize,
      total: filteredUsers.length,
      items: pagedUsers,
    },
    generatedAt: new Date().toISOString(),
  }
}

export async function getAdminIntelligenceReport(
  query: AdminIntelligenceQuery
): Promise<AdminIntelligenceReport> {
  const window = resolveDateWindow(query.range, query.from, query.to)
  const db = getDbClientOrNull()

  if (!db) {
    const snap = __getInMemoryAnalyticsSnapshot()
    return buildAdminIntelligenceReport({
      query,
      window,
      events: snap.events,
      sessions: snap.sessions,
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = db as any
  const { data: rpc, error: rpcError } = await client.rpc('get_admin_intelligence_summary', {
    p_from: window.fromIso,
    p_to: window.toIso,
    p_prev_from: window.previousFromIso,
    p_prev_to: window.previousToIso,
    p_user_page: Math.max(1, query.userPage ?? 1),
    p_user_page_size: Math.min(50, Math.max(1, query.userPageSize ?? 15)),
    p_search: query.search ?? null,
  })

  if (rpcError || !rpc) {
    throw new Error(
      `[Admin Intelligence] SQL aggregation failed: ${rpcError?.message || 'Empty RPC response'}`
    )
  }

  const k = rpc.kpis ?? {}
  const pk = rpc.previousKpis ?? {}
  const fc = rpc.funnelCounts ?? {}
  const totalSess = Number(k.sessions ?? 0)
  const uniqueVisitors = Number(k.uniqueVisitors ?? 0)
  const registrations = Number(k.registrations ?? 0)
  const activeLearners = Number(k.activeLearners ?? 0)
  const paidLearners = Number(k.paidLearners ?? 0)
  const totalUsers = Math.max(Number(k.totalProfiles ?? 0), paidLearners)

  const rawStages = [
    { stage: 'anonymous_visitor', label: 'Anonymous Visitor', count: Number(fc.anonymousVisitor ?? 0) },
    { stage: 'engaged_visitor', label: 'Engaged Visitor', count: Number(fc.engagedVisitor ?? 0) },
    { stage: 'registration', label: 'Registration', count: Number(fc.registration ?? 0) },
    { stage: 'onboarding_completed', label: 'Onboarding Completed', count: Number(fc.onboardingCompleted ?? 0) },
    { stage: 'first_learning_activity', label: 'First Learning Activity', count: Number(fc.firstLearningActivity ?? 0) },
    { stage: 'active_learner', label: 'Active Learner', count: Number(fc.activeLearner ?? 0) },
    { stage: 'paid_conversion', label: 'Paid Conversion', count: Number(fc.paidConversion ?? 0) },
  ]

  const funnel: FunnelStageMetric[] = rawStages.map((s, idx) => {
    if (idx === 0) return { ...s, conversionFromPreviousPercent: null, dropOffPercent: null }
    const prevCount = rawStages[idx - 1].count
    const conv = prevCount > 0 ? Math.min(100, pct(s.count, prevCount)) : 0
    return {
      ...s,
      conversionFromPreviousPercent: conv,
      dropOffPercent: prevCount > 0 ? Math.max(0, Math.round((100 - conv) * 10) / 10) : 0,
    }
  })

  const channels = ((rpc.traffic?.channels ?? []) as Array<{ channel: string; sessions: number }>).map(
    (c) => ({
      channel: c.channel,
      sessions: c.sessions,
      sharePercent: pct(c.sessions, totalSess),
    })
  )

  return {
    range: {
      preset: query.range,
      fromIso: window.fromIso,
      toIso: window.toIso,
      previousFromIso: window.previousFromIso,
      previousToIso: window.previousToIso,
    },
    kpis: {
      totalVisitors: uniqueVisitors,
      uniqueVisitors,
      sessions: totalSess,
      newVisitors: Number(k.newVisitors ?? 0),
      returningVisitors: Number(k.returningVisitors ?? 0),
      registrations,
      dau: Number(k.dau ?? 0),
      wau: Number(k.wau ?? 0),
      mau: Number(k.mau ?? 0),
      activeLearners,
      paidLearners,
      visitorToRegRate: pct(registrations, uniqueVisitors),
      regToActiveRate: pct(activeLearners, Math.max(registrations, Number(fc.registration ?? 0))),
      freeToPaidRate: pct(paidLearners, totalUsers),
      verifiedRevenueRupees: Number(k.verifiedRevenueRupees ?? 0),
    },
    previousKpis: {
      uniqueVisitors: Number(pk.uniqueVisitors ?? 0),
      sessions: Number(pk.sessions ?? 0),
      registrations: Number(pk.registrations ?? 0),
      paidLearners: Number(pk.paidLearners ?? 0),
      verifiedRevenueRupees: Number(pk.verifiedRevenueRupees ?? 0),
    },
    traffic: {
      channels,
      utmCampaigns: rpc.traffic?.utmCampaigns ?? [],
      landingPages: rpc.traffic?.landingPages ?? [],
      exitPages: rpc.traffic?.exitPages ?? [],
      devices: rpc.traffic?.devices ?? [],
      browsers: rpc.traffic?.browsers ?? [],
      countries: rpc.traffic?.countries ?? [],
    },
    funnel,
    content: rpc.content ?? {
      topPages: [],
      diagnosticsStarted: 0,
      diagnosticsCompleted: 0,
      lessonsStarted: 0,
      lessonsCompleted: 0,
      skillLabsStarted: 0,
      aiTutorOpens: 0,
      aiTutorUsageEvents: 0,
    },
    freeVsPaid: rpc.freeVsPaid ?? {
      freeUsersCount: 0,
      paidUsersCount: 0,
      freeAvgEventsPerUser: 0,
      paidAvgEventsPerUser: 0,
      freeAvgTestsPerUser: 0,
      paidAvgTestsPerUser: 0,
    },
    retention: {
      returningSessionRatePercent: pct(Number(k.returningVisitors ?? 0), uniqueVisitors),
      multiDayLearnersCount: Number(rpc.multiDayLearnersCount ?? 0),
      weeklyActiveCohorts: [
        { weekLabel: 'Last 24h (DAU)', activeUsers: Number(k.dau ?? 0) },
        { weekLabel: 'Last 7d (WAU)', activeUsers: Number(k.wau ?? 0) },
        { weekLabel: 'Last 30d (MAU)', activeUsers: Number(k.mau ?? 0) },
      ],
    },
    userExplorer: rpc.userExplorer ?? {
      page: Math.max(1, query.userPage ?? 1),
      pageSize: Math.min(50, Math.max(1, query.userPageSize ?? 15)),
      total: 0,
      items: [],
    },
    generatedAt: new Date().toISOString(),
  }
}
