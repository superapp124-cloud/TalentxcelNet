'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle, AlertCircle, Laptop, ArrowRight, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface ProgrammePricingProps {
  programmeTitle?: string
  durationMonths?: number
  slug?: string
  showProgrammeSelector?: boolean
}

export const DELIVERED_PROGRAMMES = [
  { slug: 'ai-development', title: 'AI Development & Automation', durationMonths: 8 },
  { slug: 'competitive-exams', title: 'Government & Competitive Exams (UPSC, PSC, Banking)', durationMonths: 8 },
  { slug: 'school-foundation', title: 'School Foundation Track (Class 8 → 9)', durationMonths: 8 },
  { slug: 'highschool-integrated-foundation', title: 'High School Integrated Foundation (Classes 9–12)', durationMonths: 24 },
  { slug: 'healthcare-tech', title: 'Healthcare Technology Programme', durationMonths: 8 },
  { slug: 'entrepreneurship', title: 'Entrepreneurship & Startup Launch', durationMonths: 8 },
  { slug: 'small-business', title: 'Small Business & Retailers Programme', durationMonths: 8 },
  { slug: 'home-business', title: 'Home Business & Women Entrepreneurs', durationMonths: 8 },
  { slug: 'teachers-trainers', title: 'Teachers & Trainers Digital Empowerment', durationMonths: 8 },
  { slug: 'lifestyle-trainers', title: 'Yoga, Fitness, Dance & Lifestyle Trainers', durationMonths: 8 },
]

export function ProgrammePricingPlans({
  programmeTitle = 'AI Development & Automation',
  durationMonths = 8,
  slug = 'ai-development',
  showProgrammeSelector = false,
}: ProgrammePricingProps) {
  const [selectedSlug, setSelectedSlug] = useState(slug)

  const activeProgramme = DELIVERED_PROGRAMMES.find((p) => p.slug === selectedSlug) || {
    title: programmeTitle,
    durationMonths,
    slug,
  }

  const currentTitle = showProgrammeSelector ? activeProgramme.title : programmeTitle
  const currentDuration = showProgrammeSelector ? activeProgramme.durationMonths : durationMonths
  const currentSlug = showProgrammeSelector ? activeProgramme.slug : slug

  return (
    <div className="space-y-10">
      {/* Optional Course Selector for the Fees Directory */}
      {showProgrammeSelector && (
        <div className="space-y-3 max-w-xl mx-auto text-center">
          <label htmlFor="course-select" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Select Course to View Tuition & Plans
          </label>
          <select
            id="course-select"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
          >
            {DELIVERED_PROGRAMMES.map((prog) => (
              <option key={prog.slug} value={prog.slug}>
                {prog.title} ({prog.durationMonths} Months)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Course Context Header */}
      <div className="text-center space-y-1">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          {currentTitle}
        </h3>
        <p className="text-sm font-medium text-primary">
          {currentDuration}-Month Programme • Applications Opening Soon
        </p>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Plan card 1: Instalment Plan */}
          <Card className="border-2 border-primary/40 bg-card shadow-md flex flex-col justify-between">
            <CardHeader className="p-6 sm:p-8 pb-4 space-y-2 border-b bg-muted/20">
              <div className="text-xs font-bold uppercase tracking-wider text-primary">
                Plan card 1: Instalment Plan
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                Instalment Plan ({currentTitle})
              </CardTitle>
              <p className="text-xs font-semibold text-muted-foreground">
                {currentDuration}-month programme
              </p>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground">₹29,999</span>
                  <span className="text-sm text-muted-foreground">upfront</span>
                </div>
                <div className="text-sm font-semibold text-foreground">
                  + ₹1,500 a month for {currentDuration} months
                </div>
                <div className="text-xs text-muted-foreground pt-1 border-t">
                  Total ₹41,999 + 18% GST
                </div>
                <div className="text-[11px] text-muted-foreground/80 font-mono">
                  (GST included: about ₹35,399 upfront and ₹1,770 a month)
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-muted-foreground border-t pt-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Full curriculum access and project evaluations</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Offline lesson downloads</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Laptop className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Laptop</strong>: included with your admission, model and specifications confirmed in writing before you enrol
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>AI Tutor and Coding Mentor</strong>: coming soon
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link href={`/apply?programme=${currentSlug}&plan=instalment`} className="block">
                  <Button size="lg" className="w-full font-bold text-sm bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                    Register Your Interest
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Plan card 2: Full Payment */}
          <Card className="border bg-card shadow-xs flex flex-col justify-between">
            <CardHeader className="p-6 sm:p-8 pb-4 space-y-2 border-b bg-muted/10">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Plan card 2: Full Payment
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-foreground">
                Full Payment
              </CardTitle>
              <p className="text-xs font-semibold text-muted-foreground">
                {currentDuration}-month programme
              </p>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground">₹41,999</span>
                  <span className="text-sm text-muted-foreground">+ 18% GST</span>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  One payment of ₹41,999 + 18% GST (about ₹49,559)
                </div>
                <div className="text-sm font-semibold text-foreground pt-1 border-t">
                  No monthly debits
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-muted-foreground border-t pt-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Same programme and inclusions as the Instalment Plan</span>
                </div>
                <div className="flex items-start gap-2.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>₹2,000 early-payment discount (Pay ₹39,999 + 18% GST / about ₹47,199)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Laptop className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Laptop</strong>: included with your admission, model and specifications confirmed in writing before you enrol
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>AI Tutor and Coding Mentor</strong>: coming soon
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link href={`/apply?programme=${currentSlug}&plan=full`} className="block">
                  <Button size="lg" variant="outline" className="w-full font-bold text-sm hover:bg-muted">
                    Register Your Interest
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Block: What’s included and what’s not */}
      <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-foreground">
            What&apos;s included and what&apos;s not
          </h4>
          <p className="text-xs text-muted-foreground">
            Complete transparency across curriculum, hardware, and operational boundaries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Included Column */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              Included
            </h5>
            <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{currentDuration} months of structured, project-based learning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Access to course materials and offline downloads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Project reviews and a platform-issued completion certificate once criteria are met</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>Access to TalentXcel, CHATR and Nuty Tales</span>
              </li>
            </ul>
          </div>

          {/* Not included or not guaranteed Column */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <XCircle className="h-4 w-4" />
              Not included or not guaranteed
            </h5>
            <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Jobs, salary levels, exam results or business income</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Accreditation by a university or government body</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>Any hardware beyond what’s confirmed in your admission agreement</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Transparency Note */}
        <div className="pt-4 border-t flex items-start gap-2.5 text-xs text-muted-foreground">
          <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Proposed offer</strong>. Fees, laptop specifications and final terms are confirmed before enrolment.
          </p>
        </div>
      </div>
    </div>
  )
}
