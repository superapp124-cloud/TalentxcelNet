import type { DifficultyLevel } from '../types'

export interface MathQuestionOption {
  id: string
  label: 'A' | 'B' | 'C' | 'D'
  text: string
}

export type BoardCode = 'CBSE' | 'CISCE' | 'IB' | 'STATE'

export interface MathQuestion {
  id: string
  classNumber: number // 4, 5, 6, 7, 8, 9, 10, 11, 12
  subjectCode: 'math'
  boardCode: BoardCode
  bookSource?: string // e.g. "NCERT Mathematics Class 10", "Selina Concise Mathematics (Dr. R.K. Bansal)", "IB MYP Standard & Extended"
  exerciseRef?: string // e.g. "Exercise 1.2 Q4", "Exercise 1(A) Q8", "Criterion A (Haese Ch 1)"
  boardYearPYQ?: string // e.g. "CBSE Board 2023 Set 1", "ICSE 2022 Paper 1", "IB May 2021 Paper 2"
  chapterId: string
  chapterNumber: number
  chapterTitle: string
  topicId: string
  topicTitle: string
  difficulty: DifficultyLevel // 'easy' | 'medium' | 'hard' | 'olympiad'
  questionText: string
  options: MathQuestionOption[]
  correctOptionId: string
  solutionSteps: string[]
  explanation: string
  keyFormula?: string
  marks: number
  negativeMarkingRatio: number
}

export interface MathChapterMeta {
  id: string
  chapterNumber: number
  title: string
  topics: Array<{ id: string; title: string }>
  targetQuestionCount: number
}

export interface MathClassTaxonomy {
  classNumber: number
  className: string
  totalQuestionsTarget: number
  chapters: MathChapterMeta[]
}

export interface MathBankSummary {
  totalQuestionsCount: number
  totalClassesCount: number
  classCounts: Record<number, number>
  chapterCounts: Record<string, number>
  boardBreakdown?: {
    cbseCount: number
    icseCount: number
    ibCount: number
  }
}
