import { NextRequest, NextResponse } from 'next/server'
import { routeEcosystemIntent } from '@/lib/ai/ecosystem-router'

// In-memory rate limiter (max 40 queries/minute per IP)
const ipRouteCounts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string, limit: number = 40, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = ipRouteCounts.get(ip)

  if (!record || now > record.resetAt) {
    ipRouteCounts.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    if (!checkRateLimit(ip, 40, 60000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Too many routing queries.' },
        { status: 429 }
      )
    }

    // Payload size guard: max 4KB
    const contentLength = req.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > 4096) {
      return NextResponse.json(
        { error: 'Payload too large. Maximum 4KB permitted.' },
        { status: 413 }
      )
    }

    const body = await req.json()
    const { query, context } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'query parameter is required and must be a string' },
        { status: 400 }
      )
    }

    // Length limit checks
    if (query.trim().length === 0) {
      return NextResponse.json(
        { error: 'query parameter cannot be empty' },
        { status: 400 }
      )
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: 'query parameter exceeds maximum length of 500 characters' },
        { status: 400 }
      )
    }

    if (context && (typeof context !== 'string' || context.length > 500)) {
      return NextResponse.json(
        { error: 'context parameter exceeds maximum length of 500 characters' },
        { status: 400 }
      )
    }

    // Sanitize input (strip dangerous script/control characters)
    const sanitizedQuery = query.replace(/[<>]/g, '').trim()
    const sanitizedContext = context ? context.replace(/[<>]/g, '').trim() : undefined

    const routeResult = routeEcosystemIntent(sanitizedQuery, sanitizedContext)

    return NextResponse.json(routeResult)
  } catch (error: any) {
    console.error('Ecosystem router error:', error.message)
    return NextResponse.json(
      { error: 'Internal server error processing ecosystem routing request' },
      { status: 500 }
    )
  }
}
