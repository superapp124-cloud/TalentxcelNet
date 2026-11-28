import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import {
  parseJsonWithLimit,
  ANALYTICS_MAX_PAYLOAD_BYTES,
} from '@/lib/security/request-validator'
import {
  checkAnalyticsRateLimit,
  reconcileAnonymousVisitor,
} from '@/lib/analytics/visitor-intelligence'
import {
  readVisitorTokenFromRequest,
  verifyVisitorToken,
} from '@/lib/analytics/visitor-token'

const reconcileSchema = z.object({
  anonymousVisitorId: z.string().min(8).max(128).regex(/^[a-zA-Z0-9_-]+$/),
  sessionId: z.string().min(8).max(128).regex(/^[a-zA-Z0-9_-]+$/).optional(),
})

export async function POST(req: NextRequest) {
  let userId: string | null = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    userId = data.user?.id ?? null
  } catch {
    userId = null
  }

  if (!userId) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  if (!checkAnalyticsRateLimit(`reconcile:${userId}`)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  const parsed = await parseJsonWithLimit<unknown>(req, ANALYTICS_MAX_PAYLOAD_BYTES)
  if (!parsed.success) {
    return parsed.errorResponse
  }

  const body = reconcileSchema.safeParse(parsed.data)
  if (!body.success) {
    return NextResponse.json(
      { error: 'Invalid reconciliation payload', details: body.error.flatten() },
      { status: 400 }
    )
  }

  const visitorToken = readVisitorTokenFromRequest(req)
  const hasValidProof = await verifyVisitorToken(visitorToken, body.data.anonymousVisitorId)
  if (!hasValidProof) {
    return NextResponse.json(
      { error: 'Visitor ownership proof missing or invalid' },
      { status: 403 }
    )
  }

  const result = await reconcileAnonymousVisitor({
    anonymousVisitorId: body.data.anonymousVisitorId,
    sessionId: body.data.sessionId,
    authenticatedUserId: userId,
  })

  return NextResponse.json({
    ok: true,
    reconciledEvents: result.reconciledEvents,
    reconciledSessions: result.reconciledSessions,
  })
}
