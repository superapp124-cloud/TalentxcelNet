import { z } from 'zod'
import { createServiceRoleClient } from '@/lib/supabase/admin'
import { getUserActiveEntitlements, type EnrichedEntitlement } from '@/lib/commerce/user-entitlements'

export interface StudyPreferences {
  classNumber: number | null
  boardCode: string
  examTarget: string | null
  subjects: string[]
  weeklyGoalMinutes: number
  dailyTargetQuestions: number
  onboardingCompleted: boolean
}

export interface LearnerBookmark {
  id: string
  itemType: 'question' | 'lesson' | 'formula' | 'skill' | 'project'
  itemId: string
  title: string
  href: string
  subjectCode: string | null
  createdAt: string
}

export interface LearnerRevisionNote {
  id: string
  title: string
  content: string
  subjectCode: string | null
  topicId: string | null
  nextReviewAt: string | null
  createdAt: string
  updatedAt: string
}

export interface SubjectMasteryItem {
  subject: string
  attempts: number
  accuracyPercent: number | null
  masteryPercent: number
  isMeasured: boolean
}

export interface WeakTopicItem {
  topicId: string
  topicLabel: string
  subject: string
  accuracyPercent: number
  attempts: number
  recommendedHref: string
}

export interface PersonalizedRecommendation {
  id: string
  title: string
  reason: string
  category:
    | 'weak_topic'
    | 'incomplete_diagnostic'
    | 'spaced_revision'
    | 'bookmark_review'
    | 'goal_pace'
    | 'skill_continuation'
  priority: 'high' | 'medium' | 'normal'
  href: string
  ctaLabel: string
  basis: 'measured_performance' | 'rule_based_schedule'
  requiresPaid?: boolean
}

export interface DailyPlanItem {
  id: string
  label: string
  targetMinutes: number
  completed: boolean
  href: string
}

export interface PaidIntelligenceInsights {
  examReadinessPercent: number | null
  averagePaceSecondsPerQuestion: number | null
  accuracyTrendDeltaPercent: number | null
  chapterMasterySummary: Array<{
    chapter: string
    subject: string
    masteryPercent: number
    attempts: number
  }>
  smartRevisionQueueCount: number
  reportDownloadReady: boolean
}

export interface LearnerWorkspaceData {
  tier: 'free' | 'paid'
  isPaidCustomer: boolean
  activeDomains: string[]
  entitlements: Array<{
    id: string
    domain: string
    planCode: string
    status: string
    expiresAt: string | null
  }>
  preferences: StudyPreferences
  measuredStats: {
    testsCompleted: number
    questionsAttempted: number
    accuracyPercent: number | null
    currentStreakDays: number
    longestStreakDays: number
    xpTotal: number
    weeklyMinutesLogged: number
    todayQuestionsAttempted: number
    freeDiagnosticsUsed: number
    freeDiagnosticQuestionCap: number
  }
  subjectMastery: SubjectMasteryItem[]
  weakTopics: WeakTopicItem[]
  recommendations: PersonalizedRecommendation[]
  dailyPlan: DailyPlanItem[]
  bookmarks: LearnerBookmark[]
  revisionNotes: LearnerRevisionNote[]
  achievements: Array<{
    id: string
    title: string
    badge: string
    earnedAt: string
  }>
  paidInsights: PaidIntelligenceInsights | null
  lockedCapabilities: string[]
  queryDiagnostics: {
    status: 'ok' | 'partial_error'
    failedSources: Array<{ source: string; message: string; code?: string }>
  }
  generatedAt: string
}

export const studyPreferencesPatchSchema = z.object({
  classNumber: z.number().int().min(4).max(12).nullable().optional(),
  boardCode: z.string().min(2).max(32).optional(),
  examTarget: z.string().max(64).nullable().optional(),
  subjects: z.array(z.string().min(1).max(40)).min(1).max(12).optional(),
  weeklyGoalMinutes: z.number().int().min(15).max(4200).optional(),
  dailyTargetQuestions: z.number().int().min(1).max(200).optional(),
  onboardingCompleted: z.boolean().optional(),
})

