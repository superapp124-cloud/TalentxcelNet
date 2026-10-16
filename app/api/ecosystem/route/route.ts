import { NextRequest, NextResponse } from 'next/server'
import { routeEcosystemIntent } from '@/lib/ai/ecosystem-router'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { query, context } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'query parameter is required and must be a string' },
        { status: 400 }
      )
    }

    const routeResult = routeEcosystemIntent(query, context)

    return NextResponse.json(routeResult)
  } catch (error) {
    console.error('Ecosystem router error:', error)
    return NextResponse.json(
      { error: 'Internal server error processing ecosystem routing request' },
      { status: 500 }
    )
  }
}
