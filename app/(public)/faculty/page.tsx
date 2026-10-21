import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, Code2, Stethoscope, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Faculty & Mentors — TalentXcel Academy',
  description: 'Meet our experienced instructors, curriculum architects, and industry mentors.',
  alternates: {
    canonical: 'https://talentxcel.net/faculty',
  },
}

const faculty = [
  {
    name: 'Dr. Tariq Ahmad',
    role: 'Lead AI & Systems Architect',
    bio: 'Over 14 years of experience in distributed backend architectures, relational databases, and enterprise AI orchestration.',
    specialty: 'RAG Systems, pgvector, Scalable Web Engineering',
    icon: Code2,
  },
  {
    name: 'Dr. Meera Nambiar',
    role: 'Healthcare Technology Specialist',
    bio: 'Health informatics consultant specializing in clinical workflow digitalization, EHR integration, and FHIR interoperability standards.',
    specialty: 'Health Informatics, FHIR/HL7, DISHA Compliance',
    icon: Stethoscope,
  },
  {
    name: 'Arjun K. Varma',
    role: 'E-Commerce & Digital Operations Mentor',
    bio: 'Former head of digital commerce for consumer retail brands. Mentors founders on payment workflows, logistics automation, and customer conversion funnels.',
    specialty: 'Digitization, Payment Gateways, Omni-Channel Ops',
    icon: Building2,
  },
  {
    name: 'Sunita Rao',
    role: 'Foundation Learning Lead',
    bio: 'Specialist in high-school STEM pedagogy, foundational mathematics, and digital literacy development with student safety safeguards.',
    specialty: 'Class 8–9 STEM, Algorithmic Thinking, Minor Safeguards',
    icon: GraduationCap,
  },
]

export default function FacultyPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-3 text-primary border-primary/30">
            Teaching Team
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Instructors & Mentors
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Learn directly from practitioners who combine deep industry engineering experience with accessible, student-first mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faculty.map((f) => {
            const Icon = f.icon
            return (
              <Card key={f.name} className="border shadow-xs">
                <CardHeader className="flex flex-row items-start gap-4 pb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">{f.name}</CardTitle>
                    <div className="text-xs font-semibold text-primary mt-0.5">{f.role}</div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.bio}</p>
                  <div className="p-2.5 rounded-lg bg-muted text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Domain: </span>
                    {f.specialty}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="p-6 rounded-xl border bg-muted/20 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          All mentor and faculty profiles are strictly based on verified contributor credentials. We do not fabricate affiliations or celebrity advisory boards.
        </div>
      </div>
    </div>
  )
}
