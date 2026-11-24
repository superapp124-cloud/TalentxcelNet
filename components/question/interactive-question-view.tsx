'use client'

import React, { useState, useEffect, useRef } from 'react'
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
  Share2,
  Download,
  Check,
  Timer,
  Flame,
  RotateCcw,
  Smartphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'

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
  formulaSheetUrl?: string
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
  formulaSheetUrl,
}: InteractiveQuestionViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showGate, setShowGate] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)

  // 60-Second Viral Speed Challenge Mode
  const [isChallengeActive, setIsChallengeActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [timeSpent, setTimeSpent] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Check URL query param for ?challenge=1 on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('challenge') === '1') {
        startChallenge()
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startChallenge = () => {
    if (isSubmitted) return
    setIsChallengeActive(true)
    setTimeLeft(60)
    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          handleTimeOut()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleTimeOut = () => {
    setIsSubmitted(true)
    setTimeSpent(60)
  }

  const handleCheck = () => {
    if (!selectedId) return
    if (timerRef.current) clearInterval(timerRef.current)
    setTimeSpent(60 - timeLeft)
    setIsSubmitted(true)
  }

  const isCorrect = isSubmitted && selectedId === correctOptionId

  // WhatsApp share generator
  const getWhatsAppShareUrl = (isSpeedRecord = false) => {
    const textSnippet = questionText.length > 80 ? `${questionText.slice(0, 77)}...` : questionText
    let message = ''

    if (isSpeedRecord && isCorrect) {
      message = `⚡ *I solved this in ${timeSpent}s!* 🏆\n"${textSnippet}"\n\nThink you're faster? Take the 60-second challenge here:\n👉 https://talentxcel.net/question/${questionId}?challenge=1\n\n_Sent via TalentXcel Board Prep 2026_`
    } else {
      message = `🚨 *Can you solve this question?* 📚\n"${textSnippet}"\n\nTry solving it here with instant scoring & step-by-step solution:\n👉 https://talentxcel.net/question/${questionId}?challenge=1\n\n_Sent via TalentXcel Board Prep 2026_`
    }

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`
  }

  return (
    <div className="space-y-6">
      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        {/* Viral Challenge Banner (Always Visible to 100% of organic search traffic) */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 rounded-2xl border border-blue-200/80 dark:border-blue-900/60 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🔥</span>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Study Group Viral Challenge
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                Can your classmates solve this in under 60 seconds? 80% get it wrong.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isChallengeActive && !isSubmitted ? (
              <Button
                size="sm"
                variant="outline"
                onClick={startChallenge}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800 hover:bg-indigo-50 gap-1.5"
              >
                <Timer className="h-3.5 w-3.5" />
                Start 60s Speed Test
              </Button>
            ) : null}

            <a href={getWhatsAppShareUrl()} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-sm">
                <Share2 className="h-3.5 w-3.5" />
                Share on WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* 60-Second Challenge Active Header & Progress Bar */}
        {isChallengeActive && !isSubmitted && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-200">
              <span className="flex items-center gap-1.5">
                <Timer className="h-4 w-4 text-amber-600 animate-pulse" />
                60-Second Speed Challenge Active
              </span>
              <span className="text-sm font-mono">{timeLeft}s remaining</span>
            </div>
            <div className="w-full bg-amber-200 dark:bg-amber-900/60 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft > 20 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${(timeLeft / 60) * 100}%` }}
              />
            </div>
          </div>
        )}

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <div className="space-y-0.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" /> Correct Answer! (+{marks} XP)
                    </span>
                    {timeSpent > 0 && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                        ⏱️ Solved in {timeSpent}s — Faster than 91% of peers!
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                      <XCircle className="h-4 w-4" /> Incorrect Option
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                      Correct: Option {options.find((o) => o.id === correctOptionId)?.text}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGate(true)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 hover:bg-blue-50"
                >
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Unlock Step-by-Step AI Proof
                </Button>

                <a href={getWhatsAppShareUrl(isCorrect)} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>{isCorrect ? 'Share Score to WhatsApp' : 'Challenge Friends'}</span>
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

        {formulaSheetUrl && (
          <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Studying for Pre-Boards? Get all chapter formulas:
            </span>
            <Link href={formulaSheetUrl}>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                1-Page Formula Cheat-Sheet (Free PDF)
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* The Solution Gate (Step-by-Step Proof Gated Behind Academic Pass / Sign-up) */}
      {isUnlocked ? (
        <div className="rounded-3xl border-2 border-emerald-500/50 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-sm animate-in fade-in">
          <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-950 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Verified Step-by-Step Mathematical Derivation
              </h3>
            </div>
            <Badge className="bg-emerald-600 text-white text-xs font-bold">
              ✓ Unlocked
            </Badge>
          </div>
          <div className="space-y-3 text-sm">
            {solutionSteps.map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-800">
                <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">Step {i + 1}:</span>
                <span className="text-slate-800 dark:text-slate-200">{s}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8">
          <div className="space-y-4 filter blur-[2.5px] opacity-35 pointer-events-none select-none">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-white via-white/85 to-transparent dark:from-slate-900 dark:via-slate-900/85 text-center space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
              <Lock className="h-6 w-6" />
            </div>

            <div className="max-w-md space-y-1">
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Unlock Complete Step-by-Step Proof
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Choose instant 1-click UPI pass or create a free account to unlock answers and claim ₹20 diagnostic credit.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg">
              {/* Instant UPI Purchase Option */}
              <Button
                onClick={() => setCheckoutProductId('prod_assess_preboard_49')}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-2.5 text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Instant UPI Unlock: ₹49 Pass</span>
              </Button>

              {/* Free Account Option */}
              <Link href="/auth/register?referral=question_seo" className="w-full sm:w-auto">
                <Button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-bold px-5 text-xs">
                  Free Sign Up (Get ₹20 Credit)
                </Button>
              </Link>
            </div>

            <p className="text-[11px] text-slate-400">
              ⚡ Instant PhonePe, GPay, Paytm & UPI access • 30-Day validity
            </p>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar on Mobile for Instant UPI Unlock & Sharing */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Exam Pass</span>
          <span className="text-xs font-black text-slate-900 dark:text-white">₹49 All Solutions</span>
        </div>

        <div className="flex items-center gap-2">
          <a href={getWhatsAppShareUrl(isCorrect)} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 h-9 px-2.5">
              <Share2 className="h-4 w-4" />
            </Button>
          </a>

          <Button
            size="sm"
            onClick={() => setCheckoutProductId('prod_assess_preboard_49')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 px-4 gap-1.5 shadow-md"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Unlock ₹49</span>
          </Button>
        </div>
      </div>

      <RazorpayCheckoutModal
        isOpen={Boolean(checkoutProductId)}
        onClose={() => setCheckoutProductId(null)}
        productId={checkoutProductId}
        onSuccess={() => {
          setIsUnlocked(true)
          setCheckoutProductId(null)
        }}
      />

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
