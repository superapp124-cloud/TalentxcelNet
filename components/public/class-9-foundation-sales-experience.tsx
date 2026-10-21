'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Brain,
  Atom,
  FlaskConical,
  Dna,
  Calculator,
  BookOpen,
  Puzzle,
  Compass,
  CheckCircle2,
  Calendar,
  Users,
  PlayCircle,
  FileText,
  Clock,
  Laptop,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronDown,
  X,
  PhoneCall,
  Download,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Brochure4DShowcase } from '@/components/public/brochure-4d-showcase'
import { SocraticEvaluatorDemo } from '@/components/academic/socratic-evaluator-demo'
import { InteractiveCurriculumCockpit } from '@/components/academic/interactive-curriculum-cockpit'
import { LivingSkillRadar } from '@/components/academic/living-skill-radar'
import { ParentIntelligencePreview } from '@/components/academic/parent-intelligence-preview'

export function Class9FoundationSalesExperience() {
  const [activeSubject, setActiveSubject] = useState<'physics' | 'chemistry' | 'biology' | 'mathematics' | 'english' | 'aptitude' | 'strategy'>('physics')
  const [selectedPackage, setSelectedPackage] = useState<'course_only' | 'course_laptop'>('course_laptop')
  const [paymentMode, setPaymentMode] = useState<'onetime' | 'installments'>('onetime')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState('Batch A (Mon-Wed-Fri 4:00 PM – 6:00 PM)')
  
  // Enrolment form state
  const [studentName, setStudentName] = useState('')
  const [parentName, setParentName] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [schoolCity, setSchoolCity] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [enrolmentSuccess, setEnrolmentSuccess] = useState(false)

  // Interactive AI Tutor Demo state
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiAnswer, setAiAnswer] = useState<string | null>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)

  // Interactive Diagnostic Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Pricing calculations
  const isLaptop = selectedPackage === 'course_laptop'
  const isOneTime = paymentMode === 'onetime'

  const basePrice = isLaptop
    ? (isOneTime ? 61999 : 64999)
    : 29999
  const upfrontPay = isLaptop
    ? (isOneTime ? 61999 : 39999)
    : (isOneTime ? 29999 : 9999)
  const monthlyPay = isLaptop
    ? (isOneTime ? 0 : 3125)
    : (isOneTime ? 0 : 2500)
  const gstAmount = Math.round((upfrontPay * 18) / 100)
  const totalUpfrontWithGst = upfrontPay + gstAmount

  async function handleEnrolmentSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!studentName || !parentName || !parentPhone || !parentEmail) {
      toast.error('Please fill in all required fields.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${studentName} (Parent: ${parentName})`,
          email: parentEmail,
          phone: parentPhone,
          programmeInterest: `Class 9 Foundation (${isLaptop ? 'Course + Laptop' : 'Course Only'} - ${paymentMode === 'onetime' ? 'One-Time' : 'Installments'})`,
          message: `School/City: ${schoolCity}. Preferred Batch: ${selectedBatch}. Total upfront: ₹${totalUpfrontWithGst}.`,
        }),
      })

      if (res.ok) {
        setEnrolmentSuccess(true)
        toast.success('Application received! Welcome to Class 9 Foundation Programme.')
      } else {
        toast.error('Could not submit application. Please try again.')
      }
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleAiDemo(question: string) {
    setAiQuestion(question)
    setIsAiLoading(true)
    setAiAnswer(null)

    setTimeout(() => {
      if (question.includes('Newton') || question.includes('motion')) {
        setAiAnswer(
          `**Super AI Class 9 Physics Tutor**: Great question on Newton's Third Law!
          
*Principle*: "To every action, there is an equal and opposite reaction, acting on two different bodies simultaneously."
*Real-World Example*: When you jump off a rowing boat onto a dock:
1. **Action Force**: Your foot pushes backwards against the boat ($F_{foot \\rightarrow boat}$).
2. **Reaction Force**: The boat pushes forwards against your foot ($F_{boat \\rightarrow foot}$), propelling you onto the dock.
3. *Notice*: The boat moves backward in the water while you move forward!

*NEET/JEE Foundation Check*: Remember that action and reaction NEVER cancel each other out because they act on **different objects**!`
        )
      } else if (question.includes('mole') || question.includes('Sodium Carbonate')) {
        setAiAnswer(
          `**Super AI Class 9 Chemistry Tutor**: Let's calculate the molecular mass of Sodium Carbonate ($Na_2CO_3$) step-by-step:

1. **Identify Atomic Masses**:
   - Sodium ($Na$) = $23\\text{ u}$
   - Carbon ($C$) = $12\\text{ u}$
   - Oxygen ($O$) = $16\\text{ u}$

2. **Multiply by Atom Subscripts**:
   - $2 \\times Na = 2 \\times 23 = 46\\text{ u}$
   - $1 \\times C = 1 \\times 12 = 12\\text{ u}$
   - $3 \\times O = 3 \\times 16 = 48\\text{ u}$

3. **Sum Total**:
   - $\\text{Molecular Mass} = 46 + 12 + 48 = \\mathbf{106\\text{ u}}$ (or $106\\text{ g/mol}$ as molar mass).

*Mole Application*: $1\\text{ mole of } Na_2CO_3$ contains $6.022 \\times 10^{23}$ formula units and weighs exactly $106\\text{ grams}$!`
        )
      } else if (question.includes('cell') || question.includes('plant')) {
        setAiAnswer(
          `**Super AI Class 9 Biology Tutor**: Plant cells have a rigid **Cell Wall** while animal cells do not for two critical biological reasons:

1. **Structural Support & Immobility**: Plants cannot move to seek shelter from harsh wind, rain, or heat. The rigid cellulose cell wall provides mechanical strength to keep plants erect.
2. **Osmotic Protection (Turgidity)**: When plant cells absorb water by endosmosis, the cell wall exerts an inward counter-pressure (*wall pressure*) that prevents the cell from bursting. Animal cells placed in pure water would burst (lysis) due to the absence of a cell wall!

*NEET Key Term*: The outer primary cell wall in young plants is mainly made of **Cellulose, Hemicellulose, and Pectin**.`
        )
      } else {
        setAiAnswer(
          `**Super AI Class 9 Mathematics Tutor**: Rational vs Irrational Numbers:

- **Rational Number ($\\mathbb{Q}$)**: Can be written as $\\frac{p}{q}$ where $p, q \\in \\mathbb{Z}$ and $q \\neq 0$. Its decimal expansion is either **terminating** (e.g. $0.75 = \\frac{3}{4}$) or **non-terminating recurring** (e.g. $0.333... = \\frac{1}{3}$).
- **Irrational Number**: Cannot be written as $\\frac{p}{q}$. Its decimal expansion is **non-terminating and non-recurring** (e.g. $\\sqrt{2} \\approx 1.4142135...$, $\\pi \\approx 3.1415926...$).

*Golden Rule*: The sum, difference, product, or quotient of a non-zero rational and an irrational number is **always irrational**!`
        )
      }
      setIsAiLoading(false)
    }, 600)
  }

  const subjectsData = {
    physics: {
      title: 'Physics',
      tagline: 'Concepts, problem solving and real-life applications',
      icon: Atom,
      color: 'from-blue-600 to-indigo-600',
      badgeColor: 'border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10',
      description: 'Physics in Class 9 lays the foundational bedrock for 11th grade mechanics, kinematics, and NEET/JEE problem-solving speed.',
      topics: [
        {
          name: 'Chapter 1: Motion & Kinematics',
          subtopics: ['Distance vs Displacement', 'Uniform & Non-Uniform Velocity', 'Acceleration Derivations', 'Graphical Analysis (v-t & s-t graphs)', 'The 3 Equations of Motion ($v=u+at$, $s=ut+1/2at^2$, $v^2=u^2+2as$)'],
        },
        {
          name: 'Chapter 2: Force & Laws of Motion',
          subtopics: ['Balanced & Unbalanced Forces', 'Newton’s 1st Law & Inertia', 'Newton’s 2nd Law & $F=ma$', 'Newton’s 3rd Law & Action-Reaction Pairs', 'Conservation of Linear Momentum'],
        },
        {
          name: 'Chapter 3: Gravitation & Floatation',
          subtopics: ['Universal Law of Gravitation ($G = 6.67 \\times 10^{-11}$)', 'Free Fall & Acceleration due to gravity $g$', 'Mass vs Weight differences', 'Thrust, Pressure & Buoyancy', 'Archimedes’ Principle & Relative Density'],
        },
        {
          name: 'Chapter 4: Work and Energy',
          subtopics: ['Scientific Definition of Work ($W = F \\cdot s$)', 'Kinetic Energy ($E_k = 1/2mv^2$)', 'Potential Energy ($E_p = mgh$)', 'Law of Conservation of Energy', 'Commercial Unit of Energy (kWh) & Power'],
        },
        {
          name: 'Chapter 5: Sound & Acoustic Waves',
          subtopics: ['Production & Propagation of Sound', 'Longitudinal vs Transverse Waves', 'Speed of Sound in Media', 'Echo, Reverberation & Reflection', 'Ultrasound & Sonar Applications'],
        },
      ],
      practicalLab: 'Home experiments using toy cars, inclined boards, and stopwatches to measure acceleration; verification of Archimedes’ principle with water displacement.',
      competitiveLink: 'Direct foundation for Class 11 Mechanics (Laws of Motion, Work-Energy-Power, Gravitation) which carries 25-30% weight in JEE & NEET.',
    },
    chemistry: {
      title: 'Chemistry',
      tagline: 'Concept clarity, numerical practice and practical insight',
      icon: FlaskConical,
      color: 'from-orange-600 to-amber-600',
      badgeColor: 'border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-500/10',
      description: 'Build micro-level particulate conceptual clarity, chemical arithmetic, and atomic structure mastery.',
      topics: [
        {
          name: 'Chapter 1: Matter in Our Surroundings',
          subtopics: ['Physical Nature of Matter & Diffusion', 'States of Matter (Solid, Liquid, Gas)', 'Change of State: Melting, Boiling & Sublimation', 'Latent Heat of Fusion & Vaporisation', 'Evaporation & Factors Causing Cooling'],
        },
        {
          name: 'Chapter 2: Is Matter Around Us Pure?',
          subtopics: ['Pure Substances vs Mixtures', 'True Solutions, Suspensions & Colloids', 'Tyndall Effect & Brownian Motion', 'Separation Techniques (Chromatography, Distillation)', 'Physical vs Chemical Changes'],
        },
        {
          name: 'Chapter 3: Atoms and Molecules',
          subtopics: ['Laws of Chemical Combination', 'Dalton’s Atomic Theory Postulates', 'Atomic & Molecular Masses', 'Chemical Formulae & Polyatomic Ions', 'The Mole Concept ($n = m/M = N/N_A$)'],
        },
        {
          name: 'Chapter 4: Structure of the Atom',
          subtopics: ['Discovery of Electrons & Protons', 'Thomson’s Plum Pudding Model', 'Rutherford’s $\\alpha$-Particle Scattering Experiment', 'Bohr’s Model of the Atom', 'Electronic Configuration, Valency, Isotopes & Isobars'],
        },
      ],
      practicalLab: 'Ink chromatography on filter paper, testing Tyndall effect with milk and flashlight, paper model atomic valency puzzle.',
      competitiveLink: 'Direct foundation for Class 11 Physical Chemistry (Mole Concept, Atomic Structure, Chemical Bonding) essential for NEET & JEE.',
    },
    biology: {
      title: 'Biology',
      tagline: 'NCERT focus, diagrams, practice and application for NEET',
      icon: Dna,
      color: 'from-emerald-600 to-teal-600',
      badgeColor: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
      description: 'Master NCERT line-by-line biological concepts, high-yield organelle structures, tissue systems, and life sciences.',
      topics: [
        {
          name: 'Chapter 1: The Fundamental Unit of Life (Cell)',
          subtopics: ['Cell Discovery (Robert Hooke & Leeuwenhoek)', 'Prokaryotic vs Eukaryotic Cells', 'Plasma Membrane, Osmosis & Diffusion', 'Nucleus, Chromosomes & DNA/Genes', 'Cell Organelles: Mitochondria, ER, Golgi, Lysosomes, Plastids, Vacuoles', 'Cell Division: Mitosis vs Meiosis'],
        },
        {
          name: 'Chapter 2: Tissues (Plant & Animal)',
          subtopics: ['Meristematic Tissues (Apical, Lateral, Intercalary)', 'Simple Permanent Tissues (Parenchyma, Collenchyma, Sclerenchyma)', 'Complex Permanent Tissues (Xylem & Phloem)', 'Epithelial & Connective Tissues (Bone, Cartilage, Blood, Ligaments)', 'Muscular & Nervous Tissues (Neuron Structure)'],
        },
        {
          name: 'Chapter 3: Improvement in Food Resources',
          subtopics: ['Crop Variety Improvement (Hybridization & Genetic Modification)', 'Crop Production Management (Nutrients, Manures & Fertilizers)', 'Irrigation Systems & Cropping Patterns (Mixed, Inter-cropping)', 'Crop Protection Management (Weeds, Pests & Diseases)', 'Animal Husbandry (Cattle, Poultry, Fisheries & Apiculture)'],
        },
      ],
      practicalLab: 'Staining onion peel and human cheek cells under compound microscope; observing stomata and xylem vessels in celery stalk.',
      competitiveLink: 'Over 12-15 questions in NEET Biology directly draw upon Cytology and Plant/Animal histology foundations taught here.',
    },
    mathematics: {
      title: 'Mathematics',
      tagline: 'Build fundamentals, advanced problem solving and logical thinking',
      icon: Calculator,
      color: 'from-purple-600 to-violet-600',
      badgeColor: 'border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/10',
      description: 'Move beyond arithmetic into rigorous algebraic manipulations, Euclidean geometric proofs, and analytical calculus preparation.',
      topics: [
        {
          name: 'Unit 1: Number Systems',
          subtopics: ['Irrational Numbers on Number Line', 'Real Numbers & Decimal Expansions', 'Rationalising the Denominator', 'Laws of Exponents with Real Powers'],
        },
        {
          name: 'Unit 2: Polynomials & Coordinate Geometry',
          subtopics: ['Zeroes of Polynomials & Remainder Theorem', 'Factor Theorem & Splitting Middle Term', '8 Core Algebraic Identities', 'Cartesian Plane & Coordinate Plotting'],
        },
        {
          name: 'Unit 3: Linear Equations in Two Variables',
          subtopics: ['Standard Form $ax + by + c = 0$', 'Graphical Representation of Linear Equations', 'Finding Multiple Solutions for Linear Equations'],
        },
        {
          name: 'Unit 4: Geometry & Triangle Congruence',
          subtopics: ['Euclid’s Axioms and Postulates', 'Parallel Lines & Transversal Angle Properties', 'SAS, ASA, AAS, SSS, RHS Congruence Criteria', 'Inequalities in Triangles'],
        },
        {
          name: 'Unit 5: Quadrilaterals, Circles & Mensuration',
          subtopics: ['Properties of Parallelograms & Mid-Point Theorem', 'Circle Chords, Cyclic Quadrilaterals & Tangent Theorems', 'Heron’s Formula for Area of Triangles', 'Surface Areas & Volumes of Cones, Spheres & Cylinders', 'Histograms, Frequency Polygons & Empirical Probability'],
        },
      ],
      practicalLab: 'Graphing systems of linear equations; geometric paper folding to verify congruence criteria and Mid-Point Theorem.',
      competitiveLink: 'Builds critical algebraic and trigonometric stamina required for JEE Advanced Coordinate Geometry and Calculus.',
    },
    english: {
      title: 'English & Communication',
      tagline: 'Reading, writing, comprehension and presentation skills',
      icon: BookOpen,
      color: 'from-pink-600 to-rose-600',
      badgeColor: 'border-pink-500/30 text-pink-600 dark:text-pink-400 bg-pink-500/10',
      description: 'Develop structured essay articulation, flawless grammar mechanics, and confident spoken presentation skills.',
      topics: [
        {
          name: 'Unit 1: Advanced Reading Comprehension',
          subtopics: ['Discursive & Case-Based Analytical Passages', 'Inferential Meaning & Contextual Vocabulary', 'Central Theme Identification & Summary Extraction'],
        },
        {
          name: 'Unit 2: Applied Functional Grammar',
          subtopics: ['Tenses & Sequence of Tenses', 'Modal Auxiliaries in Context', 'Subject-Verb Concord Mastery', 'Reported Speech (Declarative, Imperative, Interrogative)', 'Determiners & Prepositions'],
        },
        {
          name: 'Unit 3: Creative & Formal Writing Skills',
          subtopics: ['Descriptive Paragraph Writing (Person, Event, Situation)', 'Story Writing with Structured Climax', 'Formal Letters to Editor & Authorities', 'Diary Entry with Personal Reflection'],
        },
        {
          name: 'Unit 4: Spoken English & Debate Communication',
          subtopics: ['Phonetics, Pronunciation & Intonation', 'Speech Structures & Public Speaking Articulation', 'Group Discussion Etiquette & Rebuttals'],
        },
      ],
      practicalLab: 'Weekly mock debate rounds, recorded self-presentation speech analysis, and structured creative writing portfolio.',
      competitiveLink: 'Essential for CBSE Board English 95%+ scores, international exams (SAT, IELTS), and interview communication.',
    },
    aptitude: {
      title: 'Logical Reasoning & Aptitude',
      tagline: 'Practice tests and competitive exam preparation',
      icon: Puzzle,
      color: 'from-cyan-600 to-teal-600',
      badgeColor: 'border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/10',
      description: 'Mental ability training designed for Olympiads (NTSE, NSO, IMO) and competitive aptitude benchmarks.',
      topics: [
        {
          name: 'Unit 1: Verbal Reasoning & Series',
          subtopics: ['Number Series & Alphabet Sequences', 'Analogy & Classification Puzzles', 'Coding-Decoding (Substitution & Shifting)', 'Blood Relations & Family Tree Mapping', 'Direction Sense & Cardinal Path Tests'],
        },
        {
          name: 'Unit 2: Non-Verbal & Spatial Reasoning',
          subtopics: ['Pattern Completion & Series Progression', 'Figure Matrix & Rule Detection', 'Paper Folding, Punching & Unfolding', 'Embedded Figures & Hidden Shapes', 'Mirror & Water Image Reflections'],
        },
        {
          name: 'Unit 3: Analytical Reasoning & Logic',
          subtopics: ['Venn Diagram Set Intersections', 'Syllogisms & Logical Deductions', 'Linear & Circular Seating Arrangements', 'Calendar & Clock Angle Calculations'],
        },
      ],
      practicalLab: 'Timed 30-minute speed drills, Olympiad past-paper puzzle decryption, and elimination heuristics.',
      competitiveLink: 'Crucial for NTSE Stage 1 & 2, Kishore Vaigyanik, and general entrance aptitude tests.',
    },
    strategy: {
      title: 'Study Skills & Exam Strategy',
      tagline: 'Time management, exam techniques and future planning',
      icon: Compass,
      color: 'from-amber-600 to-yellow-600',
      badgeColor: 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10',
      description: 'Proven high-performance cognitive routines, revision rhythms, and 4-year NEET/JEE academic roadmaps.',
      topics: [
        {
          name: 'Unit 1: High-Performance Learning Science',
          subtopics: ['Active Recall vs Passive Re-reading', 'The 1-3-7-30 Spaced Repetition Schedule', 'Feynman Technique: Simplifying Complex Concepts', 'Deep Work Habit Formation & Screen-Time Boundaries'],
        },
        {
          name: 'Unit 2: Exam Conditioning & Stress Resilience',
          subtopics: ['Building the Personal Error Notebook', 'Negative Marking Prevention in Multiple Choice Tests', '3-Pass Exam Time Allocation Strategy', 'Pre-Exam Anxiety Regulation & Sleep Science'],
        },
        {
          name: 'Unit 3: The 4-Year Academic Blueprint (Classes 9–12)',
          subtopics: ['Class 9 Milestone Targets for NEET/JEE', 'Olympiad Target Timeline (Class 9 & 10)', 'Subject Stream Selection Blueprint (Science PCM vs PCB vs Commerce)', 'Building a Co-Curricular Academic Portfolio'],
        },
      ],
      practicalLab: 'Building your customized weekly study timetable and personal error diagnosis journal.',
      competitiveLink: 'Transforms raw student potential into disciplined, self-directed top percentiles.',
    },
  }

  const activeData = subjectsData[activeSubject]

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION (Matching brochure exactly) */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0a1b44]/90 via-[#06122d]/95 to-[#020919] p-4 sm:p-6 lg:p-7 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3.5 max-w-xl text-left">
            {/* Top Audience Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-extrabold text-amber-300 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>For Class 9 Students (After Class 8)</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Build a Strong Academic Foundation for{' '}
                <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                  NEET, JEE & Competitive Exams
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                8-month comprehensive foundation with 96 live interactive sessions, 7 core subjects, personal 24/7 Super AI Socratic Tutor, and dedicated student laptop included.
              </p>
            </div>

            {/* 5 Core Pillars */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              {[
                'Clear Concepts',
                'Regular Practice',
                'Expert Guidance',
                'Personal Attention',
                'Online & Offline Support',
              ].map((pillar) => (
                <span
                  key={pillar}
                  className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-950/70 border border-blue-400/25 text-[11px] font-bold text-blue-100 shadow-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{pillar}</span>
                </span>
              ))}
            </div>

            {/* Core Delivery Metrics Summary */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-0.5">
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-xl border border-sky-500/25 bg-sky-950/30 backdrop-blur-md">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs">
                  <span className="font-extrabold text-white block leading-tight">3 Classes/Wk</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-300 hidden sm:block">Expert faculty</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-xl border border-indigo-500/25 bg-indigo-950/30 backdrop-blur-md">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs">
                  <span className="font-extrabold text-white block leading-tight">96 Sessions</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-300 hidden sm:block">Across 8 months</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-xl border border-rose-500/25 bg-rose-950/30 backdrop-blur-md">
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                  <PlayCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs">
                  <span className="font-extrabold text-white block leading-tight">Live+Recorded</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-300 hidden sm:block">24/7 access</span>
                </div>
              </div>
            </div>

            {/* Above-the-fold Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto h-11 px-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(0,128,255,0.45)] border border-white/20 gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer justify-center"
              >
                Enrol Now • Choose Package <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  document.getElementById('learning-packages-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full sm:w-auto h-11 px-5 rounded-full border-white/25 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md font-bold text-xs sm:text-sm cursor-pointer justify-center"
              >
                View Fees & Laptop (From ₹29,999)
              </Button>
            </div>

            {/* Trust and Assurance Strip */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 pt-0.5">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                14-Day Money-Back Guarantee
              </span>
              <span className="text-slate-600">•</span>
              <span>CBSE, ICSE & State Boards</span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-300 font-semibold">Limited 30 Seats / Batch</span>
            </div>
          </div>

          {/* Right Column: Interactive 4D Brochure Showcase (Safely proportioned) */}
          <div className="w-full lg:w-[330px] xl:w-[350px] shrink-0">
            <Brochure4DShowcase onEnrolClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        {/* 7 Feature Chips Bar */}
        <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 text-center">
          {[
            { label: '3 Live Classes / Week', icon: Calendar, color: 'text-sky-400 bg-sky-500/15' },
            { label: 'Live & Recorded Classes', icon: PlayCircle, color: 'text-rose-400 bg-rose-500/15' },
            { label: 'Downloadable Study Notes', icon: FileText, color: 'text-amber-400 bg-amber-500/15' },
            { label: 'Chapter Practice & Tests', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/15' },
            { label: 'Mentor Doubt Support', icon: Users, color: 'text-purple-400 bg-purple-500/15' },
            { label: 'Progress Reports & Analytics', icon: Award, color: 'text-cyan-400 bg-cyan-500/15' },
            { label: 'Career & Exam Guidance', icon: Compass, color: 'text-orange-400 bg-orange-500/15' },
          ].map((feat) => {
            const Icon = feat.icon
            return (
              <div
                key={feat.label}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-blue-400/30 flex flex-col items-center justify-center gap-1.5 hover:bg-white/[0.08] transition-all backdrop-blur-md"
              >
                <div className={`p-1.5 rounded-lg ${feat.color}`}>
                  <Icon className="h-4 w-4 shrink-0" />
                </div>
                <span className="text-[11px] font-bold text-slate-200 leading-tight">
                  {feat.label}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* 1.5 TRYABLE LIVE PRODUCT PREVIEW: SOCRATIC EVALUATOR DEMO */}
      <SocraticEvaluatorDemo />

      {/* 2. COMPLETE SUBJECT COVERAGE WITH PRACTICAL LEARNING */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/30">
            Exhaustive Syllabus Architecture
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Complete Subject Coverage with Practical Learning
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Explore all 7 subjects in detail. Click any subject tab to review every chapter, formula set, home experiment, and NEET/JEE bridge.
          </p>
        </div>

        {/* Subject Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-muted/50 border border-border max-w-4xl mx-auto">
          {(Object.keys(subjectsData) as Array<keyof typeof subjectsData>).map((key) => {
            const subj = subjectsData[key]
            const Icon = subj.icon
            const isActive = activeSubject === key
            return (
              <button
                key={key}
                onClick={() => setActiveSubject(key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/80'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{subj.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Subject Details Display */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-lg space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${activeData.badgeColor}`}>
                  {activeData.title}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">• Full 8-Month Foundation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                {activeData.title} — {activeData.tagline}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeData.description}
              </p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="shrink-0 font-bold text-xs bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 rounded-xl h-10 px-4"
            >
              Enrol for {activeData.title} <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeData.topics.map((t, idx) => (
              <div key={t.name} className="p-5 rounded-2xl border bg-muted/20 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold font-mono">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-foreground">
                    {t.name}
                  </h4>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground pl-8">
                  {t.subtopics.map((sub) => (
                    <li key={sub} className="list-disc leading-relaxed">
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Practical Insights & NEET/JEE Bridge Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
              <h5 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                Hands-On Practical Lab & Real-World Application
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeData.practicalLab}
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-primary/20 bg-primary/5 space-y-2">
              <h5 className="font-bold text-sm text-primary flex items-center gap-2">
                <Award className="h-4 w-4" />
                NEET / JEE & Competitive Olympiad Connection
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeData.competitiveLink}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CHOOSE YOUR LEARNING PACKAGE (Direct Sales Cards matching brochure) */}
      <section id="learning-packages-section" className="space-y-8 pt-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/30">
            Transparent Pricing
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Choose Your Learning Package
          </h2>
          <p className="text-sm text-muted-foreground">
            Select between learning on your own laptop or receiving a brand new dedicated student laptop delivered before batch commencement.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Option 1: Course Only */}
          <div className="rounded-3xl border-2 border-emerald-500/30 bg-card p-6 sm:p-8 flex flex-col justify-between shadow-lg relative">
            <div className="space-y-6">
              <div className="space-y-2 border-b pb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                  Option 1
                </div>
                <h3 className="text-2xl font-black text-foreground">Course Only</h3>
                <p className="text-xs text-muted-foreground">
                  Learn with your own laptop or device
                </p>
              </div>

              {/* Price Banner */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-foreground">₹29,999</span>
                  <span className="text-xs text-muted-foreground">+ applicable GST</span>
                </div>
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-muted/30 border text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-muted-foreground block">One-Time Payment</span>
                    <span className="font-extrabold text-foreground text-sm">₹29,999</span>
                    <span className="text-[10px] text-muted-foreground block">+ applicable GST</span>
                  </div>
                  <div className="border-l pl-3">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground block">Easy Installments</span>
                    <span className="font-extrabold text-foreground text-sm">₹9,999 upfront</span>
                    <span className="text-[10px] text-muted-foreground block">+ ₹2,500 × 8 months = ₹29,999</span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 text-xs text-muted-foreground border-t pt-4">
                {[
                  '3 live classes every week (96 sessions across 8 months*)',
                  'Live & recorded classes with unlimited access',
                  'Downloadable study material & formula sheets',
                  'Chapter-wise practice & tests across all 7 subjects',
                  'Dedicated mentor support and doubt resolution',
                  'Progress tracking and regular guardian reports',
                  'Career guidance, NEET/JEE foundation roadmap',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Button
                size="lg"
                onClick={() => {
                  setSelectedPackage('course_only')
                  setIsModalOpen(true)
                }}
                className="w-full font-extrabold text-sm sm:text-base py-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md gap-2"
              >
                Select Course Only (₹29,999) <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Option 2: Course + Laptop */}
          <div className="rounded-3xl border-2 border-primary bg-card p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">

            <div className="space-y-6">
              <div className="space-y-2 border-b pb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-extrabold text-xs">
                  Option 2 • All-in-One Learning Solution
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-foreground">Course + Laptop</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    Laptop Included
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Complete learning package with a dedicated laptop
                </p>
              </div>

              {/* Price Banner */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-foreground">₹64,999</span>
                  <span className="text-xs text-muted-foreground">+ applicable GST</span>
                </div>
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-primary/5 border border-primary/20 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-primary block">One-Time Payment</span>
                    <span className="font-black text-foreground text-sm">₹61,999</span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">Save ₹3,000!</span>
                  </div>
                  <div className="border-l border-primary/20 pl-3">
                    <span className="text-[10px] font-bold uppercase text-primary block">Easy Installments</span>
                    <span className="font-black text-foreground text-sm">₹39,999 upfront</span>
                    <span className="text-[10px] text-muted-foreground block">+ ₹3,125 × 8 months = ₹64,999</span>
                  </div>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 text-xs text-muted-foreground border-t pt-4">
                <div className="flex items-start gap-2.5 font-bold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Everything in Course Only (all 96 live sessions, materials & tests)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Laptop className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span><strong>A new student laptop</strong> with confirmed specifications</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Pre-loaded learning tools, offline lesson packs, and test runners</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Laptop delivery before programme batch commencement</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Full manufacturer warranty and dedicated support</span>
                </div>
                <div className="flex items-start gap-2.5 text-primary font-semibold">
                  <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>Ideal for students who do not currently have a personal device</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Button
                size="lg"
                onClick={() => {
                  setSelectedPackage('course_laptop')
                  setIsModalOpen(true)
                }}
                className="w-full font-extrabold text-sm sm:text-base py-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl gap-2"
              >
                Select Course + Laptop (₹61,999) <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground max-w-xl mx-auto">
          *Laptop model and specifications will be confirmed before enrolment. Laptop is included only in the Course + Laptop package.
        </p>
      </section>

      {/* 3.5 LIVING SKILL RADAR: CLASS 8 -> CLASS 9 -> NEET/JEE 2029 */}
      <LivingSkillRadar onEnrolClick={() => setIsModalOpen(true)} />

      {/* 3.6 SUNDAY PARENT INTELLIGENCE PREVIEW */}
      <ParentIntelligencePreview onEnrolClick={() => setIsModalOpen(true)} />

      {/* 4. INTERACTIVE 96 LIVE SESSIONS SCHEDULE & ROUTINE */}
      <section className="rounded-3xl border bg-muted/10 p-6 sm:p-10 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/30">
            Teaching Calendar
          </Badge>
          <h3 className="text-xl sm:text-3xl font-extrabold text-foreground">
            96 Live Sessions Schedule Across 8 Months
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            3 classes per week (Tuesday/Thursday/Saturday or Monday/Wednesday/Friday). All sessions recorded in HD.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            {
              term: 'Month 1–2 (24 Sessions)',
              badge: 'Stage 1: Core Mechanics',
              items: ['Physics: Kinematics & Laws of Motion', 'Chemistry: Matter & States', 'Maths: Real Numbers & Polynomials', 'Weekly Doubt Hour & Diagnostic 1'],
            },
            {
              term: 'Month 3–4 (24 Sessions)',
              badge: 'Stage 2: Microscopic & Cellular',
              items: ['Biology: Fundamental Unit of Life (Cell)', 'Chemistry: Is Matter Pure & Mixtures', 'Maths: Coordinate Geometry & Lines/Angles', 'English: Reading Comprehension Mastery'],
            },
            {
              term: 'Month 5–6 (24 Sessions)',
              badge: 'Stage 3: Advanced Concepts',
              items: ['Physics: Gravitation, Floatation & Sound', 'Biology: Plant & Animal Tissues', 'Maths: Triangles Congruence & Circles', 'Aptitude: Verbal & Non-Verbal Matrix'],
            },
            {
              term: 'Month 7–8 (24 Sessions)',
              badge: 'Stage 4: Mastery & NEET/JEE Bridge',
              items: ['Chemistry: Mole Concept & Atomic Structure', 'Maths: Heron Formula & Mensuration', 'Full-Length Board & Foundation Mocks', 'Exam Time Strategy & Class 10 Transition'],
            },
          ].map((m) => (
            <div key={m.term} className="p-5 rounded-2xl border bg-card space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                {m.badge}
              </span>
              <h4 className="font-extrabold text-sm text-foreground">{m.term}</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {m.items.map((i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE SUPER AI CLASS 9 TUTOR DEMO */}
      <section className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-10 shadow-lg space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">
            <Brain className="h-4 w-4" /> Try Super AI Tutor
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Experience the 24/7 Socratic Class 9 AI Tutor
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Students can ask questions anytime. Super AI never gives raw answer dumps — it teaches step-by-step concepts.
          </p>
        </div>

        {/* Preset Question Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-bold text-muted-foreground">Try asking:</span>
          {[
            "Explain Newton's third law with a skateboard example",
            'How do I calculate the molecular mass of Sodium Carbonate?',
            'Why do plant cells have cell walls but animal cells do not?',
            'Difference between rational and irrational numbers',
          ].map((q) => (
            <button
              key={q}
              onClick={() => handleAiDemo(q)}
              className="text-xs px-3 py-1.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-foreground transition-all cursor-pointer font-medium"
            >
              {q}
            </button>
          ))}
        </div>

        {/* AI Answer Sandbox Display */}
        {(aiAnswer || isAiLoading) && (
          <div className="max-w-2xl mx-auto p-5 rounded-2xl border border-primary/30 bg-primary/[0.03] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <Brain className="h-4 w-4" />
              <span>Question: &ldquo;{aiQuestion}&rdquo;</span>
            </div>
            {isAiLoading ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                <span>Super AI is consulting Class 9 NCERT curriculum guidelines...</span>
              </div>
            ) : (
              <div className="text-xs sm:text-sm text-foreground whitespace-pre-line leading-relaxed border-t pt-3 font-normal">
                {aiAnswer}
              </div>
            )}
          </div>
        )}
      </section>

      {/* 6. DIAGNOSTIC PRACTICE QUIZ */}
      <section className="rounded-3xl border bg-card p-6 sm:p-10 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/30">
            Quick Diagnostic
          </Badge>
          <h3 className="text-xl sm:text-3xl font-extrabold text-foreground">
            Class 9 Foundation Readiness Check
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Test your Class 8→9 conceptual readiness in 2 minutes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              id: 1,
              subject: 'Physics',
              question: 'A car accelerates uniformly from 0 to 20 m/s in 5 seconds. What is its acceleration?',
              options: ['2 m/s²', '4 m/s²', '10 m/s²', '100 m/s²'],
              correct: 1,
              explanation: 'Acceleration a = (v - u) / t = (20 - 0) / 5 = 4 m/s².',
            },
            {
              id: 2,
              subject: 'Chemistry',
              question: 'Which of the following is a homogeneous mixture?',
              options: ['Chalk powder in water', 'Salt dissolved in water', 'Oil in water', 'Sand and iron filings'],
              correct: 1,
              explanation: 'Salt in water forms a true solution with uniform composition throughout.',
            },
            {
              id: 3,
              subject: 'Biology',
              question: 'Which cell organelle is known as the powerhouse of the cell?',
              options: ['Ribosome', 'Golgi apparatus', 'Mitochondria', 'Lysosome'],
              correct: 2,
              explanation: 'Mitochondria produce cellular energy in the form of ATP molecules.',
            },
            {
              id: 4,
              subject: 'Mathematics',
              question: 'The value of (√5 + √2)(√5 - √2) is:',
              options: ['3', '7', '√3', '21'],
              correct: 0,
              explanation: 'Using identity (a + b)(a - b) = a² - b² = (√5)² - (√2)² = 5 - 2 = 3.',
            },
          ].map((item, qIdx) => (
            <div key={item.id} className="p-5 rounded-2xl border bg-muted/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-primary font-mono">Question {qIdx + 1} ({item.subject})</span>
                <span className="text-muted-foreground">1 Mark</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{item.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {item.options.map((opt, oIdx) => {
                  const isSelected = quizAnswers[item.id] === oIdx
                  return (
                    <button
                      key={opt}
                      onClick={() => setQuizAnswers((prev) => ({ ...prev, [item.id]: oIdx }))}
                      className={`text-left px-3.5 py-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-border bg-card hover:bg-muted text-foreground'
                      }`}
                    >
                      <span className="font-mono mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  )
                })}
              </div>
              {quizSubmitted && (
                <div className={`p-3 rounded-xl text-xs ${quizAnswers[item.id] === item.correct ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-red-500/10 text-red-700 dark:text-red-300'}`}>
                  <strong>{quizAnswers[item.id] === item.correct ? '✓ Correct!' : '✗ Incorrect.'}</strong> {item.explanation}
                </div>
              )}
            </div>
          ))}

          <div className="pt-2 text-center">
            {!quizSubmitted ? (
              <Button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < 4}
                className="font-bold text-sm bg-primary text-primary-foreground px-6 py-2.5 rounded-xl"
              >
                Submit Answers & Check Score
              </Button>
            ) : (
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 space-y-2">
                <p className="font-extrabold text-foreground text-sm">
                  Your Score: {Object.keys(quizAnswers).filter((k) => quizAnswers[Number(k)] === [1, 1, 2, 0][Number(k) - 1]).length} / 4 Correct
                </p>
                <p className="text-xs text-muted-foreground">
                  Strengthen your foundations across Physics, Chemistry, Biology, and Math with our 96-session guided curriculum.
                </p>
                <Button size="sm" onClick={() => setIsModalOpen(true)} className="font-bold text-xs mt-2">
                  Enrol in Programme
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. PARENT & GUARDIAN FAQS */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="outline" className="text-primary border-primary/30">
            Parent & Student Clarifications
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-xs text-muted-foreground">
          {[
            {
              q: 'Is this programme aligned with CBSE, ICSE, and State Boards?',
              a: 'Yes. The syllabus is completely mapped to the NCERT national curriculum framework, covering all core concepts required across CBSE, ICSE, and State Boards while integrating higher-order Olympiad and NEET/JEE problem-solving skills.',
            },
            {
              q: 'What if a student misses a scheduled live class?',
              a: 'Every single live session is recorded in high definition and uploaded within 2 hours. Students can re-watch any lecture indefinitely, download session slides, and ask Super AI or their mentor questions if they need clarification.',
            },
            {
              q: 'How does the laptop package work and what are the specifications?',
              a: 'When you select Option 2 (Course + Laptop), a brand new, pre-configured student laptop is delivered directly to your doorstep before the batch start date. It includes pre-loaded offline lesson software, study packages, and manufacturer warranty.',
            },
            {
              q: 'What are the batch timing options?',
              a: 'We offer multiple batch slots to prevent school timetable clash: Batch A (Mon-Wed-Fri 4-6 PM), Batch B (Mon-Wed-Fri 6:30-8:30 PM), and Batch C (Tue-Thu-Sat 5-7 PM). Batch allocations are confirmed before commencement.',
            },
            {
              q: 'How are parents kept updated on student progress?',
              a: 'Parents receive monthly progress cards tracking live attendance percentage, weekly chapter test scores, homework submissions, and mentor qualitative feedback.',
            },
            {
              q: 'What is the refund and cooling-off policy?',
              a: 'We offer a 14-calendar-day cooling-off period starting from the date of admission confirmation. If you withdraw within this window before major milestone coursework is evaluated or hardware is unsealed, refunds are processed per our published policy.',
            },
          ].map((faq) => (
            <div key={faq.q} className="p-5 rounded-2xl border bg-card space-y-2">
              <h4 className="font-bold text-sm text-foreground flex items-start gap-2">
                <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. INTERACTIVE ENROLMENT MODAL (POPUP ON CTA CLICK) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 shadow-2xl text-foreground">
            <button
              onClick={() => {
                setIsModalOpen(false)
                setEnrolmentSuccess(false)
              }}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {!enrolmentSuccess ? (
              <form onSubmit={handleEnrolmentSubmit} className="space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs mb-1">
                    Admissions Open • Class 9 Foundation
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-foreground">
                    Enrol in Class 9 Foundation Programme
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Reserve your seat in our 96-session live learning cohort.
                  </p>
                </div>

                {/* Package Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground block">
                    1. Choose Learning Package:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPackage('course_only')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedPackage === 'course_only'
                          ? 'border-emerald-500 bg-emerald-500/10 text-foreground ring-2 ring-emerald-500/30'
                          : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/40'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block">Option 1</span>
                      <strong className="text-xs sm:text-sm block text-foreground">Course Only</strong>
                      <span className="text-xs font-extrabold text-foreground">₹29,999 + GST</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPackage('course_laptop')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        selectedPackage === 'course_laptop'
                          ? 'border-primary bg-primary/10 text-foreground ring-2 ring-primary/30'
                          : 'border-border bg-muted/20 text-muted-foreground hover:bg-muted/40'
                      }`}
                    >
                      <span className="absolute -top-2 right-2 bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">
                        Laptop Included
                      </span>
                      <span className="text-[10px] font-bold uppercase text-primary block">Option 2</span>
                      <strong className="text-xs sm:text-sm block text-foreground">Course + Laptop</strong>
                      <span className="text-xs font-extrabold text-foreground">₹61,999 + GST</span>
                    </button>
                  </div>
                </div>

                {/* Payment Option Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-foreground block">
                    2. Select Payment Option:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('onetime')}
                      className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                        paymentMode === 'onetime'
                          ? 'border-primary bg-primary/10 font-bold text-foreground'
                          : 'border-border bg-muted/20 text-muted-foreground'
                      }`}
                    >
                      <span className="block font-bold text-foreground">One-Time Payment</span>
                      <span>{isLaptop ? '₹61,999 (Save ₹3,000)' : '₹29,999 upfront'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMode('installments')}
                      className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                        paymentMode === 'installments'
                          ? 'border-primary bg-primary/10 font-bold text-foreground'
                          : 'border-border bg-muted/20 text-muted-foreground'
                      }`}
                    >
                      <span className="block font-bold text-foreground">Easy Installments</span>
                      <span>{isLaptop ? '₹39,999 + ₹3,125/mo' : '₹9,999 + ₹2,500/mo'}</span>
                    </button>
                  </div>
                </div>

                {/* Price Breakdown Summary */}
                <div className="p-3.5 rounded-2xl bg-muted/40 border text-xs space-y-1.5">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Selected Plan:</span>
                    <span className="font-bold text-foreground">{isLaptop ? 'Course + Laptop' : 'Course Only'} ({isOneTime ? 'One-Time' : 'Installment'})</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Base Amount (Upfront):</span>
                    <span>₹{upfrontPay.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Applicable GST (18%):</span>
                    <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-foreground border-t pt-1 text-sm">
                    <span>Total Upfront Due:</span>
                    <span className="text-primary">₹{totalUpfrontWithGst.toLocaleString('en-IN')}</span>
                  </div>
                  {!isOneTime && (
                    <div className="text-[11px] text-muted-foreground pt-1 border-t">
                      Subsequent monthly debit: ₹{monthlyPay.toLocaleString('en-IN')} + GST for 8 months.
                    </div>
                  )}
                </div>

                {/* Student & Parent Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-foreground block mb-1">
                      Student Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Aayan Wani"
                      className="w-full rounded-xl border px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-foreground block mb-1">
                      Parent / Guardian Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Dr. Arshid Wani"
                      className="w-full rounded-xl border px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-foreground block mb-1">
                      Parent Mobile Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={parentPhone}
                      onChange={(e) => setParentPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-foreground block mb-1">
                      Parent Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={parentEmail}
                      onChange={(e) => setParentEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full rounded-xl border px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-xs text-foreground block mb-1">
                    School Name & City
                  </label>
                  <input
                    type="text"
                    value={schoolCity}
                    onChange={(e) => setSchoolCity(e.target.value)}
                    placeholder="e.g. Delhi Public School, Srinagar / New Delhi"
                    className="w-full rounded-xl border px-3 py-2 bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="font-bold text-xs text-foreground block mb-1">
                    Preferred Batch Timing
                  </label>
                  <select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  >
                    <option value="Batch A (Mon-Wed-Fri 4:00 PM – 6:00 PM)">Batch A (Mon-Wed-Fri 4:00 PM – 6:00 PM)</option>
                    <option value="Batch B (Mon-Wed-Fri 6:30 PM – 8:30 PM)">Batch B (Mon-Wed-Fri 6:30 PM – 8:30 PM)</option>
                    <option value="Batch C (Tue-Thu-Sat 5:00 PM – 7:00 PM)">Batch C (Tue-Thu-Sat 5:00 PM – 7:00 PM)</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-black text-sm py-6 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                >
                  {isSubmitting ? 'Submitting Application...' : `Confirm & Enrol (₹${totalUpfrontWithGst.toLocaleString('en-IN')})`}
                </Button>

                <p className="text-[10px] text-center text-muted-foreground">
                  By submitting, you agree to our 14-day cooling-off refund policy and terms of admission.
                </p>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-foreground">
                    Enrolment Application Confirmed!
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Thank you, {parentName}. A welcome package and student credentials have been initiated for <strong>{studentName}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-muted/40 border text-xs text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Enrolment ID:</span>
                    <span className="font-mono font-bold text-foreground">TX-C9-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selected Package:</span>
                    <span className="font-bold text-foreground">{isLaptop ? 'Course + Laptop' : 'Course Only'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Allocated Batch:</span>
                    <span className="font-bold text-foreground">{selectedBatch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Admissions Counsellor:</span>
                    <span className="font-bold text-foreground">Calling within 2 hours</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => {
                      setIsModalOpen(false)
                      setEnrolmentSuccess(false)
                    }}
                    className="flex-1 font-bold text-xs"
                  >
                    Done
                  </Button>
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full font-bold text-xs">
                      Open Learner Workspace
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
