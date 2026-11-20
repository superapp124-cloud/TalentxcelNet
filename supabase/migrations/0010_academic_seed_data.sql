-- ============================================================================
-- TALENTXCEL ACADEMY — UNIVERSAL KNOWLEDGE GRAPH SEED DATA
-- Migration: 0010_academic_seed_data.sql
-- Covers: Boards, Programs, Examinations, Subjects, Chapters, Topics,
--         Canonical Concepts, Prerequisite DAG, and Board/Exam Mappings.
-- Safe & Idempotent: Uses ON CONFLICT DO UPDATE / DO NOTHING.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. ACADEMIC BOARDS
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_boards (id, name, short_code, country, curriculum_type, official_portal_url, is_active)
VALUES
  ('cbse', 'Central Board of Secondary Education', 'CBSE', 'IN', 'national', 'https://www.cbse.gov.in', true),
  ('cisce', 'Council for the Indian School Certificate Examinations', 'CISCE', 'IN', 'national', 'https://cisce.org', true),
  ('ib', 'International Baccalaureate', 'IB', 'CH', 'international', 'https://www.ibo.org', true),
  ('cambridge', 'Cambridge Assessment International Education', 'CAIE', 'GB', 'international', 'https://www.cambridgeinternational.org', true),
  ('maharashtra_state', 'Maharashtra State Board of Secondary and Higher Secondary Education', 'MSBSHSE', 'IN', 'state', 'https://mahahsscboard.in', true),
  ('karnataka_state', 'Karnataka School Examination and Assessment Board', 'KSEAB', 'IN', 'state', 'https://kseab.karnataka.gov.in', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_code = EXCLUDED.short_code,
  is_active = EXCLUDED.is_active;

-- ----------------------------------------------------------------------------
-- 2. ACADEMIC PROGRAMS & PATHWAYS
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_programs (id, name, category, target_grades, description, is_active)
VALUES
  ('prog_k12_primary', 'K-12 Primary School Program', 'k12_school', ARRAY['1', '2', '3', '4', '5'], 'Foundational literacy, numeracy, and environmental inquiry.', true),
  ('prog_k12_middle', 'K-12 Middle School Program', 'k12_school', ARRAY['6', '7', '8'], 'Conceptual science, algebra, geometry, and linguistic rigor.', true),
  ('prog_k12_secondary', 'K-12 Secondary Board Prep', 'k12_school', ARRAY['9', '10'], 'Rigorous Class 9 & 10 board syllabus alignment and internal assessments.', true),
  ('prog_k12_senior', 'K-12 Senior Secondary Stream', 'k12_school', ARRAY['11', '12'], 'Advanced Science (PCM/PCB), Commerce, and Humanities tracks.', true),
  ('prog_jee_foundation', 'JEE Main & Advanced Foundation', 'engineering_entrance', ARRAY['9', '10', '11', '12'], 'Multi-concept problem solving in Physics, Chemistry, and Mathematics.', true),
  ('prog_neet_ug', 'NEET UG Medical Pathway', 'medical_entrance', ARRAY['11', '12'], 'High-yield NCERT Biology, Physics derivations, and Chemistry reaction mechanics.', true),
  ('prog_cuet_ug', 'CUET UG University Entrance', 'university_entrance', ARRAY['12'], 'Domain-specific subjects and General Aptitude for Central Universities.', true),
  ('prog_olympiad_elite', 'National & International Olympiads', 'olympiad', ARRAY['6', '7', '8', '9', '10', '11', '12'], 'SOF IMO, NSO, IPhO, and advanced mathematical reasoning.', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  target_grades = EXCLUDED.target_grades;

-- ----------------------------------------------------------------------------
-- 3. VERSIONED CURRICULUM SPECIFICATIONS (2026-2027)
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_curricula (id, board_id, program_id, academic_year, syllabus_version, effective_from, is_current)
VALUES
  ('curr_cbse_sec_2026_27', 'cbse', 'prog_k12_secondary', '2026-2027', 'v2026.1', '2026-04-01', true),
  ('curr_cbse_sen_2026_27', 'cbse', 'prog_k12_senior', '2026-2027', 'v2026.1', '2026-04-01', true),
  ('curr_cisce_sec_2026_27', 'cisce', 'prog_k12_secondary', '2026-2027', 'v2026.1', '2026-04-01', true),
  ('curr_ib_myp_2026_27', 'ib', 'prog_k12_secondary', '2026-2027', 'v2026.1', '2026-08-01', true),
  ('curr_cambridge_igcse_2026', 'cambridge', 'prog_k12_secondary', '2026-2027', 'v2026.1', '2026-08-01', true)
ON CONFLICT (id) DO UPDATE SET
  academic_year = EXCLUDED.academic_year,
  syllabus_version = EXCLUDED.syllabus_version,
  is_current = EXCLUDED.is_current;

-- ----------------------------------------------------------------------------
-- 4. COMPETITIVE & BOARD EXAMINATIONS CATALOGUE
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_examinations (id, name, authority_name, category, frequency_per_year, scoring_pattern, official_syllabus_url, is_active)
VALUES
  ('exam_cbse_10_board', 'CBSE Class 10 All India Secondary School Examination', 'CBSE', 'board_examination', 1, '{"total_marks": 100, "theory": 80, "internal": 20}'::jsonb, 'https://cbseacademic.nic.in', true),
  ('exam_cbse_12_board', 'CBSE Class 12 Senior School Certificate Examination', 'CBSE', 'board_examination', 1, '{"total_marks": 100, "theory": 70, "practical": 30}'::jsonb, 'https://cbseacademic.nic.in', true),
  ('exam_jee_main', 'Joint Entrance Examination (Main)', 'National Testing Agency (NTA)', 'engineering', 2, '{"total_marks": 300, "correct": 4, "negative": -1, "questions": 75}'::jsonb, 'https://jeemain.nta.nic.in', true),
  ('exam_jee_advanced', 'Joint Entrance Examination (Advanced)', 'IIT Joint Admission Board', 'engineering', 1, '{"multi_correct": true, "partial_marking": true}'::jsonb, 'https://jeeadv.ac.in', true),
  ('exam_neet_ug', 'National Eligibility cum Entrance Test (UG)', 'National Testing Agency (NTA)', 'medical', 1, '{"total_marks": 720, "correct": 4, "negative": -1, "questions": 180}'::jsonb, 'https://neet.nta.nic.in', true),
  ('exam_bitsat', 'Birla Institute of Technology and Science Admission Test', 'BITS Pilani', 'engineering', 2, '{"total_marks": 390, "correct": 3, "negative": -1, "questions": 130}'::jsonb, 'https://www.bitsadmission.com', true),
  ('exam_cuet_ug', 'Common University Entrance Test (UG)', 'National Testing Agency (NTA)', 'board_examination', 1, '{"correct": 5, "negative": -1}'::jsonb, 'https://cuetug.ntaonline.in', true),
  ('exam_sof_imo', 'SOF International Mathematics Olympiad', 'Science Olympiad Foundation', 'olympiad', 1, '{"achievers_section": true, "total_marks": 60}'::jsonb, 'https://sofworld.org/imo', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  scoring_pattern = EXCLUDED.scoring_pattern,
  is_active = EXCLUDED.is_active;

-- ----------------------------------------------------------------------------
-- 5. STANDARDIZED SUBJECTS
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_subjects (id, name, code, icon_name, color_theme)
VALUES
  ('subj_math', 'Mathematics', 'math', 'Calculator', 'amber'),
  ('subj_science', 'Science & Technology', 'science', 'FlaskConical', 'emerald'),
  ('subj_physics', 'Physics', 'physics', 'Sparkles', 'cyan'),
  ('subj_chemistry', 'Chemistry', 'chemistry', 'FlaskConical', 'emerald'),
  ('subj_biology', 'Biology', 'biology', 'Activity', 'rose'),
  ('subj_english', 'English Language & Literature', 'english', 'BookOpen', 'blue'),
  ('subj_social_science', 'Social Science', 'social_science', 'Globe', 'purple')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  code = EXCLUDED.code,
  icon_name = EXCLUDED.icon_name,
  color_theme = EXCLUDED.color_theme;

-- ----------------------------------------------------------------------------
-- 6. CHAPTER TAXONOMY (Class 9 & 10 Core Chapters)
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_chapters (id, subject_id, class_number, chapter_number, title, slug, description, target_question_count)
VALUES
  -- Class 10 Science
  ('chap_c10_sci_optics', 'subj_science', 10, 9, 'Light — Reflection & Refraction', 'light-reflection-refraction', 'Spherical mirrors, ray diagrams, mirror formula, magnification, refraction, Snell''s law, and lenses.', 1200),
  ('chap_c10_sci_electricity', 'subj_science', 10, 11, 'Electricity & Circuits', 'electricity-and-circuits', 'Ohm''s law, resistance, series/parallel combinations, electric power, and Joule heating effect.', 1000),
  ('chap_c10_sci_chem_rxn', 'subj_science', 10, 1, 'Chemical Reactions & Equations', 'chemical-reactions-equations', 'Balancing chemical equations, redox, combination, decomposition, displacement, and rancidity.', 850),
  ('chap_c10_sci_life_proc', 'subj_science', 10, 5, 'Life Processes', 'life-processes', 'Autotrophic & heterotrophic nutrition, respiration, transportation in humans/plants, and excretion.', 1100),

  -- Class 10 Mathematics
  ('chap_c10_math_real_num', 'subj_math', 10, 1, 'Real Numbers', 'real-numbers', 'Fundamental Theorem of Arithmetic, irrationality proofs (√2, √3, √5), and decimal expansions.', 750),
  ('chap_c10_math_poly', 'subj_math', 10, 2, 'Polynomials', 'polynomials', 'Geometric meaning of zeroes, relationship between coefficients and zeroes of quadratic polynomials.', 800),
  ('chap_c10_math_quad_eq', 'subj_math', 10, 4, 'Quadratic Equations', 'quadratic-equations', 'Factorization, quadratic formula (Sridharacharya), nature of roots, and real-world word problems.', 1250),
  ('chap_c10_math_triangles', 'subj_math', 10, 6, 'Triangles & Similarity', 'triangles-and-similarity', 'Basic Proportionality Theorem (Thales), criteria for similarity of triangles (AAA, SSS, SAS).', 950),

  -- Class 9 Science
  ('chap_c9_sci_motion', 'subj_science', 9, 7, 'Motion & Kinematics', 'motion-and-kinematics', 'Distance vs displacement, uniform/non-uniform motion, equations of motion, and circular motion.', 900),
  ('chap_c9_sci_forces', 'subj_science', 9, 8, 'Force & Laws of Motion', 'force-and-laws-of-motion', 'Newton''s three laws of motion, inertia, momentum, impulse, and conservation of momentum.', 950),
  ('chap_c9_sci_gravitation', 'subj_science', 9, 9, 'Gravitation & Floatation', 'gravitation-and-floatation', 'Universal law of gravitation, free fall, acceleration due to gravity (g vs G), mass vs weight, Archimedes principle.', 850),

  -- Class 9 Mathematics
  ('chap_c9_math_num_sys', 'subj_math', 9, 1, 'Number Systems', 'number-systems', 'Real numbers on number line, laws of exponents, rationalization of denominators.', 800),
  ('chap_c9_math_lines_angles', 'subj_math', 9, 6, 'Lines and Angles', 'lines-and-angles', 'Complementary/supplementary angles, vertically opposite angles, transversals, and angle sum property.', 750)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description;

-- ----------------------------------------------------------------------------
-- 7. TOPIC HIERARCHY
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_topics (id, chapter_id, topic_number, title, slug)
VALUES
  -- Class 10 Optics Topics
  ('top_opt_mirrors', 'chap_c10_sci_optics', 1, 'Spherical Mirrors & Ray Tracing', 'spherical-mirrors-ray-tracing'),
  ('top_opt_mirror_formula', 'chap_c10_sci_optics', 2, 'Mirror Formula & Cartesian Sign Convention', 'mirror-formula-sign-convention'),
  ('top_opt_refraction', 'chap_c10_sci_optics', 3, 'Refraction of Light & Snell''s Law', 'refraction-snells-law'),
  ('top_opt_lenses', 'chap_c10_sci_optics', 4, 'Spherical Lenses & Lens Formula', 'lenses-lens-formula'),
  ('top_opt_power', 'chap_c10_sci_optics', 5, 'Power of a Lens', 'power-of-lens'),

  -- Class 10 Quadratic Equations Topics
  ('top_quad_standard_form', 'chap_c10_math_quad_eq', 1, 'Standard Form & Factorization', 'standard-form-factorization'),
  ('top_quad_formula', 'chap_c10_math_quad_eq', 2, 'Quadratic Formula (Sridharacharya)', 'quadratic-formula'),
  ('top_quad_discriminant', 'chap_c10_math_quad_eq', 3, 'Discriminant & Nature of Roots', 'discriminant-nature-of-roots'),
  ('top_quad_word_problems', 'chap_c10_math_quad_eq', 4, 'Applications & Word Problems', 'applications-word-problems'),

  -- Class 9 Gravitation Topics
  ('top_grav_universal_law', 'chap_c9_sci_gravitation', 1, 'Universal Law of Gravitation', 'universal-law-of-gravitation'),
  ('top_grav_free_fall', 'chap_c9_sci_gravitation', 2, 'Free Fall & Acceleration due to Gravity', 'free-fall-acceleration-gravity'),
  ('top_grav_mass_weight', 'chap_c9_sci_gravitation', 3, 'Mass vs Weight on Different Celestial Bodies', 'mass-vs-weight')
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug;

-- ----------------------------------------------------------------------------
-- 8. UNIVERSAL CANONICAL KNOWLEDGE GRAPH (Atomic Concepts)
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_concepts (id, topic_id, canonical_code, title, slug, summary_definition, governing_formula, bloom_level, difficulty_baseline)
VALUES
  -- Optics Concepts
  (
    'conc_opt_cartesian_sign',
    'top_opt_mirror_formula',
    'PHYS.OPT.001',
    'New Cartesian Sign Convention',
    'cartesian-sign-convention',
    'All distances measured from pole/optical centre; distances in direction of incident ray are positive, opposite are negative; above principal axis positive, below negative.',
    'u < 0, f(concave) < 0, f(convex) > 0',
    'understand',
    2
  ),
  (
    'conc_opt_mirror_formula',
    'top_opt_mirror_formula',
    'PHYS.OPT.002',
    'Spherical Mirror Formula & Magnification',
    'mirror-formula-magnification',
    'Relates object distance u, image distance v, and focal length f for spherical mirrors.',
    '1/v + 1/u = 1/f; m = -v/u = h_i/h_o',
    'apply',
    3
  ),
  (
    'conc_opt_snells_law',
    'top_opt_refraction',
    'PHYS.OPT.003',
    'Snell''s Law of Refraction',
    'snells-law-refraction',
    'The ratio of sine of angle of incidence to sine of angle of refraction is a constant for given pair of media.',
    'n_1 * sin(i) = n_2 * sin(r); n_21 = sin(i)/sin(r) = v_1/v_2',
    'apply',
    3
  ),
  (
    'conc_opt_lens_formula',
    'top_opt_lenses',
    'PHYS.OPT.004',
    'Lens Formula & Linear Magnification',
    'lens-formula-magnification',
    'Relates object distance u, image distance v, and focal length f for thin spherical lenses.',
    '1/v - 1/u = 1/f; m = v/u = h_i/h_o',
    'apply',
    3
  ),
  (
    'conc_opt_lens_power',
    'top_opt_power',
    'PHYS.OPT.005',
    'Power of a Lens & Dioptre',
    'power-of-lens-dioptre',
    'The degree of convergence or divergence of light rays achieved by a lens, expressed as reciprocal of focal length in metres.',
    'P = 1/f(in metres); Unit: Dioptre (D)',
    'understand',
    2
  ),

  -- Quadratic Equations Concepts
  (
    'conc_math_quad_standard',
    'top_quad_standard_form',
    'MATH.QUAD.001',
    'Quadratic Equation in Standard Form',
    'quadratic-standard-form',
    'A polynomial equation of degree 2 in single variable with real coefficients where leading coefficient a ≠ 0.',
    'ax^2 + bx + c = 0, a != 0',
    'remember',
    1
  ),
  (
    'conc_math_quad_formula',
    'top_quad_formula',
    'MATH.QUAD.002',
    'Quadratic Formula (Sridharacharya Rule)',
    'quadratic-formula-sridharacharya',
    'Direct algebraic closed-form solution giving both roots of any quadratic equation.',
    'x = (-b ± √(b^2 - 4ac)) / (2a)',
    'apply',
    3
  ),
  (
    'conc_math_quad_discriminant',
    'top_quad_discriminant',
    'MATH.QUAD.003',
    'Discriminant & Nature of Roots',
    'discriminant-nature-of-roots',
    'The quantity D = b^2 - 4ac determines whether roots are real & distinct (D>0), real & equal (D=0), or non-real complex (D<0).',
    'D = b^2 - 4ac; D>0 (2 real distinct), D=0 (2 real equal), D<0 (no real roots)',
    'analyze',
    3
  ),

  -- Gravitation Concepts
  (
    'conc_phys_univ_gravitation',
    'top_grav_universal_law',
    'PHYS.GRAV.001',
    'Newton''s Universal Law of Gravitation',
    'universal-law-of-gravitation',
    'Every particle in the universe attracts every other particle with force directly proportional to product of masses and inversely to square of distance.',
    'F = G * (m1 * m2) / r^2, G = 6.674e-11 N*m^2/kg^2',
    'understand',
    3
  ),
  (
    'conc_phys_free_fall_g',
    'top_grav_free_fall',
    'PHYS.GRAV.002',
    'Acceleration due to Gravity (g vs G)',
    'acceleration-gravity-g-vs-G',
    'The uniform acceleration experienced by freely falling bodies near planetary surface, independent of body mass.',
    'g = (G * M) / R^2; on Earth g ≈ 9.8 m/s^2',
    'apply',
    3
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  governing_formula = EXCLUDED.governing_formula,
  summary_definition = EXCLUDED.summary_definition,
  difficulty_baseline = EXCLUDED.difficulty_baseline;

-- ----------------------------------------------------------------------------
-- 9. PREREQUISITE DEPENDENCY GRAPH (Concept DAG)
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_prerequisites (concept_id, prerequisite_concept_id, dependency_type, pedagogical_note)
VALUES
  -- Mirror formula requires Cartesian sign convention first
  ('conc_opt_mirror_formula', 'conc_opt_cartesian_sign', 'strict_prerequisite', 'Students make 80% of errors in mirror problems by forgetting that object distance u is always negative.'),
  -- Lens formula requires Cartesian sign convention first
  ('conc_opt_lens_formula', 'conc_opt_cartesian_sign', 'strict_prerequisite', 'Sign of focal length differs: concave lens has negative f, convex has positive f.'),
  -- Lens power requires Lens formula
  ('conc_opt_lens_power', 'conc_opt_lens_formula', 'recommended_prior', 'Understanding focal length is essential before calculating optical power in Dioptres.'),
  -- Nature of roots requires Quadratic formula
  ('conc_math_quad_discriminant', 'conc_math_quad_formula', 'strict_prerequisite', 'The term under the square root b^2 - 4ac defines the discriminant D.'),
  -- Quadratic formula requires Standard Form
  ('conc_math_quad_formula', 'conc_math_quad_standard', 'strict_prerequisite', 'Values of coefficients a, b, c must be identified from ax^2 + bx + c = 0 with correct signs.'),
  -- Free fall acceleration g requires Universal Gravitation
  ('conc_phys_free_fall_g', 'conc_phys_univ_gravitation', 'strict_prerequisite', 'Deriving g = GM/R^2 requires applying Newton''s gravitational law to planetary mass M.')
ON CONFLICT (concept_id, prerequisite_concept_id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 10. REUSABLE CURRICULUM-TO-CONCEPT JUNCTIONS
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_curriculum_concepts (
  curriculum_id, concept_id, class_number, curriculum_specific_learning_objective, textbook_citation, board_weightage_marks, is_mandatory_for_board
)
VALUES
  ('curr_cbse_sec_2026_27', 'conc_opt_cartesian_sign', 10, 'Apply the New Cartesian Sign Convention correctly to ray diagrams and numerical problems.', 'NCERT Class 10 Science Ch 9 Section 9.2.3', 3.0, true),
  ('curr_cbse_sec_2026_27', 'conc_opt_mirror_formula', 10, 'Solve numericals involving focal length, image position, and nature using mirror equation.', 'NCERT Class 10 Science Ch 9 Section 9.2.4', 5.0, true),
  ('curr_cbse_sec_2026_27', 'conc_opt_snells_law', 10, 'State laws of refraction and calculate refractive index between media.', 'NCERT Class 10 Science Ch 9 Section 9.3.2', 3.0, true),
  ('curr_cbse_sec_2026_27', 'conc_opt_lens_formula', 10, 'Derive and solve image distance and magnification for convex/concave lenses.', 'NCERT Class 10 Science Ch 9 Section 9.3.6', 5.0, true),
  ('curr_cbse_sec_2026_27', 'conc_math_quad_discriminant', 10, 'Determine nature of roots of quadratic equation using discriminant and find unknown k.', 'NCERT Class 10 Math Ch 4 Section 4.5', 4.0, true),
  ('curr_cisce_sec_2026_27', 'conc_opt_snells_law', 10, 'Experimentally verify Snell''s law using glass slab and calculate lateral displacement.', 'ICSE Class 10 Physics Ch 4', 4.0, true),
  ('curr_cisce_sec_2026_27', 'conc_math_quad_discriminant', 10, 'Solve quadratic equations by formula method and discuss nature of roots.', 'ICSE Class 10 Math Ch 5', 4.0, true)
ON CONFLICT (curriculum_id, concept_id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 11. EXAMINATION-TO-CONCEPT JUNCTIONS (Competitive Exam Weightage)
-- ----------------------------------------------------------------------------
INSERT INTO public.academic_exam_concepts (
  examination_id, concept_id, difficulty_band, past_10_year_frequency, typical_question_types, neet_jee_weightage_percentage
)
VALUES
  ('exam_jee_main', 'conc_opt_mirror_formula', 'advanced_jee_neet', 14, ARRAY['mcq_single', 'numerical_integer'], 3.50),
  ('exam_jee_main', 'conc_opt_snells_law', 'advanced_jee_neet', 22, ARRAY['mcq_single', 'numerical_integer'], 4.20),
  ('exam_jee_main', 'conc_math_quad_discriminant', 'advanced_jee_neet', 18, ARRAY['mcq_single', 'numerical_integer'], 4.00),
  ('exam_neet_ug', 'conc_opt_mirror_formula', 'moderate_board', 16, ARRAY['mcq_single'], 4.50),
  ('exam_neet_ug', 'conc_opt_lens_formula', 'moderate_board', 24, ARRAY['mcq_single'], 5.00),
  ('exam_cbse_10_board', 'conc_opt_mirror_formula', 'foundational', 30, ARRAY['short_answer', 'long_numerical'], 7.00),
  ('exam_cbse_10_board', 'conc_math_quad_discriminant', 'foundational', 28, ARRAY['mcq_single', 'short_answer'], 6.00)
ON CONFLICT (examination_id, concept_id) DO NOTHING;
