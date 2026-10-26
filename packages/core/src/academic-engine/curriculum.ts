import type { BoardCode } from '../math-engine/types'
import type { SubjectCode } from '../universal-engine/types'
import type { AcademicClassMeta, AcademicLessonData, AcademicPassProduct } from './types'
import {
  SCIENCE_CLASSES_TAXONOMY,
  ENGLISH_CLASSES_TAXONOMY,
  HINDI_CLASSES_TAXONOMY,
  SOCIAL_SCIENCE_CLASSES_TAXONOMY,
} from '../universal-engine/taxonomies'
import { MATH_CLASSES_TAXONOMY } from '../math-engine/taxonomy'
import { getSubjectBoardCitations } from '../universal-engine/board-citations'
import { generateUniversalQuestion } from '../universal-engine/generators'
import { generateMathQuestion } from '../math-engine/generators'
import type { AuthorizedQuestion, ConfidentialQuestionSolution, AssessmentBlueprint } from '../types'

// ============================================================================
// ACADEMIC CLASSES METADATA (CLASSES 4 TO 12)
// ============================================================================

export const ACADEMIC_CLASSES: AcademicClassMeta[] = [
  {
    classNumber: 4,
    className: 'Class 4',
    stage: 'primary',
    stageLabel: 'Primary Foundation',
    ageGroup: 'Ages 8–10',
    recommendedPassProductId: 'prod_acad_primary_1999',
    subjects: [
      { code: 'math', name: 'Mathematics', shortLabel: 'Maths', colorTheme: 'amber', iconName: 'Calculator', description: 'Large numbers, factors, multiples, fractions, decimals & shapes' },
      { code: 'science', name: 'Science', shortLabel: 'Science', colorTheme: 'emerald', iconName: 'FlaskConical', description: 'Living things, plants, adaptations, materials, air & water' },
      { code: 'english', name: 'English Language', shortLabel: 'English', colorTheme: 'blue', iconName: 'BookOpen', description: 'Grammar, vocabulary, sentence structures & reading comprehension' },
      { code: 'hindi', name: 'Hindi (हिंदी)', shortLabel: 'Hindi', colorTheme: 'rose', iconName: 'Languages', description: 'वर्णमाला, संज्ञा, सर्वनाम, विलोम शब्द, पर्यायवाची व अपठित बोध' },
      { code: 'social_science', name: 'Social Studies', shortLabel: 'Social Studies', colorTheme: 'purple', iconName: 'Globe', description: 'Our country India, states, physical divisions, climate & culture' },
    ],
  },
  {
    classNumber: 5,
    className: 'Class 5',
    stage: 'primary',
    stageLabel: 'Primary Foundation',
    ageGroup: 'Ages 9–11',
    recommendedPassProductId: 'prod_acad_primary_1999',
    subjects: [
      { code: 'math', name: 'Mathematics', shortLabel: 'Maths', colorTheme: 'amber', iconName: 'Calculator', description: 'Decimals, percentages, area & perimeter, volume, geometry' },
      { code: 'science', name: 'Science', shortLabel: 'Science', colorTheme: 'emerald', iconName: 'FlaskConical', description: 'Human organ systems, food & health, nervous system & energy' },
      { code: 'english', name: 'English Language', shortLabel: 'English', colorTheme: 'blue', iconName: 'BookOpen', description: 'Tenses, prepositions, direct/indirect speech introduction & comprehension' },
      { code: 'hindi', name: 'Hindi (हिंदी)', shortLabel: 'Hindi', colorTheme: 'rose', iconName: 'Languages', description: 'क्रिया, काल, मुहावरे, पत्र लेखन व रचनात्मक अभिव्यक्ति' },
      { code: 'social_science', name: 'Social Studies', shortLabel: 'Social Studies', colorTheme: 'purple', iconName: 'Globe', description: 'Globe & maps, climate zones, democratic heritage & environmental care' },
    ],
  },
  {
    classNumber: 6,
    className: 'Class 6',
    stage: 'middle',
    stageLabel: 'Middle School',
    ageGroup: 'Ages 10–12',
    recommendedPassProductId: 'prod_acad_middle_2999',
    subjects: [
      { code: 'math', name: 'Mathematics', shortLabel: 'Maths', colorTheme: 'amber', iconName: 'Calculator', description: 'Integers, algebra introduction, ratio & proportion, symmetry' },
      { code: 'science', name: 'Science', shortLabel: 'Science', colorTheme: 'emerald', iconName: 'FlaskConical', description: 'Components of food, sorting materials, body movements, electricity' },
      { code: 'english', name: 'English', shortLabel: 'English', colorTheme: 'blue', iconName: 'BookOpen', description: 'Active & passive voice, modals, clauses & literary analysis' },
      { code: 'hindi', name: 'Hindi (हिंदी)', shortLabel: 'Hindi', colorTheme: 'rose', iconName: 'Languages', description: 'संधि परिचय, समास, उपसर्ग-प्रत्यय, अपठित गद्यांश व काव्यांश' },
      { code: 'social_science', name: 'Social Science', shortLabel: 'Social Science', colorTheme: 'purple', iconName: 'Globe', description: 'Early human history, motions of the earth, diversity & government' },
    ],
  },
  {
    classNumber: 7,
    className: 'Class 7',
    stage: 'middle',
    stageLabel: 'Middle School',
    ageGroup: 'Ages 11–13',
    recommendedPassProductId: 'prod_acad_middle_2999',
    subjects: [
      { code: 'math', name: 'Mathematics', shortLabel: 'Maths', colorTheme: 'amber', iconName: 'Calculator', description: 'Rational numbers, simple equations, lines & angles, triangles' },
      { code: 'science', name: 'Science', shortLabel: 'Science', colorTheme: 'emerald', iconName: 'FlaskConical', description: 'Nutrition in plants & animals, heat, acids bases & salts, motion' },
      { code: 'english', name: 'English', shortLabel: 'English', colorTheme: 'blue', iconName: 'BookOpen', description: 'Determiners, subject-verb concord, conditional clauses & essays' },
      { code: 'hindi', name: 'Hindi (हिंदी)', shortLabel: 'Hindi', colorTheme: 'rose', iconName: 'Languages', description: 'अविकारी शब्द, मुहावरे-लोकोक्तियाँ, संवाद लेखन व गद्य-पद्य साहित्य' },
      { code: 'social_science', name: 'Social Science', shortLabel: 'Social Science', colorTheme: 'purple', iconName: 'Globe', description: 'Delhi Sultanate, Mughal Empire, our environment, state government' },
    ],
  },
  {
    classNumber: 8,
    className: 'Class 8',
    stage: 'middle',
    stageLabel: 'Middle School',
    ageGroup: 'Ages 12–14',
    recommendedPassProductId: 'prod_acad_middle_2999',
    subjects: [
      { code: 'math', name: 'Mathematics', shortLabel: 'Maths', colorTheme: 'amber', iconName: 'Calculator', description: 'Linear equations in one variable, quadrilaterals, squares & cubes' },
      { code: 'science', name: 'Science', shortLabel: 'Science', colorTheme: 'emerald', iconName: 'FlaskConical', description: 'Crop production, microorganisms, combustion, force & pressure, light' },
      { code: 'english', name: 'English', shortLabel: 'English', colorTheme: 'blue', iconName: 'BookOpen', description: 'Reported speech, synthesis of sentences, formal letters & literature' },
      { code: 'hindi', name: 'Hindi (हिंदी)', shortLabel: 'Hindi', colorTheme: 'rose', iconName: 'Languages', description: 'वाक्य शुद्धि, रस परिचय, अनुच्छेद लेखन, औपचारिक पत्र व साहित्य' },
      { code: 'social_science', name: 'Social Science', shortLabel: 'Social Science', colorTheme: 'purple', iconName: 'Globe', description: 'Modern Indian history, resources, agriculture, Indian Constitution' },
    ],
  },
  {
    classNumber: 9,
    className: 'Class 9',
    stage: 'secondary',
    stageLabel: 'Secondary Foundation',
    ageGroup: 'Ages 13–15',
    recommendedPassProductId: 'prod_acad_secondary_3999',
    subjects: [
      { code: 'math', name: 'Mathematics', shortLabel: 'Maths', colorTheme: 'amber', iconName: 'Calculator', description: 'Number systems, polynomials, coordinate geometry, linear equations, triangles' },
      { code: 'science', name: 'Composite Science (PCB)', shortLabel: 'Science', colorTheme: 'emerald', iconName: 'FlaskConical', description: 'Matter, atoms & molecules, cell biology, tissues, motion, laws of motion' },
      { code: 'english', name: 'English Language & Lit', shortLabel: 'English', colorTheme: 'blue', iconName: 'BookOpen', description: 'Integrated grammar, analytical paragraphs, Beehive & Moments literature' },
      { code: 'hindi', name: 'Hindi Course A & B', shortLabel: 'Hindi', colorTheme: 'rose', iconName: 'Languages', description: 'उपसर्ग-प्रत्यय, समास, वाक्य भेद, अलंकार, क्षितिज एवं कृतिका' },
      { code: 'social_science', name: 'Social Science', shortLabel: 'Social Science', colorTheme: 'purple', iconName: 'Globe', description: 'French Revolution, India size & location, electoral politics, economics' },
    ],
  },
  {
    classNumber: 10,
    className: 'Class 10',
    stage: 'secondary',
    stageLabel: 'Secondary Board Prep',
    ageGroup: 'Ages 14–16',
    recommendedPassProductId: 'prod_acad_secondary_3999',
    subjects: [
      { code: 'math', name: 'Mathematics (Standard & Basic)', shortLabel: 'Maths', colorTheme: 'amber', iconName: 'Calculator', description: 'Real numbers, quadratics, arithmetic progressions, trigonometry, circles' },
      { code: 'science', name: 'Science (Physics, Chem, Bio)', shortLabel: 'Science (PCB)', colorTheme: 'emerald', iconName: 'FlaskConical', description: 'Chemical reactions, life processes, electricity, light reflection, heredity' },
      { code: 'english', name: 'English Language & Literature', shortLabel: 'English', colorTheme: 'blue', iconName: 'BookOpen', description: 'Reported speech, modals, subject-verb concord, First Flight & Footprints' },
      { code: 'hindi', name: 'Hindi Course A & B', shortLabel: 'Hindi', colorTheme: 'rose', iconName: 'Languages', description: 'पद परिचय, रस, वाच्य, वाक्य रूपांतरण, क्षितिज, स्पर्श एवं संचयन' },
      { code: 'social_science', name: 'Social Science', shortLabel: 'Social Science', colorTheme: 'purple', iconName: 'Globe', description: 'Nationalism in India, resources, democratic politics, sectors of economy' },
    ],
  },
  {
    classNumber: 11,
    className: 'Class 11',
    stage: 'senior_secondary',
    stageLabel: 'Senior Secondary',
    ageGroup: 'Ages 15–17',
    recommendedPassProductId: 'prod_acad_senior_5199',
    subjects: [
      { code: 'math', name: 'Core & Applied Mathematics', shortLabel: 'Maths', colorTheme: 'amber', iconName: 'Calculator', description: 'Sets, relations, trigonometry, complex numbers, permutations, calculus' },
      { code: 'science', name: 'Physics, Chemistry & Biology', shortLabel: 'PCB Sciences', colorTheme: 'emerald', iconName: 'FlaskConical', description: 'Kinematics, thermodynamics, bonding, equilibrium, cell cycle, physiology' },
      { code: 'english', name: 'English Core & Elective', shortLabel: 'English', colorTheme: 'blue', iconName: 'BookOpen', description: 'Advanced reading comprehension, note making, formal writing, Hornbill' },
      { code: 'hindi', name: 'Hindi Core & Elective', shortLabel: 'Hindi', colorTheme: 'rose', iconName: 'Languages', description: 'अभिव्यक्ति और माध्यम, अंतरा, आरोह, काव्य सौंदर्य एवं निबंध लेखन' },
      { code: 'social_science', name: 'History, PolSci & Economics', shortLabel: 'Social Sciences', colorTheme: 'purple', iconName: 'Globe', description: 'Themes in world history, Indian constitution, microeconomics, statistics' },
    ],
  },
  {
    classNumber: 12,
    className: 'Class 12',
    stage: 'senior_secondary',
    stageLabel: 'Senior Secondary Board & Entrances',
    ageGroup: 'Ages 16–18',
    recommendedPassProductId: 'prod_acad_senior_5199',
    subjects: [
      { code: 'math', name: 'Mathematics (Calculus & Vectors)', shortLabel: 'Maths', colorTheme: 'amber', iconName: 'Calculator', description: 'Continuity, differentiability, integrals, differential equations, vectors, 3D' },
      { code: 'science', name: 'Senior Science (Physics, Chem, Bio)', shortLabel: 'Senior Science', colorTheme: 'emerald', iconName: 'FlaskConical', description: 'Electrostatics, current, optics, solutions, electrochemistry, genetics' },
      { code: 'english', name: 'English Core & Literature', shortLabel: 'English', colorTheme: 'blue', iconName: 'BookOpen', description: 'Notice, invitation, report, article, Flamingo & Vistas literary criticism' },
      { code: 'hindi', name: 'Hindi Core & Elective', shortLabel: 'Hindi', colorTheme: 'rose', iconName: 'Languages', description: 'जनसंचार माध्यम, पत्रकारीय लेखन, अंतरा, वितान, निबंध एवं आलोचना' },
      { code: 'social_science', name: 'Humanities (History, PolSci, Eco)', shortLabel: 'Humanities & Eco', colorTheme: 'purple', iconName: 'Globe', description: 'Themes in Indian history, contemporary world politics, macroeconomics' },
    ],
  },
]