export const bookmarkCreateSchema = z.object({
  itemType: z.enum(['question', 'lesson', 'formula', 'skill', 'project']),
  itemId: z.string().min(1).max(120),
  title: z.string().min(1).max(180),
  href: z.string().min(1).max(320),
  subjectCode: z.string().max(40).nullable().optional(),
})

export const revisionNoteCreateSchema = z.object({
  title: z.string().min(1).max(180),
  content: z.string().min(1).max(4000),
  subjectCode: z.string().max(40).nullable().optional(),
  topicId: z.string().max(120).nullable().optional(),
  nextReviewAt: z.string().datetime().nullable().optional(),
})

const DEFAULT_PREFERENCES: StudyPreferences = {
  classNumber: 10,
  boardCode: 'CBSE',
  examTarget: null,
  subjects: ['Mathematics', 'Science'],
  weeklyGoalMinutes: 180,
  dailyTargetQuestions: 10,
  onboardingCompleted: false,
}

// Test-mode / offline fallback persistence
const MEMORY_PREFS = new Map<string, StudyPreferences>()
const MEMORY_BOOKMARKS = new Map<string, LearnerBookmark[]>()
const MEMORY_NOTES = new Map<string, LearnerRevisionNote[]>()

export function __resetLearnerWorkspaceMemoryForTest() {
  MEMORY_PREFS.clear()
  MEMORY_BOOKMARKS.clear()
  MEMORY_NOTES.clear()
}

function getDbClientOrNull() {
  if (process.env.NODE_ENV === 'test' && !process.env.TEST_USE_LIVE_DB) {
    return null
  }
  try {
    return createServiceRoleClient()
  } catch {
    return null
  }
}

export function generatePersonalizedRecommendations(params: {
  isPaidCustomer: boolean
  testsCompleted: number
  todayQuestionsAttempted: number
  dailyTargetQuestions: number
  weakTopics: WeakTopicItem[]
  dueRevisionNotesCount: number
  bookmarksCount: number
  classNumber: number | null
  examTarget: string | null
}): PersonalizedRecommendation[] {
  const recs: PersonalizedRecommendation[] = []

  if (params.weakTopics.length > 0) {
    const topWeak = params.weakTopics[0]
    recs.push({
      id: `rec_weak_${topWeak.topicId}`,
      title: `Strengthen ${topWeak.topicLabel} (${topWeak.subject})`,
      reason: `Measured accuracy is ${topWeak.accuracyPercent}% across ${topWeak.attempts} attempt${topWeak.attempts === 1 ? '' : 's'}. Targeted practice here yields the fastest score lift.`,
      category: 'weak_topic',
      priority: 'high',
      href: topWeak.recommendedHref,
      ctaLabel: 'Practice Weak Topic',
      basis: 'measured_performance',
    })
  }

  if (params.testsCompleted === 0) {
    recs.push({
      id: 'rec_diag_start',
      title: `Take your 5-question ${params.examTarget || `Class ${params.classNumber ?? 10}`} Diagnostic`,
      reason: 'No completed diagnostic attempts recorded yet. A 5-question baseline unlocks real topic mastery & weak-area detection.',
      category: 'incomplete_diagnostic',
      priority: 'high',
      href: '/dashboard/diagnostic',
      ctaLabel: 'Start Free Diagnostic',
      basis: 'rule_based_schedule',
    })
  }

  if (params.dueRevisionNotesCount > 0) {
    recs.push({
      id: 'rec_revision_due',
      title: `Review ${params.dueRevisionNotesCount} due revision note${params.dueRevisionNotesCount === 1 ? '' : 's'}`,
      reason: 'Scheduled spaced-repetition review is due today to lock in long-term retention.',
      category: 'spaced_revision',
      priority: 'high',
      href: '/dashboard/notes',
      ctaLabel: 'Open Revision Notes',
      basis: 'rule_based_schedule',
    })
  }

  if (params.todayQuestionsAttempted < params.dailyTargetQuestions) {
    const remaining = params.dailyTargetQuestions - params.todayQuestionsAttempted
    recs.push({
      id: 'rec_daily_goal',
      title: `Complete ${remaining} more practice question${remaining === 1 ? '' : 's'} today`,
      reason: `${params.todayQuestionsAttempted}/${params.dailyTargetQuestions} of your daily question target completed.`,
      category: 'goal_pace',
      priority: 'medium',
      href: '/dashboard/question-bank',
      ctaLabel: 'Resume Question Bank',
      basis: 'measured_performance',
    })
  }

  if (params.bookmarksCount > 0) {
    recs.push({
      id: 'rec_bookmark_review',
      title: `Revisit ${params.bookmarksCount} saved bookmark${params.bookmarksCount === 1 ? '' : 's'}`,
      reason: 'Reviewing bookmarked questions and lessons prevents repeat mistakes.',
      category: 'bookmark_review',
      priority: 'normal',
      href: '/dashboard/bookmarks',
      ctaLabel: 'View Bookmarks',
      basis: 'rule_based_schedule',
    })
  }

  if (recs.length < 3) {
    recs.push({
      id: 'rec_skill_studio',
      title: 'Explore Applied AI & Skill Studio Labs',
      reason: 'Build practical portfolio projects alongside curriculum mastery.',
      category: 'skill_continuation',
      priority: 'normal',
      href: '/dashboard/skills',
      ctaLabel: 'Open Skill Studio',
      basis: 'rule_based_schedule',
    })
  }

  return recs.slice(0, 5)
}

