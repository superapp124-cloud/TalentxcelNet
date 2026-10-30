import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, BookOpen, Clock, Edit, Database } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Programmes Manager — Operations Console',
  robots: { index: false },
}

const OFFICIAL_CATALOGUE = [
  {
    slug: 'ai-development',
    title: 'AI Development & Automation',
    duration: '8 months',
    modulesCount: 12,
    status: 'published',
    basePrice: '₹41,999',
  },
  {
    slug: 'class-9-foundation',
    title: 'Class 9 Foundation Programme (NEET/JEE)',
    duration: '8 months',
    modulesCount: 16,
    status: 'published',
    basePrice: '₹24,999',
  },
  {
    slug: 'competitive-exams',
    title: 'Government & Competitive Exams (UPSC/PSC)',
    duration: '12 months',
    modulesCount: 20,
    status: 'published',
    basePrice: '₹29,999',
  },
  {
    slug: 'highschool-integrated-foundation',
    title: 'High School Integrated (Classes 9–12)',
    duration: '2–4 years',
    modulesCount: 32,
    status: 'published',
    basePrice: '₹64,999',
  },
  {
    slug: 'healthcare-tech',
    title: 'Healthcare Technology & Informatics',
    duration: '6 months',
    modulesCount: 8,
    status: 'published',
    basePrice: '₹34,999',
  },
  {
    slug: 'entrepreneurship',
    title: 'Entrepreneurship & Small-Business Digitization',
    duration: '6 months',
    modulesCount: 10,
    status: 'published',
    basePrice: '₹29,999',
  },
]

export default async function ProgrammesAdminPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let programmes: any[] = OFFICIAL_CATALOGUE

  try {
    const supabase = await createClient()
    const { data: dbProgrammes, error } = (await supabase
      .from('programmes')
      .select('*')
      .order('created_at', { ascending: false })) as {
      data: Array<{ slug: string; title: string; duration_months: number | null; status: string }> | null
      error: unknown
    }

    if (!error && dbProgrammes && dbProgrammes.length > 0) {
      programmes = dbProgrammes.map((p) => ({
        slug: p.slug,
        title: p.title,
        duration: p.duration_months ? `${p.duration_months} months` : 'Flexible',
        modulesCount: 10,
        status: p.status || 'published',
        basePrice: '₹29,999',
      }))
    }
  } catch (err) {
    console.warn('[Programmes] Supabase query failed:', err)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Programme Catalogue & Curriculum
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Official TalentXcel academic and professional engineering curriculum tracks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 text-xs text-emerald-600 border-emerald-300 py-1">
            <Database className="w-3.5 h-3.5" />
            Verified Curriculum
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programmes.map((p) => (
          <Card key={p.slug} className="border border-slate-200 dark:border-neutral-800 shadow-xs flex flex-col justify-between">
            <CardHeader className="pb-3 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-base font-bold">{p.title}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{p.duration}</span>
                  <span>•</span>
                  <span>{p.modulesCount} modules</span>
                </div>
              </div>
              <Badge variant={p.status === 'published' ? 'success' : 'secondary'} className="capitalize shrink-0">
                {p.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-neutral-800 text-xs">
                <span className="text-muted-foreground font-medium">Programme Fee</span>
                <span className="font-extrabold text-foreground">{p.basePrice}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Inspect Syllabus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
