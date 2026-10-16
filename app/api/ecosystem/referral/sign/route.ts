import { NextRequest, NextResponse } from 'next/server'
import { generateSecureReferralUrl, CrossBrandReferralParams } from '@/lib/ecosystem/referral-engine'
import { getDomainRecord } from '@/lib/ecosystem/registry'

// Simple in-memory rate limiter for signing requests (max 60/min per IP)
const ipRequestCounts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string, limit: number = 60, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = ipRequestCounts.get(ip)

  if (!record || now > record.resetAt) {
    ipRequestCounts.set(ip, { count: 1, resetAt: now + windowMs })
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
    if (!checkRateLimit(ip, 60, 60000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Too many signature requests.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { sourceBrand, destinationHost, destinationPath, userIntent, campaign } = body

    // Strict parameter validation
    if (!destinationHost || typeof destinationHost !== 'string') {
      return NextResponse.json({ error: 'Valid destinationHost is required' }, { status: 400 })
    }

    const domainRecord = getDomainRecord(destinationHost)
    if (!domainRecord) {
      return NextResponse.json(
        { error: 'destinationHost is not registered in the ecosystem domain registry' },
        { status: 403 }
      )
    }

    const validIntents = [
      'career_pathway',
      'resume_analysis',
      'academy_enrolment',
      'chatr_community',
      'nuty_commerce_sandbox',
    ]

    if (!userIntent || !validIntents.includes(userIntent)) {
      return NextResponse.json(
        { error: `Invalid userIntent. Must be one of: ${validIntents.join(', ')}` },
        { status: 400 }
      )
    }

    const validSourceBrands = ['talentxcel', 'talentxcel-academy', 'chatr', 'nuty-tales']
    const brand = validSourceBrands.includes(sourceBrand) ? sourceBrand : 'talentxcel-academy'

    const secureUrl = generateSecureReferralUrl({
      sourceBrand: brand,
      destinationHost,
      destinationPath: destinationPath || '/',
      userIntent,
      campaign: campaign || 'ecosystem_web',
    })

    return NextResponse.json({
      success: true,
      secureUrl,
      destinationHost: domainRecord.canonicalHostname,
    })
  } catch (error: any) {
    console.error('Referral signing error:', error.message)
    return NextResponse.json(
      { error: error.message || 'Failed to sign referral URL' },
      { status: 500 }
    )
  }
}