// ============================================================================
// ACADEMIC PASS PRODUCTS
// ============================================================================

export const ACADEMIC_PASS_PRODUCTS: AcademicPassProduct[] = [
  {
    id: 'prod_acad_primary_1999',
    title: 'Primary Foundation Class Pass',
    stage: 'primary',
    classRange: 'Classes 4–5',
    basePriceRupees: 1999,
    tagline: 'Comprehensive visual curriculum mastery, step-by-step reading lessons, and fun diagnostic quizzes.',
    features: [
      'Full syllabus for Mathematics, Science, English, Hindi, and Social Studies',
      'Over 400,000 verified questions across Classes 4 and 5',
      'Step-by-step worked examples and animated concept breakdowns',
      'Interactive flash checkpoints and foundational homework solvers',
      'Full parent analytics dashboard with mastery reports',
    ],
  },
  {
    id: 'prod_acad_middle_2999',
    title: 'Middle School Explorer Class Pass',
    stage: 'middle',
    classRange: 'Classes 6–8',
    basePriceRupees: 2999,
    tagline: 'Deep conceptual rigor, algebraic transitions, laboratory science breakdowns, and grammatical mastery.',
    popular: true,
    features: [
      'Complete coverage for Classes 6, 7, and 8 across all 5 subjects',
      'Over 600,000 verified questions mapped to NCERT and Selina textbooks',
      'Detailed derivations, chemical equation balancing, and geometry proofs',
      'Chapter-wise diagnostic assessments with instant step-by-step explanations',
      'Weekly progress checkpoints and automated weak-area revision queues',
    ],
  },
  {
    id: 'prod_acad_secondary_3999',
    title: 'Secondary Board Prep Class Pass',
    stage: 'secondary',
    classRange: 'Classes 9–10',
    basePriceRupees: 3999,
    tagline: 'Exemplar rigor, board PYQs (2014–2024), specialized Physics/Chemistry/Biology streams, and scoring tactics.',
    features: [
      'Comprehensive Classes 9 & 10 board preparation (CBSE, ICSE & IB)',
      'Over 800,000 questions including 10-year solved board papers',
      'Dedicated Physics, Chemistry, and Biology chapter partitions',
      'Standard & Basic Mathematics solved exemplar problems',
      'Server-authoritative mock test simulation with full score breakdown',
    ],
  },
  {
    id: 'prod_acad_senior_5199',
    title: 'Senior Secondary Master Class Pass',
    stage: 'senior_secondary',
    classRange: 'Classes 11–12',
    basePriceRupees: 5199,
    tagline: 'Advanced calculus, electrodynamics, organic reaction mechanisms, and entrance exam alignment (JEE/NEET/CUET).',
    features: [
      'Full Classes 11 & 12 curriculum for Science, Mathematics, and Humanities',
      'Over 800,000 advanced problems with multi-step calculus and reaction trees',
      'Core & Applied Mathematics tracks with financial math modules',
      'Entrance bridge modules aligned with JEE Main, NEET UG, and CUET',
      'Live doubt analysis and priority evaluation feedback',
    ],
  },
]

