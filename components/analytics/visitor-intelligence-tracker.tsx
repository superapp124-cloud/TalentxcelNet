'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  flushAnalyticsQueue,
  getOrCreateVisitorIdentity,
  isAnalyticsAllowed,
  reconcileVisitorIdentity,
  trackEvent,
} from '@/lib/analytics/client-tracker'

const CONSENT_KEY = 'tx_analytics_consent'

export function VisitorIntelligenceTracker() {
  const pathname = usePathname()
  const lastTrackedPathRef = useRef<string | null>(null)
  const reconciledUserRef = useRef<string | null>(null)
  const [showConsentPrompt, setShowConsentPrompt] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    try {
      if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return
      const stored = window.localStorage.getItem(CONSENT_KEY)
      if (!stored) {
        timer = setTimeout(() => setShowConsentPrompt(true), 0)
      }
    } catch {
      // Ignore storage errors
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isAnalyticsAllowed()) return
    const identity = getOrCreateVisitorIdentity()
    if (!identity) return

    if (identity.isNewSession) {
      trackEvent(
        'session_start',
        { entryPath: pathname || '/' },
        { dedupeKey: `session:${identity.sessionId}`, pagePath: pathname || '/' }
      )
    }

    if (lastTrackedPathRef.current !== pathname) {
      lastTrackedPathRef.current = pathname
      trackEvent(
        'page_view',
        { route: pathname || '/' },
        {
          dedupeKey: `pv:${identity.sessionId}:${pathname || '/'}:${Math.floor(Date.now() / 5000)}`,
          pagePath: pathname || '/',
        }
      )
    }
  }, [pathname])

  useEffect(() => {
    if (!isAnalyticsAllowed()) return
    let active = true
    const supabase = createClient()

    const syncAuthReconciliation = async () => {
      try {
        const { data } = await supabase.auth.getUser()
        const uid = data.user?.id ?? null
        if (active && uid && reconciledUserRef.current !== uid) {
          reconciledUserRef.current = uid
          await reconcileVisitorIdentity()
        }
      } catch {
        // Ignore unauthenticated errors
      }
    }

    void syncAuthReconciliation()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null
      if (uid && reconciledUserRef.current !== uid) {
        reconciledUserRef.current = uid
        void reconcileVisitorIdentity()
      }
    })

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushAnalyticsQueue(true)
      }
    }
    const onPageHide = () => flushAnalyticsQueue(true)

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pagehide', onPageHide)

    return () => {
      active = false
      subscription.unsubscribe()
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pagehide', onPageHide)
    }
  }, [])

  function handleConsent(choice: 'granted' | 'denied') {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice)
    } catch {
      // Ignore storage errors
    }
    setShowConsentPrompt(false)
  }

  if (!showConsentPrompt) return null

  return (
    <div
      role="region"
      aria-label="Privacy and analytics preferences"
      className="fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur p-3.5 shadow-lg text-xs text-slate-700 dark:text-slate-300"
    >
      <p className="font-medium text-slate-900 dark:text-white mb-1">
        Privacy-first learning analytics
      </p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2.5">
        TalentXcel uses first-party, non-fingerprinting telemetry to improve your study plan. No PII or prompts are stored.
      </p>
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => handleConsent('denied')}
          className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Opt out
        </button>
        <button
          type="button"
          onClick={() => handleConsent('granted')}
          className="px-2.5 py-1 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
