-- ============================================================================
-- Migration: 0008_universal_gamified_learning_engine.sql
-- Description: Universal Gamified Learning Engine for Classes 4–12
-- Covers:
--  1. game_themes (Visual environments, palettes, particle effects)
--  2. subject_game_configs (8 core subjects + extensible schema)
--  3. chapter_game_configs (Every chapter a different game world)
--  4. game_missions & game_levels (Mission objectives & progression)
--  5. game_sessions & game_session_questions (Live gameplay telemetry)
--  6. learner_game_profiles (XP, Gems, Hearts, Streaks, Levels)
--  7. learner_xp_transactions & learner_achievements (Gamification rewards)
--  8. learner_streaks, learner_topic_mastery & learner_powerups (Inventory & mastery)
--  9. Secure RPCs for answer validation, XP calculation, power-up consumption
-- 10. Complete Row Level Security (RLS) policies
-- ============================================================================

-- 1. Game Themes Table
CREATE TABLE IF NOT EXISTS public.game_themes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    primary_color TEXT NOT NULL,
    secondary_color TEXT NOT NULL,
    accent_color TEXT NOT NULL,
    background_gradient TEXT NOT NULL,
    environment_style TEXT NOT NULL, -- 'kingdom', 'laboratory', 'magical_library', 'floating_island', 'cyberpunk', 'cosmic_nebula', 'discovery_map', 'parchment_scroll'
    sound_theme TEXT NOT NULL DEFAULT 'standard',
    particle_effect TEXT NOT NULL DEFAULT 'sparkles',
    avatar_model TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Subject Game Configs
