-- ============================================================================
-- Migration: 0005_grant_super_admins.sql
-- Description: Elevate arsh.wani@gmail.com and talentxcelservices@gmail.com to Super Admin
-- 100% Standalone, Resilient & Idempotent for Supabase SQL Editor
-- ============================================================================

-- 1. Ensure 'super_admin' exists in user_role enum
DO $$ BEGIN
    ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'super_admin';
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN others THEN NULL;
END $$;

-- 2. Ensure 'role' column exists on public.profiles (resolves ERROR 42703)
DO $$ BEGIN
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'learner';
EXCEPTION WHEN others THEN NULL;
END $$;

-- 3. Promote existing accounts in public.profiles
UPDATE public.profiles
SET role = 'super_admin'::user_role,
    account_status = 'active',
    updated_at = NOW()
WHERE LOWER(email) IN (
    'arsh.wani@gmail.com',
    'talentxcelservices@gmail.com',
    'admin@talentxcel.net'
);

-- 4. Upsert into public.user_roles table for existing accounts
INSERT INTO public.user_roles (user_id, role, is_active, granted_at)
SELECT p.id, 'super_admin'::user_role, TRUE, NOW()
FROM public.profiles p
WHERE LOWER(p.email) IN (
    'arsh.wani@gmail.com',
    'talentxcelservices@gmail.com',
    'admin@talentxcel.net'
)
ON CONFLICT (user_id, role) DO UPDATE
SET is_active = TRUE;

-- 5. Elevate Supabase auth.users raw_app_meta_data for instant JWT claims
DO $$ BEGIN
    UPDATE auth.users
    SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role":"super_admin","claims_admin":true}'::jsonb
    WHERE LOWER(email) IN (
        'arsh.wani@gmail.com',
        'talentxcelservices@gmail.com',
        'admin@talentxcel.net'
    );
EXCEPTION WHEN others THEN NULL;
END $$;

-- 6. Update handle_new_user() trigger so any future signups with these emails auto-elevate
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_is_super_admin BOOLEAN := FALSE;
BEGIN
    IF LOWER(NEW.email) IN (
        'arsh.wani@gmail.com',
        'talentxcelservices@gmail.com',
        'admin@talentxcel.net'
    ) THEN
        v_is_super_admin := TRUE;
    END IF;

    -- Create profile
    INSERT INTO public.profiles (id, email, full_name, account_status)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        'active'
    )
    ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        account_status = 'active';

    -- Set role on profile if column exists
    IF v_is_super_admin THEN
        BEGIN
            UPDATE public.profiles SET role = 'super_admin'::user_role WHERE id = NEW.id;
        EXCEPTION WHEN others THEN NULL;
        END;

        INSERT INTO public.user_roles (user_id, role, is_active, granted_at)
        VALUES (NEW.id, 'super_admin'::user_role, TRUE, NOW())
        ON CONFLICT (user_id, role) DO UPDATE SET is_active = TRUE;

        -- Elevate app_metadata
        BEGIN
            UPDATE auth.users
            SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role":"super_admin","claims_admin":true}'::jsonb
            WHERE id = NEW.id;
        EXCEPTION WHEN others THEN NULL;
        END;
    ELSE
        INSERT INTO public.user_roles (user_id, role, is_active)
        VALUES (NEW.id, 'learner'::user_role, TRUE)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Reattach handle_new_user to auth.users if not present
DO $$ BEGIN
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
EXCEPTION WHEN others THEN NULL;
END $$;

-- 7. Verification output: Show current elevation status
SELECT 
    p.id AS profile_id,
    p.email,
    p.full_name,
    COALESCE(ur.role::text, 'learner') AS active_role,
    ur.is_active AS role_active,
    p.updated_at
FROM public.profiles p
LEFT JOIN public.user_roles ur ON ur.user_id = p.id AND ur.role = 'super_admin'::user_role
WHERE LOWER(p.email) IN (
    'arsh.wani@gmail.com',
    'talentxcelservices@gmail.com',
    'admin@talentxcel.net'
);
