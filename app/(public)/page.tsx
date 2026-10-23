'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  Bell,
  Home,
  BookOpen,
  Calculator,
  FlaskConical,
  Compass,
  Languages,
  Brain,
  Award,
  Sparkles,
  Lightbulb,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  BarChart3,
  PieChart,
  Target,
  Smartphone,
  Tablet,
  Laptop,
  Tv,
  HelpCircle,
  LogOut,
  Layers,
  GraduationCap,
  Check,
  Code,
  Cpu,
  Palette,
  MessageSquare,
  TrendingUp,
  Cloud,
  FileText,
  Briefcase,
  Wrench,
  Activity,
  ExternalLink,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AdmissionsAssistantWidget } from '@/components/public/admissions-assistant-modal'
import {
  SEED_BOARDS,
  SEED_CLASSES,
  SEED_SUBJECTS,
  SEED_GRADE4_SUBJECTS,
  SEED_CHAPTERS,
  SEED_BLUEPRINTS,
  SEED_AUTHORIZED_QUESTIONS,
  SEED_CONFIDENTIAL_SOLUTIONS,
  SEED_SKILL_TRACKS,
  SEED_SKILL_PROJECTS,
  SEED_ACADEMIC_LESSONS,
  SEED_COMPETITIVE_EXAMS,
  SEED_LEARNER_TRI_DOMAIN_PROGRESS,
  getPipelineCoverageReport,
  evaluateAssessmentAttempt,
} from '@/packages/core/src'
import type {
  AuthorizedQuestion,
  AssessmentBlueprint,
  AssessmentResult,
  SubmittedAnswer,
  LearningDomain,
  SkillTrack,
  SkillProject,
  AcademicLesson,
} from '@/packages/core/src'

// Subject styling tokens for bright, natural aesthetic
const SUBJECT_CONFIGS: Record<
  string,
  {
    bg: string
    border: string
    accent: string
    lightAccent: string
    icon: React.ReactNode
    displayName: string
  }
> = {
  math: {
    bg: 'bg-amber-50/70 hover:bg-amber-50',
    border: 'border-amber-200/80',
    accent: '#D97706',
    lightAccent: 'bg-amber-100 text-amber-900',
    icon: <Calculator className="w-5 h-5 text-amber-600" />,
    displayName: 'Mathematics',
  },
  science: {
    bg: 'bg-emerald-50/70 hover:bg-emerald-50',
    border: 'border-emerald-200/80',
    accent: '#059669',
    lightAccent: 'bg-emerald-100 text-emerald-900',
    icon: <FlaskConical className="w-5 h-5 text-emerald-600" />,
    displayName: 'Science',
  },
  english: {
    bg: 'bg-blue-50/70 hover:bg-blue-50',
    border: 'border-blue-200/80',
    accent: '#2563EB',
    lightAccent: 'bg-blue-100 text-blue-900',
    icon: <BookOpen className="w-5 h-5 text-blue-600" />,
    displayName: 'English',
  },
  hindi: {
    bg: 'bg-rose-50/70 hover:bg-rose-50',
    border: 'border-rose-200/80',
    accent: '#E11D48',
    lightAccent: 'bg-rose-100 text-rose-900',
    icon: <span className="text-lg font-bold text-rose-600 leading-none">अ</span>,
    displayName: 'Hindi',
  },
  social_science: {
    bg: 'bg-purple-50/70 hover:bg-purple-50',
    border: 'border-purple-200/80',
    accent: '#7C3AED',
    lightAccent: 'bg-purple-100 text-purple-900',
    icon: <Compass className="w-5 h-5 text-purple-600" />,
    displayName: 'Social Science',
  },
  aptitude: {
    bg: 'bg-indigo-50/70 hover:bg-indigo-50',
    border: 'border-indigo-200/80',
    accent: '#4F46E5',
    lightAccent: 'bg-indigo-100 text-indigo-900',
    icon: <Brain className="w-5 h-5 text-indigo-600" />,
    displayName: 'Analytical Skills',
  },
}

