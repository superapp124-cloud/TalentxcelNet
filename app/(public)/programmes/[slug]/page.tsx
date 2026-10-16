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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const prog = PROGRAMMES_DATA[slug]
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
  const programme = PROGRAMMES_DATA[slug]

  if (!programme) {
    notFound()
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

        {/* Fee & Commercial Transparency */}
        <Card className="border bg-muted/20">
          <CardContent className="p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-foreground">Tuition & Transparent Payment Terms</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{programme.feeNotice}</p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t text-xs text-muted-foreground">
              <span>*All pricing subject to applicable taxes. 14-day cooling-off refund policy applies prior to milestone delivery.</span>
              <Link href="/fees">
                <Button variant="outline" size="sm" className="text-xs">
                  Review Milestone Refund Terms
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
