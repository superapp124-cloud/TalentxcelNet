# Cloudflare Production Readiness Report — TalentXcel.net (Free Plan Only)

**Date:** 2026-11-26  
**Candidate Worker:** `talentxcelnet` (`https://talentxcelnet.talentxcel.workers.dev`, Version `4a149309-a7ea-4293-9d01-dd7e2666b65d`)  
**Target Zone:** `talentxcel.net` (Zone ID: `aaa1dc56c72f959526b4287be8f5d8c7`, Free Website plan)

---

## 1. Qualification Verdict: **CONDITIONAL GO (Free-Plan Compatible with Documented Risks & Missing Secrets)**

| Qualification Gate | Result | Details |
|---|---|---|
| **No Paid Services / No R2 / No Plan Upgrade** | **PASS** | Runs 100% on Free Workers + Free KV + Free `caches.default` + Free Workers Assets. |
| **Build, Type-Check & Unit Tests** | **PASS** | `pnpm type-check` (`0` errors), `pnpm run build:vinext` (passed), `pnpm test` (**25/25 files, 248/248 tests passed**). |
| **Live `workers.dev` Route & Asset Validation** | **PASS** | All 15 tested routes/assets + Supabase-backed `/api/checkout/entitlements`, `/api/questions/bank`, `/programmes` behaved as expected (`0` Worker errors). |
| **KV Cache Safety** | **PASS (with guard)** | `caches.default` handles repeat public hits at edge; `wrapKvQuotaSafe` prevents HTTP 500 if 1,000 KV writes/day is exceeded. |
| **10 ms CPU Limit** | **CONDITIONAL** | Repeat public hits via `caches.default` on custom domain use `< 1 ms` CPU. Uncached SSR measured `26.75 ms` P50 / `134.37 ms` P99 (`0` errors observed, but exceeds 10 ms nominal Free limit and risks `1102` under heavy uncached/authenticated SSR load). |
| **Production Secrets** | **BLOCKED ON SECRETS** | `.env.local` (16 vars) uploaded; **5 critical/high server secrets missing** (`RAZORPAY_WEBHOOK_SECRET`, `OPENAI_API_KEY`, `CERTIFICATE_SIGNING_SECRET`, `PARENT_CONSENT_SECRET`, `RESEND_API_KEY`). |
| **Custom-Domain Binding Supported on Free** | **PASS** | Workers Custom Domains are supported on Free Website zones (`talentxcel.net`, `www.talentxcel.net`). |

---

## 2. Controlled Cutover Plan (When Approved — NOT Executed Yet)

1. **Upload Missing Secrets** (before routing live user traffic):
   ```powershell
   pnpm exec cf workers secrets update RAZORPAY_WEBHOOK_SECRET --worker talentxcelnet
   pnpm exec cf workers secrets update OPENAI_API_KEY --worker talentxcelnet
   pnpm exec cf workers secrets update CERTIFICATE_SIGNING_SECRET --worker talentxcelnet
   pnpm exec cf workers secrets update PARENT_CONSENT_SECRET --worker talentxcelnet
   pnpm exec cf workers secrets update RESEND_API_KEY --worker talentxcelnet
   ```
2. **Remove Conflicting Vercel DNS Records** in zone `aaa1dc56c72f959526b4287be8f5d8c7`:
   - `A talentxcel.net -> 76.76.21.21` (Record ID: `88b0e273efb0d3fa3925cd4b7b0ecf53`)
   - `CNAME www.talentxcel.net -> talentxcel.net` (Record ID: `97d8b064d1598b4b88ae318991870fab`)
3. **Bind Custom Domains** to Worker `talentxcelnet`:
   - `talentxcel.net` and `www.talentxcel.net` (plus `academy.talentxcel.net` and `ai.talentxcel.net` when ready).
4. **Verify Live Production:** Check `https://talentxcel.net`, `https://www.talentxcel.net`, `/api/health`, `/sitemap.xml`, `/auth/login`, `/dashboard` redirect, and Razorpay checkout.
5. **Keep Vercel Intact** until Cloudflare traffic and error rates (`workersInvocationsAdaptive`) are confirmed clean.

---

## 3. Instant Rollback Plan

If `talentxcel.net` experiences `1102` CPU errors or regressions after cutover:
1. Detach `talentxcel.net` and `www.talentxcel.net` from Worker `talentxcelnet` Custom Domains.
2. Re-create `A talentxcel.net -> 76.76.21.21` (Proxied) and `CNAME www.talentxcel.net -> talentxcel.net` (Proxied) in Cloudflare DNS (or point to an unpaused Vercel deployment).
