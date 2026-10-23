import { describe, it, expect } from 'vitest'
import { evaluateAssessmentAttempt } from './evaluator'
import {
  SEED_BLUEPRINT_MATH_C6,
  SEED_AUTHORIZED_QUESTIONS,
  SEED_CONFIDENTIAL_SOLUTIONS,
} from '../data/seed-catalog'
import type { SubmittedAnswer } from '../types'

describe('TalentXcel Core - Security & Server-Authoritative Scoring', () => {
  it('enforces strict question-key isolation: authorized questions do NOT contain answers', () => {
    for (const q of SEED_AUTHORIZED_QUESTIONS) {
      expect((q as any).correctOptionIds).toBeUndefined()
      expect((q as any).correct_option_ids).toBeUndefined()
      expect((q as any).explanation).toBeUndefined()
      expect(q.options.length).toBeGreaterThan(0)
    }
  })

  it('correctly scores a 100% accurate assessment attempt and awards ₹20 pass credit', () => {
    // Submit all correct answers
    const answers: SubmittedAnswer[] = SEED_AUTHORIZED_QUESTIONS.map((q) => {
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
      questions: SEED_AUTHORIZED_QUESTIONS,
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

    const questionsWithNegative = SEED_AUTHORIZED_QUESTIONS.map((q) => ({
      ...q,
      negativeMarkingRatio: 0.25,
    }))

    // 8 correct, 2 incorrect (Question marks = 2.0 each)
    // 8 * 2.0 = 16.0
    // 2 * (2.0 * 0.25) = 1.0 deduction
    // Expected score = 15.0
    const answers: SubmittedAnswer[] = SEED_AUTHORIZED_QUESTIONS.map((q, idx) => {
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
    const answers: SubmittedAnswer[] = SEED_AUTHORIZED_QUESTIONS.map((q, idx) => {
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
      questions: SEED_AUTHORIZED_QUESTIONS,
      solutions: SEED_CONFIDENTIAL_SOLUTIONS,
      submittedAnswers: answers,
      topicsMap: new Map([
        ['top_g4_m6_1', 'Concept of Multiples'],
        ['top_g4_m6_2', 'Properties of Multiples'],
        ['top_g4_m6_3', 'Common Multiples'],
      ]),
    })

    expect(result.passed).toBe(false) // 40% < 60%
    expect(result.earnedPassCredits).toBe(0)
    expect(result.weakTopics.length).toBeGreaterThan(0)
  })
})
