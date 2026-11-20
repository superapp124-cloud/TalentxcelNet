import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { recordFunnelEvent, getTruthfulGrowthMetrics } from '@/lib/commerce/entitlements'
import { getServerAccess } from '@/lib/auth/server-access'
import { parseJsonWithLimit, ANALYTICS_MAX_PAYLOAD_BYTES } from '@/lib/security/request-validator'

const eventSchema = z.object({
  eventName: z.enum([
    'landing_view',
    'domain_selected',
    'free_test_started',
    'free_test_completed',
    'plan_viewed',
    'checkout_initiated',
    'payment_succeeded',
    'payment_failed',
    'entitlement_activated',
  ]),
  domain: z.enum(['assessment', 'skill', 'academic']).optional(),
  userId: z.string().max(128).optional(),
  sessionId: z.string().min(1).max(128),
  metadata: z
    .record(z.string().max(64), z.unknown())
    .refine((obj) => Object.keys(obj).length <= 20, {
      message: 'metadata cannot exceed 20 properties',
    })
    .optional(),
})

export async function POST(req: NextRequest) {
  try {
    const parseResult = await parseJsonWithLimit(req, ANALYTICS_MAX_PAYLOAD_BYTES)
    if (!parseResult.success) {
      return parseResult.errorResponse
    }

    const parsed = eventSchema.safeParse(parseResult.data)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid event format' }, { status: 400 })
    }

    const recorded = await recordFunnelEvent(parsed.data)
    return NextResponse.json({ success: true, eventId: recorded.id })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const access = await getServerAccess('admin')
    if (!access.authorization.allowed) {
      return NextResponse.json({ error: access.authorization.status === 401 ? 'Authentication required' : 'Insufficient permissions' }, { status: access.authorization.status })
    }
    const metrics = getTruthfulGrowthMetrics()
    return NextResponse.json(metrics)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load funnel metrics' }, { status: 500 })
  }
}
