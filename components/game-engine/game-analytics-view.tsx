'use client'

import React, { useState } from 'react'
import {
  Trophy,
  Star,
  Flame,
  Coins,
  Heart,
  TrendingUp,
  Brain,
  CheckCircle2,
  AlertCircle,
  Users,
  BookOpen,
  Share2,
  Calendar,
  Sparkles,
  Award,
  Clock,
  Target,
} from 'lucide-react'

export function GameAnalyticsView() {
  const [activePersona, setActivePersona] = useState<'student' | 'parent' | 'teacher'>('student')

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xl space-y-6">
      {/* Persona Selector Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Gamified Learning Telemetry &amp; Insights</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time analytics for students, parents, and educators.
          </p>
        </div>

        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActivePersona('student')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              activePersona === 'student'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Student Workspace
          </button>
          <button
            type="button"
            onClick={() => setActivePersona('parent')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              activePersona === 'parent'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Parent Insights
          </button>
          <button
            type="button"
            onClick={() => setActivePersona('teacher')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              activePersona === 'teacher'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Teacher Console
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 1. STUDENT VIEW */}
      {/* ------------------------------------------------------------------- */}
      {activePersona === 'student' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-black">
                <Coins className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-[10px] text-amber-800 dark:text-amber-300 font-bold uppercase">Total XP</p>
                <p className="text-lg font-black text-amber-900 dark:text-amber-200">1,480 XP</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-600 flex items-center justify-center font-black">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              </div>
              <div>
                <p className="text-[10px] text-orange-800 dark:text-orange-300 font-bold uppercase">Daily Streak</p>
                <p className="text-lg font-black text-orange-900 dark:text-orange-200">4 Days 🔥</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 flex items-center justify-center font-black">
                <Award className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-[10px] text-blue-800 dark:text-blue-300 font-bold uppercase">Current Rank</p>
                <p className="text-lg font-black text-blue-900 dark:text-blue-200">Lvl 3 Master</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-600 flex items-center justify-center font-black">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <div>
                <p className="text-[10px] text-rose-800 dark:text-rose-300 font-bold uppercase">Health</p>
                <p className="text-lg font-black text-rose-900 dark:text-rose-200">4 / 4 Hearts</p>
              </div>
            </div>
          </div>

          {/* Subject Mastery Progress Bars */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Subject Adventure Mastery
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Mathematics (Math Quest)</span>
                  <span className="text-blue-600">88%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Science (Science Lab)</span>
                  <span className="text-emerald-600">92%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>English (Word Arena)</span>
                  <span className="text-amber-600">95%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Coding (Code Builder)</span>
                  <span className="text-cyan-600">80%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 2. PARENT VIEW */}
      {/* ------------------------------------------------------------------- */}
      {activePersona === 'parent' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                Weekly Learning Consistency: Exceptional (Top 5% in Cohort)
              </h4>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                Your child completed 12 gamified learning missions over the past 7 days across Mathematics, Science, and Coding, averaging 22 minutes per session with 91.2% accuracy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Strengths Detected
              </p>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                <li>• Excellent retention of Cell Organelles &amp; Functions (100% correct)</li>
                <li>• Fluent simple past &amp; present perfect verb tenses</li>
                <li>• High speed in logic puzzle rotations (&lt; 4.2 seconds per challenge)</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 space-y-2">
              <p className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                Areas for Gentle Revision
              </p>
              <ul className="space-y-1 text-rose-800 dark:text-rose-300">
                <li>• Subtraction of negative integers: occasional sign inversion errors</li>
                <li>• Python loop edge conditions in nested iterations</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 3. TEACHER VIEW */}
      {/* ------------------------------------------------------------------- */}
      {activePersona === 'teacher' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
            <div>
              <h4 className="text-xs font-bold text-purple-900 dark:text-purple-200">
                Class 10 CBSE — Cohort Mastery Overview (42 Enrolled Students)
              </h4>
              <p className="text-[11px] text-purple-700 dark:text-purple-300">
                Average Completion: 84% • Class Accuracy: 89.4%
              </p>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
            >
              Assign Next Mission
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
            <p className="font-bold text-slate-900 dark:text-white">Chapter-wise Class Completion Rates</p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
                  <span>Mathematics: Integers &amp; Quadratic Roots</span>
                  <span>38 / 42 Students (90%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-0.5">
                  <span>Science: Plant Cell Organelles &amp; Optics</span>
                  <span>40 / 42 Students (95%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
