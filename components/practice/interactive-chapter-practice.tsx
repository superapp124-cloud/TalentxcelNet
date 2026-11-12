'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  Sparkles,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface PracticeQuestion {
  id: string
  questionText: string
  options: string[]
  marks: number
  difficulty: 'easy' | 'medium' | 'hard'
  explanationSnippet?: string
  correctOptionIndex?: number
}

interface InteractiveChapterPracticeProps {
  board: string
  classNumber: number
  subjectName: string
  chapterTitle: string
  questions: PracticeQuestion[]
}

export function InteractiveChapterPractice({
  board,
  classNumber,
  subjectName,
  chapterTitle,
  questions,
}: InteractiveChapterPracticeProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({})
  const [showAuthGate, setShowAuthGate] = useState(false)
  const [score, setScore] = useState(0)

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedQuestions[questionId]) return // already answered
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const handleCheckAnswer = (q: PracticeQuestion) => {
    if (selectedAnswers[q.id] === undefined) return
    const isCorrect = selectedAnswers[q.id] === q.correctOptionIndex
    setSubmittedQuestions((prev) => ({ ...prev, [q.id]: true }))
    if (isCorrect) {
      setScore((prev) => prev + (q.marks || 1))
    }
  }

  const totalAnswered = Object.keys(submittedQuestions).length

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Realtime Practice Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-transparent border border-blue-100 dark:border-blue-900/40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {classNumber}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {chapterTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {board.toUpperCase()} • {subjectName} • {questions.length} Diagnostic Questions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold uppercase text-slate-400">Your Score</span>
            <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              {score} / {questions.reduce((sum, q) => sum + (q.marks || 1), 0)} XP
            </div>
          </div>
        </div>
      </div>

      {/* Question Cards List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => {
          const isSubmitted = submittedQuestions[q.id]
          const chosenIndex = selectedAnswers[q.id]
          const isCorrect = isSubmitted && chosenIndex === q.correctOptionIndex

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 shadow-sm ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-rose-300 dark:border-rose-800 bg-rose-50/20 dark:bg-rose-950/10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold">
                  Q{qIndex + 1}
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize text-xs font-medium">
                    {q.difficulty}
                  </Badge>
                  <span className="text-xs font-medium text-slate-400">+{q.marks} Marks</span>
                </div>
              </div>

              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-5 leading-relaxed">
                {q.questionText}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                {q.options.map((opt, optIndex) => {
                  const isSelected = chosenIndex === optIndex
                  let optionStyle =
                    'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'

                  if (isSelected && !isSubmitted) {
                    optionStyle =
                      'border-blue-600 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-semibold ring-2 ring-blue-500/20'
                  }

                  if (isSubmitted) {
                    if (optIndex === q.correctOptionIndex) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-semibold'
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100'
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      onClick={() => handleSelectOption(q.id, optIndex)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm flex items-start gap-3 transition-colors ${optionStyle}`}
                    >
                      <span className="h-5 w-5 rounded-md border flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 border-slate-300 dark:border-slate-700">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  )
                })}
              </div>

              {/* Action & Feedback */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {!isSubmitted ? (
                  <Button
                    size="sm"
                    onClick={() => handleCheckAnswer(q)}
                    disabled={chosenIndex === undefined}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 rounded-lg ml-auto"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" />
                          Correct (+{q.marks} XP)
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                          <XCircle className="h-4 w-4" />
                          Incorrect
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAuthGate(true)}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 ml-auto"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      View Step-by-Step AI Breakdown
                    </button>
                  </>
                )}
              </div>

              {/* Snippet preview */}
              {isSubmitted && q.explanationSnippet && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800">
                  <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
                    Key Concept Note:
                  </div>
                  {q.explanationSnippet}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Conversion Banner: Claim ₹20 Pass Credit & Full Report */}
      <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-100 border border-white/20">
            <Zap className="h-3.5 w-3.5 text-amber-300" />
            Limited Offer: Day-1 Learning Grant
          </div>

          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
            Claim Your ₹20 Free Diagnostic Credit & Personalized Growth Plan
          </h3>

          <p className="text-sm text-blue-100 leading-relaxed">
            Save your progress, unlock detailed step-by-step solutions for all {questions.length} questions, and access unlimited adaptive practice across CBSE & ICSE syllabus.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link href="/auth/register?referral=organic_seo">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-lg shadow-amber-400/20">
                Unlock All Solutions Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>

            <Link href="/academic">
              <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                <BookOpen className="h-4 w-4 mr-2" />
                Explore Full Curriculum
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Step-by-Step AI Solution Modal Gate */}
      {showAuthGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-5">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="h-7 w-7" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Unlock Complete Step-by-Step Solutions
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Create a free account to view detailed video explanations, step-by-step working, and receive a ₹20 learning pass bonus.
              </p>
            </div>

            <div className="space-y-2.5">
              <Link href="/auth/register?redirect=practice" className="w-full block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-xl">
                  Sign Up in 1 Click (Get ₹20 Credit)
                </Button>
              </Link>
              <Link href="/auth/login?redirect=practice" className="w-full block">
                <Button variant="ghost" className="w-full text-slate-600 dark:text-slate-300 text-xs">
                  Already have an account? Sign in
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setShowAuthGate(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Continue practicing first
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
