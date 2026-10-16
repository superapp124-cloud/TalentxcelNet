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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
  modules: Array<{
    title: string
    topics: string[]
  }>
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
      'Indicative proposed fee: ₹29,999 upfront plus ₹1,500/month for 8 months (Total ₹41,999 before applicable GST). Installment plans available.',
    modules: [
      {
        title: 'Module 1: Software Architecture & Advanced Python',
        topics: ['Clean Architecture & System Boundaries', 'Asynchronous Programming', 'Git Workflows & Version Control'],
      },
      {
        title: 'Module 2: Databases, Relational Modeling & RLS',
        topics: ['PostgreSQL Relational Schemas', 'Row Level Security Policies', 'Database Migrations & Seed Data'],
      },
      {
        title: 'Module 3: Retrieval-Augmented Generation (RAG)',
        topics: ['Vector Embeddings & Semantic Search', 'PostgreSQL pgvector Optimization', 'Context Chunking & Precision Guardrails'],
      },
      {
        title: 'Module 4: Supervised AI Agents & Tool Calling',
        topics: ['Structured Output Enforcement with Zod', 'Bounded Execution Loops', 'Human-in-the-Loop Safeguards'],
      },
      {
        title: 'Module 5: Capstone Project & Production Deployment',
        topics: ['Containerization & Next.js Production Build', 'Automated Testing (Vitest & Playwright)', 'Portfolio Demonstration'],
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
      'Focused on the intersection of healthcare workflows and technology: HL7/FHIR interoperability concepts, electronic health records (EHR), patient data privacy, and responsible AI applications in medical administration.',
    feeNotice: 'Indicative fee: ₹34,999 before applicable GST. Subject to final administrative publication.',
    disclaimer:
      'CRITICAL NOTICE: This is an educational technology programme. It does NOT grant authorization, certification, or medical licensing to diagnose, prescribe, or provide regulated clinical health services.',
    modules: [
      {
        title: 'Module 1: Digital Health & Clinical Information Workflows',
        topics: ['Hospital Information Systems (HIS)', 'Outpatient vs Inpatient Workflows', 'Electronic Medical Records'],
      },
      {
        title: 'Module 2: Interoperability Standards (FHIR / HL7)',
        topics: ['FHIR Resource Structures', 'API-Driven Health Data Exchange', 'Consent Management & Security'],
      },
      {
        title: 'Module 3: Health Data Privacy & Indian Regulations',
        topics: ['Digital Personal Data Protection Act 2023', 'DISHA Compliance Guidelines', 'Audit Logging & Anonymization'],
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
      'Built for founders and small-business operators looking to digitize their business: setting up omni-channel catalogues, automating orders, integrating online payment gateways, managing customer relationships, and tracking marketing analytics.',
    feeNotice: 'Indicative fee: ₹29,999 before applicable GST. Installment options available.',
    modules: [
      {
        title: 'Module 1: Digital Storefronts & Product Catalogues',
        topics: ['E-Commerce Store Architecture', 'Inventory Tracking & SKUs', 'Mobile-First Shopping Experience'],
      },
      {
        title: 'Module 2: Payments & Financial Reconciliation',
        topics: ['Payment Gateway Onboarding (Razorpay/Stripe)', 'Invoicing & GST Basics', 'Refund & Chargeback Workflows'],
      },
      {
        title: 'Module 3: Customer Workflows & Business Automation',
        topics: ['Lead Management & CRM Funnels', 'Automated Notifications', 'Business Performance Analytics'],
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
      'An 8-month standalone bridge programme for students moving from Class 8 into Class 9. Designed with strict child safety protocols, guardian involvement, age-appropriate digital literacy, and fundamental mathematics and science modules.',
    feeNotice: 'Indicative fee: ₹24,999 before applicable GST. Guardian consent required upon enrolment.',
    disclaimer:
      'GUARDIAN NOTICE: Enrolment for learners under 18 requires verified parent/guardian consent. TalentXcel does not use behavioural advertising or disclose student profiles in public directories.',
    modules: [
      {
        title: 'Module 1: Mathematical Thinking & Quantitative Reasoning',
        topics: ['Algebraic Expressions & Geometry', 'Data Handling & Practical Graphs', 'Problem-Solving Strategies'],
      },
      {
        title: 'Module 2: Practical Science & Scientific Inquiry',
        topics: ['Physics & Chemistry Concepts', 'Scientific Method & Observation', 'Supervised Practical Mini-Projects'],
      },
      {
        title: 'Module 3: Digital Literacy & Responsible Computing',
        topics: ['Algorithmic Thinking & Intro Coding', 'Cyber Safety & Digital Ethics', 'Collaborative Digital Tools'],
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
    title: `${prog.title} — Syllabus & Details`,
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
    <div className="py-12 lg:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="outline" className="text-primary border-primary/30">
            {programme.badge}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
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
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Apply for this Programme <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/fees">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Fee Breakdown
              </Button>
            </Link>
          </div>
        </div>

        {/* Regulatory / Safety Disclaimer if present */}
        {programme.disclaimer && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <ShieldAlert className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">{programme.disclaimer}</p>
          </div>
        )}

        {/* Overview */}
        <div className="prose dark:prose-invert max-w-3xl">
          <h2 className="text-2xl font-bold">Programme Overview</h2>
          <p className="text-muted-foreground leading-relaxed">{programme.overview}</p>
        </div>

        {/* Structured Syllabus */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Structured Curriculum & Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programme.modules.map((m, idx) => (
              <Card key={idx} className="border shadow-xs">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold text-foreground">
                    {m.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                    {m.topics.map((t, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
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
            <h3 className="text-lg font-bold text-foreground">Tuition & Payment Options</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{programme.feeNotice}</p>
            <p className="text-xs text-muted-foreground">
              *All pricing subject to final administrative approval and applicable taxes. Completion certificates are issued based on defined milestone criteria.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
