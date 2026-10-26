import type { CommercialProduct, CommercialOrderSummary, ProductDomain, BillingCycle } from '../types'

/**
 * TALENTXCEL COMMERCIAL PRODUCT CATALOG (DAY-1 REVENUE ARCHITECTURE)
 * Strict Pricing Governance:
 * - Assessment & Intelligence: ₹20, ₹299, ₹499, ₹699, ₹999.
 * - Skill Development: ₹999, ₹1,999, ₹2,999, ₹3,999, ₹4,999 monthly (annual with 17% savings).
 * - Academic Learning: Classes 4–12 from ₹1,999/mo (Class 4) to ₹5,199/mo (Class 12).
 * - Transparent 18% GST calculation on all purchases.
 */

// ============================================================================
// 1. ASSESSMENT & INTELLIGENCE PRODUCTS
// ============================================================================

export const ASSESSMENT_PRODUCTS: CommercialProduct[] = [
  {
    id: 'prod_assess_single',
    slug: 'single-assessment',
    domain: 'assessment',
    title: 'Single Assessment Credit',
    tagline: '1 full-length chapter or diagnostic assessment attempt',
    basePriceRupees: 20,
    billingCycle: 'one_time',
    currency: 'INR',
    taxRatePercent: 18,
    attemptsAllowed: 1,
    validityDays: 7,
    targetAudience: 'Learners wishing to test a specific weak chapter or topic',
    inclusions: [
      '1 full-length assessment attempt',
      'Instant server-authoritative score verification',
      'Step-by-step solution keys & distractor explanations',
      'Weak-topic diagnostic analysis report',
    ],
    features: ['Instant Unlock', '7-Day Validity', 'Server-Graded'],
  },
  {
    id: 'prod_assess_starter',
    slug: 'assessment-pack-starter',
    domain: 'assessment',
    title: 'Assessment Pack — Starter',
    tagline: '5 full-length test attempts across any available school subjects',
    basePriceRupees: 299,
    billingCycle: 'one_time',
    currency: 'INR',
    taxRatePercent: 18,
    attemptsAllowed: 5,
    validityDays: 30,
    targetAudience: 'Classes 4–12 students preparing for periodic chapter tests',
    inclusions: [
      '5 full-length test attempts across all enrolled subjects',
      'Detailed concept-level breakdown for every question',
      'Speed vs Accuracy pacing metrics',
      'Downloadable revision notes for identified gap topics',
    ],
    features: ['5 Attempts', '30-Day Access', 'Pacing Analytics'],
  },
  {
    id: 'prod_assess_plus',
    slug: 'assessment-pack-plus',
    domain: 'assessment',
    title: 'Assessment Pack — Plus',
    tagline: '12 full-length attempts + Analytical Reasoning drill suite',
    basePriceRupees: 499,
    billingCycle: 'one_time',
    currency: 'INR',
    taxRatePercent: 18,
    attemptsAllowed: 12,
    validityDays: 60,
    popular: true,
    badge: 'Most Popular',
    targetAudience: 'Students preparing for unit tests and term examinations',
    inclusions: [
      '12 full-length attempts across school subjects & aptitude drills',
      'Analytical reasoning test sets (logical, numerical, verbal, patterns)',
      'Cross-attempt mastery progression graph',
      'Targeted revision worksheet generation',
    ],
    features: ['12 Attempts', '60-Day Access', 'Aptitude Included', 'Progress Graph'],
  },
  {
    id: 'prod_assess_advanced',
    slug: 'assessment-pack-advanced',
    domain: 'assessment',
    title: 'Assessment Pack — Advanced',
    tagline: '25 full-length attempts with chapter mocks and term simulations',
    basePriceRupees: 699,
    billingCycle: 'one_time',
    currency: 'INR',
    taxRatePercent: 18,
    attemptsAllowed: 25,
    validityDays: 90,
    targetAudience: 'High-performing students striving for 90%+ exam mastery',
    inclusions: [
      '25 full-length test attempts including full syllabus term mocks',
      'Percentile benchmarking against verified cohort standards',
      'Comprehensive error classification (Calculation / Conceptual / Time-out)',
      'Personalised Kaizen reassessment blueprints',
    ],
    features: ['25 Attempts', '90-Day Access', 'Cohort Percentiles', 'Error Diagnostics'],
  },
  {
    id: 'prod_assess_premium',
    slug: 'assessment-pack-premium',
    domain: 'assessment',
    title: 'Assessment Pack — Premium',
    tagline: 'Unlimited test attempts & competitive exam foundation pipeline',
    basePriceRupees: 999,
    billingCycle: 'one_time',
    currency: 'INR',
    taxRatePercent: 18,
    attemptsAllowed: -1, // Unlimited
    validityDays: 365,
    badge: 'Annual Unlimited',
    targetAudience: 'Comprehensive academic year test prep for ambitious students',
    inclusions: [
      'Unlimited assessment attempts for the entire 365-day academic year',
      'All school subjects + Analytical Reasoning + Competitive Foundation (JEE/NEET/Olympiad)',
      'Live AI Performance Assistant & continuous gap tracking',
      'Priority access to all newly published question batches',
    ],
    features: ['Unlimited Attempts', '365-Day Validity', 'All Subjects + Aptitude', 'Competitive Batch'],
  },
]

