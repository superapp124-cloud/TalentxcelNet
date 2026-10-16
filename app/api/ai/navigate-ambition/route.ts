import { NextRequest, NextResponse } from 'next/server'
import { resolveAmbitionQuery } from '@/lib/ai/ambition-navigator'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const rawAmbition = body?.ambition || body?.query || ''

    if (!rawAmbition || typeof rawAmbition !== 'string') {
      return NextResponse.json(
        { error: 'A valid ambition prompt is required (e.g. "I want to become an AI developer")' },
        { status: 400 }
      )
    }

    const result = resolveAmbitionQuery(rawAmbition)

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to process ambition query' },
      { status: 500 }
    )
  }
}
