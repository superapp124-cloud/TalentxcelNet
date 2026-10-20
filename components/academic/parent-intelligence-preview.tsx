'use client'

import React from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SAMPLE_PARENT_REPORT } from '@/lib/academic/class-9-master-data'

export function ParentIntelligencePreview({
  onEnrolClick,
}: {
  onEnrolClick?: () => void
}) {
  return (
    <section className="space-y-8" id="parent-intelligence-preview">
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
          Total Transparency for Families
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          The Sunday Parent AI Intelligence Cockpit
        </h2>
        <p className="text-sm text-muted-foreground">
          Never wonder how your child is doing. Every Sunday at 6 PM, Super AI sends an actionable briefing showing attendance, active practice hours, verified concepts, and exact focus gaps.
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
                  Weekly Progress Audit: {SAMPLE_PARENT_REPORT.learnerName}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Verified Data
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {SAMPLE_PARENT_REPORT.cohort} • Week {SAMPLE_PARENT_REPORT.weekNumber} ({SAMPLE_PARENT_REPORT.dateRange})
              </p>
            </div>
          </div>

          <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs self-start sm:self-center">
            Delivered Every Sunday 6:00 PM
          </Badge>
        </div>

        {/* 4 Objective Metrics Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-muted/20 border text-center space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Live Attendance
            </span>
            <span className="text-3xl font-black text-foreground">
              {SAMPLE_PARENT_REPORT.attendanceRate}%
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">
              {SAMPLE_PARENT_REPORT.liveClassesAttended} of {SAMPLE_PARENT_REPORT.totalLiveClasses} classes
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-muted/20 border text-center space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Problem Solving
            </span>
            <span className="text-3xl font-black text-foreground">
              {SAMPLE_PARENT_REPORT.activeProblemSolvingMinutes}m
            </span>
            <span className="text-[11px] text-muted-foreground font-semibold block">
              3.1 active hours logged
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-muted/20 border text-center space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Mastered Concepts
            </span>
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {SAMPLE_PARENT_REPORT.masteredSkills.length}
            </span>
            <span className="text-[11px] text-muted-foreground font-semibold block">
              &gt;90% under exam timer
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-muted/20 border text-center space-y-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Gaps Under Review
            </span>
            <span className="text-3xl font-black text-amber-500">
              {SAMPLE_PARENT_REPORT.activeGapsUnderRevision.length}
            </span>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block">
              Spaced retests set
            </span>
          </div>
        </div>

        {/* Mastered Skills vs Active Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mastered */}
          <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
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
          <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-3">
            <h4 className="font-extrabold text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Gaps Under Active Remedial Revision
            </h4>
            <div className="space-y-2.5 text-xs">
              {SAMPLE_PARENT_REPORT.activeGapsUnderRevision.map((gap) => (
                <div key={gap.skill} className="p-3 rounded-xl bg-background border space-y-1">
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
            &ldquo;{SAMPLE_PARENT_REPORT.mentorNote}&rdquo;
          </p>

          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-foreground flex items-start gap-2.5">
            <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-primary block text-xs">Recommended Family Conversation:</strong>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {SAMPLE_PARENT_REPORT.parentDiscussionPrompt}
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