CREATE TABLE IF NOT EXISTS public.subject_game_configs (
    id TEXT PRIMARY KEY,
    subject_code TEXT NOT NULL UNIQUE,
    display_title TEXT NOT NULL,
    game_world_name TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    default_theme_id TEXT REFERENCES public.game_themes(id) ON DELETE SET NULL,
    accent_gradient TEXT NOT NULL,
    avatar_name TEXT NOT NULL,
    sound_fx_pack TEXT NOT NULL DEFAULT 'arcade_pro',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Chapter Game Configs (Every Chapter a Unique Game Experience)
CREATE TABLE IF NOT EXISTS public.chapter_game_configs (
    id TEXT PRIMARY KEY,
    subject_id TEXT NOT NULL REFERENCES public.subject_game_configs(id) ON DELETE CASCADE,
    chapter_slug TEXT NOT NULL,
    chapter_title TEXT NOT NULL,
    class_number INTEGER NOT NULL CHECK (class_number BETWEEN 4 AND 12),
    game_title TEXT NOT NULL,
    storyline_intro TEXT NOT NULL,
    theme_id TEXT REFERENCES public.game_themes(id) ON DELETE SET NULL,
    environment_type TEXT NOT NULL,
    interactive_gadget TEXT NOT NULL, -- 'stepping_path', 'cell_organelle_explorer', 'spell_book', 'map_pin_explorer', 'code_runner_terminal', 'cube_rotation_bench', 'monument_viewer', 'parchment_scroll'
    boss_challenge_name TEXT,
    boss_avatar TEXT,
    target_xp INTEGER NOT NULL DEFAULT 500,
    required_level INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (subject_id, chapter_slug, class_number)
);

-- 4. Game Missions
CREATE TABLE IF NOT EXISTS public.game_missions (
    id TEXT PRIMARY KEY,
    chapter_config_id TEXT NOT NULL REFERENCES public.chapter_game_configs(id) ON DELETE CASCADE,
    mission_number INTEGER NOT NULL DEFAULT 1,
    mission_title TEXT NOT NULL,
    description TEXT,
    required_accuracy_pct INTEGER NOT NULL DEFAULT 60,
    total_challenges INTEGER NOT NULL DEFAULT 5,
    reward_xp INTEGER NOT NULL DEFAULT 100,
    reward_gems INTEGER NOT NULL DEFAULT 10,
    is_boss_mission BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Game Levels (Global Master Progression)
CREATE TABLE IF NOT EXISTS public.game_levels (
    level_number INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    badge_name TEXT NOT NULL,
    min_xp_required INTEGER NOT NULL,
    unlocked_perk TEXT,
    icon_svg TEXT
);

-- 6. Learner Game Profiles (XP, Gems, Lives/Hearts, Streaks)
CREATE TABLE IF NOT EXISTS public.learner_game_profiles (
    user_id UUID PRIMARY KEY,
    display_name TEXT NOT NULL DEFAULT 'Learner',
    avatar_id TEXT NOT NULL DEFAULT 'avatar_default',
    total_xp INTEGER NOT NULL DEFAULT 0,
    current_level INTEGER NOT NULL DEFAULT 1,
    gems_balance INTEGER NOT NULL DEFAULT 50,
    hearts_remaining INTEGER NOT NULL DEFAULT 4,
    max_hearts INTEGER NOT NULL DEFAULT 4,
    last_heart_recharge_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    active_streak_days INTEGER NOT NULL DEFAULT 0,
    longest_streak_days INTEGER NOT NULL DEFAULT 0,
    last_activity_date DATE DEFAULT CURRENT_DATE,
    sound_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    haptics_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Learner Power-ups Inventory
CREATE TABLE IF NOT EXISTS public.learner_powerups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    powerup_type TEXT NOT NULL CHECK (powerup_type IN ('hint', 'fifty_fifty', 'skip', 'second_chance', 'double_xp')),
    quantity INTEGER NOT NULL DEFAULT 3,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, powerup_type)
);

-- 8. Game Sessions (Live gameplay instance)
CREATE TABLE IF NOT EXISTS public.game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    chapter_config_id TEXT NOT NULL REFERENCES public.chapter_game_configs(id) ON DELETE CASCADE,
    mission_id TEXT REFERENCES public.game_missions(id) ON DELETE SET NULL,
    status TEXT NOT NULL CHECK (status IN ('in_progress', 'completed', 'failed', 'abandoned')) DEFAULT 'in_progress',
    score INTEGER NOT NULL DEFAULT 0,
    earned_xp INTEGER NOT NULL DEFAULT 0,
    earned_gems INTEGER NOT NULL DEFAULT 0,
    hearts_left INTEGER NOT NULL DEFAULT 4,
    questions_attempted INTEGER NOT NULL DEFAULT 0,
    correct_count INTEGER NOT NULL DEFAULT 0,
    accuracy_percentage NUMERIC(5,2) DEFAULT 0,
    combo_max_streak INTEGER NOT NULL DEFAULT 0,
    current_streak INTEGER NOT NULL DEFAULT 0,
    powerups_used JSONB NOT NULL DEFAULT '{"hint": 0, "fifty_fifty": 0, "skip": 0}'::jsonb,
    time_spent_seconds INTEGER NOT NULL DEFAULT 0,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- 9. Game Session Questions (Telemetry per challenge)
CREATE TABLE IF NOT EXISTS public.game_session_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES public.game_sessions(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    question_order INTEGER NOT NULL,
    question_type TEXT NOT NULL DEFAULT 'mcq',
    selected_option_id TEXT,
    is_correct BOOLEAN,
    xp_awarded INTEGER NOT NULL DEFAULT 0,
    response_time_ms INTEGER NOT NULL DEFAULT 0,
    powerup_used TEXT,
    answered_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Learner XP Transactions (Audit log)
CREATE TABLE IF NOT EXISTS public.learner_xp_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    session_id UUID REFERENCES public.game_sessions(id) ON DELETE SET NULL,
    amount INTEGER NOT NULL,
    reason TEXT NOT NULL, -- 'correct_answer', 'speed_bonus', 'combo_streak', 'chapter_complete', 'daily_quest'
    multiplier NUMERIC(3,1) NOT NULL DEFAULT 1.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Learner Achievements (Trophies & Badges)
CREATE TABLE IF NOT EXISTS public.learner_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    achievement_key TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    badge_icon TEXT NOT NULL,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, achievement_key)
);

-- 12. Learner Topic Mastery
CREATE TABLE IF NOT EXISTS public.learner_topic_mastery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    subject_code TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    topic_title TEXT NOT NULL,
    mastery_percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
    attempts_count INTEGER NOT NULL DEFAULT 0,
    correct_count INTEGER NOT NULL DEFAULT 0,
    last_practiced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, subject_code, topic_id)
);

