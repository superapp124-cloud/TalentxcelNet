# Cloudflare Production Forensic Audit & Optimization Report — TalentXcel.net

**Audit Date:** 2026-11-26  
**Zone:** `talentxcel.net` (Zone ID: `aaa1dc56c72f959526b4287be8f5d8c7`, Plan: `Free Website`, Status: `active`)  
**Worker:** `talentxcelnet` (Account ID: `5c0de6e3e2a535e09989aeafe26b6fc6`, Version: `4a149309-a7ea-4293-9d01-dd7e2666b65d`)  
**Production Domains Attached:** `talentxcel.net`, `www.talentxcel.net`  
**Preview Domain:** `https://talentxcelnet.talentxcel.workers.dev`

---

## 1. Executive Summary

A full forensic audit of the live Cloudflare configuration for `talentxcel.net` and Worker `talentxcelnet` confirmed that the production cutover for `talentxcel.net` and `www.talentxcel.net` is active, HTTPS certificates are valid, Workers Custom Domains are serving traffic with edge caching (`CF-Cache-Status: HIT`), and no Error 1016 or redirect loops exist.

The audit identified **6 low-risk, reversible configuration gaps** on the Cloudflare zone (plaintext HTTP `200` without HTTPS redirect, deprecated TLS 1.0/1.1 permitted, HSTS disabled, Email Obfuscation enabled on React SSR HTML, Early Hints disabled, and 0-RTT disabled). All 6 were **autonomously remediated** and verified against the live edge with zero downtime.

Risky/destructive items (legacy Vercel DNS records `ai.talentxcel.net`, `staging.talentxcel.net`, `_vercel.talentxcel.net`, and missing server-side secrets such as `RAZORPAY_WEBHOOK_SECRET`, `OPENAI_API_KEY`, `CERTIFICATE_SIGNING_SECRET`, `PARENT_CONSENT_SECRET`, `RESEND_API_KEY`) were **not modified** and are documented under **Changes Not Implemented (Approval Required)**.

---

## 2. Infrastructure Inventory

| Component | Setting / Resource | Audited Value |
|---|---|---|
| **Zone** | `talentxcel.net` | `status: active`, `paused: false`, Plan: `Free Website`, NS: `ariadne.ns.cloudflare.com`, `tim.ns.cloudflare.com` |
| **Worker** | `talentxcelnet` | Entrypoint: `worker.ts` → `vinext/server/fetch-handler`, `compatibilityDate: 2026-11-26`, `usage_model: standard` |
| **Custom Domains** | `talentxcel.net`, `www.talentxcel.net` | Both `enabled: true`, `environment: production`, `previews_enabled: false`, active Advanced SSL certs |
| **Worker Routes / Page Rules** | Zone routes & page rules | `[]` (none — clean Custom Domain routing) |
| **KV Binding** | `VINEXT_KV_CACHE` | Namespace `talentxcelnet-vinext-cache` (`ab9bcb69fcab448ab780b68365394939`) |
| **Assets Binding** | `ASSETS` | `runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"]`, 232 static files |
| **Secrets Bound** | `cf workers secrets list` | 16 bindings from `.env.local` (`type: secret_text`; values never exposed) |
| **SSL Certificates** | `ssl/certificate_packs` | 2 Advanced (`talentxcel.net`, `www.talentxcel.net`) + 1 Universal (`talentxcel.net`, `*.talentxcel.net`), all `active` |
| **Rulesets** | Managed rulesets | Normalization Ruleset (v6), Managed Response Firewall Default (v2), Managed Free Ruleset (v89), DDoS L7 (v3541) |
| **Bot Management** | Zone bot settings | `fight_mode: false`, `enable_js: false`, `ai_bots_protection: disabled` (intentional to avoid blocking Googlebot/IndexNow) |

---

## 3. DNS Forensic Audit

