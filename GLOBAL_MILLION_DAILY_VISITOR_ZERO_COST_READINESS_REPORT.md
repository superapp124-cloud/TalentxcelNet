# TalentXcel.net — Global Million-Daily-Visitor Zero-Cost Readiness Report

**Date:** 26 November 2026  
**Target Domain:** `https://talentxcel.net`  
**Cloudflare Worker:** `talentxcelnet` (Zone ID: `aaa1dc56c72f959526b4287be8f5d8c7`, Account ID: `5c0de6e3e2a535e09989aeafe26b6fc6`)  
**Financial Constraint:** Strictly **$0 additional cost** (Cloudflare Free plan only; no Paid Worker upgrade, no paid R2/queues/APIs, no DNS or plan changes)  
**Deployment Status:** **LOCAL REPOSITORY OPTIMIZED & VERIFIED — NOT YET DEPLOYED** (held pending release approval per Phase 9 change control)

---

## 1. Executive Summary

An independent live inspection of production (`talentxcelnet` Worker Version `4af6761b-a307-4cf6-92b4-8a3df04fd7da`) followed by a full codebase, SEO, database, and edge-caching engineering pass identified why `talentxcel.net` suffered `503`/`504` CPU timeouts on cache misses and declining Google Search Console (GSC) indexing despite having an active Cloudflare Free Cache Rule (`7c6ba33a49094edbba8d0a817f1ed27a`).

### Root Causes Identified in Live Production
1. **Dynamic Public Routes Blocked CDN Caching:** None of the 10 dynamic public SEO route groups (`/question/[id]`, `/solutions/ncert/...`, `/practice/...`, `/formulas/...`, `/competitive/...`, `/blog/[slug]`, `/programmes/[slug]`, `/programmes`) exported ISR `revalidate` (and `/programmes` called `cookies()` via `createClient()`). As a result, `vinext` emitted `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate` and `Vary: RSC, Next-Router-State-Tree, ...`, preventing both Cloudflare's CDN Cache Rule and `worker.ts` `caches.default` from caching HTML responses.
2. **Repeated `supabase.auth.getUser()` Calls on Public Pages:** `lib/supabase/middleware.ts` invoked `supabase.auth.getUser()` whenever any `sb-*` cookie existed, even on public SEO routes (`/question/*`, `/tools/*`, `/practice/*`, `/`).
3. **Cloudflare Smart Tiered Cache Disabled:** Zone setting `tiered_cache_smart_topology_enable` was `off` (verified `editable: true` on the Free plan), allowing cache misses across different regional PoPs to hit the single-isolate `10 ms` CPU Worker independently.
4. **Question Bank Index Dilution & Schema Errors:** In `packages/core/src/universal-engine/generators.ts`, Biology (`bioConcepts`: `2` templates), English (`grammarExercises`: `3` templates), Hindi (`vyakaranItems`: `3` templates), and Social Science (`sstItems`: `3` templates) cycle modulo question index with `[Context: ...]` appended, generating large volumes of near-duplicate/duplicate URLs across `106,440` total question pages. Additionally, Practice Problem (`Quiz`) JSON-LD blocks on `/competitive/[exam]/[section]` and `/practice/[board]/[class]/[subject]/[chapter]` lacked `eduQuestionType: "Multiple choice"` and `learningResourceType: "Practice problem"`, while `sitemap-core.xml` still listed `/about` (which 308-redirects to `/how-it-works`).

