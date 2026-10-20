import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Laptop, ShieldCheck, GraduationCap, CheckCircle2 } from 'lucide-react'
import { Class9FoundationSalesExperience } from '@/components/public/class-9-foundation-sales-experience'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Class 9 Foundation Programme — NEET & JEE Foundation | TalentXcel Academy',
  description:
    '8-Month Class 9 Foundation Programme after Class 8. 3 Live Classes every week (96 sessions across 8 months), live & recorded access, comprehensive coverage of Physics, Chemistry, Biology, Mathematics, English, Logical Reasoning, and Study Skills. Option 1: Course Only (₹29,999) or Option 2: Course + Laptop (₹64,999).',
  openGraph: {
    title: 'Class 9 Foundation Programme — NEET & JEE Academic Foundation',
    description:
      'Build a strong academic foundation for NEET, JEE and all competitive exams. 96 live classes, pre-loaded laptop package, mentor support, and 24/7 Super AI Tutor.',
    images: ['/images/class-9-foundation-brochure.png'],
  },
}

export default function Class9FoundationPage() {
  return (
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

        {/* Bottom Reassurance & Trust Bar */}
        <div className="rounded-3xl border border-primary/20 bg-muted/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-foreground">
                14-Day Cooling-Off Period & Guardian Oversight
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
  )
}
