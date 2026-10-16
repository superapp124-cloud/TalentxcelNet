'use client'

import React, { useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  ArrowRight,
  Terminal,
  Code2,
  CheckCircle2,
  Brain,
  Award,
  Layers,
  Send,
  Target,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  Cpu,
  GraduationCap,
  Briefcase,
} from 'lucide-react'
import { resolveAmbitionQuery, AmbitionNavigationResult } from '@/lib/ai/ambition-navigator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const AMBITION_PRESETS = [
  'I want to become an AI developer',
  'I want to crack NEET',
  'I want a healthcare technology career',
  'I want to start a digital business',
  'I want to clear Civil Services / IAS',
  'I want to build full-stack web applications',
]

const LEARNING_STAGES = [
  {
    stage: 'Learn',
    number: '01',
    icon: BookOpen,
    headline: 'Curriculum-Grounded Lessons',
    description: 'Master core concepts through structured modules with your Super AI Socratic tutor always on standby.',
  },
  {
    stage: 'Practise',
    number: '02',
    icon: CheckCircle2,
    headline: 'Adaptive Diagnostic Drills',
    description: 'Solve problem sets with multi-stage progressive hints that coach thinking without spoiling solutions.',
  },
  {
    stage: 'Build',
    number: '03',
    icon: Code2,
    headline: 'Isolated Sandboxed Execution',
    description: 'Develop authentic projects inside a safe execution sandbox running automated test assertions.',
  },
  {
    stage: 'Get Feedback',
    number: '04',
    icon: TrendingUp,
    headline: 'Multi-Dimensional Rubric Scoring',
    description: 'Receive objective grades on Architecture, Security, Test Coverage, and Code Quality with mentor escalations.',
  },
  {
    stage: 'Showcase & Grow',
    number: '05',
    icon: Award,
    headline: 'Demonstrated Skills to Opportunities',
    description: 'Turn verified project evidence into cryptographic credentials and direct referrals on TalentXcel and CHATR.',
  },
]