| Type | Name | Content | Proxied | Audit Assessment |
|---|---|---|---:|---|
| `AAAA` | `talentxcel.net` | `100::` | Yes | **Keep.** Cloudflare Workers Custom Domain synthetic origin record. |
| `AAAA` | `www.talentxcel.net` | `100::` | Yes | **Keep.** Cloudflare Workers Custom Domain synthetic origin record. |
| `CNAME` | `ai.talentxcel.net` | `2bcf534017554b14.vercel-dns-017.com` | Yes | **Legacy Vercel.** Will serve paused Vercel page until cut over to `talentxcelnet` or removed with approval. |
| `CNAME` | `staging.talentxcel.net` | `2bcf534017554b14.vercel-dns-017.com` | Yes | **Legacy Vercel.** Keep until staging cutover/decommission approved. |
| `CNAME` | `_domainconnect.talentxcel.net` | `_domainconnect.gd.domaincontrol.com` | Yes | **Keep.** GoDaddy registrar domain-connect record. |
| `TXT` | `_dmarc.talentxcel.net` | `"v=DMARC1; p=quarantine; ..."` | No | **Keep.** Essential email authentication/DMARC policy. |
| `TXT` | `talentxcel.net` | `"google-site-verification=R7nVdOm6a3hmE8PcpuMZVKxJxSeHNp4WzxRJ8kPajxk"` | No | **Keep.** Google Search Console verification. |
| `TXT` | `_vercel.talentxcel.net` | `"vc-domain-verify=talentxcel.net,8e5de070ce5c07e06206"` | No | **Legacy Vercel.** Keep until Vercel is intentionally decommissioned. |

No duplicate records, no Error 1016 conditions on `talentxcel.net` / `www.talentxcel.net`, and no email/verification records were modified.

---

## 4. Worker, Domain & Route Audit

- **Deployment:** Active at 100% traffic (`9456d9af-c103-4cf4-bdc1-7e02fb50ac38`, Version `4a149309-a7ea-4293-9d01-dd7e2666b65d`, `45 ms` startup).
- **Routing:** `www.talentxcel.net` cleanly redirects `308 -> https://talentxcel.net/` (single-hop canonicalization from `next.config.ts`). Zero conflicting Worker Routes or Page Rules.
- **Middleware (`proxy.ts` + `lib/supabase/middleware.ts`):** Skips `supabase.auth.getUser()` when no `sb-` cookie exists and excludes `/robots.txt`, `/sitemap*.xml`, `/manifest.json`, `/sw.js`, and static media.
- **Cache Architecture (`worker.ts` + `kvDataAdapter`):**
  - `caches.default` caches anonymous public `GET` responses at Cloudflare edge (`CF-Cache-Status: HIT` verified on `https://talentxcel.net/`).
  - Private prefixes (`/api/`, `/auth/`, `/dashboard`, `/admin`, `/academy`, `/courses`, `/parent-report`, `/verify`, `/apply`, `/assessment`), `sb-` cookie requests, and `Set-Cookie` responses bypass `caches.default`.
  - `wrapKvQuotaSafe` prevents HTTP `500` if the Free Plan `1,000 KV writes/day` cap is reached.

---

## 5. SSL/TLS, Security, SEO & Reliability Audit

- **SSL/TLS:** Mode `full`, `tls_1_3: "on"`, `automatic_https_rewrites: "on"`, `pq_keyex: "on"`, `ech: "on"`. Remediated `always_use_https` (`off` → `on`), `min_tls_version` (`1.0` → `1.2`), and HSTS (`disabled` → `max-age=15552000`, `include_subdomains: false`, `nosniff: true`).
- **Security Headers:** Application enforces `Content-Security-Policy`, `Permissions-Policy`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `X-Robots-Tag: noindex, nofollow` on `/dashboard`, `/auth`, `/admin`, `/api`.
- **SEO & Crawlers:** `robots.txt` (`200`), `sitemap.xml` (`200`), `sitemap-tools.xml` (`200`), and Googlebot UA (`200`, `CF-Cache-Status: HIT`) all pass with zero challenges or redirect loops.
- **Application Compatibility:** Tested public SSR (`/`, `/programmes`, `/tools/combination-calculator`), API (`/api/health`), auth guard (`/dashboard` → `307 /auth/login`), and static assets (`/_next/static/css/hTDq0d4P.css` → `200`, `max-age=31536000, immutable`). Authenticated OAuth/login flows, Razorpay live webhooks, AI tutor routes, and email sending remain **NOT VERIFIED** due to missing server-side secrets.

---

## 6. Changes Implemented (Autonomous, Low-Risk, Reversible)

