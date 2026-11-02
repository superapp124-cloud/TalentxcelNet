'use client'

import React from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Heart,
  Coins,
  Sparkles,
  Calculator,
  FlaskConical,
  BookOpen,
  Compass,
  Code2,
  Puzzle,
  Award,
} from 'lucide-react'
import { soundEngine } from '@/lib/game-engine/sound-engine'
import type { GameSubjectConfig, GameChapterConfig } from '@/lib/game-engine/types'
import { TalentXcelEmblem } from '@/components/brand/logo'

interface GameHeaderProps {
  subject: GameSubjectConfig
  chapter: GameChapterConfig
  currentQuestion: number
  totalQuestions: number
  xp: number
  hearts: number
  maxHearts: number
  streak: number
  isMuted: boolean
  onToggleMute: () => void
  onExit: () => void
}

export function GameHeader({
  subject,
  chapter,
  currentQuestion,
  totalQuestions,
  xp,
  hearts,
  maxHearts,
  streak,
  isMuted,
  onToggleMute,
  onExit,
}: GameHeaderProps) {
  const getSubjectIcon = () => {
    switch (subject.code) {
      case 'math':
        return <Calculator className="w-4 h-4 text-blue-400" />
      case 'science':
        return <FlaskConical className="w-4 h-4 text-emerald-400" />
      case 'english':
        return <BookOpen className="w-4 h-4 text-amber-400" />
      case 'social_studies':
        return <Compass className="w-4 h-4 text-emerald-400" />
      case 'coding':
        return <Code2 className="w-4 h-4 text-cyan-400" />
      case 'reasoning':
        return <Puzzle className="w-4 h-4 text-purple-400" />
      case 'general_knowledge':
        return <Award className="w-4 h-4 text-yellow-400" />
      case 'hindi':
        return <Sparkles className="w-4 h-4 text-orange-400" />
      default:
        return <Sparkles className="w-4 h-4 text-blue-400" />
    }
  }

  const progressPercentage = Math.min(100, Math.round((currentQuestion / totalQuestions) * 100))

  return (
    <header className="w-full bg-[#0a0f1d]/90 backdrop-blur-xl border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-white">
      {/* Top Bar: Navigation, Brand, Stats & Sound */}
      <div className="flex items-center justify-between gap-2 max-w-5xl mx-auto">
        {/* Left: Back button & TalentXcel Logo */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExit}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white/90"
            aria-label="Exit Game Arena"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <Link href="/" className="flex items-center gap-1.5 group">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-[10px] font-black text-white shadow-xs">
              TX
            </div>
            <span className="hidden xs:inline-block font-bold text-xs tracking-tight text-white group-hover:text-blue-400 transition-colors">
              TalentXcel<span className="text-[10px] text-blue-400">®</span>
            </span>
          </Link>
        </div>

        {/* Center: Subject Title & Chapter */}
        <div className="flex items-center gap-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10">
          <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center">
            {getSubjectIcon()}
          </div>
          <div className="text-left">
            <p className="text-[11px] font-extrabold text-white leading-tight truncate max-w-[110px] sm:max-w-[160px]">
              {subject.title}
            </p>
            <p className="text-[9px] text-slate-400 leading-tight truncate max-w-[110px] sm:max-w-[160px]">
              {chapter.title} • Lvl {chapter.level}
            </p>
          </div>
        </div>

        {/* Right: XP Counter, Hearts & Sound */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* XP Pill */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-black text-xs shadow-inner">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span>{xp} XP</span>
          </div>

          {/* Hearts Meter */}
          <div className="flex items-center gap-0.5 px-2 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-black text-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>{hearts}</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white/80"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Bottom Progress Bar: Q 4/10 */}
      <div className="max-w-5xl mx-auto mt-2 flex items-center gap-2">
        <span className="text-[10px] font-bold text-slate-300 shrink-0 font-mono">
          Q {currentQuestion}/{totalQuestions}
        </span>
        <div className="relative flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 transition-all duration-300 shadow-[0_0_10px_#22d3ee]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {streak > 1 && (
          <span className="text-[10px] font-extrabold text-orange-400 bg-orange-500/20 px-1.5 py-0.2 rounded-full border border-orange-500/40 animate-pulse">
            🔥 {streak}x
          </span>
        )}
      </div>
    </header>
  )
}
