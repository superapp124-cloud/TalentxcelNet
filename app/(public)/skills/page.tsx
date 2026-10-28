'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Home,
  MessageSquare,
  Coins,
  ShieldCheck,
  Compass,
  Users,
  BookOpen,
  Globe,
  CheckCircle2,
  Briefcase,
  Clock,
  ArrowRight,
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
  Lightbulb,
  Heart,
  HelpCircle,
  FileCheck,
  Volume2,
  Sparkles,
  Play,
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

const LIFE_SKILL_CATEGORIES = [
  { id: 'all', label: 'All Life Skills' },
  { id: 'life_independence', label: 'Independence & Daily Living' },
  { id: 'life_communication', label: 'Communication & Confidence' },
  { id: 'life_money_management', label: 'Money Management (₹)' },
  { id: 'life_safety_health', label: 'Safety, Health & Well-being' },
  { id: 'life_critical_thinking', label: 'Critical Thinking' },
  { id: 'life_social_teamwork', label: 'Social Skills & Teamwork' },
  { id: 'life_study_skills', label: 'Study Skills' },
  { id: 'life_citizenship_community', label: 'Practical Citizenship' },
] as const

function SkillsBrowserContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Read URL params or set defaults
  const initialClassNum = Number(searchParams.get('class')) || 6
  const initialCategory = searchParams.get('category') || 'all'
  const initialTab = searchParams.get('tab') === 'projects' ? 'projects' : searchParams.get('tab') === 'plans' ? 'plans' : 'tracks'

  const [selectedClassNumber, setSelectedClassNumber] = useState<number>(
    initialClassNum >= 4 && initialClassNum <= 9 ? initialClassNum : 6
  )
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'tracks' | 'projects' | 'plans'>(initialTab)

  // Sync state to URL without full page reload
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('class', String(selectedClassNumber))
    if (selectedCategory !== 'all') params.set('category', selectedCategory)
    if (activeTab !== 'tracks') params.set('tab', activeTab)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [selectedClassNumber, selectedCategory, activeTab, router, pathname])

  // Modals state
  const [selectedTrack, setSelectedTrack] = useState<ClassSkillTrackMeta | null>(null)
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false)

  const [selectedProject, setSelectedProject] = useState<ClassSkillProject | null>(null)
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false)

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isGrowthPlanOpen, setIsGrowthPlanOpen] = useState(false)

  // Current stage metadata
  const { stage, stageLabel, lifeSkillStage, lifeSkillStageLabel } = useMemo(() => {
    return getSkillStage(selectedClassNumber)
  }, [selectedClassNumber])

  // Resolved 8 real-life skill tracks for the selected class
  const classTracks = useMemo(() => {
    return getClassSkillTracks(selectedClassNumber)
  }, [selectedClassNumber])

  // Filtered tracks based on category and search query
  const filteredTracks = useMemo(() => {
    return classTracks.filter((track) => {
      const matchesCategory = selectedCategory === 'all' || track.category === selectedCategory
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        track.title.toLowerCase().includes(q) ||
        track.classSpecificTitle.toLowerCase().includes(q) ||
        track.description.toLowerCase().includes(q) ||
        track.whyItMatters.toLowerCase().includes(q) ||
        track.realLifeScenario.toLowerCase().includes(q) ||
        track.tools.some((t) => t.toLowerCase().includes(q))
      return matchesCategory && matchesSearch
    })
  }, [classTracks, selectedCategory, searchQuery])

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
      case 'Home':
        return <Home className="w-5 h-5 text-indigo-600" />
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-blue-600" />
      case 'Coins':
        return <Coins className="w-5 h-5 text-emerald-600" />
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-rose-600" />
      case 'Compass':
        return <Compass className="w-5 h-5 text-amber-600" />
      case 'Users':
        return <Users className="w-5 h-5 text-purple-600" />
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-sky-600" />
      case 'Globe':
        return <Globe className="w-5 h-5 text-teal-600" />
      default:
        return <Compass className="w-5 h-5 text-slate-600" />
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Platform Navigation */}
      <SiteHeader onOpenGrowthPlan={() => setIsGrowthPlanOpen(true)} />

      {/* Hero Header: Real-Life Skills for a More Confident You */}
      <section className="bg-white border-b border-slate-200/80 pt-5 sm:pt-6 pb-5 sm:pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold tracking-wide">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>Domain 2: Skill Development</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                <span>Real-Life Skills for Classes 4–9</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Real-Life Skills for a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                  More Confident You
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Learn to make decisions, manage money, communicate confidently, stay safe and handle everyday challenges—one practical skill at a time.
              </p>
            </div>

            {/* Quick Practical Action Card */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-3 shrink-0 max-w-md w-full shadow-2xs">
              <div className="w-14 h-14 rounded-xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center shrink-0">
                <Briefcase className="w-7 h-7" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Class {selectedClassNumber} Practical Challenge
                  </span>
                  <Badge className="bg-emerald-100 text-emerald-900 text-[9px] font-bold">
                    Safe Practice
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {classProjects[0]?.title || 'Practical Activity'}
                </h4>
                <Button
                  onClick={() => handleOpenProject(classProjects[0]?.id || 'proj_indep')}
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
              <Compass className="w-3.5 h-3.5" />
              <span>8 Essential Life Skill Areas</span>
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
              <span>Class {selectedClassNumber} Practical Projects ({classProjects.length})</span>
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
              <span>Life Skills Passes</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-bold">
                From ₹999/mo
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ========================================================================= */}
        {/* TAB 1: 8 REAL-LIFE SKILL TRACKS */}
        {/* ========================================================================= */}
        {activeTab === 'tracks' && (
          <section className="space-y-6">
            {/* Filter and Class Selection Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              {/* Class Selector Bar: Classes 4 to 9 */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">
                    Select Learner Grade (Classes 4–9):
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100">
                      {lifeSkillStageLabel || stageLabel}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[4, 5, 6, 7, 8, 9].map((cNum) => (
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
                        {cNum <= 5 ? 'Foundation' : cNum <= 7 ? 'Independence' : 'Applied'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter & Search Bar */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {LIFE_SKILL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-slate-900 text-white shadow-2xs font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72 shrink-0">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search practical skills, situations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            </div>

            {/* 4 Interactive Pillars Subscription Value Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-indigo-500/20 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
                      Why Parents &amp; Schools Subscribe to Life Skills Pass (₹999/mo)
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-white mt-1">
                    Hands-On Practical Mastery for Class {selectedClassNumber} · {lifeSkillStageLabel}
                  </h3>
                </div>

                <Badge className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 shadow-md self-start sm:self-center">
                  ⭐ NEP 2020 Aligned Practical Labs
                </Badge>
              </div>

              {/* 4 Value Pillars Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 space-y-1">
                  <span className="text-lg">🎮</span>
                  <div className="font-black text-white leading-tight">Interactive Simulators</div>
                  <p className="text-[11px] text-indigo-200">Bag packers, cash register &amp; first-aid responders</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 space-y-1">
                  <span className="text-lg">🎙️</span>
                  <div className="font-black text-white leading-tight">Coach Voice Studio</div>
                  <p className="text-[11px] text-indigo-200">Coach Maya &amp; Rohan real spoken audio guidance</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 space-y-1">
                  <span className="text-lg">🏆</span>
                  <div className="font-black text-white leading-tight">Official Certificates</div>
                  <p className="text-[11px] text-indigo-200">Accredited QR-verifiable competency credentials</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 space-y-1">
                  <span className="text-lg">📋</span>
                  <div className="font-black text-white leading-tight">Fridge Mission Cards</div>
                  <p className="text-[11px] text-indigo-200">Printable weekend home habit contracts for parents</p>
                </div>
              </div>
            </div>

            {/* Life Skills Grid (8 Real-Life Tracks for selected class) */}
            {/* Life Skills Grid (8 Real-Life Tracks for selected class) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTracks.map((track) => {
                const getPastelTheme = (cat: string) => {
                  switch (cat) {
                    case 'life_independence':
                      return { card: 'bg-amber-50/40 hover:bg-amber-50/70 border-amber-200/80', icon: 'bg-amber-100/80 text-amber-800 border-amber-300/80', bar: 'bg-amber-500' }
                    case 'life_safety_health':
                      return { card: 'bg-emerald-50/40 hover:bg-emerald-50/70 border-emerald-200/80', icon: 'bg-emerald-100/80 text-emerald-800 border-emerald-300/80', bar: 'bg-emerald-500' }
                    case 'life_money_management':
                      return { card: 'bg-blue-50/40 hover:bg-blue-50/70 border-blue-200/80', icon: 'bg-blue-100/80 text-blue-800 border-blue-300/80', bar: 'bg-blue-500' }
                    case 'life_communication':
                      return { card: 'bg-pink-50/40 hover:bg-pink-50/70 border-pink-200/80', icon: 'bg-pink-100/80 text-pink-800 border-pink-300/80', bar: 'bg-pink-500' }
                    case 'life_critical_thinking':
                      return { card: 'bg-purple-50/40 hover:bg-purple-50/70 border-purple-200/80', icon: 'bg-purple-100/80 text-purple-800 border-purple-300/80', bar: 'bg-purple-500' }
                    case 'life_social_teamwork':
                      return { card: 'bg-teal-50/40 hover:bg-teal-50/70 border-teal-200/80', icon: 'bg-teal-100/80 text-teal-800 border-teal-300/80', bar: 'bg-teal-500' }
                    default:
                      return { card: 'bg-slate-50/50 hover:bg-slate-100/60 border-slate-200', icon: 'bg-slate-100 text-slate-800 border-slate-300', bar: 'bg-blue-500' }
                  }
                }
                const theme = getPastelTheme(track.category)

                return (
                  <div
                    key={track.id}
                    className={`rounded-2xl sm:rounded-3xl border p-5 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between gap-4 group ${theme.card}`}
                  >
                    <div className="space-y-3">
                      {/* Header: Icon, Class, and Category */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-xl shadow-2xs ${theme.icon}`}>
                          {getTrackIcon(track.iconName)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Badge className="bg-white/90 text-slate-700 border-slate-200 text-[10px] font-bold">
                            Class {track.classNumber}
                          </Badge>
                          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[9px] font-bold flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Interactive</span>
                          </Badge>
                        </div>
                      </div>

                      {/* Titles & Subtitle matching Image 2 */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                          {track.title}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mt-0.5">
                          {track.classSpecificTitle}
                        </h4>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                          Practice · Tests · Revision
                        </p>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                          {track.description}
                        </p>
                      </div>

                      {/* Everyday Scenario Callout */}
                      <div className="p-2.5 bg-white/80 border border-slate-200/80 rounded-xl space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-blue-600" />
                          <span>Real Scenario</span>
                        </span>
                        <p className="text-[11px] text-slate-700 italic line-clamp-2 leading-tight">
                          "{track.realLifeScenario}"
                        </p>
                      </div>

                      {/* Thin Progress Bar matching Image 2 */}
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                          <span>Progress: 3 / 8 Tests</span>
                          <span className="text-emerald-600 font-bold">Interactive Active</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                          <div className={`h-full ${theme.bar} rounded-full`} style={{ width: '38%' }} />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2 border-t border-slate-200/60">
                      <Button
                        onClick={() => handleOpenCurriculum(track)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-9 rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Start Practice &amp; Video</span>
                      </Button>
                      <Button
                        onClick={() => handleOpenProject(track.capstoneProject.id)}
                        variant="outline"
                        className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-white bg-white/70 h-8 rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>Certificate &amp; Project</span>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: EVALUATED PRACTICAL PROJECTS */}
        {/* ========================================================================= */}
        {activeTab === 'projects' && (
          <section className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-2xl space-y-1.5">
                <h2 className="text-base font-bold text-slate-900">
                  Class {selectedClassNumber} Real-Life Practical Projects ({classProjects.length})
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Every TalentXcel life project produces tangible, verified deliverables: completed school readiness checklists, grocery budgets, emergency cards, and decision reflection journals.
                </p>
              </div>

              {/* Quick Class Switcher */}
              <div className="flex items-center gap-1 shrink-0 overflow-x-auto pb-1 sm:pb-0">
                {[4, 5, 6, 7, 8, 9].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedClassNumber(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedClassNumber === c
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Class {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                        Class {project.classNumber} Project
                      </Badge>
                      <Badge variant="outline" className="text-[10px] font-semibold text-slate-600 capitalize">
                        {project.difficulty}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {project.brief}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Deliverables Required:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {project.deliverables.slice(0, 2).map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleOpenProject(project.id)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-8.5 rounded-xl shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <span>Launch Practical Workshop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: LIFE SKILLS STUDIO PLANS */}
        {/* ========================================================================= */}
        {activeTab === 'plans' && (
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Transparent Life Skills Studio Plans
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Full access to age-appropriate learning pathways, practical workshops, decision-making scenarios, and verified mentor evaluations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {SKILL_STUDIO_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-3xl border p-6 flex flex-col justify-between gap-6 transition-all hover:shadow-lg ${
                    plan.popular
                      ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    {plan.popular && (
                      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase tracking-wider inline-block">
                        Most Popular for Families
                      </span>
                    )}

                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">{plan.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{plan.tagline}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">
                        ₹{plan.basePriceRupees}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        / {plan.periodLabel}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleOpenCheckout(plan.id)}
                    className={`w-full font-bold text-xs h-9 rounded-xl shadow-xs ${
                      plan.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modals */}
      <TrackCurriculumModal
        track={selectedTrack}
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
        onOpenWorkshop={(projectId) => handleOpenProject(projectId)}
        onEnrollTrack={(productId) => handleOpenCheckout(productId)}
      />

      <ProjectWorkshopModal
        project={selectedProject}
        isOpen={isWorkshopOpen}
        onClose={() => setIsWorkshopOpen(false)}
        onEnrollTrack={() => handleOpenCheckout('prod_skill_monthly_999')}
      />

      <GrowthPlanModal
        isOpen={isGrowthPlanOpen}
        onClose={() => setIsGrowthPlanOpen(false)}
      />

      {checkoutProductId && (
        <RazorpayCheckoutModal
          productId={checkoutProductId}
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </div>
  )
}

export default function SkillsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <Compass className="w-5 h-5 animate-spin text-indigo-600" />
            <span>Loading Real-Life Skills Studio...</span>
          </div>
        </div>
      }
    >
      <SkillsBrowserContent />
    </Suspense>
  )
}
