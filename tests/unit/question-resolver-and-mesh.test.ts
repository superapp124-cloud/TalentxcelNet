import { describe, it, expect } from 'vitest'
import { parseQuestionId, resolveQuestionById } from '@/lib/seo/question-resolver'
import { getCurriculumChapters } from '@/packages/core/src'

describe('Question Resolver & Internal Link Multiplier Engine', () => {
  it('correctly parses various subject question IDs including math, sci, eng, hin, sst', () => {
    const mathParsed = parseQuestionId('math_c10_ch01_q0015')
    expect(mathParsed).not.toBeNull()
    expect(mathParsed?.subjectCode).toBe('math')
    expect(mathParsed?.classNumber).toBe(10)
    expect(mathParsed?.chapterId).toBe('math_c10_ch01')
    expect(mathParsed?.questionIndex).toBe(15)

    const sciParsed = parseQuestionId('sci_c10_ch02_q0005')
    expect(sciParsed).not.toBeNull()
    expect(sciParsed?.subjectCode).toBe('science')
    expect(sciParsed?.classNumber).toBe(10)

    const engParsed = parseQuestionId('eng_c9_ch01_q0020')
    expect(engParsed).not.toBeNull()
    expect(engParsed?.subjectCode).toBe('english')
    expect(engParsed?.classNumber).toBe(9)

    const hinParsed = parseQuestionId('hin_c10_ch01_q0003')
    expect(hinParsed).not.toBeNull()
    expect(hinParsed?.subjectCode).toBe('hindi')

    const sstParsed = parseQuestionId('sst_c10_ch01_q0007')
    expect(sstParsed).not.toBeNull()
    expect(sstParsed?.subjectCode).toBe('social_science')
  })

  it('resolves questions with full metadata, options and step-by-step solutions', () => {
    const q = resolveQuestionById('math_c10_ch01_q0001')
    expect(q).not.toBeNull()
    expect(q?.options.length).toBeGreaterThanOrEqual(4)
    expect(q?.solutionSteps.length).toBeGreaterThan(0)
    expect(q?.chapterTitle).toBeDefined()
    expect(q?.marks).toBeGreaterThanOrEqual(1)
  })

  it('generates curriculum chapters for cross-linking internal mesh', () => {
    const chapters = getCurriculumChapters(10, 'math', 'CBSE')
    expect(chapters.length).toBeGreaterThanOrEqual(10)
    expect(chapters[0].id).toBe('math_c10_ch01')
    expect(chapters[0].chapterNumber).toBe(1)
  })
})
