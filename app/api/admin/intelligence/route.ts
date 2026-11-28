import { NextRequest, NextResponse } from 'next/server'
import { getServerAccess } from '@/lib/auth/server-access'
import {
  getAdminIntelligenceReport,
  type DateRangePreset,
} from '@/lib/analytics/admin-intelligence'

const VALID_RANGES = new Set<DateRangePreset>([
  'today',
  'yesterday',
  '7d',
  '30d',
  '90d',
  'custom',
])

export async function GET(req: NextRequest) {
  const access = await getServerAccess('admin')
  if (!access.authorization.allowed) {
    return NextResponse.json(
      { error: access.authorization.reason || 'Admin access required' },
      { status: access.authorization.status }
    )
  }
  if (!access.user) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
  }

  const sp = req.nextUrl.searchParams
  const rawRange = (sp.get('range') || '7d') as DateRangePreset
  const range: DateRangePreset = VALID_RANGES.has(rawRange) ? rawRange : '7d'
  const from = sp.get('from')
  const to = sp.get('to')
  const userPage = Math.max(1, Number(sp.get('userPage') || '1') || 1)
  const userPageSize = Math.min(50, Math.max(1, Number(sp.get('userPageSize') || '15') || 15))
  const search = sp.get('search')

  const report = await getAdminIntelligenceReport({
    range,
    from,
    to,
    userPage,
    userPageSize,
    search,
  })

  return NextResponse.json({ ok: true, report })
}