| Setting | Before | After | Reason | Expected Impact | Verification Result | Rollback Procedure |
|---|---|---|---|---|---|---|
| `always_use_https` | `"off"` | `"on"` | `http://talentxcel.net/` returned `200` over plaintext HTTP | Eliminates unencrypted HTTP & split SEO indexing | `http://talentxcel.net/` now returns `301 -> https://talentxcel.net/` | `PATCH /zones/{id}/settings/always_use_https` → `"off"` |
| `min_tls_version` | `"1.0"` | `"1.2"` | TLS 1.0/1.1 are deprecated and insecure | Enforces modern TLS 1.2/1.3 without breaking clients | HTTPS `ssl_verify_result=0`, TLS active | `PATCH /zones/{id}/settings/min_tls_version` → `"1.0"` |
| `security_header` (HSTS) | `enabled: false` | `enabled: true, max_age: 15552000, include_subdomains: false, preload: false, nosniff: true` | HSTS was disabled at edge | Protects returning users from downgrade attacks without affecting subdomains | `Strict-Transport-Security: max-age=15552000` verified | `PATCH /zones/{id}/settings/security_header` → `enabled: false` |
| `email_obfuscation` | `"on"` | `"off"` | Rewrites HTML emails into `data-cfemail` + extra JS | Prevents React 19 hydration mismatches & removes `/cdn-cgi/` JS | `https://talentxcel.net/` returns `200` cleanly | `PATCH /zones/{id}/settings/email_obfuscation` → `"on"` |
| `early_hints` | `"off"` | `"on"` | App emits `Link: ...; rel=preload` headers for LCP assets | Allows browsers to preload fonts/hero WebP during `103` | Verified `200` + `Link` preload headers intact | `PATCH /zones/{id}/settings/early_hints` → `"off"` |
| `0rtt` | `"off"` | `"on"` | Reduces TLS 1.3 handshake latency for repeat visitors | Faster repeat mobile TLS connections | Verified `200` on `https://talentxcel.net/` | `PATCH /zones/{id}/settings/0rtt` → `"off"` |

---

## 7. Changes Not Implemented (Approval Required)

1. **Upload Missing Server-Side Secrets** (`RAZORPAY_WEBHOOK_SECRET`, `OPENAI_API_KEY`, `CERTIFICATE_SIGNING_SECRET`, `PARENT_CONSENT_SECRET`, `RESEND_API_KEY`, `GOOGLE_AI_API_KEY`, `CHATR_ECOSYSTEM_*`, `NUTY_TALES_*`).
2. **Subdomain Cutover / Cleanup:** Attach `academy.talentxcel.net` and `ai.talentxcel.net` to Worker `talentxcelnet` (or remove legacy Vercel CNAMEs `ai.talentxcel.net`, `staging.talentxcel.net`, `_vercel.talentxcel.net`) after explicit approval.
3. **Workers Paid Plan Upgrade:** Uncached SSR measured `26.75 ms` P50 / `134.37 ms` P99 CPU on `workers.dev`; consider upgrading if uncached/authenticated SSR volume triggers `1102` errors.

---

## 8. Performance & Validation Measurements (Measured Only)

| Endpoint | Before (via `104.21.20.12`) | After (via `104.21.20.12`) |
|---|---|---|
| `http://talentxcel.net/` | `200` (`0.958s` TTFB, plaintext HTTP) | **`301 -> https://talentxcel.net/`** (`0.263s` TTFB) |
| `https://talentxcel.net/` | `200`, `CF-Cache-Status: HIT` (no HSTS) | **`200`**, `CF-Cache-Status: HIT`, `Age: 599`, `HSTS: max-age=15552000`, `0.380s` TTFB |
| `https://www.talentxcel.net/` | `308 -> https://talentxcel.net/` | **`308 -> https://talentxcel.net/`**, `HSTS: max-age=15552000`, `0.728s` TTFB |
| `https://talentxcel.net/dashboard` | `307 -> /auth/login?redirectTo=%2Fdashboard` | **`307 -> /auth/login?redirectTo=%2Fdashboard`**, `X-Robots-Tag: noindex, nofollow`, `0.689s` TTFB |
| `https://talentxcel.net/programmes` | `200`, `Cache-Control: private, no-store`, `1.898s` TTFB | **`200`**, `Cache-Control: private, no-store` |
| `https://talentxcel.net/_next/static/css/hTDq0d4P.css` | — | **`200`**, `CF-Cache-Status: HIT`, `max-age=31536000, immutable`, `0.407s` TTFB |
| Googlebot UA (`https://talentxcel.net/`) | — | **`200`**, `CF-Cache-Status: HIT`, `0.664s` TTFB, no challenge |
| Authenticated OAuth / Razorpay Webhook / AI Tutor | NOT VERIFIED | **NOT VERIFIED** (missing server secrets) |

---

## 9. Final Production Status

**`HEALTHY — SAFE OPTIMIZATIONS COMPLETED`**

`talentxcel.net` and `www.talentxcel.net` are live, edge-cached (`CF-Cache-Status: HIT`), HTTPS-enforced (`301` + HSTS + TLS 1.2/1.3), and crawler-safe on Cloudflare Workers (`talentxcelnet`) with zero Worker errors.
