import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/types/database'
import Link from 'next/link'
import {
  Brain,
  Stethoscope,
  Building2,
  GraduationCap,
  Clock,
  ArrowRight,
  BookOpen,
  Landmark,
  Store,
  Home,
  Users,
  Activity,
  Laptop,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProgrammeUniverseExplorer } from '@/components/public/programme-universe-explorer'

export const metadata: Metadata = {
  title: 'Programmes — TalentXcel Academy',
  description:
    'Explore TalentXcel Academy programmes: AI Development, Healthcare Tech, Competitive Exams, Entrepreneurship, Small Business, Home Business, Teaching, and Foundation tracks.',
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'school-foundation': GraduationCap,
  'highschool-integrated-foundation': BookOpen,
  'ai-development': Brain,
  'healthcare-tech': Stethoscope,
  'competitive-exams': Landmark,
  entrepreneurship: Building2,
  'small-business': Store,
  'home-business': Home,
  'teachers-trainers': Users,
  'lifestyle-trainers': Activity,
}

const DEFAULT_ICON = GraduationCap

interface ProgrammeCardItem {
  id: string
  slug: string
  title: string
  short_description: string | null
  status: string
  duration_months: number | null
  level?: string | null
  category?: string | null
  has_hardware?: boolean
}

const ALL_CATALOGUE_PROGRAMMES: ProgrammeCardItem[] = [
  {
    id: 'prog-01',
    slug: 'school-foundation',
    title: 'School Foundation Track (Class 8 → 9)',
    short_description:
      '8-month bridge strengthening Physics, Chemistry, Biology, Mathematics, English comprehension, and competitive aptitude.',
    status: 'published',
    duration_months: 8,
    category: 'School Foundation',
    has_hardware: true,
  },
  {
    id: 'prog-02',
    slug: 'highschool-integrated-foundation',
    title: 'High School Integrated Foundation (Classes 9–12)',
    short_description:
      'Comprehensive 2–4 year multi-grade preparation track for NEET, JEE, National Olympiads, and CBSE/State boards.',
    status: 'published',
    duration_months: 24,
    category: 'School Foundation',
    has_hardware: true,
  },
  {
    id: 'prog-03',
    slug: 'ai-development',
    title: 'AI Development & Automation Programme',
    short_description:
      'Full-stack engineering, Python, REST APIs, pgvector RAG systems, supervised LLM tool-calling agents, and cloud CI/CD.',
    status: 'published',
    duration_months: 8,
    category: 'Technology & AI',
    has_hardware: true,
  },
  {
    id: 'prog-04',
    slug: 'healthcare-tech',
    title: 'Healthcare Technology Programme',
    short_description:
      'Hospital Information Systems (HIS), EMR/EHR workflows, HL7 FHIR standards, and ABDM consent architectures.',
    status: 'published',
    duration_months: 8,
    category: 'Health Informatics',
    has_hardware: true,
  },
  {
    id: 'prog-05',
    slug: 'competitive-exams',
    title: 'Government & Competitive Exams Programme',
    short_description:
      'Strategic 8-month intensive coaching for UPSC, State PSC, NEET, JEE, CLAT/Law, Banking & SSC, and Defence.',
    status: 'published',
    duration_months: 8,
    category: 'Civil Services & Government',
    has_hardware: true,
  },
  {
    id: 'prog-06',
    slug: 'entrepreneurship',
    title: 'Entrepreneurship & Startup Launch Programme',
    short_description:
      'Learn. Build. Launch. Grow. Business models, digital marketing, AI workflows, financial budgeting, and investor readiness.',
    status: 'published',
    duration_months: 8,
    category: 'Business & Ventures',
    has_hardware: true,
  },
  {
    id: 'prog-07',
    slug: 'small-business',
    title: 'Small Business & Retailers Programme',
    short_description:
      'Digital skills for shopkeepers, chemists, retailers, and wholesalers: WhatsApp commerce, GST billing, and online ordering.',
    status: 'published',
    duration_months: 8,
    category: 'MSME Commerce',
    has_hardware: true,
  },
  {
    id: 'prog-08',
    slug: 'home-business',
    title: 'Home Business & Women Entrepreneurs Programme',
    short_description:
      'Practical training for stay-at-home parents and women founders: clothing, food & crafts packaging, pricing, and online sales.',
    status: 'published',
    duration_months: 8,
    category: 'Micro-Enterprise',
    has_hardware: true,
  },
  {
    id: 'prog-09',
    slug: 'teachers-trainers',
    title: 'Teachers & Trainers Digital Empowerment',
    short_description:
      'Digital pedagogy, course authoring, screen recording, live classroom tools, and personal branding for educators.',
    status: 'published',
    duration_months: 8,
    category: 'Education & Pedagogy',
    has_hardware: true,
  },
  {
    id: 'prog-10',
    slug: 'lifestyle-trainers',
    title: 'Yoga, Fitness, Music & Dance Trainers',
    short_description:
      'Turn passion into profession: digital client acquisition, online streaming, video setups, and recurring subscription communities.',
    status: 'published',
    duration_months: 8,
    category: 'Wellness & Creative Arts',
    has_hardware: true,
  },
]

