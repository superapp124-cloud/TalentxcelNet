'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Tv,
  Laptop,
  Tablet,
  Smartphone,
  Layers,
  Search,
  Bell,
  Home,
  BookOpen,
  FileText,
  Award,
  User,
  Settings,
  Sparkles,
  Calculator,
  FlaskConical,
  Compass,
  Play,
  Calendar,
  ChevronRight,
  Clock,
  CheckCircle2,
  Check,
  Wifi,
  Cloud,
  Bot,
  ShieldCheck,
  BarChart3,
  Globe2,
  RotateCcw,
  GraduationCap,
  PieChart,
  Target,
  Maximize2,
  ExternalLink,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type SurfaceMode = 'showcase' | 'tv' | 'desktop' | 'tablet' | 'mobile'

export default function UnifiedPlatformPage() {
  const [activeSurface, setActiveSurface] = useState<SurfaceMode>('showcase')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(6) // Question 7 (index 6) matching screenshot
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt_7b') // Option B (18) selected in green!
  const [activeTabletTab, setActiveTabletTab] = useState<'explanation' | 'hint' | 'related'>('explanation')
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(504) // 08:24 matching screenshot

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 504))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col font-sans selection:bg-[#00D2FF]/30 selection:text-cyan-200">
      {/* =========================================================================
          TOP PERSISTENT CONTROL BAR: MULTI-SURFACE SELECTOR
      ========================================================================== */}
      <div className="sticky top-0 z-50 bg-[#0B132B]/95 backdrop-blur-xl border-b border-white/[0.08] px-4 py-2.5 shadow-xl">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-black text-base tracking-tight text-white">
              <span>Talent<span className="text-[#0080FF]">Xcel</span></span>
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest hidden sm:inline">
                • Universal Platform
              </span>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px] py-0 px-2">
              All Surfaces Live
            </Badge>
          </div>

          {/* Interactive Surface Switcher Pills */}
          <div className="flex items-center gap-1 bg-[#1C2541] p-1 rounded-xl border border-white/[0.1]">
            <button
              onClick={() => setActiveSurface('showcase')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSurface === 'showcase'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Showcase View (Reference)</span>
            </button>

            <button
              onClick={() => setActiveSurface('tv')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSurface === 'tv'
                  ? 'bg-[#0080FF] text-white font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>TV Experience</span>
            </button>

            <button
              onClick={() => setActiveSurface('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSurface === 'desktop'
                  ? 'bg-[#0080FF] text-white font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Laptop / Desktop</span>
            </button>

            <button
              onClick={() => setActiveSurface('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSurface === 'tablet'
                  ? 'bg-[#0080FF] text-white font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet Split-Screen</span>
            </button>

            <button
              onClick={() => setActiveSurface('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeSurface === 'mobile'
                  ? 'bg-[#0080FF] text-white font-bold shadow-md'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Phone</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/academy"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
            >
              <span>Academy Programmes</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODE 1: FULL MULTI-SURFACE SHOWCASE CANVAS (MATCHES ATTACHED IMAGE 100%)
      ========================================================================== */}
      {activeSurface === 'showcase' && (
        <main className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between space-y-12 animate-in fade-in duration-300">
          {/* =====================================================================
              TOP SECTION: THE TELEVISION EXPERIENCE (10-FOOT REMOTE UI)
          ====================================================================== */}
          <div className="relative group">
            {/* Television Hardware Frame */}
            <div className="relative rounded-[32px] border-[12px] border-[#181E2E] bg-[#070B14] p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
              {/* Stand highlight reflection at bottom */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent pointer-events-none" />

              {/* TV Top Header Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] relative z-10">
                <div className="flex items-center gap-8">
                  <div className="space-y-0.5">
                    <span className="text-2xl font-black tracking-tight text-white flex items-center gap-0.5">
                      Talent<span className="text-[#0080FF]">Xcel</span>
                    </span>
                    <span className="text-[10px] tracking-widest uppercase text-neutral-400 block font-medium">
                      Learn • Practise • Grow
                    </span>
                  </div>

                  {/* Glowing TV Navigation Pills */}
                  <nav className="hidden md:flex items-center gap-2">
                    <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0080FF] text-white font-bold text-sm shadow-[0_0_20px_rgba(0,128,255,0.45)] ring-2 ring-white/20">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </button>
                    {['My Learning', 'Tests', 'Subjects', 'Results', 'Plans', 'Profile'].map((item) => (
                      <button
                        key={item}
                        className="px-4 py-2 rounded-full text-sm font-semibold text-neutral-300 hover:text-white hover:bg-white/5 transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-2.5 rounded-full bg-white/[0.06] text-neutral-300 hover:text-white">
                    <Search className="h-4 w-4" />
                  </button>
                  <button className="p-2.5 rounded-full bg-white/[0.06] text-neutral-300 hover:text-white relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
                  </button>
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#0080FF] to-cyan-400 flex items-center justify-center font-black text-white text-sm shadow-md">
                    A
                  </div>
                </div>
              </div>

              {/* TV Main Body: 9 Cols Left + 3 Cols Right Quick Access */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 relative z-10 items-start">
                {/* Left 9 Columns */}
                <div className="lg:col-span-9 space-y-6">
                  {/* Hero Banner with Student Graphic & Upcoming Test Card */}
                  <div className="relative rounded-3xl bg-gradient-to-r from-[#0C1636] via-[#0E2A68] to-[#124294] p-6 sm:p-8 overflow-hidden border border-[#2A365D] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Background Doodles & Subtle Graphics */}
                    <div className="absolute right-32 top-4 opacity-20 pointer-events-none text-cyan-300 text-6xl font-serif">
                      ✧
                    </div>
                    <div className="absolute right-72 bottom-4 opacity-15 pointer-events-none text-amber-300 text-4xl">
                      ✏
                    </div>

                    <div className="space-y-4 max-w-md z-10">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
                          Welcome
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                          Keep Learning,<br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00D2FF]">
                            Keep Growing
                          </span>
                        </h1>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-200/90 leading-relaxed font-normal">
                        Syllabus-aligned practice tests, explanations and personalised learning for school and competitive exams.
                      </p>
                      <div className="pt-1">
                        <button
                          onClick={() => setActiveSurface('tablet')}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0B132B] font-black text-sm shadow-xl hover:bg-neutral-100 transition-all hover:scale-105"
                        >
                          <Play className="h-4 w-4 fill-[#0B132B]" />
                          <span>Continue Practice</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>

                      {/* 3 Quick Pill Tabs Under Button */}
                      <div className="flex items-center gap-2 pt-2 text-[11px] font-semibold text-neutral-300">
                        <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                          <BarChart3 className="w-3 h-3 text-cyan-400" /> My Progress
                        </span>
                        <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-amber-400" /> Upcoming Tests
                        </span>
                        <span className="bg-black/30 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-purple-400" /> Recommended
                        </span>
                      </div>
                    </div>

                    {/* Upcoming Test Card (Matching Screenshot) */}
                    <div className="w-full md:w-80 rounded-2xl bg-[#0B132B]/95 backdrop-blur-md p-5 border border-cyan-400/30 shadow-2xl space-y-3 z-10">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-cyan-300 flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" /> Upcoming Test
                        </span>
                        <span className="text-[11px] text-neutral-400 hover:text-white cursor-pointer">
                          View All &gt;
                        </span>
                      </div>

                      <div className="flex items-start gap-3 pt-1">
                        <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
                          <Calculator className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-white">Mathematics</h4>
                          <p className="text-xs text-amber-400 font-semibold">Ch - 6 Multiples</p>
                          <p className="text-[11px] text-neutral-400">Grade IV • Mayoor School (PT 2)</p>
                          <p className="text-[11px] text-neutral-300 font-medium mt-1">🗓 17 Nov 2026</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveSurface('tablet')}
                        className="w-full py-2.5 rounded-xl bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all mt-2"
                      >
                        <span>Start Practice</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 5 Vibrant Subject Cards Row (Exact colors & progress) */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                    {/* Card 1: Mathematics (Amber) */}
                    <div
                      onClick={() => setActiveSurface('tablet')}
                      className="rounded-2xl bg-[#0E172E] p-4 border border-amber-500/40 shadow-lg hover:scale-[1.03] transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 w-fit">
                          <Calculator className="h-5 w-5" />
                        </div>
                        <h4 className="font-extrabold text-sm text-white group-hover:text-amber-300 transition-colors">
                          Mathematics
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-medium">Practice • Tests • Revision</p>
                      </div>
                      <div className="space-y-1 pt-2 border-t border-white/5">
                        <div className="flex justify-between text-[10px] text-neutral-400">
                          <span>Progress</span>
                          <span className="font-semibold text-white">3/10 tests</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-amber-400 w-[30%]" />
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Science (Green) */}
                    <div
                      onClick={() => setActiveSurface('tablet')}
                      className="rounded-2xl bg-[#0E172E] p-4 border border-emerald-500/40 shadow-lg hover:scale-[1.03] transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 w-fit">
                          <FlaskConical className="h-5 w-5" />
                        </div>
                        <h4 className="font-extrabold text-sm text-white group-hover:text-emerald-300 transition-colors">
                          Science
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-medium">Practice • Tests • Revision</p>
                      </div>
                      <div className="space-y-1 pt-2 border-t border-white/5">
                        <div className="flex justify-between text-[10px] text-neutral-400">
                          <span>Progress</span>
                          <span className="font-semibold text-white">2/8 tests</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-400 w-[25%]" />
                        </div>
                      </div>
                    </div>

                    {/* Card 3: English (Blue) */}
                    <div
                      onClick={() => setActiveSurface('tablet')}
                      className="rounded-2xl bg-[#0E172E] p-4 border border-blue-500/40 shadow-lg hover:scale-[1.03] transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400 w-fit">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <h4 className="font-extrabold text-sm text-white group-hover:text-blue-300 transition-colors">
                          English
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-medium">Practice • Tests • Revision</p>
                      </div>
                      <div className="space-y-1 pt-2 border-t border-white/5">
                        <div className="flex justify-between text-[10px] text-neutral-400">
                          <span>Progress</span>
                          <span className="font-semibold text-white">4/10 tests</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-blue-400 w-[40%]" />
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Hindi (Pink) */}
                    <div
                      onClick={() => setActiveSurface('tablet')}
                      className="rounded-2xl bg-[#0E172E] p-4 border border-rose-500/40 shadow-lg hover:scale-[1.03] transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-400 w-fit font-bold text-base flex items-center justify-center">
                          अ
                        </div>
                        <h4 className="font-extrabold text-sm text-white group-hover:text-rose-300 transition-colors">
                          Hindi
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-medium">Practice • Tests • Revision</p>
                      </div>
                      <div className="space-y-1 pt-2 border-t border-white/5">
                        <div className="flex justify-between text-[10px] text-neutral-400">
                          <span>Progress</span>
                          <span className="font-semibold text-white">1/8 tests</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-rose-400 w-[12%]" />
                        </div>
                      </div>
                    </div>

                    {/* Card 5: Social Science (Purple) */}
                    <div
                      onClick={() => setActiveSurface('tablet')}
                      className="rounded-2xl bg-[#0E172E] p-4 border border-purple-500/40 shadow-lg hover:scale-[1.03] transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 w-fit">
                          <Compass className="h-5 w-5" />
                        </div>
                        <h4 className="font-extrabold text-sm text-white group-hover:text-purple-300 transition-colors">
                          Social Science
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-medium">Practice • Tests • Revision</p>
                      </div>
                      <div className="space-y-1 pt-2 border-t border-white/5">
                        <div className="flex justify-between text-[10px] text-neutral-400">
                          <span>Progress</span>
                          <span className="font-semibold text-white">2/6 tests</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-purple-400 w-[33%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right 3 Columns: Quick Access Sidebar */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="rounded-2xl bg-[#0E172E] border border-white/[0.08] p-5 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                        Quick Access
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Class 4</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      {/* Selected School Tests */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0080FF] text-white font-bold text-xs shadow-md">
                        <FileText className="h-4 w-4" />
                        <span>School Tests</span>
                      </div>

                      {[
                        { label: 'Competitive Exams', icon: Award },
                        { label: 'Skill Development', icon: Layers },
                        { label: 'AI Tutor (SI)', icon: Bot },
                        { label: 'Settings', icon: Settings },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-neutral-300 font-semibold text-xs transition-all cursor-pointer"
                        >
                          <item.icon className="h-4 w-4 text-neutral-400" />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* TV Remote Navigation Footer Hint */}
              <div className="pt-4 border-t border-white/[0.08] text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
                <span>Use arrow keys on your remote</span>
                <span>•</span>
                <span>Press OK to select</span>
                <span>•</span>
                <span>Press Back to go to previous screen</span>
              </div>
            </div>

            {/* TV Stand Base */}
            <div className="w-48 h-3 bg-[#111624] mx-auto rounded-b-lg border-x-2 border-b-2 border-[#1E2738]" />

            {/* Yellow Label Badge Matching Screenshot */}
            <div className="absolute -bottom-4 right-8 bg-[#FACC15] text-slate-950 px-4 py-2 rounded-2xl shadow-2xl z-20 max-w-xs">
              <div className="font-extrabold text-sm tracking-tight">TV Experience</div>
              <div className="text-[11px] font-medium leading-snug">
                Large, clear interface with full remote control navigation.
              </div>
            </div>
          </div>

          {/* =====================================================================
              BOTTOM MULTI-DEVICE GRID: LAPTOP + TABLET + MOBILE + TEST PHONE
          ====================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4">
            {/* ===================================================================
                DEVICE 2: LAPTOP / DESKTOP (LEFT 5 COLS)
            ==================================================================== */}
            <div className="lg:col-span-5 relative group">
              {/* Laptop Screen Bezel */}
              <div className="rounded-2xl border-[10px] border-[#22283A] bg-[#F8FAFC] text-slate-900 shadow-2xl overflow-hidden text-xs">
                {/* Laptop Top Search & Profile Bar */}
                <div className="bg-white px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-400 w-48 text-[11px]">
                    <Search className="w-3.5 h-3.5" />
                    <span className="truncate">Search for subjects, chapters...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-slate-400" />
                    <div className="w-6 h-6 rounded-full bg-[#0080FF] text-white flex items-center justify-center font-bold text-[10px]">
                      A
                    </div>
                  </div>
                </div>

                {/* Laptop Main Body: Sidebar + Content */}
                <div className="flex min-h-[340px]">
                  {/* Left Sidebar */}
                  <div className="w-36 bg-[#0B132B] text-slate-300 p-3 space-y-1 shrink-0 text-[11px]">
                    <div className="font-black text-white text-xs mb-3 flex items-center gap-1">
                      Talent<span className="text-[#0080FF]">Xcel</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0080FF] text-white font-bold">
                      <Home className="w-3.5 h-3.5" /> <span>Home</span>
                    </div>
                    {['My Learning', 'Tests', 'Subjects', 'Results', 'Plans', 'AI Tutor (SI)', 'Profile'].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white"
                        >
                          <span>{item}</span>
                        </div>
                      )
                    )}
                  </div>

                  {/* Dashboard Content */}
                  <div className="flex-1 p-3.5 space-y-3 bg-[#F8FAFC]">
                    {/* Header line */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-[11px]">
                      <span className="font-bold text-slate-700">
                        Grade IV • Mayoor School, Noida • Periodic Test 2
                      </span>
                      <span className="text-[#0080FF] font-semibold cursor-pointer">Change &gt;</span>
                    </div>

                    {/* 5 Pastel Subject Cards Row */}
                    <div className="grid grid-cols-5 gap-1.5 text-center">
                      <div className="bg-amber-50 border border-amber-200 p-1.5 rounded-lg text-[10px]">
                        <Calculator className="w-3.5 h-3.5 mx-auto text-amber-600 mb-0.5" />
                        <div className="font-bold text-slate-800">Maths</div>
                        <div className="text-slate-500 text-[9px]">3/10 tests</div>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 p-1.5 rounded-lg text-[10px]">
                        <FlaskConical className="w-3.5 h-3.5 mx-auto text-emerald-600 mb-0.5" />
                        <div className="font-bold text-slate-800">Science</div>
                        <div className="text-slate-500 text-[9px]">3/8 tests</div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 p-1.5 rounded-lg text-[10px]">
                        <BookOpen className="w-3.5 h-3.5 mx-auto text-blue-600 mb-0.5" />
                        <div className="font-bold text-slate-800">English</div>
                        <div className="text-slate-500 text-[9px]">4/10 tests</div>
                      </div>
                      <div className="bg-rose-50 border border-rose-200 p-1.5 rounded-lg text-[10px]">
                        <span className="font-bold text-rose-600 block text-xs">अ</span>
                        <div className="font-bold text-slate-800">Hindi</div>
                        <div className="text-slate-500 text-[9px]">1/8 tests</div>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 p-1.5 rounded-lg text-[10px]">
                        <Compass className="w-3.5 h-3.5 mx-auto text-purple-600 mb-0.5" />
                        <div className="font-bold text-slate-800">Social Sci</div>
                        <div className="text-slate-500 text-[9px]">2/6 tests</div>
                      </div>
                    </div>

                    {/* Split: Upcoming Tests & Progress */}
                    <div className="grid grid-cols-12 gap-3 pt-1">
                      {/* Upcoming Tests (7 cols) */}
                      <div className="col-span-7 bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
                        <div className="flex justify-between items-center text-[11px] font-bold text-slate-800">
                          <span>Upcoming Tests</span>
                          <span className="text-[#0080FF] text-[10px]">View All</span>
                        </div>

                        {[
                          { date: '17 Nov 2026', title: 'Mathematics Ch - 6 Multiples', code: 'math' },
                          { date: '19 Nov 2026', title: 'Science Unit 5 - Force & Magnetism', code: 'science' },
                          { date: '23 Nov 2026', title: 'English Ch - 8 The Pied Piper', code: 'english' },
                          { date: '25 Nov 2026', title: 'Hindi पाठ 11 - प्यारा भारत', code: 'hindi' },
                          { date: '27 Nov 2026', title: 'Social Science Ch - 8 Our Agriculture', code: 'sst' },
                        ].map((t) => (
                          <div
                            key={t.date}
                            className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100 text-[10px]"
                          >
                            <div className="truncate mr-1">
                              <span className="text-slate-400 block text-[9px]">{t.date}</span>
                              <span className="font-semibold text-slate-800 truncate block">{t.title}</span>
                            </div>
                            <button
                              onClick={() => setActiveSurface('tablet')}
                              className="px-2 py-0.5 bg-[#0080FF] text-white rounded font-bold text-[9px]"
                            >
                              Start
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Your Progress Gauge & Recommended (5 cols) */}
                      <div className="col-span-5 space-y-2">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                          <span className="text-[10px] font-bold text-slate-700 block">Your Progress</span>
                          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 mx-auto my-1 flex items-center justify-center font-black text-xs text-slate-800">
                            60%
                          </div>
                          <span className="text-[9px] text-slate-500 block">Tests Completed 6/10</span>
                        </div>

                        <div className="bg-white p-2 rounded-xl border border-slate-200 text-[9px] space-y-1">
                          <span className="font-bold text-slate-700 block">Recommended for You</span>
                          <div className="text-slate-600 truncate hover:text-[#0080FF] cursor-pointer">
                            • Division - Practice Test &gt;
                          </div>
                          <div className="text-slate-600 truncate hover:text-[#0080FF] cursor-pointer">
                            • Friction - Quick Quiz &gt;
                          </div>
                          <div className="text-slate-600 truncate hover:text-[#0080FF] cursor-pointer">
                            • The Pied Piper - Reading &gt;
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Base */}
              <div className="w-[102%] -ml-[1%] h-3 bg-[#1E2536] rounded-b-xl border-x border-b border-slate-700 shadow-md" />

              {/* Yellow Label Badge */}
              <div className="absolute -bottom-6 left-4 bg-[#FACC15] text-slate-950 px-4 py-2 rounded-2xl shadow-2xl z-20 max-w-xs">
                <div className="font-extrabold text-sm tracking-tight">Laptop / Desktop</div>
                <div className="text-[11px] font-medium leading-snug">
                  Full dashboard with detailed learning tools, analysis and management.
                </div>
              </div>
            </div>

            {/* ===================================================================
                DEVICE 3: TABLET SPLIT-SCREEN (CENTER 4 COLS)
            ==================================================================== */}
            <div className="lg:col-span-4 relative group">
              {/* Tablet Frame */}
              <div className="rounded-[28px] border-[10px] border-[#1C2234] bg-white text-slate-900 p-4 shadow-2xl overflow-hidden min-h-[460px] flex flex-col justify-between">
                {/* Tablet Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 font-black text-slate-900 text-xs">
                    <span>Talent<span className="text-[#0080FF]">Xcel</span></span>
                    <span className="text-slate-400 font-normal">|</span>
                    <span className="text-slate-500 font-medium text-[11px]">
                      Mathematics &gt; Ch - 6 Multiples
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono font-bold text-[10px] text-slate-700">
                      ⏱ {formatTimer(timeRemainingSeconds)}
                    </span>
                    <span className="font-bold text-slate-600 text-[10px]">7 / 10</span>
                    <span className="text-slate-400 hover:text-slate-600 font-bold text-[10px] cursor-pointer">
                      Exit
                    </span>
                  </div>
                </div>

                {/* Tablet Two-Column Split Area */}
                <div className="grid grid-cols-2 gap-3.5 my-3 flex-1 items-start text-xs">
                  {/* Left Column: Question 7 Matching Screenshot */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-[#0080FF] uppercase block">Question 7</span>
                      <h4 className="font-bold text-slate-900 text-xs leading-snug mt-0.5">
                        Which of the following numbers is a multiple of 6?
                      </h4>
                    </div>

                    {/* Options list */}
                    <div className="space-y-1.5">
                      {[
                        { id: 'opt_7a', label: 'A', text: '14' },
                        { id: 'opt_7b', label: 'B', text: '18' },
                        { id: 'opt_7c', label: 'C', text: '20' },
                        { id: 'opt_7d', label: 'D', text: '22' },
                      ].map((opt) => {
                        const isSelected = selectedOptionId === opt.id
                        return (
                          <div
                            key={opt.id}
                            onClick={() => setSelectedOptionId(opt.id)}
                            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-[11px] ${
                              isSelected
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] ${
                                  isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span>{opt.text}</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                          </div>
                        )
                      })}
                    </div>

                    {/* Green Correct Feedback Callout */}
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] space-y-0.5">
                      <div className="font-bold flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Correct!
                      </div>
                      <p>6 × 3 = 18, so 18 is a multiple of 6.</p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-1">
                      <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 text-[10px] font-bold">
                        Previous
                      </button>
                      <button className="px-4 py-1 rounded-lg bg-[#0080FF] text-white text-[10px] font-bold shadow-sm">
                        Next
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Step-by-Step Explanation & Key Point */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 space-y-2.5">
                    {/* Tabs */}
                    <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1.5 text-[10px] font-bold">
                      <button
                        onClick={() => setActiveTabletTab('explanation')}
                        className={`px-2 py-0.5 rounded ${
                          activeTabletTab === 'explanation'
                            ? 'bg-[#0080FF] text-white'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Explanation
                      </button>
                      <button
                        onClick={() => setActiveTabletTab('hint')}
                        className={`px-2 py-0.5 rounded ${
                          activeTabletTab === 'hint'
                            ? 'bg-[#0080FF] text-white'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Hint
                      </button>
                      <button
                        onClick={() => setActiveTabletTab('related')}
                        className={`px-2 py-0.5 rounded ${
                          activeTabletTab === 'related'
                            ? 'bg-[#0080FF] text-white'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Related
                      </button>
                    </div>

                    {/* Step by step */}
                    <div className="space-y-1.5 text-[10px] text-slate-700">
                      <h5 className="font-bold text-slate-900 text-[11px]">Step by step explanation</h5>
                      <p>Multiples of 6 are numbers obtained by multiplying 6 by whole numbers.</p>
                      <div className="space-y-0.5 font-mono p-2 rounded bg-white border border-slate-200 text-slate-800 text-[9px]">
                        <div>6 × 1 = 6</div>
                        <div>6 × 2 = 12</div>
                        <div className="font-bold text-emerald-600">6 × 3 = 18</div>
                        <div>6 × 4 = 24</div>
                      </div>
                      <p>So, 18 is a multiple of 6.</p>
                    </div>

                    {/* Yellow Key Point Box Matching Screenshot */}
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-[10px] space-y-0.5">
                      <div className="font-bold text-amber-800 flex items-center gap-1 text-[10px]">
                        <Sparkles className="w-3 h-3 text-amber-600" /> Key Point
                      </div>
                      <p className="text-[9px] leading-tight">
                        A number is a multiple of 6 if it appears in the 6-times table: 6, 12, 18, 24, 30 ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Yellow Label Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FACC15] text-slate-950 px-4 py-2 rounded-2xl shadow-2xl z-20 max-w-xs whitespace-nowrap">
                <div className="font-extrabold text-sm tracking-tight">Tablet</div>
                <div className="text-[11px] font-medium leading-snug">
                  Two-column layout with practice on one side and explanations on the other.
                </div>
              </div>
            </div>

            {/* ===================================================================
                DEVICE 4: MOBILE PHONE (RIGHT 3 COLS SPLIT INTO 2 PHONES)
            ==================================================================== */}
            <div className="lg:col-span-3 flex items-end gap-4 relative">
              {/* Phone 1: Mobile App Home Screen */}
              <div className="w-1/2 rounded-[32px] border-[8px] border-[#1C2234] bg-white text-slate-900 p-2.5 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between text-xs">
                {/* Mobile Top Notch & Greeting */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] text-slate-400">
                    <span>10:24</span>
                    <span className="font-bold text-slate-800">Class IV ▾</span>
                    <Bell className="w-3 h-3" />
                  </div>

                  <div className="pt-1">
                    <h5 className="font-extrabold text-[11px] text-slate-900">Good Morning Arshid</h5>
                  </div>

                  {/* Mobile Learning Progress */}
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-slate-400 block font-semibold">Your Learning Progress</span>
                      <span className="text-[9px] font-bold text-slate-800">6/10 tests completed</span>
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-[9px] text-slate-800">
                      60%
                    </div>
                  </div>

                  {/* Continue Practice Card */}
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                    <span className="text-[8px] font-bold text-amber-700 block uppercase">Continue Practice</span>
                    <div className="flex items-center justify-between">
                      <div className="text-[9px] font-bold text-slate-900">Mathematics Ch - 6</div>
                      <button
                        onClick={() => setActiveSurface('tablet')}
                        className="px-2 py-0.5 bg-[#0080FF] text-white rounded font-bold text-[8px]"
                      >
                        Start
                      </button>
                    </div>
                  </div>

                  {/* All Subjects Grid */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[8px] font-bold text-slate-400 block uppercase">All Subjects</span>
                    <div className="grid grid-cols-3 gap-1 text-center">
                      <div className="p-1 rounded bg-amber-50 border border-amber-200">
                        <Calculator className="w-3 h-3 mx-auto text-amber-600" />
                        <span className="text-[8px] font-bold text-slate-800">Maths</span>
                      </div>
                      <div className="p-1 rounded bg-emerald-50 border border-emerald-200">
                        <FlaskConical className="w-3 h-3 mx-auto text-emerald-600" />
                        <span className="text-[8px] font-bold text-slate-800">Science</span>
                      </div>
                      <div className="p-1 rounded bg-blue-50 border border-blue-200">
                        <BookOpen className="w-3 h-3 mx-auto text-blue-600" />
                        <span className="text-[8px] font-bold text-slate-800">English</span>
                      </div>
                      <div className="p-1 rounded bg-rose-50 border border-rose-200">
                        <span className="text-[9px] font-bold text-rose-600">अ</span>
                        <span className="text-[8px] font-bold text-slate-800 block">Hindi</span>
                      </div>
                      <div className="p-1 rounded bg-purple-50 border border-purple-200">
                        <Compass className="w-3 h-3 mx-auto text-purple-600" />
                        <span className="text-[8px] font-bold text-slate-800">SST</span>
                      </div>
                      <div className="p-1 rounded bg-slate-100 border border-slate-200 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-slate-500">More</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Bottom Tab Bar */}
                <div className="pt-2 border-t border-slate-200 flex justify-between text-[8px] text-slate-400 font-bold">
                  <div className="text-[#0080FF] flex flex-col items-center">
                    <Home className="w-3 h-3" />
                    <span>Home</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <FileText className="w-3 h-3" />
                    <span>Tests</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bot className="w-3 h-3" />
                    <span>AI Tutor</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <BarChart3 className="w-3 h-3" />
                    <span>Results</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <User className="w-3 h-3" />
                    <span>Profile</span>
                  </div>
                </div>
              </div>

              {/* Phone 2: Practice Test Focused Screen */}
              <div className="w-1/2 rounded-[32px] border-[8px] border-[#1C2234] bg-white text-slate-900 p-2.5 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between text-xs">
                {/* Test Screen Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[9px] font-bold text-slate-600 border-b border-slate-100 pb-1.5">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">⏱ 08:24</span>
                    <span>7 / 10</span>
                    <span className="text-slate-400">Exit</span>
                  </div>

                  <div>
                    <h5 className="font-bold text-[10px] text-slate-900 leading-tight">
                      Which of the following is a multiple of 6?
                    </h5>
                  </div>

                  {/* Options */}
                  <div className="space-y-1 text-[9px]">
                    <div className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <span>A  14</span>
                    </div>
                    <div className="p-1.5 rounded-lg border border-emerald-500 bg-emerald-50 font-bold text-emerald-950 flex items-center justify-between">
                      <span>B  18</span>
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <div className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <span>C  20</span>
                    </div>
                    <div className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <span>D  22</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Test Nav Buttons */}
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <button className="px-2.5 py-1 rounded border border-slate-200 text-slate-600 font-bold text-[8px]">
                    Previous
                  </button>
                  <button className="px-3.5 py-1 rounded bg-[#0080FF] text-white font-bold text-[8px]">
                    Next
                  </button>
                </div>
              </div>

              {/* Mobile Phone Yellow Badge */}
              <div className="absolute -bottom-6 left-0 bg-[#FACC15] text-slate-950 px-3 py-1.5 rounded-2xl shadow-2xl z-20 max-w-[170px]">
                <div className="font-extrabold text-xs tracking-tight">Mobile Phone</div>
                <div className="text-[9px] font-medium leading-snug">
                  Touch-friendly, native-app feel with bottom navigation.
                </div>
              </div>

              {/* Practice Test Yellow Badge */}
              <div className="absolute -bottom-6 right-0 bg-[#FACC15] text-slate-950 px-3 py-1.5 rounded-2xl shadow-2xl z-20 max-w-[160px]">
                <div className="font-extrabold text-xs tracking-tight">Practice Test</div>
                <div className="text-[9px] font-medium leading-snug">
                  Clean, focused interface for students.
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================================
              BOTTOM FULL-WIDTH FEATURE RIBBON STRIP (MATCHES SCREENSHOT EXACTLY)
          ====================================================================== */}
          <div className="mt-12 pt-6 border-t border-white/[0.08]">
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 shadow-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center text-xs">
                <div className="flex flex-col items-center gap-1.5">
                  <Tv className="w-5 h-5 text-cyan-400" />
                  <span className="font-bold text-white text-[11px]">Works on all devices</span>
                  <span className="text-[10px] text-slate-400">(Phone, Tablet, Laptop, TV)</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <Wifi className="w-5 h-5 text-blue-400" />
                  <span className="font-bold text-white text-[11px]">Installable PWA</span>
                  <span className="text-[10px] text-slate-400">(Like a native app)</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <Cloud className="w-5 h-5 text-indigo-400" />
                  <span className="font-bold text-white text-[11px]">Offline practice</span>
                  <span className="text-[10px] text-slate-400">(Where supported)</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-white text-[11px]">AI Tutor (SI)</span>
                  <span className="text-[10px] text-slate-400">Instant explanations</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-[11px]">Safe & secure payments</span>
                  <span className="text-[10px] text-slate-400">(₹20 per test, subscriptions)</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-white text-[11px]">Progress & insights</span>
                  <span className="text-[10px] text-slate-400">(For students and parents)</span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                  <Globe2 className="w-5 h-5 text-cyan-300" />
                  <span className="font-bold text-white text-[11px]">Scales from school tests</span>
                  <span className="text-[10px] text-slate-400">to JEE, NEET, UPSC and more</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          MODE 2: FULLSCREEN TV EXPERIENCE ZOOM
      ========================================================================== */}
      {activeSurface === 'tv' && (
        <main className="flex-1 max-w-[1440px] w-full mx-auto p-6 lg:p-10 flex flex-col justify-between animate-in fade-in">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="font-bold text-cyan-400 text-sm">TV 10-Foot Remote Navigation Mode</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveSurface('showcase')}
              className="border-white/20 text-white text-xs"
            >
              Return to Multi-Device Showcase
            </Button>
          </div>

          {/* Fullscreen TV View */}
          <div className="space-y-6 my-6">
            <div className="rounded-3xl bg-gradient-to-r from-[#0C1636] via-[#0E2A68] to-[#124294] p-8 border border-[#2A365D] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-4 max-w-lg">
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Welcome</span>
                <h1 className="text-4xl font-black text-white leading-tight">
                  Keep Learning,<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00D2FF]">
                    Keep Growing
                  </span>
                </h1>
                <p className="text-sm text-neutral-200">
                  Syllabus-aligned practice tests, explanations and personalised learning for school and competitive exams.
                </p>
                <button
                  onClick={() => setActiveSurface('tablet')}
                  className="px-6 py-3 rounded-full bg-white text-[#0B132B] font-black text-sm shadow-xl hover:scale-105 transition-all"
                >
                  Continue Practice &gt;
                </button>
              </div>

              <div className="w-80 rounded-2xl bg-[#0B132B]/95 p-5 border border-cyan-400/30 shadow-2xl space-y-3">
                <span className="font-bold text-cyan-300 text-xs">Upcoming Test</span>
                <h4 className="font-extrabold text-sm text-white">Mathematics Ch - 6 Multiples</h4>
                <p className="text-xs text-neutral-400">Grade IV • Mayoor School (PT 2)</p>
                <button
                  onClick={() => setActiveSurface('tablet')}
                  className="w-full py-2 bg-[#0080FF] text-white font-bold rounded-xl text-xs"
                >
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          MODE 3: FULLSCREEN LAPTOP / DESKTOP ZOOM
      ========================================================================== */}
      {activeSurface === 'desktop' && (
        <main className="flex-1 max-w-6xl w-full mx-auto p-6 space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="font-bold text-cyan-400 text-sm">Laptop / Desktop Dashboard Mode</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveSurface('showcase')}
              className="border-white/20 text-white text-xs"
            >
              Return to Multi-Device Showcase
            </Button>
          </div>

          <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-extrabold text-xl text-slate-900">
                  Grade IV • Mayoor School, Noida • Periodic Test 2
                </h3>
                <p className="text-xs text-slate-500">Student: Arshid • Roll #07</p>
              </div>
              <button
                onClick={() => setActiveSurface('tablet')}
                className="px-5 py-2.5 rounded-xl bg-[#0080FF] text-white font-bold text-xs"
              >
                Launch Assessment &gt;
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { title: 'Mathematics', tests: '3/10', color: 'bg-amber-50 border-amber-200 text-amber-700' },
                { title: 'Science', tests: '3/8', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                { title: 'English', tests: '4/10', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                { title: 'Hindi', tests: '1/8', color: 'bg-rose-50 border-rose-200 text-rose-700' },
                { title: 'Social Science', tests: '2/6', color: 'bg-purple-50 border-purple-200 text-purple-700' },
              ].map((s) => (
                <div key={s.title} className={`p-4 rounded-2xl border ${s.color}`}>
                  <div className="font-bold text-sm">{s.title}</div>
                  <div className="text-xs mt-1">{s.tests} completed</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          MODE 4: FULLSCREEN TABLET SPLIT-SCREEN ZOOM
      ========================================================================== */}
      {activeSurface === 'tablet' && (
        <main className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="font-bold text-cyan-400 text-sm">Tablet Two-Column Practice Mode</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveSurface('showcase')}
              className="border-white/20 text-white text-xs"
            >
              Return to Multi-Device Showcase
            </Button>
          </div>

          <div className="rounded-3xl bg-white text-slate-900 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-[#0080FF] uppercase">Mathematics &gt; Ch - 6 Multiples</span>
                <h3 className="font-black text-xl text-slate-900 mt-1">Periodic Test 2 Diagnostic</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200 font-mono font-bold text-slate-800 text-sm">
                  ⏱ {formatTimer(timeRemainingSeconds)}
                </span>
                <span className="font-bold text-slate-700">7 / 10</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Question */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#0080FF] uppercase">Question 7</span>
                <h4 className="font-bold text-slate-900 text-lg">
                  Which of the following numbers is a multiple of 6?
                </h4>

                <div className="space-y-2 pt-2">
                  {[
                    { id: 'opt_7a', label: 'A', text: '14' },
                    { id: 'opt_7b', label: 'B', text: '18' },
                    { id: 'opt_7c', label: 'C', text: '20' },
                    { id: 'opt_7d', label: 'D', text: '22' },
                  ].map((opt) => {
                    const isSelected = selectedOptionId === opt.id
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedOptionId(opt.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-md'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                              isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {opt.label}
                          </span>
                          <span className="text-sm">{opt.text}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                      </div>
                    )
                  })}
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Correct!
                  </div>
                  <p>6 × 3 = 18, so 18 is a multiple of 6.</p>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 font-bold text-xs">
                  <button className="px-3 py-1 rounded bg-[#0080FF] text-white">Explanation</button>
                  <button className="px-3 py-1 rounded text-slate-500">Hint</button>
                  <button className="px-3 py-1 rounded text-slate-500">Related</button>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <h5 className="font-bold text-slate-900 text-sm">Step by step explanation</h5>
                  <p>Multiples of 6 are numbers obtained by multiplying 6 by whole numbers.</p>
                  <div className="space-y-1 font-mono p-3 rounded-xl bg-white border border-slate-200 text-slate-800">
                    <div>6 × 1 = 6</div>
                    <div>6 × 2 = 12</div>
                    <div className="font-bold text-emerald-600">6 × 3 = 18</div>
                    <div>6 × 4 = 24</div>
                  </div>
                  <p>So, 18 is a multiple of 6.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-1">
                  <div className="font-bold text-amber-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Key Point
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    A number is a multiple of 6 if it appears in the 6-times table: 6, 12, 18, 24, 30 ...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          MODE 5: FULLSCREEN MOBILE PHONE ZOOM
      ========================================================================== */}
      {activeSurface === 'mobile' && (
        <main className="flex-1 max-w-sm w-full mx-auto p-6 space-y-6 animate-in fade-in">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <span className="font-bold text-cyan-400 text-sm">Mobile App View</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setActiveSurface('showcase')}
              className="border-white/20 text-white text-xs"
            >
              Back to Showcase
            </Button>
          </div>

          <div className="rounded-[40px] border-[10px] border-[#1C2234] bg-white text-slate-900 p-4 shadow-2xl space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
              <span>10:24</span>
              <span className="font-bold text-slate-800">Class IV ▾</span>
              <Bell className="w-4 h-4" />
            </div>

            <div>
              <h4 className="font-black text-sm text-slate-900">Good Morning Arshid</h4>
              <p className="text-[10px] text-slate-500">Mayoor School Noida</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold block">Your Learning Progress</span>
                <span className="text-xs font-bold text-slate-800">6/10 tests completed</span>
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-emerald-500 flex items-center justify-center font-bold text-xs text-slate-800">
                60%
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <span className="text-[10px] font-bold text-amber-700 uppercase block">Continue Practice</span>
              <h5 className="font-bold text-xs text-slate-900">Mathematics Ch - 6 Multiples</h5>
              <button
                onClick={() => setActiveSurface('tablet')}
                className="w-full py-2 bg-[#0080FF] text-white rounded-xl font-bold text-xs"
              >
                Start Practice
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