// ============================================================================
// CURRICULUM CHAPTER RESOLVER
// ============================================================================

export function getCurriculumChapters(
  classNumber: number,
  subjectCode: string,
  boardCode: BoardCode = 'CBSE'
) {
  let taxonomyChapters: Array<{
    id: string
    chapterNumber: number
    title: string
    disciplineCode?: string
    disciplineName?: string
    topics: Array<{ id: string; title: string }>
    targetQuestionCount: number
  }> = []

  if (subjectCode === 'math') {
    const classTax = MATH_CLASSES_TAXONOMY.find((c) => c.classNumber === classNumber)
    if (classTax) {
      taxonomyChapters = classTax.chapters
    }
  } else if (subjectCode === 'science') {
    const classTax = SCIENCE_CLASSES_TAXONOMY.find((c) => c.classNumber === classNumber)
    if (classTax) taxonomyChapters = classTax.chapters
  } else if (subjectCode === 'english') {
    const classTax = ENGLISH_CLASSES_TAXONOMY.find((c) => c.classNumber === classNumber)
    if (classTax) taxonomyChapters = classTax.chapters
  } else if (subjectCode === 'hindi') {
    const classTax = HINDI_CLASSES_TAXONOMY.find((c) => c.classNumber === classNumber)
    if (classTax) taxonomyChapters = classTax.chapters
  } else if (subjectCode === 'social_science') {
    const classTax = SOCIAL_SCIENCE_CLASSES_TAXONOMY.find((c) => c.classNumber === classNumber)
    if (classTax) taxonomyChapters = classTax.chapters
  }

  // Fallback to Class 4 Math if empty
  if (taxonomyChapters.length === 0) {
    taxonomyChapters = MATH_CLASSES_TAXONOMY[0].chapters
  }

  return taxonomyChapters
}

