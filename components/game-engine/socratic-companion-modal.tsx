'use client'

import React from 'react'
import { Sparkles, Bot, X, CheckCircle2, Lightbulb, BookOpen } from 'lucide-react'
import type { GameChallenge } from '@/lib/game-engine/types'

interface SocraticCompanionModalProps {
  isOpen: boolean
  challenge: GameChallenge
  mode: 'hint' | 'solution' | 'gadget_action'
  onClose: () => void
}

export function SocraticCompanionModal({
  isOpen,
  challenge,
  mode,
  onClose,
}: SocraticCompanionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl text-white space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                <span>Super AI Learning Companion</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </h3>
              <p className="text-[10px] text-slate-400">Contextual Socratic Guidance</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Box */}
        {mode === 'hint' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-300">Socratic Clue</p>
                <p className="text-xs text-amber-100 leading-relaxed">
                  {challenge.socraticClue}
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              💡 Hint: {challenge.hint}
            </p>
          </div>
        )}

        {mode === 'solution' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-emerald-300">Verified Derivation</p>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {challenge.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {mode === 'gadget_action' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-blue-300">Subject Deep-Dive</p>
                <p className="text-xs text-blue-100 leading-relaxed">
                  {challenge.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
        >
          Got It, Resume Challenge!
        </button>
      </div>
    </div>
  )
}
