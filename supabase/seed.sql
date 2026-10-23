-- TALENTXCEL GREENFIELD PLATFORM SEED DATA
-- Seed: supabase/seed.sql
-- Aligned with Mayoor School Grade III & Grade IV Periodic Test 2 syllabus and Classes 4–12 + Aptitude

-- 1. Curriculum Boards (CBSE, CISCE, IB)
INSERT INTO curriculum_boards (id, code, name, country)
VALUES
    ('b1111111-1111-1111-1111-111111111111', 'CBSE', 'Central Board of Secondary Education', 'IN'),
    ('b2222222-2222-2222-2222-222222222222', 'CISCE', 'Council for the Indian School Certificate Examinations', 'IN'),
    ('b3333333-3333-3333-3333-333333333333', 'IB', 'International Baccalaureate (MYP & DP)', 'INT')
ON CONFLICT (code) DO NOTHING;

-- 2. Classes (Classes 3 through 12)
INSERT INTO classes (id, board_id, grade_number, code, name)
VALUES
    ('c3333333-3333-3333-3333-333333333333', 'b1111111-1111-1111-1111-111111111111', 3, 'class-3', 'Grade III'),
    ('c4444444-4444-4444-4444-444444444444', 'b1111111-1111-1111-1111-111111111111', 4, 'class-4', 'Grade IV'),
    ('c5555555-5555-5555-5555-555555555555', 'b1111111-1111-1111-1111-111111111111', 5, 'class-5', 'Grade V'),
    ('c6666666-6666-6666-6666-666666666666', 'b1111111-1111-1111-1111-111111111111', 6, 'class-6', 'Grade VI'),
    ('c7777777-7777-7777-7777-777777777777', 'b1111111-1111-1111-1111-111111111111', 7, 'class-7', 'Grade VII'),
    ('c8888888-8888-8888-8888-888888888888', 'b1111111-1111-1111-1111-111111111111', 8, 'class-8', 'Grade VIII'),
    ('c9999999-9999-9999-9999-999999999999', 'b1111111-1111-1111-1111-111111111111', 9, 'class-9', 'Grade IX'),
    ('caaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'b1111111-1111-1111-1111-111111111111', 10, 'class-10', 'Grade X'),
    ('cbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'b1111111-1111-1111-1111-111111111111', 11, 'class-11', 'Grade XI'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'b1111111-1111-1111-1111-111111111111', 12, 'class-12', 'Grade XII')
ON CONFLICT (board_id, grade_number) DO NOTHING;

-- 3. Grade IV Subjects (Matching the 5 Vibrant Cards)
INSERT INTO subjects (id, class_id, code, name, color_theme, icon_name, display_order)
VALUES
    ('s4000001-0000-0000-0000-000000000001', 'c4444444-4444-4444-4444-444444444444', 'math', 'Mathematics', 'amber', 'Calculator', 1),
    ('s4000002-0000-0000-0000-000000000002', 'c4444444-4444-4444-4444-444444444444', 'science', 'Science', 'emerald', 'FlaskConical', 2),
    ('s4000003-0000-0000-0000-000000000003', 'c4444444-4444-4444-4444-444444444444', 'english', 'English', 'blue', 'BookOpen', 3),
    ('s4000004-0000-0000-0000-000000000004', 'c4444444-4444-4444-4444-444444444444', 'hindi', 'Hindi', 'pink', 'Languages', 4),
    ('s4000005-0000-0000-0000-000000000005', 'c4444444-4444-4444-4444-444444444444', 'social_science', 'Social Science', 'purple', 'Compass', 5)
ON CONFLICT (class_id, code) DO NOTHING;

-- 4. Grade IV Chapters
INSERT INTO chapters (id, subject_id, chapter_number, title, description)
VALUES
    ('ch400001-0000-0000-0000-000000000001', 's4000001-0000-0000-0000-000000000001', 6, 'Ch - 6 Multiples', 'Multiples, common multiples, and multiples of 6'),
    ('ch400002-0000-0000-0000-000000000002', 's4000001-0000-0000-0000-000000000001', 7, 'Ch - 7 Fractions', 'Parts of a whole, numerator and denominator'),
    ('ch400003-0000-0000-0000-000000000002', 's4000002-0000-0000-0000-000000000002', 5, 'Unit 5 - Force and Magnetism', 'Gravity, friction, air resistance and magnetic forces'),
    ('ch400004-0000-0000-0000-000000000003', 's4000003-0000-0000-0000-000000000003', 8, 'Ch - 8 The Pied Piper of Hamelin', 'Literature comprehension and vocabulary'),
    ('ch400005-0000-0000-0000-000000000004', 's4000004-0000-0000-0000-000000000004', 11, 'पाठ 11 - प्यारा भारत', 'हिंदी साहित्य एवं व्याकरण'),
    ('ch400006-0000-0000-0000-000000000005', 's4000005-0000-0000-0000-000000000005', 8, 'Ch - 8 Our Agriculture', 'Crops, irrigation, and seasons in India')
ON CONFLICT (subject_id, chapter_number) DO NOTHING;

-- 5. Grade IV Topics
INSERT INTO topics (id, chapter_id, title)
VALUES
    ('t4000001-0000-0000-0000-000000000001', 'ch400001-0000-0000-0000-000000000001', 'Properties of Multiples and 6-times Table')
ON CONFLICT DO NOTHING;

-- 6. Assessment Blueprint for Grade IV Mathematics PT 2
INSERT INTO assessment_blueprints (id, title, subject_id, chapter_id, exam_type, duration_minutes, total_questions, total_marks, negative_marking_ratio, passing_percentage, reward_credit_amount)
VALUES (
    'bp400001-0000-0000-0000-000000000001',
    'Mathematics Ch - 6 Multiples Practice Test',
    's4000001-0000-0000-0000-000000000001',
    'ch400001-0000-0000-0000-000000000001',
    'periodic_test',
    15,
    10,
    20.00,
    0.00,
    60.00,
    20.00 -- ₹20 Pass Credit Reward
) ON CONFLICT DO NOTHING;

-- 7. Question 7 Matching the Exact Screenshot in User's Uploaded Image
INSERT INTO questions (id, topic_id, question_type, question_text, options, marks, negative_marking_ratio, difficulty, language, status)
VALUES (
    'q4000007-0000-0000-0000-000000000007',
    't4000001-0000-0000-0000-000000000001',
    'single_choice',
    'Which of the following numbers is a multiple of 6?',
    '[
        {"id": "opt_7a", "label": "A", "text": "14"},
        {"id": "opt_7b", "label": "B", "text": "18"},
        {"id": "opt_7c", "label": "C", "text": "20"},
        {"id": "opt_7d", "label": "D", "text": "22"}
    ]'::jsonb,
    2.00,
    0.00,
    'easy',
    'en',
    'published'
) ON CONFLICT DO NOTHING;

-- Confidential Solution (Never exposed to client query)
INSERT INTO question_solutions (question_id, correct_option_ids, solution_steps, explanation, key_point, review_status)
VALUES (
    'q4000007-0000-0000-0000-000000000007',
    '["opt_7b"]'::jsonb,
    '[
        "Multiples of 6 are numbers obtained by multiplying 6 by whole numbers.",
        "6 × 1 = 6",
        "6 × 2 = 12",
        "6 × 3 = 18",
        "6 × 4 = 24",
        "So, 18 is a multiple of 6."
    ]'::jsonb,
    'Step by step explanation: Multiples of 6 are numbers obtained by multiplying 6 by whole numbers. 6 × 1 = 6, 6 × 2 = 12, 6 × 3 = 18, 6 × 4 = 24. So, 18 is a multiple of 6.',
    'Key Point: A number is a multiple of 6 if it appears in the 6-times table: 6, 12, 18, 24, 30 ...',
    'verified'
) ON CONFLICT DO NOTHING;

-- Link Question 7 to Blueprint
INSERT INTO blueprint_questions (blueprint_id, question_id, order_index)
VALUES (
    'bp400001-0000-0000-0000-000000000001',
    'q4000007-0000-0000-0000-000000000007',
    7
) ON CONFLICT (blueprint_id, question_id) DO NOTHING;

-- 8. Commercial Products (₹20 Per Test, ₹99/mo, ₹499/yr)
INSERT INTO products (id, title, description, price_inr, product_type, blueprint_id, is_active)
VALUES
    ('p0000001-0000-0000-0000-000000000001', 'Single Assessment Unlock', 'Unlock 1 full syllabus diagnostic practice test with AI step-by-step explanations', 20.00, 'single_assessment', 'bp400001-0000-0000-0000-000000000001', true),
    ('p0000002-0000-0000-0000-000000000002', 'Monthly Unlimited Practice Pass', 'Unlimited school periodic tests, weak-area revision and Socratic AI hints', 99.00, 'monthly_pass', null, true),
    ('p0000003-0000-0000-0000-000000000003', 'Annual All-Access Super Pass', 'Complete access to school curriculum, competitive foundations, offline downloads and certificates', 499.00, 'annual_pass', null, true)
ON CONFLICT DO NOTHING;
