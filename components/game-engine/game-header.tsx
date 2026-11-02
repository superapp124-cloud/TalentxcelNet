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
        return (
          <span className="font-serif font-black text-blue-300 text-base leading-none">
            π
          </span>
        )
      case 'science':
        return <FlaskConical className="w-5 h-5 text-emerald-300" />
      case 'english':
        return <BookOpen className="w-5 h-5 text-amber-300" />
      case 'social_studies':
        return <Compass className="w-5 h-5 text-sky-300" />
      case 'coding':
        return <Code2 className="w-5 h-5 text-cyan-300" />
      case 'reasoning':
        return <Puzzle className="w-5 h-5 text-purple-300" />
      case 'general_knowledge':
        return <Award className="w-5 h-5 text-yellow-300" />
      case 'hindi':
        return <Sparkles className="w-5 h-5 text-orange-300" />
      default:
        return <Sparkles className="w-5 h-5 text-blue-300" />
    }
  }

  const progressPercentage = Math.min(100, Math.round((currentQuestion / totalQuestions) * 100))

  return (
    <header className="w-full bg-[#070b14]/95 backdrop-blur-xl border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-white">
      <div className="max-w-5xl mx-auto space-y-2.5">
        {/* ================================================================= */}
        {/* TOP STATUS BAR: Back Button + OFFICIAL TALENTXCEL LOGO + XP + HEARTS */}
        {/* ================================================================= */}
        <div className="flex items-center justify-between gap-3">
          {/* Left: Back button & Authentic TalentXcel Brand */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onExit}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center text-white/90"
              aria-label="Exit Game Arena"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Official Brand Logo: Emblem Only */}
            <Link
              href="/"
              className="flex items-center group transition-transform active:scale-[0.95]"
              aria-label="TalentXcel Home"
            >
              <TalentXcelEmblem
                className="h-7 w-7 text-white group-hover:scale-105 transition-transform duration-200"
                pixelSize={28}
              />
            </Link>
          </div>

          {/* Right: XP Counter, Hearts Meter & Audio Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* XP Pill */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-black text-xs shadow-inner">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>{xp} XP</span>
            </div>

            {/* Hearts Meter */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-black text-xs">
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
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* DEDICATED SUBJECT & CHAPTER IDENTITY (MATCHING REFERENCE MOCKUP)  */}
        {/* ================================================================= */}
        <div className="flex items-center justify-between gap-3 pt-0.5">
          <div className="flex items-center gap-2.5">
            {/* Glowing Circular Subject Emblem */}
            <div className="w-9 h-9 rounded-2xl bg-white/10 border border-white/20 shadow-md flex items-center justify-center shrink-0">
              {getSubjectIcon()}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white leading-tight">
                {subject.title}
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-300 leading-tight">
                Chapter: {chapter.title}
              </p>
            </div>
          </div>

          {/* Level Pill */}
          <div className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/30 text-[10px] sm:text-[11px] font-extrabold text-blue-200">
            Level {chapter.level}
          </div>
        </div>

        {/* ================================================================= */}
        {/* GLOWING PROGRESS BAR: Q 4/10                                     */}
        {/* ================================================================= */}
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[10px] font-bold text-slate-300 shrink-0 font-mono">
            Q {currentQuestion}/{totalQuestions}
          </span>
          <div className="relative flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 transition-all duration-300 shadow-[0_0_12px_#22d3ee]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          {streak > 1 && (
            <span className="text-[10px] font-extrabold text-orange-400 bg-orange-500/20 px-1.5 py-0.2 rounded-full border border-orange-500/40 animate-pulse">
              🔥 {streak}x
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
