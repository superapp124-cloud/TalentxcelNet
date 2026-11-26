# Cloudflare Secret Dependency Report — TalentXcel.net

**Worker:** `talentxcelnet`  
**Audit Method:** `git grep` of `process.env.*` across `app/`, `lib/`, `components/`, and `packages/` compared against `.env.local` and `cf workers secrets list --worker talentxcelnet`.

---

## 1. Feature & Secret Classification Matrix

| Feature / Area | Required Env Vars / Secrets | Present on Worker? | Classification | Notes |
|---|---|---|---|---|
| **Core Homepage, Static & SEO Pages** | `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (`.env.local`) | **Verified** | HTTP `200` on `/`, `/programmes`, `/tools`, `/formulas`, `/practice`, `/challenge` |
| **Sitemaps & `robots.txt`** | None (static/core curriculum builders) | N/A | **Verified** | HTTP `200` on `/robots.txt`, `/sitemap.xml`, `/sitemap-tools.xml`, `/sitemap-questions-1.xml` |
| **Supabase Client & Auth Middleware** | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (`.env.local`) | **Verified** | `/auth/login` (`200`), `/dashboard` (`307` → `/auth/login`), `/api/checkout/entitlements` (`200`), `/api/questions/bank` (`401`). `SUPABASE_SERVICE_ROLE_KEY` is **not referenced** in the codebase. |
| **Razorpay Checkout Order Creation** | `PAYMENT_MODE`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Yes (`.env.local`) | **Verified with limitations** | Keys are bound; live order creation not executed against production Razorpay |
| **Razorpay Webhooks (`/api/commerce/webhook`)** | `RAZORPAY_WEBHOOK_SECRET` (`app/api/commerce/webhook/route.ts:65`) | **NO** | **Not verified** | Fails closed with HTTP `500` when missing; payment/refund webhook processing will fail until uploaded |
| **AI Tutor & Project Evaluation** | `OPENAI_API_KEY` (`lib/ai/router.ts:91,97`), `GOOGLE_AI_API_KEY` (`lib/ai/router.ts:132,134`), `AI_PRIMARY_PROVIDER`, `AI_DAILY_TOKEN_LIMIT` | **NO** | **Not verified** | AI routes cannot call OpenAI or Gemini until keys are uploaded |
| **Certificate Signing (`/api/skills/backpack/evaluate`)** | `CERTIFICATE_SIGNING_SECRET` (`app/api/skills/backpack/evaluate/route.ts:47`) | **NO** | **Not verified** | Configured signing secret missing on Worker |
| **Parent Consent Signing** | `PARENT_CONSENT_SECRET` (`lib/auth/parent-consent-service.ts:13`) | **NO** | **Not verified** | Configured parent consent secret missing on Worker |
| **Transactional Email (Resend)** | `RESEND_API_KEY` (`lib/integrations/email.ts:15`), `SYSTEM_FROM_EMAIL` | **NO** | **Not verified** | Email sending disabled/fails without `RESEND_API_KEY` |
| **Ecosystem Cross-Brand Referral** | `ECOSYSTEM_REFERRAL_SECRET` | Yes (`.env.local`) | **Verified with limitations** | Secret uploaded; external ecosystem endpoints (`CHATR_ECOSYSTEM_*`, `NUTY_TALES_*`) are missing |
| **Chatr & Nuty Tales Integrations** | `CHATR_ECOSYSTEM_API_KEY`, `CHATR_ECOSYSTEM_ENDPOINT`, `NUTY_TALES_API_KEY`, `NUTY_TALES_ENDPOINT` | **NO** | **Not verified** | Optional cross-brand integrations |
| **Cloudflare R2 ISR Cache (`responseStoreAdapter`)** | R2 Subscription / Bucket | N/A | **Disabled intentionally** | Replaced with Free-only `kvDataAdapter` + `caches.default` |
| **Cloudflare Image Optimization** | Cloudflare Images Subscription | N/A | **Disabled intentionally** | `next/image` served unoptimized on Free plan |
