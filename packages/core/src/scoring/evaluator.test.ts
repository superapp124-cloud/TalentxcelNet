import { describe, it, expect } from 'vitest'
import { evaluateAssessmentAttempt } from './evaluator'
import {
  SEED_BLUEPRINT_MATH_C6,
  SEED_AUTHORIZED_QUESTIONS,
  SEED_CONFIDENTIAL_SOLUTIONS,
  computeQuestionFingerprint,
  getPipelineCoverageReport,
  buildLearnerAnalyticsSummary,
} from '../data/seed-catalog'
import type { SubmittedAnswer } from '../types'

describe('TalentXcel Core - Security & Server-Authoritative Scoring', () => {
  const grade4MathQuestions = SEED_AUTHORIZED_QUESTIONS.filter((q) => q.id.startsWith('q_g4_m6_'))

  it('enforces strict question-key isolation: authorized questions do NOT contain answers', () => {
    for (const q of SEED_AUTHORIZED_QUESTIONS) {
      expect((q as any).correctOptionIds).toBeUndefined()
      expect((q as any).correct_option_ids).toBeUndefined()
      expect((q as any).explanation).toBeUndefined()
      expect(q.options.length).toBeGreaterThan(0)
    }
  })

  it('correctly scores a 100% accurate assessment attempt and awards ₹20 pass credit', () => {
    // Submit all correct answers for the 10 Grade 4 Math questions
    const answers: SubmittedAnswer[] = grade4MathQuestions.map((q) => {
      const solution = SEED_CONFIDENTIAL_SOLUTIONS.get(q.id)!
      return {
        questionId: q.id,
        selectedOptionIds: solution.correctOptionIds,
        timeSpentSeconds: 30,
      }
    })

    const result = evaluateAssessmentAttempt({
      attemptId: 'att_test_100',
      blueprint: SEED_BLUEPRINT_MATH_C6,
      learnerId: 'learner_1',
      questions: grade4MathQuestions,
      solutions: SEED_CONFIDENTIAL_SOLUTIONS,
      submittedAnswers: answers,
    })

    expect(result.scoreObtained).toBe(20)
    expect(result.maxMarks).toBe(20)
    expect(result.percentage).toBe(100)
    expect(result.passed).toBe(true)
    expect(result.correctCount).toBe(10)
    expect(result.incorrectCount).toBe(0)
    expect(result.accuracyPercentage).toBe(100)
    expect(result.earnedPassCredits).toBe(20) // ₹20 Pass credit reward
    expect(result.weakTopics.length).toBe(0)
  })

  it('correctly deducts negative marks when negative marking ratio is applied', () => {
    const blueprintWithNegative = {
      ...SEED_BLUEPRINT_MATH_C6,
      negativeMarkingRatio: 0.25, // 25% negative marking
    }

    const questionsWithNegative = grade4MathQuestions.map((q) => ({
      ...q,
      negativeMarkingRatio: 0.25,
    }))

    // 8 correct, 2 incorrect (Question marks = 2.0 each)
    // 8 * 2.0 = 16.0
    // 2 * (2.0 * 0.25) = 1.0 deduction
    // Expected score = 15.0
    const answers: SubmittedAnswer[] = grade4MathQuestions.map((q, idx) => {
      const solution = SEED_CONFIDENTIAL_SOLUTIONS.get(q.id)!
      return {
        questionId: q.id,
        selectedOptionIds: idx >= 8 ? ['wrong_option'] : solution.correctOptionIds,
        timeSpentSeconds: 25,
      }
    })

    const result = evaluateAssessmentAttempt({
      attemptId: 'att_test_neg',
      blueprint: blueprintWithNegative,
      learnerId: 'learner_1',
      questions: questionsWithNegative,
      solutions: SEED_CONFIDENTIAL_SOLUTIONS,
      submittedAnswers: answers,
    })

    expect(result.scoreObtained).toBe(15)
    expect(result.correctCount).toBe(8)
    expect(result.incorrectCount).toBe(2)
    expect(result.accuracyPercentage).toBe(80)
  })

  it('identifies weak topics when accuracy falls below 60%', () => {
    // Submit only 4 correct answers out of 10
    const answers: SubmittedAnswer[] = grade4MathQuestions.map((q, idx) => {
      const solution = SEED_CONFIDENTIAL_SOLUTIONS.get(q.id)!
      return {
        questionId: q.id,
        selectedOptionIds: idx < 4 ? solution.correctOptionIds : ['opt_wrong'],
        timeSpentSeconds: 20,
      }
    })

    const result = evaluateAssessmentAttempt({
      attemptId: 'att_test_weak',
      blueprint: SEED_BLUEPRINT_MATH_C6,
      learnerId: 'learner_1',
      questions: grade4MathQuestions,
      solutions: SEED_CONFIDENTIAL_SOLUTIONS,
      submittedAnswers: answers,
      topicsMap: new Map([
        ['top_g4_m6_1', 'Concept of Multiples'],
        ['top_g4_m6_2', 'Properties of Multiples'],
        ['top_g4_m6_3', 'Common Multiples'],
      ]),
    })

    expect(result.passed).toBe(false) // 40% < 60%
    expect(result.weakTopics.length).toBeGreaterThan(0)
    expect(result.earnedPassCredits).toBe(0)
  })

  it('pipeline fingerprinting identifies duplicates deterministically', () => {
    const q1 = 'Which of the following numbers is a multiple of 6?'
    const opts = [{ text: '14' }, { text: '18' }, { text: '20' }, { text: '22' }]
    const fp1 = computeQuestionFingerprint(q1, 4, 'math', opts)

    // Same text and options with whitespace or casing difference
    const q2 = 'which of the following numbers is a multiple of 6? '
    const fp2 = computeQuestionFingerprint(q2, 4, 'math', opts)

    expect(fp1).toBe(fp2)

    // Distinct question produces distinct fingerprint
    const fp3 = computeQuestionFingerprint('What is the 5th multiple of 9?', 4, 'math', opts)
    expect(fp1).not.toBe(fp3)
  })

  it('pipeline coverage report accurately reports 60,000 target and real unpadded counts', () => {
    const report = getPipelineCoverageReport()
    expect(report.targetTotalQuestions).toBe(60000)
    expect(report.actualPublishedCount).toBe(SEED_AUTHORIZED_QUESTIONS.length)
    expect(report.boardBreakdown.length).toBe(3) // CBSE, CISCE, IB
    expect(report.classBreakdown.length).toBe(10) // Classes 3-12
    expect(report.aptitudeBreakdown.length).toBe(6) // 6 Aptitude tracks
  })

  it('learner analytics aggregates real historical performance accurately', () => {
    const mockResult = evaluateAssessmentAttempt({
      attemptId: 'att_hist_1',
      blueprint: SEED_BLUEPRINT_MATH_C6,
      learnerId: 'learner_abc',
      questions: grade4MathQuestions,
      solutions: SEED_CONFIDENTIAL_SOLUTIONS,
      submittedAnswers: grade4MathQuestions.map((q) => ({
        questionId: q.id,
        selectedOptionIds: SEED_CONFIDENTIAL_SOLUTIONS.get(q.id)!.correctOptionIds,
        timeSpentSeconds: 20,
      })),
    })

    const summary = buildLearnerAnalyticsSummary('learner_abc', 'Aarav Sharma', [mockResult])
    expect(summary.totalAttempts).toBe(1)
    expect(summary.totalQuestionsAttempted).toBe(10)
    expect(summary.overallAccuracyPercentage).toBe(100)
    expect(summary.totalPassCreditsEarned).toBe(20)
  })
})