-- ============================================================================
-- SEED DATA: 8 CORE SUBJECT GAME WORLDS & CHAPTER THEMES
-- ============================================================================

-- Themes
INSERT INTO public.game_themes (id, name, description, primary_color, secondary_color, accent_color, background_gradient, environment_style, sound_theme, particle_effect, avatar_model)
VALUES 
('theme_math_kingdom', 'Integer Kingdom', 'Rolling hills, ancient towers, and floating numerical relics.', '#3B82F6', '#8B5CF6', '#60A5FA', 'linear-gradient(180deg, #1E1B4B 0%, #172554 45%, #0F172A 100%)', 'kingdom', 'synth_chime', 'sparkles', 'avatar_adventurer_boy'),
('theme_science_lab', 'Bio & Physics Lab', 'Bioluminescent plant cell chamber with glowing chemical beakers.', '#10B981', '#06B6D4', '#34D399', 'linear-gradient(180deg, #022C22 0%, #064E3B 40%, #0F172A 100%)', 'laboratory', 'bubble_pop', 'bubbles', 'avatar_science_bot'),
('theme_english_library', 'Enchanted Library', 'Floating enchanted book with quill, warm reading lanterns and mahogany archives.', '#F59E0B', '#7C3AED', '#FBBF24', 'linear-gradient(180deg, #451A03 0%, #2E1065 50%, #0F172A 100%)', 'magical_library', 'quill_scratch', 'stardust', 'avatar_scholar_owl'),
('theme_social_explorer', 'Terra Explorer', 'Floating sky islands, mountain peaks, geological landforms, and world maps.', '#059669', '#0284C7', '#F59E0B', 'linear-gradient(180deg, #064E3B 0%, #075985 45%, #0F172A 100%)', 'floating_island', 'tribal_percussion', 'wind_trails', 'avatar_globe_explorer'),
('theme_coding_matrix', 'Neon Cyber Matrix', 'Cyberpunk neon terminal with circuitry and friendly AI companion robot.', '#06B6D4', '#8B5CF6', '#22D3EE', 'linear-gradient(180deg, #020617 0%, #0F172A 40%, #1E1B4B 100%)', 'cyberpunk', 'retro_8bit', 'digital_rain', 'avatar_tx_robot'),
('theme_reasoning_cosmos', 'Cosmic Logic Arena', 'Cosmic nebula with floating 3D spatial cubes and pattern puzzles.', '#6366F1', '#EC4899', '#818CF8', 'linear-gradient(180deg, #180536 0%, #311042 50%, #0F172A 100%)', 'cosmic_nebula', 'crystal_ping', 'cosmic_pulse', 'avatar_logic_orb'),
('theme_gk_discovery', 'World Wonders', 'Expedition travel map with postcard landmarks and ancient treasures.', '#EAB308', '#0284C7', '#FDE047', 'linear-gradient(180deg, #1E3A8A 0%, #164E63 45%, #0F172A 100%)', 'discovery_map', 'compass_tick', 'gold_coins', 'avatar_voyager'),
('theme_hindi_scroll', 'Pracheen Sahitya', 'Traditional Indian cultural artwork, flowering tree branch, sparrow and golden scroll.', '#EA580C', '#B91C1C', '#F59E0B', 'linear-gradient(180deg, #450A0A 0%, #7C2D12 40%, #0F172A 100%)', 'parchment_scroll', 'sitar_strum', 'flower_petals', 'avatar_sparrow')
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    primary_color = EXCLUDED.primary_color,
    background_gradient = EXCLUDED.background_gradient,
    environment_style = EXCLUDED.environment_style;

