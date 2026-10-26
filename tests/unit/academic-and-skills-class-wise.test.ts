import { describe, it, expect } from 'vitest'
import {
  ACADEMIC_CLASSES,
  ACADEMIC_PASS_PRODUCTS,
  getCurriculumChapters,
  getAcademicLessonForChapter,
  getChapterDiagnosticTest,
  getClassSkillTracks,
  getSkillStage,
  getSkillProjectById,
  getAllClassProjects,
  SKILL_STUDIO_PLANS,
} from '../../packages/core/src'

describe('Class-Wise Academic Learning Engine (Classes 4–12)', () => {
  it('covers all 9 academic classes from Class 4 through Class 12 with age-calibrated stages', () => {
    expect(ACADEMIC_CLASSES.length).toBe(9)
    const classNums = ACADEMIC_CLASSES.map((c) => c.classNumber)
    expect(classNums).toEqual([4, 5, 6, 7, 8, 9, 10, 11, 12])

    // Verify stage allocations
    expect(ACADEMIC_CLASSES.find((c) => c.classNumber === 4)?.stage).toBe('primary')
    expect(ACADEMIC_CLASSES.find((c) => c.classNumber === 7)?.stage).toBe('middle')
    expect(ACADEMIC_CLASSES.find((c) => c.classNumber === 10)?.stage).toBe('secondary')
    expect(ACADEMIC_CLASSES.find((c) => c.classNumber === 12)?.stage).toBe('senior_secondary')
  })

  it('resolves real curriculum chapters for every class across all subjects without dummy fallbacks', () => {
    const subjects = ['math', 'science', 'english', 'hindi', 'social_science']

    for (let c = 4; c <= 12; c++) {
      for (const subj of subjects) {
        const chapters = getCurriculumChapters(c, subj, 'CBSE')
        expect(chapters.length, `Class ${c} ${subj} must have chapters`).toBeGreaterThanOrEqual(10)

        for (const ch of chapters) {
          expect(ch.id).toBeDefined()
          expect(ch.title.length).toBeGreaterThan(3)
          expect(ch.topics.length).toBeGreaterThanOrEqual(2)
          expect(ch.targetQuestionCount).toBeGreaterThan(0)
        }
      }
    }
  })

  it('generates rich, pedagogical academic lessons with worked examples and formulas', () => {
    const testCases = [
      { classNum: 4, subj: 'math', chId: 'math_c4_ch01' },
      { classNum: 7, subj: 'science', chId: 'sci_c7_ch03' },
      { classNum: 10, subj: 'english', chId: 'eng_c10_ch01' },
      { classNum: 10, subj: 'hindi', chId: 'hin_c10_ch01' },
      { classNum: 10, subj: 'social_science', chId: 'sst_c10_ch01' },
      { classNum: 12, subj: 'science', chId: 'sci_c12_ch01' },
    ]

    for (const tc of testCases) {
      const lesson = getAcademicLessonForChapter(tc.classNum, tc.subj, tc.chId, 'CBSE')
      expect(lesson.title.length).toBeGreaterThan(5)
      expect(lesson.conceptBreakdown.length).toBeGreaterThanOrEqual(2)
      expect(lesson.workedExamples.length).toBeGreaterThanOrEqual(1)
      expect(lesson.revisionNotes.length).toBeGreaterThanOrEqual(2)
      expect(lesson.keyFormulasOrRules.length).toBeGreaterThanOrEqual(2)
      expect(lesson.textbookCitation.length).toBeGreaterThan(5)
      expect(lesson.linkedBlueprintId).toBeDefined()
    }
  })

  it('builds 5-question chapter diagnostic assessments with matching solutions', () => {
    const { blueprint, questions, solutions } = getChapterDiagnosticTest(10, 'science', 'sci_c10_ch01', 'CBSE', 5)
    expect(blueprint.totalQuestions).toBe(5)
    expect(questions.length).toBe(5)
    expect(solutions.length).toBe(5)

    for (let i = 0; i < 5; i++) {
      const q = questions[i]
      const s = solutions[i]
      expect(q.id).toBe(s.questionId)
      expect(q.options.length).toBe(4)
      expect(s.correctOptionIds.length).toBe(1)
      expect(s.solutionSteps.length).toBeGreaterThan(0)
    }
  })

  it('provides 4 distinct tiered academic class passes with transparent pricing', () => {
    expect(ACADEMIC_PASS_PRODUCTS.length).toBe(4)
    const prices = ACADEMIC_PASS_PRODUCTS.map((p) => p.basePriceRupees)
    expect(prices).toEqual([1999, 2999, 3999, 5199])
  })
})