export function buildLearnerWorkspaceData(input: {
  entitlements: EnrichedEntitlement[]
  isPaidCustomer: boolean
  activeDomains: string[]
  preferences?: Partial<StudyPreferences>
  testsCompleted?: number
  questionsAttempted?: number
  accuracyPercent?: number | null
  currentStreakDays?: number
  longestStreakDays?: number
  xpTotal?: number
  weeklyMinutesLogged?: number
  todayQuestionsAttempted?: number
  freeDiagnosticsUsed?: number
  subjectMastery?: SubjectMasteryItem[]
  weakTopics?: WeakTopicItem[]
  bookmarks?: LearnerBookmark[]
  revisionNotes?: LearnerRevisionNote[]
  achievements?: Array<{ id: string; title: string; badge: string; earnedAt: string }>
  averagePaceSecondsPerQuestion?: number | null
  accuracyTrendDeltaPercent?: number | null
  queryDiagnostics?: {
    status: 'ok' | 'partial_error'
    failedSources: Array<{ source: string; message: string; code?: string }>
  }
}): LearnerWorkspaceData {
  const preferences: StudyPreferences = {
    ...DEFAULT_PREFERENCES,
    ...input.preferences,
    subjects:
      input.preferences?.subjects && input.preferences.subjects.length > 0
        ? input.preferences.subjects
        : DEFAULT_PREFERENCES.subjects,
  }

  const testsCompleted = input.testsCompleted ?? 0
  const questionsAttempted = input.questionsAttempted ?? 0
  const accuracyPercent = input.accuracyPercent ?? null
  const currentStreakDays = input.currentStreakDays ?? 0
  const longestStreakDays = input.longestStreakDays ?? currentStreakDays
  const xpTotal = input.xpTotal ?? 0
  const weeklyMinutesLogged = input.weeklyMinutesLogged ?? 0
  const todayQuestionsAttempted = input.todayQuestionsAttempted ?? 0
  const freeDiagnosticsUsed = input.freeDiagnosticsUsed ?? 0
  const weakTopics = input.weakTopics ?? []
  const bookmarks = input.bookmarks ?? []
  const revisionNotes = input.revisionNotes ?? []
  const subjectMastery = input.subjectMastery ?? []

  const nowMs = Date.now()
  const dueRevisionNotesCount = revisionNotes.filter(
    (n) => !n.nextReviewAt || Date.parse(n.nextReviewAt) <= nowMs
  ).length

  const recommendations = generatePersonalizedRecommendations({
    isPaidCustomer: input.isPaidCustomer,
    testsCompleted,
    todayQuestionsAttempted,
    dailyTargetQuestions: preferences.dailyTargetQuestions,
    weakTopics,
    dueRevisionNotesCount,
    bookmarksCount: bookmarks.length,
    classNumber: preferences.classNumber,
    examTarget: preferences.examTarget,
  })

  const dailyPlan: DailyPlanItem[] = [
    {
      id: 'plan_questions',
      label: `Practice ${preferences.dailyTargetQuestions} targeted questions`,
      targetMinutes: 15,
      completed: todayQuestionsAttempted >= preferences.dailyTargetQuestions,
      href: '/dashboard/question-bank',
    },
    {
      id: 'plan_weak_topic',
      label:
        weakTopics.length > 0
          ? `Drill weak topic: ${weakTopics[0].topicLabel}`
          : 'Run 5-question Diagnostic baseline',
      targetMinutes: 10,
      completed: weakTopics.length === 0 && testsCompleted > 0,
      href: weakTopics.length > 0 ? weakTopics[0].recommendedHref : '/dashboard/diagnostic',
    },
    {
      id: 'plan_revision',
      label:
        dueRevisionNotesCount > 0
          ? `Review ${dueRevisionNotesCount} spaced-revision note(s)`
          : 'Capture 1 key takeaway in Revision Notes',
      targetMinutes: 5,
      completed: revisionNotes.length > 0 && dueRevisionNotesCount === 0,
      href: '/dashboard/notes',
    },
  ]

  let paidInsights: PaidIntelligenceInsights | null = null
  const lockedCapabilities: string[] = []

  if (input.isPaidCustomer) {
    const examReadinessPercent =
      accuracyPercent !== null
        ? Math.min(100, Math.round(accuracyPercent * 0.75 + Math.min(25, testsCompleted * 5)))
        : null

    paidInsights = {
      examReadinessPercent,
      averagePaceSecondsPerQuestion: input.averagePaceSecondsPerQuestion ?? null,
      accuracyTrendDeltaPercent: input.accuracyTrendDeltaPercent ?? null,
      chapterMasterySummary: subjectMastery.map((s) => ({
        chapter: `${s.subject} Core`,
        subject: s.subject,
        masteryPercent: s.masteryPercent,
        attempts: s.attempts,
      })),
      smartRevisionQueueCount: dueRevisionNotesCount + weakTopics.length,
      reportDownloadReady: testsCompleted > 0,
    }
  } else {
    lockedCapabilities.push(
      'Full 3M+ Question Bank unlimited attempts & detailed step-by-step solutions',
      'Chapter-by-chapter Exam Readiness score & speed/accuracy analytics',
      'Adaptive Smart Revision schedule & downloadable PDF/CSV progress reports',
      'Unlimited AI Tutor guidance & verified Project Lab certificates'
    )
  }

  return {
    tier: input.isPaidCustomer ? 'paid' : 'free',
    isPaidCustomer: input.isPaidCustomer,
    activeDomains: input.activeDomains,
    entitlements: input.entitlements.map((e) => ({
      id: e.id,
      domain: e.domain,
      planCode: e.productId,
      status: e.isActive ? 'active' : 'inactive',
      expiresAt: e.validUntil ?? null,
    })),
    preferences,
    measuredStats: {
      testsCompleted,
      questionsAttempted,
      accuracyPercent,
      currentStreakDays,
      longestStreakDays,
      xpTotal,
      weeklyMinutesLogged,
      todayQuestionsAttempted,
      freeDiagnosticsUsed,
      freeDiagnosticQuestionCap: 5,
    },
    subjectMastery,
    weakTopics,
    recommendations,
    dailyPlan,
    bookmarks,
    revisionNotes,
    achievements: input.achievements ?? [],
    paidInsights,
    lockedCapabilities,
    queryDiagnostics: input.queryDiagnostics ?? { status: 'ok', failedSources: [] },
    generatedAt: new Date().toISOString(),
  }
}

