import { NextRequest, NextResponse } from 'next/server'
import { getServerAccess } from '@/lib/auth/server-access'
import { parseJsonWithLimit, DEFAULT_MAX_PAYLOAD_BYTES } from '@/lib/security/request-validator'
import {
  loadLearnerWorkspaceFromDb,
  studyPreferencesPatchSchema,
  upsertStudyPreferences,
} from '@/lib/dashboard/learner-intelligence'

export async function GET() {
  const access = await getServerAccess('learner')
  if (!access.authorization.allowed) {
    return NextResponse.json(
      { error: access.authorization.reason || 'Authentication required' },
      { status: access.authorization.status }
    )
  }
  if (!access.user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const workspace = await loadLearnerWorkspaceFromDb(access.user.id, access.user.email)
  return NextResponse.json({ ok: true, workspace })
}

export async function PATCH(req: NextRequest) {
  const access = await getServerAccess('learner')
  if (!access.authorization.allowed) {
    return NextResponse.json(
      { error: access.authorization.reason || 'Authentication required' },
      { status: access.authorization.status }
    )
  }
  if (!access.user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const parsed = await parseJsonWithLimit<unknown>(req, DEFAULT_MAX_PAYLOAD_BYTES)
  if (!parsed.success) {
    return parsed.errorResponse
  }

  const validated = studyPreferencesPatchSchema.safeParse(parsed.data)
  if (!validated.success) {
    return NextResponse.json(
      { error: 'Invalid study preferences', details: validated.error.flatten() },
      { status: 400 }
    )
  }

  const preferences = await upsertStudyPreferences(access.user.id, validated.data)
  return NextResponse.json({ ok: true, preferences })
}
