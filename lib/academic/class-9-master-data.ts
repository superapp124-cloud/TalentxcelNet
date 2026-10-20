/**
 * TALENTXCEL ACADEMY — CLASS 9 FOUNDATION MASTER ACADEMIC DATA
 * 
 * Unified, connected data architecture linking:
 * 1. 7-Subject Exhaustive Curriculum & Units
 * 2. Competency Nodes (Class 8 Prerequisites -> Class 9 Goal -> Class 11/12 NEET/JEE Bridge)
 * 3. Interactive Socratic Learning Challenges (Visual Simulation + Error DNA Diagnosis)
 * 4. Error Taxonomy Engine (Conceptual, Calculation, Unit, Reading Traps)
 * 5. Grounded Parent Intelligence Snapshot (Weekly Progress, Attendance, Active Gaps)
 * 6. 32-Week (8-Month) Master Delivery Timeline
 */

export type SubjectId = 
  | 'physics' 
  | 'chemistry' 
  | 'biology' 
  | 'mathematics' 
  | 'english' 
  | 'reasoning' 
  | 'study_skills'

export type CompetencyStatus = 'prerequisite_gap' | 'learning' | 'demonstrated' | 'mastered'

export type ErrorType = 
  | 'conceptual' 
  | 'calculation' 
  | 'unit_conversion' 
  | 'reading_trap'

export interface CompetencyNode {
  id: string
  code: string
  subjectId: SubjectId
  unit: string
  title: string
  class8Prerequisite: string
  class9Goal: string
  neetJeeConnection: string
  status: CompetencyStatus
  masteryScore: number // 0 to 100
  evidenceCount: number
}

export interface InteractiveChallengeOption {
  id: string
  text: string
  isCorrect: boolean
  errorType?: ErrorType
  diagnosisTitle?: string
  diagnosisDetail?: string
  socraticPrompt?: string
  remedialPrescription?: string
}

export interface InteractiveChallenge {
  id: string
  subjectId: SubjectId
  title: string
  badge: string
  conceptOverview: string
  simulationType: 'gravity_slider' | 'cell_osmosis' | 'mole_balance' | 'poly_factor'
  simulationPrompt: string
  simulationInitialValue: number
  simulationMin: number
  simulationMax: number
  simulationUnit: string
  questionStem: string
  options: InteractiveChallengeOption[]
  hints: string[]
  fullSolution: string
  neetJeeWeightage: string
}

export interface ParentWeeklyDigest {
  learnerName: string
  cohort: string
  weekNumber: number
  dateRange: string
  attendanceRate: number // percentage
  liveClassesAttended: number
  totalLiveClasses: number
  activeProblemSolvingMinutes: number
  masteredSkills: string[]
  activeGapsUnderRevision: {
    skill: string
    errorType: ErrorType
    detectedOn: string
    scheduledRetest: string
    remedialPracticeTime: string
  }[]
  mentorNote: string
  parentDiscussionPrompt: string
}

export interface TimelineStage {
  stageNumber: number
  monthSpan: string
  sessionCount: number
  themeTitle: string
  tagline: string
  modules: {
    subject: string
    topic: string
    practicalLab: string
  }[]
  milestoneAssessment: string
}

/* ====================================================================
   1. 7 CORE SUBJECT DEFINITIONS & WEIGHTS
   ==================================================================== */
export const SUBJECT_DEFINITIONS: Record<
  SubjectId,
  {
    name: string
    shortTitle: string
    tagline: string
    themeColor: string
    borderClass: string
    bgLight: string
    textClass: string
    sessionsCount: number
    neetJeeRelevance: string
  }
