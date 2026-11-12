# TalentXcel.net Phase 0.3 Security Baseline Review

Date: 2026-11-12  
Recommendation: **HOLD pending human review and remediation of the findings below.** No staging/production action, Git write, dependency update, branch, push, or database operation was performed.

## 1. Source-control state

- Branch: `main`
- Expected/current HEAD: `7687d4023b238d7db8ca34df8a7c7c895114c520`
- Phase 0, 0.1, and 0.2 artifacts are preserved as uncommitted working-tree changes.
- No reset, clean, stash, stage, commit, merge, or push was performed.
- Complete diff command for human review: `git diff HEAD`.

Tracked modified/deleted files:

`app/admin/layout.tsx`, `app/api/analytics/funnel/route.ts`, `app/api/auth/admin-login/route.ts`, `app/api/questions/bank/route.ts`, `app/dashboard/layout.tsx`, `app/dashboard/page.tsx`, `app/dashboard/question-bank/page.tsx`, `app/dashboard/settings/page.tsx`, `components/auth/login-form.tsx`, `lib/auth/permissions.ts`, `lib/supabase/middleware.ts`, deleted `middleware.ts`, `tests/unit/math-question-bank.test.ts`, and `tests/unit/permissions.test.ts`.

Untracked preserved artifacts/files:

- Phase 0/0.1/0.2 reports under `docs/`.
- `lib/auth/access-policy.ts`, `lib/auth/server-access.ts`, `proxy.ts`.
- `tests/unit/security-access-policy.test.ts`.

## 2. Security diff review

The inspected implementation now has these properties:

- Admin pages call `requireAdminPage()` from `app/admin/layout.tsx`.
- Authorization uses `supabase.auth.getUser()` and active, non-expired `user_roles` rows.
- Role-query errors return no roles and deny by default.
- `lib/auth/permissions.ts` no longer contains a static administrator email list.
- `x-e2e-audit`, `e2e_audit`, `talentxcel_super_admin`, and client role-cookie state are not used by the inspected auth/API paths.
- `app/api/questions/bank/route.ts` requires verified learner-or-higher access.
- `app/api/auth/admin-login/route.ts` returns HTTP 410 and issues no session.
- `proxy.ts` performs session refresh/redirect only; authorization is repeated in server pages/routes.

The focused security suite contains 23 passing tests.

## 3. Remaining source-level findings

1. **Hard-coded administrator password in migration (high priority):** `supabase/migrations/0005_grant_super_admins.sql:4,26,39,47` embeds a default administrator password and writes it into `auth.users`. This is historical migration code, but it remains a credential exposure and must not be re-run. Human review should determine whether it was applied, then separately approve password/session invalidation and replace the migration strategy with controlled Supabase Auth provisioning. No rotation was performed.
2. **Development signing-secret fallback:** `app/api/skills/backpack/evaluate/route.ts:80` falls back to `dev_talentxcel_secret_key_2026` when `CERTIFICATE_SIGNING_SECRET` is missing. Production should fail closed on a missing secret; changing this is outside this review boundary.
3. **Public anon-key fallbacks:** `next.config.ts:58`, `lib/supabase/server.ts:8`, `lib/supabase/middleware.ts:9`, and `lib/supabase/client.ts:6` contain a publishable Supabase anon key fallback. Anon keys are not privileged credentials, but production should use explicit environment configuration and avoid silent fallback ambiguity.
4. **Legacy E2E harness references:** `tests/journey-verification.mjs:25,30` still sends the former E2E header/cookie. This is test-only, but should be converted to real staging identities before any staging sign-off.

No static administrator email or privileged identity remains in the inspected application auth paths. The migration finding above is historical credential material, not an active application authorization path.

## 4. Recoverable file manifest

### A. Phase 0.1 security implementation

`app/admin/layout.tsx`; `app/api/analytics/funnel/route.ts`; `app/api/auth/admin-login/route.ts`; `app/api/questions/bank/route.ts`; `app/dashboard/layout.tsx`; `app/dashboard/page.tsx`; `app/dashboard/question-bank/page.tsx`; `app/dashboard/settings/page.tsx`; `components/auth/login-form.tsx`; `lib/auth/permissions.ts`; `lib/auth/server-access.ts`; `lib/auth/access-policy.ts`; `lib/supabase/middleware.ts`; deleted `middleware.ts`; new `proxy.ts`.

