# TalentXcel.net Phase 0.1 Security Remediation Report

Date: 2026-11-12  
Scope: source containment, reproducible local tests, read-only production observations. No production database, DNS, credential, or deployment changes were made.

## Executive result

The audit reproduced two production authorization failures: a client-controlled administrator cookie could reach `/admin`, and the E2E question-bank bypass could return question-bank data without a Supabase session. The source remediation removes both trust paths and adds server-side role checks. The local focused suite passes 23/23 tests and `npm run build` passes.

This is not an incident declaration. Available production logs and privileged audit trails were not accessible from the repository or configured environment, so exploitation cannot be confirmed or ruled out.

## Before and after

| Area | Before | After |
| --- | --- | --- |
| Admin identity | Cookie/email/password fallback could impersonate an administrator | Only `supabase.auth.getUser()` plus active `user_roles` can authorize |
| Admin pages | Middleware was the only effective gate; role was not checked | `app/admin/layout.tsx` calls `requireAdminPage`; all child pages inherit the guard |
| Admin APIs | Growth funnel GET lacked an admin check | GET requires active admin role; telemetry POST remains public by design |
| Question bank | `x-e2e-audit`, `e2e_audit`, and admin-cookie state bypassed auth | Verified Supabase session plus learner-or-higher role required; query failures deny |
| E2E configuration | Production-usable bypass was deployed | Bypass code removed; stale endpoint returns HTTP 410 |
| Login | Hard-coded fallback and quick-fill credentials were shipped | Email/Google login uses Supabase Auth only |
| Session routing | Legacy `middleware.ts` contained authorization assumptions | Next 16 `proxy.ts` only refreshes/redirects sessions; authorization stays in pages/routes |

## Exact files changed

- `lib/auth/permissions.ts` — removed static email elevation.
- `lib/auth/access-policy.ts` — added pure deny-by-default authorization policy.
- `lib/auth/server-access.ts` — verified Supabase user and active, non-expired `user_roles` lookup; query failures deny.
- `lib/supabase/middleware.ts`, `proxy.ts`, removed `middleware.ts` — removed E2E/cookie/admin-email bypasses and moved to Next 16 Proxy convention.
- `app/admin/layout.tsx` — server-side admin page guard.
- `app/api/questions/bank/route.ts` — server-side learner-role authorization; no E2E or cookie bypass.
- `app/api/analytics/funnel/route.ts` — admin authorization on metrics GET.
- `app/api/auth/admin-login/route.ts` — retired endpoint returns 410 and sets no cookies.
- `app/dashboard/layout.tsx`, `app/dashboard/page.tsx`, `app/dashboard/question-bank/page.tsx`, `app/dashboard/settings/page.tsx` — removed demo/E2E identities.
- `components/auth/login-form.tsx` — removed hard-coded admin fallback and quick-fill credentials.
- `tests/unit/security-access-policy.test.ts`, `tests/unit/permissions.test.ts`, `tests/unit/math-question-bank.test.ts` — negative authorization coverage and E2E-bypass regression.

## Test results

Passed:

- `pnpm test -- tests/unit/permissions.test.ts tests/unit/security-access-policy.test.ts tests/unit/math-question-bank.test.ts --run` — 3 files, 23 tests passed.
- `npm run build` — Next.js 16.4.2 production build, TypeScript, static generation, and route compilation passed.
- Covered anonymous admin access, forged cookie/header equivalence, ordinary-user admin denial, admin-role allow, learner question-bank allow, expired/missing-role denial, unauthenticated question-bank API, and E2E header rejection.

Not run/remaining staging work:

- Live authenticated admin/non-admin route tests, session-expiry tests, and live RLS tests require staging identities and credentials.
- The repository's full unfiltered test command previously stalled; the focused suite is the verified result for this change.

## Production investigation

Read-only HTTP checks found the public deployment exposed the two behaviors described above. Repository inspection found no production service-role key or log connector. Anonymous REST checks showed the public schema/cache is not a substitute for privileged integrity verification. Therefore there is no evidentiary basis to claim sessions were exposed, credentials were used, or question-bank data was accessed by an unauthorized party.

Before any production release, security owners should review Vercel/edge access logs, Supabase Auth logs, database `audit_events`, API logs, and payment/provider logs for the period in which the bypass was deployed. If suspicious sessions are found, invalidate sessions and rotate the previously exposed fallback credential under a separately approved incident procedure; neither action was performed here.

## Zod GHSA-mrhx-c7xc-m3w5

Installed version: `zod@3.25.76`. Production paths: root package, `@hookform/resolvers`, and `packages/core`. `pnpm audit --prod --json` reports one high advisory, affected versions `<4.6.6`, patched versions `>=4.6.6`.

The available resolver declares compatibility with `zod ^3.25.0 || ^4.0.0`, but moving from Zod 3 to Zod 4 is a major-version change. No dependency update was applied in this containment patch. The recommended next step is a staging branch update to `zod@4.6.6` or newer, followed by schema/type/build tests and review of Zod 4 changes (notably records, errors, coercion, and any generated validation behavior) before approval.

## Supabase integrity and reconciliation plan

No production migrations or writes were run. Local migration review identified the declared `user_roles` RLS model and role helper functions, while read-only public REST probing showed schema-cache/table visibility inconsistencies. A privileged staging/production verification should export, compare, and sign off on:

1. Actual tables, columns, constraints, indexes, functions, triggers, grants, RLS enablement, and policies.
2. Applied migration history versus repository migrations, including checksum and ordering differences.
3. Storage buckets and object policies.
4. PostgREST schema cache refresh status and missing-table errors.

The reconciliation output should be a migration plan only: additive corrective migrations, policy/function changes, cache refresh steps, validation queries, and rollback SQL. It must be reviewed and explicitly approved before execution.

## Staging readiness and production gate

Source is ready for a staging deployment after configuring verified Supabase Auth and representative role rows. Staging must prove anonymous, forged-cookie, ordinary-user, administrator, E2E-header, expired-session, protected-API, and RLS cases end-to-end.

Production remains blocked. Required approval gates are: review this report and diff; complete privileged Supabase/log review; run staging tests and regression suite; decide and test the Zod 4 upgrade; configure monitoring and rollback; invalidate/rotate credentials only if separately approved; deploy through the normal reviewed pipeline; and verify the same negative tests immediately after deployment. No production deployment was performed by this task.
