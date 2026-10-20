export interface CourseModule {
  id: string
  title: string
  description: string
  position: number
  lessons: CourseLesson[]
}

export interface CourseLesson {
  id: string
  title: string
  description: string
  lessonType: 'video' | 'text' | 'code' | 'quiz' | 'project'
  durationMinutes: number
  position: number
  isCompleted?: boolean
  contentBody?: string
  contentUrl?: string
}

// Curriculum data for Programmes A, B, C, D
export const PROGRAMME_CURRICULUM: Record<string, { title: string; modules: CourseModule[] }> = {
  'ai-development': {
    title: 'AI Development & Automation',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Foundations of Modern Software & Python',
        description: 'Clean coding, asynchronous runtime, modular architecture, and git workflows.',
        position: 1,
        lessons: [
          {
            id: 'les-101',
            title: '1.1 Architecture of Production Web Applications',
            description: 'Client-server boundaries, REST APIs, and event-driven backends.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# Architecture of Production Web Applications\n\nModern software development requires a firm understanding of system boundaries, state management, and asynchronous data flows.\n\n### Key Concepts\n- **Client-Server Boundaries**: Keep secrets on the server. Never expose service credentials in client bundles.\n- **Idempotency**: Ensure state transformations can be retried safely without unintended side effects.\n- **Stateless Services**: Scale web servers horizontally by externalizing session state into databases and signed cookies.',
          },
          {
            id: 'les-102',
            title: '1.2 Advanced Python & Data Structures for AI',
            description: 'Typing, generators, decorators, and high-performance NumPy/Pandas foundations.',
            lessonType: 'code',
            durationMinutes: 60,
            position: 2,
            contentBody:
              '# Python Data Structures for AI\n\n```python\nfrom typing import List, Dict, Any\nimport time\n\ndef time_execution(func):\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(f"{func.__name__} took {time.perf_counter() - start:.4f}s")\n        return result\n    return wrapper\n\n@time_execution\ndef process_batch(items: List[Dict[str, Any]]) -> List[str]:\n    return [item["title"].strip().upper() for item in items if "title" in item]\n```',
          },
          {
            id: 'les-103',
            title: '1.3 Module 1 Knowledge Check & Quiz',
            description: 'Evaluate core comprehension of software boundaries and typing.',
            lessonType: 'quiz',
            durationMinutes: 20,
            position: 3,
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: Practical AI Development & RAG Systems',
        description: 'Embeddings, vector indexing (pgvector), chunking, prompt engineering, and reranking.',
        position: 2,
        lessons: [
          {
            id: 'les-201',
            title: '2.1 Vector Search & Retrieval Foundations',
            description: 'High-dimensional embeddings, cosine similarity, and chunking trade-offs.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 1,
            contentBody:
              '# Retrieval-Augmented Generation (RAG)\n\nRetrieval-augmented generation grounds language models on authenticated, up-to-date domain documents.\n\n### The RAG Pipeline\n1. **Document Ingestion & Chunking**: Chunk size between 500-1000 tokens with 10% overlap.\n2. **Vector Indexing**: Generate embeddings and index using PostgreSQL pgvector (`ivfflat` or `hnsw`).\n3. **Tenant Security Filter**: Always apply SQL WHERE tenant_id/user_id constraints BEFORE semantic search!\n4. **Context Injection**: Feed only the relevant top-K passages into the prompt.',
          },
          {
            id: 'les-202',
            title: '2.2 Building Supervised Tool-Calling AI Agents',
            description: 'Structured outputs with Zod, bounded loops, and human-in-the-loop safeguards.',
            lessonType: 'code',
            durationMinutes: 75,
            position: 2,
            contentBody:
              '# Supervised Agent Execution Loop\n\nEnsure tool execution is strictly validated against an explicit whitelist and never loops indefinitely without bounds.',
          },
        ],
      },
    ],
  },
  'healthcare-tech': {
    title: 'Healthcare Technology',
    modules: [
      {
        id: 'hc-mod-1',
        title: 'Module 1: Foundations of Health Informatics & Clinical Systems',
        description: 'Electronic health records, clinical terminology, and secure hospital workflows.',
        position: 1,
        lessons: [
          {
            id: 'hc-101',
            title: '1.1 Architecture of Health Information Systems (HIS)',
            description: 'Patient demographics, clinical records, and electronic health record boundaries.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# Architecture of Health Information Systems\n\nHealthcare software engineering demands distinct reliability, auditability, and safety boundaries.\n\n### Clinical Workflows\n- **EHR vs EMR**: Understanding the shift from siloed electronic medical records to interoperable electronic health records.\n- **Data Integrity**: Auditable event logs for every read and update to patient diagnostic records.\n- **Regulatory Boundaries**: Healthcare technology products assist workflows; they do not replace clinical physician judgment.',
          },
          {
            id: 'hc-102',
            title: '1.2 HL7 FHIR Protocols & Data Exchange APIs',
            description: 'Working with Fast Healthcare Interoperability Resources (FHIR) JSON schemas.',
            lessonType: 'code',
            durationMinutes: 60,
            position: 2,
            contentBody:
              '# Working with HL7 FHIR Resources\n\n```json\n{\n  "resourceType": "Patient",\n  "id": "tx-pat-8842",\n  "active": true,\n  "name": [{\n    "use": "official",\n    "family": "Verma",\n    "given": ["Rohan"]\n  }],\n  "gender": "male",\n  "birthDate": "1994-06-15"\n}\n```\n\nFHIR allows standardized clinical exchange between hospital management systems, laboratories, and patient apps.',
          },
          {
            id: 'hc-103',
            title: '1.3 Health Informatics Quiz & Knowledge Assessment',
            description: 'Evaluate comprehension of FHIR resources and patient data confidentiality.',
            lessonType: 'quiz',
            durationMinutes: 20,
            position: 3,
          },
        ],
      },
      {
        id: 'hc-mod-2',
        title: 'Module 2: Ayushman Bharat Digital Mission (ABDM) & Health AI',
        description: 'ABHA IDs, Consent Managers, privacy compliance under DPDP Act 2023, and ethical AI.',
        position: 2,
        lessons: [
          {
            id: 'hc-201',
            title: '2.1 India’s ABDM Architecture & Consent Management',
            description: 'Implementing token-based consent flows and secure longitudinal health data sharing.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 1,
            contentBody:
              '# India ABDM Ecosystem\n\nABDM establishes an open digital health infrastructure across India.\n\n### Key Ecosystem Entities\n- **Health Information User (HIU)**: Applications requesting access to patient health records.\n- **Health Information Provider (HIP)**: Hospitals and diagnostic labs holding patient records.\n- **Consent Manager**: Architectural intermediary securing explicit, revocable patient permission prior to data transmission.',
          },
        ],
      },
    ],
  },
  'entrepreneurship': {
    title: 'Entrepreneurship & Small-Business Digitization',
    modules: [
      {
        id: 'ent-mod-1',
        title: 'Module 1: Digital Storefronts & Cloud Commerce',
        description: 'Product catalogs, order pipelines, payment gateways, and automated invoice delivery.',
        position: 1,
        lessons: [
          {
            id: 'ent-101',
            title: '1.1 Modern Digital Storefront Architecture',
            description: 'Customer ordering journeys, product catalogs, and conversion funnel optimization.',
            lessonType: 'text',
            durationMinutes: 40,
            position: 1,
            contentBody:
              '# Building Digital Storefronts for Small Enterprises\n\nDigitization begins by removing friction from the purchase transaction.\n\n### Fundamentals of Digital Commerce\n- **Inventory Synchronization**: Real-time stock counts preventing customer over-ordering.\n- **Checkout Optimization**: Minimal fields with automated PIN code validation and mobile OTPs.\n- **Multi-Channel Distribution**: Integrating website storefronts with direct messaging channels.',
          },
          {
            id: 'ent-102',
            title: '1.2 Payment Gateways, Webhooks & GST Automated Invoicing',
            description: 'Implementing Razorpay UPI integrations and compliant tax calculation.',
            lessonType: 'code',
            durationMinutes: 55,
            position: 2,
            contentBody:
              '# Automated Invoicing & Payment Webhooks\n\nPayment confirmation must be handled asynchronously via signed webhooks to guarantee zero dropped orders even when customer browsers disconnect.',
          },
        ],
      },
      {
        id: 'ent-mod-2',
        title: 'Module 2: Customer CRM & Operational Automation',
        description: 'Lead tracking, customer lifetime value, and automated repeat-order campaigns.',
        position: 2,
        lessons: [
          {
            id: 'ent-201',
            title: '2.1 Small Enterprise CRM & Pipeline Automation',
            description: 'Setting up persistent customer tracking, lead scoring, and automated follow-ups.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# Customer Relationship Management for MSMEs\n\nA small enterprise grows predictably when customer interactions are tracked systematically.\n\n### Core Workflows\n- **Lead Ingestion**: Capturing inquiries from web forms, WhatsApp, and telephone into a centralized database.\n- **Automated Service Reminders**: Timely notifications for subscription renewals and reorders.\n- **Delinquency Recovery**: Automated polite reminders for outstanding invoices.',
          },
        ],
      },
    ],
  },
  'class-9-foundation': {
    title: 'Class 9 Foundation Programme',
    modules: [
      {
        id: 'c9-mod-physics',
        title: 'Subject 1: Physics — Concepts, Problem Solving & Real-Life Applications',
        description: 'Kinematics, Newton’s laws of motion, gravitation, work, power, and wave acoustic fundamentals.',
        position: 1,
        lessons: [
          {
            id: 'c9-phy-101',
            title: '1.1 Describing Motion: Distance, Displacement & Acceleration',
            description: 'Uniform and non-uniform motion, distance-time graphs, and velocity-time derivations.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# Kinematics & The 3 Equations of Motion\n\nMotion in Class 9 forms the unshakeable cornerstone of classical mechanics needed for NEET and JEE.\n\n### The Fundamental Equations\nFor uniform acceleration $a$, initial velocity $u$, final velocity $v$, time $t$, and displacement $s$:\n1. $$v = u + at$$\n2. $$s = ut + \\frac{1}{2}at^2$$\n3. $$v^2 = u^2 + 2as$$\n\n### Real-Life Application Lab\nWhen a car travelling at $20\\text{ m/s}$ applies emergency brakes causing a deceleration of $4\\text{ m/s}^2$:\n- Time to stop: $t = \\frac{v - u}{a} = \\frac{0 - 20}{-4} = 5\\text{ s}$\n- Stopping distance: $s = \\frac{v^2 - u^2}{2a} = \\frac{0 - 400}{2(-4)} = 50\\text{ m}$',
          },
          {
            id: 'c9-phy-102',
            title: '1.2 Force & Newton’s Three Laws of Motion',
            description: 'Inertia, momentum, action-reaction pairs, and the law of conservation of momentum.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 2,
            contentBody:
              '# Dynamics: Force & Laws of Motion\n\nNewton’s second law establishes the mathematical definition of force: $F = ma = \\frac{dp}{dt}$.\n\n### The Conservation of Momentum\nIn an isolated system without external forces:\n$$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$$\n\n**NEET/JEE Foundation Insight**: Recoil velocity of a gun of mass $M$ firing bullet of mass $m$ with velocity $v$ is $V = -\\frac{mv}{M}$.',
          },
          {
            id: 'c9-phy-103',
            title: '1.3 Gravitation, Free Fall & Archimedes’ Principle',
            description: 'Universal law of gravitation, acceleration due to gravity g, thrust, pressure, and buoyancy.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 3,
            contentBody:
              '# Gravitation & Floatation\n\nEvery object attracts every other object with a force proportional to the product of their masses and inversely proportional to the square of distance:\n$$F = G \\frac{M m}{R^2}$$\nwhere $G = 6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$.\n\n### Archimedes’ Principle\nWhen a body is immersed fully or partially in a fluid, it experiences an upward buoyant force equal to the weight of the fluid displaced by it.',
          },
          {
            id: 'c9-phy-104',
            title: '1.4 Physics Problem Solving & Interactive Calculations',
            description: 'Solve numerical problems on kinetic energy, work done, and power with Super AI guidance.',
            lessonType: 'code',
            durationMinutes: 40,
            position: 4,
            contentBody:
              '# Physics Computational Problem Solving\n\n```python\n# Calculate Work, Kinetic Energy and Stopping Distance\ndef calculate_mechanics(mass_kg, initial_velocity_mps, braking_force_n):\n    ke_initial = 0.5 * mass_kg * (initial_velocity_mps ** 2)\n    acceleration = -braking_force_n / mass_kg\n    stopping_distance = ke_initial / braking_force_n\n    time_to_stop = initial_velocity_mps / abs(acceleration)\n    return {\n        "Kinetic Energy (J)": ke_initial,\n        "Deceleration (m/s^2)": abs(acceleration),\n        "Stopping Distance (m)": stopping_distance,\n        "Time to Stop (s)": time_to_stop\n    }\n\nprint(calculate_mechanics(1200, 25, 6000))\n```',
          },
          {
            id: 'c9-phy-105',
            title: '1.5 Physics Chapter-Wise Mastery & Diagnostic Test',
            description: 'Assess velocity-time graphs, numerical mechanics, and Newton’s laws.',
            lessonType: 'quiz',
            durationMinutes: 25,
            position: 5,
          },
        ],
      },
      {
        id: 'c9-mod-chemistry',
        title: 'Subject 2: Chemistry — Concept Clarity, Numerical Practice & Practical Insight',
        description: 'States of matter, mixtures, solutions, atoms, molecules, the mole concept, and atomic structure.',
        position: 2,
        lessons: [
          {
            id: 'c9-chm-201',
            title: '2.1 Matter in Our Surroundings & Is Matter Around Us Pure',
            description: 'Latent heat, evaporation, solutions, suspensions, colloids, and Tyndall effect.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# Matter, Solutions & Colloids\n\nClass 9 Chemistry bridges empirical observation to microscopic particle models.\n\n### Key Classifications\n- **True Solution**: Homogeneous, particle size $< 1\\text{ nm}$, does not scatter light.\n- **Colloid**: Heterogeneous, particle size $1\\text{ nm} - 1000\\text{ nm}$, shows Tyndall effect.\n- **Suspension**: Heterogeneous, particle size $> 1000\\text{ nm}$, particles settle under gravity.',
          },
          {
            id: 'c9-chm-202',
            title: '2.2 Atoms, Molecules & The Mole Concept',
            description: 'Law of chemical combination, molecular mass calculations, and Avogadro constant.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 2,
            contentBody:
              '# The Mole Concept\n\n1 mole contains exactly $6.022 \\times 10^{23}$ elementary entities (Avogadro constant $N_A$).\n\n$$\\text{Number of Moles } (n) = \\frac{\\text{Given Mass } (m)}{\\text{Molar Mass } (M)} = \\frac{\\text{Number of Particles } (N)}{N_A}$$\n\n**Example**: Find the mass of $0.5$ moles of Water ($H_2O$):\n- Molar mass of $H_2O = 2(1) + 16 = 18\\text{ g/mol}$\n- $\\text{Mass } = 0.5 \\times 18 = 9\\text{ g}$.',
          },
          {
            id: 'c9-chm-203',
            title: '2.3 Structure of the Atom: Rutherford, Bohr & Isotopes',
            description: 'Subatomic particles, Thomson’s model, Rutherford’s scattering experiment, Bohr model, and valency.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 3,
            contentBody:
              '# Atomic Architecture\n\n- **Atomic Number ($Z$)**: Number of protons in the nucleus.\n- **Mass Number ($A$)**: Sum of protons and neutrons in the nucleus ($A = Z + N$).\n- **Electronic Distribution (Bohr-Bury Rule)**: Maximum electrons in orbit $n$ is $2n^2$.\n- **Valency**: Combining capacity determined by valence shell electrons.',
          },
          {
            id: 'c9-chm-204',
            title: '2.4 Chemistry Numerical Problem Set & Lab Insights',
            description: 'Mole calculations, valency determination, and chapter-wise chemistry quiz.',
            lessonType: 'quiz',
            durationMinutes: 25,
            position: 4,
          },
        ],
      },
      {
        id: 'c9-mod-biology',
        title: 'Subject 3: Biology — NCERT Focus, Diagrams & Application for NEET',
        description: 'The fundamental unit of life (cell), plant & animal tissues, and food resource enhancement.',
        position: 3,
        lessons: [
          {
            id: 'c9-bio-301',
            title: '3.1 The Fundamental Unit of Life: Cell Structure & Organelles',
            description: 'Prokaryotes vs eukaryotes, osmosis, plasma membrane, nucleus, mitochondria, and plastids.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 1,
            contentBody:
              '# Cell: The Unit of Life (NEET Anchor Topic)\n\nClass 9 cell biology accounts for fundamental NEET marks.\n\n### Essential Organelles & Functions\n- **Mitochondria**: Cellular respiration & ATP synthesis (contains its own DNA & ribosomes).\n- **Lysosomes**: Suicidal bags with hydrolytic digestive enzymes.\n- **Endoplasmic Reticulum (RER & SER)**: Protein and lipid synthesis; detoxification.\n- **Golgi Apparatus**: Storage, modification, and packaging of secretory proteins.',
          },
          {
            id: 'c9-bio-302',
            title: '3.2 Plant & Animal Tissues: Structure & Functions',
            description: 'Meristematic tissues, parenchyma, collenchyma, sclerenchyma, xylem, phloem, and animal tissues.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 2,
            contentBody:
              '# Tissues: Plant vs Animal\n\n### Complex Permanent Plant Tissues\n- **Xylem**: Conducts water & minerals un-directionally (Tracheids, Vessels, Xylem Parenchyma, Xylem Fibres).\n- **Phloem**: Translocates organic food bi-directionally (Sieve tubes, Companion cells, Phloem parenchyma, Phloem fibres).\n\n### Animal Tissues\nEpithelial, Connective (blood, bone, cartilage, tendon, ligament), Muscular (striated, unstriated, cardiac), and Nervous tissue.',
          },
          {
            id: 'c9-bio-303',
            title: '3.3 Biology Diagram Lab & NCERT Line-by-Line Quiz',
            description: 'Test identification of cell organelles, tissue cross-sections, and NEET-style conceptual MCQs.',
            lessonType: 'quiz',
            durationMinutes: 25,
            position: 3,
          },
        ],
      },
      {
        id: 'c9-mod-math',
        title: 'Subject 4: Mathematics — Fundamentals, Advanced Problem Solving & Logical Thinking',
        description: 'Real numbers, polynomials, coordinate geometry, linear equations, congruence proofs, and surface areas.',
        position: 4,
        lessons: [
          {
            id: 'c9-mat-401',
            title: '4.1 Real Numbers, Rationalisation & Laws of Exponents',
            description: 'Irrational numbers, representation on number line, rationalising the denominator, and radical exponents.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 1,
            contentBody:
              '# Number Systems & Rationalisation\n\n### Rationalising Surds\nTo rationalise $\\frac{1}{\\sqrt{a} + \\sqrt{b}}$, multiply numerator and denominator by conjugate $(\\sqrt{a} - \\sqrt{b})$:\n$$\\frac{1}{\\sqrt{a} + \\sqrt{b}} \\times \\frac{\\sqrt{a} - \\sqrt{b}}{\\sqrt{a} - \\sqrt{b}} = \\frac{\\sqrt{a} - \\sqrt{b}}{a - b}$$\n\n**Laws of Exponents**:\n- $a^m \\cdot a^n = a^{m+n}$\n- $(a^m)^n = a^{mn}$\n- $\\frac{a^m}{a^n} = a^{m-n}$',
          },
          {
            id: 'c9-mat-402',
            title: '4.2 Polynomials & Algebraic Identities for Competitive Exams',
            description: 'Zeroes of polynomials, remainder theorem, factor theorem, and 8 standard algebraic identities.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 2,
            contentBody:
              '# Polynomials & Factorisation\n\n### Essential Algebraic Identities\n1. $(a+b+c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca$\n2. $(a+b)^3 = a^3 + b^3 + 3ab(a+b)$\n3. $(a-b)^3 = a^3 - b^3 - 3ab(a-b)$\n4. $a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca)$\n\n*Special Case*: If $a+b+c = 0$, then $a^3 + b^3 + c^3 = 3abc$.',
          },
          {
            id: 'c9-mat-403',
            title: '4.3 Lines, Angles & Triangle Congruence Theorems',
            description: 'Angle sum property, parallel lines transversal relations, and SAS, ASA, AAS, SSS, RHS proofs.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 3,
            contentBody:
              '# Euclidean Geometry & Triangle Congruence\n\nTwo triangles are congruent if all corresponding sides and angles are equal.\n\n### Strict Congruence Criteria\n- **SAS**: Two sides and included angle.\n- **ASA**: Two angles and included side.\n- **AAS**: Two angles and non-included side.\n- **SSS**: Three pairs of sides equal.\n- **RHS**: Right angle, hypotenuse, and one side.\n\n*Note*: AAA and SSA do NOT guarantee congruence!',
          },
          {
            id: 'c9-mat-404',
            title: '4.4 Surface Areas, Volumes & Statistics',
            description: 'Cylinders, cones, spheres, histograms, and frequency polygon data presentation.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 4,
            contentBody:
              '# Mensuration Formulas\n\n- **Right Circular Cylinder**: Curved Area $= 2\\pi r h$, Total $= 2\\pi r(r+h)$, Volume $= \\pi r^2 h$\n- **Right Circular Cone**: Slant height $l = \\sqrt{r^2 + h^2}$, Curved Area $= \\pi r l$, Volume $= \\frac{1}{3}\\pi r^2 h$\n- **Sphere**: Total Surface Area $= 4\\pi r^2$, Volume $= \\frac{4}{3}\\pi r^3$\n- **Hemisphere**: Curved $= 2\\pi r^2$, Total $= 3\\pi r^2$, Volume $= \\frac{2}{3}\\pi r^3$',
          },
          {
            id: 'c9-mat-405',
            title: '4.5 Mathematics Problem Challenge & Diagnostic Test',
            description: 'Timed multi-step problem solving test with detailed step-by-step solutions.',
            lessonType: 'quiz',
            durationMinutes: 30,
            position: 5,
          },
        ],
      },
      {
        id: 'c9-mod-english',
        title: 'Subject 5: English & Communication — Reading, Writing, Comprehension & Presentation',
        description: 'Advanced comprehension, applied grammar, creative expression, and confident spoken presentation skills.',
        position: 5,
        lessons: [
          {
            id: 'c9-eng-501',
            title: '5.1 Reading Comprehension & Inference Strategies',
            description: 'Discursive and analytical passages, vocabulary deduction in context, and speed reading.',
            lessonType: 'text',
            durationMinutes: 40,
            position: 1,
            contentBody:
              '# Critical Reading Comprehension\n\nLearn to extract factual, inferential, and evaluative insights from complex texts under time constraints.',
          },
          {
            id: 'c9-eng-502',
            title: '5.2 Applied Grammar: Tenses, Modals & Subject-Verb Concord',
            description: 'Sentence correction, error detection, reported speech transformation, and determiners.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 2,
            contentBody:
              '# Applied Grammar for Flawless Writing\n\nMaster Subject-Verb Concord rules and direct-to-indirect speech transformation for board exams and essays.',
          },
          {
            id: 'c9-eng-503',
            title: '5.3 Spoken English, Articulation & Vocabulary Test',
            description: 'Public speaking structures, debate rebuttal techniques, and vocabulary mastery quiz.',
            lessonType: 'quiz',
            durationMinutes: 20,
            position: 3,
          },
        ],
      },
      {
        id: 'c9-mod-aptitude',
        title: 'Subject 6: Logical Reasoning & Aptitude — Practice Tests & Competitive Exam Prep',
        description: 'Verbal reasoning, non-verbal matrices, number series, coding-decoding, and Olympiad puzzles.',
        position: 6,
        lessons: [
          {
            id: 'c9-apt-601',
            title: '6.1 Verbal Reasoning: Series, Analogies & Coding-Decoding',
            description: 'Letter and number sequences, pattern recognition, and cipher decoding techniques.',
            lessonType: 'text',
            durationMinutes: 40,
            position: 1,
            contentBody:
              '# Verbal Reasoning for Olympiads & NTSE\n\nLearn systematic position numbering (A=1, Z=26) and difference-of-differences logic for number series.',
          },
          {
            id: 'c9-apt-602',
            title: '6.2 Analytical Reasoning: Venn Diagrams, Syllogisms & Seating Puzzles',
            description: 'Deductive logic diagrams, direction sense tests, and constraint-satisfaction seating layouts.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 2,
            contentBody:
              '# Analytical Puzzles & Syllogisms\n\nUse Venn diagram intersections to test truth values of syllogistic statements reliably without fallacy.',
          },
          {
            id: 'c9-apt-603',
            title: '6.3 Logical Reasoning Speed Simulation & Olympiad Test',
            description: 'Timed 25-question mental ability test with speed-accuracy score breakdown.',
            lessonType: 'quiz',
            durationMinutes: 30,
            position: 3,
          },
        ],
      },
      {
        id: 'c9-mod-strategy',
        title: 'Subject 7: Study Skills & Exam Strategy — Time Management, Techniques & Future Planning',
        description: 'Active recall, spaced repetition, error logs, and the 4-year NEET/JEE academic foundation roadmap.',
        position: 7,
        lessons: [
          {
            id: 'c9-str-701',
            title: '7.1 Scientific Learning Habits: Active Recall & Spaced Repetition',
            description: 'Evidence-based cognitive retention techniques: flashcard Leitner systems and Feynman technique.',
            lessonType: 'text',
            durationMinutes: 35,
            position: 1,
            contentBody:
              '# The Science of Long-Term Memory\n\nPassive reading leads to rapid decay (Ebbinghaus forgetting curve). Active retrieval produces neural consolidation.\n\n### The 1-3-7-30 Spaced Repetition Schedule\n- **Day 1**: Learn concept in live class & solve 5 practice questions.\n- **Day 3**: Self-test with closed book flashcard questions.\n- **Day 7**: Solve mixed-topic timed quiz.\n- **Day 30**: Comprehensive revision and error log update.',
          },
          {
            id: 'c9-str-702',
            title: '7.2 The Error Notebook & Stress-Free Exam Conditioning',
            description: 'Root-cause categorization: conceptual errors vs calculation errors vs question misreadings.',
            lessonType: 'text',
            durationMinutes: 35,
            position: 2,
            contentBody:
              '# The High-Achiever’s Error Notebook\n\nTop performers in NEET and JEE maintain an error diary analyzing why every missed mark occurred.',
          },
          {
            id: 'c9-str-703',
            title: '7.3 Class 9 to 12 NEET/JEE Master Roadmap & Milestone Assessment',
            description: 'Year-by-year academic targets and foundation readiness milestone evaluation.',
            lessonType: 'quiz',
            durationMinutes: 20,
            position: 3,
          },
        ],
      },
    ],
  },
  'school-foundation': {
    title: 'Class 9 Foundation Programme',
    modules: [
      {
        id: 'c9-mod-physics-sf',
        title: 'Subject 1: Physics — Concepts, Problem Solving & Real-Life Applications',
        description: 'Kinematics, Newton’s laws of motion, gravitation, work, power, and wave acoustic fundamentals.',
        position: 1,
        lessons: [
          {
            id: 'c9-phy-101-sf',
            title: '1.1 Describing Motion: Distance, Displacement & Acceleration',
            description: 'Uniform and non-uniform motion, distance-time graphs, and velocity-time derivations.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# Kinematics & The 3 Equations of Motion\n\nMotion in Class 9 forms the unshakeable cornerstone of classical mechanics needed for NEET and JEE.\n\n### The Fundamental Equations\nFor uniform acceleration $a$, initial velocity $u$, final velocity $v$, time $t$, and displacement $s$:\n1. $$v = u + at$$\n2. $$s = ut + \\frac{1}{2}at^2$$\n3. $$v^2 = u^2 + 2as$$',
          },
          {
            id: 'c9-phy-102-sf',
            title: '1.2 Force & Newton’s Three Laws of Motion',
            description: 'Inertia, momentum, action-reaction pairs, and the law of conservation of momentum.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 2,
            contentBody:
              '# Dynamics: Force & Laws of Motion\n\nNewton’s second law establishes the mathematical definition of force: $F = ma = \\frac{dp}{dt}$.',
          },
        ],
      },
      {
        id: 'c9-mod-chemistry-sf',
        title: 'Subject 2: Chemistry — Concept Clarity, Numerical Practice & Practical Insight',
        description: 'States of matter, mixtures, solutions, atoms, molecules, the mole concept, and atomic structure.',
        position: 2,
        lessons: [
          {
            id: 'c9-chm-201-sf',
            title: '2.1 Matter in Our Surroundings & The Mole Concept',
            description: 'Latent heat, evaporation, solutions, suspensions, colloids, and mole calculations.',
            lessonType: 'text',
            durationMinutes: 45,
            position: 1,
            contentBody:
              '# The Mole Concept\n\n1 mole contains exactly $6.022 \\times 10^{23}$ particles.\n\n$$n = \\frac{m}{M} = \\frac{N}{N_A}$$',
          },
        ],
      },
      {
        id: 'c9-mod-math-sf',
        title: 'Subject 4: Mathematics — Fundamentals, Advanced Problem Solving & Logical Thinking',
        description: 'Real numbers, polynomials, coordinate geometry, linear equations, and congruence proofs.',
        position: 3,
        lessons: [
          {
            id: 'c9-mat-401-sf',
            title: '4.1 Real Numbers & Polynomial Identities',
            description: 'Rationalising surds, laws of exponents, and algebraic identities.',
            lessonType: 'text',
            durationMinutes: 50,
            position: 1,
            contentBody:
              '# Polynomials & Algebraic Identities\n\n$$(a+b+c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca$$',
          },
        ],
      },
    ],
  },
}

export function getCurriculum(programmeSlug: string) {
  if (programmeSlug === 'class-9-foundation' || programmeSlug === 'school-foundation') {
    return PROGRAMME_CURRICULUM['class-9-foundation']
  }
  return PROGRAMME_CURRICULUM[programmeSlug] ?? PROGRAMME_CURRICULUM['ai-development']
}

