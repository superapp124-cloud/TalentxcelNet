import { NextRequest, NextResponse } from 'next/server'
import { verifyReferralDetailed } from '@/lib/ecosystem/referral-engine'
import { createClient } from '@/lib/supabase/server'

// Rate limiter for referral tracking ingestion (max 30/min per IP)
const ipTrackingCounts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string, limit: number = 30, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = ipTrackingCounts.get(ip)

  if (!record || now > record.resetAt) {
    ipTrackingCounts.set(ip, { count: 1, resetAt: now + windowMs })
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
    if (!checkRateLimit(ip, 30, 60000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Too many tracking requests.' },
        { status: 429 }
      )
    }

    // Payload size guard: reject bodies over 8KB
    const contentLength = req.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > 8192) {
      return NextResponse.json(
        { error: 'Payload too large. Maximum 8KB permitted.' },
        { status: 413 }
      )
    }

    const body = await req.json()
    const {
      sourceBrand,
      destinationHost,
      destinationPath,
      userIntent,
      campaign,
      timestamp,
      signature,
      conversionStatus,
    } = body

    // Strict parameter presence
    if (!sourceBrand || !destinationHost || !userIntent || !timestamp || !signature) {
      return NextResponse.json(
        { error: 'Missing required referral tracking fields' },
        { status: 400 }
      )
    }

    // String length guards to prevent memory / database exhaustion
    if (
      typeof sourceBrand !== 'string' || sourceBrand.length > 64 ||
      typeof destinationHost !== 'string' || destinationHost.length > 256 ||
      typeof userIntent !== 'string' || userIntent.length > 64 ||
      typeof signature !== 'string' || signature.length > 128
    ) {
      return NextResponse.json({ error: 'Payload fields exceed length constraints' }, { status: 400 })
    }

    // Cryptographic verification
    const verification = verifyReferralDetailed(
      sourceBrand,
      destinationHost,
      userIntent,
      timestamp.toString(),
      signature,
      destinationPath || '/',
      campaign || 'ecosystem_growth'
    )

    if (!verification.isValid) {
      return NextResponse.json(
        {
          error: 'Referral verification failed: invalid, tampered, or expired signature',
          code: verification.errorCode,
        },
        { status: 403 }
      )
    }

    // Persist to database if Supabase is configured
    try {
      const supabase = await createClient()
      const status = conversionStatus === 'converted' ? 'converted' : 'click_recorded'

      await (supabase as any).from('ecosystem_referrals').insert({
        source_brand: sourceBrand,
        destination_brand: destinationHost,
        source_url: `https://${sourceBrand}`,
        destination_url: `https://${destinationHost}${destinationPath || '/'}`,
        user_intent: userIntent,
        campaign: campaign || 'ecosystem_growth',
        conversion_status: status,
        metadata: {
          ipHash: Buffer.from(ip).toString('base64').slice(0, 12),
          userAgent: req.headers.get('user-agent')?.slice(0, 100) || 'unknown',
          verifiedAt: new Date().toISOString(),
        },
      })
    } catch (dbErr: any) {
      console.warn('Ecosystem referral DB persistence skipped/failed:', dbErr.message)
    }

    return NextResponse.json({
      success: true,
      tracked: true,
      intent: verification.verifiedPayload?.userIntent,
      destination: verification.verifiedPayload?.destinationHost,
    })
  } catch (err: any) {
    console.error('Referral tracking ingestion error:', err.message)
    return NextResponse.json(
      { error: 'Internal server error processing referral event' },
      { status: 500 }
    )
  }
}