> = {
  physics: {
    name: 'Physics',
    shortTitle: 'Physics',
    tagline: 'Concepts, Problem Solving & Real-Life Applications',
    themeColor: 'sky',
    borderClass: 'border-sky-500/30',
    bgLight: 'bg-sky-500/10',
    textClass: 'text-sky-500',
    sessionsCount: 22,
    neetJeeRelevance: 'Direct foundation for Mechanics & Gravitation (Class 11, ~28% NEET weightage)',
  },
  chemistry: {
    name: 'Chemistry',
    shortTitle: 'Chemistry',
    tagline: 'Concept Clarity, Numerical Practice & Practical Insight',
    themeColor: 'amber',
    borderClass: 'border-amber-500/30',
    bgLight: 'bg-amber-500/10',
    textClass: 'text-amber-500',
    sessionsCount: 18,
    neetJeeRelevance: 'Foundation for Physical Chemistry & Mole Concept (Class 11, ~20% JEE Main)',
  },
  biology: {
    name: 'Biology',
    shortTitle: 'Biology',
    tagline: 'NCERT Focus, Diagrams, Practice & Application for NEET',
    themeColor: 'emerald',
    borderClass: 'border-emerald-500/30',
    bgLight: 'bg-emerald-500/10',
    textClass: 'text-emerald-500',
    sessionsCount: 18,
    neetJeeRelevance: 'Core anchor for Cell Biology & Human Physiology (NEET ~32% weightage)',
  },
  mathematics: {
    name: 'Mathematics',
    shortTitle: 'Maths',
    tagline: 'Build Fundamentals, Advanced Problem Solving & Logic',
    themeColor: 'indigo',
    borderClass: 'border-indigo-500/30',
    bgLight: 'bg-indigo-500/10',
    textClass: 'text-indigo-500',
    sessionsCount: 24,
    neetJeeRelevance: 'Indispensable tool for JEE Advanced Calculus, Coordinate Geometry & Physics Numericals',
  },
  english: {
    name: 'English & Communication',
    shortTitle: 'English',
    tagline: 'Reading, Writing, Comprehension & Presentation Skills',
    themeColor: 'rose',
    borderClass: 'border-rose-500/30',
    bgLight: 'bg-rose-500/10',
    textClass: 'text-rose-500',
    sessionsCount: 6,
    neetJeeRelevance: 'Critical for speed comprehension, elimination accuracy & interview confidence',
  },
  reasoning: {
    name: 'Logical Reasoning & Aptitude',
    shortTitle: 'Aptitude',
    tagline: 'Practice Tests & Competitive Exam Preparation',
    themeColor: 'purple',
    borderClass: 'border-purple-500/30',
    bgLight: 'bg-purple-500/10',
    textClass: 'text-purple-500',
    sessionsCount: 4,
    neetJeeRelevance: 'Essential for NTSE, Olympiads, CUET and competitive pattern recognition',
  },
  study_skills: {
    name: 'Study Skills & Exam Strategy',
    shortTitle: 'Strategy',
    tagline: 'Time Management, Exam Techniques & Future Planning',
    themeColor: 'cyan',
    borderClass: 'border-cyan-500/30',
    bgLight: 'bg-cyan-500/10',
    textClass: 'text-cyan-500',
    sessionsCount: 4,
    neetJeeRelevance: 'Metacognition, negative-marking risk analysis, and 4-year Class 9–12 roadmap',
  },
}

/* ====================================================================
   2. COMPETENCY NODES (CLASS 8 -> CLASS 9 -> NEET/JEE ROADMAP)
   ==================================================================== */
