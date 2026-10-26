'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
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
  SlidersHorizontal,
  Wrench,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/navigation/site-header'
import { ProjectWorkshopModal } from '@/components/skills/project-workshop-modal'
import { TrackCurriculumModal } from '@/components/skills/track-curriculum-modal'
import { GrowthPlanModal } from '@/components/intelligence/growth-plan-modal'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'
import {
  getClassSkillTracks,
  getSkillStage,
  getSkillProjectById,
  getAllClassProjects,
  SKILL_STUDIO_PLANS,
} from '@/packages/core/src'
import type {
  ClassSkillTrackMeta,
  ClassSkillProject,
  SkillStudioPlanProduct,
  SkillStage,
} from '@/packages/core/src'

function SkillsBrowserContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Read URL params or set defaults
  const initialClassNum = Number(searchParams.get('class')) || 8
  const initialLevel = (searchParams.get('level') as any) || 'all'
  const initialTab = searchParams.get('tab') === 'projects' ? 'projects' : searchParams.get('tab') === 'plans' ? 'plans' : 'tracks'

  const [selectedClassNumber, setSelectedClassNumber] = useState<number>(
    initialClassNum >= 4 && initialClassNum <= 12 ? initialClassNum : 8
  )
  const [levelFilter, setLevelFilter] = useState<'all' | 'foundation' | 'intermediate' | 'advanced'>(
    ['all', 'foundation', 'intermediate', 'advanced'].includes(initialLevel) ? initialLevel : 'all'
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'tracks' | 'projects' | 'plans'>(initialTab)

  // Sync state to URL without full page reload
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('class', String(selectedClassNumber))
    if (levelFilter !== 'all') params.set('level', levelFilter)
    if (activeTab !== 'tracks') params.set('tab', activeTab)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [selectedClassNumber, levelFilter, activeTab, router, pathname])

  // Modals state
  const [selectedTrack, setSelectedTrack] = useState<ClassSkillTrackMeta | null>(null)
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false)

  const [selectedProject, setSelectedProject] = useState<ClassSkillProject | null>(null)
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false)

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isGrowthPlanOpen, setIsGrowthPlanOpen] = useState(false)

  // Current stage metadata
  const { stage, stageLabel } = useMemo(() => {
    return getSkillStage(selectedClassNumber)
  }, [selectedClassNumber])

  // Resolved 8 skill tracks for the selected class
  const classTracks = useMemo(() => {
    return getClassSkillTracks(selectedClassNumber)
  }, [selectedClassNumber])

  // Filtered tracks based on search and level
  const filteredTracks = useMemo(() => {
    return classTracks.filter((track) => {
      const matchesLevel = levelFilter === 'all' || track.level === levelFilter
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        track.title.toLowerCase().includes(q) ||
        track.classSpecificTitle.toLowerCase().includes(q) ||
        track.description.toLowerCase().includes(q) ||
        track.tools.some((t) => t.toLowerCase().includes(q))
      return matchesLevel && matchesSearch
    })
  }, [classTracks, levelFilter, searchQuery])

  // Projects list for selected class
  const classProjects = useMemo(() => {
    const raw = classTracks.map((t) => t.capstoneProject)
    if (!searchQuery.trim()) return raw
    const q = searchQuery.toLowerCase().trim()
    return raw.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brief.toLowerCase().includes(q) ||
        p.deliverables.some((d) => d.toLowerCase().includes(q))
    )
  }, [classTracks, searchQuery])

  // Open Curriculum modal
  const handleOpenCurriculum = (track: ClassSkillTrackMeta) => {
    setSelectedTrack(track)
    setIsCurriculumModalOpen(true)
  }

  // Open Capstone Workshop modal
  const handleOpenProject = (projectId: string) => {
    const proj = getSkillProjectById(projectId) || classProjects[0]
    setSelectedProject(proj)
    setIsWorkshopOpen(true)
  }

  // Handle checkout
  const handleOpenCheckout = (productId: string) => {
    setCheckoutProductId(productId)
    setIsCheckoutOpen(true)
  }

  // Icon helper
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

      {/* Hero Header with Student Image & Quick Capstone Action */}
      <section className="bg-white border-b border-slate-200/80 pt-4 sm:pt-5 pb-4 sm:pb-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold tracking-wide">
                <Code className="w-3.5 h-3.5" />
                <span>Domain 2: Skill Development</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>8 Structured Tracks • Class-Calibrated Progression</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Learn by Doing, Building and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  Mastering Real Skills.
                </span>
              </h1>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured learning outcomes, practical capstone projects, and evaluated submissions. Master AI, code, robotics, design, debate and venture building tailored to your grade from ₹999/month.
              </p>
            </div>

            {/* Student Image Thumbnail & Quick Capstone Action */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 shrink-0 max-w-md w-full shadow-2xs">
              <img
                src="/images/kids-skills-coding.jpg"
                alt="Students learning hands-on coding"
                className="w-20 h-20 rounded-lg object-cover shrink-0 border border-slate-200"
              />
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Class {selectedClassNumber} Capstone
                  </span>
                  <Badge className="bg-indigo-100 text-indigo-800 text-[9px] font-bold">
                    Evaluated
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {classProjects[0]?.title || 'Capstone Project'}
                </h4>
                <Button
                  onClick={() => handleOpenProject(classProjects[0]?.id || 'proj_ai')}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] h-7 px-3 rounded-lg flex items-center gap-1 w-full justify-center"
                >
                  <span>Open Workshop</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab('tracks')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'tracks'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>8 Skill Tracks</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Class {selectedClassNumber} Capstones ({classProjects.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'plans'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Skill Studio Plans</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-bold">
                From ₹999/mo
              </span>
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
            {/* Filter and Class Selection Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              {/* Class Selector Bar */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">
                    Select Learner Grade (Classes 4–12):
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                      {stageLabel}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
                  {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((cNum) => (
                    <button
                      key={cNum}
                      onClick={() => setSelectedClassNumber(cNum)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                        selectedClassNumber === cNum
                          ? 'bg-indigo-600 text-white shadow-xs scale-102'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>Class {cNum}</span>
                      <span className={`text-[9px] font-normal ${selectedClassNumber === cNum ? 'text-indigo-200' : 'text-slate-500'}`}>
                        {cNum <= 5 ? 'Junior' : cNum <= 8 ? 'Middle' : cNum <= 10 ? 'Secondary' : 'Senior'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter & Search Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                    placeholder="Search track, tools or outcome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Tracks Grid (8 Tracks for selected class) */}
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
                      <div className="flex items-center gap-1.5">
                        <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[10px] font-bold">
                          Class {track.classNumber}
                        </Badge>
                        <Badge className="bg-slate-100 text-slate-700 border-slate-200 text-[10px] font-bold capitalize">
                          {track.level}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        {track.title}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug mt-0.5">
                        {track.classSpecificTitle}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">
                        {track.description}
                      </p>
                    </div>

                    {/* Tools Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {track.tools.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700 border border-slate-200"
                        >
                          {t}
                        </span>
                      ))}
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
                      <span>{track.weeklyModules.length} Modules</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{track.capstoneProject.estimatedHours}h Capstone</span>
                      <span>•</span>
                      <span className="font-semibold text-indigo-600">Rubric Scored</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <Button
                      onClick={() => handleOpenCurriculum(track)}
                      variant="outline"
                      className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-8.5 rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Inspect Modules &amp; Tools</span>
                    </Button>
                    <Button
                      onClick={() => handleOpenProject(track.capstoneProject.id)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-8.5 rounded-xl shadow-2xs flex items-center justify-center gap-1.5"
                    >
                      <span>Open Workshop • From ₹999/mo</span>
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
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-2xl space-y-1.5">
                <h2 className="text-base font-bold text-slate-900">
                  Class {selectedClassNumber} Rubric-Evaluated Capstones ({classProjects.length})
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every TalentXcel capstone produces tangible deliverables: verified prompt scripts, Python code, circuit schematics, or lean canvases evaluated against transparent mastery rubrics.
                </p>
              </div>

              {/* Quick Class Switcher */}
              <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-1 sm:pb-0">
                {[4, 6, 8, 10, 12].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedClassNumber(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedClassNumber === c
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Cl {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Badge className="bg-indigo-600 text-white text-[10px] font-bold">
                          Class {proj.classNumber}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] font-semibold text-slate-600 capitalize">
                          {proj.difficulty}
                        </Badge>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {proj.estimatedHours} Hours
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-3">
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
                    <span>Open Workshop &amp; Submit</span>
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
              <h2 className="text-base font-bold text-slate-900">
                Skill Development Subscriptions
              </h2>
              <p className="text-xs text-slate-500">
                Transparent monthly, semester, and annual plans. Cancel anytime. All plans include peer reviews, rubric evaluations, and verified credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILL_STUDIO_PLANS.map((prod: SkillStudioPlanProduct) => (
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
                        SKILL STUDIO {prod.period.toUpperCase()}
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
                      <span className="text-xs text-slate-400 font-medium">/ {prod.periodLabel.toLowerCase()} + 18% GST</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                      {prod.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
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

      {/* Track Curriculum & Module Inspector Modal */}
      <TrackCurriculumModal
        track={selectedTrack}
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        onOpenWorkshop={(projectId) => handleOpenProject(projectId)}
        onEnrollTrack={(productId) => handleOpenCheckout(productId)}
      />

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

export default function SkillsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="text-center space-y-2">
            <Code className="w-8 h-8 text-indigo-600 animate-pulse mx-auto" />
            <p className="text-xs font-bold text-slate-600">Loading Skill Development Tracks...</p>
          </div>
        </div>
      }
    >
      <SkillsBrowserContent />
    </Suspense>
  )
}