### Key Zero-Cost Remediation Delivered Locally
- Normalized edge caching in [`worker.ts`](worker.ts) and [`lib/cloudflare/edge-cache-policy.ts`](lib/cloudflare/edge-cache-policy.ts) so anonymous, non-RSC `GET` requests to verified public SEO paths emit CDN-cacheable `Cache-Control: public, max-age=300, s-maxage=86400, stale-while-revalidate=43200` (`Vary: Accept-Encoding`), while private routes, `sb-*` cookies, `Authorization` headers, `RSC` prefetches, subdomain roots (`academy.*`, `ai.*`), non-`200` responses, and `Set-Cookie` responses strictly bypass edge cache.
- Added `/question/*` KV bypass and a 15-minute KV quota circuit breaker in `createQuotaSafeKv()` to protect Cloudflare Free's `1,000` KV writes/day and `100,000` KV reads/day quota across `106,440` question URLs.
- Enabled ISR (`export const revalidate = 86400` or `3600`) across all 10 dynamic SEO route groups (all verified as `◐ ISR` in `pnpm run build:vinext`), eliminated `cookies()` on `/programmes`, and eliminated unnecessary `supabase.auth.getUser()` calls on public SEO traffic in [`lib/supabase/middleware.ts`](lib/supabase/middleware.ts).
- Added zero-deletion SEO indexing guardrails via [`lib/seo/question-quality.ts`](lib/seo/question-quality.ts) (`200 OK` preserved on all `106,440` URLs; `noindex, follow` on modulo-repeated template variants and deep numerical tails), fixed `Quiz` JSON-LD schemas, and removed `/about` from core sitemap generation.
- Built zero-cost automated monitoring via [`scripts/cf-free-observability.mjs`](scripts/cf-free-observability.mjs) and [`.github/workflows/production-health-monitor.yml`](.github/workflows/production-health-monitor.yml).

---

## 2. Phase 1 — Independent Live Verification (Pre-Change Baseline)

Live checks against `https://talentxcel.net` (`104.21.20.12`, deployed Worker Version `4af6761b-a307-4cf6-92b4-8a3df04fd7da`) established the exact production behavior before local code changes:

| Probe Target | Observed Production Behavior | Diagnosis |
|---|---|---|
| `GET /question/sci_c10_ch01_q0002` (1st & 2nd requests) | Both returned `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`, `Vary: RSC, Next-Router-State-Tree, ...`, and **no `CF-Cache-Status: HIT`** | Uncacheable response forced repeat Worker SSR on every bot/visitor request |
| `GET /favicon.ico` (2nd request) | Returned `CF-Cache-Status: HIT`, `Cache-Control: public, max-age=86400` | Static asset bypass in `cloudflare.config.ts` works properly |
| `GET /` with `Cookie: sb-wvuvriewskvvievacida-auth-token=fake` | Returned `Cache-Control: s-maxage=31536000, stale-while-revalidate` and bypassed CDN Cache Rule (no `CF-Cache-Status: HIT`) | Cookie-based CDN bypass works safely for authenticated sessions |
| Cloudflare GraphQL (`2026-11-26T16:56:00Z`–`23:59:59Z`) | `cacheStatus: "none", status: 200` = `191`; `cacheStatus: "miss", status: 504` = `176`; `cacheStatus: "hit", status: 200` = `98`; `503` = `1` | High `504` rate (`176` misses) caused by uncached SSR hitting the Free `10 ms` CPU ceiling |
| Cloudflare Zone API `tiered_cache_smart_topology_enable` | `"value": "off"`, `"editable": true` | Regional PoP cache misses were not shielded by Smart Tiered Cache (free to enable) |

---

## 3. Phase 2 & 3 — Worker Execution Reduction & Public SEO Cache Architecture

### 3.1 Edge Cache Policy & Safety Guarantees ([`lib/cloudflare/edge-cache-policy.ts`](lib/cloudflare/edge-cache-policy.ts), [`worker.ts`](worker.ts))
- **Public SEO Cache Normalization:** Anonymous non-RSC `GET` requests returning `200 OK` without `Set-Cookie` on verified SEO prefixes (`/`, `/question/`, `/solutions/`, `/practice`, `/formulas`, `/tools`, `/programmes`, `/competitive`, `/blog`, `/how-it-works`, `/faq`, `/fees`, `/faculty`, `/skills`, `/projects`, `/challenge`, `/legal`, `/academic`, `/contact`, `/accessibility`, `/laptop-requirements`, `/game`, `/robots.txt`, `/sitemap`) now emit:
  - HTML pages: `Cache-Control: public, max-age=300, s-maxage=86400, stale-while-revalidate=43200`, `Vary: Accept-Encoding`
  - Sitemaps & `robots.txt`: `Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200`
  - Crucial bug fixed in `worker.ts`: previously `worker.ts` skipped any response containing `private` AND only applied modified headers to the background `cache.put()` clone, never to the live response returned to Cloudflare CDN. Now the normalized response is returned directly **and** written to `caches.default`, enabling shared upstream CDN Cache Rule (`7c6ba33a49094edbba8d0a817f1ed27a`) `CF-Cache-Status: HIT` responses (`0 ms` Worker execution on repeat edge hits).
