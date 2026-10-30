'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Activity,
  FileText,
  Zap,
  BarChart3,
  Flame,
  Play,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/navigation/site-header'
import type {
  AuthorizedQuestion,
  AssessmentBlueprint,
  ConfidentialQuestionSolution,
} from '@/packages/core/src/types'

// Dynamic imports for heavy interactive modals to keep initial bundle ultra-lean
const TestRunnerModal = dynamic(
  () => import('@/components/assessment/test-runner-modal').then((m) => m.TestRunnerModal),
  { ssr: false }
)
const GrowthPlanModal = dynamic(
  () => import('@/components/intelligence/growth-plan-modal').then((m) => m.GrowthPlanModal),
  { ssr: false }
)
const RazorpayCheckoutModal = dynamic(
  () => import('@/components/commerce/razorpay-checkout-modal').then((m) => m.RazorpayCheckoutModal),
  { ssr: false }
)

export default function HomePage() {
  // Quick-selector state
  const [selectedBoardCode, setSelectedBoardCode] = useState('CBSE')
  const [selectedClassGrade, setSelectedClassGrade] = useState('Class 4')
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('math')

  // Modals state
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false)
  const [activeBlueprint, setActiveBlueprint] = useState<AssessmentBlueprint | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<AuthorizedQuestion[]>([])
  const [activeSolutions, setActiveSolutions] = useState<ConfidentialQuestionSolution[]>([])

  const [isGrowthPlanOpen, setIsGrowthPlanOpen] = useState(false)

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Accordion state for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Launch free diagnostic test matching selection with verified grade-specific questions
  // Dynamically load the diagnostic questions package on demand so initial page load stays feather-light
  const handleLaunchFreeDiagnostic = async (subjCode?: string | React.MouseEvent) => {
    const code = typeof subjCode === 'string' ? subjCode : selectedSubjectCode
    const classNum = parseInt(selectedClassGrade.replace('Class ', ''), 10) || 4
    const { getClassDiagnosticPackage } = await import('@/lib/assessment/class-diagnostic-engine')
    const pkg = getClassDiagnosticPackage(classNum, code, selectedBoardCode)
    setActiveBlueprint(pkg.blueprint)
    setActiveQuestions(pkg.questions)
    setActiveSolutions(pkg.solutions)
    setIsTestRunnerOpen(true)
  }

  const faqs = [
    {
      q: 'How does the free practice diagnostic test work?',
      a: 'You can immediately take 5 verified syllabus questions per subject without registering or providing payment details. Your answers are evaluated with instant server scoring, formula breakdowns, and gap analysis.',
    },
    {
      q: 'Which curriculum boards are currently supported?',
      a: 'We fully support CBSE (Classes 4–12, 100% NCERT verified), CISCE/ICSE (core STEM topics), and IB (concept alignment for PYP/MYP/DP) across foundational Mathematics and Sciences.',
    },
    {
      q: 'How do the three learning domains connect?',
      a: 'TalentXcel operates as one closed loop: when an assessment identifies a specific micro-gap in understanding, the platform directs you directly to the relevant textbook lesson and hands-on coding or robotics workshop to build mastery.',
    },
    {
      q: 'Can I purchase single assessments or do I need a subscription?',
      a: 'You have complete flexibility. Single assessment credits start from just ₹20 for chapter mocks, while full multi-subject assessment packs range from ₹299 to ₹999. Monthly skill studio and academic class passes are billed transparently.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between">
      {/* 1. Compact Header */}
      <SiteHeader onOpenGrowthPlan={() => setIsGrowthPlanOpen(true)} />

      {/* Main Content Area (Layout wrapper already provides the single <main id="main-content"> landmark) */}
      <div className="flex-1 space-y-6 sm:space-y-10 pb-20 sm:pb-20">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (RESPONSIVE FOR ALL SCREEN SIZES) */}
        {/* ========================================================================= */}
        <section className="bg-white border-b border-slate-200/80 pt-4 sm:pt-8 pb-5 sm:pb-8 px-3.5 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* ========================================================================= */}
            {/* 1A. MOBILE APP-NATIVE VIEW (ACTIVATED ON MOBILE SCREENS < 1024px) */}
            {/* ========================================================================= */}
            <div className="lg:hidden space-y-3.5">
              {/* App Status Bar: Cognitive Gym, Streak & Points */}
              <div className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 shadow-2xs">
                <div className="flex items-center gap-2">
                  <img
                    src="/brand/talentxcel-icon.png"
                    alt="talentXcel logo icon"
                    width={28}
                    height={28}
                    className="w-7 h-7 rounded-full object-contain bg-white border border-slate-200 shadow-2xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-slate-900 text-xs">Cognitive Gym</span>
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                        {selectedClassGrade}
                      </span>
                    </div>
                    <p className="text-[9.5px] text-slate-600 font-semibold">CBSE • ICSE • IB Standards</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-amber-800 font-extrabold text-[10px] shadow-2xs">
                    <Flame className="w-3 h-3 text-amber-500 fill-amber-500 animate-bounce" />
                    <span>3-Day Streak</span>
                  </div>
                  <div className="flex items-center gap-0.5 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg text-emerald-800 font-bold text-[10px]">
                    <span>★ 40 Pts</span>
                  </div>
                </div>
              </div>

              {/* Horizontal Grade Switcher (Snap-Scroll Pills) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] px-1 font-bold text-slate-700">
                  <span className="uppercase tracking-wider text-[10px]">Select Class:</span>
                  <div className="flex items-center gap-1">
                    {['CBSE', 'CISCE', 'IB'].map((board) => (
                      <button
                        key={board}
                        type="button"
                        onClick={() => setSelectedBoardCode(board)}
                        className={`min-h-[32px] px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                          selectedBoardCode === board
                            ? 'bg-[#245BFF] text-white shadow-2xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {board}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    'Class 4',
                    'Class 5',
                    'Class 6',
                    'Class 7',
                    'Class 8',
                    'Class 9',
                    'Class 10',
                    'Class 11',
                    'Class 12',
                  ].map((grade) => {
                    const isSelected = selectedClassGrade === grade
                    return (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => setSelectedClassGrade(grade)}
                        className={`shrink-0 min-h-[38px] px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#245BFF] text-white shadow-md scale-102'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300'
                        }`}
                      >
                        {grade}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* App Hero: Daily Brain Workout Card */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl p-4 text-white shadow-md relative overflow-hidden space-y-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold backdrop-blur-xs">
                    <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                    <span>Daily 10-Minute Brain Workout</span>
                  </div>
                  {/* Semantic Accessible H1 for Mobile */}
                  <h1 className="text-lg font-black tracking-tight leading-snug text-white">
                    <span className="sr-only">TalentXcel Universal Learning &amp; Assessment — </span>
                    {selectedClassGrade} Diagnostic &amp; Skill Gap Test
                  </h1>
                  <p className="text-[11px] text-blue-50 leading-relaxed font-medium">
                    5 verified syllabus questions • Instant scoring &amp; step-by-step derivations
                  </p>
                </div>

                <Button
                  onClick={() => handleLaunchFreeDiagnostic()}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs h-10 rounded-xl shadow-[0_3px_0_0_#d97706] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Start Free Test (5 Qs)</span>
                </Button>

                {/* Instant Subject Launchers */}
                <div className="pt-2 border-t border-white/20">
                  <div className="text-[10px] text-white font-bold mb-1.5 uppercase tracking-wider">
                    Or Tap a Subject to Practice:
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { code: 'math', label: 'Math', icon: '🧮' },
                      { code: 'science', label: 'Science', icon: '🔬' },
                      { code: 'english', label: 'English', icon: '📖' },
                      { code: 'hindi', label: 'Hindi', icon: '🇮🇳' },
                      { code: 'sst', label: 'Social', icon: '🌍' },
                      { code: 'reasoning', label: 'Reasoning', icon: '🧩' },
                    ].map((s) => (
                      <button
                        key={s.code}
                        type="button"
                        onClick={() => {
                          setSelectedSubjectCode(s.code)
                          handleLaunchFreeDiagnostic(s.code)
                        }}
                        className="flex items-center justify-center gap-1 bg-white/15 hover:bg-white/25 border border-white/25 text-white rounded-lg min-h-[36px] py-1.5 px-2 text-[11px] font-bold active:scale-95 transition-all cursor-pointer"
                      >
                        <span aria-hidden="true">{s.icon}</span>
                        <span>{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Artwork Card with Optimized Mobile WebP Image */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm w-full bg-slate-50 aspect-[1210/420]">
                <picture>
                  <source
                    media="(max-width: 640px)"
                    srcSet="/images/landing-hero-students-mobile.webp"
                    type="image/webp"
                  />
                  <source
                    srcSet="/images/landing-hero-students.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/landing-hero-students.jpg"
                    alt="Students learning and succeeding with TalentXcel Academy"
                    width={1210}
                    height={420}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                </picture>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 1B. DESKTOP HERO VIEW (DISPLAYED ON SCREENS >= 1024px) */}
            {/* ========================================================================= */}
            <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
              {/* Left Column: Focused Headline & Actions */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Universal Learning &amp; Assessment Platform</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                  <span>Classes 4–12</span>
                </div>

                <h1 className="text-3xl lg:text-4xl xl:text-[42px] font-black text-slate-900 tracking-tight leading-[1.15]">
                  Universal Learning,
                  <br />
                  Assessment &amp;{' '}
                  <span className="text-[#245BFF]">
                    Real Skills
                  </span>
                  <br />
                  for Every Learner.
                </h1>

                <p className="text-sm text-slate-600 max-w-xl leading-relaxed font-normal">
                  Rigorous curriculum assessments, hands-on skill projects, and verified academic lessons for school students and competitive entrance aspirants.
                </p>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <Button
                    onClick={() => handleLaunchFreeDiagnostic()}
                    className="bg-[#245BFF] hover:bg-[#1D4ED8] text-white font-bold text-sm h-11 px-7 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                  >
                    <span>Start Free Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Link
                    href="/plans"
                    className="text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 h-11 px-5 rounded-xl inline-flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <span>View Pricing &amp; Plans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 4 Trust Points Row */}
                <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-slate-700 font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </span>
                    <span className="font-semibold text-slate-800">5 Free Questions Per Subject</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-3 h-3 text-purple-600" />
                    </span>
                    <span className="font-semibold text-slate-800">No Registration Required</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                      <Zap className="w-3 h-3 text-amber-600" />
                    </span>
                    <span className="font-semibold text-slate-800">Instant Scoring &amp; Solutions</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <BarChart3 className="w-3 h-3 text-blue-600" />
                    </span>
                    <span className="font-semibold text-slate-800">Server-graded Analytics</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual from Mockup with WebP */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md w-full bg-slate-50 aspect-[1210/420]">
                  <picture>
                    <source
                      srcSet="/images/landing-hero-students.webp"
                      type="image/webp"
                    />
                    <img
                      src="/images/landing-hero-students.jpg"
                      alt="Students learning and succeeding with TalentXcel Academy"
                      width={1210}
                      height={420}
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-center"
                    />
                  </picture>
                </div>
              </div>
            </div>

            {/* Authority / Trust Stats Strip */}
            <div className="mt-6 sm:mt-8 bg-[#0B1E48] rounded-2xl p-3.5 sm:p-5 text-white shadow-md border border-blue-900/60">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="flex items-center gap-2.5 sm:gap-3 bg-white/5 lg:bg-transparent rounded-xl p-2.5 sm:p-3 lg:p-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-white leading-tight">3,000,000+</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-200 font-medium leading-tight">Question Bank</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 bg-white/5 lg:bg-transparent rounded-xl p-2.5 sm:p-3 lg:p-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-white leading-tight">Classes 4–12</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-200 font-medium leading-tight">CBSE • ICSE • Entrances</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 bg-white/5 lg:bg-transparent rounded-xl p-2.5 sm:p-3 lg:p-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-600/30 border border-emerald-400/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-white leading-tight">Step Explanations</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-200 font-medium leading-tight">Socratic Derivations</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 bg-white/5 lg:bg-transparent rounded-xl p-2.5 sm:p-3 lg:p-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-600/30 border border-amber-400/30 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-white leading-tight">10-Min Drills</div>
                    <div className="text-[10px] sm:text-[11px] text-slate-200 font-medium leading-tight">Cognitive Gap Audits</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Three Domain Cards from Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 pt-5 sm:pt-7">
              {/* Domain 1: Assessment & Intelligence */}
              <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-3 sm:gap-4 group hover:border-blue-300">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 sm:px-2.5 py-0.5 rounded-full">
                      Domain 1
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      5 Free Qs / Subject
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <picture>
                      <source srcSet="/images/landing-domain-assessment.webp" type="image/webp" />
                      <img
                        src="/images/landing-domain-assessment.jpg"
                        alt="Assessment and Intelligence"
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-100 shadow-2xs"
                      />
                    </picture>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        Assessment &amp; Intelligence
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                        School assessments, 6 analytical reasoning dimensions, and entrance mocks with instant server scoring.
                      </p>
                    </div>
                  </div>

                  {/* Grade & Board Quick-Switch & Subject Chips */}
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px] gap-2">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <label htmlFor="select-board-domain" className="text-[10px] uppercase font-bold tracking-wider">Board:</label>
                        <select
                          id="select-board-domain"
                          aria-label="Select Curriculum Board"
                          value={selectedBoardCode}
                          onChange={(e) => setSelectedBoardCode(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 shadow-2xs cursor-pointer focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="CBSE">CBSE</option>
                          <option value="CISCE">CISCE</option>
                          <option value="IB">IB</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                        <label htmlFor="select-grade-domain" className="text-[10px] uppercase font-bold tracking-wider">Grade:</label>
                        <select
                          id="select-grade-domain"
                          aria-label="Select Class Grade"
                          value={selectedClassGrade}
                          onChange={(e) => setSelectedClassGrade(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 shadow-2xs cursor-pointer focus:ring-1 focus:ring-blue-500"
                        >
                          {['Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { code: 'math', label: 'Math' },
                        { code: 'science', label: 'Science' },
                        { code: 'english', label: 'English' },
                        { code: 'hindi', label: 'Hindi' },
                        { code: 'sst', label: 'Social Science' },
                        { code: 'reasoning', label: 'Reasoning' },
                      ].map((s) => (
                        <button
                          key={s.code}
                          type="button"
                          onClick={() => {
                            setSelectedSubjectCode(s.code)
                            handleLaunchFreeDiagnostic(s.code)
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50/80 border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors active:scale-95 shadow-2xs cursor-pointer"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/assessment"
                  className="w-full bg-[#245BFF] hover:bg-[#1D4ED8] text-white font-bold text-xs h-9 sm:h-10 rounded-xl shadow-2xs inline-flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Explore Assessments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Domain 2: Skill Development */}
              <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-3 sm:gap-4 group hover:border-purple-300">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 sm:px-2.5 py-0.5 rounded-full">
                      Domain 2
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                      8 Practical Tracks
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <picture>
                      <source srcSet="/images/landing-domain-skills.webp" type="image/webp" />
                      <img
                        src="/images/landing-domain-skills.jpg"
                        alt="Skill Development"
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-100 shadow-2xs"
                      />
                    </picture>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                        Skill Development
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                        Learn by building. Hands-on capstones across AI, coding, robotics, design, debate and digital workflows.
                      </p>
                    </div>
                  </div>

                  {/* Skill Chips */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {['Coding', 'AI', 'Robotics', 'Design', 'Debate', 'Projects'].map((track) => (
                        <span
                          key={track}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50/80 border border-purple-200 text-purple-700 shadow-2xs"
                        >
                          {track}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/skills"
                  className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold text-xs h-9 sm:h-10 rounded-xl shadow-2xs inline-flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Explore Skill Tracks</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Domain 3: Academic Learning */}
              <div className="bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-3 sm:gap-4 group hover:border-emerald-300">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 sm:px-2.5 py-0.5 rounded-full">
                      Domain 3
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Classes 4–12
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <picture>
                      <source srcSet="/images/landing-domain-academic.webp" type="image/webp" />
                      <img
                        src="/images/landing-domain-academic.jpg"
                        alt="Academic Learning"
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-100 shadow-2xs"
                      />
                    </picture>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        Academic Learning
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">
                        Calm, board-aligned learning. Step-by-step concept breakdowns, worked examples, and revision notes.
                      </p>
                    </div>
                  </div>

                  {/* Board Chips */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5">
                      {['CBSE', 'CISCE', 'IB', 'JEE', 'NEET', 'Class 4–12'].map((b) => (
                        <span
                          key={b}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50/80 border border-emerald-200 text-emerald-700 shadow-2xs"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href="/academic"
                  className="w-full bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs h-9 sm:h-10 rounded-xl shadow-2xs inline-flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Browse Academic Lessons</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. TRANSPARENT PRICING MATRIX */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-3.5 sm:space-y-4" id="pricing">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#245BFF] uppercase tracking-wider">
                Transparent Pricing
              </span>
              <h2 className="text-base sm:text-xl font-bold text-slate-900">
                Fair Pricing for Every School &amp; Exam Goal
              </h2>
            </div>
            <Link
              href="/plans"
              className="w-full sm:w-auto text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 h-8.5 px-3 rounded-xl inline-flex items-center justify-center gap-1 shadow-2xs transition-colors"
            >
              <span>Full Pricing Comparison</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* Assessment Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3.5 sm:space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-[#245BFF] uppercase tracking-wider block">
                        Domain 1
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none mt-0.5">
                        Assessment Packs
                      </h3>
                      <p className="text-[10.5px] sm:text-[11px] text-slate-600 mt-1">Pay per test or chapter pack.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-xl font-black text-slate-900">
                      ₹20 <span className="text-xs text-slate-600 font-normal">to ₹999</span>
                    </div>
                  </div>
                </div>

                <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-2.5 sm:pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#245BFF] shrink-0" />
                    <span>5 Free questions per subject</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#245BFF] shrink-0" />
                    <span>Chapter mock packs from ₹20</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#245BFF] shrink-0" />
                    <span>Instant server score &amp; solutions</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/assessment"
                className="w-full bg-[#1E293B] hover:bg-[#0F172A] text-white text-xs font-bold h-9 rounded-xl transition-all shadow-2xs inline-flex items-center justify-center gap-1.5"
              >
                <span>View Assessments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Skill Studio Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3.5 sm:space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider block">
                        Domain 2
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none mt-0.5">
                        Skill Studio Tracks
                      </h3>
                      <p className="text-[10.5px] sm:text-[11px] text-slate-600 mt-1">Hands-on capstones with rubric evaluation.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-xl font-black text-slate-900">
                      ₹999 <span className="text-xs text-slate-600 font-normal">to ₹4,999 / mo</span>
                    </div>
                  </div>
                </div>

                <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-2.5 sm:pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Foundation Track from ₹999/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>All-Access Studio at ₹1,999/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Portfolio projects &amp; rubrics</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/skills"
                className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold h-9 rounded-xl transition-all shadow-2xs inline-flex items-center justify-center gap-1.5"
              >
                <span>View Skill Tracks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Academic Class Passes Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3.5 sm:space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider block">
                        Domain 3
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-none mt-0.5">
                        Academic Class Passes
                      </h3>
                      <p className="text-[10.5px] sm:text-[11px] text-slate-600 mt-1">Full verified textbook lessons &amp; tests.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-xl font-black text-slate-900">
                      ₹1,999 <span className="text-xs text-slate-600 font-normal">to ₹5,199 / mo</span>
                    </div>
                  </div>
                </div>

                <ul className="text-xs text-slate-700 space-y-2 border-t border-slate-100 pt-2.5 sm:pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Class 4 Pass starting at ₹1,999/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Classes 4–12 progressive pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>CBSE, CISCE &amp; IB verified maps</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/academic"
                className="w-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold h-9 rounded-xl transition-all shadow-2xs inline-flex items-center justify-center gap-1.5"
              >
                <span>View Academic Lessons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THE 4-STEP LEARNING CYCLE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-7 shadow-xs space-y-4 sm:space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#245BFF] uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" />
                  <span>The 4-Step Learning Cycle</span>
                </div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900">
                  How the Three Domains Connect for Comprehension
                </h2>
                <p className="text-xs text-slate-600 max-w-2xl">
                  When a diagnostic assessment detects a weak area, TalentXcel guides you directly to the relevant textbook lesson and hands-on project.
                </p>
              </div>
              <Button
                onClick={() => setIsGrowthPlanOpen(true)}
                variant="outline"
                className="w-full md:w-auto text-xs font-bold text-blue-700 border-blue-200 hover:bg-blue-50 h-8.5 rounded-xl shrink-0 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Open Growth Plan</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch">
              {[
                {
                  step: '01',
                  phase: 'Diagnose',
                  domain: 'Assessment & Intelligence',
                  desc: 'A 5-question test identifies the exact micro-gap in concept retention.',
                  color: 'border-blue-200 bg-blue-50/70 text-blue-700',
                },
                {
                  step: '02',
                  phase: 'Learn',
                  domain: 'Academic Learning',
                  desc: 'Read clear concept breakdowns and verified step-by-step examples.',
                  color: 'border-emerald-200 bg-emerald-50/70 text-emerald-700',
                },
                {
                  step: '03',
                  phase: 'Build',
                  domain: 'Skill Development',
                  desc: 'Apply the concept in a practical coding or robotics project workshop.',
                  color: 'border-purple-200 bg-purple-50/70 text-purple-700',
                },
                {
                  step: '04',
                  phase: 'Master',
                  domain: 'Re-assessment',
                  desc: 'Re-test to verify retention, earn credits, and update your growth trajectory.',
                  color: 'border-indigo-200 bg-indigo-50/70 text-indigo-700',
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 sm:p-4 space-y-1.5 sm:space-y-2 flex flex-col justify-between relative group hover:border-blue-300 transition-all"
                >
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-black text-slate-900">{step.step}</span>
                        <h3 className="text-xs font-bold text-slate-800">{step.domain}</h3>
                      </div>
                      <span className={`text-[9.5px] sm:text-[10px] px-2 py-0.5 rounded-md font-bold border ${step.color}`}>
                        {step.phase}
                      </span>
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-600 leading-relaxed pt-0.5">{step.desc}</p>
                  </div>
                  {idx < 3 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-400 font-bold" aria-hidden="true">
                      &rarr;
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. VERIFIED PLATFORM CAPABILITIES & FAQS ACCORDION */}
        {/* ========================================================================= */}
        <section className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
          <div className="text-center space-y-1 sm:space-y-1.5">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] sm:text-[11px] font-bold">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
              Clear Answers Before You Begin
            </h2>
            <p className="text-xs text-slate-600 max-w-lg mx-auto">
              Real facts about curriculum mappings, zero-login diagnostics, and transparent pricing.
            </p>
          </div>

          <div className="space-y-2 sm:space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              const btnId = `faq-btn-${index}`
              const panelId = `faq-panel-${index}`
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    id={btnId}
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-3.5 sm:px-4 py-3 sm:py-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 pt-1 text-xs text-slate-700 leading-relaxed border-t border-slate-100"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ======================================================================= */}
          {/* 5. FINAL HIGH-CONVERTING CONVERSION CTA BANNER */}
          {/* ======================================================================= */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-8 shadow-sm border border-blue-800 text-center space-y-3 sm:space-y-4">
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-blue-200 bg-blue-800/80 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-700">
              Zero Friction Trial
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white">
              Ready to Measure and Elevate Your Child&apos;s Mastery?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              Start with 5 free questions per subject. No login required, no credit card required. Instant diagnostic clarity.
            </p>
            <div className="pt-1.5 sm:pt-2 flex flex-col sm:flex-row justify-center items-center gap-2.5 sm:gap-3">
              <Button
                onClick={() => handleLaunchFreeDiagnostic()}
                className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 font-black text-xs sm:text-sm h-10 sm:h-11 px-6 sm:px-8 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <span>Start Free Practice Now</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5" />
              </Button>
              <Link
                href="/plans"
                className="w-full sm:w-auto text-white border border-blue-400/50 hover:bg-blue-800/50 font-bold text-xs h-10 sm:h-11 px-5 sm:px-6 rounded-xl inline-flex items-center justify-center transition-colors"
              >
                <span>View All Pricing Plans</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 6. CLEAN LIGHT-THEME PLATFORM FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200 bg-white text-slate-700 text-xs py-6 sm:py-8 px-4 sm:px-6 lg:px-8" role="contentinfo">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 text-center sm:text-left">
            <img
              src="/brand/talentxcel-logo.png"
              alt="talentXcel"
              width={140}
              height={28}
              className="h-6 sm:h-7 w-auto object-contain"
            />
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-slate-600 text-[10.5px] sm:text-[11px] font-medium">
              Universal Learning, Assessment &amp; Skill Development Platform
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 text-[10.5px] sm:text-[11px] font-semibold text-slate-600">
            <Link href="/legal/terms" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal/privacy" className="hover:text-blue-600 transition-colors">
              Privacy Policy (DPDP Act)
            </Link>
            <Link href="/legal/refunds" className="hover:text-blue-600 transition-colors">
              14-Day Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              Support &amp; Grievances
            </Link>
          </div>
        </div>
      </footer>

      {/* Test Runner Modal */}
      <TestRunnerModal
        blueprint={activeBlueprint}
        questions={activeQuestions}
        solutions={activeSolutions}
        isOpen={isTestRunnerOpen}
        onClose={() => setIsTestRunnerOpen(false)}
        onUnlockPaidPack={(prodId) => {
          setIsTestRunnerOpen(false)
          setCheckoutProductId(prodId)
          setIsCheckoutOpen(true)
        }}
      />

      {/* Growth Plan Modal */}
      <GrowthPlanModal
        isOpen={isGrowthPlanOpen}
        onClose={() => setIsGrowthPlanOpen(false)}
      />

      {/* Razorpay Checkout Modal */}
      <RazorpayCheckoutModal
        isOpen={isCheckoutOpen}
        productId={checkoutProductId}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(entitlement) => {
          setIsCheckoutOpen(false)
          alert(`Access granted for ${entitlement.productId}! Valid until ${new Date(entitlement.validUntil).toLocaleDateString()}.`)
        }}
      />
    </div>
  )
}
