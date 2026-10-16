# Deployment Guide

## Prerequisites

- Vercel account
- Supabase project credentials (`https://wvuvriewskvvievacida.supabase.co`)
- Domain control for `talentxcel.net` and `academy.talentxcel.net`
- AI provider API key (OpenAI / Gemini / Anthropic)
- Payment provider credentials (Razorpay sandbox mode first)

## Environment Variables

Copy `.env.example` to `.env.local` or configure in Vercel project settings:

### Required
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (`https://wvuvriewskvvievacida.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase publishable key
- `SUPABASE_SERVICE_ROLE_KEY` — Server-only privileged key (NEVER in browser code)

### AI Configuration
- `AI_PRIMARY_PROVIDER` — `openai`, `google`, or `anthropic` (defaults to deterministic fallback when keys absent)
- `OPENAI_API_KEY` / `GOOGLE_AI_API_KEY` / `ANTHROPIC_API_KEY`

### Commerce (Sandbox)
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `PAYMENT_MODE` — `sandbox`

## Vercel Deployment

1. Link repository `https://github.com/superapp124-cloud/TalentxcelNet`
2. Set Root Directory to `./`
3. Framework: Next.js
4. Configure environment variables in Vercel settings
5. Trigger initial deployment

## Database Migrations

Apply timestamped migrations in `supabase/migrations/` sequentially:
```bash
# Using Supabase CLI
supabase link --project-ref wvuvriewskvvievacida
supabase db push
```

## Domain Configuration

- `talentxcel.net`: Apex domain points to Vercel A records. CNAME `www` points to `cname.vercel-dns.com`.
- `academy.talentxcel.net`: CNAME `academy` points to `cname.vercel-dns.com`.
- In Supabase Auth > URL Configuration, add both domains to allowed redirect URLs.
