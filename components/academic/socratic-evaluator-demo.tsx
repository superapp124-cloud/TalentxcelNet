'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  Brain,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sliders,
  ShieldCheck,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  Calendar,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  INTERACTIVE_CHALLENGES,
  InteractiveChallenge,
  InteractiveChallengeOption,
  ErrorType,
  SAMPLE_PARENT_REPORT,
} from '@/lib/academic/class-9-master-data'

export function SocraticEvaluatorDemo() {
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0)
  const challenge: InteractiveChallenge = INTERACTIVE_CHALLENGES[activeChallengeIndex]

  // Simulation state
  const [simValue, setSimValue] = useState<number>(challenge.simulationInitialValue)

  // Interaction / Evaluation state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [submittedOption, setSubmittedOption] = useState<InteractiveChallengeOption | null>(null)
  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1)
  const [showFullSolution, setShowFullSolution] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'challenge' | 'error_dna' | 'parent_briefing'>('challenge')

  // Logged mistake ledger for this session
  const [sessionMistakes, setSessionMistakes] = useState<
    {
      title: string
      type: ErrorType
      time: string
      remedial: string
    }[]
  >([])

  // Calculated force for the Physics simulation
  // F = 800 / (r^2) in nano-Newtons
  const simulatedForce = challenge.simulationType === 'gravity_slider'
    ? (800 / (simValue * simValue)).toFixed(1)
    : (simValue * 6.022 / 12).toFixed(2)

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId)
    setSubmittedOption(null)
  }

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return
    const opt = challenge.options.find((o) => o.id === selectedOptionId)
    if (!opt) return

    setSubmittedOption(opt)

    // Log mistake if incorrect
    if (!opt.isCorrect && opt.errorType) {
      const alreadyLogged = sessionMistakes.some((m) => m.title === opt.diagnosisTitle)
      if (!alreadyLogged) {
        setSessionMistakes((prev) => [
          ...prev,
          {
            title: opt.diagnosisTitle || 'Misconception Detected',
            type: opt.errorType as ErrorType,
            time: 'Just now',
            remedial: opt.remedialPrescription || 'Scheduled for review',
          },
        ])
      }
    }
  }

  const handleReset = () => {
    setSelectedOptionId(null)
    setSubmittedOption(null)
    setActiveHintIndex(-1)
    setShowFullSolution(false)
    setSimValue(challenge.simulationInitialValue)
  }

  const handleSwitchChallenge = (idx: number) => {
    setActiveChallengeIndex(idx)
    setSelectedOptionId(null)
    setSubmittedOption(null)
    setActiveHintIndex(-1)
    setShowFullSolution(false)
    setSimValue(INTERACTIVE_CHALLENGES[idx].simulationInitialValue)
  }

  return (
    <div className="space-y-8" id="socratic-learning-experience">
      {/* 1. Header & Value Proposition */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1.5 text-xs font-black text-sky-300 shadow-sm backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-sky-400 animate-pulse" />
          <span>TalentXcel Academy • Personal Learning. Measurable Progress.</span>
        </div>

        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
          Don’t Just Watch a Lesson.{' '}
          <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
            Master the Concept.
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
          Learn with expert teachers, practise with interactive activities, and use a guided Socratic AI tutor to understand <span className="text-white font-bold">why an answer is right or wrong</span> before taking competitive exams.
        </p>
      </div>

      {/* 2. Four Feature Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto p-1.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-lg">
        {[
          { id: 'challenge', label: 'Interactive Socratic Lab', icon: FlaskConical },
          { id: 'error_dna', label: 'Personal Error DNA', icon: Brain },
          { id: 'parent_briefing', label: 'Parent Intelligence Digest', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.id === 'error_dna' && sessionMistakes.length > 0 && (
                <span className="h-5 w-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center ml-1">
                  {sessionMistakes.length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* 3. TAB CONTENT: INTERACTIVE SOCRATIC LAB */}
      {activeTab === 'challenge' && (
        <div className="rounded-3xl border border-sky-500/30 bg-gradient-to-b from-[#091a42]/90 via-[#06122d]/95 to-[#020a1c] p-4 sm:p-7 lg:p-8 shadow-2xl space-y-6 backdrop-blur-xl">
          {/* Challenge Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Select Challenge:</span>
              <div className="flex flex-wrap gap-2">
                {INTERACTIVE_CHALLENGES.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => handleSwitchChallenge(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeChallengeIndex === idx
                        ? 'bg-sky-500 text-slate-950 shadow-sm'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {ch.subjectId === 'physics' ? 'Physics: Gravitation Trap' : 'Chemistry: Mole Concept'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-amber-300 font-bold bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>{challenge.neetJeeWeightage}</span>
            </div>
          </div>

          {/* Dual-Pane Cognitive Layout: Left = Interactive Simulation, Right = Problem & Socratic AI */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Pane: Interactive Simulation & Formula Workbench (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-white/[0.04] p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <Sliders className="h-4 w-4" /> Live Interactive Simulator
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded">
                  F ∝ 1 / r²
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {challenge.simulationPrompt}
              </p>

              {/* Interactive Slider */}
              <div className="space-y-2.5 p-3.5 rounded-xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300">Distance between probes (r):</span>
                  <span className="text-sky-300 font-mono text-sm">{simValue} meters</span>
                </div>

                <input
                  type="range"
                  min={challenge.simulationMin}
                  max={challenge.simulationMax}
                  step={1}
                  value={simValue}
                  onChange={(e) => setSimValue(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-700 rounded-lg"
                />

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>r = 1m (Very Close)</span>
                  <span>r = 10m (Far)</span>
                </div>
              </div>

              {/* Simulated Gauge & Dynamic Visual */}
              <div className="p-4 rounded-xl border border-sky-500/25 bg-gradient-to-br from-sky-950/40 to-slate-950/60 text-center space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                  Measured Gravitational Attraction (Force Gauge)
                </span>
                <div className="text-3xl font-black text-sky-300 font-mono tracking-tight">
                  {simulatedForce} <span className="text-xs font-normal text-slate-400">nN (nano-Newtons)</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Notice: Tripling distance from 2m to 6m drops force from <strong className="text-white">200 nN</strong> to <strong className="text-emerald-400">22.2 nN</strong> (divided by 9, not 3!).
                </div>
              </div>

              {/* Concept Recap Card */}
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-400/20 text-xs text-slate-300 space-y-1">
                <span className="font-bold text-white block">Key Curriculum Rule:</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {challenge.conceptOverview}
                </p>
              </div>
            </div>

            {/* Right Pane: Question, Socratic AI Tutor & Feedback (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-sky-400/30 text-sky-300 text-[11px]">
                    {challenge.badge}
                  </Badge>
                  <span className="text-[11px] text-slate-400">• Try without registering</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {challenge.questionStem}
                </h3>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                {challenge.options.map((opt, idx) => {
                  const isSelected = selectedOptionId === opt.id
                  const isSubmitted = submittedOption?.id === opt.id
                  const letter = String.fromCharCode(65 + idx)

                  let stateClass = 'border-white/15 bg-white/[0.03] text-slate-200 hover:border-sky-400/40 hover:bg-white/[0.06]'
                  if (isSelected && !submittedOption) {
                    stateClass = 'border-sky-400 bg-sky-500/15 text-white ring-2 ring-sky-400/30'
                  } else if (isSubmitted) {
                    stateClass = opt.isCorrect
                      ? 'border-emerald-500 bg-emerald-500/20 text-white ring-2 ring-emerald-500/40'
                      : 'border-rose-500 bg-rose-500/20 text-white ring-2 ring-rose-500/40'
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${stateClass}`}
                    >
                      <span className="h-6 w-6 rounded-md bg-white/10 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {letter}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">
                        {opt.text}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Actions: Submit, Progressive Hints, Reset */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOptionId}
                    className="w-full sm:w-auto font-extrabold text-xs sm:text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-110 text-white rounded-xl h-11 sm:h-10 px-5 shadow-md gap-1.5 disabled:opacity-50 cursor-pointer justify-center"
                  >
                    Submit Answer for AI Evaluation <ArrowRight className="h-3.5 w-3.5" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="w-full sm:w-auto border-white/20 text-slate-300 hover:bg-white/10 rounded-xl h-11 sm:h-10 px-3 text-xs gap-1.5 cursor-pointer justify-center"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </Button>
                </div>

                <button
                  onClick={() => {
                    if (activeHintIndex < challenge.hints.length - 1) {
                      setActiveHintIndex((prev) => prev + 1)
                    } else {
                      setShowFullSolution(true)
                    }
                  }}
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  {activeHintIndex === -1
                    ? 'Need a Socratic Hint?'
                    : activeHintIndex < challenge.hints.length - 1
                    ? `Next Hint (${activeHintIndex + 2}/${challenge.hints.length})`
                    : 'Show Full Solution'}
                </button>
              </div>

              {/* Active Progressive Hint Reveal */}
              {activeHintIndex >= 0 && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-xs text-amber-200 space-y-1 animate-in fade-in">
                  <span className="font-extrabold text-amber-300 block flex items-center gap-1.5">
                    <Brain className="h-3.5 w-3.5 text-amber-400" /> Socratic Guided Thinking:
                  </span>
                  <p className="leading-relaxed font-medium">
                    {challenge.hints[activeHintIndex]}
                  </p>
                </div>
              )}

              {/* SUPER AI SOCRATIC EVALUATION RESULT BOX */}
              {submittedOption && (
                <div
                  className={`p-4 sm:p-5 rounded-2xl border space-y-3 animate-in fade-in ${
                    submittedOption.isCorrect
                      ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-100'
                      : 'border-rose-500/50 bg-rose-950/40 text-rose-100'
                  }`}
                >
                  {/* Result Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-black text-sm sm:text-base">
                      {submittedOption.isCorrect ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                          <span className="text-emerald-300">
                            {submittedOption.diagnosisTitle}
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
                          <span className="text-rose-300">
                            Error Diagnosed: {submittedOption.diagnosisTitle}
                          </span>
                        </>
                      )}
                    </div>

                    {!submittedOption.isCorrect && submittedOption.errorType && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {submittedOption.errorType.replace('_', ' ')} Error
                      </span>
                    )}
                  </div>

                  {/* Diagnosis Details */}
                  <p className="text-xs text-slate-200 leading-relaxed font-normal">
                    {submittedOption.diagnosisDetail}
                  </p>

                  {/* The Socratic Question (Never reveals answer if wrong!) */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1 text-xs">
                    <span className="font-bold text-sky-300 flex items-center gap-1.5">
                      <Brain className="h-3.5 w-3.5 text-sky-400" />
                      {submittedOption.isCorrect ? 'Mastery Follow-Up:' : 'Socratic Reflection Question:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed italic">
                      &ldquo;{submittedOption.socraticPrompt}&rdquo;
                    </p>
                  </div>

                  {/* Remedial Prescription Log */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-400 border-t border-white/10">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Calendar className="h-3 w-3 text-sky-400" />
                      <strong>Prescription:</strong> {submittedOption.remedialPrescription}
                    </span>
                    {!submittedOption.isCorrect && (
                      <button
                        onClick={() => setActiveTab('error_dna')}
                        className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
                      >
                        View in Personal Error DNA Bank →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Full Solution (Optional Reveal) */}
              {showFullSolution && (
                <div className="p-4 rounded-xl bg-slate-900 border border-white/20 text-xs text-slate-300 space-y-2 animate-in fade-in">
                  <span className="font-bold text-white block">Full Analytical Solution:</span>
                  <pre className="whitespace-pre-line font-mono text-[11px] text-slate-300 leading-relaxed">
                    {challenge.fullSolution}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: PERSONAL ERROR DNA BANK */}
      {activeTab === 'error_dna' && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500">
                <Brain className="h-4 w-4" /> Personal Error DNA & Revision Scheduler
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                Turning Mistakes into Permanent Mastery
              </h3>
              <p className="text-xs text-muted-foreground">
                Unlike traditional coaching where mistakes are forgotten after checking an answer key, TalentXcel categorizes every slip and automatically schedules targeted re-testing.
              </p>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveTab('challenge')}
              className="font-bold text-xs gap-1.5"
            >
              Back to Challenge Arena
            </Button>
          </div>

          {/* 4 Error Taxonomy Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                type: 'Conceptual Misunderstanding',
                desc: 'Confusion about fundamental laws of physics/chemistry.',
                color: 'border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400',
                count: sessionMistakes.filter((m) => m.type === 'conceptual').length + 1,
              },
              {
                type: 'Calculation & Algebraic Slip',
                desc: 'Dropped negative sign, exponent error, or arithmetic slip.',
                color: 'border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400',
                count: sessionMistakes.filter((m) => m.type === 'calculation').length,
              },
              {
                type: 'Unit Conversion Trap',
                desc: 'Forgot to convert grams to kg, or cm to meters.',
                color: 'border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400',
                count: sessionMistakes.filter((m) => m.type === 'unit_conversion').length + 1,
              },
              {
                type: 'Question-Reading Bias',
                desc: 'Overlooked “NOT true”, missed constituent vs molecule.',
                color: 'border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400',
                count: sessionMistakes.filter((m) => m.type === 'reading_trap').length,
              },
            ].map((cat) => (
              <div key={cat.type} className={`p-4 rounded-2xl border ${cat.color} space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">{cat.type}</span>
                  <span className="h-6 w-6 rounded-full bg-background border text-xs font-bold flex items-center justify-center text-foreground">
                    {cat.count}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Active Spaced-Repetition Queue */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-extrabold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Active Revision Queue (Spaced Repetition Schedule)
            </h4>

            <div className="divide-y rounded-2xl border bg-muted/20">
              {[
                {
                  skill: 'Inverse-Square Distance Scaling in Gravitation (PHY-9-03)',
                  type: 'Conceptual Misunderstanding',
                  trigger: 'Answered Option A (divided linearly by 3 instead of 9)',
                  scheduledDate: 'Scheduled: Tuesday, 6:00 PM (3-Day Gap)',
                  status: 'Pending Revision',
                },
                {
                  skill: 'Molar Mass vs Total Constituent Atoms in CO₂ (CHE-9-02)',
                  type: 'Unit / Counting Trap',
                  trigger: 'Forgot to multiply molecules by atomicity (3 atoms/molecule)',
                  scheduledDate: 'Scheduled: Wednesday, 7:15 PM (4-Day Gap)',
                  status: 'Scheduled Lab',
                },
              ].map((item) => (
                <div key={item.skill} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-foreground block">{item.skill}</span>
                    <span className="text-muted-foreground block">{item.trigger}</span>
                    <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                      Category: {item.type}
                    </span>
                  </div>

                  <div className="text-left sm:text-right shrink-0 space-y-1">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-[11px] block sm:inline-block">
                      {item.scheduledDate}
                    </span>
                    <span className="text-[10px] text-muted-foreground block">
                      Target: Retest under 60-second timer
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT: PARENT INTELLIGENCE DIGEST */}
      {activeTab === 'parent_briefing' && (
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" /> Transparent Sunday Parent AI Briefing
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                No Guesswork for Parents
              </h3>
              <p className="text-xs text-muted-foreground">
                Every Sunday at 6 PM, Super AI delivers a transparent, data-grounded briefing covering attendance, practice minutes, verified mastery, and exact revision focus.
              </p>
            </div>

            <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs">
              Sample Report: Week 6
            </Badge>
          </div>

          {/* Metrics Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border bg-muted/20 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase text-muted-foreground block">Live Attendance</span>
              <span className="text-2xl font-black text-foreground">100%</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block">3 of 3 classes</span>
            </div>

            <div className="p-4 rounded-2xl border bg-muted/20 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase text-muted-foreground block">Active Problem Solving</span>
              <span className="text-2xl font-black text-foreground">185 mins</span>
              <span className="text-[10px] text-muted-foreground block">3.1 hours logged</span>
            </div>

            <div className="p-4 rounded-2xl border bg-muted/20 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase text-muted-foreground block">Mastered Concepts</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">3 Topics</span>
              <span className="text-[10px] text-muted-foreground block">&gt;90% accuracy</span>
            </div>

            <div className="p-4 rounded-2xl border bg-muted/20 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase text-muted-foreground block">Active Focus Gaps</span>
              <span className="text-2xl font-black text-amber-500">2 Items</span>
              <span className="text-[10px] text-muted-foreground block">Re-test scheduled</span>
            </div>
          </div>

          {/* Mastered vs Need Attention Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Mastered Skills */}
            <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
              <h4 className="font-extrabold text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Verified Mastered Concepts This Week
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {SAMPLE_PARENT_REPORT.masteredSkills.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Active Gaps */}
            <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-3">
              <h4 className="font-extrabold text-sm text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> Active Learning Gaps Under Revision
              </h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                {SAMPLE_PARENT_REPORT.activeGapsUnderRevision.map((gap) => (
                  <div key={gap.skill} className="p-2.5 rounded-xl bg-background border space-y-1">
                    <span className="font-bold text-foreground block">{gap.skill}</span>
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-muted-foreground">
                      <span>Detected: {gap.detectedOn}</span>
                      <span className="font-semibold text-primary">{gap.scheduledRetest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mentor Feedback & Family Dinner Discussion Prompt */}
          <div className="p-5 rounded-2xl border bg-muted/30 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Users className="h-4 w-4" />
              <span>Academic Mentor Observation for {SAMPLE_PARENT_REPORT.learnerName}:</span>
            </div>
            <p className="text-muted-foreground leading-relaxed italic">
              &ldquo;{SAMPLE_PARENT_REPORT.mentorNote}&rdquo;
            </p>

            <div className="pt-2 border-t text-[11px] text-foreground font-medium flex items-start gap-2 bg-primary/5 p-3 rounded-xl border border-primary/20">
              <span className="font-black text-primary shrink-0">Parent Tip:</span>
              <span>{SAMPLE_PARENT_REPORT.parentDiscussionPrompt}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