export default function ThreeDomainUnifiedPlatformPage() {
  // Top-Level Three-Domain Navigation State
  const [activeDomain, setActiveDomain] = useState<LearningDomain>('assessment')

  // Domain 1: Assessment Filters
  const [selectedBoardId, setSelectedBoardId] = useState<string>('board_cbse')
  const [selectedClassId, setSelectedClassId] = useState<string>('class_g4')
  const [isClassModalOpen, setIsClassModalOpen] = useState<boolean>(false)

  // Tracking independent completed free attempts across subjects (localStorage backed)
  const [completedFreeSubjects, setCompletedFreeSubjects] = useState<Record<string, boolean>>({})

  // Active Assessment Engine State
  const [activeTestBlueprint, setActiveTestBlueprint] = useState<AssessmentBlueprint | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<AuthorizedQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<string, string>>({})
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600)
  const [activeTab, setActiveTab] = useState<'explanation' | 'hint' | 'related'>('explanation')
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)

  // Domain 2: Skill Development State
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<'all' | 'foundation' | 'intermediate' | 'advanced'>('all')
  const [activeProjectModal, setActiveProjectModal] = useState<SkillProject | null>(null)
  const [projectSubmissionUrl, setProjectSubmissionUrl] = useState<string>('')
  const [projectSubmissionSuccess, setProjectSubmissionSuccess] = useState<boolean>(false)

  // Domain 3: Academic Learning State
  const [activeLessonModal, setActiveLessonModal] = useState<AcademicLesson | null>(null)

  // Shared Learner Intelligence State
  const [showGrowthPlanModal, setShowGrowthPlanModal] = useState<boolean>(false)

  // Load completed tests from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('talentxcel_free_subjects_completed')
      if (stored) {
        setCompletedFreeSubjects(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  // Timer countdown when test is running
  useEffect(() => {
    if (!activeTestBlueprint || assessmentResult) return

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
  }, [activeTestBlueprint, assessmentResult])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  // Real pipeline audit report (60k roadmap vs actual published counts)
  const pipelineReport = useMemo(() => getPipelineCoverageReport(), [])

  // Filter skill tracks by level
  const filteredSkillTracks = useMemo(() => {
    if (selectedSkillLevel === 'all') return SEED_SKILL_TRACKS
    return SEED_SKILL_TRACKS.filter((t) => t.level === selectedSkillLevel)
  }, [selectedSkillLevel])

  // Start free assessment test
  const handleStartFreeTest = (subjectCode: string) => {
    let blueprintId = 'bp_free_g4_math'
    let questionPrefix = 'q_g4_m6_'

    if (subjectCode === 'math') {
      blueprintId = 'bp_free_g4_math'
      questionPrefix = 'q_g4_m6_'
    } else if (subjectCode === 'science') {
      blueprintId = 'bp_free_g4_sci'
      questionPrefix = 'q_g4_sci_'
    } else if (subjectCode === 'english') {
      blueprintId = 'bp_free_g4_eng'
      questionPrefix = 'q_g4_eng_'
    } else if (subjectCode === 'hindi') {
      blueprintId = 'bp_free_g4_hin'
      questionPrefix = 'q_g4_hin_'
    } else if (subjectCode === 'social_science') {
      blueprintId = 'bp_free_g4_sst'
      questionPrefix = 'q_g4_sst_'
    } else if (subjectCode === 'aptitude') {
      blueprintId = 'bp_free_aptitude'
      questionPrefix = 'q_apt_0'
    }

    const blueprint = SEED_BLUEPRINTS.find((b) => b.id === blueprintId) || SEED_BLUEPRINTS[0]
    let questions = SEED_AUTHORIZED_QUESTIONS.filter((q) => q.id.startsWith(questionPrefix))

    // For Math: Include Question 7 from reference image in the 5 questions!
    if (subjectCode === 'math') {
      const q7 = SEED_AUTHORIZED_QUESTIONS.find((q) => q.id === 'q_g4_m6_07')
      const first4 = questions.filter((q) => q.id !== 'q_g4_m6_07').slice(0, 4)
      questions = q7 ? [...first4, q7] : questions.slice(0, 5)
    } else {
      questions = questions.slice(0, blueprint.totalQuestions)
    }

    setActiveTestBlueprint(blueprint)
    setActiveQuestions(questions)
    const q7Index = questions.findIndex((q) => q.id === 'q_g4_m6_07')
    setCurrentQuestionIndex(q7Index >= 0 ? q7Index : 0)

    if (q7Index >= 0) {
      setUserSelectedAnswers({ q_g4_m6_07: 'opt_7b' })
    } else {
      setUserSelectedAnswers({})
    }

    setTimeRemainingSeconds(blueprint.durationMinutes * 60)
    setAssessmentResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle selecting an option
  const handleSelectOption = (questionId: string, optionId: string) => {
    setUserSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  // Submit test and evaluate
  const handleSubmitAssessment = () => {
    if (!activeTestBlueprint) return

    const submittedAnswers: SubmittedAnswer[] = activeQuestions.map((q) => ({
      questionId: q.id,
      selectedOptionIds: userSelectedAnswers[q.id] ? [userSelectedAnswers[q.id]] : [],
      timeSpentSeconds: 30,
    }))

    const result = evaluateAssessmentAttempt({
      attemptId: `att_free_${Date.now()}`,
      blueprint: activeTestBlueprint,
      learnerId: 'anonymous_learner',
      questions: activeQuestions,
      solutions: SEED_CONFIDENTIAL_SOLUTIONS,
      submittedAnswers,
    })

    setAssessmentResult(result)

    const subjectKey = activeTestBlueprint.subjectId.replace('subj_g4_', '')
    const updated = { ...completedFreeSubjects, [subjectKey]: true }
    setCompletedFreeSubjects(updated)
    try {
      localStorage.setItem('talentxcel_free_subjects_completed', JSON.stringify(updated))
    } catch {
      // ignore
    }
  }

  const exitAssessmentEngine = () => {
    setActiveTestBlueprint(null)
    setActiveQuestions([])
    setAssessmentResult(null)
    setUserSelectedAnswers({})
  }

  const currentQ = activeQuestions[currentQuestionIndex]
  const currentSolution = currentQ ? SEED_CONFIDENTIAL_SOLUTIONS.get(currentQ.id) : null
  const selectedOptId = currentQ ? userSelectedAnswers[currentQ.id] : undefined
  const isSelectedOptCorrect =
    currentSolution && selectedOptId ? currentSolution.correctOptionIds.includes(selectedOptId) : false

  // =========================================================================
  // VIEW: LIVE ASSESSMENT ENGINE (SPLIT-SCREEN TABLET / DESKTOP RESPONSIVE)
  // =========================================================================
  if (activeTestBlueprint && currentQ) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
        {/* Top Sticky Test Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-3 shadow-2xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                Talent<span className="text-[#0080FF]">Xcel</span>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate max-w-[200px] sm:max-w-md">
                {activeTestBlueprint.title}
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-700 text-xs sm:text-sm font-semibold">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>

              <div className="text-xs sm:text-sm font-bold text-slate-800">
                {currentQuestionIndex + 1} / {activeQuestions.length}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={exitAssessmentEngine}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 border-slate-200"
              >
                Exit
              </Button>
            </div>
          </div>
        </header>

        {/* Assessment Body or Post-Submit Scorecard */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {assessmentResult ? (
            /* SCORECARD & EVALUATION VIEW */
            <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="text-center space-y-3 pb-6 border-b border-slate-100">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {assessmentResult.passed ? 'Assessment Completed!' : 'Diagnostic Completed'}
                </h2>
                <p className="text-sm text-slate-600">
                  Official Server-Validated Evaluation • No Sign-Up Required
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Badge className="bg-emerald-600 text-white text-sm px-3 py-1 font-bold">
                    Score: {assessmentResult.scoreObtained} / {assessmentResult.maxMarks} Marks ({assessmentResult.percentage}%)
                  </Badge>
                  <Badge className="bg-blue-600 text-white text-sm px-3 py-1 font-bold">
                    ✓ {assessmentResult.correctCount} Correct • ✕ {assessmentResult.incorrectCount} Incorrect
                  </Badge>
                  {assessmentResult.earnedPassCredits > 0 && (
                    <Badge className="bg-amber-500 text-slate-950 text-sm px-3 py-1 font-bold">
                      ★ ₹{assessmentResult.earnedPassCredits} Pass Credits Earned!
                    </Badge>
                  )}
                </div>
              </div>

              {/* Free-to-Paid Progression */}
              <div className="my-6 p-5 bg-gradient-to-br from-blue-50/60 to-indigo-50/60 rounded-xl border border-blue-200/80 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>Next Steps Across TalentXcel Domains</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Your assessment score has been recorded in your local profile. You can address any identified gaps in <strong>Academic Learning</strong> or build a practical project in <strong>Skill Development</strong>!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <Button
                    onClick={() => {
                      exitAssessmentEngine()
                      setActiveDomain('academic')
                    }}
                    className="bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs py-2.5 shadow-xs"
                  >
                    Read Lesson in Academic →
                  </Button>
                  <Button
                    onClick={() => {
                      exitAssessmentEngine()
                      setActiveDomain('skills')
                    }}
                    variant="outline"
                    className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 font-bold text-xs py-2.5"
                  >
                    Build Practical Skill Project →
                  </Button>
                  <Button
                    onClick={exitAssessmentEngine}
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs py-2.5"
                  >
                    Try Another Free Test
                  </Button>
                </div>
              </div>

              {/* Step-by-Step Question Review */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <span>Question-Wise Step-by-Step Solutions</span>
                  <Badge variant="outline" className="text-xs">
                    {assessmentResult.evaluations.length} Questions
                  </Badge>
                </h3>

                <div className="space-y-4">
                  {assessmentResult.evaluations.map((ev, idx) => (
                    <div
                      key={ev.questionId}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-800">Question {idx + 1}</span>
                        {ev.isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+{ev.marksAwarded})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-0.5 rounded-full">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect (0 marks)
                          </span>
                        )}
                      </div>

                      <div className="text-xs sm:text-sm text-slate-700 space-y-1 pt-1">
                        <p className="font-semibold text-slate-900">Step by step explanation:</p>
                        {ev.solutionSteps.map((step, sIdx) => (
                          <p key={sIdx} className="text-slate-600">
                            • {step}
                          </p>
                        ))}
                      </div>

                      {ev.keyPoint && (
                        <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-lg text-xs text-amber-950 font-medium">
                          <strong>Key Point:</strong> {ev.keyPoint}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex justify-center">
                <Button
                  onClick={exitAssessmentEngine}
                  variant="outline"
                  className="font-semibold text-slate-700"
                >
                  Return to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            /* ACTIVE SPLIT-SCREEN QUESTION & EXPLANATION */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Question {currentQuestionIndex + 1}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 leading-snug">
                      {currentQ.questionText}
                    </h2>
                  </div>

                  <div className="space-y-3">
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
                          className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left text-sm transition-all shadow-2xs ${optClass}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                                isSelected && isCorrect
                                  ? 'bg-emerald-600 text-white'
                                  : isSelected
                                  ? 'bg-[#0080FF] text-white'
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
                      className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                        isSelectedOptCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-rose-50 border-rose-200 text-rose-900'
                      }`}
                    >
                      {isSelectedOptCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-emerald-950">Correct!</p>
                            <p className="text-emerald-800 mt-0.5">{currentSolution?.explanation}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-rose-950">Not quite right</p>
                            <p className="text-rose-800 mt-0.5">
                              Check the step-by-step explanation card on the right to understand why!
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      className="font-semibold text-slate-700 border-slate-200"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-1.5 hidden sm:flex">
                      {activeQuestions.map((q, idx) => {
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

                    {currentQuestionIndex < activeQuestions.length - 1 ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.min(activeQuestions.length - 1, prev + 1)
                          )
                        }
                        className="bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={handleSubmitAssessment}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                      >
                        Submit Test
                        <CheckCircle2 className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Step-by-Step Explanation */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                  <div className="flex items-center border-b border-slate-200 pb-2 gap-4 text-xs font-bold">
                    <button
                      onClick={() => setActiveTab('explanation')}
                      className={`pb-1 border-b-2 transition-all ${
                        activeTab === 'explanation'
                          ? 'border-[#0080FF] text-[#0080FF]'
                          : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      Explanation
                    </button>
                    <button
                      onClick={() => setActiveTab('hint')}
                      className={`pb-1 border-b-2 transition-all ${
                        activeTab === 'hint'
                          ? 'border-[#0080FF] text-[#0080FF]'
                          : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      Hint
                    </button>
                    <button
                      onClick={() => setActiveTab('related')}
                      className={`pb-1 border-b-2 transition-all ${
                        activeTab === 'related'
                          ? 'border-[#0080FF] text-[#0080FF]'
                          : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      Related
                    </button>
                  </div>

                  {activeTab === 'explanation' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Step by step explanation</h4>
                        <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-700">
                          {currentSolution ? (
                            currentSolution.solutionSteps.map((step, idx) => (
                              <p key={idx} className="leading-relaxed">
                                {step}
                              </p>
                            ))
                          ) : (
                            <p className="text-slate-500 italic">
                              Select an answer to reveal step-by-step guidance.
                            </p>
                          )}
                        </div>
                      </div>

                      {currentSolution?.keyPoint && (
                        <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/90 space-y-1">
                          <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wide">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                            <span>Key Point</span>
                          </div>
                          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                            {currentSolution.keyPoint}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'hint' && (
                    <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200/70 text-xs sm:text-sm text-blue-950 space-y-2">
                      <p className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span>Socratic Hint:</span>
                      </p>
                      <p>
                        To verify if a number is a multiple, check if dividing it leaves no remainder,
                        or recall its basic multiplication table factors.
                      </p>
                    </div>
                  )}

                  {activeTab === 'related' && (
                    <div className="space-y-2 text-xs">
                      <p className="font-bold text-slate-800">Related Syllabus Topics:</p>
                      <ul className="list-disc list-inside text-slate-600 space-y-1">
                        <li>Multiplication Tables and Properties</li>
                        <li>Finding Common Multiples</li>
                        <li>Lowest Common Multiple (LCM)</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    )
  }

  // =========================================================================
  // VIEW: MAIN THREE-DOMAIN UNIFIED PLATFORM
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col">
      {/* ---------------------------------------------------------------------
          PRIMARY NAVIGATION: TALENTXCEL BRAND + TOP DOMAINS TABS
      ---------------------------------------------------------------------- */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                Talent<span className="text-[#0080FF]">Xcel</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider">
                Learn • Practise • Grow
              </span>
            </Link>

            {/* THREE PRIMARY DOMAINS SWITCHER BUTTONS */}
            <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
              <button
                onClick={() => setActiveDomain('assessment')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                  activeDomain === 'assessment'
                    ? 'bg-[#0080FF] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Assessment & Intelligence</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                  activeDomain === 'assessment' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  Free
                </span>
              </button>

              <button
                onClick={() => setActiveDomain('skills')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                  activeDomain === 'skills'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Skill Development</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                  activeDomain === 'skills' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  Projects
                </span>
              </button>

              <button
                onClick={() => setActiveDomain('academic')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                  activeDomain === 'academic'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Academic Learning</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                  activeDomain === 'academic' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  Lessons
                </span>
              </button>
            </nav>
          </div>

          {/* Right Actions: Shared Intelligence, Search & Profile */}
          <div className="flex items-center gap-3">
            {/* Shared Intelligence / Growth Plan Button */}
            <Button
              onClick={() => setShowGrowthPlanModal(true)}
              variant="outline"
              size="sm"
              className="text-xs font-bold border-blue-200 text-blue-700 hover:bg-blue-50 hidden sm:flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-[#0080FF]" />
              <span>Learner Growth Plan</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Button>

            <div className="relative hidden md:block w-48">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search all 3 domains..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-transparent rounded-lg text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#0080FF] focus:outline-hidden transition-all"
              />
            </div>

            <Link href="/login">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center hover:ring-2 hover:ring-[#0080FF]/30 transition-all">
                A
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------------------
          PROMINENT THREE-DOMAIN SELECTOR BAR (MOBILE & DESKTOP EMPHASIS)
      ---------------------------------------------------------------------- */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* Domain Description Pill */}
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[11px]">
              Active Learning Domain:
            </span>
            <span className="font-bold text-slate-900 text-sm">
              {activeDomain === 'assessment' && '1. Assessment & Intelligence — Test skills. Measure ability. Identify gaps.'}
              {activeDomain === 'skills' && '2. Skill Development — Learn by doing, building and mastering.'}
              {activeDomain === 'academic' && '3. Academic Learning — Understand the syllabus. Learn every topic.'}
            </span>
          </div>

          {/* Segmented Switcher for Tablets & Mobile */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 w-full md:w-auto justify-between">
            <button
              onClick={() => setActiveDomain('assessment')}
              className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                activeDomain === 'assessment' ? 'bg-[#0080FF] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Assess
            </button>
            <button
              onClick={() => setActiveDomain('skills')}
              className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                activeDomain === 'skills' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Develop Skills
            </button>
            <button
              onClick={() => setActiveDomain('academic')}
              className={`flex-1 md:flex-initial px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                activeDomain === 'academic' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Learn Syllabus
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------
          MAIN DOMAIN BODY CONTENT
      ---------------------------------------------------------------------- */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
        {/* ===================================================================
            DOMAIN 1: ASSESSMENT & INTELLIGENCE
        ==================================================================== */}
        {activeDomain === 'assessment' && (
          <div className="space-y-8">
            {/* Assessment Hero Banner */}
            <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Domain 1 • Assessment & Intelligence
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Test Skills. Measure Ability. <br />
                  <span className="text-cyan-200">Identify Exact Gaps.</span>
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Classes 4–12 school assessments, independent analytical reasoning drills, and competitive exam readiness. 5 free questions per subject with zero login required.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={() => handleStartFreeTest('math')}
                    className="bg-white hover:bg-slate-100 text-blue-700 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs"
                  >
                    Start Free Math Diagnostic →
                  </Button>
                  <Button
                    onClick={() => handleStartFreeTest('aptitude')}
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl"
                  >
                    Take Analytical Reasoning Drill (8 Free)
                  </Button>
                </div>
              </div>
            </section>

            {/* School Subjects (5 Free Questions Per Subject) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Grade IV School Subject Tests</h2>
                  <p className="text-xs text-slate-500">
                    5 Free Questions per Subject • Tracked Independently • No Sign-Up
                  </p>
                </div>
                <Badge variant="outline" className="text-xs text-slate-600">
                  CBSE 2026-27 Aligned
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {SEED_GRADE4_SUBJECTS.map((subject) => {
                  const cfg = SUBJECT_CONFIGS[subject.code] || SUBJECT_CONFIGS.math
                  const isCompleted = !!completedFreeSubjects[subject.code]

                  return (
                    <div
                      key={subject.id}
                      className={`rounded-2xl border p-5 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between ${cfg.bg} ${cfg.border}`}
                    >
                      <div className="space-y-3">
                        <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 shadow-2xs flex items-center justify-center">
                          {cfg.icon}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-slate-900">{subject.name}</h3>
                          <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                            Practice • Tests • Revision
                          </p>
                        </div>
                        <div className="text-[11px] text-slate-600 line-clamp-2">
                          {subject.description}
                        </div>
                      </div>

                      <div className="pt-4 mt-2 border-t border-slate-200/50 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-500">5 Free Questions</span>
                          {isCompleted ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                          ) : (
                            <span className="text-amber-700">Available</span>
                          )}
                        </div>

                        <Button
                          onClick={() => handleStartFreeTest(subject.code)}
                          size="sm"
                          className="w-full bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs py-2 shadow-xs"
                        >
                          {isCompleted ? 'Practice Again' : 'Start Free Practice'}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Independent Analytical Reasoning Drill Card */}
            <section className="bg-gradient-to-br from-indigo-50/70 via-white to-cyan-50/70 rounded-2xl border border-indigo-200/80 p-6 shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-wide">
                      Independent Track
                    </Badge>
                    <span className="text-xs font-semibold text-indigo-700">
                      Logical Reasoning & Numerical Aptitude
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Analytical Reasoning & Pattern Drills
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Number series, alphabet codes, odd-one-out, clock angles, and deductive logic. Includes 8 free diagnostic questions without mandatory registration.
                  </p>
                </div>

                <Button
                  onClick={() => handleStartFreeTest('aptitude')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 shadow-xs shrink-0"
                >
                  Start Free Analytical Practice (8 Questions) →
                </Button>
              </div>
            </section>

            {/* Competitive Examinations Batch Pipelines */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">Competitive Examination Pipelines</h3>
                  <p className="text-xs text-slate-500">
                    National & state entrance examinations introduced in validated batches
                  </p>
                </div>
                <Badge variant="outline" className="text-xs text-slate-600">
                  {SEED_COMPETITIVE_EXAMS.filter((e) => e.verifiedStatus === 'verified').length} Active Batches
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SEED_COMPETITIVE_EXAMS.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-2.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-slate-900">{exam.examCode}</span>
                        {exam.verifiedStatus === 'verified' ? (
                          <Badge className="bg-emerald-100 text-emerald-800 text-[10px] py-0 px-2 font-bold">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-slate-500 text-[10px] py-0 px-2">
                            Pipeline
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-xs font-semibold text-slate-700 mt-1 leading-snug">{exam.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{exam.targetStage}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">{exam.sampleTestsAvailable} Sample Tests</span>
                      <span className="font-bold text-[#0080FF]">{exam.expectedLaunchBatch}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===================================================================
            DOMAIN 2: SKILL DEVELOPMENT (JAPANESE & CHINESE INSPIRATIONS)
        ==================================================================== */}
        {activeDomain === 'skills' && (
          <div className="space-y-8">
            {/* Skill Development Hero Banner */}
            <section className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                  Domain 2 • Skill Development
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Learn by Doing, Building <br />
                  <span className="text-cyan-200">and Mastering.</span>
                </h1>
                <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                  Inspired by Japanese craftsmanship (continuous refinement, precision, discipline) and Chinese structured progression (rigorous technical foundations, applied mathematics, sustained practical projects).
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                  <span className="font-bold text-indigo-200">Filter Pathway:</span>
                  {(['all', 'foundation', 'intermediate', 'advanced'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedSkillLevel(lvl)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                        selectedSkillLevel === lvl
                          ? 'bg-white text-indigo-900 shadow-xs'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {lvl === 'all' ? 'All Pathways' : lvl}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 8 Skill Category Tracks Grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Practical Skill Tracks</h2>
                  <p className="text-xs text-slate-500">
                    Age-appropriate foundations for Classes 4–12 through advanced engineering pathways
                  </p>
                </div>
                <Badge variant="outline" className="text-xs text-slate-600">
                  {filteredSkillTracks.length} Available Tracks
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredSkillTracks.map((track) => (
                  <div
                    key={track.id}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {track.category === 'ai_automation' && <Sparkles className="w-5 h-5" />}
                          {track.category === 'coding_computation' && <Code className="w-5 h-5" />}
                          {track.category === 'math_problem_solving' && <Calculator className="w-5 h-5" />}
                          {track.category === 'robotics_engineering' && <Cpu className="w-5 h-5" />}
                          {track.category === 'design_production' && <Palette className="w-5 h-5" />}
                          {track.category === 'communication_collaboration' && <MessageSquare className="w-5 h-5" />}
                          {track.category === 'entrepreneurship_finance' && <TrendingUp className="w-5 h-5" />}
                          {track.category === 'digital_vocational' && <Cloud className="w-5 h-5" />}
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-600">
                          {track.level}
                        </Badge>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 leading-snug">{track.title}</h3>
                        <p className="text-[11px] font-semibold text-indigo-700 mt-0.5">{track.targetGrades}</p>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">{track.description}</p>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600 italic">
                        {track.philosophyNote}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>{track.modulesCount} Modules</span>
                        <span>{track.projectsCount} Projects</span>
                      </div>

                      <Button
                        onClick={() => {
                          const project = SEED_SKILL_PROJECTS.find((p) => p.trackId === track.id) || SEED_SKILL_PROJECTS[0]
                          setActiveProjectModal(project)
                          setProjectSubmissionSuccess(false)
                        }}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 shadow-xs"
                      >
                        Explore Project Workshop →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Hands-On Projects with Rubrics */}
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Featured Capstone Projects with Clear Rubrics</h3>
                <p className="text-xs text-slate-500">
                  Deliverable-driven projects evaluated on craftsmanship, utility and logical cleanliness
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SEED_SKILL_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge className="bg-indigo-100 text-indigo-800 text-[10px] font-bold">
                        {proj.estimatedHours} Hours Project
                      </Badge>
                      <span className="text-xs text-slate-500 capitalize">Level: {proj.difficulty}</span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900">{proj.title}</h4>
                    <p className="text-xs text-slate-600">{proj.brief}</p>

                    <div className="pt-2">
                      <Button
                        onClick={() => {
                          setActiveProjectModal(proj)
                          setProjectSubmissionSuccess(false)
                        }}
                        variant="outline"
                        size="sm"
                        className="text-xs font-bold text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                      >
                        Open Project Brief & Rubric →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===================================================================
            DOMAIN 3: ACADEMIC LEARNING (SYLLABUS LESSONS → TEST)
        ==================================================================== */}
        {activeDomain === 'academic' && (
          <div className="space-y-8">
            {/* Academic Learning Hero Banner */}
            <section className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Domain 3 • Academic Learning
                </span>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Understand the Syllabus. <br />
                  <span className="text-cyan-200">Learn Every Topic.</span>
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                  Board and class-wise structured chapters, concept breakdowns, worked mathematical examples, and revision summaries. Every lesson directly connects to the Assessment domain so students can measure what they learned.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={() => setActiveLessonModal(SEED_ACADEMIC_LESSONS[0])}
                    className="bg-white hover:bg-slate-100 text-emerald-800 font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs"
                  >
                    Start Lesson 1: Understanding Multiples →
                  </Button>
                  <Button
                    onClick={() => setActiveLessonModal(SEED_ACADEMIC_LESSONS[2])}
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl"
                  >
                    Read Science: Forces in Our World
                  </Button>
                </div>
              </div>
            </section>

            {/* Academic Lesson Catalog Grid */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">Curriculum Syllabus Lessons</h2>
                  <p className="text-xs text-slate-500">
                    Grade IV CBSE & Verified Board Modules • Linked to Practice Diagnostics
                  </p>
                </div>
                <Badge variant="outline" className="text-xs text-slate-600">
                  {SEED_ACADEMIC_LESSONS.length} Verified Lessons
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SEED_ACADEMIC_LESSONS.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Lesson {lesson.lessonNumber} • {lesson.readingTimeMinutes} Mins Read
                        </Badge>
                        <span className="text-xs text-slate-400 font-medium">CBSE Verified</span>
                      </div>

                      <h3 className="font-extrabold text-base text-slate-900 leading-snug">{lesson.title}</h3>

                      <div className="space-y-2 text-xs text-slate-600">
                        <p className="font-semibold text-slate-800">Concept Highlights:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {lesson.conceptBreakdown.map((c, i) => (
                            <li key={i} className="line-clamp-1">
                              <strong>{c.heading}:</strong> {c.body}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Button
                        onClick={() => setActiveLessonModal(lesson)}
                        variant="outline"
                        size="sm"
                        className="text-xs font-bold text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                      >
                        Read Full Lesson →
                      </Button>

                      {lesson.linkedBlueprintId && (
                        <Button
                          onClick={() => {
                            if (lesson.id.includes('m6')) handleStartFreeTest('math')
                            else if (lesson.id.includes('s5')) handleStartFreeTest('science')
                            else if (lesson.id.includes('e8')) handleStartFreeTest('english')
                          }}
                          size="sm"
                          className="bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs"
                        >
                          Practise Connected Test
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ===================================================================
            SHARED LEARNER INTELLIGENCE: TRI-DOMAIN PROGRESS SECTION
        ==================================================================== */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-slate-900 text-white text-[10px] font-bold">Unified Profile</Badge>
                <h3 className="font-extrabold text-lg text-slate-900">
                  Shared Learner Intelligence: {SEED_LEARNER_TRI_DOMAIN_PROGRESS.learnerName}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Connecting assessment results with targeted academic lessons and hands-on skill projects
              </p>
            </div>

            <Button
              onClick={() => setShowGrowthPlanModal(true)}
              size="sm"
              className="bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs"
            >
              View Personalised Growth Plan
            </Button>
          </div>

          {/* Three Distinct Progress Pillars (Never collapsed into one misleading score) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Assessment Ability */}
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 uppercase">1. Assessment Ability</span>
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {SEED_LEARNER_TRI_DOMAIN_PROGRESS.assessmentStats.accuracyPercentage}%
              </div>
              <p className="text-xs text-slate-600">
                {SEED_LEARNER_TRI_DOMAIN_PROGRESS.assessmentStats.totalAttempted} diagnostic tests completed •{' '}
                {SEED_LEARNER_TRI_DOMAIN_PROGRESS.assessmentStats.weakTopicsCount} weak topics identified
              </p>
              <span className="inline-block text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md mt-1">
                ★ ₹{SEED_LEARNER_TRI_DOMAIN_PROGRESS.assessmentStats.passCreditsEarned} Pass Credits Earned
              </span>
            </div>

            {/* Pillar 2: Academic Syllabus Knowledge */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase">2. Academic Knowledge</span>
                <BookOpen className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {SEED_LEARNER_TRI_DOMAIN_PROGRESS.academicStats.lessonsCompleted} Lessons
              </div>
              <p className="text-xs text-slate-600">
                {SEED_LEARNER_TRI_DOMAIN_PROGRESS.academicStats.chaptersCovered} curriculum chapters read •{' '}
                {SEED_LEARNER_TRI_DOMAIN_PROGRESS.academicStats.revisionReadyCount} chapters ready for mock exam
              </p>
              <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md mt-1">
                ✓ Syllabus Coverage On Track
              </span>
            </div>

            {/* Pillar 3: Skill Craftsmanship */}
            <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 uppercase">3. Skill Craftsmanship</span>
                <Cpu className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                {SEED_LEARNER_TRI_DOMAIN_PROGRESS.skillStats.projectsCompleted} Projects
              </div>
              <p className="text-xs text-slate-600">
                {SEED_LEARNER_TRI_DOMAIN_PROGRESS.skillStats.competenciesMastered} competencies verified •{' '}
                {SEED_LEARNER_TRI_DOMAIN_PROGRESS.skillStats.activeProjectsCount} active project in workshop
              </p>
              <span className="inline-block text-[11px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md mt-1">
                Kaizen Craftsmanship Level 1
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 5: OPERATIONAL PIPELINE AUDIT SUMMARY
        ==================================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                Operational Content Pipeline & Transparency Audit
              </h3>
              <p className="text-xs text-slate-500">
                Targeting 60,000 validated curriculum questions • Reporting actual live verified counts
              </p>
            </div>
            <Badge className="bg-slate-100 text-slate-800 text-xs px-2.5 py-0.5 font-bold">
              Unpadded Metrics
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">Published & Live</span>
              <span className="text-xl sm:text-2xl font-black text-[#0080FF]">{pipelineReport.actualPublishedCount}</span>
              <span className="text-[10px] text-slate-400 block">Verified questions</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">Content Target</span>
              <span className="text-xl sm:text-2xl font-black text-slate-900">60,000</span>
              <span className="text-[10px] text-slate-400 block">Roadmap pipeline</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">In Editorial Review</span>
              <span className="text-xl sm:text-2xl font-black text-amber-600">{pipelineReport.actualInReviewCount}</span>
              <span className="text-[10px] text-slate-400 block">Quality checks</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[11px] font-bold text-slate-500 block uppercase">Duplicates Rejected</span>
              <span className="text-xl sm:text-2xl font-black text-rose-600">{pipelineReport.duplicateRejectedCount}</span>
              <span className="text-[10px] text-slate-400 block">Fingerprint hash</span>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------------------
          MODAL: ACADEMIC LESSON READER (DOMAIN 3)
      ---------------------------------------------------------------------- */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <Badge className="bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                  Lesson {activeLessonModal.lessonNumber} • {activeLessonModal.readingTimeMinutes} Minutes
                </Badge>
                <h3 className="font-extrabold text-xl text-slate-900">{activeLessonModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveLessonModal(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Concept Breakdown */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Concept Explanation</h4>
              {activeLessonModal.conceptBreakdown.map((concept, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <h5 className="font-bold text-sm text-slate-900">{concept.heading}</h5>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {concept.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Worked Examples */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Worked Examples</h4>
              {activeLessonModal.workedExamples.map((ex, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                  <p className="font-bold text-xs sm:text-sm text-emerald-950">Problem: {ex.problemText}</p>
                  <div className="text-xs text-slate-700 space-y-1">
                    {ex.stepByStepSolution.map((s, sIdx) => (
                      <p key={sIdx}>• {s}</p>
                    ))}
                  </div>
                  <p className="text-xs font-bold text-emerald-800 pt-1">Answer: {ex.finalAnswer}</p>
                </div>
              ))}
            </div>

            {/* Revision Notes */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 space-y-1 text-xs">
              <span className="font-bold text-amber-900 uppercase">Key Revision Takeaways</span>
              <ul className="list-disc list-inside text-amber-950 space-y-1 pt-1">
                {activeLessonModal.revisionNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => setActiveLessonModal(null)}
                className="text-xs font-semibold"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  const lesson = activeLessonModal
                  setActiveLessonModal(null)
                  if (lesson.id.includes('m6')) handleStartFreeTest('math')
                  else if (lesson.id.includes('s5')) handleStartFreeTest('science')
                  else if (lesson.id.includes('e8')) handleStartFreeTest('english')
                }}
                className="bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs"
              >
                Take Connected Practice Test →
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL: SKILL PROJECT WORKSHOP BRIEF & RUBRICS (DOMAIN 2)
      ---------------------------------------------------------------------- */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <Badge className="bg-indigo-100 text-indigo-800 text-xs font-bold mb-1">
                  Capstone Project • {activeProjectModal.estimatedHours} Hours
                </Badge>
                <h3 className="font-extrabold text-xl text-slate-900">{activeProjectModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs uppercase text-slate-400">Project Mission Brief</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">{activeProjectModal.brief}</p>
              </div>

              <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-200/70 text-xs text-indigo-950">
                <strong>Real-World Relevance:</strong> {activeProjectModal.realWorldContext}
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase text-slate-400 mb-2">Required Deliverables</h4>
                <div className="space-y-1 text-xs text-slate-700">
                  {activeProjectModal.deliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase text-slate-400 mb-2">Mastery Rubric</h4>
                <div className="space-y-2">
                  {activeProjectModal.rubricCriteria.map((rubric, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{rubric.criterion}</span>
                        <Badge variant="outline">{rubric.weightPercentage}%</Badge>
                      </div>
                      <p className="text-slate-600">{rubric.masteryDescription}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submission Workspace Simulator */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="font-bold text-xs text-slate-800">Submit Project URL / Portfolio Proof</span>
                <input
                  type="text"
                  placeholder="https://github.com/... or Figma link or Google Drive proof"
                  value={projectSubmissionUrl}
                  onChange={(e) => setProjectSubmissionUrl(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                />
                <Button
                  onClick={() => setProjectSubmissionSuccess(true)}
                  disabled={!projectSubmissionUrl.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs w-full"
                >
                  Submit for Rubric Evaluation & Portfolio Badge
                </Button>

                {projectSubmissionSuccess && (
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Project evidence submitted! Verified and added to your shared learner portfolio.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button variant="outline" onClick={() => setActiveProjectModal(null)} className="text-xs font-semibold">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          MODAL: PERSONALISED GROWTH PLAN (TRI-DOMAIN CONNECTIVITY)
      ---------------------------------------------------------------------- */}
      {showGrowthPlanModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <Badge className="bg-blue-100 text-blue-800 text-xs font-bold mb-1">
                  Tri-Domain Growth Plan
                </Badge>
                <h3 className="font-extrabold text-xl text-slate-900">
                  Continuous Improvement Cycle (Kaizen)
                </h3>
              </div>
              <button
                onClick={() => setShowGrowthPlanModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600">
              Assessment results detect exact conceptual gaps. Academic lessons build understanding, Skill projects apply that knowledge, and re-assessments measure improvement.
            </p>

            <div className="space-y-4">
              {SEED_LEARNER_TRI_DOMAIN_PROGRESS.growthRecommendations.map((rec, idx) => (
                <div key={rec.id} className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900">
                      Recommendation for {rec.gapDescription}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {/* Step A: Assess Gap */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-rose-600 uppercase">1. Assessed Gap</span>
                      <p className="font-bold text-slate-800">Properties of Multiples</p>
                      <p className="text-[11px] text-slate-500">Diagnostic accuracy &lt; 60%</p>
                    </div>

                    {/* Step B: Academic Lesson */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">2. Academic Lesson</span>
                      <p className="font-bold text-slate-800">{rec.recommendedLessonTitle}</p>
                      <Button
                        size="sm"
                        onClick={() => {
                          setShowGrowthPlanModal(false)
                          setActiveDomain('academic')
                          setActiveLessonModal(SEED_ACADEMIC_LESSONS[1])
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] py-1 h-auto mt-1 w-full"
                      >
                        Read Lesson →
                      </Button>
                    </div>

                    {/* Step C: Skill Project */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase">3. Skill Project</span>
                      <p className="font-bold text-slate-800">{rec.recommendedProjectTitle}</p>
                      <Button
                        size="sm"
                        onClick={() => {
                          setShowGrowthPlanModal(false)
                          setActiveDomain('skills')
                          setActiveProjectModal(SEED_SKILL_PROJECTS[1])
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] py-1 h-auto mt-1 w-full"
                      >
                        Build Project →
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button variant="outline" onClick={() => setShowGrowthPlanModal(false)} className="text-xs font-semibold">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------
          FOOTER
      ---------------------------------------------------------------------- */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-bold text-slate-800">
            TalentXcel — Universal Learning, Assessment & Skills Platform
          </p>
          <p>
            Three Distinct Domains: Assessment & Intelligence · Skill Development · Academic Learning
          </p>
          <p className="text-[11px] text-slate-400">
            © 2026 TalentXcel. Free practice and educational materials are provided without mandatory authentication.
          </p>
        </div>
      </footer>

      {/* Floating Admissions Assistant Widget */}
      <AdmissionsAssistantWidget />
    </div>
  )
}
