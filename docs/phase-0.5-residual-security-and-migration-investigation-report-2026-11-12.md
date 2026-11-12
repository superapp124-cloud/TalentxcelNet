# TalentXcel.net Phase 0.5 Report

Date: 2026-11-12  
Decision: **HOLD pending authorized database forensics and staging validation.** No SQL, migration, deployment, credential change, session invalidation, branch, commit, or push was performed.

## Parent-consent remediation

`lib/auth/parent-consent-service.ts` no longer has a predictable fallback. `getConsentSigningSecret()` requires `PARENT_CONSENT_SECRET` or (compatibility fallback) `CERTIFICATE_SIGNING_SECRET` to be explicitly configured and at least 32 characters. Token creation returns `CONSENT_SIGNING_UNAVAILABLE` without issuing a token when configuration is missing/weak. Verification fails closed, checks HMAC structure/signature, validates token type, and enforces expiry. The prior synthetic token acceptance path was removed.

Tests cover valid issuance/verification, missing and weak configuration, tampering, expiry, incorrect answers, and affirmative-consent enforcement.

## Explicit Supabase configuration

Added `lib/supabase/config.ts`, used by browser, server, and request-proxy clients. It requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, validates the URL, and throws a safe message without values. `next.config.ts` now requires both variables before build/start and no longer embeds fallback URL/key values. The anon/publishable key remains a public client key; no service-role credential was introduced.

Local development continues through `.env.local`; CI/build must inject the two variables through its environment. Missing configuration is intentionally a clear startup/build failure.

## Migration 0005 forensic analysis

The migration creates/replaces `public.handle_new_user()` and drops/recreates the `on_auth_user_created` trigger on `auth.users`. It directly inserts or updates Auth users, identities, profiles, and `public.user_roles`. It contains three email-based administrator identities and promotes matching future signups through the trigger. Later migration `0007_fix_google_auth_and_profiles.sql` also replaces the same trigger/function family, so the final production behavior cannot be inferred from 0005 alone. The current application code no longer elevates by email.

Production application status remains **UNKNOWN**. Local Git history proves the migration exists and was edited, not that it was applied to production.

### Additive remediation design (not executed)

Prepare a new reviewed migration that replaces the trigger function with ordinary profile creation and a default non-privileged role only. Remove all email-based `super_admin` branches. Preserve existing `user_roles` rows, including explicitly approved administrators. Require role changes through a server-controlled function/API that accepts a verified target user UUID, checks the caller's current admin role, rejects client-supplied role elevation, and writes an immutable audit event containing actor, target, old role, new role, reason, and timestamp. Do not edit 0005 or 0007.

## Read-only production investigation SQL

An authorized operator may run these queries in a read-only session. They intentionally exclude password hashes, tokens, and secrets.

```sql
-- 1. Migration ledger
select version, name
from supabase_migrations.schema_migrations
where version in ('0005', '0007')
   or name ilike '%grant%super%admin%'
order by version;

-- 2. Triggers on auth.users
select tg.tgname, pg_get_triggerdef(tg.oid) as trigger_definition
from pg_trigger tg
join pg_class c on c.oid = tg.tgrelid
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'auth' and c.relname = 'users' and not tg.tgisinternal;

-- 3. Relevant function definitions (review text; do not execute)
select n.nspname, p.proname, pg_get_function_identity_arguments(p.oid) as args,
       pg_get_functiondef(p.oid) as definition
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('handle_new_user', 'is_admin_or_above');

-- 4. Email-based promotion indicators in function source
select n.nspname, p.proname, pg_get_functiondef(p.oid) as definition
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and pg_get_functiondef(p.oid) ilike '%super_admin%'
  and (pg_get_functiondef(p.oid) ilike '%email%'
       or pg_get_functiondef(p.oid) ilike '%auth.users%');

-- 5. Current role assignments (no credential material)
select ur.user_id, ur.role, ur.is_active, ur.granted_at, ur.expires_at,
       u.email_confirmed_at is not null as email_confirmed
from public.user_roles ur
left join auth.users u on u.id = ur.user_id
where ur.role in ('super_admin', 'academy_admin')
order by ur.granted_at;

-- 6. Historical identities, metadata only
select id, email, created_at, updated_at, email_confirmed_at is not null as email_confirmed
from auth.users
where lower(email) in ('arsh.wani@gmail.com', 'talentxcelservices@gmail.com', 'admin@talentxcel.net');

-- 7. Active/expired role state for those identities
select u.email, ur.role, ur.is_active, ur.granted_at, ur.expires_at,
       (ur.is_active and (ur.expires_at is null or ur.expires_at > now())) as currently_effective
from auth.users u join public.user_roles ur on ur.user_id = u.id
where lower(u.email) in ('arsh.wani@gmail.com', 'talentxcelservices@gmail.com', 'admin@talentxcel.net');
```

Interpretation: missing ledger row means “not evidenced as applied,” not proof of absence; a trigger/function containing email-to-admin logic means automatic elevation remains active; role rows must be assessed with `is_active` and expiry; identity existence alone does not prove use or compromise.

## Legacy E2E replacement

`tests/journey-verification.mjs` still creates `x-e2e-audit` and `e2e_audit` state. It should be replaced with a staging-only Playwright setup that creates no credentials in source, signs in disposable users through Supabase Auth, assigns roles by verified UUID through controlled staging administration, and runs the same public/admin journeys with independent anonymous and learner contexts. No live test was run because no authorized staging environment was supplied.

## Files changed

- `lib/auth/parent-consent-service.ts`
- `lib/supabase/config.ts` (new)
- `lib/supabase/server.ts`
- `lib/supabase/client.ts`
- `lib/supabase/middleware.ts`
- `next.config.ts`
- `tests/unit/parent-consent.test.ts`
- `docs/phase-0.5-residual-security-and-migration-investigation-report-2026-11-12.md`

No historical migration file was changed.

## Validation

- Focused consent/certificate/auth tests: 14/14 passed.
- Full unit suite after the remediation: 18 files, 178 tests passed.
- `npm run build`: passed with TypeScript and route generation.

## Remaining risks and readiness

- Production migration 0005 status and active trigger/function definitions are unknown until an authorized operator runs the read-only queries.
- Any historical accounts/roles created by 0005 require separate review; no rotation or invalidation was performed.
- The legacy E2E harness is not staging-safe until replaced.
- Staging identity, RLS, payment, OAuth, and end-to-end regression evidence is still required.

Production readiness: **HOLD**. Await explicit human approval before any Git operation, SQL execution, credential/session action, staging validation, or deployment.
