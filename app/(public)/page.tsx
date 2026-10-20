import Link from 'next/link'
import {
  ArrowRight,
  Brain,
  Zap,
  Award,
  Download,
  Users,
  Code2,
  Stethoscope,
  Building2,
  GraduationCap,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Target,
  FileCheck,
  Briefcase,
  AlertCircle,
  ExternalLink,
  Laptop,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TalentXcelEmblem, Logo, EcosystemTrioLogos } from '@/components/brand/logo'
import { HeroProductDemo } from '@/components/public/hero-product-demo'
import { SkillGraph } from '@/components/academy/skill-graph'
import { SuperAiAmbitionCockpit } from '@/components/public/super-ai-ambition-cockpit'
import { ProgrammeUniverseExplorer } from '@/components/public/programme-universe-explorer'
import { ProgrammePricingPlans } from '@/components/public/programme-pricing-plans'
import { Class9FoundationSalesExperience } from '@/components/public/class-9-foundation-sales-experience'

const programmes = [
  {
    id: 'ai-development',
    icon: Brain,
    badge: 'Flagship Curriculum',
    title: 'AI Development & Automation',
    tagline: 'Engineered for the frontier of software.',
    description:
      'From clean architecture and relational modeling to multi-tenant RAG systems with PostgreSQL pgvector, supervised AI tool-calling agents, and production CI/CD containerization. Dedicated laptop included.',
    duration: '8 months',
    workload: '10–12 hours / week',
    level: 'Beginner to Advanced',
    topics: ['Clean Architecture & Python Boundaries', 'PostgreSQL & pgvector HNSW Indexing', 'Multi-Tenant RAG Pipelines', 'Supervised Agents with Zod Guardrails'],
    href: '/programmes/ai-development',
    status: 'Applications Open',
    highlight: true,
  },
  {
    id: 'competitive-exams',
    icon: Target,
    badge: 'Civil Services & Govt Track',
    title: 'Government & Competitive Exams',
    tagline: 'Strategic UPSC, State PSC, NEET, JEE & Banking prep.',
    description:
      'Intensive 8-month cohort with daily current affairs synthesis, CSAT reasoning, topic-wise mock tests, and a pre-loaded offline question bank laptop.',
    duration: '8 months',
    workload: '12–15 hours / week',
    level: 'Aspirants & Graduates',
    topics: ['Indian Polity, Economy & History', 'CSAT Quantitative & Logical Aptitude', 'Simulated All-India Mock Exams', 'Interview & Personality Guidance'],
    href: '/programmes/competitive-exams',
    status: 'Applications Open',
    highlight: false,
  },
  {
    id: 'school-foundation',
    icon: GraduationCap,
    badge: 'School Bridge',
    title: 'School Foundation (Class 8 → 9)',
    tagline: 'Foundations for NEET, JEE and competitive exams.',
    description:
      'An 8-month bridge programme strengthening fundamental Physics, Chemistry, Biology, Mathematics, English comprehension, and competitive exam readiness. Dedicated laptop included.',
    duration: '8 months',
    workload: '6–8 hours / week',
    level: 'Class 9 (Post-8th)',
    topics: ['Physics & Chemistry Concepts', 'NCERT Biology for NEET Foundation', 'Advanced Math Problem Solving', 'English Comprehension & Aptitude'],
    href: '/programmes/school-foundation',
    status: 'Enrolling Now',
    highlight: false,
    disclaimer: 'Independent 8-month bridge for Class 9 foundation. Hardware included.',
  },
  {
    id: 'highschool-integrated-foundation',
    icon: Sparkles,
    badge: 'Multi-Year Foundation',
    title: 'Integrated High School Track (9–12)',
    tagline: '2–4 year comprehensive NEET/JEE foundation.',
    description:
      'Continuous 2-4 year academic track covering core sciences, advanced mathematics, Olympiads, and competitive board examinations with dedicated mentor attention.',
    duration: '2–4 years',
    workload: '10–14 hours / week',
    level: 'Secondary to Senior Secondary',
    topics: ['Concept Building & Regular Testing', 'NEET & JEE Track Specialization', 'Olympiads, CUET & NDA Readiness', 'Personal Mentorship & College Roadmap'],
    href: '/programmes/highschool-integrated-foundation',
    status: 'Enrolling Now',
    highlight: false,
  },
  {
    id: 'small-business',
    icon: Briefcase,
    badge: 'MSME Commerce Track',
    title: 'Small Business & Retailers Programme',
    tagline: 'Digital store setup, inventory & GST billing.',
    description:
      'Practical digital skills for shopkeepers, chemists, retailers, and wholesalers: WhatsApp commerce, supplier management, and marketing tools on a dedicated laptop.',
    duration: '8 months',
    workload: '6–8 hours / week',
    level: 'Beginner',
    topics: ['WhatsApp Business & Online Catalogues', 'Inventory & Supplier Automation', 'GST Billing & Financial Control', 'AI for Marketing & Customer Service'],
    href: '/programmes/small-business',
    status: 'Enrolling Now',
    highlight: false,
  },
  {
    id: 'home-business',
    icon: FileCheck,
    badge: 'Women Founders Track',
    title: 'Home Business & Women Entrepreneurs',
    tagline: 'Start, grow, and earn from home.',
    description:
      'Step-by-step guidance for housewives and stay-at-home parents: clothing, foods, crafts, pricing, social media marketing, and marketplace selling on NutyTales.',
    duration: '8 months',
    workload: '5–7 hours / week',
    level: 'Beginner',
    topics: ['Product Costing & Healthy Margins', 'Mobile Product Photography & Reels', 'Online Storefront & UPI Setup', 'Order Fulfillment & Customer Retention'],
    href: '/programmes/home-business',
    status: 'Enrolling Now',
    highlight: false,
  },
  {
    id: 'teachers-trainers',
    icon: Users,
    badge: 'Educator Upskilling',
    title: 'Teachers & Trainers Programme',
    tagline: 'Upgrade skills, go digital, reach more learners.',
    description:
      'Empowers school teachers, corporate trainers, and educators to create digital courses, teach online, and build personal educator brands on modern platforms.',
    duration: '8 months',
    workload: '6–8 hours / week',
    level: 'Educators & Trainers',
    topics: ['Digital Pedagogy & Micro-learning', 'Screen Recording & Video Editing', 'Interactive Live Teaching Tools', 'Course Monetization & Branding'],
    href: '/programmes/teachers-trainers',
    status: 'Enrolling Now',
    highlight: false,
  },
  {
    id: 'lifestyle-trainers',
    icon: Zap,
    badge: 'Creator & Wellness Track',
    title: 'Yoga, Fitness, Music & Dance Trainers',
    tagline: 'Turn passion into an online training business.',
    description:
      'Learn studio camera presence, recurring membership programs, client acquisition, and online community streaming for fitness and wellness coaches.',
    duration: '8 months',
    workload: '6–8 hours / week',
    level: 'Coaches & Instructors',
    topics: ['Virtual Studio & Movement Audio Setup', 'Tiered Monthly Subscription Packaging', 'Instagram Reels & WhatsApp Client Funnels', 'Scheduling, Payments & Client Retention'],
    href: '/programmes/lifestyle-trainers',
    status: 'Enrolling Now',
    highlight: false,
  },
  {
    id: 'healthcare-tech',
    icon: Stethoscope,
    badge: 'Specialist Domain Track',
    title: 'Healthcare Technology',
    tagline: 'Health informatics & interoperability.',
    description:
      'Hospital Information Systems (HIS), HL7 FHIR REST protocols, Ayushman Bharat Digital Mission (ABDM) consent architecture, and data privacy under DPDP Act 2023.',
    duration: '8 months',
    workload: '8–10 hours / week',
    level: 'Intermediate',
    topics: ['Hospital Information Systems (HIS)', 'HL7 FHIR Interoperability', 'ABDM Consent Architecture', 'Health Data Privacy & DPDP Compliance'],
    href: '/programmes/healthcare-tech',
    status: 'Enrolling Now',
    highlight: false,
    disclaimer: 'Software technology qualification. Does not grant medical licensing or clinical authority to practice.',
  },
  {
    id: 'entrepreneurship',
    icon: Building2,
    badge: 'Business Operations Track',
    title: 'Entrepreneurship & Startup Launch',
    tagline: 'Learn. Build. Launch. Grow.',
    description:
      'Launch and operate a digitized enterprise. Business model validation, digital marketing, AI automation, payment webhooks, and investor growth readiness.',
    duration: '8 months',
    workload: '6–8 hours / week',
    level: 'Beginner to Intermediate',
    topics: ['Business Model Canvas & Validation', 'Digital Marketing & Marketplaces', 'AI & Workflow Automation', 'Finance, Funding & Investor Pitching'],
    href: '/programmes/entrepreneurship',
    status: 'Enrolling Now',
    highlight: false,
  },
]