-- 8 Core Subject Game Configs
INSERT INTO public.subject_game_configs (id, subject_code, display_title, game_world_name, icon_name, default_theme_id, accent_gradient, avatar_name)
VALUES 
('subj_math', 'math', 'Mathematics', 'Math Quest', 'Calculator', 'theme_math_kingdom', 'from-blue-600 via-indigo-600 to-purple-600', 'Adventurer Leo'),
('subj_science', 'science', 'Science', 'Science Lab', 'FlaskConical', 'theme_science_lab', 'from-emerald-600 via-teal-600 to-cyan-600', 'Professor Flora'),
('subj_english', 'english', 'English', 'Word Arena', 'BookOpen', 'theme_english_library', 'from-amber-600 via-orange-600 to-purple-700', 'Lexicon Owl'),
('subj_social', 'social_studies', 'Social Studies', 'World Explorer', 'Compass', 'theme_social_explorer', 'from-emerald-700 via-teal-700 to-sky-700', 'Captain Atlas'),
('subj_coding', 'coding', 'Coding', 'Code Builder', 'Code2', 'theme_coding_matrix', 'from-cyan-600 via-blue-600 to-violet-600', 'TX-700 Companion Bot'),
('subj_reasoning', 'reasoning', 'Reasoning', 'Logic Arena', 'Puzzle', 'theme_reasoning_cosmos', 'from-indigo-600 via-purple-600 to-pink-600', 'Nexus Matrix'),
('subj_gk', 'general_knowledge', 'General Knowledge', 'Discovery World', 'Award', 'theme_gk_discovery', 'from-yellow-500 via-amber-600 to-blue-700', 'Marco Polo'),
('subj_hindi', 'hindi', 'Hindi', 'भाषा एवं साहित्य', 'Sparkles', 'theme_hindi_scroll', 'from-orange-600 via-amber-600 to-red-800', 'Neelkanth Bird')
ON CONFLICT (id) DO UPDATE SET 
    display_title = EXCLUDED.display_title,
    game_world_name = EXCLUDED.game_world_name;

-- Chapter Game Configs (Every Chapter a Unique Game World)
INSERT INTO public.chapter_game_configs (id, subject_id, chapter_slug, chapter_title, class_number, game_title, storyline_intro, theme_id, environment_type, interactive_gadget, boss_challenge_name)
VALUES
-- Mathematics Chapters
('c_math_integers_10', 'subj_math', 'integers', 'Integers & Number Theory', 10, 'Integer Kingdom: Castle of Negative Numbers', 'Cross the floating stone path by solving integer challenges before the drawbridge closes.', 'theme_math_kingdom', 'kingdom', 'stepping_path', 'Arch-Mage Negatus'),
('c_math_fractions_10', 'subj_math', 'fractions', 'Fractions & Rationals', 10, 'Fraction Factory: Gear Balancing', 'Align planetary gears to balance rational proportions in the steam-powered factory.', 'theme_math_kingdom', 'kingdom', 'balance_scale', 'Gearmaster Chronos'),
('c_math_geometry_10', 'subj_math', 'geometry', 'Coordinate Geometry & Triangles', 10, 'Shape Quest: The Euclidean Labyrinth', 'Unlock hidden chambers by calculating lengths, areas and section coordinates.', 'theme_math_kingdom', 'kingdom', 'coordinate_grid', 'Pythagoras Guardian'),
('c_math_algebra_10', 'subj_math', 'algebra', 'Polynomials & Quadratic Equations', 10, 'Equation Escape: Chamber of Unknowns', 'Solve root derivations to neutralize laser tripwires in the ancient pyramid.', 'theme_math_kingdom', 'kingdom', 'algebra_lock', 'The Quad-Sphinx'),

-- Science Chapters
('c_sci_plant_cell_10', 'subj_science', 'plant-cell', 'Cell Structure & Plant Tissues', 10, 'Cell Explorer: Inner Membrane Mystery', 'Zoom into the cytoplasm to identify chloroplasts, mitochondria, and cell walls.', 'theme_science_lab', 'laboratory', 'cell_organelle_explorer', 'Master Chloroplastid'),
('c_sci_light_10', 'subj_science', 'light', 'Light: Reflection & Refraction', 10, 'Optical Lab: Prism Ray Gauntlet', 'Manipulate lenses and mirrors to guide photon beams through the refraction prism.', 'theme_science_lab', 'laboratory', 'optical_bench', 'Lord Chromatic'),
('c_sci_force_10', 'subj_science', 'force-motion', 'Force & Laws of Motion', 10, 'Physics Arena: Gravitational Accelerator', 'Calculate momentum and impulse to launch hover-probes safely into orbit.', 'theme_science_lab', 'laboratory', 'force_vector_dial', 'Newtonian Sentinel'),

