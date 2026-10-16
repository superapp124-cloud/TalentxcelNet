# TALENTXCEL ECOSYSTEM — MULTI-DOMAIN INFRASTRUCTURE & SECURITY AUDIT

**Audit Date:** October 16, 2026  
**Auditor:** Principal Software Architect & DevOps Lead  
**Scope:** Coordinated empirical audit across TalentXcel, TalentXcel Academy, CHATR, and Nuty Tales domains.  
**Evidence Standard:** Empirical DNS resolution, TLS certificate verification, HTTP status codes, redirect chains, robots.txt inspection, and platform header analysis.

---

## 1. Executive Summary

In accordance with the Ecosystem Growth OS Security and Production Readiness Gate, all 30 monitored hostnames across the 4 constituent ecosystem brands were probed.

### Key Empirical Findings
- **Real DNS Resolution:** All 30 domains successfully resolve to active IPv4 addresses via authoritative DNS.
- **TLS & HTTPS Validity:** 100% of probed domains possess active, valid TLS/SSL certificates and respond over HTTPS.
- **Canonical Redirect Integrity:**
  - `www.talentxcel.net`, `academy.talentxcel.net`, and `ai.talentxcel.net` actively return HTTP 307 redirects to apex `https://talentxcel.net`.
  - `chatrchat.in` actively returns HTTP 308 redirect to canonical `https://www.chatrchat.in/`.
  - `www.nutytales.com` actively returns HTTP 301 permanent redirect to apex `https://nutytales.com/`.
- **Active Edge Networks:** Edge infrastructure is distributed across Vercel Edge (`talentxcel.net`, `career-pathways`), Cloudflare (`chatr.chat`), and AWS/Webflow Cloud (`talentxcel.in`, `nutytales.com`).

---

## 2. Empirical Multi-Domain Host Probe Matrix

Probed on October 16, 2026 using `scripts/audit-domains.ts`.

