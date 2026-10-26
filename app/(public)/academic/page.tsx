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
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/navigation/site-header'
import { LessonReaderModal } from '@/components/academic/lesson-reader-modal'
import { TestRunnerModal } from '@/components/assessment/test-runner-modal'
import { GrowthPlanModal } from '@/components/intelligence/growth-plan-modal'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'
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

function AcademicBrowserContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Read URL params or set defaults
  const initialBoard = (searchParams.get('board') as BoardCode) || 'CBSE'
  const initialClassNum = Number(searchParams.get('class')) || 10
  const initialSubject = searchParams.get('subject') || 'math'
  const initialTab = searchParams.get('tab') === 'passes' ? 'passes' : 'curriculum'

  const [selectedBoardCode, setSelectedBoardCode] = useState<BoardCode>(
    ['CBSE', 'CISCE', 'IB'].includes(initialBoard) ? initialBoard : 'CBSE'
  )
  const [selectedClassNumber, setSelectedClassNumber] = useState<number>(
    initialClassNum >= 4 && initialClassNum <= 12 ? initialClassNum : 10
  )
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>(initialSubject)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'curriculum' | 'passes'>(initialTab)

  // Sync state to URL without full page reload
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('board', selectedBoardCode)
    params.set('class', String(selectedClassNumber))
    params.set('subject', selectedSubjectCode)
    if (activeTab === 'passes') params.set('tab', 'passes')
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

          {/* Navigation Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'curriculum'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Curriculum Browser &amp; Lessons</span>
            </button>
            <button
              onClick={() => setActiveTab('passes')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'passes'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Class Passes (Classes 4–12)</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full font-bold">
                From ₹1,999/mo
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ========================================================================= */}
        {/* TAB 1: CURRICULUM BROWSER */}
        {/* ========================================================================= */}
        {activeTab === 'curriculum' && (
          <section className="space-y-6">
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
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
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
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CLASS MONTHLY PASSES */}
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
