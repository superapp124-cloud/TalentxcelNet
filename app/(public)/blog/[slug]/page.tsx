import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Calendar, Share2, BookOpen, User, CheckCircle2 } from 'lucide-react'

const blogPosts: Record<string, {
  title: string
  category: string
  readTime: string
  publishedAt: string
  author: string
  authorRole: string
  content: string
}> = {
  'building-resilient-ai-agents': {
    title: 'Building Resilient AI Agents with Grounded System Boundaries',
    category: 'AI Engineering',
    readTime: '6 min read',
    publishedAt: '15 Oct 2026',
    author: 'Arshid Wani',
    authorRole: 'Lead AI Systems Architect',
    content: `
### 1. The Challenge of Unconstrained Agents
Building autonomous AI agents in educational and enterprise workflows requires strict boundary preservation. Without deterministic guardrails, large language models are vulnerable to prompt injection, hallucinated facts, and unauthorized tool invocation.

### 2. Multi-Layer Defense in TalentXcel Super AI
In TalentXcel, our AI architecture enforces a 3-tier boundary pipeline:
- **Layer 1: Input Sanitization**: Regular expression pattern matching intercepts attempts to override system prompts or simulate developer mode before the request ever reaches model tokens.
- **Layer 2: Grounded Retrieval (RAG)**: The model is restricted to verified curriculum documents and policy FAQs indexed in PostgreSQL.
- **Layer 3: Socratic Scaffolding**: For educational inquiries, the tutor is instructed to provide step-by-step hints (#1 through #5) rather than dumping full answers, fostering genuine critical thinking.

### 3. Graceful Fallbacks & High Availability
When third-party model providers encounter transient network timeouts, our deterministic fallback engine produces immediate, safe, curriculum-guided responses, maintaining 100% platform uptime.
    `,
  },
  'digital-health-interoperability-abdm': {
    title: 'Understanding Digital Health Standards: FHIR, ABDM, and Health Informatics',
    category: 'Healthcare Tech',
    readTime: '8 min read',
    publishedAt: '12 Oct 2026',
    author: 'Dr. Priya Ramanathan',
    authorRole: 'Healthcare Informatics Mentor',
    content: `
### 1. The Evolution of Electronic Health Records (EHR)
Healthcare delivery increasingly relies on standardized clinical data exchange. HL7 FHIR (Fast Healthcare Interoperability Resources) provides a RESTful architecture for exchanging clinical resources such as Patient demographics, Observations, and Diagnostic Reports.

### 2. India's Ayushman Bharat Digital Mission (ABDM)
India's digital health ecosystem is anchored by ABDM:
- **ABHA ID**: Unique digital identifier enabling longitudinal health history tracking.
- **Consent Manager**: Architectural framework allowing patients to provide granular, time-bound consent to share health records between registered providers.
- **Milestone Implementation**: Technology professionals must understand security, encryption, and data-at-rest compliance under the DPDP Act 2023.

### 3. Clear Boundaries: Technology vs Clinical Practice
TalentXcel's Healthcare Technology track focuses strictly on software engineering, FHIR APIs, and data privacy. It prepares engineers for healthtech product teams, not regulated medical diagnosis or clinical treatment.
    `,
  },
  'msme-digitization-automated-workflows': {
    title: 'Automating the Small Enterprise: From Invoicing to Customer CRM',
    category: 'Digitization',
    readTime: '5 min read',
    publishedAt: '08 Oct 2026',
    author: 'Vikram Joshi',
    authorRole: 'Enterprise Systems Director',
    content: `
### 1. Eliminating Friction in Small Enterprise Operations
Most Indian micro, small, and medium enterprises (MSMEs) run critical workflows across disjointed paper registers and isolated messaging threads. Digitization unlocks measurable efficiency when applied to high-frequency operations.

### 2. Key Pillars of Practical Digitization
- **Automated Invoicing & GST Reconciliation**: Generating compliant invoices that update inventory ledgers automatically upon order dispatch.
- **Unified Customer Data**: Tracking prospective customer inquiries from social channels and WhatsApp into a single persistent database.
- **Milestone-Based Inventory Reordering**: Setting dynamic inventory reorder thresholds to prevent stockouts during peak seasonal demand.

### 3. Practical Case Studies
Learners in our Entrepreneurship & Digitization programme build working digital storefronts with integrated payment gateways and automated dispatch tracking.
    `,
  },
  'computational-thinking-middle-school': {
    title: 'Transitioning from Class 8 to 9: Why Early Computational Thinking Matters',
    category: 'School Foundation',
    readTime: '7 min read',
    publishedAt: '03 Oct 2026',
    author: 'Sunita Mehra',
    authorRole: 'Foundations Academic Lead',
    content: `
### 1. The Academic Leap from Middle to High School
Moving from Class 8 to Class 9 introduces rigorous analytical demands in mathematics and sciences. Students who approach these concepts with structured problem-solving frameworks adapt with significantly higher confidence.

### 2. What Is Computational Thinking?
Computational thinking is not merely learning syntax in a programming language; it is a cognitive mindset comprised of:
- **Decomposition**: Breaking complex word problems into solvable sub-components.
- **Pattern Recognition**: Identifying relationships between mathematical series and real-world models.
- **Algorithmic Logic**: Designing reproducible step-by-step solutions.

### 3. Guardian Involvement & Child Safety
Our School Foundation programme incorporates explicit guardian checkpoints, distraction-free learning environments, and child-safe AI mentorship.
    `,
  },
  'offline-first-pwa-architecture': {
    title: 'Architecting Offline-First Progressive Web Apps with IndexedDB & Service Workers',
    category: 'Software Architecture',
    readTime: '10 min read',
    publishedAt: '28 Sep 2026',
    author: 'Arshid Wani',
    authorRole: 'Lead Systems Architect',
    content: `
### 1. The Reality of Low-Bandwidth Connectivity
In many Tier-2 and Tier-3 educational environments, continuous high-speed broadband cannot be assumed. An accessible education platform must function seamlessly during intermittent dropouts and low signal.

### 2. Client-Side Storage Architecture
- **Service Worker Precaching**: Serving HTML, CSS, and brand assets directly from CacheStorage on subsequent visits.
- **IndexedDB for Curriculum Modules**: Allowing learners to explicitly tap "Download for Offline" to store lesson text, code snippets, and knowledge checks locally on their device.
- **Asynchronous Sync Queue**: Storing lesson completion events and quiz attempts in an offline queue, syncing to PostgreSQL when connectivity returns.

### 3. Conflict Resolution
Using optimistic UI updates with deterministic timestamp resolution ensures learners never lose progress made while travelling or working disconnected.
    `,
  },
}

