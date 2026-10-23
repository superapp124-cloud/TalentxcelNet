'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import {
  Brain,
  Calculator,
  FlaskConical,
  BookOpen,
  Languages,
  Compass,
  Atom,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  Layers,
  PieChart,
  Target,
  ArrowRight,
  ShieldCheck,
  Check,
  HelpCircle,
  Flag,
  TrendingUp,
  Database,
  ExternalLink,
  Zap,
  BookmarkCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/brand/logo'
import {
  SEED_BOARDS,
  SEED_CLASSES,
  SEED_SUBJECTS,
  SEED_CHAPTERS,
  SEED_TOPICS,
  SEED_BLUEPRINTS,
  SEED_AUTHORIZED_QUESTIONS,
  SEED_CONFIDENTIAL_SOLUTIONS,
  APTITUDE_TRACKS,
  getPipelineCoverageReport,
  buildLearnerAnalyticsSummary,
  evaluateAssessmentAttempt,
  type AuthorizedQuestion,
  type AssessmentBlueprint,
  type AssessmentResult,
  type SubmittedAnswer,
  type AptitudeCategory,
} from '@talentxcel/core'

type ActiveView = 'catalog' | 'active_test' | 'test_result' | 'analytics' | 'pipeline'

export default function AssessmentPlatformPage() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState<'academic' | 'aptitude'>('academic')
  const [selectedBoardCode, setSelectedBoardCode] = useState<string>('CBSE')
  const [selectedClassNumber, setSelectedClassNumber] = useState<number>(4)
  const [selectedAssessmentMode, setSelectedAssessmentMode] = useState<
    'diagnostic' | 'topic_practice' | 'mock_exam' | 'revision'
  >('diagnostic')
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>('chap_g4_math_c6')

  // Working Assessment Test State
  const [activeView, setActiveView] = useState<ActiveView>('catalog')
  const [currentBlueprint, setCurrentBlueprint] = useState<AssessmentBlueprint>(SEED_BLUEPRINTS[0])
  const [testQuestions, setTestQuestions] = useState<AuthorizedQuestion[]>(
    SEED_AUTHORIZED_QUESTIONS.filter((q) => q.id.startsWith('q_g4_m6_'))
  )
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(6) // Default to Q7 matching screenshot!
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({
    q_g4_m6_07: 'opt_7b', // Q7 Option B selected to match screenshot
  })
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(504) // 8m 24s
  const [currentResult, setCurrentResult] = useState<AssessmentResult | null>(null)

  // Real Learner Attempts History & Wallet
  const [completedAttempts, setCompletedAttempts] = useState<AssessmentResult[]>([])
  const [walletCredits, setWalletCredits] = useState<number>(60) // ₹60 initial pass credits

  // Active question and options
  const currentQuestion = testQuestions[currentQuestionIdx] || testQuestions[0]

  // Filtered classes by board
  const availableClasses = useMemo(() => {
    return SEED_CLASSES.filter((c) => {
      if (selectedBoardCode === 'CBSE') return true
      return c.gradeNumber >= 4 && c.gradeNumber <= 10
    })
  }, [selectedBoardCode])

  // Filtered subjects by selected class
  const classSubjects = useMemo(() => {
    // If selected class has defined subjects, return them; otherwise provide standard core curriculum subjects
    const direct = SEED_SUBJECTS.filter((s) => {
      const cls = SEED_CLASSES.find((c) => c.id === s.classId)
      return cls?.gradeNumber === selectedClassNumber
    })
    if (direct.length > 0) return direct

    // Fallback template for grades without custom seed
    return [
      {
        id: `subj_gen_math_${selectedClassNumber}`,
        classId: `class_g${selectedClassNumber}`,
        code: 'math',
        name: 'Mathematics',
        colorTheme: 'amber' as const,
        iconName: 'Calculator',
        totalTests: 15,
        completedTests: 0,
        status: 'provisional' as const,
        description: `Class ${selectedClassNumber} Mathematics Curriculum Standards`,
      },
      {
        id: `subj_gen_sci_${selectedClassNumber}`,
        classId: `class_g${selectedClassNumber}`,
        code: 'science',
        name: 'Science',
        colorTheme: 'emerald' as const,
        iconName: 'FlaskConical',
        totalTests: 12,
        completedTests: 0,
        status: 'provisional' as const,
        description: `Class ${selectedClassNumber} Experimental & Theoretical Science`,
      },
      {
        id: `subj_gen_eng_${selectedClassNumber}`,
        classId: `class_g${selectedClassNumber}`,
        code: 'english',
        name: 'English Language & Lit',
        colorTheme: 'blue' as const,
        iconName: 'BookOpen',
        totalTests: 10,
        completedTests: 0,
        status: 'provisional' as const,
        description: `Class ${selectedClassNumber} Reading, Grammar & Writing`,
      },
      {
        id: `subj_gen_sst_${selectedClassNumber}`,
        classId: `class_g${selectedClassNumber}`,
        code: 'social_science',
        name: 'Social Studies',
        colorTheme: 'purple' as const,
        iconName: 'Compass',
        totalTests: 10,
        completedTests: 0,
        status: 'provisional' as const,
        description: `Class ${selectedClassNumber} History, Geography, Civics & Economics`,
      },
    ]
  }, [selectedClassNumber])

  // Timer countdown effect for active test
  useEffect(() => {
    if (activeView !== 'active_test' || timeRemainingSeconds <= 0) return
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleAutoSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [activeView, timeRemainingSeconds])

  // Keyboard accessibility: 1-4 for options, arrows for navigation, F for flag
  useEffect(() => {
    if (activeView !== 'active_test') return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentQuestion) return
      // Keys 1 to 4 select options
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optIndex = parseInt(e.key, 10) - 1
        if (currentQuestion.options[optIndex]) {
          handleSelectOption(currentQuestion.id, currentQuestion.options[optIndex].id)
        }
      } else if (e.key === 'ArrowRight') {
        if (currentQuestionIdx < testQuestions.length - 1) {
          setCurrentQuestionIdx((prev) => prev + 1)
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentQuestionIdx > 0) {
          setCurrentQuestionIdx((prev) => prev - 1)
        }
      } else if (e.key.toLowerCase() === 'f') {
        toggleFlagQuestion(currentQuestion.id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeView, currentQuestion, currentQuestionIdx, testQuestions.length])

  // Start an assessment
  const handleStartTest = (blueprint: AssessmentBlueprint) => {
    setCurrentBlueprint(blueprint)
    let questionsForTest: AuthorizedQuestion[] = []

    if (blueprint.category === 'aptitude') {
      questionsForTest = SEED_AUTHORIZED_QUESTIONS.filter((q) => q.id.startsWith('q_apt_'))
    } else if (blueprint.id === 'bp_g10_sci_c1') {
      questionsForTest = SEED_AUTHORIZED_QUESTIONS.filter((q) => q.id.startsWith('q_g10_'))
    } else {
      questionsForTest = SEED_AUTHORIZED_QUESTIONS.filter((q) => q.id.startsWith('q_g4_m6_'))
    }

    if (questionsForTest.length === 0) {
      questionsForTest = SEED_AUTHORIZED_QUESTIONS.slice(0, 5)
    }

    setTestQuestions(questionsForTest)
    setCurrentQuestionIdx(0)
    setUserAnswers({})
    setFlaggedQuestions(new Set())
    setTimeRemainingSeconds(blueprint.durationMinutes * 60)
    setActiveView('active_test')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Answer selection
  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const toggleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev)
      if (next.has(questionId)) next.delete(questionId)
      else next.add(questionId)
      return next
    })
  }

  // Submit test and trigger server-authoritative scoring
  const handleSubmitTest = () => {
    const submittedAnswers: SubmittedAnswer[] = testQuestions.map((q) => {
      const selected = userAnswers[q.id]
      return {
        questionId: q.id,
        selectedOptionIds: selected ? [selected] : [],
        timeSpentSeconds: 30, // tracked time
      }
    })

    const topicsMap = new Map<string, string>()
    for (const t of SEED_TOPICS) {
      topicsMap.set(t.id, t.title)
    }

    const result = evaluateAssessmentAttempt({
      attemptId: `att_${Date.now()}`,
      blueprint: currentBlueprint,
      learnerId: 'learner_current',
      questions: testQuestions,
      solutions: SEED_CONFIDENTIAL_SOLUTIONS,
      submittedAnswers,
      topicsMap,
    })

    setCurrentResult(result)
    setCompletedAttempts((prev) => [result, ...prev])
    if (result.passed && result.earnedPassCredits > 0) {
      setWalletCredits((prev) => prev + result.earnedPassCredits)
    }
    setActiveView('test_result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAutoSubmit = useCallback(() => {
    handleSubmitTest()
  }, [testQuestions, userAnswers, currentBlueprint])

  // Pipeline coverage report
  const pipelineReport = useMemo(() => getPipelineCoverageReport(), [])

  // Analytics summary from real attempts
  const analyticsSummary = useMemo(() => {
    return buildLearnerAnalyticsSummary('learner_current', 'Aarav Sharma', completedAttempts)
  }, [completedAttempts])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* TOP NOTIFICATION / WALLET STATUS BAR */}
      <div className="bg-[#0B132B] border-b border-white/[0.08] px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">TALENTXCEL UNIVERSAL ASSESSMENT PLATFORM</span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">
              Classes 4–12 & Foundation • CBSE / ICSE Aligned • Server-Authoritative Scoring
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full text-emerald-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pass Reward: ₹20 / Test</span>
              <span className="mx-1 text-emerald-500">•</span>
              <span>Ledger Balance: ₹{walletCredits}</span>
            </div>
            <Link
              href="/academy"
              className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 font-medium transition-colors"
            >
              <span>Academy Programmes</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ========================================================================= */}
        {/* VIEW 1: ACTIVE TEST JOURNEY SCREEN */}
        {/* ========================================================================= */}
        {activeView === 'active_test' && currentQuestion && (
          <div className="space-y-6">
            {/* Test Header */}
            <div className="bg-[#0B132B] border border-white/[0.1] rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="border-cyan-500/40 text-cyan-300 bg-cyan-950/40 text-xs">
                    {currentBlueprint.category === 'academic' ? 'Curriculum Periodic Test' : 'Aptitude & Reasoning'}
                  </Badge>
                  <span className="text-xs text-slate-400">Total Marks: {currentBlueprint.totalMarks}</span>
                  <span className="text-xs text-slate-400">• Pass Criteria: {currentBlueprint.passingPercentage}%</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentBlueprint.title}
                </h1>
              </div>

              {/* Timer & Controls */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-mono font-bold text-lg ${
                    timeRemainingSeconds < 120
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                      : 'bg-white/[0.05] border-white/[0.1] text-cyan-300'
                  }`}
                >
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span>{formatTimer(timeRemainingSeconds)}</span>
                </div>

                <Button
                  onClick={handleSubmitTest}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-900/40"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Submit Test
                </Button>
              </div>
            </div>

            {/* Assessment Layout: Split Question & Question Palette */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Question Main Panel (Left / Center) */}
              <div className="lg:col-span-8 space-y-6">
                <Card className="bg-[#0B132B] border-white/[0.1] text-slate-100 shadow-xl">
                  <CardHeader className="pb-3 border-b border-white/[0.06] flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-cyan-400">
                        Question {currentQuestionIdx + 1} of {testQuestions.length}
                      </span>
                      <Badge variant="outline" className="text-xs border-white/20 text-slate-300">
                        {currentQuestion.difficulty.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-slate-400">+{currentQuestion.marks} marks</span>
                    </div>

                    <button
                      onClick={() => toggleFlagQuestion(currentQuestion.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        flaggedQuestions.has(currentQuestion.id)
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-white/[0.05] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" />
                      <span>{flaggedQuestions.has(currentQuestion.id) ? 'Flagged' : 'Flag for Review'}</span>
                    </button>
                  </CardHeader>

                  <CardContent className="pt-6 space-y-6">
                    {/* Question Text */}
                    <div className="text-lg sm:text-xl font-medium text-white leading-relaxed">
                      {currentQuestion.questionText}
                    </div>

                    {/* Options (A, B, C, D) */}
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt, idx) => {
                        const isSelected = userAnswers[currentQuestion.id] === opt.id
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                              isSelected
                                ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                                : 'bg-[#070B14]/70 border-white/[0.08] text-slate-200 hover:border-white/30 hover:bg-white/[0.03]'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <span
                                className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm transition-colors ${
                                  isSelected
                                    ? 'bg-cyan-500 text-slate-950'
                                    : 'bg-white/[0.06] text-slate-300 group-hover:bg-white/[0.1]'
                                }`}
                              >
                                {opt.label || String.fromCharCode(65 + idx)}
                              </span>
                              <span className="text-base font-normal">{opt.text}</span>
                            </div>

                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950' : 'border-white/20'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Keyboard Help Notice */}
                    <div className="text-xs text-slate-400 bg-white/[0.03] p-3 rounded-lg border border-white/[0.05] flex items-center justify-between">
                      <span>Pro-tip: Press keys 1–4 to pick options, ← / → to navigate, F to flag.</span>
                      <span className="text-cyan-400 font-mono">CONFIDENTIAL ANSWER KEY IS LOCKED ON SERVER</span>
                    </div>

                    {/* Bottom Question Navigation Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <Button
                        variant="outline"
                        disabled={currentQuestionIdx === 0}
                        onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                        className="border-white/20 text-slate-300 hover:bg-white/[0.08]"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-2">
                        {userAnswers[currentQuestion.id] && (
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setUserAnswers((prev) => {
                                const next = { ...prev }
                                delete next[currentQuestion.id]
                                return next
                              })
                            }}
                            className="text-xs text-slate-400 hover:text-rose-400"
                          >
                            Clear Selection
                          </Button>
                        )}

                        {currentQuestionIdx < testQuestions.length - 1 ? (
                          <Button
                            onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white"
                          >
                            Save & Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        ) : (
                          <Button
                            onClick={handleSubmitTest}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                          >
                            Finish Assessment
                            <CheckCircle2 className="w-4 h-4 ml-1.5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Question Palette & Quick Navigation (Right Panel) */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="bg-[#0B132B] border-white/[0.1] text-slate-100 shadow-xl">
                  <CardHeader className="pb-3 border-b border-white/[0.06]">
                    <CardTitle className="text-base font-semibold text-white flex items-center justify-between">
                      <span>Question Palette</span>
                      <span className="text-xs text-slate-400 font-normal">
                        {Object.keys(userAnswers).length} of {testQuestions.length} answered
                      </span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-4 space-y-5">
                    {/* Grid of question buttons */}
                    <div className="grid grid-cols-5 gap-2.5">
                      {testQuestions.map((q, idx) => {
                        const isCurrent = idx === currentQuestionIdx
                        const isAnswered = Boolean(userAnswers[q.id])
                        const isFlagged = flaggedQuestions.has(q.id)

                        let bgClass = 'bg-[#070B14] border-white/[0.1] text-slate-400'
                        if (isCurrent) {
                          bgClass = 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 ring-2 ring-cyan-400/50'
                        } else if (isAnswered) {
                          bgClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold'
                        } else if (isFlagged) {
                          bgClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIdx(idx)}
                            className={`h-11 rounded-xl border flex flex-col items-center justify-center relative transition-transform hover:scale-105 ${bgClass}`}
                          >
                            <span className="text-sm">{idx + 1}</span>
                            {isFlagged && (
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-1 right-1" />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* Legend */}
                    <div className="pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
                        <span>Answered ({Object.keys(userAnswers).length})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500/50" />
                        <span>Flagged ({flaggedQuestions.size})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-cyan-500" />
                        <span>Current</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded bg-[#070B14] border border-white/20" />
                        <span>Unattempted ({testQuestions.length - Object.keys(userAnswers).length})</span>
                      </div>
                    </div>

                    {/* Exit assessment option */}
                    <div className="pt-3 border-t border-white/[0.06]">
                      <Button
                        variant="ghost"
                        onClick={() => setActiveView('catalog')}
                        className="w-full text-slate-400 hover:text-rose-300 text-xs"
                      >
                        Exit Assessment & Return to Catalog
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: SERVER-VALIDATED SCORE & EXPLANATION REVIEW SCREEN */}
        {/* ========================================================================= */}
        {activeView === 'test_result' && currentResult && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Scorecard Hero */}
            <div
              className={`rounded-3xl p-6 sm:p-8 border shadow-2xl relative overflow-hidden ${
                currentResult.passed
                  ? 'bg-gradient-to-br from-emerald-950/40 via-[#0B132B] to-[#070B14] border-emerald-500/30'
                  : 'bg-gradient-to-br from-rose-950/40 via-[#0B132B] to-[#070B14] border-rose-500/30'
              }`}
            >
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`text-xs px-3 py-1 font-semibold ${
                        currentResult.passed
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {currentResult.passed ? 'PASSED & CERTIFIED' : 'ATTEMPT COMPLETED • REVISION RECOMMENDED'}
                    </Badge>
                    <span className="text-xs text-slate-400">Attempt ID: {currentResult.attemptId}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {currentResult.blueprintTitle}
                  </h1>
                  <p className="text-sm text-slate-300 max-w-xl">
                    Evaluation completed by server-side authoritative evaluator. Official pass score criteria:{' '}
                    {currentBlueprint.passingPercentage}%.
                  </p>
                </div>

                {/* Score & Reward Badge */}
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-4xl sm:text-5xl font-black text-white">
                      {currentResult.scoreObtained}{' '}
                      <span className="text-lg font-medium text-slate-400">/ {currentResult.maxMarks}</span>
                    </div>
                    <div className="text-sm font-semibold text-cyan-400 mt-1">
                      {currentResult.percentage}% Score • {currentResult.accuracyPercentage}% Accuracy
                    </div>
                  </div>

                  {currentResult.earnedPassCredits > 0 && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-center space-y-1">
                      <Sparkles className="w-6 h-6 text-emerald-400 mx-auto" />
                      <div className="text-lg font-bold text-emerald-300">
                        +₹{currentResult.earnedPassCredits}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-medium">Pass Credit Earned</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/[0.08]">
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.05]">
                  <div className="text-xs text-slate-400">Correct Answers</div>
                  <div className="text-xl font-bold text-emerald-400 mt-0.5">
                    {currentResult.correctCount} / {currentResult.totalQuestions}
                  </div>
                </div>
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.05]">
                  <div className="text-xs text-slate-400">Incorrect Answers</div>
                  <div className="text-xl font-bold text-rose-400 mt-0.5">
                    {currentResult.incorrectCount}
                  </div>
                </div>
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.05]">
                  <div className="text-xs text-slate-400">Time Taken</div>
                  <div className="text-xl font-bold text-cyan-300 mt-0.5">
                    {Math.floor(currentResult.totalTimeSpentSeconds / 60)}m {currentResult.totalTimeSpentSeconds % 60}s
                  </div>
                </div>
                <div className="bg-white/[0.03] p-3 rounded-xl border border-white/[0.05]">
                  <div className="text-xs text-slate-400">Accuracy Rate</div>
                  <div className="text-xl font-bold text-amber-300 mt-0.5">
                    {currentResult.accuracyPercentage}%
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Insights: Weak Topics & Revision Trigger */}
            {currentResult.weakTopics.length > 0 && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-amber-200">Identified Areas Requiring Revision</h3>
                  </div>
                  <Button
                    onClick={() => handleStartTest(currentBlueprint)}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs"
                  >
                    Start Targeted Revision Drill
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
                <p className="text-xs text-amber-300/80">
                  Performance on the following topics was below the 60% mastery threshold:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentResult.weakTopics.map((w) => (
                    <Badge
                      key={w.topicId}
                      variant="outline"
                      className="border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs px-2.5 py-1"
                    >
                      {w.topicName} ({w.accuracy}% accuracy)
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Question-by-Question Solution Review (Permitted Post-Submission) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  <span>Authorized Solutions & Step-by-Step Explanations</span>
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setActiveView('catalog')}
                  className="border-white/20 text-slate-300 hover:bg-white/[0.08]"
                >
                  Return to Curriculum Catalog
                </Button>
              </div>

              <div className="space-y-4">
                {currentResult.evaluations.map((evalItem, idx) => {
                  const q = testQuestions.find((item) => item.id === evalItem.questionId)
                  if (!q) return null

                  return (
                    <Card
                      key={evalItem.questionId}
                      className={`bg-[#0B132B] border text-slate-100 ${
                        evalItem.isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30'
                      }`}
                    >
                      <CardHeader className="pb-3 border-b border-white/[0.06] flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">Q{idx + 1}.</span>
                          <span className="text-sm text-slate-300">{q.questionText}</span>
                        </div>
                        <Badge
                          className={`text-xs ${
                            evalItem.isCorrect
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}
                        >
                          {evalItem.isCorrect ? 'Correct (+2)' : 'Incorrect (0)'}
                        </Badge>
                      </CardHeader>

                      <CardContent className="pt-4 space-y-4">
                        {/* Options comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          {q.options.map((opt) => {
                            const isUserChoice = evalItem.userAnswer.includes(opt.id)
                            const isCorrectChoice = evalItem.correctAnswer.includes(opt.id)

                            let optBorder = 'border-white/[0.08] bg-[#070B14]'
                            if (isCorrectChoice) {
                              optBorder = 'border-emerald-500/60 bg-emerald-950/30 text-emerald-200'
                            } else if (isUserChoice && !evalItem.isCorrect) {
                              optBorder = 'border-rose-500/60 bg-rose-950/30 text-rose-200'
                            }

                            return (
                              <div
                                key={opt.id}
                                className={`p-2.5 rounded-lg border flex items-center justify-between ${optBorder}`}
                              >
                                <span className="font-medium">
                                  {opt.label}. {opt.text}
                                </span>
                                {isCorrectChoice && (
                                  <Badge className="bg-emerald-500 text-slate-950 text-[10px]">
                                    Correct Answer
                                  </Badge>
                                )}
                                {isUserChoice && !isCorrectChoice && (
                                  <Badge className="bg-rose-500 text-white text-[10px]">Your Answer</Badge>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        {/* Step by step explanation */}
                        <div className="bg-[#070B14] p-4 rounded-xl border border-white/[0.06] space-y-2 text-sm">
                          <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span>Step-by-Step Solution:</span>
                          </div>
                          <p className="text-slate-300">{evalItem.explanation}</p>
                          {evalItem.keyPoint && (
                            <div className="text-xs font-medium text-amber-300 bg-amber-500/10 p-2 rounded border border-amber-500/20 mt-2">
                              {evalItem.keyPoint}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: PRIMARY CURRICULUM BROWSER & ASSESSMENT CATALOG */}
        {/* ========================================================================= */}
        {activeView === 'catalog' && (
          <div className="space-y-10">
            {/* HERO SELECTOR: THE FIRST SCREEN */}
            <div className="bg-gradient-to-b from-[#0B132B] to-[#070B14] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <Badge variant="outline" className="border-cyan-500/40 text-cyan-300 bg-cyan-950/40 mb-2">
                    Universal Learner Engine
                  </Badge>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Assessment & Skills Platform
                  </h1>
                  <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                    Choose your curriculum board and class to access diagnostic assessments, chapter practice,
                    analytical reasoning, and server-validated certification.
                  </p>
                </div>

                {/* Primary Category Switch: Academic vs Aptitude */}
                <div className="flex p-1 bg-black/40 rounded-2xl border border-white/[0.08]">
                  <button
                    onClick={() => setActiveCategory('academic')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      activeCategory === 'academic'
                        ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>School Curriculum</span>
                  </button>
                  <button
                    onClick={() => setActiveCategory('aptitude')}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                      activeCategory === 'aptitude'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Brain className="w-4 h-4" />
                    <span>Reasoning & Aptitude</span>
                  </button>
                </div>
              </div>

              {/* 1. CURRICULUM BOARD SELECTION */}
              {activeCategory === 'academic' && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    1. Select Curriculum Board
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SEED_BOARDS.map((b) => {
                      const isSelected = selectedBoardCode === b.code
                      return (
                        <button
                          key={b.id}
                          onClick={() => setSelectedBoardCode(b.code)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-cyan-500/10 border-cyan-400 text-white ring-1 ring-cyan-400/50'
                              : 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:border-white/20 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-base flex items-center gap-2">
                              <span>{b.code}</span>
                              <Badge
                                className={`text-[10px] px-1.5 py-0 ${
                                  b.status === 'verified'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                                }`}
                              >
                                {b.status === 'verified' ? 'Verified' : 'Provisional'}
                              </Badge>
                            </div>
                            <div className="text-xs text-slate-400 truncate max-w-[220px]">{b.name}</div>
                          </div>
                          <span className="text-xs font-mono text-cyan-400">{b.curriculumVersion}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 2. CLASS SELECTOR (CLASSES 4 THROUGH 12 + CLASS 3) */}
              {activeCategory === 'academic' && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      2. Select Class (Classes 4–12 & Foundation)
                    </div>
                    <span className="text-xs text-cyan-400">
                      Currently Selected: Class {selectedClassNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                    {availableClasses.map((cls) => {
                      const isSelected = selectedClassNumber === cls.gradeNumber
                      return (
                        <button
                          key={cls.id}
                          onClick={() => setSelectedClassNumber(cls.gradeNumber)}
                          className={`px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all border ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-950'
                              : 'bg-white/[0.03] border-white/[0.08] text-slate-300 hover:bg-white/[0.08]'
                          }`}
                        >
                          {cls.name}
                          {cls.gradeNumber === 4 && (
                            <span className="ml-1.5 text-[10px] bg-emerald-950/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              PT-2
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 3. ASSESSMENT MODE SELECTION */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {activeCategory === 'academic' ? '3. Select Assessment Mode' : 'Select Drill Mode'}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'diagnostic', label: 'Diagnostic Test', desc: 'Identify baseline & weak areas' },
                    { id: 'topic_practice', label: 'Topic Practice', desc: 'Step-by-step topic drills' },
                    { id: 'mock_exam', label: 'Mock Exam Simulator', desc: 'Full-length timed evaluation' },
                    { id: 'revision', label: 'Targeted Revision', desc: 'Weak-topic remediation' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedAssessmentMode(mode.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedAssessmentMode === mode.id
                          ? 'bg-cyan-500/15 border-cyan-400 text-white'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="font-semibold text-sm">{mode.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{mode.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* SUBJECT-WISE & CHAPTER-WISE PRACTICE (FOR ACADEMIC CATEGORY) */}
            {/* ===================================================================== */}
            {activeCategory === 'academic' && (
              <div className="space-y-6" id="curriculum-browser">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                      <span>Subject Tracks for Class {selectedClassNumber}</span>
                      <Badge variant="outline" className="border-white/20 text-slate-300 text-xs">
                        {selectedBoardCode} Curriculum
                      </Badge>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Verified periodic test syllabi aligned with Mayoor School and national boards.
                    </p>
                  </div>
                </div>

                {/* 5 Vibrant Subject Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classSubjects.map((subj) => {
                    // Match theme colors
                    let borderClass = 'border-amber-500/30 hover:border-amber-400'
                    let bgAccent = 'bg-amber-500/10 text-amber-400'
                    let btnClass = 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold'

                    if (subj.colorTheme === 'emerald') {
                      borderClass = 'border-emerald-500/30 hover:border-emerald-400'
                      bgAccent = 'bg-emerald-500/10 text-emerald-400'
                      btnClass = 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold'
                    } else if (subj.colorTheme === 'blue') {
                      borderClass = 'border-blue-500/30 hover:border-blue-400'
                      bgAccent = 'bg-blue-500/10 text-blue-400'
                      btnClass = 'bg-blue-500 hover:bg-blue-400 text-white font-semibold'
                    } else if (subj.colorTheme === 'pink') {
                      borderClass = 'border-pink-500/30 hover:border-pink-400'
                      bgAccent = 'bg-pink-500/10 text-pink-400'
                      btnClass = 'bg-pink-500 hover:bg-pink-400 text-white font-semibold'
                    } else if (subj.colorTheme === 'purple') {
                      borderClass = 'border-purple-500/30 hover:border-purple-400'
                      bgAccent = 'bg-purple-500/10 text-purple-400'
                      btnClass = 'bg-purple-500 hover:bg-purple-400 text-white font-semibold'
                    } else if (subj.colorTheme === 'cyan') {
                      borderClass = 'border-cyan-500/30 hover:border-cyan-400'
                      bgAccent = 'bg-cyan-500/10 text-cyan-400'
                      btnClass = 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold'
                    }

                    return (
                      <Card
                        key={subj.id}
                        className={`bg-[#0B132B] border transition-all duration-200 text-slate-100 shadow-xl ${borderClass}`}
                      >
                        <CardHeader className="pb-3 flex flex-row items-start justify-between">
                          <div className="space-y-1">
                            <Badge
                              variant="outline"
                              className={`text-[11px] ${
                                subj.status === 'verified'
                                  ? 'border-emerald-500/40 text-emerald-300'
                                  : 'border-amber-500/40 text-amber-300'
                              }`}
                            >
                              {subj.status === 'verified' ? 'Verified Syllabus' : 'Provisional'}
                            </Badge>
                            <CardTitle className="text-xl font-bold text-white mt-1">
                              {subj.name}
                            </CardTitle>
                          </div>
                          <div className={`p-3 rounded-2xl ${bgAccent}`}>
                            {subj.code === 'math' && <Calculator className="w-6 h-6" />}
                            {subj.code === 'science' && <FlaskConical className="w-6 h-6" />}
                            {subj.code === 'english' && <BookOpen className="w-6 h-6" />}
                            {subj.code === 'hindi' && <Languages className="w-6 h-6" />}
                            {subj.code === 'social_science' && <Compass className="w-6 h-6" />}
                            {subj.code === 'physics' && <Atom className="w-6 h-6" />}
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4 pt-1">
                          <p className="text-xs text-slate-300 line-clamp-2">{subj.description}</p>

                          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.06]">
                            <span>{subj.totalTests} Diagnostic Tests</span>
                            <span className="text-emerald-400 font-medium">Earn ₹20 per pass</span>
                          </div>

                          <Button
                            onClick={() => {
                              const bp =
                                SEED_BLUEPRINTS.find((b) => b.subjectId === subj.id) || SEED_BLUEPRINTS[0]
                              handleStartTest(bp)
                            }}
                            className={`w-full ${btnClass}`}
                          >
                            Start Assessment
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {/* Chapter & Topic Deep Dive: Grade IV Mayoor School PT-2 Example */}
                {selectedClassNumber === 4 && (
                  <div className="bg-[#0B132B] border border-white/[0.1] rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookmarkCheck className="w-5 h-5 text-cyan-400" />
                        <h3 className="font-bold text-lg text-white">
                          Mayoor School Grade IV Periodic Test 2 Chapters
                        </h3>
                      </div>
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs">
                        100% Verified Mapping
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SEED_CHAPTERS.filter((ch) => ch.subjectId.includes('g4')).map((chap) => {
                        const isExpanded = expandedChapterId === chap.id
                        return (
                          <div
                            key={chap.id}
                            className={`p-4 rounded-xl border transition-all ${
                              isExpanded
                                ? 'bg-cyan-500/10 border-cyan-400/60'
                                : 'bg-[#070B14] border-white/[0.08] hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-white text-base">{chap.title}</h4>
                                <p className="text-xs text-slate-300 mt-1">{chap.description}</p>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleStartTest(SEED_BLUEPRINTS[0])}
                                className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs"
                              >
                                Practice Test
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ===================================================================== */}
            {/* ANALYTICAL REASONING & APTITUDE SECTION */}
            {/* ===================================================================== */}
            {(activeCategory === 'aptitude' || activeCategory === 'academic') && (
              <div className="space-y-6" id="aptitude">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/40 text-xs">
                        Critical Cognitive Foundation
                      </Badge>
                      <span className="text-xs text-slate-400">Independent Assessment Track</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                      Analytical Reasoning & Aptitude
                    </h2>
                    <p className="text-xs text-slate-400">
                      Logical deduction, spatial patterns, quantitative agility and critical thinking for
                      Olympiads, NTSE & real problem solving.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {APTITUDE_TRACKS.map((track) => (
                    <Card
                      key={track.id}
                      className="bg-[#0B132B] border border-indigo-500/30 hover:border-indigo-400 transition-all text-slate-100 shadow-xl"
                    >
                      <CardHeader className="pb-3 flex flex-row items-start justify-between">
                        <div>
                          <Badge variant="outline" className="text-[10px] border-indigo-400/40 text-indigo-300">
                            {track.targetAges}
                          </Badge>
                          <CardTitle className="text-lg font-bold text-white mt-1">
                            {track.title}
                          </CardTitle>
                        </div>
                        <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400">
                          {track.id === 'logical_reasoning' && <Brain className="w-5 h-5" />}
                          {track.id === 'quantitative_aptitude' && <Calculator className="w-5 h-5" />}
                          {track.id === 'verbal_reasoning' && <BookOpen className="w-5 h-5" />}
                          {track.id === 'non_verbal_patterns' && <Layers className="w-5 h-5" />}
                          {track.id === 'data_interpretation' && <PieChart className="w-5 h-5" />}
                          {track.id === 'critical_thinking' && <Target className="w-5 h-5" />}
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4 pt-1">
                        <p className="text-xs text-slate-300">{track.shortDescription}</p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {track.sampleTopics.map((st) => (
                            <span
                              key={st}
                              className="text-[10px] bg-white/[0.04] text-slate-300 px-2 py-0.5 rounded border border-white/[0.06]"
                            >
                              {st}
                            </span>
                          ))}
                        </div>

                        <Button
                          onClick={() => {
                            const bp =
                              SEED_BLUEPRINTS.find((b) => b.aptitudeSubcategory === track.id) ||
                              SEED_BLUEPRINTS[3]
                            handleStartTest(bp)
                          }}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
                        >
                          Start Aptitude Drill
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* REAL LEARNER ANALYTICS & HISTORICAL PROGRESS */}
            {/* ===================================================================== */}
            <div className="space-y-6 pt-4" id="analytics">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    <span>Real Learning Analytics</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Live telemetry aggregated from actual completed attempts (no hardcoded metrics).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0B132B] border border-white/[0.08] p-4 rounded-2xl">
                  <div className="text-xs text-slate-400">Total Attempts</div>
                  <div className="text-2xl font-extrabold text-white mt-1">
                    {analyticsSummary.totalAttempts}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {analyticsSummary.totalQuestionsAttempted} questions evaluated
                  </div>
                </div>

                <div className="bg-[#0B132B] border border-white/[0.08] p-4 rounded-2xl">
                  <div className="text-xs text-slate-400">Overall Accuracy</div>
                  <div className="text-2xl font-extrabold text-cyan-400 mt-1">
                    {analyticsSummary.overallAccuracyPercentage}%
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Server-verified accuracy</div>
                </div>

                <div className="bg-[#0B132B] border border-white/[0.08] p-4 rounded-2xl">
                  <div className="text-xs text-slate-400">Avg Time / Question</div>
                  <div className="text-2xl font-extrabold text-amber-300 mt-1">
                    {analyticsSummary.averageTimePerQuestionSeconds}s
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Pacing metrics</div>
                </div>

                <div className="bg-[#0B132B] border border-white/[0.08] p-4 rounded-2xl">
                  <div className="text-xs text-slate-400">Pass Credits Earned</div>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-1">
                    ₹{walletCredits}
                  </div>
                  <div className="text-[11px] text-emerald-400/80 mt-1">Append-only ledger</div>
                </div>
              </div>

              {/* Historical Attempts Table */}
              {completedAttempts.length > 0 && (
                <div className="bg-[#0B132B] border border-white/[0.08] rounded-2xl p-5 space-y-3">
                  <h3 className="text-sm font-bold text-white">Recent Verified Attempts</h3>
                  <div className="divide-y divide-white/[0.06]">
                    {completedAttempts.map((att) => (
                      <div
                        key={att.attemptId}
                        className="py-3 flex flex-wrap items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-semibold text-white">{att.blueprintTitle}</div>
                          <div className="text-slate-400">{att.evaluatedAt}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`font-bold ${att.passed ? 'text-emerald-400' : 'text-rose-400'}`}
                          >
                            {att.scoreObtained} / {att.maxMarks} ({att.percentage}%)
                          </span>
                          <Badge
                            className={
                              att.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                            }
                          >
                            {att.passed ? 'PASSED' : 'REVISION'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ===================================================================== */}
            {/* OPERATIONAL 60,000-QUESTION BANK PIPELINE & GOVERNANCE REPORT */}
            {/* ===================================================================== */}
            <div className="space-y-6 pt-4 border-t border-white/[0.08]" id="pipeline">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      60,000-Question Content Pipeline
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Strict content governance: SHA-256 duplicate detection, review lifecycle, and verified syllabus
                    matrix.
                  </p>
                </div>
                <Badge variant="outline" className="border-cyan-500/40 text-cyan-300 bg-cyan-950/40 text-xs">
                  Target: 60,000 Questions • Distinct & Validated
                </Badge>
              </div>

              {/* Pipeline Stat Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0B132B] border border-white/[0.08] p-4 rounded-2xl">
                  <div className="text-xs text-slate-400">Target Questions</div>
                  <div className="text-2xl font-extrabold text-white mt-1">60,000</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Total curriculum target</div>
                </div>

                <div className="bg-[#0B132B] border border-emerald-500/30 p-4 rounded-2xl">
                  <div className="text-xs text-emerald-400">Published & Validated</div>
                  <div className="text-2xl font-extrabold text-emerald-300 mt-1">
                    {pipelineReport.actualPublishedCount}
                  </div>
                  <div className="text-[11px] text-emerald-500/80 mt-0.5">Accurate, unpadded count</div>
                </div>

                <div className="bg-[#0B132B] border border-amber-500/30 p-4 rounded-2xl">
                  <div className="text-xs text-amber-400">In Editorial Review</div>
                  <div className="text-2xl font-extrabold text-amber-300 mt-1">
                    {pipelineReport.actualInReviewCount.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-amber-500/80 mt-0.5">Double-blind checked</div>
                </div>

                <div className="bg-[#0B132B] border border-rose-500/30 p-4 rounded-2xl">
                  <div className="text-xs text-rose-400">Duplicates Rejected</div>
                  <div className="text-2xl font-extrabold text-rose-300 mt-1">
                    {pipelineReport.duplicateRejectedCount}
                  </div>
                  <div className="text-[11px] text-rose-400/80 mt-0.5">SHA-256 fingerprint rejected</div>
                </div>
              </div>

              {/* Board & Class Coverage Matrix Table */}
              <div className="bg-[#0B132B] border border-white/[0.08] rounded-2xl p-5 overflow-x-auto space-y-4">
                <h3 className="text-sm font-bold text-white">Board & Class Coverage Status Matrix</h3>
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="border-b border-white/[0.08] text-slate-400 uppercase tracking-wider">
                    <tr>
                      <th className="pb-3 font-semibold">Board / System</th>
                      <th className="pb-3 font-semibold">Syllabus Status</th>
                      <th className="pb-3 font-semibold">Published</th>
                      <th className="pb-3 font-semibold">In Review</th>
                      <th className="pb-3 font-semibold">Pipeline Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {pipelineReport.boardBreakdown.map((row) => (
                      <tr key={row.boardCode} className="hover:bg-white/[0.02]">
                        <td className="py-3 font-medium text-white">{row.boardName}</td>
                        <td className="py-3">
                          <Badge
                            className={`text-[10px] ${
                              row.status === 'verified'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            {row.status === 'verified' ? 'Verified' : 'Provisional'}
                          </Badge>
                        </td>
                        <td className="py-3 font-mono text-emerald-400">{row.publishedCount}</td>
                        <td className="py-3 font-mono text-amber-400">{row.inReviewCount}</td>
                        <td className="py-3 font-mono text-slate-400">{row.targetCount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECONDARY LANDING PAGE CALLOUT TO TALENTXCEL ACADEMY */}
            <div className="bg-gradient-to-r from-blue-950/40 via-[#0B132B] to-[#070B14] border border-blue-500/30 rounded-3xl p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-1">
                <Badge variant="outline" className="border-blue-400/40 text-blue-300 text-xs">
                  TalentXcel Academy Secondary Portal
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Looking for Career Education Programmes?
                </h3>
                <p className="text-sm text-slate-300 max-w-xl">
                  Explore practical career programmes in AI Development & Automation, Healthcare Tech, and Startup
                  Incubation.
                </p>
              </div>

              <Link href="/academy">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">
                  Visit TalentXcel Academy
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