export async function loadLearnerWorkspaceFromDb(
  userId: string,
  email?: string | null
): Promise<LearnerWorkspaceData> {
  const entitlementResult = await getUserActiveEntitlements(userId, email ?? null)
  const db = getDbClientOrNull()

  if (!db) {
    return buildLearnerWorkspaceData({
      entitlements: entitlementResult.entitlements,
      isPaidCustomer: entitlementResult.isPaidCustomer,
      activeDomains: entitlementResult.activeDomains,
      preferences: MEMORY_PREFS.get(userId),
      bookmarks: MEMORY_BOOKMARKS.get(userId) ?? [],
      revisionNotes: MEMORY_NOTES.get(userId) ?? [],
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const client = db as any
  const todayStartIso = new Date(new Date().setHours(0, 0, 0, 0)).toISOString()

  const [
    profileRes,
    prefsRes,
    attemptsRes,
    academicAttemptsRes,
    masteryRes,
    gameProfileRes,
    achievementsRes,
    bookmarksRes,
    notesRes,
  ] = await Promise.all([
    client.from('profiles').select('id, display_name, full_name').eq('id', userId).maybeSingle(),
    client
      .from('learner_study_preferences')
      .select('class_number, board_code, exam_target, subjects, weekly_goal_minutes, daily_target_questions, onboarding_completed')
      .eq('user_id', userId)
      .maybeSingle(),
    client
      .from('assessment_attempts')
      .select('id, status, score, max_score, percentage, started_at, submitted_at, created_at')
      .eq('learner_id', userId)
      .in('status', ['submitted', 'graded'])
      .order('created_at', { ascending: false })
      .limit(100),
    client
      .from('academic_assessment_attempts')
      .select('id, assessment_type, reference_id, total_questions, correct_answers, score_percentage, duration_seconds, completed_at')
      .eq('student_id', userId)
      .order('completed_at', { ascending: false })
      .limit(200),
    client
      .from('learner_topic_mastery')
      .select('topic_id, topic_title, subject_code, mastery_percentage, attempts_count, correct_count')
      .eq('user_id', userId)
      .limit(50),
    client
      .from('learner_game_profiles')
      .select('total_xp, active_streak_days, longest_streak_days')
      .eq('user_id', userId)
      .maybeSingle(),
    client
      .from('learner_achievements')
      .select('id, achievement_key, title, badge_icon, unlocked_at')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false })
      .limit(20),
    client
      .from('learner_bookmarks')
      .select('id, item_type, item_id, title, href, subject_code, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50),
    client
      .from('learner_revision_notes')
      .select('id, title, content, subject_code, topic_id, next_review_at, created_at, updated_at')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(50),
  ])

  const failedSources: Array<{ source: string; message: string; code?: string }> = []
  const checkRes = (source: string, res: { error?: { message?: string; code?: string } | null } | null) => {
    if (res?.error) {
      failedSources.push({
        source,
        message: res.error.message || 'Query error',
        code: res.error.code,
      })
      console.error(`[Learner Intelligence] Query failure on ${source}:`, res.error.message)
    }
  }
  checkRes('profiles', profileRes)
  checkRes('learner_study_preferences', prefsRes)
  checkRes('assessment_attempts', attemptsRes)
  checkRes('academic_assessment_attempts', academicAttemptsRes)
  checkRes('learner_topic_mastery', masteryRes)
  checkRes('learner_game_profiles', gameProfileRes)
  checkRes('learner_achievements', achievementsRes)
  checkRes('learner_bookmarks', bookmarksRes)
  checkRes('learner_revision_notes', notesRes)

  const prefsRow = prefsRes?.data
  const preferences: Partial<StudyPreferences> = {
    classNumber: prefsRow?.class_number ?? 10,
    boardCode: prefsRow?.board_code ?? 'CBSE',
    examTarget: prefsRow?.exam_target ?? null,
    subjects: Array.isArray(prefsRow?.subjects) ? prefsRow.subjects : DEFAULT_PREFERENCES.subjects,
    weeklyGoalMinutes: prefsRow?.weekly_goal_minutes ?? 180,
    dailyTargetQuestions: prefsRow?.daily_target_questions ?? 10,
    onboardingCompleted: Boolean(prefsRow?.onboarding_completed),
  }

  const attempts = (attemptsRes?.data ?? []) as Array<{
    id: string
    status?: string | null
    score?: number | null
    max_score?: number | null
    percentage?: number | null
    started_at?: string | null
    submitted_at?: string | null
    created_at?: string
  }>
  const academicAttempts = (academicAttemptsRes?.data ?? []) as Array<{
    id: string
    assessment_type?: string | null
    reference_id?: string | null
    total_questions?: number | null
    correct_answers?: number | null
    score_percentage?: number | null
    duration_seconds?: number | null
    completed_at?: string
  }>

  const testsCompleted = attempts.length + academicAttempts.length
  const questionsFromAcademic = academicAttempts.reduce((acc, a) => acc + (a.total_questions ?? 0), 0)
  const correctFromAcademic = academicAttempts.reduce((acc, a) => acc + (a.correct_answers ?? 0), 0)
  const questionsAttempted = questionsFromAcademic
  const accuracyPercent =
    questionsAttempted > 0
      ? Math.round((correctFromAcademic / questionsAttempted) * 100)
      : attempts.length > 0 && attempts.some((a) => typeof a.percentage === 'number')
        ? Math.round(
            attempts.reduce((acc, a) => acc + Number(a.percentage ?? 0), 0) /
              Math.max(1, attempts.filter((a) => typeof a.percentage === 'number').length)
          )
        : null

  const assessmentSeconds = attempts.reduce((acc, a) => {
    if (a.started_at && a.submitted_at) {
      const diff = Math.max(0, Math.round((Date.parse(a.submitted_at) - Date.parse(a.started_at)) / 1000))
      return acc + Math.min(diff, 4 * 3600)
    }
    return acc
  }, 0)
  const totalSeconds =
    assessmentSeconds +
    academicAttempts.reduce((acc, a) => acc + (a.duration_seconds ?? 0), 0)
  const weeklyMinutesLogged = Math.round(totalSeconds / 60)
  const averagePaceSecondsPerQuestion =
    questionsAttempted > 0 && totalSeconds > 0
      ? Math.round(totalSeconds / questionsAttempted)
      : null

  const todayQuestionsAttempted = academicAttempts
    .filter((a) => (a.completed_at ?? '') >= todayStartIso)
    .reduce((acc, a) => acc + (a.total_questions ?? 0), 0)

  // Subject mastery aggregation from measured records
  const subjectAgg = new Map<string, { attempts: number; correct: number }>()
  for (const a of academicAttempts) {
    const subj = a.assessment_type ? a.assessment_type.replace(/_/g, ' ') : 'Academic'
    const cur = subjectAgg.get(subj) ?? { attempts: 0, correct: 0 }
    cur.attempts += a.total_questions ?? 0
    cur.correct += a.correct_answers ?? 0
    subjectAgg.set(subj, cur)
  }

  const subjectMastery: SubjectMasteryItem[] = Array.from(subjectAgg.entries()).map(
    ([subject, stats]) => {
      const acc = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : null
      return {
        subject,
        attempts: stats.attempts,
        accuracyPercent: acc,
        masteryPercent: acc ?? 0,
        isMeasured: true,
      }
    }
  )

  const masteryRows = (masteryRes?.data ?? []) as Array<{
    topic_id?: string
    topic_title?: string
    subject_code?: string
    mastery_percentage?: number
    attempts_count?: number
    correct_count?: number
  }>

  const weakTopics: WeakTopicItem[] = masteryRows
    .filter((r) => (r.attempts_count ?? 0) > 0 && (r.mastery_percentage ?? 100) < 70)
    .sort((a, b) => (a.mastery_percentage ?? 0) - (b.mastery_percentage ?? 0))
    .slice(0, 5)
    .map((r) => ({
      topicId: r.topic_id || 'core-topic',
      topicLabel: r.topic_title || (r.topic_id || 'Core Topic').replace(/[-_]/g, ' '),
      subject: r.subject_code || 'Academic',
      accuracyPercent: Math.round(r.mastery_percentage ?? 0),
      attempts: r.attempts_count ?? 0,
      recommendedHref: '/dashboard/question-bank',
    }))

  const bookmarks: LearnerBookmark[] = ((bookmarksRes?.data ?? []) as Array<Record<string, unknown>>).map(
    (b) => ({
      id: String(b.id),
      itemType: (b.item_type as LearnerBookmark['itemType']) || 'question',
      itemId: String(b.item_id ?? ''),
      title: String(b.title ?? ''),
      href: String(b.href ?? '/dashboard'),
      subjectCode: b.subject_code ? String(b.subject_code) : null,
      createdAt: String(b.created_at ?? new Date().toISOString()),
    })
  )

  const revisionNotes: LearnerRevisionNote[] = ((notesRes?.data ?? []) as Array<Record<string, unknown>>).map(
    (n) => ({
      id: String(n.id),
      title: String(n.title ?? ''),
      content: String(n.content ?? ''),
      subjectCode: n.subject_code ? String(n.subject_code) : null,
      topicId: n.topic_id ? String(n.topic_id) : null,
      nextReviewAt: n.next_review_at ? String(n.next_review_at) : null,
      createdAt: String(n.created_at ?? new Date().toISOString()),
      updatedAt: String(n.updated_at ?? new Date().toISOString()),
    })
  )

  const achievements = ((achievementsRes?.data ?? []) as Array<Record<string, unknown>>).map((a) => ({
    id: String(a.id),
    title: String(a.title ?? a.achievement_key ?? 'Milestone'),
    badge: String(a.badge_icon ?? a.achievement_key ?? 'badge'),
    earnedAt: String(a.unlocked_at ?? new Date().toISOString()),
  }))

  const gameProfile = gameProfileRes?.data
  const currentStreakDays = gameProfile?.active_streak_days ?? 0
  const longestStreakDays = gameProfile?.longest_streak_days ?? currentStreakDays
  const xpTotal = gameProfile?.total_xp ?? 0

  return buildLearnerWorkspaceData({
    entitlements: entitlementResult.entitlements,
    isPaidCustomer: entitlementResult.isPaidCustomer,
    activeDomains: entitlementResult.activeDomains,
    preferences,
    testsCompleted,
    questionsAttempted,
    accuracyPercent,
    currentStreakDays,
    longestStreakDays,
    xpTotal,
    weeklyMinutesLogged,
    todayQuestionsAttempted,
    freeDiagnosticsUsed: testsCompleted,
    subjectMastery,
    weakTopics,
    bookmarks,
    revisionNotes,
    achievements,
    averagePaceSecondsPerQuestion,
    queryDiagnostics: {
      status: failedSources.length > 0 ? 'partial_error' : 'ok',
      failedSources,
    },
  })
}

export async function upsertStudyPreferences(
  userId: string,
  patch: z.infer<typeof studyPreferencesPatchSchema>
): Promise<StudyPreferences> {
  const existing = MEMORY_PREFS.get(userId) ?? DEFAULT_PREFERENCES
  const merged: StudyPreferences = {
    ...existing,
    ...patch,
    subjects: patch.subjects ?? existing.subjects,
  }
  MEMORY_PREFS.set(userId, merged)

  const db = getDbClientOrNull()
  if (db) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as any).from('learner_study_preferences').upsert(
      {
        user_id: userId,
        class_number: merged.classNumber,
        board_code: merged.boardCode,
        exam_target: merged.examTarget,
        subjects: merged.subjects,
        weekly_goal_minutes: merged.weeklyGoalMinutes,
        daily_target_questions: merged.dailyTargetQuestions,
        onboarding_completed: merged.onboardingCompleted,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' }
    )
  }

  return merged
}

export async function addLearnerBookmark(
  userId: string,
  input: z.infer<typeof bookmarkCreateSchema>
): Promise<LearnerBookmark> {
  const bookmark: LearnerBookmark = {
    id: `bm_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    itemType: input.itemType,
    itemId: input.itemId,
    title: input.title,
    href: input.href,
    subjectCode: input.subjectCode ?? null,
    createdAt: new Date().toISOString(),
  }

  const list = MEMORY_BOOKMARKS.get(userId) ?? []
  const filtered = list.filter(
    (b) => !(b.itemType === input.itemType && b.itemId === input.itemId)
  )
  MEMORY_BOOKMARKS.set(userId, [bookmark, ...filtered])

  const db = getDbClientOrNull()
  if (db) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (db as any)
      .from('learner_bookmarks')
      .upsert(
        {
          user_id: userId,
          item_type: input.itemType,
          item_id: input.itemId,
          title: input.title,
          href: input.href,
          subject_code: input.subjectCode ?? null,
        },
        { onConflict: 'user_id,item_type,item_id' }
      )
      .select('id, created_at')
      .maybeSingle()

    if (data?.id) {
      bookmark.id = String(data.id)
      bookmark.createdAt = String(data.created_at ?? bookmark.createdAt)
    }
  }

  return bookmark
}

export async function removeLearnerBookmark(userId: string, bookmarkId: string): Promise<void> {
  const list = MEMORY_BOOKMARKS.get(userId) ?? []
  MEMORY_BOOKMARKS.set(
    userId,
    list.filter((b) => b.id !== bookmarkId)
  )

  const db = getDbClientOrNull()
  if (db) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as any)
      .from('learner_bookmarks')
      .delete()
      .eq('id', bookmarkId)
      .eq('user_id', userId)
  }
}

export async function addRevisionNote(
  userId: string,
  input: z.infer<typeof revisionNoteCreateSchema>
): Promise<LearnerRevisionNote> {
  const now = new Date().toISOString()
  const note: LearnerRevisionNote = {
    id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title: input.title,
    content: input.content,
    subjectCode: input.subjectCode ?? null,
    topicId: input.topicId ?? null,
    nextReviewAt: input.nextReviewAt ?? null,
    createdAt: now,
    updatedAt: now,
  }

  const list = MEMORY_NOTES.get(userId) ?? []
  MEMORY_NOTES.set(userId, [note, ...list])

  const db = getDbClientOrNull()
  if (db) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (db as any)
      .from('learner_revision_notes')
      .insert({
        user_id: userId,
        title: input.title,
        content: input.content,
        subject_code: input.subjectCode ?? null,
        topic_id: input.topicId ?? null,
        next_review_at: input.nextReviewAt ?? null,
      })
      .select('id, created_at, updated_at')
      .maybeSingle()

    if (data?.id) {
      note.id = String(data.id)
      note.createdAt = String(data.created_at ?? now)
      note.updatedAt = String(data.updated_at ?? now)
    }
  }

  return note
}

export async function deleteRevisionNote(userId: string, noteId: string): Promise<void> {
  const list = MEMORY_NOTES.get(userId) ?? []
  MEMORY_NOTES.set(
    userId,
    list.filter((n) => n.id !== noteId)
  )

  const db = getDbClientOrNull()
  if (db) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as any)
      .from('learner_revision_notes')
      .delete()
      .eq('id', noteId)
      .eq('user_id', userId)
  }
}