const BLOG_EXCERPTS: Record<string, string> = {
  'building-resilient-ai-agents':
    'Explore deterministic routing, prompt-injection defense, and Socratic scaffolding for enterprise educational agents.',
  'digital-health-interoperability-abdm':
    'A comprehensive technical overview of healthcare interoperability protocols, patient consent management, and data security under ABDM and FHIR.',
  'msme-digitization-automated-workflows':
    'Practical playbooks for Indian small businesses to digitize inventory, streamline GST invoicing, and automate order reconciliation.',
  'computational-thinking-middle-school':
    'A guide for parents and educators on nurturing problem-solving stamina, structured logic, and healthy digital habits in teenagers transitioning to Class 9.',
  'offline-first-pwa-architecture':
    'Technical deep-dive on designing sync queues, conflict resolution, and cached media storage for low-bandwidth learners in Tier 2/3 locations.',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]
  if (!post) {
    return {
      title: 'Article Not Found',
    }
  }

  const canonicalUrl = `https://talentxcel.net/blog/${slug}`
  const description =
    BLOG_EXCERPTS[slug] ||
    post.content.replace(/[#*`\n]/g, ' ').trim().slice(0, 160)

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: canonicalUrl,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to All Articles
        </Link>

        {/* Article Meta */}
        <div className="space-y-4">
          <Badge variant="outline" className="text-primary border-primary/30">
            {post.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2 border-b pb-6">
            <span className="flex items-center gap-1.5 font-semibold text-foreground">
              <User className="h-3.5 w-3.5 text-primary" /> {post.author} ({post.authorRole})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {post.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="rounded-2xl border bg-card p-6 sm:p-10 prose dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap font-sans text-sm sm:text-base leading-relaxed space-y-4">
            {post.content}
          </div>
        </div>

        {/* Topic Cluster Pathway CTA */}
        {(() => {
          const programmeMap: Record<string, { href: string; title: string; subtitle: string; label: string }> = {
            'building-resilient-ai-agents': {
              href: '/programmes/ai-development',
              title: 'AI Development & Automation Programme',
              subtitle: 'Learn to build production-grade RAG pipelines, pgvector search, and supervised agent boundaries.',
              label: 'View AI Curriculum & Admissions',
            },
            'digital-health-interoperability-abdm': {
              href: '/programmes/healthcare-tech',
              title: 'Healthcare Technology Programme',
              subtitle: 'Master FHIR HL7 standards, ABDM consent architecture, and DPDP-compliant health records.',
              label: 'View Healthcare Curriculum & Admissions',
            },
            'msme-digitization-automated-workflows': {
              href: '/programmes/entrepreneurship',
              title: 'Entrepreneurship & Small Business Digitization',
              subtitle: 'Digitize your store operations, automate GST invoicing, and launch resilient payment workflows.',
              label: 'View Business Curriculum & Admissions',
            },
            'computational-thinking-middle-school': {
              href: '/programmes/class-9-foundation',
              title: 'Class 9 Foundation Programme (After Class 8)',
              subtitle: 'Build early analytical mastery across Physics, Chemistry, Biology, Math, and Study Skills.',
              label: 'View Class 9 Syllabus & Laptop Package',
            },
            'offline-first-pwa-architecture': {
              href: '/programmes/ai-development',
              title: 'Full-Stack Software Architecture Track',
              subtitle: 'Learn client-side persistence, background sync, and offline-first PWA engineering.',
              label: 'View Software Curriculum',
            },
          }
          const linkedProg = programmeMap[slug] || {
            href: '/apply',
            title: 'Apply practical skills in structured cohorts',
            subtitle: 'Master hands-on project engineering with the TalentXcel Academy curriculum and Super AI Tutor.',
            label: 'Explore Admissions',
          }

          return (
            <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/5 via-card to-background p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1.5">
                <Badge variant="outline" className="text-primary border-primary/30 text-[10px] uppercase font-bold">
                  Recommended Pathway
                </Badge>
                <h3 className="font-extrabold text-lg text-foreground">{linkedProg.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                  {linkedProg.subtitle}
                </p>
              </div>
              <Link href={linkedProg.href} className="shrink-0">
                <Button size="sm" className="font-bold text-xs gap-1.5">
                  {linkedProg.label} <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                </Button>
              </Link>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