- **Strict Non-Cacheability Guarantees (Verified by Unit Tests):**
  - Never caches `/api/*`, `/auth/*`, `/dashboard*`, `/admin*`, `/academy*`, `/courses*`, `/parent-report*`, `/verify*`, `/apply*`, `/assessment*`, `/onboarding*`, `/payment*`.
  - Never caches requests carrying `sb-*` cookies, `Authorization` headers, non-`GET` methods, Next App Router `RSC` / `_rsc` requests (preventing HTML/RSC payload cache poisoning), or `academy.*` / `ai.*` root `/` redirects.
  - Never caches responses with `Set-Cookie` or non-`200` HTTP status.

### 3.2 Free-Plan KV Quota Preservation (`1,000 writes/day`, `100,000 reads/day`)
- `/question/*` pages are generated purely deterministically in memory (`resolveQuestionById`) with zero database fetches. Caching `106,440` question pages in `VINEXT_KV_CACHE` would exhaust the `1,000 writes/day` KV quota after 1,001 bot crawls.
- `shouldBypassKvCacheForRequest("/question/...")` routes `/question/*` through a no-op KV stub while keeping Cloudflare CDN Cache + `caches.default` active (0 KV ops for question pages).
- Remaining dynamic routes keep KV ISR caching via `createQuotaSafeKv()`, protected by a 15-minute cooldown circuit breaker if KV quota errors ever occur.

### 3.3 Dynamic SEO Route Revalidation Inventory (Verified `◐ ISR` in `build:vinext`)
| Route | Revalidation Window | Special Optimization |
|---|---|---|
| `/programmes` (`app/(public)/programmes/page.tsx`) | `3600s` (1h) | Replaced `createClient()` (`cookies()`) with anonymous REST `fetch` + `3000ms` timeout & static catalogue fallback |
| `/question/[id]` (`app/(public)/question/[id]/page.tsx`) | `86400s` (24h) | Wired deterministic `classifyQuestionSeoQuality()` robots directive; `200 OK` preserved |
| `/solutions/ncert/[class]/[subject]/[chapter]` | `86400s` (24h) | ISR enabled |
| `/practice/[board]/[class]` | `86400s` (24h) | ISR enabled |
| `/practice/[board]/[class]/[subject]/[chapter]` | `86400s` (24h) | ISR enabled + Practice Problems `Quiz` JSON-LD fixed |
| `/formulas/[class]/[subject]` | `86400s` (24h) | ISR enabled |
| `/competitive/[exam]` | `86400s` (24h) | ISR enabled |
| `/competitive/[exam]/[section]` | `86400s` (24h) | ISR enabled + Practice Problems `Quiz` JSON-LD fixed |
| `/blog/[slug]` | `86400s` (24h) | ISR enabled |
| `/programmes/[slug]` | `86400s` (24h) | ISR enabled |

---

## 4. Phase 4 & 7 — 106,440 Question Page Audit & SEO Architecture

### 4.1 Code-Level Root Cause of GSC Indexing Drops
- `getAllQuestionUrls()` spans `106,440` URLs partitioned across `11` sitemap question shards (`10,000` URLs/shard; `sitemap-questions-1.xml` through `sitemap-questions-11.xml`, with `sitemap-questions-12.xml` available).
- Inspecting `packages/core/src/universal-engine/generators.ts` revealed why `20,545` URLs stalled in *Crawled - currently not indexed* and `52` in *Duplicate, Google chose different canonical*:
  - Biology (`bioConcepts`, 2 items), English (`grammarExercises`, 3 items), Hindi (`vyakaranItems`, 3 items), and Social Science (`sstItems`, 3 items) cycle via `idx % array.length` with `[Context: ${chapterTitle} • ${topicTitle}]` appended, creating byte-identical pages within the same chapter beyond the first `topicCount × templateCount` questions.
  - Math (`packages/core/src/math-engine/generators.ts`), Physics (`u, a, t` kinematics), and Chemistry (`moles` stoichiometry) use seeded PRNG numeric variation.