const projectShowcase = [
  {
    title: 'Enterprise Grounded Knowledge Retrieval Engine (pgvector)',
    category: 'AI Development',
    duration: '12 hours',
    stack: 'PostgreSQL pgvector, Next.js 16, TypeScript, Supabase RLS',
    description:
      'Multi-tenant document ingestion pipeline with 500-token chunks, 10% overlap, HNSW vector indexing, and strict tenant security filters evaluated against automated unit tests.',
    rubricHighlights: 'Architectural Soundness (30%), Tenant Isolation (30%), Test Coverage (20%), Code Quality (20%)',
    href: '/projects/rag-engine',
  },
  {
    title: 'FHIR Diagnostic Record Interoperability Exchange',
    category: 'Healthcare Technology',
    duration: '10 hours',
    stack: 'HL7 FHIR JSON, REST APIs, ABDM Consent Tokens, Audit Logs',
    description:
      'Standardized clinical exchange mapping patient diagnostic reports to FHIR observation resources with explicit consent manager verification and DPDP-compliant redaction.',
    rubricHighlights: 'Schema Compliance (35%), Privacy Isolation (35%), Error Resilience (30%)',
    href: '/projects',
  },
  {
    title: 'Automated E-Commerce Order & Webhook Reconciliation Engine',
    category: 'Entrepreneurship',
    duration: '10 hours',
    stack: 'Razorpay UPI Webhooks, HMAC SHA256, PostgreSQL, PDF Invoicing',
    description:
      'Resilient order processing pipeline with idempotent payment signature verification, automated GST-compliant invoice generation, and real-time inventory decrement.',
    rubricHighlights: 'Idempotency Handling (40%), Payment Verification (30%), Ledger Integrity (30%)',
    href: '/projects',
  },
  {
    title: 'Interactive Physics Gravity & Motion Simulator',
    category: 'School Foundation',
    duration: '8 hours',
    stack: 'Python, Visual Canvas Animation, Computational Math',
    description:
      'Visual interactive simulator illustrating kinetic energy, projectile trajectory, and friction coefficients designed by Class 8/9 bridge students under mentor guidance.',
    rubricHighlights: 'Mathematical Accuracy (40%), Code Structure (30%), Experimental Documentation (30%)',
    href: '/projects',
  },
]

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 selection:bg-[#0080FF] selection:text-white">
      {/* 1. Urgent Admissions Alert Banner */}
      <aside aria-label="Admissions announcement" className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-2.5 px-4 text-xs font-semibold shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold tracking-wide uppercase text-[10px] sm:text-[11px] text-amber-300 bg-black/40 px-2 py-0.5 rounded-full border border-amber-300/30">
              Admissions Open 2026–27
            </span>
            <span className="text-white/95">
              <strong>Class 9 Foundation Programme (After Class 8)</strong>: 96 Live Sessions, 7 Subjects, Laptop Included Option.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#class-9-flagship" className="underline hover:text-amber-200 transition-colors font-bold text-[11px]">
              Enrol Now • Batches Starting Soon →
            </a>
          </div>
        </div>
      </aside>

      {/* 2. Flagship Sales Section: Class 9 Foundation Programme with 4D Interactive Brochure */}
      <section id="class-9-flagship" className="relative overflow-hidden bg-gradient-to-b from-[#020716] via-[#04122d] to-[#020817] text-white pt-4 pb-16 px-3 sm:px-6 lg:px-8 border-b border-blue-500/20">
        {/* Ambient Spatial Lighting */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[580px] bg-[radial-gradient(ellipse_at_top,_rgba(0,128,255,0.28),_transparent_70%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl space-y-6">
          {/* Brand Announcement Pill & Official Ecosystem Trio in Streamlined Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.15] bg-white/[0.05] px-3 py-1 text-[11px] font-medium backdrop-blur-md">
              <TalentXcelEmblem className="h-3 w-3" pixelSize={16} />
              <span className="text-neutral-300">TalentXcel Academy • Flagship Foundation 2026–27</span>
            </div>
            <div>
              <EcosystemTrioLogos />
            </div>
          </div>

          {/* Full Interactive Class 9 Sales Experience with 4D Brochure, 7 Subjects, Pricing & Checkout */}
          <Class9FoundationSalesExperience />
        </div>
      </section>

      {/* 3. The Multi-Ambition Horizon: One Platform. Every Ambition. One Personal Super AI. */}
      <section className="relative overflow-hidden bg-[#000000] text-white pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-white/[0.08]">
        {/* Subtle Ambient Radial Lighting */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1100px] h-[520px] bg-[radial-gradient(ellipse_at_top,_rgba(0,128,255,0.24),_transparent_65%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-3 max-w-3xl mx-auto">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10 text-xs">
              Next-Generation AI Learning Platform
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              One Platform. Every Ambition. One Personal Super AI.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              A path from learning to real-world capability. A student should be able to say, &ldquo;I want to crack NEET,&rdquo; &ldquo;I want to become an AI developer,&rdquo; &ldquo;I want a healthcare technology career,&rdquo; or &ldquo;I want to start a business&rdquo;—and the platform should build a relevant journey without forcing them to navigate dozens of unrelated websites.
            </p>
          </div>

          {/* Super AI Ambition Cockpit — Master Concept Experience */}
          <SuperAiAmbitionCockpit />

          {/* Core Hero Pillars & Interactive Sandbox Preview */}
          <div className="space-y-6 max-w-4xl mx-auto pt-10 border-t border-white/[0.08]">
            <div className="space-y-2 text-center">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Three Pillars of Demonstrated Mastery</h2>
              <p className="text-xs text-neutral-400">Why TalentXcel Academy differs fundamentally from passive course websites.</p>
            </div>

            {/* Immediate 3 Value Propositions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <Brain className="h-4 w-4 text-[#0080FF] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Grounded AI Tutor</strong>
                  <span className="text-neutral-400">Understands your syllabus; guides with Socratic hints.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <Code2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Build, Not Just Watch</strong>
                  <span className="text-neutral-400">Run code in sandboxes; verified with automated unit tests.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                <Award className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-semibold">Credible Evidence</strong>
                  <span className="text-neutral-400">Skills certified on permanent public registry.</span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="rounded-full bg-[#0080FF] hover:bg-[#0070E0] text-white px-8 font-semibold text-sm shadow-[0_4px_24px_rgba(0,128,255,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Enter Learner Workspace (Demo)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/apply">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.1] px-7 font-medium text-sm backdrop-blur-md"
                >
                  Apply for Admission
                </Button>
              </Link>
              <Link href="/programmes">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-neutral-400 hover:text-white text-xs px-5 font-normal"
                >
                  Explore Syllabus →
                </Button>
              </Link>
            </div>

            <p className="text-xs text-neutral-500 max-w-xl mx-auto text-center">
              Platform-issued milestone certificates • Explicitly distinct from statutory university degrees or clinical licenses
            </p>

            {/* Interactive Hero Product Demonstration Component */}
            <div className="pt-6">
              <HeroProductDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Interactive Learning Workspace Preview */}
      <section className="py-20 sm:py-28 bg-neutral-50 dark:bg-[#060606] border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
              Personalized Learning Architecture
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              An Objective-Centric Workspace, Not a Course Grid
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Generic course platforms leave you staring at an endless grid of passive video tiles. TalentXcel re-architects your dashboard around today’s active objective, immediate project task, and demonstrable skill gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border shadow-xs p-6 space-y-3 bg-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Today’s Recommended Action</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Super AI analyzes your assessment diagnostics to surface your highest-leverage task for today. Never wonder what to study next.
              </p>
            </Card>

            <Card className="border shadow-xs p-6 space-y-3 bg-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Active Guided Sandbox</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Resume your code right where you left off. Execute unit test assertions and receive multi-dimensional rubric feedback in an isolated environment.
              </p>
            </Card>

            <Card className="border shadow-xs p-6 space-y-3 bg-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-[#0080FF]">
                <Download className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Offline-First IndexedDB</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Download curriculum lessons and workbooks for offline commute. Progress syncs automatically via background queues when reconnected.
              </p>
            </Card>
          </div>

          <div className="text-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full px-8 text-xs font-semibold gap-2">
                Open Personal Learner Workspace <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: The Living Skill Graph */}
      <section id="skill-graph-section" className="py-20 sm:py-28 bg-white dark:bg-black border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-3">
            <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
              Core Platform Capability
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              The Living Skill Graph
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Skills are earned through runnable code assertions and rubric evaluation — never solely through passive video view completion. Explore prerequisite relationships, diagnostic evidence, and next steps below.
            </p>
          </div>

          {/* Interactive SkillGraph Component */}
          <SkillGraph programmeSlug="ai-development" initialSelectedId="skill-pg-vector" />
        </div>
      </section>

      {/* Section 4: Build While You Learn (Project-Based Learning Showcase) */}
      <section className="py-20 sm:py-28 bg-neutral-50 dark:bg-[#070707] border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
              Pedagogy: Build While You Learn
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Engineering Portfolios That Speak for Themselves
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Instead of theoretical multiple-choice quizzes alone, every programme culminates in real, verifiable software systems tested against industry-grade rubrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectShowcase.map((p, idx) => (
              <Card key={idx} className="border shadow-xs flex flex-col justify-between hover:border-foreground/30 transition-all bg-card">
                <CardHeader className="pb-3 border-b bg-muted/20">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <Badge variant="outline">{p.category}</Badge>
                    <span className="text-muted-foreground font-mono">{p.duration}</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">
                    {p.title}
                  </CardTitle>
                  <div className="text-xs text-primary font-mono pt-1">
                    {p.stack}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                  <div className="space-y-1 p-3 rounded-xl border bg-muted/20 text-xs">
                    <span className="font-semibold text-foreground text-[11px] uppercase tracking-wider block">
                      Evaluation Rubric Dimensions:
                    </span>
                    <span className="text-muted-foreground text-[11px] leading-relaxed">
                      {p.rubricHighlights}
                    </span>
                  </div>
                  <div className="pt-2">
                    <Link href={p.href}>
                      <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                        Open Project Workspace <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: The Personalized Learning Journey */}
      <section className="py-20 sm:py-28 bg-white dark:bg-black border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
              The 5-Stage Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              From Baseline to Verified Mastery
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              How our integrated AI intelligence guides you from first diagnostic to demonstrated portfolio credibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Objective Calibration',
                desc: 'Diagnostic assessment identifies current skill gaps and creates your initial Living Skill Graph.',
              },
              {
                step: '02',
                title: 'Socratic Tutoring',
                desc: 'Super AI delivers progressive hints without leaking answers, grounding you in real engineering theory.',
              },
              {
                step: '03',
                title: 'Sandboxed Build',
                desc: 'Code structured tasks in isolated workspaces with automated unit test assertions running live.',
              },
              {
                step: '04',
                title: 'Rubric Evaluation',
                desc: 'Submissions are scored across 4 rigorous dimensions: Architecture, Security, Test Coverage, and Quality.',
              },
              {
                step: '05',
                title: 'Verified Registry',
                desc: 'Milestones earn cryptographically verified credentials visible on the public verification registry.',
              },
            ].map((st, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-card/60 space-y-2 relative"
              >
                <div className="font-mono text-xs font-bold text-[#0080FF]">{st.step}</div>
                <h3 className="font-bold text-sm text-foreground">{st.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Complete 20-Family Programme Universe Explorer */}
      <section id="programmes-universe" className="py-20 sm:py-28 bg-neutral-950 text-white border-b border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Complete 20-Family Interactive Catalogue */}
          <ProgrammeUniverseExplorer />

          <div className="pt-12 border-t border-white/[0.08]">
            <div className="text-center max-w-3xl mx-auto space-y-3 pb-8">
              <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
                Flagship Cohorts
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Featured Flagship Pathways
              </h2>
              <p className="text-base text-neutral-400">
                In-depth breakdown of currently enrolling programmes with verified hardware delivery and industry accreditation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programmes.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.id}
                  className={`h-full rounded-3xl p-8 sm:p-10 transition-all duration-300 flex flex-col justify-between ${
                    p.highlight
                      ? 'border-2 border-[#0080FF]/40 bg-white dark:bg-neutral-900/80 shadow-xl'
                      : 'border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-900/40 shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0080FF]/10">
                        <Icon className="h-6 w-6 text-[#0080FF]" />
                      </div>
                      <Badge
                        variant={p.highlight ? 'default' : 'secondary'}
                        className="rounded-full text-xs font-semibold px-3 py-1"
                      >
                        {p.status}
                      </Badge>
                    </div>

                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0080FF]">
                      {p.badge}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                      {p.title}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                      {p.tagline}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {p.description}
                    </p>

                    {p.disclaimer && (
                      <div className="p-3 rounded-xl border border-amber-500/25 bg-amber-500/5 text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{p.disclaimer}</span>
                      </div>
                    )}

                    <div className="space-y-2 pt-2 border-t border-border">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="h-3.5 w-3.5 text-primary" /> {p.duration}
                        </span>
                        <span>•</span>
                        <span>{p.workload}</span>
                        <span>•</span>
                        <span>{p.level}</span>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        {p.topics.map((t, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t mt-6 flex flex-col sm:flex-row items-center gap-3">
                    <Link href={p.href} className="w-full sm:w-auto">
                      <Button size="sm" className="w-full sm:w-auto text-xs font-semibold">
                        View Detailed Syllabus
                      </Button>
                    </Link>
                    <Link href={`/apply?programme=${p.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>

      {/* Section 7: Credible Explanation of Super AI */}
      <section className="py-20 sm:py-28 bg-white dark:bg-black border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
              AI Transparency & Safety
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              How Super AI Actually Works
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              We reject simulated hype and deceptive AI claims. Here is our exact architectural guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border p-6 space-y-4">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" />
                What Super AI Does
              </h3>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Curriculum RAG Grounding</strong>: Queries retrieve verified syllabus knowledge chunks from PostgreSQL pgvector before reasoning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Socratic Guidance</strong>: Progressive hints (Hint 1 conceptual clue, Hint 2 decomposition, Hint 3 code scaffolding) teach problem decomposition.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Safe Sandboxed Evaluation</strong>: Learner code is evaluated safely without running arbitrary commands in privileged processes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>Source Citations</strong>: Responses include verified knowledge source references.</span>
                </li>
              </ul>
            </Card>

            <Card className="border p-6 space-y-4">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                What Super AI Never Does
              </h3>
              <ul className="space-y-3 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span><strong>Never Writes Homework For You</strong>: Full solutions are withheld until independent problem decomposition is demonstrated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span><strong>No Fabricated Responses</strong>: Discloses uncertainty when confidence is below defined thresholds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span><strong>No Simulated Live Demos</strong>: Backed by real server-side AI integrations with strict token budgeting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span><strong>Instructor Escalation</strong>: Any learner can escalate an ambiguous or inadequate answer directly to an academy mentor.</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 8: Learning, Portfolio Evidence & Verifiable Credential */}
      <section className="py-20 sm:py-28 bg-neutral-50 dark:bg-[#070707] border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8 text-center">
          <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
            Permanent Credential Verification
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Proof of Competence, Not Paper Certificates
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Every completion certificate issued by TalentXcel is tied to authenticated assessment scores, passing test assertions, and rubric evaluations. Anyone can verify genuine credentials on our public registry.
          </p>

          <div className="p-6 rounded-2xl border bg-card max-w-xl mx-auto flex items-center justify-between gap-4 text-left">
            <div>
              <div className="text-xs text-muted-foreground font-mono">Sample Registry Query:</div>
              <div className="font-bold text-sm text-foreground mt-0.5">TXCERT-2026-DEMO01</div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1">
                ✓ Verified Authentic • All Rubric Standards Met
              </div>
            </div>
            <Link href="/verify/TXCERT-2026-DEMO01">
              <Button size="sm" variant="outline" className="text-xs gap-1">
                Verify Now <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9: Transparent Tuition Plans */}
      <section className="py-20 sm:py-28 bg-white dark:bg-black border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="space-y-3 max-w-2xl mx-auto">
            <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
              Commercial Transparency
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Honest, Milestone-Aligned Tuition
            </h2>
            <p className="text-base text-neutral-600 dark:text-neutral-400">
              Transparent instalment plans and full payment options with dedicated laptop included.
            </p>
          </div>

          <ProgrammePricingPlans
            programmeTitle="AI Development & Automation"
            durationMonths={8}
            slug="ai-development"
            showProgrammeSelector={false}
          />

          <div className="pt-2">
            <Link href="/fees">
              <Button variant="outline" className="rounded-full text-xs font-semibold px-6">
                View All Programme Fees & Refund Terms →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 10: Final Admissions CTA */}
      <section className="py-24 bg-[#000000] text-white border-t border-white/[0.08] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <TalentXcelEmblem className="h-12 w-12 mx-auto" />
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Ready to Build Your Engineering Portfolio?
          </h2>
          <p className="text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Apply for admission to the upcoming cohort or enter our interactive demonstration workspace to experience Super AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/apply">
              <Button
                size="lg"
                className="rounded-full bg-[#0080FF] hover:bg-[#0070E0] text-white px-8 font-semibold text-sm shadow-[0_4px_24px_rgba(0,128,255,0.35)]"
              >
                Apply for Admission
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.1] px-8 font-medium text-sm"
              >
                Enter Learner Workspace (Demo)
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="ghost"
                className="text-neutral-400 hover:text-white text-xs px-6 font-normal"
              >
                Speak with Counsellor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
