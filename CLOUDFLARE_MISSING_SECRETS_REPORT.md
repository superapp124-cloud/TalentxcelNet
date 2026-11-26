# Cloudflare Missing Secrets Report — TalentXcel.net

**Worker:** `talentxcelnet`  
**Date:** 2026-11-26  
**Source Audit:** `git grep` of `process.env.*` across `app/`, `lib/`, `components/`, and `packages/` compared against keys present in `.env.local` and uploaded to `talentxcelnet`.

---

## 1. Already Uploaded to Cloudflare Worker (`talentxcelnet`)

All 16 variables present in `.env.local` have been uploaded securely via `cf workers secrets bulk-edit`:

- **Public (`NEXT_PUBLIC_*`)**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_ACADEMY_URL`, `NEXT_PUBLIC_AI_URL`, `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_FEATURE_AI_TUTOR`, `NEXT_PUBLIC_FEATURE_PAYMENTS`, `NEXT_PUBLIC_FEATURE_OFFLINE`, `NEXT_PUBLIC_FEATURE_ADMISSIONS`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- **Server-side**: `ECOSYSTEM_REFERRAL_SECRET`, `PAYMENT_MODE`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

---

## 2. Missing Server-Side Secrets (Not in `.env.local`)

| Variable Name | Referenced In | Impact if Missing | Priority |
|---|---|---|---|
| `RAZORPAY_WEBHOOK_SECRET` | `app/api/commerce/webhook/route.ts:65` | `/api/commerce/webhook` fails closed with HTTP `500`; Razorpay payment/refund webhooks will fail | **Critical** |
| `OPENAI_API_KEY` | `lib/ai/router.ts:91,97` | Primary AI provider (`openai`) disabled; AI tutor / evaluation routes fall back or fail | **High** |
| `GOOGLE_AI_API_KEY` | `lib/ai/router.ts:132,134` | Secondary/fallback AI provider (Gemini) unavailable | **Medium** |
| `CERTIFICATE_SIGNING_SECRET` | `app/api/skills/backpack/evaluate/route.ts:47` | Certificate signing / verification in backpack evaluation cannot use configured secret | **High** |
| `PARENT_CONSENT_SECRET` | `lib/auth/parent-consent-service.ts:13` | Parent consent token signing/verification cannot use configured secret | **High** |
| `RESEND_API_KEY` | `lib/integrations/email.ts:15` | Transactional emails via Resend will not send | **High** |
| `CHATR_ECOSYSTEM_API_KEY` | `lib/integrations/chatr.ts:23` | Chatr ecosystem integration disabled/unauthenticated | **Low / Optional** |
| `CHATR_ECOSYSTEM_ENDPOINT` | `lib/integrations/chatr.ts:24` | Chatr ecosystem endpoint unconfigured | **Low / Optional** |
| `NUTY_TALES_API_KEY` | `lib/integrations/nuty-tales.ts:25` | Nuty Tales ecosystem integration disabled/unauthenticated | **Low / Optional** |
| `NUTY_TALES_ENDPOINT` | `lib/integrations/nuty-tales.ts:26` | Nuty Tales ecosystem endpoint unconfigured | **Low / Optional** |

---

## 3. Optional / Defaulted Server-Side Variables

| Variable Name | Referenced In | Default Value |
|---|---|---|
| `AI_PRIMARY_PROVIDER` | `lib/ai/router.ts:87` | `'openai'` |
| `AI_DAILY_TOKEN_LIMIT` | `lib/ai/router.ts:8` | `'50000'` |
| `SYSTEM_FROM_EMAIL` | `lib/integrations/email.ts:16` | `'admissions@talentxcel.net'` |

---

## 4. Note on `SUPABASE_SERVICE_ROLE_KEY`

- `SUPABASE_SERVICE_ROLE_KEY` was checked across `app/`, `lib/`, `components/`, and `packages/` and is **not currently referenced** anywhere in the application codebase. Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are used (`lib/supabase/config.ts`).

---

## 5. How to Upload Missing Secrets Before Cutover

Run for each missing secret (without committing values to git):

```powershell
pnpm exec cf workers secrets update RAZORPAY_WEBHOOK_SECRET --worker talentxcelnet
pnpm exec cf workers secrets update OPENAI_API_KEY --worker talentxcelnet
pnpm exec cf workers secrets update GOOGLE_AI_API_KEY --worker talentxcelnet
pnpm exec cf workers secrets update CERTIFICATE_SIGNING_SECRET --worker talentxcelnet
pnpm exec cf workers secrets update PARENT_CONSENT_SECRET --worker talentxcelnet
pnpm exec cf workers secrets update RESEND_API_KEY --worker talentxcelnet
```

For GitHub Actions CI/CD (`.github/workflows/deploy-cloudflare.yml`), also add `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, and the `NEXT_PUBLIC_*` build variables to GitHub Repository Secrets.
