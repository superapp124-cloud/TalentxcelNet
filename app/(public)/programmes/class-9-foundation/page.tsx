import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Laptop, ShieldCheck, GraduationCap, CheckCircle2 } from 'lucide-react'
import { Class9FoundationSalesExperience } from '@/components/public/class-9-foundation-sales-experience'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const PAGE_URL = 'https://talentxcel.net/programmes/class-9-foundation'

export const metadata: Metadata = {
  title: 'Class 9 Foundation Programme — NEET & JEE Foundation',
  description:
    '8-Month Class 9 Foundation Programme after Class 8. 3 Live Classes every week (96 sessions across 8 months), live & recorded access, comprehensive coverage of Physics, Chemistry, Biology, Mathematics, English, Logical Reasoning, and Study Skills. Option 1: Course Only (₹29,999) or Option 2: Course + Laptop (₹64,999).',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Class 9 Foundation Programme — NEET & JEE Academic Foundation',
    description:
      'Build a strong academic foundation for NEET, JEE and all competitive exams. 96 live classes, pre-loaded laptop package, mentor support, and 24/7 Super AI Tutor.',
    images: ['/images/class-9-foundation-brochure.png'],
    url: PAGE_URL,
  },
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Class 9 Foundation Programme',
  description:
    '8-month academic foundation programme for students entering Class 9. Covers Physics, Chemistry, Biology, Mathematics, English, Logical Reasoning, and Study Skills with 96 live interactive sessions and 24/7 Super AI Socratic Tutor.',
  url: PAGE_URL,
  provider: {
    '@type': 'Organization',
    name: 'TalentXcel Academy',
    url: 'https://talentxcel.net',
  },
  timeRequired: 'P8M',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: ['Online', 'OnSite'],
    courseWorkload: 'PT6H',
    inLanguage: 'en-IN',
  },
  teaches: [
    'Physics',
    'Chemistry',
    'Biology',
    'Mathematics',
    'English',
    'Logical Reasoning',
    'Study Skills',
  ],
  educationalLevel: 'Secondary',
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
  },
}



const faqs = [
  {
    q: 'What is the duration and weekly schedule of the Class 9 Foundation Programme?',
    a: 'The programme spans 8 months with 3 live interactive classes every week (a total of 96 live sessions). Classes are scheduled in after-school evening slots with 24/7 recorded playback access for review.',
  },
  {
    q: 'Which subjects are covered in the Class 9 Foundation curriculum?',
    a: 'The curriculum comprehensively covers 7 subjects: Physics, Chemistry, Biology, Mathematics, English, Logical Reasoning, and Exam Study Skills, aligning with CBSE, ICSE, and State Board standards with an early NEET/JEE competitive orientation.',
  },
  {
    q: 'How does the 24/7 Super AI Socratic Tutor work for middle school students?',
    a: 'The Super AI Tutor is grounded strictly in the Class 9 syllabus. Instead of simply generating answers, it uses Socratic scaffolding—giving progressive conceptual hints (#1 clue, #2 breakdown, #3 guided step) to build independent analytical problem-solving skills.',
  },
  {
    q: 'What are the two tuition options and laptop package inclusions?',
    a: 'Families can choose Option 1: Course Only (₹29,999) or Option 2: Course + Dedicated Pre-loaded Student Laptop (₹64,999). Both options include full access to 96 live sessions, all 7 subjects, mentor support, and a 14-day cooling-off refund policy.',
  },
  {
    q: 'What parental oversight and performance reports are provided?',
    a: 'Parents receive dedicated dashboard access with real-time class attendance logging, weekly diagnostic test analytics, and concept mastery tracking via the Error DNA digest.',
  },
]

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    courseSchema,
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
  ],
}

export default function Class9FoundationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="py-10 sm:py-16 lg:py-20 bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/programmes" className="hover:text-primary transition-colors">
              Programmes
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-semibold">Class 9 Foundation Programme</span>
          </nav>

          {/* Master Sales & Learning Experience */}
          <Class9FoundationSalesExperience />

          {/* Authoritative AEO FAQ Section */}
          <section className="space-y-6 pt-4 border-t border-border" aria-labelledby="class-9-faq-heading">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <Badge variant="outline" className="text-primary border-primary/30">
                Frequently Asked Questions
              </Badge>
              <h2 id="class-9-faq-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Everything Parents &amp; Students Need to Know
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Clear, verified details regarding batch schedules, subjects, AI tutoring, and fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border bg-card p-5 sm:p-6 space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contextual Topic Cluster Link Box (GEO & Internal Linking) */}
          <div className="rounded-2xl border bg-muted/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Academic Resource</span>
              <h4 className="font-bold text-sm text-foreground">
                Why Early Computational Thinking Matters for Class 9 Students
              </h4>
              <p className="text-xs text-muted-foreground">
                Read our faculty guide on nurturing analytical stamina and structured logic before board exams.
              </p>
            </div>
            <Link href="/blog/computational-thinking-middle-school">
              <Button variant="outline" size="sm" className="shrink-0 text-xs gap-1.5">
                Read Academic Guide <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Bottom Reassurance & Trust Bar */}
          <div className="rounded-3xl border border-primary/20 bg-muted/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-foreground">
                  14-Day Cooling-Off Period &amp; Guardian Oversight
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
                  Every enrolment is protected by a 14-calendar-day refund cooling-off policy and dedicated parent/guardian dashboard access with live attendance tracking and weekly test diagnostics.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link href="/fees">
                <Button variant="outline" size="sm" className="rounded-xl font-bold text-xs">
                  View Fee Terms
                </Button>
              </Link>
              <Link href="/apply?programme=class-9-foundation">
                <Button size="sm" className="rounded-xl font-extrabold text-xs bg-primary text-primary-foreground shadow-sm">
                  Apply for Admission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
