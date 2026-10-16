# TALENTXCEL ECOSYSTEM — MULTI-DOMAIN INFRASTRUCTURE AUDIT

**Audit Date:** October 16, 2026  
**Auditor:** Principal Software Architect & DevOps Lead  
**Scope:** Coordinated audit across TalentXcel, TalentXcel Academy, CHATR, and Nuty Tales domains.

---

## 1. Executive Summary

In accordance with Section 1 of the Ecosystem Growth OS Addendum, all 26+ known production hostnames across the 4 constituent ecosystem brands were inventoried, classified by purpose, checked for canonical integrity, and evaluated for safe cross-brand linking.

### Brand Ecosystem Overview
```
TalentXcel Super AI Ecosystem
├── TalentXcel Academy (talentxcel.net, academy.talentxcel.net) — Education & Skills Development
├── TalentXcel (talentxcel.in & subdomains) — Career Pathways, Resume AI, Salary Benchmarks, Jobs
├── CHATR (chatr.chat, chatrchat.in) — Intelligent Messaging & Team Workflow Automation
└── Nuty Tales (nutytales.com & subdomains) — Artisanal MSME Commerce & Heritage Tourism
```

---

## 2. Multi-Domain Host Inventory Matrix

| # | Brand | Hostname | Canonical Host | Purpose & Audience | Deployment / Platform | Auth / DB Model | Link Status |
|---|-------|----------|----------------|-------------------|----------------------|-----------------|-------------|
| 1 | Academy | `talentxcel.net` | `talentxcel.net` | Public marketing, admissions, programme directory, SEO | Vercel (Next.js 16.4 Turbopack) | Supabase SSR (Postgres 34 tables) | **ACTIVE APEX** |
| 2 | Academy | `www.talentxcel.net` | `talentxcel.net` | 301 Permanent Canonical Redirect to apex | Vercel Edge Network | DNS 301 Permanent Redirect | **CANONICAL REDIRECT** |
| 3 | Academy | `academy.talentxcel.net` | `academy.talentxcel.net` | Authenticated learner portal, course player, assessments, Socratic AI | Vercel / Next.js Middleware | Supabase Auth + IndexedDB PWA | **ACTIVE PORTAL** |
| 4 | TalentXcel | `talentxcel.in` | `talentxcel.in` | Corporate skills platform, employer hiring, national workforce missions | Cloud Infrastructure | Centralized Auth | **SAFE DEEP LINK** |
| 5 | TalentXcel | `www.talentxcel.in` | `talentxcel.in` | 301 Permanent Canonical Redirect to apex | Cloud Infrastructure | DNS 301 Permanent Redirect | **CANONICAL REDIRECT** |
| 6 | TalentXcel | `careers.talentxcel.in` | `careers.talentxcel.in` | Career transition pathway builder, skill-gap analysis | Web Application | Independent DB | **SAFE DEEP LINK** |
| 7 | TalentXcel | `salary.talentxcel.in` | `salary.talentxcel.in` | Industry salary benchmarks, compensation calculators | Static / Micro-service | Salary Analytics DB | **SAFE DEEP LINK** |
| 8 | TalentXcel | `resume.talentxcel.in` | `resume.talentxcel.in` | AI resume builder, ATS scoring, capstone evidence formatting | AI Web Service | Resume Vector Store | **SAFE DEEP LINK** |
| 9 | TalentXcel | `jobs.talentxcel.in` | `jobs.talentxcel.in` | Job board, verified alumni candidate matching | Production Web App | Job Postings DB | **SAFE DEEP LINK** |
| 10 | TalentXcel | `colleges.talentxcel.in` | `colleges.talentxcel.in` | Institutional university partnerships, campus placement prep | Partner Portal | College CRM | **SAFE DEEP LINK** |
| 11 | TalentXcel | `employer.talentxcel.in` | `employers.talentxcel.in`| Legacy recruiter portal | 301 Redirect | Redirect to employers.in | **CANONICAL REDIRECT** |
| 12 | TalentXcel | `employers.talentxcel.in`| `employers.talentxcel.in`| Recruiter candidate dashboard, interview scheduling | Enterprise Dashboard | B2B Portal DB | **SAFE DEEP LINK** |
| 13 | TalentXcel | `government.talentxcel.in`| `government.talentxcel.in`| Public sector vocational missions & state training ties | Portal | Government Records | **PLANNED** |
| 14 | TalentXcel | `learning.talentxcel.in` | `talentxcel.net` | Legacy skills directory | 301 Redirect | Redirects to Academy | **CANONICAL REDIRECT** |
| 15 | TalentXcel | `passport.talentxcel.in` | `passport.talentxcel.in` | Verifiable talent credentials & project capstone proofs | Cryptographic Registry | Verification Service | **SAFE DEEP LINK** |
| 16 | TalentXcel | `career-pathways-ai-builder.vercel.app` | `careers.talentxcel.in` | Experimental career graph prototype | Vercel Beta Deployment | Experimental Memory | **SANDBOX R&D** |
| 17 | CHATR | `chatr.chat` | `chatr.chat` | Global intelligent messaging, assistant workflows | Global Cloud Edge | CHATR Messaging DB | **ADAPTER READY** |
| 18 | CHATR | `www.chatr.chat` | `chatr.chat` | 301 Canonical Alias | Edge DNS | DNS Redirect | **CANONICAL REDIRECT** |
| 19 | CHATR | `chatrchat.in` | `chatrchat.in` | Domestic India messaging & MSME enterprise channels | India Cloud Region | India Messaging DB | **ADAPTER READY** |
| 20 | CHATR | `www.chatrchat.in` | `chatrchat.in` | 301 Canonical Alias | Edge DNS | DNS Redirect | **CANONICAL REDIRECT** |
| 21 | Nuty Tales | `nutytales.com` | `nutytales.com` | Artisanal D2C marketplace & gift boxes | E-Commerce Cloud | Commerce Engine DB | **ADAPTER READY** |
| 22 | Nuty Tales | `www.nutytales.com` | `nutytales.com` | 301 Canonical Alias | Edge DNS | DNS Redirect | **CANONICAL REDIRECT** |
| 23 | Nuty Tales | `business.nutytales.com` | `business.nutytales.com`| B2B wholesale portal, artisan onboarding | Merchant Portal | B2B Wholesale DB | **ADAPTER READY** |
| 24 | Nuty Tales | `gifting.nutytales.com` | `gifting.nutytales.com` | Corporate gifting & festival hamper curation | E-Commerce Subdomain | Commerce Engine DB | **SAFE DEEP LINK** |
| 25 | Nuty Tales | `weddings.nutytales.com` | `weddings.nutytales.com`| Bespoke wedding favors & event gifting | Lifestyle Portal | Event Booking DB | **SAFE DEEP LINK** |
| 26 | Nuty Tales | `crafts.nutytales.com` | `crafts.nutytales.com` | Artisan storytelling & regional craft map | Content Portal | Heritage Content CMS | **SAFE DEEP LINK** |
| 27 | Nuty Tales | `stays.nutytales.com` | `stays.nutytales.com` | Experiential homestays & rural eco-tourism | Booking Engine | Travel Reservation DB | **SAFE DEEP LINK** |
| 28 | Nuty Tales | `travel.nutytales.com` | `travel.nutytales.com` | Curated cultural trails & craft journeys | Travel Portal | Travel Reservation DB | **SAFE DEEP LINK** |
| 29 | Nuty Tales | `nri.nutytales.com` | `nri.nutytales.com` | International diaspora shipping & export storefront | Global Delivery Portal | Export Commerce DB | **SAFE DEEP LINK** |

---

## 3. SEO, Canonical & Robots Boundaries

To maintain SEO equity and prevent keyword cannibalization across brands:
1. **No Cross-Brand Canonical Hijacking**: Each brand preserves its own canonical host. `careers.talentxcel.in` canonicalizes to `careers.talentxcel.in`, not `talentxcel.net`.
2. **Dedicated XML Sitemaps**: Academy maintains `https://talentxcel.net/sitemap.xml` covering only Academy programmes, legal terms, and blog resources.
3. **Robots Directives**: Authenticated routes (`/dashboard`, `/admin/*`, `/courses/*`) are strictly disallowed from search indexing.

---

## 4. Privacy & Safe Linking Protocols

- **Identity Isolation**: Applications maintain independent authentication databases.
- **Signed Intent Referral Tokens**: Cross-brand deep links (e.g. from Academy project completion to TalentXcel career recommendations) pass signed query parameters (`ref_brand=talentxcel-academy&ref_intent=capstone_completed&sig=...`) preventing data leakage.
- **No Shared Session Cookies**: Session tokens are never copied across top-level domain boundaries (`.in` vs `.net` vs `.chat` vs `.com`).