export default async function ProgrammesPage() {
  let displayProgrammes: ProgrammeCardItem[] = ALL_CATALOGUE_PROGRAMMES

  try {
    const supabase = await createClient()
    const { data: dbProgrammes } = (await supabase
      .from('programmes')
      .select('id, slug, title, short_description, status, duration_months, level, category')
      .eq('status', 'published')
      .order('created_at', { ascending: true })) as {
      data: Tables<'programmes'>[] | null
    }

    if (dbProgrammes && dbProgrammes.length > 0) {
      // Merge or prefer DB records if published
      const dbSlugs = new Set(dbProgrammes.map((p) => p.slug))
      const extraFallbacks = ALL_CATALOGUE_PROGRAMMES.filter((p) => !dbSlugs.has(p.slug))
      displayProgrammes = [...dbProgrammes.map((p) => ({ ...p, has_hardware: true })), ...extraFallbacks]
    }
  } catch {
    // If DB is offline, fallback seamlessly
    displayProgrammes = ALL_CATALOGUE_PROGRAMMES
  }

  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-primary border-primary/30">
            Cohort Admissions Open
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Our Flagship Programmes
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Practical, outcome-driven learning cohorts across technology, civil services, school foundation, MSME commerce, and professional vocational arts. Every programme includes dedicated hardware and offline-first software.
          </p>
        </div>

        {/* Highlight Banner: Hardware Included */}
        <div className="rounded-2xl border border-primary/20 bg-primary/[0.03] dark:bg-primary/[0.06] p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <Laptop className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm sm:text-base">
                Dedicated Laptop Included with Every Enrolment
              </h3>
              <p className="text-xs text-muted-foreground">
                Pre-configured with offline lesson packages, diagnostic assessments, and practice suites. ₹29,999 upfront + ₹1,500/month for 8 months.
              </p>
            </div>
          </div>
          <Link href="/fees" className="shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5">
              View Fee Structure <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Complete 20-Family Programme Universe Explorer */}
        <div className="pt-4 border-t border-border">
          <ProgrammeUniverseExplorer />
        </div>

        {/* Programmes Grid */}
        <div className="pt-8 border-t border-border space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Legacy Catalogue & Regional Tracks
            </h3>
            <p className="text-xs text-muted-foreground">
              Additional specialized community cohorts, teachers training, and small business enablement packages.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayProgrammes.map((prog) => {
            const Icon = iconMap[prog.slug] || DEFAULT_ICON
            return (
              <Link key={prog.id} href={`/programmes/${prog.slug}`} className="group block h-full">
                <Card className="h-full flex flex-col justify-between hover:shadow-lg hover:border-primary/40 transition-all border-border bg-card">
                  <CardHeader className="pb-3 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-[11px]">
                        Enrolling
                      </Badge>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                        {prog.category || 'Professional Track'}
                      </span>
                      <h2 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-0.5">
                        {prog.title}
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-0 flex-1 flex flex-col justify-between">
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {prog.short_description || prog.title}
                    </p>
                    <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {prog.duration_months ? `${prog.duration_months} Months` : '8 Months'}
                      </div>
                      <div className="flex items-center text-primary font-semibold group-hover:translate-x-0.5 transition-transform">
                        View Syllabus <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  </div>
  )
}
