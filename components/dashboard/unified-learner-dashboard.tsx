'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  Brain,
  Sparkles,
  Play,
  ArrowRight,
  CheckCircle2,
  Clock,
  Award,
  Code2,
  Send,
  Loader2,
  ExternalLink,
  Target,
  Flame,
  Calculator,
  GraduationCap,
  BookOpen,
  ChevronRight,
  Zap,
  BarChart3,
  ShieldCheck,
  Check,
  Layers,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type {
  AuthorizedQuestion,
  AssessmentBlueprint,
  ConfidentialQuestionSolution,
} from '@/packages/core/src/types'

// Dynamic import for modal to keep initial bundle lean
const TestRunnerModal = dynamic(
  () => import('@/components/assessment/test-runner-modal').then((m) => m.TestRunnerModal),
  { ssr: false }
)

export interface DashboardTarget {
  id: string
  label: string
  category: 'k12' | 'competitive' | 'skills'
  gradeNum?: number
  defaultSubject: string
  dailyActionTitle: string
  dailyActionSubtitle: string
  dailyActionTime: string
  subjects: Array<{ code: string; name: string; questions: string; tag: string }>
}

export const DASHBOARD_TARGETS: DashboardTarget[] = [
  {
    id: 'class_10',
    label: 'Class 10 CBSE (Board Exam 2027)',
    category: 'k12',
    gradeNum: 10,
    defaultSubject: 'math',
    dailyActionTitle: 'Class 10 Mathematics: Real Numbers & Polynomials Diagnostic',
    dailyActionSubtitle: '5 verified NCERT questions with step-by-step derivations to detect concept gaps before board prep.',
    dailyActionTime: '~10 mins',
    subjects: [
      { code: 'math', name: 'Mathematics (Standard/Basic)', questions: '14,200+ Qs', tag: 'NCERT 100%' },
      { code: 'science', name: 'Science (Physics, Chem, Bio)', questions: '18,600+ Qs', tag: 'Board Pattern' },
      { code: 'english', name: 'English Language & Literature', questions: '9,400+ Qs', tag: 'Reading & Grammar' },
      { code: 'hindi', name: 'Hindi Course A & B (Devnagari)', questions: '6,800+ Qs', tag: 'Authentic Script' },
      { code: 'social_science', name: 'Social Science (History, Civics)', questions: '12,500+ Qs', tag: 'Case Based' },
      { code: 'reasoning', name: 'Aptitude & Mental Ability', questions: '7,100+ Qs', tag: 'LogIQids Format' },
    ],
  },
  {
    id: 'class_12',
    label: 'Class 12 CBSE (Science / PCM)',
    category: 'k12',
    gradeNum: 12,
    defaultSubject: 'math',
    dailyActionTitle: 'Class 12 Mathematics: Relations, Functions & Calculus',
    dailyActionSubtitle: 'High-yield calculus & matrix derivations aligned with CBSE sample papers and JEE foundation.',
    dailyActionTime: '~15 mins',
    subjects: [
      { code: 'math', name: 'Mathematics (Calculus & Vectors)', questions: '19,500+ Qs', tag: 'NCERT & Exemplar' },
      { code: 'science', name: 'Physics (Electrodynamics & Optics)', questions: '21,000+ Qs', tag: 'Derivations & Numericals' },
      { code: 'english', name: 'English Core (Comprehension)', questions: '8,200+ Qs', tag: 'CBSE Format' },
      { code: 'reasoning', name: 'Quantitative & Analytical Reasoning', questions: '9,000+ Qs', tag: 'Entrance Prep' },
    ],
  },
  {
    id: 'class_9',
    label: 'Class 9 CBSE (Foundation STEM)',
    category: 'k12',
    gradeNum: 9,
    defaultSubject: 'math',
    dailyActionTitle: 'Class 9 Science: Motion, Force & Laws of Motion',
    dailyActionSubtitle: 'Core physics laws and graphical analysis diagnostic test with instant scoring.',
    dailyActionTime: '~10 mins',
    subjects: [
      { code: 'math', name: 'Mathematics (Number Systems & Algebra)', questions: '11,200+ Qs', tag: 'NCERT Verified' },
      { code: 'science', name: 'Science (Physics & Chemistry)', questions: '14,800+ Qs', tag: 'Concept Checks' },
      { code: 'english', name: 'English (Moments & Beehive)', questions: '6,400+ Qs', tag: 'Literature & Vocab' },
      { code: 'reasoning', name: 'Logical Deduction & Spatial', questions: '5,500+ Qs', tag: 'Olympiad Foundation' },
    ],
  },
  {
    id: 'class_8',
    label: 'Class 8 CBSE (Middle School)',
    category: 'k12',
    gradeNum: 8,
    defaultSubject: 'math',
    dailyActionTitle: 'Class 8 Mathematics: Linear Equations & Geometry',
    dailyActionSubtitle: 'Test your understanding of algebraic equations with step-by-step verified solutions.',
    dailyActionTime: '~10 mins',
    subjects: [
      { code: 'math', name: 'Mathematics (Algebra & Mensuration)', questions: '8,900+ Qs', tag: 'NCERT Core' },
      { code: 'science', name: 'Science (Force, Pressure & Cells)', questions: '10,200+ Qs', tag: 'Experiments & MCQs' },
      { code: 'english', name: 'English (Grammar & Composition)', questions: '5,100+ Qs', tag: 'Language Skills' },
      { code: 'reasoning', name: 'Pattern Recognition & Puzzles', questions: '4,800+ Qs', tag: 'LogIQids Aptitude' },
    ],
  },
  {
    id: 'class_4_7',
    label: 'Classes 4–7 (Junior STEM & Aptitude)',
    category: 'k12',
    gradeNum: 5,
    defaultSubject: 'math',
    dailyActionTitle: 'Elementary Math & Mental Aptitude Workout',
    dailyActionSubtitle: 'Interactive questions designed to build foundational problem solving and numerical confidence.',
    dailyActionTime: '~8 mins',
    subjects: [
      { code: 'math', name: 'Foundational Mathematics', questions: '15,000+ Qs', tag: 'Visual & Interactive' },
      { code: 'science', name: 'General Science & Environment', questions: '12,000+ Qs', tag: 'Activity Based' },
      { code: 'reasoning', name: 'LogIQids Mental Aptitude', questions: '8,000+ Qs', tag: 'Brain Gym' },
      { code: 'english', name: 'English Vocabulary & Reading', questions: '6,000+ Qs', tag: 'Story Comprehension' },
    ],
  },
  {
    id: 'jee',
    label: 'JEE Main & Advanced 2027',
    category: 'competitive',
    defaultSubject: 'jee',
    dailyActionTitle: 'JEE Main Physics: Rotational Dynamics & Center of Mass',
    dailyActionSubtitle: 'Standard NTA 4-mark / -1 negative marking format with detailed calculus derivations.',
    dailyActionTime: '~15 mins',
    subjects: [
      { code: 'jee', name: 'JEE Full Syllabus Mock', questions: '45,000+ Qs', tag: 'NTA Pattern' },
      { code: 'math', name: 'JEE Mathematics (Calculus & Coordinate)', questions: '24,000+ Qs', tag: 'High-Yield' },
      { code: 'science', name: 'JEE Physics (Mechanics & Electrodynamics)', questions: '22,000+ Qs', tag: 'Problem Solving' },
    ],
  },
  {
    id: 'neet',
    label: 'NEET-UG 2027 (Medical Entrance)',
    category: 'competitive',
    defaultSubject: 'neet',
    dailyActionTitle: 'NEET Biology: Human Physiology & Cell Biology Sprint',
    dailyActionSubtitle: 'High-yield NCERT diagram-based questions and assertion-reason tests.',
    dailyActionTime: '~15 mins',
    subjects: [
      { code: 'neet', name: 'NEET Full Syllabus Mock', questions: '50,000+ Qs', tag: 'NTA Format' },
      { code: 'science', name: 'NEET Biology (Botany & Zoology)', questions: '32,000+ Qs', tag: '100% NCERT' },
      { code: 'science', name: 'NEET Chemistry (Organic & Physical)', questions: '18,000+ Qs', tag: 'Formula Drills' },
    ],
  },
  {
    id: 'cuet',
    label: 'CUET-UG 2027 (Central Universities)',
    category: 'competitive',
    defaultSubject: 'cuet',
    dailyActionTitle: 'CUET General Test: Quantitative & Logical Reasoning',
    dailyActionSubtitle: 'Section III practice questions on current affairs, quantitative aptitude, and data interpretation.',
    dailyActionTime: '~12 mins',
    subjects: [
      { code: 'cuet', name: 'CUET General Test Mock', questions: '18,000+ Qs', tag: 'Section III' },
      { code: 'math', name: 'Domain: Mathematics', questions: '14,000+ Qs', tag: 'Class 12 Syllabus' },
      { code: 'english', name: 'Section IA: English Language', questions: '9,500+ Qs', tag: 'Reading & Vocab' },
    ],
  },
  {
    id: 'ai_skills',
    label: 'AI Development & Automation Track',
    category: 'skills',
    defaultSubject: 'ai',
    dailyActionTitle: 'Multi-Tenant Security & Vector Search Sandbox (pgvector)',
    dailyActionSubtitle: 'Implement tenant isolation on knowledge_chunks before running cosine similarity ranking.',
    dailyActionTime: '~25 mins',
    subjects: [
      { code: 'ai', name: 'RAG Architecture & pgvector', questions: '12 Lab Tasks', tag: 'Active Sandbox' },
      { code: 'ai_agents', name: 'Autonomous Agent Tool Calling', questions: '8 Milestones', tag: 'Enterprise' },
      { code: 'python_ai', name: 'Python for AI & Numerical Computing', questions: '42 Exercises', tag: 'Hands-on' },
    ],
  },
]

