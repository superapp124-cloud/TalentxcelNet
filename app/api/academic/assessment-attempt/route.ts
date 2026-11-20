import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const evaluationItemSchema = z.object({
  questionId: z.string(),
  isCorrect: z.boolean(),
  userAnswer: z.array(z.string()).default([]),
  correctAnswer: z.array(z.string()).default([]),
  conceptId: z.string().optional(),
  errorType: z.enum([
    'conceptual_misunderstanding',
    'formula_selection_error',
    'calculation_slip',
    'sign_convention_trap',
    'unit_omission',
    'reading_trap',
    'diagram_misinterpretation',
    'time_management_rush',
    'memory_recall_failure',
    'guessing_strategy_error',
  ]).optional(),
  questionStem: z.string().optional(),
  explanation: z.string().optional(),
  remedial: z.string().optional(),
})

const attemptSchema = z.object({
  assessmentType: z.enum([
    'chapter_diagnostic',
    'topic_quiz',
    'board_mock',
    'entrance_sectional',
    'snap_solve_twin',
    'simulation_exam',
  ]).default('chapter_diagnostic'),
  referenceId: z.string().default('general_diagnostic'),
  subjectCode: z.string().default('math'),
  classNumber: z.number().optional(),
  totalQuestions: z.number().min(1),
  correctAnswers: z.number().min(0),
  scorePercentage: z.number().min(0).max(100),
  durationSeconds: z.number().min(0).default(0),
  conceptId: z.string().optional(),
  evaluations: z.array(evaluationItemSchema).default([]),
  weakTopics: z.array(z.object({
    topicId: z.string(),
    topicName: z.string(),
    accuracy: z.number(),
  })).default([]),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = attemptSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid assessment attempt payload', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const {
      assessmentType,
      referenceId,
      subjectCode,
      totalQuestions,
      correctAnswers,
      scorePercentage,
      durationSeconds,
      conceptId,
      evaluations,
      weakTopics,
    } = parsed.data

    // Check authenticated user
    let authenticatedUser = null
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      authenticatedUser = user
    } catch {
      // Continue for unauthenticated guest sessions
    }

    // 1. Guest Session Fallback
    if (!authenticatedUser) {
      return NextResponse.json({
        success: true,
        isGuest: true,
        message: 'Assessment attempt scored in guest mode. Sign in to sync persistent mastery.',
        data: {
          assessmentType,
          referenceId,
          scorePercentage,
          correctAnswers,
          totalQuestions,
          accuracyPercentage: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
          weakTopics,
          errorCount: evaluations.filter((e) => !e.isCorrect).length,
        },
      })
    }

    const supabase = await createClient()
    const userId = authenticatedUser.id

    // 2. Insert into academic_assessment_attempts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: attemptRecord, error: attemptError } = await (supabase.from('academic_assessment_attempts') as any)
      .insert({
        student_id: userId,
        assessment_type: assessmentType,
        reference_id: referenceId,
        total_questions: totalQuestions,
        correct_answers: correctAnswers,
        score_percentage: scorePercentage,
        duration_seconds: durationSeconds,
        attempt_payload: {
          subjectCode,
          evaluations,
          weakTopics,
        },
      })
      .select('id')
      .single()

    if (attemptError) {
      console.error('[Assessment Sync] Error recording attempt:', attemptError)
    }

    const attemptId = attemptRecord?.id

    // 3. Update or Upsert Student Mastery
    // Map tested concepts from explicit conceptId or evaluations
    const testedConceptIds = new Set<string>()
    if (conceptId) testedConceptIds.add(conceptId)
    evaluations.forEach((e) => {
      if (e.conceptId) testedConceptIds.add(e.conceptId)
    })

    const masteryUpdates: Array<{ conceptId: string; newScore: number; status: string }> = []

    for (const cId of testedConceptIds) {
      // Check existing mastery record
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data: existingMastery } = await (supabase.from('student_mastery') as any)
        .select('*')
        .eq('student_id', userId)
        .eq('concept_id', cId)
        .maybeSingle()

      const previousScore = existingMastery ? Number(existingMastery.mastery_score) : 0
      const evidenceCount = existingMastery ? Number(existingMastery.evidence_count) + 1 : 1

      // Calculate blended Bayesian mastery score
      const newScore = Math.min(
        100,
        Math.max(
          0,
          existingMastery
            ? Math.round(previousScore * 0.4 + scorePercentage * 0.6)
            : Math.round(scorePercentage)
        )
      )

      let masteryStatus: 'not_started' | 'introduced' | 'learning' | 'practicing' | 'demonstrated' | 'mastered' = 'learning'
      if (newScore >= 85) masteryStatus = 'mastered'
      else if (newScore >= 65) masteryStatus = 'demonstrated'
      else if (newScore >= 40) masteryStatus = 'practicing'

      // Upsert student_mastery
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from('student_mastery') as any).upsert(
        {
          student_id: userId,
          concept_id: cId,
          mastery_score: newScore,
          mastery_status: masteryStatus,
          evidence_count: evidenceCount,
          last_demonstrated_at: new Date().toISOString(),
          retention_decay_factor: 1.0,
        },
        { onConflict: 'student_id,concept_id' }
      )

      // Ledger immutable mastery event
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase.from('academic_mastery_events') as any).insert({
        student_id: userId,
        concept_id: cId,
        previous_score: previousScore,
        new_score: newScore,
        score_delta: Math.round((newScore - previousScore) * 100) / 100,
        event_source: 'assessment_attempt',
        evidence_attempt_id: attemptId || null,
        rationale: `Diagnostic assessment (${referenceId}) evaluated at ${scorePercentage}%`,
      })

      masteryUpdates.push({
        conceptId: cId,
        newScore,
        status: masteryStatus,
      })
    }

    // 4. Classify & Log Misconceptions into student_error_dna
    const incorrectEvaluations = evaluations.filter((e) => !e.isCorrect)
    let loggedErrorsCount = 0

    for (const item of incorrectEvaluations) {
      const detectedErrorType = item.errorType || 'conceptual_misunderstanding'
      const stemExcerpt = item.questionStem || `Question ${item.questionId}`
      const studentInput = item.userAnswer.length > 0 ? item.userAnswer.join(', ') : 'No answer selected'
      const diagnosis = item.explanation || 'Answer did not match verified syllabus derivation.'
      const remedial = item.remedial || 'Review prerequisite formulas and Cartesian sign conventions.'

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: errDnaError } = await (supabase.from('student_error_dna') as any).insert({
        student_id: userId,
        concept_id: item.conceptId || conceptId || null,
        error_type: detectedErrorType,
        question_stem_excerpt: stemExcerpt.slice(0, 300),
        student_raw_input: studentInput.slice(0, 150),
        diagnosis_detail: diagnosis.slice(0, 500),
        remedial_prescription: remedial.slice(0, 500),
        resolved: false,
      })

      if (!errDnaError) loggedErrorsCount++
    }

    return NextResponse.json({
      success: true,
      attemptId,
      scorePercentage,
      totalQuestions,
      correctAnswers,
      masteryUpdates,
      loggedErrorsCount,
      timestamp: new Date().toISOString(),
    })
  } catch (err: unknown) {
    console.error('[Assessment API] Fatal error processing attempt:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal assessment error' },
      { status: 500 }
    )
  }
}
