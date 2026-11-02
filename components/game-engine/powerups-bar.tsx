'use client'

import React from 'react'
import {
  Lightbulb,
  Shuffle,
  SkipForward,
  Play,
  BookOpen,
  Map,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react'
import { soundEngine } from '@/lib/game-engine/sound-engine'
import type { SubjectCode, PowerupInventory } from '@/lib/game-engine/types'

interface PowerupsBarProps {
  subjectCode: SubjectCode
  powerups: PowerupInventory
  isSubmitted: boolean
  hasSelectedOption: boolean
  accentGradient: string
  onUseHint: () => void
  onUse5050: () => void
  onUseSkip: () => void
  onSubjectGadgetAction: () => void
  onSubmit: () => void
  onNext: () => void
}

export function PowerupsBar({
  subjectCode,
  powerups,
  isSubmitted,
  hasSelectedOption,
  accentGradient,
  onUseHint,
  onUse5050,
  onUseSkip,
  onSubjectGadgetAction,
  onSubmit,
  onNext,
}: PowerupsBarProps) {
  const getSubjectSpecialButton = () => {
    switch (subjectCode) {
      case 'coding':
        return (
          <button
            type="button"
            onClick={onSubjectGadgetAction}
            className="flex-1 min-h-[38px] px-2.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-cyan-400" />
            <span>Run Code</span>
          </button>
        )
      case 'science':
        return (
          <button
            type="button"
            onClick={onSubjectGadgetAction}
            className="flex-1 min-h-[38px] px-2.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>Learn</span>
          </button>
        )
      case 'english':
        return (
          <button
            type="button"
            onClick={onSubjectGadgetAction}
            className="flex-1 min-h-[38px] px-2.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/40 text-purple-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Grammar Tip</span>
          </button>
        )
      case 'social_studies':
        return (
          <button
            type="button"
            onClick={onSubjectGadgetAction}
            className="flex-1 min-h-[38px] px-2.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Map className="w-3.5 h-3.5 text-sky-400" />
            <span>Map View</span>
          </button>
        )
      case 'hindi':
        return (
          <button
            type="button"
            onClick={onSubjectGadgetAction}
            className="flex-1 min-h-[38px] px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>अर्थ जानें</span>
          </button>
        )
      default:
        // Math / General: 50:50 and Skip
        return (
          <>
            <button
              type="button"
              disabled={powerups.fiftyFifty <= 0 || isSubmitted}
              onClick={() => {
                soundEngine.playPowerup()
                onUse5050()
              }}
              className="flex-1 min-h-[38px] px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <Shuffle className="w-3.5 h-3.5 text-purple-400" />
              <span>50:50 ({powerups.fiftyFifty})</span>
            </button>
            <button
              type="button"
              disabled={powerups.skip <= 0 || isSubmitted}
              onClick={() => {
                soundEngine.playPowerup()
                onUseSkip()
              }}
              className="flex-1 min-h-[38px] px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <SkipForward className="w-3.5 h-3.5 text-cyan-400" />
              <span>Skip ({powerups.skip})</span>
            </button>
          </>
        )
    }
  }

  return (
    <div className="w-full space-y-3 pt-2">
      {/* Power-up Pills Row */}
      <div className="flex items-center gap-2">
        {/* Hint Powerup */}
        <button
          type="button"
          disabled={powerups.hint <= 0}
          onClick={() => {
            soundEngine.playPowerup()
            onUseHint()
          }}
          className="flex-1 min-h-[38px] px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Hint ({powerups.hint})</span>
        </button>

        {/* Dynamic Subject Special Action */}
        {getSubjectSpecialButton()}
      </div>

      {/* Primary Submit / Continue Gradient Button */}
      {isSubmitted ? (
        <button
          type="button"
          onClick={() => {
            soundEngine.playTap()
            onNext()
          }}
          className={`w-full h-12 rounded-2xl bg-gradient-to-r ${accentGradient} text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-[0.99] transition-all`}
        >
          <span>Continue Next Challenge</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <button
          type="button"
          disabled={!hasSelectedOption}
          onClick={() => {
            onSubmit()
          }}
          className={`w-full h-12 rounded-2xl text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl transition-all ${
            hasSelectedOption
              ? `bg-gradient-to-r ${accentGradient} hover:shadow-2xl active:scale-[0.99] cursor-pointer ring-2 ring-white/30`
              : 'bg-slate-700/60 text-slate-400 cursor-not-allowed border border-slate-600/30'
          }`}
        >
          <span>Submit Answer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