### 4.2 Zero-Deletion Indexing Quality Tiering (`lib/seo/question-quality.ts`)
- **Zero `404` Breakage:** Every valid `/question/[id]` URL still serves **HTTP `200 OK`**, interactive practice UI, JSON-LD, and internal navigation links.
- **Deterministic Indexability (`classifyQuestionSeoQuality`):**
  - `template_canonical` (`index: true, follow: true`): `q0001..q0004` (`TEMPLATE_INDEX_DEPTH = 4`) for Biology (`sci_c9_ch10..12`, `sci_c10_ch05..08`, `sci_c10_ch13`, `sci_c11..12_ch13..15`), English, Hindi, and Social Science chapters.
  - `template_repetitive` (`index: false, follow: true`): `q0005+` in template-cycled chapters so search engines stop wasting crawl budget on modulo repeats while following internal links cleanly.
  - `parameterized_core` (`index: true, follow: true`): `q0001..q0025` (`PARAMETERIZED_INDEX_DEPTH = 25`) for PRNG-varied Math, Physics, and Chemistry chapters.
  - `deep_long_tail` (`index: false, follow: true`): `q0026+` deep numerical tails in Math/Physics/Chemistry.
- **Sitemap & Rich-Result Repairs:**
  - Removed `/about` (308 redirect to `/how-it-works`) from `getCoreSitemapUrls()` in `lib/seo/sitemap-builder.ts` and replaced it with canonical `/how-it-works`.
  - Fixed Practice Problems (`Quiz`) JSON-LD in `app/(public)/competitive/[exam]/[section]/page.tsx` and `app/(public)/practice/[board]/[class]/[subject]/[chapter]/page.tsx` by adding `eduQuestionType: 'Multiple choice'`, `learningResourceType: 'Practice problem'`, `about`, and `acceptedAnswer.answerExplanation`.

---

## 5. Phase 5 — Supabase Auth & Database Load Reduction

- **Public Route Auth Bypass (`lib/supabase/middleware.ts`):** `updateSession` computes `needsAuthCheck = isAcademyRoute || isAuthRoute || ((isAcademySubdomain || isAiSubdomain) && pathname === '/')` *before* constructing `NextResponse.next({ request })` or creating a Supabase server client. Authenticated learners with active `sb-*` cookies navigating public SEO pages (`/question/*`, `/tools/*`, `/practice/*`, `/`) trigger **0 `supabase.auth.getUser()` calls** and **0 header-override cloning**, while private routes (`/dashboard`, `/academy`, `/courses`, `/admin`) continue enforcing server authentication redirects cleanly.
- **`/programmes` Public Caching (`app/(public)/programmes/page.tsx`):** Eliminated `cookies()` via `createClient()` so `/programmes` no longer queries PostgreSQL on every anonymous page view (`revalidate: 3600` + `3000ms` timeout + static fallback).
- **Polling & Realtime Audit:** Repository scan confirmed **0** Supabase realtime `.channel(` subscriptions and **0** API-polling `setInterval` timers (all 5 `setInterval` occurrences are local client UI countdown timers).

---

## 6. Phase 6 — Traffic Capacity & Scalability Assessment (Cloudflare Free Plan)