-- English Chapters
('c_eng_tenses_10', 'subj_english', 'tenses', 'Verb Tenses & Conditionals', 10, 'Time Traveller: Chrono Archive', 'Fix ruptured timelines by restoring past, present and future perfect verb structures.', 'theme_english_library', 'magical_library', 'spell_book', 'Chronos the Grammarian'),
('c_eng_vocab_10', 'subj_english', 'vocabulary', 'Etymology & Synonyms', 10, 'Word Kingdom: Lexical Vault', 'Collect ancient linguistic glyphs to decipher rare words and rhetorical figures.', 'theme_english_library', 'magical_library', 'spell_book', 'The Lexicon Sphinx'),

-- Social Studies Chapters
('c_sst_landforms_10', 'subj_social', 'landforms', 'Physical Features & Landforms', 10, 'Geography Expedition: Cloud Peaks', 'Survey floating mountain peaks, plateaus, and valleys using topographical pins.', 'theme_social_explorer', 'floating_island', 'map_pin_explorer', 'Atlas Guardian'),
('c_sst_constitution_10', 'subj_social', 'constitution', 'Democratic Rights & Constitution', 10, 'Democracy Mission: Pillar of Rights', 'Restore constitutional articles and preamble values in the Parliament rotunda.', 'theme_social_explorer', 'floating_island', 'charter_scroll', 'Speaker of Assemblies'),

-- Coding Chapters
('c_code_python_10', 'subj_coding', 'python-basics', 'Python Variables & Expressions', 10, 'Code Quest: Terminal Genesis', 'Program your TX robot companion to compute variables and navigate through cyber gates.', 'theme_coding_matrix', 'cyberpunk', 'code_runner_terminal', 'Syntax Cyber-Demon'),
('c_code_loops_10', 'subj_coding', 'loops-arrays', 'Loops, Conditions & Lists', 10, 'Loop Lab: Infinite Recursion', 'Optimise while and for loops to prevent memory overflow in the orbital mainframe.', 'theme_coding_matrix', 'cyberpunk', 'code_runner_terminal', 'Daemon 404'),

-- Reasoning Chapters
('c_rsn_pattern_10', 'subj_reasoning', 'pattern-series', '3D Spatial & Pattern Series', 10, 'Logic Arena: Cosmic Cube Matrix', 'Analyze 3D rotations, isometric projections and fold nets to unlock the gateway.', 'theme_reasoning_cosmos', 'cosmic_nebula', 'cube_rotation_bench', 'Tesseract Construct'),

-- General Knowledge Chapters
('c_gk_wonders_10', 'subj_general_knowledge', 'world-wonders', 'World Monuments & Heritage', 10, 'World Wonders: Global Expedition', 'Identify historic world monuments and archeological wonders on the world globe.', 'theme_gk_discovery', 'discovery_map', 'monument_viewer', 'Grand Cartographer'),

-- Hindi Chapters
('c_hin_idioms_10', 'subj_hindi', 'muhavare', 'मुहावरे एवं लोकोक्तियाँ', 10, 'प्राचीन विद्या: मुहावरे दर्पण', 'सुरीली चिड़िया के साथ प्राचीन ताम्रपत्र और भोजपत्र पर मुहावरों के रहस्य सुलझाएं।', 'theme_hindi_scroll', 'parchment_scroll', 'parchment_scroll', 'कविराज विक्रमादित्य')
ON CONFLICT (id) DO UPDATE SET 
    game_title = EXCLUDED.game_title,
    storyline_intro = EXCLUDED.storyline_intro,
    interactive_gadget = EXCLUDED.interactive_gadget;

-- Progression Levels (1 to 5)
INSERT INTO public.game_levels (level_number, title, badge_name, min_xp_required, unlocked_perk)
VALUES 
(1, 'Number Explorer', 'Bronze Crest', 0, 'Standard Hints & 50:50 unlocked'),
(2, 'Integer Warrior', 'Silver Crest', 250, 'Second Chance Power-up unlocked'),
(3, 'Fraction Master', 'Gold Crest', 600, 'Streak Multiplier 1.5x active'),
(4, 'Algebra Champion', 'Diamond Crest', 1200, 'Double XP Boost unlocked'),
(5, 'Academic Legend', 'Mastery Crown', 2500, 'All Boss Gauntlets unlocked')
ON CONFLICT (level_number) DO UPDATE SET 
    title = EXCLUDED.title,
    min_xp_required = EXCLUDED.min_xp_required;

