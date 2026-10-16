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
import { generateSecureReferralUrl } from '@/lib/ecosystem/referral-engine'

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

  // Hydrate cryptographically-signed URLs post-mount to eliminate SSR hydration mismatch
  useEffect(() => {
    setUrls({
      careerUrl: generateSecureReferralUrl({
        sourceBrand: 'talentxcel-academy',
        destinationHost: 'resume.talentxcel.in',
        userIntent: 'resume_analysis',
        campaign: `${currentContext}_ecosystem_banner`,
      }),
      salaryUrl: generateSecureReferralUrl({
        sourceBrand: 'talentxcel-academy',
        destinationHost: 'salary.talentxcel.in',
        userIntent: 'career_pathway',
        campaign: `${currentContext}_ecosystem_banner`,
      }),
      chatrUrl: generateSecureReferralUrl({
        sourceBrand: 'talentxcel-academy',
        destinationHost: 'chatr.chat',
        userIntent: 'chatr_community',
        campaign: `${currentContext}_ecosystem_banner`,
      }),
      nutyUrl: generateSecureReferralUrl({
        sourceBrand: 'talentxcel-academy',
        destinationHost: 'nutytales.com',
        userIntent: 'nuty_commerce_sandbox',
        campaign: `${currentContext}_ecosystem_banner`,
      }),
    })
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

          {/* Card 2: chatr Community */}
          <a
            href={chatrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:border-[#00bba6]/40 hover:bg-[#00bba6]/5 transition-all text-left"
          >
            <div className="flex items-center justify-between text-[#00bba6] mb-1">
              <MessageSquare className="h-4 w-4" />
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xs font-semibold text-black dark:text-white flex items-center gap-1.5">
              <span>chatr</span>
              <span className="text-[9px] font-normal text-[#00bba6]">Say It. Share It.</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">
              Real-time peer study groups and AI engineering channels.
            </div>
          </a>

          {/* Card 3: NutyTales Commerce */}
          <a
            href={nutyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] hover:border-[#1e3a8a]/40 hover:bg-[#1e3a8a]/5 transition-all text-left"
          >
            <div className="flex items-center justify-between text-[#1e3a8a] dark:text-blue-400 mb-1">
              <ShoppingBag className="h-4 w-4" />
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xs font-semibold text-black dark:text-white flex items-center gap-1.5">
              <span>NutyTales</span>
              <span className="text-[9px] font-normal text-amber-600 dark:text-amber-400">Nutty Delights</span>
            </div>
            <div className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2">
              Artisanal commerce and enterprise gifting playbooks.
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
