# TalentXcel.net Phase 0.6 Security Consolidation Report

Date: 2026-11-12  
Recommendation: **HOLD** pending authorized production database evidence and staging validation. No Git write, SQL, migration, deployment, credential change, or session invalidation was performed.

## Consolidated findings

### Critical

- None newly introduced in the inspected application paths.

### High

- Historical `supabase/migrations/0005_grant_super_admins.sql` contains hard-coded administrator provisioning, direct Auth-user mutation/insertion, and email-based automatic `super_admin` promotion. It remains untouched by design. Whether it was applied in production is unknown.
- `supabase/migrations/0007_fix_google_auth_and_profiles.sql` also contains email-based super-admin promotion logic and replaces the same trigger/function family. Production metadata review is required.

### Medium

- Existing role-management architecture is database-function/migration driven; no application role-grant API was found in the inspected `app`/`lib` paths. A reviewed server-controlled role-management workflow with UUID identity, reason, audit event, and super-admin-only elevation remains to be designed and migrated.
- `tests/journey-verification.mjs` previously used a bypass; it now requires staging learner credentials from environment variables and signs in through the real login form. Live staging validation has not been run.
- `lib/auth/parent-consent-service.ts` uses an in-memory challenge ledger; multi-instance production deployment should use a durable, protected challenge store before treating it as a complete consent system.

### Low

- Public Supabase anon/publishable keys are intentionally client-visible and are not service-role secrets. They are now required explicitly through environment configuration rather than embedded fallbacks.
- Full tests emit existing non-fatal diagnostics for Next request cookies outside request scope and intentionally corrupted local-storage JSON.

## Parent-consent secret separation

`PARENT_CONSENT_SECRET` is now the only accepted consent-signing secret. The certificate signing secret cannot satisfy consent configuration. Missing or weak consent configuration fails closed; valid consent creation, HMAC verification, expiry, and tampering checks remain intact. Tests explicitly prove certificate-only configuration is rejected.

## Role-management review/design

No client route was found that assigns roles directly. The historical database trigger is unsafe because it promotes by email. The required design is:

1. Verify caller with Supabase Auth and load active roles by caller UUID server-side.
2. Permit academy administrators to manage ordinary operational roles only; never permit them to grant/revoke `super_admin`.
3. Restrict `super_admin` changes to a separately authorized super-admin workflow.
4. Require target UUID, requested role, reason, and explicit action; reject email-only targets and client claims.
5. Enforce the same rules in a `SECURITY DEFINER` database function with a fixed `search_path`, RLS/grants, and immutable audit insertion.
6. Test anonymous, learner, academy-admin-to-super-admin, super-admin, missing-target, expired-role, revoked-role, forged-UUID, missing-reason, and audit-failure cases.

No database change was executed.

## E2E modernization

The legacy harness no longer sends `x-e2e-audit` or `e2e_audit`. It requires `STAGING_LEARNER_EMAIL` and `STAGING_LEARNER_PASSWORD` at runtime and uses the real login form. Credentials are not embedded. A complete staging suite should create separate anonymous, learner, academy-admin, and super-admin contexts from disposable identities provisioned by verified UUID, then run authorization and product journeys. It was not run without authorized staging configuration.

## Repository scan

- No service-role key was found in application/browser code.
- No remaining application admin-cookie/header bypass was found; the question-bank header appears only in a negative regression test.
- Historical hard-coded password material remains only in untouched migration history and must not be rerun.
- Development consent/certificate secret fallbacks are removed from active source paths.
- Razorpay webhook verification remains signature-based and fails closed when a configured secret is present; production configuration must be verified separately.

## Files changed in Phase 0.6

- `lib/auth/parent-consent-service.ts`
- `lib/supabase/config.ts` (new)
- `lib/supabase/server.ts`
- `lib/supabase/client.ts`
- `lib/supabase/middleware.ts`
- `next.config.ts`
- `tests/unit/parent-consent.test.ts`
- `tests/unit/parent-observation.test.ts`
- `tests/journey-verification.mjs`
- This report

Historical migration files remain untouched.

## Validation

- Focused consent/observation/certificate tests: 14/14 passed.
- Full unit suite: 18 files, 180 tests passed.
- Production build and TypeScript: passed after explicit Supabase configuration changes.
- E2E live execution: not run; no authorized staging configuration was available.

## Baseline and remaining evidence

The security baseline must include all Phase 0–0.6 implementation/tests/reports while excluding unrelated screenshots, historical migration edits, environment files, and any credential-bearing artifacts. Human review should use `git status --short`, `git diff HEAD`, `git diff --check`, and an explicit `git add <reviewed-files>` list. No staging/commit/push was performed.

Outstanding production evidence: migration ledger status, active `auth.users` triggers/functions, current privileged role rows, role expiry/revocation state, and audit records. Production readiness remains **HOLD** until those read-only checks and authorized staging validation are complete.
