import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { resolveDoubtFromQuery, PRESET_DOUBTS } from '@/lib/academic/snap-solve-engine'

const snapSolveSchema = z.object({
  problemText: z.string().min(3),
  imageData: z.string().optional(),
  subjectCode: z.string().default('physics'),
  conceptId: z.string().optional(),
  studentHypothesis: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = snapSolveSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid doubt payload', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const { problemText, imageData, subjectCode, conceptId, studentHypothesis } = parsed.data

    // 1. Resolve Socratic Scaffolding & Twin Verification
    const resolvedPreset = resolveDoubtFromQuery(problemText, subjectCode)
    const effectiveConceptId = conceptId || resolvedPreset.conceptId

    // 2. Check Authentication
    let authenticatedUser = null
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      authenticatedUser = user
    } catch {
      // Continue for guest session
    }

    let sessionId = `session_${Date.now()}`

    // 3. Persist in Supabase if database connection is available
    if (authenticatedUser) {
      try {
        const supabase = await createClient()
        const { data, error } = await (supabase.from('academic_doubt_sessions') as any)
          .insert({
            student_id: authenticatedUser.id,
            ocr_extracted_text: problemText,
            subject_code: subjectCode,
            detected_concept_id: effectiveConceptId,
            initial_student_hypothesis: studentHypothesis || null,
            current_hint_step: 1,
            max_hints: resolvedPreset.hints.length,
            socratic_dialogue: resolvedPreset.hints,
            verification_question: resolvedPreset.twinChallenge,
            is_verified_independently: false,
          })
          .select('id')
          .single()

        if (!error && data?.id) {
          sessionId = data.id
        }
      } catch (dbErr) {
        console.warn('Could not persist doubt session to DB, proceeding in-memory:', dbErr)
      }
    }

    return NextResponse.json({
      success: true,
      sessionId,
      isGuest: !authenticatedUser,
      preset: {
        id: resolvedPreset.id,
        title: resolvedPreset.title,
        subjectCode: resolvedPreset.subjectCode,
        conceptId: effectiveConceptId,
        conceptTitle: resolvedPreset.conceptTitle,
        ocrConfidence: resolvedPreset.ocrConfidence,
        diagramType: resolvedPreset.diagramType,
        hints: resolvedPreset.hints,
        twinChallenge: resolvedPreset.twinChallenge,
      },
    })
  } catch (err: any) {
    console.error('Snap-solve route error:', err)
    return NextResponse.json(
      { error: 'Internal server error processing doubt', message: err?.message },
      { status: 500 }
    )
  }
}
