import { z } from 'zod'
import { createServiceRoleClient } from '@/lib/supabase/admin'

export const EVENT_SCHEMA_VERSION = 1

export const ANALYTICS_EVENT_NAMES = [
  'page_view',
  'session_start',
  'content_view',
  'question_attempt',
  'diagnostic_start',
  'diagnostic_complete',
  'lesson_start',
  'lesson_complete',
  'ai_tutor_open',
  'ai_tutor_usage_metadata',
  'project_lab_start',
  'project_lab_complete',
  'pricing_view',
  'plan_select',
  'checkout_start',
  'purchase_complete',
  'signup_start',
  'signup_complete',
  'login',
  'bookmark_add',
  'revision_note_create',
  'learning_plan_start',
  'learning_plan_complete',
  'recommendation_click',
] as const

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number]

export type DeviceCategory = 'desktop' | 'mobile' | 'tablet' | 'bot' | 'unknown'
export type BrowserCategory = 'chrome' | 'safari' | 'firefox' | 'edge' | 'other'

export const analyticsEventInputSchema = z.object({
  eventName: z.enum(ANALYTICS_EVENT_NAMES),
  eventVersion: z.number().int().min(1).max(10).default(EVENT_SCHEMA_VERSION),
  anonymousVisitorId: z.string().min(8).max(128).regex(/^[a-zA-Z0-9_-]+$/),
  sessionId: z.string().min(8).max(128).regex(/^[a-zA-Z0-9_-]+$/),
  dedupeKey: z.string().min(4).max(180).optional(),
  eventTimestamp: z.string().datetime().optional(),
  pagePath: z.string().min(1).max(512),
  referrerDomain: z.string().max(255).nullable().optional(),
  utmSource: z.string().max(120).nullable().optional(),
  utmMedium: z.string().max(120).nullable().optional(),
  utmCampaign: z.string().max(120).nullable().optional(),
  utmContent: z.string().max(120).nullable().optional(),
  utmTerm: z.string().max(120).nullable().optional(),
  properties: z
    .record(z.string().max(64), z.union([z.string().max(240), z.number(), z.boolean(), z.null()]))
    .refine((obj) => Object.keys(obj).length <= 20, {
      message: 'properties cannot exceed 20 keys',
    })
    .default({}),
})

export const analyticsBatchSchema = z.object({
  events: z.array(analyticsEventInputSchema).min(1).max(25),
})

export type AnalyticsEventInput = z.infer<typeof analyticsEventInputSchema>

export interface StoredAnalyticsEvent {
  id: string
  eventName: AnalyticsEventName
  eventVersion: number
  dedupeKey: string | null
  anonymousVisitorId: string
  sessionId: string
  userId: string | null
  eventTimestamp: string
  pagePath: string
  referrerDomain: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  deviceCategory: DeviceCategory
  browserCategory: BrowserCategory
  countryCode: string | null
  properties: Record<string, string | number | boolean | null>
  ingestedAt: string
}

export interface VisitorSessionRecord {
  sessionId: string
  anonymousVisitorId: string
  userId: string | null
  landingPath: string
  exitPath: string
  referrerDomain: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  deviceCategory: DeviceCategory
  browserCategory: BrowserCategory
  countryCode: string | null
  region: string | null
  startedAt: string
  lastSeenAt: string
  pageViewsCount: number
  eventsCount: number
  isEngaged: boolean
  engagementScore: number
}

export interface VisitorAttributionRecord {
  anonymousVisitorId: string
  userId: string | null
  firstTouchSource: string
  firstTouchMedium: string
  firstTouchCampaign: string | null
  firstTouchContent: string | null
  firstTouchTerm: string | null
  firstTouchReferrer: string | null
  firstTouchLandingPath: string
  lastTouchSource: string
  lastTouchMedium: string
  lastTouchCampaign: string | null
  lastTouchContent: string | null
  lastTouchTerm: string | null
  lastTouchReferrer: string | null
  lastTouchLandingPath: string
  firstSeenAt: string
  lastSeenAt: string
  reconciledAt: string | null
}

