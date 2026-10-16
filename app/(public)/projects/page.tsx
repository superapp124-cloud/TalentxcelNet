import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Code2, ArrowUpRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Student Capstones & Projects — TalentXcel Academy',
  description: 'Exemplary project portfolios built by TalentXcel Academy learners.',
}

const projects = [
  {
    title: 'Enterprise Grounded Knowledge Retrieval Engine',
    category: 'AI Development',
    description:
      'A multi-tenant document ingestion pipeline that extracts, chunks, and indexes company policy PDFs using pgvector, exposing a secured REST API with strict Row Level Security boundaries.',
    deliverables: ['Next.js 15 UI', 'Supabase PostgreSQL + pgvector', 'Vitest Unit & Integration Suite'],
  },
  {
    title: 'Hospital Outpatient Workflow & Queue Tracker',
    category: 'Healthcare Technology',
    description:
      'An operational queue manager allowing clinic receptionists and doctors to coordinate patient flow while maintaining anonymized audit logs complying with Indian data privacy rules.',
    deliverables: ['FHIR Compatible Data Models', 'Real-time WebSocket Sync', 'Consent Logging'],
  },
  {
    title: 'Omni-Channel Retail Order & Invoicing System',
    category: 'Entrepreneurship',
    description:
      'A complete digital storefront with Razorpay checkout integration, automated invoice PDF generation, SKU inventory deduction, and customer SMS delivery notifications.',
    deliverables: ['Automated Webhook Ledger', 'Inventory Allocation Triggers', 'Admin Sales Analytics'],
  },
  {
    title: 'Interactive STEM Physics Simulator',
    category: 'School Foundation',
    description:
      'A browser-based gravity and motion sandbox created by Class 8/9 students illustrating velocity, kinetic energy, and friction through interactive SVG animations.',
    deliverables: ['Visual Canvas Animations', 'Step-by-step Lab Workbook', 'Peer Reviewed by Mentors'],
  },
]

export default function ProjectsPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-3 text-primary border-primary/30">
            Competency Evidence
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Practical Student Projects
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Our curriculum focuses on demonstrable engineering portfolios. Learners graduate having built working, tested, and deployable systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Card key={p.title} className="border shadow-xs flex flex-col justify-between">
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{p.category}</Badge>
                    <Code2 className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold">{p.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  <div>
                    <div className="text-xs font-semibold text-foreground mb-2">Key Deliverables:</div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground" role="list">
                      {p.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="p-6 rounded-xl border bg-muted/20 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          Every project listed is built as an educational demonstration of student capabilities. We do not claim fabricated commercial partnerships or inflated client valuations.
        </div>
      </div>
    </div>
  )
}
