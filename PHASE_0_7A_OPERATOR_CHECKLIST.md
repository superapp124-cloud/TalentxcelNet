# Phase 0.7A Production Supabase Operator Checklist

Read-only session only. Do not paste credentials, hashes, tokens, or raw secret-bearing metadata into the evidence package.

## Collection header

- Production project reference:
- Collection date/time UTC:
- Operator role/team:
- Read-only access method:
- Query tool/version:
- Access errors:

## Checks

| Check | Purpose | Required access | Expected evidence | Interpretation |
|---|---|---|---|---|
| Migration history | Confirm 0005/0007 ledger entries | `supabase_migrations` read | version/name rows | Missing is UNKNOWN unless ledger is authoritative and query succeeded |
| Auth triggers | Inventory non-internal `auth.users` triggers | PostgreSQL catalog + Auth schema | trigger/function OIDs and definitions | Email promotion in live function = escalation risk |
| Trigger functions | Inspect `handle_new_user`, role helpers | `pg_proc` definition read | definition, security mode, config | Do not infer from migration files |
| Privileged roles | List admin/super-admin assignments | `user_roles` + safe Auth identity linkage | user UUID, role, active, grant, expiry | Evaluate `is_active` and expiry; identity existence is not use evidence |
| Auth linkage | Confirm historical identities without credentials | safe `auth.users` columns | id/email/timestamps/confirmation only | Never select password/token columns |
| RLS policies | Confirm deny/allow policy scope | `pg_policies` + table RLS status | policies, `qual`, `with_check` | Missing policy/RLS is a defect candidate |
| Grants | Inspect table/function privileges | `information_schema`/catalog | grantee/privilege only | Unexpected anon/authenticated write is high risk |
| SECURITY DEFINER | Review escalation-capable functions | `pg_proc`, `proconfig` | `prosecdef`, search_path config | Missing fixed search path is a hardening finding |
| Audit history | Look for role grants/promotions | approved audit table/log reader | sanitized event rows | Absence/inaccessibility is not absence of events |
| Audit writes | Check who can insert audit events | policies/grants/triggers | insert policy/grant | Client write access must be constrained or immutable |
| Storage | Confirm buckets/policies | storage catalog/policy read | bucket names/public flags/policies | Do not read object contents or credentials |

For every query, save the query ID/text, sanitized output, row count, timestamp, permission errors, and one of the four evidence statuses in `PHASE_0_7A_EVIDENCE_REGISTER.md`.
