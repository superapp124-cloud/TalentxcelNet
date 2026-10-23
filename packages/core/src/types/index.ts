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

// ============================================================================
// THREE-DOMAIN ARCHITECTURE & SHARED INTELLIGENCE TYPES
// ============================================================================

export type LearningDomain = 'assessment' | 'skills' | 'academic'

export type SkillCategory =
  | 'ai_automation'
  | 'coding_computation'
  | 'math_problem_solving'
  | 'robotics_engineering'
  | 'design_production'
  | 'communication_collaboration'
  | 'entrepreneurship_finance'
  | 'digital_vocational'

export type PedagogicalPhilosophy = 'japanese_kaizen' | 'chinese_progression' | 'universal_mastery'

export interface SkillTrack {
  id: string
  category: SkillCategory
  title: string
  description: string
  targetGrades: string
  level: 'foundation' | 'intermediate' | 'advanced'
  philosophy: PedagogicalPhilosophy
  philosophyNote: string
  modulesCount: number
  projectsCount: number
  iconName: string
  colorTheme: 'indigo' | 'cyan' | 'purple' | 'amber' | 'emerald' | 'blue' | 'rose'
}

export interface SkillModule {
  id: string
  trackId: string
  moduleNumber: number
  title: string
  description: string
  durationMinutes: number
  keyTechniques: string[]
  status: SyllabusStatus
}

export interface SkillRubricItem {
  criterion: string
  weightPercentage: number
  masteryDescription: string
}

export interface SkillProject {
  id: string
  trackId: string
  moduleId?: string
  title: string
  brief: string
  realWorldContext: string
  deliverables: string[]
  rubricCriteria: SkillRubricItem[]
  estimatedHours: number
  difficulty: DifficultyLevel
  status: SyllabusStatus
}

export interface SkillSubmission {
  id: string
  projectId: string
  learnerId: string
  submissionUrl?: string
  notes?: string
  status: 'draft' | 'submitted' | 'reviewed'
  feedback?: string
  awardedBadges: string[]
  completedAt?: string
}

export interface AcademicWorkedExample {
  problemText: string
  stepByStepSolution: string[]
  finalAnswer: string
}

export interface AcademicLesson {
  id: string
  chapterId: string
  topicId: string
  lessonNumber: number
  title: string
  readingTimeMinutes: number
  conceptBreakdown: Array<{ heading: string; body: string }>
  workedExamples: AcademicWorkedExample[]
  revisionNotes: string[]
  keyFormulasOrRules?: string[]
  linkedBlueprintId?: string // Seamlessly connects lesson to chapter diagnostic test
  status: SyllabusStatus
}

export interface CompetitiveExamBatch {
  id: string
  examCode: string // 'JEE' | 'NEET' | 'CUET' | 'UPSC' | 'STATE_PSC' | 'JKSSB' | 'SSC' | 'BANKING' | 'GATE' | 'UGC_NET'
  name: string
  category: 'engineering_medical' | 'civil_services' | 'graduate_state' | 'banking_ssc'
  targetStage: string
  verifiedStatus: SyllabusStatus
  sampleTestsAvailable: number
  expectedLaunchBatch: string
}

export interface PersonalisedGrowthRecommendation {
  id: string
  identifiedGapTopicId: string
  gapDescription: string
  recommendedLessonId: string
  recommendedLessonTitle: string
  recommendedProjectId: string
  recommendedProjectTitle: string
  reassessmentBlueprintId: string
}

export interface LearnerTriDomainProgress {
  learnerId: string
  learnerName: string
  assessmentStats: {
    totalAttempted: number
    accuracyPercentage: number
    weakTopicsCount: number
    passCreditsEarned: number
  }
  academicStats: {
    lessonsCompleted: number
    chaptersCovered: number
    revisionReadyCount: number
  }
  skillStats: {
    projectsCompleted: number
    competenciesMastered: number
    activeProjectsCount: number
  }
  growthRecommendations: PersonalisedGrowthRecommendation[]
}

// ============================================================================
// 15. COMMERCE, ENTITLEMENTS & FUNNEL TYPES (DAY-1 REVENUE & SCALE)
// ============================================================================

export type ProductDomain = 'assessment' | 'skill' | 'academic'
export type BillingCycle = 'one_time' | 'monthly' | 'annual'

export interface CommercialProduct {
  id: string
  slug: string
  domain: ProductDomain
  title: string
  tagline: string
  basePriceRupees: number
  billingCycle: BillingCycle
  currency: 'INR'
  taxRatePercent: number // 18% GST
  inclusions: string[]
  features: string[]
  targetAudience: string
  attemptsAllowed?: number // -1 for unlimited
  validityDays: number
  popular?: boolean
  badge?: string
  targetGradeLevel?: number
  skillLevel?: 'foundation' | 'intermediate' | 'advanced' | 'professional' | 'intensive'
}

export interface CommercialOrderSummary {
  productId: string
  title: string
  domain: ProductDomain
  basePriceRupees: number
  billingCycle: BillingCycle
  discountRupees: number
  taxableAmountRupees: number
  gstAmountRupees: number
  totalPayableRupees: number
  totalPayablePaise: number
  currency: 'INR'
}

export interface LearnerEntitlement {
  id: string
  userId: string
  productId: string
  domain: ProductDomain
  unlockedTargetId?: string
  attemptsRemaining: number
  validUntil: string
  isActive: boolean
  grantedAt: string
}

export type FunnelEventName =
  | 'landing_view'
  | 'domain_selected'
  | 'free_test_started'
  | 'free_test_completed'
  | 'plan_viewed'
  | 'checkout_initiated'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'entitlement_activated'

export interface FunnelAnalyticsEvent {
  id: string
  eventName: FunnelEventName
  domain?: ProductDomain
  userId?: string
  sessionId: string
  metadata?: Record<string, unknown>
  timestamp: string
}

