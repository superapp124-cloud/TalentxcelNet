export type QuestionQualityTier =
  | 'parameterized_core'
  | 'template_canonical'
  | 'template_repetitive'
  | 'deep_long_tail'
  | 'invalid'

export interface QuestionSeoClassification {
  index: boolean
  follow: boolean
  tier: QuestionQualityTier
  reason: string
}

export interface ClassifiableQuestionInput {
  id: string
  subjectCode?: string
  chapterId?: string
  questionIndex?: number
  classNumber?: number
}

/**
 * Maximum indexed depth per chapter for subjects with randomized numeric variations
 * (Math, Physics, Chemistry). Keeps ~11k genuinely distinct parameterized pages indexable
 * while protecting crawl budget across 106k+ URLs.
 */
export const PARAMETERIZED_INDEX_DEPTH = 25

/**
 * Maximum indexed depth per chapter for subjects using finite modulo concept templates
 * (Biology, English, Hindi, Social Science). Keeps unique topic/template pairs indexable
 * while noindexing exact/near-duplicate modulo cycles.
 */
export const TEMPLATE_INDEX_DEPTH = 4

function extractQuestionIndex(id: string, explicitIndex?: number): number {
  if (typeof explicitIndex === 'number' && Number.isFinite(explicitIndex) && explicitIndex > 0) {
    return explicitIndex
  }
  const match = id.match(/_q(\d+)$/i)
  return match ? parseInt(match[1], 10) : 1
}

function isSeniorBiologyChapter(id: string): boolean {
  // Based on packages/core/src/universal-engine/taxonomies.ts
  const match = id.match(/^sci_c(9|10|11|12)_ch(\d+)/i)
  if (!match) return false
  const cls = parseInt(match[1], 10)
  const ch = parseInt(match[2], 10)
  if (cls === 9) return ch >= 10 && ch <= 12
  if (cls === 10) return (ch >= 5 && ch <= 8) || ch === 13
  if (cls === 11 || cls === 12) return ch >= 13 && ch <= 15
  return false
}

function hasTemplateModulusGenerator(id: string, subjectCode?: string): boolean {
  const lowerId = id.toLowerCase()
  if (
    subjectCode === 'english' ||
    subjectCode === 'hindi' ||
    subjectCode === 'social_science' ||
    lowerId.startsWith('eng_') ||
    lowerId.startsWith('hin_') ||
    lowerId.startsWith('sst_')
  ) {
    return true
  }
  return isSeniorBiologyChapter(lowerId)
}

/**
 * Deterministically classifies a `/question/[id]` URL for search-engine indexing.
 * Every valid page still renders `200 OK` with full solver UX and internal links,
 * while low-uniqueness template variants receive `noindex, follow` to prevent crawl dilution.
 */
export function classifyQuestionSeoQuality(
  question: ClassifiableQuestionInput | null | undefined
): QuestionSeoClassification {
  if (!question || !question.id) {
    return {
      index: false,
      follow: true,
      tier: 'invalid',
      reason: 'Missing or unresolvable question ID',
    }
  }

  const questionIndex = extractQuestionIndex(question.id, question.questionIndex)

  if (hasTemplateModulusGenerator(question.id, question.subjectCode)) {
    if (questionIndex <= TEMPLATE_INDEX_DEPTH) {
      return {
        index: true,
        follow: true,
        tier: 'template_canonical',
        reason: `Canonical topic-template sample (q${questionIndex} <= ${TEMPLATE_INDEX_DEPTH})`,
      }
    }
    return {
      index: false,
      follow: true,
      tier: 'template_repetitive',
      reason: `Repeated modulo-cycled template variant (q${questionIndex} > ${TEMPLATE_INDEX_DEPTH})`,
    }
  }

  if (questionIndex <= PARAMETERIZED_INDEX_DEPTH) {
    return {
      index: true,
      follow: true,
      tier: 'parameterized_core',
      reason: `Unique PRNG-parameterized problem (q${questionIndex} <= ${PARAMETERIZED_INDEX_DEPTH})`,
    }
  }

  return {
    index: false,
    follow: true,
    tier: 'deep_long_tail',
    reason: `Deep long-tail permutation beyond crawl-budget threshold (q${questionIndex} > ${PARAMETERIZED_INDEX_DEPTH})`,
  }
}
