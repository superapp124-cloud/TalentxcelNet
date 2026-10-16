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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { TalentXcelEmblem, Logo } from '@/components/brand/logo'

const programmes = [
  {
    id: 'ai-development',
    icon: Brain,
    badge: 'Flagship Curriculum',
    title: 'AI Development & Automation',
    tagline: 'Engineered for the frontier of software.',
    description:
      'From fundamentals to multi-tenant RAG systems, PostgreSQL pgvector optimization, supervised AI agents, and production deployment with automated CI/CD.',
    duration: '8 months',
    level: 'Beginner to Advanced',
    topics: ['Python & Modern Web', 'RAG & pgvector', 'Supervised Agents', 'CI/CD & Testing'],
    href: '/programmes/ai-development',
    status: 'Applications Open',
    highlight: true,
  },
  {
    id: 'healthcare-tech',
    icon: Stethoscope,
    badge: 'Specialist Track',
    title: 'Healthcare Technology',
    tagline: 'Health informatics & interoperability.',
    description:
      'Digital health information systems, FHIR/HL7 exchange standards, patient data privacy (DPDP & DISHA), and hospital workflow optimization.',
    duration: 'To be confirmed',
    level: 'Intermediate',
    topics: ['Hospital Information Systems', 'FHIR / HL7 Standards', 'Indian DPDP Act Privacy', 'Workflow Analytics'],
    href: '/programmes/healthcare-tech',
    status: 'Waitlist',
    highlight: false,
  },
  {
    id: 'entrepreneurship',
    icon: Building2,
    badge: 'Operations Track',
    title: 'Entrepreneurship & Digitization',
    tagline: 'Modern digital enterprise operations.',
    description:
      'Launch and operate an online business. Omni-channel storefronts, Razorpay payments, CRM automation, inventory logic, and marketing analytics.',
    duration: 'To be confirmed',
    level: 'Beginner to Intermediate',
    topics: ['Digital Storefronts', 'Payment Reconciliation', 'Customer CRM Funnels', 'Operations Automation'],
    href: '/programmes/entrepreneurship',
    status: 'Waitlist',
    highlight: false,
  },
  {
    id: 'school-foundation',
    icon: GraduationCap,
    badge: 'School Bridge',
    title: 'School Foundation (Class 8 → 9)',
    tagline: 'Foundations for future innovators.',
    description:
      'An 8-month standalone bridge programme for learners progressing from Class 8 into Class 9. Foundational mathematics, science, digital literacy, and guardian-guided projects.',
    duration: '8 months',
    level: 'Foundation',
    topics: ['Mathematical Thinking', 'Scientific Inquiry', 'Algorithmic Thinking', 'Guardian Oversight'],
    href: '/programmes/school-foundation',
    status: 'Enrolling Soon',
    highlight: false,
  },
]