export const COMPETENCY_NODES: CompetencyNode[] = [
  // Physics Nodes
  {
    id: 'comp-phy-01',
    code: 'PHY-9-01',
    subjectId: 'physics',
    unit: 'Motion & Kinematics',
    title: 'Uniform Acceleration & Velocity-Time Graphs',
    class8Prerequisite: 'Basic speed, distance, and uniform rectilinear motion',
    class9Goal: 'Derive 3 equations of motion analytically and graphically (v = u + at, s = ut + ½at²)',
    neetJeeConnection: 'Class 11 Kinematics (Straight line & projectile motion: 8% NEET weightage)',
    status: 'mastered',
    masteryScore: 94,
    evidenceCount: 14,
  },
  {
    id: 'comp-phy-02',
    code: 'PHY-9-02',
    subjectId: 'physics',
    unit: 'Force & Laws of Motion',
    title: 'Newton’s Second Law & Momentum Conservation',
    class8Prerequisite: 'Contact vs non-contact forces, balanced vs unbalanced forces',
    class9Goal: 'F = dp/dt = ma; calculate recoil velocity and impulsive force in collisions',
    neetJeeConnection: 'Class 11 Laws of Motion & Friction (JEE Main ~6% / NEET ~7%)',
    status: 'demonstrated',
    masteryScore: 82,
    evidenceCount: 9,
  },
  {
    id: 'comp-phy-03',
    code: 'PHY-9-03',
    subjectId: 'physics',
    unit: 'Gravitation & Floatation',
    title: 'Inverse Square Law & Universal Gravitational Constant',
    class8Prerequisite: 'Earth’s gravity as attractive force; weight vs mass intro',
    class9Goal: 'F = G·(m₁m₂)/r²; calculate variation of g with altitude and orbital basics',
    neetJeeConnection: 'Class 11 Gravitation (Kepler’s laws, escape velocity, satellites: 5% NEET)',
    status: 'learning',
    masteryScore: 68,
    evidenceCount: 5,
  },
  {
    id: 'comp-phy-04',
    code: 'PHY-9-04',
    subjectId: 'physics',
    unit: 'Work, Energy & Power',
    title: 'Work-Energy Theorem & Kinetic-Potential Conversion',
    class8Prerequisite: 'Forms of energy (heat, light, mechanical)',
    class9Goal: 'W = F·s·cosθ; verify conservation of mechanical energy in free fall',
    neetJeeConnection: 'Class 11 Work, Power, Energy (Core problem-solving anchor in JEE Advanced)',
    status: 'prerequisite_gap',
    masteryScore: 42,
    evidenceCount: 2,
  },

  // Chemistry Nodes
  {
    id: 'comp-che-01',
    code: 'CHE-9-01',
    subjectId: 'chemistry',
    unit: 'Matter in Our Surroundings',
    title: 'Kinetic Theory of Matter & Latent Heat',
    class8Prerequisite: 'Solid, liquid, gas physical properties and state changes',
    class9Goal: 'Explain cooling caused by evaporation, latent heat of fusion & vaporization quantitatively',
    neetJeeConnection: 'Class 11 Thermodynamics & States of Matter (~6% JEE Main)',
    status: 'mastered',
    masteryScore: 96,
    evidenceCount: 12,
  },
  {
    id: 'comp-che-02',
    code: 'CHE-9-02',
    subjectId: 'chemistry',
    unit: 'Atoms & Molecules',
    title: 'Mole Concept & Chemical Formula Calculation',
    class8Prerequisite: 'Symbols of common elements, chemical reaction word equations',
    class9Goal: 'Convert grams ↔ moles ↔ number of particles using Avogadro’s constant (6.022×10²³)',
    neetJeeConnection: 'Class 11 Some Basic Concepts of Chemistry (Direct NEET 2 questions guaranteed)',
    status: 'learning',
    masteryScore: 61,
    evidenceCount: 6,
  },

  // Biology Nodes
  {
    id: 'comp-bio-01',
    code: 'BIO-9-01',
    subjectId: 'biology',
    unit: 'Fundamental Unit of Life',
    title: 'Plasma Membrane, Osmosis & Cell Organelles',
    class8Prerequisite: 'Plant cell vs animal cell gross structure (nucleus, cytoplasm, cell wall)',
    class9Goal: 'Differentiate hypotonic, isotonic, hypertonic osmosis; organelle biochemistry (ATP, enzymes)',
    neetJeeConnection: 'Class 11 Cell Biology: Unit of Life & Cell Cycle (NEET 8-10% of total biology)',
    status: 'mastered',
    masteryScore: 92,
    evidenceCount: 16,
  },
  {
    id: 'comp-bio-02',
    code: 'BIO-9-02',
    subjectId: 'biology',
    unit: 'Tissues (Histology)',
    title: 'Meristematic vs Permanent & Connective Tissues',
    class8Prerequisite: 'Cells form tissues, tissues form organs',
    class9Goal: 'Identify xylem, phloem, epithelial, muscular and nervous tissues under high magnification',
    neetJeeConnection: 'Class 11 Structural Organisation in Animals & Plant Anatomy (NEET ~7%)',
    status: 'demonstrated',
    masteryScore: 84,
    evidenceCount: 8,
  },

  // Mathematics Nodes
  {
    id: 'comp-mat-01',
    code: 'MAT-9-01',
    subjectId: 'mathematics',
    unit: 'Polynomials',
    title: 'Remainder Theorem & Splitting Middle Term Factorisation',
    class8Prerequisite: 'Algebraic expressions, identities like (a+b)², (a-b)²',
    class9Goal: 'Factorise cubic polynomials using factor theorem; apply (a+b+c)² and a³+b³+c³ identities',
    neetJeeConnection: 'Class 11 Quadratic Equations & Complex Numbers (JEE Main 8% weightage)',
    status: 'mastered',
    masteryScore: 95,
    evidenceCount: 18,
  },
  {
    id: 'comp-mat-02',
    code: 'MAT-9-02',
    subjectId: 'mathematics',
    unit: 'Coordinate Geometry',
    title: 'Cartesian Plane & Linear Equations in Two Variables',
    class8Prerequisite: 'Number line, reading simple Cartesian bar/line graphs',
    class9Goal: 'Plot ax + by + c = 0, find intercepts, calculate geometric coordinates in four quadrants',
    neetJeeConnection: 'Class 11 Straight Lines, Circles & Conic Sections (JEE Main ~12% weightage)',
    status: 'demonstrated',
    masteryScore: 88,
    evidenceCount: 11,
  },

  // Reasoning & Aptitude
  {
    id: 'comp-apt-01',
    code: 'APT-9-01',
    subjectId: 'reasoning',
    unit: 'Logical Deduction',
    title: 'Syllogisms & Venn Diagram Set Relationships',
    class8Prerequisite: 'Basic classification and odd-one-out sets',
    class9Goal: 'Deduce definite vs possible conclusions from multiple premises using Euler-Venn circles',
    neetJeeConnection: 'NTSE Stage 1/2, Olympiads, CUET Mental Ability section',
    status: 'demonstrated',
    masteryScore: 85,
    evidenceCount: 7,
  },

  // Study Skills & Strategy
  {
    id: 'comp-str-01',
    code: 'STR-9-01',
    subjectId: 'study_skills',
    unit: 'Metacognition',
    title: 'Negative-Marking Risk Analysis & Time Budgeting',
    class8Prerequisite: 'School exam preparation habits',
    class9Goal: 'Calculate expected value (+4 / -1) to make optimal elimination choices under time constraints',
    neetJeeConnection: 'Competitive exam score optimization for NEET (720 marks) & JEE Main (300 marks)',
    status: 'mastered',
    masteryScore: 90,
    evidenceCount: 6,
  },
]

