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
  ChevronRight,
  ChevronLeft,
  Target,
  Flame,
  Calculator,
  GraduationCap,
  BookOpen,
  BarChart3,
  ShieldCheck,
  Check,
  Crown,
  Laptop,
  Globe,
  Languages,
  Cpu,
  Lightbulb,
  FlaskConical,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
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
  shortLabel: string
  gradeNum?: number
  defaultSubject: string
  dailyActionTitle: string
  dailyActionSubtitle: string
  dailyActionTime: string
  subjects: Array<{
    code: string
    name: string
    questions: string
    statusBadge: {
      text: string
      type: 'recent' | 'weak' | 'good' | 'recommended' | 'continue' | 'new' | 'skill' | 'project'
    }
    iconName: string
    iconBg: string
    iconColor: string
  }>
}

export const DASHBOARD_TARGETS: DashboardTarget[] = [
  {
    id: 'class_10',
    label: 'Class 10 CBSE (2027)',
    shortLabel: 'Class 10',
    gradeNum: 10,
    defaultSubject: 'math',
    dailyActionTitle: 'Class 10 Mathematics: Real Numbers & Polynomials Diagnostic',
    dailyActionSubtitle:
      '5 verified NCERT questions with step-by-step derivations to detect concept gaps before board prep.',
    dailyActionTime: '~10 mins',
    subjects: [
      {
        code: 'math',
        name: 'Mathematics',
        questions: '1,62,000+ Qs',
        statusBadge: { text: 'Recent Activity', type: 'recent' },
        iconName: 'calculator',
        iconBg: 'bg-blue-50 dark:bg-blue-950/40',
        iconColor: 'text-blue-600',
      },
      {
        code: 'science',
        name: 'Science',
        questions: '1,45,000+ Qs',
        statusBadge: { text: 'Weak Topics', type: 'weak' },
        iconName: 'flask',
        iconBg: 'bg-purple-50 dark:bg-purple-950/40',
        iconColor: 'text-purple-600',
      },
      {
        code: 'english',
        name: 'English Language',
        questions: '98,000+ Qs',
        statusBadge: { text: 'Good Performance', type: 'good' },
        iconName: 'book',
        iconBg: 'bg-orange-50 dark:bg-orange-950/40',
        iconColor: 'text-orange-600',
      },
      {
        code: 'social_science',
        name: 'Social Science',
        questions: '1,20,000+ Qs',
        statusBadge: { text: 'Recommended', type: 'recommended' },
        iconName: 'globe',
        iconBg: 'bg-teal-50 dark:bg-teal-950/40',
        iconColor: 'text-teal-600',
      },
      {
        code: 'hindi',
        name: 'Hindi',
        questions: '65,000+ Qs',
        statusBadge: { text: 'Continue Learning', type: 'continue' },
        iconName: 'languages',
        iconBg: 'bg-pink-50 dark:bg-pink-950/40',
        iconColor: 'text-pink-600',
      },
      {
        code: 'computer',
        name: 'Computer Applications',
        questions: '48,000+ Qs',
        statusBadge: { text: 'New Questions', type: 'new' },
        iconName: 'laptop',
        iconBg: 'bg-blue-50 dark:bg-blue-950/40',
        iconColor: 'text-blue-600',
      },
      {
        code: 'ai',
        name: 'Artificial Intelligence',
        questions: '25,000+ Qs',
        statusBadge: { text: 'Skill Development', type: 'skill' },
        iconName: 'cpu',
        iconBg: 'bg-purple-50 dark:bg-purple-950/40',
        iconColor: 'text-purple-600',
      },
      {
        code: 'entrepreneurship',
        name: 'Entrepreneurship',
        questions: '18,000+ Qs',
        statusBadge: { text: 'Project Based', type: 'project' },
        iconName: 'lightbulb',
        iconBg: 'bg-amber-50 dark:bg-amber-950/40',
        iconColor: 'text-amber-600',
      },
    ],
  },
  {
    id: 'class_12',
    label: 'Class 12 CBSE (Science)',
    shortLabel: 'Class 12',
    gradeNum: 12,
    defaultSubject: 'math',
    dailyActionTitle: 'Class 12 Mathematics: Relations, Functions & Calculus',
    dailyActionSubtitle:
      'High-yield calculus & matrix derivations aligned with CBSE sample papers and JEE foundation.',
    dailyActionTime: '~15 mins',
    subjects: [
      {
        code: 'math',
        name: 'Mathematics',
        questions: '1,95,000+ Qs',
        statusBadge: { text: 'Recent Activity', type: 'recent' },
        iconName: 'calculator',
        iconBg: 'bg-blue-50 dark:bg-blue-950/40',
        iconColor: 'text-blue-600',
      },
      {
        code: 'science',
        name: 'Physics',
        questions: '2,10,000+ Qs',
        statusBadge: { text: 'Weak Topics', type: 'weak' },
        iconName: 'flask',
        iconBg: 'bg-purple-50 dark:bg-purple-950/40',
        iconColor: 'text-purple-600',
      },
      {
        code: 'science',
        name: 'Chemistry',
        questions: '1,80,000+ Qs',
        statusBadge: { text: 'Recommended', type: 'recommended' },
        iconName: 'flask',
        iconBg: 'bg-teal-50 dark:bg-teal-950/40',
        iconColor: 'text-teal-600',
      },
      {
        code: 'english',
        name: 'English Core',
        questions: '82,000+ Qs',
        statusBadge: { text: 'Good Performance', type: 'good' },
        iconName: 'book',
        iconBg: 'bg-orange-50 dark:bg-orange-950/40',
        iconColor: 'text-orange-600',
      },
      {
        code: 'computer',
        name: 'Computer Science',
        questions: '52,000+ Qs',
        statusBadge: { text: 'New Questions', type: 'new' },
        iconName: 'laptop',
        iconBg: 'bg-blue-50 dark:bg-blue-950/40',
        iconColor: 'text-blue-600',
      },
      {
        code: 'reasoning',
        name: 'Aptitude & Reasoning',
        questions: '45,000+ Qs',
        statusBadge: { text: 'Skill Development', type: 'skill' },
        iconName: 'cpu',
        iconBg: 'bg-purple-50 dark:bg-purple-950/40',
        iconColor: 'text-purple-600',
      },
    ],
  },
  {
    id: 'class_9',
    label: 'Class 9 CBSE',
    shortLabel: 'Class 9',
    gradeNum: 9,
    defaultSubject: 'math',
    dailyActionTitle: 'Class 9 Science: Motion, Force & Laws of Motion',
    dailyActionSubtitle:
      'Core physics laws and graphical analysis diagnostic test with instant scoring.',
    dailyActionTime: '~10 mins',
    subjects: [
      {
        code: 'math',
        name: 'Mathematics',
        questions: '1,12,000+ Qs',
        statusBadge: { text: 'Recent Activity', type: 'recent' },
        iconName: 'calculator',
        iconBg: 'bg-blue-50 dark:bg-blue-950/40',
        iconColor: 'text-blue-600',
      },
      {
        code: 'science',
        name: 'Science',
        questions: '1,48,000+ Qs',
        statusBadge: { text: 'Weak Topics', type: 'weak' },
        iconName: 'flask',
        iconBg: 'bg-purple-50 dark:bg-purple-950/40',
        iconColor: 'text-purple-600',
      },
      {
        code: 'english',
        name: 'English',
        questions: '64,000+ Qs',
        statusBadge: { text: 'Good Performance', type: 'good' },
        iconName: 'book',
        iconBg: 'bg-orange-50 dark:bg-orange-950/40',
        iconColor: 'text-orange-600',
      },
      {
        code: 'social_science',
        name: 'Social Science',
        questions: '85,000+ Qs',
        statusBadge: { text: 'Recommended', type: 'recommended' },
        iconName: 'globe',
        iconBg: 'bg-teal-50 dark:bg-teal-950/40',
        iconColor: 'text-teal-600',
      },
    ],
  },
  {
    id: 'class_8',
    label: 'Class 8 CBSE',
    shortLabel: 'Class 8',
    gradeNum: 8,
    defaultSubject: 'math',
    dailyActionTitle: 'Class 8 Mathematics: Linear Equations & Geometry',
    dailyActionSubtitle:
      'Test your understanding of algebraic equations with step-by-step verified solutions.',
    dailyActionTime: '~10 mins',
    subjects: [
      {
        code: 'math',
        name: 'Mathematics',
        questions: '89,000+ Qs',
        statusBadge: { text: 'Recent Activity', type: 'recent' },
        iconName: 'calculator',
        iconBg: 'bg-blue-50 dark:bg-blue-950/40',
        iconColor: 'text-blue-600',
      },
      {
        code: 'science',
        name: 'Science',
        questions: '1,02,000+ Qs',
        statusBadge: { text: 'Weak Topics', type: 'weak' },
        iconName: 'flask',
        iconBg: 'bg-purple-50 dark:bg-purple-950/40',
        iconColor: 'text-purple-600',
      },
      {
        code: 'english',
        name: 'English',
        questions: '51,000+ Qs',
        statusBadge: { text: 'Good Performance', type: 'good' },
        iconName: 'book',
        iconBg: 'bg-orange-50 dark:bg-orange-950/40',
        iconColor: 'text-orange-600',
      },
      {
        code: 'reasoning',
        name: 'Mental Aptitude',
        questions: '48,000+ Qs',
        statusBadge: { text: 'Recommended', type: 'recommended' },
        iconName: 'cpu',
        iconBg: 'bg-teal-50 dark:bg-teal-950/40',
        iconColor: 'text-teal-600',
      },
    ],
  },
  {
    id: 'class_4_7',
    label: 'Classes 4–7',
    shortLabel: 'Class 4–7',
    gradeNum: 5,
    defaultSubject: 'math',
    dailyActionTitle: 'Junior STEM & Mental Aptitude Workout',
    dailyActionSubtitle:
      'Interactive questions designed to build foundational problem solving and numerical confidence.',
    dailyActionTime: '~8 mins',
    subjects: [
      {
        code: 'math',
        name: 'Mathematics',
        questions: '1,50,000+ Qs',
        statusBadge: { text: 'Recent Activity', type: 'recent' },
        iconName: 'calculator',
        iconBg: 'bg-blue-50 dark:bg-blue-950/40',
        iconColor: 'text-blue-600',
      },
      {
        code: 'science',
        name: 'General Science',
        questions: '1,20,000+ Qs',
        statusBadge: { text: 'Recommended', type: 'recommended' },
        iconName: 'flask',
        iconBg: 'bg-purple-50 dark:bg-purple-950/40',
        iconColor: 'text-purple-600',
      },
      {
        code: 'reasoning',
        name: 'LogIQids Aptitude',
        questions: '80,000+ Qs',
        statusBadge: { text: 'Good Performance', type: 'good' },
        iconName: 'cpu',
        iconBg: 'bg-orange-50 dark:bg-orange-950/40',
        iconColor: 'text-orange-600',
      },
      {
        code: 'english',
        name: 'English Reading',
        questions: '60,000+ Qs',
        statusBadge: { text: 'Continue Learning', type: 'continue' },
        iconName: 'book',
        iconBg: 'bg-teal-50 dark:bg-teal-950/40',
        iconColor: 'text-teal-600',
      },
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
}

function getSubjectIcon(name: string, colorClass: string) {
  switch (name) {
    case 'calculator':
      return <Calculator className={`w-5 h-5 ${colorClass}`} />
    case 'flask':
      return <FlaskConical className={`w-5 h-5 ${colorClass}`} />
    case 'book':
      return <BookOpen className={`w-5 h-5 ${colorClass}`} />
    case 'globe':
      return <Globe className={`w-5 h-5 ${colorClass}`} />
    case 'languages':
      return <Languages className={`w-5 h-5 ${colorClass}`} />
    case 'laptop':
      return <Laptop className={`w-5 h-5 ${colorClass}`} />
    case 'cpu':
      return <Cpu className={`w-5 h-5 ${colorClass}`} />
    case 'lightbulb':
      return <Lightbulb className={`w-5 h-5 ${colorClass}`} />
    default:
      return <BookOpen className={`w-5 h-5 ${colorClass}`} />
  }
}

function renderStatusBadge(status: { text: string; type: string }) {
  switch (status.type) {
    case 'recent':
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {status.text}
        </span>
      )
    case 'weak':
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-red-500 dark:text-red-400">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          {status.text}
        </span>
      )
    case 'good':
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          {status.text}
        </span>
      )
    case 'recommended':
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-600 dark:text-blue-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {status.text}
        </span>
      )
    case 'continue':
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" />
          {status.text}
        </span>
      )
    case 'new':
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-600 dark:text-blue-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {status.text}
        </span>
      )
    case 'skill':
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
          <Sparkles className="w-3 h-3 text-amber-500" />
          {status.text}
        </span>
      )
    case 'project':
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
          <Code2 className="w-3 h-3 text-indigo-500" />
          {status.text}
        </span>
      )
    default:
      return null
  }
}

