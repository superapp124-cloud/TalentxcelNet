import Link from 'next/link'
import { ArrowRight, Brain, Zap, Award, Download, Users, BookOpen, Code2, Stethoscope, Building2, GraduationCap, CheckCircle2, Clock, Laptop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const programmes = [
  {
    id: 'ai-development',
    icon: Brain,
    badge: 'Flagship',
    badgeVariant: 'default' as const,
    title: 'AI Development & Automation',
    description: 'Build real AI applications, APIs, and automated workflows. From programming fundamentals through RAG systems, AI agents, and deployment.',
    duration: '8 months',
    level: 'Beginner to Advanced',
    topics: ['Python & Web Dev', 'AI Application Dev', 'RAG & Agents', 'Deployment & Security'],
    href: '/programmes/ai-development',
    status: 'Enrolling Soon',
  },
  {
    id: 'healthcare-tech',
    icon: Stethoscope,
    badge: 'Specialist',
    badgeVariant: 'secondary' as const,
    title: 'Healthcare Technology',
    description: 'Digital health systems, interoperability, data privacy, and technology product design for the healthcare sector. Technology programme only — not a clinical qualification.',
    duration: 'To be confirmed',
    level: 'Intermediate',
    topics: ['Health Information Systems', 'Data Privacy', 'Interoperability', 'Analytics'],
    href: '/programmes/healthcare-tech',
    status: 'Coming Soon',
  },
  {
    id: 'entrepreneurship',
    icon: Building2,
    badge: 'Business',
    badgeVariant: 'secondary' as const,
    title: 'Entrepreneurship & Digitization',
    description: 'Launch and operate a digital business. E-commerce, payments, CRM, inventory, marketing analytics, and practical automation.',
    duration: 'To be confirmed',
    level: 'Beginner to Intermediate',
    topics: ['Digital Storefronts', 'Payments & CRM', 'Marketing Analytics', 'Automation'],
    href: '/programmes/entrepreneurship',
    status: 'Coming Soon',
  },
  {
    id: 'school-foundation',
    icon: GraduationCap,
    badge: 'School',
    badgeVariant: 'secondary' as const,
    title: 'School Foundation (Class 8 → 9)',
    description: 'An 8-month standalone programme for students progressing from Class 8 to 9. Mathematics, science, digital literacy, and supervised projects with guardian involvement.',
    duration: '8 months',
    level: 'Foundation',
    topics: ['Mathematics', 'Science', 'Digital Literacy', 'Study Skills'],
    href: '/programmes/school-foundation',
    status: 'Coming Soon',
  },
]

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Learning',
    description: 'An AI tutor that explains concepts at your level, gives step-by-step hints, and links answers to your course materials.',
  },
  {
    icon: Code2,
    title: 'Real Projects',
    description: 'Build an actual portfolio of projects assessed against defined rubrics — not just theoretical exercises.',
  },
  {
    icon: Download,
    title: 'Offline Access',
    description: 'Download lessons for low-bandwidth or travel situations. Learn where and when it suits you.',
  },
  {
    icon: Users,
    title: 'Mentor Feedback',
    description: 'Qualified instructors review your work, provide structured feedback, and track your progress.',
  },
  {
    icon: Award,
    title: 'Verified Certificates',
    description: 'Completion certificates issued only after defined criteria are met, with a public verification page.',
  },
  {
    icon: Zap,
    title: 'Practical Outcomes',
    description: 'Curriculum designed around real job tasks, business problems, and demonstrable skills — not just content consumption.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Apply and Get Admitted',
    description: 'Submit your enquiry, speak with an admissions counsellor, and complete your application. Enrolment follows the configured admission and payment rules.',
  },
  {
    number: '02',
    title: 'Learn, Practice, Build',
    description: 'Follow structured modules at your pace. Get AI-assisted explanations, practise with real exercises, and build projects in each module.',
  },
  {
    number: '03',
    title: 'Demonstrate and Earn',
    description: 'Submit assessments, receive instructor feedback, and earn your certificate when you meet the defined completion requirements.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-20 lg:py-32" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.15),transparent_70%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6 border-blue-500/30 text-blue-400 bg-blue-500/10">
              <Zap className="mr-1.5 h-3 w-3" aria-hidden="true" />
              AI-First Education Platform
            </Badge>
            <h1 id="hero-heading" className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Learn Practical Skills.{' '}
              <span className="text-blue-400">Build Real Projects.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
              TalentXcel Academy delivers structured, career-oriented programmes with AI-powered tutoring, hands-on projects, and mentor feedback — designed for the digital economy.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button size="xl" variant="gradient">
                  Apply for Admission
                  <ArrowRight className="ml-1 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/programmes">
                <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                  <BookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                  Explore Programmes
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Platform-issued completion certificates. Not a regulated qualification.
            </p>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-20 lg:py-28 bg-background" aria-labelledby="programmes-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="programmes-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Programmes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Structured learning paths built around real outcomes, practical skills, and demonstrable competencies.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.map((prog) => {
              const Icon = prog.icon
              return (
                <Link key={prog.id} href={prog.href} className="group">
                  <Card className="h-full transition-shadow hover:shadow-md hover:border-primary/30">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <Badge variant={prog.status === 'Enrolling Soon' ? 'success' : 'secondary'} className="text-xs">
                          {prog.status}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{prog.title}</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{prog.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          {prog.duration}
                        </span>
                      </div>
                      <ul className="space-y-1" role="list" aria-label="Programme topics">
                        {prog.topics.map((topic) => (
                          <li key={topic} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" aria-hidden="true" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-0.5 transition-transform">
                        Learn more <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-muted/30" aria-labelledby="how-it-works-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How TalentXcel Works
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-background" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Built for Serious Learning
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every feature designed to support real learning, not just content access.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="flex gap-4 p-6 rounded-xl border bg-card hover:shadow-sm transition-shadow">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1.5">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fees Preview */}
      <section className="py-20 lg:py-28 bg-slate-900 text-white" aria-labelledby="fees-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-6 border-blue-500/30 text-blue-400 bg-blue-500/10">
            Transparent Pricing
          </Badge>
          <h2 id="fees-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI Development Programme — Indicative Fees
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            The proposed fee structure for the 8-month flagship programme is subject to confirmation and GST.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex-1 max-w-xs mx-auto sm:mx-0">
              <div className="text-3xl font-bold text-white">₹29,999</div>
              <div className="text-blue-300 text-sm font-medium mt-1">Upfront on enrolment</div>
              <div className="text-slate-400 text-sm mt-2">+ ₹1,500/month × 8 months</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex-1 max-w-xs mx-auto sm:mx-0">
              <div className="text-3xl font-bold text-white">₹41,999</div>
              <div className="text-blue-300 text-sm font-medium mt-1">Total programme value</div>
              <div className="text-slate-400 text-sm mt-2">Excl. GST. Installment plan available.</div>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-400 max-w-xl mx-auto">
            Indicative pricing only. Final fees, tax handling, and payment terms are set by authorized administrators and subject to applicable consumer protection requirements. Please verify at the time of application.
          </p>
          <div className="mt-8">
            <Link href="/fees">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                View Full Fees & Payment Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Start?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Submit an enquiry and speak with an admissions counsellor about the right programme for your goals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg">
                Apply for Admission
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