// ============================================================================
// 2. SKILL DEVELOPMENT PRODUCTS
// ============================================================================

export const SKILL_PRODUCTS: CommercialProduct[] = [
  {
    id: 'prod_skill_foundation_monthly',
    slug: 'skill-foundation-monthly',
    domain: 'skill',
    title: 'Skill Track — Foundation',
    tagline: 'Practical daily living, personal routines & communication confidence',
    basePriceRupees: 999,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    skillLevel: 'foundation',
    targetAudience: 'Classes 4–5 learners building personal routines, communication and daily habits',
    inclusions: [
      'Access to Personal Independence & Communication tracks',
      'Interactive Practical Workshops with clear rubrics & deliverables',
      'Guided daily deliberate practice routines',
      'Digital certificate upon verified practical milestone completion',
    ],
    features: ['2 Foundation Tracks', '4 Practical Projects', 'Guided Rubrics', 'Monthly Billing'],
  },
  {
    id: 'prod_skill_foundation_annual',
    slug: 'skill-foundation-annual',
    domain: 'skill',
    title: 'Skill Track — Foundation (Annual)',
    tagline: 'Full year access with 2 months free (Save ₹1,998)',
    basePriceRupees: 9990,
    billingCycle: 'annual',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 365,
    skillLevel: 'foundation',
    badge: 'Save 17%',
    targetAudience: 'Classes 4–5 learners committed to a year of independent habit building',
    inclusions: [
      'Full 12-month access to Foundation Independence & Communication tracks',
      'All new practical life-skill scenario releases throughout the academic year',
      'Verified digital portfolio building workspace',
    ],
    features: ['12 Months for Price of 10', 'Full Foundation Access', 'Portfolio Workspace'],
  },
  {
    id: 'prod_skill_intermediate_monthly',
    slug: 'skill-intermediate-monthly',
    domain: 'skill',
    title: 'Skill Track — Intermediate',
    tagline: 'Money management, road safety, health habits & critical thinking',
    basePriceRupees: 1999,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    skillLevel: 'intermediate',
    targetAudience: 'Classes 6–7 learners developing real-world independence and financial judgment',
    inclusions: [
      'Access to Money Management (₹) and Safety & Health tracks',
      'Supermarket price comparisons and family emergency readiness guides',
      'Guided scenario decision-making evaluation',
    ],
    features: ['Money & Safety', 'Budget Toolkits', 'Evaluated Scenarios', 'Monthly Billing'],
  },
  {
    id: 'prod_skill_intermediate_annual',
    slug: 'skill-intermediate-annual',
    domain: 'skill',
    title: 'Skill Track — Intermediate (Annual)',
    tagline: 'Full year access with 2 months free (Save ₹3,998)',
    basePriceRupees: 19990,
    billingCycle: 'annual',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 365,
    skillLevel: 'intermediate',
    badge: 'Save 17%',
    targetAudience: 'Classes 6–7 learners building practical decision-making and money management skills',
    inclusions: [
      'Full 12-month access to Intermediate Money & Safety tracks',
      'Portfolio review and verified life-skills badge showcase',
    ],
    features: ['12 Months for Price of 10', 'Money & Safety', 'Portfolio Review'],
  },
  {
    id: 'prod_skill_advanced_monthly',
    slug: 'skill-advanced-monthly',
    domain: 'skill',
    title: 'Skill Track — Advanced',
    tagline: 'Financial planning, team leadership, study independence & civic action',
    basePriceRupees: 2999,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    popular: true,
    badge: 'Recommended',
    skillLevel: 'advanced',
    targetAudience: 'Classes 8–9 students seeking comprehensive real-life independence and leadership',
    inclusions: [
      'Access to all 8 Real-Life Skill tracks (Independence, Communication, Money, Safety, Critical Thinking, Teamwork, Study Skills, Citizenship)',
      'Structured real-world decision-making scenarios and case studies',
      'Written mentor rubric review on submitted practical deliverables',
      'Young Citizens & Community Leadership Portfolio Showcase',
    ],
    features: ['All 8 Tracks Unlocked', 'Mentor Rubric Review', 'Full Portfolio Access', 'Monthly Billing'],
  },
  {
    id: 'prod_skill_advanced_annual',
    slug: 'skill-advanced-annual',
    domain: 'skill',
    title: 'Skill Track — Advanced (Annual)',
    tagline: 'Full year comprehensive mastery with 2 months free (Save ₹5,998)',
    basePriceRupees: 29990,
    billingCycle: 'annual',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 365,
    popular: true,
    badge: 'Save ₹5,998',
    skillLevel: 'advanced',
    targetAudience: 'Students preparing for elite tech internships, hackathons & college admissions',
    inclusions: [
      'Full 12-month access to all 8 Skill Tracks with verified review credentials',
      'Priority project reviews within 48 hours',
      'Verified TalentXcel Skills Portfolio for academic/internship applications',
    ],
    features: ['All 8 Tracks', '12 Months for Price of 10', 'Priority Review', 'Verified Credential'],
  },
  {
    id: 'prod_skill_professional_monthly',
    slug: 'skill-professional-monthly',
    domain: 'skill',
    title: 'Skill Track — Professional',
    tagline: 'Venture creation, cloud workflows & automated microservices',
    basePriceRupees: 3999,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    skillLevel: 'professional',
    targetAudience: 'Senior school and early college builders launching real ventures',
    inclusions: [
      'Enterprise cloud deployment, REST API integrations, and database architecture',
      'Financial modeling, unit economics & pitch deck evaluation',
      'Live code mentor asynchronous office hours',
    ],
    features: ['Production Architecture', 'Venture Finance', 'Async Mentor Support'],
  },
  {
    id: 'prod_skill_intensive_monthly',
    slug: 'skill-intensive-monthly',
    domain: 'skill',
    title: 'Skill Track — Intensive',
    tagline: '1-on-1 milestone reviews, weekly sprints & verified capstone defense',
    basePriceRupees: 4999,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    skillLevel: 'intensive',
    badge: 'Elite Mentorship',
    targetAudience: 'Ambitious builders seeking direct senior educator critique',
    inclusions: [
      'Weekly structured milestone reviews with actionable code/design feedback',
      'Direct capstone project evaluation and endorsement letter',
      'Uncapped access across all assessment & skill tracks',
    ],
    features: ['Weekly 1-on-1 Sprints', 'Capstones Endorsement', 'Full Platform Access'],
  },
]

