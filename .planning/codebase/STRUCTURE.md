# Codebase Structure

**Analysis Date:** 2026-11-19

## Directory Layout

```
TalentxcelNet/
├── app/                          # Next.js App Router (pages, layouts, routes)
│   ├── (auth)/                   # Authentication flows (login, register, forgot-password)
│   ├── (public)/                 # Public discoverable routes (homepage, practice, competitive, formulas, tools)
│   ├── admin/                    # Administrative dashboards and content controls
│   ├── api/                      # Backend API route handlers (ai, auth, checkout, questions, skills)
│   ├── courses/                  # Course catalogs and detailed syllabi
│   ├── dashboard/                # Student and parent authenticated learning portal
│   ├── projects/                 # Hands-on STEM project submissions and reviews
│   ├── layout.tsx                # Root HTML layout and metadata provider
│   ├── globals.css               # Global Tailwind CSS and print utilities
│   ├── sitemap.ts                # Programmatic dynamic sitemap generator (21,800+ URLs)
│   └── robots.ts                 # Crawler access and sitemap locator rules
├── components/                   # Reusable UI and feature components
│   ├── academic/                 # Curriculum explorers, radars, formula action buttons
│   ├── assessment/               # Test runners, timers, question renderers
│   ├── auth/                     # Sign-in forms, social logins, role selectors
│   ├── commerce/                 # Pricing cards, checkout drawers, micro-pass badges
│   ├── competitive/              # Competitive exam mocks, SSB psychological battery simulator
│   ├── dashboard/                # Analytics charts, progress bars, recent activity feeds
│   ├── tools/                    # Academic calculators (CBSE CGPA, SSB age eligibility)
│   └── ui/                       # Shared Radix UI wrappers (button, badge, dialog, input)
├── lib/                          # Core utilities, API clients, and business helpers
│   ├── ai/                       # Multi-provider LLM routers and prompts
│   ├── commerce/                 # Razorpay client, entitlement ledger, pricing logic
│   ├── competitive/              # Entrance exam metadata, blueprints, question models
│   ├── integrations/             # Third-party service connectors (email, chatr)
│   ├── offline/                  # IndexedDB stores and sync managers
│   ├── supabase/                 # Supabase client, server, and middleware helpers
│   └── utils.ts                  # Shared Tailwind merge and formatting helpers
├── packages/                     # Monorepo packages
│   └── core/                     # `@talentxcel/core` server-authoritative scoring & curriculum
│       ├── src/
│       │   ├── curriculum/       # Academic classes, chapters, and board citations
│       │   ├── data/             # Commercial product catalog and micro-pass definitions
│       │   ├── scoring/          # Server-authoritative evaluator & test engine
│       │   └── index.ts          # Package public entry point
│       └── package.json
├── public/                       # Static public assets (icons, images, IndexNow key, robots)
│   ├── brand/                    # Logos, favicons, branding vectors
│   └── e5a8f2736194458bb61230491823901a.txt # IndexNow search engine verification key
├── scripts/                      # Operational scripts, SEO runners, and audit tools
│   ├── gsc-manager.mjs           # Google Search Console Indexing API batch submitter
│   ├── indexnow-submitter.mjs    # IndexNow submitter for Bing/Copilot/Yahoo
│   ├── get-search-performance.mjs# Search Analytics API performance monitor
│   ├── inspect-urls.mjs          # Googlebot live indexing inspector
│   └── seo-full-audit.mjs        # Production SEO audit runner
├── tests/                        # Automated test suites
│   ├── unit/                     # Vitest unit tests (curriculum, scoring, permissions, commerce)
│   └── setup.ts                  # Test runner environment configuration
├── .planning/                    # GSD project plans and codebase maps
│   └── codebase/                 # Structured codebase analysis documents
├── next.config.ts                # Next.js configuration (CSP, security headers, redirects)
├── package.json                  # Root dependencies and operational scripts
├── pnpm-workspace.yaml           # Monorepo workspace configuration
├── tsconfig.json                 # TypeScript compiler options and path aliases
└── vitest.config.ts              # Vitest test framework configuration
```

## Directory Purposes

