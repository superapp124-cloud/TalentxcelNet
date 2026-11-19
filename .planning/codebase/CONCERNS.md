# Codebase Concerns

**Analysis Date:** 2026-11-19

## Tech Debt

**Next.js Dynamic Cookie Context in Test Environments:**
- Issue: `cookies()` from `next/headers` throws `Error: cookies was called outside a request scope` when invoked inside Vitest unit tests without an active HTTP request store.
- Files: `lib/supabase/server.ts:7:29`, `lib/commerce/entitlements.ts:60:28`.
- Impact: Console stderr outputs fallback warnings during test execution; requires in-memory ledger fallbacks.
- Fix approach: Abstract the cookie retrieval into an injectable `SessionStoreProvider` that automatically injects a mock cookie store in test environments and `next/headers` cookies in production SSR requests.

**Sitemap Generation in a Single 21,800+ URL Response:**
- Issue: `app/sitemap.ts` compiles all 21,870 curriculum chapters, formula sheets, and competitive routes dynamically in a single sitemap file.
- Files: `app/sitemap.ts`.
- Impact: High memory consumption and potential edge function timeouts as the catalog scales past 30,000 URLs (Google's single-file limit is 50,000 URLs / 50MB).
- Fix approach: Implement Next.js `generateSitemaps` to shard URLs into a standard Sitemap Index (e.g. `sitemap/0.xml` for board classes, `sitemap/1.xml` for competitive exams, `sitemap/2.xml` for tools).

## Known Bugs

**Node `--localstorage-file` Warning during Vitest:**
- Symptoms: `(node:xxxx) Warning: --localstorage-file was provided without a valid path` logged during test execution.
- Files: `vitest.config.ts`, `tests/setup.ts`.
- Trigger: Node.js 22 built-in Web Storage implementation conflicting with JSDOM environment options.
- Workaround: Benign warning; tests complete with 100% pass rate. Can be silenced by configuring Vitest pool options or explicit storage path.

## Security Considerations

**Question Bank & Proof Anti-Leak Gating:**
- Risk: Proprietary 40,000+ question bank and detailed step-by-step AI proof solutions could be scraped or mass-harvested if exposed in client JavaScript bundles.
- Files: `app/(public)/practice/`, `app/api/questions/bank/route.ts`, `components/competitive/interactive-competitive-test.tsx`.
- Current mitigation: Pages only render 5–10 diagnostic questions statically for SEO discovery; remaining questions are served through the gated `/api/questions/bank` route requiring active user authentication or micro-passes.
- Recommendations: Add IP-based and token-bucket rate limiting on `/api/questions/bank` using Cloudflare or Upstash Redis to prevent automated bot harvesting.

**Environment Variable Guard at Build Time:**
- Risk: Deploying production builds without valid Supabase or internal secrets causing runtime crashes.
- Files: `next.config.ts:5`.
- Current mitigation: Strict build-time assertion throwing an immediate error if `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing.

## Performance Bottlenecks

**Large Programmatic Page Renders on Cold Starts:**
- Problem: Dynamic chapter practice routes and formula sheets can experience slight cold-start latency on serverless edge lambdas.
- Files: `app/(public)/formulas/[class]/[subject]/page.tsx`, `app/(public)/practice/[board]/[class]/[subject]/[chapter]/page.tsx`.
- Cause: Dynamically computing curriculum trees, topics, citations, and schemas on request.
- Improvement path: Leverage `generateStaticParams` and Incremental Static Regeneration (`export const revalidate = 86400`) to cache pre-rendered HTML on Vercel's global CDN edge.

## Fragile Areas

**Next.js 16 Dynamic Route Parameter Typing (`Promise<params>`):**
- Files: `app/(public)/formulas/[class]/[subject]/page.tsx`, `app/(public)/competitive/[exam]/page.tsx`, `app/(public)/competitive/[exam]/[section]/page.tsx`.
- Why fragile: Next.js 16 App Router converted route `params` to a Promise. Forgetting to `await params` in either `generateMetadata` or Page components causes runtime type errors or missing route values.
- Safe modification: Always destructure params after awaiting: `const { exam: examSlug } = await params`.
- Test coverage: Covered in `tests/unit/academic-and-skills-class-wise.test.ts`.

**In-Memory Entitlement Ledger vs Distributed State:**
- Files: `lib/commerce/entitlements.ts`.
- Why fragile: If the primary Supabase PostgreSQL database is unreachable or connection pool is exhausted, the system falls back to an in-memory memory map. On serverless infrastructure (Vercel), memory maps are isolated per lambda instance and do not persist across requests.
- Safe modification: Ensure primary Supabase connection pooler (PgBouncer/Supavisor) is properly provisioned with auto-scaling connections.

## Scaling Limits

**Search Console Dashboard Perception vs Real-time Reality:**
- Current capacity: Google Search Console web UI chart has an inherent 4–7 day reporting delay.
- Limit: During peak exam season (Nov–Feb), dashboard panic occurs if stakeholders judge real-time traffic solely by the delayed GSC web graph.
- Scaling path: Rely on automated script pipelines (`scripts/get-search-performance.mjs`) and real-time push protocols (IndexNow to Bing/Copilot/Yahoo) for immediate 15-minute search indexation.

## Dependencies at Risk

**Tailwind CSS v4 Ecosystem Evolution:**
- Risk: Tailwind CSS v4 is a complete rewrite using `@tailwindcss/postcss`. Some legacy Tailwind v3 plugins or syntax may produce deprecation notices.
- Impact: Low; current styles and responsive `@media print` utilities are verified and working.
- Migration plan: Maintain strict adherence to CSS 4 variable standards in `app/globals.css`.

## Missing Critical Features

**Sitemap Sharding / Chunking:**
- Problem: No automated chunking for sitemaps exceeding 25,000 URLs.
- Blocks: Future expansion to all state board languages and complete question-level URLs.
- Plan: Implement multi-index sitemap before catalog reaches 40,000 indexed routes.

## Test Coverage Gaps

**Playwright End-to-End Test Automation in CI:**
- What's not tested: While unit tests cover 100% of curriculum and scoring engines (180/180 tests passing), automated Playwright browser journeys (`pnpm test:e2e`) are not yet hooked into a GitHub Actions CI workflow.
- Files: `tests/journey-verification.mjs`, `playwright.config.ts`.
- Risk: Subtle CSS regressions or hydration mismatches could pass unit tests unnoticed.
- Priority: Medium.

---

*Concerns audit: 2026-11-19*
