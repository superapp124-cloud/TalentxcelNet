'use client'

import React, { useState, useMemo } from 'react'
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
  SEED_CLASSES,
  SEED_SUBJECTS,
  SEED_GRADE4_SUBJECTS,
  SEED_CHAPTERS,
  SEED_ACADEMIC_LESSONS,
  SEED_BLUEPRINTS,
  SEED_AUTHORIZED_QUESTIONS,
  ACADEMIC_PRODUCTS,
} from '@/packages/core/src'
import type {
  AcademicLesson,
  AssessmentBlueprint,
  AuthorizedQuestion,
  CommercialProduct,
} from '@/packages/core/src'

export default function AcademicPage() {
  const [selectedBoardId, setSelectedBoardId] = useState<string>('board_cbse')
  const [selectedClassId, setSelectedClassId] = useState<string>('class_g4')
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('math')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'curriculum' | 'passes'>('curriculum')

  // Modals state
  const [selectedLesson, setSelectedLesson] = useState<AcademicLesson | null>(null)
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false)

  const [activeBlueprint, setActiveBlueprint] = useState<AssessmentBlueprint | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<AuthorizedQuestion[]>([])
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false)

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const [isGrowthPlanOpen, setIsGrowthPlanOpen] = useState(false)

  // Current selections
  const currentBoard = SEED_BOARDS.find((b) => b.id === selectedBoardId) || SEED_BOARDS[0]
  const currentClass = SEED_CLASSES.find((c) => c.id === selectedClassId) || SEED_CLASSES[1]

  // Filtered chapters for current selection
  const classChapters = useMemo(() => {
    let chapters = SEED_CHAPTERS.filter(
      (ch) => ch.subjectId.includes(selectedSubjectCode) || ch.id.includes(selectedSubjectCode)
    )
    if (chapters.length === 0) {
      chapters = SEED_CHAPTERS.slice(0, 3)
    }
    if (!searchQuery.trim()) return chapters
    const q = searchQuery.toLowerCase()
    return chapters.filter(
      (ch) => ch.title.toLowerCase().includes(q) || (ch.description && ch.description.toLowerCase().includes(q))
    )
  }, [selectedSubjectCode, searchQuery])

  // Filtered lessons
  const filteredLessons = useMemo(() => {
    return SEED_ACADEMIC_LESSONS
  }, [])

  // Open Lesson Reader
  const handleOpenLesson = (lessonId: string) => {
    const lesson = SEED_ACADEMIC_LESSONS.find((l) => l.id === lessonId) || SEED_ACADEMIC_LESSONS[0]
    setSelectedLesson(lesson)
    setIsLessonModalOpen(true)
  }

  // Open Diagnostic Test for chapter
  const handleLaunchPractice = (blueprintId: string) => {
    const bp = SEED_BLUEPRINTS.find((b) => b.id === blueprintId) || SEED_BLUEPRINTS[0]
    setActiveBlueprint(bp)
    setActiveQuestions(SEED_AUTHORIZED_QUESTIONS.slice(0, bp.totalQuestions || 5))
    setIsTestRunnerOpen(true)
  }

  // Handle Checkout
  const handleOpenCheckout = (productId: string) => {
    setCheckoutProductId(productId)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      {/* Platform Navigation */}
      <SiteHeader onOpenGrowthPlan={() => setIsGrowthPlanOpen(true)} />

      {/* Compact Hero Header with Student Image */}
      <section className="bg-white border-b border-slate-200/80 pt-4 sm:pt-5 pb-4 sm:pb-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold tracking-wide">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Domain 3: Academic Learning</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>CBSE Verified • CISCE &amp; IB</span>
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

            {/* Student Image Thumbnail & Quick Lesson Action */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 shrink-0 max-w-md w-full shadow-2xs">
              <img
                src="/images/kids-academic-reading.jpg"
                alt="Student learning with books"
                className="w-20 h-20 rounded-lg object-cover shrink-0 border border-slate-200"
              />
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Featured Lesson</span>
                  <Badge className="bg-emerald-100 text-emerald-800 text-[9px] font-bold">Class 4 Math</Badge>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">Understanding Multiples</h4>
                <Button
                  onClick={() => handleOpenLesson('less_g4_m6_l1')}
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
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1 py-0.2 rounded-full font-bold">From ₹1,999/mo</span>
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
            {/* Filter Bar: Board, Class, Subject */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Academic Hierarchy</h2>
                  <p className="text-xs text-slate-500">
                    Board → Class → Subject → Chapter → Topic → Lesson
                  </p>
                </div>
                {/* Board Selector */}
                <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1">
                  {SEED_BOARDS.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => setSelectedBoardId(board.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                        selectedBoardId === board.id
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{board.code}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                          board.status === 'verified'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {board.status === 'verified' ? 'Verified' : 'Provis.'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Class Buttons Grid */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600">Select Academic Grade:</span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {SEED_CLASSES.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClassId(cls.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                        selectedClassId === cls.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cls.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Tabs */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600">Select Subject:</span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { code: 'math', name: 'Mathematics', icon: <Calculator className="w-3.5 h-3.5 text-amber-600" /> },
                    { code: 'science', name: 'Science', icon: <FlaskConical className="w-3.5 h-3.5 text-emerald-600" /> },
                    { code: 'english', name: 'English Language', icon: <BookOpen className="w-3.5 h-3.5 text-blue-600" /> },
                  ].map((sub) => (
                    <button
                      key={sub.code}
                      onClick={() => setSelectedSubjectCode(sub.code)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                        selectedSubjectCode === sub.code
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {sub.icon}
                      <span>{sub.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chapter & Topic Lessons Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {currentClass.name} Chapters &amp; Lessons ({currentBoard.code})
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {classChapters.length} chapters loaded
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classChapters.map((chap) => {
                  const relatedLesson = filteredLessons.find((l) => l.chapterId === chap.id) || filteredLessons[0]

                  return (
                    <div
                      key={chap.id}
                      className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-5 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                            Chapter {chap.chapterNumber}
                          </span>
                          <Badge className="bg-slate-100 text-slate-700 border-none text-[10px] font-semibold">
                            {chap.totalTopics} Topics
                          </Badge>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {chap.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {chap.description || 'Curriculum aligned concept breakdowns and practice.'}
                          </p>
                        </div>

                        {/* Sample Lesson Callout */}
                        {relatedLesson && (
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-1.5 text-xs">
                            <div className="flex items-center justify-between text-slate-500 text-[11px]">
                              <span className="font-bold text-slate-700">Lesson {relatedLesson.lessonNumber}:</span>
                              <span>{relatedLesson.readingTimeMinutes} min read</span>
                            </div>
                            <p className="font-semibold text-slate-800 line-clamp-1">
                              {relatedLesson.title}
                            </p>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              {relatedLesson.conceptBreakdown[0]?.heading} • {relatedLesson.workedExamples.length} worked examples
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                        <Button
                          onClick={() => handleOpenLesson(relatedLesson?.id || 'less_g4_m6_l1')}
                          variant="outline"
                          className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-8.5 rounded-xl flex items-center justify-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Read Lesson</span>
                        </Button>
                        <Button
                          onClick={() => handleLaunchPractice(relatedLesson?.linkedBlueprintId || 'bp_free_g4_math')}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8.5 rounded-xl shadow-2xs flex items-center justify-center gap-1"
                        >
                          <span>Take Test (5 Qs)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CLASS MONTHLY PASSES */}
        {/* ========================================================================= */}
        {activeTab === 'passes' && (
          <section className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Academic Class Monthly Passes</h2>
              <p className="text-xs text-slate-500">
                Unlimited access to verified lessons, worked solutions, and full diagnostic test banks for your grade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ACADEMIC_PRODUCTS.map((prod: CommercialProduct) => (
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
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {prod.domain.toUpperCase()} PASS
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
                      {prod.features.slice(0, 3).map((feat: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
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
          handleLaunchPractice(selectedLesson?.linkedBlueprintId || 'bp_free_g4_math')
        }}
      />

      {/* Test Runner Modal */}
      <TestRunnerModal
        blueprint={activeBlueprint}
        questions={activeQuestions}
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