### Verified Plan Ceilings vs. Measured Bundle Baseline
- **Cloudflare Free Plan Hard Quotas:** `100,000` Worker requests/day, `10 ms` CPU time/invocation, `128 MB` isolate memory, `50` subrequests/invocation, `100,000` KV reads/day, `1,000` KV writes/day.
- **Measured SSR Build Artifact Note:** `pnpm run build:vinext` reports `.cloudflare/output/v1/workers/default/bundle/ssr/_next/static/page-DQC_O5fk.js` at `2,619.27 kB` (`672.95 kB` gzip). Cold SSR isolate initialization evaluates heavy static catalogue modules, making CDN cache hit rate and Smart Tiered Cache critical to avoid `exceededResources` / `504` timeouts.
- **Verification Caveat:** **No synthetic load test of 10K–1M virtual users was executed against production.** All visitor/RPS projections below are **ESTIMATED** architectural capacity bounds assuming Cloudflare CDN Cache Rule + these fixes are deployed and Smart Tiered Cache is enabled.

| Traffic Tier (Estimated) | Est. Pageviews / HTTP Req / Day | Min Required CDN Hit Ratio to Stay `<= 100k` Worker Req/Day | Status on Cloudflare Free Plan (Est.) | Primary Bottleneck / Risk |
|---:|---:|---:|---|---|
| **10,000 daily visitors** | ~30,000–50,000 req/day | `>= 0%` (safe even on misses) | **FEASIBLE (Comfortable Headroom)** | Cold `10 ms` SSR CPU spikes if PoP cache misses cluster |
| **50,000 daily visitors** | ~150,000–250,000 req/day | `>= 60%` | **FEASIBLE** | Regional PoP misses without Smart Tiered Cache |
| **100,000 daily visitors** | ~300,000–500,000 req/day | `>= 80%` | **FEASIBLE (Smart Tiered Cache Required)** | Bot crawls across 106k tail URLs + authenticated `/dashboard` bursts |
| **500,000 daily visitors** | ~1.5M–2.5M req/day | `>= 93%–96%` | **CONDITIONAL (CDN-Cached Reads Only)** | `100,000/day` Worker daily cap breached if >4–7% traffic misses CDN or hits `/api/*`/`/dashboard` |
| **1,000,000 daily visitors** | ~3M–5M+ req/day | `>= 97%–98%` | **AT FREE-PLAN CEILING (Conditional on Pure CDN Hits)** | Any >100k daily combination of uncached tail URLs, cold PoP misses, bots, or logged-in API calls hits Cloudflare Free's hard `100,000` Worker req/day limit (`1027` / throttling) and `10 ms` CPU spikes (`503`/`504`) |

### Remaining Zero-Cost Bottlenecks & Honest Recommendations
1. **Hard 100,000 Worker Requests/Day Ceiling:** Pure CDN `CF-Cache-Status: HIT` responses do not consume Worker invocations, enabling 1M+ cached pageviews if hit rate stays `>= 97–98%`. However, scattered uncached long-tail hits across `106,440` URLs or high authenticated SaaS usage will breach `100,000` Worker invocations/day.
2. **Cold SSR Bundle Size (`672.95 kB` gzip SSR chunk) & `10 ms` Free CPU Cap:** Even with caching enabled, first-time cold requests hitting a heavy route (`/`, large curriculum pages) can risk `10 ms` CPU exhaustion under concurrency bursts. Code-splitting large static curriculum/programme dictionaries in future work reduces cold CPU further at `$0` cost.
3. **Pragmatic Post-Free-Ceiling Guidance:** Zero-cost changes keep you protected as far as Cloudflare Free physically allows; once daily **uncached/authenticated Worker invocations** approach ~70,000–85,000/day (tracked by `cf-free-observability.mjs`), upgrading only Workers (`$5/month` for 10M requests and `30s` CPU) removes both hard ceilings immediately.

---

## 7. Phase 8 — Zero-Cost Production Observability

