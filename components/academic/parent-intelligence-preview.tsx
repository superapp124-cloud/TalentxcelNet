'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  Share2,
  Copy,
  ExternalLink,
  RefreshCw,
  Send,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SAMPLE_PARENT_REPORT } from '@/lib/academic/class-9-master-data'

export function ParentIntelligencePreview({
  onEnrolClick,
}: {
  onEnrolClick?: () => void
}) {
  const [report, setReport] = useState<any>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [copiedDigest, setCopiedDigest] = useState(false)

  const fetchLiveReport = async () => {
    setIsRefreshing(true)
    try {
      const res = await fetch('/api/academic/parent-report')
      const data = await res.json()
      if (data?.report) {
        setReport(data.report)
      }
    } catch (err) {
      console.warn('Could not load live parent report, using sample:', err)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchLiveReport()
  }, [])

  const handleCopyWhatsApp = () => {
    const text = report?.whatsAppText ||
      `📊 *SUNDAY ACADEMIC INTELLIGENCE BRIEFING*\n` +
      `🎓 Learner: *${SAMPLE_PARENT_REPORT.learnerName}* | ${SAMPLE_PARENT_REPORT.cohort}\n` +
      `📅 Week: *${SAMPLE_PARENT_REPORT.dateRange}*\n\n` +
      `✅ *Weekly Academic Highlights:*\n` +
      `• Active Study Days: *5 of 7 days*\n` +
      `• Verified Concepts Mastered: *${SAMPLE_PARENT_REPORT.masteredSkills.length} concepts (>90% exam timer)*\n` +
      `• Active Practice Time: *${SAMPLE_PARENT_REPORT.activeProblemSolvingMinutes} minutes logged*\n\n` +
      `⚠️ *Focus Gaps Under Spaced Revision:*\n` +
      SAMPLE_PARENT_REPORT.activeGapsUnderRevision.map((g) => `• ${g.skill} (Retest: ${g.scheduledRetest})`).join('\n') +
      `\n\n💡 *Recommended Family Conversation Prompt:*\n` +
      `"${SAMPLE_PARENT_REPORT.parentDiscussionPrompt}"\n\n` +
      `🔗 *View Full Verified Audit Report Online:*\n${typeof window !== 'undefined' ? window.location.origin : 'https://talentxcel.net'}/parent-report/b872c011-3091-4e78-9577-3e19875f129a`

    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(text)
      setCopiedDigest(true)
      setTimeout(() => setCopiedDigest(false), 2500)
    }
  }

  const token = report?.token || 'b872c011-3091-4e78-9577-3e19875f129a'
  const whatsAppUrl = report?.whatsAppUrl || `https://wa.me/?text=${encodeURIComponent('Academic Intelligence Briefing')}`

  return (
    <section className="space-y-8" id="parent-intelligence-preview">
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          Pillar 4: Total Transparency for Families
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          The Sunday Parent AI Intelligence Cockpit
        </h2>
        <p className="text-sm text-muted-foreground">
          Never wonder how your child is doing. Every Sunday at 6 PM, Super AI compiles active study hours, verified concepts, and exact focus gaps with a 1-click WhatsApp digest for parents.
        </p>
      </div>

      {/* Main Report Card */}
      <div className="max-w-4xl mx-auto rounded-3xl border border-emerald-500/30 bg-card p-6 sm:p-10 shadow-2xl space-y-8">
        {/* Report Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg sm:text-xl text-foreground">
                  Weekly Progress Audit: {report?.learnerName || SAMPLE_PARENT_REPORT.learnerName}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Verified Data
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {report?.cohort || SAMPLE_PARENT_REPORT.cohort} • Week {report?.weekNumber || SAMPLE_PARENT_REPORT.weekNumber} ({report?.dateRange || SAMPLE_PARENT_REPORT.dateRange})
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
            <Button
              onClick={fetchLiveReport}
              disabled={isRefreshing}
              variant="outline"
              className="text-xs h-8 px-2.5 rounded-xl gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Live'}</span>
            </Button>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">
              Every Sunday 6:00 PM
            </Badge>
          </div>
        </div>

        {/* Action Bar: WhatsApp Share & Public Link */}
        <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 block">
              Sunday WhatsApp Dispatch &amp; Family Audit
            </span>
            <span className="text-[11px] text-muted-foreground">
              Instant 1-click summary ready to dispatch directly to parent smartphones.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center">
            <Button
              onClick={handleCopyWhatsApp}
              variant="outline"
              className="text-xs h-9 rounded-xl gap-1.5 bg-background border-emerald-500/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/10"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedDigest ? 'Copied WhatsApp Text!' : 'Copy WhatsApp Text'}</span>
            </Button>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send via WhatsApp</span>
            </a>

            <Link
              href={`/parent-report/${token}`}
              className="inline-flex items-center gap-1 px-3 h-9 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs font-bold text-muted-foreground hover:text-foreground transition-all"
            >
              <span>Full Audit View</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Objective Metrics Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-muted/20 border text-center space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Live Attendance
            </span>
            <span className="text-3xl font-black text-foreground">
              {report?.attendanceRate ?? SAMPLE_PARENT_REPORT.attendanceRate}%
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">
              {report?.liveClassesAttended ?? SAMPLE_PARENT_REPORT.liveClassesAttended} of {report?.totalLiveClasses ?? SAMPLE_PARENT_REPORT.totalLiveClasses} classes
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-muted/20 border text-center space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Problem Solving
            </span>
            <span className="text-3xl font-black text-foreground">
              {report?.activeProblemSolvingMinutes ?? SAMPLE_PARENT_REPORT.activeProblemSolvingMinutes}m
            </span>
            <span className="text-[11px] text-muted-foreground font-semibold block">
              {((report?.activeProblemSolvingMinutes ?? SAMPLE_PARENT_REPORT.activeProblemSolvingMinutes) / 60).toFixed(1)} active hours logged
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-muted/20 border text-center space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Mastered Concepts
            </span>
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {report?.verifiedConceptsCount ?? SAMPLE_PARENT_REPORT.masteredSkills.length}
            </span>
            <span className="text-[11px] text-muted-foreground font-semibold block">
              &gt;85% under exam timer
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-muted/20 border text-center space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Gaps Under Review
            </span>
            <span className="text-3xl font-black text-amber-500">
              {report?.topActiveGaps?.length ?? SAMPLE_PARENT_REPORT.activeGapsUnderRevision.length}
            </span>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block">
              Spaced retests set
            </span>
          </div>
        </div>

        {/* Mastered Skills vs Active Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mastered */}
          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-50/5 space-y-3">
            <h4 className="font-extrabold text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Verified Mastered Concepts This Week
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {SAMPLE_PARENT_REPORT.masteredSkills.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Active Gaps with Remedial Schedule */}
          <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-50/5 space-y-3">
            <h4 className="font-extrabold text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Gaps Under Active Remedial Revision
            </h4>
            <div className="space-y-2.5 text-xs">
              {(report?.topActiveGaps || SAMPLE_PARENT_REPORT.activeGapsUnderRevision).map((gap: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-background border space-y-1">
                  <span className="font-bold text-foreground block">{gap.skill}</span>
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                    <span>{gap.detectedOn}</span>
                    <span className="font-bold text-primary">{gap.scheduledRetest}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground block pt-0.5">
                    <strong>Action:</strong> {gap.remedialPracticeTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mentor Note & Dinner Conversation Tip */}
        <div className="p-5 rounded-2xl border bg-muted/30 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Users className="h-4 w-4" />
            <span>Academic Mentor Observation:</span>
          </div>
          <p className="text-muted-foreground leading-relaxed italic">
            &ldquo;{report?.mentorNote || SAMPLE_PARENT_REPORT.mentorNote}&rdquo;
          </p>

          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-foreground flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-primary block text-xs">Recommended Family Conversation:</strong>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {report?.parentActionItems?.[1] || SAMPLE_PARENT_REPORT.parentDiscussionPrompt}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            14-Day Money-Back Guarantee if you do not see measurable progress in 2 weeks.
          </span>

          {onEnrolClick && (
            <Button
              onClick={onEnrolClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs rounded-xl h-9 px-4 gap-1.5"
            >
              Enrol Your Child in Class 9 <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
