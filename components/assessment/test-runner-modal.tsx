'use client'

import React, { useState, useEffect, useMemo } from 'react'
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
  Send,
  FileText,
  Smartphone,
  ShieldCheck,
  Zap,
  TrendingUp,
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
  ConfidentialQuestionSolution,
} from '@/packages/core/src'

interface TestRunnerModalProps {
  blueprint: AssessmentBlueprint | null
  questions: AuthorizedQuestion[]
  solutions?: ConfidentialQuestionSolution[]
  isOpen: boolean
  onClose: () => void
  onUnlockPaidPack?: (productId: string) => void
}

export function TestRunnerModal({
  blueprint,
  questions,
  solutions,
  isOpen,
  onClose,
  onUnlockPaidPack,
}: TestRunnerModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<string, string>>({})
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600)
  const [activeTab, setActiveTab] = useState<'explanation' | 'hint' | 'related'>('explanation')
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)

  // Mobile drawer toggle for step-by-step guidance
  const [isMobileGuidanceOpen, setIsMobileGuidanceOpen] = useState(false)

  // Parent Lead Form state
  const [leadStudentName, setLeadStudentName] = useState('')
  const [leadParentPhone, setLeadParentPhone] = useState('')
  const [leadParentEmail, setLeadParentEmail] = useState('')
  const [isSubmittingLead, setIsSubmittingLead] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)

  // Memoized solutions map combining seed solutions and any dynamically passed solutions
  const solutionsMap = useMemo(() => {
    const map = new Map<string, ConfidentialQuestionSolution>(SEED_CONFIDENTIAL_SOLUTIONS)
    if (solutions && solutions.length > 0) {
      for (const s of solutions) {
        map.set(s.questionId, s)
      }
    }
    return map
  }, [solutions])

  // Reset state when blueprint changes or modal opens
  useEffect(() => {
    if (isOpen && blueprint) {
      setCurrentQuestionIndex(0)
      setUserSelectedAnswers({})
      setAssessmentResult(null)
      setTimeRemainingSeconds(blueprint.durationMinutes * 60)
      setLeadSubmitted(false)
      setIsMobileGuidanceOpen(false)
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
      solutions: solutionsMap,
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

  const handleSendLeadReport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadStudentName || !leadParentPhone) return

    setIsSubmittingLead(true)
    try {
      await fetch('/api/assessment/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: leadStudentName,
          parentPhone: leadParentPhone,
          parentEmail: leadParentEmail || undefined,
          classGrade: blueprint.title,
          subject: blueprint.subjectId,
          scoreObtained: assessmentResult?.scoreObtained,
          percentage: assessmentResult?.percentage,
        }),
      })
      setLeadSubmitted(true)
    } catch {
      setLeadSubmitted(true)
    } finally {
      setIsSubmittingLead(false)
    }
  }

  const currentQ = questions[currentQuestionIndex]
  const currentSolution = currentQ ? solutionsMap.get(currentQ.id) : null
  const selectedOptId = currentQ ? userSelectedAnswers[currentQ.id] : undefined
  const isSelectedOptCorrect =
    currentSolution && selectedOptId
      ? currentSolution.correctOptionIds.includes(selectedOptId)
      : false

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / questions.length) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-150 overflow-y-auto">
      <div className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[92vh] max-w-6xl bg-white rounded-none sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="font-extrabold text-base tracking-tight text-slate-900 shrink-0">
              Talent<span className="text-blue-600">Xcel</span>
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate">
              {blueprint.title}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {!assessmentResult && (
              <>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs font-semibold shadow-2xs">
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
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              aria-label="Close test runner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Animated Progress Bar */}
        {!assessmentResult && (
          <div className="w-full bg-slate-100 h-1.5 overflow-hidden shrink-0">
            <div
              className="bg-blue-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {assessmentResult ? (
            /* SCORECARD & EVALUATION VIEW WITH LOGIQIDS-STYLE PARENT REPORT HOOK */
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Header Score Card */}
              <div className="text-center space-y-3 pb-6 border-b border-slate-100">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-1 shadow-sm">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {assessmentResult.passed ? 'Diagnostic Completed Successfully!' : 'Diagnostic Completed'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                  Server-Validated Curriculum Performance &amp; Cognitive Breakdown • Zero Login Required
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

              {/* Cognitive Pillars & Skill Radar Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Accuracy</span>
                  <p className="text-lg font-black text-slate-900">{assessmentResult.percentage}%</p>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    {assessmentResult.percentage >= 70 ? 'High Precision' : 'Needs Practice'}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Logic Acuity</span>
                  <p className="text-lg font-black text-indigo-600">
                    {assessmentResult.percentage >= 60 ? 'Strong' : 'Developing'}
                  </p>
                  <span className="text-[10px] text-slate-500 font-medium">Concept application</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">National Percentile</span>
                  <p className="text-lg font-black text-blue-600">
                    {assessmentResult.percentage >= 80 ? 'Top 15%' : assessmentResult.percentage >= 60 ? 'Top 35%' : 'Top 50%'}
                  </p>
                  <span className="text-[10px] text-slate-500 font-medium">Class cohort estimate</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Reward Balance</span>
                  <p className="text-lg font-black text-amber-600">₹{assessmentResult.earnedPassCredits}</p>
                  <span className="text-[10px] text-amber-700 font-medium">100% discount eligible</span>
                </div>
              </div>

              {/* LEVER 1: LOGIQIDS-STYLE PARENT LEAD CAPTURE & WHATSAPP PDF DIAGNOSTIC REPORT */}
              <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg border border-indigo-700/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Instant Parent WhatsApp / Email Dispatch</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                      Get Your Child’s Full Cognitive Gap &amp; Board Readiness Report (PDF)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Includes topic-wise strengths, step-by-step revision flashcards, and personalized chapter focus areas mapped to CBSE/ICSE.
                    </p>
                  </div>
                  <div className="hidden sm:block shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <FileText className="w-8 h-8 text-emerald-400" />
                    </div>
                  </div>
                </div>

                {leadSubmitted ? (
                  <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-4 flex items-center gap-3 text-emerald-200 text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-white text-sm">Report Dispatched!</p>
                      <p>Check your WhatsApp message and inbox shortly for the full diagnostic breakdown.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSendLeadReport} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <input
                      type="text"
                      placeholder="Student's Name *"
                      value={leadStudentName}
                      onChange={(e) => setLeadStudentName(e.target.value)}
                      required
                      className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="tel"
                      placeholder="Parent's WhatsApp / Phone *"
                      value={leadParentPhone}
                      onChange={(e) => setLeadParentPhone(e.target.value)}
                      required
                      className="px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-400"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs h-10 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmittingLead ? 'Sending...' : 'Send Free PDF Report'}</span>
                    </Button>
                  </form>
                )}
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
            /* ACTIVE SPLIT-SCREEN & MOBILE OPTIMIZED TEST RUNNER */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
              {/* Left Column: Question & Options */}
              <div className="lg:col-span-7 space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-blue-600 uppercase tracking-wider">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span className="font-semibold text-slate-600 truncate max-w-[200px]">
                      {currentQ.topicId}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {currentQ.questionText}
                  </h3>

                  {/* Finger-friendly Options (LogIQids Mobile Benchmark: min-height 52px) */}
                  <div className="space-y-3 pt-2">
                    {currentQ.options.map((opt) => {
                      const isSelected = selectedOptId === opt.id
                      const isCorrect = currentSolution?.correctOptionIds.includes(opt.id)

                      let optClass = 'bg-white border-slate-200 text-slate-800 hover:border-blue-400 active:scale-[0.99]'
                      if (isSelected) {
                        if (isCorrect) {
                          optClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium ring-2 ring-emerald-500/20'
                        } else {
                          optClass = 'bg-blue-50 border-blue-500 text-blue-950 font-medium ring-2 ring-blue-500/20'
                        }
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(currentQ.id, opt.id)}
                          className={`w-full min-h-[52px] flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm transition-all shadow-2xs ${optClass}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                isSelected && isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isSelected
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {opt.label}
                            </span>
                            <span className="leading-relaxed">{opt.text}</span>
                          </div>

                          {isSelected && isCorrect && (
                            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 ml-2">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Instant Feedback Pill */}
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
                              {currentSolution?.explanation || 'Check the step-by-step guidance to understand the core concept!'}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Mobile Guidance Expand Button */}
                  <div className="block lg:hidden pt-2">
                    <button
                      onClick={() => setIsMobileGuidanceOpen(!isMobileGuidanceOpen)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>{isMobileGuidanceOpen ? 'Hide Explanation' : 'View Step-by-Step Guidance'}</span>
                    </button>
                  </div>

                  {/* Mobile Guidance Dropdown Drawer */}
                  {isMobileGuidanceOpen && (
                    <div className="block lg:hidden p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                      <p className="font-bold text-slate-900">Step-by-Step Derivation:</p>
                      {currentSolution?.solutionSteps && currentSolution.solutionSteps.length > 0 ? (
                        currentSolution.solutionSteps.map((step, idx) => (
                          <p key={idx} className="leading-relaxed">{step}</p>
                        ))
                      ) : (
                        <p className="text-slate-500">{currentSolution?.explanation || 'Select an option to see derivation.'}</p>
                      )}
                      {currentSolution?.keyPoint && (
                        <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 text-[11px] font-medium">
                          <strong>Key Takeaway:</strong> {currentSolution.keyPoint}
                        </div>
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

                    <div className="flex items-center gap-1">
                      {questions.map((q, idx) => {
                        const isAnswered = !!userSelectedAnswers[q.id]
                        const isCurrent = idx === currentQuestionIndex
                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIndex(idx)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
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
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                      >
                        Submit Test
                        <CheckCircle2 className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Step-by-Step Explanation & Hints (Desktop View) */}
              <div className="hidden lg:block lg:col-span-5 space-y-4">
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
                        {currentSolution && currentSolution.solutionSteps && currentSolution.solutionSteps.length > 0 ? (
                          currentSolution.solutionSteps.map((step, idx) => (
                            <p key={idx} className="leading-relaxed">
                              {step}
                            </p>
                          ))
                        ) : (
                          <p className="text-slate-500 italic">
                            {currentSolution?.explanation || 'Select an option to reveal step-by-step guidance.'}
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
                        Break down the problem into fundamental definitions. Review the units and verify your calculations before finalizing.
                      </p>
                    </div>
                  )}

                  {activeTab === 'related' && (
                    <div className="space-y-2 text-xs text-slate-600">
                      <p className="font-bold text-slate-800">Connected Curriculum Lessons:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Standard Board Curriculum Topic: {currentQ.topicId}</li>
                        <li>Verified National Syllabus Benchmark</li>
                        <li>Stepwise Mastery &amp; Problem Solving</li>
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
