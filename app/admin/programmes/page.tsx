import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, BookOpen, Clock, Edit } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Programmes Manager',
  robots: { index: false },
}

const programmes = [
  {
    slug: 'ai-development',
    title: 'AI Development & Automation',
    duration: '8 months',
    modulesCount: 12,
    status: 'published',
    basePrice: '₹41,999',
  },
  {
    slug: 'healthcare-tech',
    title: 'Healthcare Technology',
    duration: 'To be confirmed',
    modulesCount: 8,
    status: 'draft',
    basePrice: '₹34,999',
  },
  {
    slug: 'entrepreneurship',
    title: 'Entrepreneurship & Small-Business Digitization',
    duration: 'To be confirmed',
    modulesCount: 10,
    status: 'draft',
    basePrice: '₹29,999',
  },
  {
    slug: 'school-foundation',
    title: 'School Foundation (Class 8 → 9)',
    duration: '8 months',
    modulesCount: 8,
    status: 'draft',
    basePrice: '₹24,999',
  },
]

export default function ProgrammesAdminPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Programme Catalogue & Curriculum
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure programmes, modules, lessons, pricing tiers, and publish status.
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> New Programme
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programmes.map((p) => (
          <Card key={p.slug} className="border shadow-xs">
            <CardHeader className="pb-3 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg font-bold">{p.title}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{p.duration}</span>
                  <span>•</span>
                  <span>{p.modulesCount} modules</span>
                </div>
              </div>
              <Badge variant={p.status === 'published' ? 'success' : 'secondary'} className="capitalize">
                {p.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted text-sm">
                <span className="text-muted-foreground">Indicative Base Fee</span>
                <span className="font-bold text-foreground">{p.basePrice}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
                  <Edit className="h-3.5 w-3.5" /> Edit Syllabus
                </Button>
                <Button size="sm" className="w-full text-xs">
                  {p.status === 'published' ? 'Unpublish' : 'Publish'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
