'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  ASSESSMENT_PRODUCTS,
  SKILL_PRODUCTS,
  ACADEMIC_PRODUCTS,
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

  // Launch free diagnostic test
  const handleLaunchFreeDiagnostic = () => {
    const bp = SEED_BLUEPRINTS[0]
    setActiveBlueprint(bp)
    setActiveQuestions(SEED_AUTHORIZED_QUESTIONS.slice(0, bp.totalQuestions || 5))
    setIsTestRunnerOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col justify-between">
      {/* Navigation Header */}
      <SiteHeader onOpenGrowthPlan={() => setIsGrowthPlanOpen(true)} />

      {/* Main Container - Compact Spacing */}
      <main className="flex-1 space-y-8 sm:space-y-12 pb-14">
        {/* ========================================================================= */}
        {/* 1. COMPACT FIRST VIEWPORT HERO SECTION WITH REAL ENGAGING KIDS IMAGE */}
        {/* ========================================================================= */}
        <section className="bg-white border-b border-slate-200/80 pt-5 sm:pt-7 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Left Column: Compact Content & Actions */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Universal Learning Platform</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Classes 4–12 • CBSE, CISCE &amp; IB</span>
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

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <Button
                    onClick={handleLaunchFreeDiagnostic}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-9.5 px-5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Start Free Practice (Class 4 Diagnostic)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Link href="/plans">
                    <Button
                      variant="outline"
                      className="text-slate-700 font-bold text-xs border-slate-200 hover:bg-slate-50 h-9.5 px-4 rounded-xl"
                    >
                      <span>View Pricing</span>
                    </Button>
                  </Link>
                </div>

                {/* Transparent Access Indicators */}
                <div className="pt-1 text-[11px] text-slate-500 font-medium flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-emerald-700 font-semibold">✓ 5 Free Questions / Subject</span>
                  <span className="text-slate-300">•</span>
                  <span>Chapter Mocks from ₹20</span>
                  <span className="text-slate-300">•</span>
                  <span>Skill Tracks from ₹999/mo</span>
                  <span className="text-slate-300">•</span>
                  <span>Class Passes from ₹1,999/mo</span>
                </div>

                {/* Compact Inline Curriculum & Grade Selector Bar */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 max-w-lg shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Board:</span>
                    <div className="inline-flex p-0.5 bg-white border border-slate-200 rounded-lg gap-0.5">
                      {['CBSE', 'CISCE', 'IB'].map((board) => (
                        <button
                          key={board}
                          onClick={() => setSelectedBoardCode(board)}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                            selectedBoardCode === board
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {board}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Grade:</span>
                    <select
                      value={selectedClassGrade}
                      onChange={(e) => setSelectedClassGrade(e.target.value)}
                      className="bg-white border border-slate-200 text-slate-800 text-[11px] font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

              {/* Right Column: Engaging Kids Learning Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md aspect-4/3 max-h-72 w-full bg-slate-100">
                  <img
                    src="/images/kids-classroom-hero.jpg"
                    alt="School children happily learning together in a bright classroom"
                    className="w-full h-full object-cover"
                  />
                  {/* Floating micro-badges */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Free Diagnostic Practice</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white shadow-xs text-[11px] font-semibold">
                    Classes 4–12 • CBSE &amp; Boards
                  </div>
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* THREE SPACIOUS DOMAIN ENTRY CARDS WITH ENGAGING STUDENT IMAGES */}
            {/* ===================================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6">
              {/* Domain 1: Assessment & Intelligence */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group hover:border-blue-300">
                <div className="space-y-3">
                  {/* Visual Image Header */}
                  <div className="relative rounded-xl overflow-hidden h-32 w-full bg-slate-100 border border-slate-100">
                    <img
                      src="/images/kids-assessment-study.jpg"
                      alt="Student taking diagnostic assessment"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2.5 right-2.5 bg-blue-600 text-white font-bold text-[10px]">
                      5 Free Qs / Subject
                    </Badge>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 mb-0.5">
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
                    <span className="text-slate-400">Zero-Login Trial:</span>
                    <span className="font-semibold text-slate-800">Chapter mocks from ₹20</span>
                  </div>
                </div>

                <Link href="/assessment" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8.5 rounded-xl shadow-2xs flex items-center justify-center gap-1.5">
                    <span>Explore Assessments</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Domain 2: Skill Development */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group hover:border-indigo-300">
                <div className="space-y-3">
                  {/* Visual Image Header */}
                  <div className="relative rounded-xl overflow-hidden h-32 w-full bg-slate-100 border border-slate-100">
                    <img
                      src="/images/kids-skills-coding.jpg"
                      alt="Students learning hands-on coding and technology"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2.5 right-2.5 bg-indigo-600 text-white font-bold text-[10px]">
                      8 Skill Tracks
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
                    <span className="font-semibold text-slate-800">From ₹999/mo</span>
                  </div>
                </div>

                <Link href="/skills" className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-8.5 rounded-xl shadow-2xs flex items-center justify-center gap-1.5">
                    <span>Explore Skill Tracks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>

              {/* Domain 3: Academic Learning */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group hover:border-emerald-300">
                <div className="space-y-3">
                  {/* Visual Image Header */}
                  <div className="relative rounded-xl overflow-hidden h-32 w-full bg-slate-100 border border-slate-100">
                    <img
                      src="/images/kids-academic-reading.jpg"
                      alt="Student reading school textbook with smiles"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2.5 right-2.5 bg-emerald-600 text-white font-bold text-[10px]">
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
                    <span className="font-semibold text-slate-800">From ₹1,999/mo</span>
                  </div>
                </div>

                <Link href="/academic" className="w-full">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8.5 rounded-xl shadow-2xs flex items-center justify-center gap-1.5">
                    <span>Browse Academic Lessons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. COMPACT CLOSED-LOOP LEARNING CYCLE WITH STUDENT VISUAL */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
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
                className="text-xs font-bold text-blue-700 border-blue-200 hover:bg-blue-50 h-8.5 rounded-xl shrink-0 flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Open Growth Plan</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '01',
                  phase: 'Diagnose',
                  domain: 'Assessment & Intelligence',
                  desc: 'A 5-question test identifies the exact micro-gap in concept retention.',
                  badge: 'Step 1',
                  color: 'border-blue-200 bg-blue-50/50 text-blue-700',
                },
                {
                  step: '02',
                  phase: 'Learn',
                  domain: 'Academic Learning',
                  desc: 'Read clear concept breakdowns and verified step-by-step worked examples.',
                  badge: 'Step 2',
                  color: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
                },
                {
                  step: '03',
                  phase: 'Build',
                  domain: 'Skill Development',
                  desc: 'Apply the concept in a practical coding or robotics project workshop.',
                  badge: 'Step 3',
                  color: 'border-indigo-200 bg-indigo-50/50 text-indigo-700',
                },
                {
                  step: '04',
                  phase: 'Master',
                  domain: 'Re-assessment',
                  desc: 'Re-test to verify retention, earn credits, and update your growth trajectory.',
                  badge: 'Step 4',
                  color: 'border-purple-200 bg-purple-50/50 text-purple-700',
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 space-y-2 flex flex-col justify-between"
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
        {/* 3. COMPACT PRICING MATRIX SUMMARY (NO OVERSIZED DISPLAY) */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Transparent Pricing
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Simple Pricing for Every School &amp; Exam Goal
              </h2>
            </div>
            <Link href="/plans">
              <Button
                variant="outline"
                className="text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-8 rounded-xl flex items-center gap-1"
              >
                <span>Full Pricing Comparison</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Assessment Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase">Domain 1</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">Assessment Packs</h3>
                <p className="text-xs text-slate-500 mt-0.5">Pay per test or chapter pack.</p>
              </div>
              <div className="text-xl font-black text-slate-900">
                ₹20 <span className="text-xs text-slate-400 font-normal">to ₹999</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1.5 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>5 Free questions per subject</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Chapter mock packs from ₹20</span>
                </li>
              </ul>
              <Link href="/assessment" className="block pt-1">
                <Button className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold h-8 rounded-xl">
                  View Assessments
                </Button>
              </Link>
            </div>

            {/* Skill Development Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Single Track from ₹999/mo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>All-Access Studio at ₹1,999/mo</span>
                </li>
              </ul>
              <Link href="/skills" className="block pt-1">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold h-8 rounded-xl">
                  View Skill Tracks
                </Button>
              </Link>
            </div>

            {/* Academic Passes Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
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
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Primary Pass (Classes 4–5) ₹1,999/mo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Middle Pass (Classes 6–8) ₹2,799/mo</span>
                </li>
              </ul>
              <Link href="/academic" className="block pt-1">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-8 rounded-xl">
                  View Academic Lessons
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

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