const pillars = [
  {
    icon: Brain,
    title: 'Super AI Tutor',
    description:
      'A curriculum-grounded Socratic assistant that gives progressive hints without revealing answers, teaching you to solve problems autonomously.',
  },
  {
    icon: Code2,
    title: 'Verified Portfolios',
    description:
      'Build real, tested software portfolios evaluated against industry rubrics rather than memorizing theoretical trivia.',
  },
  {
    icon: Download,
    title: 'Offline-First PWA',
    description:
      'Download lessons and coding workbooks for off-grid or low-bandwidth travel. Progress syncs automatically when you reconnect.',
  },
  {
    icon: Users,
    title: 'Practitioner Mentors',
    description:
      'Weekly structured code reviews, office hours, and individualized guidance from experienced systems engineers.',
  },
  {
    icon: ShieldCheck,
    title: 'Private & Secure',
    description:
      'PostgreSQL Row Level Security, child-safety safeguards for minors, and strict adherence to India’s DPDP Act 2023.',
  },
  {
    icon: Award,
    title: 'Publicly Verifiable',
    description:
      'Digital completion certificates issued upon meeting explicit milestone criteria, verifiable on our permanent registry.',
  },
]

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 selection:bg-[#0080FF] selection:text-white">
      {/* Hero Section — Apple-style Obsidian Dark Surface */}
      <section className="relative overflow-hidden bg-[#000000] text-white pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-white/[0.08]">
        {/* Subtle Ambient Radial Lighting */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[480px] bg-[radial-gradient(ellipse_at_top,_rgba(0,128,255,0.22),_transparent_65%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Brand Announcement Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.05] px-3.5 py-1 text-xs font-medium backdrop-blur-md mb-6 hover:bg-white/[0.08] transition-colors">
            <TalentXcelEmblem className="h-3.5 w-3.5" pixelSize={16} />
            <span className="text-neutral-300">TalentXcel Super AI Platform</span>
            <ChevronRight className="h-3 w-3 text-neutral-400" />
          </div>

          {/* Apple-grade Headline with subtle gradient typography */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Learn Practical Skills.{' '}
            <span className="bg-gradient-to-r from-[#0080FF] via-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Build Real Systems.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
            TalentXcel Academy delivers structured, career-defining programmes with intelligent Socratic AI tutoring, hands-on capstone engineering, and mentor review.
          </p>

          {/* Action Pills */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/apply">
              <Button
                size="lg"
                className="rounded-full bg-[#0080FF] hover:bg-[#0070E0] text-white px-7 font-semibold text-sm shadow-[0_4px_24px_rgba(0,128,255,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Apply for Admission
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/programmes">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.1] px-7 font-medium text-sm backdrop-blur-md"
              >
                Explore Syllabus
              </Button>
            </Link>
          </div>

          <p className="mt-5 text-xs text-neutral-500">
            Platform-issued milestone certificates • Not an accredited university degree or clinical qualification
          </p>
        </div>
      </section>

      {/* Bento Grid: Programmes Showcase */}
      <section className="py-24 sm:py-32 bg-neutral-50 dark:bg-[#080808]" aria-labelledby="programmes-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-3 text-[#0080FF] border-[#0080FF]/30">
              Curriculum Tracks
            </Badge>
            <h2 id="programmes-heading" className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Designed for What Matters
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
              Each programme is structured around demonstrable engineering competencies, portfolio evidence, and real tasks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programmes.map((p) => {
              const Icon = p.icon
              return (
                <Link key={p.id} href={p.href} className="group">
                  <div
                    className={`h-full rounded-3xl p-8 sm:p-10 transition-all duration-300 ${
                      p.highlight
                        ? 'border-2 border-[#0080FF]/40 bg-white dark:bg-neutral-900/80 shadow-xl dark:shadow-[0_10px_35px_rgba(0,128,255,0.1)]'
                        : 'border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/40 hover:border-black/[0.15] dark:hover:border-white/[0.18] shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/[0.04] dark:bg-white/[0.06]">
                        <Icon className="h-6 w-6 text-[#0080FF]" />
                      </div>
                      <Badge
                        variant={p.highlight ? 'default' : 'secondary'}
                        className="rounded-full text-xs font-semibold px-3 py-1"
                      >
                        {p.status}
                      </Badge>
                    </div>

                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0080FF] mb-1">
                      {p.badge}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-[#0080FF] transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                      {p.tagline}
                    </p>
                    <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] space-y-3">
                      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="h-3.5 w-3.5 text-[#0080FF]" /> {p.duration}
                        </span>
                        <span>•</span>
                        <span>{p.level}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {p.topics.map((t) => (
                          <div key={t} className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#0080FF] flex-shrink-0" />
                            <span className="truncate">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center text-sm font-semibold text-[#0080FF] group-hover:translate-x-1 transition-transform">
                      View Programme Syllabus <ArrowRight className="ml-1.5 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Super AI Spotlight Section */}
      <section className="py-24 bg-white dark:bg-black border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.1] bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-black p-8 sm:p-14 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0080FF]/10 text-[#0080FF] px-3.5 py-1 text-xs font-semibold">
                  <Sparkles className="h-3.5 w-3.5" /> Super AI Architecture
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                  A Tutor that Teaches You to Think.
                </h2>
                <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  Traditional chatbots give away the answer, cutting your learning short. The TalentXcel Super AI Tutor is grounded directly on your verified curriculum. It operates in progressive Socratic hint modes, gently nudging you past roadblocks without taking away the satisfaction of building the solution yourself.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link href="/how-it-works">
                    <Button className="rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-xs px-6">
                      See How It Works
                    </Button>
                  </Link>
                  <Link href="/programmes/ai-development">
                    <Button variant="outline" className="rounded-full text-xs px-6">
                      Explore AI Curriculum
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Simulated UI Card of the AI Tutor */}
              <div className="rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-950 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <TalentXcelEmblem className="h-6 w-6" />
                    <span className="text-xs font-bold">TalentXcel AI Tutor</span>
                  </div>
                  <Badge variant="success" className="text-[10px] px-2 py-0.5">
                    Socratic Mode
                  </Badge>
                </div>
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded-xl text-neutral-800 dark:text-neutral-200">
                    <span className="font-semibold block mb-0.5">Learner:</span>
                    How do I secure my Supabase table so only enrolled learners can view lesson content?
                  </div>
                  <div className="bg-[#0080FF]/10 border border-[#0080FF]/20 p-3.5 rounded-xl text-neutral-900 dark:text-neutral-100">
                    <span className="font-semibold text-[#0080FF] block mb-1">Super AI Tutor (Hint #1):</span>
                    Think about where the permission boundary belongs. Instead of checking in frontend JavaScript, look at PostgreSQL Row Level Security (RLS). Which existing relation links a learner&apos;s <code>auth.uid()</code> to their active course enrolment?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-neutral-50 dark:bg-[#050505] border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
              Engineered with Integrity
            </h2>
            <p className="mt-3 text-base text-neutral-500 dark:text-neutral-400">
              Built on uncompromising standards of software craft, privacy, and educational honesty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pi) => {
              const Icon = pi.icon
              return (
                <div
                  key={pi.title}
                  className="rounded-3xl border border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-900/50 p-8 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0080FF]/10 mb-5">
                    <Icon className="h-5 w-5 text-[#0080FF]" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{pi.title}</h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {pi.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Transparent Fees Preview */}
      <section className="py-24 bg-white dark:bg-black border-t border-black/[0.06] dark:border-white/[0.08]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
            Commercial Transparency
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Honest, Structured Tuition Plans
          </h2>
          <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
            Our flagship 8-month AI Development programme offers flexible instalment options designed for working professionals and learners.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto pt-4">
            <div className="rounded-3xl border-2 border-[#0080FF] bg-white dark:bg-neutral-900 p-8 text-left shadow-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0080FF]">Instalment Option</span>
              <div className="mt-3 text-4xl font-extrabold text-neutral-900 dark:text-white">₹29,999</div>
              <p className="text-xs text-neutral-500 mt-1">Upfront upon confirmed enrolment</p>
              <div className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-sm text-neutral-600 dark:text-neutral-300">
                + ₹1,500/month for 8 months (Excl. GST)
              </div>
            </div>

            <div className="rounded-3xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-neutral-900 p-8 text-left shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Single Settlement</span>
              <div className="mt-3 text-4xl font-extrabold text-neutral-900 dark:text-white">₹41,999</div>
              <p className="text-xs text-neutral-500 mt-1">Total programme tuition</p>
              <div className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] text-sm text-neutral-600 dark:text-neutral-300">
                Full course & mentor access (Excl. GST)
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/fees">
              <Button variant="outline" className="rounded-full text-xs font-semibold px-6">
                View Complete Tuition & Refund Terms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-[#000000] text-white border-t border-white/[0.08] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <TalentXcelEmblem className="h-12 w-12 mx-auto" />
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-base text-neutral-400 max-w-xl mx-auto">
            Connect with our admissions team to explore programme eligibility, curriculum pathways, and cohort schedules.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/apply">
              <Button
                size="xl"
                className="rounded-full bg-[#0080FF] hover:bg-[#0070E0] text-white px-8 font-semibold text-sm shadow-[0_4px_24px_rgba(0,128,255,0.35)]"
              >
                Apply for Admission
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="xl"
                variant="outline"
                className="rounded-full border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.1] px-8 font-medium text-sm"
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