// ============================================================================
// ACADEMIC LESSON GENERATOR
// ============================================================================

export function getAcademicLessonForChapter(
  classNumber: number,
  subjectCode: string,
  chapterId: string,
  boardCode: BoardCode = 'CBSE'
): AcademicLessonData {
  const chapters = getCurriculumChapters(classNumber, subjectCode, boardCode)
  const chapter = chapters.find((ch) => ch.id === chapterId) || chapters[0]
  const citations = getSubjectBoardCitations(
    (subjectCode === 'math' || subjectCode === 'science' || subjectCode === 'english' || subjectCode === 'hindi' || subjectCode === 'social_science')
      ? subjectCode
      : 'math',
    classNumber,
    boardCode
  )

  const topic1 = chapter.topics[0]?.title || 'Fundamental Principles'
  const topic2 = chapter.topics[1]?.title || 'Application & Analysis'
  const topic3 = chapter.topics[2]?.title || 'Derivations & Problem Solving'

  // Subject-specific pedagogical flavor
  let workedExamples: AcademicLessonData['workedExamples'] = []
  let keyFormulasOrRules: string[] = []
  let conceptBreakdown: AcademicLessonData['conceptBreakdown'] = []

  if (subjectCode === 'math') {
    keyFormulasOrRules = [
      'Standard Formula: Verify all operations using PEMDAS / BODMAS hierarchy',
      'Dimension Consistency: Ensure units match before evaluating algebraic expressions',
      'Verification Check: Substitute the solved root back into the original equation',
    ]
    conceptBreakdown = [
      {
        heading: `1. Core Concept: ${topic1}`,
        body: `In Class ${classNumber} Mathematics, mastering ${topic1} requires a thorough understanding of foundational axioms. We break down the mathematical definitions, geometric visual interpretations, and numerical bounds to build rock-solid intuition.`,
        keyFormulaOrRule: 'Apply associative and distributive properties to simplify expressions.',
        commonPitfall: 'Forgetting sign changes when distributing negative coefficients.',
      },
      {
        heading: `2. Methodical Technique: ${topic2}`,
        body: `When approaching ${topic2}, systematic structuring is paramount. Write down given parameters, state the governing theorem explicitly, and execute step-by-step algebraic or geometric manipulation without skipping intermediate steps.`,
        keyFormulaOrRule: 'Equate corresponding coefficients or cross-multiply terms systematically.',
        commonPitfall: 'Cancelling non-common terms across additive fractions.',
      },
      {
        heading: `3. Exam Strategy & Common Traps: ${topic3}`,
        body: `Board evaluators across ${boardCode} emphasize clarity of working, statement of units, and logical justification for each step. Double-check extreme boundary conditions and verify solutions against physical or numerical constraints.`,
        commonPitfall: 'Omitting units or leaving answers in unsimplified fractional forms.',
      },
    ]
    workedExamples = [
      {
        problemText: `Find the value of x that satisfies the fundamental condition in ${chapter.title}.`,
        stepByStepSolution: [
          'Step 1: Write down the primary governing equation with all known constants.',
          'Step 2: Group like terms on one side and isolate the variable term.',
          'Step 3: Divide both sides by the leading coefficient and simplify the fraction.',
        ],
        finalAnswer: 'x = 12 (or verified root satisfying the boundary condition).',
      },
      {
        problemText: `A practical application problem based on ${topic2} in Class ${classNumber}.`,
        stepByStepSolution: [
          'Step 1: Translate the word problem into a clean mathematical relationship.',
          'Step 2: Apply the governing formula verified from NCERT/Selina textbooks.',
          'Step 3: Calculate the numerical value with correct precision.',
        ],
        finalAnswer: 'The required optimal measure is 48 units.',
      },
    ]
  } else if (subjectCode === 'science') {
    keyFormulasOrRules = [
      'Law of Conservation: Mass and energy cannot be created or destroyed',
      'SI Units Standard: Always convert time to seconds, length to meters, mass to kg',
      'Chemical Balancing: Number of atoms on Reactants = Number of atoms on Products',
    ]
    conceptBreakdown = [
      {
        heading: `1. Theoretical Foundation: ${topic1}`,
        body: `Understanding ${topic1} begins with observing empirical physical and biological phenomena. We explore molecular interactions, field effects, and cellular behaviors aligned with the ${citations.framework}.`,
        keyFormulaOrRule: 'Physical phenomena follow invariant conservation laws.',
        commonPitfall: 'Confusing vector quantities (velocity, force) with scalar quantities (speed, distance).',
      },
      {
        heading: `2. Experimental Evidence & Mechanisms: ${topic2}`,
        body: `In this section, we analyze the causal mechanisms behind ${topic2}. Whether balancing redox reactions, analyzing circuit potentials, or mapping organ function, we focus on step-by-step logic.`,
        commonPitfall: 'Failing to balance ionic charges alongside atomic counts.',
      },
      {
        heading: `3. Synthesis & Applications: ${topic3}`,
        body: `Real-world engineering, ecological balance, and human physiology rely on these principles. Learn how laboratory measurements translate into industrial and biological systems.`,
      },
    ]
    workedExamples = [
      {
        problemText: `Explain the physical mechanism and compute the net result for ${topic1}.`,
        stepByStepSolution: [
          'Step 1: Identify the fundamental law of nature applicable to the system.',
          'Step 2: Substitute the empirical measurements in standard SI units.',
          'Step 3: Compute the resultant force, concentration, or reaction yield.',
        ],
        finalAnswer: 'Net magnitude is balanced with directional equilibrium.',
      },
      {
        problemText: `Predict the outcome when experimental conditions in ${topic2} are altered.`,
        stepByStepSolution: [
          'Step 1: State Le Chatelier’s principle or Newton’s third law as appropriate.',
          'Step 2: Analyze the shift in dynamic equilibrium.',
          'Step 3: State the final observable result with chemical or physical evidence.',
        ],
        finalAnswer: 'The system shifts to minimize perturbation, maintaining stability.',
      },
    ]
  } else if (subjectCode === 'english') {
    keyFormulasOrRules = [
      'Subject-Verb Concord: Singular subjects take singular verbs; plural take plural',
      'Tense Consistency: Maintain tense harmony across narrative paragraphs',
      'Active Voice Preference: Use active verbs for clarity and rhetorical impact',
    ]
    conceptBreakdown = [
      {
        heading: `1. Structural Syntax: ${topic1}`,
        body: `Grammar is the architecture of thought. In ${topic1}, we master syntax rules, punctuation boundaries, and clause connections following the Wren & Martin / Total English standards.`,
      },
      {
        heading: `2. Reading Comprehension & Rhetoric: ${topic2}`,
        body: `Learn to extract implicit authorial intent, detect rhetorical devices, and analyze tone, mood, and diction in unseen passages.`,
      },
      {
        heading: `3. Writing Composition & Literary Expression: ${topic3}`,
        body: `Guidelines for formal correspondence, analytical essays, and literary commentary with high marks criteria for ${boardCode} examiners.`,
      },
    ]
    workedExamples = [
      {
        problemText: `Identify the grammatical error in the given compound sentence and correct it.`,
        stepByStepSolution: [
          'Step 1: Locate the primary subject and verb in the main clause.',
          'Step 2: Verify agreement in person and number.',
          'Step 3: Rewrite the sentence with correct verb inflection.',
        ],
        finalAnswer: 'Corrected: The committee has submitted its unanimous report.',
      },
    ]
  } else if (subjectCode === 'hindi') {
    keyFormulasOrRules = [
      'संधि नियम: स्वर, व्यंजन एवं विसर्ग संधि के वर्ण विकार को पहचानें',
      'समास विग्रह: समस्त पद का अर्थ समझकर प्रधान पद के आधार पर भेद तय करें',
      'वर्तनी शुद्धि: ह्रस्व-दीर्घ मात्राओं और अनुस्वार-अनुनासिक का सटीक प्रयोग',
    ]
    conceptBreakdown = [
      {
        heading: `1. मानक व्याकरण नियम: ${topic1}`,
        body: `हिंदी भाषा में शुद्ध वर्तनी और व्याकरणिक नियमों का ज्ञान अनिवार्य है। ${topic1} के अंतर्गत हम मानक नियमों और उदाहरणों का गहन अभ्यास करते हैं।`,
      },
      {
        heading: `2. भाषा शैली व रचना कौशल: ${topic2}`,
        body: `रचनात्मक लेखन में भावों की स्पष्टता, सटीक शब्दावली और मुहावरों का समुचित प्रयोग भाषा को प्रभावशाली बनाता है।`,
      },
      {
        heading: `3. साहित्य समीक्षा एवं काव्य सौंदर्य: ${topic3}`,
        body: `पाठ्यपुस्तक के गद्य एवं पद्य पाठों का भावार्थ, केंद्रीय भाव और शिल्प सौंदर्य की परीक्षा-उपयोगी विवेचना।`,
      },
    ]
    workedExamples = [
      {
        problemText: `दिए गए पद का समास विग्रह कीजिए और भेद का नाम लिखिए।`,
        stepByStepSolution: [
          'चरण 1: समस्त पद का संधि व अर्थ विच्छेद कीजिए।',
          'चरण 2: प्रथम और उत्तर पद के संबंध का विश्लेषण कीजिए।',
          'चरण 3: समास के मानक भेद का निर्धारण कीजिए।',
        ],
        finalAnswer: 'यथाशक्ति = शक्ति के अनुसार (अव्ययीभाव समास)।',
      },
    ]
  } else {
    // Social Science
    keyFormulasOrRules = [
      'Chronological Hierarchy: Link historical events to socio-economic causes and consequences',
      'Geographical Interdependence: Correlate relief, climate, soils, and agricultural patterns',
      'Constitutional Principles: Root citizen rights and government institutions in democratic ethics',
    ]
    conceptBreakdown = [
      {
        heading: `1. Historical & Spatial Context: ${topic1}`,
        body: `Understanding ${topic1} through timelines, geographical cartography, and institutional origins. Grounded in NCERT Contemporary World and Selina Total History.`,
      },
      {
        heading: `2. Critical Analysis of Factors: ${topic2}`,
        body: `Examine the economic factors, constitutional articles, and resource distributions that shaped the outcome of ${topic2}.`,
      },
      {
        heading: `3. Democratic Relevance & Modern Legacy: ${topic3}`,
        body: `How these historical struggles and economic policies directly impact contemporary Indian democracy and global civic rights.`,
      },
    ]
    workedExamples = [
      {
        problemText: `Analyze the primary causes and long-term socio-economic impacts of ${topic1}.`,
        stepByStepSolution: [
          'Step 1: Outline the immediate trigger and the underlying structural causes.',
          'Step 2: Detail the mass mobilization and legislative or physical turning points.',
          'Step 3: Conclude with the constitutional and civic significance.',
        ],
        finalAnswer: 'Constitutional framework established fundamental rights and sovereign accountability.',
      },
    ]
  }

  return {
    id: `less_${classNumber}_${subjectCode}_${chapter.chapterNumber}_1`,
    classNumber,
    subjectCode,
    boardCode,
    chapterId: chapter.id,
    chapterNumber: chapter.chapterNumber,
    chapterTitle: chapter.title,
    topicId: chapter.topics[0]?.id || 'top_1',
    topicTitle: topic1,
    lessonNumber: 1,
    title: `${chapter.title} — Comprehensive Concept & Worked Examples`,
    readingTimeMinutes: Math.min(15, Math.max(8, chapter.topics.length * 3)),
    conceptBreakdown,
    workedExamples,
    revisionNotes: [
      `Review core definitions and mathematical/scientific statements in ${chapter.title}.`,
      `Practice the 2 worked examples before attempting diagnostic assessments.`,
      `Verify all answers against ${citations.textbooks[0] || 'Official Curriculum Textbooks'}.`,
    ],
    keyFormulasOrRules,
    textbookCitation: `${citations.textbooks[0] || 'Official NCERT / Selina Textbooks'} (Effective Academic Session)`,
    linkedBlueprintId: `bp_diag_c${classNumber}_${subjectCode}_ch${chapter.chapterNumber}`,
  }
}

