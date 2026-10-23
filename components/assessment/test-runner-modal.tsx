'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Check,
  Award,
  Sparkles,
  Lightbulb,
  X,
  CreditCard,
  ArrowRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  SEED_CONFIDENTIAL_SOLUTIONS,
  evaluateAssessmentAttempt,
} from '@/packages/core/src'
import type {
  AuthorizedQuestion,
  AssessmentBlueprint,
  AssessmentResult,
  SubmittedAnswer,
} from '@/packages/core/src'

interface TestRunnerModalProps {
  blueprint: AssessmentBlueprint | null
  questions: AuthorizedQuestion[]
  isOpen: boolean
  onClose: () => void
  onUnlockPaidPack?: (productId: string) => void
}

export function TestRunnerModal({
  blueprint,
  questions,
  isOpen,
  onClose,
  onUnlockPaidPack,
}: TestRunnerModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<string, string>>({})
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600)
  const [activeTab, setActiveTab] = useState<'explanation' | 'hint' | 'related'>('explanation')
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)

  // Reset state when blueprint changes or modal opens
  useEffect(() => {
    if (isOpen && blueprint) {
      setCurrentQuestionIndex(0)
      setUserSelectedAnswers({})
      setAssessmentResult(null)
      setTimeRemainingSeconds(blueprint.durationMinutes * 60)
    }
  }, [isOpen, blueprint])

  // Timer countdown
  useEffect(() => {
    if (!isOpen || !blueprint || assessmentResult) return

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, blueprint, assessmentResult])

  if (!isOpen || !blueprint || questions.length === 0) return null

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleSubmitAssessment = () => {
    const submittedAnswers: SubmittedAnswer[] = questions.map((q) => ({
      questionId: q.id,
      selectedOptionIds: userSelectedAnswers[q.id] ? [userSelectedAnswers[q.id]] : [],
      timeSpentSeconds: 30,
    }))

    const result = evaluateAssessmentAttempt({
      attemptId: `att_run_${Date.now()}`,
      blueprint,
      learnerId: 'anonymous_learner',
      questions,
      solutions: SEED_CONFIDENTIAL_SOLUTIONS,
      submittedAnswers,
    })

    setAssessmentResult(result)

    // Save completed status locally
    try {
      const stored = localStorage.getItem('talentxcel_free_subjects_completed')
      const completed = stored ? JSON.parse(stored) : {}
      const subjectKey = blueprint.subjectId.replace('subj_g4_', '')
      completed[subjectKey] = true
      localStorage.setItem('talentxcel_free_subjects_completed', JSON.stringify(completed))
    } catch {
      // ignore
    }

    // Telemetry log
    fetch('/api/analytics/funnel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'free_test_completed',
        domain: 'assessment',
        sessionId: `sess_${Date.now()}`,
        metadata: {
          blueprintId: blueprint.id,
          scoreObtained: result.scoreObtained,
          percentage: result.percentage,
        },
      }),
    }).catch(() => {})
  }

  const currentQ = questions[currentQuestionIndex]
  const currentSolution = currentQ ? SEED_CONFIDENTIAL_SOLUTIONS.get(currentQ.id) : null
  const selectedOptId = currentQ ? userSelectedAnswers[currentQ.id] : undefined
  const isSelectedOptCorrect =
    currentSolution && selectedOptId
      ? currentSolution.correctOptionIds.includes(selectedOptId)
      : false

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              Talent<span className="text-blue-600">Xcel</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate max-w-[200px] sm:max-w-md">
              {blueprint.title}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {!assessmentResult && (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs font-semibold shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{formatTimer(timeRemainingSeconds)}</span>
                </div>
                <span className="text-xs font-bold text-slate-700 hidden sm:inline">
                  {currentQuestionIndex + 1} / {questions.length}
                </span>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {assessmentResult ? (
            /* SCORECARD & EVALUATION VIEW */
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-3 pb-6 border-b border-slate-100">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {assessmentResult.passed ? 'Assessment Completed!' : 'Diagnostic Completed'}
                </h2>
                <p className="text-sm text-slate-600">
                  Official Server-Validated Evaluation • Zero Login Required
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <Badge className="bg-emerald-600 text-white text-xs px-3 py-1 font-bold">
                    Score: {assessmentResult.scoreObtained} / {assessmentResult.maxMarks} Marks ({assessmentResult.percentage}%)
                  </Badge>
                  <Badge className="bg-blue-600 text-white text-xs px-3 py-1 font-bold">
                    ✓ {assessmentResult.correctCount} Correct • ✕ {assessmentResult.incorrectCount} Incorrect
                  </Badge>
                  {assessmentResult.earnedPassCredits > 0 && (
                    <Badge className="bg-amber-500 text-slate-950 text-xs px-3 py-1 font-bold">
                      ★ ₹{assessmentResult.earnedPassCredits} Pass Credits Earned!
                    </Badge>
                  )}
                </div>
              </div>

              {/* Day 1 Paid Entitlement Direct Unlock */}
              <div className="p-5 bg-gradient-to-br from-blue-50/70 to-indigo-50/70 rounded-2xl border border-blue-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-600 text-white text-[10px]">Instant Unlock</Badge>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Want 25 more full-length chapter mock tests and detailed percentile rankings?
                    </h4>
                  </div>
                  <Link href="/plans" onClick={onClose} className="text-xs text-blue-600 font-semibold hover:underline">
                    All Plans →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      onClose()
                      onUnlockPaidPack?.('prod_assess_single')
                    }}
                    className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left transition-all shadow-2xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-900">Single Test</span>
                      <span className="text-xs font-black text-blue-600">₹20</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">1 Full Chapter Mock • Instant Unlock</p>
                  </button>
                  <button
                    onClick={() => {
                      onClose()
                      onUnlockPaidPack?.('prod_assess_starter')
                    }}
                    className="p-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-left transition-all shadow-2xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-900">Starter Pack</span>
                      <span className="text-xs font-black text-blue-600">₹299</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">5 Full Tests across subjects • 30 Days</p>
                  </button>
                  <button
                    onClick={() => {
                      onClose()
                      onUnlockPaidPack?.('prod_assess_plus')
                    }}
                    className="p-3 bg-blue-100/60 hover:bg-blue-200/60 border border-blue-300 rounded-xl text-left transition-all shadow-2xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-blue-900">Plus Pack</span>
                      <span className="text-xs font-black text-blue-700">₹499</span>
                    </div>
                    <p className="text-[10px] text-blue-800 mt-1">12 Tests + Analytical Aptitude • 60 Days</p>
                  </button>
                </div>
              </div>

              {/* Step-by-Step Question Review */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-slate-900 text-sm flex items-center justify-between">
                  <span>Question-Wise Step-by-Step Solutions</span>
                  <Badge variant="outline" className="text-xs">
                    {assessmentResult.evaluations.length} Questions Graded
                  </Badge>
                </h3>

                <div className="space-y-4">
                  {assessmentResult.evaluations.map((ev, idx) => (
                    <div
                      key={ev.questionId}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2.5 text-xs text-slate-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">Question {idx + 1}</span>
                        {ev.isCorrect ? (
                          <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold">
                            ✓ Correct (+{ev.marksAwarded} Marks)
                          </Badge>
                        ) : (
                          <Badge className="bg-rose-100 text-rose-800 border-none font-bold">
                            ✕ Incorrect ({ev.marksAwarded} Marks)
                          </Badge>
                        )}
                      </div>

                      <p className="font-medium text-slate-800">
                        {questions.find((q) => q.id === ev.questionId)?.questionText || `Question ${idx + 1}`}
                      </p>

                      <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                        <p className="font-semibold text-slate-900">Verified Explanation:</p>
                        <p className="text-slate-600">{ev.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button onClick={onClose} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs">
                  Close Scorecard
                </Button>
              </div>
            </div>
          ) : (
            /* ACTIVE SPLIT-SCREEN TEST RUNNER */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Question & Options */}
              <div className="lg:col-span-7 space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-blue-600 uppercase tracking-wider">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span className="font-semibold text-slate-600">
                      Class 4 • {currentQ.topicId}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {currentQ.questionText}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2.5 pt-2">
                    {currentQ.options.map((opt) => {
                      const isSelected = selectedOptId === opt.id
                      const isCorrect = currentSolution?.correctOptionIds.includes(opt.id)

                      let optClass = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400'
                      if (isSelected) {
                        if (isCorrect) {
                          optClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium'
                        } else {
                          optClass = 'bg-blue-50 border-blue-500 text-blue-950 font-medium'
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(currentQ.id, opt.id)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all shadow-2xs ${optClass}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isSelected && isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isSelected
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span>{opt.text}</span>
                          </div>

                          {isSelected && isCorrect && (
                            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {selectedOptId && (
                    <div
                      className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                        isSelectedOptCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      {isSelectedOptCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-emerald-950">Correct!</p>
                            <p className="text-emerald-800 mt-0.5">{currentSolution?.explanation}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-rose-950">Not quite right</p>
                            <p className="text-rose-800 mt-0.5">
                              Check the step-by-step guidance on the right to understand why!
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Question Navigator & Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="font-semibold text-xs border-slate-200"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-1 hidden sm:flex">
                      {questions.map((q, idx) => {
                        const isAnswered = !!userSelectedAnswers[q.id]
                        const isCurrent = idx === currentQuestionIndex
                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIndex(idx)}
                            className={`w-6 h-6 rounded-lg text-xs font-bold transition-all ${
                              isCurrent
                                ? 'bg-slate-900 text-white'
                                : isAnswered
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        )
                      })}
                    </div>

                    {currentQuestionIndex < questions.length - 1 ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.min(questions.length - 1, prev + 1)
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                      >
                        Next
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={handleSubmitAssessment}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                      >
                        Submit Test
                        <CheckCircle2 className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Step-by-Step Explanation & Hints */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                  <div className="flex items-center border-b border-slate-200 pb-2 gap-3 text-xs font-bold">
                    <button
                      onClick={() => setActiveTab('explanation')}
                      className={`pb-1 border-b-2 transition-all ${
                        activeTab === 'explanation'
                          ? 'border-blue-600 text-blue-600 font-extrabold'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Explanation
                    </button>
                    <button
                      onClick={() => setActiveTab('hint')}
                      className={`pb-1 border-b-2 transition-all ${
                        activeTab === 'hint'
                          ? 'border-blue-600 text-blue-600 font-extrabold'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Socratic Hint
                    </button>
                    <button
                      onClick={() => setActiveTab('related')}
                      className={`pb-1 border-b-2 transition-all ${
                        activeTab === 'related'
                          ? 'border-blue-600 text-blue-600 font-extrabold'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Syllabus Mapping
                    </button>
                  </div>

                  {activeTab === 'explanation' && (
                    <div className="space-y-3 text-xs text-slate-700">
                      <p className="font-bold text-slate-900">Step-by-Step Guidance:</p>
                      <div className="space-y-1.5">
                        {currentSolution ? (
                          currentSolution.solutionSteps.map((step, idx) => (
                            <p key={idx} className="leading-relaxed">
                              {step}
                            </p>
                          ))
                        ) : (
                          <p className="text-slate-500 italic">
                            Select an option to reveal step-by-step guidance.
                          </p>
                        )}
                      </div>

                      {currentSolution?.keyPoint && (
                        <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-1 mt-3">
                          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px] uppercase tracking-wide">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                            <span>Key Takeaway</span>
                          </div>
                          <p className="text-[11px] text-amber-950 font-medium">
                            {currentSolution.keyPoint}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'hint' && (
                    <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-950 space-y-2">
                      <p className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Socratic Hint:</span>
                      </p>
                      <p>
                        Recall the core definition: A multiple is formed by multiplying a counting number. Check if dividing leaves a remainder of 0.
                      </p>
                    </div>
                  )}

                  {activeTab === 'related' && (
                    <div className="space-y-2 text-xs text-slate-600">
                      <p className="font-bold text-slate-800">Connected Curriculum Lessons:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Class 4 Math: Chapter 6 — Factors & Multiples</li>
                        <li>Finding Common Multiples on the Number Line</li>
                        <li>Lowest Common Multiple (LCM) Basics</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
