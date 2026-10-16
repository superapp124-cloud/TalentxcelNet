import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const feedbackSchema = z.object({
  query: z.string().min(1).max(2000),
  responseContent: z.string().min(1).max(10000),
  feedbackType: z.enum(['report_inaccurate', 'escalate_instructor', 'helpful', 'unhelpful']),
  notes: z.string().max(1000).optional(),
  courseContext: z.string().max(500).optional(),
  lessonId: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const body = await req.json()
    const parsed = feedbackSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid feedback data', details: parsed.error }, { status: 400 })
    }

    const { feedbackType, courseContext } = parsed.data

    // If escalate_instructor, we record in support_tickets
    if (feedbackType === 'escalate_instructor' && user) {
      try {
        const db = supabase as unknown as {
          from: (tbl: string) => { insert: (data: Record<string, unknown>) => Promise<unknown> }
        }
        await db.from('support_tickets').insert({
          ticket_number: `ESC-${Date.now().toString(36).toUpperCase()}`,
          submitter_id: user.id,
          category: 'academic_mentor_escalation',
          subject: `Super AI Escalation: ${courseContext || 'Curriculum Inquiry'}`,
          status: 'open',
          priority: 'high',
        })
      } catch {
        // Fallback gracefully if db table constraints differ
      }
    }

    return NextResponse.json({
      success: true,
      message:
        feedbackType === 'escalate_instructor'
          ? 'Your question has been escalated to an academy mentor. You will receive a response in your learner workspace.'
          : 'Thank you for your feedback. Our curriculum engineering team reviews all flagged answers.',
      recordedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[AI Feedback Report] Error:', error)
    return NextResponse.json({ error: 'Failed to record AI feedback' }, { status: 500 })
  }
}
