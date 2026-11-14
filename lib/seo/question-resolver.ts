import {
  generateUniversalQuestion,
  UNIVERSAL_TAXONOMIES_BY_SUBJECT,
  SCIENCE_CLASSES_TAXONOMY,
  ENGLISH_CLASSES_TAXONOMY,
  HINDI_CLASSES_TAXONOMY,
  SOCIAL_SCIENCE_CLASSES_TAXONOMY,
  MATH_CLASSES_TAXONOMY,
} from '@/packages/core/src'
import type { UniversalQuestion, SubjectCode, BoardCode } from '@/packages/core/src'

export interface ParsedQuestionId {
  subjectCode: SubjectCode
  classNumber: number
  chapterId: string
  questionIndex: number
  boardCode: BoardCode
}

export function parseQuestionId(id: string, defaultBoard: BoardCode = 'CBSE'): ParsedQuestionId | null {
  // Pattern: sci_c10_ch01_q0001 or math_c10_ch01_q0005
  const match = id.match(/^([a-z]+)_c(\d+)_ch(\d+)_q(\d+)$/i)
  if (!match) return null

  const [, rawSubj, rawClass, rawCh, rawQ] = match
  const classNumber = parseInt(rawClass, 10)
  const questionIndex = parseInt(rawQ, 10)

  let subjectCode: SubjectCode = 'science'
  const s = rawSubj.toLowerCase()
  if (s === 'math') subjectCode = 'math'
  else if (s === 'sci') subjectCode = 'science'
  else if (s === 'eng') subjectCode = 'english'
  else if (s === 'hin') subjectCode = 'hindi'
  else if (s === 'soc') subjectCode = 'social_science'

  const chapterId = `${s}_c${rawClass}_ch${rawCh}`

  return {
    subjectCode,
    classNumber,
    chapterId,
    questionIndex,
    boardCode: defaultBoard,
  }
}

export function resolveQuestionById(id: string, boardCode: BoardCode = 'CBSE'): UniversalQuestion | null {
  const parsed = parseQuestionId(id, boardCode)
  if (!parsed) return null

  try {
    return generateUniversalQuestion(
      parsed.subjectCode,
      parsed.classNumber,
      parsed.chapterId,
      parsed.questionIndex,
      parsed.boardCode
    )
  } catch (err) {
    console.error(`Error resolving question ${id}:`, err)
    return null
  }
}
