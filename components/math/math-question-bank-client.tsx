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
  FlaskConical,
  Languages,
  Globe2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import type {
  MathQuestion,
  MathClassTaxonomy,
  MathBankSummary,
  BoardCode,
  SubjectCode,
  UniversalQuestion,
  UniversalBankSummary,
  UniversalChapterMeta,
} from '@talentxcel/core'
import {
  getBoardAlignmentForClass,
  UNIVERSAL_SUBJECTS,
  getSubjectBoardCitations,
  SCIENCE_CLASSES_TAXONOMY,
  ENGLISH_CLASSES_TAXONOMY,
  HINDI_CLASSES_TAXONOMY,
  SOCIAL_SCIENCE_CLASSES_TAXONOMY,
} from '@talentxcel/core'

interface MathQuestionBankClientProps {
  initialClass: number
  initialQuestions: MathQuestion[] | UniversalQuestion[]
  taxonomy: MathClassTaxonomy[]
  summary: MathBankSummary | UniversalBankSummary
  isAuthenticated: boolean
  userEmail: string | null
  initialSubject?: SubjectCode
}

export function MathQuestionBankClient({
  initialClass,
  initialQuestions,
  taxonomy,
  summary,
  isAuthenticated,
  userEmail,
  initialSubject = 'math',
}: MathQuestionBankClientProps) {
  const [selectedSubject, setSelectedSubject] = useState<SubjectCode>(initialSubject)
  const [selectedClass, setSelectedClass] = useState<number>(initialClass)
  const [selectedBoard, setSelectedBoard] = useState<BoardCode>('CBSE')
  const [selectedBranch, setSelectedBranch] = useState<string>('all')
  const [showBoardModal, setShowBoardModal] = useState<boolean>(false)

  // Subject metadata
  const currentSubjectMeta =
    UNIVERSAL_SUBJECTS.find((s) => s.code === selectedSubject) || UNIVERSAL_SUBJECTS[0]

  // Get active taxonomy for selected subject & class
  const getSubjectTaxonomyList = (subject: SubjectCode) => {
    switch (subject) {
      case 'science':
        return SCIENCE_CLASSES_TAXONOMY
      case 'english':
        return ENGLISH_CLASSES_TAXONOMY
      case 'hindi':
        return HINDI_CLASSES_TAXONOMY
      case 'social_science':
        return SOCIAL_SCIENCE_CLASSES_TAXONOMY
      case 'math':
      default:
        return taxonomy
    }
  }

  const activeTaxonomyList = getSubjectTaxonomyList(selectedSubject)
  const currentClassTaxonomy =
    activeTaxonomyList.find((c) => c.classNumber === selectedClass) || activeTaxonomyList[0]

  // Filter chapters by senior branch if applicable
  const availableChapters = React.useMemo(() => {
    if (!currentClassTaxonomy?.chapters) return []
    if (selectedClass >= 9 && selectedBranch !== 'all') {
      const filtered = currentClassTaxonomy.chapters.filter(
        (ch) => ch.disciplineCode === selectedBranch
      )
      return filtered.length > 0 ? filtered : currentClassTaxonomy.chapters
    }
    return currentClassTaxonomy.chapters
  }, [currentClassTaxonomy, selectedClass, selectedBranch])

  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    availableChapters[0]?.id || ''
  )

  // Sync chapter selection if chapters change
  React.useEffect(() => {
    if (availableChapters.length > 0) {
      const exists = availableChapters.some((ch) => ch.id === selectedChapterId)
      if (!exists) {
        setSelectedChapterId(availableChapters[0].id)
      }
    }
  }, [availableChapters, selectedChapterId])

  const currentChapter =
    availableChapters.find((ch) => ch.id === selectedChapterId) || availableChapters[0]

  const currentBoardAlignment = getBoardAlignmentForClass(selectedClass)
  const currentSubjectCitations = getSubjectBoardCitations(selectedSubject, selectedClass, selectedBoard)

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

  // Dynamic question pool
  const [questions, setQuestions] = useState<UniversalQuestion[]>(
    (initialQuestions as UniversalQuestion[]) || []
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Fetch questions from API
  const loadQuestions = async (
    subject: SubjectCode,
    cls: number,
    chId?: string,
    offset: number = 0,
    board?: BoardCode,
    branch?: string
  ) => {
    if (!isAuthenticated) return
    setIsLoading(true)
    const activeBoard = board || selectedBoard
    const activeBranch = branch !== undefined ? branch : selectedBranch
    try {
      const branchQuery = activeBranch && activeBranch !== 'all' ? `&branch=${activeBranch}` : ''
      const url = `/api/questions/bank?subject=${subject}&classNumber=${cls}${chId ? `&chapterId=${chId}` : ''}&offset=${offset}&limit=20&boardCode=${activeBoard}${branchQuery}`
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

  const handleSelectSubject = (subj: SubjectCode) => {
    setSelectedSubject(subj)
    setSelectedBranch('all')
    const taxList = getSubjectTaxonomyList(subj)
    const classTax = taxList.find((c) => c.classNumber === selectedClass) || taxList[0]
    const firstChId = classTax?.chapters[0]?.id || ''
    setSelectedChapterId(firstChId)
    loadQuestions(subj, selectedClass, firstChId, 0, selectedBoard, 'all')
  }

  const handleSelectClass = (cls: number) => {
    setSelectedClass(cls)
    setSelectedBranch('all')
    const taxList = getSubjectTaxonomyList(selectedSubject)
    const classTax = taxList.find((c) => c.classNumber === cls) || taxList[0]
    const firstChId = classTax?.chapters[0]?.id || ''
    setSelectedChapterId(firstChId)
    loadQuestions(selectedSubject, cls, firstChId, 0, selectedBoard, 'all')
  }

  const handleSelectBranch = (branch: string) => {
    setSelectedBranch(branch)
    // find chapter matching branch if any
    const matchingCh = currentClassTaxonomy?.chapters.find(
      (ch) => branch === 'all' || ch.disciplineCode === branch
    )
    const chId = matchingCh ? matchingCh.id : undefined
    if (chId) setSelectedChapterId(chId)
    loadQuestions(selectedSubject, selectedClass, chId, 0, selectedBoard, branch)
  }

  const handleSelectChapter = (chId: string) => {
    setSelectedChapterId(chId)
    loadQuestions(selectedSubject, selectedClass, chId, 0, selectedBoard, selectedBranch)
  }

  const handleSelectBoard = (board: BoardCode) => {
    setSelectedBoard(board)
    loadQuestions(selectedSubject, selectedClass, selectedChapterId, 0, board, selectedBranch)
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
      loadQuestions(selectedSubject, selectedClass, selectedChapterId, questions.length, selectedBoard, selectedBranch)
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
    if (!isNaN(target) && target >= 1 && target <= (currentChapter?.targetQuestionCount || 1000)) {
      loadQuestions(selectedSubject, selectedClass, selectedChapterId, target - 1, selectedBoard, selectedBranch)
      setJumpInput('')
    }
  }

  // Helper for subject icons
  const getSubjectIcon = (code: SubjectCode) => {
    switch (code) {
      case 'science':
        return <FlaskConical className="w-4 h-4" />
      case 'english':
        return <BookOpen className="w-4 h-4" />
      case 'hindi':
        return <Languages className="w-4 h-4" />
      case 'social_science':
        return <Globe2 className="w-4 h-4" />
      case 'math':
      default:
        return <Calculator className="w-4 h-4" />
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
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Universal Multi-Subject Question Bank Engine</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>5 Core Disciplines • Classes 4–12</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Universal Chapter-Wise Question Bank
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-3xl">
                3,000,000 formula-verified and syllabus-aligned questions across Mathematics, Science, English, Hindi, and Social Science with authentic textbook citations and derivations.
              </p>
            </div>

            {/* Metrics Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="block text-xs font-medium text-slate-500">Total Bank</span>
                <span className="text-base font-black text-slate-900">3,000,000 Qs</span>
              </div>
              <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="block text-xs font-medium text-slate-500">Per Subject</span>
                <span className="text-base font-black text-blue-600">600,000 Qs</span>
              </div>
              <div className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="block text-xs font-medium text-slate-500">Classes 9–12</span>
                <span className="text-base font-black text-indigo-600">400k / Subj</span>
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
                    The Complete 3,000,000 Universal Question Bank is Strictly Reserved for Authenticated Learners
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Access over 600,000 verified questions in each of the 5 core subjects: Mathematics, Science (Physics, Chemistry, Biology), English (Grammar & Literature), Hindi (व्याकरण एवं साहित्य), and Social Science (History, Civics, Geography, Economics).
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="block text-xs font-semibold text-slate-500">Classes 9–12 Focus</span>
                      <span className="text-sm font-bold text-slate-900">400k Qs Per Subject</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="block text-xs font-semibold text-slate-500">Textbook Aligned</span>
                      <span className="text-sm font-bold text-slate-900">NCERT, Selina, IB</span>
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
                      alt="Student practicing universal questions"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                      <div className="text-white">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                          Complete 5-Subject Ingestion
                        </span>
                        <p className="text-sm font-medium text-white/95">
                          Physics, Chemistry, Biology, Mathematics, English Grammar, Hindi Vyakaran, and Social Sciences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Scope Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Universal Subjects &amp; Question Allocations
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                3,000,000 questions across CBSE, ICSE, and IB official textbooks
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {UNIVERSAL_SUBJECTS.map((s) => (
                  <div
                    key={s.code}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-sm">
                        {getSubjectIcon(s.code)}
                        <span>{s.shortLabel}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">{s.description}</p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-slate-200 text-xs font-black text-slate-900 flex justify-between">
                      <span>Total Bank</span>
                      <span className="text-blue-600">{s.totalQuestions.toLocaleString('en-IN')} Qs</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* When Authenticated: The Full Interactive Question Studio */
          <div className="space-y-6">
            {/* 1. SUBJECT SELECTOR BAR (5 Core Subjects) */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 whitespace-nowrap">
                Subject:
              </span>
              {UNIVERSAL_SUBJECTS.map((s) => {
                const isSelected = selectedSubject === s.code
                return (
                  <button
                    key={s.code}
                    onClick={() => handleSelectSubject(s.code)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-2xs ring-2 ring-blue-500/20'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {getSubjectIcon(s.code)}
                    <span>{s.shortLabel}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {(s.totalQuestions / 1000).toLocaleString('en-IN')}k
                    </span>
                  </button>
                )
              })}
            </div>

            {/* 2. BOARD & CLASS SELECTOR BAR */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 whitespace-nowrap">
                  Board:
                </span>
                <button
                  onClick={() => handleSelectBoard('CBSE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedBoard === 'CBSE'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>CBSE</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedBoard === 'CBSE'
                        ? 'bg-blue-500 text-white'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    100% Verified
                  </span>
                </button>
                <button
                  onClick={() => handleSelectBoard('CISCE')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedBoard === 'CISCE'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>ICSE / CISCE</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedBoard === 'CISCE'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    ~92% Aligned
                  </span>
                </button>
                <button
                  onClick={() => handleSelectBoard('IB')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedBoard === 'IB'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>IB (MYP/DP)</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedBoard === 'IB'
                        ? 'bg-blue-500 text-white'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    ~86% Aligned
                  </span>
                </button>
              </div>

              {/* View Board Mapping Details CTA */}
              <button
                onClick={() => setShowBoardModal(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start md:self-auto px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>View {currentSubjectMeta.shortLabel} Board Mapping Details</span>
              </button>
            </div>

            {/* 3. CLASS SELECTOR TABS */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                Class:
              </span>
              {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((clsNum) => {
                const isSelected = selectedClass === clsNum
                const isSenior = clsNum >= 9
                const classQuestionCount = isSenior ? 100000 : 40000

                return (
                  <button
                    key={clsNum}
                    onClick={() => handleSelectClass(clsNum)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Class {clsNum}
                    <span
                      className={`ml-1 text-[10px] font-medium opacity-85 ${
                        isSelected ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      ({(classQuestionCount / 1000).toLocaleString('en-IN')}k)
                    </span>
                  </button>
                )
              })}
            </div>

            {/* 4. SENIOR CLASS BRANCH SUB-FILTER (Classes 9–12) */}
            {selectedClass >= 9 && currentSubjectMeta.seniorBranches && (
              <div className="bg-blue-50/50 p-2.5 rounded-2xl border border-blue-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider px-2 whitespace-nowrap">
                  Specialised Stream:
                </span>
                <button
                  onClick={() => handleSelectBranch('all')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedBranch === 'all'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  All {currentSubjectMeta.shortLabel} (100k Qs)
                </button>
                {currentSubjectMeta.seniorBranches.map((br) => {
                  const isBrSelected = selectedBranch === br.code
                  const count = Math.round(100000 * br.allocationShare)
                  return (
                    <button
                      key={br.code}
                      onClick={() => handleSelectBranch(br.code)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                        isBrSelected
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span>{br.name}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isBrSelected ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {(count / 1000).toFixed(0)}k
                      </span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* 5. CHAPTER SELECTOR & JUMP FORM */}
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
                  {availableChapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Ch {ch.chapterNumber}: {ch.title.split('(')[0]} ({ch.targetQuestionCount.toLocaleString('en-IN')} Qs)
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
                  max={currentChapter?.targetQuestionCount || 10000}
                  placeholder={`1-${currentChapter?.targetQuestionCount || 1000}`}
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <Button type="submit" size="sm" variant="outline" className="text-xs font-bold h-8 rounded-xl px-3">
                  Go
                </Button>
              </form>
            </div>

            {/* 6. WORKSPACE GRID: QUESTION CARD & SESSION ANALYTICS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Question & Solution Viewport */}
              <div className="lg:col-span-8 space-y-4">
                {currentQuestion ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                          Question {currentIndex + 1} of {questions.length}
                        </span>
                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {currentSubjectMeta.name}
                        </span>
                        {currentQuestion.disciplineName && (
                          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {currentQuestion.disciplineName}
                          </span>
                        )}
                        <span className="text-xs font-medium text-slate-500">
                          Ch {currentQuestion.chapterNumber}: {currentQuestion.chapterTitle?.split('(')[0]}
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

                    {/* Textbook Source & Official Board PYQ Citation */}
                    {currentQuestion.bookSource && (
                      <div className="flex flex-wrap items-center gap-2 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{currentQuestion.bookSource}</span>
                        </span>
                        {currentQuestion.exerciseRef && (
                          <span className="text-slate-600 font-semibold border-l border-slate-200 pl-2">
                            {currentQuestion.exerciseRef}
                          </span>
                        )}
                        {currentQuestion.boardYearPYQ && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-extrabold text-[11px] border border-amber-200">
                            {currentQuestion.boardYearPYQ}
                          </span>
                        )}
                      </div>
                    )}

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

                    {/* Step-by-Step Mathematical/Scientific Derivation Card */}
                    {showSolution && (
                      <div className="mt-4 p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3 animate-in fade-in-50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            Step-by-Step Pedagogical Derivation
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                            Correct: Option {currentQuestion.options.find((o) => o.id === currentQuestion.correctOptionId)?.label}
                          </span>
                        </div>

                        {currentQuestion.keyFormula && (
                          <div className="p-2.5 bg-white rounded-xl border border-blue-200/80 text-xs text-blue-900 font-mono font-semibold">
                            Core Rule / Formula: {currentQuestion.keyFormula}
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
                          <span className="font-bold text-slate-800">Conceptual Note:</span> {currentQuestion.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <p className="text-sm text-slate-500">Loading verified questions from the universal engine...</p>
                  </div>
                )}
              </div>

              {/* Sidebar: Session Stats & Chapter Topics */}
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

        {/* Board Alignment Comparison Modal */}
        {showBoardModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>Curriculum Board Mapping Engine</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Class {selectedClass} {currentSubjectMeta.name} — Board Alignment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Verified mappings across CBSE, ICSE/CISCE, and IB official textbooks &amp; exam archives.
                  </p>
                </div>
                <button
                  onClick={() => setShowBoardModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold shrink-0 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* 3 Board Comparison Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* CBSE Card */}
                {(() => {
                  const cbseCitations = getSubjectBoardCitations(selectedSubject, selectedClass, 'CBSE')
                  return (
                    <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-slate-900">CBSE</span>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
                            {cbseCitations.coveragePercentage}% Verified
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-blue-700 block mt-1">
                          {cbseCitations.framework}
                        </span>
                        <div className="mt-3 space-y-1">
                          <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block">
                            Official Textbooks:
                          </span>
                          <ul className="text-xs text-slate-700 space-y-0.5 list-disc list-inside">
                            {cbseCitations.textbooks.map((b, i) => (
                              <li key={i} className="line-clamp-1">{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-blue-200/60 text-[11px] text-slate-600 italic">
                        {cbseCitations.pedagogicalFocus}
                      </div>
                    </div>
                  )
                })()}

                {/* ICSE Card */}
                {(() => {
                  const icseCitations = getSubjectBoardCitations(selectedSubject, selectedClass, 'CISCE')
                  return (
                    <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-slate-900">ICSE / CISCE</span>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            ~{icseCitations.coveragePercentage}% Aligned
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-600 block mt-1">
                          {icseCitations.framework}
                        </span>
                        <div className="mt-3 space-y-1">
                          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
                            Official Textbooks:
                          </span>
                          <ul className="text-xs text-slate-700 space-y-0.5 list-disc list-inside">
                            {icseCitations.textbooks.map((b, i) => (
                              <li key={i} className="line-clamp-1">{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-200/80 text-[11px] text-slate-600 italic">
                        {icseCitations.pedagogicalFocus}
                      </div>
                    </div>
                  )
                })()}

                {/* IB Card */}
                {(() => {
                  const ibCitations = getSubjectBoardCitations(selectedSubject, selectedClass, 'IB')
                  return (
                    <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/40 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-black text-slate-900">IB (MYP / DP)</span>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                            ~{ibCitations.coveragePercentage}% Aligned
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-indigo-700 block mt-1">
                          {ibCitations.framework}
                        </span>
                        <div className="mt-3 space-y-1">
                          <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block">
                            Curricula &amp; Materials:
                          </span>
                          <ul className="text-xs text-slate-700 space-y-0.5 list-disc list-inside">
                            {ibCitations.textbooks.map((b, i) => (
                              <li key={i} className="line-clamp-1">{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-indigo-200/60 text-[11px] text-slate-600 italic">
                        {ibCitations.pedagogicalFocus}
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setShowBoardModal(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs h-9 px-5 rounded-xl"
                >
                  Close Mapping
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