/* ====================================================================
   3. INTERACTIVE SOCRATIC LEARNING CHALLENGES (TRYABLE DEMO)
   ==================================================================== */
export const INTERACTIVE_CHALLENGES: InteractiveChallenge[] = [
  {
    id: 'chal-gravitation-01',
    subjectId: 'physics',
    title: 'Newton’s Gravitation & Distance Scaling Trap',
    badge: 'Physics • Class 9 & NEET Bridge',
    conceptOverview:
      'Newton’s Universal Law of Gravitation states that every particle attracts every other particle with a force proportional to the product of their masses and inversely proportional to the square of the distance between their centers: F = G·(m₁·m₂)/r².',
    simulationType: 'gravity_slider',
    simulationPrompt:
      'Adjust the distance between the two 100 kg space probes and observe the instantaneous force reading on the digital dynamometer:',
    simulationInitialValue: 2, // 2 meters
    simulationMin: 1,
    simulationMax: 10,
    simulationUnit: 'meters',
    questionStem:
      'Two gravitational research probes are separated by a distance of 2 meters, experiencing an attractive gravitational force of 200 nano-Newtons. If the separation between the probes is tripled to 6 meters, what will the new gravitational force between them be?',
    options: [
      {
        id: 'opt-a',
        text: '66.7 nano-Newtons (divided by 3)',
        isCorrect: false,
        errorType: 'conceptual',
        diagnosisTitle: 'Linear Scaling Misconception',
        diagnosisDetail:
          'You divided the force linearly by 3 because the distance increased 3-fold. However, gravitation does not follow a linear relationship.',
        socraticPrompt:
          'Think about the formula F = G·(m₁·m₂)/r². Notice that r is raised to the power of 2. If r becomes 3 times larger, what happens to r² in the denominator?',
        remedialPrescription: '10-minute review on Inverse-Square Power Laws in Physical Systems.',
      },
      {
        id: 'opt-b',
        text: '22.2 nano-Newtons (divided by 9)',
        isCorrect: true,
        diagnosisTitle: 'Verified Mastery: Inverse-Square Precision',
        diagnosisDetail:
          'Spot-on! Since force is inversely proportional to r², tripling the distance (r × 3) reduces the force by a factor of 3² = 9. 200 nN / 9 = 22.22 nN.',
        socraticPrompt:
          'Excellent reasoning! Now ask yourself: what happens to the gravitational force if the distance were halved (reduced by 50%)?',
        remedialPrescription: 'Promoted to Advanced Gravitation & Orbital Velocity sprint.',
      },
      {
        id: 'opt-c',
        text: '600 nano-Newtons (multiplied by 3)',
        isCorrect: false,
        errorType: 'conceptual',
        diagnosisTitle: 'Direct vs Inverse Confusion',
        diagnosisDetail:
          'You multiplied the force by 3 as distance increased. In physics, when objects move further apart, their mutual gravitational pull gets weaker, not stronger!',
        socraticPrompt:
          'Recall how magnets feel when you pull them apart. Does the pull get stronger or weaker as the distance increases? Look at why r is in the denominator.',
        remedialPrescription: 'Foundational review of direct vs inverse proportions in nature.',
      },
      {
        id: 'opt-d',
        text: '50 nano-Newtons (divided by 4)',
        isCorrect: false,
        errorType: 'calculation',
        diagnosisTitle: 'Power Calculation Slip',
        diagnosisDetail:
          'You divided by 4 instead of 9, suggesting you assumed the distance was doubled (2² = 4) rather than tripled (3² = 9).',
        socraticPrompt:
          'Re-read the question carefully: the distance changed from 2 m to 6 m. How many times did it increase? What is that scaling factor squared?',
        remedialPrescription: 'Practice with scaling ratios in algebraic physics.',
      },
    ],
    hints: [
      'Hint 1 (Conceptual): Does gravitational force get stronger or weaker when objects are separated further?',
      'Hint 2 (Formula): Write down F₁ = G·m₁·m₂ / r₁² and F₂ = G·m₁·m₂ / r₂². Take their ratio.',
      'Hint 3 (Calculation): The ratio r₂ / r₁ = 6 / 2 = 3. Therefore, F₂ = F₁ / (3²) = 200 / 9.',
    ],
    fullSolution:
      'According to Newton’s Law of Universal Gravitation: F = G·(m₁·m₂)/r².\nLet F₁ = 200 nN at r₁ = 2 m.\nWhen the distance is changed to r₂ = 6 m, the ratio of distances is r₂ / r₁ = 6 / 2 = 3.\nSince F is inversely proportional to r² (F ∝ 1/r²):\nF₂ / F₁ = (r₁ / r₂)² = (1/3)² = 1/9.\nTherefore: F₂ = F₁ / 9 = 200 nN / 9 ≈ 22.22 nN.',
    neetJeeWeightage: 'NEET: 4 Marks (Gravitation) • JEE Main: 1 Question directly on r-scaling & field potential.',
  },
  {
    id: 'chal-mole-02',
    subjectId: 'chemistry',
    title: 'The Mole Concept: Mass vs Atom Count',
    badge: 'Chemistry • Foundation for Physical Chemistry',
    conceptOverview:
      'One mole of any substance contains exactly 6.022 × 10²³ elementary entities (Avogadro’s number). The mass of 1 mole of an element in grams is numerically equal to its atomic mass in atomic mass units (u).',
    simulationType: 'mole_balance',
    simulationPrompt:
      'Adjust the molecular mass counter for Carbon-12 vs Oxygen-16 and see the atomic counter calibrate to 6.022 × 10²³ particles:',
    simulationInitialValue: 12,
    simulationMin: 1,
    simulationMax: 44,
    simulationUnit: 'g/mol',
    questionStem:
      'A chemistry student measures 44 grams of Carbon Dioxide gas (CO₂). How many total individual atoms (both Carbon and Oxygen combined) are contained in this sample? (Atomic mass: C = 12 u, O = 16 u).',
    options: [
      {
        id: 'opt-m1',
        text: '6.022 × 10²³ atoms',
        isCorrect: false,
        errorType: 'conceptual',
        diagnosisTitle: 'Molecule vs Atom Count Confusion',
        diagnosisDetail:
          '6.022 × 10²³ is the number of CO₂ molecules, not total atoms! Each CO₂ molecule contains 1 Carbon and 2 Oxygen atoms.',
        socraticPrompt:
          '44 grams of CO₂ is indeed 1 mole of CO₂ molecules. But look at the chemical formula: CO₂. How many atoms are packed inside ONE single molecule of CO₂?',
        remedialPrescription: 'Atomicity and stoichiometric counting worksheet.',
      },
      {
        id: 'opt-m2',
        text: '1.8066 × 10²⁴ atoms (3 × Avogadro’s number)',
        isCorrect: true,
        diagnosisTitle: 'Verified Mastery: Stoichiometric Precision',
        diagnosisDetail:
          'Molar mass of CO₂ = 12 + 2(16) = 44 g/mol. So 44 g = 1 mole of molecules = 6.022 × 10²³ molecules. Each molecule has 3 atoms (1 C + 2 O), so total atoms = 3 × 6.022 × 10²³ = 1.8066 × 10²⁴ atoms!',
        socraticPrompt:
          'Outstanding work! You correctly distinguished between moles of molecules and total constituent atoms. This is identical to a classic NEET trap question.',
        remedialPrescription: 'Eligible for Gas Stoichiometry & Molar Volume at STP modules.',
      },
      {
        id: 'opt-m3',
        text: '1.2044 × 10²⁴ atoms (2 × Avogadro’s number)',
        isCorrect: false,
        errorType: 'reading_trap',
        diagnosisTitle: 'Omission of Carbon Atom',
        diagnosisDetail:
          'You only counted the 2 Oxygen atoms (2 × N_A) and forgot the single Carbon atom in the molecule.',
        socraticPrompt:
          'Check the full formula: C₁O₂. If you have 1 mole of CO₂, how many moles of Carbon atoms do you have, and how many moles of Oxygen atoms?',
        remedialPrescription: 'Molecular formula decomposition practice.',
      },
      {
        id: 'opt-m4',
        text: '44 × 6.022 × 10²³ atoms',
        isCorrect: false,
        errorType: 'conceptual',
        diagnosisTitle: 'Mass Multiplication Misconception',
        diagnosisDetail:
          'You multiplied the mass (44 g) directly by Avogadro’s constant without first converting to moles.',
        socraticPrompt:
          'Remember: Avogadro’s number counts particles per mole, not per gram! How many moles are there in 44 grams of CO₂?',
        remedialPrescription: 'Molar mass conversion fundamentals.',
      },
    ],
    hints: [
      'Hint 1: First find the molar mass of CO₂: Carbon (12) + 2 × Oxygen (16) = ?',
      'Hint 2: 44 grams / (44 g/mol) = 1 mole of CO₂ molecules = 6.022 × 10²³ molecules.',
      'Hint 3: How many atoms are in one molecule of CO₂? (1 Carbon + 2 Oxygen = 3 atoms). Multiply 3 by Avogadro’s number.',
    ],
    fullSolution:
      'Step 1: Calculate Molar Mass of CO₂ = 12 u + 2(16 u) = 44 g/mol.\nStep 2: Number of moles of CO₂ = Given mass / Molar mass = 44 g / 44 g/mol = 1 mole.\nStep 3: 1 mole of CO₂ contains 6.022 × 10²³ molecules.\nStep 4: Atomicity of CO₂ = 1 Carbon atom + 2 Oxygen atoms = 3 atoms per molecule.\nStep 5: Total atoms = 3 × (6.022 × 10²³) = 1.8066 × 10²⁴ atoms.',
    neetJeeWeightage: 'Class 11 NEET Physical Chemistry: Essential prerequisite (2-3 direct questions annually).',
  },
]

