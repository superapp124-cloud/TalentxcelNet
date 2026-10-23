'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calculator,
  Lock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Award,
  BookOpen,
  Sparkles,
  BarChart3,
  Layers,
  ArrowUpRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { MathQuestion, MathClassTaxonomy, MathBankSummary } from '@talentxcel/core'

interface MathQuestionBankClientProps {
  initialClass: number
  initialQuestions: MathQuestion[]
  taxonomy: MathClassTaxonomy[]
  summary: MathBankSummary
  isAuthenticated: boolean
  userEmail: string | null
}

export function MathQuestionBankClient({
  initialClass,
  initialQuestions,
  taxonomy,
  summary,
  isAuthenticated,
  userEmail,
}: MathQuestionBankClientProps) {
  const [selectedClass, setSelectedClass] = useState<number>(initialClass)
  const currentClassTaxonomy = taxonomy.find((c) => c.classNumber === selectedClass) || taxonomy[0]

  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    currentClassTaxonomy.chapters[0]?.id || ''
  )
  const currentChapter = currentClassTaxonomy.chapters.find((ch) => ch.id === selectedChapterId) || currentClassTaxonomy.chapters[0]

  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false)
  const [showSolution, setShowSolution] = useState<boolean>(false)
  const [jumpInput, setJumpInput] = useState<string>('')

  // Local score tracking for active session
  const [sessionStats, setSessionStats] = useState<{
    attempted: number
    correct: number
    totalMarks: number
  }>({
    attempted: 0,
    correct: 0,
    totalMarks: 0,
  })

  // Dynamic question pool for current class & chapter
  const [questions, setQuestions] = useState<MathQuestion[]>(initialQuestions)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Fetch questions when class or chapter changes (only when authenticated)
  const loadChapterQuestions = async (cls: number, chId?: string, offset: number = 0) => {
    if (!isAuthenticated) return
    setIsLoading(true)
    try {
      const url = `/api/questions/bank?classNumber=${cls}${chId ? `&chapterId=${chId}` : ''}&offset=${offset}&limit=20`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions)
          setCurrentIndex(0)
          setSelectedOptionId(null)
          setIsAnswerSubmitted(false)
          setShowSolution(false)
        }
      }
    } catch (e) {
      console.error('Failed to load questions', e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectClass = (cls: number) => {
    setSelectedClass(cls)
    const newTax = taxonomy.find((c) => c.classNumber === cls)
    const newChId = newTax?.chapters[0]?.id || ''
    setSelectedChapterId(newChId)
    loadChapterQuestions(cls, newChId, 0)
  }

  const handleSelectChapter = (chId: string) => {
    setSelectedChapterId(chId)
    loadChapterQuestions(selectedClass, chId, 0)
  }

  const currentQuestion = questions[currentIndex] || questions[0]

  const handleCheckAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted || !currentQuestion) return
    setIsAnswerSubmitted(true)
    const isCorrect = selectedOptionId === currentQuestion.correctOptionId
    setSessionStats((prev) => ({
      attempted: prev.attempted + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      totalMarks: prev.totalMarks + (isCorrect ? currentQuestion.marks : 0),
    }))
    setShowSolution(true)
  }

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOptionId(null)
      setIsAnswerSubmitted(false)
      setShowSolution(false)
    } else {
      // Load next chunk
      loadChapterQuestions(selectedClass, selectedChapterId, questions.length)
    }
  }

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setSelectedOptionId(null)
      setIsAnswerSubmitted(false)
      setShowSolution(false)
    }
  }

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault()
    const target = parseInt(jumpInput, 10)
    if (!isNaN(target) && target >= 1 && target <= (currentChapter?.targetQuestionCount || 300)) {
      loadChapterQuestions(selectedClass, selectedChapterId, target - 1)
      setJumpInput('')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-16">
      {/* Top Banner */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>Verified Mathematics Question Bank</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Classes 4–12</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Mathematics Chapter-Wise Question Bank
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                {summary.totalQuestionsCount.toLocaleString('en-IN')} formula-verified questions with full step-by-step derivations across {summary.totalClassesCount} classes and 115 curriculum chapters.
              </p>
            </div>

            {/* Metrics Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="block text-xs font-medium text-slate-500">Total Bank</span>
                <span className="text-base font-black text-slate-900">36,490 Qs</span>
              </div>
              <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="block text-xs font-medium text-slate-500">Classes</span>
                <span className="text-base font-black text-blue-600">4 to 12</span>
              </div>
              <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="block text-xs font-medium text-slate-500">Access</span>
                <span className={`text-base font-black ${isAuthenticated ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {isAuthenticated ? 'Unlocked' : 'Behind Login'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* If NOT Authenticated: Show Clean, Engaging Login Gate */}
        {!isAuthenticated ? (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Member-Only Learner Practice</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    The Complete 36,490 Maths Question Bank is Strictly Reserved for Authenticated Learners
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    To maintain individual progress tracking, personal speed analytics, and verified solutions, all 9 classes (Classes 4–12) and 115 chapters are secured behind your student account.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="block text-xs font-semibold text-slate-500">Step Solutions</span>
                      <span className="text-sm font-bold text-slate-900">Every Question</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="block text-xs font-semibold text-slate-500">Formulas Cited</span>
                      <span className="text-sm font-bold text-slate-900">Full Derivations</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="block text-xs font-semibold text-slate-500">Free Practice</span>
                      <span className="text-sm font-bold text-slate-900">100% Free with Login</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
                    <Link
                      href="/auth/login?redirectTo=/dashboard/question-bank"
                      className="w-full sm:w-auto"
                    >
                      <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-sm text-sm">
                        Sign In to Access Question Bank
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
                    <Link href="/auth/register" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-5 py-2.5 rounded-xl text-sm"
                      >
                        Create Free Learner Account
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs aspect-4/3 bg-slate-100">
                    <Image
                      src="/images/kids-tablet-learning.jpg"
                      alt="Student practicing mathematics questions"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                      <div className="text-white">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                          Day-1 Access Included
                        </span>
                        <p className="text-sm font-medium text-white/95">
                          Practice Class 4 through 12 arithmetic, algebra, geometry, calculus, and statistics.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Breakdown Preview Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Curriculum Scope & Question Distribution
                  </h3>
                  <p className="text-xs text-slate-500">
                    36,490 Questions meticulously mapped to CBSE / CISCE / State standards
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
                  9 Classes Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3">
                {taxonomy.map((cls) => (
                  <div
                    key={cls.classNumber}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-blue-200 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-slate-900">{cls.className}</span>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {cls.totalQuestionsTarget.toLocaleString('en-IN')} Qs
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {cls.chapters.length} Chapters: {cls.chapters.slice(0, 3).map((c) => c.title.split('(')[0]).join(', ')}...
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{cls.chapters.length} Chapters</span>
                      <span className="font-semibold text-slate-700">~{Math.round(cls.totalQuestionsTarget / cls.chapters.length)} Qs/ch</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* When Authenticated: The Full Interactive Mathematics Practice Studio */
          <div className="space-y-6">
            {/* Class Selector Tabs */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                Select Class:
              </span>
              {taxonomy.map((cls) => {
                const isSelected = selectedClass === cls.classNumber
                return (
                  <button
                    key={cls.classNumber}
                    onClick={() => handleSelectClass(cls.classNumber)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cls.className}
                    <span className={`ml-1 text-[10px] font-medium opacity-85 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      ({cls.totalQuestionsTarget.toLocaleString('en-IN')})
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Chapter Selector & Jump Form */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
                <label htmlFor="chapter-select" className="text-xs font-bold text-slate-600 whitespace-nowrap">
                  Chapter:
                </label>
                <select
                  id="chapter-select"
                  value={selectedChapterId}
                  onChange={(e) => handleSelectChapter(e.target.value)}
                  className="w-full sm:w-auto flex-1 max-w-md bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  {currentClassTaxonomy.chapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Ch {ch.chapterNumber}: {ch.title} ({ch.targetQuestionCount} Qs)
                    </option>
                  ))}
                </select>
                <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                  {currentChapter?.topics.length || 0} Topics Mapped
                </span>
              </div>

              {/* Jump to specific Question Index */}
              <form onSubmit={handleJump} className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Jump to Q#:</span>
                <input
                  type="number"
                  min="1"
                  max={currentChapter?.targetQuestionCount || 300}
                  placeholder="1-330"
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  className="w-20 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <Button type="submit" size="sm" variant="outline" className="text-xs font-bold h-8 rounded-xl px-3">
                  Go
                </Button>
              </form>
            </div>

            {/* Workspace Grid: Question Card & Session Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Question & Solution Viewport */}
              <div className="lg:col-span-8 space-y-4">
                {currentQuestion ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                          Question {currentIndex + 1} of {questions.length}
                        </span>
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          Ch {currentQuestion.chapterNumber}: {currentQuestion.chapterTitle.split('(')[0]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md uppercase">
                          {currentQuestion.difficulty}
                        </span>
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {currentQuestion.marks} {currentQuestion.marks === 1 ? 'Mark' : 'Marks'}
                        </span>
                      </div>
                    </div>

                    {/* Topic Name */}
                    <div className="text-xs font-medium text-slate-400">
                      Topic: <span className="text-slate-600 font-semibold">{currentQuestion.topicTitle}</span>
                    </div>

                    {/* Question Text */}
                    <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                      {currentQuestion.questionText}
                    </div>

                    {/* Options Grid */}
                    <div className="space-y-2.5 pt-2">
                      {currentQuestion.options.map((option) => {
                        const isSelected = selectedOptionId === option.id
                        const isCorrect = option.id === currentQuestion.correctOptionId
                        let optionStyle = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'

                        if (isAnswerSubmitted) {
                          if (isCorrect) {
                            optionStyle = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold'
                          } else if (isSelected && !isCorrect) {
                            optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through'
                          } else {
                            optionStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60'
                          }
                        } else if (isSelected) {
                          optionStyle = 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 text-blue-950 font-semibold'
                        }

                        return (
                          <button
                            key={option.id}
                            disabled={isAnswerSubmitted}
                            onClick={() => setSelectedOptionId(option.id)}
                            className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold ${
                                  isSelected
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {option.label}
                              </span>
                              <span className="text-sm">{option.text}</span>
                            </div>

                            {isAnswerSubmitted && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                            )}
                            {isAnswerSubmitted && isSelected && !isCorrect && (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={currentIndex === 0}
                          onClick={handlePrevQuestion}
                          className="h-9 px-3 rounded-xl text-xs font-bold"
                        >
                          <ChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleNextQuestion}
                          className="h-9 px-3 rounded-xl text-xs font-bold"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isAnswerSubmitted ? (
                          <Button
                            disabled={!selectedOptionId}
                            onClick={handleCheckAnswer}
                            className="h-9 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-2xs"
                          >
                            Check Answer
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowSolution(!showSolution)}
                            className="h-9 px-3 rounded-xl text-xs font-bold border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            {showSolution ? 'Hide Solution' : 'View Derivation & Solution'}
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Step-by-Step Mathematical Derivation Card */}
                    {showSolution && (
                      <div className="mt-4 p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3 animate-in fade-in-50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            Step-by-Step Mathematical Derivation
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                            Correct: Option {currentQuestion.options.find((o) => o.id === currentQuestion.correctOptionId)?.label}
                          </span>
                        </div>

                        {currentQuestion.keyFormula && (
                          <div className="p-2.5 bg-white rounded-xl border border-blue-200/80 text-xs text-blue-900 font-mono font-semibold">
                            Key Formula: {currentQuestion.keyFormula}
                          </div>
                        )}

                        <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                          {currentQuestion.solutionSteps.map((step, idx) => (
                            <p key={idx} className="font-medium">
                              {step}
                            </p>
                          ))}
                        </div>

                        <div className="pt-2 text-xs text-slate-600 border-t border-blue-200/60 font-medium">
                          <span className="font-bold text-slate-800">Concept:</span> {currentQuestion.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <p className="text-sm text-slate-500">Loading questions from the mathematics engine...</p>
                  </div>
                )}
              </div>

              {/* Sidebar: Session Stats & Chapter Syllabus */}
              <div className="lg:col-span-4 space-y-4">
                {/* Session Performance Card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      Session Analytics
                    </span>
                    <span className="text-xs font-semibold text-slate-400">Live</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                      <span className="block text-xs text-slate-500 font-medium">Attempted</span>
                      <span className="text-xl font-black text-slate-900">{sessionStats.attempted}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                      <span className="block text-xs text-slate-500 font-medium">Correct</span>
                      <span className="text-xl font-black text-emerald-600">{sessionStats.correct}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900">Session Accuracy</span>
                    <span className="text-sm font-black text-blue-700">
                      {sessionStats.attempted > 0
                        ? `${Math.round((sessionStats.correct / sessionStats.attempted) * 100)}%`
                        : '0%'}
                    </span>
                  </div>
                </div>

                {/* Chapter Topics Overview */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    Chapter Topics
                  </span>

                  <div className="space-y-2">
                    {currentChapter?.topics.map((t, idx) => (
                      <div
                        key={t.id}
                        className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 text-xs font-medium text-slate-700 flex items-center gap-2"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        <span className="line-clamp-2">{t.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
