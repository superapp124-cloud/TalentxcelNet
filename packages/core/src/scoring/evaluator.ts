import type {
  AuthorizedQuestion,
  ConfidentialQuestionSolution,
  SubmittedAnswer,
  AssessmentBlueprint,
  AssessmentResult,
  QuestionEvaluation,
} from '../types'

export interface ScoringPayload {
  attemptId: string
  blueprint: AssessmentBlueprint
  learnerId: string
  questions: AuthorizedQuestion[]
  solutions: Map<string, ConfidentialQuestionSolution>
  submittedAnswers: SubmittedAnswer[]
  topicsMap?: Map<string, string> // topicId -> topicName
}

/**
 * Server-Authoritative Assessment Evaluator
 * Enforces negative-marking rules, strict question-solution matching,
 * time audits, accuracy metrics, and weak-area identification.
 */
export function evaluateAssessmentAttempt(payload: ScoringPayload): AssessmentResult {
  const {
    attemptId,
    blueprint,
    learnerId,
    questions,
    solutions,
    submittedAnswers,
    topicsMap = new Map(),
  } = payload

  const answersMap = new Map<string, SubmittedAnswer>()
  for (const ans of submittedAnswers) {
    answersMap.set(ans.questionId, ans)
  }

  let totalScore = 0
  let correctCount = 0
  let incorrectCount = 0
  let unattemptedCount = 0
  let totalTimeSpent = 0

  const topicStats = new Map<string, { total: number; correct: number }>()
  const evaluations: QuestionEvaluation[] = []

  for (const q of questions) {
    const solution = solutions.get(q.id)
    if (!solution) {
      throw new Error(`Integrity error: confidential solution missing for question ID ${q.id}`)
    }

    const answer = answersMap.get(q.id)
    const topicId = q.topicId
    const currentTopicStat = topicStats.get(topicId) || { total: 0, correct: 0 }
    currentTopicStat.total += 1

    if (!answer || (!answer.selectedOptionIds?.length && answer.numericValue === undefined)) {
      // Unattempted
      unattemptedCount += 1
      evaluations.push({
        questionId: q.id,
        isCorrect: false,
        marksAwarded: 0,
        marksDeducted: 0,
        timeSpentSeconds: answer?.timeSpentSeconds || 0,
        userAnswer: [],
        correctAnswer: solution.correctOptionIds,
        explanation: solution.explanation,
        keyPoint: solution.keyPoint,
        solutionSteps: solution.solutionSteps,
      })
      topicStats.set(topicId, currentTopicStat)
      continue
    }

    totalTimeSpent += answer.timeSpentSeconds || 0

    // Check correctness
    let isCorrect = false
    if (q.questionType === 'single_choice' || q.questionType === 'true_false') {
      const selected = answer.selectedOptionIds?.[0]
      const expected = solution.correctOptionIds[0]
      isCorrect = Boolean(selected && expected && selected === expected)
    } else if (q.questionType === 'multi_select') {
      const selectedSet = new Set(answer.selectedOptionIds || [])
      const expectedSet = new Set(solution.correctOptionIds)
      isCorrect =
        selectedSet.size === expectedSet.size &&
        [...selectedSet].every((opt) => expectedSet.has(opt))
    } else if (q.questionType === 'numeric') {
      if (solution.numericTolerance && answer.numericValue !== undefined) {
        isCorrect =
          answer.numericValue >= solution.numericTolerance.min &&
          answer.numericValue <= solution.numericTolerance.max
      }
    }

    let marksAwarded = 0
    let marksDeducted = 0

    if (isCorrect) {
      marksAwarded = q.marks
      correctCount += 1
      currentTopicStat.correct += 1
      totalScore += marksAwarded
    } else {
      incorrectCount += 1
      if (q.negativeMarkingRatio > 0) {
        marksDeducted = q.marks * q.negativeMarkingRatio
        totalScore -= marksDeducted
      }
    }

    topicStats.set(topicId, currentTopicStat)

    evaluations.push({
      questionId: q.id,
      isCorrect,
      marksAwarded,
      marksDeducted,
      timeSpentSeconds: answer.timeSpentSeconds || 0,
      userAnswer: answer.selectedOptionIds || (answer.numericValue !== undefined ? [String(answer.numericValue)] : []),
      correctAnswer: solution.correctOptionIds,
      explanation: solution.explanation,
      keyPoint: solution.keyPoint,
      solutionSteps: solution.solutionSteps,
    })
  }

  // Prevent negative total scores
  const scoreObtained = Math.max(0, Math.round(totalScore * 100) / 100)
  const percentage = blueprint.totalMarks > 0
    ? Math.round((scoreObtained / blueprint.totalMarks) * 1000) / 10
    : 0

  const passed = percentage >= blueprint.passingPercentage
  const attemptedCount = correctCount + incorrectCount
  const accuracyPercentage = attemptedCount > 0
    ? Math.round((correctCount / attemptedCount) * 1000) / 10
    : 0

  // Calculate weak topics (accuracy < 60%)
  const weakTopics: Array<{ topicId: string; topicName: string; accuracy: number }> = []
  for (const [topicId, stat] of topicStats.entries()) {
    const topicAccuracy = stat.total > 0 ? (stat.correct / stat.total) * 100 : 0
    if (topicAccuracy < 60) {
      weakTopics.push({
        topicId,
        topicName: topicsMap.get(topicId) || `Topic ${topicId}`,
        accuracy: Math.round(topicAccuracy),
      })
    }
  }

  // Pass credit reward
  const earnedPassCredits = passed ? blueprint.rewardCreditAmount : 0

  return {
    attemptId,
    blueprintId: blueprint.id,
    learnerId,
    scoreObtained,
    maxMarks: blueprint.totalMarks,
    percentage,
    passed,
    totalQuestions: questions.length,
    correctCount,
    incorrectCount,
    unattemptedCount,
    accuracyPercentage,
    totalTimeSpentSeconds: totalTimeSpent,
    evaluatedAt: new Date().toISOString(),
    weakTopics,
    earnedPassCredits,
    evaluations,
  }
}
