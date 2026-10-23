export type UserRole = 'learner' | 'guardian' | 'teacher' | 'admin'

export interface Profile {
  id: string
  email: string
  fullName: string
  role: UserRole
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface LearnerProfile {
  id: string
  guardianId: string
  displayName: string
  currentClassId: string
  schoolName?: string
  avatarUrl?: string
  createdAt: string
}

export interface CurriculumBoard {
  id: string
  code: string // 'CBSE' | 'ICSE' | 'STATE' | 'COMPETITIVE'
  name: string
  country: string
}

export interface AcademicClass {
  id: string
  boardId: string
  gradeNumber: number // 3, 4, 8, 9, 10, 11, 12
  code: string // 'class-3', 'class-4'
  name: string // 'Class 3', 'Grade IV'
}

export interface Subject {
  id: string
  classId: string
  code: string // 'math', 'science', 'english', 'hindi', 'social_science'
  name: string
  colorTheme: 'amber' | 'emerald' | 'blue' | 'pink' | 'purple' | 'indigo'
  iconName: string
  totalTests: number
  completedTests: number
}

export interface Chapter {
  id: string
  subjectId: string
  chapterNumber: number
  title: string
  description?: string
  totalTopics: number
}

export interface Topic {
  id: string
  chapterId: string
  title: string
  syllabusReference?: string
}

export type QuestionType = 'single_choice' | 'multi_select' | 'numeric' | 'true_false'

export interface QuestionOption {
  id: string
  label: string // 'A', 'B', 'C', 'D'
  text: string
  mediaUrl?: string
}

/**
 * CLIENT-AUTHORIZED QUESTION PAYLOAD
 * Security Notice: This object is NEVER allowed to contain correct answers or explanations.
 */
export interface AuthorizedQuestion {
  id: string
  topicId: string
  questionType: QuestionType
  questionText: string
  options: QuestionOption[]
  mediaPath?: string
  marks: number
  negativeMarkingRatio: number // e.g. 0.0 for school tests, 0.25 for JEE/NEET
  difficulty: 'easy' | 'medium' | 'hard'
  language: 'en' | 'hi'
}

/**
 * CONFIDENTIAL SOLUTION PAYLOAD
 * Strictly isolated in the database backend. Never returned during active attempts.
 */
export interface ConfidentialQuestionSolution {
  questionId: string
  correctOptionIds: string[]
  numericTolerance?: { min: number; max: number }
  solutionSteps: string[]
  explanation: string
  keyPoint?: string
  reviewStatus: 'verified' | 'draft' | 'flagged'
}

export interface AssessmentBlueprint {
  id: string
  title: string
  subjectId: string
  chapterId?: string
  durationMinutes: number
  totalQuestions: number
  totalMarks: number
  negativeMarkingRatio: number
  passingPercentage: number
  rewardCreditAmount: number // e.g. ₹20 pass credit reward
  examType: 'periodic_test' | 'unit_test' | 'mock_exam' | 'topic_practice'
}

export interface SubmittedAnswer {
  questionId: string
  selectedOptionIds?: string[]
  numericValue?: number
  timeSpentSeconds: number
}

export interface QuestionEvaluation {
  questionId: string
  isCorrect: boolean
  marksAwarded: number
  marksDeducted: number
  timeSpentSeconds: number
  userAnswer: string[]
  correctAnswer: string[]
  explanation: string
  keyPoint?: string
  solutionSteps: string[]
}

export interface AssessmentResult {
  attemptId: string
  blueprintId: string
  learnerId: string
  scoreObtained: number
  maxMarks: number
  percentage: number
  passed: boolean
  totalQuestions: number
  correctCount: number
  incorrectCount: number
  unattemptedCount: number
  accuracyPercentage: number
  totalTimeSpentSeconds: number
  evaluatedAt: string
  weakTopics: Array<{ topicId: string; topicName: string; accuracy: number }>
  earnedPassCredits: number
  evaluations: QuestionEvaluation[]
}

export type EntitlementType = 'single_assessment' | 'monthly_sub' | 'annual_sub' | 'pass_credit'

export interface Entitlement {
  id: string
  userId: string
  learnerId?: string
  entitlementType: EntitlementType
  referenceId: string // blueprint_id or subscription_id
  isActive: boolean
  expiresAt?: string
  createdAt: string
}

export type LedgerEntryType = 'CREDIT_EARNED_PASS' | 'CREDIT_SPENT_TEST' | 'CREDIT_REFUND' | 'CREDIT_EXPIRED'

export interface CreditLedgerEntry {
  id: string
  userId: string
  learnerId?: string
  amount: number // in Rupees, positive or negative
  entryType: LedgerEntryType
  referenceId: string // e.g. attempt_id or order_id
  idempotencyKey: string
  balanceAfter: number
  createdAt: string
}
