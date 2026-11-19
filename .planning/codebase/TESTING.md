# Testing Patterns

**Analysis Date:** 2026-11-19

## Test Framework

**Runner:**
- Vitest 3.2.4 (`vitest.config.ts`, `package.json`)
- Environment: JSDOM (`jsdom` 30.1.2) for DOM simulation and standard Node.js global objects.
- Config file: `vitest.config.ts`

**Assertion Library:**
- Built-in Vitest assertions (`expect`), complemented by `@testing-library/jest-dom` matchers (`toBeInTheDocument`, etc.).

**Run Commands:**
```bash
pnpm test                  # Run full Vitest suite (18 files, 180 tests)
pnpm test:core             # Run core evaluator domain tests only
pnpm test:watch            # Watch mode for iterative TDD development
pnpm test:coverage         # Generate v8 test coverage report
pnpm test:e2e              # Run Playwright browser journey tests
```

## Test File Organization

**Location:**
- Unit & integration tests: `tests/unit/*.test.ts`
- Domain-co-located tests: `packages/core/src/scoring/evaluator.test.ts`, `packages/core/src/skills-engine/backpack-evaluator.test.ts`

**Naming:**
- Suffix: `*.test.ts` or `*.test.tsx`

**Structure:**
```
tests/
├── setup.ts                               # Global environment initialization
├── unit/
│   ├── academic-and-skills-class-wise.test.ts
│   ├── backpack-attempt-store.test.ts
│   ├── backpack-evaluate-api.test.ts
│   ├── certificate-signing-config.test.ts
│   ├── commerce-and-entitlements.test.ts
│   ├── ecosystem-security.test.ts
│   ├── ecosystem.test.ts
│   ├── math-question-bank.test.ts
│   ├── parent-consent.test.ts
│   ├── parent-observation.test.ts
│   ├── permissions.test.ts
│   ├── programme-universe-and-ambition.test.ts
│   ├── security-access-policy.test.ts
│   ├── skill-graph-and-project.test.ts
│   ├── universal-question-bank.test.ts
│   └── utils.test.ts
└── journey-verification.mjs               # Operational journey audit
```

## Test Structure

**Suite Organization:**
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { evaluateAttempt } from '../../packages/core/src/scoring/evaluator'

describe('Mathematics Question Bank Engine (Classes 4-12)', () => {
  beforeEach(() => {
    // Reset state or mock stores before each test
  })

  it('calculates score with negative marking penalty accurately', () => {
    const result = evaluateAttempt({
      totalQuestions: 10,
      correct: 8,
      incorrect: 2,
      negativeMarkingFactor: 0.25,
    })

    expect(result.score).toBe(7.5)
    expect(result.percentage).toBe(75)
  })

  it('strictly denies unauthenticated requests with HTTP 401 Unauthorized', async () => {
    // Test security assertions
  })
})
```

**Patterns:**
- Self-contained assertions: Each test constructs its own inputs and asserts on deterministic outputs.
- Comprehensive boundary checks: Verification of zero values, negative markings, unlimited attempts (`attemptsAllowed: -1`), and role hierarchy escalations.

## Mocking

**Framework:**
- Vitest built-in mocks (`vi.fn()`, `vi.spyOn()`, `vi.mock()`).

**Patterns:**
```typescript
import { vi } from 'vitest'

// Mocking Supabase Client or external network requests
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ data: [], error: null }),
      insert: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
  })),
}))
```

**What to Mock:**
- External network boundaries: Razorpay payment gateway API, Resend email dispatch, and live Google Search Console APIs.
- Next.js request stores: `cookies()` from `next/headers` when running outside an HTTP request cycle.

**What NOT to Mock:**
- Domain logic: Never mock `@talentxcel/core` evaluators, scoring formulas, or curriculum lookups.
- Zod validation schemas: Run actual schema parsing against fixtures.

## Fixtures and Factories

**Test Data:**
- Seed questions and product catalog objects are imported directly from production definitions (`packages/core/src/data/product-catalog.ts`, `lib/competitive/exam-data.ts`).
- Transient student attempts use lightweight inline factory objects.

## Coverage

**Requirements:**
- High coverage mandated on:
  - Security policies and role-based permissions (`tests/unit/permissions.test.ts`, `security-access-policy.test.ts`).
  - Scoring & evaluation math (`packages/core/src/scoring/evaluator.test.ts`).
  - Entitlements, payments, and product pricing (`tests/unit/commerce-and-entitlements.test.ts`).

**View Coverage:**
```bash
pnpm test:coverage
```

## Test Types

**Unit Tests:**
- Pure functions, algorithms, curriculum lookup trees, scoring math, and utility helpers.
- Run entirely in memory with no external database connections.

**Integration Tests:**
- Route handler authentication gating, entitlement grants, and offline IndexedDB attempt recovery.

**E2E Tests:**
- Playwright tests (`@playwright/test`) testing full user journeys: registration, taking a diagnostic mock test, triggering anti-leak modals, and viewing formula cheat sheets.

## Common Patterns

**Async Testing:**
```typescript
it('resolves dynamic route data asynchronously', async () => {
  const data = await getCompetitiveExamBySlug('ssb-oir')
  expect(data).toBeDefined()
  expect(data?.sections.length).toBeGreaterThan(0)
})
```

**Error & Rejection Testing:**
```typescript
it('throws when required configuration is missing', () => {
  expect(() => initializeWithInvalidKey()).toThrowError(/missing configuration/i)
})
```

---

*Testing analysis: 2026-11-19*
