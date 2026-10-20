import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Brain,
  Stethoscope,
  Building2,
  GraduationCap,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Download,
  Code2,
  Layers,
  FileCheck,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getProgrammeBySlug } from '@/lib/lms/programme-universe'
import { ProgrammePricingPlans } from '@/components/public/programme-pricing-plans'
import { Class9FoundationSalesExperience } from '@/components/public/class-9-foundation-sales-experience'

interface ProjectRoadmapItem {
  title: string
  stack: string
  description: string
  deliverables: string[]
  link?: string
}

interface ProgrammeDetail {
  slug: string
  title: string
  subtitle: string
  duration: string
  workload: string
  level: string
  badge: string
  overview: string
  feeNotice: string
  disclaimer?: string
  prerequisites: string[]
  deliveryFormat: string[]
  assessmentModel: string
  learningOutcomes: string[]
  modules: Array<{
    title: string
    topics: string[]
  }>
  projectRoadmap?: ProjectRoadmapItem[]
}

const PROGRAMMES_DATA: Record<string, ProgrammeDetail> = {
  'ai-development': {
    slug: 'ai-development',
    title: 'AI Development & Automation',
    subtitle: 'From core programming through RAG systems, AI agents, and enterprise workflows.',
    duration: '8 months',
    workload: '10–12 hours / week',
    level: 'Beginner to Advanced',
    badge: 'Flagship Career Track',
    overview:
      'A comprehensive, hands-on curriculum that takes learners through full-stack software development, REST APIs, Supabase PostgreSQL, vector databases (pgvector), retrieval-augmented generation, supervised AI agents, and production deployment with automated CI/CD.',
    feeNotice:
      'Indicative proposed fee: ₹29,999 upfront plus ₹1,500/month for 8 months (Total ₹41,999 before applicable GST). Installment plans available with 14-day refund cooling-off policy.',
    prerequisites: [
      'Basic familiarity with programming logic (variables, loops, functions).',
      'Development laptop meeting minimum specs (16GB RAM recommended for local models).',
      'Commitment of 10–12 hours per week for live labs, coding workbooks, and mentor reviews.',
    ],
    deliveryFormat: [
      'Live weekly practitioner engineering sessions & office hours',
      'Super AI Tutor available 24/7 with curriculum-grounded Socratic guidance',
      'Sandboxed project workspaces with automated unit test assertions',
      'Offline-first PWA sync for low-bandwidth study',
    ],
    assessmentModel:
      'Continuous competency verification: Each module requires passing a 20-minute diagnostic check (>=70%) and executing an automated unit test suite. Final milestone credential requires an aggregate rubric score >=80% evaluated across Architectural Soundness, Security, Test Coverage, and Code Quality.',
    learningOutcomes: [
      'Architect clean, modular backend services with explicit client-server security boundaries.',
      'Model relational schemas with Supabase PostgreSQL and write robust Row Level Security (RLS) policies.',
      'Build multi-tenant Retrieval-Augmented Generation (RAG) pipelines using PostgreSQL pgvector with HNSW indexes.',
      'Design supervised tool-calling AI agents with Zod schema validation and bounded loop execution.',
      'Automate testing, containerization (Docker), and zero-downtime deployment pipelines with GitHub Actions.',
    ],
    projectRoadmap: [
      {
        title: 'Capstone 1: Enterprise Grounded Knowledge Retrieval Engine (pgvector)',
        stack: 'PostgreSQL pgvector, TypeScript, Next.js 16, Supabase RLS',
        description:
          'Construct a multi-tenant document ingestion and semantic search engine with recursive chunking (500 tokens, 10% overlap), HNSW index optimization, and tenant-isolated distance queries (<150ms latency target).',
        deliverables: ['HNSW Vector Index Migration Script', 'Recursive Overlap Chunker', 'Multi-Tenant Similarity Function', 'Automated Vitest Assertion Suite'],
        link: '/projects/rag-engine',
      },
      {
        title: 'Capstone 2: Supervised AI Customer Support Dispatcher',
        stack: 'TypeScript, Zod, Tool Calling, OpenAI/Gemini API, Human Escalation Queue',
        description:
          'Build an autonomous agent that parses inbound customer support tickets, checks account status against database tools, drafts responses, and enforces loop boundaries with instructor escalation.',
        deliverables: ['Strict Zod Tool Schema Validator', 'Bounded Execution Loop Harness', 'Human-in-the-loop Escalation Route', 'Mock Ticket Ingestion Suite'],
      },
      {
        title: 'Capstone 3: Production CI/CD & Multi-Stage Docker Deployment',
        stack: 'Docker, GitHub Actions, Vitest, Playwright, Linux Container',
        description:
          'Deploy your enterprise AI platform with automated continuous integration, unit test verification, multi-viewport Playwright E2E journey checks, and zero-downtime production builds.',
        deliverables: ['Multi-Stage Dockerfile', 'GitHub Actions CI/CD YAML', 'Playwright Smoke & Visual Tests', 'Public Verification Registry Link'],
      },
    ],
    modules: [
      {
        title: 'Module 1: Software Architecture & Advanced Python',
        topics: ['Clean Architecture & System Boundaries', 'Asynchronous Programming (asyncio)', 'Type Systems & Boundary Validation with Pydantic', 'Git Workflows & Version Control'],
      },
      {
        title: 'Module 2: Databases, Relational Modeling & RLS',
        topics: ['PostgreSQL Relational Schemas & Foreign Keys', 'Row Level Security Policies for Multi-Tenant SaaS', 'Database Migrations, Indexing & Seed Data', 'Automated Database Penetration Testing'],
      },
      {
        title: 'Module 3: Retrieval-Augmented Generation (RAG) & pgvector',
        topics: ['Vector Embeddings & Semantic Distance (<=>, <#>)', 'PostgreSQL pgvector HNSW vs IVFFlat Optimization', 'Context Chunking Strategies (Token windows & overlap)', 'Multi-Tenant Pre-filtering & Confidence Thresholds'],
      },
      {
        title: 'Module 4: Supervised AI Agents & Tool Calling',
        topics: ['Structured Output Enforcement with Zod', 'Bounded Execution Loops & Token Budgets', 'Human-in-the-Loop Safeguards & Tool Approval', 'Prompt Injection Defense & Jailbreak Filtering'],
      },
      {
        title: 'Module 5: Capstone Project & Production Deployment',
        topics: ['Containerization (Docker multi-stage builds)', 'Automated Testing (Vitest & Playwright E2E)', 'Production Next.js 16 Optimization', 'Cryptographic Credential Generation & Portfolio Verification'],
      },
    ],
  },
  'healthcare-tech': {
    slug: 'healthcare-tech',
    title: 'Healthcare Technology',
    subtitle: 'Health information systems, clinical data workflows, and interoperability design.',
    duration: 'To be confirmed',
    workload: '8–10 hours / week',
    level: 'Intermediate',
    badge: 'Specialist Domain Track',
    overview:
      'Focused strictly on the technology and data engineering intersection of healthcare: HL7/FHIR interoperability concepts, electronic health records (EHR) data structures, patient data privacy under India’s DPDP Act 2023 and DISHA, and Ayushman Bharat Digital Mission (ABDM) consent architecture.',
    feeNotice: 'Indicative fee: ₹34,999 before applicable GST. Subject to final administrative publication.',
    disclaimer:
      'CRITICAL REGULATORY NOTICE: This is an educational software technology programme. It does NOT grant authorization, certification, or medical licensing to diagnose, prescribe, treat, or provide regulated clinical health services.',
    prerequisites: [
      'Basic understanding of REST APIs and JSON data exchange.',
      'General familiarity with database tables and web applications.',
    ],
    deliveryFormat: [
      'Interactive health informatics case studies & FHIR schema sandboxes',
      'Weekly engineering discussions on ABDM and DPDP Act 2023 guidelines',
      'Async offline lesson downloads via TalentXcel PWA',
    ],
    assessmentModel:
      'Assessment based on FHIR schema validation suites, consent-flow unit tests, and privacy compliance case studies. Evaluated against clean informatics engineering rubrics.',
    learningOutcomes: [
      'Understand Hospital Information Systems (HIS) architectures and outpatient/inpatient data workflows.',
      'Model and transform healthcare data into HL7 FHIR REST resources (Patient, Observation, Encounter).',
      'Implement consent management architectures compliant with India’s Ayushman Bharat Digital Mission (ABDM).',
      'Enforce strict audit logging, redaction, and access controls adhering to the Digital Personal Data Protection (DPDP) Act 2023.',
    ],
    modules: [
      {
        title: 'Module 1: Digital Health & Clinical Information Workflows',
        topics: ['Hospital Information Systems (HIS) Architecture', 'Electronic Health Records (EHR vs EMR)', 'Diagnostic Data Flows & Lab Information Systems (LIS)'],
      },
      {
        title: 'Module 2: Interoperability Standards (FHIR / HL7)',
        topics: ['HL7 FHIR JSON Resource Structures', 'API-Driven Health Data Exchange Protocols', 'Longitudinal Patient Record Modeling', 'Data Validation against FHIR Profiles'],
      },
      {
        title: 'Module 3: Health Data Privacy & Indian Regulations',
        topics: ['Digital Personal Data Protection Act 2023 Compliance', 'DISHA Compliance Guidelines & Privacy Principles', 'ABDM Health Information Provider (HIP) & User (HIU) Nodes', 'Consent Manager Intermediary Implementation'],
      },
    ],
  },
  entrepreneurship: {
    slug: 'entrepreneurship',
    title: 'Entrepreneurship & Small-Business Digitization',
    subtitle: 'Digital storefronts, online payments, customer relationship management, and automation.',
    duration: 'To be confirmed',
    workload: '6–8 hours / week',
    level: 'Beginner to Intermediate',
    badge: 'Business Operations Track',
    overview:
      'Built for founders, micro-entrepreneurs, and small-business operators looking to digitize their operations: setting up omni-channel catalogues, automating orders, integrating online payment gateways with Razorpay, managing customer relationships, and tracking operational metrics.',
    feeNotice: 'Indicative fee: ₹29,999 before applicable GST. Installment options available.',
    prerequisites: [
      'Basic computer literacy and web browsing comfort.',
      'Interest in operating an online business or digitizing a local enterprise.',
    ],
    deliveryFormat: [
      'Practical business simulation workshops & storefront setups',
      'Live code reviews for Razorpay UPI gateway and invoicing scripts',
      'Mentorship from experienced enterprise operators',
    ],
    assessmentModel:
      'Demonstrated competence on a live working digital storefront, verified payment webhook ledger, and automated customer communication pipeline.',
    learningOutcomes: [
      'Design and deploy modern mobile-first digital storefronts with dynamic product catalogues.',
      'Integrate Razorpay payment gateways with asynchronous HMAC signature verification and automated GST invoicing.',
      'Automate customer relationship management (CRM) funnels and service reminder notifications.',
      'Track real-time inventory deductions and reconcile financial transaction ledgers.',
    ],
    modules: [
      {
        title: 'Module 1: Digital Storefronts & Product Catalogues',
        topics: ['E-Commerce Storefront Architecture', 'Inventory Tracking, Variants & SKUs', 'Mobile-First Shopping Experience & PIN Code Validation'],
      },
      {
        title: 'Module 2: Payments & Financial Reconciliation',
        topics: ['Payment Gateway Onboarding (Razorpay/Stripe)', 'HMAC SHA256 Webhook Verification & Idempotency', 'GST-Compliant Automated Invoicing', 'Refund & Chargeback Management Workflows'],
      },
      {
        title: 'Module 3: Customer Workflows & Business Automation',
        topics: ['Lead Management & CRM Funnels', 'Automated Notifications (WhatsApp/SMS APIs)', 'Customer Lifetime Value Analytics & Sales Ledgers'],
      },
    ],
  },
  'school-foundation': {
    slug: 'school-foundation',
    title: 'School Foundation (Class 8 → 9)',
    subtitle: 'Foundation learning, digital literacy, mathematics, science, and supervised projects.',
    duration: '8 months',
    workload: '6–8 hours / week',
    level: 'Foundation',
    badge: 'School Foundation Track',
    overview:
      'An 8-month standalone bridge programme for learners progressing from Class 8 into Class 9. Designed with strict child safety safeguards, guardian oversight, age-appropriate digital literacy, and fundamental mathematics and science modules.',
    feeNotice: 'Indicative fee: ₹24,999 before applicable GST. Guardian consent required upon enrolment.',
    disclaimer:
      'STANDALONE PROGRAMME NOTICE: This is an independent 8-month academic foundation programme designed to strengthen foundational concepts transitioning from Class 8 into Class 9. The tuition fee covers only this 8-month bridge and does NOT cover subsequent school grades (Class 10, 11, or 12) or statutory state/CBSE board examinations.',
    prerequisites: [
      'Completion of Class 8 or equivalent school curriculum.',
      'Parent or legal guardian consent and active supervision.',
    ],
    deliveryFormat: [
      'Weekly supervised interactive inquiry labs',
      'Age-appropriate Socratic Super AI guidance with child-safety content guardrails',
      'Parent/Guardian dashboard access with progress reporting',
    ],
    assessmentModel:
      'Continuous formative checks, practical science lab exercises, and mentor-supervised logic puzzles. No stressful high-stakes ranking.',
    learningOutcomes: [
      'Transition from arithmetic intuition to abstract algebraic decomposition and linear relationships.',
      'Apply the scientific method to real-world physics and chemistry phenomena.',
      'Develop computational thinking, flowcharts, and introductory Python coding habits.',
      'Practice safe, ethical, and balanced digital habits under guardian supervision.',
    ],
    modules: [
      {
        title: 'Module 1: Mathematical Thinking & Quantitative Reasoning',
        topics: ['Algebraic Expressions & Factorization', 'Linear Equations in One Variable', 'Data Handling, Probability & Coordinate Graphs', 'Geometric Reasoning & Practical Proofs'],
      },
      {
        title: 'Module 2: Practical Science & Scientific Inquiry',
        topics: ['Forces, Pressure & Motion Experiments', 'Chemical Effects & Particulate Matter', 'The Scientific Method: Hypothesis, Variable & Control', 'Supervised Practical Home Labs'],
      },
      {
        title: 'Module 3: Digital Literacy & Responsible Computing',
        topics: ['Algorithmic Thinking & Python Basics', 'Sequences, Conditionals & Loops in Python', 'Cyber Safety, Password Hygiene & DPDP Minor Privacy', 'Collaborative Coding & Project Portfolios'],
      },
    ],
  },
  'highschool-integrated-foundation': {
    slug: 'highschool-integrated-foundation',
    title: 'High School Integrated Foundation Programme (Classes 9–12)',
    subtitle: 'Comprehensive 2–4 year multi-grade track for NEET, JEE, Olympiads, and CBSE/State Boards.',
    duration: '2–4 years',
    workload: '10–14 hours / week',
    level: 'Secondary to Senior Secondary',
    badge: 'Multi-Year Foundation Track',
    overview:
      'A deep, continuous 2–4 year foundation programme covering Physics, Chemistry, Biology, and Mathematics from fundamental concepts to competitive entrance level. Includes dedicated hardware, offline lesson access, and ongoing faculty mentorship.',
    feeNotice:
      'Structured annual or multi-year enrolment. Year 1 foundation starts at ₹29,999 upfront plus ₹1,500/month for 8 months (Total ₹41,999 + GST) with laptop activation included. Multi-year renewal discounts apply.',
    prerequisites: [
      'Successful completion of Class 8 or Class 9 with minimum 60% in Mathematics and Science.',
      'Guardian consent and enrolment commitment.',
    ],
    deliveryFormat: [
      'Live subject mastery lectures & weekly problem-solving labs',
      'AI Tutor for 24/7 instant doubt clarification and formula practice',
      'Chapter-wise mock test series with detailed percentile analytics',
      'Pre-loaded offline content on provided laptop',
    ],
    assessmentModel:
      'Continuous chapter assessments, monthly Olympiad/JEE-format mock exams, and quarterly comprehensive reviews evaluated against competitive test benchmarks.',
    learningOutcomes: [
      'Build unshakeable concept clarity across Physics, Chemistry, and Advanced Mathematics.',
      'Develop speed and accuracy in numerical problem-solving and NEET/JEE question patterns.',
      'Cultivate strong study habits, disciplined time management, and exam temperament.',
      'Achieve top percentiles in school board examinations and national entrance evaluations.',
    ],
    modules: [
      {
        title: 'Foundation Physics',
        topics: ['Mechanics & Motion Laws', 'Thermodynamics & Heat', 'Electromagnetism & Circuits', 'Optics & Modern Physics'],
      },
      {
        title: 'Foundation Chemistry',
        topics: ['Physical Chemistry Calculations', 'Inorganic Chemistry & Periodic Trends', 'Organic Reaction Mechanisms', 'Practical Laboratory Insights'],
      },
      {
        title: 'Advanced Mathematics',
        topics: ['Algebra & Complex Numbers', 'Coordinate Geometry & Trigonometry', 'Calculus (Differential & Integral)', 'Vectors & Probability Distributions'],
      },
      {
        title: 'Study Skills, Aptitude & Exam Readiness',
        topics: ['Logical Reasoning & Analytical Deduction', 'Speed Problem-Solving Techniques', 'Mock Exam Temperament & Stress Management', 'Career & College Roadmap Guidance'],
      },
    ],
  },
  'competitive-exams': {
    slug: 'competitive-exams',
    title: 'Government & Competitive Exams Programme',
    subtitle: 'Strategic preparation for UPSC, State PSC, NEET, JEE, LAW/CLAT, Banking, SSC, and Defence.',
    duration: '8 months',
    workload: '12–15 hours / week',
    level: 'Aspirants & Graduates',
    badge: 'Public Sector & Career Track',
    overview:
      'A structured, intensive 8-month preparation ecosystem designed for civil service and government competitive examinations. Combines expert-curated syllabus modules, daily current affairs analysis, full-length test series, and dedicated laptop with offline question banks.',
    feeNotice:
      'Indicative proposed fee: ₹29,999 upfront plus ₹1,500/month for 8 months (Total ₹41,999 before applicable GST). Laptop included with pre-installed offline question bank.',
    prerequisites: [
      'Graduation or final-year undergraduate status for civil service/banking tracks; 10+2 for defence/CLAT.',
      'Commitment of 12+ hours per week for daily reading and test series.',
    ],
    deliveryFormat: [
      'Live conceptual classes & daily current affairs debriefs',
      'AI-powered doubt resolution and essay evaluation assistance',
      'Comprehensive topic-wise and full-length simulated test series',
      'Offline learning access on the pre-configured laptop',
    ],
    assessmentModel:
      'Weekly sectional tests, bi-weekly full-length mock examinations matching authentic exam timing and negative marking, plus individual mentor performance reports.',
    learningOutcomes: [
      'Master General Studies core: Indian Polity, Modern History, Geography, Economy, and Science & Tech.',
      'Excel in Quantitative Aptitude, Logical Reasoning, and Reading Comprehension.',
      'Formulate structured, evidence-grounded answers for descriptive and essay components.',
      'Gain speed and composure for high-pressure competitive examination environments.',
    ],
    modules: [
      {
        title: 'Module 1: General Studies & Current Affairs',
        topics: ['Indian Constitution, Governance & Polity', 'Indian Economy & Budget Analysis', 'History, Culture & Geography', 'Daily Editorial & National Affairs Synthesis'],
      },
      {
        title: 'Module 2: Quantitative Aptitude & CSAT Reasoning',
        topics: ['Data Interpretation & Arithmetic Shortcuts', 'Analytical & Critical Logical Reasoning', 'Reading Comprehension & Critical Analysis', 'Time-Bounded Problem Sets'],
      },
      {
        title: 'Module 3: Exam Specialization Tracks',
        topics: ['UPSC/State PSC Prelims & Mains Answer Writing', 'Banking & SSC Speed Arithmetic & Financial Awareness', 'CLAT Legal Reasoning & Constitutional Law', 'Defence NDA/CDS Service Selection Board (SSB) Orientation'],
      },
      {
        title: 'Module 4: Full-Length Mock Series & Revision Strategy',
        topics: ['Simulated All-India Ranking Mock Tests', 'Section-wise Error Diagnosis & Weak-Area Remediation', 'Interview & Personality Test Guidance', 'Exam Day Strategy & Time Allocation'],
      },
    ],
  },
  'small-business': {
    slug: 'small-business',
    title: 'Small Business & Retailers Digital Programme',
    subtitle: 'Practical digital skills for shopkeepers, chemists, retailers, distributors, and local merchants.',
    duration: '8 months',
    workload: '6–8 hours / week',
    level: 'Beginner',
    badge: 'MSME Growth Track',
    overview:
      'Designed specifically for local business owners, Kirana store operators, chemists, and distributors who want to increase sales, take orders online, manage inventory digitally, and use modern WhatsApp business and payment tools. Includes a pre-configured laptop pre-loaded with digital business software.',
    feeNotice:
      'Proposed fee: ₹29,999 upfront plus ₹1,500/month for 8 months (Total ₹41,999 + GST). Includes dedicated business laptop with pre-installed accounting, GST billing, and inventory software.',
    prerequisites: [
      'Operate or work in a retail store, wholesale agency, or local trade enterprise.',
      'Basic smartphone familiarity (WhatsApp, UPI).',
    ],
    deliveryFormat: [
      'Practical video modules in accessible regional language formats',
      'One-on-one setup sessions for WhatsApp Business and digital catalog',
      'Offline business software pre-installed on the included laptop',
      'Ongoing merchant community support via CHATR',
    ],
    assessmentModel:
      'Practical milestones: setting up a verified Google Business profile, activating a WhatsApp digital catalog, generating the first digital GST invoice, and reconciling payments.',
    learningOutcomes: [
      'Create and manage a digital storefront on WhatsApp Business and e-commerce platforms.',
      'Automate customer enquiries, order confirmations, and delivery updates.',
      'Manage inventory, track fast-moving stock, and streamline supplier orders digitally.',
      'Use modern digital billing tools to track sales, expenses, and GST compliance.',
    ],
    modules: [
      {
        title: 'Module 1: Digital Store Setup & Local Online Presence',
        topics: ['Google Business Profile & Local Search Optimization', 'WhatsApp Business Setup, Catalogues & Quick Replies', 'Digital Storefront Creation & Online Ordering Links'],
      },
      {
        title: 'Module 2: Marketing, Customer Acquisition & Retention',
        topics: ['Social Media Marketing for Local Retailers', 'Customer Loyalty Programmes & Broadcast Lists', 'Festive Offers, Discount Campaigns & Promotional Posters'],
      },
      {
        title: 'Module 3: Inventory, Supply Chain & Financial Control',
        topics: ['Digital Stock Tracking & Re-order Alerts', 'Supplier Relationship & Purchase Order Automation', 'GST Billing, Expense Bookkeeping & Profit Tracking'],
      },
      {
        title: 'Module 4: AI & Modern Business Productivity',
        topics: ['AI for Generating Marketing Copy & Product Descriptions', 'Customer Service Chatbots & Automation Tools', 'B2B Wholesale Expansion on NutyTales & Regional Portals'],
      },
    ],
  },
  'home-business': {
    slug: 'home-business',
    title: 'Home Business & Women Entrepreneurs Programme',
    subtitle: 'Practical skills to launch, market, and earn from home: clothing, foods, crafts, and online selling.',
    duration: '8 months',
    workload: '5–7 hours / week',
    level: 'Beginner',
    badge: 'Financial Independence Track',
    overview:
      'A supportive, practical programme for housewives, stay-at-home parents, and aspiring women entrepreneurs to turn creative skills into profitable home-based enterprises. Learn packaging, pricing, digital marketing, marketplace selling, and financial management.',
    feeNotice:
      'Proposed fee: ₹29,999 upfront plus ₹1,500/month for 8 months (Total ₹41,999 + GST). Dedicated laptop included for running your online business from home.',
    prerequisites: [
      'A passion for creating products (fashion, baking, handicrafts, art, wellness) or offering home services.',
      'Willingness to spend 5–7 hours per week learning and building your business.',
    ],
    deliveryFormat: [
      'Step-by-step video tutorials and practical worksheets',
      'Live mentoring circles with successful women founders',
      'Offline-enabled learning on the provided laptop',
      'Supportive community on CHATR and seller listing on NutyTales',
    ],
    assessmentModel:
      'Milestone-based: completing product costing, designing brand packaging, launching an online storefront, and completing initial client orders.',
    learningOutcomes: [
      'Validate product ideas and calculate cost-of-goods, profit margins, and retail pricing.',
      'Create eye-catching product photographs and videos using your phone.',
      'Set up online storefronts on social channels, marketplaces, and NutyTales.',
      'Manage packaging, shipping logistics, customer service, and repeat orders.',
    ],
    modules: [
      {
        title: 'Module 1: Product Development & Business Foundations',
        topics: ['Identifying Profitable Home Business Ideas', 'Costing, Sourcing Raw Materials & Setting Healthy Margins', 'Product Packaging, Hygiene & Quality Standards'],
      },
      {
        title: 'Module 2: Branding, Photography & Content Creation',
        topics: ['Creating a Distinct Brand Identity & Logo', 'Mobile Product Photography & Reel Creation', 'Social Media Storytelling on Instagram & WhatsApp'],
      },
      {
        title: 'Module 3: Selling Online & Marketplace Onboarding',
        topics: ['Online Storefront Setup & UPI Payment Links', 'Listing Products on NutyTales & Artisan Marketplaces', 'Courier Tie-ups, Packaging & Cash-on-Delivery Handling'],
      },
      {
        title: 'Module 4: Customer Delight & Business Scaling',
        topics: ['Handling Customer Enquiries & Building Loyal Patronage', 'Holiday & Festival Gift Hamper Collections', 'Managing Personal Income, Savings & Business Expansion'],
      },
    ],
  },
  'teachers-trainers': {
    slug: 'teachers-trainers',
    title: 'Teachers & Trainers Digital Empowerment Programme',
    subtitle: 'Upgrade your pedagogical skills: create digital courses, teach online, and build your educator brand.',
    duration: '8 months',
    workload: '6–8 hours / week',
    level: 'Educators & Subject Experts',
    badge: 'Educator Upskilling Track',
    overview:
      'Empowers school teachers, corporate trainers, college professors, and subject experts to transition into modern digital education. Learn to record high-quality lessons, create interactive quizzes, conduct engaging live classes, and monetize courses globally.',
    feeNotice:
      'Proposed fee: ₹29,999 upfront plus ₹1,500/month for 8 months (Total ₹41,999 + GST). Includes pre-loaded educator laptop with course authoring, screen recording, and presentation tools.',
    prerequisites: [
      'Background in teaching, tutoring, corporate coaching, or subject matter expertise.',
      'Desire to reach online learners and adopt modern EdTech tools.',
    ],
    deliveryFormat: [
      'Hands-on digital pedagogy workshops & live recording simulations',
      'Personal feedback on lesson slides, micro-videos, and assessments',
      'Pre-installed authoring software on dedicated laptop',
      'Community discussion and educator matchmaking on CHATR',
    ],
    assessmentModel:
      'Capstone submission of a complete 4-module digital course with video lectures, automated quizzes, PDF workbooks, and a live teaching demonstration.',
    learningOutcomes: [
      'Design modern interactive curricula using micro-learning principles.',
      'Master video recording, audio editing, and screen presentation software.',
      'Conduct engaging live virtual classrooms with polls, breakouts, and collaborative whiteboards.',
      'Publish and monetize courses on TalentXcel Academy and personal digital platforms.',
    ],
    modules: [
      {
        title: 'Module 1: Modern Digital Pedagogy & Course Design',
        topics: ['Curriculum Mapping & Backward Design Frameworks', 'Micro-learning Principles & Student Engagement Psychology', 'Developing High-Impact Slides & Digital Handouts'],
      },
      {
        title: 'Module 2: Video Production & Educational Media',
        topics: ['Screen Recording Tools & Best Practices (OBS Studio, Loom)', 'Microphone & Lighting Setup on Modest Budgets', 'Basic Video Editing, Subtitling & Visual Callouts'],
      },
      {
        title: 'Module 3: Virtual Classrooms & Assessment Tools',
        topics: ['Interactive Live Teaching on Zoom, Teams & Google Meet', 'Creating Automated Quizzes, Rubrics & Diagnostic Tests', 'Student Progress Tracking & Data-Informed Interventions'],
      },
      {
        title: 'Module 4: Personal Branding, Monetization & Community',
        topics: ['Building an Educator Profile on LinkedIn & YouTube', 'Course Pricing Models, Cohorts & Membership Clubs', 'Launching on TalentXcel Academy and Partner Marketplaces'],
      },
    ],
  },
  'lifestyle-trainers': {
    slug: 'lifestyle-trainers',
    title: 'Yoga, Fitness, Music & Dance Trainers Programme',
    subtitle: 'Learn. Create. Teach. Go Online. Earn — For coaches, performers, and wellness experts.',
    duration: '8 months',
    workload: '6–8 hours / week',
    level: 'Instructors & Practitioners',
    badge: 'Creator & Wellness Track',
    overview:
      'Tailored for yoga teachers, fitness instructors, dance choreographers, music teachers, and wellness coaches who want to build a thriving digital training brand. Learn client acquisition, live session streaming, recurring membership programs, and digital client management.',
    feeNotice:
      'Proposed fee: ₹29,999 upfront plus ₹1,500/month for 8 months (Total ₹41,999 + GST). Includes laptop pre-loaded with fitness/wellness client scheduling and video tools.',
    prerequisites: [
      'Certified or practicing instructor in yoga, gym/fitness, dance, vocal/instrumental music, or wellness arts.',
      'Commitment to building a loyal online and offline community.',
    ],
    deliveryFormat: [
      'Studio-to-screen masterclasses on camera presence and coaching cues',
      'Templates for client intake, progress tracking, and diet/routine plans',
      'Laptop pre-loaded with digital management tools',
      'Live networking and collaborative workshops',
    ],
    assessmentModel:
      'Launch of a paid 21-day fitness/dance challenge or music masterclass with verified enrolled students and automated payment collection.',
    learningOutcomes: [
      'Command camera presence with clear verbal coaching cues and professional audio/video setup.',
      'Package coaching into tiered subscription memberships, workshops, and 1-on-1 consultations.',
      'Use modern social media marketing, reels, and WhatsApp funnels to acquire high-paying clients.',
      'Manage client scheduling, payments, attendance, and renewals effortlessly.',
    ],
    modules: [
      {
        title: 'Module 1: Studio Setup & Online Session Delivery',
        topics: ['Camera Angles, Wireless Audio & Lighting for Movement', 'Online Group Class Mechanics & Real-Time Form Correction', 'Preventing Student Injury in Virtual Training'],
      },
      {
        title: 'Module 2: Packaging & Recurring Membership Models',
        topics: ['Designing 21-Day Challenges, Bootcamps & Monthly Subscriptions', 'Creating Guided Meditation, Workout & Practice Audio Tracks', 'Pricing Strategy for High-Ticket 1-on-1 vs High-Volume Groups'],
      },
      {
        title: 'Module 3: Social Media Growth & Client Funnels',
        topics: ['Short-Form Video Mastery (Reels, Shorts) for Trainers', 'Turning Followers into Paying Clients via WhatsApp Automation', 'Organizing Free Workshops & Converting Free Trials'],
      },
      {
        title: 'Module 4: Client Management, Community & Expansion',
        topics: ['Managing Student Schedules, Renewals & Payment Links', 'Building an Active Community on CHATR & Telegram', 'Branded Merchandise & Health Nutrition Collaborations on NutyTales'],
      },
    ],
  },
}

