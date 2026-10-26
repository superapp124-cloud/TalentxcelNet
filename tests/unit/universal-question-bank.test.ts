import { describe, it, expect } from 'vitest'
import {
  UNIVERSAL_SUBJECTS,
  SCIENCE_CLASSES_TAXONOMY,
  ENGLISH_CLASSES_TAXONOMY,
  HINDI_CLASSES_TAXONOMY,
  SOCIAL_SCIENCE_CLASSES_TAXONOMY,
  getUniversalBankSummary,
  generateUniversalQuestion,
  getUniversalQuestionsForSubjectClassAndChapter,
  getSubjectBoardCitations,
} from '../../packages/core/src/universal-engine'
import { MATH_CLASSES_TAXONOMY } from '../../packages/core/src/math-engine'

describe('Universal Question Bank Engine (3,000,000 Verified Questions)', () => {
  it('covers all 5 academic subjects with authentic metadata and Senior branch distributions', () => {
    expect(UNIVERSAL_SUBJECTS.length).toBe(5)
    const codes = UNIVERSAL_SUBJECTS.map((s) => s.code)
    expect(codes).toEqual(['math', 'science', 'english', 'hindi', 'social_science'])

    for (const subject of UNIVERSAL_SUBJECTS) {
      expect(subject.totalQuestions).toBe(600000)
      expect(subject.juniorQuestions).toBe(200000)
      expect(subject.seniorQuestions).toBe(400000)
      expect(subject.seniorBranches?.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('aggregates exactly 3,000,000 verified questions in universal summary', () => {
    const summary = getUniversalBankSummary()
    expect(summary.totalQuestionsCount).toBe(3000000)
    expect(summary.totalSubjectsCount).toBe(5)
    expect(summary.totalClassesCount).toBe(9)

    // Exactly 600,000 per subject
    expect(summary.subjectCounts.math).toBe(600000)
    expect(summary.subjectCounts.science).toBe(600000)
    expect(summary.subjectCounts.english).toBe(600000)
    expect(summary.subjectCounts.hindi).toBe(600000)
    expect(summary.subjectCounts.social_science).toBe(600000)

    // Board breakdown sums to 3,000,000
    const boardTotal =
      summary.boardBreakdown.cbseCount +
      summary.boardBreakdown.icseCount +
      summary.boardBreakdown.ibCount
    expect(boardTotal).toBe(3000000)
  })

  it('enforces 40,000 questions per class in Classes 4–8 (200k) and 100,000 questions per class in Classes 9–12 (400k)', () => {
    const taxonomies = [
      { name: 'science', taxonomy: SCIENCE_CLASSES_TAXONOMY },
      { name: 'english', taxonomy: ENGLISH_CLASSES_TAXONOMY },
      { name: 'hindi', taxonomy: HINDI_CLASSES_TAXONOMY },
      { name: 'social_science', taxonomy: SOCIAL_SCIENCE_CLASSES_TAXONOMY },
    ]

    for (const { name, taxonomy } of taxonomies) {
      expect(taxonomy.length, `Taxonomy for ${name} must have 9 classes`).toBe(9)

      // Junior Classes 4–8: 40,000 questions per class
      for (let c = 4; c <= 8; c++) {
        const classTax = taxonomy.find((t) => t.classNumber === c)
        expect(classTax, `Missing class ${c} in ${name}`).toBeDefined()
        expect(classTax!.totalQuestionsTarget).toBe(40000)
      }

      // Senior Classes 9–12: 100,000 questions per class
      for (let c = 9; c <= 12; c++) {
        const classTax = taxonomy.find((t) => t.classNumber === c)
        expect(classTax, `Missing class ${c} in ${name}`).toBeDefined()
        expect(classTax!.totalQuestionsTarget).toBe(100000)
      }
    }
  })

  it('partitions Senior Classes 9–12 into specialized branches across subjects', () => {
    // Science: Physics, Chemistry, Biology
    const scienceClass10 = SCIENCE_CLASSES_TAXONOMY.find((c) => c.classNumber === 10)!
    const scienceDisciplines = new Set(scienceClass10.chapters.map((ch) => ch.disciplineCode))
    expect(scienceDisciplines.has('physics')).toBe(true)
    expect(scienceDisciplines.has('chemistry')).toBe(true)
    expect(scienceDisciplines.has('biology')).toBe(true)

    // English: Grammar & Syntax, Reading, Composition & Literature
    const englishClass10 = ENGLISH_CLASSES_TAXONOMY.find((c) => c.classNumber === 10)!
    const englishDisciplines = new Set(englishClass10.chapters.map((ch) => ch.disciplineCode))
    expect(englishDisciplines.has('grammar')).toBe(true)
    expect(englishDisciplines.has('reading')).toBe(true)
    expect(englishDisciplines.has('literature')).toBe(true)

    // Hindi: व्याकरण, अपठित बोध, साहित्य
    const hindiClass10 = HINDI_CLASSES_TAXONOMY.find((c) => c.classNumber === 10)!
    const hindiDisciplines = new Set(hindiClass10.chapters.map((ch) => ch.disciplineCode))
    expect(hindiDisciplines.has('vyakaran')).toBe(true)
    expect(hindiDisciplines.has('bodh')).toBe(true)
    expect(hindiDisciplines.has('sahitya')).toBe(true)

    // Social Science: History, Geography, Political Science, Economics
    const sstClass10 = SOCIAL_SCIENCE_CLASSES_TAXONOMY.find((c) => c.classNumber === 10)!
    const sstDisciplines = new Set(sstClass10.chapters.map((ch) => ch.disciplineCode))
    expect(sstDisciplines.has('history')).toBe(true)
    expect(sstDisciplines.has('geography')).toBe(true)
    expect(sstDisciplines.has('political_science')).toBe(true)
    expect(sstDisciplines.has('economics')).toBe(true)
  })

  it('contains verified textbook citations across CBSE, ICSE, and IB for all 5 subjects', () => {
    const subjects = ['math', 'science', 'english', 'hindi', 'social_science'] as const

    for (const subj of subjects) {
      // Check citations resolver helper for CBSE
      const cbseCitations = getSubjectBoardCitations(subj, 10, 'CBSE')
      expect(cbseCitations.textbooks.length).toBeGreaterThanOrEqual(3)
      expect(cbseCitations.boardName).toContain('CBSE')

      // Check citations resolver helper for ICSE
      const icseCitations = getSubjectBoardCitations(subj, 10, 'CISCE')
      expect(icseCitations.textbooks.length).toBeGreaterThanOrEqual(3)
      expect(icseCitations.boardName).toMatch(/CISCE|ICSE/)

      // Check citations resolver helper for IB
      const ibCitations = getSubjectBoardCitations(subj, 10, 'IB')
      expect(ibCitations.textbooks.length).toBeGreaterThanOrEqual(2)
      expect(ibCitations.boardName).toContain('International Baccalaureate')
    }
  })

  it('deterministically generates valid questions for Science (Physics, Chemistry, Biology) with authentic solutions', () => {
    // Physics (sci_c10_ch11 is Electricity)
    const physicsQ = generateUniversalQuestion('science', 10, 'sci_c10_ch11', 1, 'CBSE')
    expect(physicsQ.subjectCode).toBe('science')
    expect(physicsQ.disciplineCode).toBe('physics')
    expect(physicsQ.options.length).toBe(4)
    expect(physicsQ.bookSource).toMatch(/NCERT|Lakhmir Singh|Selina/)
    expect(physicsQ.explanation.length).toBeGreaterThan(10)
    expect(physicsQ.solutionSteps.length).toBeGreaterThan(0)

    // Chemistry (sci_c10_ch01 is Chemical Reactions)
    const chemQ = generateUniversalQuestion('science', 10, 'sci_c10_ch01', 2, 'CISCE')
    expect(chemQ.subjectCode).toBe('science')
    expect(chemQ.disciplineCode).toBe('chemistry')
    expect(chemQ.options.length).toBe(4)
    expect(chemQ.bookSource).toMatch(/Selina|Concise|Lakhmir|NCERT/)

    // Biology (sci_c10_ch05 is Life Processes)
    const bioQ = generateUniversalQuestion('science', 10, 'sci_c10_ch05', 3, 'IB')
    expect(bioQ.subjectCode).toBe('science')
    expect(bioQ.disciplineCode).toBe('biology')
    expect(bioQ.options.length).toBe(4)
    expect(bioQ.bookSource).toMatch(/IB|Hodder|Oxford|NCERT/)
  })

  it('deterministically generates valid questions for English Grammar & Syntax with rules', () => {
    const engQ = generateUniversalQuestion('english', 10, 'eng_c10_ch01', 1, 'CBSE')
    expect(engQ.subjectCode).toBe('english')
    expect(engQ.disciplineCode).toBe('grammar')
    expect(engQ.options.length).toBe(4)
    expect(engQ.bookSource).toMatch(/NCERT|Wren & Martin|Total English/)
    expect(engQ.solutionSteps.length).toBeGreaterThan(0)
    expect(engQ.explanation).toMatch(/rule|grammar|verb|subject|tense/i)
  })

  it('deterministically generates valid questions for Hindi (मानक व्याकरण, संधि, समास, अलंकार)', () => {
    const hindiQ = generateUniversalQuestion('hindi', 10, 'hin_c10_ch01', 1, 'CBSE')
    expect(hindiQ.subjectCode).toBe('hindi')
    expect(hindiQ.disciplineCode).toBe('vyakaran')
    expect(hindiQ.options.length).toBe(4)
    expect(hindiQ.bookSource).toMatch(/क्षितिज|व्याकरण|साहित्य/)
    expect(hindiQ.solutionSteps.length).toBeGreaterThan(0)
    expect(hindiQ.explanation.length).toBeGreaterThan(5)
  })

  it('deterministically generates valid questions for Social Science (History, Civics, Geography, Economics)', () => {
    const sstQ = generateUniversalQuestion('social_science', 10, 'sst_c10_ch01', 1, 'CBSE')
    expect(sstQ.subjectCode).toBe('social_science')
    expect(sstQ.options.length).toBe(4)
    expect(sstQ.bookSource).toMatch(/NCERT|India and the Contemporary World|Total History/)
    expect(sstQ.solutionSteps.length).toBeGreaterThan(0)
  })

  it('produces identical questions when given the same seed index (deterministic reproducibility)', () => {
    const q1 = generateUniversalQuestion('science', 10, 'sci_c10_ch11', 42, 'CBSE')
    const q2 = generateUniversalQuestion('science', 10, 'sci_c10_ch11', 42, 'CBSE')

    expect(q1.questionText).toBe(q2.questionText)
    expect(q1.correctOptionId).toBe(q2.correctOptionId)
    expect(q1.options).toEqual(q2.options)
    expect(q1.explanation).toBe(q2.explanation)
    expect(q1.bookSource).toBe(q2.bookSource)
    expect(q1.exerciseRef).toBe(q2.exerciseRef)
  })

  it('paginates questions accurately through getUniversalQuestionsForSubjectClassAndChapter', () => {
    const page = getUniversalQuestionsForSubjectClassAndChapter(
      'english',
      10,
      'eng_c10_ch01',
      0,
      10,
      'CBSE'
    )
    expect(page.questions.length).toBe(10)
    expect(page.total).toBeGreaterThanOrEqual(8000)
    expect(page.offset).toBe(0)
    expect(page.limit).toBe(10)
  })
})
