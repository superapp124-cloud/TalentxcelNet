# External Integrations

**Analysis Date:** 2026-11-19

## APIs & External Services

**Payment Processing:**
- Razorpay (`lib/commerce/razorpay.ts`, `app/api/checkout/`)
  - Used for subscription plans, test series passes, impulse ₹49 Pre-Board Revision Passes, and ₹99 SSB OIR Passes.
  - SDK/Client: REST API and client-side Razorpay Checkout modal (`https://checkout.razorpay.com/v1/checkout.js`).
  - Auth: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
  - Mode: Controlled by `PAYMENT_MODE` (`sandbox` vs `live`).

**AI & LLM Services:**
- Multi-provider AI Gateway (`lib/ai/router.ts`, `lib/ai/ambition-navigator.ts`, `lib/ai/tutor.ts`)
  - Primary Provider: Configurable via `AI_PRIMARY_PROVIDER` (`openai` | `google` | `anthropic`).
  - OpenAI: GPT-4o / GPT-4o-mini client via `OPENAI_API_KEY`.
  - Google Gemini: Gemini 1.5 / 2.0 API via `GOOGLE_AI_API_KEY`.
  - Anthropic: Claude API via `ANTHROPIC_API_KEY`.
  - Usage Limits: Controlled via `AI_DAILY_TOKEN_LIMIT` and `AI_MAX_CONTEXT_TOKENS`.

**Search Engine Indexing:**
- Google Search Console & Google Indexing API (`scripts/gsc-manager.mjs`, `scripts/inspect-urls.mjs`, `scripts/get-search-performance.mjs`)
  - Client: `googleapis` v188.0.0.
  - Auth: Google Service Account credentials (`talentxcel-seo-service-account.json`, `talentxcel-indexer@talentxcel-seo.iam.gserviceaccount.com`).
  - Scopes: `https://www.googleapis.com/auth/webmasters.readonly`, `https://www.googleapis.com/auth/indexing`.
- IndexNow Protocol (`scripts/indexnow-submitter.mjs`, `public/e5a8f2736194458bb61230491823901a.txt`)
  - Direct REST POST to `https://api.indexnow.org/indexnow`.
  - Targets: Microsoft Bing, Copilot, Yahoo, Naver, Seznam.
  - Auth: Key verification file hosted at `https://talentxcel.net/e5a8f2736194458bb61230491823901a.txt`.

**Communications & Messaging:**
- Email Service (`lib/integrations/email.ts`)
  - Client: Resend API.
  - Auth: `RESEND_API_KEY`.
  - Sender: `EMAIL_FROM_ADDRESS` (`noreply@talentxcel.net`), `EMAIL_FROM_NAME`.
- External Educational Ecosystems (`lib/integrations/chatr.ts`, `lib/integrations/nuty-tales.ts`)
  - Deep-link integrations for student communication and interactive storytelling.

## Data Storage

**Databases:**
- Supabase PostgreSQL Cloud (`lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/middleware.ts`)
  - Host: `https://wvuvriewskvvievacida.supabase.co`
  - Connection: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
  - Client: `@supabase/supabase-js` and `@supabase/ssr`.
  - Security: Row-Level Security (RLS) policies enforcing tenant isolation for students, parents, and admins.
  - Fallback: In-memory memory ledger fallback (`lib/commerce/entitlements.ts`) during local test execution and offline states.

**File Storage:**
- Supabase Storage (`lib/supabase/`)
  - Bucket storage for candidate certificates, school projects, and exam attachments.
  - Local static fallback for public branding and formula assets in `public/`.

**Caching:**
- Client-side IndexedDB (`idb`, `lib/offline/`) for offline assessment attempts, question banks, and sync queues.
- Next.js fetch cache and route segment caching with ISR for static programmatic pages (`app/sitemap.ts`, `app/(public)/practice/`).

## Authentication & Identity

**Auth Provider:**
- Supabase Auth (`lib/supabase/`, `app/(auth)/`)
  - Implementation: Cookie-based SSR authentication with `@supabase/ssr`.
  - Roles: `student`, `parent`, `educator`, `admin`.
  - Session lifecycle managed in `proxy.ts` (Next.js middleware equivalent).
  - Gated route guards for `/dashboard`, `/admin`, and `/api/*`.

## Monitoring & Observability

**Error Tracking:**
- Server-side error logging via structured console JSON logs (`app/api/health/route.ts`).
- Health probe route returning platform uptime and dependency status (`/api/health`).

**Logs:**
- Standard Next.js server logs aggregated in Vercel / deployment provider.
- GSC analytical scripts (`scripts/get-search-performance.mjs`) tracking search impressions, queries, and click-through rates.

## CI/CD & Deployment

**Hosting:**
- Production deployment on Vercel (`https://talentxcel.net`).
- Canonical domain rewrite: all `www.talentxcel.net` traffic redirected with 301 to `https://talentxcel.net` (`next.config.ts`).

**CI Pipeline:**
- Git repository tracked at `https://github.com/superapp124-cloud/TalentxcelNet.git`.
- Local verification pipeline: `pnpm type-check` (`tsc --noEmit`) and `pnpm test` (`vitest run`).

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL (validated at build time)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase public key (validated at build time)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase server admin key
- `NEXT_PUBLIC_APP_URL` - Root canonical URL (`https://talentxcel.net`)
- `INTERNAL_SECRET` - Cryptographic signature token for internal routes

**Optional env vars:**
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET` - Payment gateway credentials
- `OPENAI_API_KEY`, `GOOGLE_AI_API_KEY`, `ANTHROPIC_API_KEY` - AI provider credentials
- `RESEND_API_KEY` - Email dispatch credentials
- `PAYMENT_MODE` - Toggle sandbox vs live payments

**Secrets location:**
- Local secrets stored in `.env.local` (git-ignored).
- Production secrets managed via Vercel Project Environment Variables.

## Webhooks & Callbacks

**Incoming:**
- Razorpay Webhook (`app/api/checkout/webhook/route.ts` or payment listener) - Processes payment capture events, subscription renewals, and grants instant user entitlements.

**Outgoing:**
- IndexNow ping (`https://api.indexnow.org/indexnow`) - Notifies search engines when new programmatic pages or revision materials are deployed.

---

*Integration audit: 2026-11-19*