// Strict PII/sensitive-field blocklist (never store passwords, full AI prompts, emails, phones, private answers)
const FORBIDDEN_PROPERTY_KEY_RE =
  /password|passwd|secret|token|prompt|answer|email|phone|mobile|address|aadhaar|pan|ssn|card|cvv|signature/i
const EMAIL_VALUE_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
const PHONE_VALUE_RE = /(?:\+?\d[\d\s().-]{7,}\d)/

export function sanitizeEventProperties(
  rawProps: Record<string, string | number | boolean | null> | undefined
): Record<string, string | number | boolean | null> {
  if (!rawProps) return {}
  const clean: Record<string, string | number | boolean | null> = {}
  for (const [key, val] of Object.entries(rawProps)) {
    if (FORBIDDEN_PROPERTY_KEY_RE.test(key)) continue
    if (typeof val === 'string' && (EMAIL_VALUE_RE.test(val) || PHONE_VALUE_RE.test(val))) continue
    clean[key] = val
  }
  return clean
}

export function sanitizePagePath(rawPath: string): string {
  const withoutQuerySecrets = rawPath.split('#')[0]?.split('?')[0] || '/'
  return withoutQuerySecrets.startsWith('/') ? withoutQuerySecrets.slice(0, 512) : `/${withoutQuerySecrets.slice(0, 511)}`
}

export function normalizeReferrerDomain(referrer: string | null | undefined): string | null {
  if (!referrer) return null
  const trimmed = referrer.trim()
  if (!trimmed) return null
  try {
    const host = trimmed.includes('://') ? new URL(trimmed).hostname : trimmed.split('/')[0]
    return host ? host.toLowerCase().slice(0, 255) : null
  } catch {
    return null
  }
}

export function classifyUserAgent(ua: string | null | undefined): {
  deviceCategory: DeviceCategory
  browserCategory: BrowserCategory
} {
  const s = (ua || '').toLowerCase()
  if (!s) return { deviceCategory: 'unknown', browserCategory: 'other' }

  let deviceCategory: DeviceCategory = 'desktop'
  if (/bot|crawler|spider|slurp|googlebot|bingbot|gptbot/.test(s)) {
    deviceCategory = 'bot'
  } else if (/ipad|tablet|playbook|silk/.test(s)) {
    deviceCategory = 'tablet'
  } else if (/mobile|iphone|ipod|android.*mobile|windows phone/.test(s)) {
    deviceCategory = 'mobile'
  }

  let browserCategory: BrowserCategory = 'other'
  if (s.includes('edg/')) browserCategory = 'edge'
  else if (s.includes('chrome/') && !s.includes('edg/')) browserCategory = 'chrome'
  else if (s.includes('safari/') && !s.includes('chrome/')) browserCategory = 'safari'
  else if (s.includes('firefox/')) browserCategory = 'firefox'

  return { deviceCategory, browserCategory }
}

export function inferTrafficChannel(
  utmSource: string | null | undefined,
  utmMedium: string | null | undefined,
  referrerDomain: string | null | undefined
): string {
  const source = (utmSource || '').toLowerCase()
  const medium = (utmMedium || '').toLowerCase()
  const ref = (referrerDomain || '').toLowerCase()

  if (medium === 'cpc' || medium === 'ppc' || medium === 'paid' || source.includes('ads')) {
    return 'campaign'
  }
  if (
    medium === 'social' ||
    /instagram|facebook|linkedin|twitter|x\.com|t\.co|youtube|whatsapp/.test(source) ||
    /instagram\.com|facebook\.com|linkedin\.com|twitter\.com|x\.com|youtube\.com/.test(ref)
  ) {
    return 'social'
  }
  if (
    medium === 'organic' ||
    /google|bing|duckduckgo|yahoo|yandex/.test(source) ||
    /google\.|bing\.com|duckduckgo\.com|search\.yahoo/.test(ref)
  ) {
    return 'search'
  }
  if (ref && !ref.endsWith('talentxcel.net')) {
    return 'referral'
  }
  return 'direct'
}

// Lightweight per-isolate rate limiter (sliding 60-second window)
const RATE_LIMIT_WINDOW_MS = 60_000
const MAX_EVENTS_PER_MINUTE = 120
const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>()

