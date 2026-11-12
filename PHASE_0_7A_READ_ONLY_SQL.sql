-- Phase 0.7A. READ ONLY. Execute only by an authorized production operator.
-- Never select passwords, password hashes, access/refresh tokens, or secrets.

-- Migration history (ledger schema/table may vary; record permission/schema errors).
select version, name from supabase_migrations.schema_migrations
where version in ('0005','0007') or name ilike '%super%admin%' order by version;

-- Non-internal triggers and their functions on auth.users.
select tg.tgname, pg_get_triggerdef(tg.oid) as trigger_definition,
       n.nspname as function_schema, p.proname,
       pg_get_function_identity_arguments(p.oid) as arguments
from pg_trigger tg join pg_class c on c.oid=tg.tgrelid
join pg_namespace tn on tn.oid=c.relnamespace
join pg_proc p on p.oid=tg.tgfoid join pg_namespace n on n.oid=p.pronamespace
where tn.nspname='auth' and c.relname='users' and not tg.tgisinternal;

-- Definitions/configuration for relevant functions. Review only; do not execute returned text.
select n.nspname, p.proname, pg_get_function_identity_arguments(p.oid) as arguments,
       p.prosecdef, p.proconfig, pg_get_functiondef(p.oid) as definition
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in ('handle_new_user','get_user_role','is_admin_or_above');

-- Privileged role inventory and safe Auth linkage.
select ur.user_id, ur.role, ur.is_active, ur.granted_at, ur.expires_at,
       u.email_confirmed_at is not null as email_confirmed
from public.user_roles ur left join auth.users u on u.id=ur.user_id
where ur.role in ('academy_admin','super_admin') order by ur.granted_at;

-- Historical identity existence only; no credential columns.
select id, email, created_at, updated_at,
       email_confirmed_at is not null as email_confirmed
from auth.users where lower(email) in
('arsh.wani@gmail.com','talentxcelservices@gmail.com','admin@talentxcel.net');

-- RLS policy and grant review.
select schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
from pg_policies where tablename in ('user_roles','audit_events','role_change_audit');
select grantee, table_schema, table_name, privilege_type
from information_schema.role_table_grants
where table_name in ('user_roles','audit_events','role_change_audit')
order by table_name,grantee,privilege_type;

-- Audit history (adapt event table only if the operator confirms its schema).
select id, user_id, action, resource_type, resource_id, created_at
from public.audit_events
where action ilike '%role%' or action ilike '%admin%'
order by created_at desc limit 500;

-- Storage metadata only.
select id, name, public, file_size_limit, allowed_mime_types from storage.buckets order by name;
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies where schemaname='storage';
