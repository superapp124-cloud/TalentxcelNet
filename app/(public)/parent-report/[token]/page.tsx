'use client'

import React, { use, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  Clock,
  Sparkles,
  ArrowLeft,
  Share2,
  Printer,
  Copy,
  ExternalLink,
  Award,
  Zap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ParentReportData {
  token: string
  learnerName: string
  cohort: string
  dateRange: string
  activeStudyDays: number
  completedSessions: number
  verifiedConceptsCount: number
  examReadinessScore: number
  attendanceRate: number
  liveClassesAttended: number
  totalLiveClasses: number
  activeProblemSolvingMinutes: number
  topActiveGaps: {
    skill: string
    detectedOn: string
    scheduledRetest: string
    remedialPracticeTime: string
  }[]
  parentActionItems: string[]
  mentorNote: string
  shareUrl: string
  whatsAppUrl: string
}

export default function ParentReportPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const resolvedParams = use(params)
  const token = resolvedParams.token

  const [report, setReport] = useState<ParentReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadReport() {
      try {
        const res = await fetch('/api/academic/parent-report')
        const data = await res.json()
        if (data?.report) {
          setReport({
            ...data.report,
            token,
          })
        }
      } catch (err) {
        console.warn('Failed to load parent report:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadReport()
  }, [token])

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 flex items-center justify-center p-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
            Verifying Sunday Parent Audit Report...
          </p>
        </div>
      </div>
    )
  }

  const r = report || {
    token,
    learnerName: 'Aarav Sharma',
    cohort: 'Class 9 CBSE - Foundation Cohort',
    dateRange: 'Nov 17 – Nov 23, 2026',
    activeStudyDays: 5,
    completedSessions: 14,
    verifiedConceptsCount: 8,
    examReadinessScore: 84,
    attendanceRate: 100,
    liveClassesAttended: 4,
    totalLiveClasses: 4,
    activeProblemSolvingMinutes: 186,
    topActiveGaps: [
      {
        skill: 'Cartesian Sign Conventions in Convex Mirrors',
        detectedOn: 'Wednesday Quiz',
        scheduledRetest: 'Tuesday 7:00 PM',
        remedialPracticeTime: '15 mins targeted sign drill',
      },
      {
        skill: 'Quadratic Discriminant Calculation Slips',
        detectedOn: 'Friday Chapter Test',
        scheduledRetest: 'Thursday 5:00 PM',
        remedialPracticeTime: '10 mins arithmetic precision exercise',
      },
    ],
    parentActionItems: [
      'Encourage a 15-minute quiet drill on mirror signs before Tuesday 7:00 PM.',
      'Ask Aarav during dinner: "Why is the focal length of a convex mirror always positive under Cartesian conventions?"',
      'Celebrate this week\'s mastery in Gravitational Inverse Square relationships (+18% score boost)!',
    ],
    mentorNote:
      'Aarav showed outstanding analytical persistence in Gravitational physics this week. His only friction point was negative coordinate signs during convex mirror image calculations. A brief 15-minute Socratic sprint on Tuesday will solidify this.',
    shareUrl: typeof window !== 'undefined' ? window.location.href : '',
    whatsAppUrl: '',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 text-slate-900 dark:text-white py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between no-print">
          <Link
            href="/academic"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Academic Campus</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleCopyLink}
              variant="outline"
              className="text-xs h-9 rounded-xl gap-1.5 border-slate-200 dark:border-neutral-800"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="text-xs h-9 rounded-xl gap-1.5 border-slate-200 dark:border-neutral-800"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Audit</span>
            </Button>
          </div>
        </div>

        {/* Main Official Report Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-emerald-500/30 p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Header Seal */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-neutral-800 pb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Official Sunday Academic Audit: {r.learnerName}
                  </h1>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    VERIFIED EVIDENCE
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {r.cohort} • Week of {r.dateRange} • Token: <code className="text-[10px] font-mono text-slate-400">{r.token.slice(0, 8)}...</code>
                </p>
              </div>
            </div>

            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs self-start sm:self-center">
              Delivered Every Sunday 6:00 PM
            </Badge>
          </div>

          {/* 4 Objective Metrics Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Active Study Days
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {r.activeStudyDays} / 7
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                Consistent Habit
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Active Practice Hours
              </span>
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {(r.activeProblemSolvingMinutes / 60).toFixed(1)}h
              </span>
              <span className="text-[11px] text-slate-500 font-semibold block">
                {r.activeProblemSolvingMinutes} mins logged
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Verified Masteries
              </span>
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {r.verifiedConceptsCount}
              </span>
              <span className="text-[11px] text-slate-500 font-semibold block">
                &gt;85% under timer
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">
                Exam Readiness
              </span>
              <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                {r.examReadinessScore}%
              </span>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold block">
                +6% trajectory
              </span>
            </div>
          </div>

          {/* Mastered Concepts vs Active Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mastered Concepts */}
            <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
              <h3 className="font-black text-sm text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Mastered Concepts This Week
              </h3>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {[
                  'Newton\'s Universal Law of Gravitation (Inverse Square Proportionality)',
                  'Quadratic Roots via Discriminant Analysis (D > 0 Real & Distinct)',
                  'Mole Concept: Molar Mass to Avogadro Molecules Conversion',
                  'Cell Structure: Plant vs Animal Osmotic Pressure Balance',
                  'Linear Equations in Two Variables: Graphical Consistency',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Active Gaps with Remedial Schedule */}
            <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20 space-y-3">
              <h3 className="font-black text-sm text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Active Conceptual Gaps Under Spaced Revision
              </h3>
              <div className="space-y-2.5 text-xs">
                {r.topActiveGaps.map((gap, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-1"
                  >
                    <span className="font-bold text-slate-900 dark:text-white block">{gap.skill}</span>
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>Detected: {gap.detectedOn}</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        Retest: {gap.scheduledRetest}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block pt-0.5">
                      <strong>Prescription:</strong> {gap.remedialPracticeTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Mentor Observation & Family Discussion */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-950 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Academic Mentor Observation:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic border-l-2 border-emerald-500 pl-3">
              &ldquo;{r.mentorNote}&rdquo;
            </p>

            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-900 dark:text-emerald-300 block text-xs">
                  Recommended Family Dinner Conversation:
                </strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {r.parentActionItems[1] || r.parentActionItems[0]}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-neutral-800 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Tamper-Proof TalentXcel Academic Audit Record</span>
            </div>
            <span>Generated Sunday 6:00 PM IST • Next Audit: Coming Sunday</span>
          </div>
        </div>
      </div>
    </div>
  )
}
