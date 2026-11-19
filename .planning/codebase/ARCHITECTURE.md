<!-- refreshed: 2026-11-19 -->
# Architecture

**Analysis Date:** 2026-11-19

## System Overview

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Client / Edge Entry Points                            │
├──────────────────────────┬──────────────────────────┬───────────────────────┤
│   Next.js App Router     │   Edge Proxy Middleware  │   Programmatic SEO    │
│  `app/(public)/...`      │       `proxy.ts`         │   `app/sitemap.ts`    │
│  `app/dashboard/...`     │                          │   `app/robots.ts`     │
└────────────┬─────────────┴────────────┬─────────────┴───────────┬───────────┘
             │                          │                         │
             ▼                          ▼                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Application & API Routing Layer                          │
│  - Route Handlers: `app/api/(ai|auth|checkout|questions|skills)/`            │
│  - Interactive Client Components: `components/(academic|competitive|ui)/`   │
│  - SSR Pages & Layouts: `app/(public)/...`, `app/layout.tsx`                │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     Domain Logic & Utilities (Core)                         │
│  - Authoritative Scoring: `packages/core/src/scoring/evaluator.ts`          │
│  - Curriculum & Syllabus: `packages/core/src/curriculum/academic-classes.ts` │
│  - Commerce & Entitlements: `lib/commerce/entitlements.ts`                  │
│  - Multi-LLM Router: `lib/ai/router.ts`                                     │
└───────────────────────────────────────┬─────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Persistence & External Infrastructure                    │
│  - Supabase PostgreSQL / RLS: `lib/supabase/server.ts`                      │
│  - Offline IndexedDB Store: `lib/offline/`, `idb`                           │
│  - Razorpay Gateway: `lib/commerce/razorpay.ts`                             │
│  - Google Search Console & IndexNow: `scripts/`                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Edge Proxy | Session validation, CORS, origin redirects, security headers | `proxy.ts` |
| Root Layout | Metadata, theme providers, canonical URLs, global styles | `app/layout.tsx` |
| Scoring Engine | Server-authoritative assessment scoring, penalty logic, OLQ evaluation | `packages/core/src/scoring/evaluator.ts` |
| Curriculum Vault | NCERT/CBSE/ICSE chapter trees, topics, and citation mappings | `packages/core/src/curriculum/` |
| Entitlement Ledger | User access grants, micro-pass checks, and in-memory test fallback | `lib/commerce/entitlements.ts` |
| Question Bank API | Gated API serving filtered questions with authentication check | `app/api/questions/bank/route.ts` |
| Interactive Test Runner | Timed test UI, instant feedback, anti-leak paywall modals | `components/competitive/interactive-competitive-test.tsx` |
| Formula Actions | 1-click printable PDF view & viral WhatsApp share triggers | `components/academic/formula-actions.tsx` |
| Programmatic Sitemap | Dynamic XML sitemap generation for 21,800+ academic & exam routes | `app/sitemap.ts` |

## Pattern Overview

**Overall:** Modular Monolith with Next.js App Router (Server/Client Separation) and Core Domain Package.

**Key Characteristics:**
- **Server Components by Default:** Public discovery, landing pages, and SEO-critical routes render on the server with zero client JavaScript overhead until interactivity is required.
- **Server-Authoritative Evaluation:** Assessment scoring, test evaluation, and answer verification are executed on the server or via `@talentxcel/core` to prevent client-side answer spoofing.
- **Progressive Enhancement & Offline Support:** Interactive assessment runners operate offline using IndexedDB, queuing attempts until connectivity is restored.
- **Freemium Anti-Leak Gating:** Diagnostic sample questions (5–10) are free for indexing and quick discovery; deep proofs, full 40k+ question banks, and complete mock series require account creation or micro-passes.

## Layers

**Edge / Middleware Layer:**
- Purpose: Enforce security headers, route protection, and authentication cookies.
- Location: `proxy.ts`, `next.config.ts`
- Contains: Next.js middleware handlers, header definitions, redirects.
- Depends on: `@supabase/ssr`
- Used by: All incoming HTTP requests.

**Presentation Layer (App Router & UI Components):**
- Purpose: Render accessible, fast, and SEO-optimized web views.
- Location: `app/`, `components/`
- Contains: Server components (`page.tsx`, `layout.tsx`), Client components (`'use client'`), Radix UI wrappers.
- Depends on: `packages/core`, `lib/`
- Used by: Web browsers, mobile search crawlers, student devices.

**Domain Logic Layer (`packages/core`):**
- Purpose: Pure business rules, curriculum data, and scoring engines decoupled from UI.
- Location: `packages/core/src/`
- Contains: TypeScript interfaces, Zod schemas, evaluator functions, product catalogs.
- Depends on: `zod`
- Used by: Both API route handlers and React components.

**Integration & Persistence Layer (`lib/`):**
- Purpose: Coordinate with external databases, AI APIs, payment processors, and file storage.
- Location: `lib/supabase/`, `lib/commerce/`, `lib/ai/`, `lib/offline/`
- Contains: Client initializers, API wrappers, fallback in-memory ledgers.
- Used by: Route handlers and Server Actions.

## Data Flow

### Primary Assessment Attempt Flow

