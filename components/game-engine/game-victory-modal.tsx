'use client'

import React from 'react'
import { Trophy, Star, Sparkles, ArrowRight, RotateCcw, Home, Award } from 'lucide-react'
import type { GameSubjectConfig, GameChapterConfig } from '@/lib/game-engine/types'

interface GameVictoryModalProps {
  isOpen: boolean
  subject: GameSubjectConfig
  chapter: GameChapterConfig
  totalXp: number
  accuracyPercentage: number
  streakMax: number
  onPlayNext: () => void
  onReplay: () => void
  onHome: () => void
}

export function GameVictoryModal({
  isOpen,
  subject,
  chapter,
  totalXp,
  accuracyPercentage,
  streakMax,
  onPlayNext,
  onReplay,
  onHome,
}: GameVictoryModalProps) {
  if (!isOpen) return null

  const starsCount = accuracyPercentage >= 90 ? 3 : accuracyPercentage >= 60 ? 2 : 1

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in zoom-in-95 duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 border-2 border-amber-400/50 rounded-3xl p-6 shadow-2xl text-white text-center space-y-5">
        {/* Glowing Trophy Crown */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/40 ring-4 ring-white/20 animate-bounce duration-1000">
          <Trophy className="w-10 h-10 text-amber-950" />
          <span className="absolute -top-2 -right-2 text-2xl">✨</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">
            Victory Achieved!
          </h2>
          <p className="text-xs text-amber-200 font-medium">
            {chapter.gameTitle} Completed
          </p>
        </div>

        {/* 3-Star Rating */}
        <div className="flex items-center justify-center gap-3">
          {[1, 2, 3].map((starIndex) => (
            <div
              key={starIndex}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 ${
                starIndex <= starsCount
                  ? 'bg-amber-400 text-amber-950 scale-110 shadow-amber-500/40'
                  : 'bg-slate-800 text-slate-600 border border-slate-700'
              }`}
            >
              <Star className="w-7 h-7 fill-current" />
            </div>
          ))}
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Accuracy</p>
            <p className="font-black text-emerald-400 text-base">{accuracyPercentage}%</p>
          </div>
          <div className="border-x border-white/10">
            <p className="text-[10px] text-slate-400 uppercase font-bold">XP Gained</p>
            <p className="font-black text-amber-400 text-base">+{totalXp}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Combo Streak</p>
            <p className="font-black text-orange-400 text-base">{streakMax}x 🔥</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onPlayNext}
            className="w-full h-11 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all"
          >
            <span>Play Next Chapter</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onReplay}
              className="flex-1 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay</span>
            </button>
            <button
              type="button"
              onClick={onHome}
              className="flex-1 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Game Hub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
