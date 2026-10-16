'use client'

import { useState, useEffect } from 'react'
import {
  Globe,
  Briefcase,
  MessageSquare,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  X,
} from 'lucide-react'

interface EcosystemDiscoveryBannerProps {
  variant?: 'card' | 'footer-strip' | 'compact'
  currentContext?: string
}

export function EcosystemDiscoveryBanner({
  variant = 'card',
  currentContext = 'learner_portal',
}: EcosystemDiscoveryBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const [urls, setUrls] = useState({
    careerUrl: 'https://resume.talentxcel.in',
    salaryUrl: 'https://salary.talentxcel.in',
    chatrUrl: 'https://chatr.chat',
    nutyUrl: 'https://nutytales.com',
  })

  // Hydrate cryptographically-signed URLs via server signing endpoint to keep secrets strictly server-side
  useEffect(() => {
    let isMounted = true

    async function fetchSignedUrls() {
      try {
        const targets = [
          { key: 'careerUrl', destinationHost: 'resume.talentxcel.in', userIntent: 'resume_analysis' },
          { key: 'salaryUrl', destinationHost: 'salary.talentxcel.in', userIntent: 'career_pathway' },
          { key: 'chatrUrl', destinationHost: 'chatr.chat', userIntent: 'chatr_community' },
          { key: 'nutyUrl', destinationHost: 'nutytales.com', userIntent: 'nuty_commerce_sandbox' },
        ]

        const results = await Promise.all(
          targets.map(async (t) => {
            try {
              const res = await fetch('/api/ecosystem/referral/sign', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  sourceBrand: 'talentxcel-academy',
                  destinationHost: t.destinationHost,
                  destinationPath: '/',
                  userIntent: t.userIntent,
                  campaign: `${currentContext}_ecosystem_banner`,
                }),
              })
              if (res.ok) {
                const data = await res.json()
                return { key: t.key, url: data.secureUrl }
              }
            } catch {
              // Network error or offline; retain canonical URL
            }
            return null
          })
        )

        if (isMounted) {
          setUrls((prev) => {
            const next = { ...prev }
            for (const r of results) {
              if (r) {
                ;(next as any)[r.key] = r.url
              }
            }
            return next
          })
        }
      } catch {
        // Fallback to canonical URLs
      }
    }

    fetchSignedUrls()
    return () => {
      isMounted = false
    }
  }, [currentContext])

  if (isDismissed) return null

  const { careerUrl, salaryUrl, chatrUrl, nutyUrl } = urls

  if (variant === 'footer-strip') {
    return (
      <div className="border-t border-black/[0.06] dark:border-white/[0.08] bg-neutral-50/70 dark:bg-neutral-950/70 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-500">
            <Globe className="h-4 w-4 text-[#0080FF]" />
            <span className="font-semibold text-black dark:text-white">TalentXcel Ecosystem:</span>
            <span>Seamlessly navigate verified career, collaboration, and commerce networks.</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={careerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-[#0080FF] transition-colors flex items-center gap-1 font-medium"
            >
              Resume & Jobs <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <a
              href={salaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-[#0080FF] transition-colors flex items-center gap-1 font-medium"
            >
              Salary Benchmarks <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <a
              href={chatrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-emerald-500 transition-colors flex items-center gap-1 font-medium"
            >
              CHATR Community <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <a
              href={nutyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-amber-500 transition-colors flex items-center gap-1 font-medium"
            >
              Nuty Tales <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-5 sm:p-6 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsDismissed(true)}
        aria-label="Dismiss banner"
        className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0080FF]/10 text-[#0080FF] border border-[#0080FF]/20">
              <Globe className="h-3 w-3" /> Ecosystem Growth OS
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="h-3 w-3" /> Verified Signed Outbound
            </span>
          </div>
          <h3 className="text-base font-bold text-black dark:text-white tracking-tight">
            Connect Your Learning with the Broader TalentXcel Network
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Translate your Academy certifications into verified career pathways, real-time developer community collaboration, and live enterprise commerce applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
          {/* Card 1: TalentXcel Career Hub */}
          <a
            href={careerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:border-[#0080FF]/40 hover:bg-[#0080FF]/5 transition-all text-left"
          >
            <div className="flex items-center justify-between text-[#0080FF] mb-1">
              <Briefcase className="h-4 w-4" />
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xs font-semibold text-black dark:text-white">TalentXcel Careers</div>
            <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">
              Verified ATS resume generator and live salary benchmarks.
            </div>
          </a>

          {/* Card 2: CHATR Community */}
          <a
            href={chatrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-left"
          >
            <div className="flex items-center justify-between text-emerald-500 mb-1">
              <MessageSquare className="h-4 w-4" />
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xs font-semibold text-black dark:text-white">CHATR Network</div>
            <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">
              Real-time peer study groups and AI engineering channels.
            </div>
          </a>

          {/* Card 3: Nuty Tales Commerce */}
          <a
            href={nutyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:border-amber-500/40 hover:bg-amber-500/5 transition-all text-left"
          >
            <div className="flex items-center justify-between text-amber-500 mb-1">
              <ShoppingBag className="h-4 w-4" />
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xs font-semibold text-black dark:text-white">Nuty Tales MSME</div>
            <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">
              Artisanal commerce and enterprise gifting playbooks.
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
