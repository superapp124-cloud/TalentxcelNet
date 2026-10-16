/**
 * TALENTXCEL ACADEMY — THE COMPLETE 20-FAMILY PROGRAMME UNIVERSE
 * 
 * Strict compliance with Project Titan master brief:
 * - 20 configuration-driven programme families across 3 universes:
 *   A. School & Competitive Examinations (Families 1-7)
 *   B. Technology & Future Careers (Families 8-12)
 *   C. Healthcare, Business & Employability (Families 13-20)
 * - Separate lifecycle statuses: open_for_enrolment | pilot | curriculum_development | concept | paused | retired
 * - Transparent disclaimers and regulatory boundaries
 */

export type ProgrammeCategory = 'school_competitive' | 'technology' | 'healthcare_business'

export type ProgrammeLifecycleStatus =
  | 'open_for_enrolment'
  | 'pilot'
  | 'curriculum_development'
  | 'concept'
  | 'paused'
  | 'retired'

export interface ProgrammeModuleSummary {
  id: string
  title: string
  topics: string[]
  estimatedHours: number
}

export interface ProgrammeProjectSummary {
  id: string
  title: string
  description: string
  deliverable: string
}

export interface ProgrammeFamily {
  id: string
  slug: string
  familyNumber: number
  title: string
  shortTitle: string
  subtitle: string
  tagline: string
  category: ProgrammeCategory
  categoryLabel: string
  lifecycleStatus: ProgrammeLifecycleStatus
  statusBadge: string
  durationMonths: number
  eligibility: string
  targetAudience: string
  languages: string[]
  deliveryFormat: string
  prerequisites: string[]
  learningOutcomes: string[]
  coreModules: ProgrammeModuleSummary[]
  handsOnProjects: ProgrammeProjectSummary[]
  pricing: {
    tuitionInr: number
    registrationFeeInr: number
    scholarshipAvailable: boolean
    emiAvailable: boolean
    includesLaptop: boolean
  }
  nextCohortDate?: string
  isApprovedForEnrolment: boolean
  regulatoryDisclaimer?: string
  sharedFoundationsWith?: string[]
  ecosystemConnection?: {
    brand: 'talentxcel' | 'chatr' | 'nuty-tales'
    label: string
    url: string
    rationale: string
  }
}

