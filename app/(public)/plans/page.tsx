'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Calculator,
  Brain,
  Code,
  GraduationCap,
  Layers,
  HelpCircle,
  Clock,
  Award,
  Lock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ASSESSMENT_PRODUCTS,
  SKILL_PRODUCTS,
  ACADEMIC_PRODUCTS,
} from '@/packages/core/src/data/product-catalog'
import type { CommercialProduct, LearnerEntitlement } from '@/packages/core/src/types'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'

export default function PlansPricingPage() {
  const [selectedDomain, setSelectedDomain] = useState<'all' | 'assessment' | 'skill' | 'academic'>('all')
  const [skillBillingCycle, setSkillBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [selectedAcademicClass, setSelectedAcademicClass] = useState<number>(4)
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [activeEntitlement, setActiveEntitlement] = useState<LearnerEntitlement | null>(null)

  const filteredSkillProducts = SKILL_PRODUCTS.filter(
    (p) => p.billingCycle === skillBillingCycle
  )

  const selectedAcademicProduct =
    ACADEMIC_PRODUCTS.find((p) => p.targetGradeLevel === selectedAcademicClass) ||
    ACADEMIC_PRODUCTS[0]

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 font-medium">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-semibold">Plans & Pricing</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:underline flex items-center gap-1 font-medium">
              Free Practice (₹0)
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Transparent Pricing
            </span>
          </div>
        </div>
      </div>

      {/* Compact Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-4 text-center space-y-2">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-2.5 py-0.5 text-[11px] font-bold">
          Universal Learning &amp; Assessment Platform
        </Badge>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Transparent, Fair Pricing for Every Learner
        </h1>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          Start with free assessments without signup. Upgrade transparently when you are ready to unlock comprehensive question packs, evaluated skill tracks, or board-aligned classes.
        </p>

        {/* Active Entitlement Notice */}
        {activeEntitlement && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl max-w-lg mx-auto text-left flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900">
              <p className="font-semibold text-emerald-950">Active Entitlement Verified!</p>
              <p className="mt-0.5">
                Your purchase is active. Remaining attempts:{' '}
                <span className="font-bold">
                  {activeEntitlement.attemptsRemaining === -1 ? 'Unlimited' : activeEntitlement.attemptsRemaining}
                </span>
                . Valid until {new Date(activeEntitlement.validUntil).toLocaleDateString()}.
              </p>
              <Link href="/" className="inline-block mt-1 font-semibold text-emerald-700 underline">
                Return to Dashboard &amp; Launch Assessment →
              </Link>
            </div>
          </div>
        )}

        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
          <button
            onClick={() => setSelectedDomain('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedDomain === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            All Plans
          </button>
          <button
            onClick={() => setSelectedDomain('assessment')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              selectedDomain === 'assessment'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            Assessment & Intelligence
          </button>
          <button
            onClick={() => setSelectedDomain('skill')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              selectedDomain === 'skill'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Skill Development
          </button>
          <button
            onClick={() => setSelectedDomain('academic')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              selectedDomain === 'academic'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Learning
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ================================================================= */}
        {/* DOMAIN 1: ASSESSMENT & INTELLIGENCE */}
        {/* ================================================================= */}
        {(selectedDomain === 'all' || selectedDomain === 'assessment') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                    <Brain className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">1. Assessment & Intelligence</h2>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Server-authoritative scoring, question-solution separation, diagnostic gap detection & competitive pipelines.
                </p>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>5 Free Questions per Subject Always Free (₹0)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {ASSESSMENT_PRODUCTS.map((prod) => {
                const gstAmount = Math.round(prod.basePriceRupees * 0.18)
                const totalAmount = prod.basePriceRupees + gstAmount

                return (
                  <div
                    key={prod.id}
                    className={`relative rounded-2xl bg-white border p-5 flex flex-col justify-between transition-all hover:shadow-md ${
                      prod.popular
                        ? 'border-blue-500 shadow-sm ring-2 ring-blue-500/10'
                        : 'border-slate-200'
                    }`}
                  >
                    {prod.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-blue-600 text-white border-none text-[10px] font-semibold px-2.5 py-0.5">
                          {prod.badge}
                        </Badge>
                      </div>
                    )}

                    <div className="space-y-3">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{prod.title}</h3>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{prod.tagline}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-slate-900">₹{prod.basePriceRupees}</span>
                          <span className="text-[10px] text-slate-400">/ one-time</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          +18% GST (₹{gstAmount}) = <span className="font-semibold text-slate-700">₹{totalAmount}</span>
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-2 text-[11px] text-slate-600">
                        <div className="flex items-center gap-1 font-semibold text-slate-900">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span>Validity: {prod.validityDays} Days</span>
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-slate-900">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>
                            {prod.attemptsAllowed === -1
                              ? 'Unlimited Attempts'
                              : `${prod.attemptsAllowed} Full Attempt(s)`}
                          </span>
                        </div>

                        <ul className="space-y-1 pt-2 border-t border-slate-100">
                          {prod.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-start gap-1 text-[10px] leading-tight text-slate-600">
                              <span className="text-blue-600 shrink-0">•</span>
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100">
                      <Button
                        onClick={() => setCheckoutProductId(prod.id)}
                        className={`w-full h-9 text-xs font-semibold rounded-xl ${
                          prod.popular
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        Buy for ₹{totalAmount}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* DOMAIN 2: SKILL DEVELOPMENT */}
        {/* ================================================================= */}
        {(selectedDomain === 'all' || selectedDomain === 'skill') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                    <Code className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">2. Skill Development</h2>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Japanese Kaizen craft & Chinese progression drills across Coding, AI, Robotics, UI Design & Financial Literacy.
                </p>
              </div>

              {/* Monthly / Annual Toggle */}
              <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setSkillBillingCycle('monthly')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    skillBillingCycle === 'monthly'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSkillBillingCycle('annual')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    skillBillingCycle === 'annual'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Annual
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-bold">
                    Save 17%
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredSkillProducts.map((prod) => {
                const gstAmount = Math.round(prod.basePriceRupees * 0.18)
                const totalAmount = prod.basePriceRupees + gstAmount

                return (
                  <div
                    key={prod.id}
                    className={`relative rounded-2xl bg-white border p-6 flex flex-col justify-between transition-all hover:shadow-lg ${
                      prod.popular
                        ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                        : 'border-slate-200'
                    }`}
                  >
                    {prod.badge && (
                      <div className="absolute -top-3 left-6">
                        <Badge className="bg-indigo-600 text-white border-none text-[10px] font-semibold px-2.5 py-0.5">
                          {prod.badge}
                        </Badge>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                          {prod.skillLevel} Pathway
                        </span>
                        <h3 className="font-bold text-base text-slate-900 mt-0.5">{prod.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{prod.tagline}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-slate-900">₹{prod.basePriceRupees}</span>
                          <span className="text-xs text-slate-500">
                            / {prod.billingCycle === 'annual' ? 'year' : 'month'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          +18% GST (₹{gstAmount}) = <span className="font-semibold text-slate-900">₹{totalAmount}</span> total payable
                        </p>
                      </div>

                      <div className="space-y-2 pt-2">
                        <p className="text-xs font-semibold text-slate-700">Included Deliverables & Rubrics:</p>
                        <ul className="space-y-2 text-xs text-slate-600">
                          {prod.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100">
                      <Button
                        onClick={() => setCheckoutProductId(prod.id)}
                        className={`w-full h-11 text-xs font-semibold rounded-xl ${
                          prod.popular
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        Enroll Track for ₹{totalAmount}
                      </Button>
                      <p className="text-[10px] text-center text-slate-400 mt-2">
                        Cancel anytime • 7-day money-back satisfaction guarantee
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* DOMAIN 3: ACADEMIC LEARNING (CLASSES 4 TO 12) */}
        {/* ================================================================= */}
        {(selectedDomain === 'all' || selectedDomain === 'academic') && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">3. Academic Learning (Classes 4–12)</h2>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Full syllabus coverage: Chapter lessons, concept breakdowns, step-by-step worked examples & diagnostic tests.
                </p>
              </div>

              {/* Class Selector Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedAcademicClass(g)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedAcademicClass === g
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Class {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Academic Product Spotlight */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    Class {selectedAcademicClass} Academic Plan
                  </Badge>
                  {selectedAcademicProduct.badge && (
                    <Badge variant="outline" className="border-emerald-300 text-emerald-700">
                      {selectedAcademicProduct.badge}
                    </Badge>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-slate-900">{selectedAcademicProduct.title}</h3>
                <p className="text-sm text-slate-600">{selectedAcademicProduct.tagline}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {selectedAcademicProduct.inclusions.map((inc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Checkout Card */}
              <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center space-y-4">
                <div>
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    Monthly Academic Access
                  </span>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-4xl font-black text-slate-900">
                      ₹{selectedAcademicProduct.basePriceRupees}
                    </span>
                    <span className="text-xs text-slate-500">/ month</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    +18% GST (₹{Math.round(selectedAcademicProduct.basePriceRupees * 0.18)}) ={' '}
                    <span className="font-bold text-slate-900">
                      ₹{selectedAcademicProduct.basePriceRupees + Math.round(selectedAcademicProduct.basePriceRupees * 0.18)}
                    </span>{' '}
                    payable
                  </p>
                </div>

                <Button
                  onClick={() => setCheckoutProductId(selectedAcademicProduct.id)}
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm"
                >
                  Unlock Class {selectedAcademicClass} for ₹
                  {selectedAcademicProduct.basePriceRupees + Math.round(selectedAcademicProduct.basePriceRupees * 0.18)}
                </Button>

                <div className="text-[11px] text-slate-500 space-y-1">
                  <p>✓ All subjects included (Math, Science, English, etc.)</p>
                  <p>✓ Step-by-step NCERT worked examples</p>
                  <p>✓ Connected to diagnostic chapter test runner</p>
                </div>
              </div>
            </div>

            {/* Complete Monthly Ladder Overview */}
            <div className="mt-8 bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Complete Class 4 to Class 12 Monthly Ladder
                </h4>
                <span className="text-[11px] text-slate-500">Transparent ₹400/grade progression</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-9 divide-x divide-y sm:divide-y-0 divide-slate-100 text-center">
                {ACADEMIC_PRODUCTS.map((ap) => (
                  <button
                    key={ap.id}
                    onClick={() => setSelectedAcademicClass(ap.targetGradeLevel || 4)}
                    className={`p-3.5 transition-colors ${
                      selectedAcademicClass === ap.targetGradeLevel
                        ? 'bg-emerald-50 text-emerald-900 font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <p className="text-xs font-semibold">Class {ap.targetGradeLevel}</p>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">₹{ap.basePriceRupees}</p>
                    <p className="text-[10px] text-slate-400">+18% GST</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* TRUST & FREQUENTLY ASKED QUESTIONS */}
        {/* ================================================================= */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-xl font-bold text-slate-900">Non-Negotiable Trust & Refund Guarantees</h3>
            <p className="text-xs text-slate-600">
              TalentXcel operates with transparent pricing, zero hidden subscriptions, and bank-grade SSL security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-slate-600">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                7-Day Satisfaction Guarantee
              </h5>
              <p>
                If you purchase any test pack or course and find it unsuitable before using more than 2 attempts, we refund 100% of your fee promptly.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                No Automatic Hidden Renewals
              </h5>
              <p>
                We do not silently charge your card without your explicit authorization. You decide every month or year whether to renew.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Real Questions & Authentic Scoring
              </h5>
              <p>
                All assessment scores are strictly calculated server-side against validated solution keys. Distractors and step-by-step explanations are verified by subject specialists.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Razorpay Checkout Modal */}
      <RazorpayCheckoutModal
        isOpen={Boolean(checkoutProductId)}
        onClose={() => setCheckoutProductId(null)}
        productId={checkoutProductId}
        onSuccess={(entitlement) => {
          setActiveEntitlement(entitlement)
        }}
      />
    </div>
  )
}
