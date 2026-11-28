'use client'

import type { AnalyticsEventName } from '@/lib/analytics/visitor-intelligence'

const VISITOR_ID_KEY = 'tx_vid'
const SESSION_ID_KEY = 'tx_sid'
const SESSION_TS_KEY = 'tx_sid_ts'
const FIRST_TOUCH_KEY = 'tx_ft_attr'
const CONSENT_KEY = 'tx_analytics_consent'
const SESSION_TIMEOUT_MS = 30 * 60 * 1000
const FLUSH_INTERVAL_MS = 3500
const MAX_QUEUE_SIZE = 20

interface AttributionSnapshot {
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  referrerDomain: string | null
}

interface QueuedEvent {
  eventName: AnalyticsEventName
  eventVersion: 1
  anonymousVisitorId: string
  sessionId: string
  dedupeKey?: string
  eventTimestamp: string
  pagePath: string
  referrerDomain: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  properties: Record<string, string | number | boolean | null>
}

let eventQueue: QueuedEvent[] = []
let flushTimer: ReturnType<typeof setTimeout> | null = null

function randomToken(prefix: string): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}_${crypto.randomUUID().replace(/-/g, '')}`
  }
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`
}

export function isAnalyticsAllowed(): boolean {
  if (typeof window === 'undefined') return false
  if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return false
  try {
    if (window.localStorage.getItem(CONSENT_KEY) === 'denied') return false
  } catch {
    // Ignore storage access errors
  }
  return true
}

export function getOrCreateVisitorIdentity(): {
  anonymousVisitorId: string
  sessionId: string
  isNewSession: boolean
} | null {
  if (typeof window === 'undefined') return null
  try {
    let vid = window.localStorage.getItem(VISITOR_ID_KEY)
    if (!vid || !/^[a-zA-Z0-9_-]{8,128}$/.test(vid)) {
      vid = randomToken('v')
      window.localStorage.setItem(VISITOR_ID_KEY, vid)
    }

    const now = Date.now()
    const existingSid = window.sessionStorage.getItem(SESSION_ID_KEY)
    const lastTsRaw = window.sessionStorage.getItem(SESSION_TS_KEY)
    const lastTs = lastTsRaw ? Number(lastTsRaw) : 0

    let sid = existingSid
    let isNewSession = false
    if (!sid || !/^[a-zA-Z0-9_-]{8,128}$/.test(sid) || now - lastTs > SESSION_TIMEOUT_MS) {
      sid = randomToken('s')
      isNewSession = true
      window.sessionStorage.setItem(SESSION_ID_KEY, sid)
    }
    window.sessionStorage.setItem(SESSION_TS_KEY, String(now))

    return { anonymousVisitorId: vid, sessionId: sid, isNewSession }
  } catch {
    return {
      anonymousVisitorId: randomToken('v'),
      sessionId: randomToken('s'),
      isNewSession: true,
    }
  }
}

export function readAttribution(): AttributionSnapshot {
  if (typeof window === 'undefined') {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
      referrerDomain: null,
    }
  }

  const params = new URLSearchParams(window.location.search)
  let referrerDomain: string | null = null
  if (document.referrer) {
    try {
      const refHost = new URL(document.referrer).hostname.toLowerCase()
      if (refHost && refHost !== window.location.hostname.toLowerCase()) {
        referrerDomain = refHost
      }
    } catch {
      referrerDomain = null
    }
  }

  const current: AttributionSnapshot = {
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
    utmContent: params.get('utm_content'),
    utmTerm: params.get('utm_term'),
    referrerDomain,
  }

  try {
    const hasCurrentUtm = Boolean(current.utmSource || current.utmMedium || current.utmCampaign)
    const existingRaw = window.localStorage.getItem(FIRST_TOUCH_KEY)
    if (!existingRaw && (hasCurrentUtm || current.referrerDomain)) {
      window.localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(current))
    }
    if (!hasCurrentUtm && !current.referrerDomain && existingRaw) {
      return JSON.parse(existingRaw) as AttributionSnapshot
    }
  } catch {
    // Ignore storage errors
  }

  return current
}

export function flushAnalyticsQueue(useBeacon = false): void {
  if (flushTimer) {
    clearTimeout(flushTimer)
    flushTimer = null
  }
  if (eventQueue.length === 0) return

  const batch = eventQueue.slice(0, 25)
  eventQueue = eventQueue.slice(25)
  const payload = JSON.stringify({ events: batch })

  if (useBeacon && typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([payload], { type: 'application/json' })
    const sent = navigator.sendBeacon('/api/analytics/events', blob)
    if (sent) return
  }

  void fetch('/api/analytics/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Non-blocking telemetry
  })
}

export function trackEvent(
  eventName: AnalyticsEventName,
  properties: Record<string, string | number | boolean | null> = {},
  options?: { dedupeKey?: string; immediate?: boolean; pagePath?: string }
): void {
  if (!isAnalyticsAllowed()) return
  const identity = getOrCreateVisitorIdentity()
  if (!identity) return

  const attribution = readAttribution()
  const pagePath = options?.pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/')

  eventQueue.push({
    eventName,
    eventVersion: 1,
    anonymousVisitorId: identity.anonymousVisitorId,
    sessionId: identity.sessionId,
    dedupeKey: options?.dedupeKey,
    eventTimestamp: new Date().toISOString(),
    pagePath,
    referrerDomain: attribution.referrerDomain,
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmContent: attribution.utmContent,
    utmTerm: attribution.utmTerm,
    properties,
  })

  if (options?.immediate || eventQueue.length >= MAX_QUEUE_SIZE) {
    flushAnalyticsQueue(false)
    return
  }

  if (!flushTimer) {
    flushTimer = setTimeout(() => {
      flushAnalyticsQueue(false)
    }, FLUSH_INTERVAL_MS)
  }
}

export async function reconcileVisitorIdentity(): Promise<void> {
  if (!isAnalyticsAllowed()) return
  const identity = getOrCreateVisitorIdentity()
  if (!identity) return

  try {
    await fetch('/api/analytics/reconcile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        anonymousVisitorId: identity.anonymousVisitorId,
        sessionId: identity.sessionId,
      }),
    })
  } catch {
    // Best-effort reconciliation
  }
}
