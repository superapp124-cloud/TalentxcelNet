'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Brain,
  Calculator,
  FlaskConical,
  BookOpen,
  Sparkles,
  Target,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Search,
  Check,
  ShieldCheck,
  CreditCard,
  Layers,
  Activity,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/navigation/site-header'
import { TestRunnerModal } from '@/components/assessment/test-runner-modal'
import { GrowthPlanModal } from '@/components/intelligence/growth-plan-modal'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'
import {
  SEED_BOARDS,
  SEED_CLASSES,
  SEED_SUBJECTS,
  SEED_GRADE4_SUBJECTS,
  SEED_BLUEPRINTS,
  SEED_AUTHORIZED_QUESTIONS,
  SEED_COMPETITIVE_EXAMS,
  ASSESSMENT_PRODUCTS,
} from '@/packages/core/src'
import type {
  AuthorizedQuestion,
  AssessmentBlueprint,
  LearnerEntitlement,
  CommercialProduct,
} from '@/packages/core/src'

export default function AssessmentPage() {
  const [selectedBoardId, setSelectedBoardId] = useState<string>('board_cbse')
  const [selectedClassId, setSelectedClassId] = useState<string>('class_g4')
  const [activeCategoryTab, setActiveCategoryTab] = useState<'school' | 'reasoning' | 'competitive' | 'packs'>('school')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals state
  const [activeBlueprint, setActiveBlueprint] = useState<AssessmentBlueprint | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<AuthorizedQuestion[]>([])
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false)

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const [isGrowthPlanOpen, setIsGrowthPlanOpen] = useState(false)

  // Current Board and Class
  const currentBoard = SEED_BOARDS.find((b) => b.id === selectedBoardId) || SEED_BOARDS[0]
  const currentClass = SEED_CLASSES.find((c) => c.id === selectedClassId) || SEED_CLASSES[1]

  // Filtered subjects for current class
  const classSubjects = useMemo(() => {
    let subjects = SEED_SUBJECTS.filter((s) => s.classId === selectedClassId)
    if (subjects.length === 0 && selectedClassId === 'class_g4') {
      subjects = SEED_GRADE4_SUBJECTS
    } else if (subjects.length === 0) {
      // Fallback display subjects mapped for other grades
      subjects = [
        {
          id: `subj_${selectedClassId}_math`,
          classId: selectedClassId,
          code: 'math',
          name: 'Mathematics',
          colorTheme: 'amber',
          iconName: 'Calculator',
          totalTests: 15,
          completedTests: 0,
          status: 'verified',
          description: `${currentClass.name} Curriculum Aligned Problem Solving & Number Theory`,
        },
        {
          id: `subj_${selectedClassId}_sci`,
          classId: selectedClassId,
          code: 'science',
          name: 'Science',
          colorTheme: 'emerald',
          iconName: 'FlaskConical',
          totalTests: 12,
          completedTests: 0,
          status: 'verified',
          description: `${currentClass.name} Natural Sciences, Physical Systems & Inquiry`,
        },
        {
          id: `subj_${selectedClassId}_eng`,
          classId: selectedClassId,
          code: 'english',
          name: 'English Language & Comprehension',
          colorTheme: 'blue',
          iconName: 'BookOpen',
          totalTests: 10,
          completedTests: 0,
          status: 'verified',
          description: `${currentClass.name} Reading Comprehension, Applied Grammar & Syntax`,
        },
      ]
    }
    if (!searchQuery.trim()) return subjects
    const q = searchQuery.toLowerCase()
    return subjects.filter((s) => s.name.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q))
  }, [selectedClassId, currentClass.name, searchQuery])

  // Filtered competitive exams
  const filteredExams = useMemo(() => {
    if (!searchQuery.trim()) return SEED_COMPETITIVE_EXAMS
    const q = searchQuery.toLowerCase()
    return SEED_COMPETITIVE_EXAMS.filter((e) => e.name.toLowerCase().includes(q) || e.examCode.toLowerCase().includes(q))
  }, [searchQuery])

  // Launch test handler
  const handleLaunchBlueprint = (blueprintId: string) => {
    const bp = SEED_BLUEPRINTS.find((b) => b.id === blueprintId) || SEED_BLUEPRINTS[0]
    setActiveBlueprint(bp)
    setActiveQuestions(SEED_AUTHORIZED_QUESTIONS.slice(0, bp.totalQuestions || 5))
    setIsTestRunnerOpen(true)
  }

  // Handle paid pack purchase
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
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold tracking-wide">
                <Brain className="w-3.5 h-3.5" />
                <span>Domain 1: Assessment &amp; Intelligence</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Zero Login Required for Free Practice</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Test Skills. Measure Ability.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Identify Gaps.
                </span>
              </h1>
              <p className="text-xs text-slate-600 leading-relaxed">
                Server-evaluated diagnostics covering Classes 4–12, 6 core analytical reasoning domains, and competitive entrance benchmarks. Start free immediately with 5 questions per subject.
              </p>
            </div>

            {/* Student Image Thumbnail & Quick Diagnostic Action */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5 shrink-0 max-w-md w-full shadow-2xs">
              <img
                src="/images/kids-assessment-study.jpg"
                alt="Student taking diagnostic test"
                className="w-20 h-20 rounded-lg object-cover shrink-0 border border-slate-200"
              />
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Fast Practice</span>
                  <Badge className="bg-emerald-100 text-emerald-800 text-[9px] font-bold">5 Qs Free</Badge>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">Class 4 Math Diagnostic</h4>
                <Button
                  onClick={() => handleLaunchBlueprint('bp_free_g4_math')}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] h-7 px-3 rounded-lg flex items-center gap-1 w-full justify-center"
                >
                  <span>Start Test (Free)</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveCategoryTab('school')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategoryTab === 'school'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>School Assessments (Classes 4–12)</span>
            </button>
            <button
              onClick={() => setActiveCategoryTab('reasoning')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategoryTab === 'reasoning'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Analytical Reasoning</span>
            </button>
            <button
              onClick={() => setActiveCategoryTab('competitive')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategoryTab === 'competitive'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Competitive Entrances</span>
            </button>
            <button
              onClick={() => setActiveCategoryTab('packs')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategoryTab === 'packs'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Assessment Packs</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1 py-0.2 rounded-full font-bold">From ₹20</span>
            </button>
            <Link
              href="/dashboard/question-bank"
              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 transition-all flex items-center gap-1.5 whitespace-nowrap ml-auto"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>Maths Bank (36,490 Qs)</span>
              <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded-full font-bold">🔒 Login</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ========================================================================= */}
        {/* TAB 1: SCHOOL ASSESSMENTS */}
        {/* ========================================================================= */}
        {activeCategoryTab === 'school' && (
          <section className="space-y-6">
            {/* Filter Bar: Boards & Class Selectors */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Curriculum &amp; Grade Selection</h2>
                  <p className="text-xs text-slate-500">
                    Syllabus mappings are explicitly labelled as verified or provisional.
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
                <span className="text-xs font-bold text-slate-600">Select Academic Class:</span>
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
            </div>

            {/* Subject Cards Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  {currentClass.name} Diagnostic &amp; Chapter Practice ({currentBoard.code})
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {classSubjects.length} subjects mapped
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {classSubjects.map((subj) => {
                  const isMath = subj.code === 'math'
                  const isSci = subj.code === 'science'
                  const blueprintId = isMath
                    ? 'bp_free_g4_math'
                    : isSci
                    ? 'bp_free_g4_sci'
                    : 'bp_free_g4_eng'

                  return (
                    <div
                      key={subj.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                              isMath
                                ? 'bg-amber-100 text-amber-700'
                                : isSci
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {isMath ? (
                              <Calculator className="w-5 h-5" />
                            ) : isSci ? (
                              <FlaskConical className="w-5 h-5" />
                            ) : (
                              <BookOpen className="w-5 h-5" />
                            )}
                          </div>
                          <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-bold">
                            5 Questions Free
                          </Badge>
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {subj.name}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                            {subj.description || 'Curriculum aligned diagnostic and chapter assessments.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>10–15 mins</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Instant Scoring</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2 pt-3 border-t border-slate-100">
                        <Button
                          onClick={() => handleLaunchBlueprint(blueprintId)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-9 rounded-xl shadow-2xs flex items-center justify-center gap-1.5"
                        >
                          <span>Start Free Diagnostic (5 Qs)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          onClick={() => handleOpenCheckout('prod_pack_micro_20')}
                          variant="outline"
                          className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-8 rounded-xl flex items-center justify-center gap-1.5"
                        >
                          <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                          <span>Unlock Full Chapter Mock • ₹20</span>
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
        {/* TAB 2: ANALYTICAL REASONING & APTITUDE */}
        {/* ========================================================================= */}
        {activeCategoryTab === 'reasoning' && (
          <section className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="max-w-3xl space-y-3">
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-xs font-bold">
                  Cognitive &amp; Analytical Engine
                </Badge>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Analytical Aptitude &amp; Mental Acuity Diagnostic
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Evaluates 6 fundamental cognitive pillars: logical deduction, numerical patterns, verbal relationships, spatial reasoning, data interpretation, and algorithmic thinking.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => handleLaunchBlueprint('bp_free_analytical_reasoning')}
                    className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs h-9.5 px-5 rounded-xl shadow-xs"
                  >
                    <span>Launch 8-Question Analytical Test (Free)</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 6 Cognitive Dimensions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  title: 'Logical Deduction',
                  desc: 'Syllogisms, truth-table deductions, sequence conditions, and relational validity.',
                  tag: 'Core Aptitude',
                },
                {
                  title: 'Numerical Series & Mental Arithmetic',
                  desc: 'Geometric progressions, modular patterns, differences of squares, and mental estimation.',
                  tag: 'Quantitative',
                },
                {
                  title: 'Verbal Reasoning & Analogies',
                  desc: 'Semantic classification, sentence completion, antonym matrices, and context deductions.',
                  tag: 'Linguistic',
                },
                {
                  title: 'Spatial & Non-Verbal Matrices',
                  desc: 'Folded paper visualisations, 2D rotation transforms, mirror symmetry, and shape patterns.',
                  tag: 'Visual Spatial',
                },
                {
                  title: 'Data Interpretation & Graphs',
                  desc: 'Tabular analysis, ratio comparisons, percentage growth rates, and trend extrapolation.',
                  tag: 'Data Literacy',
                },
                {
                  title: 'Algorithmic & Stepwise Logic',
                  desc: 'Conditional flowchart tracing, loop bounds, recursion intuition, and edge-case detection.',
                  tag: 'Computation',
                },
              ].map((dim, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-indigo-600">0{idx + 1}</span>
                      <Badge className="bg-slate-100 text-slate-700 text-[10px] font-semibold border-none">
                        {dim.tag}
                      </Badge>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{dim.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{dim.desc}</p>
                  </div>
                  <Button
                    onClick={() => handleLaunchBlueprint('bp_free_analytical_reasoning')}
                    variant="ghost"
                    className="w-full text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 rounded-lg flex items-center justify-between p-0"
                  >
                    <span>Practice dimension</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: COMPETITIVE ENTRANCE PIPELINES */}
        {/* ========================================================================= */}
        {activeCategoryTab === 'competitive' && (
          <section className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Competitive Entrance Pipeline</h2>
              <p className="text-xs text-slate-500">
                Verified benchmarks and provisional testing pipelines for major national and state entrances.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-600 tracking-wider">
                        {exam.examCode}
                      </span>
                      <Badge
                        className={`text-[10px] font-bold ${
                          exam.verifiedStatus === 'verified'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border-amber-200'
                        }`}
                      >
                        {exam.verifiedStatus === 'verified' ? 'Active Benchmark' : 'Pipeline'}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{exam.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{exam.targetStage}</p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sample Mocks:</span>
                        <span className="font-bold text-slate-800">{exam.sampleTestsAvailable} tests</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cohort Batch:</span>
                        <span className="font-medium text-slate-700">{exam.expectedLaunchBatch}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <Button
                      onClick={() => handleLaunchBlueprint('bp_free_analytical_reasoning')}
                      className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold h-8.5 rounded-xl"
                    >
                      Sample Mock (Free)
                    </Button>
                    <Button
                      onClick={() => handleOpenCheckout('prod_pack_comp_sprint_999')}
                      variant="outline"
                      className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-8 rounded-xl"
                    >
                      Unlock Sprint • ₹999
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: COMMERCIAL ASSESSMENT PACKS */}
        {/* ========================================================================= */}
        {activeCategoryTab === 'packs' && (
          <section className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Commercial Assessment &amp; Mock Packs</h2>
              <p className="text-xs text-slate-500">
                Transparent pricing with no hidden charges. All packs include server scoring and diagnostic weakness reports.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ASSESSMENT_PRODUCTS.map((prod: CommercialProduct) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between gap-6 relative"
                >
                  {prod.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600 text-white font-bold text-[10px]">
                        Popular
                      </Badge>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {prod.domain.toUpperCase()} PACK
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
                      <span className="text-xs text-slate-400 font-medium">+ 18% GST</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                      {prod.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleOpenCheckout(prod.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Purchase with Razorpay</span>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

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
          alert(`Success! Product ${entitlement.productId} activated. Access valid through ${new Date(entitlement.validUntil).toLocaleDateString()}.`)
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
