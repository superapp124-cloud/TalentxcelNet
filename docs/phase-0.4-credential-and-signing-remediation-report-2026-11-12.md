# TalentXcel.net Phase 0.4 Remediation Report

Date: 2026-11-12  
Scope: historical migration forensics, certificate signing fail-closed remediation, configuration review, and local regression validation. No migration, credential rotation, session invalidation, deployment, or Git operation was performed.

## 1. Migration 0005 forensic findings

`supabase/migrations/0005_grant_super_admins.sql` provisions three hard-coded administrator email identities: `arsh.wani@gmail.com`, `talentxcelservices@gmail.com`, and `admin@talentxcel.net`.

The migration derives one embedded default password hash, then for each address:

- Updates an existing `auth.users` row's password hash, confirmation state, app metadata, and timestamp; or
- Inserts a new row directly into `auth.users` and a corresponding `auth.identities` row;
- Creates/updates `public.profiles`;
- Creates/activates a `public.user_roles` `super_admin` row;
- Replaces `handle_new_user()` and attaches an `auth.users` insert trigger that promotes matching email addresses automatically.

This is not safe privilege provisioning. Re-running it is idempotent at the row level but can reset existing administrator passwords and re-enable roles; it is therefore unsafe to rerun. The trigger also creates automatic privilege elevation for future matching email signups.

Repository history shows the migration was introduced and later amended in commits `dcb6bbe`, `b749d80`, and `b2318c7`. Local files and Git history do not prove whether it was applied to production. Production application status is **unknown** because no privileged migration ledger or database metadata was available. No SQL was executed.

Safe remediation design: do not rewrite this historical migration; do not run it again; provision administrators only through controlled Supabase Auth processes, then assign a role to the verified user ID through an approved administrative workflow with audit logging and no email-based auto-promotion. Whether any existing accounts/roles must be rotated or revoked requires separate human approval.

## 2. Certificate signing change

`app/api/skills/backpack/evaluate/route.ts` now exports `getCertificateSigningSecret()`, which accepts only an explicitly configured `CERTIFICATE_SIGNING_SECRET` of at least 32 characters. There is no development fallback. `POST` returns the generic `CERTIFICATE_SIGNING_UNAVAILABLE` response with HTTP 503 before evaluation, registration, or signing when configuration is absent/weak. No secret is logged or returned.

Added tests cover missing secret, weak secret, valid configured secret, and no issuance on configuration failure. Existing certificate functionality remains available when correctly configured.

Other signing-related finding: `lib/auth/parent-consent-service.ts:9` still has a predictable consent-secret fallback. It is not the certificate HMAC path, but it should be remediated in a separately reviewed follow-up using the same fail-closed pattern. The existing synthetic token test behavior was not changed in this phase.

## 3. Supabase key configuration

The inspected files contain an embedded publishable/anon-key fallback in `next.config.ts:58`, `lib/supabase/server.ts:8`, `lib/supabase/middleware.ts:9`, and `lib/supabase/client.ts:6`. This is not equivalent to a service-role key and is not itself a privileged credential. No service-role key was found in tracked or untracked artifacts.

No configuration change was made in this phase because removing fallbacks requires an explicit local-development configuration decision. Recommended follow-up: require `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` at startup/build, provide them through local `.env.local`/CI secrets, and fail clearly without printing values.

## 4. Legacy E2E harness

`tests/journey-verification.mjs:25-34` creates a context with `x-e2e-audit: 1` and an `e2e_audit=1` cookie. These are former bypass references and must not be used for staging sign-off. The replacement is a staging-only Playwright setup that authenticates disposable Supabase users through the real login/OAuth flow, assigns roles by verified user ID through controlled staging administration, and records test identities without storing credentials in source. No live staging test was run because no authorized staging environment was supplied.

## 5. Files changed

- `app/api/skills/backpack/evaluate/route.ts` — removed signing fallback and added fail-closed configuration validation.
- `tests/unit/certificate-signing-config.test.ts` — new signing configuration and no-issuance tests.
- `tests/unit/backpack-evaluate-api.test.ts` — supplies a test-only configured secret so existing certificate tests model production configuration explicitly.
- This report.

No migration, dependency, database, environment, DNS, or deployment file was changed.

## 6. Tests and build

- Focused certificate/consent/permissions tests: 18/18 passed.
- Full unit suite: 18 files, 178 tests passed.
- Production build: `npm run build` passed, including TypeScript and route generation.
- The full suite emits existing non-fatal test diagnostics about Next cookies outside request scope and corrupted local-storage JSON; no test failed from those diagnostics.

## 7. Remaining risks and required approvals

- Production application of migration 0005 is unknown and requires privileged, read-only migration-ledger/Auth/role inspection.
- Any existing accounts created or modified by 0005 may require separately approved credential rotation/session invalidation.
- Parent-consent signing fallback remains and should be remediated before relying on that token for production consent.
- Explicit Supabase environment configuration should replace silent anon-key fallbacks after local/CI provisioning is agreed.
- The legacy E2E harness must be replaced before staging validation.

No credential rotation, session invalidation, migration execution, staging deployment, production deployment, or Git write was performed. Further action requires human approval.
