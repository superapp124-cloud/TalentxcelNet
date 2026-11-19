# Coding Conventions

**Analysis Date:** 2026-11-19

## Naming Patterns

**Files:**
- Component files: `kebab-case.tsx` (e.g. `interactive-competitive-test.tsx`, `formula-actions.tsx`, `academic-calculators.tsx`).
- Next.js App Router files: fixed lowercase names (`page.tsx`, `layout.tsx`, `route.ts`, `not-found.tsx`, `sitemap.ts`).
- Library & service files: `kebab-case.ts` (e.g. `exam-data.ts`, `entitlements.ts`, `razorpay.ts`).
- Unit test files: `*.test.ts` or `*.test.tsx` located in `tests/unit/` or co-located with domain logic (`packages/core/src/scoring/evaluator.test.ts`).
- Automation scripts: `kebab-case.mjs` (e.g. `indexnow-submitter.mjs`, `seo-full-audit.mjs`).

**Functions:**
- Standard functions and utilities: `camelCase` (e.g. `calculateCommercialOrderSummary`, `getCurriculumChapters`, `grantEntitlement`).
- React Component functions: `PascalCase` (e.g. `InteractiveCompetitiveTest`, `FormulaActionButtons`, `CbseCgpaCalculator`).
- Route Handlers: exported HTTP verb functions in uppercase (`GET`, `POST`, `PUT`, `DELETE`).

**Variables:**
- Local variables and constants: `camelCase` (e.g. `classNum`, `subjectName`, `activeQuestionIndex`).
- Static configuration & catalog tables: `SCREAMING_SNAKE_CASE` (e.g. `ACADEMIC_CLASSES`, `ALL_COMMERCIAL_PRODUCTS`, `COMPETITIVE_EXAMS`).
- Environment variables: `SCREAMING_SNAKE_CASE` (e.g. `NEXT_PUBLIC_SUPABASE_URL`, `INTERNAL_SECRET`).

**Types & Interfaces:**
- TypeScript interfaces and types: `PascalCase` (e.g. `CompetitiveQuestion`, `ExamSection`, `EntitlementRecord`, `PageProps`).
- Zod schema instances: `camelCase` suffixed with `Schema` (e.g. `curriculumChapterSchema`, `submissionPayloadSchema`).

## Code Style

**Formatting:**
- Formatted via Prettier (`prettier --write .`).
- Single quotes (`'`), no trailing commas where disallowed, 2-space indentation.
- Tailwind CSS class order follows logical layout (container -> layout -> typography -> color -> dark mode -> print/media queries).

**Linting:**
- ESLint 9 (`eslint.config.mjs`) extending Next.js core-web-vitals and TypeScript recommendations.
- Strict type checking with `tsc --noEmit`. No untyped `any` in core domains.

## Import Organization

**Order:**
1. React and Next.js built-ins (`import React, { useState } from 'react'`, `import { Metadata } from 'next'`, `import Link from 'next/link'`).
2. Third-party UI primitives and icons (`import { Button } from '@/components/ui/button'`, `import { ShieldCheck, ArrowRight } from 'lucide-react'`).
3. Core domain packages (`import { ACADEMIC_CLASSES, getCurriculumChapters } from '@/packages/core/src'`).
4. Internal libraries and services (`import { getCompetitiveExamBySlug } from '@/lib/competitive/exam-data'`).
5. Type definitions (`import type { BoardCode, SubjectCode } from '@/packages/core/src'`).

**Path Aliases:**
- `@/*` maps to repository root `./*` (e.g. `@/components/ui/button`, `@/lib/supabase/server`).
- `@talentxcel/core` maps to `./packages/core/src`.

## Error Handling

**Patterns:**
- Boundary isolation: Next.js `error.tsx` catches client-side render exceptions.
- API Route handling: Structured `try/catch` blocks returning standard JSON payloads:
  ```typescript
  try {
    // operations
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('[Module] Error description:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
  ```
- Graceful degradation: Services calling external dependencies (e.g., Supabase or cookies) provide a safe in-memory fallback during test runs or offline sessions.

## Logging

**Framework:**
- Native `console.log` / `console.error` / `console.warn` prefixed with component/module tags (e.g. `[Commerce]`, `[IndexNow]`, `[SEO-Audit]`).
- Sensitive data filtering: Never log tokens, user passwords, credit card numbers, or full question bank proofs.

## Comments

**When to Comment:**
- Comment architectural decisions, statutory constraints (e.g., CBSE 9.5 CGPA multiplier, UPSC cutoff dates), and security paywalls.
- Keep comments concise and explanatory of *why*, not *what*.

**JSDoc/TSDoc:**
- Used on exported library functions in `packages/core` to clarify parameters, return types, and business rules.

## Function Design

**Size:**
- Aim for compact functions (< 50 lines). Decompose complex components into smaller presenter sub-components.
- Server-authoritative logic must be pure functions with deterministic outputs for a given input.

**Parameters:**
- Prefer typed object parameter bags for functions with > 2 arguments (e.g. `interface EvaluationParams { ... }`).
- Next.js dynamic route components receive `props: { params: Promise<{ [key]: string }> }` in accordance with Next.js 16 conventions.

**Return Values:**
- Explicit return types on core domain functions and metadata generators (`Promise<Metadata>`).

## Module Design

**Exports:**
- Named exports for functions, utilities, and components (`export function FormulaActionButtons(...)`).
- Default export reserved for Next.js App Router entry pages and layouts (`export default async function Page(...)`).

**Barrel Files:**
- Centralized barrel exports in `packages/core/src/index.ts` to expose clean domain APIs to consumers without internal path leakage.

---

*Convention analysis: 2026-11-19*
