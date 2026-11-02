'use client'

import React from 'react'
import type { GameChallenge, QuestionOption } from '@/lib/game-engine/types'
import { soundEngine } from '@/lib/game-engine/sound-engine'
import { Check, X } from 'lucide-react'

interface QuestionCardProps {
  challenge: GameChallenge
  selectedOptionId: string | null
  eliminatedOptionIds: string[]
  isSubmitted: boolean
  onSelectOption: (optionId: string) => void
}

export function QuestionCard({
  challenge,
  selectedOptionId,
  eliminatedOptionIds,
  isSubmitted,
  onSelectOption,
}: QuestionCardProps) {
  const handleOptionClick = (optionId: string) => {
    if (isSubmitted || eliminatedOptionIds.includes(optionId)) return
    soundEngine.playTap()
    onSelectOption(optionId)
  }

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Question Header & Prompt Box */}
      <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-2">
        <h3 className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
          {challenge.promptHeader}
        </h3>

        {/* Challenge Text / Equation */}
        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
          {challenge.questionText}
        </p>

        {/* Code Snippet Box (for Coding questions) */}
        {challenge.codeSnippet && (
          <div className="mt-2.5 p-3 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-cyan-300 border border-cyan-500/30 overflow-x-auto shadow-inner">
            <pre>{challenge.codeSnippet}</pre>
          </div>
        )}
      </div>

      {/* Answer Options Grid (A, B, C, D) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {challenge.options.map((option: QuestionOption) => {
          const isSelected = selectedOptionId === option.id
          const isEliminated = eliminatedOptionIds.includes(option.id)
          const isCorrect = isSubmitted && option.id === challenge.correctOptionId
          const isWrongSelected = isSubmitted && isSelected && !isCorrect

          let optionStyle =
            'bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800'
          let badgeStyle = 'bg-blue-600 text-white'

          if (isSelected) {
            optionStyle =
              'bg-blue-50 dark:bg-blue-950/70 border-blue-600 dark:border-blue-500 text-blue-950 dark:text-blue-200 ring-2 ring-blue-500/30 shadow-md scale-[1.01]'
            badgeStyle = 'bg-blue-600 text-white'
          }

          if (isSubmitted) {
            if (isCorrect) {
              optionStyle =
                'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 dark:border-emerald-400 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/40 shadow-emerald-500/20'
              badgeStyle = 'bg-emerald-500 text-white'
            } else if (isWrongSelected) {
              optionStyle =
                'bg-rose-50 dark:bg-rose-950/70 border-rose-500 dark:border-rose-400 text-rose-950 dark:text-rose-200 ring-2 ring-rose-500/40'
              badgeStyle = 'bg-rose-500 text-white'
            }
          }

          if (isEliminated) {
            optionStyle = 'opacity-25 pointer-events-none line-through bg-slate-100 dark:bg-slate-900 border-dashed border-slate-300'
            badgeStyle = 'bg-slate-400 text-white'
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isSubmitted || isEliminated}
              onClick={() => handleOptionClick(option.id)}
              className={`w-full min-h-[58px] sm:min-h-[64px] p-2.5 sm:p-3 rounded-2xl border-2 transition-all flex items-center gap-2.5 text-left active:scale-[0.98] ${optionStyle}`}
            >
              {/* Option Letter Badge (A, B, C, D) */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-xs transition-transform ${badgeStyle}`}
              >
                {isSubmitted && isCorrect ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isSubmitted && isWrongSelected ? (
                  <X className="w-4 h-4 stroke-[3]" />
                ) : (
                  option.label
                )}
              </div>

              {/* Option Text */}
              <div className="min-w-0 flex-1">
                <span className="font-bold text-xs sm:text-sm block truncate">
                  {option.text}
                </span>
                {option.subtext && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block line-clamp-1">
                    {option.subtext}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
