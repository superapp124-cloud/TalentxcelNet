'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Eye,
  Award,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  SSB_WAT_WORDS,
  SSB_SRT_SCENARIOS,
  SSB_PPDT_CARDS,
  SSBWatWord,
  SSBSrtScenario,
  SSBPpdtCard,
} from '@/lib/competitive/ssb-psych-data'

export function SSBPsychSimulator() {
  const [activeTab, setActiveTab] = useState<'wat' | 'srt' | 'ppdt'>('wat')

  // WAT state
  const [watIndex, setWatIndex] = useState(0)
  const [watSeconds, setWatSeconds] = useState(15)
  const [isWatRunning, setIsWatRunning] = useState(false)
  const [showWatOfficerAns, setShowWatOfficerAns] = useState(false)

  // SRT state
  const [srtIndex, setSrtIndex] = useState(0)
  const [showSrtReaction, setShowSrtReaction] = useState(false)

  // PPDT state
  const [ppdtIndex, setPpdtIndex] = useState(0)
  const [ppdtSeconds, setPpdtSeconds] = useState(30)
  const [isPpdtTimerActive, setIsPpdtTimerActive] = useState(false)
  const [showPpdtModel, setShowPpdtModel] = useState(false)

  // WAT Timer
  useEffect(() => {
    if (!isWatRunning) return
    const timer = setInterval(() => {
      setWatSeconds((prev) => {
        if (prev <= 1) {
          // move to next word
          setWatIndex((curr) => (curr + 1) % SSB_WAT_WORDS.length)
          setShowWatOfficerAns(false)
          return 15
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isWatRunning])

  // PPDT Timer
  useEffect(() => {
    if (!isPpdtTimerActive) return
    const timer = setInterval(() => {
      setPpdtSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [isPpdtTimerActive])

  const currentWat = SSB_WAT_WORDS[watIndex]
  const currentSrt = SSB_SRT_SCENARIOS[srtIndex]
  const currentPpdt = SSB_PPDT_CARDS[ppdtIndex]

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('wat')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'wat'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          WAT Simulator (15s Flash)
        </button>
        <button
          onClick={() => setActiveTab('srt')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'srt'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          SRT Situation Reactions
        </button>
        <button
          onClick={() => setActiveTab('ppdt')}
          className={`py-3 px-5 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'ppdt'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          PPDT Picture Perception
        </button>
      </div>

      {/* WAT TAB */}
      {activeTab === 'wat' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-[10px] uppercase font-bold">
                SSB Day-2 Psychology
              </Badge>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Word Association Test (WAT) Drill
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-amber-400 font-mono text-sm font-bold">
                <Timer className="h-4 w-4" />
                {watSeconds}s
              </div>
              <Button
                size="sm"
                variant={isWatRunning ? 'destructive' : 'default'}
                onClick={() => setIsWatRunning(!isWatRunning)}
                className="text-xs font-bold"
              >
                {isWatRunning ? (
                  <>
                    <Pause className="h-3.5 w-3.5 mr-1" /> Pause Flash
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 mr-1" /> Start 15s Cycle
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Flash Word Card */}
          <div className="min-h-[160px] flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-center">
            <span className="text-xs uppercase font-semibold text-slate-400 mb-2">
              Word {watIndex + 1} of {SSB_WAT_WORDS.length}
            </span>
            <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-wide uppercase">
              {currentWat.word}
            </span>
          </div>

          {/* User Practice & Officer Solution */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWatOfficerAns(!showWatOfficerAns)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                {showWatOfficerAns ? 'Hide Model Officer Sentence' : 'Show Recommended Officer Response'}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setWatIndex((curr) => (curr > 0 ? curr - 1 : SSB_WAT_WORDS.length - 1))
                    setWatSeconds(15)
                    setShowWatOfficerAns(false)
                  }}
                  className="text-xs"
                >
                  Prev
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setWatIndex((curr) => (curr + 1) % SSB_WAT_WORDS.length)
                    setWatSeconds(15)
                    setShowWatOfficerAns(false)
                  }}
                  className="text-xs bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Next Word
                </Button>
              </div>
            </div>

            {showWatOfficerAns && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-xs space-y-2">
                <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Model Officer Response:
                </div>
                <p className="text-slate-800 dark:text-slate-200 italic font-medium">
                  &ldquo;{currentWat.officerSentence}&rdquo;
                </p>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
                  Officer Like Quality (OLQ) Projected: {currentWat.olqDemonstrated}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SRT TAB */}
      {activeTab === 'srt' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[10px] uppercase font-bold">
                SSB Day-2 Psychological Battery
              </Badge>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Situation Reaction Test (SRT) Simulator
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Situation {srtIndex + 1} of {SSB_SRT_SCENARIOS.length}
            </span>
          </div>

          {/* Scenario Text */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <span className="text-xs uppercase font-bold text-blue-600 dark:text-blue-400">
              Real Military & Field Situation:
            </span>
            <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
              {currentSrt.situation}
            </p>
          </div>

          {/* Reveal Reaction */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSrtReaction(!showSrtReaction)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                {showSrtReaction ? 'Hide Recommended Action' : 'Reveal Recommended Officer Reaction'}
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSrtIndex((curr) => (curr > 0 ? curr - 1 : SSB_SRT_SCENARIOS.length - 1))
                    setShowSrtReaction(false)
                  }}
                  className="text-xs"
                >
                  Prev
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setSrtIndex((curr) => (curr + 1) % SSB_SRT_SCENARIOS.length)
                    setShowSrtReaction(false)
                  }}
                  className="text-xs bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Next Situation
                </Button>
              </div>
            </div>

            {showSrtReaction && (
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs space-y-2">
                <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-indigo-600" />
                  Recommended Action (Action + Completion):
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {currentSrt.recommendedReaction}
                </p>
                <div className="text-[11px] text-indigo-700 dark:text-indigo-400 font-semibold pt-1">
                  OLQs Highlighted: {currentSrt.olqDemonstrated}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PPDT TAB */}
      {activeTab === 'ppdt' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 text-[10px] uppercase font-bold">
                SSB Stage 1 Screening
              </Badge>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                PPDT (Picture Perception & Description Test) Drill
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-amber-400 font-mono text-sm font-bold">
                <Timer className="h-4 w-4" />
                {ppdtSeconds}s Display
              </div>
              <Button
                size="sm"
                variant={isPpdtTimerActive ? 'destructive' : 'default'}
                onClick={() => {
                  setIsPpdtTimerActive(!isPpdtTimerActive)
                  if (!isPpdtTimerActive && ppdtSeconds === 0) setPpdtSeconds(30)
                }}
                className="text-xs font-bold"
              >
                {isPpdtTimerActive ? 'Pause' : 'Start 30s Observation'}
              </Button>
            </div>
          </div>

          {/* Scenario description & Character Box */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-purple-400">
                Simulated Hazy Slide: {currentPpdt.title}
              </span>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 text-[10px]">
                {ppdtSeconds > 0 ? `${ppdtSeconds}s Remaining` : 'Observation Complete!'}
              </Badge>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              &ldquo;{currentPpdt.scenarioDescription}&rdquo;
            </p>
          </div>

          {/* Character Notation Box */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-center text-xs">
            <div>
              <span className="text-slate-400 text-[10px] block">Hero Age</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {currentPpdt.characterContext.age} yrs
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Gender</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {currentPpdt.characterContext.gender}
              </span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Mood</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {currentPpdt.characterContext.mood} (+)
              </span>
            </div>
          </div>

          {/* Model Officer Story */}
          <div className="space-y-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPpdtModel(!showPpdtModel)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              {showPpdtModel ? 'Hide Model Story' : 'Read Recommended Screening Story'}
            </Button>

            {showPpdtModel && (
              <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-3">
                <div className="font-bold text-blue-900 dark:text-blue-200">
                  Model PPDT Story (Screening-Standard):
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentPpdt.sampleStory}
                </p>
                <div className="pt-2 border-t border-blue-200/50 dark:border-blue-900/50 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-semibold text-slate-500">OLQs Displayed:</span>
                  {currentPpdt.keyOfficerQualities.map((olq, i) => (
                    <Badge key={i} variant="outline" className="text-[10px] bg-white dark:bg-slate-900">
                      {olq}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