/* ====================================================================
   4. GROUNDED PARENT INTELLIGENCE SNAPSHOT (SAMPLE DEMONSTRATION)
   ==================================================================== */
export const SAMPLE_PARENT_REPORT: ParentWeeklyDigest = {
  learnerName: 'Aarav Sharma',
  cohort: 'Class 9 Foundation (Batch Alpha 2026–27)',
  weekNumber: 6,
  dateRange: 'Oct 14 – Oct 20, 2026',
  attendanceRate: 100,
  liveClassesAttended: 3,
  totalLiveClasses: 3,
  activeProblemSolvingMinutes: 185,
  masteredSkills: [
    'Newton’s Second Law & Momentum Calculations (PHY-9-02) • 94% accuracy',
    'Polynomial Factorisation via Splitting Middle Term (MAT-9-01) • 96% accuracy',
    'Cell Organelle Biochemistry & Osmosis Transport (BIO-9-01) • 92% accuracy',
  ],
  activeGapsUnderRevision: [
    {
      skill: 'Universal Gravitation & Inverse Square Distance Scaling (PHY-9-03)',
      errorType: 'conceptual',
      detectedOn: 'Thursday Live Practice (Oct 16)',
      scheduledRetest: 'Tuesday 6:00 PM (Oct 21)',
      remedialPracticeTime: '15 mins targeted simulation lab',
    },
    {
      skill: 'Mole Concept: Constituent Atom Counting vs Molecules (CHE-9-02)',
      errorType: 'reading_trap',
      detectedOn: 'Sunday Formative Quiz (Oct 19)',
      scheduledRetest: 'Wednesday 7:15 PM (Oct 22)',
      remedialPracticeTime: '10 mins step-by-step stoichiometry worksheet',
    },
  ],
  mentorNote:
    'Aarav demonstrates excellent analytical discipline in Mathematics and Cell Biology. In Physics, he temporarily confused linear scaling with inverse-square power relationships. Super AI has assigned him a dedicated virtual gravity simulation to anchor the intuition before next week’s exam.',
  parentDiscussionPrompt:
    'Ask Aarav over dinner: “If the Earth were twice as far from the Sun, would our year be twice as long or something different?” Let him explain the inverse-square law in his own words.',
}

