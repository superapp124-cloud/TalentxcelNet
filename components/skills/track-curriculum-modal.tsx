'use client'

import React from 'react'
import {
  Layers,
  Sparkles,
  X,
  CheckCircle2,
  Calendar,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Code,
  Wrench,
  Clock,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ClassSkillTrackMeta } from '@/packages/core/src'

interface TrackCurriculumModalProps {
  track: ClassSkillTrackMeta | null
  isOpen: boolean
  onClose: () => void
  onOpenWorkshop?: (projectId: string) => void
  onEnrollTrack?: (productId: string) => void
}

export function TrackCurriculumModal({
  track,
  isOpen,
  onClose,
  onOpenWorkshop,
  onEnrollTrack,
}: TrackCurriculumModalProps) {
  if (!isOpen || !track) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                  Class {track.classNumber} Track
                </Badge>
                <Badge variant="outline" className="text-[10px] font-semibold text-slate-600 capitalize">
                  {track.level} Level
                </Badge>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight mt-0.5">
                {track.classSpecificTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Track Summary & Pedagogical Philosophy */}
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {track.description}
            </p>

            {/* Eastern Pedagogical Heritage (Japanese / Chinese Discipline & Daily Drill) */}
            {track.easternHeritage && (
              <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-indigo-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-3 text-xs shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {track.easternHeritage.tradition === 'japanese'
                        ? '🇯🇵'
                        : track.easternHeritage.tradition === 'chinese'
                        ? '🇨🇳'
                        : '🌏'}
                    </span>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-900 block">
                        {track.easternHeritage.tradition === 'japanese'
                          ? 'Japanese Mastery Discipline'
                          : track.easternHeritage.tradition === 'chinese'
                          ? 'Chinese Rigorous Progression'
                          : 'Pan-Asian Youth Mastery'}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {track.easternHeritage.originalName}
                      </span>
                    </div>
                  </div>

                  <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-[10px] font-bold">
                    Classes 4–9 Focus
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      Core Craft Discipline
                    </span>
                    <p className="text-xs text-slate-700 leading-snug">
                      {track.easternHeritage.keyDiscipline}
                    </p>
                  </div>

                  <div className="space-y-1 bg-white/80 border border-amber-200 rounded-xl p-2.5">
                    <div className="flex items-center gap-1.5 text-amber-950 font-bold text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Daily 15-Minute Deliberate Drill</span>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-snug">
                      {track.easternHeritage.dailyDeliberateDrill}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 italic pt-0.5 border-t border-amber-200/40">
                  Target: {track.easternHeritage.gradeTargetNote}
                </div>
              </div>
            )}

            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3.5 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  {track.philosophy === 'japanese_kaizen'
                    ? 'Japanese Kaizen Craft Philosophy'
                    : track.philosophy === 'chinese_progression'
                    ? 'Chinese Structured Rigorous Progression'
                    : 'Universal Deliberate Practice Standard'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                {track.philosophyNote}
              </p>
            </div>
          </div>

          {/* Tools & Environments Used */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5 text-indigo-600" />
              <span>Tools &amp; Environments Practiced</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {track.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Key Learning Outcomes */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Class {track.classNumber} Mastery Outcomes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {track.learningOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Module Progression */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Weekly Step-by-Step Curriculum Roadmap
              </h4>
              <span className="text-[11px] text-slate-500 font-semibold">
                {track.weeklyModules.length} Modules
              </span>
            </div>

            <div className="space-y-2.5">
              {track.weeklyModules.map((mod) => (
                <div
                  key={mod.weekNumber}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                        Week {mod.weekNumber}
                      </span>
                      <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                        {mod.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-500">{mod.objective}</p>
                  </div>

                  <div className="shrink-0 text-left sm:text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      Weekly Deliverable
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      {mod.deliverable}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Capstone Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-blue-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-800 text-[10px] font-bold text-indigo-200">
                <Briefcase className="w-3 h-3 text-indigo-300" />
                <span>Capstone Project</span>
              </div>
              <span className="text-xs font-bold text-indigo-200">
                {track.capstoneProject.estimatedHours} Hours Required
              </span>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white">
                {track.capstoneProject.title}
              </h4>
              <p className="text-xs text-indigo-200 mt-1 leading-relaxed">
                {track.capstoneProject.brief}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-indigo-800/80">
              <span className="text-[11px] text-indigo-300">
                Evaluated against {track.capstoneProject.rubricCriteria.length} mastery rubrics
              </span>
              <Button
                onClick={() => {
                  onClose()
                  if (onOpenWorkshop) onOpenWorkshop(track.capstoneProject.id)
                }}
                size="sm"
                className="bg-white hover:bg-slate-100 text-indigo-950 font-bold text-xs h-8 px-4 rounded-xl shrink-0 flex items-center gap-1.5"
              >
                <span>Launch Capstone Workshop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Enrolment starts from <span className="font-bold text-slate-900">₹999/month</span> (cancel anytime).
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={onClose}
              variant="outline"
              size="sm"
              className="text-xs font-semibold text-slate-700 border-slate-300 hover:bg-slate-100 h-8.5 rounded-xl"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                onClose()
                if (onEnrollTrack) onEnrollTrack('prod_skill_monthly_999')
              }}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-8.5 px-4 rounded-xl flex items-center gap-1.5 shadow-xs"
            >
              <span>Enroll in Class {track.classNumber} Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
