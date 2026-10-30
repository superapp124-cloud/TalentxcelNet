'use client'

import React from 'react'
import Link from 'next/link'
import {
  Activity,
  ArrowRight,
  Sparkles,
  Target,
  BookOpen,
  Cpu,
  X,
  CheckCircle2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SEED_LEARNER_TRI_DOMAIN_PROGRESS } from '@/packages/core/src/data/seed-catalog'

interface GrowthPlanModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenLesson?: (lessonId: string) => void
  onOpenProject?: (projectId: string) => void
}

export function GrowthPlanModal({
  isOpen,
  onClose,
  onOpenLesson,
  onOpenProject,
}: GrowthPlanModalProps) {
  if (!isOpen) return null

  const progress = SEED_LEARNER_TRI_DOMAIN_PROGRESS

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Personalised Tri-Domain Growth Plan
              </h3>
              <p className="text-xs text-slate-500">
                Closed-Loop Kaizen Intelligence • Learner: {progress.learnerName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Tri-Domain Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                1. Assessment Metric
              </span>
              <p className="text-xl font-black text-slate-900">
                {progress.assessmentStats.accuracyPercentage}% Accuracy
              </p>
              <p className="text-[11px] text-slate-500">
                {progress.assessmentStats.totalAttempted} Tests Attempted • {progress.assessmentStats.weakTopicsCount} Gap Topics
              </p>
            </div>

            <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                2. Academic Coverage
              </span>
              <p className="text-xl font-black text-slate-900">
                {progress.academicStats.lessonsCompleted} Lessons Done
              </p>
              <p className="text-[11px] text-slate-500">
                {progress.academicStats.chaptersCovered} Chapters • {progress.academicStats.revisionReadyCount} Ready for Revision
              </p>
            </div>

            <div className="p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide">
                3. Skill Competencies
              </span>
              <p className="text-xl font-black text-slate-900">
                {progress.skillStats.projectsCompleted} Projects Built
              </p>
              <p className="text-[11px] text-slate-500">
                {progress.skillStats.competenciesMastered} Competencies Mastered
              </p>
            </div>
          </div>

          {/* Closed-Loop Recommendations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Personalised Kaizen Learning Recommendations
              </h4>
            </div>

            <div className="space-y-4">
              {progress.growthRecommendations.map((rec, i) => (
                <div key={rec.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Recommendation {i + 1}</span>
                    <Badge variant="outline" className="text-[10px] text-amber-700 border-amber-200 bg-amber-50 font-bold">
                      Identified Diagnostic Gap
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-700 font-medium">{rec.gapDescription}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Academic Step */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">
                          Academic Study Step
                        </span>
                        <p className="text-xs font-bold text-slate-900 mt-0.5">{rec.recommendedLessonTitle}</p>
                      </div>
                      <Link href="/academic" onClick={onClose}>
                        <Button size="sm" variant="outline" className="w-full text-[11px] font-bold text-emerald-700 border-emerald-200 hover:bg-emerald-50 h-7.5">
                          Read Lesson →
                        </Button>
                      </Link>
                    </div>

                    {/* Skill Project Step */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-700 uppercase">
                          Applied Skill Project
                        </span>
                        <p className="text-xs font-bold text-slate-900 mt-0.5">{rec.recommendedProjectTitle}</p>
                      </div>
                      <Link href="/skills" onClick={onClose}>
                        <Button size="sm" variant="outline" className="w-full text-[11px] font-bold text-indigo-700 border-indigo-200 hover:bg-indigo-50 h-7.5">
                          Build Project →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <Button onClick={onClose} variant="outline" className="text-xs font-semibold">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
