import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { PRESET_DOUBTS } from '@/lib/academic/snap-solve-engine'

const verifyTwinSchema = z.object({
  sessionId: z.string().optional(),
  selectedOptionId: z.string(),
  conceptId: z.string(),
  subjectCode: z.string().default('physics'),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = verifyTwinSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid verification payload', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const { sessionId, selectedOptionId, conceptId, subjectCode } = parsed.data

    // Locate the matching twin challenge across presets
    let matchedOption = null
    let matchedChallenge = null

    for (const preset of PRESET_DOUBTS) {
      if (preset.twinChallenge.conceptId === conceptId || preset.conceptId === conceptId) {
        matchedChallenge = preset.twinChallenge
        const opt = preset.twinChallenge.options.find((o) => o.id === selectedOptionId)
        if (opt) {
          matchedOption = opt
          break
        }
      }
    }

    // Fallback if not found directly
    if (!matchedOption && PRESET_DOUBTS[0]) {
      matchedChallenge = PRESET_DOUBTS[0].twinChallenge
      matchedOption = PRESET_DOUBTS[0].twinChallenge.options.find((o) => o.id === selectedOptionId) || PRESET_DOUBTS[0].twinChallenge.options[0]
    }

    const isCorrect = matchedOption?.isCorrect ?? false

    // Check auth
    let authenticatedUser = null
    try {
      const supabase = await createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      authenticatedUser = user
    } catch {
      // Continue for guest
    }

    if (authenticatedUser) {
      try {
        const supabase = await createClient()

        if (isCorrect) {
          // 1. Update doubt session if valid UUID
          if (sessionId && !sessionId.startsWith('session_')) {
            await (supabase.from('academic_doubt_sessions') as any)
              .update({
                is_verified_independently: true,
                current_hint_step: 4,
                updated_at: new Date().toISOString(),
              })
              .eq('id', sessionId)
          }

          // 2. Elevate student mastery in student_mastery table
          const { data: existingMastery } = await (supabase.from('student_mastery') as any)
            .select('id, mastery_score, confidence_interval')
            .eq('student_id', authenticatedUser.id)
            .eq('concept_id', conceptId)
            .maybeSingle()

          const currentScore = existingMastery?.mastery_score ?? 60
          const updatedScore = Math.min(100, currentScore + 18) // +18% boost for independent twin verification
          const newStatus = updatedScore >= 85 ? 'mastered' : 'demonstrated'

          await (supabase.from('student_mastery') as any).upsert({
            student_id: authenticatedUser.id,
            concept_id: conceptId,
            mastery_score: updatedScore,
            confidence_interval: 0.12,
            status: newStatus,
            last_assessed_at: new Date().toISOString(),
          }, { onConflict: 'student_id,concept_id' })

          // 3. Log mastery event
          await (supabase.from('academic_mastery_events') as any).insert({
            student_id: authenticatedUser.id,
            concept_id: conceptId,
            prior_score: currentScore,
            updated_score: updatedScore,
            trigger_type: 'snap_solve_twin_verification',
            delta: 18,
          })
        } else {
          // Record Error DNA if incorrect
          if (matchedOption?.errorType) {
            await (supabase.from('student_error_dna') as any).upsert({
              student_id: authenticatedUser.id,
              concept_id: conceptId,
              error_type: matchedOption.errorType,
              frequency: 1,
              last_triggered_at: new Date().toISOString(),
              needs_revision: true,
            }, { onConflict: 'student_id,concept_id,error_type' })
          }
        }
      } catch (dbErr) {
        console.warn('Could not update DB for twin verification:', dbErr)
      }
    }

    return NextResponse.json({
      success: true,
      isCorrect,
      selectedOption: matchedOption,
      feedback: {
        title: isCorrect ? 'Independent Mastery Unlocked! 🎯' : 'Conceptual Trap Detected ⚠️',
        explanation: matchedOption?.explanation || (isCorrect ? 'Well done!' : 'Please review the hints.'),
        errorType: matchedOption?.errorType,
        masteryBoost: isCorrect ? '+18% Conceptual Certainty' : '0% (Scheduled for Spaced Retest)',
        badgeUnlocked: isCorrect ? 'Independent Problem Solver' : null,
      },
    })
  } catch (err: any) {
    console.error('Twin verification error:', err)
    return NextResponse.json(
      { error: 'Internal server error verifying twin challenge', message: err?.message },
      { status: 500 }
    )
  }
}
