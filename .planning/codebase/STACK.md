# Technology Stack

**Analysis Date:** 2026-11-19

## Languages

**Primary:**
- TypeScript 5.x (`tsconfig.json`, `tsconfig.base.json`) - Strict type checking across the Next.js frontend, API routes, domain packages, and test suites.

**Secondary:**
- JavaScript / ECMAScript 2024 (`eslint.config.mjs`, `postcss.config.mjs`, `scripts/*.mjs`) - Automation runners, SEO audits, and IndexNow tooling.
- SQL (`PHASE_0_7A_READ_ONLY_SQL.sql`, Supabase migrations) - Database schema, Row-Level Security (RLS) policies, and analytical views.
- CSS 4 / Tailwind CSS v4 (`app/globals.css`, `@tailwindcss/postcss`) - Zero-runtime atomic styling and dark mode theming.

## Runtime

**Environment:**
- Node.js >= 20.x / 22.x LTS (compatible with Vercel and standalone container runtimes)
- Browser runtimes: Evergreen Chromium, Safari, Firefox, and Microsoft Edge (with offline IndexedDB support via `idb`)

**Package Manager:**
- pnpm 11.16.0 (`pnpm-lock.yaml`, `pnpm-workspace.yaml`)
- Lockfile: `pnpm-lock.yaml` (present, strictly version-locked)
- Monorepo workspace configuration: `apps/*` and `packages/*`

## Frameworks

**Core:**
- Next.js 16.4.2 (`package.json`, `next.config.ts`) - App Router with React 19 Server Components (RSC), async route params (`Promise<{ ... }>`), Server Actions, dynamic metadata generation, and sitemap generation.
- React 19.3.0 (`package.json`) - React 19 compiler-ready core runtime with hooks, suspense boundaries, and streaming SSR.
- Radix UI primitives (`@radix-ui/react-*`) - Accessible, unstyled UI primitives for accordions, dialogs, dropdowns, and tooltips.

**Testing:**
- Vitest 3.2.4 (`vitest.config.ts`, `package.json`) - High-speed ESM-native test runner for core evaluation engines, permission stores, and unit tests.
- React Testing Library 16.3.0 & `@testing-library/jest-dom` 6.6.3 - DOM and user interaction simulation in JSDOM environment.
- Playwright 1.52.0 (`package.json`) - Browser automation and end-to-end integration journeys.

**Build/Dev:**
- TypeScript Compiler (`tsc`) - Project type-checking (`pnpm type-check`).
- Tailwind CSS v4 (`@tailwindcss/postcss`, `postcss.config.mjs`) - JIT engine with native CSS nesting.
- ESLint 9 (`eslint.config.mjs`, `eslint-config-next`) - Flat config linter enforcing Next.js and React best practices.
- Prettier 3.5.3 (`package.json`) - Deterministic code formatting.

## Key Dependencies

**Critical:**
- `@talentxcel/core` (`packages/core/package.json`) - Server-authoritative curriculum, assessment scoring engines, and domain models.
- `zod` 3.25.76 (`package.json`) - Runtime schema validation for requests, student assessment responses, entitlements, and external APIs.
- `@supabase/supabase-js` 2.117.3 & `@supabase/ssr` 0.6.1 (`lib/supabase/`) - Supabase backend authentication, cookie session handling, and database client.
- `lucide-react` 0.511.0 (`package.json`) - Standardized icon library across public, academic, and dashboard interfaces.
- `zustand` 5.0.15 (`package.json`) - Lightweight client-side state store for interactive testing and local progress persistence.
- `idb` 8.0.4 (`package.json`, `lib/offline/`) - IndexedDB wrapper for offline student progress, question caching, and syncing.

**Infrastructure:**
- `googleapis` 188.0.0 (`scripts/gsc-manager.mjs`, `scripts/inspect-urls.mjs`) - Direct Google Search Console and Indexing API integration.
- `next-themes` 0.4.6 (`components/providers/theme-provider.tsx`) - Theme switching between light, dark, and system modes.
- `date-fns` 4.4.0 (`package.json`) - Date formatting, countdowns, and schedule computations.
- `sonner` 2.0.8 (`package.json`) - Toast notification manager.

## Configuration

**Environment:**
- Configured via `.env.example` template copied to `.env.local` for local execution.
- Key configurations required:
  - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (strictly validated during build in `next.config.ts`).
  - `SUPABASE_SERVICE_ROLE_KEY` (server-side only administrative access).
  - `NEXT_PUBLIC_APP_URL` (canonical domain resolution, default: `https://talentxcel.net`).
  - `INTERNAL_SECRET` (token signature security).
  - Payment and AI provider credentials (`RAZORPAY_KEY_ID`, `OPENAI_API_KEY`, `GOOGLE_AI_API_KEY`).

**Build:**
- `next.config.ts` - Enforces Content-Security-Policy (CSP), Strict-Transport-Security, X-Frame-Options, domain redirects (`www` to non-`www`), and remote image patterns.
- `tsconfig.json` - Path aliases `@/*` mapping to root and `@talentxcel/core` mapping to `packages/core/src`.
- `pnpm-workspace.yaml` - Defines monorepo packages (`apps/*`, `packages/*`).

## Platform Requirements

**Development:**
- Node.js 20.x or higher, pnpm 11.x.
- PowerShell 7+ on Windows or Bash on POSIX systems.
- Supabase project URL and anon key (or in-memory mock fallback mode for unit testing).

**Production:**
- Vercel or Node.js server container hosting `https://talentxcel.net`.
- Supabase cloud instance (`wvuvriewskvvievacida.supabase.co`) for database, auth, and storage.
- Cloudflare CDN / DNS for root SSL, canonical redirects, and caching.

---

*Stack analysis: 2026-11-19*
