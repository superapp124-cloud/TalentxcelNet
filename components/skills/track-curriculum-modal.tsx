'use client'

import React, { useState } from 'react'
import {
  Layers,
  Sparkles,
  X,
  CheckCircle2,
  Calendar,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Check,
  HelpCircle,
  AlertCircle,
  Lightbulb,
  Heart,
  Clock,
  Compass,
  FileCheck,
  BookOpen,
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
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false)

  if (!isOpen || !track) return null

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId)
    setHasCheckedAnswer(true)
  }

  const isCorrect = selectedOptionId === track.assessment.correctOptionId

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                  Class {track.classNumber} Life Skill
                </Badge>
                <Badge variant="outline" className="text-[10px] font-semibold text-slate-600">
                  {track.lifeSkillStageLabel || track.stageLabel}
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
          {/* Section 1: Overview & Why It Matters */}
          <div className="space-y-3">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {track.description}
            </p>

            <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 space-y-1.5 text-xs shadow-2xs">
              <div className="flex items-center gap-2 font-bold text-blue-950">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-extrabold text-blue-900">
                  Why This Skill Matters in Real Life
                </span>
              </div>
              <p className="text-xs text-blue-900 leading-relaxed font-medium">
                {track.whyItMatters}
              </p>
            </div>
          </div>

          {/* Section 2: Relatable Real-Life Scenario */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="uppercase tracking-wider text-[11px] font-extrabold text-slate-800">
                Real-Life Everyday Scenario
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200/60">
              "{track.realLifeScenario}"
            </p>
          </div>

          {/* Section 3: Guided Worked Example */}
          <div className="space-y-3 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Guided Worked Example: {track.workedExample.title}</span>
            </div>

            <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
              <span className="font-bold text-slate-800">Situation: </span>
              {track.workedExample.scenario}
            </p>

            <div className="space-y-2">
              {track.workedExample.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800 shadow-2xs"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-medium">
              <span className="font-bold text-emerald-900">Key Takeaway: </span>
              {track.workedExample.takeaway}
            </div>
          </div>

          {/* Section 4: Safe Practical Activity */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <FileCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-extrabold">
                  Practical Activity: {track.practicalActivity.title}
                </span>
              </div>
              <Badge className="bg-amber-200/80 text-amber-900 text-[10px] font-bold">
                Safe Home Practice
              </Badge>
            </div>

            <ul className="space-y-1.5 text-xs text-amber-950">
              {track.practicalActivity.instructions.map((inst, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>

            <div className="p-2.5 bg-white/80 border border-amber-200 rounded-xl space-y-1">
              <p className="text-[11px] text-amber-900 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Safety Guideline: {track.practicalActivity.safeCheckNote}</span>
              </p>
              <p className="text-[11px] text-slate-600">
                <span className="font-semibold text-slate-800">Deliverable: </span>
                {track.practicalActivity.deliverableDescription}
              </p>
            </div>
          </div>

          {/* Section 5: Reflection Exercise */}
          <div className="p-4 bg-purple-50/60 border border-purple-200/80 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-purple-950">
              <Heart className="w-4 h-4 text-purple-700 shrink-0" />
              <span className="uppercase tracking-wider text-[11px] font-extrabold">
                Reflection &amp; Decision-Making Exercise
              </span>
            </div>
            <p className="text-xs font-bold text-purple-900">
              {track.reflectionExercise.promptQuestion}
            </p>
            <ul className="space-y-1 text-slate-600">
              {track.reflectionExercise.guidingPoints.map((gp, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{gp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Interactive Scenario Assessment */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                <span className="uppercase tracking-wider text-[11px] font-extrabold">
                  Real-Life Decision Assessment
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                Validated Scenario
              </span>
            </div>

            <p className="text-xs text-slate-700 font-semibold bg-white p-2.5 rounded-xl border border-slate-200">
              {track.assessment.question}
            </p>

            <div className="space-y-2">
              {track.assessment.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id
                let btnStyle = 'bg-white border-slate-200 hover:border-indigo-300 text-slate-800'
                if (hasCheckedAnswer) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-300 text-rose-950 font-semibold'
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-indigo-50 border-indigo-400 text-indigo-950 font-semibold'
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 shadow-2xs ${btnStyle}`}
                  >
                    <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      {hasCheckedAnswer && opt.isCorrect ? (
                        <Check className="w-3 h-3 text-emerald-600 font-bold" />
                      ) : (
                        opt.id.slice(-1)
                      )}
                    </span>
                    <span className="leading-snug flex-1">{opt.text}</span>
                  </button>
                )
              })}
            </div>

            {hasCheckedAnswer && (
              <div
                className={`p-3 rounded-xl border text-xs space-y-1 animate-in fade-in ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Great decision! That is the recommended response.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Not quite. Let’s look at why:</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed">
                  {track.assessment.reasoningFeedback}
                </p>
              </div>
            )}
          </div>

          {/* Section 7: Weekly Modules Roadmap */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Weekly Step-by-Step Learning Roadmap
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

          {/* Section 8: Capstone Project Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900 to-blue-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-800 text-[10px] font-bold text-indigo-200">
                <Briefcase className="w-3 h-3 text-indigo-300" />
                <span>Real-Life Capstone Project</span>
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
                Evaluated against {track.capstoneProject.rubricCriteria.length} practical rubrics
              </span>
              <Button
                onClick={() => {
                  onClose()
                  if (onOpenWorkshop) onOpenWorkshop(track.capstoneProject.id)
                }}
                size="sm"
                className="bg-white hover:bg-slate-100 text-indigo-950 font-bold text-xs h-8 px-4 rounded-xl shrink-0 flex items-center gap-1.5"
              >
                <span>Launch Practical Workshop</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500">
            Life Skills Pass starts from <span className="font-bold text-slate-900">₹999/month</span> (cancel anytime).
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