export function checkAnalyticsRateLimit(clientKey: string, nowMs = Date.now()): boolean {
  const entry = RATE_LIMIT_MAP.get(clientKey)
  if (!entry || nowMs > entry.resetAt) {
    RATE_LIMIT_MAP.set(clientKey, { count: 1, resetAt: nowMs + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= MAX_EVENTS_PER_MINUTE) {
    return false
  }
  entry.count += 1
  return true
}

// In-memory store for unit tests & non-DB environments; synced to Supabase when service_role is configured
const MEMORY_EVENTS: StoredAnalyticsEvent[] = []
const MEMORY_DEDUPE = new Set<string>()
const MEMORY_SESSIONS = new Map<string, VisitorSessionRecord>()
const MEMORY_ATTRIBUTION = new Map<string, VisitorAttributionRecord>()

function getAdminDb() {
  if (process.env.NODE_ENV === 'test' && !process.env.TEST_USE_LIVE_DB) {
    return null
  }
  try {
    return createServiceRoleClient()
  } catch {
    return null
  }
}

export interface IngestContext {
  authenticatedUserId: string | null
  userAgent?: string | null
  countryCode?: string | null
  region?: string | null
}

const ENGAGEMENT_WEIGHTS: Partial<Record<AnalyticsEventName, number>> = {
  page_view: 1,
  content_view: 2,
  question_attempt: 4,
  diagnostic_start: 5,
  diagnostic_complete: 10,
  lesson_start: 4,
  lesson_complete: 8,
  ai_tutor_open: 3,
  ai_tutor_usage_metadata: 4,
  project_lab_start: 5,
  project_lab_complete: 10,
  pricing_view: 3,
  checkout_start: 6,
  purchase_complete: 15,
  signup_complete: 8,
  bookmark_add: 3,
  revision_note_create: 4,
}

export async function ingestAnalyticsEvents(
  inputs: AnalyticsEventInput[],
  ctx: IngestContext
): Promise<{ accepted: number; deduplicated: number; eventIds: string[] }> {
  const { deviceCategory, browserCategory } = classifyUserAgent(ctx.userAgent)
  const countryCode = ctx.countryCode ? ctx.countryCode.slice(0, 8).toUpperCase() : null
  const region = ctx.region ? ctx.region.slice(0, 64) : null
  const nowIso = new Date().toISOString()

  const db = getAdminDb()
  if (db && inputs.length > 0) {
    // Production path: delegate atomically to Postgres RPC (no isolate-memory state or unbounded growth)
    try {
      const rpcPayload = inputs.map((item) => {
        const pagePath = sanitizePagePath(item.pagePath)
        const referrerDomain = normalizeReferrerDomain(item.referrerDomain)
        const eventTimestamp = item.eventTimestamp || nowIso
        return {
          id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          event_name: item.eventName,
          event_version: item.eventVersion ?? EVENT_SCHEMA_VERSION,
          dedupe_key: item.dedupeKey ?? null,
          anonymous_visitor_id: item.anonymousVisitorId,
          session_id: item.sessionId,
          user_id: ctx.authenticatedUserId,
          event_timestamp: eventTimestamp,
          page_path: pagePath,
          referrer_domain: referrerDomain,
          utm_source: item.utmSource ?? null,
          utm_medium: item.utmMedium ?? null,
          utm_campaign: item.utmCampaign ?? null,
          utm_content: item.utmContent ?? null,
          utm_term: item.utmTerm ?? null,
          device_category: deviceCategory,
          browser_category: browserCategory,
          country_code: countryCode,
          region,
          engagement_score: ENGAGEMENT_WEIGHTS[item.eventName] ?? 1,
          channel: inferTrafficChannel(item.utmSource, item.utmMedium, referrerDomain),
          properties: sanitizeEventProperties(item.properties),
        }
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: rpcRes, error: rpcError } = await (db as any).rpc('ingest_analytics_batch', {
        p_events: rpcPayload,
      })

      if (rpcError) {
        throw rpcError
      }

      return {
        accepted: Number(rpcRes?.accepted ?? 0),
        deduplicated: Number(rpcRes?.deduplicated ?? 0),
        eventIds: rpcPayload.map((e) => e.id),
      }
    } catch (err) {
      console.error(
        '[Visitor Intelligence] Atomic DB ingestion failed:',
        err instanceof Error ? err.message : String(err)
      )
      throw err
    }
  }

  const acceptedEvents: StoredAnalyticsEvent[] = []
  let deduplicated = 0

  for (const item of inputs) {
    const pagePath = sanitizePagePath(item.pagePath)
    const referrerDomain = normalizeReferrerDomain(item.referrerDomain)
    const dedupeKey = item.dedupeKey ?? null

    if (dedupeKey && MEMORY_DEDUPE.has(dedupeKey)) {
      deduplicated += 1
      continue
    }
    if (dedupeKey) {
      MEMORY_DEDUPE.add(dedupeKey)
    }

    const eventTimestamp = item.eventTimestamp || nowIso
    const id = `evt_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
    const stored: StoredAnalyticsEvent = {
      id,
      eventName: item.eventName,
      eventVersion: item.eventVersion ?? EVENT_SCHEMA_VERSION,
      dedupeKey,
      anonymousVisitorId: item.anonymousVisitorId,
      sessionId: item.sessionId,
      userId: ctx.authenticatedUserId,
      eventTimestamp,
      pagePath,
      referrerDomain,
      utmSource: item.utmSource ?? null,
      utmMedium: item.utmMedium ?? null,
      utmCampaign: item.utmCampaign ?? null,
      deviceCategory,
      browserCategory,
      countryCode,
      properties: sanitizeEventProperties(item.properties),
      ingestedAt: nowIso,
    }
    acceptedEvents.push(stored)
    MEMORY_EVENTS.push(stored)

    // Update session summary
    const existingSession = MEMORY_SESSIONS.get(item.sessionId)
    const scoreDelta = ENGAGEMENT_WEIGHTS[item.eventName] ?? 1
    if (!existingSession) {
      const pageViews = item.eventName === 'page_view' ? 1 : 0
      MEMORY_SESSIONS.set(item.sessionId, {
        sessionId: item.sessionId,
        anonymousVisitorId: item.anonymousVisitorId,
        userId: ctx.authenticatedUserId,
        landingPath: pagePath,
        exitPath: pagePath,
        referrerDomain,
        utmSource: item.utmSource ?? null,
        utmMedium: item.utmMedium ?? null,
        utmCampaign: item.utmCampaign ?? null,
        utmContent: item.utmContent ?? null,
        utmTerm: item.utmTerm ?? null,
        deviceCategory,
        browserCategory,
        countryCode,
        region,
        startedAt: eventTimestamp,
        lastSeenAt: eventTimestamp,
        pageViewsCount: pageViews,
        eventsCount: 1,
        isEngaged: scoreDelta >= 4,
        engagementScore: scoreDelta,
      })
    } else {
      if (ctx.authenticatedUserId && !existingSession.userId) {
        existingSession.userId = ctx.authenticatedUserId
      }
      existingSession.exitPath = pagePath
      existingSession.lastSeenAt = eventTimestamp
      if (item.eventName === 'page_view') existingSession.pageViewsCount += 1
      existingSession.eventsCount += 1
      existingSession.engagementScore += scoreDelta
      existingSession.isEngaged =
        existingSession.isEngaged ||
        existingSession.pageViewsCount >= 2 ||
        existingSession.engagementScore >= 4
    }

    // Update first-touch & last-touch attribution
    const resolvedSource = item.utmSource || inferTrafficChannel(item.utmSource, item.utmMedium, referrerDomain)
    const resolvedMedium = item.utmMedium || (referrerDomain ? 'referral' : 'none')
    const existingAttr = MEMORY_ATTRIBUTION.get(item.anonymousVisitorId)
    if (!existingAttr) {
      MEMORY_ATTRIBUTION.set(item.anonymousVisitorId, {
        anonymousVisitorId: item.anonymousVisitorId,
        userId: ctx.authenticatedUserId,
        firstTouchSource: resolvedSource,
        firstTouchMedium: resolvedMedium,
        firstTouchCampaign: item.utmCampaign ?? null,
        firstTouchContent: item.utmContent ?? null,
        firstTouchTerm: item.utmTerm ?? null,
        firstTouchReferrer: referrerDomain,
        firstTouchLandingPath: pagePath,
        lastTouchSource: resolvedSource,
        lastTouchMedium: resolvedMedium,
        lastTouchCampaign: item.utmCampaign ?? null,
        lastTouchContent: item.utmContent ?? null,
        lastTouchTerm: item.utmTerm ?? null,
        lastTouchReferrer: referrerDomain,
        lastTouchLandingPath: pagePath,
        firstSeenAt: eventTimestamp,
        lastSeenAt: eventTimestamp,
        reconciledAt: ctx.authenticatedUserId ? nowIso : null,
      })
    } else {
      if (ctx.authenticatedUserId && !existingAttr.userId) {
        existingAttr.userId = ctx.authenticatedUserId
        existingAttr.reconciledAt = nowIso
      }
      existingAttr.lastSeenAt = eventTimestamp
      if (item.utmSource || referrerDomain) {
        existingAttr.lastTouchSource = resolvedSource
        existingAttr.lastTouchMedium = resolvedMedium
        existingAttr.lastTouchCampaign = item.utmCampaign ?? existingAttr.lastTouchCampaign
        existingAttr.lastTouchContent = item.utmContent ?? existingAttr.lastTouchContent
        existingAttr.lastTouchTerm = item.utmTerm ?? existingAttr.lastTouchTerm
        existingAttr.lastTouchReferrer = referrerDomain ?? existingAttr.lastTouchReferrer
        existingAttr.lastTouchLandingPath = pagePath
      }
    }
  }

  return {
    accepted: acceptedEvents.length,
    deduplicated,
    eventIds: acceptedEvents.map((e) => e.id),
  }
}

export async function reconcileAnonymousVisitor(params: {
  anonymousVisitorId: string
  sessionId?: string
  authenticatedUserId: string
}): Promise<{ reconciledEvents: number; reconciledSessions: number }> {
  const { anonymousVisitorId, sessionId, authenticatedUserId } = params
  const nowIso = new Date().toISOString()

  let reconciledEvents = 0
  for (const evt of MEMORY_EVENTS) {
    if (evt.anonymousVisitorId === anonymousVisitorId && !evt.userId) {
      evt.userId = authenticatedUserId
      reconciledEvents += 1
    }
  }

  let reconciledSessions = 0
  for (const s of MEMORY_SESSIONS.values()) {
    if ((s.anonymousVisitorId === anonymousVisitorId || (sessionId && s.sessionId === sessionId)) && !s.userId) {
      s.userId = authenticatedUserId
      reconciledSessions += 1
    }
  }

  const attr = MEMORY_ATTRIBUTION.get(anonymousVisitorId)
  if (attr) {
    attr.userId = authenticatedUserId
    attr.reconciledAt = attr.reconciledAt || nowIso
  }

  const db = getAdminDb()
  if (db) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (db as any).rpc('reconcile_anonymous_visitor', {
      p_anonymous_visitor_id: anonymousVisitorId,
      p_session_id: sessionId ?? null,
      p_user_id: authenticatedUserId,
    })

    if (error) {
      console.error('[Visitor Intelligence] Reconciliation RPC failed:', error.message)
      throw error
    }

    return {
      reconciledEvents: Number(data?.reconciledEvents ?? 0),
      reconciledSessions: Number(data?.reconciledSessions ?? 0),
    }
  }

  return { reconciledEvents, reconciledSessions }
}

export function __getInMemoryAnalyticsSnapshot() {
  return {
    events: [...MEMORY_EVENTS],
    sessions: Array.from(MEMORY_SESSIONS.values()),
    attributions: Array.from(MEMORY_ATTRIBUTION.values()),
  }
}

export function __resetInMemoryAnalyticsForTest() {
  MEMORY_EVENTS.length = 0
  MEMORY_DEDUPE.clear()
  MEMORY_SESSIONS.clear()
  MEMORY_ATTRIBUTION.clear()
  RATE_LIMIT_MAP.clear()
}
