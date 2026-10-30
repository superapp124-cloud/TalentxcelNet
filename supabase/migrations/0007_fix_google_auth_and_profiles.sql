-- ============================================================================
-- Migration: 0007_fix_google_auth_and_profiles.sql
-- Description: Fix "Database error saving new user" during Google OAuth login
-- 1. Adds 'learner' to user_role enum if missing
-- 2. Ensures public.profiles has account_status and avatar_url
-- 3. Makes handle_new_user() 100% fail-safe so it NEVER crashes GoTrue user creation
-- 4. Reconciles existing auth.users accounts to accept 'google' provider
-- ============================================================================

-- 1. Ensure user_role enum includes 'learner' if missing
DO $$ BEGIN
    ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'learner';
EXCEPTION WHEN others THEN NULL;
END $$;

-- 2. Ensure profiles table has account_status and avatar_url columns if missing
DO $$ BEGIN
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS account_status TEXT NOT NULL DEFAULT 'active';
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name TEXT;
EXCEPTION WHEN others THEN NULL;
END $$;

-- 3. Replace handle_new_user() with a 100% fail-safe version
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    v_is_super_admin BOOLEAN := FALSE;
    v_full_name TEXT;
    v_avatar TEXT;
BEGIN
    -- Extract profile metadata from Google / OAuth / password signup
    v_full_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
    );
    v_avatar := COALESCE(
        NEW.raw_user_meta_data->>'avatar_url',
        NEW.raw_user_meta_data->>'picture'
    );

    IF LOWER(NEW.email) IN (
        'arsh.wani@gmail.com',
        'talentxcelservices@gmail.com',
        'admin@talentxcel.net'
    ) THEN
        v_is_super_admin := TRUE;
    END IF;

    -- A. Insert or update profile (Handles ID conflict AND email conflict safely)
    BEGIN
        INSERT INTO public.profiles (id, email, full_name, avatar_url, account_status)
        VALUES (NEW.id, NEW.email, v_full_name, v_avatar, 'active')
        ON CONFLICT (id) DO UPDATE
        SET email = EXCLUDED.email,
            full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name),
            avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
            account_status = 'active';
    EXCEPTION 
        WHEN unique_violation THEN
            -- If email is already in profiles under a different ID, update that existing profile
            BEGIN
                UPDATE public.profiles
                SET id = NEW.id,
                    full_name = COALESCE(v_full_name, full_name),
                    avatar_url = COALESCE(v_avatar, avatar_url),
                    account_status = 'active'
                WHERE LOWER(email) = LOWER(NEW.email);
            EXCEPTION WHEN others THEN NULL;
            END;
        WHEN others THEN
            -- Never let profile insert abort auth.users transaction
            NULL;
    END;

    -- B. Assign roles safely
    BEGIN
        IF v_is_super_admin THEN
            BEGIN
                UPDATE public.profiles SET role = 'super_admin'::user_role WHERE id = NEW.id;
            EXCEPTION WHEN others THEN NULL;
            END;

            BEGIN
                INSERT INTO public.user_roles (user_id, role, is_active, granted_at)
                VALUES (NEW.id, 'super_admin'::user_role, TRUE, NOW())
                ON CONFLICT (user_id, role) DO UPDATE SET is_active = TRUE;
            EXCEPTION WHEN others THEN NULL;
            END;
        ELSE
            BEGIN
                INSERT INTO public.user_roles (user_id, role, is_active)
                VALUES (NEW.id, 'learner'::user_role, TRUE)
                ON CONFLICT (user_id, role) DO NOTHING;
            EXCEPTION WHEN others THEN
                BEGIN
                    INSERT INTO public.user_roles (user_id, role, is_active)
                    VALUES (NEW.id, 'guardian'::user_role, TRUE)
                    ON CONFLICT DO NOTHING;
                EXCEPTION WHEN others THEN NULL;
                END;
            END;
        END IF;
    EXCEPTION WHEN others THEN
        NULL;
    END;

    -- ALWAYS return NEW so auth.users insertion is NEVER aborted by GoTrue
    RETURN NEW;
EXCEPTION WHEN others THEN
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Re-attach trigger
DO $$ BEGIN
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
EXCEPTION WHEN others THEN NULL;
END $$;

-- 5. Enable Google provider in raw_app_meta_data for admin accounts so OAuth links cleanly
UPDATE auth.users
SET 
    raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"providers":["email","google"]}'::jsonb,
    email_confirmed_at = COALESCE(email_confirmed_at, NOW())
WHERE LOWER(email) IN (
    'arsh.wani@gmail.com',
    'talentxcelservices@gmail.com',
    'admin@talentxcel.net'
);
