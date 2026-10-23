import type { BoardCode } from './types'

export interface BoardCurriculumMapping {
  boardCode: BoardCode
  boardName: string
  framework: string
  status: 'verified' | 'aligned' | 'provisional'
  coveragePercentage: number
  curriculumEquivalent: string
  keyTopicsOverlap: string[]
  boardSpecificNotes: string
}

export interface ClassBoardAlignmentDetail {
  classNumber: number
  className: string
  questionCount: number
  chaptersCount: number
  cbse: BoardCurriculumMapping
  icse: BoardCurriculumMapping
  ib: BoardCurriculumMapping
  comparativeSummary: string
}

export const CLASS_WISE_BOARD_ALIGNMENT: Record<number, ClassBoardAlignmentDetail> = {
  // --------------------------------------------------------------------------
  // CLASS 4
  // --------------------------------------------------------------------------
  4: {
    classNumber: 4,
    className: 'Class 4',
    questionCount: 3600,
    chaptersCount: 12,
    cbse: {
      boardCode: 'CBSE',
      boardName: 'Central Board of Secondary Education (CBSE)',
      framework: 'NCERT Math-Magic Class 4 (2026-27)',
      status: 'verified',
      coveragePercentage: 100,
      curriculumEquivalent: 'Standard 4 Mathematics',
      keyTopicsOverlap: [
        'Place Value up to 5 Digits',
        'Multi-Digit Addition & Subtraction with Regrouping',
        '2-Digit by 3-Digit Multiplication',
        'Division with Remainders & Verification Algorithm',
        'Fractions (Visual, Proper, Mixed)',
        'Decimals & Indian Rupee Calculations',
        'Metric Units (Length, Mass, Capacity)',
        'Time, 12h/24h Clocks, Calendar',
        'Perimeter & Area of Rectangles & Squares',
      ],
      boardSpecificNotes: 'Fully aligned with NCERT Learning Outcomes and NIPUN Bharat foundational numeracy benchmarks.',
    },
    icse: {
      boardCode: 'CISCE',
      boardName: 'Council for the Indian School Certificate Examinations (ICSE Primary)',
      framework: 'CISCE Curriculum for Primary Math (Classes 3-5)',
      status: 'aligned',
      coveragePercentage: 92,
      curriculumEquivalent: 'ICSE Class 4 Mathematics',
      keyTopicsOverlap: [
        'Indian & International Number System (Up to 6 digits)',
        'Four Fundamental Operations with large numbers',
        'Factors, Multiples, and Prime/Composite numbers',
        'Equivalent Fractions and Fraction addition',
        'Unitary Method Word Problems',
        'Geometry: Line segments, rays, simple angles, and symmetry',
        'Perimeter of 2D Polygons',
      ],
      boardSpecificNotes: '92% direct overlap. ICSE introduces 6-digit numbers and elementary roman numerals slightly earlier than standard NCERT.',
    },
    ib: {
      boardCode: 'IB',
      boardName: 'International Baccalaureate Primary Years Programme (IB PYP)',
      framework: 'IB PYP Mathematics Scope & Sequence (Phase 3)',
      status: 'provisional',
      coveragePercentage: 82,
      curriculumEquivalent: 'PYP Grade 4 / Year 5',
      keyTopicsOverlap: [
        'Number & Base 10 Systems up to 100,000',
        'Mental and Written Computational Strategies',
        'Pattern Recognition and Functional Relationships',
        'Measurement in Real-World Contexts',
        'Spatial Awareness, 2D/3D Shape Transformations',
        'Data Handling: Pictographs, Bar Charts, and Frequency Tables',
      ],
      boardSpecificNotes: '82% conceptual overlap. IB PYP emphasizes inquiry-based exploration and transdisciplinary problem solving over repetitive rote drill.',
    },
    comparativeSummary:
      'Class 4 mathematics across CBSE, ICSE, and IB shares a common core: multi-digit arithmetic, fractions, decimals, measurement, and elementary geometry. ICSE includes slightly larger numbers, while IB focuses on real-world spatial reasoning and data interpretation.',
  },

  // --------------------------------------------------------------------------
  // CLASS 5
  // --------------------------------------------------------------------------
  5: {
    classNumber: 5,
    className: 'Class 5',
    questionCount: 3600,
    chaptersCount: 12,
    cbse: {
      boardCode: 'CBSE',
      boardName: 'Central Board of Secondary Education (CBSE)',
      framework: 'NCERT Math-Magic Class 5 (2026-27)',
      status: 'verified',
      coveragePercentage: 100,
      curriculumEquivalent: 'Standard 5 Mathematics',
      keyTopicsOverlap: [
        'Large Numbers up to 8 Digits (Crores/Lakhs)',
        'Shapes and Angles (Acute, Right, Obtuse, Reflex)',
        'Area and Perimeter Grid Methods',
        'Parts and Wholes (Fraction Operations & Equivalence)',
        'Rotational Symmetry (1/2, 1/3, 1/4 turns)',
        'HCF, LCM, and Prime Factorization',
        'Decimals in Tenths and Hundredths',
        '3D Nets and Perspective Views',
        'Speed, Distance, and Time Unitary Calculations',
      ],
      boardSpecificNotes: '100% verified against NCERT Class 5 core syllabus and foundational assessment competencies.',
    },
    icse: {
      boardCode: 'CISCE',
      boardName: 'Council for the Indian School Certificate Examinations (ICSE Primary)',
      framework: 'CISCE Class 5 Syllabus for Mathematics',
      status: 'aligned',
      coveragePercentage: 90,
      curriculumEquivalent: 'ICSE Class 5 Mathematics',
      keyTopicsOverlap: [
        'Place Value up to 8 Digits (Indian & International)',
        'Four Operations with Multi-digit Numbers',
        'HCF by Prime Factorization & Division Method',
        'Fractions: Proper, Improper, Mixed, Multiplication & Division',
        'Decimals: Addition, Subtraction, and Multiplication',
        'Percentages: Concept and Simple Conversions',
        'Perimeter, Area of Rectangles, and Volume of Cubes/Cuboids',
      ],
      boardSpecificNotes: '90% direct alignment. ICSE includes introductory percentages and volume of cuboids in Class 5.',
    },
    ib: {
      boardCode: 'IB',
      boardName: 'International Baccalaureate Primary Years Programme (IB PYP)',
      framework: 'IB PYP Mathematics Scope & Sequence (Phase 3/4)',
      status: 'provisional',
      coveragePercentage: 80,
      curriculumEquivalent: 'PYP Grade 5 / Year 6 (PYP Exhibition Year)',
      keyTopicsOverlap: [
        'Rational Numbers and Fractional Thinking',
        'Decimals and Proportional Reasoning',
        'Angles as Measures of Turn',
        'Area, Perimeter, and Volume Investigations',
        'Transformational Geometry & Isometric Sketches',
        'Statistical Surveys and Probability Predictions',
      ],
      boardSpecificNotes: '80% conceptual alignment with IB PYP inquiry units. Questions emphasize mathematical reasoning and step-by-step verification.',
    },
    comparativeSummary:
      'Class 5 introduces foundational proportional reasoning across all three boards: LCM/HCF, fraction multiplication, decimals, and 2D/3D spatial geometry.',
  },

  // --------------------------------------------------------------------------
  // CLASS 6
  // --------------------------------------------------------------------------
  6: {
    classNumber: 6,
    className: 'Class 6',
    questionCount: 3840,
    chaptersCount: 12,
    cbse: {
      boardCode: 'CBSE',
      boardName: 'Central Board of Secondary Education (CBSE)',
      framework: 'NCERT Mathematics Class 6 (2026-27)',
      status: 'verified',
      coveragePercentage: 100,
      curriculumEquivalent: 'Class 6 Middle School Mathematics',
      keyTopicsOverlap: [
        'Knowing Our Numbers (Indian & International, Roman Numerals)',
        'Whole Numbers & Number Line Properties',
        'Playing with Numbers (Divisibility, Prime Factorization, HCF, LCM)',
        'Basic Geometrical Ideas (Points, Lines, Polygons, Angles, Circles)',
        'Understanding Elementary Shapes (Triangles, Quadrilaterals, 3D)',
        'Integers (Negative Numbers and Operations)',
        'Fractions & Decimals in Depth',
        'Data Handling (Bar Graphs, Pictographs)',
        'Mensuration (Perimeter & Area)',
        'Introduction to Algebra (Variables & Simple Equations)',
        'Ratio and Proportion (Unitary Method)',
      ],
      boardSpecificNotes: '100% verified against NCERT Middle School curriculum.',
    },
    icse: {
      boardCode: 'CISCE',
      boardName: 'Council for the Indian School Certificate Examinations (ICSE)',
      framework: 'CISCE Middle School Mathematics (Class 6)',
      status: 'aligned',
      coveragePercentage: 91,
      curriculumEquivalent: 'ICSE Class 6 Mathematics',
      keyTopicsOverlap: [
        'Number System & Operations on Large Numbers',
        'Natural Numbers and Integers',
        'Fractions and Decimals',
        'Exponents and Powers (Basic)',
        'Ratio, Proportion, and Percentage',
        'Algebraic Expressions & Linear Equations in 1 Variable',
        'Geometry: Angles, Triangles, Circles, Constructions',
        'Mensuration: Perimeter and Area of Plane Figures',
        'Data Handling: Mean and Graphical Representation',
      ],
      boardSpecificNotes: '91% core match. ICSE covers introductory exponents and simple percentage calculations slightly earlier.',
    },
    ib: {
      boardCode: 'IB',
      boardName: 'International Baccalaureate Middle Years Programme (IB MYP)',
      framework: 'IB MYP Mathematics Framework (MYP Year 1)',
      status: 'provisional',
      coveragePercentage: 81,
      curriculumEquivalent: 'IB MYP Year 1 Mathematics',
      keyTopicsOverlap: [
        'Forms of Numbers: Integers, Decimals, Fractions, and Operations',
        'Equivalence and Proportional Relationships',
        'Patterns and Algebraic Generalizations',
        'Geometric Measurement and Angle Properties',
        'Data Collection, Representation, and Range/Mean',
      ],
      boardSpecificNotes: '81% alignment with MYP Criterion A (Knowledge) and Criterion B (Investigating Patterns).',
    },
    comparativeSummary:
      'Class 6 marks the critical transition to formal mathematical abstractions across CBSE, ICSE, and IB: negative integers, algebraic variables, and formal geometric proofs.',
  },

  // --------------------------------------------------------------------------
  // CLASS 7
  // --------------------------------------------------------------------------
  7: {
    classNumber: 7,
    className: 'Class 7',
    questionCount: 3840,
    chaptersCount: 12,
    cbse: {
      boardCode: 'CBSE',
      boardName: 'Central Board of Secondary Education (CBSE)',
      framework: 'NCERT Mathematics Class 7 (2026-27)',
      status: 'verified',
      coveragePercentage: 100,
      curriculumEquivalent: 'Class 7 Middle School Mathematics',
      keyTopicsOverlap: [
        'Integers (Properties, Multiplication, Division)',
        'Fractions and Decimals Operations',
        'Data Handling (Mean, Median, Mode, Probability Introduction)',
        'Simple Linear Equations in 1 Variable',
        'Lines and Angles (Transversal, Parallel Lines, Vertically Opposite)',
        'Triangle Properties (Angle Sum, Exterior Angle, Pythagoras Theorem)',
        'Comparing Quantities (Percentage, Profit & Loss, Simple Interest)',
        'Rational Numbers Operations & Standard Form',
        'Perimeter and Area (Parallelogram, Triangle, Circles)',
        'Algebraic Expressions (Like/Unlike Terms, Addition, Value)',
        'Exponents and Powers (Laws of Exponents)',
      ],
      boardSpecificNotes: '100% verified against NCERT Class 7 standard.',
    },
    icse: {
      boardCode: 'CISCE',
      boardName: 'Council for the Indian School Certificate Examinations (ICSE)',
      framework: 'CISCE Middle School Mathematics (Class 7)',
      status: 'aligned',
      coveragePercentage: 89,
      curriculumEquivalent: 'ICSE Class 7 Mathematics',
      keyTopicsOverlap: [
        'Integers, Rational Numbers, and Fraction Arithmetic',
        'Exponents and Scientific Notation',
        'Ratio, Proportion, and Unitary Method',
        'Percentage, Profit and Loss, and Simple Interest (SI)',
        'Algebraic Operations and Solving Linear Equations',
        'Angles, Triangles, Congruence of Triangles (SAS, ASA, SSS, RHS)',
        'Pythagoras Theorem and Applications',
        'Perimeter and Area of Quadrilaterals and Circles',
        'Statistics: Frequency Distribution and Mean/Median/Mode',
      ],
      boardSpecificNotes: '89% alignment. ICSE includes formal triangle congruence proofs in Class 7, while CBSE emphasizes properties and introduces formal congruence in Class 7/9.',
    },
    ib: {
      boardCode: 'IB',
      boardName: 'International Baccalaureate Middle Years Programme (IB MYP)',
      framework: 'IB MYP Mathematics Framework (MYP Year 2)',
      status: 'provisional',
      coveragePercentage: 83,
      curriculumEquivalent: 'IB MYP Year 2 Mathematics',
      keyTopicsOverlap: [
        'Rational Number Operations and Scientific Notation',
        'Rates, Ratios, Percentages, and Financial Mathematics',
        'Linear Relationships and Graphing Linear Equations',
        'Geometric Reasoning: Angles, Triangles, and Pythagoras',
        'Measures of Central Tendency and Experimental Probability',
      ],
      boardSpecificNotes: '83% conceptual alignment with MYP Criterion C (Communicating) and Criterion D (Real-world contexts).',
    },
    comparativeSummary:
      'Class 7 builds strong algebraic and quantitative competency: solving linear equations, calculating simple interest, mastering exponent laws, and applying the Pythagorean theorem.',
  },

  // --------------------------------------------------------------------------
  // CLASS 8
  // --------------------------------------------------------------------------
  8: {
    classNumber: 8,
    className: 'Class 8',
    questionCount: 4200,
    chaptersCount: 14,
    cbse: {
      boardCode: 'CBSE',
      boardName: 'Central Board of Secondary Education (CBSE)',
      framework: 'NCERT Mathematics Class 8 (2026-27)',
      status: 'verified',
      coveragePercentage: 100,
      curriculumEquivalent: 'Class 8 Middle/Upper School Mathematics',
      keyTopicsOverlap: [
        'Rational Numbers Properties (Closure, Commutative, Associative)',
        'Linear Equations in One Variable (Variable on Both Sides)',
        'Understanding Quadrilaterals (Parallelogram, Rhombus, Trapezium)',
        'Data Handling (Histograms, Pie Charts, Probability)',
        'Squares and Square Roots (Division Method, Prime Factorization)',
        'Cubes and Cube Roots',
        'Comparing Quantities (Discounts, Sales Tax/GST, Compound Interest)',
        'Algebraic Expressions and Identities ((a+b)², (a-b)², a²-b²)',
        'Mensuration (Surface Area & Volume of Cubes, Cuboids, Cylinders)',
        'Exponents and Powers (Negative Exponents & Laws)',
        'Direct and Inverse Proportions',
        'Factorisation (Common Factors, Splitting Middle Term, Identities)',
        'Introduction to Line Graphs & Cartesian Coordinates',
      ],
      boardSpecificNotes: '100% verified against NCERT Class 8 syllabus.',
    },
    icse: {
      boardCode: 'CISCE',
      boardName: 'Council for the Indian School Certificate Examinations (ICSE)',
      framework: 'CISCE Upper Middle School Mathematics (Class 8)',
      status: 'aligned',
      coveragePercentage: 88,
      curriculumEquivalent: 'ICSE Class 8 Mathematics',
      keyTopicsOverlap: [
        'Rational Numbers and Real Number Properties',
        'Exponents, Powers, and Radicals',
        'Square Roots and Cube Roots',
        'Compound Interest (Formulas and Applications)',
        'Algebraic Factorisation and Identities',
        'Linear Equations and Linear Inequations in One Variable',
        'Quadrilaterals, Parallelograms, and Polygons',
        'Area of Trapezium, Surface Area, and Volume of Cylinders',
        'Data Handling: Histograms, Frequency Polygons, Pie Charts',
      ],
      boardSpecificNotes: '88% match. ICSE introduces linear inequations (x ≤ 5, x ∈ N) and sets in Class 8.',
    },
    ib: {
      boardCode: 'IB',
      boardName: 'International Baccalaureate Middle Years Programme (IB MYP)',
      framework: 'IB MYP Mathematics Framework (MYP Year 3)',
      status: 'provisional',
      coveragePercentage: 82,
      curriculumEquivalent: 'IB MYP Year 3 Mathematics',
      keyTopicsOverlap: [
        'Scientific Notation and Exponential Laws',
        'Algebraic Identities, Expansion, and Factoring',
        'Linear Models, Graphing, and Rate of Change',
        '3D Surface Area, Volume, and Geometric Optimization',
        'Probability Models and Statistical Distributions',
      ],
      boardSpecificNotes: '82% conceptual alignment with MYP Year 3 assessment rubrics.',
    },
    comparativeSummary:
      'Class 8 serves as the foundation for secondary board examinations: compound interest, quadratic factorisation identities, direct/inverse proportions, and 3D solid mensuration.',
  },

  // --------------------------------------------------------------------------
  // CLASS 9
  // --------------------------------------------------------------------------
  9: {
    classNumber: 9,
    className: 'Class 9',
    questionCount: 4290,
    chaptersCount: 13,
    cbse: {
      boardCode: 'CBSE',
      boardName: 'Central Board of Secondary Education (CBSE)',
      framework: 'NCERT Class 9 Mathematics (2026-27 Framework)',
      status: 'verified',
      coveragePercentage: 100,
      curriculumEquivalent: 'Class 9 Secondary Board Preparation',
      keyTopicsOverlap: [
        'Number Systems (Irrational Numbers, Real Line, Surds Rationalization)',
        'Polynomials (Zeroes, Remainder & Factor Theorems, Identities)',
        'Coordinate Geometry (Cartesian Plane, Coordinates, Quadrants)',
        'Linear Equations in Two Variables (ax + by + c = 0, Graphs)',
        'Lines and Angles (Parallel Lines, Transversal, Angle Sum)',
        'Triangles (Congruence Criteria SAS, ASA, AAS, SSS, RHS)',
        'Quadrilaterals (Mid-Point Theorem, Parallelogram Properties)',
        'Circles (Chords, Subtended Angles, Cyclic Quadrilaterals)',
        'Heron’s Formula for Area of Triangles',
        'Surface Areas and Volumes (Cone, Sphere, Hemisphere, Cylinder)',
        'Statistics (Frequency Distributions & Graphical Plots)',
        'Probability (Empirical / Experimental Probability)',
      ],
      boardSpecificNotes: '100% verified against CBSE Class 9 curriculum and examination blueprints.',
    },
    icse: {
      boardCode: 'CISCE',
      boardName: 'Council for the Indian School Certificate Examinations (ICSE)',
      framework: 'ICSE Class 9 Mathematics Syllabus',
      status: 'aligned',
      coveragePercentage: 86,
      curriculumEquivalent: 'ICSE Class 9 Board Syllabus',
      keyTopicsOverlap: [
        'Rational & Irrational Numbers, Surds',
        'Compound Interest (Without and With Formula)',
        'Expansions and Factorisation of Polynomials',
        'Simultaneous Linear Equations in Two Variables',
        'Logarithms (Laws of Logarithms)',
        'Triangles: Congruency, Mid-point Theorem, Pythagoras',
        'Coordinate Geometry: Distance Formula and Equation of Line',
        'Trigonometry: Ratios of Standard Angles (30°, 45°, 60°)',
        'Mensuration: Perimeter, Area, and Volume of 3D solids',
        'Statistics and Mean/Median Calculation',
      ],
      boardSpecificNotes: '86% core alignment. ICSE includes Logarithms, Simultaneous Equations, and Introductory Trigonometry in Class 9 (which CBSE covers in Class 10/11).',
    },
    ib: {
      boardCode: 'IB',
      boardName: 'International Baccalaureate Middle Years Programme (IB MYP)',
      framework: 'IB MYP Standard & Extended Mathematics (MYP Year 4)',
      status: 'provisional',
      coveragePercentage: 84,
      curriculumEquivalent: 'IB MYP Year 4 Mathematics',
      keyTopicsOverlap: [
        'Radicals, Rational Exponents, and Number Sets',
        'Polynomial Expressions and Algebraic Manipulation',
        'Linear Systems and Coordinate Geometry Relationships',
        'Circle Theorems and Triangle Congruence Arguments',
        'Surface Area and Volume of Complex Composite Solids',
        'Bivariate Data, Scatter Plots, and Experimental Probability',
      ],
      boardSpecificNotes: '84% alignment with MYP Criterion A (Mathematical knowledge) and Criterion B (Patterns and conjectures).',
    },
    comparativeSummary:
      'Class 9 establishes rigorous geometric proof (triangles, quadrilaterals, circle chords) and algebraic machinery (factor theorem, rationalizing surds, 3D volume of cones and spheres).',
  },

  // --------------------------------------------------------------------------
  // CLASS 10
  // --------------------------------------------------------------------------
  10: {
    classNumber: 10,
    className: 'Class 10',
    questionCount: 4620,
    chaptersCount: 14,
    cbse: {
      boardCode: 'CBSE',
      boardName: 'Central Board of Secondary Education (CBSE)',
      framework: 'NCERT Class 10 Board Mathematics (2026-27 Standard & Basic)',
      status: 'verified',
      coveragePercentage: 100,
      curriculumEquivalent: 'Class 10 Board Examination (Standard & Basic)',
      keyTopicsOverlap: [
        'Real Numbers (Fundamental Theorem of Arithmetic, Irrationality Proofs)',
        'Polynomials (Zeroes & Coefficients Relationship, Cubic Roots)',
        'Pair of Linear Equations in Two Variables (Graphical, Substitution, Elimination)',
        'Quadratic Equations (Factorisation, Quadratic Formula, Discriminant D)',
        'Arithmetic Progressions (nth Term, Sum of First n Terms)',
        'Triangles (Basic Proportionality Theorem / Thales, Similarity AAA, SSS, SAS)',
        'Coordinate Geometry (Distance Formula, Section Formula)',
        'Introduction to Trigonometry (Ratios, Standard Angles, Pythagorean Identities)',
        'Applications of Trigonometry (Heights & Distances, Elevation/Depression)',
        'Circles & Tangents (Tangents from External Point Equality)',
        'Areas Related to Circles (Sectors, Segments, Arc Length)',
        'Surface Areas and Volumes (Combinations and Conversion of Solids)',
        'Statistics (Mean, Median, Mode of Grouped Data, Ogive Relations)',
        'Probability (Theoretical Classical Probability, Cards, Dice)',
      ],
      boardSpecificNotes: '100% verified against CBSE Class 10 Board guidelines (both Mathematics Standard and Mathematics Basic).',
    },
    icse: {
      boardCode: 'CISCE',
      boardName: 'Council for the Indian School Certificate Examinations (ICSE)',
      framework: 'ICSE Class 10 Board Examination Syllabus',
      status: 'aligned',
      coveragePercentage: 87,
      curriculumEquivalent: 'ICSE Class 10 Board Examination',
      keyTopicsOverlap: [
        'Quadratic Equations in One Variable',
        'Remainder and Factor Theorems',
        'Matrices (2x2 Matrices, Operations, Determinants)',
        'Arithmetic and Geometric Progressions (AP & GP)',
        'Coordinate Geometry: Reflection in Lines, Section & Midpoint, Equation of Line',
        'Similarity of Triangles and Maps/Models Scale Factor',
        'Loci and Tangents to Circles',
        'Mensuration: Cylinder, Cone, and Sphere Combinations',
        'Trigonometry: Identities and Heights & Distances',
        'Statistics: Histogram, Ogive (Median, Quartiles)',
        'Probability: Sample Space and Classical Calculations',
      ],
      boardSpecificNotes: '87% core overlap. ICSE adds Commercial Mathematics (GST, Banking Recurring Deposits, Shares and Dividends), Matrices, and Reflection in Class 10.',
    },
    ib: {
      boardCode: 'IB',
      boardName: 'International Baccalaureate Middle Years Programme (IB MYP)',
      framework: 'IB MYP Year 5 (eAssessment & MYP Certificate)',
      status: 'provisional',
      coveragePercentage: 85,
      curriculumEquivalent: 'IB MYP Year 5 Mathematics (Standard & Extended)',
      keyTopicsOverlap: [
        'Quadratic Relations, Factorisation, and Parabolic Graphs',
        'Exponential and Arithmetic Progressions',
        'Coordinate Geometry, Distance, and Gradient Relationships',
        'Trigonometric Functions, Sine/Cosine Rules, and 3D Applications',
        'Similarity, Transformations, and Circle Theorems',
        'Grouped Data Analysis, Standard Deviation, and Theoretical Probability',
      ],
      boardSpecificNotes: '85% alignment with MYP Year 5 on-screen eAssessment criteria. Covers common core analytical and problem-solving skills.',
    },
    comparativeSummary:
      'Class 10 is the major secondary benchmark across all three systems. Over 87% of core topics—quadratic equations, trigonometry, similarity, coordinate geometry, surface areas, and probability—are universally assessed across CBSE, ICSE, and IB.',
  },

  // --------------------------------------------------------------------------
  // CLASS 11
  // --------------------------------------------------------------------------
  11: {
    classNumber: 11,
    className: 'Class 11',
    questionCount: 4340,
    chaptersCount: 14,
    cbse: {
      boardCode: 'CBSE',
      boardName: 'Central Board of Secondary Education (CBSE)',
      framework: 'NCERT Class 11 Mathematics (2026-27 Senior Secondary)',
      status: 'verified',
      coveragePercentage: 100,
      curriculumEquivalent: 'Class 11 Senior Secondary Mathematics',
      keyTopicsOverlap: [
        'Sets (Subsets, Power Set, Union, Intersection, Venn Diagrams)',
        'Relations and Functions (Cartesian Product, Domain, Range, Function Types)',
        'Trigonometric Functions (Radian Measure, Compound Angles, Multiple Formulas)',
        'Complex Numbers and Quadratic Equations (i Powers, Modulus, Conjugate)',
        'Linear Inequalities (One and Two Variables Graphical Solution)',
        'Permutations and Combinations (nPr, nCr, Combinatorial Principles)',
        'Binomial Theorem (General and Middle Terms)',
        'Sequences and Series (AP, GP, Infinite GP, Means)',
        'Straight Lines (Slope, Intercept, Normal Form, Angle Between Lines)',
        'Conic Sections (Circle, Parabola, Ellipse, Hyperbola Equations)',
        'Introduction to Three-Dimensional Geometry (Coordinates, Distance, Section)',
        'Limits and Derivatives (First Principle, Product/Quotient Rules)',
        'Statistics (Measures of Dispersion, Mean Deviation, Variance, Std Dev)',
        'Probability (Axiomatic Approach, Addition Theorem)',
      ],
      boardSpecificNotes: '100% verified against CBSE Class 11 Senior Secondary syllabus.',
    },
    icse: {
      boardCode: 'CISCE',
      boardName: 'Council for the Indian School Certificate Examinations (ISC)',
      framework: 'ISC Class 11 Mathematics (Section A, B, C)',
      status: 'aligned',
      coveragePercentage: 88,
      curriculumEquivalent: 'ISC Class 11 Mathematics',
      keyTopicsOverlap: [
        'Sets, Relations, and Functions',
        'Trigonometric Functions and Compound Angles',
        'Complex Numbers and Quadratic Inequations',
        'Permutations, Combinations, and Binomial Theorem',
        'Sequences and Series (AP, GP, Special Series)',
        'Straight Lines and Circles',
        'Conic Sections (Parabola, Ellipse, Hyperbola)',
        'Calculus: Limits and Differentiation',
        'Statistics: Standard Deviation and Combined Mean',
        'Probability: Axiomatic Definition',
      ],
      boardSpecificNotes: '88% match with ISC Section A. ISC offers Section B (Conics/Vectors) or Section C (Commerce applications: Statistics/Index Numbers).',
    },
    ib: {
      boardCode: 'IB',
      boardName: 'International Baccalaureate Diploma Programme (IB DP)',
      framework: 'IB DP Mathematics: Analysis and Approaches (AA) & Applications (AI) Year 1',
      status: 'provisional',
      coveragePercentage: 82,
      curriculumEquivalent: 'IB DP Year 1 Mathematics (SL & HL)',
      keyTopicsOverlap: [
        'Topic 1: Number & Algebra (Sequences/Series, Binomial, Complex Numbers for HL)',
        'Topic 2: Functions (Domain, Range, Inverse, Composition, Graphing)',
        'Topic 3: Geometry & Trigonometry (Radian Measure, Trig Identities, Vectors)',
        'Topic 4: Statistics & Probability (Dispersion, Permutations, Axiomatic Probability)',
        'Topic 5: Calculus (Limits, First Principle, Power/Product/Quotient Rules)',
      ],
      boardSpecificNotes: '82% conceptual alignment with IB DP Math AA and AI courses across the 5 core IB syllabus topics.',
    },
    comparativeSummary:
      'Class 11 forms the cornerstone of advanced STEM mathematics: differential calculus, sequences and series, permutations & combinations, conic sections, and axiomatic probability.',
  },

  // --------------------------------------------------------------------------
  // CLASS 12
  // --------------------------------------------------------------------------
  12: {
    classNumber: 12,
    className: 'Class 12',
    questionCount: 4160,
    chaptersCount: 13,
    cbse: {
      boardCode: 'CBSE',
      boardName: 'Central Board of Secondary Education (CBSE)',
      framework: 'NCERT Class 12 Senior Secondary Mathematics (2026-27)',
      status: 'verified',
      coveragePercentage: 100,
      curriculumEquivalent: 'Class 12 Senior Secondary & JEE/CUET Foundation',
      keyTopicsOverlap: [
        'Relations and Functions (Equivalence Relations, Bijective Functions)',
        'Inverse Trigonometric Functions (Principal Value Branches, Properties)',
        'Matrices (Operations, Transpose, Inverses, Symmetric/Skew-Symmetric)',
        'Determinants (Minors, Cofactors, Adjoint, Inverse, System of Equations)',
        'Continuity and Differentiability (Chain Rule, Implicit, Logarithmic, Second Derivative)',
        'Applications of Derivatives (Rate of Change, Increasing/Decreasing, Tangents, Maxima/Minima)',
        'Integrals (Indefinite Integrals, Substitution, By Parts, Partial Fractions, Definite Integrals)',
        'Applications of Integrals (Area Under Simple Curves and Between Curves)',
        'Differential Equations (Order, Degree, Variable Separable, Homogeneous, Linear DE)',
        'Vector Algebra (Dot Product, Cross Product, Projections)',
        'Three-Dimensional Geometry (Direction Cosines, Equation of Line & Plane, Shortest Distance)',
        'Linear Programming (Corner Point Method, Feasible Region, Bounded/Unbounded)',
        'Probability (Conditional Probability, Multiplication Rule, Bayes’ Theorem, Distributions)',
      ],
      boardSpecificNotes: '100% verified against CBSE Class 12 Board examination and national entrance (JEE/CUET) frameworks.',
    },
    icse: {
      boardCode: 'CISCE',
      boardName: 'Council for the Indian School Certificate Examinations (ISC)',
      framework: 'ISC Class 12 Mathematics (Sections A, B & C)',
      status: 'aligned',
      coveragePercentage: 89,
      curriculumEquivalent: 'ISC Class 12 Board Examination',
      keyTopicsOverlap: [
        'Relations, Functions, and Inverse Trigonometry',
        'Matrices, Determinants, and Matrix Inverses',
        'Differential Calculus (Chain Rule, Second Derivatives, Maxima and Minima)',
        'Integral Calculus (Definite and Indefinite Integrals, Properties, Area Under Curves)',
        'Differential Equations (Variable Separable, Linear Equations with IF)',
        'Probability (Conditional Probability, Bayes’ Theorem, Binomial Distribution)',
        'Section B: Vectors and 3D Geometry (Lines & Planes)',
        'Section C: Application of Calculus in Commerce (Cost & Revenue Functions) and Linear Programming',
      ],
      boardSpecificNotes: '89% direct alignment with Section A and B/C. ISC includes commerce-oriented calculus applications in Section C.',
    },
    ib: {
      boardCode: 'IB',
      boardName: 'International Baccalaureate Diploma Programme (IB DP)',
      framework: 'IB DP Mathematics: Analysis and Approaches (AA) & Applications (AI) Year 2',
      status: 'provisional',
      coveragePercentage: 84,
      curriculumEquivalent: 'IB DP Year 2 Mathematics (SL & HL Exam Year)',
      keyTopicsOverlap: [
        'Advanced Calculus: Chain Rule, Optimization (Maxima/Minima), Kinematics',
        'Integration Techniques: Substitution, Integration by Parts, Volumes of Revolution',
        'Differential Equations: First-order Separable and Integrating Factor',
        'Vector Geometry: Dot Product, Cross Product, Lines and Planes in 3D',
        'Probability Distributions: Discrete Random Variables, Normal Distribution, Bayes’ Theorem',
      ],
      boardSpecificNotes: '84% alignment with IB DP Math AA and AI higher-order application criteria. Questions feature full step-by-step derivations matching IB mark-scheme standards.',
    },
    comparativeSummary:
      'Class 12 is dominated by advanced calculus, vector algebra, matrices, and Bayes’ probability across CBSE, ISC, and IB DP. Over 85% of concepts are identical, differing primarily in exam format and international contextualization.',
  },
}

export function getBoardAlignmentForClass(classNumber: number): ClassBoardAlignmentDetail | undefined {
  return CLASS_WISE_BOARD_ALIGNMENT[classNumber]
}

export function getAllBoardAlignments(): ClassBoardAlignmentDetail[] {
  return Object.values(CLASS_WISE_BOARD_ALIGNMENT)
}
