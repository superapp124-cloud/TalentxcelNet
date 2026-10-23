import { useState, useEffect } from 'react'
import {
  Home,
  BookOpen,
  FileText,
  Layers,
  Award,
  User,
  Search,
  Bell,
  ChevronRight,
  Play,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Laptop,
  Tv,
  Tablet,
  Smartphone,
  Compass,
  FlaskConical,
  Calculator,
  RotateCcw,
  Wallet,
  Settings,
} from 'lucide-react'
import {
  SEED_GRADE4_SUBJECTS,
  SEED_BLUEPRINT_MATH_C6,
  SEED_AUTHORIZED_QUESTIONS,
  SEED_CONFIDENTIAL_SOLUTIONS,
  evaluateAssessmentAttempt,
  type AuthorizedQuestion,
  type AssessmentResult,
  type SubmittedAnswer,
} from '@talentxcel/core'

type DeviceView = 'tv' | 'desktop' | 'tablet' | 'mobile'
type AppScreen = 'dashboard' | 'test' | 'results' | 'plans'

export default function App() {
  const [deviceView, setDeviceView] = useState<DeviceView>('tv')
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('dashboard')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(6) // Default to Question 7 (index 6) to match the screenshot!
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({
    'q_g4_m6_07': 'opt_7b', // Default option B selected to match screenshot
  })
  const [activeTab, setActiveTab] = useState<'explanation' | 'hint' | 'related'>('explanation')
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState(504) // 08:24 remaining
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const [walletBalance, setWalletBalance] = useState(60) // ₹60 earned in pass-credits

  // Timer simulation
  useEffect(() => {
    if (currentScreen !== 'test' || timeRemainingSeconds <= 0) return
    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [currentScreen, timeRemainingSeconds])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleStartTest = () => {
    setCurrentScreen('test')
    setCurrentQuestionIndex(6) // Question 7 from screenshot
    setTimeRemainingSeconds(504)
  }

  const handleSubmitTest = () => {
    const submittedPayload: SubmittedAnswer[] = SEED_AUTHORIZED_QUESTIONS.map((q) => ({
      questionId: q.id,
      selectedOptionIds: selectedAnswers[q.id] ? [selectedAnswers[q.id]] : [],
      timeSpentSeconds: 45,
    }))

    const result = evaluateAssessmentAttempt({
      attemptId: 'att_live_' + Date.now(),
      blueprint: SEED_BLUEPRINT_MATH_C6,
      learnerId: 'learner_arshid_grade4',
      questions: SEED_AUTHORIZED_QUESTIONS,
      solutions: SEED_CONFIDENTIAL_SOLUTIONS,
      submittedAnswers: submittedPayload,
    })

    setAssessmentResult(result)
    if (result.passed && result.earnedPassCredits > 0) {
      setWalletBalance((prev) => prev + result.earnedPassCredits)
    }
    setCurrentScreen('results')
  }

  const currentQ: AuthorizedQuestion = SEED_AUTHORIZED_QUESTIONS[currentQuestionIndex]
  const currentSolution = SEED_CONFIDENTIAL_SOLUTIONS.get(currentQ.id)

  return (
    <div className="min-h-screen bg-[#070B14] text-white flex flex-col font-sans">
      {/* =========================================================================
          TOP FLOATING DEVICE VIEW SIMULATOR CONTROLS
          Allows instant switching between TV, Desktop, Tablet, and Mobile
      ========================================================================== */}
      <header className="sticky top-0 z-50 bg-[#0B132B]/95 backdrop-blur-md border-b border-[#2A365D] px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0080FF] text-white font-black text-sm">
            TX
          </div>
          <div>
            <span className="font-bold tracking-tight text-white">TalentXcel</span>
            <span className="text-[10px] text-[#00D2FF] ml-1.5 font-medium border border-[#00D2FF]/30 px-1.5 py-0.2 rounded-full">
              Multi-Surface
            </span>
          </div>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 bg-[#1C2541] p-1 rounded-xl border border-[#2A365D]">
          <button
            onClick={() => { setDeviceView('tv'); setCurrentScreen('dashboard'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              deviceView === 'tv'
                ? 'bg-[#0080FF] text-white shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tv className="h-3.5 w-3.5" />
            <span>TV Experience</span>
          </button>

          <button
            onClick={() => { setDeviceView('desktop'); setCurrentScreen('dashboard'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              deviceView === 'desktop'
                ? 'bg-[#0080FF] text-white shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Laptop className="h-3.5 w-3.5" />
            <span>Laptop / Desktop</span>
          </button>

          <button
            onClick={() => { setDeviceView('tablet'); setCurrentScreen('test'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              deviceView === 'tablet'
                ? 'bg-[#0080FF] text-white shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            <span>Tablet Split-UI</span>
          </button>

          <button
            onClick={() => { setDeviceView('mobile'); setCurrentScreen('dashboard'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              deviceView === 'mobile'
                ? 'bg-[#0080FF] text-white shadow-md'
                : 'text-neutral-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile Phone</span>
          </button>
        </div>

        {/* Wallet / Pass Credit Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            <Wallet className="h-3.5 w-3.5" />
            <span>₹{walletBalance} Pass Credits</span>
          </div>
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white"
            title="Reset to Dashboard"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          VIEW MODE 1: TELEVISION EXPERIENCE (10-FOOT REMOTE UI)
          Identical to the top TV display in the user's uploaded image
      ========================================================================== */}
      {deviceView === 'tv' && currentScreen === 'dashboard' && (
        <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
          {/* TV Top Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#1C2541]">
            <div className="flex items-center gap-8">
              <div className="space-y-0.5">
                <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                  Talent<span className="text-[#0080FF]">Xcel</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-neutral-400 block font-medium">
                  Learn · Practise · Grow
                </span>
              </div>

              {/* Glowing TV Pills */}
              <nav className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#0080FF] text-white font-bold text-sm shadow-[0_0_20px_rgba(0,128,255,0.45)] ring-2 ring-white/20">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </button>
                {['My Learning', 'Tests', 'Subjects', 'Results', 'Plans', 'Profile'].map((item) => (
                  <button
                    key={item}
                    className="px-4 py-2 rounded-full text-sm font-semibold text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2.5 rounded-full bg-[#1C2541] text-neutral-300 hover:text-white">
                <Search className="h-4 w-4" />
              </button>
              <button className="p-2.5 rounded-full bg-[#1C2541] text-neutral-300 hover:text-white relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
              </button>
              <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#0080FF] to-cyan-400 flex items-center justify-center font-black text-white text-sm shadow-md">
                A
              </div>
            </div>
          </div>

          {/* TV Body Grid: Left Content + Right Quick Access */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 flex-1 items-start">
            {/* Left 9.5 Columns */}
            <div className="lg:col-span-9 space-y-6">
              {/* Hero Banner with Student Visual & Upcoming Test Highlight */}
              <div className="relative rounded-3xl bg-gradient-to-r from-[#0D1B3E] via-[#0F285A] to-[#123E82] p-6 sm:p-8 overflow-hidden border border-[#2A365D] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-4 max-w-md z-10">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Welcome</span>
                    <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                      Keep Learning,<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#00D2FF]">
                        Keep Growing
                      </span>
                    </h1>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    Syllabus-aligned practice tests, explanations and personalised learning for school and competitive exams.
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={handleStartTest}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0B132B] font-extrabold text-sm shadow-lg hover:bg-neutral-100 transition-all hover:scale-105"
                    >
                      <Play className="h-4 w-4 fill-[#0B132B]" />
                      <span>Continue Practice</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Upcoming Test Highlight Card */}
                <div className="w-full md:w-80 rounded-2xl bg-[#0B132B]/90 backdrop-blur-md p-5 border border-cyan-400/30 shadow-xl space-y-3 z-10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-cyan-300 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> Upcoming Test
                    </span>
                    <span className="text-[11px] text-neutral-400 hover:text-white cursor-pointer">View All &gt;</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      <Calculator className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Mathematics</h4>
                      <p className="text-xs text-amber-400 font-semibold">Ch - 6 Multiples</p>
                      <p className="text-[11px] text-neutral-400">Grade IV • Mayoor School (PT 2)</p>
                      <p className="text-[11px] text-neutral-300 font-medium mt-1">🗓 17 Nov 2026</p>
                    </div>
                  </div>

                  <button
                    onClick={handleStartTest}
                    className="w-full py-2.5 rounded-xl bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Start Practice</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* 5 Vibrant Subject Cards Row (Matching Screenshot) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-white">Subject Tracks (Grade IV)</h3>
                  <span className="text-xs text-neutral-400">Syllabus-Aligned</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                  {SEED_GRADE4_SUBJECTS.map((subj) => {
                    const isMath = subj.code === 'math'
                    const isSci = subj.code === 'science'
                    const isEng = subj.code === 'english'
                    const isHin = subj.code === 'hindi'
                    const isSst = subj.code === 'social_science'

                    const borderClass = isMath
                      ? 'border-amber-500/40 hover:border-amber-400'
                      : isSci
                      ? 'border-emerald-500/40 hover:border-emerald-400'
                      : isEng
                      ? 'border-blue-500/40 hover:border-blue-400'
                      : isHin
                      ? 'border-rose-500/40 hover:border-rose-400'
                      : 'border-purple-500/40 hover:border-purple-400'

                    const barColor = isMath
                      ? 'bg-amber-500'
                      : isSci
                      ? 'bg-emerald-500'
                      : isEng
                      ? 'bg-blue-500'
                      : isHin
                      ? 'bg-rose-500'
                      : 'bg-purple-500'

                    const iconColor = isMath
                      ? 'text-amber-400'
                      : isSci
                      ? 'text-emerald-400'
                      : isEng
                      ? 'text-blue-400'
                      : isHin
                      ? 'text-rose-400'
                      : 'text-purple-400'

                    return (
                      <div
                        key={subj.id}
                        onClick={handleStartTest}
                        className={`rounded-2xl bg-[#0D1527] p-4 border ${borderClass} shadow-md hover:scale-[1.03] transition-all cursor-pointer flex flex-col justify-between space-y-3`}
                      >
                        <div className="space-y-1.5">
                          <div className={`p-2.5 rounded-xl bg-white/5 w-fit ${iconColor}`}>
                            {isMath && <Calculator className="h-5 w-5" />}
                            {isSci && <FlaskConical className="h-5 w-5" />}
                            {isEng && <BookOpen className="h-5 w-5" />}
                            {isHin && <span className="font-bold text-base">अ</span>}
                            {isSst && <Compass className="h-5 w-5" />}
                          </div>
                          <h4 className="font-extrabold text-sm text-white">{subj.name}</h4>
                          <p className="text-[11px] text-neutral-400 font-medium">Practice · Tests · Revision</p>
                        </div>

                        <div className="space-y-1 pt-2 border-t border-white/5">
                          <div className="flex justify-between text-[10px] text-neutral-400">
                            <span>Progress</span>
                            <span className="font-semibold text-white">
                              {subj.completedTests}/{subj.totalTests} tests
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${barColor}`}
                              style={{ width: `${(subj.completedTests / subj.totalTests) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Quick Access Sidebar (3.5 Columns) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-2xl bg-[#0D1527] border border-[#2A365D] p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Quick Access</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#00D2FF] bg-[#00D2FF]/10 px-2.5 py-1 rounded-lg border border-[#00D2FF]/30">
                    <span>Class 4</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0080FF] text-white font-bold text-xs shadow-md">
                    <FileText className="h-4 w-4" />
                    <span>School Tests</span>
                  </div>

                  {[
                    { label: 'Competitive Exams', icon: Award },
                    { label: 'Skill Development', icon: Layers },
                    { label: 'AI Tutor (SI)', icon: Sparkles },
                    { label: 'Settings', icon: Settings },
                  ].map((menu) => (
                    <div
                      key={menu.label}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-semibold text-xs transition-all cursor-pointer"
                    >
                      <menu.icon className="h-4 w-4 text-neutral-400" />
                      <span>{menu.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Summary Card */}
              <div className="rounded-2xl bg-[#0D1527] border border-[#2A365D] p-5 space-y-3">
                <h4 className="text-xs font-bold text-neutral-300">Your Progress</h4>
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#0080FF] text-lg font-black text-white">
                    60%
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-sm font-extrabold text-white">6/10 Tests Done</span>
                    <p className="text-[11px] text-emerald-400 font-medium">On track for PT 2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Remote Navigation Hint Banner at Bottom */}
          <footer className="pt-4 border-t border-[#1C2541] text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
            <span>Use arrow keys on your remote</span>
            <span>•</span>
            <span>Press OK to select</span>
            <span>•</span>
            <span>Press Back to go to previous screen</span>
          </footer>
        </main>
      )}

      {/* =========================================================================
          VIEW MODE 2: TABLET SPLIT-SCREEN LAYOUT
          (Question on Left, Step-by-Step Explanation & Key Point on Right)
          Identical to the tablet in the user's uploaded image!
      ========================================================================== */}
      {(deviceView === 'tablet' || currentScreen === 'test') && (
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-between">
          {/* Top Bar with Timer, Progress, and Exit */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1C2541]">
            <div className="flex items-center gap-3">
              <span className="font-black text-lg text-white">Talent<span className="text-[#0080FF]">Xcel</span></span>
              <span className="text-neutral-500">|</span>
              <span className="text-xs font-semibold text-neutral-400">
                Mathematics &gt; Ch - 6 Multiples
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-white">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>
              <span className="text-xs font-bold text-neutral-300">
                {currentQuestionIndex + 1}/{SEED_AUTHORIZED_QUESTIONS.length}
              </span>
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="text-xs font-bold text-neutral-400 hover:text-rose-400 px-2 py-1"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Tablet Two-Column Split Screen */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 flex-1 items-start">
            {/* Left Column: Question & Options Area */}
            <div className="rounded-3xl bg-[#0D1527] border border-[#2A365D] p-6 space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-[#00D2FF] uppercase tracking-wider">
                  Question {currentQuestionIndex + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {currentQ.questionText}
                </h2>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQ.id] === opt.id
                  const isCorrectAnswer = currentSolution?.correctOptionIds.includes(opt.id)

                  let optionStyle = 'border-white/10 bg-white/5 text-neutral-200 hover:border-white/30'
                  if (isSelected) {
                    optionStyle = isCorrectAnswer
                      ? 'border-emerald-500 bg-emerald-500/20 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'border-[#0080FF] bg-[#0080FF]/20 text-white'
                  }

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQ.id, opt.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border ${optionStyle} cursor-pointer transition-all`}
                    >
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
                          isSelected
                            ? isCorrectAnswer
                              ? 'bg-emerald-500 text-white'
                              : 'bg-[#0080FF] text-white'
                            : 'bg-white/10 text-neutral-300'
                        }`}
                      >
                        {opt.label}
                      </div>
                      <span className="font-medium text-base text-white">{opt.text}</span>
                    </div>
                  )
                })}
              </div>

              {/* Instant Socratic Feedback Badge */}
              {selectedAnswers[currentQ.id] && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-sm">Correct!</span>
                    <span>6 × 3 = 18, so 18 is a multiple of 6.</span>
                  </div>
                </div>
              )}

              {/* Question Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-neutral-300 hover:bg-white/5 disabled:opacity-30"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    if (currentQuestionIndex < SEED_AUTHORIZED_QUESTIONS.length - 1) {
                      setCurrentQuestionIndex((prev) => prev + 1)
                    } else {
                      handleSubmitTest()
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0080FF] hover:bg-[#0070E0] text-xs font-bold text-white shadow-md"
                >
                  {currentQuestionIndex < SEED_AUTHORIZED_QUESTIONS.length - 1 ? 'Next' : 'Submit Test'}
                </button>
              </div>
            </div>

            {/* Right Column: Step-by-Step Explanation & Key Point Card */}
            <div className="rounded-3xl bg-[#0D1527] border border-[#2A365D] p-6 space-y-6 shadow-xl">
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <button
                  onClick={() => setActiveTab('explanation')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === 'explanation'
                      ? 'bg-white/10 text-[#00D2FF] border border-[#00D2FF]/30'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Explanation
                </button>
                <button
                  onClick={() => setActiveTab('hint')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === 'hint'
                      ? 'bg-white/10 text-[#00D2FF] border border-[#00D2FF]/30'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Hint
                </button>
                <button
                  onClick={() => setActiveTab('related')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === 'related'
                      ? 'bg-white/10 text-[#00D2FF] border border-[#00D2FF]/30'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Related
                </button>
              </div>

              {/* Step by step explanation */}
              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                <h4 className="font-extrabold text-sm text-white">Step by step explanation</h4>
                <p>
                  Multiples of 6 are numbers obtained by multiplying 6 by whole numbers.
                </p>
                <div className="space-y-1 font-mono p-4 rounded-xl bg-black/40 border border-white/5 text-neutral-200">
                  <p>6 × 1 = 6</p>
                  <p>6 × 2 = 12</p>
                  <p className="text-emerald-400 font-bold">6 × 3 = 18</p>
                  <p>6 × 4 = 24</p>
                </div>
                <p>So, 18 is a multiple of 6.</p>
              </div>

              {/* Yellow Key Point Box (Identical to Screenshot) */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
                <span className="font-extrabold flex items-center gap-1.5 text-amber-300">
                  <Sparkles className="h-4 w-4" /> Key Point
                </span>
                <p className="leading-relaxed">
                  A number is a multiple of 6 if it appears in the 6-times table: 6, 12, 18, 24, 30 ...
                </p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW MODE 3: DESKTOP / LAPTOP FULL WORKSPACE
      ========================================================================== */}
      {deviceView === 'desktop' && currentScreen === 'dashboard' && (
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1C2541]">
            <div>
              <span className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider">
                Grade IV • Mayoor School, Noida • Periodic Test 2
              </span>
              <h2 className="text-2xl font-black text-white">Learner Academic Workspace</h2>
            </div>
            <button
              onClick={handleStartTest}
              className="px-5 py-2.5 rounded-xl bg-[#0080FF] hover:bg-[#0070E0] text-white font-bold text-xs shadow-md"
            >
              Resume Test &gt;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Upcoming Tests List */}
              <div className="rounded-3xl bg-[#0D1527] border border-[#2A365D] p-6 space-y-4">
                <h3 className="font-extrabold text-base text-white">Upcoming Tests</h3>
                <div className="space-y-3">
                  {[
                    { date: '17 Nov 2026', subj: 'Mathematics', ch: 'Ch - 6 Multiples', code: 'math' },
                    { date: '19 Nov 2026', subj: 'Science', ch: 'Unit 5 - Force and Magnetism', code: 'science' },
                    { date: '23 Nov 2026', subj: 'English', ch: 'Ch - 8 The Pied Piper of Hamelin', code: 'english' },
                  ].map((test, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-neutral-400 bg-black/30 px-2.5 py-1 rounded-lg">
                          {test.date}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-white">{test.subj}</h4>
                          <p className="text-xs text-neutral-400">{test.ch}</p>
                        </div>
                      </div>
                      <button
                        onClick={handleStartTest}
                        className="px-4 py-1.5 rounded-xl bg-[#0080FF] text-white font-bold text-xs shadow-sm hover:scale-105"
                      >
                        Start
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Progress & Recommended */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-[#0D1527] border border-[#2A365D] p-6 space-y-4">
                <h3 className="font-extrabold text-base text-white">Your Progress</h3>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full border-4 border-[#0080FF] flex items-center justify-center font-black text-xl text-white">
                    60%
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block">6/10 Completed</span>
                    <span className="text-xs text-neutral-400">Periodic Test 2 Readiness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW MODE 4: MOBILE PHONE PHONE FRAME
      ========================================================================== */}
      {deviceView === 'mobile' && currentScreen === 'dashboard' && (
        <main className="flex-1 flex justify-center p-4">
          <div className="w-full max-w-sm rounded-[40px] border-4 border-[#2A365D] bg-[#0B132B] p-4 flex flex-col justify-between shadow-2xl space-y-4">
            {/* Mobile Top Header */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-[#0080FF] flex items-center justify-center font-bold text-white text-xs">
                  A
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white">Good Morning Arshid</h4>
                  <span className="text-[10px] text-neutral-400">Class IV ▾</span>
                </div>
              </div>
              <Bell className="h-4 w-4 text-neutral-400" />
            </div>

            {/* Mobile Progress Card */}
            <div className="p-4 rounded-2xl bg-[#0D1527] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 font-semibold block">Your Learning Progress</span>
                <span className="text-xs font-bold text-white">6/10 Tests Completed</span>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-[#0080FF] flex items-center justify-center text-xs font-bold text-white">
                60%
              </div>
            </div>

            {/* Mobile Continue Card */}
            <div className="p-4 rounded-2xl bg-[#0D1527] border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400">Continue Practice</span>
                <span className="text-[10px] text-neutral-400">17 Nov</span>
              </div>
              <h5 className="font-bold text-xs text-white">Mathematics Ch - 6 Multiples</h5>
              <button
                onClick={handleStartTest}
                className="w-full py-2 rounded-xl bg-[#0080FF] text-white font-bold text-xs"
              >
                Start
              </button>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-around text-neutral-400 text-[10px]">
              <div className="flex flex-col items-center gap-1 text-[#0080FF]">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Tests</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span>AI Tutor</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          ASSESSMENT RESULTS SCREEN (SERVER AUTHORITATIVE EVALUATION)
      ========================================================================== */}
      {currentScreen === 'results' && assessmentResult && (
        <main className="flex-1 max-w-4xl w-full mx-auto p-6 space-y-6">
          <div className="rounded-3xl bg-[#0D1527] border border-[#2A365D] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#00D2FF] uppercase tracking-wider">
                Authoritative Evaluation Complete
              </span>
              <h2 className="text-3xl font-black text-white">
                {assessmentResult.passed ? '🎉 Congratulations, You Passed!' : 'Review & Practice Again'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300">
                Mathematics Ch - 6 Multiples • Grade IV Periodic Test 2
              </p>
            </div>

            {/* Score Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-[11px] text-neutral-400 block font-semibold">Score Obtained</span>
                <span className="text-2xl font-black text-white">
                  {assessmentResult.scoreObtained}/{assessmentResult.maxMarks}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-[11px] text-neutral-400 block font-semibold">Percentage</span>
                <span className="text-2xl font-black text-emerald-400">
                  {assessmentResult.percentage}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-[11px] text-neutral-400 block font-semibold">Accuracy</span>
                <span className="text-2xl font-black text-cyan-400">
                  {assessmentResult.accuracyPercentage}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                <span className="text-[11px] text-neutral-400 block font-semibold">Pass Credits</span>
                <span className="text-2xl font-black text-amber-400">
                  +₹{assessmentResult.earnedPassCredits}
                </span>
              </div>
            </div>

            {/* Explanations List */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="font-extrabold text-base text-white">Verified Question Breakdown</h3>
              {assessmentResult.evaluations.map((ev, i) => (
                <div key={ev.questionId} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Question {i + 1}</span>
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${ev.isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {ev.isCorrect ? '✓ Correct (+2 Marks)' : '✗ Incorrect (0 Marks)'}
                    </span>
                  </div>
                  <p className="text-neutral-300 leading-relaxed">{ev.explanation}</p>
                  {ev.keyPoint && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 text-[11px]">
                      {ev.keyPoint}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setCurrentScreen('dashboard')}
                className="px-6 py-2.5 rounded-xl bg-[#0080FF] hover:bg-[#0070E0] text-xs font-bold text-white shadow-md"
              >
                Back to Dashboard
              </button>
              <button
                onClick={handleStartTest}
                className="px-6 py-2.5 rounded-xl border border-white/20 text-xs font-bold text-white hover:bg-white/5"
              >
                Retry Test
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