// ============================================================================
// 3. ACADEMIC LEARNING PRODUCTS (CLASSES 4 THROUGH 12)
// ============================================================================

export const ACADEMIC_PRODUCTS: CommercialProduct[] = [
  {
    id: 'prod_acad_g4',
    slug: 'academic-class-4',
    domain: 'academic',
    title: 'Class 4 Academic Pass',
    tagline: 'Comprehensive NCERT/CBSE syllabus coverage for Class 4',
    basePriceRupees: 1999,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    targetGradeLevel: 4,
    popular: true,
    badge: 'Verified Syllabus',
    targetAudience: 'Grade 4 learners aiming for strong foundational mathematics and science',
    inclusions: [
      'Mathematics: Factors, Multiples, Fractions, Metric Measures, Geometry',
      'Science: Contact vs Non-Contact Forces, Plant Habitats, Clean Water',
      'English & Social Studies: Grammar adverbs, reading comprehension, community geography',
      'Worked step-by-step problem examples and printable revision formula cards',
      'Direct diagnostic chapter test linkage with instant gap recommendations',
    ],
    features: ['All Class 4 Subjects', 'Verified Chapter Lessons', 'Diagnostic Tests', 'Monthly Billing'],
  },
  {
    id: 'prod_acad_g5',
    slug: 'academic-class-5',
    domain: 'academic',
    title: 'Class 5 Academic Pass',
    tagline: 'Primary school graduation curriculum & deep conceptual foundations',
    basePriceRupees: 2399,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    targetGradeLevel: 5,
    targetAudience: 'Grade 5 learners preparing for middle school transitions',
    inclusions: [
      'Complete Class 5 Math, EVS/Science, and Language arts modules',
      'Fractions operations, decimals, perimeter & area formulas',
      'Worked examples with interactive quiz checkpoints',
      'Connected assessment blueprints for every chapter',
    ],
    features: ['All Class 5 Subjects', 'Middle School Prep', 'Diagnostic Tests', 'Monthly Billing'],
  },
  {
    id: 'prod_acad_g6',
    slug: 'academic-class-6',
    domain: 'academic',
    title: 'Class 6 Academic Pass',
    tagline: 'Middle school initiation: Algebra, Integers & Experimental Science',
    basePriceRupees: 2799,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    targetGradeLevel: 6,
    targetAudience: 'Class 6 students building algebraic and scientific thinking',
    inclusions: [
      'Mathematics (Integers, Algebra, Fractions, Ratio & Proportion)',
      'Science (Living Organisms, Light & Shadows, Electricity & Circuits)',
      'Social Science (History, Civics, Geography) & English',
      'Chapter revision notes and server-authoritative mock tests',
    ],
    features: ['All Class 6 Subjects', 'Algebra & Circuits', 'Diagnostic Tests', 'Monthly Billing'],
  },
  {
    id: 'prod_acad_g7',
    slug: 'academic-class-7',
    domain: 'academic',
    title: 'Class 7 Academic Pass',
    tagline: 'Linear equations, Nutrition, Motion & Heat thermodynamics',
    basePriceRupees: 3199,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    targetGradeLevel: 7,
    targetAudience: 'Class 7 students aiming for academic excellence',
    inclusions: [
      'Mathematics (Rational numbers, Practical Geometry, Algebraic expressions)',
      'Science (Heat, Acids/Bases, Respiration, Light & Lenses)',
      'Structured concept breakdowns and step-by-step worked solutions',
      'Periodic unit tests with weak-area remediation',
    ],
    features: ['All Class 7 Subjects', 'Rational Numbers & Heat', 'Diagnostic Tests', 'Monthly Billing'],
  },
  {
    id: 'prod_acad_g8',
    slug: 'academic-class-8',
    domain: 'academic',
    title: 'Class 8 Academic Pass',
    tagline: 'Foundations for High School: Exponents, Sound, Combustion & Force',
    basePriceRupees: 3599,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    targetGradeLevel: 8,
    targetAudience: 'Class 8 students preparing for board-level rigor',
    inclusions: [
      'Mathematics (Linear equations in 1 variable, Quadrilaterals, Mensuration)',
      'Science (Crop Production, Microorganisms, Sound, Chemical Effects of Current)',
      'Worked examples with Olympiad-level extension problems',
      'Server-graded diagnostic tests',
    ],
    features: ['All Class 8 Subjects', 'Mensuration & Physics', 'Diagnostic Tests', 'Monthly Billing'],
  },
  {
    id: 'prod_acad_g9',
    slug: 'academic-class-9',
    domain: 'academic',
    title: 'Class 9 Academic Pass',
    tagline: 'High school rigor: Real Numbers, Coordinate Geometry, Laws of Motion & Atoms',
    basePriceRupees: 3999,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    targetGradeLevel: 9,
    popular: true,
    badge: 'High School Foundation',
    targetAudience: 'Class 9 students building the core foundation for Class 10 Boards',
    inclusions: [
      'Mathematics (Number Systems, Polynomials, Linear Equations, Triangles, Circles)',
      'Science (Matter in Our Surroundings, Cell, Tissues, Motion, Gravitation, Work & Energy)',
      'Comprehensive worked examples and NCERT exemplar problem walkthroughs',
      'Chapter-wise and term-end diagnostic assessment blueprints',
    ],
    features: ['All Class 9 Subjects', 'Motion & Polynomials', 'Exemplar Walkthroughs', 'Monthly Billing'],
  },
  {
    id: 'prod_acad_g10',
    slug: 'academic-class-10',
    domain: 'academic',
    title: 'Class 10 Board Master Pass',
    tagline: 'CBSE & ICSE Board exam preparation with past-paper question models',
    basePriceRupees: 4399,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    targetGradeLevel: 10,
    popular: true,
    badge: 'Board Exam Special',
    targetAudience: 'Class 10 students targeting 95%+ in Secondary School Board Examinations',
    inclusions: [
      'Mathematics (Quadratic Equations, Arithmetic Progressions, Trigonometry, Statistics)',
      'Science (Chemical Reactions, Carbon & Compounds, Life Processes, Electricity, Magnetic Effects)',
      'Social Science, English & Hindi syllabus coverage with board-format answer keys',
      'Simulated board-pattern timed mock examinations with marking scheme solutions',
    ],
    features: ['Complete Class 10 Syllabus', 'Trigonometry & Circuits', 'Board Pattern Mocks', 'Monthly Billing'],
  },
  {
    id: 'prod_acad_g11',
    slug: 'academic-class-11',
    domain: 'academic',
    title: 'Class 11 Academic & Competitive Pass',
    tagline: 'Senior Secondary: Calculus, Kinematics, Chemical Bonding & Bio-molecules',
    basePriceRupees: 4799,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    targetGradeLevel: 11,
    targetAudience: 'Class 11 Science & Commerce students balancing school and competitive foundations',
    inclusions: [
      'Mathematics (Sets, Functions, Trigonometric Functions, Permutations & Combinations, Calculus)',
      'Physics (Kinematics, Laws of Motion, Work Energy Power, Thermodynamics, Oscillations)',
      'Chemistry (Structure of Atom, Periodic Table, Chemical Bonding, Organic Chemistry Basics)',
      'Bridged question blueprints connecting NCERT concepts to JEE/NEET fundamentals',
    ],
    features: ['Physics, Chem, Math, Bio', 'Calculus & Mechanics', 'Competitive Bridges', 'Monthly Billing'],
  },
  {
    id: 'prod_acad_g12',
    slug: 'academic-class-12',
    domain: 'academic',
    title: 'Class 12 Board & Entrance Pass',
    tagline: 'Senior Secondary Boards + CUET/JEE/NEET alignment',
    basePriceRupees: 5199,
    billingCycle: 'monthly',
    currency: 'INR',
    taxRatePercent: 18,
    validityDays: 30,
    targetGradeLevel: 12,
    badge: 'Senior Secondary',
    targetAudience: 'Class 12 students preparing for Board examinations and university admissions',
    inclusions: [
      'Mathematics (Matrices, Determinants, Differential Calculus, Integrals, Probability)',
      'Physics (Electrostatics, Current Electricity, Optics, Modern Physics, Semiconductors)',
      'Chemistry (Solutions, Electrochemistry, Kinetics, d/f-Block, Haloalkanes, Biomolecules)',
      'Timed full-syllabus mock papers with marking scheme evaluation guidelines',
    ],
    features: ['All Class 12 Subjects', 'Full Board Mocks', 'CUET/JEE Prep Alignment', 'Monthly Billing'],
  },
]

