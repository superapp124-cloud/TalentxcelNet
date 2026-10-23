-- ============================================================================
-- Migration: 0005_grant_super_admins.sql
-- Description: Elevate arsh.wani@gmail.com and talentxcelservices@gmail.com to Super Admin
-- 100% Standalone & Idempotent
-- ============================================================================

-- 1. Ensure user_role enum contains 'super_admin'
DO $$ BEGIN
    ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'super_admin';
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN others THEN NULL;
END $$;

-- 2. Update existing profiles to super_admin role
UPDATE public.profiles
SET role = 'super_admin'::user_role,
    account_status = 'active',
    updated_at = NOW()
WHERE LOWER(email) IN (
    'arsh.wani@gmail.com',
    'talentxcelservices@gmail.com',
    'talentxcelservices@gmail.ocm',
    'admin@talentxcel.net'
);

-- 3. Upsert into public.user_roles for existing user profiles
INSERT INTO public.user_roles (user_id, role, is_active, granted_at)
SELECT id, 'super_admin'::user_role, TRUE, NOW()
FROM public.profiles
WHERE LOWER(email) IN (
    'arsh.wani@gmail.com',
    'talentxcelservices@gmail.com',
    'talentxcelservices@gmail.ocm',
    'admin@talentxcel.net'
)
ON CONFLICT (user_id, role) DO UPDATE
SET is_active = TRUE;

-- 4. Create trigger to automatically promote these accounts to super_admin upon registration or login
CREATE OR REPLACE FUNCTION public.handle_super_admin_elevation()
RETURNS TRIGGER AS $$
BEGIN
    IF LOWER(NEW.email) IN (
        'arsh.wani@gmail.com',
        'talentxcelservices@gmail.com',
        'talentxcelservices@gmail.ocm',
        'admin@talentxcel.net'
    ) THEN
        NEW.role := 'super_admin'::user_role;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_auto_super_admin ON public.profiles;
CREATE TRIGGER trg_auto_super_admin
    BEFORE INSERT OR UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_super_admin_elevation();
