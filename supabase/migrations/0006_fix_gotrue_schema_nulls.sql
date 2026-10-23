-- ============================================================================
-- Migration: 0006_fix_gotrue_schema_nulls.sql
-- Description: Fix "Database error querying schema" in Supabase GoTrue
-- Replaces NULL token strings with '' in auth.users so GoTrue scanner succeeds
-- ============================================================================

-- 1. Fix NULL token strings in auth.users that crash GoTrue scanner
UPDATE auth.users
SET 
    confirmation_token = COALESCE(confirmation_token, ''),
    recovery_token = COALESCE(recovery_token, ''),
    email_change_token_new = COALESCE(email_change_token_new, ''),
    email_change_token_current = COALESCE(email_change_token_current, ''),
    email_change = COALESCE(email_change, ''),
    phone_change = COALESCE(phone_change, ''),
    phone_change_token = COALESCE(phone_change_token, ''),
    reauthentication_token = COALESCE(reauthentication_token, '')
WHERE 
    confirmation_token IS NULL 
    OR recovery_token IS NULL 
    OR email_change_token_new IS NULL 
    OR email_change_token_current IS NULL 
    OR email_change IS NULL 
    OR phone_change IS NULL 
    OR phone_change_token IS NULL 
    OR reauthentication_token IS NULL;

-- 2. Verify all 3 accounts have valid empty token strings
SELECT 
    id, 
    email, 
    email_confirmed_at IS NOT NULL AS email_confirmed,
    LENGTH(confirmation_token) AS conf_tok_len,
    LENGTH(recovery_token) AS rec_tok_len,
    LENGTH(reauthentication_token) AS reauth_tok_len
FROM auth.users
WHERE LOWER(email) IN (
    'arsh.wani@gmail.com',
    'talentxcelservices@gmail.com',
    'admin@talentxcel.net'
);
