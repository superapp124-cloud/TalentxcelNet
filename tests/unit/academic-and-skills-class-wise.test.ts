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

describe('Class-Wise Real-Life Skill Development Tracks (Classes 4–9)', () => {
  it('covers all 8 practical real-life skill tracks across Classes 4–9', () => {
    for (let c = 4; c <= 9; c++) {
      const tracks = getClassSkillTracks(c)
      expect(tracks.length).toBe(8)

      const trackIds = tracks.map((t) => t.id)
      expect(trackIds).toEqual([
        'track_life_independence',
        'track_life_communication',
        'track_life_money_management',
        'track_life_safety_health',
        'track_life_critical_thinking',
        'track_life_social_teamwork',
        'track_life_study_skills',
        'track_life_citizenship_community',
      ])
    }
  })

  it('calibrates learning across 3 developmental stages (Classes 4–5, 6–7, 8–9)', () => {
    // Stage 1: Foundation & Guided Practice (Classes 4–5)
    expect(getSkillStage(4).lifeSkillStage).toBe('foundation_guided')
    expect(getSkillStage(5).lifeSkillStage).toBe('foundation_guided')

    // Stage 2: Developing Independence & Decision-Making (Classes 6–7)
    expect(getSkillStage(6).lifeSkillStage).toBe('developing_independence')
    expect(getSkillStage(7).lifeSkillStage).toBe('developing_independence')

    // Stage 3: Applied Responsibility & Real-World Readiness (Classes 8–9)
    expect(getSkillStage(8).lifeSkillStage).toBe('applied_responsibility')
    expect(getSkillStage(9).lifeSkillStage).toBe('applied_responsibility')
  })

  it('provides all 8 pedagogical learning elements for every track across all classes', () => {
    for (let c = 4; c <= 9; c++) {
      const tracks = getClassSkillTracks(c)
      for (const track of tracks) {
        // 1. Why it matters
        expect(track.whyItMatters.length).toBeGreaterThan(15)

        // 2. Relatable everyday scenario
        expect(track.realLifeScenario.length).toBeGreaterThan(20)

        // 3. Guided worked example
        expect(track.workedExample.title.length).toBeGreaterThan(5)
        expect(track.workedExample.scenario.length).toBeGreaterThan(10)
        expect(track.workedExample.steps.length).toBeGreaterThanOrEqual(3)
        expect(track.workedExample.takeaway.length).toBeGreaterThan(10)

        // 4. Safe practical activity
        expect(track.practicalActivity.title.length).toBeGreaterThan(5)
        expect(track.practicalActivity.instructions.length).toBeGreaterThanOrEqual(3)
        expect(track.practicalActivity.safeCheckNote.length).toBeGreaterThan(10)
        expect(track.practicalActivity.deliverableDescription.length).toBeGreaterThan(5)

        // 5. Reflection exercise
        expect(track.reflectionExercise.promptQuestion.length).toBeGreaterThan(10)
        expect(track.reflectionExercise.guidingPoints.length).toBeGreaterThanOrEqual(2)

        // 6. Validated assessment with reasoning
        expect(track.assessment.question.length).toBeGreaterThan(10)
        expect(track.assessment.options.length).toBe(4)
        expect(track.assessment.correctOptionId).toBeDefined()
        const correctOpt = track.assessment.options.find((o) => o.id === track.assessment.correctOptionId)
        expect(correctOpt).toBeDefined()
        expect(correctOpt?.isCorrect).toBe(true)

        // 7. 4-week module roadmap
        expect(track.weeklyModules.length).toBe(4)
        for (const mod of track.weeklyModules) {
          expect(mod.weekNumber).toBeGreaterThan(0)
          expect(mod.title.length).toBeGreaterThan(3)
          expect(mod.objective.length).toBeGreaterThan(5)
          expect(mod.deliverable.length).toBeGreaterThan(3)
        }

        // 8. Capstone project
        expect(track.capstoneProject.id).toBeDefined()
        expect(track.capstoneProject.title.length).toBeGreaterThan(5)
        expect(track.capstoneProject.rubricCriteria.length).toBeGreaterThanOrEqual(3)
      }
    }
  })

  it('resolves capstone projects by ID and filters by class', () => {
    const projCl4 = getSkillProjectById('proj_indep_c4')
    expect(projCl4).toBeDefined()
    expect(projCl4?.trackId).toBe('track_life_independence')
    expect(projCl4?.classNumber).toBe(4)
    expect(projCl4?.rubricCriteria.length).toBeGreaterThanOrEqual(3)

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

  it('strictly verifies zero Japanese/Chinese heritage frameworks and zero coding/robotics in Classes 4–9', () => {
    const prohibitedKeywords = [
      'Kaizen',
      '改善',
      'Monozukuri',
      'ものづくり',
      'Soroban',
      'そろばん',
      'Kishōtenketsu',
      '起承転結',
      '5S 原則',
      '信息学奥赛',
      'Python',
      'Scratch',
      'C++',
      'TypeScript',
      'microcontroller',
      'robotics kit',
      'prompt engineering',
      'neural network',
    ]

    for (let c = 4; c <= 9; c++) {
      const tracks = getClassSkillTracks(c)
      for (const track of tracks) {
        // Assert no easternHeritage property
        expect((track as unknown as Record<string, unknown>).easternHeritage).toBeUndefined()

        // Check text content for prohibited technical/language concepts
        const textPayload = JSON.stringify(track).toLowerCase()
        for (const kw of prohibitedKeywords) {
          expect(
            textPayload.includes(kw.toLowerCase()),
            `Class ${c} track ${track.id} must not contain "${kw}"`
          ).toBe(false)
        }
      }
    }
  })
})


