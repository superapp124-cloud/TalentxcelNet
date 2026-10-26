import type { DifficultyLevel } from '../types'
import type { BoardCode, MathQuestionOption } from '../math-engine/types'

export type SubjectCode = 'math' | 'science' | 'english' | 'hindi' | 'social_science'

export interface SubjectMeta {
  code: SubjectCode
  name: string
  shortLabel: string
  colorTheme: string
  description: string
  totalQuestions: number // 600,000 (200,000 in Cl 4-8, 400,000 in Cl 9-12)
  juniorQuestions: number // 200,000 across Classes 4-8
  seniorQuestions: number // 400,000 across Classes 9-12
  seniorBranches?: Array<{
    code: string
    name: string
    description: string
    allocationShare: number
  }>
}

export const UNIVERSAL_SUBJECTS: SubjectMeta[] = [
  {
    code: 'math',
    name: 'Mathematics',
    shortLabel: 'Maths',
    colorTheme: 'blue',
    description: 'Arithmetic, Algebra, Geometry, Trigonometry, Calculus, Vectors, Probability & Applied Financial Math',
    totalQuestions: 600000,
    juniorQuestions: 200000,
    seniorQuestions: 400000,
    seniorBranches: [
      { code: 'core_math', name: 'Core Mathematics', description: 'Calculus, Algebra, Coordinate Geometry & Vectors', allocationShare: 0.70 },
      { code: 'applied_math', name: 'Applied Mathematics', description: 'Financial Mathematics, Linear Programming & Inferential Statistics', allocationShare: 0.30 },
    ],
  },
  {
    code: 'science',
    name: 'Science (Physics, Chemistry & Biology)',
    shortLabel: 'Science (PCB)',
    colorTheme: 'emerald',
    description: 'Physics laws & mechanics, Chemistry reactions & stoichiometry, Biology cellular systems & human genetics',
    totalQuestions: 600000,
    juniorQuestions: 200000,
    seniorQuestions: 400000,
    seniorBranches: [
      { code: 'physics', name: 'Physics', description: 'Kinematics, Thermodynamics, Electromagnetism, Optics & Modern Physics', allocationShare: 0.35 },
      { code: 'chemistry', name: 'Chemistry', description: 'Physical, Inorganic, Organic Chemistry & Chemical Bonding', allocationShare: 0.35 },
      { code: 'biology', name: 'Biology', description: 'Cell Biology, Genetics, Human Physiology & Biotechnology', allocationShare: 0.30 },
    ],
  },
  {
    code: 'english',
    name: 'English (Grammar, Composition & Literature)',
    shortLabel: 'English',
    colorTheme: 'indigo',
    description: 'Advanced Grammar & Syntax, Reading Comprehension, Error Spotting, Applied Composition & Classic Literature',
    totalQuestions: 600000,
    juniorQuestions: 200000,
    seniorQuestions: 400000,
    seniorBranches: [
      { code: 'grammar', name: 'Grammar & Syntax', description: 'Tenses, Reported Speech, Active/Passive Voice, Subject-Verb Concord & Clauses', allocationShare: 0.40 },
      { code: 'reading', name: 'Comprehension & Vocabulary', description: 'Unseen Analytical Passages, Idioms, Phrasal Verbs & Contextual Inference', allocationShare: 0.30 },
      { code: 'writing', name: 'Writing Skills & Literature', description: 'Formal Composition, Poetic Devices, Dramatic Analyses & Literary Criticism', allocationShare: 0.30 },
    ],
  },
  {
    code: 'hindi',
    name: 'Hindi (हिंदी व्याकरण, काव्य एवं गद्यखंड)',
    shortLabel: 'Hindi (व्याकरण)',
    colorTheme: 'amber',
    description: 'मानक हिंदी व्याकरण (संधि, समास, रस, अलंकार, पद परिचय), अपठित बोध, रचनात्मक लेखन एवं काव्य-गद्य साहित्य',
    totalQuestions: 600000,
    juniorQuestions: 200000,
    seniorQuestions: 400000,
    seniorBranches: [
      { code: 'vyakaran', name: 'हिंदी व्याकरण (Grammar)', description: 'संधि, समास, उपसर्ग-प्रत्यय, वाक्य रूपांतरण, अलंकार, रस, पद परिचय व अशुद्धि शोधन', allocationShare: 0.45 },
      { code: 'bodh', name: 'बोध एवं रचनात्मक लेखन', description: 'अपठित गद्यांश, काव्यांश, अनुच्छेद लेखन, औपचारिक पत्र व संवाद लेखन', allocationShare: 0.25 },
      { code: 'sahitya', name: 'काव्य एवं गद्य साहित्य', description: 'कबीर, सूरदास, तुलसीदास, प्रेमचंद, महादेवी वर्मा, निराला व आधुनिक साहित्य', allocationShare: 0.30 },
    ],
  },
  {
    code: 'social_science',
    name: 'Social Science (History, Geography, Civics & Economics)',
    shortLabel: 'Social Science',
    colorTheme: 'purple',
    description: 'World & Indian History, Physical & Human Geography, Democratic Politics/Civics, and National Economics',
    totalQuestions: 600000,
    juniorQuestions: 200000,
    seniorQuestions: 400000,
    seniorBranches: [
      { code: 'history', name: 'History', description: 'French & Russian Revolutions, Nationalism in India & World Historical Epochs', allocationShare: 0.25 },
      { code: 'geography', name: 'Geography', description: 'Resources, Climate, Agriculture, Minerals, Energy & Lifelines of Economy', allocationShare: 0.25 },
      { code: 'political_science', name: 'Political Science / Civics', description: 'Democracy, Constitutional Design, Federalism, Political Parties & Citizen Rights', allocationShare: 0.25 },
      { code: 'economics', name: 'Economics', description: 'National Development, Sectors of Indian Economy, Money, Banking & Globalization', allocationShare: 0.25 },
    ],
  },
]