/* ====================================================================
   5. 32-WEEK (8-MONTH) MASTER DELIVERY TIMELINE
   ==================================================================== */
export const MASTER_TIMELINE_STAGES: TimelineStage[] = [
  {
    stageNumber: 1,
    monthSpan: 'Month 1–2 (Weeks 1–8)',
    sessionCount: 24,
    themeTitle: 'Foundations & Core Mechanics',
    tagline: 'Bridging Class 8 intuition into rigorous mathematical modeling',
    modules: [
      {
        subject: 'Physics',
        topic: 'Kinematics: Equations of Motion & Graphical Calculus intro',
        practicalLab: 'Velocity-Time slope and displacement area under curve simulation',
      },
      {
        subject: 'Chemistry',
        topic: 'Particulate Nature of Matter & Latent Heat thermodynamics',
        practicalLab: 'Evaporation cooling and temperature-phase plateau virtual lab',
      },
      {
        subject: 'Mathematics',
        topic: 'Real Numbers, Surds & Polynomial Identities',
        practicalLab: 'Geometric square-root spiral and algebraic factoring workbench',
      },
      {
        subject: 'Biology',
        topic: 'Cell as the Fundamental Unit of Life & Membrane Transport',
        practicalLab: 'High-res virtual microscope slide viewing of onion peel vs cheek cells',
      },
    ],
    milestoneAssessment: 'Stage 1 Comprehensive Baseline & Formative Benchmark Exam (90 mins)',
  },
  {
    stageNumber: 2,
    monthSpan: 'Month 3–4 (Weeks 9–16)',
    sessionCount: 24,
    themeTitle: 'Microscopic Chemistry & Coordinate Geometry',
    tagline: 'Deepening abstract concepts with step-by-step problem-solving rigor',
    modules: [
      {
        subject: 'Chemistry',
        topic: 'Atoms, Molecules, Valency & Formula Writing',
        practicalLab: 'Balancing chemical reactions & molecular weight calculator',
      },
      {
        subject: 'Mathematics',
        topic: 'Coordinate Geometry & Linear Equations in Two Variables',
        practicalLab: 'Plotting linear intercepts and geometric locus in 4 quadrants',
      },
      {
        subject: 'Biology',
        topic: 'Plant & Animal Histology (Xylem, Phloem, Muscular, Nervous)',
        practicalLab: 'Tissue identification diagnostic quiz with microscopic micrographs',
      },
      {
        subject: 'Reasoning',
        topic: 'Verbal & Non-Verbal Syllogisms and Euler Diagrams',
        practicalLab: 'Timed deduction challenge arena with pattern validation',
      },
    ],
    milestoneAssessment: 'Stage 2 Mid-Term Proctored Examination (Board + NTSE Pattern)',
  },
  {
    stageNumber: 3,
    monthSpan: 'Month 5–6 (Weeks 17–24)',
    sessionCount: 24,
    themeTitle: 'Dynamics, Energy & Geometric Proofs',
    tagline: 'Multi-step competitive problem solving and Olympiad challenges',
    modules: [
      {
        subject: 'Physics',
        topic: 'Gravitation, Archimedes’ Principle, Floatation & Sound Waves',
        practicalLab: 'Buoyancy overflow can simulation and tuning fork frequency resonator',
      },
      {
        subject: 'Chemistry',
        topic: 'Structure of the Atom: Thomson, Rutherford, Bohr models',
        practicalLab: 'Electron shell configuration and isotope mass averaging lab',
      },
      {
        subject: 'Mathematics',
        topic: 'Lines, Angles, Triangles Congruence Theorems & Quadrilaterals',
        practicalLab: 'Interactive dynamic geometry angle-sum and congruence visualizer',
      },
      {
        subject: 'English & Comm.',
        topic: 'Structured Essay Argumentation & Spoken Presentation Mastery',
        practicalLab: 'Voice recording assessment with speech pacing and clarity scoring',
      },
    ],
    milestoneAssessment: 'Stage 3 Advanced Olympiad & School Half-Yearly Alignment Sprint',
  },
  {
    stageNumber: 4,
    monthSpan: 'Month 7–8 (Weeks 25–32)',
    sessionCount: 24,
    themeTitle: 'The Mole Concept, Mastery & NEET/JEE Transition',
    tagline: 'Consolidation, error elimination, and 4-year competitive blueprint',
    modules: [
      {
        subject: 'Chemistry',
        topic: 'Intensive Mole Concept Problem Solving (Mass ↔ Moles ↔ Volume)',
        practicalLab: 'Gas stoichiometry and limiting reagent simulation challenge',
      },
      {
        subject: 'Mathematics',
        topic: 'Circles, Heron’s Formula, Surface Areas, Volumes & Statistics',
        practicalLab: '3D cylinder, cone, sphere net unfolding and statistical variance tools',
      },
      {
        subject: 'Study Strategy',
        topic: 'Exam Psychology, Time-per-Question budgeting & Error Journaling',
        practicalLab: 'Simulated 3-hour exam with real-time negative-marking risk dashboard',
      },
      {
        subject: 'Holistic',
        topic: 'Grand Revision, Previous Year Questions (PYQ) & Class 10 Roadmap',
        practicalLab: 'Personalized Class 10 Transition Blueprint & Portfolio synthesis',
      },
    ],
    milestoneAssessment: 'Grand Final Proctored 3-Hour Simulation Exam & Verified Credential Award',
  },
]
