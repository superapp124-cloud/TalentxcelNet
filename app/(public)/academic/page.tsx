'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  GraduationCap,
  BookOpen,
  Calculator,
  FlaskConical,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Search,
  Check,
  Award,
  Layers,
  Sparkles,
  FileText,
  Activity,
  Bookmark,
  Languages,
  Globe,
  SlidersHorizontal,
  Brain,
  Compass,
  Users,
  Target,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/navigation/site-header'
import { LessonReaderModal } from '@/components/academic/lesson-reader-modal'
import { TestRunnerModal } from '@/components/assessment/test-runner-modal'
import { GrowthPlanModal } from '@/components/intelligence/growth-plan-modal'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'
import { LivingSkillRadar } from '@/components/academic/living-skill-radar'
import { InteractiveCurriculumCockpit } from '@/components/academic/interactive-curriculum-cockpit'
import { SocraticEvaluatorDemo } from '@/components/academic/socratic-evaluator-demo'
import { SnapSolveMentor } from '@/components/academic/snap-solve-mentor'
import { ParentIntelligencePreview } from '@/components/academic/parent-intelligence-preview'
import {
  SEED_BOARDS,
  ACADEMIC_CLASSES,
  ACADEMIC_PASS_PRODUCTS,
  getCurriculumChapters,
  getAcademicLessonForChapter,
  getChapterDiagnosticTest,
  getSubjectBoardCitations,
} from '@/packages/core/src'
import type {
  BoardCode,
  AcademicLessonData,
  AssessmentBlueprint,
  AuthorizedQuestion,
  ConfidentialQuestionSolution,
  AcademicPassProduct,
} from '@/packages/core/src'

export type AcademicTab = 'curriculum' | 'mastery' | 'socratic' | 'labs' | 'parent' | 'passes'

function AcademicBrowserContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Read URL params or set defaults
  const initialBoard = (searchParams.get('board') as BoardCode) || 'CBSE'
  const initialClassNum = Number(searchParams.get('class')) || 10
  const initialSubject = searchParams.get('subject') || 'math'
  
  const validTabs: AcademicTab[] = ['curriculum', 'mastery', 'socratic', 'labs', 'parent', 'passes']
  const queryTab = searchParams.get('tab') as AcademicTab
  const initialTab: AcademicTab = validTabs.includes(queryTab) ? queryTab : 'curriculum'

  const [selectedBoardCode, setSelectedBoardCode] = useState<BoardCode>(
    ['CBSE', 'CISCE', 'IB'].includes(initialBoard) ? initialBoard : 'CBSE'
  )
  const [selectedClassNumber, setSelectedClassNumber] = useState<number>(
    initialClassNum >= 4 && initialClassNum <= 12 ? initialClassNum : 10
  )
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(initialSubject)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<AcademicTab>(initialTab)
  const [socraticSubTab, setSocraticSubTab] = useState<'snap_solve' | 'error_dna'>('snap_solve')

  // Sync state to URL without full page reload
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('board', selectedBoardCode)
    params.set('class', String(selectedClassNumber))
    params.set('subject', selectedSubjectCode)
    if (activeTab !== 'curriculum') params.set('tab', activeTab)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [selectedBoardCode, selectedClassNumber, selectedSubjectCode, activeTab, router, pathname])

  // Modals state
  const [selectedLesson, setSelectedLesson] = useState<AcademicLessonData | null>(null)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)

  const [activeBlueprint, setActiveBlueprint] = useState<AssessmentBlueprint | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<AuthorizedQuestion[]>([])
  const [activeSolutions, setActiveSolutions] = useState<ConfidentialQuestionSolution[]>([])
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false)

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isGrowthPlanOpen, setIsGrowthPlanOpen] = useState(false)

  // Current class metadata
  const currentClassMeta = useMemo(() => {
    return (
      ACADEMIC_CLASSES.find((c) => c.classNumber === selectedClassNumber) || ACADEMIC_CLASSES[6]
    )
  }, [selectedClassNumber])

  // Verify that selectedSubjectCode is valid for current class
  useEffect(() => {
    const exists = currentClassMeta.subjects.some((s) => s.code === selectedSubjectCode)
    if (!exists && currentClassMeta.subjects.length > 0) {
      setSelectedSubjectCode(currentClassMeta.subjects[0].code)
    }
  }, [currentClassMeta, selectedSubjectCode])

  // Board citations
  const boardCitations = useMemo(() => {
    return getSubjectBoardCitations(
      (selectedSubjectCode === 'math' || selectedSubjectCode === 'science' || selectedSubjectCode === 'english' || selectedSubjectCode === 'hindi' || selectedSubjectCode === 'social_science')
        ? (selectedSubjectCode as any)
        : 'math',
      selectedClassNumber,
      selectedBoardCode
    )
  }, [selectedSubjectCode, selectedClassNumber, selectedBoardCode])

  // Resolved curriculum chapters for selected Class, Subject, and Board
  const chapters = useMemo(() => {
    const raw = getCurriculumChapters(selectedClassNumber, selectedSubjectCode, selectedBoardCode)
    if (!searchQuery.trim()) return raw
    const q = searchQuery.toLowerCase().trim()
    return raw.filter(
      (ch) =>
        ch.title.toLowerCase().includes(q) ||
        (ch.disciplineName && ch.disciplineName.toLowerCase().includes(q)) ||
        ch.topics.some((t) => t.title.toLowerCase().includes(q))
    )
  }, [selectedClassNumber, selectedSubjectCode, selectedBoardCode, searchQuery])

  // Handle opening rich lesson
  const handleOpenLesson = (chapterId: string) => {
    const lesson = getAcademicLessonForChapter(
      selectedClassNumber,
      selectedSubjectCode,
      chapterId,
      selectedBoardCode
    )
    setSelectedLesson(lesson)
    setIsLessonModalOpen(true)
  }

  // Handle launching diagnostic practice (5 Qs)
  const handleLaunchPractice = (chapterId: string) => {
    const { blueprint, questions, solutions } = getChapterDiagnosticTest(
      selectedClassNumber,
      selectedSubjectCode,
      chapterId,
      selectedBoardCode,
      5
    )
    setActiveBlueprint(blueprint)
    setActiveQuestions(questions)
    setActiveSolutions(solutions)
    setIsTestRunnerOpen(true)
  }

  // Handle Checkout
  const handleOpenCheckout = (productId: string) => {
    setCheckoutProductId(productId)
    setIsCheckoutOpen(true)
  }

  // Subject icon helper
  const renderSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-3.5 h-3.5 text-amber-600" />
      case 'FlaskConical':
        return <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
      case 'BookOpen':
        return <BookOpen className="w-3.5 h-3.5 text-blue-600" />
      case 'Languages':
        return <Languages className="w-3.5 h-3.5 text-rose-600" />
      case 'Globe':
        return <Globe className="w-3.5 h-3.5 text-purple-600" />
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-600" />
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Platform Navigation */}
      <SiteHeader onOpenGrowthPlan={() => setIsGrowthPlanOpen(true)} />

      {/* Hero Header with Student Image & Quick Practice */}
      <section className="bg-white border-b border-slate-200/80 pt-4 sm:pt-5 pb-4 sm:pb-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold tracking-wide">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Domain 3: Academic Learning</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Classes 4–12 • CBSE, ICSE &amp; IB Aligned</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Calm, Curriculum-Aligned Learning for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  Classes 4 Through 12.
                </span>
              </h1>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step concept breakdowns, verified worked examples, chapter notes, and diagnostic checkpoints for deep comprehension without cognitive clutter.
              </p>
            </div>

            {/* Student Image Thumbnail & Quick Featured Lesson Action */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 shrink-0 max-w-md w-full shadow-2xs">
              <img
                src="/images/kids-academic-reading.jpg"
                alt="Student learning with books"
                className="w-20 h-20 rounded-lg object-cover shrink-0 border border-slate-200"
              />
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Class {selectedClassNumber} Sample
                  </span>
                  <Badge className="bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                    {selectedBoardCode} Verified
                  </Badge>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {chapters[0]?.title || 'Chapter 1 Overview'}
                </h4>
                <Button
                  onClick={() => handleOpenLesson(chapters[0]?.id || 'ch01')}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] h-7 px-3 rounded-lg flex items-center gap-1 w-full justify-center"
                >
                  <span>Read Lesson (Free)</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Category Tabs — The 5 Pillars of TalentXcel Academy */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'curriculum'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>1. Curriculum &amp; Lessons</span>
            </button>
            <button
              onClick={() => setActiveTab('mastery')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'mastery'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2. Mastery Engine &amp; Radar</span>
            </button>
            <button
              onClick={() => setActiveTab('socratic')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'socratic'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>3. AI Socratic Doubt Mentor</span>
            </button>
            <button
              onClick={() => setActiveTab('labs')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'labs'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>4. Discovery Labs</span>
            </button>
            <button
              onClick={() => setActiveTab('parent')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'parent'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>5. Parent Intelligence</span>
            </button>
            <button
              onClick={() => setActiveTab('passes')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'passes'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Class Passes</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-bold">
                From ₹1,999/mo
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Daily Student Learning Journey Roadmap */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-bold">
                  The Complete Daily Cycle
                </Badge>
                <span className="text-[11px] text-slate-500 font-medium">Why TalentXcel Replaces Conventional Tuition</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                Your Child&apos;s Daily Learning Operating System
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-sm sm:text-right">
              From school return at 3:30 PM to night doubt resolution at 9:30 PM — full discipline, mastery tracking, and parental transparency.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              { time: '3:30 PM', title: 'Daily Plan', desc: 'Personalized plan targeting school schedule & weaknesses', icon: Target, color: 'text-blue-600 bg-blue-50', onClick: () => setActiveTab('mastery') },
              { time: '4:00 PM', title: 'Concept Lab', desc: '60FPS interactive simulations & step-by-step derivations', icon: Sparkles, color: 'text-cyan-600 bg-cyan-50', onClick: () => setActiveTab('labs') },
              { time: '5:00 PM', title: 'Adaptive Test', desc: 'Diagnostics measuring conceptual mastery, not memorization', icon: Award, color: 'text-amber-600 bg-amber-50', onClick: () => chapters[0] && handleLaunchPractice(chapters[0].id) },
              { time: '7:00 PM', title: 'Error DNA Sprint', desc: 'Targeted exercises correcting diagnosed sign & formula slips', icon: Brain, color: 'text-rose-600 bg-rose-50', onClick: () => { setActiveTab('socratic'); setSocraticSubTab('error_dna') } },
              { time: '9:30 PM', title: 'Snap & Solve', desc: 'Upload handwritten doubt; get Socratic hints & twin verification', icon: Zap, color: 'text-emerald-600 bg-emerald-50', onClick: () => { setActiveTab('socratic'); setSocraticSubTab('snap_solve') } },
              { time: 'Sun 6:00 PM', title: 'Parent Intelligence', desc: 'Weekly evidence-based progress report sent directly to parents', icon: ShieldCheck, color: 'text-purple-600 bg-purple-50', onClick: () => setActiveTab('parent') },
            ].map((step, idx) => (
              <button
                key={idx}
                onClick={step.onClick}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all border border-slate-100 space-y-1.5 flex flex-col justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-black text-slate-400 group-hover:text-slate-600">{step.time}</span>
                  <div className={`w-6 h-6 rounded-lg ${step.color} flex items-center justify-center shrink-0`}>
                    <step.icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">{step.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: CURRICULUM BROWSER */}
        {/* ========================================================================= */}
        {activeTab === 'curriculum' && (
          <section className="space-y-6">
            {/* Next-Gen Interactive Physics Showcase Banner */}
            <div className="rounded-3xl border border-blue-200 dark:border-neutral-800 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-[#0080FF] text-white font-bold text-xs uppercase tracking-wider">
                    Next-Gen Learning Showcase
                  </Badge>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                    60FPS Ray-Tracing Physics
                  </Badge>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  Class 10 Physics: Light &amp; Ray-Tracing Lab
                </h3>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Experience the industry&apos;s most advanced academic learning engine: drag real candles on a 60FPS optical bench, solve the laser vault heist, master Cartesian signs intuitively, and learn with Socratic AI guidance.
                </p>
              </div>
              <Link href="/academic/optics-lab" className="shrink-0 w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#0080FF] hover:bg-blue-600 text-white font-extrabold text-xs h-11 px-6 rounded-2xl shadow-md gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Launch Interactive Optics Lab →</span>
                </Button>
              </Link>
            </div>

            {/* Filter Bar: Board, Class, Subject & Search */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Academic Navigation Hierarchy
                  </h2>
                  <p className="text-xs text-slate-500">
                    Board → Class → Subject → Chapter → Topic → Lesson
                  </p>
                </div>

                {/* Board Selector */}
                <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1 shrink-0">
                  {(['CBSE', 'CISCE', 'IB'] as const).map((bCode) => (
                    <button
                      key={bCode}
                      onClick={() => setSelectedBoardCode(bCode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        selectedBoardCode === bCode
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{bCode === 'CISCE' ? 'ICSE / CISCE' : bCode}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                          bCode === 'CBSE'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {bCode === 'CBSE' ? '100% Verified' : 'Aligned'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Buttons Grid (Classes 4 through 12) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">
                    Select Grade (Classes 4–12):
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    {currentClassMeta.stageLabel} • {currentClassMeta.ageGroup}
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
                  {ACADEMIC_CLASSES.map((cls) => (
                    <button
                      key={cls.classNumber}
                      onClick={() => setSelectedClassNumber(cls.classNumber)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                        selectedClassNumber === cls.classNumber
                          ? 'bg-slate-900 text-white shadow-xs scale-102'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>Class {cls.classNumber}</span>
                      <span className={`text-[9px] font-normal ${selectedClassNumber === cls.classNumber ? 'text-slate-300' : 'text-slate-500'}`}>
                        {cls.stage === 'primary' ? 'Primary' : cls.stage === 'middle' ? 'Middle' : cls.stage === 'secondary' ? 'Secondary' : 'Senior'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Tabs tailored to current class */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600">
                  Select Class {selectedClassNumber} Subject:
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {currentClassMeta.subjects.map((sub) => (
                    <button
                      key={sub.code}
                      onClick={() => setSelectedSubjectCode(sub.code)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                        selectedSubjectCode === sub.code
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {renderSubjectIcon(sub.iconName)}
                      <span>{sub.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search & Board Alignment Note */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Textbooks: <strong className="text-slate-800">{boardCitations.textbooks[0]}</strong> ({selectedBoardCode})
                  </span>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search chapter or topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Chapter & Topic Lessons Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Class {selectedClassNumber} Curriculum Chapters ({chapters.length} loaded)
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedBoardCode} 2026-27 Aligned
                </span>
              </div>

              {chapters.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
                  <p className="text-sm font-bold text-slate-800">No chapters matching your search</p>
                  <p className="text-xs text-slate-500">Try clearing the search query to see all chapters.</p>
                  <Button
                    onClick={() => setSearchQuery('')}
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-xl"
                  >
                    Clear Search
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {chapters.map((chap) => (
                    <div
                      key={chap.id}
                      className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-5 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                            Chapter {chap.chapterNumber}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {chap.disciplineName && (
                              <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 text-[10px] font-semibold">
                                {chap.disciplineName}
                              </Badge>
                            )}
                            <Badge className="bg-slate-100 text-slate-700 border-none text-[10px] font-semibold">
                              {chap.topics.length} Topics
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {chap.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            Verified curriculum-aligned concept breakdowns, step-by-step worked solutions, and practice checkpoints.
                          </p>
                        </div>

                        {/* Topics Pill List */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-slate-500 text-[11px]">
                            <span className="font-bold text-slate-700">Curriculum Topics:</span>
                            <span>{chap.targetQuestionCount.toLocaleString()} Qs Bank</span>
                          </div>
                          <ul className="space-y-1 text-slate-600">
                            {chap.topics.map((t) => (
                              <li key={t.id} className="flex items-start gap-1.5 text-[11px] leading-tight">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                                <span className="line-clamp-1">{t.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2 pt-3 border-t border-slate-100">
                        {chap.title.toLowerCase().includes('light') && (
                          <Link href="/academic/optics-lab" className="block w-full">
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs h-9 rounded-xl shadow-xs gap-1.5 cursor-pointer">
                              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                              <span>Launch 60FPS Interactive Optics Lab →</span>
                            </Button>
                          </Link>
                        )}
                        <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => handleOpenLesson(chap.id)}
                          variant="outline"
                          className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-8.5 rounded-xl flex items-center justify-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Read Lesson</span>
                        </Button>
                        <Button
                          onClick={() => handleLaunchPractice(chap.id)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8.5 rounded-xl shadow-2xs flex items-center justify-center gap-1"
                        >
                          <span>Take Test (5 Qs)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MASTERY ENGINE & LIVING SKILL RADAR */}
        {/* ========================================================================= */}
        {activeTab === 'mastery' && (
          <section className="space-y-12">
            <LivingSkillRadar onEnrolClick={() => setActiveTab('passes')} />
            <InteractiveCurriculumCockpit
              onEnrolClick={() => setActiveTab('passes')}
              onTryLabClick={() => setActiveTab('labs')}
            />
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: AI SOCRATIC DOUBT MENTOR & ERROR DNA */}
        {/* ========================================================================= */}
        {activeTab === 'socratic' && (
          <section className="space-y-6">
            {/* Sub-tab Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 dark:bg-neutral-900 rounded-2xl max-w-xl mx-auto border border-slate-200 dark:border-neutral-800">
              <button
                onClick={() => setSocraticSubTab('snap_solve')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  socraticSubTab === 'snap_solve'
                    ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                <span>Snap &amp; Solve AI Mentor</span>
                <Badge variant="outline" className="text-[9px] border-emerald-500/30 text-emerald-600 dark:text-emerald-400 py-0 px-1">
                  Pillar 2
                </Badge>
              </button>

              <button
                onClick={() => setSocraticSubTab('error_dna')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  socraticSubTab === 'error_dna'
                    ? 'bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-rose-500" />
                <span>Error DNA Diagnostic Lab</span>
              </button>
            </div>

            {socraticSubTab === 'snap_solve' ? (
              <SnapSolveMentor />
            ) : (
              <SocraticEvaluatorDemo />
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: INTERACTIVE DISCOVERY LABS */}
        {/* ========================================================================= */}
        {activeTab === 'labs' && (
          <section className="space-y-6">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <Badge variant="outline" className="border-blue-500/30 text-blue-600">
                Pillar 3: Active Experimentation vs Passive Memorization
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Interactive Concept Discovery Labs
              </h2>
              <p className="text-sm text-slate-600">
                Conventional tuitions rely on chalkboards and rote formulas. TalentXcel students manipulate real physics variables, balance chemical reactions, and observe wave optics in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Lab 1: Optics Lab */}
              <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-6 shadow-xl flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-[#0080FF] text-white text-[10px] font-bold">Class 10 Physics</Badge>
                    <span className="text-[10px] font-extrabold text-cyan-300">60FPS Ray Tracing</span>
                  </div>
                  <h3 className="text-xl font-black">Light &amp; Ray-Tracing Lab</h3>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Interactive optical bench with movable candles, concave/convex mirrors, lens formula calculator, and the Laser Vault Heist gamified challenge.
                  </p>
                </div>
                <Link href="/academic/optics-lab" className="block w-full">
                  <Button className="w-full bg-[#0080FF] hover:bg-blue-600 text-white font-extrabold text-xs h-10 rounded-xl gap-2 cursor-pointer">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Launch Optics Lab →</span>
                  </Button>
                </Link>
              </div>

              {/* Lab 2: Gravitational Sandbox */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-purple-100 text-purple-800 text-[10px] font-bold">Class 9 Physics</Badge>
                    <span className="text-[10px] font-bold text-slate-400">Inverse Square Law</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Gravitation &amp; Orbital Force</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vary distance between planetary masses to visualize non-linear gravitational drop-off and eliminate the common 2r vs 4r calculation trap.
                  </p>
                </div>
                <Button
                  onClick={() => setActiveTab('socratic')}
                  variant="outline"
                  className="w-full text-xs font-bold h-10 rounded-xl gap-2 cursor-pointer"
                >
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span>Try Gravitation Challenge →</span>
                </Button>
              </div>

              {/* Lab 3: Quadratic Parabola Explorer */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-amber-100 text-amber-800 text-[10px] font-bold">Class 10 Math</Badge>
                    <span className="text-[10px] font-bold text-slate-400">Geometry of Algebra</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900">Quadratic Parabola &amp; Roots</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Watch parabolas translate vertically and observe real-time roots vanish as Discriminant D transitions from positive to zero to negative.
                  </p>
                </div>
                <Button
                  onClick={() => setActiveTab('curriculum')}
                  variant="outline"
                  className="w-full text-xs font-bold h-10 rounded-xl gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Explore Quadratic Chapter →</span>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: SUNDAY PARENT INTELLIGENCE */}
        {/* ========================================================================= */}
        {activeTab === 'parent' && (
          <section className="space-y-6">
            <ParentIntelligencePreview onEnrolClick={() => setActiveTab('passes')} />
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CLASS MONTHLY PASSES */}
        {/* ========================================================================= */}
        {activeTab === 'passes' && (
          <section className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Academic Class Monthly Passes (Classes 4–12)
              </h2>
              <p className="text-xs text-slate-500">
                Unlimited access to verified lessons, worked solutions, and full diagnostic test banks for your grade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ACADEMIC_PASS_PRODUCTS.map((prod: AcademicPassProduct) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between gap-6 relative"
                >
                  {prod.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-emerald-600 text-white font-bold text-[10px]">
                        Popular
                      </Badge>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                        {prod.classRange} PASS
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{prod.title}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                        {prod.tagline}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">
                        ₹{prod.basePriceRupees.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">/ month + 18% GST</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                      {prod.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleOpenCheckout(prod.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Get Pass with Razorpay</span>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Lesson Reader Modal */}
      <LessonReaderModal
        lesson={selectedLesson}
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        onLaunchPractice={() => {
          setIsLessonModalOpen(false)
          if (selectedLesson?.chapterId) {
            handleLaunchPractice(selectedLesson.chapterId)
          }
        }}
      />

      {/* Test Runner Modal */}
      <TestRunnerModal
        blueprint={activeBlueprint}
        questions={activeQuestions}
        solutions={activeSolutions}
        isOpen={isTestRunnerOpen}
        onClose={() => setIsTestRunnerOpen(false)}
        onUnlockPaidPack={(prodId) => handleOpenCheckout(prodId)}
      />

      {/* Razorpay Checkout Modal */}
      <RazorpayCheckoutModal
        isOpen={isCheckoutOpen}
        productId={checkoutProductId}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(entitlement) => {
          setIsCheckoutOpen(false)
          alert(`Success! Subscribed to ${entitlement.productId}. Valid through ${new Date(entitlement.validUntil).toLocaleDateString()}.`)
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

export default function AcademicPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <div className="text-center space-y-2">
            <GraduationCap className="w-8 h-8 text-emerald-600 animate-pulse mx-auto" />
            <p className="text-xs font-bold text-slate-600">Loading Academic Learning Browser...</p>
          </div>
        </div>
      }
    >
      <AcademicBrowserContent />
    </Suspense>
  )
}