export function SuperAiAmbitionCockpit() {
  const [query, setQuery] = useState('I want to become an AI developer')
  const [activeAmbition, setActiveAmbition] = useState<AmbitionNavigationResult>(() =>
    resolveAmbitionQuery('I want to become an AI developer')
  )
  const [activeStageIndex, setActiveStageIndex] = useState(2) // Default to 'Build'
  const [activeSubTab, setActiveSubTab] = useState<'tutor' | 'workspace' | 'graph' | 'opportunities'>('tutor')
  const [isPending, startTransition] = useTransition()

  const handleQuerySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!query.trim()) return

    startTransition(() => {
      const result = resolveAmbitionQuery(query)
      setActiveAmbition(result)
    })
  }

  const handleSelectPreset = (preset: string) => {
    setQuery(preset)
    startTransition(() => {
      const result = resolveAmbitionQuery(preset)
      setActiveAmbition(result)
    })
  }

  return (
    <div className="w-full space-y-12">
      {/* 1. Cinematic Hero Banner & Ambition Search Bar */}
      <div className="relative mx-auto max-w-5xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span>Super AI Learning Universe • 20 Programme Families</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.15]">
          Your Ambition. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            One Intelligence.
          </span>{' '}
          Infinite Possibilities.
        </h1>

        <p className="mx-auto max-w-2xl text-base text-neutral-300 sm:text-lg leading-relaxed">
          One platform. Every ambition. One personal Super AI. A unified path where knowledge becomes skills, skills
          become projects, and projects become real-world opportunities.
        </p>

        {/* Ambient Conversational Ambition Input */}
        <div className="mx-auto max-w-2xl pt-2">
          <form
            onSubmit={handleQuerySubmit}
            className="relative flex items-center rounded-2xl border border-cyan-500/40 bg-neutral-950/80 p-2 shadow-[0_0_30px_rgba(0,240,255,0.15)] backdrop-blur-xl focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/30 transition-all"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Brain className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to learn or become? (e.g. I want to crack NEET, I want to become an AI developer...)"
              className="w-full bg-transparent px-3 text-sm sm:text-base text-white placeholder-neutral-400 focus:outline-none"
              aria-label="Your learning ambition"
            />
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="shrink-0 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs sm:text-sm px-4 rounded-xl shadow-md gap-1.5"
            >
              {isPending ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="hidden sm:inline">Navigate</span>
            </Button>
          </form>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Try:</span>
            {AMBITION_PRESETS.map((preset) => (
              <button
                key={preset}
                onClick={() => handleSelectPreset(preset)}
                className={`text-xs rounded-full border px-3 py-1 transition-all ${
                  query === preset
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                    : 'border-white/[0.1] bg-white/[0.04] text-neutral-300 hover:border-white/[0.25] hover:text-white'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Interactive Super AI Holographic Cockpit (Directly visualizing Master Concept Artwork) */}
      <div className="relative mx-auto max-w-6xl rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-neutral-950/95 via-[#070d1e]/95 to-neutral-950/95 p-3 sm:p-6 shadow-[0_0_80px_rgba(0,180,255,0.22)] backdrop-blur-2xl space-y-6">
        {/* Subtle grid background */}
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Panoramic Cockpit Image Theater Viewport */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/10] rounded-2xl overflow-hidden border border-cyan-500/40 bg-black shadow-[0_0_40px_rgba(0,240,255,0.25)] group">
          <Image
            src="/images/titan-cockpit-panoramic.jpg"
            alt="TalentXcel Academy Super AI Ambition Cockpit Command Center"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Holographic grid and vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-transparent to-neutral-950/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          {/* Interactive Beacons / Hotspots Overlaid on Key Cockpit Nodes */}
          
          {/* Beacon 1: Super AI Cognitive Avatar (Top Center) */}
          <button
            onClick={() => {
              setActiveSubTab('tutor')
              document.getElementById('cockpit-console-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group/beacon absolute top-[24%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full border border-cyan-400 bg-neutral-950/85 px-3 py-1.5 text-[11px] font-bold text-cyan-200 shadow-[0_0_20px_rgba(0,240,255,0.7)] backdrop-blur-md hover:scale-110 hover:bg-cyan-950 transition-all cursor-pointer"
            aria-label="Super AI Cognitive Co-Pilot"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <Brain className="h-3.5 w-3.5 text-cyan-300" />
            <span className="hidden sm:inline">Super AI • Cognitive Co-Pilot</span>
          </button>

          {/* Beacon 2: 20-Family Programme Universe (Left Floating Cards) */}
          <Link
            href="/#programmes-universe"
            className="group/beacon absolute top-[48%] left-[16%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full border border-blue-400/90 bg-neutral-950/85 px-3 py-1.5 text-[11px] font-bold text-blue-200 shadow-[0_0_20px_rgba(0,128,255,0.6)] backdrop-blur-md hover:scale-110 hover:bg-blue-950 transition-all cursor-pointer"
            aria-label="20-Family Programme Universe"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <GraduationCap className="h-3.5 w-3.5 text-blue-300" />
            <span className="hidden sm:inline">20 Programme Families</span>
          </Link>

          {/* Beacon 3: Sandboxed IDE Workspace (Center Screens) */}
          <button
            onClick={() => {
              setActiveSubTab('workspace')
              document.getElementById('cockpit-console-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group/beacon absolute top-[62%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full border border-emerald-400 bg-neutral-950/85 px-3 py-1.5 text-[11px] font-bold text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.7)] backdrop-blur-md hover:scale-110 hover:bg-emerald-950 transition-all cursor-pointer"
            aria-label="Live Sandboxed Code Workspace"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <Terminal className="h-3.5 w-3.5 text-emerald-300" />
            <span className="hidden sm:inline">Code Sandbox • 4/4 PASS</span>
          </button>

          {/* Beacon 4: Living Skill Graph DAG (Right Constellation Screen) */}
          <button
            onClick={() => {
              setActiveSubTab('graph')
              document.getElementById('cockpit-console-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group/beacon absolute top-[44%] left-[78%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full border border-purple-400 bg-neutral-950/85 px-3 py-1.5 text-[11px] font-bold text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.7)] backdrop-blur-md hover:scale-110 hover:bg-purple-950 transition-all cursor-pointer"
            aria-label="Living Skill Graph DAG"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
            </span>
            <Layers className="h-3.5 w-3.5 text-purple-300" />
            <span className="hidden sm:inline">Living Skill Graph DAG</span>
          </button>

          {/* Beacon 5: Multi-Brand Ecosystem Dock (Far Right) */}
          <button
            onClick={() => {
              setActiveSubTab('opportunities')
              document.getElementById('cockpit-console-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group/beacon absolute top-[40%] left-[91%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full border border-amber-400 bg-neutral-950/85 px-3 py-1.5 text-[11px] font-bold text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.7)] backdrop-blur-md hover:scale-110 hover:bg-amber-950 transition-all cursor-pointer"
            aria-label="Tri-Platform Ecosystem"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <Briefcase className="h-3.5 w-3.5 text-amber-300" />
            <span className="hidden sm:inline">TalentXcel • CHATR • NutyTales</span>
          </button>

          {/* Bottom HUD Bar on Theater */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-col sm:flex-row items-center justify-between gap-2 p-2.5 rounded-xl border border-white/[0.12] bg-neutral-950/85 backdrop-blur-md text-[11px]">
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-cyan-300">TITAN_COCKPIT_HUD:</span>
              <span className="text-white font-medium">{activeAmbition.matchedProgramme.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-400 hidden lg:inline">Click any beacon to control the cockpit console</span>
              <Link href={activeAmbition.firstGuidedProject.workspaceHref}>
                <Button size="sm" className="h-7 text-[11px] bg-cyan-400 hover:bg-cyan-300 text-black font-bold px-3 rounded-lg gap-1">
                  Launch Interactive Sandbox <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Console Section Container */}
        <div id="cockpit-console-section" className="space-y-6 pt-2">
          {/* Top Header in Cockpit */}
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{activeAmbition.targetAmbition}</h3>
                <Badge
                  variant="outline"
                  className={`${
                    activeAmbition.matchedProgramme.isApprovedForEnrolment
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                  }`}
                >
                  {activeAmbition.matchedProgramme.statusBadge}
                </Badge>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Matched Programme #{activeAmbition.matchedProgramme.familyNumber} in {activeAmbition.matchedProgramme.categoryLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={activeAmbition.immediateNextAction.href}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-bold text-xs gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                {activeAmbition.immediateNextAction.label}
              </Button>
            </Link>
          </div>
        </div>

        {/* Cockpit Interactive Navigation Tabs */}
        <div className="relative flex flex-wrap gap-2 pt-6">
          {[
            { id: 'tutor', label: '1. Super AI Tutor Guidance', icon: Brain },
            { id: 'workspace', label: '2. Live Practical Project', icon: Code2 },
            { id: 'graph', label: '3. Living Skill Graph', icon: Layers },
            { id: 'opportunities', label: '4. Opportunities & Ecosystem', icon: Briefcase },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeSubTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'border border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'border border-white/[0.08] bg-white/[0.03] text-neutral-400 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-cyan-400" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Dynamic Interactive Body */}
        <div className="relative mt-6 min-h-[340px]">
          {/* TAB 1: Super AI Tutor Guidance */}
          {activeSubTab === 'tutor' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4 rounded-2xl border border-white/[0.08] bg-black/40 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
                  <Sparkles className="h-4 w-4" />
                  <span>Socratic Guidance & Roadmap Rationale</span>
                </div>
                <p className="text-sm text-neutral-200 leading-relaxed">{activeAmbition.superAiMessage}</p>

                <div className="pt-2 space-y-2 border-t border-white/[0.08]">
                  <span className="text-xs font-semibold text-neutral-300">Verified Prerequisites:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeAmbition.missingFoundations.map((pre, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-neutral-300"
                      >
                        {pre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 space-y-2 border-t border-white/[0.08]">
                  <span className="text-xs font-semibold text-neutral-300">Core Outcomes:</span>
                  <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                    {activeAmbition.matchedProgramme.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next Step Box */}
              <div className="space-y-4 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                    <Target className="h-4 w-4" />
                    <span>Immediate Action</span>
                  </div>
                  <h4 className="text-base font-bold text-white">{activeAmbition.firstGuidedProject.title}</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {activeAmbition.firstGuidedProject.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyan-500/20">
                  <Link href={activeAmbition.firstGuidedProject.workspaceHref}>
                    <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs gap-1 shadow-md">
                      Enter Project Workspace <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Live Practical Project Workspace Preview */}
          {activeSubTab === 'workspace' && (
            <div className="rounded-2xl border border-white/[0.08] bg-black/60 p-5 space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs">
                <div className="flex items-center gap-2 text-neutral-300">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span>project_workspace / {activeAmbition.matchedProgramme.slug} / test_runner.py</span>
                </div>
                <Badge variant="outline" className="text-cyan-300 border-cyan-500/40 text-[10px]">
                  Isolated Sandbox Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                {/* Code panel */}
                <div className="rounded-xl border border-white/[0.06] bg-neutral-950 p-4 space-y-2 text-neutral-300">
                  <div className="text-neutral-500">// Guided Task: {activeAmbition.firstGuidedProject.title}</div>
                  <div>
                    <span className="text-purple-400">from</span> typing <span className="text-purple-400">import</span>{' '}
                    List, Dict, Any
                  </div>
                  <div>
                    <span className="text-blue-400">async def</span>{' '}
                    <span className="text-yellow-300">execute_verified_pipeline</span>(data: Dict[str, Any]) -&gt; bool:
                  </div>
                  <div className="pl-4 text-neutral-400">
                    # Validate inputs against schema constraints
                  </div>
                  <div className="pl-4">
                    assert <span className="text-emerald-300">&quot;intent&quot;</span> in data,{' '}
                    <span className="text-emerald-300">&quot;Missing intent parameter&quot;</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-400">return</span> True
                  </div>
                </div>

                {/* Test Console */}
                <div className="rounded-xl border border-white/[0.06] bg-neutral-950 p-4 space-y-2">
                  <div className="text-neutral-400 font-bold flex items-center justify-between">
                    <span>Sandboxed Test Runner</span>
                    <span className="text-emerald-400">4 / 4 PASSED</span>
                  </div>
                  <div className="text-emerald-400 text-[11px] space-y-1">
                    <div>✓ test_architecture_contract (12ms)</div>
                    <div>✓ test_security_authorization_boundary (8ms)</div>
                    <div>✓ test_safe_execution_sandbox (14ms)</div>
                    <div>✓ test_rubric_scoring_audit (9ms)</div>
                  </div>
                  <div className="pt-2 text-[11px] text-neutral-400 border-t border-white/[0.08]">
                    Score: <span className="text-white font-bold">100/100</span> • Demonstrated competency added to Living Skill Graph.
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Link href={activeAmbition.firstGuidedProject.workspaceHref}>
                  <Button size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs gap-1.5">
                    Open Full IDE Sandbox <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* TAB 3: Living Skill Graph Preview */}
          {activeSubTab === 'graph' && (
            <div className="rounded-2xl border border-white/[0.08] bg-black/50 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <Layers className="h-4 w-4" />
                  <span>Living Skill Graph: {activeAmbition.matchedProgramme.shortTitle}</span>
                </div>
                <span className="text-xs text-neutral-400">Prerequisite DAG • Verified Assessment Criteria</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
                {[
                  { name: 'Core Foundations', state: 'Verified', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
                  { name: 'Data Architecture', state: 'Demonstrated', color: 'border-blue-500/40 text-blue-400 bg-blue-500/10' },
                  { name: 'Applied Projects', state: 'Learning', color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' },
                  { name: 'Autonomous Agents', state: 'Prerequisite', color: 'border-neutral-700 text-neutral-400 bg-neutral-900' },
                  { name: 'Production Cloud', state: 'Prerequisite', color: 'border-neutral-700 text-neutral-400 bg-neutral-900' },
                ].map((node, i) => (
                  <div key={i} className={`rounded-xl border p-3 space-y-2 text-center ${node.color}`}>
                    <div className="text-xs font-bold">{node.name}</div>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-current">
                      {node.state}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="pt-3 text-xs text-neutral-400 flex items-center justify-between">
                <span>Skills update upon verifiable project submission, never solely from video views.</span>
                <Link href="/#skill-graph-section" className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold">
                  Inspect Global Skill Graph <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 4: Opportunities & Ecosystem */}
          {activeSubTab === 'opportunities' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activeAmbition.relevantEcosystemTools.map((tool, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/[0.08] bg-black/40 p-4 space-y-3 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
                >
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-[10px] border-cyan-500/40 text-cyan-300 uppercase">
                      {tool.brand}
                    </Badge>
                    <h5 className="text-sm font-bold text-white">{tool.title}</h5>
                    <p className="text-xs text-neutral-400 leading-relaxed">{tool.description}</p>
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 pt-2 border-t border-white/[0.06]"
                  >
                    Open Ecosystem Resource <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. The 5-Stage Circular Learning Dock (Directly from the concept image) */}
        <div className="relative mt-10 border-t border-white/[0.08] pt-8">
          <div className="text-center pb-5">
            <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
              The TalentXcel Learning Engine
            </span>
            <h4 className="text-lg font-bold text-white mt-0.5">5 Connected Stages of Mastery</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {LEARNING_STAGES.map((item, index) => {
              const Icon = item.icon
              const isSelected = activeStageIndex === index
              return (
                <button
                  key={item.stage}
                  onClick={() => setActiveStageIndex(index)}
                  className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/20 text-white shadow-[0_0_20px_rgba(0,240,255,0.25)] scale-105'
                      : 'border-white/[0.08] bg-white/[0.03] text-neutral-400 hover:bg-white/[0.06] hover:text-neutral-200'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl mb-2 ${
                      isSelected ? 'bg-cyan-400 text-black shadow-md' : 'bg-white/[0.06] text-cyan-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{item.number}</span>
                  <span className="text-xs font-bold mt-0.5">{item.stage}</span>
                </button>
              )
            })}
          </div>

          {/* Active Stage Detail Callout */}
          <div className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-cyan-300">
                Stage {LEARNING_STAGES[activeStageIndex].number}: {LEARNING_STAGES[activeStageIndex].headline}
              </div>
              <p className="text-xs text-neutral-300 mt-1 max-w-2xl leading-relaxed">
                {LEARNING_STAGES[activeStageIndex].description}
              </p>
            </div>
            <Link href={activeAmbition.immediateNextAction.href}>
              <Button size="sm" className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs gap-1 shrink-0">
                Experience Stage <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
