import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { evaluateQuizSubmission } from '@/lib/lms/assessment-service'
import { issueCertificate } from '@/lib/lms/certificate-service'
import { createClient } from '@/lib/supabase/server'
import { parseJsonWithLimit, ASSESSMENT_MAX_PAYLOAD_BYTES } from '@/lib/security/request-validator'

const submissionSchema = z.object({
  answers: z
    .record(z.string().min(1).max(64), z.number().int().min(0).max(10))
    .refine((obj) => Object.keys(obj).length <= 100, {
      message: 'answers cannot exceed 100 questions',
    }),
  programmeTitle: z.string().min(1).max(128).default('AI Development & Automation'),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const parseResult = await parseJsonWithLimit(req, ASSESSMENT_MAX_PAYLOAD_BYTES)
    if (!parseResult.success) {
      return parseResult.errorResponse
    }

    const parsed = submissionSchema.safeParse(parseResult.data)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid assessment submission' }, { status: 400 })
    }

    const evaluation = evaluateQuizSubmission(parsed.data.answers)

    let certificate = null
    // If passed with 100%, trigger certificate issuance demo
    if (evaluation.isPassed && evaluation.percentage === 100) {
      certificate = issueCertificate(user.email ?? 'Learner', parsed.data.programmeTitle)
    }

    return NextResponse.json({
      success: true,
      evaluation,
      certificate,
    })
  } catch (error) {
    console.error('[Assessment API] Error:', error)
    return NextResponse.json({ error: 'Failed to evaluate assessment' }, { status: 500 })
  }
}