export const PROGRAMME_UNIVERSE: ProgrammeFamily[] = [
  // ==========================================
  // A. SCHOOL AND COMPETITIVE EXAMINATIONS
  // ==========================================
  {
    id: 'prog-01-class-9',
    slug: 'class-9-foundation',
    familyNumber: 1,
    title: 'Class 9 Foundation Programme',
    shortTitle: 'Class 9 Foundation',
    subtitle: 'Eight-month bridge strengthening STEM foundations, analytical reasoning, and study habits.',
    tagline: 'Strong concepts, brighter academic futures.',
    category: 'school_competitive',
    categoryLabel: 'School & Competitive Examinations',
    lifecycleStatus: 'open_for_enrolment',
    statusBadge: 'Admissions Open',
    durationMonths: 8,
    eligibility: 'Students who have passed Class 8 from recognized boards (CBSE / ICSE / State Boards).',
    targetAudience: 'Middle schoolers preparing for high school rigor and competitive Olympiads.',
    languages: ['English', 'Bilingual English-Hindi', 'Regional Urdu Support'],
    deliveryFormat: 'Hybrid live interactive lectures, PWA offline lesson sync, and Super AI socratic practice.',
    prerequisites: ['Completion of Class 8 Mathematics and General Science syllabus.'],
    learningOutcomes: [
      'Master foundational algebra, linear equations, coordinate geometry, and Euclidean principles.',
      'Establish deep conceptual understanding of Newton’s laws of motion, work, and gravitation.',
      'Develop scientific inquiry in cell biology, tissue systems, and atomic structures.',
      'Formulate structured analytical reasoning and logical deduction habits for future entrance exams.',
    ],
    coreModules: [
      {
        id: 'c9-mod-1',
        title: 'Module 1: Physics Foundations — Mechanics & Motion',
        topics: ['Kinematics', 'Newtonian Laws', 'Gravitation', 'Pressure & Buoyancy'],
        estimatedHours: 48,
      },
      {
        id: 'c9-mod-2',
        title: 'Module 2: Chemistry — Matter & Atomic Architecture',
        topics: ['Particulate Nature of Matter', 'Atoms & Molecules', 'Atomic Models', 'Valency'],
        estimatedHours: 42,
      },
      {
        id: 'c9-mod-3',
        title: 'Module 3: Mathematics — Rigorous Geometry & Algebra',
        topics: ['Polynomials', 'Coordinate Geometry', 'Linear Equations in 2 Variables', 'Triangles & Quadrilaterals'],
        estimatedHours: 64,
      },
      {
        id: 'c9-mod-4',
        title: 'Module 4: Biology & Life Sciences',
        topics: ['Fundamental Unit of Life', 'Plant & Animal Tissues', 'Biodiversity Foundations'],
        estimatedHours: 36,
      },
      {
        id: 'c9-mod-5',
        title: 'Module 5: Mental Ability & Olympiad Aptitude',
        topics: ['Logical Sequences', 'Pattern Recognition', 'Mathematical Olympiad Problem Solving'],
        estimatedHours: 30,
      },
    ],
    handsOnProjects: [
      {
        id: 'c9-proj-1',
        title: 'Experimental Physics Mechanics Workbook',
        description: 'Guided calculations of velocity-time trajectories and gravitational acceleration verification.',
        deliverable: 'Interactive Lab Workbook & Super AI error diagnostics.',
      },
      {
        id: 'c9-proj-2',
        title: 'Elementary Data Science with Mathematics',
        description: 'Using spreadsheet graphing to analyze real-world linear relationships and statistical trends.',
        deliverable: 'Structured spreadsheet model and analytical interpretation.',
      },
    ],
    pricing: {
      tuitionInr: 24000,
      registrationFeeInr: 2000,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    nextCohortDate: 'November 2026',
    isApprovedForEnrolment: true,
    regulatoryDisclaimer:
      'Standalone 8-month academic bridge programme following Class 8. Does not substitute for formal recognized school affiliation; tuition covers this 8-month bridge only.',
    sharedFoundationsWith: ['class-10-advanced', 'class-11-neet-jee'],
    ecosystemConnection: {
      brand: 'chatr',
      label: 'Class 9 STEM Peer Cohort on CHATR',
      url: 'https://chatrchat.in',
      rationale: 'Discuss homework problem sets with vetted peer study groups in a safe supervised community.',
    },
  },
  {
    id: 'prog-02-class-10',
    slug: 'class-10-advanced',
    familyNumber: 2,
    title: 'Class 10 Advanced Preparation',
    shortTitle: 'Class 10 Board Mastery',
    subtitle: 'Board-aligned deep learning, rapid revision, chapter practice, and Olympiad problem solving.',
    tagline: 'High-distinction board preparation with competitive exam foresight.',
    category: 'school_competitive',
    categoryLabel: 'School & Competitive Examinations',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 8,
    eligibility: 'Class 9 passed students entering Class 10 (CBSE / ICSE / State Boards).',
    targetAudience: 'Secondary school aspirants aiming for 95%+ board performance and early JEE/NEET grounding.',
    languages: ['English', 'Bilingual English-Hindi'],
    deliveryFormat: 'Interactive chapter masterclasses, timed assessment simulations, and AI formula assistants.',
    prerequisites: ['Class 9 Science and Mathematics foundation.'],
    learningOutcomes: [
      'Comprehensive mastery of Class 10 Board syllabus across Physics, Chemistry, Biology, and Math.',
      'Proven test velocity and time management under authentic board exam conditions.',
      'Bridging Class 10 concepts into Class 11 competitive vectors and organic chemistry foundations.',
    ],
    coreModules: [
      {
        id: 'c10-mod-1',
        title: 'Module 1: Chemical Reactions & Periodic Foundations',
        topics: ['Chemical Equations', 'Acids, Bases & Salts', 'Metals & Non-metals', 'Carbon Compounds'],
        estimatedHours: 50,
      },
      {
        id: 'c10-mod-2',
        title: 'Module 2: Electromagnetism & Optics in Physics',
        topics: ['Light Reflection & Refraction', 'Human Eye', 'Electricity & Ohm’s Law', 'Magnetic Effects of Current'],
        estimatedHours: 55,
      },
      {
        id: 'c10-mod-3',
        title: 'Module 3: Advanced Mathematics & Trigonometry',
        topics: ['Real Numbers', 'Quadratic Equations', 'Arithmetic Progressions', 'Trigonometry & Heights/Distances'],
        estimatedHours: 65,
      },
    ],
    handsOnProjects: [
      {
        id: 'c10-proj-1',
        title: 'Comprehensive Board Exam Simulation Suite',
        description: 'Complete past 10 years solved paper portfolio with AI error attribution.',
        deliverable: 'Full-length graded mock board submissions.',
      },
    ],
    pricing: {
      tuitionInr: 28000,
      registrationFeeInr: 2500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Board examination coaching and academic enrichment programme. Not a school board granting institution.',
    sharedFoundationsWith: ['class-9-foundation', 'class-11-neet-jee'],
  },
  {
    id: 'prog-03-class-11-neet-jee',
    slug: 'class-11-neet-jee',
    familyNumber: 3,
    title: 'Class 11 NEET/JEE Track',
    shortTitle: 'Class 11 NEET/JEE',
    subtitle: 'Subject foundations, vector mechanics, physical chemistry, and structured competitive-exam preparation.',
    tagline: 'Build the unshakeable foundation for India’s toughest competitive entrances.',
    category: 'school_competitive',
    categoryLabel: 'School & Competitive Examinations',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 10,
    eligibility: 'Class 10 passed students entering senior secondary school with Science (PCM / PCB / PCMB).',
    targetAudience: 'Future doctors, biomedical scientists, and engineers aiming for top national ranks.',
    languages: ['English', 'Hinglish'],
    deliveryFormat: 'Concept rigor lectures, daily practice problems (DPPs), and weekly computer-based test (CBT) drills.',
    prerequisites: ['Strong Class 10 Mathematics and Science fundamentals.'],
    learningOutcomes: [
      'Master kinematics, work-energy, rotational dynamics, and thermodynamics.',
      'Deep conceptual command of atomic structure, chemical bonding, mole concept, and equilibrium.',
      'High-velocity problem solving under timed negative-marking constraints.',
    ],
    coreModules: [
      {
        id: 'c11-mod-1',
        title: 'Module 1: Classical Mechanics & Rotational Dynamics',
        topics: ['Vectors', 'Calculus for Physics', 'Laws of Motion', 'Rotational Inertia & Angular Momentum'],
        estimatedHours: 70,
      },
      {
        id: 'c11-mod-2',
        title: 'Module 2: Physical & Inorganic Chemistry Foundation',
        topics: ['Mole Concept', 'Atomic Structure', 'Periodic Classification', 'Thermodynamics & Equilibrium'],
        estimatedHours: 70,
      },
      {
        id: 'c11-mod-3',
        title: 'Module 3: Specialization Stream (JEE Math / NEET Botany & Zoology)',
        topics: ['Coordinate Geometry & Calculus (JEE)' , 'Cell Division, Biomolecules & Human Physiology (NEET)'],
        estimatedHours: 80,
      },
    ],
    handsOnProjects: [
      {
        id: 'c11-proj-1',
        title: 'NTA Standard Diagnostic Benchmark Suite',
        description: 'Complete full-syllabus timed computer-based exam with granular topic weak-area heatmap.',
        deliverable: 'CBT diagnostic portfolio with Super AI socratic error remediation.',
      },
    ],
    pricing: {
      tuitionInr: 36000,
      registrationFeeInr: 3000,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Coaching and preparatory guidance. Not affiliated with or endorsed by NTA, NMC, or IIT Council.',
    sharedFoundationsWith: ['class-12-neet-jee'],
  },
  {
    id: 'prog-04-class-12-neet-jee',
    slug: 'class-12-neet-jee',
    familyNumber: 4,
    title: 'Class 12 NEET/JEE Track',
    shortTitle: 'Class 12 NEET/JEE',
    subtitle: 'Syllabus mastery, full-length CBT mock drills, rapid revision, and negative-marking risk optimization.',
    tagline: 'Precision testing strategy, rank acceleration, and revision mastery.',
    category: 'school_competitive',
    categoryLabel: 'School & Competitive Examinations',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 10,
    eligibility: 'Class 11 Science students entering Class 12 or repeating aspirants.',
    targetAudience: 'Final-year competitive aspirants seeking rank conversion and national seat qualification.',
    languages: ['English', 'Hinglish'],
    deliveryFormat: 'Intensive mock analysis, Super AI rank prediction, and high-yield formula vaults.',
    prerequisites: ['Class 11 Science curriculum completion.'],
    learningOutcomes: [
      'Comprehensive syllabus closure across Electrostatics, Magnetism, Modern Physics, and Organic Chemistry.',
      'Consistent 99+ percentile time-to-accuracy ratio on full-syllabus mock papers.',
      'Mastery of revision loops and high-yield question recognition patterns.',
    ],
    coreModules: [
      {
        id: 'c12-mod-1',
        title: 'Module 1: Electrodynamics & Modern Physics',
        topics: ['Electrostatics', 'Current Electricity', 'Electromagnetic Induction', 'Semiconductors & Nuclear Physics'],
        estimatedHours: 75,
      },
      {
        id: 'c12-mod-2',
        title: 'Module 2: Organic Chemistry Reaction Mechanisms',
        topics: ['Reaction Mechanisms', 'Aldehydes & Ketones', 'Polymers & Biomolecules', 'Electrochemistry'],
        estimatedHours: 75,
      },
      {
        id: 'c12-mod-3',
        title: 'Module 3: Speed Mastery & High-Yield Revision Drills',
        topics: ['Timed Problem Solving', 'Error Pattern Remediation', 'Calculus Applications in Mechanics', 'Final Mock Simulators'],
        estimatedHours: 60,
      },
    ],
    handsOnProjects: [
      {
        id: 'c12-proj-1',
        title: 'All-India Mock Examination Portfolio',
        description: 'Series of 20 full-length CBT examinations under strict negative-marking constraints.',
        deliverable: 'Verified test score analytics and percentile trends.',
      },
    ],
    pricing: {
      tuitionInr: 38000,
      registrationFeeInr: 3000,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Coaching and preparatory guidance. Not affiliated with or endorsed by NTA, NMC, or IIT Council.',
    sharedFoundationsWith: ['class-11-neet-jee'],
  },
  {
    id: 'prog-05-civil-services',
    slug: 'civil-services-ias',
    familyNumber: 5,
    title: 'Civil Services and IAS Preparation',
    shortTitle: 'UPSC Civil Services / IAS',
    subtitle: 'General studies, constitutional governance, economic policy, analytical essay writing, and ethics.',
    tagline: 'Strategic knowledge mastery for India’s premier administrative service.',
    category: 'school_competitive',
    categoryLabel: 'School & Competitive Examinations',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 12,
    eligibility: 'Undergraduates, graduates, and final-year university students.',
    targetAudience: 'Aspirants targeting UPSC CSE, State Public Service Commissions (KAS, UPPSC, BPSC).',
    languages: ['English', 'Hinglish'],
    deliveryFormat: 'Daily editorial analysis, structured GS answer writing critiques, and simulated mains evaluations.',
    prerequisites: ['Bachelor degree or final year undergraduate standing.'],
    learningOutcomes: [
      'Command of Indian Polity, Constitution, Governance, and International Relations.',
      'In-depth mastery of Indian Economic Development, Fiscal Policies, and Sustainable Growth.',
      'High-scoring answer writing structure under strict word limits and time pressure.',
    ],
    coreModules: [
      {
        id: 'upsc-mod-1',
        title: 'Module 1: Indian Polity, Constitution & Governance (GS-II)',
        topics: ['Constitutional Framework', 'Federalism', 'Judiciary & Separation of Powers', 'Welfare Schemes'],
        estimatedHours: 80,
      },
      {
        id: 'upsc-mod-2',
        title: 'Module 2: Indian Economy & Environmental Ecology (GS-III)',
        topics: ['Macroeconomic Trends', 'Agriculture & Food Security', 'Biodiversity & Climate Action', 'Internal Security'],
        estimatedHours: 85,
      },
      {
        id: 'upsc-mod-3',
        title: 'Module 3: Ethics, Integrity & Aptitude (GS-IV)',
        topics: ['Human Values', 'Attitude & Emotional Intelligence', 'Case Studies in Administration'],
        estimatedHours: 50,
      },
    ],
    handsOnProjects: [
      {
        id: 'upsc-proj-1',
        title: 'Mains Answer Writing Portfolio',
        description: 'Submission of 50 evaluated answers across GS papers with multi-dimensional rubric feedback.',
        deliverable: 'Evaluated essay dossier and policy analysis brief.',
      },
    ],
    pricing: {
      tuitionInr: 45000,
      registrationFeeInr: 3500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Civil services exam coaching and academic mentoring. Not affiliated with UPSC or state PSCs.',
    sharedFoundationsWith: ['state-selection-government-exams', 'law-entrance-legal'],
  },
  {
    id: 'prog-06-law-entrance',
    slug: 'law-entrance-legal',
    familyNumber: 6,
    title: 'Law Entrance and Legal Studies',
    shortTitle: 'Law Entrance & CLAT',
    subtitle: 'Legal aptitude, statutory reasoning, reading comprehension, critical analysis, and current legal affairs.',
    tagline: 'Master analytical jurisprudence and score top ranks for National Law Universities.',
    category: 'school_competitive',
    categoryLabel: 'School & Competitive Examinations',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 8,
    eligibility: 'Class 12 students or graduates appearing for CLAT / AILET / State Law Entrances.',
    targetAudience: 'Aspiring advocates, corporate counsels, and judicial service aspirants.',
    languages: ['English'],
    deliveryFormat: 'Passage-based reading masterclasses, constitutional case analysis, and timed sectional speed tests.',
    prerequisites: ['Strong English reading comprehension.'],
    learningOutcomes: [
      'Speed-reading and analytical dissection of complex legal passages and statutory provisions.',
      'Flawless deductive reasoning across torts, contracts, constitutional principles, and criminal law.',
      'Systematic current legal affairs synthesis.',
    ],
    coreModules: [
      {
        id: 'clat-mod-1',
        title: 'Module 1: Legal Reasoning & Jurisprudence Basics',
        topics: ['Law of Torts', 'Law of Contracts', 'Criminal Law Fundamentals', 'Constitutional Rights'],
        estimatedHours: 50,
      },
      {
        id: 'clat-mod-2',
        title: 'Module 2: Logical & Critical Reasoning',
        topics: ['Argument Evaluation', 'Premise & Conclusion Inference', 'Logical Fallacies', 'Syllogisms'],
        estimatedHours: 45,
      },
      {
        id: 'clat-mod-3',
        title: 'Module 3: English Comprehension & Contemporary Legal GK',
        topics: ['Passage-Based Inference', 'Vocabulary in Context', 'Landmark Judgments', 'Legal Current Affairs'],
        estimatedHours: 45,
      },
    ],
    handsOnProjects: [
      {
        id: 'clat-proj-1',
        title: 'Judicial Case Analysis Brief',
        description: 'Drafting structured legal issue analysis based on landmark Supreme Court rulings.',
        deliverable: 'Written legal brief evaluated against CLAT passage criteria.',
      },
    ],
    pricing: {
      tuitionInr: 32000,
      registrationFeeInr: 2500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Entrance coaching only. Does not grant license to practise law; statutory qualification requires BCI accredited law school.',
    sharedFoundationsWith: ['civil-services-ias'],
  },
  {
    id: 'prog-07-state-selection',
    slug: 'state-selection-government-exams',
    familyNumber: 7,
    title: 'State Selection Boards and Government Examinations',
    shortTitle: 'State SSB & Govt Exams',
    subtitle: 'Configurable state-specific syllabi (JKSSB, SSC CGL, Banking IBPS, State Police) and quantitative aptitude.',
    tagline: 'Targeted preparation with configurable state-specific syllabus modules.',
    category: 'school_competitive',
    categoryLabel: 'School & Competitive Examinations',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 8,
    eligibility: '10+2 or Bachelor degree holders matching state recruitment board criteria.',
    targetAudience: 'Job seekers targeting clerical, executive, police, and inspection cadre government vacancies.',
    languages: ['English', 'Hindi', 'Urdu / Regional'],
    deliveryFormat: 'Configurable regional question banks, speed math techniques, and full-length CBT tests.',
    prerequisites: ['Basic secondary school mathematics and general knowledge.'],
    learningOutcomes: [
      'High-velocity quantitative aptitude and mental calculation shortcuts.',
      'Mastery of General Knowledge, regional geography, state history, and current national events.',
      'Error-free English comprehension and grammatical accuracy.',
    ],
    coreModules: [
      {
        id: 'ssb-mod-1',
        title: 'Module 1: Quantitative Aptitude & Speed Mathematics',
        topics: ['Percentages', 'Profit & Loss', 'Time & Work', 'Data Interpretation', 'Algebraic Shortcuts'],
        estimatedHours: 60,
      },
      {
        id: 'ssb-mod-2',
        title: 'Module 2: State-Specific & General Knowledge',
        topics: ['Indian History & Geography', 'State Reorganization & Regional Geography', 'Science in Everyday Life'],
        estimatedHours: 55,
      },
    ],
    handsOnProjects: [
      {
        id: 'ssb-proj-1',
        title: 'Timed CBT Examination Portfolio',
        description: '10 full-length CBT tests tailored to the target board (e.g. JKSSB / SSC CGL).',
        deliverable: 'Speed-accuracy performance diagnostic certificate.',
      },
    ],
    pricing: {
      tuitionInr: 22000,
      registrationFeeInr: 1500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: false,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Preparatory training. Does not guarantee government employment or appointment.',
    sharedFoundationsWith: ['civil-services-ias'],
  },

  // ==========================================
  // B. TECHNOLOGY AND FUTURE CAREERS
  // ==========================================
  {
    id: 'prog-08-ai-dev',
    slug: 'ai-development',
    familyNumber: 8,
    title: 'AI Development and Automation',
    shortTitle: 'AI Development & Agents',
    subtitle: 'Python, REST APIs, pgvector RAG systems, tool-calling agents, automation pipelines, and deployed projects.',
    tagline: 'Build practical AI systems, autonomous agents, and production cloud services.',
    category: 'technology',
    categoryLabel: 'Technology & Future Careers',
    lifecycleStatus: 'open_for_enrolment',
    statusBadge: 'Flagship • Applications opening soon',
    durationMonths: 8,
    eligibility: 'Open to diploma holders, university students, working professionals, and career switchers.',
    targetAudience: 'Software developers, automation engineers, and aspiring AI product creators.',
    languages: ['English', 'English with Urdu / Hindi mentoring'],
    deliveryFormat: 'Project-first coding workspace, automated test runner sandbox, Super AI code mentor.',
    prerequisites: ['Basic logical thinking; no prior Python experience strictly required.'],
    learningOutcomes: [
      'Write production Python with asynchronous concurrency, typing, and robust error handling.',
      'Design REST & Next.js backend APIs connected to PostgreSQL with Supabase Row Level Security.',
      'Implement enterprise RAG pipelines using text embeddings, cosine similarity, and pgvector.',
      'Build multi-step autonomous AI agents with function calling, validation gates, and human-in-the-loop audit.',
      'Deploy full-stack applications with automated testing, CI/CD, and monitoring.',
    ],
    coreModules: [
      {
        id: 'ai-mod-1',
        title: 'Module 1: Foundations of Production Software & Python',
        topics: ['Client-Server Architecture', 'Type Systems', 'Concurrency & AsyncIO', 'Git Branching & PRs'],
        estimatedHours: 45,
      },
      {
        id: 'ai-mod-2',
        title: 'Module 2: Databases, Vector Stores & SQL Mastery',
        topics: ['PostgreSQL Relational Design', 'pgvector & Cosine Search', 'Supabase RLS Security', 'Indexing'],
        estimatedHours: 50,
      },
      {
        id: 'ai-mod-3',
        title: 'Module 3: Enterprise RAG Architecture',
        topics: ['Chunking Strategies', 'Embedding Models', 'Semantic Retrieval', 'Hallucination Mitigation'],
        estimatedHours: 60,
      },
      {
        id: 'ai-mod-4',
        title: 'Module 4: Supervised LLM Tool-Calling & Agents',
        topics: ['Function Calling', 'Deterministic State Machines', 'Safety Sandboxing', 'Human-in-the-loop'],
        estimatedHours: 65,
      },
      {
        id: 'ai-mod-5',
        title: 'Module 5: Production Deployment & Cloud CI/CD',
        topics: ['Docker Containerization', 'Automated Testing', 'Edge Routing', 'Telemetry & Cost Budgets'],
        estimatedHours: 50,
      },
    ],
    handsOnProjects: [
      {
        id: 'ai-proj-1',
        title: 'Enterprise Grounded Knowledge Retrieval Engine',
        description: 'Complete semantic search and question-answering system using PostgreSQL pgvector and OpenAI embeddings.',
        deliverable: 'Tested and verified repository with 4/4 passing automated sandboxed test suite.',
      },
      {
        id: 'ai-proj-2',
        title: 'Autonomous Multi-Tool Operations Copilot',
        description: 'AI agent executing structured SQL queries, CRM updates, and email notifications with strict safety gates.',
        deliverable: 'Deployed agent application with full audit trail logging.',
      },
    ],
    pricing: {
      tuitionInr: 45000,
      registrationFeeInr: 4500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    nextCohortDate: 'Rolling Admissions / Immediate Onboarding',
    isApprovedForEnrolment: true,
    regulatoryDisclaimer: 'Industry skill certification and portfolio verification. Distinct from statutory university degrees.',
    sharedFoundationsWith: ['web-development-product-engineering', 'data-science-analytics', 'cloud-devops-cybersecurity'],
    ecosystemConnection: {
      brand: 'talentxcel',
      label: 'TalentXcel Verified Developer Network',
      url: 'https://careers.talentxcel.in',
      rationale: 'Pass verified project assessments to automatically showcase your code portfolio to hiring companies.',
    },
  },
  {
    id: 'prog-09-data-science',
    slug: 'data-science-analytics',
    familyNumber: 9,
    title: 'Data Science and Analytics',
    shortTitle: 'Data Science & SQL',
    subtitle: 'Data analysis, statistics, interactive visualization, PostgreSQL, Pandas, and applied machine learning.',
    tagline: 'Transform raw data into executive intelligence and predictive insights.',
    category: 'technology',
    categoryLabel: 'Technology & Future Careers',
    lifecycleStatus: 'pilot',
    statusBadge: 'Pilot Cohort Open',
    durationMonths: 8,
    eligibility: 'Graduates, undergraduates, or professionals in finance, business, or engineering.',
    targetAudience: 'Aspiring business analysts, data scientists, and metrics engineers.',
    languages: ['English', 'English with Hindi / Urdu mentoring'],
    deliveryFormat: 'Interactive Jupyter notebooks, live dataset analysis, and dashboard portfolio building.',
    prerequisites: ['Basic high school mathematics and spreadsheet familiarity.'],
    learningOutcomes: [
      'Extract, clean, and transform messy real-world datasets using Python, Pandas, and NumPy.',
      'Write complex analytical SQL queries with window functions, CTEs, and aggregation pipelines.',
      'Build executive dashboards with Tableau, Streamlit, and modern BI frameworks.',
      'Train, validate, and interpret classical machine learning regression and classification models.',
    ],
    coreModules: [
      {
        id: 'ds-mod-1',
        title: 'Module 1: Advanced SQL & Data Warehousing',
        topics: ['Relational Joins', 'Window Functions', 'Partitioning', 'Star Schema & Data Marts'],
        estimatedHours: 50,
      },
      {
        id: 'ds-mod-2',
        title: 'Module 2: Python Data Wrangling & Visualization',
        topics: ['Pandas', 'NumPy', 'Seaborn & Plotly', 'Exploratory Data Analysis'],
        estimatedHours: 55,
      },
      {
        id: 'ds-mod-3',
        title: 'Module 3: Applied Machine Learning Models',
        topics: ['Linear & Logistic Regression', 'Decision Trees & Ensembles', 'Cross-Validation & Metric Tuning'],
        estimatedHours: 65,
      },
    ],
    handsOnProjects: [
      {
        id: 'ds-proj-1',
        title: 'National Healthcare Analytics Dashboard',
        description: 'Analyzing patient readmission trends and bed occupancy optimization using open health datasets.',
        deliverable: 'Live interactive dashboard and statistical insight report.',
      },
    ],
    pricing: {
      tuitionInr: 38000,
      registrationFeeInr: 3500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    nextCohortDate: 'December 2026',
    isApprovedForEnrolment: true,
    regulatoryDisclaimer: 'Professional competency training. Not a degree-granting programme.',
    sharedFoundationsWith: ['ai-development', 'finance-business-operations'],
    ecosystemConnection: {
      brand: 'talentxcel',
      label: 'TalentXcel Analytics Talent Pool',
      url: 'https://careers.talentxcel.in',
      rationale: 'Access verified data analyst job openings and salary benchmarks.',
    },
  },
  {
    id: 'prog-10-web-dev',
    slug: 'web-development-product-engineering',
    familyNumber: 10,
    title: 'Web Development and Product Engineering',
    shortTitle: 'Full-Stack Web Engineering',
    subtitle: 'Next.js App Router, TypeScript, Tailwind CSS, Node.js backends, PostgreSQL, and testing.',
    tagline: 'Engineer complete, production-grade web applications from architecture to deployment.',
    category: 'technology',
    categoryLabel: 'Technology & Future Careers',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 8,
    eligibility: 'Anyone looking to build professional software applications.',
    targetAudience: 'Frontend developers, backend aspirants, and full-stack software engineers.',
    languages: ['English', 'Hinglish'],
    deliveryFormat: 'Code along masterclasses, sandboxed coding challenges, and production staging deploys.',
    prerequisites: ['Basic computer proficiency.'],
    learningOutcomes: [
      'Build reactive, accessible user interfaces with Next.js, React Server Components, and Tailwind CSS.',
      'Develop robust REST and GraphQL APIs with server-side validation and authentication.',
      'Implement database transactions, ACID consistency, and role-based access control.',
      'Deploy applications to edge networks with zero-downtime CI/CD pipelines.',
    ],
    coreModules: [
      {
        id: 'web-mod-1',
        title: 'Module 1: Modern Frontend Architecture',
        topics: ['TypeScript Foundations', 'React App Router', 'Tailwind CSS v4', 'Accessibility & Core Web Vitals'],
        estimatedHours: 55,
      },
      {
        id: 'web-mod-2',
        title: 'Module 2: Serverless Backends & Database Architecture',
        topics: ['Next.js Route Handlers', 'Supabase & Prisma', 'Authentication & JWTs', 'Payment Webhooks'],
        estimatedHours: 60,
      },
    ],
    handsOnProjects: [
      {
        id: 'web-proj-1',
        title: 'Production SaaS Multi-Tenant Platform',
        description: 'Complete SaaS application with auth, Stripe/Razorpay payments, and role-based dashboards.',
        deliverable: 'Live deployed web app on Vercel with passing automated test suite.',
      },
    ],
    pricing: {
      tuitionInr: 40000,
      registrationFeeInr: 3500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Technical skill training and portfolio certification.',
    sharedFoundationsWith: ['ai-development', 'cloud-devops-cybersecurity'],
  },
  {
    id: 'prog-11-cloud-devops',
    slug: 'cloud-devops-cybersecurity',
    familyNumber: 11,
    title: 'Cloud, DevOps and Cybersecurity',
    shortTitle: 'Cloud & Cybersecurity',
    subtitle: 'Cloud infrastructure (AWS/GCP), Docker, Kubernetes, CI/CD pipelines, and defensive security fundamentals.',
    tagline: 'Architect resilient cloud infrastructure and defend critical digital assets.',
    category: 'technology',
    categoryLabel: 'Technology & Future Careers',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 8,
    eligibility: 'IT diploma holders, computer science graduates, and junior systems administrators.',
    targetAudience: 'DevOps engineers, cloud architects, and security analysts.',
    languages: ['English'],
    deliveryFormat: 'Cloud terminal labs, infrastructure-as-code challenges, and penetration test simulations.',
    prerequisites: ['Basic Linux command-line and networking comprehension.'],
    learningOutcomes: [
      'Provision scalable multi-region cloud resources using Terraform and cloud consoles.',
      'Containerize microservices with Docker and orchestrate workloads with Kubernetes.',
      'Implement zero-trust security architecture, TLS certificates, and vulnerability scanners.',
    ],
    coreModules: [
      {
        id: 'cloud-mod-1',
        title: 'Module 1: Linux Systems & Cloud Foundations',
        topics: ['Bash Scripting', 'Virtual Private Clouds (VPC)', 'Identity & Access Management (IAM)', 'S3 & Compute'],
        estimatedHours: 50,
      },
      {
        id: 'cloud-mod-2',
        title: 'Module 2: Containers & Kubernetes Orchestration',
        topics: ['Docker Engine', 'K8s Pods, Deployments & Services', 'Ingress Controllers', 'Helm Charts'],
        estimatedHours: 55,
      },
    ],
    handsOnProjects: [
      {
        id: 'cloud-proj-1',
        title: 'High-Availability Cloud Cluster with Automated CI/CD',
        description: 'Terraform-provisioned Kubernetes cluster with GitHub Actions pipeline and secret management.',
        deliverable: 'Working deployment configuration and security audit report.',
      },
    ],
    pricing: {
      tuitionInr: 42000,
      registrationFeeInr: 3500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Professional training course. Vendor certifications (AWS/CKA) require independent third-party examination.',
    sharedFoundationsWith: ['web-development-product-engineering', 'ai-development'],
  },
  {
    id: 'prog-12-digital-marketing',
    slug: 'digital-marketing-seo',
    familyNumber: 12,
    title: 'Digital Marketing and SEO',
    shortTitle: 'Digital Marketing & SEO',
    subtitle: 'Search optimization, programmatic advertising, content strategy, analytics, and conversion funnels.',
    tagline: 'Master organic search rankings, performance ads, and digital brand acceleration.',
    category: 'technology',
    categoryLabel: 'Technology & Future Careers',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 6,
    eligibility: 'Open to all graduates, business owners, and creative professionals.',
    targetAudience: 'Growth marketers, SEO specialists, social media strategists, and freelancers.',
    languages: ['English', 'Hinglish'],
    deliveryFormat: 'Live campaign audits, keyword research tooling, and ad budget management simulations.',
    prerequisites: ['Basic internet familiarity.'],
    learningOutcomes: [
      'Execute technical and on-page SEO audits to drive high-intent organic search traffic.',
      'Manage profitable paid ad campaigns across Google Ads, Meta Ads, and LinkedIn.',
      'Analyze customer acquisition costs (CAC), return on ad spend (ROAS), and conversion funnels.',
    ],
    coreModules: [
      {
        id: 'dm-mod-1',
        title: 'Module 1: Technical & Content SEO',
        topics: ['Keyword Intent Mapping', 'On-Page Optimization', 'Crawlability & Schema Markup', 'Link Building'],
        estimatedHours: 40,
      },
      {
        id: 'dm-mod-2',
        title: 'Module 2: Performance Marketing & Paid Acquisition',
        topics: ['Google Search Ads', 'Meta Ad Manager', 'Audience Retargeting', 'A/B Testing Copy'],
        estimatedHours: 45,
      },
    ],
    handsOnProjects: [
      {
        id: 'dm-proj-1',
        title: 'Live Brand Growth & Organic Ranking Campaign',
        description: 'Executing an end-to-end SEO and content strategy for a real regional enterprise.',
        deliverable: 'Audit document, ranking improvement report, and ROAS audit.',
      },
    ],
    pricing: {
      tuitionInr: 25000,
      registrationFeeInr: 2000,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: false,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Skill acquisition programme. Does not guarantee specific ranking outcomes or revenue returns.',
    sharedFoundationsWith: ['entrepreneurship-digital-business'],
  },

  // ==========================================
  // C. HEALTHCARE, BUSINESS AND CAREERS
  // ==========================================
  {
    id: 'prog-13-healthcare-tech',
    slug: 'healthcare-tech',
    familyNumber: 13,
    title: 'Healthcare Technology and Administration',
    shortTitle: 'Healthcare Technology',
    subtitle: 'Health informatics, Hospital Information Systems (HIS), electronic medical records, and HL7 FHIR standards.',
    tagline: 'Bridging healthcare delivery with next-generation digital health informatics.',
    category: 'healthcare_business',
    categoryLabel: 'Healthcare, Business & Careers',
    lifecycleStatus: 'open_for_enrolment',
    statusBadge: 'Admissions Open',
    durationMonths: 8,
    eligibility: 'Science graduates, life science alumni, hospital administrative staff, and IT professionals.',
    targetAudience: 'Health informatics specialists, hospital IT managers, and medical records administrators.',
    languages: ['English', 'English with Urdu / Hindi mentoring'],
    deliveryFormat: 'Simulated HIS environment, electronic health records sandbox, and compliance case studies.',
    prerequisites: ['Basic understanding of healthcare workflows or computer applications.'],
    learningOutcomes: [
      'Understand hospital clinical workflows: admissions, discharge, triage, laboratory, and pharmacy.',
      'Configure Electronic Medical Records (EMR/EHR) conforming to NDHM/ABDM guidelines.',
      'Implement healthcare interoperability protocols including HL7 v2 and Fast Healthcare Interoperability Resources (FHIR).',
      'Audit clinical data security, patient privacy (DISHA / HIPAA principles), and hospital billing integrity.',
    ],
    coreModules: [
      {
        id: 'hc-mod-1',
        title: 'Module 1: Hospital Operations & Clinical Workflow Architecture',
        topics: ['Inpatient vs Outpatient Care', 'Emergency Triage', 'Pharmacy & Inventory Systems', 'Medical Billing'],
        estimatedHours: 45,
      },
      {
        id: 'hc-mod-2',
        title: 'Module 2: Electronic Health Records & ABDM Integration',
        topics: ['Ayushman Bharat Digital Mission (ABDM)', 'ABHA Health ID', 'Health Information Exchange', 'Consent Gateways'],
        estimatedHours: 50,
      },
      {
        id: 'hc-mod-3',
        title: 'Module 3: Standards, Interoperability & HL7 FHIR',
        topics: ['HL7 v2 Messaging', 'FHIR Resources & JSON Profiles', 'SNOMED CT & LOINC Coding', 'DICOM Imaging Basics'],
        estimatedHours: 55,
      },
      {
        id: 'hc-mod-4',
        title: 'Module 4: Health Data Privacy, Ethics & Hospital IT Administration',
        topics: ['Patient Data Protection', 'Audit Logs & Role Separation', 'Hospital Network Security', 'Disaster Recovery'],
        estimatedHours: 40,
      },
    ],
    handsOnProjects: [
      {
        id: 'hc-proj-1',
        title: 'Digital Hospital Interoperability Architecture',
        description: 'Modeling a complete ABDM-compliant patient consent flow and FHIR JSON resource mapping.',
        deliverable: 'Verified hospital informatics architecture blueprint and schema validation.',
      },
    ],
    pricing: {
      tuitionInr: 32000,
      registrationFeeInr: 3000,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    nextCohortDate: 'November 2026',
    isApprovedForEnrolment: true,
    regulatoryDisclaimer:
      'Strict Notice: This is a technology and healthcare administrative informatics programme. It does NOT grant clinical qualifications, medical practice rights, or licensure as a healthcare practitioner.',
    sharedFoundationsWith: ['data-science-analytics', 'finance-business-operations'],
    ecosystemConnection: {
      brand: 'talentxcel',
      label: 'TalentXcel Healthcare Tech Opportunities',
      url: 'https://careers.talentxcel.in',
      rationale: 'Connect directly to regional hospital networks seeking verified digital health and EMR coordinators.',
    },
  },
  {
    id: 'prog-14-entrepreneurship-digital',
    slug: 'entrepreneurship-digital-business',
    familyNumber: 14,
    title: 'Entrepreneurship and Digital Business',
    shortTitle: 'Digital Business Launch',
    subtitle: 'Business validation, digital operations, online selling, customer acquisition, and unit economics.',
    tagline: 'From initial business concept to viable digital operations and revenue.',
    category: 'healthcare_business',
    categoryLabel: 'Healthcare, Business & Careers',
    lifecycleStatus: 'pilot',
    statusBadge: 'Pilot Cohort Open',
    durationMonths: 8,
    eligibility: 'Aspiring founders, family business successors, and working professionals.',
    targetAudience: 'Entrepreneurs, startup creators, regional business owners.',
    languages: ['English', 'Hinglish', 'Urdu'],
    deliveryFormat: 'Case study workshops, business model pitch deck coaching, and practical commerce sandbox.',
    prerequisites: ['Drive to build a sustainable business venture.'],
    learningOutcomes: [
      'Validate market demand and product-market fit using minimum viable products (MVPs).',
      'Master digital operations: GST registration, online payments, shipping logistics, and CRM.',
      'Optimize unit economics, customer acquisition costs, and financial break-even projections.',
    ],
    coreModules: [
      {
        id: 'ent-mod-1',
        title: 'Module 1: Market Validation & Business Models',
        topics: ['Problem-Solution Fit', 'Business Model Canvas', 'Competitor Differentiation', 'Customer Interviews'],
        estimatedHours: 40,
      },
      {
        id: 'ent-mod-2',
        title: 'Module 2: Digital Operations & E-Commerce Infrastructure',
        topics: ['Storefront Setup', 'Payment Gateway Integration', 'Logistics & Reverse Logistics', 'WhatsApp Commerce'],
        estimatedHours: 45,
      },
    ],
    handsOnProjects: [
      {
        id: 'ent-proj-1',
        title: 'Venture Launch Blueprint & Live Sales Test',
        description: 'Building and launching a pilot e-commerce store with real payment transactions and customer delivery.',
        deliverable: 'Complete venture business dossier, sales metrics, and customer feedback analysis.',
      },
    ],
    pricing: {
      tuitionInr: 30000,
      registrationFeeInr: 2500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    nextCohortDate: 'January 2027',
    isApprovedForEnrolment: true,
    regulatoryDisclaimer: 'Entrepreneurship education and venture acceleration guidance. Does not guarantee profits or investor funding.',
    sharedFoundationsWith: ['digital-marketing-seo', 'finance-business-operations'],
    ecosystemConnection: {
      brand: 'nuty-tales',
      label: 'Nuty Tales Commerce Sandbox',
      url: 'https://nutytales.com',
      rationale: 'Access real e-commerce catalogs and artisanal supply chains to practice live inventory and digital order handling.',
    },
  },
  {
    id: 'prog-15-finance-ops',
    slug: 'finance-business-operations',
    familyNumber: 15,
    title: 'Finance and Business Operations',
    shortTitle: 'Finance & Business Ops',
    subtitle: 'Financial reporting, advanced spreadsheet modeling, operations analysis, and financial literacy.',
    tagline: 'Master executive spreadsheets, financial statements, and operations analytics.',
    category: 'healthcare_business',
    categoryLabel: 'Healthcare, Business & Careers',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 6,
    eligibility: 'Commerce graduates, accountants, and business administration professionals.',
    targetAudience: 'Financial analysts, business operations managers, and accounting associates.',
    languages: ['English', 'Hinglish'],
    deliveryFormat: 'Spreadsheet simulation labs, financial statement modeling, and cash flow case studies.',
    prerequisites: ['Basic mathematics and understanding of profit and loss.'],
    learningOutcomes: [
      'Construct dynamic financial models with scenario planning, forecasting, and sensitivity analysis.',
      'Dissect P&L statements, balance sheets, and cash flow declarations to guide operational choices.',
      'Automate monthly reconciliations and compliance schedules using modern business tools.',
    ],
    coreModules: [
      {
        id: 'fin-mod-1',
        title: 'Module 1: Advanced Financial Modeling & Excel / Sheets',
        topics: ['XLOOKUP & Index-Match', 'Pivot Tables & Slicers', 'Discounted Cash Flow (DCF)', 'Sensitivity Tables'],
        estimatedHours: 45,
      },
    ],
    handsOnProjects: [
      {
        id: 'fin-proj-1',
        title: 'Three-Statement Financial Model & Valuation Report',
        description: 'Full corporate financial projection model forecasting revenue, CAPEX, and working capital.',
        deliverable: 'Audited dynamic financial spreadsheet model.',
      },
    ],
    pricing: {
      tuitionInr: 24000,
      registrationFeeInr: 2000,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: false,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Financial literacy and operations modeling course. Not a chartered accountancy or SEBI registered qualification.',
    sharedFoundationsWith: ['data-science-analytics', 'entrepreneurship-digital-business'],
  },
  {
    id: 'prog-16-hr-recruitment',
    slug: 'hr-recruitment-technology',
    familyNumber: 16,
    title: 'HR and Recruitment Technology',
    shortTitle: 'HR & Recruitment Tech',
    subtitle: 'Modern talent sourcing, Applicant Tracking Systems (ATS), employer branding, and workforce analytics.',
    tagline: 'Transform talent acquisition with AI sourcing and modern workforce systems.',
    category: 'healthcare_business',
    categoryLabel: 'Healthcare, Business & Careers',
    lifecycleStatus: 'concept',
    statusBadge: 'Concept / Roadmap',
    durationMonths: 6,
    eligibility: 'Graduates, psychology / sociology alumni, and entry-level HR personnel.',
    targetAudience: 'Talent acquisition recruiters, HR generalists, and people operations leads.',
    languages: ['English'],
    deliveryFormat: 'ATS simulation, interview design workshops, and Boolean sourcing bootcamps.',
    prerequisites: ['Strong interpersonal communication and organizational skills.'],
    learningOutcomes: [
      'Source high-calibre candidates using advanced Boolean search and talent platforms.',
      'Configure and operate enterprise ATS workflows with candidate pipeline tracking.',
      'Design structured behavioral and technical interview scorecards to reduce hiring bias.',
    ],
    coreModules: [
      {
        id: 'hr-mod-1',
        title: 'Module 1: Modern Talent Acquisition & Sourcing',
        topics: ['Boolean Search Strings', 'Passive Sourcing Strategies', 'Job Description Optimization', 'Candidate Experience'],
        estimatedHours: 40,
      },
    ],
    handsOnProjects: [
      {
        id: 'hr-proj-1',
        title: 'Enterprise Technical Hiring Playbook',
        description: 'Complete recruitment pipeline design for high-demand software engineering roles.',
        deliverable: 'Candidate sourcing brief, rubrics, and ATS tracking workflow.',
      },
    ],
    pricing: {
      tuitionInr: 22000,
      registrationFeeInr: 2000,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: false,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Professional training course for recruitment and people operations.',
    sharedFoundationsWith: ['communication-employability'],
    ecosystemConnection: {
      brand: 'talentxcel',
      label: 'TalentXcel Recruiter Portal',
      url: 'https://talentxcel.in',
      rationale: 'Learn directly inside TalentXcel’s employer matching workflows.',
    },
  },
  {
    id: 'prog-17-communication-employability',
    slug: 'communication-employability',
    familyNumber: 17,
    title: 'Communication and Employability',
    shortTitle: 'Communication & Employability',
    subtitle: 'Executive spoken English, interview mastery, ATS resume craftsmanship, and professional presence.',
    tagline: 'Speak with authority, interview with confidence, and secure top offers.',
    category: 'healthcare_business',
    categoryLabel: 'Healthcare, Business & Careers',
    lifecycleStatus: 'curriculum_development',
    statusBadge: 'Curriculum in Development',
    durationMonths: 4,
    eligibility: 'Any student, graduate, or professional wanting to boost confidence and interview conversion.',
    targetAudience: 'Job applicants, campus placement candidates, and career shifters.',
    languages: ['English', 'Bilingual mentoring support'],
    deliveryFormat: 'Live speech labs, AI-mock interview practice, and resume design critiques.',
    prerequisites: ['Commitment to daily spoken English practice.'],
    learningOutcomes: [
      'Speak fluent, articulate professional English in meetings, presentations, and interviews.',
      'Craft an ATS-optimized executive resume that converts recruiter views into calls.',
      'Master behavioral interview responses using the STAR methodology (Situation, Task, Action, Result).',
    ],
    coreModules: [
      {
        id: 'comm-mod-1',
        title: 'Module 1: Workplace English & Verbal Articulation',
        topics: ['Pronunciation & Phrasing', 'Business Vocabulary', 'Active Listening', 'Assertive Communication'],
        estimatedHours: 35,
      },
      {
        id: 'comm-mod-2',
        title: 'Module 2: Resume Optimization & Interview Execution',
        topics: ['STAR Response Method', 'Salary Negotiation', 'LinkedIn Optimization', 'Technical Screen Practice'],
        estimatedHours: 35,
      },
    ],
    handsOnProjects: [
      {
        id: 'comm-proj-1',
        title: 'Verified Career Portfolio & Recorded Interview',
        description: 'Complete professional dossier including ATS resume, portfolio site, and video interview recording.',
        deliverable: 'Audited career profile and readiness verification.',
      },
    ],
    pricing: {
      tuitionInr: 16000,
      registrationFeeInr: 1500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: false,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Career acceleration training. Does not guarantee third-party job placement.',
    sharedFoundationsWith: ['digital-foundations-career-acceleration'],
    ecosystemConnection: {
      brand: 'talentxcel',
      label: 'TalentXcel Resume Builder',
      url: 'https://resume.talentxcel.in',
      rationale: 'Build and audit your resume using TalentXcel’s native scoring tool.',
    },
  },
  {
    id: 'prog-18-agritech',
    slug: 'agriculture-agritech',
    familyNumber: 18,
    title: 'Agriculture and AgriTech',
    shortTitle: 'AgriTech & Smart Farming',
    subtitle: 'Precision farming technologies, post-harvest supply chains, cold-storage monitoring, and digital agribusiness.',
    tagline: 'Empowering Himalayan and rural agriculture with smart digital technologies.',
    category: 'healthcare_business',
    categoryLabel: 'Healthcare, Business & Careers',
    lifecycleStatus: 'concept',
    statusBadge: 'Concept / Roadmap',
    durationMonths: 6,
    eligibility: 'Growers, horticulture graduates, and agricultural entrepreneurs.',
    targetAudience: 'Orchard managers, agricultural cooperative leaders, and cold chain operators.',
    languages: ['English', 'Urdu', 'Kashmiri regional support'],
    deliveryFormat: 'Field case studies, IoT sensor monitoring simulations, and export compliance guides.',
    prerequisites: ['Interest in agricultural systems and regional produce.'],
    learningOutcomes: [
      'Deploy precision soil moisture and climate sensors to optimize crop yield and water usage.',
      'Manage modern cold-storage atmosphere monitoring to eliminate post-harvest spoilage.',
      'Organize digital supply chains and geographical indication (GI) tag verification for apple and saffron exports.',
    ],
    coreModules: [
      {
        id: 'agri-mod-1',
        title: 'Module 1: Smart Horticulture & Cold-Chain Technology',
        topics: ['IoT Sensor Deployment', 'Controlled Atmosphere (CA) Storage', 'Quality Grading & Sorting', 'Export Standards'],
        estimatedHours: 40,
      },
    ],
    handsOnProjects: [
      {
        id: 'agri-proj-1',
        title: 'Himalayan Orchard Quality & Cold-Chain Plan',
        description: 'Designing an IoT-monitored harvest and distribution pipeline for organic Kashmiri produce.',
        deliverable: 'Smart agribusiness implementation blueprint.',
      },
    ],
    pricing: {
      tuitionInr: 22000,
      registrationFeeInr: 2000,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: false,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'AgriTech vocational and technological education. Not an ICAR affiliated agricultural degree.',
    sharedFoundationsWith: ['entrepreneurship-digital-business'],
    ecosystemConnection: {
      brand: 'nuty-tales',
      label: 'Nuty Tales Himalayan Supply Chain',
      url: 'https://nutytales.com',
      rationale: 'Study genuine farm-to-table organic packaging and GI-tagged dry fruit quality control.',
    },
  },
  {
    id: 'prog-19-freelancing',
    slug: 'entrepreneurship-freelancing',
    familyNumber: 19,
    title: 'Entrepreneurship and Freelancing',
    shortTitle: 'Freelancing & Client Growth',
    subtitle: 'Portfolio development, global client acquisition, proposal writing, contract negotiation, and remote delivery.',
    tagline: 'Monetize digital skills independently and build a self-sustaining freelance practice.',
    category: 'healthcare_business',
    categoryLabel: 'Healthcare, Business & Careers',
    lifecycleStatus: 'concept',
    statusBadge: 'Concept / Roadmap',
    durationMonths: 4,
    eligibility: 'Anyone with an existing technical, creative, or administrative skill.',
    targetAudience: 'Independent consultants, freelance coders, designers, and content specialists.',
    languages: ['English', 'Hinglish'],
    deliveryFormat: 'Live client proposal pitch workshops, portfolio reviews, and contract templates.',
    prerequisites: ['At least one marketable digital skill (coding, design, writing, video, marketing).'],
    learningOutcomes: [
      'Structure high-converting client proposals that command premium hourly and milestone rates.',
      'Negotiate independent contracts with clear scope definitions and milestone payment terms.',
      'Build long-term recurring client relationships and manage international cross-border invoices.',
    ],
    coreModules: [
      {
        id: 'fl-mod-1',
        title: 'Module 1: High-Converting Proposals & Client Acquisition',
        topics: ['Upwork & Direct Inbound', 'Proposal Copywriting', 'Pricing Strategy (Value vs Hourly)', 'Contracts & Scope'],
        estimatedHours: 30,
      },
    ],
    handsOnProjects: [
      {
        id: 'fl-proj-1',
        title: 'Live Freelance Showcase & Client Pitch Dossier',
        description: 'Publishing a professional freelance portfolio and submitting 5 tailored proposals to real prospective clients.',
        deliverable: 'Audited freelance profile and proposal portfolio.',
      },
    ],
    pricing: {
      tuitionInr: 18000,
      registrationFeeInr: 1500,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: false,
    },
    isApprovedForEnrolment: false,
    regulatoryDisclaimer: 'Vocational business practice guidance. Does not guarantee client contracts or minimum earnings.',
    sharedFoundationsWith: ['digital-marketing-seo', 'communication-employability'],
  },
  {
    id: 'prog-20-digital-foundations',
    slug: 'digital-foundations-career-acceleration',
    familyNumber: 20,
    title: 'Digital Foundations and Career Acceleration',
    shortTitle: 'Digital Foundations',
    subtitle: 'Computer literacy, cloud productivity tools, AI assistance basics, cyber hygiene, and career confidence.',
    tagline: 'Bridging the digital divide for first-generation computer users and career switchers.',
    category: 'healthcare_business',
    categoryLabel: 'Healthcare, Business & Careers',
    lifecycleStatus: 'pilot',
    statusBadge: 'Pilot Cohort Open',
    durationMonths: 4,
    eligibility: 'Beginners of any age with little or no prior computer experience.',
    targetAudience: 'School leavers, homemakers, senior citizens, and workers transitioning into digital roles.',
    languages: ['English', 'Hindi', 'Urdu regional assistance'],
    deliveryFormat: 'Step-by-step screen walkthroughs, voice-guided exercises, and low-friction practice tasks.',
    prerequisites: ['None. Designed from absolute scratch.'],
    learningOutcomes: [
      'Navigate computers, operating systems, file managers, and cloud drives with complete confidence.',
      'Use modern productivity applications (Docs, Sheets, Slides, Email) for daily business tasks.',
      'Employ modern AI assistants (Super AI / ChatGPT) safely to draft letters, summarize information, and solve tasks.',
      'Protect personal and financial data against online fraud, phishing, and password theft.',
    ],
    coreModules: [
      {
        id: 'df-mod-1',
        title: 'Module 1: Core Computer & Cloud Navigation',
        topics: ['Operating System Navigation', 'Files & Folders', 'Web Browsers & Search', 'Cloud Storage (Google Drive)'],
        estimatedHours: 30,
      },
      {
        id: 'df-mod-2',
        title: 'Module 2: Practical Productivity & Everyday AI',
        topics: ['Word Processing', 'Basic Spreadsheets', 'Email Etiquette', 'Prompting AI Assistants Safely'],
        estimatedHours: 35,
      },
    ],
    handsOnProjects: [
      {
        id: 'df-proj-1',
        title: 'Digital Workplace Productivity Portfolio',
        description: 'Creating a formal business document, a budget spreadsheet, and a cloud presentation.',
        deliverable: 'Verified digital productivity completion portfolio.',
      },
    ],
    pricing: {
      tuitionInr: 12000,
      registrationFeeInr: 1000,
      scholarshipAvailable: true,
      emiAvailable: true,
      includesLaptop: true,
    },
    nextCohortDate: 'Rolling Enrolment',
    isApprovedForEnrolment: true,
    regulatoryDisclaimer: 'Digital literacy and vocational enablement programme.',
    sharedFoundationsWith: ['communication-employability'],
  },
]

/** Helper utilities */
export function getProgrammeBySlug(slug: string): ProgrammeFamily | undefined {
  return PROGRAMME_UNIVERSE.find((p) => p.slug === slug)
}

export function getProgrammesByCategory(category: ProgrammeCategory): ProgrammeFamily[] {
  return PROGRAMME_UNIVERSE.filter((p) => p.category === category)
}

export function getOpenEnrolmentProgrammes(): ProgrammeFamily[] {
  return PROGRAMME_UNIVERSE.filter((p) => p.isApprovedForEnrolment)
}

export function searchProgrammes(query: string): ProgrammeFamily[] {
  const q = query.toLowerCase().trim()
  if (!q) return PROGRAMME_UNIVERSE
  return PROGRAMME_UNIVERSE.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.shortTitle.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.prerequisites.some((pr) => pr.toLowerCase().includes(q)) ||
      p.learningOutcomes.some((lo) => lo.toLowerCase().includes(q))
  )
}
