import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { recordFunnelEvent, getTruthfulGrowthMetrics } from '@/lib/commerce/entitlements'

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
  userId: z.string().optional(),
  sessionId: z.string(),
  metadata: z.record(z.unknown()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = eventSchema.safeParse(body)

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
    const metrics = getTruthfulGrowthMetrics()
    return NextResponse.json(metrics)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load funnel metrics' }, { status: 500 })
  }
}
