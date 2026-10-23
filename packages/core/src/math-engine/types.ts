import type { DifficultyLevel } from '../types'

export interface MathQuestionOption {
  id: string
  label: 'A' | 'B' | 'C' | 'D'
  text: string
}

export interface MathQuestion {
  id: string
  classNumber: number // 4, 5, 6, 7, 8, 9, 10, 11, 12
  subjectCode: 'math'
  boardCode: 'CBSE' | 'CISCE' | 'IB' | 'STATE'
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
}
