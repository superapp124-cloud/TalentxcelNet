import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/types/database'
import Link from 'next/link'
import { Brain, Stethoscope, Building2, GraduationCap, Clock, ArrowRight, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Programmes — TalentXcel Academy',
  description: 'Explore TalentXcel Academy programmes in AI Development, Healthcare Technology, Entrepreneurship, and School Foundation.',
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'ai-development': Brain,
  'healthcare-tech': Stethoscope,
  'entrepreneurship': Building2,
  'school-foundation': GraduationCap,
}

const DEFAULT_ICON = GraduationCap

export default async function ProgrammesPage() {
  const supabase = await createClient()
  const { data: programmes } = (await supabase
    .from('programmes')
    .select('id, slug, title, short_description, status, duration_months, level, category')
    .eq('status', 'published')
    .order('created_at', { ascending: true })) as {
    data: Tables<'programmes'>[] | null
  }

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Programmes</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Each programme is built around real skills, practical projects, and demonstrable outcomes.
          </p>
        </div>

        {!programmes || programmes.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" />
            <h2 className="text-lg font-medium text-foreground mb-2">Programmes Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              Our first cohort is being prepared. Submit an enquiry to be notified when applications open.
            </p>
            <Link href="/apply">
              <Button>Submit an Enquiry</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((prog) => {
              const Icon = iconMap[prog.slug] || DEFAULT_ICON
              return (
                <Link key={prog.id} href={`/programmes/${prog.slug}`} className="group">
                  <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <Badge variant={prog.status === 'published' ? 'success' : 'secondary'}>
                          {prog.status === 'published' ? 'Enrolling' : prog.status}
                        </Badge>
                      </div>
                      <h2 className="font-bold text-foreground group-hover:text-primary transition-colors">{prog.title}</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {prog.short_description || prog.title}
                      </p>
                      {prog.duration_months && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {prog.duration_months} months
                        </div>
                      )}
                      <div className="flex items-center text-sm font-medium text-primary">
                        Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