interface UnifiedLearnerDashboardProps {
  user: {
    id: string
    email?: string
    displayName?: string
    avatarUrl?: string | null
    isGoogleUser?: boolean
  }
  enrolments?: unknown[]
}

export function UnifiedLearnerDashboard({
  user,
  enrolments = [],
}: UnifiedLearnerDashboardProps) {
  // Target switcher state (persisted in localStorage)
  const [selectedTargetId, setSelectedTargetId] = useState<string>('class_10')
  const [isClient, setIsClient] = useState(false)

  // Test Runner Modal state
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false)
  const [activeBlueprint, setActiveBlueprint] = useState<AssessmentBlueprint | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<AuthorizedQuestion[]>([])
  const [activeSolutions, setActiveSolutions] = useState<ConfidentialQuestionSolution[]>([])
  const [isLaunchingTest, setIsLaunchingTest] = useState(false)

  // AI Tutor state
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [aiSources, setAiSources] = useState<Array<{ title: string; category: string }>>([])
  const [aiLoading, setAiLoading] = useState(false)

  // Load target from localStorage on mount
  useEffect(() => {
    setIsClient(true)
    const saved = localStorage.getItem('talentxcel_active_target')
    if (saved && DASHBOARD_TARGETS.some((t) => t.id === saved)) {
      setSelectedTargetId(saved)
    }
  }, [])

  const handleTargetChange = (targetId: string) => {
    setSelectedTargetId(targetId)
    if (typeof window !== 'undefined') {
      localStorage.setItem('talentxcel_active_target', targetId)
    }
  }

  const activeTarget =
    DASHBOARD_TARGETS.find((t) => t.id === selectedTargetId) || DASHBOARD_TARGETS[0]

  // Launch diagnostic test for active target / subject
  const handleLaunchTest = async (subjectCode?: string, examCode?: string) => {
    setIsLaunchingTest(true)
    try {
      const { getClassDiagnosticPackage, getCompetitiveExamDiagnosticPackage } = await import(
        '@/lib/assessment/class-diagnostic-engine'
      )

      if (examCode) {
        const pkg = getCompetitiveExamDiagnosticPackage(examCode)
        setActiveBlueprint(pkg.blueprint)
        setActiveQuestions(pkg.questions)
        setActiveSolutions(pkg.solutions)
        setIsTestRunnerOpen(true)
        return
      }

      if (activeTarget.category === 'competitive') {
        const exam = activeTarget.id.toUpperCase()
        const pkg = getCompetitiveExamDiagnosticPackage(exam)
        setActiveBlueprint(pkg.blueprint)
        setActiveQuestions(pkg.questions)
        setActiveSolutions(pkg.solutions)
        setIsTestRunnerOpen(true)
        return
      }

      // Default K-12 class diagnostic
      const grade = activeTarget.gradeNum || 10
      const subj = subjectCode || activeTarget.defaultSubject || 'math'
      const pkg = getClassDiagnosticPackage(grade, subj, 'CBSE')
      setActiveBlueprint(pkg.blueprint)
      setActiveQuestions(pkg.questions)
      setActiveSolutions(pkg.solutions)
      setIsTestRunnerOpen(true)
    } catch (err) {
      console.error('Failed to launch test:', err)
    } finally {
      setIsLaunchingTest(false)
    }
  }

  // Super AI Tutor Handler
  const handleAskAI = async (customPrompt?: string) => {
    const query = customPrompt || aiQuestion.trim()
    if (!query) return

    setAiLoading(true)
    setAiResponse(null)
    setAiSources([])

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          courseContext: `${activeTarget.label} — Diagnostic practice and curriculum mastery`,
          mode: 'hint',
          hintStep: 1,
        }),
      })

      const data = await res.json()
      if (res.ok && data.content) {
        setAiResponse(data.content)
        if (data.sources) setAiSources(data.sources)
      } else {
        setAiResponse('I am ready to help. Please ask your question regarding the syllabus.')
      }
    } catch {
      setAiResponse('Unable to connect to AI server. Please check your network connection.')
    } finally {
      setAiLoading(false)
    }
  }

  const name = user.displayName || user.email?.split('@')[0] || 'Learner'
  const initials =
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'LX'

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Sleek Hero & Target Switcher */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          {/* User Profile Info */}
          <div className="flex items-start sm:items-center gap-4">
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 ring-blue-500/20 shadow-xs shrink-0"
              />
            ) : (
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-xs shrink-0">
                {initials}
              </div>
            )}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                  Welcome back, {name}
                </h1>
                <Badge
                  variant="outline"
                  className="text-[11px] text-blue-600 dark:text-blue-400 border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 py-0.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-blue-600" />
                  Google Verified
                </Badge>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {user.email || 'learner@talentxcel.net'} • Universal Assessment & Skills Workspace
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-xs">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-bold text-neutral-900 dark:text-neutral-100">4 Day Streak</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 text-xs">
              <Calculator className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                3,000,000+ Question Bank
              </span>
            </div>
          </div>
        </div>

        {/* Target Switcher Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-600" />
              Active Learning Target & Syllabus
            </span>
            <span className="text-[11px] text-neutral-400">
              Click to switch your grade or exam anytime
            </span>
          </div>

          {/* Responsive Target Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {DASHBOARD_TARGETS.map((target) => {
              const isSelected = target.id === selectedTargetId
              return (
                <button
                  key={target.id}
                  onClick={() => handleTargetChange(target.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-600/20'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-800'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                  {target.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Action: Recommended for Today */}
        <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-[10px] bg-emerald-600 font-semibold">
                Recommended for Today
              </Badge>
              <span className="text-xs text-neutral-500 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {activeTarget.dailyActionTime}
              </span>
              <span className="text-xs text-emerald-600 font-medium hidden sm:inline">
                • Instant Automated Grading
              </span>
            </div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">
              {activeTarget.dailyActionTitle}
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              {activeTarget.dailyActionSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeTarget.category === 'skills' ? (
              <Link href="/projects/rag-engine">
                <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 shadow-xs">
                  <Play className="h-3.5 w-3.5" />
                  Open Project Sandbox
                </Button>
              </Link>
            ) : (
              <Button
                size="sm"
                onClick={() => handleLaunchTest()}
                disabled={isLaunchingTest}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 shadow-xs"
              >
                {isLaunchingTest ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Play className="h-3.5 w-3.5" />
                )}
                Launch 5-Min Diagnostic
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Core Pillar 1: School & Competitive Exam Diagnostics */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Target className="w-4 h-4" /> Pillar 1: Assessment & Intelligence
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
              Subject Diagnostics & Exam Practice — {activeTarget.label}
            </h2>
          </div>
          <Link href="/assessment" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            View All Entrance Mocks & Diagnostics <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Subject Diagnostic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTarget.subjects.map((subj) => (
            <Card
              key={subj.code}
              className="border border-neutral-200/80 dark:border-neutral-800 shadow-2xs hover:shadow-xs hover:border-blue-500/40 transition-all bg-white dark:bg-neutral-950 flex flex-col justify-between"
            >
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] text-neutral-500 border-neutral-200 dark:border-neutral-700">
                    {subj.tag}
                  </Badge>
                  <span className="text-[11px] font-medium text-neutral-400">{subj.questions}</span>
                </div>
                <CardTitle className="text-sm font-bold text-neutral-900 dark:text-white mt-2 leading-snug">
                  {subj.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Instant Scoring
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleLaunchTest(subj.code)}
                    disabled={isLaunchingTest}
                    className="h-7 text-xs font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                  >
                    Take Test →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. Core Pillar 2: Universal 3,000,000+ Question Bank */}
      <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200/60 dark:border-neutral-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Calculator className="w-4 h-4" /> Pillar 2: Universal Question Bank
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              3,000,000 Questions across Classes 4–12
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl">
              Curriculum-aligned question repository with step-by-step mathematical derivations, NCERT citations, and instant evaluation.
            </p>
          </div>

          <Link href="/dashboard/question-bank" className="shrink-0">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs gap-2 py-2 shadow-xs">
              Open Question Bank Explorer <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Quick Question Bank Chapter Jumps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/dashboard/question-bank"
            className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
              Class 10 CBSE
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Real Numbers, Polynomials & Trigonometry
            </h3>
            <p className="text-[11px] text-neutral-500 mt-1">12,400+ questions • 14 Chapters</p>
          </Link>

          <Link
            href="/dashboard/question-bank"
            className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">
              Class 12 CBSE
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              Calculus, Integrals & Differential Equations
            </h3>
            <p className="text-[11px] text-neutral-500 mt-1">18,200+ questions • 13 Chapters</p>
          </Link>

          <Link
            href="/dashboard/question-bank"
            className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">
              Class 9 CBSE
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              Number Systems, Geometry & Statistics
            </h3>
            <p className="text-[11px] text-neutral-500 mt-1">9,800+ questions • 12 Chapters</p>
          </Link>

          <Link
            href="/dashboard/question-bank"
            className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 hover:border-blue-500 hover:shadow-xs transition-all group"
          >
            <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wider mb-1">
              Mental Aptitude
            </div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 transition-colors">
              LogIQids Pattern & Spatial Reasoning
            </h3>
            <p className="text-[11px] text-neutral-500 mt-1">8,500+ questions • All Grades</p>
          </Link>
        </div>
      </div>

      {/* 4. Core Pillar 3: Skill Development, AI Studios & Socratic Tutor */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Pillar 3: Skill Development & AI Studios
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mt-0.5">
              Hands-On Engineering Sandboxes & AI Tutor
            </h2>
          </div>
          <Link href="/skills" className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1">
            Explore All 8 Skill Tracks <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Project Sandbox Card */}
          <div className="lg:col-span-7">
            <Card className="border border-neutral-200/80 dark:border-neutral-800 shadow-2xs h-full flex flex-col justify-between bg-white dark:bg-neutral-950">
              <CardHeader className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs text-indigo-600 border-indigo-500/20 bg-indigo-50/50">
                      Technical Capstone
                    </Badge>
                    <span className="text-xs font-semibold text-blue-600">Active Sandbox</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Milestone 2 Active
                  </Badge>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mt-2">
                  Enterprise Grounded Knowledge Retrieval Engine (pgvector)
                </CardTitle>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Build a production multi-tenant RAG retrieval engine with HNSW indexing, chunking, and tenant isolation in the browser sandbox.
                </p>
              </CardHeader>

              <CardContent className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Task Checklist preview */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">Task 1: Database Schema & HNSW Indexing</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">Task 2: Text Chunking with Overlap & Metadata</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      <div className="w-4 h-4 rounded-full border-2 border-blue-600 flex items-center justify-center text-[10px]">
                        3
                      </div>
                      <span>Task 3: Multi-Tenant Security & Similarity Search</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-neutral-500">
                    Automated sandbox test runner ready
                  </span>
                  <Link href="/projects/rag-engine">
                    <Button size="sm" className="w-full sm:w-auto gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                      Open Sandbox Workspace <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Socratic AI Tutor Card */}
          <div className="lg:col-span-5">
            <Card className="border border-neutral-200/80 dark:border-neutral-800 shadow-2xs h-full flex flex-col justify-between bg-white dark:bg-neutral-950">
              <CardHeader className="pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                      <Brain className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-base font-bold text-neutral-900 dark:text-white">
                      Ask Super AI Tutor
                    </CardTitle>
                  </div>
                  <Badge variant="default" className="text-[10px] bg-emerald-600 font-semibold">
                    Curriculum Grounded
                  </Badge>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Socratic step-by-step assistance for your active syllabus questions & tasks.
                </p>
              </CardHeader>

              <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                {/* AI Output preview */}
                <div className="flex-1 min-h-[140px] max-h-[220px] overflow-y-auto p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs leading-relaxed space-y-2">
                  {aiLoading ? (
                    <div className="flex items-center gap-2 text-neutral-500 h-full justify-center">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span>Super AI is consulting curriculum...</span>
                    </div>
                  ) : aiResponse ? (
                    <div>
                      <p className="whitespace-pre-wrap text-neutral-800 dark:text-neutral-200">{aiResponse}</p>
                      {aiSources.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-500">
                          <strong>Source:</strong> {aiSources.map((s) => s.title).join(', ')}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-neutral-500 text-center py-6 space-y-2">
                      <Sparkles className="h-6 w-6 mx-auto text-blue-600/40" />
                      <p>Ask a question or pick a prompt below to receive progressive Socratic hints.</p>
                    </div>
                  )}
                </div>

                {/* Quick Prompt Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'How to find HCF using Euclid division lemma?',
                    'Explain cosine distance threshold in pgvector',
                    'Key differences between HNSW and IVFFlat',
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAskAI(chip)}
                      className="text-[10px] rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2.5 py-1 text-left transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Prompt Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleAskAI()
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800"
                >
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="Ask Super AI about your current syllabus..."
                    className="flex-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1.5 text-xs text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    disabled={aiLoading}
                  />
                  <Button
                    type="submit"
                    size="sm"
                    disabled={aiLoading || !aiQuestion.trim()}
                    className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Test Runner Modal */}
      {isTestRunnerOpen && (
        <TestRunnerModal
          blueprint={activeBlueprint}
          questions={activeQuestions}
          solutions={activeSolutions}
          isOpen={isTestRunnerOpen}
          onClose={() => setIsTestRunnerOpen(false)}
        />
      )}
    </div>
  )
}