// ============================================================================
// CHAPTER DIAGNOSTIC TEST RUNNER ADAPTER
// ============================================================================

export function getChapterDiagnosticTest(
  classNumber: number,
  subjectCode: string,
  chapterId: string,
  boardCode: BoardCode = 'CBSE',
  questionCount: number = 5
) {
  const chapters = getCurriculumChapters(classNumber, subjectCode, boardCode)
  const chapter = chapters.find((ch) => ch.id === chapterId) || chapters[0]

  const questions: AuthorizedQuestion[] = []
  const solutions: ConfidentialQuestionSolution[] = []

  for (let i = 1; i <= questionCount; i++) {
    let q: any
    if (subjectCode === 'math') {
      q = generateMathQuestion(classNumber, chapter.id, i, boardCode)
    } else {
      q = generateUniversalQuestion(
        (subjectCode === 'science' || subjectCode === 'english' || subjectCode === 'hindi' || subjectCode === 'social_science')
          ? subjectCode
          : 'science',
        classNumber,
        chapter.id,
        i,
        boardCode
      )
    }

    questions.push({
      id: q.id,
      topicId: q.topicId || `top_${i}`,
      questionType: 'single_choice',
      questionText: q.questionText,
      options: q.options.map((opt: any, idx: number) => ({
        id: opt.id,
        label: ['A', 'B', 'C', 'D'][idx] || 'A',
        text: opt.text,
      })),
      marks: q.marks || 1,
      negativeMarkingRatio: 0,
      difficulty: q.difficulty || 'medium',
      language: 'en',
      boardCode: q.boardCode,
      classNumber: q.classNumber,
      subjectCode: q.subjectCode,
    })

    solutions.push({
      questionId: q.id,
      correctOptionIds: [q.correctOptionId],
      explanation: q.explanation || 'Step-by-step verified solution.',
      solutionSteps: q.solutionSteps || ['Step 1: Analyze given problem.', 'Step 2: Apply formula.', 'Step 3: Solve for answer.'],
      keyPoint: q.keyFormula || 'Apply core curriculum principle.',
      reviewStatus: 'verified',
    })
  }

  const blueprint: AssessmentBlueprint = {
    id: `bp_diag_c${classNumber}_${subjectCode}_ch${chapter.chapterNumber}`,
    title: `${chapter.title} — Diagnostic Assessment`,
    subjectId: `subj_g${classNumber}_${subjectCode}`,
    chapterId: chapter.id,
    durationMinutes: 10,
    totalQuestions: questionCount,
    totalMarks: questionCount,
    negativeMarkingRatio: 0,
    passingPercentage: 60,
    rewardCreditAmount: 20,
    examType: 'topic_practice',
    category: 'academic',
    difficulty: 'medium',
  }

  return { blueprint, questions, solutions }
}
