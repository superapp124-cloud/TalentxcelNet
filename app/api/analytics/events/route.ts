import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  parseJsonWithLimit,
  ANALYTICS_MAX_PAYLOAD_BYTES,
} from '@/lib/security/request-validator'
import {
  analyticsBatchSchema,
  analyticsEventInputSchema,
  checkAnalyticsRateLimit,
  ingestAnalyticsEvents,
  type AnalyticsEventInput,
} from '@/lib/analytics/visitor-intelligence'
import {
  attachVisitorSignatureCookie,
  readVisitorTokenFromRequest,
  signVisitorId,
  verifyVisitorToken,
} from '@/lib/analytics/visitor-token'

export async function POST(req: NextRequest) {
  const clientIp =
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'

  if (!checkAnalyticsRateLimit(`events:${clientIp}`)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded for analytics ingestion' },
      { status: 429 }
    )
  }

  const parsedBody = await parseJsonWithLimit<unknown>(req, ANALYTICS_MAX_PAYLOAD_BYTES)
  if (!parsedBody.success) {
    return parsedBody.errorResponse
  }

  let events: AnalyticsEventInput[]
  const batchCheck = analyticsBatchSchema.safeParse(parsedBody.data)
  if (batchCheck.success) {
    events = batchCheck.data.events
  } else {
    const singleCheck = analyticsEventInputSchema.safeParse(parsedBody.data)
    if (!singleCheck.success) {
      return NextResponse.json(
        { error: 'Invalid analytics event payload', details: singleCheck.error.flatten() },
        { status: 400 }
      )
    }
    events = [singleCheck.data]
  }

  let authenticatedUserId: string | null = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    authenticatedUserId = data.user?.id ?? null
  } catch {
    authenticatedUserId = null
  }

  const result = await ingestAnalyticsEvents(events, {
    authenticatedUserId,
    userAgent: req.headers.get('user-agent'),
    countryCode: req.headers.get('cf-ipcountry'),
    region: req.headers.get('cf-region-code'),
  })

  const res = NextResponse.json(
    {
      ok: true,
      accepted: result.accepted,
      deduplicated: result.deduplicated,
    },
    { status: 202 }
  )

  const primaryVisitorId = events[0]?.anonymousVisitorId
  if (primaryVisitorId) {
    const existingToken = readVisitorTokenFromRequest(req)
    const alreadyValid = await verifyVisitorToken(existingToken, primaryVisitorId)
    if (!alreadyValid) {
      const signed = await signVisitorId(primaryVisitorId)
      if (signed) {
        attachVisitorSignatureCookie(res, signed)
      }
    }
  }

  return res
}