function resolveProgrammeDetail(slug: string): ProgrammeDetail | null {
  if (PROGRAMMES_DATA[slug]) return PROGRAMMES_DATA[slug]

  const universeProg = getProgrammeBySlug(slug)
  if (!universeProg) return null

  return {
    slug: universeProg.slug,
    title: universeProg.title,
    subtitle: universeProg.subtitle,
    duration: `${universeProg.durationMonths} months`,
    workload: '8–12 hours / week',
    level: universeProg.eligibility,
    badge: universeProg.statusBadge,
    overview: `${universeProg.tagline} ${universeProg.subtitle}`,
    feeNotice: `Tuition: ₹${universeProg.pricing.tuitionInr.toLocaleString('en-IN')}${
      universeProg.pricing.includesLaptop ? ' (Includes dedicated configured laptop)' : ''
    }.`,
    disclaimer: universeProg.regulatoryDisclaimer,
    prerequisites: universeProg.prerequisites,
    deliveryFormat: [
      universeProg.deliveryFormat,
      'Super AI contextual Socratic tutoring',
      'Living Skill Graph competency tracking',
      'Isolated sandboxed project execution',
    ],
    assessmentModel:
      'Continuous milestone evaluation, automated sandboxed unit testing, and rubric assessment scoring.',
    learningOutcomes: universeProg.learningOutcomes,
    modules: universeProg.coreModules.map((m) => ({
      title: m.title,
      topics: m.topics,
    })),
    projectRoadmap: universeProg.handsOnProjects.map((proj) => ({
      title: proj.title,
      stack: universeProg.shortTitle,
      description: proj.description,
      deliverables: [proj.deliverable],
      link: universeProg.slug === 'ai-development' ? '/projects/rag-engine' : undefined,
    })),
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const prog = resolveProgrammeDetail(slug)
  if (!prog) return { title: 'Programme Not Found' }
  return {
    title: `${prog.title} — Syllabus & Roadmap — TalentXcel`,
    description: prog.subtitle,
  }
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const programme = resolveProgrammeDetail(slug)

  if (!programme) {
    notFound()
  }

  if (programme.slug === 'class-9-foundation' || programme.slug === 'school-foundation') {
    return (
      <div className="py-10 sm:py-16 lg:py-20 bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/programmes" className="hover:text-primary transition-colors">
              Programmes
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-semibold">Class 9 Foundation Programme</span>
          </nav>

          <Class9FoundationSalesExperience />
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 lg:py-20 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="outline" className="text-primary border-primary/30">
            {programme.badge}
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {programme.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {programme.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="h-4 w-4 text-primary" /> {programme.duration}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <BookOpen className="h-4 w-4 text-primary" /> {programme.workload}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="h-4 w-4 text-primary" /> {programme.level}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
            <Link href={`/apply?programme=${programme.slug}`}>
              <Button size="lg" className="gap-2 w-full sm:w-auto font-semibold">
                Apply for Admission <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/fees">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Fee Breakdown
              </Button>
            </Link>
            {programme.slug === 'ai-development' && (
              <Link href="/projects/rag-engine">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-1.5">
                  <Code2 className="h-4 w-4 text-primary" />
                  Try Sample Project
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Regulatory / Safety Disclaimer if present */}
        {programme.disclaimer && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-medium">{programme.disclaimer}</div>
          </div>
        )}

        {/* Overview & Real Learning Outcomes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Programme Overview</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {programme.overview}
            </p>

            <div className="pt-4 space-y-3">
              <h3 className="text-base font-bold text-foreground">Demonstrated Learning Outcomes</h3>
              <div className="space-y-2">
                {programme.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Delivery Format & Prerequisites Card */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="border shadow-xs bg-card">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <CardTitle className="text-base font-bold text-foreground">
                  Delivery Format & Pedagogy
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4 text-xs">
                <ul className="space-y-2 text-muted-foreground">
                  {programme.deliveryFormat.map((format, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{format}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t space-y-2">
                  <div className="font-bold text-foreground text-[11px] uppercase tracking-wider">
                    Prerequisites & Requirements
                  </div>
                  <ul className="space-y-1.5 text-muted-foreground">
                    {programme.prerequisites.map((pre, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                        <span>{pre}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-xs bg-muted/20">
              <CardContent className="p-4 space-y-2 text-xs">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <FileCheck className="h-4 w-4 text-primary" />
                  Assessment & Mastery Criteria
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {programme.assessmentModel}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Structured Project Roadmap (for AI Development or when present) */}
        {programme.projectRoadmap && programme.projectRoadmap.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <Badge variant="outline" className="text-primary border-primary/30">
                Build While You Learn
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Structured Project Roadmap & What You Will Build
              </h2>
              <p className="text-sm text-muted-foreground">
                Every project runs in an isolated sandbox with automated unit test assertions and rubric-based mentor reviews.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programme.projectRoadmap.map((proj, idx) => (
                <Card key={idx} className="border shadow-xs flex flex-col justify-between bg-card">
                  <CardHeader className="pb-3 border-b bg-muted/20">
                    <span className="text-[11px] font-mono text-primary font-semibold">
                      Phase 0{idx + 1}
                    </span>
                    <CardTitle className="text-base font-bold text-foreground mt-1">
                      {proj.title}
                    </CardTitle>
                    <div className="text-[11px] font-mono text-muted-foreground pt-1">
                      {proj.stack}
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="space-y-1.5 text-xs">
                      <div className="font-semibold text-foreground text-[11px] uppercase tracking-wider">
                        Key Deliverables:
                      </div>
                      <ul className="space-y-1 text-muted-foreground">
                        {proj.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      {proj.link ? (
                        <Link href={proj.link}>
                          <Button size="sm" className="w-full text-xs gap-1.5 font-semibold">
                            Open Guided Project <ArrowRight className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      ) : (
                        <Button size="sm" variant="outline" disabled className="w-full text-xs">
                          Unlocks in Cohort Phase {idx + 1}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Structured Syllabus Modules */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Complete Curriculum Syllabus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programme.modules.map((m, idx) => (
              <Card key={idx} className="border shadow-xs bg-card">
                <CardHeader className="pb-3 border-b bg-muted/20">
                  <CardTitle className="text-base font-bold text-foreground">
                    {m.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground" role="list">
                    {m.topics.map((t, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fee & Transparent Payment Plans */}
        <div id="fees-plans" className="pt-8 border-t space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Tuition Fees & Payment Plans
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Transparent tuition with monthly instalment options. Staged cohort admissions.
            </p>
          </div>

          <ProgrammePricingPlans
            programmeTitle={programme.title}
            durationMonths={parseInt(programme.duration) || 8}
            slug={programme.slug}
            showProgrammeSelector={false}
          />
        </div>
      </div>
    </div>
  )
}