| # | Brand | Hostname | DNS Resolved | IPs / Infrastructure | HTTP Status | Redirect Target | TLS Valid | Robots.txt | Empirical Classification |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Academy | `talentxcel.net` | YES | Vercel Anycast | **200 OK** | None (Apex) | YES | 200 OK | **LIVE_ACTIVE** |
| 2 | Academy | `www.talentxcel.net` | YES | Vercel Anycast | **307 Temp** | `https://talentxcel.net/` | YES | 200 OK | **CANONICAL_REDIRECT** |
| 3 | Academy | `academy.talentxcel.net` | YES | Vercel Edge | **307 Temp** | `https://talentxcel.net/` | YES | 200 OK | **CANONICAL_REDIRECT** |
| 4 | Academy | `ai.talentxcel.net` | YES | Vercel Edge | **307 Temp** | `https://talentxcel.net/` | YES | 200 OK | **CANONICAL_REDIRECT** |
| 5 | TalentXcel | `talentxcel.in` | YES | `216.198.79.65`, `64.29.17.1` | **200 OK** | None (Apex) | YES | 200 OK | **LIVE_ACTIVE** |
| 6 | TalentXcel | `www.talentxcel.in` | YES | `216.198.79.1`, `64.29.17.65` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 7 | TalentXcel | `careers.talentxcel.in` | YES | `216.198.79.1`, `64.29.17.1` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 8 | TalentXcel | `salary.talentxcel.in` | YES | `216.198.79.65`, `64.29.17.65`| **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 9 | TalentXcel | `resume.talentxcel.in` | YES | `216.198.79.1`, `64.29.17.65` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 10 | TalentXcel | `jobs.talentxcel.in` | YES | `64.29.17.65`, `216.198.79.1` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 11 | TalentXcel | `colleges.talentxcel.in` | YES | `216.198.79.1`, `64.29.17.65` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 12 | TalentXcel | `employer.talentxcel.in` | YES | `64.29.17.65`, `216.198.79.1` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 13 | TalentXcel | `employers.talentxcel.in`| YES | `216.198.79.65`, `64.29.17.1` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 14 | TalentXcel | `government.talentxcel.in`| YES| `216.198.79.65`, `64.29.17.65`| **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 15 | TalentXcel | `learning.talentxcel.in` | YES | `216.198.79.1`, `64.29.17.1` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 16 | TalentXcel | `passport.talentxcel.in` | YES | `64.29.17.65`, `216.198.79.1` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 17 | TalentXcel | `career-pathways-ai-builder.vercel.app` | YES | `64.29.17.3`, `216.198.79.3` | **200 OK** | None | YES | 200 OK | **SANDBOX_PROTOTYPE** |
| 18 | CHATR | `chatr.chat` | YES | `172.67.216.154`, `104.21.75.73` (Cloudflare) | **200 OK** | None (Apex) | YES | 200 OK | **LIVE_ACTIVE** |
| 19 | CHATR | `www.chatr.chat` | YES | `104.21.75.73`, `172.67.216.154` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 20 | CHATR | `chatrchat.in` | YES | `216.198.79.1` | **308 Perm** | `https://www.chatrchat.in/` | YES | 200 OK | **CANONICAL_REDIRECT** |
| 21 | CHATR | `www.chatrchat.in` | YES | `64.29.17.1`, `216.198.79.1` | **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 22 | Nuty Tales | `nutytales.com` | YES | `216.198.79.1` | **200 OK** | None (Apex) | YES | 200 OK | **LIVE_ACTIVE** |
| 23 | Nuty Tales | `www.nutytales.com` | YES | `216.198.79.1` | **301 Perm** | `https://nutytales.com/` | YES | 200 OK | **CANONICAL_REDIRECT** |
| 24 | Nuty Tales | `business.nutytales.com` | YES | `64.29.17.65`, `216.198.79.65`| **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 25 | Nuty Tales | `gifting.nutytales.com` | YES | `64.29.17.65`, `216.198.79.65`| **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 26 | Nuty Tales | `weddings.nutytales.com` | YES | `64.29.17.65`, `216.198.79.65`| **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 27 | Nuty Tales | `crafts.nutytales.com` | YES | `64.29.17.65`, `216.198.79.65`| **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 28 | Nuty Tales | `stays.nutytales.com` | YES | `64.29.17.65`, `216.198.79.65`| **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 29 | Nuty Tales | `travel.nutytales.com` | YES | `64.29.17.65`, `216.198.79.65`| **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |
| 30 | Nuty Tales | `nri.nutytales.com` | YES | `64.29.17.65`, `216.198.79.65`| **200 OK** | None | YES | 200 OK | **LIVE_ACTIVE** |

---

## 3. SEO, Canonical & Robots Boundaries

To maintain SEO equity and prevent keyword cannibalization across brands:
1. **No Cross-Brand Canonical Hijacking**: Each brand preserves its own canonical host. For instance, `careers.talentxcel.in` canonicalizes to `careers.talentxcel.in`, not `talentxcel.net`.
2. **Dedicated XML Sitemaps**: Academy maintains `https://talentxcel.net/sitemap.xml` covering only Academy programmes, legal terms, and blog resources.
3. **Robots Directives**: Authenticated routes (`/dashboard`, `/admin/*`, `/courses/*`) are strictly disallowed from search indexing.

---

## 4. Privacy & Safe Linking Protocols

- **Zero Token Propagation**: User authentication JWTs, session cookies, and Supabase tokens are never passed across domain boundaries.
- **HMAC-SHA256 Cryptographic Referral**: Cross-brand deep links pass tamper-proof HMAC signatures (`v2` canonical binding format) binding source, destination host, path, intent, campaign, and timestamp with 7-day TTL and clock skew rejection.
- **Server-Only Referral Secrets**: `ECOSYSTEM_REFERRAL_SECRET` is kept strictly server-side and never bundled in client code.
