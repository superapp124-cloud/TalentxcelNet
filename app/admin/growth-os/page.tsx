'use client'

import { useState, useMemo } from 'react'
import {
  Globe,
  ShieldCheck,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  Sparkles,
  RefreshCw,
  Compass,
  ArrowRight,
  BookOpen,
  Filter,
} from 'lucide-react'
import { ECOSYSTEM_DOMAINS, ECOSYSTEM_BRANDS, EcosystemDomainRecord, getBrandDomains } from '@/lib/ecosystem/registry'
import { generateSecureReferralUrl, verifyReferralSignature } from '@/lib/ecosystem/referral-engine'
import { ECOSYSTEM_KNOWLEDGE_INDEX, searchKnowledgeBase } from '@/lib/ecosystem/knowledge-base'
import { routeEcosystemIntent, EcosystemRouteResult } from '@/lib/ai/ecosystem-router'

export default function EcosystemGrowthOSAdminPage() {
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [domainSearch, setDomainSearch] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'domains' | 'generator' | 'knowledge' | 'simulator'>('domains')

  // Referral Generator State
  const [genSourceBrand, setGenSourceBrand] = useState<'talentxcel' | 'talentxcel-academy' | 'chatr' | 'nuty-tales'>('talentxcel-academy')
  const [genDestHost, setGenDestHost] = useState<string>('resume.talentxcel.in')
  const [genIntent, setGenIntent] = useState<'career_pathway' | 'resume_analysis' | 'academy_enrolment' | 'chatr_community' | 'nuty_commerce_sandbox'>('resume_analysis')
  const [genCampaign, setGenCampaign] = useState<string>('growth_os_direct')
  const [copiedLink, setCopiedLink] = useState(false)

  // AI Simulator State
  const [simQuery, setSimQuery] = useState<string>('I want to build an ATS-friendly resume for an AI engineer position')
  const [simResult, setSimResult] = useState<EcosystemRouteResult | null>(null)

  // Knowledge search state
  const [kbSearch, setKbSearch] = useState<string>('')

  // Filtered Domains
  const filteredDomains = useMemo(() => {
    return ECOSYSTEM_DOMAINS.filter((d) => {
      if (selectedBrand !== 'all' && d.brandSlug !== selectedBrand) return false
      if (!domainSearch) return true
      const q = domainSearch.toLowerCase()
      return (
        d.hostname.toLowerCase().includes(q) ||
        d.purpose.toLowerCase().includes(q) ||
        d.technicalOwner.toLowerCase().includes(q) ||
        d.audienceSegments.some((s) => s.toLowerCase().includes(q))
      )
    })
  }, [selectedBrand, domainSearch])

  // Generated Link calculation
  const generatedUrl = useMemo(() => {
    try {
      return generateSecureReferralUrl({
        sourceBrand: genSourceBrand,
        destinationHost: genDestHost,
        userIntent: genIntent,
        campaign: genCampaign || 'ecosystem_growth',
      })
    } catch {
      return ''
    }
  }, [genSourceBrand, genDestHost, genIntent, genCampaign])

  // Run initial simulation on mount or trigger
  const runSimulation = () => {
    if (!simQuery.trim()) return
    const res = routeEcosystemIntent(simQuery)
    setSimResult(res)
  }

  // Knowledge base items
  const filteredKb = useMemo(() => {
    return searchKnowledgeBase(kbSearch, selectedBrand === 'all' ? undefined : selectedBrand)
  }, [kbSearch, selectedBrand])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/[0.08] dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#0080FF]/10 text-[#0080FF] border border-[#0080FF]/20">
              <Globe className="h-3.5 w-3.5" /> Multi-Domain Intelligence
            </span>
            <span className="text-xs text-neutral-500 font-mono">v2.4.0-Production</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white mt-2 tracking-tight">
            Ecosystem Growth OS
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Centralized orchestration across TalentXcel, TalentXcel Academy, CHATR, and Nuty Tales.
            Monitors {ECOSYSTEM_DOMAINS.length} hosts, generates HMAC-signed intent deep links, and steers multi-brand AI workflows.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-medium">
            <ShieldCheck className="h-4 w-4" /> Zero Identity Leakage
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/60 shadow-sm">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Monitored Domains</div>
          <div className="text-2xl font-bold text-black dark:text-white mt-1">{ECOSYSTEM_DOMAINS.length}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> {ECOSYSTEM_DOMAINS.filter(d => d.healthStatus === 'healthy').length} Healthy • {ECOSYSTEM_DOMAINS.filter(d => d.healthStatus === 'redirected').length} Redirect • {ECOSYSTEM_DOMAINS.filter(d => d.healthStatus === 'experimental').length} Exp
          </div>
        </div>

        <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/60 shadow-sm">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Ecosystem Brands</div>
          <div className="text-2xl font-bold text-black dark:text-white mt-1">4</div>
          <div className="text-[11px] text-neutral-500 mt-1">
            TalentXcel, Academy, CHATR, Nuty
          </div>
        </div>

        <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/60 shadow-sm">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">HMAC Verification</div>
          <div className="text-2xl font-bold text-[#0080FF] mt-1">100%</div>
          <div className="text-[11px] text-neutral-500 mt-1">
            SHA256 Signed Intent Payloads
          </div>
        </div>

        <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/60 shadow-sm">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Knowledge Index</div>
          <div className="text-2xl font-bold text-black dark:text-white mt-1">{ECOSYSTEM_KNOWLEDGE_INDEX.length}</div>
          <div className="text-[11px] text-neutral-500 mt-1">
            Active Multi-Brand Playbooks
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-black/[0.08] dark:border-white/[0.08] gap-2">
        <button
          onClick={() => setActiveTab('domains')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'domains'
              ? 'border-[#0080FF] text-[#0080FF]'
              : 'border-transparent text-neutral-500 hover:text-black dark:hover:text-white'
          }`}
        >
          Domain Registry Matrix ({ECOSYSTEM_DOMAINS.length})
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'generator'
              ? 'border-[#0080FF] text-[#0080FF]'
              : 'border-transparent text-neutral-500 hover:text-black dark:hover:text-white'
          }`}
        >
          HMAC Signed Link Generator
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'simulator'
              ? 'border-[#0080FF] text-[#0080FF]'
              : 'border-transparent text-neutral-500 hover:text-black dark:hover:text-white'
          }`}
        >
          AI Intent Routing Simulator
        </button>
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === 'knowledge'
              ? 'border-[#0080FF] text-[#0080FF]'
              : 'border-transparent text-neutral-500 hover:text-black dark:hover:text-white'
          }`}
        >
          Cross-Brand Knowledge Base ({ECOSYSTEM_KNOWLEDGE_INDEX.length})
        </button>
      </div>

      {/* TAB 1: DOMAIN REGISTRY MATRIX */}
      {activeTab === 'domains' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Brand Filter */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedBrand === 'all'
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.08]'
                }`}
              >
                All Brands ({ECOSYSTEM_DOMAINS.length})
              </button>
              <button
                onClick={() => setSelectedBrand('talentxcel')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedBrand === 'talentxcel'
                    ? 'bg-[#0080FF] text-white font-semibold'
                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.08]'
                }`}
              >
                TalentXcel ({getBrandDomains('talentxcel').length})
              </button>
              <button
                onClick={() => setSelectedBrand('talentxcel-academy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedBrand === 'talentxcel-academy'
                    ? 'bg-[#0080FF] text-white font-semibold'
                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.08]'
                }`}
              >
                Academy ({getBrandDomains('talentxcel-academy').length})
              </button>
              <button
                onClick={() => setSelectedBrand('chatr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedBrand === 'chatr'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.08]'
                }`}
              >
                CHATR ({getBrandDomains('chatr').length})
              </button>
              <button
                onClick={() => setSelectedBrand('nuty-tales')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedBrand === 'nuty-tales'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.08]'
                }`}
              >
                Nuty Tales ({getBrandDomains('nuty-tales').length})
              </button>
            </div>

            {/* Search */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                value={domainSearch}
                onChange={(e) => setDomainSearch(e.target.value)}
                placeholder="Search hosts, purpose, audience..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0080FF]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-950">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-black/[0.08] dark:border-white/[0.08] bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-500 font-medium">
                  <th className="py-3 px-4">Hostname & Brand</th>
                  <th className="py-3 px-4">Role & Purpose</th>
                  <th className="py-3 px-4">Audience</th>
                  <th className="py-3 px-4">Health</th>
                  <th className="py-3 px-4">Integration</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                {filteredDomains.map((dom) => (
                  <tr key={dom.hostname} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-black dark:text-white font-mono">{dom.hostname}</div>
                      <div className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">
                        {ECOSYSTEM_BRANDS[dom.brandSlug]?.name || dom.brandSlug}
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-xs text-neutral-600 dark:text-neutral-300">
                      {dom.purpose}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {dom.audienceSegments.map((seg) => (
                          <span
                            key={seg}
                            className="inline-block px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-[10px] text-neutral-600 dark:text-neutral-400"
                          >
                            {seg}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {dom.healthStatus === 'healthy' && (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
                          <CheckCircle2 className="h-3 w-3" /> Healthy
                        </span>
                      )}
                      {dom.healthStatus === 'redirected' && (
                        <span className="inline-flex items-center gap-1 text-amber-500 text-[11px] font-medium">
                          <AlertCircle className="h-3 w-3" /> 301 Redirect
                        </span>
                      )}
                      {dom.healthStatus === 'experimental' && (
                        <span className="inline-flex items-center gap-1 text-purple-500 text-[11px] font-medium">
                          <Sparkles className="h-3 w-3" /> Experimental
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#0080FF]/10 text-[#0080FF] border border-[#0080FF]/20">
                        {dom.integrationStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">
                      {dom.technicalOwner}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a
                        href={dom.publicEntryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#0080FF] hover:underline"
                      >
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: HMAC LINK GENERATOR */}
      {activeTab === 'generator' && (
        <div className="max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] p-6 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-black dark:text-white">HMAC-Signed Referral Link Generator</h2>
            <p className="text-xs text-neutral-500 mt-1">
              Creates cryptographically signed outbound URLs with tamper-proof signatures, 7-day expiration, and UTM tracking.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Source Brand
              </label>
              <select
                value={genSourceBrand}
                onChange={(e) => setGenSourceBrand(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-neutral-950 text-black dark:text-white"
              >
                <option value="talentxcel-academy">TalentXcel Academy (talentxcel.net)</option>
                <option value="talentxcel">TalentXcel Career Network (talentxcel.in)</option>
                <option value="chatr">CHATR (chatr.chat)</option>
                <option value="nuty-tales">Nuty Tales (nutytales.com)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                Destination Host
              </label>
              <select
                value={genDestHost}
                onChange={(e) => setGenDestHost(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-neutral-950 text-black dark:text-white font-mono"
              >
                {ECOSYSTEM_DOMAINS.map((d) => (
                  <option key={d.hostname} value={d.hostname}>
                    {d.hostname} ({d.purpose})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                User Intent Code
              </label>
              <select
                value={genIntent}
                onChange={(e) => setGenIntent(e.target.value as any)}
                className="w-full p-2.5 rounded-lg border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-neutral-950 text-black dark:text-white"
              >
                <option value="career_pathway">career_pathway (Skills gap analysis & path)</option>
                <option value="resume_analysis">resume_analysis (ATS resume optimization)</option>
                <option value="academy_enrolment">academy_enrolment (Cloud AI programmes)</option>
                <option value="chatr_community">chatr_community (Peer discussions & teams)</option>
                <option value="nuty_commerce_sandbox">nuty_commerce_sandbox (Corporate gifting / commerce)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                UTM Campaign Identifier
              </label>
              <input
                type="text"
                value={genCampaign}
                onChange={(e) => setGenCampaign(e.target.value)}
                placeholder="e.g. spring_cohort_onboarding"
                className="w-full p-2.5 rounded-lg border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-neutral-950 text-black dark:text-white"
              />
            </div>
          </div>

          {/* Generated Result */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-black/[0.08] dark:border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Signed Destination URL
              </span>
              <button
                onClick={() => copyToClipboard(generatedUrl)}
                className="flex items-center gap-1 text-xs text-[#0080FF] hover:underline font-semibold"
              >
                {copiedLink ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            <div className="p-2.5 rounded bg-white dark:bg-black border border-black/[0.06] dark:border-white/[0.08] font-mono text-xs break-all select-all text-neutral-800 dark:text-neutral-200">
              {generatedUrl}
            </div>

            <div className="text-[11px] text-neutral-500">
              Payload includes cryptographic verification token: <code className="text-[#0080FF]">ref_sig</code> generated via HMAC-SHA256 with 7-day TTL.
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI ROUTING SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6 max-w-3xl">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] p-6 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-black dark:text-white">AI Cross-Brand Routing Simulator</h2>
              <p className="text-xs text-neutral-500 mt-1">
                Test how the Super AI intent engine automatically detects user intent and provides verified referral pathways across the 4 brands.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={simQuery}
                onChange={(e) => setSimQuery(e.target.value)}
                placeholder="Type a student or customer query..."
                className="flex-1 p-2.5 rounded-lg border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-neutral-950 text-xs text-black dark:text-white"
              />
              <button
                onClick={runSimulation}
                className="px-4 py-2 bg-[#0080FF] text-white text-xs font-semibold rounded-lg hover:bg-[#0070E0] transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" /> Simulate
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[11px] text-neutral-400 font-medium self-center">Try:</span>
              <button
                onClick={() => {
                  setSimQuery('What is the salary benchmark for a Senior AI Cloud Architect in India?')
                  const res = routeEcosystemIntent('What is the salary benchmark for a Senior AI Cloud Architect in India?')
                  setSimResult(res)
                }}
                className="px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.06] text-[11px] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              >
                Salary Benchmark
              </button>
              <button
                onClick={() => {
                  setSimQuery('Where can I join peer study groups and chat with other cloud learners?')
                  const res = routeEcosystemIntent('Where can I join peer study groups and chat with other cloud learners?')
                  setSimResult(res)
                }}
                className="px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.06] text-[11px] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              >
                CHATR Study Groups
              </button>
              <button
                onClick={() => {
                  setSimQuery('How can our company order premium walnut and saffron corporate gift boxes?')
                  const res = routeEcosystemIntent('How can our company order premium walnut and saffron corporate gift boxes?')
                  setSimResult(res)
                }}
                className="px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.06] text-[11px] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              >
                Nuty Tales Gifting
              </button>
            </div>
          </div>

          {/* Simulation Output */}
          {simResult && (
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Classification</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0080FF]/10 text-[#0080FF] border border-[#0080FF]/20">
                    {simResult.brandName}
                  </span>
                </div>
                <div className="text-xs text-neutral-500 font-mono">
                  Confidence: <span className="font-bold text-emerald-500">{(simResult.confidence * 100).toFixed(0)}%</span>
                </div>
              </div>

              <div className="text-xs text-neutral-600 dark:text-neutral-300">
                <span className="font-semibold text-black dark:text-white">Rationale:</span> {simResult.rationale}
              </div>

              {/* Recommended destinations */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Generated Deep-Link Destinations:
                </div>
                <div className="grid gap-3">
                  {simResult.recommendedDestinations.map((dest, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-neutral-50/50 dark:bg-neutral-950 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-xs font-semibold text-black dark:text-white flex items-center gap-1.5">
                          {dest.title}
                          <span className="text-[10px] font-mono text-neutral-400">({dest.hostname})</span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">{dest.description}</div>
                      </div>
                      <a
                        href={dest.secureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-[#0080FF] text-white text-xs font-medium hover:bg-[#0070E0] transition-colors flex items-center gap-1"
                      >
                        {dest.actionLabel} <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: KNOWLEDGE BASE EXPLORER */}
      {activeTab === 'knowledge' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="text-xs text-neutral-500">
              Showing {filteredKb.length} verified ecosystem knowledge playbooks
            </div>
            <div className="relative min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
              <input
                type="text"
                value={kbSearch}
                onChange={(e) => setKbSearch(e.target.value)}
                placeholder="Search knowledge playbooks, tags..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-black/[0.1] dark:border-white/[0.1] bg-white dark:bg-neutral-900 text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#0080FF]"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filteredKb.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-neutral-900/60 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0080FF]/10 text-[#0080FF]">
                      {item.brandName}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">{item.sourceDomain}</span>
                  </div>
                  <h3 className="text-sm font-bold text-black dark:text-white">{item.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-[10px] text-neutral-500"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#0080FF] hover:underline shrink-0 ml-2"
                  >
                    Source <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
