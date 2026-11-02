'use client'

import React from 'react'
import { HeartCrack, RotateCcw, Home, Sparkles } from 'lucide-react'
import type { GameSubjectConfig, GameChapterConfig } from '@/lib/game-engine/types'

interface GameOverModalProps {
  isOpen: boolean
  subject: GameSubjectConfig
  chapter: GameChapterConfig
  onRevive: () => void
  onReplay: () => void
  onHome: () => void
}

export function GameOverModal({
  isOpen,
  subject,
  chapter,
  onRevive,
  onReplay,
  onHome,
}: GameOverModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950 border-2 border-rose-500/40 rounded-3xl p-6 shadow-2xl text-white text-center space-y-4">
        {/* Cracked Heart Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/30 animate-pulse">
          <HeartCrack className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-black text-white">Out of Hearts!</h2>
          <p className="text-xs text-rose-200">
            You made too many attempts in this challenge.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
          <p>
            Recharge your hearts or replay the mission to master this concept.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onRevive}
            className="w-full h-11 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Refill 4 Hearts (Instant)</span>
          </button>

          <button
            type="button"
            onClick={onReplay}
            className="w-full h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Chapter</span>
          </button>

          <button
            type="button"
            onClick={onHome}
            className="w-full h-10 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Game Hub</span>
          </button>
        </div>
      </div>
    </div>
  )
}
