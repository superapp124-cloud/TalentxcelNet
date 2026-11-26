# Cloudflare Free Plan Capacity Report — TalentXcel.net

**Worker:** `talentxcelnet` (`https://talentxcelnet.talentxcel.workers.dev`, Version `4a149309-a7ea-4293-9d01-dd7e2666b65d`)  
**Zone:** `talentxcel.net` (ID: `aaa1dc56c72f959526b4287be8f5d8c7`, Plan: `Free Website`)  
**Constraint:** Cloudflare **Free Plan ONLY** (No Workers Paid, No R2, No billable resources)  
**Measurement Source:** Cloudflare GraphQL `workersInvocationsAdaptive` + Live `workers.dev` tests

---

## 1. Free Plan Limits vs. Measured Application Profile

| Resource | Cloudflare Free Limit | Measured / Observed | Status |
|---|---:|---|---|
| **Worker Requests / Day** | 100,000 / day | Static assets (`/_next/static/*`, images, media) are served by Workers Assets (`!/_next/static/*` in `runWorkerFirst`) and **do not consume Worker requests**. On custom domains, `caches.default` in `worker.ts` still counts as a Worker invocation (<1 ms CPU) unless Cloudflare Cache Rules cache at CDN edge. | **Pass (up to 100k SSR/API req/day)** |
| **Worker CPU / Request** | **10 ms** | **Measured on `workers.dev` (uncached SSR, 17 requests):** `cpuTimeP50 = 26.75 ms`, `cpuTimeP99 = 134.37 ms`, `errors = 0`. *(Before optimization: `cpuTimeP50 = 23.99 ms`, `cpuTimeP99 = 137.99 ms`, 21 requests, 0 errors).* | **Conditional / Risk on uncached SSR** |
| **Worker Memory** | 128 MB | `vinext` bundle is `7,485.20 KiB` (`1,902.21 KiB` gzip); startup `45 ms`; 0 OOM errors across all routes including 10k-URL `/sitemap-questions-1.xml`. | **Pass** |
| **Subrequests / Request** | 50 / request | **Measured:** `1` subrequest across `17` requests after `proxy.ts` optimization (down from `2` across `21` requests). | **Pass** |
| **KV Reads / Day** | 100,000 / day | 1–3 KV reads per uncached/KV-hit SSR request; `entryCacheTtlSeconds: 3600` + `caches.default` on custom domain keeps KV reads well below 100k/day. | **Pass** |
| **KV Writes / Day** | **1,000 / day** | `kvDataAdapter` writes **2 KV keys** (`:html` + `:rsc`) per unique SSR route miss (500 unique misses/day = 1,000 writes). `wrapKvQuotaSafe` in `worker.ts` catches quota errors so exceeding 1,000/day degrades gracefully without HTTP 500. | **Conditional (Protected by graceful fallback)** |
| **KV Storage** | 1 GB | 21 keys created across 11 routes (~few hundred KB). Even 10,000 cached question pages fit well under 1 GB. | **Pass** |

---

## 2. CPU Qualification Details (`10 ms` Free Limit)

- **Why measured `cpuTimeP50` is `26.75 ms` on `workers.dev`:**
  1. `caches.default` is a **no-op on `*.workers.dev`**, so every validation request executed full React 19 RSC + SSR rendering in `vinext`.
  2. Cold isolate initialization + RSC/SSR rendering reached `134.37 ms` at P99.
  3. **Optimizations already applied in this qualification:**
     - `proxy.ts`: Excluded `/robots.txt`, `/manifest.json`, `/sw.js`, `/sitemap*.xml`, and static media from middleware.
     - `lib/supabase/middleware.ts`: Skips `createServerClient` + `supabase.auth.getUser()` when no `sb-` auth cookie is present (eliminating auth CPU & subrequests on all anonymous traffic).
     - `worker.ts`: Added Cloudflare Workers Cache API (`caches.default`) for anonymous public `GET` routes (active once bound to `talentxcel.net` / `www.talentxcel.net`, serving repeat hits in `< 1 ms` CPU).
- **Risk Assessment:**
  - Repeat traffic on `talentxcel.net` / `www.talentxcel.net` will hit `caches.default` (`< 1 ms` CPU).
  - Uncached SSR misses (first visit to any of the 106,440 `/question/[id]` pages, or authenticated `/dashboard` / `/courses` SSR) consume ~25–30 ms P50 CPU (and up to ~134 ms cold start). While Cloudflare's Free runtime allowed these during testing (`0` errors), **heavy uncached SSR bursts or complex authenticated SSR pages carry a real `1102` CPU-limit risk on the Free plan**.

---

## 3. Custom-Domain Binding on Free Plan

- Cloudflare Workers **Custom Domains** (`PUT /accounts/{account_id}/workers/domains`) are supported on the Cloudflare **Free Website** plan (`talentxcel.net`, Zone ID `aaa1dc56c72f959526b4287be8f5d8c7`) with zero paid add-ons.
- Binding `talentxcel.net` and `www.talentxcel.net` requires removing/replacing the conflicting Vercel `A` (`76.76.21.21`) and `CNAME` (`www -> talentxcel.net`) records during cutover.
