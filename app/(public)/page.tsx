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

      {/* Main Container */}
      <main className="flex-1 space-y-14 sm:space-y-20 pb-20">
        {/* ========================================================================= */}
        {/* 1. FIRST VIEWPORT HERO SECTION */}
        {/* ========================================================================= */}
        <section className="bg-white border-b border-slate-200/80 pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Top Eyebrow Tag */}
            <div className="flex flex-col items-center text-center space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>The Universal Learning Platform</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Three Distinct Domains • Zero Login Required for Trial</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Universal Learning, Assessment &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Real Skills for Every Ambition.
                </span>
              </h1>

              {/* Concise Value Proposition */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                One unified platform connecting rigorous curriculum diagnostics, Kaizen skill craftsmanship, and verified academic lessons for Classes 4–12 and competitive aspirants.
              </p>

              {/* Hero CTA & Quick Diagnostic Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
                <Button
                  onClick={handleLaunchFreeDiagnostic}
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm h-12 px-7 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Free Practice (Class 4 Diagnostic)</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Link href="/plans" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-slate-700 font-bold text-sm border-slate-300 hover:bg-slate-50 h-12 px-6 rounded-2xl"
                  >
                    <span>View Plans &amp; Pricing</span>
                  </Button>
                </Link>
              </div>

              {/* Discreet, Transparent Pricing Indicator */}
              <div className="pt-3 text-xs text-slate-500 font-medium flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <span>✓ 5 Free Questions per Subject</span>
                <span className="text-slate-300">•</span>
                <span>✓ Chapter Mocks from ₹20</span>
                <span className="text-slate-300">•</span>
                <span>✓ Skill Tracks from ₹999/mo</span>
                <span className="text-slate-300">•</span>
                <span>✓ Class Passes from ₹1,999/mo</span>
              </div>
            </div>

            {/* Quick Curriculum / Grade Selector Bar */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Board:</span>
                  <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl gap-1">
                    {['CBSE', 'CISCE', 'IB'].map((board) => (
                      <button
                        key={board}
                        onClick={() => setSelectedBoardCode(board)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
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

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class:</span>
                  <select
                    value={selectedClassGrade}
                    onChange={(e) => setSelectedClassGrade(e.target.value)}
                    className="bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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

            {/* ===================================================================== */}
            {/* THREE SPACIOUS DOMAIN ENTRY CARDS */}
            {/* ===================================================================== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {/* Domain 1: Assessment & Intelligence */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between gap-6 group hover:border-blue-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-bold text-[11px]">
                      5 Free Qs / Subject
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                      Domain 1
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                      Assessment &amp; Intelligence
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      Test skills. Measure ability. Identify gaps. School assessments, 6 analytical reasoning dimensions, and competitive entrance mocks with instant server scoring.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Zero-Login Trial:</span>
                      <span className="font-bold text-emerald-600">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Paid Chapter Mocks:</span>
                      <span className="font-semibold text-slate-800">From ₹20</span>
                    </div>
                  </div>
                </div>

                <Link href="/assessment" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10 rounded-xl shadow-xs flex items-center justify-center gap-1.5">
                    <span>Explore Assessments</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Domain 2: Skill Development */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between gap-6 group hover:border-indigo-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Code className="w-6 h-6 text-indigo-600" />
                    </div>
                    <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 font-bold text-[11px]">
                      8 Career Tracks
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      Domain 2
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mt-0.5">
                      Skill Development
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      Learn by doing, building and mastering. Japanese Kaizen craftsmanship and Chinese structured progression across AI, coding, robotics, design, debate and venture building.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Capstone Evaluation:</span>
                      <span className="font-bold text-indigo-600">Rubric-Based</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Monthly Tracks:</span>
                      <span className="font-semibold text-slate-800">From ₹999/mo</span>
                    </div>
                  </div>
                </div>

                <Link href="/skills" className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 rounded-xl shadow-xs flex items-center justify-center gap-1.5">
                    <span>Explore Skill Tracks</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Domain 3: Academic Learning */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between gap-6 group hover:border-emerald-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-6 h-6 text-emerald-600" />
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[11px]">
                      Classes 4–12
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                      Domain 3
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                      Academic Learning
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                      Calm, board-aligned academic learning. Step-by-step concept breakdowns, verified worked examples, chapter revision notes, and diagnostic checkpoints.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Curriculum:</span>
                      <span className="font-bold text-emerald-600">CBSE Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Class Passes:</span>
                      <span className="font-semibold text-slate-800">From ₹1,999/mo</span>
                    </div>
                  </div>
                </div>

                <Link href="/academic" className="w-full">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 rounded-xl shadow-xs flex items-center justify-center gap-1.5">
                    <span>Browse Academic Lessons</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. PROGRESSIVE DISCLOSURE: CLOSED-LOOP KAIZEN LEARNING CYCLE */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
            <div className="max-w-3xl space-y-3">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs font-bold">
                Kaizen Feedback Loop
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                How the Three Domains Interlock for Mastery
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                TalentXcel avoids passive video watching. When an assessment identifies a weak area, our Kaizen engine directs you to targeted academic explanations and real-world skill projects.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  phase: 'Diagnose',
                  domain: 'Assessment & Intelligence',
                  desc: 'Server evaluates your attempt, detecting subtle misconceptions down to micro-topics.',
                  tag: 'Identify Gaps',
                },
                {
                  step: '02',
                  phase: 'Learn',
                  domain: 'Academic Learning',
                  desc: 'Read grounded concept breakdowns and step-by-step worked solutions for the gap.',
                  tag: 'Grounded Reading',
                },
                {
                  step: '03',
                  phase: 'Build',
                  domain: 'Skill Development',
                  desc: 'Construct a real-world coding or physical project reinforcing the exact underlying principle.',
                  tag: 'Applied Craft',
                },
                {
                  step: '04',
                  phase: 'Master',
                  domain: 'Continuous Kaizen',
                  desc: 'Re-assess to verify retention, earn pass credits, and update your personal growth plan.',
                  tag: 'Verified Retention',
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 backdrop-blur-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-blue-400">{step.step}</span>
                      <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-bold text-slate-300">
                        {step.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white">{step.phase}</h3>
                    <p className="text-xs text-blue-300 font-semibold">{step.domain}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
              <span className="text-xs text-slate-400">
                Ready to review your personal learning trajectory?
              </span>
              <Button
                onClick={() => setIsGrowthPlanOpen(true)}
                variant="outline"
                className="bg-transparent hover:bg-white/10 text-white border-white/20 text-xs font-bold h-9 rounded-xl flex items-center gap-1.5"
              >
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Open Personalised Growth Plan</span>
              </Button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TRANSPARENT PRICING SUMMARY OVERVIEW */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Transparent Commercials
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Commercial Architecture from Day 1
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Zero deceptive trial traps. Micro-packs from ₹20, skills from ₹999/mo, and academic passes from ₹1,999/mo.
              </p>
            </div>
            <Link href="/plans">
              <Button
                variant="outline"
                className="text-xs font-bold text-slate-700 border-slate-300 hover:bg-slate-50 h-9 rounded-xl flex items-center gap-1.5"
              >
                <span>Full Plans &amp; Comparison</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Assessment Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">Assessment Packs</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Micro &amp; Mock Packs</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Pay for what you test. No mandatory monthly subscriptions.
                </p>
              </div>
              <div className="text-2xl font-black text-slate-900">
                ₹20 <span className="text-xs text-slate-400 font-normal">to ₹999 one-time</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>5 Free questions per available subject</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Single chapter mock packs from ₹20</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Full competitive sprint passes at ₹999</span>
                </li>
              </ul>
              <Link href="/assessment">
                <Button className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold h-9 rounded-xl mt-2">
                  Explore Assessments
                </Button>
              </Link>
            </div>

            {/* Skill Development Tier */}
            <div className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-2xs space-y-4 relative">
              <Badge className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-bold">
                Craftsmanship
              </Badge>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase">Skill Subscriptions</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Skill Studio Tracks</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Hands-on capstones, rubric evaluations, and portfolio credit.
                </p>
              </div>
              <div className="text-2xl font-black text-slate-900">
                ₹999 <span className="text-xs text-slate-400 font-normal">to ₹4,999 / mo</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Single Foundation Track at ₹999/mo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>All-Access Studio (8 Tracks) at ₹1,999/mo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Capstone Mentorship &amp; Rubrics at ₹4,999/mo</span>
                </li>
              </ul>
              <Link href="/skills">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold h-9 rounded-xl mt-2">
                  Explore Skill Tracks
                </Button>
              </Link>
            </div>

            {/* Academic Passes Tier */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase">Academic Passes</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Classes 4–12 Monthly</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Full curriculum lessons, worked examples, and diagnostic tests.
                </p>
              </div>
              <div className="text-2xl font-black text-slate-900">
                ₹1,999 <span className="text-xs text-slate-400 font-normal">to ₹5,199 / mo</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 border-t border-slate-100 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Primary Pass (Classes 4–5) at ₹1,999/mo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Middle Pass (Classes 6–8) at ₹2,799/mo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Board Pass (Classes 9–10) at ₹3,999/mo</span>
                </li>
              </ul>
              <Link href="/academic">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-9 rounded-xl mt-2">
                  Browse Academic Lessons
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