- **Health Probe Script ([`scripts/cf-free-observability.mjs`](scripts/cf-free-observability.mjs)):**
  - Probes 10 representative routes (`/`, `/question/sci_c10_ch01_q0002`, `/solutions/ncert/class-10/science/sci_c10_ch01`, `/formulas/class-10/math`, `/practice/cbse/class-10/science/sci_c10_ch01`, `/competitive/ssb-oir/verbal-reasoning`, `/tools/board-percentage-calculator`, `/programmes`, `/sitemap-index.xml`, `/robots.txt`) on cold and warm fetches for `200 OK`, TTFB, `CF-Cache-Status`, and non-`private` `Cache-Control`.
  - Runs an active `sb-*` cookie cache-bypass safety check (asserting `CF-Cache-Status !== 'HIT'`).
  - Runs a Googlebot response parity probe (`200 OK`, `<link rel="canonical">`, JSON-LD presence).
  - Queries Cloudflare GraphQL API (`workersInvocationsAdaptive` + `httpRequests1dGroups`) when `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and `CLOUDFLARE_ZONE_ID` are set, alerting at `>= 70%` warning and `>= 85%` critical against `100,000/day`.
- **Scheduled GitHub Actions Workflow ([`.github/workflows/production-health-monitor.yml`](.github/workflows/production-health-monitor.yml)):** Runs every 6 hours (`cron: '0 */6 * * *'`) and via `workflow_dispatch` at zero infrastructure cost.

---

## 8. Phase 9 — Local Verification Results (Post-Final-Edit)

All automated checks below were executed after the final repository edit on 26 November 2026:

| Check | Scope | Result |
|---|---|---|
| `pnpm type-check` (`tsc --noEmit`) | Entire TypeScript codebase | **PASSED** (`0` errors) |
| `pnpm test` (`vitest run`) | All `28` test files (`280` tests, including `10` new tests in `tests/unit/zero-cost-scale-optimizations.test.ts`, `sitemap-scaling.test.ts`, `sitemap-partitioning.test.ts`, `razorpay-webhook-remediation.test.ts`, `commerce-and-entitlements.test.ts`) | **PASSED** (`28/28` files, `280/280` tests, `26.99s`) |
| `pnpm exec eslint ...` | Core modified/created scaling, middleware, SEO, observability, and test files (post-final edit); all 16 touched app/lib/worker files previously passed with `0` errors | **PASSED** (`0` errors) — *Note: repo-wide `pnpm lint` previously reported `76` errors (`1` fixed in our new test file; `75` pre-existing in unrelated untouched files)* |
| `node scripts/cf-free-observability.mjs --dry-run` | Zero-cost monitoring CLI | **PASSED** (`{"ok":true,"mode":"dry-run","baseUrl":"https://talentxcel.net","monitoredRoutesCount":10,"workerDailyLimit":100000}`) |
| `pnpm run build:vinext` (`vite build`) | Full Cloudflare Workers RSC/SSR/Client bundle (`667` RSC modules, `588` SSR modules) | **PASSED** (`Build complete.`, all `10` target SEO dynamic routes verified `◐ ISR`) |

---

## 9. Modified & Created Files Summary (Scaling Task)

| File | Action | Purpose |
|---|---|---|
| [`lib/cloudflare/edge-cache-policy.ts`](lib/cloudflare/edge-cache-policy.ts) | Created | Pure public-vs-private cacheability rules, RSC/cookie bypass guards, KV `/question/*` bypass & quota circuit breaker |
| [`worker.ts`](worker.ts) | Modified | Wires normalized `Cache-Control` / `Vary` onto live responses + `caches.default` and KV protection |
| [`lib/supabase/middleware.ts`](lib/supabase/middleware.ts) | Modified | Skips `supabase.auth.getUser()` and request-header cloning on public SEO routes even when `sb-*` cookies exist |
| [`lib/seo/question-quality.ts`](lib/seo/question-quality.ts) | Created | Deterministic `classifyQuestionSeoQuality` tiering (`index` canonical/parameterized, `noindex, follow` on modulo/tail repeats) |
| [`lib/seo/sitemap-builder.ts`](lib/seo/sitemap-builder.ts) | Modified | Replaced `/about` 308 redirect entry in `getCoreSitemapUrls()` with canonical `/how-it-works` |
| [`app/(public)/programmes/page.tsx`](app/(public)/programmes/page.tsx) | Modified | Replaced `cookies()`/`createClient()` with `revalidate = 3600` + anonymous PostgREST `fetch` (`3000ms` timeout + fallback) |
| [`app/(public)/question/[id]/page.tsx`](app/(public)/question/[id]/page.tsx) | Modified | Added `revalidate = 86400` and `classifyQuestionSeoQuality` robots metadata |
| [`app/(public)/solutions/ncert/[class]/[subject]/[chapter]/page.tsx`](app/(public)/solutions/ncert/[class]/[subject]/[chapter]/page.tsx) | Modified | Added `revalidate = 86400` |
| [`app/(public)/practice/[board]/[class]/page.tsx`](app/(public)/practice/[board]/[class]/page.tsx) | Modified | Added `revalidate = 86400` |
| [`app/(public)/practice/[board]/[class]/[subject]/[chapter]/page.tsx`](app/(public)/practice/[board]/[class]/[subject]/[chapter]/page.tsx) | Modified | Added `revalidate = 86400` and fixed `Quiz` JSON-LD Practice Problem fields |
| [`app/(public)/formulas/[class]/[subject]/page.tsx`](app/(public)/formulas/[class]/[subject]/page.tsx) | Modified | Added `revalidate = 86400` |
| [`app/(public)/competitive/[exam]/page.tsx`](app/(public)/competitive/[exam]/page.tsx) | Modified | Added `revalidate = 86400` |
| [`app/(public)/competitive/[exam]/[section]/page.tsx`](app/(public)/competitive/[exam]/[section]/page.tsx) | Modified | Added `revalidate = 86400` and fixed `Quiz` JSON-LD Practice Problem fields |
| [`app/(public)/blog/[slug]/page.tsx`](app/(public)/blog/[slug]/page.tsx) | Modified | Added `revalidate = 86400` |
| [`app/(public)/programmes/[slug]/page.tsx`](app/(public)/programmes/[slug]/page.tsx) | Modified | Added `revalidate = 86400` |
| [`scripts/cf-free-observability.mjs`](scripts/cf-free-observability.mjs) | Created | Free HTTP edge-cache, Googlebot parity, auth cookie bypass, and Cloudflare GraphQL quota monitor |
| [`.github/workflows/production-health-monitor.yml`](.github/workflows/production-health-monitor.yml) | Created | 6-hourly scheduled + manual workflow runner for observability script |
| [`tests/unit/zero-cost-scale-optimizations.test.ts`](tests/unit/zero-cost-scale-optimizations.test.ts) | Created | Unit suite covering edge cache policy, KV protection, SEO tiering, sitemap canonicals, middleware skip/auth guard, and quota evaluation |

*(Note: Prior uncommitted work from earlier tasks — including Razorpay webhook P0 remediation and paid customer dashboard updates — also remains in the current working tree on `feat/cloudflare-migration` and was not deployed or reverted.)*

---

## 10. Pre-Deployment Checklist (Awaiting Release Approval)

No production changes, DNS changes, Cloudflare zone edits, or Worker deployments were performed during this optimization pass. Once approved for release:
1. Review staged diff (`git status` / `git diff`) to confirm whether both the Razorpay webhook P0 remediation and this zero-cost scaling engine should ship together.
2. Enable **Cloudflare Smart Tiered Cache** (Free plan UI/API toggle: `tiered_cache_smart_topology_enable = "on"`) so regional edge cache misses coalesce through upper-tier PoPs instead of hammering the single Worker.
3. Deploy via `pnpm run deploy:vinext` (with `CLOUDFLARE_API_TOKEN` & `CLOUDFLARE_ACCOUNT_ID`).
4. Run live post-deploy verification:
   - `node scripts/cf-free-observability.mjs --base-url=https://talentxcel.net`
   - Confirm 2nd request to `/question/sci_c10_ch01_q0002` returns `CF-Cache-Status: HIT` and `Cache-Control: public, max-age=300, s-maxage=86400, stale-while-revalidate=43200`.
   - Confirm request with `sb-*` cookie does **not** return `CF-Cache-Status: HIT`.
5. Add `CLOUDFLARE_ZONE_ID` (`aaa1dc56c72f959526b4287be8f5d8c7`) to GitHub Repository Secrets so the 6-hourly `Production Health & Free-Tier Observability` workflow tracks daily Worker quota consumption automatically.