export interface UniversalQuestion {
  id: string
  classNumber: number // 4 to 12
  subjectCode: SubjectCode
  subjectName: string
  disciplineCode?: string // e.g. 'physics', 'chemistry', 'biology', 'grammar', 'vyakaran', 'history', etc.
  disciplineName?: string // e.g. 'Physics', 'Organic Chemistry', 'Hindi Vyakaran'
  boardCode: BoardCode
  bookSource?: string
  exerciseRef?: string
  boardYearPYQ?: string
  chapterId: string
  chapterNumber: number
  chapterTitle: string
  topicId: string
  topicTitle: string
  difficulty: DifficultyLevel
  questionText: string
  options: MathQuestionOption[]
  correctOptionId: string
  solutionSteps: string[]
  explanation: string
  keyFormula?: string
  marks: number
  negativeMarkingRatio: number
}

export interface UniversalChapterMeta {
  id: string
  chapterNumber: number
  title: string
  disciplineCode?: string
  disciplineName?: string
  topics: Array<{ id: string; title: string }>
  targetQuestionCount: number
}

export interface UniversalClassTaxonomy {
  classNumber: number
  className: string
  subjectCode: SubjectCode
  subjectName: string
  totalQuestionsTarget: number
  chapters: UniversalChapterMeta[]
}

export interface UniversalBankSummary {
  totalQuestionsCount: number // 3,000,000
  totalSubjectsCount: number // 5
  totalClassesCount: number // 9 (Classes 4-12)
  subjectCounts: Record<SubjectCode, number> // 600,000 each
  classCounts: Record<number, number> // Cl 4-8: 200,000 total across subjects (40k/subj), Cl 9-12: 500,000 total across subjects (100k/subj)
  branchCounts?: Record<string, number>
  boardBreakdown: {
    cbseCount: number // ~1,282,500 (42.75%)
    icseCount: number // ~975,000 (32.50%)
    ibCount: number // ~742,500 (24.75%)
  }
}
