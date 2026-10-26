import type { BoardCode } from '../math-engine/types'
import type { SubjectCode } from '../universal-engine/types'
import type { AcademicWorkedExample } from '../types'

export type AcademicStage = 'primary' | 'middle' | 'secondary' | 'senior_secondary'

export interface AcademicClassMeta {
  classNumber: number
  className: string
  stage: AcademicStage
  stageLabel: string
  ageGroup: string
  recommendedPassProductId: string
  subjects: Array<{
    code: SubjectCode | string
    name: string
    shortLabel: string
    colorTheme: string
    iconName: string
    description: string
  }>
}

export interface AcademicLessonData {
  id: string
  classNumber: number
  subjectCode: string
  boardCode: BoardCode
  chapterId: string
  chapterNumber: number
  chapterTitle: string
  topicId: string
  topicTitle: string
  lessonNumber: number
  title: string
  readingTimeMinutes: number
  conceptBreakdown: Array<{
    heading: string
    body: string
    keyFormulaOrRule?: string
    commonPitfall?: string
  }>
  workedExamples: AcademicWorkedExample[]
  revisionNotes: string[]
  keyFormulasOrRules: string[]
  textbookCitation: string
  linkedBlueprintId: string
}

export interface AcademicPassProduct {
  id: string
  title: string
  stage: AcademicStage
  classRange: string
  basePriceRupees: number
  tagline: string
  features: string[]
  popular?: boolean
}
