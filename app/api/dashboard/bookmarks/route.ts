import { NextRequest, NextResponse } from 'next/server'
import { getServerAccess } from '@/lib/auth/server-access'
import { parseJsonWithLimit, DEFAULT_MAX_PAYLOAD_BYTES } from '@/lib/security/request-validator'
import {
  addLearnerBookmark,
  bookmarkCreateSchema,
  removeLearnerBookmark,
} from '@/lib/dashboard/learner-intelligence'

export async function POST(req: NextRequest) {
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

  const validated = bookmarkCreateSchema.safeParse(parsed.data)
  if (!validated.success) {
    return NextResponse.json(
      { error: 'Invalid bookmark payload', details: validated.error.flatten() },
      { status: 400 }
    )
  }

  const bookmark = await addLearnerBookmark(access.user.id, validated.data)
  return NextResponse.json({ ok: true, bookmark }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
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

  const id = req.nextUrl.searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'Missing bookmark id' }, { status: 400 })
  }

  await removeLearnerBookmark(access.user.id, id)
  return NextResponse.json({ ok: true })
}
