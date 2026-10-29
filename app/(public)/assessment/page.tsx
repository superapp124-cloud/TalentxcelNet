'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Brain,
  Calculator,
  FlaskConical,
  BookOpen,
  Sparkles,
  Target,
  Clock,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Search,
  Check,
  ShieldCheck,
  CreditCard,
  Layers,
  Activity,
  AlertCircle,
  HelpCircle,
  Atom,
  Flame,
  Award,
  Users,
  Compass,
  Languages,
  Zap,
  GraduationCap,
  Play,
  RotateCcw,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SiteHeader } from '@/components/navigation/site-header'
import { TestRunnerModal } from '@/components/assessment/test-runner-modal'
import { GrowthPlanModal } from '@/components/intelligence/growth-plan-modal'
import { RazorpayCheckoutModal } from '@/components/commerce/razorpay-checkout-modal'
import {
  SEED_BOARDS,
  SEED_CLASSES,
  SEED_SUBJECTS,
  SEED_GRADE4_SUBJECTS,
  SEED_BLUEPRINTS,
  SEED_AUTHORIZED_QUESTIONS,
  SEED_COMPETITIVE_EXAMS,
  ASSESSMENT_PRODUCTS,
} from '@/packages/core/src'
import type {
  AuthorizedQuestion,
  AssessmentBlueprint,
  LearnerEntitlement,
  CommercialProduct,
  ConfidentialQuestionSolution,
} from '@/packages/core/src'
import {
  getClassDiagnosticPackage,
  getCompetitiveExamDiagnosticPackage,
  REASONING_DIMENSIONS_DATA,
} from '@/lib/assessment/class-diagnostic-engine'

