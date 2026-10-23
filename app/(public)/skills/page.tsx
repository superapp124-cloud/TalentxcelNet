'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Code,
  Sparkles,
  Calculator,
  Cpu,
  Palette,
  MessageSquare,
  TrendingUp,
  Cloud,
  CheckCircle2,
  Briefcase,
  Clock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Target,
  Search,
  Filter,
  Check,
  Award,
  Layers,
  Activity,
  FileText,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/navigation/site-header'
import { ProjectWorkshopModal } from '@/components/skills/project-workshop-modal'
import { GrowthPlanModal } from '@/components/intelligence/growth-plan-modal'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'
import {
  SEED_SKILL_TRACKS,
  SEED_SKILL_PROJECTS,
  SKILL_PRODUCTS,
} from '@/packages/core/src'
import type { SkillTrack, SkillProject, CommercialProduct } from '@/packages/core/src'

export default function SkillsPage() {
  const [levelFilter, setLevelFilter] = useState<'all' | 'foundation' | 'intermediate' | 'advanced'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'tracks' | 'projects' | 'plans'>('tracks')

  // Modals state
  const [selectedProject, setSelectedProject] = useState<SkillProject | null>(null)
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false)

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const [isGrowthPlanOpen, setIsGrowthPlanOpen] = useState(false)

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return SEED_SKILL_TRACKS.filter((track) => {
      const matchesLevel = levelFilter === 'all' || track.level === levelFilter
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        track.title.toLowerCase().includes(q) ||
        track.description.toLowerCase().includes(q) ||
        track.targetGrades.toLowerCase().includes(q)
      return matchesLevel && matchesSearch
    })
  }, [levelFilter, searchQuery])

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return SEED_SKILL_PROJECTS
    const q = searchQuery.toLowerCase()
    return SEED_SKILL_PROJECTS.filter((p) => p.title.toLowerCase().includes(q) || p.brief.toLowerCase().includes(q))
  }, [searchQuery])

  // Open Capstone Workshop Modal
  const handleOpenProject = (projectId: string) => {
    const proj = SEED_SKILL_PROJECTS.find((p) => p.id === projectId) || SEED_SKILL_PROJECTS[0]
    setSelectedProject(proj)
    setIsWorkshopOpen(true)
  }

  // Handle checkout
  const handleOpenCheckout = (productId: string) => {
    setCheckoutProductId(productId)
    setIsCheckoutOpen(true)
  }

  // Get track icon
  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-600" />
      case 'Code':
        return <Code className="w-5 h-5 text-blue-600" />
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-amber-600" />
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-600" />
      case 'Palette':
        return <Palette className="w-5 h-5 text-purple-600" />
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-cyan-600" />
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-rose-600" />
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-600" />
      default:
        return <Briefcase className="w-5 h-5 text-slate-600" />
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Platform Navigation */}
      <SiteHeader onOpenGrowthPlan={() => setIsGrowthPlanOpen(true)} />

      {/* Hero Header */}
      <section className="bg-white border-b border-slate-200/80 pt-8 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide">
                <Code className="w-3.5 h-3.5" />
                <span>Domain 2: Skill Development</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>Japanese Craftsmanship &amp; Chinese Progression</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Learn by Doing, Building and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  Mastering Real Skills.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Sell structured learning outcomes, real capstone projects and evaluated submissions—not just access to a video catalogue. Master AI, code, robotics, design, debate and venture building from ₹999/month.
              </p>
            </div>

            {/* Quick Action Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shrink-0 max-w-sm w-full shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Featured Capstone</span>
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 text-[11px] font-bold">
                  Open Workshop
                </Badge>
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Socratic AI Study Assistant
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Build a prompt engine with pedagogical guardrails to teach Grade 4 fractions without revealing answers.
              </p>
              <Button
                onClick={() => handleOpenProject('proj_ai_assistant')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-9.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Open Workshop &amp; Rubric</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-4 border-t border-slate-100 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab('tracks')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'tracks'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>8 First-Class Skill Tracks</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Evaluated Capstone Projects</span>
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'plans'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Skill Studio Plans</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-black">From ₹999/mo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ========================================================================= */}
        {/* TAB 1: 8 SKILL TRACKS */}
        {/* ========================================================================= */}
        {activeTab === 'tracks' && (
          <section className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <span className="text-xs font-bold text-slate-500 shrink-0">Level:</span>
                {(['all', 'foundation', 'intermediate', 'advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevelFilter(lvl)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      levelFilter === lvl
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search skill track or grade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Tracks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between gap-5 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        {getTrackIcon(track.iconName)}
                      </div>
                      <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-[10px] font-bold capitalize">
                        {track.level}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {track.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">
                        {track.description}
                      </p>
                    </div>

                    {/* Philosophy badge */}
                    <div className="bg-indigo-50/60 border border-indigo-100/80 rounded-xl p-2.5 text-[11px] text-indigo-900 leading-tight">
                      <div className="flex items-center gap-1 font-bold mb-0.5 text-indigo-700">
                        <Sparkles className="w-3 h-3" />
                        <span>
                          {track.philosophy === 'japanese_kaizen'
                            ? 'Japanese Kaizen Craft'
                            : track.philosophy === 'chinese_progression'
                            ? 'Chinese Rigorous Progression'
                            : 'Universal Mastery'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 line-clamp-2">{track.philosophyNote}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>{track.modulesCount} Modules</span>
                      <span>•</span>
                      <span>{track.projectsCount} Capstones</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{track.targetGrades.split('&')[0]}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <Button
                      onClick={() => handleOpenProject(
                        track.id === 'track_ai_automation'
                          ? 'proj_ai_assistant'
                          : track.id === 'track_coding_computation'
                          ? 'proj_coding_maze'
                          : 'proj_robotics_sensor'
                      )}
                      variant="outline"
                      className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-8.5 rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                      <span>Inspect Capstone Workshop</span>
                    </Button>
                    <Button
                      onClick={() => handleOpenCheckout('prod_skill_monthly_999')}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-8.5 rounded-xl shadow-2xs flex items-center justify-center gap-1.5"
                    >
                      <span>Enroll Track • From ₹999/mo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EVALUATED CAPSTONE PROJECTS */}
        {/* ========================================================================= */}
        {activeTab === 'projects' && (
          <section className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <div className="max-w-3xl space-y-2">
                <h2 className="text-base font-bold text-slate-900">
                  Rubric-Evaluated Capstone Submissions
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every TalentXcel project requires tangible artifacts: clean repositories, system prompts, circuit schematics, or financial models. Evaluated against transparent mastery rubrics.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                        Capstone
                      </span>
                      <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {proj.estimatedHours} Hours
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {proj.brief}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                      <span className="font-bold text-slate-700">Required Deliverables:</span>
                      <ul className="space-y-1 text-slate-600">
                        {proj.deliverables.slice(0, 2).map((del, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleOpenProject(proj.id)}
                    className="w-full bg-slate-900 hover:bg-black text-white font-bold text-xs h-9.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Open Project Workshop &amp; Submit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SKILL STUDIO PRICING PLANS */}
        {/* ========================================================================= */}
        {activeTab === 'plans' && (
          <section className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Skill Development Subscriptions</h2>
              <p className="text-xs text-slate-500">
                Transparent monthly and annual plans. Cancel anytime. All plans include peer reviews and verified portfolio credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILL_PRODUCTS.map((prod: CommercialProduct) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between gap-6 relative"
                >
                  {prod.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-indigo-600 text-white font-bold text-[10px]">
                        Popular
                      </Badge>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {prod.domain.toUpperCase()} PLAN
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{prod.title}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {prod.tagline}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">
                        ₹{prod.basePriceRupees.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ month + 18% GST</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                      {prod.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleOpenCheckout(prod.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Subscribe with Razorpay</span>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Project Workshop Modal */}
      <ProjectWorkshopModal
        project={selectedProject}
        isOpen={isWorkshopOpen}
        onClose={() => setIsWorkshopOpen(false)}
        onEnrollTrack={() => {
          setIsWorkshopOpen(false)
          handleOpenCheckout('prod_skill_monthly_999')
        }}
      />

      {/* Razorpay Checkout Modal */}
      <RazorpayCheckoutModal
        isOpen={isCheckoutOpen}
        productId={checkoutProductId}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(entitlement) => {
          setIsCheckoutOpen(false)
          alert(`Success! Enrolled in ${entitlement.productId}. Access active until ${new Date(entitlement.validUntil).toLocaleDateString()}.`)
        }}
      />

      {/* Growth Plan Modal */}
      <GrowthPlanModal
        isOpen={isGrowthPlanOpen}
        onClose={() => setIsGrowthPlanOpen(false)}
      />
    </div>
  )
}
