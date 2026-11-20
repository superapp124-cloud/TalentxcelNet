# PRD: TalentXcel.net 10M Monthly Organic Traffic Growth Engine

## Objective & North Star
Scale TalentXcel.net from its current baseline to **10,000,000 monthly visits** through an automated, programmatic SEO and viral growth engine powered by the 8-pillar agentic architecture:
- **Semrush**: Search volume, KGR keyword clustering, competitor link gap closure.
- **Chrome DevTools**: Core Web Vitals (sub-50ms TTFB, 0 CLS, <1.2s LCP, 100/100 mobile Lighthouse).
- **Figma / Generative UI**: High-converting viral UI components, printable formula cheat sheets, WhatsApp share cards.
- **Google Antigravity SDK**: Autonomous indexing, crawl verification, and maintenance agents.
- **Get Shit Done (GSD)**: Phase planning, milestone delivery, and verification gates.
- **Ralph Loop**: PRD-driven atomic iterations with externalized memory in `docs/tasks/progress.txt`.
- **Swarm**: Multi-agent parallel task execution across SEO, Content, Performance, and CRO.
- **CodeRabbit**: Continuous automated code quality, security audits, and regression gates.

---

## The 10M Traffic Formula

| Channel / Cluster | Target URLs | Avg Monthly Searches / URL | Projected Traffic | Primary Intent / Search Queries |
| :--- | :--- | :--- | :--- | :--- |
| **Programmatic NCERT Solutions** | 120,000 | 45 | **5,400,000** | "Class 10 science ch 10 ex 1 q 4 solution", "Class 9 maths ex 2.5 q 5" |
| **Formula Cheat Sheets & Revision** | 2,500 | 880 | **2,200,000** | "Class 10 maths all formulas pdf", "Class 12 physics formula sheet" |
| **Interactive Academic & Defence Calculators** | 50 | 30,000 | **1,500,000** | "CBSE CGPA to percentage calculator", "SSB age eligibility calculator" |
| **Competitive Exam Mock Hubs** | 1,200 | 650 | **780,000** | "SSB OIR mock test online", "NDA maths chapter wise practice test" |
| **Parent Intelligence & Sunday Reports** | Viral Loop | — | **120,000** | WhatsApp student scorecard shares, peer referral links |
| **Total Target** | **123,750+** | — | **10,000,000+** | **10M Monthly Organic Traffic** |

---

## Actionable Execution Tasks (Prioritized)

### [TASK-01] Sitemap Partitioning & Multi-Sitemap Indexing Scale
- Partition single `/sitemap.xml` into a multi-tier sitemap index (`/sitemap-index.xml`):
  - `sitemap-core.xml`: Core public routes, hubs, plans, calculators
  - `sitemap-practice.xml`: CBSE & CISCE classes 4-12 practice test hubs
  - `sitemap-ncert.xml`: NCERT chapter solution hubs
  - `sitemap-formulas.xml`: Quick revision & formula cheat sheets
  - `sitemap-questions-*.xml`: Sharded 10k-URL question sitemaps
- Ensure all sitemaps conform to Google & Bing sitemap standards with `lastmod`, `priority`, and `changefreq`.

### [TASK-02] Instant Indexing Protocol: IndexNow + Google Search Console Automation
- Enhance `scripts/indexnow-submitter.mjs` to auto-batch submit 10,000 URLs daily to IndexNow (Bing, Copilot, Yahoo).
- Enhance `scripts/gsc-manager.mjs` to systematically batch-notify Google Indexing API on updated and newly published question shards.
- Add an automated GitHub Action / scheduled cron worker for daily ping execution.

### [TASK-03] High-Yield Printable Formula Cheat Sheets & Viral PDF Generation
- Add 1-click printable PDF generation (`@media print` clean stylesheet) for all 18 formula hubs (`/formulas/[class]/[subject]`).
- Include QR codes and viral WhatsApp sharing links: *"Share this Formula Sheet with your study group"*.

### [TASK-04] Viral Interactive Calculators Expansion
- Deploy 3 high-volume academic calculation engines:
  1. `Class 10 & 12 Board Percentage Calculator` (CBSE, ICSE, State Boards).
  2. `CBSE Best-of-Five Calculator` (handles additional subject rules).
  3. `JEE Main & NEET Rank vs Percentile Predictor`.
- Include `WebApplication` and `HowTo` structured JSON-LD schemas on all calculator pages.

### [TASK-05] Core Web Vitals & Chrome DevTools Performance Profiling
- Audit and enforce sub-100ms TTFB across all programmatic question and formula pages.
- Ensure 0 Cumulative Layout Shift (CLS) on math equations by pre-allocating KaTeX / LaTeX container heights.
- Ensure Largest Contentful Paint (LCP) under 1.2s on 4G mobile throttling.

### [TASK-06] QAPage & Quiz Rich Results Schema Expansion
- Validate Google Rich Results eligibility for all `QAPage` structured data on `/question/[id]`.
- Add `acceptedAnswer` with textbook citation and verified teacher timestamp.
- Add `EduQuestion` and `Quiz` schema markup for practice hubs.

### [TASK-07] WhatsApp Diagnostic Referral Loop Integration
- Add instant WhatsApp share buttons to Sunday Parent Intelligence Reports and Assessment completion cards.
- Embed signed referral tokens (`/api/ecosystem/referral/sign`) so every shared report grants free credits to friends while tracking organic viral K-factor.

### [TASK-08] Code Quality & CodeRabbit Pre-Commit Verification
- Verify all new routes with `tsc --noEmit`, `vitest run`, and `next build` before committing.
- Run CodeRabbit static review checks to maintain 0 security regressions.