export default function AssessmentPage() {
  const [selectedBoardId, setSelectedBoardId] = useState<string>('board_cbse')
  const [selectedClassId, setSelectedClassId] = useState<string>('class_g4')
  const [activeCategoryTab, setActiveCategoryTab] = useState<'school' | 'reasoning' | 'competitive' | 'packs'>('school')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals state
  const [activeBlueprint, setActiveBlueprint] = useState<AssessmentBlueprint | null>(null)
  const [activeQuestions, setActiveQuestions] = useState<AuthorizedQuestion[]>([])
  const [activeSolutions, setActiveSolutions] = useState<ConfidentialQuestionSolution[]>([])
  const [isTestRunnerOpen, setIsTestRunnerOpen] = useState(false)

  const [checkoutProductId, setCheckoutProductId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const [isGrowthPlanOpen, setIsGrowthPlanOpen] = useState(false)

  // Current Board and Class
  const currentBoard = SEED_BOARDS.find((b) => b.id === selectedBoardId) || SEED_BOARDS[0]
  const currentClass = SEED_CLASSES.find((c) => c.id === selectedClassId) || SEED_CLASSES[1]

  // Filtered subjects for current class with fallback to universal subjects
  const classSubjects = useMemo(() => {
    const classNum = parseInt(selectedClassId.replace('class_g', ''), 10) || 4
    const isSenior = classNum >= 9

    let subjects = SEED_SUBJECTS.filter((s) => s.classId === selectedClassId)

    if (selectedClassId === 'class_g11' && subjects.length === 0) {
      subjects = [
        {
          id: 'subj_g11_phy',
          classId: 'class_g11',
          code: 'physics',
          name: 'Physics',
          colorTheme: 'cyan',
          iconName: 'Atom',
          totalTests: 24,
          completedTests: 2,
          status: 'verified',
          description: 'Units & Dimensions, Kinematics, Laws of Motion, Work Energy Power & Gravitation',
        },
        {
          id: 'subj_g11_chem',
          classId: 'class_g11',
          code: 'chemistry',
          name: 'Chemistry',
          colorTheme: 'emerald',
          iconName: 'FlaskConical',
          totalTests: 22,
          completedTests: 1,
          status: 'verified',
          description: 'Atomic Structure, Chemical Bonding, Thermodynamics & Chemical Equilibrium',
        },
        {
          id: 'subj_g11_math',
          classId: 'class_g11',
          code: 'math',
          name: 'Mathematics (Core & Applied)',
          colorTheme: 'amber',
          iconName: 'Calculator',
          totalTests: 22,
          completedTests: 3,
          status: 'verified',
          description: 'Sets, Relations & Functions, Trigonometry, Complex Numbers & Coordinate Geometry',
        },
        {
          id: 'subj_g11_bio',
          classId: 'class_g11',
          code: 'biology',
          name: 'Biology (Botany & Zoology)',
          colorTheme: 'emerald',
          iconName: 'FlaskConical',
          totalTests: 20,
          completedTests: 2,
          status: 'verified',
          description: 'Diversity of Living Organisms, Cell Structure, Plant & Human Physiology',
        },
        {
          id: 'subj_g11_eng',
          classId: 'class_g11',
          code: 'english',
          name: 'English Core',
          colorTheme: 'blue',
          iconName: 'BookOpen',
          totalTests: 16,
          completedTests: 2,
          status: 'verified',
          description: 'Hornbill, Snapshots, Reading Comprehension, Note Making & Creative Writing',
        },
        {
          id: 'subj_g11_hin',
          classId: 'class_g11',
          code: 'hindi',
          name: "Hindi Core (हिंदी 'आधार' व 'ऐच्छिक')",
          colorTheme: 'pink',
          iconName: 'Languages',
          totalTests: 14,
          completedTests: 1,
          status: 'verified',
          description: 'अभिव्यक्ति और माध्यम, अंतरा, आरोह, जनसंचार माध्यम व अपठित काव्यांश',
        },
        {
          id: 'subj_g11_cs',
          classId: 'class_g11',
          code: 'computer_science',
          name: 'Computer Science (Python & SQL)',
          colorTheme: 'indigo',
          iconName: 'Layers',
          totalTests: 18,
          completedTests: 1,
          status: 'verified',
          description: 'Python Basics, Flow of Control, Strings, Lists, Tuples & Relational Databases',
        },
        {
          id: 'subj_g11_eco',
          classId: 'class_g11',
          code: 'economics',
          name: 'Economics (Microeconomics & Stats)',
          colorTheme: 'purple',
          iconName: 'Compass',
          totalTests: 16,
          completedTests: 1,
          status: 'verified',
          description: 'Consumer Equilibrium, Demand, Production, Costs & Statistics for Economics',
        },
      ]
    } else if (subjects.length === 0 && selectedClassId === 'class_g4') {
      subjects = SEED_GRADE4_SUBJECTS
    } else if (subjects.length === 0) {
      subjects = [
        {
          id: `subj_${selectedClassId}_math`,
          classId: selectedClassId,
          code: 'math',
          name: isSenior ? 'Mathematics (Standard & Basic)' : 'Mathematics',
          colorTheme: 'amber',
          iconName: 'Calculator',
          totalTests: 15,
          completedTests: 0,
          status: 'verified',
          description: isSenior
            ? `${currentClass.name} Real Numbers, Polynomials, Coordinate Geometry & Trigonometry`
            : `${currentClass.name} Problem Solving, Arithmetic, Geometry & Fractions`,
        },
        {
          id: `subj_${selectedClassId}_sci`,
          classId: selectedClassId,
          code: 'science',
          name: isSenior ? 'Science (Physics, Chemistry, Biology)' : 'Science',
          colorTheme: 'emerald',
          iconName: 'FlaskConical',
          totalTests: 14,
          completedTests: 0,
          status: 'verified',
          description: isSenior
            ? `${currentClass.name} Matter, Chemical Reactions, Motion, Force & Living Cells`
            : `${currentClass.name} Living Systems, Energy, Materials & Inquiry`,
        },
        {
          id: `subj_${selectedClassId}_eng`,
          classId: selectedClassId,
          code: 'english',
          name: isSenior ? 'English Language & Literature' : 'English Language & Comprehension',
          colorTheme: 'blue',
          iconName: 'BookOpen',
          totalTests: 12,
          completedTests: 0,
          status: 'verified',
          description: `${currentClass.name} Reading Comprehension, Applied Syntax, Grammar & Literature`,
        },
        {
          id: `subj_${selectedClassId}_hin`,
          classId: selectedClassId,
          code: 'hindi',
          name: isSenior ? "Hindi (हिंदी 'अ' व 'ब' - व्याकरण एवं साहित्य)" : 'Hindi (हिंदी व्याकरण एवं साहित्य)',
          colorTheme: 'pink',
          iconName: 'Languages',
          totalTests: 10,
          completedTests: 0,
          status: 'verified',
          description: `${currentClass.name} व्याकरण (संज्ञा, सर्वनाम, संधि, समास, रस, अलंकार), अपठित बोध एवं साहित्य`,
        },
        {
          id: `subj_${selectedClassId}_sst`,
          classId: selectedClassId,
          code: 'social_science',
          name: 'Social Science (History, Geography, Civics)',
          colorTheme: 'purple',
          iconName: 'Compass',
          totalTests: 12,
          completedTests: 0,
          status: 'verified',
          description: `${currentClass.name} Indian Heritage, Physical Geography, Democracy & Economics`,
        },
      ]
    } else {
      // Ensure Hindi & English are never omitted if catalog has only Math/Science
      const hasHindi = subjects.some((s) => s.code === 'hindi')
      if (!hasHindi) {
        subjects = [
          ...subjects,
          {
            id: `subj_${selectedClassId}_hin`,
            classId: selectedClassId,
            code: 'hindi',
            name: isSenior ? "Hindi (हिंदी 'अ' व 'ब' - व्याकरण एवं साहित्य)" : 'Hindi (हिंदी व्याकरण एवं साहित्य)',
            colorTheme: 'pink',
            iconName: 'Languages',
            totalTests: 10,
            completedTests: 0,
            status: 'verified',
            description: `${currentClass.name} व्याकरण (संज्ञा, सर्वनाम, संधि, समास, रस, अलंकार), अपठित बोध एवं साहित्य`,
          },
        ]
      }
      const hasEnglish = subjects.some((s) => s.code === 'english')
      if (!hasEnglish) {
        subjects = [
          ...subjects,
          {
            id: `subj_${selectedClassId}_eng`,
            classId: selectedClassId,
            code: 'english',
            name: isSenior ? 'English Language & Literature' : 'English Language & Comprehension',
            colorTheme: 'blue',
            iconName: 'BookOpen',
            totalTests: 12,
            completedTests: 0,
            status: 'verified',
            description: `${currentClass.name} Reading Comprehension, Applied Syntax, Grammar & Vocabulary`,
          },
        ]
      }
    }
    if (!searchQuery.trim()) return subjects
    const q = searchQuery.toLowerCase()
    return subjects.filter((s) => s.name.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q))
  }, [selectedClassId, currentClass.name, searchQuery])

  // Filtered competitive exams
  const filteredExams = useMemo(() => {
    if (!searchQuery.trim()) return SEED_COMPETITIVE_EXAMS
    const q = searchQuery.toLowerCase()
    return SEED_COMPETITIVE_EXAMS.filter((e) => e.name.toLowerCase().includes(q) || e.examCode.toLowerCase().includes(q))
  }, [searchQuery])

  // Dynamic Class-Wise Diagnostic Test Launcher (Guarantees DIFFERENT, grade-tailored questions for every class & subject)
  const handleLaunchSubjectTest = (subjectCode: string, subjectTitle?: string) => {
    const classNum = parseInt(selectedClassId.replace('class_g', ''), 10) || 4
    const boardName = currentBoard.code || 'CBSE'

    const pkg = getClassDiagnosticPackage(classNum, subjectCode, boardName)

    if (subjectTitle) {
      pkg.blueprint.title = `${currentClass.name} ${subjectTitle} Diagnostic (${boardName})`
    }

    setActiveBlueprint(pkg.blueprint)
    setActiveQuestions(pkg.questions)
    setActiveSolutions(pkg.solutions)
    setIsTestRunnerOpen(true)
  }

  // Launch Analytical Reasoning Diagnostic with completely distinct dimension questions
  const handleLaunchReasoningTest = (dimensionSlug?: string, dimensionTitle?: string) => {
    if (dimensionSlug && REASONING_DIMENSIONS_DATA[dimensionSlug]) {
      const dim = REASONING_DIMENSIONS_DATA[dimensionSlug]
      const bp: AssessmentBlueprint = {
        id: `bp_reasoning_${dimensionSlug}`,
        title: dim.title,
        subjectId: `subj_reasoning_${dimensionSlug}`,
        chapterId: dimensionSlug,
        durationMinutes: 10,
        totalQuestions: dim.questions.length,
        totalMarks: dim.questions.length * 2,
        negativeMarkingRatio: 0,
        passingPercentage: 60,
        rewardCreditAmount: 20,
        examType: 'aptitude_drill',
        category: 'aptitude',
        difficulty: 'medium',
      }

      setActiveBlueprint(bp)
      setActiveQuestions(dim.questions)
      setActiveSolutions(dim.solutions)
      setIsTestRunnerOpen(true)
      return
    }

    // Default 8-question aptitude drill
    const bp = SEED_BLUEPRINTS.find((b) => b.id === 'bp_free_aptitude') || SEED_BLUEPRINTS[0]
    const reasoningQuestions = SEED_AUTHORIZED_QUESTIONS.filter((q) => q.topicId.startsWith('top_apt_'))
    const selectedQuestions = reasoningQuestions.length > 0 ? reasoningQuestions : SEED_AUTHORIZED_QUESTIONS.slice(0, 8)

    setActiveBlueprint({
      ...bp,
      title: dimensionTitle ? `Analytical Aptitude: ${dimensionTitle}` : bp.title,
    })
    setActiveQuestions(selectedQuestions)
    setActiveSolutions([])
    setIsTestRunnerOpen(true)
  }

  // Dynamic Competitive Exam Launcher (JEE, NEET, CUET, UPSC, STATE_PSC, SSC, BANKING, GATE)
  const handleLaunchCompetitiveExamTest = (examCode: string, examName: string) => {
    const pkg = getCompetitiveExamDiagnosticPackage(examCode, examName)
    setActiveBlueprint(pkg.blueprint)
    setActiveQuestions(pkg.questions)
    setActiveSolutions(pkg.solutions)
    setIsTestRunnerOpen(true)
  }

  // Handle paid pack purchase
  const handleOpenCheckout = (productId: string) => {
    setCheckoutProductId(productId)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-20 md:pb-8">
      {/* Platform Navigation */}
      <SiteHeader onOpenGrowthPlan={() => setIsGrowthPlanOpen(true)} />

      {/* Mobile App-Style Header & Daily Workout Hero (Benchmarked with LogIQids) */}
      <section className="bg-white border-b border-slate-200/80 pt-4 pb-5 px-3.5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Mobile App Bar Stats */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                TX
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">Cognitive Gym</span>
                  <Badge className="bg-blue-100 text-blue-700 text-[10px] font-bold border-none py-0">
                    {currentClass.name}
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-400">CBSE • ICSE • IB Standards</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl text-amber-800 font-extrabold text-[11px] shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
                <span>3-Day Streak</span>
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-xl text-emerald-800 font-bold text-[11px]">
                <span>★ 40 Pts</span>
              </div>
            </div>
          </div>

          {/* App-Style Hero Daily Challenge Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-3xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold backdrop-blur-xs">
                  <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
                  <span>Daily 10-Minute Brain Workout</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  {currentClass.name} Diagnostic &amp; Skill Gap Test
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Different questions across every class! Instant scoring, step-by-step verified derivations, and WhatsApp report dispatch.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  onClick={() => handleLaunchSubjectTest('math', 'Mathematics')}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm h-11 px-5 rounded-2xl shadow-[0_4px_0_0_#d97706] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Start Free Test (5 Qs)</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Horizontal Desktop Category Tabs (Hidden on small mobile, handled by bottom bar) */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto pt-1 border-t border-slate-100 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveCategoryTab('school')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategoryTab === 'school'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>School Assessments (Classes 3–12)</span>
            </button>
            <button
              onClick={() => setActiveCategoryTab('reasoning')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategoryTab === 'reasoning'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Analytical Reasoning &amp; Logic</span>
            </button>
            <button
              onClick={() => setActiveCategoryTab('competitive')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategoryTab === 'competitive'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Competitive Entrances</span>
            </button>
            <button
              onClick={() => setActiveCategoryTab('packs')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategoryTab === 'packs'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Assessment Packs</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1 py-0.2 rounded-full font-bold">From ₹20</span>
            </button>
            <Link
              href="/dashboard/question-bank"
              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 transition-all flex items-center gap-1.5 whitespace-nowrap ml-auto"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>3,000,000 Question Bank</span>
              <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded-full font-bold">🔒 Login</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-10">
        {/* ========================================================================= */}
        {/* TAB 1: SCHOOL ASSESSMENTS */}
        {/* ========================================================================= */}
        {activeCategoryTab === 'school' && (
          <section className="space-y-5">
            {/* Native Mobile App-Style Class Carousel */}
            <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900">Choose Grade &amp; Board</h2>
                  <p className="text-[11px] text-slate-500">Every class has authentic, distinct questions</p>
                </div>
                {/* Board Selector */}
                <div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1">
                  {SEED_BOARDS.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => setSelectedBoardId(board.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedBoardId === board.id
                          ? 'bg-white text-slate-900 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span>{board.code}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Horizontally scrolling touch pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
                {SEED_CLASSES.map((cls) => {
                  const isSelected = selectedClassId === cls.id
                  return (
                    <button
                      key={cls.id}
                      onClick={() => setSelectedClassId(cls.id)}
                      className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.03]'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <GraduationCap className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      <span>{cls.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Subject Cards Grid (App Style Touch Cards) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>{currentClass.name} Curriculum Tests</span>
                  <Badge variant="outline" className="text-[10px] font-bold">
                    {currentBoard.code}
                  </Badge>
                </h3>
                <span className="text-[11px] text-slate-400 font-medium">5 Questions • 10 Mins</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {classSubjects.map((subj) => {
                  const code = subj.code.toLowerCase()
                  const isMath = code.includes('math')
                  const isPhy = code.includes('phy')
                  const isChem = code.includes('chem')
                  const isBio = code.includes('bio')
                  const isSci = code.includes('sci') || isPhy || isChem || isBio
                  const isEng = code.includes('eng')
                  const isHin = code.includes('hin')
                  const isTech = code.includes('comp') || code.includes('info') || code === 'it' || code === 'cs'
                  const isEco = code.includes('eco')

                  let iconColorClass = 'bg-purple-100 text-purple-700'
                  let IconComponent = Compass

                  if (isMath) {
                    iconColorClass = 'bg-amber-100 text-amber-700'
                    IconComponent = Calculator
                  } else if (isPhy) {
                    iconColorClass = 'bg-cyan-100 text-cyan-700'
                    IconComponent = Atom
                  } else if (isChem) {
                    iconColorClass = 'bg-emerald-100 text-emerald-700'
                    IconComponent = FlaskConical
                  } else if (isBio) {
                    iconColorClass = 'bg-teal-100 text-teal-700'
                    IconComponent = FlaskConical
                  } else if (isSci) {
                    iconColorClass = 'bg-emerald-100 text-emerald-700'
                    IconComponent = FlaskConical
                  } else if (isEng) {
                    iconColorClass = 'bg-blue-100 text-blue-700'
                    IconComponent = BookOpen
                  } else if (isHin) {
                    iconColorClass = 'bg-pink-100 text-pink-700'
                    IconComponent = Languages
                  } else if (isTech) {
                    iconColorClass = 'bg-indigo-100 text-indigo-700'
                    IconComponent = Layers
                  } else if (isEco) {
                    iconColorClass = 'bg-violet-100 text-violet-700'
                    IconComponent = TrendingUp
                  }

                  return (
                    <div
                      key={subj.id}
                      className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4 group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-2xs ${iconColorClass}`}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-extrabold py-0.5">
                            5 Questions Free
                          </Badge>
                        </div>

                        <div>
                          <h4 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {subj.name}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                            {subj.description || `${currentClass.name} verified syllabus diagnostic and practice.`}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                          <div className="flex items-center gap-1 font-medium">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>10 Mins</span>
                          </div>
                          <div className="flex items-center gap-1 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Instant Report</span>
                          </div>
                        </div>
                      </div>

                      {/* Tactile Buttons */}
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <Button
                          onClick={() => handleLaunchSubjectTest(subj.code, subj.name)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs h-10 rounded-2xl shadow-[0_3px_0_0_#1d4ed8] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-1.5"
                        >
                          <span>Start Diagnostic ({currentClass.name})</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          onClick={() => handleOpenCheckout('prod_pack_micro_20')}
                          variant="ghost"
                          className="w-full text-[11px] font-bold text-slate-600 hover:text-blue-600 h-8 rounded-xl"
                        >
                          <span>Unlock Full Chapter Mock • ₹20</span>
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ANALYTICAL REASONING & APTITUDE (6 DISTINCT DIMENSIONS) */}
        {/* ========================================================================= */}
        {activeCategoryTab === 'reasoning' && (
          <section className="space-y-5">
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-md">
              <div className="max-w-3xl space-y-2.5">
                <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-xs font-bold">
                  Cognitive Gym • LogIQids Aligned
                </Badge>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Analytical Aptitude &amp; Mental Acuity
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Every dimension has its own distinct diagnostic questions: Syllogisms, Patterns, Spatial Nets, and Logic flowcharts.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => handleLaunchReasoningTest()}
                    className="bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs h-10 px-5 rounded-2xl shadow-xs"
                  >
                    <span>Launch Full 8-Question Aptitude Test</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 6 Cognitive Dimensions Grid - Each Launches Completely Distinct Questions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  slug: 'logical-deduction',
                  title: 'Logical Deduction',
                  desc: 'Syllogisms, truth-table deductions, sequence conditions, and relational validity.',
                  tag: 'Core Aptitude',
                },
                {
                  slug: 'numerical-series',
                  title: 'Numerical Series & Mental Arithmetic',
                  desc: 'Geometric progressions, modular patterns, differences of squares, and mental estimation.',
                  tag: 'Quantitative',
                },
                {
                  slug: 'verbal-reasoning',
                  title: 'Verbal Reasoning & Analogies',
                  desc: 'Semantic classification, sentence completion, antonym matrices, and context deductions.',
                  tag: 'Linguistic',
                },
                {
                  slug: 'spatial-matrices',
                  title: 'Spatial & Non-Verbal Matrices',
                  desc: 'Folded paper visualisations, 2D rotation transforms, mirror symmetry, and shape patterns.',
                  tag: 'Visual Spatial',
                },
                {
                  slug: 'data-interpretation',
                  title: 'Data Interpretation & Graphs',
                  desc: 'Tabular analysis, ratio comparisons, percentage growth rates, and trend extrapolation.',
                  tag: 'Data Literacy',
                },
                {
                  slug: 'algorithmic-logic',
                  title: 'Algorithmic & Stepwise Logic',
                  desc: 'Conditional flowchart tracing, loop bounds, recursion intuition, and edge-case detection.',
                  tag: 'Computation',
                },
              ].map((dim, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-indigo-600">0{idx + 1}</span>
                      <Badge className="bg-slate-100 text-slate-700 text-[10px] font-semibold border-none">
                        {dim.tag}
                      </Badge>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">{dim.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{dim.desc}</p>
                  </div>
                  <Button
                    onClick={() => handleLaunchReasoningTest(dim.slug, dim.title)}
                    className="w-full bg-slate-900 hover:bg-black text-white text-xs font-extrabold h-9 rounded-2xl flex items-center justify-between px-4 mt-2"
                  >
                    <span>Practice Dimension</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: COMPETITIVE ENTRANCE PIPELINES */}
        {/* ========================================================================= */}
        {activeCategoryTab === 'competitive' && (
          <section className="space-y-5">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Competitive Entrance Pipeline</h2>
              <p className="text-xs text-slate-500">
                Verified benchmarks and provisional testing pipelines for major national and state entrances.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-600 tracking-wider">
                        {exam.examCode}
                      </span>
                      <Badge
                        className={`text-[10px] font-bold ${
                          exam.verifiedStatus === 'verified'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border-amber-200'
                        }`}
                      >
                        {exam.verifiedStatus === 'verified' ? 'Active' : 'Pipeline'}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{exam.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{exam.targetStage}</p>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sample Mocks:</span>
                        <span className="font-bold text-slate-800">{exam.sampleTestsAvailable} tests</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Cohort Batch:</span>
                        <span className="font-medium text-slate-700">{exam.expectedLaunchBatch}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <Button
                      onClick={() => handleLaunchCompetitiveExamTest(exam.examCode, exam.name)}
                      className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold h-9 rounded-2xl"
                    >
                      Sample Mock (Free)
                    </Button>
                    <Button
                      onClick={() => handleOpenCheckout('prod_pack_comp_sprint_999')}
                      variant="outline"
                      className="w-full text-xs font-semibold text-slate-700 border-slate-200 hover:bg-slate-50 h-8 rounded-xl"
                    >
                      Unlock Sprint • ₹999
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: COMMERCIAL ASSESSMENT PACKS */}
        {/* ========================================================================= */}
        {activeCategoryTab === 'packs' && (
          <section className="space-y-5">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Commercial Assessment &amp; Mock Packs</h2>
              <p className="text-xs text-slate-500">
                Transparent pricing with no hidden charges. All packs include server scoring and diagnostic weakness reports.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {ASSESSMENT_PRODUCTS.map((prod: CommercialProduct) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between gap-6 relative"
                >
                  {prod.popular && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-600 text-white font-bold text-[10px]">
                        Popular
                      </Badge>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {prod.domain.toUpperCase()} PACK
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{prod.title}</h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        {prod.tagline}
                      </p>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">
                        ₹{prod.basePriceRupees.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">+ 18% GST</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                      {prod.features.map((feat: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleOpenCheckout(prod.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-11 rounded-2xl shadow-[0_4px_0_0_#1d4ed8] active:translate-y-1 active:shadow-none flex items-center justify-center gap-1.5"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Purchase with Razorpay</span>
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Native Mobile App Bottom Navigation Bar (Shown on small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 flex justify-around items-center shadow-lg safe-area-bottom">
        <button
          onClick={() => setActiveCategoryTab('school')}
          className={`flex flex-col items-center gap-1 text-[11px] font-extrabold transition-all ${
            activeCategoryTab === 'school' ? 'text-blue-600 scale-105' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>School</span>
        </button>
        <button
          onClick={() => setActiveCategoryTab('reasoning')}
          className={`flex flex-col items-center gap-1 text-[11px] font-extrabold transition-all ${
            activeCategoryTab === 'reasoning' ? 'text-blue-600 scale-105' : 'text-slate-400'
          }`}
        >
          <Brain className="w-5 h-5" />
          <span>Logic IQ</span>
        </button>
        <button
          onClick={() => setActiveCategoryTab('competitive')}
          className={`flex flex-col items-center gap-1 text-[11px] font-extrabold transition-all ${
            activeCategoryTab === 'competitive' ? 'text-blue-600 scale-105' : 'text-slate-400'
          }`}
        >
          <Target className="w-5 h-5" />
          <span>Olympiad</span>
        </button>
        <button
          onClick={() => setActiveCategoryTab('packs')}
          className={`flex flex-col items-center gap-1 text-[11px] font-extrabold transition-all ${
            activeCategoryTab === 'packs' ? 'text-blue-600 scale-105' : 'text-slate-400'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span>Packs</span>
        </button>
      </nav>

      {/* Test Runner Modal */}
      <TestRunnerModal
        blueprint={activeBlueprint}
        questions={activeQuestions}
        solutions={activeSolutions}
        isOpen={isTestRunnerOpen}
        onClose={() => setIsTestRunnerOpen(false)}
        onUnlockPaidPack={(prodId) => handleOpenCheckout(prodId)}
      />

      {/* Razorpay Checkout Modal */}
      <RazorpayCheckoutModal
        isOpen={isCheckoutOpen}
        productId={checkoutProductId}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={(entitlement) => {
          setIsCheckoutOpen(false)
          alert(`Success! Product ${entitlement.productId} activated. Access valid through ${new Date(entitlement.validUntil).toLocaleDateString()}.`)
        }}
      />

      {/* Growth Plan Modal */}
      <GrowthPlanModal
        isOpen={isGrowthPlanOpen}
        onClose={() => setIsGrowthPlanOpen(false)}
      />
    </div>
  )
}
