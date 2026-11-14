'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  Timer,
  Share2,
  Lock,
  RotateCcw,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { CompetitiveQuestion } from '@/lib/competitive/exam-data'

interface InteractiveCompetitiveTestProps {
  examSlug: string
  examTitle: string
  sectionTitle: string
  timeLimitMinutes: number
  questions: CompetitiveQuestion[]
}

export function InteractiveCompetitiveTest({
  examSlug,
  examTitle,
  sectionTitle,
  timeLimitMinutes,
  questions,
}: InteractiveCompetitiveTestProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({})
  const [showAuthGate, setShowAuthGate] = useState(false)
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeLimitMinutes * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(true)

  // Countdown timer
  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [isTimerRunning, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const currentQ = questions[activeQuestionIndex]
  if (!currentQ) return null

  const handleSelectOption = (optionIndex: number) => {
    if (submittedQuestions[currentQ.id]) return
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }))
  }

  const handleCheckAnswer = () => {
    if (selectedAnswers[currentQ.id] === undefined) return
    setSubmittedQuestions((prev) => ({ ...prev, [currentQ.id]: true }))
  }

  // Calculate score
  const totalScore = questions.reduce((sum, q) => {
    if (!submittedQuestions[q.id]) return sum
    const chosen = selectedAnswers[q.id]
    if (chosen === q.correctIndex) {
      return sum + q.marks
    } else if (chosen !== undefined) {
      return sum - q.negativeMarks
    }
    return sum
  }, 0)

  const maxScore = questions.reduce((sum, q) => sum + q.marks, 0)
  const isCurrentSubmitted = submittedQuestions[currentQ.id]
  const currentChosen = selectedAnswers[currentQ.id]
  const isCurrentCorrect = isCurrentSubmitted && currentChosen === currentQ.correctIndex

  const shareUrl = `https://talentxcel.net/competitive/${examSlug}`
  const shareText = `I just tested my skills on ${sectionTitle} for ${examTitle} on TalentXcel! Can you beat my score? Try it free here: ${shareUrl}`

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Test Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg">
        <div className="space-y-1">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] uppercase font-bold">
            Live Diagnostic Simulator
          </Badge>
          <h2 className="text-base sm:text-lg font-bold text-slate-100">{sectionTitle}</h2>
          <p className="text-xs text-slate-400">
            Question {activeQuestionIndex + 1} of {questions.length} • {examTitle}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 font-mono text-sm font-bold text-amber-400">
            <Timer className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Net Score</span>
            <div className="text-base font-extrabold text-emerald-400">
              {totalScore.toFixed(1)} / {maxScore} Marks
            </div>
          </div>
        </div>
      </div>

      {/* Question Navigation Bubbles */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {questions.map((q, idx) => {
          const isDone = submittedQuestions[q.id]
          const isRight = isDone && selectedAnswers[q.id] === q.correctIndex
          const isWrong = isDone && !isRight
          const isActive = activeQuestionIndex === idx

          let bg = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
          if (isActive) bg = 'ring-2 ring-blue-600 bg-blue-50 text-blue-700 font-bold'
          if (isRight) bg = 'bg-emerald-600 text-white font-bold'
          if (isWrong) bg = 'bg-rose-600 text-white font-bold'

          return (
            <button
              key={q.id}
              onClick={() => setActiveQuestionIndex(idx)}
              className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 text-xs transition-all ${bg}`}
            >
              {idx + 1}
            </button>
          )
        })}
      </div>

      {/* Main Active Question Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs uppercase font-semibold">
              {currentQ.difficulty}
            </Badge>
            {currentQ.patternYear && (
              <Badge className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 text-[10px]">
                {currentQ.patternYear}
              </Badge>
            )}
          </div>
          <div className="text-xs font-semibold text-slate-500">
            +{currentQ.marks} Marks {currentQ.negativeMarks > 0 && `| -${currentQ.negativeMarks} Neg`}
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {currentQ.questionText}
        </h3>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = currentChosen === optIdx
            let style =
              'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'

            if (isSelected && !isCurrentSubmitted) {
              style =
                'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-semibold ring-2 ring-blue-500/20'
            }

            if (isCurrentSubmitted) {
              if (optIdx === currentQ.correctIndex) {
                style =
                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold'
              } else if (isSelected && !isCurrentCorrect) {
                style =
                  'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100'
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                disabled={isCurrentSubmitted}
                className={`w-full text-left p-4 rounded-2xl border text-sm flex items-start gap-3.5 transition-all ${style}`}
              >
                <span className="h-6 w-6 rounded-lg border flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="flex-1 leading-snug pt-0.5">{option}</span>
              </button>
            )
          })}
        </div>

        {/* Actions & Verification */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {!isCurrentSubmitted ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={currentChosen === undefined}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-xl text-xs ml-auto"
            >
              Confirm & Check Answer
            </Button>
          ) : (
            <div className="flex flex-wrap items-center justify-between w-full gap-3">
              <div className="flex items-center gap-2">
                {isCurrentCorrect ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Correct Answer! (+{currentQ.marks} Marks)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                    <XCircle className="h-4 w-4" /> Incorrect Answer (-{currentQ.negativeMarks} Marks)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAuthGate(true)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Unlock Full Step Derivation
                </Button>

                {activeQuestionIndex < questions.length - 1 ? (
                  <Button
                    size="sm"
                    onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs"
                  >
                    Next Question
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => setShowAuthGate(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    View All Results & Rank
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pro Tip & Officer Logic Note (Instant Free Teaser) */}
        {isCurrentSubmitted && (
          <div className="mt-4 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 text-xs space-y-2">
            <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-500" />
              Officer Shortcut / Strategy Tip:
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{currentQ.proTip}</p>
            <div className="pt-2 border-t border-indigo-200/50 dark:border-indigo-900/50 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Basic Explanation: </span>
              {currentQ.explanation}
            </div>
          </div>
        )}
      </div>

      {/* Viral WhatsApp Share & Invite Challenge */}
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
              Challenge Defence & Competitive Peers
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Share your score on WhatsApp group to compare accuracy and speed percentiles.
            </p>
          </div>
        </div>

        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-sm">
            <span>Share on WhatsApp</span>
          </Button>
        </a>
      </div>

      {/* Freemium Unlock Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
          <Trophy className="h-4 w-4" />
          Full {examTitle} Test Series & Question Bank
        </div>
        <h3 className="text-lg sm:text-xl font-extrabold">
          Get Instant Access to 500+ Official Exam Questions & Socratic Video Proofs
        </h3>
        <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
          Create your free account today to receive ₹20 bonus learning credit, unlock complete All-India rank percentiles, and download high-yield PDF cheat sheets.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Link href="/auth/register?referral=competitive_seo">
            <Button className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md">
              Sign Up Free (Claim ₹20 Pass Credit)
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href={`/competitive/${examSlug}`}>
            <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 text-xs">
              View All Exam Sections
            </Button>
          </Link>
        </div>
      </div>

      {/* Freemium Paywall Gate Modal */}
      {showAuthGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-5">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Lock className="h-7 w-7" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Unlock Complete 500+ Test Bank & Solutions
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Free diagnostic accounts receive full step-by-step video proofs, negative marking analytics, and ₹20 bonus credit towards premium test series.
              </p>
            </div>

            <div className="space-y-2.5">
              <Link href={`/auth/register?redirect=competitive/${examSlug}`} className="w-full block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl">
                  Sign Up in 1 Click (Get ₹20 Credit)
                </Button>
              </Link>
              <Link href={`/auth/login?redirect=competitive/${examSlug}`} className="w-full block">
                <Button variant="ghost" className="w-full text-slate-600 dark:text-slate-300 text-xs">
                  Already have an account? Sign in
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setShowAuthGate(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Continue testing sample questions
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
