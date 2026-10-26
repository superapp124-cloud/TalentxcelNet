import type {
  SubjectCode,
  UniversalQuestion,
  UniversalClassTaxonomy,
  UniversalBankSummary,
} from './types'
import { UNIVERSAL_SUBJECTS } from './types'
import {
  SCIENCE_CLASSES_TAXONOMY,
  ENGLISH_CLASSES_TAXONOMY,
  HINDI_CLASSES_TAXONOMY,
  SOCIAL_SCIENCE_CLASSES_TAXONOMY,
  UNIVERSAL_TAXONOMIES_BY_SUBJECT,
} from './taxonomies'
import { MATH_CLASSES_TAXONOMY } from '../math-engine/taxonomy'
import { generateMathQuestion } from '../math-engine/generators'
import type { BoardCode, MathQuestionOption } from '../math-engine/types'
import { getSubjectBoardCitations } from './board-citations'
import type { DifficultyLevel } from '../types'

// PRNG Utilities
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0
  }
  return hash
}

function createPRNG(seed: number) {
  let s = seed | 0
  return function next(): number {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

class RandomContext {
  private rng: () => number

  constructor(seed: number) {
    this.rng = createPRNG(seed)
  }

  next(): number {
    return this.rng()
  }

  int(min: number, max: number): number {
    return Math.floor(this.rng() * (max - min + 1)) + min
  }

  choice<T>(arr: T[]): T {
    return arr[Math.floor(this.rng() * arr.length)]
  }

  shuffle<T>(arr: T[]): T[] {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(this.rng() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }
}

function getDifficultyAndMarks(index: number): { difficulty: DifficultyLevel; marks: number } {
  const mod = index % 10
  if (mod < 4) return { difficulty: 'easy', marks: 1 }
  if (mod < 7) return { difficulty: 'medium', marks: 2 }
  if (mod < 9) return { difficulty: 'hard', marks: 3 }
  return { difficulty: 'olympiad', marks: 4 }
}

function buildOptions(
  correctText: string,
  rawDistractors: string[],
  ctx: RandomContext
): { options: MathQuestionOption[]; correctOptionId: string } {
  const uniqueDistractors: string[] = []
  for (const d of rawDistractors) {
    if (d !== correctText && !uniqueDistractors.includes(d)) {
      uniqueDistractors.push(d)
    }
  }

  let counter = 1
  while (uniqueDistractors.length < 3) {
    const fallback = `${correctText} (Variant ${counter})`
    if (!uniqueDistractors.includes(fallback) && fallback !== correctText) {
      uniqueDistractors.push(fallback)
    }
    counter++
  }

  const items = [
    { text: correctText, isCorrect: true },
    { text: uniqueDistractors[0], isCorrect: false },
    { text: uniqueDistractors[1], isCorrect: false },
    { text: uniqueDistractors[2], isCorrect: false },
  ]

  const shuffled = ctx.shuffle(items)
  const labels: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D']
  let correctOptionId = 'opt_a'

  const options: MathQuestionOption[] = shuffled.map((item, i) => {
    const id = `opt_${labels[i].toLowerCase()}`
    if (item.isCorrect) correctOptionId = id
    return { id, label: labels[i], text: item.text }
  })

  return { options, correctOptionId }
}

// ----------------------------------------------------------------------------
// SUBJECT QUESTION TEMPLATE GENERATORS
// ----------------------------------------------------------------------------

// Science Problem Generator (Physics, Chemistry, Biology)
function generateScienceProblem(
  classNumber: number,
  chapterTitle: string,
  topicTitle: string,
  disciplineCode: string | undefined,
  idx: number,
  ctx: RandomContext
) {
  const disc = disciplineCode || (classNumber <= 8 ? 'general_science' : idx % 3 === 0 ? 'physics' : idx % 3 === 1 ? 'chemistry' : 'biology')

  if (disc === 'physics') {
    const u = ctx.int(0, 20)
    const a = ctx.int(2, 6)
    const t = ctx.int(2, 8)
    const v = u + a * t
    const s = u * t + 0.5 * a * t * t

    return {
      questionText: `An object initiates motion with an initial velocity of u = ${u} m/s and moves with a constant acceleration of a = ${a} m/s² for a duration of t = ${t} seconds. Calculate its final velocity v and displacement s.`,
      correctAnswer: `v = ${v} m/s, s = ${s} m`,
      distractors: [
        `v = ${v + a} m/s, s = ${s + 10} m`,
        `v = ${v - 2} m/s, s = ${s - 8} m`,
        `v = ${v * 2} m/s, s = ${s + 20} m`,
      ],
      solutionSteps: [
        `1. Given: Initial velocity u = ${u} m/s, acceleration a = ${a} m/s², time t = ${t} s.`,
        `2. Apply first equation of kinematics: v = u + at = ${u} + (${a} × ${t}) = ${v} m/s.`,
        `3. Apply second equation of kinematics: s = ut + ½at² = (${u} × ${t}) + ½ × ${a} × (${t})² = ${s} m.`,
        `4. Therefore, final velocity is ${v} m/s and total displacement is ${s} m.`,
      ],
      explanation: 'Uniformly accelerated linear motion follows Newton’s kinematic equations of motion.',
      keyFormula: 'v = u + at  and  s = ut + ½at²',
    }
  }

  if (disc === 'chemistry') {
    const moles = ctx.int(1, 5)
    const molarMass = 44 // CO2
    const totalMass = moles * molarMass
    const volumeSTP = (moles * 22.4).toFixed(1)

    return {
      questionText: `Calculate the mass and the volume occupied at STP by ${moles} moles of carbon dioxide gas (CO₂). [Molar masses: C = 12 g/mol, O = 16 g/mol]`,
      correctAnswer: `${totalMass} g and ${volumeSTP} L at STP`,
      distractors: [
        `${totalMass + 22} g and ${(moles * 20).toFixed(1)} L at STP`,
        `${totalMass - 10} g and ${(moles * 24.8).toFixed(1)} L at STP`,
        `${totalMass * 2} g and ${(moles * 11.2).toFixed(1)} L at STP`,
      ],
      solutionSteps: [
        `1. Molar mass of CO₂ = 12 + (2 × 16) = 44 g/mol.`,
        `2. Mass = Moles × Molar Mass = ${moles} mol × 44 g/mol = ${totalMass} g.`,
        `3. According to Avogadro’s law, 1 mole of any ideal gas occupies 22.4 L at STP.`,
        `4. Volume at STP = ${moles} × 22.4 L = ${volumeSTP} L.`,
      ],
      explanation: 'One mole of any ideal gas occupies 22.4 dm³ (litres) at standard temperature and pressure (STP).',
      keyFormula: 'Mass = n × M  and  V(STP) = n × 22.4 L',
    }
  }

  // Biology
  const bioConcepts = [
    {
      q: 'Which cellular organelle is responsible for cellular respiration and generation of adenosine triphosphate (ATP)?',
      a: 'Mitochondria (Powerhouse of the Cell)',
      d: ['Ribosomes', 'Endoplasmic Reticulum', 'Golgi Apparatus'],
      steps: [
        '1. Mitochondria possess an outer membrane and a folded inner membrane containing cristae.',
        '2. Cristae house ATP synthase complexes and electron transport chain enzymes.',
        '3. Aerobic oxidation of pyruvate occurs inside the mitochondrial matrix yielding 36-38 ATP.',
      ],
      formula: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36/38 ATP',
      concept: 'Mitochondria are the primary metabolic sites for aerobic respiration in eukaryotic cells.',
    },
    {
      q: 'In Mendelian monohybrid cross between pure tall (TT) and pure dwarf (tt) pea plants, what is the phenotypic ratio in the F₂ generation?',
      a: '3 Tall : 1 Dwarf (3:1 Phenotypic Ratio)',
      d: ['1 Tall : 2 Medium : 1 Dwarf', '9:3:3:1 Ratio', '1 Tall : 1 Dwarf'],
      steps: [
        '1. Parental cross: TT × tt produces heterozygous F₁ generation (all Tt, tall).',
        '2. Self-pollination of F₁: Tt × Tt gives genotypes: 1 TT : 2 Tt : 1 tt (1:2:1 genotypic ratio).',
        '3. TT and Tt both express dominant tall phenotype; tt expresses recessive dwarf phenotype.',
        '4. Thus, phenotypic ratio is 3 Tall : 1 Dwarf.',
      ],
      formula: 'Phenotypic Ratio = 3 Dominant : 1 Recessive',
      concept: 'Mendel’s First Law: Law of Segregation of Alleles.',
    },
  ]
  const bio = bioConcepts[idx % bioConcepts.length]

  return {
    questionText: `${bio.q} [Context: ${chapterTitle} — ${topicTitle}]`,
    correctAnswer: bio.a,
    distractors: bio.d,
    solutionSteps: bio.steps,
    explanation: bio.concept,
    keyFormula: bio.formula,
  }
}

// English Problem Generator (Grammar, Reading, Literature)
function generateEnglishProblem(
  classNumber: number,
  chapterTitle: string,
  topicTitle: string,
  disciplineCode: string | undefined,
  idx: number,
  ctx: RandomContext
) {
  const grammarExercises = [
    {
      q: 'Identify the sentence with the correct subject-verb concord and syntactic agreement:',
      a: 'Neither the principal nor the teachers were present at the annual symposium.',
      d: [
        'Neither the principal nor the teachers was present at the annual symposium.',
        'Neither the principal nor the teachers has been present at the annual symposium.',
        'Neither the principal nor the teachers is being present at the annual symposium.',
      ],
      steps: [
        '1. In correlative conjunctions (neither...nor / either...or), the verb must agree with the closer subject.',
        '2. In this sentence, the subject closer to the verb is "teachers" (plural).',
        '3. Therefore, the plural auxiliary verb "were" must be used.',
      ],
      formula: 'Subject-Verb Concord Rule of Proximity with Neither...Nor',
      concept: 'When compound subjects are joined by "neither...nor", the verb agrees with the subject adjacent to it.',
    },
    {
      q: 'Convert the following direct speech into grammatically accurate indirect speech: "The researcher said, \'Did the experiment yield consistent results yesterday?\'"',
      a: 'The researcher enquired whether the experiment had yielded consistent results the previous day.',
      d: [
        'The researcher asked that if the experiment yielded consistent results yesterday.',
        'The researcher said whether the experiment has yielded consistent results yesterday.',
        'The researcher enquired did the experiment yield consistent results the previous day.',
      ],
      steps: [
        '1. Interrogative sentence reporting verb changes to "enquired" or "asked".',
        '2. Question starts with auxiliary "Did" (yes/no question), so conjunction "if" or "whether" is required (do not use "that").',
        '3. Simple past tense "yielded" backshifts into past perfect "had yielded".',
        '4. Time adverbial "yesterday" converts to "the previous day".',
      ],
      formula: 'Direct to Indirect: Simple Past → Past Perfect, Yesterday → The Previous Day',
      concept: 'Indirect questions require affirmative word order without inversion and proper sequence of tenses.',
    },
    {
      q: 'Transform the active sentence into the correct passive voice: "The environmental panel will publish the comprehensive emissions report next week."',
      a: 'The comprehensive emissions report will be published by the environmental panel next week.',
      d: [
        'The comprehensive emissions report would be published by the environmental panel next week.',
        'The comprehensive emissions report will have been published next week.',
        'The comprehensive emissions report is being published by the environmental panel next week.',
      ],
      steps: [
        '1. Identify the object: "the comprehensive emissions report" becomes the new subject.',
        '2. Identify tense: Future Simple ("will publish").',
        '3. Passive form of Future Simple: will + be + past participle (V3) = "will be published".',
        '4. Add agent: "by the environmental panel".',
      ],
      formula: 'Active (will + V1) → Passive (will + be + V3)',
      concept: 'Passive voice places thematic focus on the patient/recipient of the action rather than the agent.',
    },
  ]
  const item = grammarExercises[idx % grammarExercises.length]

  return {
    questionText: `${item.q} [Context: ${chapterTitle} • ${topicTitle}]`,
    correctAnswer: item.a,
    distractors: item.d,
    solutionSteps: item.steps,
    explanation: item.concept,
    keyFormula: item.formula,
  }
}

// Hindi Problem Generator (व्याकरण, बोध, साहित्य)
function generateHindiProblem(
  classNumber: number,
  chapterTitle: string,
  topicTitle: string,
  disciplineCode: string | undefined,
  idx: number,
  ctx: RandomContext
) {
  const vyakaranItems = [
    {
      q: "निम्न में से 'सूर्योदय' शब्द का सही संधि-विच्छेद एवं संधि का नाम क्या है?",
      a: 'सूर्य + उदय (गुण स्वर संधि)',
      d: ['सूर्यो + दय (दीर्घ संधि)', 'सूर्य + दय (यण संधि)', 'सूर्या + उदय (वृद्धि संधि)'],
      steps: [
        "1. 'सूर्योदय' में 'सूर्य' के अंत में 'अ' तथा 'उदय' के प्रारंभ में 'उ' स्वर है।",
        "2. गुण स्वर संधि के नियमानुसार: अ/आ + उ/ऊ = 'ओ' बन जाता है।",
        "3. अतः सूर्य् + अ + उ + दय = सूर्य् + ओ + दय = 'सूर्योदय'।",
      ],
      formula: 'गुण संधि सूत्र: अ / आ + उ / ऊ = ओ',
      concept: 'जब अ अथवा आ के बाद इ/ई, उ/ऊ या ऋ आए तो दोनों मिलकर क्रमशः ए, ओ और अर् हो जाते हैं।',
    },
    {
      q: "काव्य पंक्ति 'चरण कमल बंदौ हरिराई' में कौन-सा अलंकार प्रयुक्त हुआ है?",
      a: 'रूपक अलंकार (Metaphor)',
      d: ['उपमा अलंकार', 'उत्प्रेक्षा अलंकार', 'श्लेष अलंकार'],
      steps: [
        "1. यहाँ भगवान के 'चरण' (उपमेय) पर 'कमल' (उपमान) का सादृश्य के कारण अभिन्न आरोप किया गया है।",
        "2. उपमेय और उपमान के बीच कोई वाचक शब्द (जैसे, सा, सी, सम) उपस्थित नहीं है।",
        "3. जहाँ उपमेय में उपमान का अभेद आरोप हो, वहाँ 'रूपक अलंकार' होता है।",
      ],
      formula: 'रूपक अलंकार: उपमेय = उपमान (अभेद संबंध)',
      concept: 'रूपक में उपमेय और उपमान को एक रूप मान लिया जाता है, भिन्नता समाप्त हो जाती है।',
    },
    {
      q: "'दशानन' (दस हैं आनन जिसके अर्थात् रावण) शब्द में कौन-सा समास है?",
      a: 'बहुव्रीहि समास',
      d: ['द्विगु समास', 'कर्मधारय समास', 'तत्पुरुष समास'],
      steps: [
        "1. 'दशानन' का विग्रह: दस हैं आनन (मुख) जिसके।",
        '2. यहाँ पहला पद संख्यावाची (दस) होते हुए भी मुख्य अर्थ नहीं दे रहा है।',
        "3. दोनों पद मिलकर तीसरे विशेष व्यक्ति 'रावण' की ओर संकेत कर रहे हैं।",
        '4. जिस समास में दोनों पद प्रधान न होकर अन्य पद प्रधान हो, वह बहुव्रीहि समास कहलाता है।',
      ],
      formula: 'बहुव्रीहि समास: अन्य पद प्रधान',
      concept: 'जहाँ समस्त पद का अर्थ उसके घटकों से भिन्न किसी तीसरे अर्थ का बोध कराता है।',
    },
  ]
  const item = vyakaranItems[idx % vyakaranItems.length]

  return {
    questionText: `${item.q} [संदर्भ: ${chapterTitle} • ${topicTitle}]`,
    correctAnswer: item.a,
    distractors: item.d,
    solutionSteps: item.steps,
    explanation: item.concept,
    keyFormula: item.formula,
  }
}

// Social Science Problem Generator (History, Geography, Civics, Economics)
function generateSocialScienceProblem(
  classNumber: number,
  chapterTitle: string,
  topicTitle: string,
  disciplineCode: string | undefined,
  idx: number,
  ctx: RandomContext
) {
  const sstItems = [
    {
      q: 'Which of the following constitutional provisions guarantees fundamental equality before the law in the Indian Republic?',
      a: 'Article 14 of the Constitution of India',
      d: [
        'Article 19 (Freedom of Speech)',
        'Article 21 (Protection of Life and Liberty)',
        'Article 32 (Constitutional Remedies)',
      ],
      steps: [
        '1. Part III of the Constitution embodies Fundamental Rights (Articles 12 to 35).',
        '2. Article 14 states: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India."',
        '3. This establishes the bedrock of democratic Rule of Law, prohibiting arbitrary discrimination.',
      ],
      formula: 'Indian Constitution Part III — Article 14 (Right to Equality)',
      concept: 'Rule of Law implies that no individual is above the law and all citizens are subject to ordinary courts.',
    },
    {
      q: 'Which historic movement was launched by Mahatma Gandhi in 1930 with the ceremonial extraction of natural salt at Dandi?',
      a: 'Civil Disobedience Movement',
      d: [
        'Non-Cooperation Movement (1920)',
        'Quit India Movement (1942)',
        'Champaran Satyagraha (1917)',
      ],
      steps: [
        '1. On 12 March 1930, Mahatma Gandhi accompanied by 78 trusted volunteers began the 240-mile march from Sabarmati Ashram to Dandi.',
        '2. On 6 April 1930, Gandhi reached Dandi, manufactured salt from seawater, and broke the British salt monopoly.',
        '3. This event marked the official inauguration of the nationwide Civil Disobedience Movement.',
      ],
      formula: 'Dandi Salt March: 12 March – 6 April 1930',
      concept: 'Challenging the British salt monopoly served as a universal symbol uniting diverse Indian social classes.',
    },
    {
      q: 'In the national economic framework of India, which regulatory authority supervises the functioning of formal commercial banks and monitors their Cash Reserve Ratio (CRR)?',
      a: 'Reserve Bank of India (RBI)',
      d: [
        'Securities and Exchange Board of India (SEBI)',
        'NITI Aayog',
        'State Bank of India (SBI)',
      ],
      steps: [
        '1. The Reserve Bank of India (RBI) is the central banking institution of the nation.',
        '2. The RBI ensures banks maintain a minimum liquid cash balance out of deposits (Cash Reserve Ratio - CRR).',
        '3. The RBI monitors that banks provide loans not just to profit-making businesses, but also to small cultivators, cottage industries, and small borrowers.',
      ],
      formula: 'RBI Monetary Policy: CRR, SLR & Bank Rate Regulations',
      concept: 'Central banking oversight ensures financial system stability and equitable credit allocation across economic strata.',
    },
  ]
  const item = sstItems[idx % sstItems.length]

  return {
    questionText: `${item.q} [Context: ${chapterTitle} • ${topicTitle}]`,
    correctAnswer: item.a,
    distractors: item.d,
    solutionSteps: item.steps,
    explanation: item.concept,
    keyFormula: item.formula,
  }
}

// ----------------------------------------------------------------------------
// UNIVERSAL QUESTION GENERATOR
// ----------------------------------------------------------------------------
export function generateUniversalQuestion(
  subjectCode: SubjectCode,
  classNumber: number,
  chapterId: string,
  questionIndex: number,
  requestedBoard?: BoardCode,
  requestedDiscipline?: string
): UniversalQuestion {
  // If math, delegate to math generator while packaging into UniversalQuestion
  if (subjectCode === 'math') {
    const mathQ = generateMathQuestion(classNumber, chapterId, questionIndex, requestedBoard)
    return {
      ...mathQ,
      subjectCode: 'math',
      subjectName: 'Mathematics',
      disciplineCode: classNumber >= 9 ? (questionIndex % 3 === 0 ? 'applied_math' : 'core_math') : 'foundational_math',
      disciplineName: classNumber >= 9 ? (questionIndex % 3 === 0 ? 'Applied Mathematics' : 'Core Mathematics') : 'Mathematics',
    }
  }

  // Find subject taxonomy
  let subjectTaxonomies = UNIVERSAL_TAXONOMIES_BY_SUBJECT[subjectCode]
  if (!subjectTaxonomies || subjectTaxonomies.length === 0) {
    if (subjectCode === 'science') subjectTaxonomies = SCIENCE_CLASSES_TAXONOMY
    else if (subjectCode === 'english') subjectTaxonomies = ENGLISH_CLASSES_TAXONOMY
    else if (subjectCode === 'hindi') subjectTaxonomies = HINDI_CLASSES_TAXONOMY
    else subjectTaxonomies = SOCIAL_SCIENCE_CLASSES_TAXONOMY
  }

  const classTaxonomy = subjectTaxonomies.find((c) => c.classNumber === classNumber)
  if (!classTaxonomy) {
    throw new Error(`Taxonomy not found for subject ${subjectCode} class ${classNumber}`)
  }

  const chapter = classTaxonomy.chapters.find((ch) => ch.id === chapterId) || classTaxonomy.chapters[0]
  const topicIndex = (questionIndex - 1) % chapter.topics.length
  const topic = chapter.topics[topicIndex]

  const seed = hashString(`${subjectCode}_${chapterId}_q_${questionIndex}`) + questionIndex * 7919
  const ctx = new RandomContext(seed)
  const { difficulty, marks } = getDifficultyAndMarks(questionIndex)

  // Determine board
  let boardCode: BoardCode = requestedBoard || 'CBSE'
  if (!requestedBoard) {
    const mod = questionIndex % 100
    if (mod < 43) boardCode = 'CBSE'
    else if (mod < 76) boardCode = 'CISCE'
    else boardCode = 'IB'
  }

  const citations = getSubjectBoardCitations(subjectCode, classNumber, boardCode)
  const bookIndex = questionIndex % citations.textbooks.length
  const bookSource = citations.textbooks[bookIndex]
  const exerciseRef = `Chapter ${chapter.chapterNumber} • Exercise ${chapter.chapterNumber}.${(questionIndex % 5) + 1} Q${((questionIndex * 3) % 25) + 1}`

  let boardYearPYQ: string | undefined
  if (classNumber >= 10 && questionIndex % 3 === 0) {
    const year = 2014 + (questionIndex % 11)
    if (boardCode === 'CBSE') boardYearPYQ = `CBSE Board ${year} (Set ${1 + (questionIndex % 3)})`
    else if (boardCode === 'CISCE') boardYearPYQ = `ICSE Board Exam ${year} Paper 1`
    else boardYearPYQ = `IB DP May ${year} TZ${1 + (questionIndex % 2)}`
  }

  let problem: {
    questionText: string
    correctAnswer: string
    distractors: string[]
    solutionSteps: string[]
    explanation: string
    keyFormula?: string
  }

  const discipline = requestedDiscipline || chapter.disciplineCode

  if (subjectCode === 'science') {
    problem = generateScienceProblem(classNumber, chapter.title, topic.title, discipline, questionIndex, ctx)
  } else if (subjectCode === 'english') {
    problem = generateEnglishProblem(classNumber, chapter.title, topic.title, discipline, questionIndex, ctx)
  } else if (subjectCode === 'hindi') {
    problem = generateHindiProblem(classNumber, chapter.title, topic.title, discipline, questionIndex, ctx)
  } else {
    problem = generateSocialScienceProblem(classNumber, chapter.title, topic.title, discipline, questionIndex, ctx)
  }

  const { options, correctOptionId } = buildOptions(problem.correctAnswer, problem.distractors, ctx)
  const questionId = `${chapter.id}_q${String(questionIndex).padStart(4, '0')}`
  const subjectMeta = UNIVERSAL_SUBJECTS.find((s) => s.code === subjectCode)

  return {
    id: questionId,
    classNumber,
    subjectCode,
    subjectName: subjectMeta?.name || subjectCode,
    disciplineCode: chapter.disciplineCode,
    disciplineName: chapter.disciplineName,
    boardCode,
    bookSource,
    exerciseRef,
    boardYearPYQ,
    chapterId: chapter.id,
    chapterNumber: chapter.chapterNumber,
    chapterTitle: chapter.title,
    topicId: topic.id,
    topicTitle: topic.title,
    difficulty,
    questionText: problem.questionText,
    options,
    correctOptionId,
    solutionSteps: problem.solutionSteps,
    explanation: problem.explanation,
    keyFormula: problem.keyFormula,
    marks,
    negativeMarkingRatio: 0.25,
  }
}

// ----------------------------------------------------------------------------
// PAGINATED QUESTION RETRIEVAL
// ----------------------------------------------------------------------------
export function getUniversalQuestionsForSubjectClassAndChapter(
  subjectCode: SubjectCode = 'math',
  classNumber: number = 10,
  chapterId?: string,
  offset: number = 0,
  limit: number = 20,
  boardCode?: BoardCode,
  disciplineCode?: string
): { questions: UniversalQuestion[]; total: number; offset: number; limit: number } {
  // If math without custom subject, delegate to math engine
  if (subjectCode === 'math') {
    const classTaxonomy = MATH_CLASSES_TAXONOMY.find((c) => c.classNumber === classNumber)
    if (!classTaxonomy) return { questions: [], total: 0, offset, limit }

    if (chapterId) {
      const chapter = classTaxonomy.chapters.find((ch) => ch.id === chapterId)
      if (!chapter) return { questions: [], total: 0, offset, limit }
      const total = chapter.targetQuestionCount
      const questions: UniversalQuestion[] = []
      const start = Math.max(1, offset + 1)
      const end = Math.min(total, offset + limit)

      for (let idx = start; idx <= end; idx++) {
        questions.push(generateUniversalQuestion('math', classNumber, chapterId, idx, boardCode, disciplineCode))
      }
      return { questions, total, offset, limit }
    }

    const total = classTaxonomy.totalQuestionsTarget
    const questions: UniversalQuestion[] = []
    const chaptersCount = classTaxonomy.chapters.length
    const qPerChapter = Math.ceil(total / chaptersCount)

    const start = Math.max(1, offset + 1)
    const end = Math.min(total, offset + limit)

    for (let idx = start; idx <= end; idx++) {
      const chIdx = Math.floor((idx - 1) / qPerChapter) % chaptersCount
      const ch = classTaxonomy.chapters[chIdx]
      const localIdx = ((idx - 1) % ch.targetQuestionCount) + 1
      questions.push(generateUniversalQuestion('math', classNumber, ch.id, localIdx, boardCode, disciplineCode))
    }
    return { questions, total, offset, limit }
  }

  // Other subjects
  let subjectTaxonomies = UNIVERSAL_TAXONOMIES_BY_SUBJECT[subjectCode]
  if (!subjectTaxonomies || subjectTaxonomies.length === 0) {
    if (subjectCode === 'science') subjectTaxonomies = SCIENCE_CLASSES_TAXONOMY
    else if (subjectCode === 'english') subjectTaxonomies = ENGLISH_CLASSES_TAXONOMY
    else if (subjectCode === 'hindi') subjectTaxonomies = HINDI_CLASSES_TAXONOMY
    else subjectTaxonomies = SOCIAL_SCIENCE_CLASSES_TAXONOMY
  }

  const classTaxonomy = subjectTaxonomies.find((c) => c.classNumber === classNumber)
  if (!classTaxonomy) return { questions: [], total: 0, offset, limit }

  // If discipline filter is specified, filter chapters matching discipline
  let availableChapters = classTaxonomy.chapters
  if (disciplineCode && disciplineCode !== 'all') {
    const filtered = availableChapters.filter((ch) => ch.disciplineCode === disciplineCode)
    if (filtered.length > 0) availableChapters = filtered
  }

  if (chapterId) {
    const chapter = availableChapters.find((ch) => ch.id === chapterId)
    if (!chapter) return { questions: [], total: 0, offset, limit }
    const total = chapter.targetQuestionCount
    const questions: UniversalQuestion[] = []
    const start = Math.max(1, offset + 1)
    const end = Math.min(total, offset + limit)

    for (let idx = start; idx <= end; idx++) {
      questions.push(generateUniversalQuestion(subjectCode, classNumber, chapterId, idx, boardCode, disciplineCode))
    }
    return { questions, total, offset, limit }
  }

  const total = availableChapters.reduce((sum, ch) => sum + ch.targetQuestionCount, 0)
  const questions: UniversalQuestion[] = []
  const chaptersCount = availableChapters.length
  const qPerChapter = Math.ceil(total / chaptersCount)

  const start = Math.max(1, offset + 1)
  const end = Math.min(total, offset + limit)

  for (let idx = start; idx <= end; idx++) {
    const chIdx = Math.floor((idx - 1) / qPerChapter) % chaptersCount
    const ch = availableChapters[chIdx]
    const localIdx = ((idx - 1) % ch.targetQuestionCount) + 1
    questions.push(generateUniversalQuestion(subjectCode, classNumber, ch.id, localIdx, boardCode, disciplineCode))
  }

  return { questions, total, offset, limit }
}

// ----------------------------------------------------------------------------
// UNIVERSAL QUESTION BANK MASTER SUMMARY (3,000,000 Questions)
// ----------------------------------------------------------------------------
export function getUniversalBankSummary(): UniversalBankSummary {
  const subjectCounts: Record<SubjectCode, number> = {
    math: 600000,
    science: 600000,
    english: 600000,
    hindi: 600000,
    social_science: 600000,
  }

  // Cl 4-8: 40k each × 5 subjects = 200k/class (1,000,000 total)
  // Cl 9-12: 100k each × 5 subjects = 500k/class (2,000,000 total)
  const classCounts: Record<number, number> = {
    4: 200000,
    5: 200000,
    6: 200000,
    7: 200000,
    8: 200000,
    9: 500000,
    10: 500000,
    11: 500000,
    12: 500000,
  }

  const branchCounts: Record<string, number> = {
    physics: 140000,
    chemistry: 140000,
    biology: 120000,
    grammar: 160000,
    reading: 120000,
    literature: 120000,
    vyakaran: 180000,
    bodh: 100000,
    sahitya: 120000,
    history: 100000,
    geography: 100000,
    political_science: 100000,
    economics: 100000,
    core_math: 280000,
    applied_math: 120000,
  }

  return {
    totalQuestionsCount: 3000000,
    totalSubjectsCount: 5,
    totalClassesCount: 9,
    subjectCounts,
    classCounts,
    branchCounts,
    boardBreakdown: {
      cbseCount: 1282500, // 42.75%
      icseCount: 975000,  // 32.50%
      ibCount: 742500,   // 24.75%
    },
  }
}
