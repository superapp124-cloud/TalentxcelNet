import { describe, it, expect } from 'vitest'
import {
  MATH_CLASSES_TAXONOMY,
  generateMathQuestion,
  getMathQuestionsForClassAndChapter,
  getMathBankSummary,
} from '../../packages/core/src/math-engine'

describe('Mathematics Question Bank Engine (Classes 4-12)', () => {
  it('covers all 9 classes from Class 4 through Class 12', () => {
    expect(MATH_CLASSES_TAXONOMY.length).toBe(9)
    const classNumbers = MATH_CLASSES_TAXONOMY.map((c) => c.classNumber)
    expect(classNumbers).toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  it('provides between 30,000 and 40,000 Mathematics questions in the bank', () => {
    const summary = getMathBankSummary()
    expect(summary.totalQuestionsCount).toBeGreaterThanOrEqual(30000)
    expect(summary.totalQuestionsCount).toBeLessThanOrEqual(40000)
    expect(summary.totalQuestionsCount).toBe(36490)
    expect(summary.totalClassesCount).toBe(9)
  })

  it('allocates comprehensive chapters to each class with verified topics', () => {
    for (const classTaxonomy of MATH_CLASSES_TAXONOMY) {
      expect(classTaxonomy.chapters.length).toBeGreaterThanOrEqual(12)
      for (const chapter of classTaxonomy.chapters) {
        expect(chapter.id).toBeDefined()
        expect(chapter.title.length).toBeGreaterThan(3)
        expect(chapter.topics.length).toBeGreaterThanOrEqual(3)
        expect(chapter.targetQuestionCount).toBeGreaterThanOrEqual(250)
      }
    }
  })

  it('deterministically generates valid, formula-verified questions with 4 unique options for any class', () => {
    const testCases = [
      { classNum: 4, chapterId: 'math_c4_ch01', idx: 1 },
      { classNum: 5, chapterId: 'math_c5_ch06', idx: 15 },
      { classNum: 6, chapterId: 'math_c6_ch01', idx: 42 },
      { classNum: 7, chapterId: 'math_c7_ch04', idx: 88 },
      { classNum: 8, chapterId: 'math_c8_ch05', idx: 105 },
      { classNum: 9, chapterId: 'math_c9_ch01', idx: 150 },
      { classNum: 10, chapterId: 'math_c10_ch04', idx: 200 },
      { classNum: 11, chapterId: 'math_c11_ch06', idx: 75 },
      { classNum: 12, chapterId: 'math_c12_ch07', idx: 310 },
    ]

    for (const tc of testCases) {
      const q = generateMathQuestion(tc.classNum, tc.chapterId, tc.idx)
      expect(q.id).toBe(`${tc.chapterId}_q${String(tc.idx).padStart(4, '0')}`)
      expect(q.classNumber).toBe(tc.classNum)
      expect(q.subjectCode).toBe('math')
      expect(q.options.length).toBe(4)

      // Ensure all 4 option texts are unique
      const optionTexts = q.options.map((o) => o.text)
      const uniqueTexts = new Set(optionTexts)
      expect(uniqueTexts.size).toBe(4)

      // Verify correct option ID points to a valid option
      const matchingOption = q.options.find((o) => o.id === q.correctOptionId)
      expect(matchingOption).toBeDefined()

      // Verify step-by-step solution and explanation exist
      expect(q.solutionSteps.length).toBeGreaterThan(0)
      expect(q.explanation.length).toBeGreaterThan(5)
    }
  })

  it('produces identical questions when given the same seed index (deterministic reproducibility)', () => {
    const q1 = generateMathQuestion(10, 'math_c10_ch04', 42)
    const q2 = generateMathQuestion(10, 'math_c10_ch04', 42)

    expect(q1.questionText).toBe(q2.questionText)
    expect(q1.correctOptionId).toBe(q2.correctOptionId)
    expect(q1.options).toEqual(q2.options)
    expect(q1.explanation).toBe(q2.explanation)
  })

  it('supports paginated question fetching for classes and chapters', () => {
    const result = getMathQuestionsForClassAndChapter(10, 'math_c10_ch01', 0, 10)
    expect(result.questions.length).toBe(10)
    expect(result.total).toBe(330)
    expect(result.offset).toBe(0)
    expect(result.limit).toBe(10)

    const page2 = getMathQuestionsForClassAndChapter(10, 'math_c10_ch01', 10, 10)
    expect(page2.questions.length).toBe(10)
    expect(page2.questions[0].id).not.toBe(result.questions[0].id)
  })

  describe('API Authentication Gating (/api/questions/bank)', () => {
    it('strictly denies unauthenticated requests with HTTP 401 Unauthorized', async () => {
      const { GET } = await import('../../app/api/questions/bank/route')
      const req = new Request('http://localhost:3000/api/questions/bank?classNumber=10')
      const res = await GET(req)
      expect(res.status).toBe(401)

      const body = await res.json()
      expect(body.error).toBe('Authentication required')
      expect(body.message).toContain('strictly reserved for authenticated learners')
      expect(body.redirectTo).toBe('/auth/login?redirectTo=/dashboard/question-bank')
    })

    it('allows verified authenticated or E2E audit sessions to access questions', async () => {
      const { GET } = await import('../../app/api/questions/bank/route')
      const req = new Request('http://localhost:3000/api/questions/bank?classNumber=10&chapterId=math_c10_ch04&limit=5', {
        headers: {
          'x-e2e-audit': '1',
        },
      })
      const res = await GET(req)
      expect(res.status).toBe(200)

      const body = await res.json()
      expect(body.success).toBe(true)
      expect(body.classNumber).toBe(10)
      expect(body.chapterId).toBe('math_c10_ch04')
      expect(body.questions.length).toBe(5)
      expect(body.total).toBe(330)
      expect(body.summary.totalQuestionsCount).toBe(36490)
    })
  })
})
