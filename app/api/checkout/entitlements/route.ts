import { NextRequest, NextResponse } from 'next/server'
import { getActiveEntitlements } from '@/lib/commerce/entitlements'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const queryUser = searchParams.get('userId') || searchParams.get('sessionId')

    let effectiveId = queryUser

    if (!effectiveId) {
      try {
        const supabase = await createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          effectiveId = user.id
        }
      } catch {
        // No auth
      }
    }

    if (!effectiveId) {
      return NextResponse.json({ entitlements: [] })
    }

    const entitlements = await getActiveEntitlements(effectiveId)
    return NextResponse.json({ entitlements })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch entitlements' },
      { status: 500 }
    )
  }
}
