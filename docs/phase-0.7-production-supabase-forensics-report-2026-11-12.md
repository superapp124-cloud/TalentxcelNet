# TalentXcel.net Phase 0.7 Production Supabase Forensics

Date: 2026-11-12  
Result: **Production security state is UNKNOWN with the available access.** Investigation was read-only; no SQL, migration, trigger, policy, credential, session, Git, or deployment operation was performed.

## Evidence availability

The workspace contains only the public Supabase URL/anon configuration. Read-only REST probes against the configured project returned schema-unavailable/404 responses for `supabase_migrations.schema_migrations`, `user_roles`, `audit_events`, `auth.users`, `storage.buckets`, and representative public tables. The available key cannot inspect Auth internals, migration history, PostgreSQL catalogs, function definitions, trigger metadata, grants, or audit events. No privileged metadata connector was available.

These are access limitations, not evidence that the objects do not exist.

## A–E: production findings

| Investigation | Result | Interpretation |
| --- | --- | --- |
| Migration 0005 ledger entry | UNKNOWN | Not exposed through public REST; do not infer from Git. |
| Migration 0007 ledger entry | UNKNOWN | Not exposed through public REST; do not infer from Git. |
| Non-internal triggers on `auth.users` | UNKNOWN | Auth schema/catalog unavailable. |
| Active trigger function definitions | UNKNOWN | PostgreSQL catalog unavailable. |
| Email-based super-admin promotion active | UNKNOWN | Cannot inspect live function bodies. |
| Current privileged `user_roles` rows | UNKNOWN | Table unavailable through public REST/RLS surface. |
| Role activity/expiry and Auth identity linkage | UNKNOWN | Requires privileged read-only query. |
| Role-change/audit events | UNKNOWN | No audit table/log connector available. |
| RLS policies, grants, SECURITY DEFINER/search paths | UNKNOWN | Requires catalog access. |
| Storage buckets/policies | UNKNOWN | Storage metadata unavailable through this access path. |

No incident is declared. No suspicious access or unauthorized role grant can be assessed without logs and metadata.

## Repository-versus-production comparison

| Component | Repository definition | Production definition | Finding |
| --- | --- | --- | --- |
| Migration 0005 | Direct Auth user create/update, hard-coded administrator identities, role insertion, and trigger replacement | UNKNOWN | Must inspect migration ledger and live catalog. |
| Migration 0007 | Replaces the auth-user trigger/function family and contains email-based super-admin branching | UNKNOWN | Must inspect active function body. |
| Auth trigger | `on_auth_user_created` is created/replaced in historical migrations | UNKNOWN | Trigger may be absent, replaced, or still unsafe. |
| Trigger function | `public.handle_new_user()` is defined/redefined by historical migrations | UNKNOWN | Must inspect `pg_get_functiondef`. |
| Role policies | Repository declares self-read/admin policies for `user_roles` | UNKNOWN | Must inspect `pg_policies`, grants, and RLS enablement. |
| Audit mechanism | Repository references audit/event tables in migrations; no live evidence | UNKNOWN | Must inspect actual tables, policies, and write paths. |

## Authorized operator query set

Run in a read-only database session with catalog/Auth visibility. Do not select password hashes, tokens, encrypted secrets, or raw credential metadata.

```sql
select version, name
from supabase_migrations.schema_migrations
where version in ('0005','0007') or name ilike '%super%admin%'
order by version;

select tg.tgname, pg_get_triggerdef(tg.oid), p.proname,
       pg_get_function_identity_arguments(p.oid), pg_get_functiondef(p.oid)
from pg_trigger tg
join pg_class c on c.oid = tg.tgrelid
join pg_namespace n on n.oid = c.relnamespace
join pg_proc p on p.oid = tg.tgfoid
where n.nspname = 'auth' and c.relname = 'users' and not tg.tgisinternal;

select n.nspname, p.proname, pg_get_function_identity_arguments(p.oid),
       p.prosecdef, p.proconfig, pg_get_functiondef(p.oid)
from pg_proc p join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('handle_new_user','is_admin_or_above','get_user_role');

select pol.schemaname, pol.tablename, pol.policyname, pol.permissive,
       pol.roles, pol.cmd, pol.qual, pol.with_check
from pg_policies pol
where pol.tablename in ('user_roles','audit_events','role_change_audit');

select grantee, table_schema, table_name, privilege_type
from information_schema.role_table_grants
where table_name in ('user_roles','audit_events','role_change_audit')
order by table_name, grantee, privilege_type;

select ur.user_id, ur.role, ur.is_active, ur.granted_at, ur.expires_at,
       u.email_confirmed_at is not null as email_confirmed
from public.user_roles ur
left join auth.users u on u.id = ur.user_id
where ur.role in ('super_admin','academy_admin')
order by ur.granted_at;

select id, email, created_at, updated_at,
       email_confirmed_at is not null as email_confirmed
from auth.users
where lower(email) in ('arsh.wani@gmail.com','talentxcelservices@gmail.com','admin@talentxcel.net');
```

Interpretation: absent ledger rows are “not evidenced,” not proof of non-application; a live trigger function containing email-to-role logic confirms an active escalation path; an identity row alone does not prove login or compromise; role effectiveness requires active status and expiry evaluation.

## Proposed corrective design (not executed)

If live evidence confirms email promotion, prepare an additive migration that replaces the trigger with ordinary profile/default-role creation, preserves existing approved role rows, and removes all email-based super-admin branches. Add a fixed-search-path `SECURITY DEFINER` role-change function requiring verified caller UUID, target UUID, requested role, reason, and immutable audit insertion. Academy administrators must be unable to grant/revoke `super_admin`; only the separately authorized super-admin workflow may do so. Validate with RLS, grant, trigger, and rollback checks before any approval.

## Risk classification and recommendation

- **Critical/High:** unresolved possibility that historical email-based promotion remains active in production; status UNKNOWN.
- **High:** unresolved current privileged role assignments and audit history.
- **Medium:** public REST/schema-cache access is insufficient for forensic assurance.

Recommendation: **HOLD production changes and deployment.** Obtain a read-only database operator session or Supabase metadata export, run the queries above, preserve raw evidence securely, compare against repository migrations, and only then approve a corrective migration plan. Do not execute corrective SQL, rotate credentials, invalidate sessions, or declare an incident from current evidence.
