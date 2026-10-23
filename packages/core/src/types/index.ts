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

export type SyllabusStatus = 'verified' | 'provisional' | 'not_available'

export interface CurriculumBoard {
  id: string
  code: string // 'CBSE' | 'CISCE' | 'IB' | 'STATE' | 'COMPETITIVE'
  name: string
  country: string
  status: SyllabusStatus
  curriculumVersion?: string
}

export interface AcademicClass {
  id: string
  boardId: string
  gradeNumber: number // 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  code: string // 'class-3', 'class-4', etc.
  name: string // 'Class 4', 'Grade X'
  status: SyllabusStatus
}

export interface Subject {
  id: string
  classId: string
  code: string // 'math', 'science', 'english', 'hindi', 'social_science', 'aptitude', 'physics', 'chemistry', 'biology'
  name: string
  colorTheme: 'amber' | 'emerald' | 'blue' | 'pink' | 'purple' | 'indigo' | 'cyan'
  iconName: string
  totalTests: number
  completedTests: number
  status: SyllabusStatus
  description?: string
}

export interface Chapter {
  id: string
  subjectId: string
  chapterNumber: number
  title: string
  description?: string
  totalTopics: number
  status: SyllabusStatus
}

export interface Topic {
  id: string
  chapterId: string
  title: string
  syllabusReference?: string
  status: SyllabusStatus
}

export type QuestionType =
  | 'single_choice'
  | 'multi_select'
  | 'numeric'
  | 'true_false'
  | 'assertion_reason'

export interface QuestionOption {
  id: string
  label: string // 'A', 'B', 'C', 'D'
  text: string
  mediaUrl?: string
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'olympiad'

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
  negativeMarkingRatio: number // e.g. 0.0 for school tests, 0.25 for competitive
  difficulty: DifficultyLevel
  language: 'en' | 'hi'
  boardCode?: string
  classNumber?: number
  subjectCode?: string
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
  distractorExplanations?: Record<string, string>
  reviewStatus: 'verified' | 'draft' | 'flagged'
}

export type AssessmentCategory = 'academic' | 'aptitude'

export type AptitudeCategory =
  | 'logical_reasoning'
  | 'quantitative_aptitude'
  | 'verbal_reasoning'
  | 'non_verbal_patterns'
  | 'data_interpretation'
  | 'critical_thinking'

export type AssessmentMode = 'diagnostic' | 'topic_practice' | 'mock_exam' | 'revision'

export interface AssessmentBlueprint {
  id: string
  title: string
  subjectId: string
  chapterId?: string
  topicId?: string
  durationMinutes: number
  totalQuestions: number
  totalMarks: number
  negativeMarkingRatio: number
  passingPercentage: number
  rewardCreditAmount: number // e.g. ₹20 pass credit reward
  examType: 'periodic_test' | 'unit_test' | 'mock_exam' | 'topic_practice' | 'aptitude_drill'
  category: AssessmentCategory
  aptitudeSubcategory?: AptitudeCategory
  difficulty: DifficultyLevel
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
  distractorExplanation?: string
}

export interface AssessmentResult {
  attemptId: string
  blueprintId: string
  blueprintTitle: string
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
  weakTopics: Array<{ topicId: string; topicName: string; chapterTitle?: string; accuracy: number }>
  strongTopics: Array<{ topicId: string; topicName: string; accuracy: number }>
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

// ============================================================================
// 60,000-QUESTION CONTENT PIPELINE & GOVERNANCE TYPES
// ============================================================================

export type QuestionPipelineStatus = 'draft' | 'in_review' | 'verified' | 'published' | 'archived'

export interface QuestionLicensingMetadata {
  origin: 'talentxcel_original' | 'mayoor_school_curated' | 'ncert_aligned' | 'exemplar_verified' | 'open_licensed'
  licenseCode: string // e.g. 'PROPRIETARY_TALENTXCEL_2026', 'CC-BY-4.0'
  authorId: string
  reviewerId?: string
  citation?: string
}

export interface QuestionQualityMetrics {
  clarityScore: number // 0-100
  discriminationIndex: number // -1.0 to 1.0
  historicalErrorRate: number // 0.0 to 1.0
  totalLearnerAttempts: number
  flagCount: number
}

export interface PipelineQuestionItem {
  id: string
  fingerprintHash: string // SHA-256 for duplicate detection
  boardCode: string
  classNumber: number
  subjectCode: string
  chapterNumber: number
  topicTitle: string
  category: AssessmentCategory
  aptitudeSubcategory?: AptitudeCategory
  questionType: QuestionType
  difficulty: DifficultyLevel
  questionText: string
  options: QuestionOption[]
  correctOptionIds: string[]
  explanation: string
  keyPoint?: string
  status: QuestionPipelineStatus
  licensing: QuestionLicensingMetadata
  metrics: QuestionQualityMetrics
  createdAt: string
  updatedAt: string
}

export interface PipelineCoverageReport {
  targetTotalQuestions: number // 60,000
  actualPublishedCount: number
  actualVerifiedCount: number
  actualInReviewCount: number
  actualDraftCount: number
  duplicateRejectedCount: number
  boardBreakdown: Array<{
    boardCode: string
    boardName: string
    status: SyllabusStatus
    publishedCount: number
    inReviewCount: number
    targetCount: number
  }>
  classBreakdown: Array<{
    gradeNumber: number
    className: string
    status: SyllabusStatus
    publishedCount: number
    targetCount: number
  }>
  subjectBreakdown: Array<{
    subjectCode: string
    subjectName: string
    publishedCount: number
    verifiedCount: number
  }>
  aptitudeBreakdown: Array<{
    subcategory: AptitudeCategory
    title: string
    publishedCount: number
    verifiedCount: number
  }>
}

export interface LearnerAnalyticsSummary {
  learnerId: string
  learnerName: string
  totalAttempts: number
  totalQuestionsAttempted: number
  overallAccuracyPercentage: number
  averageTimePerQuestionSeconds: number
  totalPassCreditsEarned: number
  subjectPerformance: Record<string, { subjectName: string; attempted: number; correct: number; accuracy: number }>
  weakTopics: Array<{ topicId: string; topicTitle: string; chapterTitle: string; subjectName: string; errorCount: number }>
  recentAttempts: Array<AssessmentResult>
}
