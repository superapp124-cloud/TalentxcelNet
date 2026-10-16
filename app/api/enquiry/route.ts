import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const enquirySchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15).optional(),
  programmeInterest: z.string().uuid().optional(),
  message: z.string().max(500).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  consent: z.boolean().refine((v) => v === true, 'Consent is required'),
})

// Simple in-memory rate limiter (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate
    const body = await request.json()
    const parsed = enquirySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data.', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { fullName, email, phone, programmeInterest, message, utmSource, utmMedium, utmCampaign } = parsed.data

    // Use service-role client to bypass RLS for lead creation
    // Note: In production, use createClient with service role key via env variable
    const supabase = await createClient()

    // Check for duplicate
    const { data: existing } = (await supabase
      .from('leads')
      .select('id')
      .eq('email', email.toLowerCase())
      .limit(1)
      .maybeSingle()) as { data: { id: string } | null }

    const leadData = {
      email: email.toLowerCase(),
      full_name: fullName,
      phone: phone || null,
      programme_interest: programmeInterest || null,
      source: 'website_enquiry',
      utm_source: utmSource || null,
      utm_medium: utmMedium || null,
      utm_campaign: utmCampaign || null,
      is_duplicate: !!existing,
      duplicate_of: existing?.id || null,
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from('leads') as any).insert(leadData)

    if (error) {
      console.error('[enquiry] DB error:', error.code)
      return NextResponse.json(
        { error: 'Unable to process your enquiry. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Enquiry received. We will be in touch soon.' })
  } catch (err) {
    console.error('[enquiry] Unexpected error')
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 })
  }
}