**`app/`:**
- Purpose: All route definitions, server-rendered views, layouts, and API route handlers.
- Contains: `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `not-found.tsx`.
- Key files: `app/layout.tsx`, `app/(public)/page.tsx`, `app/sitemap.ts`, `app/api/health/route.ts`.

**`components/`:**
- Purpose: UI presentation layer separated into domain-specific folders and base Radix UI primitives.
- Contains: React components, hooks, client widgets (`'use client'`).
- Key files: `components/ui/button.tsx`, `components/competitive/interactive-competitive-test.tsx`, `components/academic/formula-actions.tsx`.

**`lib/`:**
- Purpose: Infrastructure and application-level business logic.
- Contains: Supabase helpers, payment adapters, AI client routers, offline database wrappers.
- Key files: `lib/supabase/server.ts`, `lib/commerce/entitlements.ts`, `lib/ai/router.ts`.

**`packages/core/`:**
- Purpose: Domain models, statutory syllabus structures, and evaluation scoring logic decoupled from web frameworks.
- Contains: Pure TypeScript libraries and Zod schemas.
- Key files: `packages/core/src/index.ts`, `packages/core/src/scoring/evaluator.ts`.

**`scripts/`:**
- Purpose: CLI tools for SEO verification, sitemap inspection, IndexNow submission, and live traffic analytics.
- Contains: Node.js `.mjs` scripts running with ES modules.
- Key files: `scripts/gsc-manager.mjs`, `scripts/indexnow-submitter.mjs`, `scripts/get-search-performance.mjs`.

## Key File Locations

**Entry Points:**
- `app/layout.tsx`: Root HTML layout with canonical URL, metadata, and themes.
- `app/(public)/page.tsx`: Production homepage with season exam hub and interactive navigation.
- `proxy.ts`: Edge middleware enforcing auth sessions and security headers.
- `app/sitemap.ts`: Dynamic XML sitemap feeding search engines 21,870 URLs.

**Configuration:**
- `next.config.ts`: Next.js security headers, image remotes, and redirects.
- `tsconfig.json`: TypeScript paths (`@/*` -> `./*`, `@talentxcel/core` -> `./packages/core/src`).
- `vitest.config.ts`: Vitest test configuration with JSDOM environment.
- `pnpm-workspace.yaml`: Monorepo package layout.

**Core Logic:**
- `packages/core/src/scoring/evaluator.ts`: Mathematical score computation and answer evaluation.
- `packages/core/src/curriculum/academic-classes.ts`: Master syllabus tree for CBSE/ICSE classes 4-12.
- `lib/commerce/entitlements.ts`: User access and micro-pass verification ledger.

**Testing:**
- `tests/unit/*.test.ts`: Vitest unit tests covering auth, permissions, scoring, commerce, and question banks.
- `packages/core/src/scoring/evaluator.test.ts`: Evaluation engine verification.

## Naming Conventions

**Files:**
- React components: `kebab-case.tsx` (e.g. `academic-calculators.tsx`, `formula-actions.tsx`).
- Next.js App Router conventions: standard names (`page.tsx`, `layout.tsx`, `route.ts`, `sitemap.ts`).
- Utility & data files: `kebab-case.ts` (e.g. `exam-data.ts`, `entitlements.ts`).
- Test files: `*.test.ts` or `*.test.tsx`.
- CLI Scripts: `kebab-case.mjs`.

**Directories:**
- Route segments: `kebab-case` (e.g. `cbse-cgpa-calculator`, `psychological-battery`).
- Dynamic route segments: `[bracket-notation]` (e.g. `[class]`, `[subject]`, `[exam]`).
- Route groups: `(parentheses)` (e.g. `(auth)`, `(public)`).

## Where to Add New Code

**New Feature (e.g. New Competitive Exam or Tool):**
- Data models & question banks: Add to `lib/competitive/exam-data.ts` or `lib/tools/`.
- UI Page: Add dynamic route in `app/(public)/competitive/[exam]/page.tsx` or new folder under `app/(public)/tools/`.
- Interactive widget: Add client component in `components/competitive/` or `components/tools/`.
- Sitemap inclusion: Update URL generation arrays in `app/sitemap.ts`.
- Tests: Add corresponding suite in `tests/unit/[feature].test.ts`.

**New Component/Module:**
- Shared UI primitives (buttons, inputs, modals): Add to `components/ui/`.
- Feature-specific UI: Add to relevant folder under `components/(academic|assessment|commerce|competitive|tools)/`.

**Utilities & Integrations:**
- External service client: Add under `lib/integrations/` or specific domain folder (`lib/commerce/`).
- Generic helper functions: Add to `lib/utils.ts`.

## Special Directories

**`.planning/`:**
- Purpose: GSD workflow state, roadmap tracking, and codebase architecture maps.
- Generated: Semi-automated by GSD commands.
- Committed: Yes.

**`public/`:**
- Purpose: Static assets served directly from the domain root (e.g. `/favicon.ico`, `/e5a8f2736194458bb61230491823901a.txt`).
- Generated: No (except static generated artifacts).
- Committed: Yes.

---

*Structure analysis: 2026-11-19*
