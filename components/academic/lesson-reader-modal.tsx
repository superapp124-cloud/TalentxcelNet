'use client'

import React from 'react'
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  Target,
  ArrowRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { AcademicLesson } from '@/packages/core/src'

interface LessonReaderModalProps {
  lesson: AcademicLesson | null
  isOpen: boolean
  onClose: () => void
  onLaunchPractice?: () => void
}

export function LessonReaderModal({
  lesson,
  isOpen,
  onClose,
  onLaunchPractice,
}: LessonReaderModalProps) {
  if (!isOpen || !lesson) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Academic Curriculum Lesson Reader
              </h3>
              <p className="text-xs text-slate-500">
                CBSE &amp; Board-Aligned Concept Breakdown
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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-xs">
                Lesson {lesson.lessonNumber}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{lesson.readingTimeMinutes} Minutes Read</span>
              </div>
              <Badge variant="outline" className="text-xs text-emerald-700 border-emerald-200 bg-emerald-50">
                Verified Syllabus Mapping
              </Badge>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{lesson.title}</h2>
          </div>

          {/* Concept Breakdown */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Core Concept Breakdown
            </h4>
            <div className="space-y-3">
              {lesson.conceptBreakdown.map((sec, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <h5 className="font-bold text-sm text-slate-900">{sec.heading}</h5>
                  <p className="text-xs text-slate-700 leading-relaxed">{sec.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Worked Mathematical / Scientific Examples */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Step-by-Step Worked Examples
            </h4>
            <div className="space-y-3">
              {lesson.workedExamples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2.5">
                  <p className="font-bold text-xs text-slate-900">Problem {idx + 1}: {ex.problemText}</p>
                  <div className="pl-3 border-l-2 border-emerald-400 space-y-1 text-xs text-slate-700">
                    {ex.stepByStepSolution.map((s, si) => (
                      <p key={si}>{s}</p>
                    ))}
                  </div>
                  <p className="font-semibold text-xs text-emerald-950 pt-1">
                    ✓ Final Answer: {ex.finalAnswer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Revision Notes */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Quick Revision &amp; Rules
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {lesson.revisionNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connected Assessment Call-to-Action */}
          {lesson.linkedBlueprintId && (
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">Check Your Understanding:</span> Take the 5-question chapter diagnostic test to verify your learning.
              </div>

              <Button
                onClick={() => {
                  onClose()
                  onLaunchPractice?.()
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 shadow-xs shrink-0"
              >
                <Target className="w-4 h-4 mr-1.5" />
                Launch Chapter Diagnostic Test →
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
