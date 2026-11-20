'use client'

import React, { useState } from 'react'
import {
  Camera,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Zap,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  FileQuestion,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PRESET_DOUBTS, DoubtPreset, SocraticHint, TwinChallenge, TwinOption } from '@/lib/academic/snap-solve-engine'

export function SnapSolveMentor() {
  const [activePresetIndex, setActivePresetIndex] = useState(0)
  const [problemInputText, setProblemInputText] = useState(PRESET_DOUBTS[0].problemText)
  const [currentPreset, setCurrentPreset] = useState<DoubtPreset>(PRESET_DOUBTS[0])
  const [isScanning, setIsScanning] = useState(false)
  const [hasScanned, setHasScanned] = useState(true)
  const [studentHypothesis, setStudentHypothesis] = useState('')
  const [revealedHintStep, setRevealedHintStep] = useState(1) // 1 to 4
  const [sessionId, setSessionId] = useState<string>('demo_session_1')

  // Twin verification challenge state
  const [selectedTwinOptionId, setSelectedTwinOptionId] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<{
    isCorrect: boolean
    explanation: string
    title: string
    errorType?: string
    masteryBoost: string
  } | null>(null)

  // Switch presets
  const handleSelectPreset = (index: number) => {
    setActivePresetIndex(index)
    const preset = PRESET_DOUBTS[index]
    setCurrentPreset(preset)
    setProblemInputText(preset.problemText)
    setRevealedHintStep(1)
    setSelectedTwinOptionId(null)
    setVerificationResult(null)
    setStudentHypothesis('')
    setHasScanned(true)
  }

  // Simulate or trigger OCR Scan & Socratic Parsing
  const handleTriggerAnalysis = async () => {
    setIsScanning(true)
    setRevealedHintStep(1)
    setSelectedTwinOptionId(null)
    setVerificationResult(null)

    try {
      const res = await fetch('/api/academic/snap-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemText: problemInputText,
          subjectCode: currentPreset.subjectCode,
          conceptId: currentPreset.conceptId,
          studentHypothesis: studentHypothesis.trim() || undefined,
        }),
      })

      const data = await res.json()
      if (data?.success && data?.preset) {
        setCurrentPreset(data.preset)
        setSessionId(data.sessionId || 'session_' + Date.now())
      }
    } catch (err) {
      console.warn('Snap-solve API fallback to local preset:', err)
    } finally {
      setIsScanning(false)
      setHasScanned(true)
    }
  }

  // Handle twin option verification
  const handleVerifyTwin = async () => {
    if (!selectedTwinOptionId) return
    setIsVerifying(true)

    try {
      const res = await fetch('/api/academic/snap-solve/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          selectedOptionId: selectedTwinOptionId,
          conceptId: currentPreset.conceptId,
          subjectCode: currentPreset.subjectCode,
        }),
      })

      const data = await res.json()
      if (data?.feedback) {
        setVerificationResult({
          isCorrect: data.isCorrect,
          explanation: data.feedback.explanation,
          title: data.feedback.title,
          errorType: data.feedback.errorType,
          masteryBoost: data.feedback.masteryBoost,
        })
      }
    } catch (err) {
      // Local fallback evaluation
      const opt = currentPreset.twinChallenge.options.find((o) => o.id === selectedTwinOptionId)
      if (opt) {
        setVerificationResult({
          isCorrect: opt.isCorrect,
          explanation: opt.explanation,
          title: opt.isCorrect ? 'Independent Mastery Unlocked! 🎯' : 'Conceptual Trap Detected ⚠️',
          errorType: opt.errorType,
          masteryBoost: opt.isCorrect ? '+18% Conceptual Certainty' : '0% (Scheduled for Spaced Retest)',
        })
      }
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto" id="snap-solve-container">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 text-emerald-500" />
          Pillar 2: Anti-Cheating AI Doubt Mentor
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Snap &amp; Solve with Progressive Socratic Guidance
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Never settle for mindlessly copied answers. Snap any handwritten textbook problem or equation to receive structured Socratic clues, avoid sign traps, and prove real mastery with an independent twin challenge.
        </p>
      </div>

      {/* Preset Problem Switcher */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Select a High-Yield Textbook Doubt or Enter Your Own:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESET_DOUBTS.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                activePresetIndex === idx
                  ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-slate-300">
                  {preset.subjectCode}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                  {(preset.ocrConfidence * 100).toFixed(0)}% OCR
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                {preset.title.split(':')[1] || preset.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                {preset.conceptTitle}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Snap & Solve Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input & OCR Parsing (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Camera className="w-4 h-4 text-emerald-500" />
                <span>Textbook Snap &amp; OCR Parser</span>
              </div>
              <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-600">
                Multi-Modal Neural OCR
              </Badge>
            </div>

            {/* Simulated OCR Scanner Screen */}
            <div className="relative rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-950 text-white p-4 overflow-hidden min-h-[160px] flex flex-col justify-between">
              {/* Scanline Animation */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-bounce top-0" />
              )}

              <div className="space-y-1 relative z-10">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400">
                  <span>[OCR SCAN ENGINE ACTIVE]</span>
                  <span>CONFIDENCE: {(currentPreset.ocrConfidence * 100).toFixed(1)}%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-slate-200 leading-relaxed mt-2">
                  {currentPreset.problemText}
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/10 mt-3 relative z-10">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Formula Recognized
                </span>
                <span className="text-emerald-300 font-bold">{currentPreset.conceptId}</span>
              </div>
            </div>

            {/* Custom Input or Hypothesis Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Edit Problem Stem or Add Your Hypothesis:</span>
                <span className="text-[10px] text-slate-400">Optional</span>
              </label>
              <textarea
                value={problemInputText}
                onChange={(e) => setProblemInputText(e.target.value)}
                rows={3}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-950 p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none font-sans"
                placeholder="Type or paste any math/physics problem..."
              />
            </div>

            <Button
              onClick={handleTriggerAnalysis}
              disabled={isScanning}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-10 rounded-xl gap-2 shadow-sm"
            >
              {isScanning ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Analyzing Physics &amp; Mathematics...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Scan &amp; Generate Socratic Scaffolding
                </>
              )}
            </Button>
          </div>

          {/* Pedagogy Assurance Box */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Anti-Cheating Socratic Contract</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Super AI guides your cognition step-by-step rather than replacing it. After uncovering the hints, you must verify your independent understanding by solving the twin problem.
            </p>
          </div>
        </div>

        {/* Right Column: Progressive 4-Stage Socratic Hints & Twin Challenge (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Socratic Step Stepper Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 border-slate-100 dark:border-neutral-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  Progressive Guided Scaffolding
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Socratic Clue Progression ({revealedHintStep}/4 Unlocked)
                </h3>
              </div>
              <div className="flex items-center gap-1.5 self-start sm:self-center">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold transition-all ${
                      step <= revealedHintStep
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-neutral-800 text-slate-400'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Hint Cards Accordion / Stream */}
            <div className="space-y-4">
              {currentPreset.hints.slice(0, revealedHintStep).map((hint, idx) => (
                <div
                  key={hint.step}
                  className="rounded-xl border border-slate-200 dark:border-neutral-800 p-4.5 bg-slate-50/50 dark:bg-neutral-950/40 space-y-2.5 transition-all animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold flex items-center justify-center">
                        {hint.step}
                      </span>
                      {hint.title}
                    </span>
                    <Badge variant="secondary" className="text-[9px] uppercase font-bold">
                      {hint.step === 1 ? 'Concept' : hint.step === 2 ? 'Formula' : hint.step === 3 ? 'Pitfall Trap' : 'Derivation'}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {hint.content}
                  </p>

                  {/* Formula display if present */}
                  {hint.formulaLatex && (
                    <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 font-mono text-xs text-center text-emerald-600 dark:text-emerald-400 font-bold">
                      {hint.formulaLatex}
                    </div>
                  )}

                  {/* Trap Alert if present */}
                  {hint.trapAlert && (
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-[11px] font-bold">Sign &amp; Trap Alert:</strong>
                        <span className="text-[11px] leading-tight text-amber-800 dark:text-amber-300">
                          {hint.trapAlert}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Socratic prompt */}
                  <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 italic flex items-center gap-1.5 pt-1">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>{hint.focusPrompt}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stepper Controls */}
            {revealedHintStep < 4 ? (
              <Button
                onClick={() => setRevealedHintStep((prev) => Math.min(4, prev + 1))}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 font-bold text-xs h-10 rounded-xl gap-2 shadow-xs"
              >
                <span>Reveal Next Socratic Step ({revealedHintStep + 1}/4)</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center text-xs text-emerald-800 dark:text-emerald-300 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                All 4 Socratic hints unlocked! Now complete the Twin Verification Challenge below.
              </div>
            )}
          </div>

          {/* Twin Problem Independent Verification Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-900/50 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase">
                    Anti-Cheating Gate
                  </Badge>
                  <span className="text-xs text-indigo-300 font-semibold">Independent Mastery Check</span>
                </div>
                <h3 className="text-base sm:text-lg font-black mt-1">
                  Twin Verification Challenge: {currentPreset.twinChallenge.conceptTitle}
                </h3>
              </div>
              <Badge variant="outline" className="border-indigo-400/40 text-indigo-300 text-[10px] self-start sm:self-center">
                Unlocks Verified Badge
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold uppercase text-indigo-300 block">
                Isomorphic Test Problem:
              </span>
              <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                {currentPreset.twinChallenge.questionStem}
              </p>
              <p className="text-[11px] text-slate-400 italic pt-1">
                Tip: {currentPreset.twinChallenge.hintForLearner}
              </p>
            </div>

            {/* Options Selector */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-slate-300 block">
                Choose the correct outcome:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentPreset.twinChallenge.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSelectedTwinOptionId(option.id)
                      setVerificationResult(null)
                    }}
                    className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${
                      selectedTwinOptionId === option.id
                        ? 'bg-indigo-600/30 border-cyan-400 text-white ring-2 ring-cyan-400/30'
                        : 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                        selectedTwinOptionId === option.id
                          ? 'bg-cyan-400 text-slate-950'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {option.id.replace('opt_', '').toUpperCase()}
                    </span>
                    <span className="leading-snug">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Button */}
            {!verificationResult ? (
              <Button
                onClick={handleVerifyTwin}
                disabled={!selectedTwinOptionId || isVerifying}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs h-11 rounded-xl gap-2 shadow-lg"
              >
                {isVerifying ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Checking Independent Solution...
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    Submit &amp; Verify Independent Mastery
                  </>
                )}
              </Button>
            ) : (
              /* Verification Feedback Box */
              <div
                className={`p-4 rounded-xl border space-y-2.5 animate-in zoom-in-95 duration-200 ${
                  verificationResult.isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-100'
                    : 'bg-rose-950/60 border-rose-500/50 text-rose-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {verificationResult.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <span>{verificationResult.title}</span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/10">
                    {verificationResult.masteryBoost}
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">
                  {verificationResult.explanation}
                </p>

                {verificationResult.isCorrect ? (
                  <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-200">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Award className="w-4 h-4 text-emerald-400" /> Verified Concept Logged to Profile
                    </span>
                    <span className="text-[10px] text-emerald-300">Sunday Report Updated</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-rose-300">
                      Error DNA: <strong>{verificationResult.errorType || 'Concept trap'}</strong>
                    </span>
                    <Button
                      onClick={() => setVerificationResult(null)}
                      variant="outline"
                      className="text-xs h-8 bg-transparent text-white border-white/20 hover:bg-white/10"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mr-1" /> Retry Twin
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
