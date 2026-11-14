'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  Trophy,
  HelpCircle,
  Zap,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface OptionItem {
  id: string
  text: string
}

interface InteractiveQuestionViewProps {
  questionId: string
  questionText: string
  options: OptionItem[]
  correctOptionId: string
  marks: number
  difficulty: string
  conceptSummary: string
  solutionSteps: string[]
  keyFormula?: string
  prevQuestionId?: string
  nextQuestionId?: string
  chapterPracticeUrl: string
}

export function InteractiveQuestionView({
  questionId,
  questionText,
  options,
  correctOptionId,
  marks,
  difficulty,
  conceptSummary,
  solutionSteps,
  keyFormula,
  prevQuestionId,
  nextQuestionId,
  chapterPracticeUrl,
}: InteractiveQuestionViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showGate, setShowGate] = useState(false)

  const isCorrect = isSubmitted && selectedId === correctOptionId

  const handleCheck = () => {
    if (!selectedId) return
    setIsSubmitted(true)
  }

  return (
    <div className="space-y-6">
      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Question Problem</span>
            <Badge variant="outline" className="text-[10px] capitalize font-medium">
              {difficulty}
            </Badge>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
            +{marks} Marks
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
          {questionText}
        </h2>

        {/* Multiple Choice Options */}
        <div className="grid grid-cols-1 gap-3">
          {options.map((opt, idx) => {
            const isSelected = selectedId === opt.id
            let style =
              'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'

            if (isSelected && !isSubmitted) {
              style =
                'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-semibold ring-2 ring-blue-500/20'
            }

            if (isSubmitted) {
              if (opt.id === correctOptionId) {
                style =
                  'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold'
              } else if (isSelected && !isCorrect) {
                style =
                  'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100'
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => !isSubmitted && setSelectedId(opt.id)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-2xl border text-sm flex items-start gap-3.5 transition-all ${style}`}
              >
                <span className="h-6 w-6 rounded-lg border flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-snug pt-0.5">{opt.text}</span>
              </button>
            )
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {!isSubmitted ? (
            <Button
              onClick={handleCheck}
              disabled={!selectedId}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-xl ml-auto text-xs"
            >
              Check Answer
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" /> Correct Answer! (+{marks} XP)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                    <XCircle className="h-4 w-4" /> Incorrect Option
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGate(true)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 hover:bg-blue-50"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Unlock Step-by-Step AI Proof
                </Button>

                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `Can you solve this question? "${questionText.slice(0, 90)}..." Try it here: https://talentxcel.net/question/${questionId}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5"
                  >
                    <span>Share on WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Free Concept Summary Box (Always Visible for SEO & Basic Understanding) */}
      <div className="p-6 rounded-3xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <HelpCircle className="h-4 w-4 text-blue-500" />
          Key Concept & Method Summary
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {conceptSummary}
        </p>
        {keyFormula && (
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Governing Formula / Rule:</span>
            <code className="text-xs bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-blue-600 dark:text-blue-400 inline-block">
              {keyFormula}
            </code>
          </div>
        )}
      </div>

      {/* The Solution Gate (Step-by-Step Proof Gated Behind Academic Pass / Sign-up) */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
        <div className="space-y-4 filter blur-[2px] opacity-40 pointer-events-none select-none">
          <h3 className="text-base font-bold text-slate-800">Complete Step-by-Step Mathematical Derivation</h3>
          <div className="space-y-2 text-xs">
            {solutionSteps.map((s, i) => (
              <p key={i} className="p-2.5 rounded bg-slate-50 dark:bg-slate-800">
                Step {i + 1}: {s}
              </p>
            ))}
          </div>
        </div>

        {/* Overlay CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 text-center space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
            <Lock className="h-6 w-6" />
          </div>

          <div className="max-w-md">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Unlock Verified Step-by-Step Solutions
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Sign up in 1 click to view the complete proof, access 40,000+ chapter questions, and claim ₹20 free diagnostic credit.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/auth/register?referral=question_seo">
              <Button className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 text-xs shadow-md shadow-amber-400/20">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Sign Up & Unlock (₹20 Bonus)
              </Button>
            </Link>

            <Link href={chapterPracticeUrl}>
              <Button variant="outline" className="text-xs font-semibold">
                <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                Full Chapter Test
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Between Sibling Questions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        {prevQuestionId ? (
          <Link href={`/question/${prevQuestionId}`}>
            <Button variant="outline" size="sm" className="text-xs font-semibold gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous Question
            </Button>
          </Link>
        ) : (
          <div />
        )}

        <Link href={chapterPracticeUrl} className="text-xs text-slate-500 hover:text-blue-600 font-semibold">
          Chapter Diagnostic Hub
        </Link>

        {nextQuestionId && (
          <Link href={`/question/${nextQuestionId}`}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold gap-1.5">
              Next Question
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