export function UnifiedLearnerDashboard({ user }: UnifiedLearnerDashboardProps) {
  const [selectedTargetId, setSelectedTargetId] = useState<string>('class_10')
  const [activeFilterChip, setActiveFilterChip] = useState<string>('Board Exams')

  // Test Runner Modal State
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false)
  const [activeBlueprint, setActiveBlueprint] = useState<AssessmentBlueprint | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<AuthorizedQuestion[]>([])
  const [activeSolutions, setActiveSolutions] = useState<ConfidentialQuestionSolution[]>([])
  const [isLaunchingTest, setIsLaunchingTest] = useState(false)

  // AI Tutor State
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [aiSources, setAiSources] = useState<Array<{ title: string; category: string }>>([])
  const [aiLoading, setAiLoading] = useState(false)

  // Sync target with localStorage & topbar events
  useEffect(() => {
    const updateTarget = () => {
      const saved = localStorage.getItem('talentxcel_active_target')
      if (saved && DASHBOARD_TARGETS.some((t) => t.id === saved)) {
        setSelectedTargetId(saved)
      }
    }
    updateTarget()

    window.addEventListener('talentxcel_target_changed', updateTarget)
    return () => window.removeEventListener('talentxcel_target_changed', updateTarget)
  }, [])

  const activeTarget =
    DASHBOARD_TARGETS.find((t) => t.id === selectedTargetId) || DASHBOARD_TARGETS[0]

  const handleSelectTarget = (id: string) => {
    setSelectedTargetId(id)
    if (typeof window !== 'undefined') {
      localStorage.setItem('talentxcel_active_target', id)
    }
  }

  // Launch diagnostic test for subject
  const handleLaunchSubjectTest = async (subjectCode: string) => {
    setIsLaunchingTest(true)
    try {
      const { getClassDiagnosticPackage } = await import('@/lib/assessment/class-diagnostic-engine')
      const grade = activeTarget.gradeNum || 10
      const pkg = getClassDiagnosticPackage(grade, subjectCode, 'CBSE')
      setActiveBlueprint(pkg.blueprint)
      setActiveQuestions(pkg.questions)
      setActiveSolutions(pkg.solutions)
      setIsTestRunnerOpen(true)
    } catch (err) {
      console.error('Failed to launch diagnostic:', err)
    } finally {
      setIsLaunchingTest(false)
    }
  }

  // Ask Super AI Tutor
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
          courseContext: `${activeTarget.label} — Syllabus questions and concept guidance`,
          mode: 'hint',
          hintStep: 1,
        }),
      })

      const data = await res.json()
      if (res.ok && data.content) {
        setAiResponse(data.content)
        if (data.sources) setAiSources(data.sources)
      } else {
        setAiResponse(
          'Here is the step-by-step guidance: Identify given values, select the NCERT formula, and solve systematically.'
        )
      }
    } catch {
      setAiResponse(
        'Step-by-step guidance ready: For Real Numbers, apply Euclid lemma / prime factorization to determine HCF and LCM.'
      )
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Hero Banner: Snug, High-Energy, Zero Empty Dead Spaces */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-neutral-800 bg-gradient-to-r from-blue-50/70 via-white to-sky-50/60 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Text Column */}
          <div className="space-y-3.5 flex-1 max-w-2xl">
            {/* Top Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="text-[11px] font-semibold text-[#0066FF] border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 py-0.5 px-2.5 rounded-full"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#0066FF]" />
                Google Verified
              </Badge>
              <span className="text-xs text-slate-400 dark:text-neutral-500">
                • Universal Assessment &amp; Skills Workspace
              </span>
            </div>

            {/* Giant Title */}
            <div className="space-y-0.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Learn. Practice. Improve.
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0066FF] tracking-tight leading-tight">
                Be Exam Ready.
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 font-medium">
              3,000,000+ Questions • AI Diagnostics • NCERT Aligned • Class 4–12 • Competitive Exams
            </p>

            {/* Quick Filter Pills Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { label: 'Board Exams', icon: BookOpen, color: 'text-amber-600 bg-amber-50 border-amber-200/60' },
                { label: 'JEE / NEET', icon: GraduationCap, color: 'text-emerald-600 bg-emerald-50 border-emerald-200/60' },
                { label: 'Skill Development', icon: Sparkles, color: 'text-teal-600 bg-teal-50 border-teal-200/60' },
                { label: 'AI Tutor', icon: Brain, color: 'text-purple-600 bg-purple-50 border-purple-200/60' },
                { label: 'Project Labs', icon: Code2, color: 'text-indigo-600 bg-indigo-50 border-indigo-200/60' },
              ].map((chip) => {
                const Icon = chip.icon
                const isSelected = activeFilterChip === chip.label
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => {
                      setActiveFilterChip(chip.label)
                      if (chip.label === 'JEE / NEET') handleSelectTarget('class_12')
                      if (chip.label === 'Board Exams') handleSelectTarget('class_10')
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-[#0066FF] text-white shadow-xs'
                        : `${chip.color} dark:bg-neutral-900 dark:border-neutral-800 hover:brightness-95`
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{chip.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Live Student Engagement Pulse Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 font-bold border border-orange-200/60 dark:border-orange-900/40">
                <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500 animate-pulse" />
                4-Day Streak
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-bold border border-blue-200/60 dark:border-blue-900/40">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                88% Accuracy
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200/60 dark:border-emerald-900/40">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Instant Automated Grading
              </span>
            </div>
          </div>

          {/* Right Column: Clean Student Graphic & Floating Badges */}
          <div className="relative shrink-0 flex items-center justify-center w-60 sm:w-72 h-48 sm:h-56">
            {/* Soft Radial Glow */}
            <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-blue-100 via-sky-200 to-indigo-100 dark:from-blue-950/50 dark:via-sky-950/40 dark:to-indigo-950/50 shadow-inner ring-4 ring-white/90 dark:ring-neutral-900 overflow-hidden flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dashboard-hero-student.png"
                alt="TalentXcel Student"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Floating A+ Badge */}
            <div className="absolute top-2 left-3 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#10B981] text-white font-black text-xs sm:text-sm flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-neutral-900">
              A+
            </div>

            {/* Floating Bar Chart Badge */}
            <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 border border-teal-200 dark:border-teal-800 shadow-sm flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>

            {/* Floating Lightbulb Badge */}
            <div className="absolute bottom-10 right-0 z-10 w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-500 border border-amber-200 dark:border-amber-800 shadow-sm flex items-center justify-center">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>

            {/* Floating Pill: Personalised learning for stronger results */}
            <div className="absolute -bottom-1 z-10 px-3 py-1 rounded-full bg-white/95 dark:bg-neutral-900/95 border border-slate-200/90 dark:border-neutral-800 text-[10px] sm:text-[11px] font-bold text-slate-800 dark:text-neutral-200 shadow-md flex items-center gap-1.5 backdrop-blur-sm whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>Personalised learning for stronger results</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Your Learning Path Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Your Learning Path
            </h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Choose your class, exam or skill track to start learning
            </p>
          </div>
          <Link
            href="/dashboard/question-bank"
            className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1"
          >
            View All Targets <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Horizontal Scrolling Target Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {DASHBOARD_TARGETS.map((target) => {
            const isSelected = target.id === selectedTargetId
            return (
              <button
                key={target.id}
                onClick={() => handleSelectTarget(target.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#0066FF] text-white shadow-xs ring-2 ring-blue-600/20'
                    : 'bg-white dark:bg-neutral-900 border border-slate-200/90 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800'
                }`}
              >
                <GraduationCap
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-white' : 'text-slate-500 dark:text-neutral-400'
                  }`}
                />
                <span>{target.label}</span>
              </button>
            )
          })}
          <Link
            href="/dashboard/question-bank"
            className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-slate-500 hover:text-[#0066FF] shrink-0 shadow-2xs"
            aria-label="View more classes"
          >
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 3. Recommended for Today Green Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-white dark:to-neutral-950 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="default" className="text-[10px] font-bold bg-[#10B981] text-white px-2 py-0.5">
              Recommended for Today
            </Badge>
            <span className="text-slate-500 dark:text-neutral-400 flex items-center gap-1 font-medium">
              <Clock className="h-3 w-3" /> {activeTarget.dailyActionTime}
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Instant Automated Grading
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {activeTarget.dailyActionTitle}
          </h3>
          <p className="text-xs text-slate-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            {activeTarget.dailyActionSubtitle}
          </p>
        </div>

        <Button
          size="sm"
          onClick={() => handleLaunchSubjectTest(activeTarget.defaultSubject)}
          disabled={isLaunchingTest}
          className="gap-2 bg-[#10B981] hover:bg-emerald-600 text-white font-bold text-xs h-9 px-4 rounded-xl shadow-xs shrink-0 self-start md:self-auto"
        >
          {isLaunchingTest ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4 fill-white" />
          )}
          Start 5-Min Diagnostic
        </Button>
      </div>

      {/* 4. Subject Diagnostics & Exam Practice Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Subject Diagnostics &amp; Exam Practice — {activeTarget.label}
          </h2>
          <Link
            href="/assessment"
            className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1"
          >
            View All Subjects <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4x2 Cards Grid on Desktop, 2 cols on Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5">
          {activeTarget.subjects.map((subj) => (
            <Card
              key={subj.name}
              onClick={() => handleLaunchSubjectTest(subj.code)}
              className="border border-slate-200/80 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-950 hover:shadow-md hover:-translate-y-0.5 hover:border-blue-400 transition-all flex flex-col justify-between p-3.5 sm:p-4 cursor-pointer group"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`w-9 h-9 rounded-xl ${subj.iconBg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    {getSubjectIcon(subj.iconName, subj.iconColor)}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-neutral-600 shrink-0 mt-1 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="mt-2.5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {subj.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-neutral-500 mt-0.5">
                    {subj.questions}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between gap-1">
                {renderStatusBadge(subj.statusBadge)}
                <span className="text-[11px] font-bold text-slate-700 dark:text-neutral-300 group-hover:text-[#0066FF] transition-colors whitespace-nowrap">
                  Take Test →
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. Question Bank Banner Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/5 border border-purple-200/60 dark:border-purple-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-600 shrink-0">
            <Crown className="w-5 h-5 fill-purple-600/20" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              3,000,000+ Questions across Classes 4–12
            </h3>
            <p className="text-xs text-slate-600 dark:text-neutral-400">
              Curated from NCERT, CBSE, ICSE and top entrance exams with AI-powered mapping, solutions and analysis.
            </p>
          </div>
        </div>

        <Link href="/dashboard/question-bank" className="shrink-0 self-start sm:self-auto">
          <Button className="bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs h-8 px-3.5 rounded-xl gap-1.5 shadow-xs">
            Explore Question Bank <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* 6. Hands-On Learning & AI Tutor Grid */}
      <div id="ai-tutor" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Hands-On Learning &amp; AI Tutor
          </h2>
          <Link
            href="/courses/ai-development"
            className="text-xs font-bold text-[#0066FF] hover:underline flex items-center gap-1"
          >
            Explore All Labs <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Card: Enterprise Grounded Knowledge Retrieval Engine (ProjectXcel) */}
          <div className="lg:col-span-6">
            <Card className="border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-4 sm:p-5 bg-white dark:bg-neutral-950 flex flex-col justify-between h-full shadow-2xs">
              <div className="space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Enterprise Grounded Knowledge Retrieval Engine (ProjectXcel)
                </h3>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200/80 dark:bg-teal-950/40 dark:text-teal-300">
                    Project-Based Learning
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 dark:bg-indigo-950/40 dark:text-indigo-300">
                    Real-World Skills
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300">
                    Mentor Support
                  </span>
                </div>

                {/* Checklist with 3D Laptop Graphic */}
                <div className="flex items-center justify-between pt-1">
                  <div className="space-y-2 text-xs font-medium text-slate-700 dark:text-neutral-300">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="line-through text-slate-400">
                        Task 1: Database Design &amp; RAG Pipeline
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span className="line-through text-slate-400">
                        Task 2: Web Crawling and Domain Knowledge
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0066FF] font-bold">
                      <div className="w-4 h-4 rounded-full border-2 border-[#0066FF] flex items-center justify-center text-[9px]">
                        3
                      </div>
                      <span>Task 3: Multi-Channel Search &amp; Ranking Engine</span>
                    </div>
                  </div>

                  {/* 3D Laptop Graphic */}
                  <div className="hidden sm:block shrink-0 pl-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/dashboard-laptop-illustration.png"
                      alt="Project Sandbox"
                      className="w-18 h-14 object-contain drop-shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Task 2 of 5 Complete</span>
                <Link href="/projects/rag-engine">
                  <Button
                    size="sm"
                    className="h-8 text-xs font-bold bg-[#0066FF] hover:bg-blue-700 text-white rounded-xl gap-1 shadow-xs"
                  >
                    Open Project Sandbox <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Right Card: Ask Super AI Tutor */}
          <div className="lg:col-span-6">
            <Card className="border border-slate-200/80 dark:border-neutral-800 rounded-3xl p-4 sm:p-5 bg-white dark:bg-neutral-950 flex flex-col justify-between h-full shadow-2xs">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0066FF] flex items-center justify-center">
                      <Brain className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Ask Super AI Tutor
                    </h3>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold text-emerald-600 border-emerald-300 bg-emerald-50">
                    Powered by AI
                  </Badge>
                </div>

                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Get instant help, explanations and step-by-step solutions for any topic.
                </p>

                {/* AI Output preview */}
                {aiResponse && (
                  <div className="p-2.5 rounded-xl border border-blue-100 dark:border-blue-950/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs text-slate-800 dark:text-neutral-200 leading-relaxed max-h-32 overflow-y-auto">
                    <p className="whitespace-pre-wrap">{aiResponse}</p>
                    {aiSources.length > 0 && (
                      <div className="mt-1 pt-1 border-t border-blue-200/60 text-[10px] text-slate-500">
                        <strong>Source:</strong> {aiSources.map((s) => s.title).join(', ')}
                      </div>
                    )}
                  </div>
                )}

                {/* Prompt Input Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleAskAI()
                  }}
                  className="relative flex items-center"
                >
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="Ask a question or paste a problem..."
                    className="w-full pl-3.5 pr-10 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-[#0066FF]"
                    disabled={aiLoading}
                  />
                  <button
                    type="submit"
                    disabled={aiLoading || !aiQuestion.trim()}
                    className="absolute right-1.5 p-1.5 rounded-lg bg-[#0066FF] hover:bg-blue-700 text-white disabled:opacity-40 transition-colors"
                  >
                    {aiLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                  </button>
                </form>

                {/* Suggestion Chips */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {[
                    'Explain concept',
                    'Solve this problem',
                    'Generate practice questions',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleAskAI(chip)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-600 dark:text-neutral-300 bg-slate-100 dark:bg-neutral-900 hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
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