// ============================================================================
// 4. UNIFIED ALL-PRODUCTS MAP & PRICE CALCULATION
// ============================================================================

export const ALL_COMMERCIAL_PRODUCTS: Record<string, CommercialProduct> = [
  ...ASSESSMENT_PRODUCTS,
  ...SKILL_PRODUCTS,
  ...ACADEMIC_PRODUCTS,
].reduce((acc, prod) => {
  acc[prod.id] = prod
  return acc
}, {} as Record<string, CommercialProduct>)

/**
 * Server-authoritative calculation of order total and taxes
 * Discloses transparent 18% GST breakdown before purchase.
 */
export function calculateCommercialOrderSummary(
  productId: string,
  couponCode?: string
): CommercialOrderSummary {
  const product = ALL_COMMERCIAL_PRODUCTS[productId]
  if (!product) {
    throw new Error(`Invalid or unrecognized product ID: ${productId}`)
  }

  const basePrice = product.basePriceRupees
  let discount = 0

  // Valid promo discount logic (transparent & verified)
  if (couponCode && couponCode.trim().toUpperCase() === 'FIRST10') {
    discount = Math.round(basePrice * 0.1) // 10% discount on first purchase
  }

  const taxableAmount = Math.max(0, basePrice - discount)
  // 18% GST calculation (9% CGST + 9% SGST)
  const gstAmount = Math.round((taxableAmount * product.taxRatePercent) / 100)
  const totalPayableRupees = taxableAmount + gstAmount
  const totalPayablePaise = totalPayableRupees * 100

  return {
    productId: product.id,
    title: product.title,
    domain: product.domain,
    basePriceRupees: basePrice,
    billingCycle: product.billingCycle,
    discountRupees: discount,
    taxableAmountRupees: taxableAmount,
    gstAmountRupees: gstAmount,
    totalPayableRupees: totalPayableRupees,
    totalPayablePaise: totalPayablePaise,
    currency: 'INR',
  }
}
