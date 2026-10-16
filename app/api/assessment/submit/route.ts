import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { evaluateQuizSubmission } from '@/lib/lms/assessment-service'
import { issueCertificate } from '@/lib/lms/certificate-service'
import { createClient } from '@/lib/supabase/server'

const submissionSchema = z.object({
  answers: z.record(z.string(), z.number()),
  programmeTitle: z.string().default('AI Development & Automation'),
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

    const body = await req.json()
    const parsed = submissionSchema.safeParse(body)
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
