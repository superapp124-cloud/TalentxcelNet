'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Brain,
  Code,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Target,
  BookOpen,
  Activity,
  Layers,
  HelpCircle,
  Calculator,
  Compass,
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
  SEED_BLUEPRINTS,
  SEED_AUTHORIZED_QUESTIONS,
} from '@/packages/core/src'
import type {
  AuthorizedQuestion,
  AssessmentBlueprint,
} from '@/packages/core/src'

export default function HomePage() {
  // Quick-selector state
  const [selectedBoardCode, setSelectedBoardCode] = useState('CBSE')
  const [selectedClassGrade, setSelectedClassGrade] = useState('Class 4')

  // Modals state
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false)
  const [activeBlueprint, setActiveBlueprint] = useState<AssessmentBlueprint | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<AuthorizedQuestion[]>([])

  const [isGrowthPlanOpen, setIsGrowthPlanOpen] = useState(false)

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Accordion state for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Launch free diagnostic test matching selection
  const handleLaunchFreeDiagnostic = () => {
    const bp = SEED_BLUEPRINTS[0]
    setActiveBlueprint(bp)
    setActiveQuestions(SEED_AUTHORIZED_QUESTIONS.slice(0, bp?.totalQuestions || 5))
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

      {/* Main Content with Safe Bottom Spacing to Prevent Floating Widget Overlap */}
      <main className="flex-1 space-y-8 sm:space-y-12 pb-24 sm:pb-20" id="main-content">
        {/* ========================================================================= */}
        {/* 1. MOBILE-FIRST HERO SECTION */}
        {/* ========================================================================= */}
        <section className="bg-white border-b border-slate-200/80 pt-5 sm:pt-7 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Focused Headline & Single Dominant CTA */}
              <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Universal Learning &amp; Assessment Platform</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 hidden sm:inline-block" />
                  <span className="hidden sm:inline-block">Classes 4–12</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Universal Learning, Assessment &amp;{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Real Skills for Every Learner.
                  </span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                  Rigorous curriculum assessments, hands-on skill projects, and verified academic lessons for school students and competitive entrance aspirants.
                </p>

                {/* 1 Dominant Blue CTA + Subtle Secondary Action */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <Button
                    onClick={handleLaunchFreeDiagnostic}
                    className="w-full sm:w-auto bg-[#245BFF] hover:bg-[#1D4ED8] text-white font-bold text-sm h-11 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <span>Start Free Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Link href="/plans" className="text-center sm:text-left">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-blue-600 px-3 py-2 transition-colors">
                      <span>View Pricing &amp; Plans</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>

                {/* Transparent Guarantees */}
                <div className="text-[11px] text-slate-500 font-medium flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    5 Free Questions / Subject
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>No Registration Required</span>
                  <span className="text-slate-300">•</span>
                  <span>Server-Graded Analytics</span>
                </div>

                {/* ===================================================================== */}
                {/* 2. COMPACT BOARD & CLASS SELECTOR (RESPONSIVE SEGMENTED CONTROLS) */}
                {/* ===================================================================== */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 max-w-lg shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Board:
                    </span>
                    <div className="inline-flex p-0.5 bg-white border border-slate-200 rounded-lg gap-0.5" role="tablist">
                      {['CBSE', 'CISCE', 'IB'].map((board) => (
                        <button
                          key={board}
                          onClick={() => setSelectedBoardCode(board)}
                          role="tab"
                          aria-selected={selectedBoardCode === board}
                          className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                            selectedBoardCode === board
                              ? 'bg-[#245BFF] text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {board}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Grade:
                    </span>
                    <select
                      value={selectedClassGrade}
                      onChange={(e) => setSelectedClassGrade(e.target.value)}
                      aria-label="Select class grade"
                      className="bg-white border border-slate-200 text-slate-900 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
                    >
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
                      ].map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Classroom Image with Safe Micro-Badges */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[16/10] sm:aspect-[4/3] max-h-64 sm:max-h-72 w-full bg-slate-100">
                  <img
                    src="/images/kids-classroom-hero.jpg"
                    alt="School children happily learning together in a bright classroom"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Floating micro-badges with safe positioning */}
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Free Practice Diagnostic</span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white shadow-xs text-[11px] font-semibold">
                    {selectedBoardCode} • {selectedClassGrade}
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* 3. THREE COMPACT LEARNING DOMAIN CARDS (UNIFIED PLATFORM ARCHITECTURE) */}
            {/* ===================================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {/* Domain 1: Assessment & Intelligence */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-3 group hover:border-blue-400">
                <div className="space-y-2.5">
                  <div className="relative rounded-xl overflow-hidden h-28 sm:h-32 w-full bg-slate-100 border border-slate-100">
                    <img
                      src="/images/kids-assessment-study.jpg"
                      alt="Student taking diagnostic assessment"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <Badge className="absolute top-2 right-2 bg-[#245BFF] text-white font-bold text-[10px] px-2 py-0.5 shadow-2xs">
                      5 Free Qs / Subject
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#245BFF] mb-0.5">
                      <Brain className="w-3.5 h-3.5" />
                      <span>Domain 1</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Assessment &amp; Intelligence
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      School assessments, 6 analytical reasoning dimensions, and entrance mocks with instant server scoring.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                    <span className="text-slate-400">Packs from:</span>
                    <span className="font-bold text-slate-900">₹20 to ₹999</span>
                  </div>
                </div>

                <Link href="/assessment" className="w-full">
                  <Button className="w-full bg-[#245BFF] hover:bg-[#1D4ED8] text-white font-bold text-xs h-9 rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-all">
                    <span>Explore Assessments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Domain 2: Skill Development */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-3 group hover:border-indigo-400">
                <div className="space-y-2.5">
                  <div className="relative rounded-xl overflow-hidden h-28 sm:h-32 w-full bg-slate-100 border border-slate-100">
                    <img
                      src="/images/kids-skills-coding.jpg"
                      alt="Students learning hands-on coding and technology"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <Badge className="absolute top-2 right-2 bg-indigo-600 text-white font-bold text-[10px] px-2 py-0.5 shadow-2xs">
                      8 Practical Tracks
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mb-0.5">
                      <Code className="w-3.5 h-3.5" />
                      <span>Domain 2</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      Skill Development
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Learn by building. Hands-on capstones across AI, coding, robotics, design, debate and digital workflows.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                    <span className="text-slate-400">Monthly Tracks:</span>
                    <span className="font-bold text-slate-900">₹999 to ₹4,999 / mo</span>
                  </div>
                </div>

                <Link href="/skills" className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-9 rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-all">
                    <span>Explore Skill Tracks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Domain 3: Academic Learning */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-3 group hover:border-emerald-400">
                <div className="space-y-2.5">
                  <div className="relative rounded-xl overflow-hidden h-28 sm:h-32 w-full bg-slate-100 border border-slate-100">
                    <img
                      src="/images/kids-academic-reading.jpg"
                      alt="Student reading school textbook with smiles"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <Badge className="absolute top-2 right-2 bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 shadow-2xs">
                      Classes 4–12
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mb-0.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Domain 3</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Academic Learning
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Calm, board-aligned learning. Step-by-step concept breakdowns, worked examples, and revision notes.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2 border border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                    <span className="text-slate-400">Class Passes:</span>
                    <span className="font-bold text-slate-900">From ₹1,999 / mo</span>
                  </div>
                </div>

                <Link href="/academic" className="w-full">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-all">
                    <span>Browse Academic Lessons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. TRANSPARENT PRICING MATRIX SUMMARY (HIGH CONTRAST & ZERO OVERCROWDING) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4" id="pricing">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-[#245BFF] uppercase tracking-wider">
                Transparent Pricing
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Fair Pricing for Every School &amp; Exam Goal
              </h2>
            </div>
            <Link href="/plans">
              <Button
                variant="outline"
                className="text-xs font-bold text-slate-800 bg-white border-slate-300 hover:bg-slate-50 h-8.5 rounded-xl flex items-center gap-1 shadow-2xs"
              >
                <span>Full Pricing Comparison</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Assessment Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] font-bold text-[#245BFF] uppercase">Domain 1</span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">Assessment Packs</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Pay per test or chapter pack.</p>
                </div>
                <div className="text-xl font-black text-slate-900">
                  ₹20 <span className="text-xs text-slate-400 font-normal">to ₹999</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
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
              <Link href="/assessment" className="block pt-2">
                <Button className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold h-9 rounded-xl transition-all shadow-2xs">
                  View Assessments
                </Button>
              </Link>
            </div>

            {/* Skill Development Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 uppercase">Domain 2</span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">Skill Studio Tracks</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Hands-on capstones with rubric evaluation.</p>
                </div>
                <div className="text-xl font-black text-slate-900">
                  ₹999 <span className="text-xs text-slate-400 font-normal">to ₹4,999 / mo</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Foundation Track from ₹999/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>All-Access Studio at ₹1,999/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Portfolio projects &amp; rubrics</span>
                  </li>
                </ul>
              </div>
              <Link href="/skills" className="block pt-2">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold h-9 rounded-xl transition-all shadow-2xs">
                  View Skill Tracks
                </Button>
              </Link>
            </div>

            {/* Academic Passes Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase">Domain 3</span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">Academic Class Passes</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Full verified textbook lessons &amp; tests.</p>
                </div>
                <div className="text-xl font-black text-slate-900">
                  ₹1,999 <span className="text-xs text-slate-400 font-normal">to ₹5,199 / mo</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
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
              <Link href="/academic" className="block pt-2">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-9 rounded-xl transition-all shadow-2xs">
                  View Academic Lessons
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CLOSED-LOOP LEARNING CYCLE (HOW IT WORKS) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#245BFF] uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5" />
                  <span>The 4-Step Learning Cycle</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  How the Three Domains Connect for Comprehension
                </h2>
                <p className="text-xs text-slate-500 max-w-2xl">
                  When a diagnostic assessment detects a weak area, TalentXcel guides you directly to the relevant textbook lesson and hands-on project.
                </p>
              </div>
              <Button
                onClick={() => setIsGrowthPlanOpen(true)}
                variant="outline"
                className="text-xs font-bold text-blue-700 border-blue-200 hover:bg-blue-50 h-8.5 rounded-xl shrink-0 flex items-center gap-1.5 shadow-2xs"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Open Growth Plan</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                {
                  step: '01',
                  phase: 'Diagnose',
                  domain: 'Assessment & Intelligence',
                  desc: 'A 5-question test identifies the exact micro-gap in concept retention.',
                  badge: 'Step 1',
                  color: 'border-blue-200 bg-blue-50/70 text-blue-700',
                },
                {
                  step: '02',
                  phase: 'Learn',
                  domain: 'Academic Learning',
                  desc: 'Read clear concept breakdowns and verified step-by-step worked examples.',
                  badge: 'Step 2',
                  color: 'border-emerald-200 bg-emerald-50/70 text-emerald-700',
                },
                {
                  step: '03',
                  phase: 'Build',
                  domain: 'Skill Development',
                  desc: 'Apply the concept in a practical coding or robotics project workshop.',
                  badge: 'Step 3',
                  color: 'border-indigo-200 bg-indigo-50/70 text-indigo-700',
                },
                {
                  step: '04',
                  phase: 'Master',
                  domain: 'Re-assessment',
                  desc: 'Re-test to verify retention, earn credits, and update your growth trajectory.',
                  badge: 'Step 4',
                  color: 'border-purple-200 bg-purple-50/70 text-purple-700',
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black text-slate-900">{step.step}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold border ${step.color}`}>
                        {step.phase}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800">{step.domain}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. VERIFIED PLATFORM CAPABILITIES & FAQS ACCORDION */}
        {/* ========================================================================= */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1.5">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[11px] font-bold">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Clear Answers Before You Begin
            </h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">
              Real facts about curriculum mappings, zero-login diagnostics, and transparent pricing.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ======================================================================= */}
          {/* 7. FINAL HIGH-CONVERTING CONVERSION CTA BANNER */}
          {/* ======================================================================= */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-blue-800 text-center space-y-4">
            <span className="inline-block text-[11px] uppercase tracking-wider font-bold text-blue-300 bg-blue-800/80 px-3 py-1 rounded-full border border-blue-700">
              Zero Friction Trial
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to Measure and Elevate Your Child&apos;s Mastery?
            </h3>
            <p className="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto leading-relaxed">
              Start with 5 free questions per subject. No login required, no credit card required. Instant diagnostic clarity.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-3">
              <Button
                onClick={handleLaunchFreeDiagnostic}
                className="w-full sm:w-auto bg-white text-blue-900 hover:bg-blue-50 font-black text-sm h-11 px-8 rounded-xl shadow-md transition-all active:scale-98"
              >
                <span>Start Free Practice Now</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Link href="/plans">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-white border-blue-400/50 hover:bg-blue-800/50 font-bold text-xs h-11 px-6 rounded-xl"
                >
                  View All Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 8. CLEAN LIGHT-THEME PLATFORM FOOTER */}
      {/* ========================================================================= */}
      <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs py-8 px-4 sm:px-6 lg:px-8" role="contentinfo">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-bold text-slate-900">TalentXcel.net</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-slate-500 text-[11px]">
              Universal Learning, Assessment &amp; Skill Development Platform
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium text-slate-500">
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