### B. Phase 0.1 tests

`tests/unit/math-question-bank.test.ts`; `tests/unit/permissions.test.ts`; `tests/unit/security-access-policy.test.ts`.

### C. Phase 0 audit reports

`docs/phase-0-product-technical-audit-2026-11-12.md`; `docs/phase-0.1-security-remediation-report-2026-11-12.md`; `docs/phase-0.2-staging-forensics-readiness-report-2026-11-12.md`.

### D. Unrelated or potentially unrelated

All other existing working-tree content, including existing audit screenshots, historical reports, migration history, and product source, is outside the Phase 0.1 manifest and must not be bundled without review. `git status --short` is the authoritative inventory before any human-approved commit.

Secret scan: `.env.local` is not listed as a tracked/untracked change, and no service-role key was found in the inspected artifacts. The scan did identify the historical password and development signing fallback described above. Existing screenshots/reports may contain personal or operational data and should be reviewed before publication.

## 5. Safe baseline procedure after human review

Do not run these commands until the reviewer confirms the manifest and resolves unrelated changes:

```powershell
git switch -c codex/security-baseline
git status --short
git diff --check
git add <explicit-reviewed-Phase-0-and-0.1-files>
git diff --cached --name-status
git diff --cached --check
git commit -m "security: establish Phase 0.1 remediation baseline"
git status --short
```

The placeholder to `git add` must be replaced with an explicit reviewed file list; never use `git add .` for this baseline. Do not push or merge without separate approval.

## 6. Isolated Zod remediation plan

Current audit finding: `zod@3.25.76`, vulnerable to GHSA-mrhx-c7xc-m3w5; patched advisory range is `>=4.6.6`. `@hookform/resolvers` declares `zod ^3.25.0 || ^4.0.0`, but Zod 4 is a major migration.

After the security baseline is reviewed and committed, create an isolated branch from that commit:

```powershell
git switch -c codex/zod-remediation
pnpm add zod@^4.6.6 --save-exact
pnpm audit --prod
pnpm exec tsc --noEmit
pnpm test -- --run
npm run build
```

Before any merge, inspect every `packages/core` schema and application validation path for records, coercion, parsing errors, defaults, discriminated unions, and inferred TypeScript types. Add explicit validation-schema tests and API integration tests. This phase did not modify dependencies.

## 7. Staging evidence checklist

Securely provision disposable staging identities through the identity provider; never paste secrets into source, chat, logs, or test fixtures. Required fixtures are: anonymous; ordinary learner; active administrator; expired administrator; revoked administrator; authenticated user with no `user_roles` row; and a controlled role-query-failure test using a staging-only database fault/mocked adapter.

Capture request, HTTP status/body, server authorization decision, and relevant audit event for:

- Admin pages and analytics: anonymous, forged cookie, forged header, learner, active admin, expired/revoked admin, missing role, role-query failure.
- Question-bank API: anonymous, E2E header/cookie, learner, admin, expired/revoked/no-role.
- RLS: cross-user reads/writes, own-user role read, protected question/assessment/progress data, storage policies.
- Registration, password login, Google OAuth callback, session expiry, sign-out.
- Dashboard, academic pages, assessment submission/scoring, AI tutor, course player, projects.
- Razorpay order, signature verification, webhook idempotency, entitlement activation/refund.
- Admin dashboards, public routes, sitemap/robots/SEO metadata.

Required access/configuration: staging deployment URL, test OAuth redirect configuration, disposable test accounts, staging Supabase project read-only metadata access, staging database/RLS test role, sanitized payment sandbox credentials, log-reader access, and rollback/build artifact access. Do not use production credentials.

## 8. Updated production gate

Production remains **HOLD** until: the two high-priority source findings are dispositioned; the security baseline is reviewed and committed; staging evidence is captured; Supabase schema/migration reconciliation is complete; Zod remediation passes isolated tests/build; full regression passes; logs are reviewed; backup/rollback/monitoring are documented; and explicit approval is granted for any commit, branch, dependency change, database action, or deployment.