-- ============================================================================
-- SECURE STORED PROCEDURES (RPCs)
-- ============================================================================

-- A. Start Game Session RPC
CREATE OR REPLACE FUNCTION public.rpc_start_game_session(
    p_user_id UUID,
    p_chapter_config_id TEXT,
    p_mission_id TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_session_id UUID;
    v_hearts INTEGER;
    v_gems INTEGER;
    v_user_exists BOOLEAN;
BEGIN
    -- Ensure user game profile exists
    SELECT EXISTS (SELECT 1 FROM public.learner_game_profiles WHERE user_id = p_user_id) INTO v_user_exists;
    IF NOT v_user_exists THEN
        INSERT INTO public.learner_game_profiles (user_id, total_xp, current_level, gems_balance, hearts_remaining)
        VALUES (p_user_id, 0, 1, 50, 4);
    END IF;

    -- Fetch learner hearts
    SELECT hearts_remaining, gems_balance INTO v_hearts, v_gems
    FROM public.learner_game_profiles
    WHERE user_id = p_user_id;

    -- If 0 hearts, auto-recharge if over 30 mins, else minimum 1 heart
    IF v_hearts <= 0 THEN
        UPDATE public.learner_game_profiles
        SET hearts_remaining = 4, last_heart_recharge_at = NOW()
        WHERE user_id = p_user_id;
        v_hearts := 4;
    END IF;

    -- Create live session
    INSERT INTO public.game_sessions (user_id, chapter_config_id, mission_id, hearts_left, status)
    VALUES (p_user_id, p_chapter_config_id, p_mission_id, v_hearts, 'in_progress')
    RETURNING id INTO v_session_id;

    RETURN jsonb_build_object(
        'session_id', v_session_id,
        'chapter_config_id', p_chapter_config_id,
        'hearts_remaining', v_hearts,
        'gems_balance', v_gems,
        'status', 'in_progress'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- B. Submit Game Answer RPC (Server-side validation & XP calculation)
CREATE OR REPLACE FUNCTION public.rpc_submit_game_answer(
    p_session_id UUID,
    p_question_id TEXT,
    p_is_correct BOOLEAN,
    p_response_time_ms INTEGER DEFAULT 1500,
    p_powerup_used TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    v_session RECORD;
    v_user_id UUID;
    v_base_xp INTEGER := 20;
    v_speed_bonus INTEGER := 0;
    v_streak_multiplier NUMERIC(3,1) := 1.0;
    v_awarded_xp INTEGER := 0;
    v_new_hearts INTEGER;
    v_new_streak INTEGER;
    v_max_streak INTEGER;
    v_new_total_xp INTEGER;
    v_new_level INTEGER;
BEGIN
    SELECT * INTO v_session FROM public.game_sessions WHERE id = p_session_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('error', 'Session not found');
    END IF;

    v_user_id := v_session.user_id;

    IF p_is_correct THEN
        -- Speed bonus: answered under 5 seconds
        IF p_response_time_ms < 5000 THEN
            v_speed_bonus := 10;
        ELSIF p_response_time_ms < 10000 THEN
            v_speed_bonus := 5;
        END IF;

        -- Combo streak bonus
        v_new_streak := v_session.current_streak + 1;
        v_max_streak := GREATEST(v_session.combo_max_streak, v_new_streak);

        IF v_new_streak >= 5 THEN
            v_streak_multiplier := 2.0;
        ELSIF v_new_streak >= 3 THEN
            v_streak_multiplier := 1.5;
        END IF;

        v_awarded_xp := ROUND((v_base_xp + v_speed_bonus) * v_streak_multiplier);
        v_new_hearts := v_session.hearts_left;

        -- Record XP transaction
        INSERT INTO public.learner_xp_transactions (user_id, session_id, amount, reason, multiplier)
        VALUES (v_user_id, p_session_id, v_awarded_xp, 'correct_answer', v_streak_multiplier);

    ELSE
        -- Deduct 1 heart on incorrect answer (minimum 0)
        v_new_hearts := GREATEST(0, v_session.hearts_left - 1);
        v_new_streak := 0;
        v_max_streak := v_session.combo_max_streak;
        v_awarded_xp := 0;
    END IF;

    -- Update session
    UPDATE public.game_sessions
    SET 
        questions_attempted = questions_attempted + 1,
        correct_count = correct_count + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
        earned_xp = earned_xp + v_awarded_xp,
        hearts_left = v_new_hearts,
        current_streak = v_new_streak,
        combo_max_streak = v_max_streak,
        time_spent_seconds = time_spent_seconds + ROUND(p_response_time_ms / 1000.0)
    WHERE id = p_session_id;

    -- Update learner game profile
    UPDATE public.learner_game_profiles
    SET 
        total_xp = total_xp + v_awarded_xp,
        hearts_remaining = v_new_hearts,
        current_level = CASE 
            WHEN (total_xp + v_awarded_xp) >= 2500 THEN 5
            WHEN (total_xp + v_awarded_xp) >= 1200 THEN 4
            WHEN (total_xp + v_awarded_xp) >= 600 THEN 3
            WHEN (total_xp + v_awarded_xp) >= 250 THEN 2
            ELSE 1
        END,
        last_activity_date = CURRENT_DATE,
        updated_at = NOW()
    WHERE user_id = v_user_id
    RETURNING total_xp, current_level INTO v_new_total_xp, v_new_level;

    RETURN jsonb_build_object(
        'is_correct', p_is_correct,
        'awarded_xp', v_awarded_xp,
        'speed_bonus', v_speed_bonus,
        'streak_multiplier', v_streak_multiplier,
        'current_streak', v_new_streak,
        'hearts_left', v_new_hearts,
        'total_xp', v_new_total_xp,
        'current_level', v_new_level
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- C. Use Powerup RPC
CREATE OR REPLACE FUNCTION public.rpc_use_game_powerup(
    p_user_id UUID,
    p_session_id UUID,
    p_powerup_type TEXT
)
RETURNS JSONB AS $$
DECLARE
    v_qty INTEGER;
BEGIN
    SELECT quantity INTO v_qty 
    FROM public.learner_powerups 
    WHERE user_id = p_user_id AND powerup_type = p_powerup_type;

    IF v_qty IS NULL OR v_qty <= 0 THEN
        RETURN jsonb_build_object('success', false, 'message', 'No powerups remaining');
    END IF;

    -- Deduct 1 powerup
    UPDATE public.learner_powerups
    SET quantity = quantity - 1, updated_at = NOW()
    WHERE user_id = p_user_id AND powerup_type = p_powerup_type;

    -- Log in session
    UPDATE public.game_sessions
    SET powerups_used = jsonb_set(
        powerups_used, 
        ARRAY[p_powerup_type], 
        (COALESCE((powerups_used->>p_powerup_type)::int, 0) + 1)::text::jsonb
    )
    WHERE id = p_session_id;

    RETURN jsonb_build_object('success', true, 'remaining_quantity', v_qty - 1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.game_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subject_game_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_game_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_game_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_powerups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_session_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_xp_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_topic_mastery ENABLE ROW LEVEL SECURITY;

-- Public can read themes and configs
CREATE POLICY "Public read game_themes" ON public.game_themes FOR SELECT USING (true);
CREATE POLICY "Public read subject_game_configs" ON public.subject_game_configs FOR SELECT USING (true);
CREATE POLICY "Public read chapter_game_configs" ON public.chapter_game_configs FOR SELECT USING (true);
CREATE POLICY "Public read game_missions" ON public.game_missions FOR SELECT USING (true);
CREATE POLICY "Public read game_levels" ON public.game_levels FOR SELECT USING (true);

-- Users can read and update their own game profiles
CREATE POLICY "Users read own game profile" ON public.learner_game_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own game profile" ON public.learner_game_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users insert own game profile" ON public.learner_game_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read and update own powerups
CREATE POLICY "Users read own powerups" ON public.learner_powerups FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own powerups" ON public.learner_powerups FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users insert own powerups" ON public.learner_powerups FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read and manage own sessions
CREATE POLICY "Users read own game sessions" ON public.game_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own game sessions" ON public.game_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own game sessions" ON public.game_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Telemetry & XP
CREATE POLICY "Users read own xp transactions" ON public.learner_xp_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own achievements" ON public.learner_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users read own topic mastery" ON public.learner_topic_mastery FOR SELECT USING (auth.uid() = user_id);