1. Student navigates to practice route (`app/(public)/practice/[board]/[class]/[subject]/[chapter]/page.tsx`).
2. Page fetches chapter metadata from core package (`packages/core/src/curriculum/academic-classes.ts`).
3. Student starts timed diagnostic mock; client component (`components/competitive/interactive-competitive-test.tsx`) manages countdown and answers locally.
4. On submission, answers are posted to evaluation endpoint (`app/api/skills/backpack/evaluate/route.ts`).
5. Evaluation endpoint invokes server-authoritative evaluator (`packages/core/src/scoring/evaluator.ts`).
6. Entitlement ledger checks user tier (`lib/commerce/entitlements.ts`); if gated, returns freemium sign-up modal or micro-pass checkout.
7. Results stored in Supabase (`lib/supabase/server.ts`) or cached in IndexedDB (`lib/offline/`).

### Programmatic SEO Crawl Flow

1. Search engine crawler requests `https://talentxcel.net/sitemap.xml`.
2. `app/sitemap.ts` dynamically generates entries for 21,800+ curriculum chapters, formula sheets, competitive exams, and tools.
3. Crawler visits target page (e.g. `/formulas/class-10/math`).
4. Server pre-renders semantic HTML with valid JSON-LD (`LearningResource`, `Course`, `BreadcrumbList`, `Quiz`).
5. Canonical URL, OpenGraph tags, and clean semantic H1/H2 tags are returned with HTTP 200 OK.

**State Management:**
- Server State: Next.js Server Components, TanStack React Query (`@tanstack/react-query`).
- Client / Local State: Zustand stores (`zustand`), local React state (`useState`), and IndexedDB (`idb`).

## Key Abstractions

**Curriculum Chapter & Topic:**
- Purpose: Represents statutory syllabus models for CBSE, ICSE, and state boards.
- Examples: `packages/core/src/curriculum/academic-classes.ts`, `lib/academic/`
- Pattern: Immutable data trees with helper lookup functions (`getCurriculumChapters`).

**Competitive Exam Definition:**
- Purpose: Encapsulates entrance exam blueprints (SSB OIR, NDA, CDS, NEET, JEE).
- Examples: `lib/competitive/exam-data.ts`, `lib/competitive/ssb-psych-data.ts`
- Pattern: Strongly typed schema with question models, time limits, and OLQ criteria.

**Entitlement Record:**
- Purpose: Grants time-boxed or attempt-boxed access to premium test banks.
- Examples: `lib/commerce/entitlements.ts`, `packages/core/src/data/product-catalog.ts`
- Pattern: Dual-layer storage (Supabase PostgreSQL with fallback to in-memory ledger).

## Entry Points

**Root Web Application:**
- Location: `app/layout.tsx`, `app/(public)/page.tsx`
- Triggers: User or search crawler visiting `https://talentxcel.net/`
- Responsibilities: Initialize root HTML, fonts, themes, navigation bar, and canonical headers.

**Edge Proxy Middleware:**
- Location: `proxy.ts`
- Triggers: Every incoming HTTP request
- Responsibilities: Security headers, session token refresh, route protection.

**Dynamic Sitemap:**
- Location: `app/sitemap.ts`
- Triggers: Crawlers requesting `/sitemap.xml`
- Responsibilities: Stream comprehensive index of all 21,870 valid platform URLs.

**Question Bank API:**
- Location: `app/api/questions/bank/route.ts`
- Triggers: Authenticated student assessment requests
- Responsibilities: Validate auth token, enforce tier permissions, return randomized questions without exposing full bank.

## Architectural Constraints

- **Next.js 16 Dynamic Route Params:** Route parameters in dynamic pages (`[class]`, `[subject]`, `[exam]`) are async (`Promise<{ ... }>`) and must always be `await`ed in both `generateMetadata` and Page components.
- **Server Authoritative Scoring:** Client code must never contain complete answer keys for gated questions.
- **Offline First Resilience:** Core student practice sessions must degrade gracefully if network drops.
- **Monorepo Independence:** `@talentxcel/core` must have zero React or browser dependencies to run identically in Node.js, edge workers, and client scripts.

## Anti-Patterns

### Exposing Full Question Banks in Public Client Bundles
**What happens:** Placing hundreds of questions with full answer keys directly in client-side JSON files.
**Why it's wrong:** Students can inspect network responses to view answers; scrapers can steal proprietary content.
**Do this instead:** Expose only 5–10 diagnostic questions publicly with schema markup; gate full test banks behind `app/api/questions/bank/route.ts` with server-side validation.

### Calling Next.js Dynamic APIs (e.g. `cookies()`) in Untracked Scopes
**What happens:** Invoking `cookies()` during static generation or inside utility functions running in unit tests.
**Why it's wrong:** Throws `Error: cookies was called outside a request scope`.
**Do this instead:** Wrap `cookies()` calls in `try/catch` and provide a fallback in-memory mock when executing in test or build environments (`lib/commerce/entitlements.ts`).

## Error Handling

**Strategy:** Fail-soft with graceful fallbacks and user-friendly visual recovery.

**Patterns:**
- Route-level error boundaries (`error.tsx`, `not-found.tsx`).
- API routes return standard `{ error: string, code: string }` JSON with accurate HTTP status codes (400, 401, 403, 404, 500).
- Offline fallback mechanisms: When Supabase is unreachable, the platform degrades to read-only or in-memory mode rather than crashing.

## Cross-Cutting Concerns

**Logging:** Structured server-side logging with request metadata (`app/api/health/route.ts`).
**Validation:** Zod schemas across all API endpoints, form inputs, and assessment responses.
**Authentication:** Supabase SSR cookie sessions with role-based route gating (`student`, `parent`, `admin`).

---

*Architecture analysis: 2026-11-19*
