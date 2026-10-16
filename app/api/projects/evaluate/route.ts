import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { evaluateProjectSubmission, getGuidedProject } from '@/lib/lms/project-service'
import { createClient } from '@/lib/supabase/server'

const submissionSchema = z.object({
  projectId: z.string().default('rag-engine'),
  code: z.string().min(10).max(50000),
  submissionType: z.enum(['code', 'repository_url', 'artifact']).default('code'),
  repoUrl: z.string().url().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const body = await req.json()
    const parsed = submissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission data', details: parsed.error }, { status: 400 })
    }

    const { projectId, code } = parsed.data
    const project = getGuidedProject(projectId)

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Safely evaluate submission in sandbox
    const result = await evaluateProjectSubmission(code, projectId)

    // Log to Supabase audit or interaction history if authenticated
    if (user) {
      try {
        const db = supabase as unknown as {
          from: (tbl: string) => { insert: (data: Record<string, unknown>) => Promise<unknown> }
        }
        await db.from('audit_events').insert({
          user_id: user.id,
          action: 'project_submission_evaluated',
          entity_type: 'guided_project',
          entity_id: projectId,
          metadata: {
            totalScore: result.totalScore,
            passed: result.passed,
            certifiedEligible: result.certifiedEligible,
          },
        })
      } catch {
        // Continue gracefully
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('[Project Evaluation API] Error:', error)
    return NextResponse.json({ error: 'Failed to evaluate project submission' }, { status: 500 })
  }
}
