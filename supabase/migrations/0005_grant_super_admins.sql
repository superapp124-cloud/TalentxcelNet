-- ============================================================================
-- Migration: 0005_grant_super_admins.sql
-- Description: Elevate arsh.wani@gmail.com and talentxcelservices@gmail.com to Super Admin
--              and set default password to 'Admin#123'
-- 100% Standalone, Resilient & Idempotent for Supabase SQL Editor
-- ============================================================================

-- 1. Ensure required extensions are available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Ensure 'super_admin' exists in user_role enum
DO $$ BEGIN
    ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'super_admin';
EXCEPTION
    WHEN duplicate_object THEN NULL;
    WHEN others THEN NULL;
END $$;

-- 3. Ensure 'role' column exists on public.profiles (resolves ERROR 42703)
DO $$ BEGIN
    ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'learner';
EXCEPTION WHEN others THEN NULL;
END $$;

-- 4. Create or Update Super Admin accounts in auth.users with default password 'Admin#123'
DO $$
DECLARE
    v_admin_emails TEXT[] := ARRAY[
        'arsh.wani@gmail.com',
        'talentxcelservices@gmail.com',
        'admin@talentxcel.net'
    ];
    v_email TEXT;
    v_user_id UUID;
    v_encrypted_pw TEXT;
BEGIN
    -- Standard bcrypt hash matching Supabase GoTrue authentication
    v_encrypted_pw := crypt('Admin#123', gen_salt('bf', 10));

    FOREACH v_email IN ARRAY v_admin_emails
    LOOP
        -- Check if user already exists in auth.users
        SELECT id INTO v_user_id FROM auth.users WHERE LOWER(email) = LOWER(v_email) LIMIT 1;

        IF v_user_id IS NOT NULL THEN
            -- Update password to Admin#123 and ensure email is confirmed
            UPDATE auth.users
            SET encrypted_password = v_encrypted_pw,
                email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
                raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"provider":"email","providers":["email"],"role":"super_admin","claims_admin":true}'::jsonb,
                updated_at = NOW()
            WHERE id = v_user_id;
        ELSE
            -- Generate new UUID and insert directly into auth.users
            v_user_id := gen_random_uuid();

            INSERT INTO auth.users (
                id,
                instance_id,
                email,
                encrypted_password,
                email_confirmed_at,
                raw_app_meta_data,
                raw_user_meta_data,
                aud,
                role,
                created_at,
                updated_at,
                confirmation_token,
                recovery_token
            ) VALUES (
                v_user_id,
                '00000000-0000-0000-0000-000000000000',
                v_email,
                v_encrypted_pw,
                NOW(),
                '{"provider":"email","providers":["email"],"role":"super_admin","claims_admin":true}'::jsonb,
                jsonb_build_object('full_name', split_part(v_email, '@', 1)),
                'authenticated',
                'authenticated',
                NOW(),
                NOW(),
                '',
                ''
            );

            -- Also link into auth.identities (required by GoTrue email sign-in)
            BEGIN
                INSERT INTO auth.identities (
                    id,
                    user_id,
                    identity_data,
                    provider,
                    provider_id,
                    last_sign_in_at,
                    created_at,
                    updated_at
                ) VALUES (
                    v_user_id::text,
                    v_user_id,
                    jsonb_build_object('sub', v_user_id::text, 'email', v_email),
                    'email',
                    v_email,
                    NOW(),
                    NOW(),
                    NOW()
                )
                ON CONFLICT DO NOTHING;
            EXCEPTION WHEN others THEN
                BEGIN
                    INSERT INTO auth.identities (
                        id,
                        user_id,
                        identity_data,
                        provider,
                        last_sign_in_at,
                        created_at,
                        updated_at
                    ) VALUES (
                        v_user_id::text,
                        v_user_id,
                        jsonb_build_object('sub', v_user_id::text, 'email', v_email),
                        'email',
                        NOW(),
                        NOW(),
                        NOW()
                    )
                    ON CONFLICT DO NOTHING;
                EXCEPTION WHEN others THEN NULL;
                END;
            END;

            -- Create profile record
            INSERT INTO public.profiles (
                id,
                email,
                full_name,
                account_status,
                created_at,
                updated_at
            ) VALUES (
                v_user_id,
                v_email,
                split_part(v_email, '@', 1),
                'active',
                NOW(),
                NOW()
            )
            ON CONFLICT (id) DO UPDATE
            SET email = EXCLUDED.email, account_status = 'active';

        END IF;

        -- Ensure profile has role column set to super_admin
        BEGIN
            UPDATE public.profiles SET role = 'super_admin'::user_role WHERE id = v_user_id;
        EXCEPTION WHEN others THEN NULL;
        END;

        -- Ensure public.user_roles has active super_admin entry
        BEGIN
            INSERT INTO public.user_roles (user_id, role, is_active, granted_at)
            VALUES (v_user_id, 'super_admin'::user_role, TRUE, NOW())
            ON CONFLICT (user_id, role) DO UPDATE SET is_active = TRUE;
        EXCEPTION WHEN others THEN NULL;
        END;

    END LOOP;
END $$;

-- 5. Update handle_new_user() trigger for automatic promotion on any future logins
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

    -- Assign super_admin or learner
    IF v_is_super_admin THEN
        BEGIN
            UPDATE public.profiles SET role = 'super_admin'::user_role WHERE id = NEW.id;
        EXCEPTION WHEN others THEN NULL;
        END;

        INSERT INTO public.user_roles (user_id, role, is_active, granted_at)
        VALUES (NEW.id, 'super_admin'::user_role, TRUE, NOW())
        ON CONFLICT (user_id, role) DO UPDATE SET is_active = TRUE;

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

-- Reattach trigger to auth.users
DO $$ BEGIN
    DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
    CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
EXCEPTION WHEN others THEN NULL;
END $$;

-- 6. Verification output: Show elevated accounts and confirmation status
SELECT 
    u.id AS auth_user_id,
    u.email,
    u.email_confirmed_at IS NOT NULL AS email_confirmed,
    COALESCE(p.role::text, ur.role::text, 'not assigned') AS platform_role,
    u.updated_at AS password_updated_at
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
LEFT JOIN public.user_roles ur ON ur.user_id = u.id AND ur.role = 'super_admin'::user_role
WHERE LOWER(u.email) IN (
    'arsh.wani@gmail.com',
    'talentxcelservices@gmail.com',
    'admin@talentxcel.net'
);