describe('Class-Wise 8 Skill Development Tracks (Classes 4–12)', () => {
  it('covers all 8 distinct skill tracks across every grade', () => {
    const sampleClasses = [4, 6, 8, 10, 12]

    for (const c of sampleClasses) {
      const tracks = getClassSkillTracks(c)
      expect(tracks.length).toBe(8)

      const trackIds = tracks.map((t) => t.id)
      expect(trackIds).toEqual([
        'track_ai_automation',
        'track_coding_computation',
        'track_math_problem_solving',
        'track_robotics_engineering',
        'track_design_production',
        'track_communication_collab',
        'track_entrepreneurship_fin',
        'track_digital_vocational',
      ])
    }
  })

  it('calibrates tools, outcomes, and capstones based on student age bracket', () => {
    // Junior (Class 4)
    const cl4Coding = getClassSkillTracks(4).find((t) => t.id === 'track_coding_computation')!
    expect(cl4Coding.tools).toContain('Scratch 3.0')
    expect(cl4Coding.level).toBe('foundation')
    expect(cl4Coding.capstoneProject.difficulty).toBe('easy')

    // Middle (Class 8)
    const cl8Coding = getClassSkillTracks(8).find((t) => t.id === 'track_coding_computation')!
    expect(cl8Coding.tools).toContain('Python 3.12')
    expect(cl8Coding.level).toBe('intermediate')

    // Secondary (Class 10)
    const cl10AI = getClassSkillTracks(10).find((t) => t.id === 'track_ai_automation')!
    expect(cl10AI.tools).toContain('Python 3.12')
    expect(cl10AI.classSpecificTitle).toContain('Retrieval-Augmented')
    expect(cl10AI.capstoneProject.difficulty).toBe('hard')

    // Senior (Class 12)
    const cl12Coding = getClassSkillTracks(12).find((t) => t.id === 'track_coding_computation')!
    expect(cl12Coding.tools).toContain('TypeScript')
    expect(cl12Coding.tools).toContain('Next.js / React')
  })

  it('provides 4-week structured module roadmaps for every track and class', () => {
    for (let c = 4; c <= 12; c++) {
      const tracks = getClassSkillTracks(c)
      for (const track of tracks) {
        expect(track.weeklyModules.length).toBeGreaterThanOrEqual(4)
        for (const mod of track.weeklyModules) {
          expect(mod.weekNumber).toBeGreaterThan(0)
          expect(mod.title.length).toBeGreaterThan(3)
          expect(mod.objective.length).toBeGreaterThan(5)
          expect(mod.deliverable.length).toBeGreaterThan(3)
        }
      }
    }
  })

  it('resolves capstone projects by ID and filters by class', () => {
    const projCl10 = getSkillProjectById('proj_ai_c10')
    expect(projCl10).toBeDefined()
    expect(projCl10?.trackId).toBe('track_ai_automation')
    expect(projCl10?.classNumber).toBe(10)
    expect(projCl10?.rubricCriteria.length).toBeGreaterThanOrEqual(3)

    const allCl7Projects = getAllClassProjects(7)
    expect(allCl7Projects.length).toBe(8)
    for (const p of allCl7Projects) {
      expect(p.classNumber).toBe(7)
    }
  })

  it('provides 3 tiered Skill Studio subscription plans', () => {
    expect(SKILL_STUDIO_PLANS.length).toBe(3)
    const prices = SKILL_STUDIO_PLANS.map((p) => p.basePriceRupees)
    expect(prices).toEqual([999, 2499, 4999])
  })
})
