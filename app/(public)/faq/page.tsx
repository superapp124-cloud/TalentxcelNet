import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — TalentXcel Academy',
  description: 'Common questions regarding admissions, curriculum, AI tutoring, fees, and certification.',
}

const faqs = [
  {
    category: 'Admissions & Enrolment',
    q: 'How does the admissions process work?',
    a: 'You start by submitting a website enquiry. An admissions counsellor will contact you to review your goals, verify technical requirements, and confirm programme suitability. You are officially enrolled once your application is approved and initial payment terms are satisfied.',
  },
  {
    category: 'Admissions & Enrolment',
    q: 'Can minors enroll in TalentXcel programmes?',
    a: 'Yes, for designated programmes such as School Foundation (Class 8 → 9). In compliance with the Digital Personal Data Protection Act 2023, guardian consent is mandatory before an account is activated for any minor under 18 years of age.',
  },
  {
    category: 'Super AI & Learning Experience',
    q: 'How does the Super AI Tutor assist my learning?',
    a: 'The Super AI Tutor is grounded in approved course materials. Operating in Socratic mode, it gives progressive hints rather than simply giving away solutions, guiding you to build self-reliance and problem-solving confidence.',
  },
  {
    category: 'Super AI & Learning Experience',
    q: 'Does learning work when I have poor or no internet connection?',
    a: 'Yes. You can explicitly download lessons and coding materials via our Progressive Web App (PWA). Your progress events are safely stored in your browser\'s local IndexedDB and sync automatically to the server when you reconnect.',
  },
  {
    category: 'Fees, Hardware & Certification',
    q: 'Are TalentXcel completion certificates accredited as university degrees?',
    a: 'No. TalentXcel Academy issues verified platform completion certificates based on demonstrated competency. They are not accredited university degrees, government qualifications, or clinical licenses. Each certificate features a public verification link.',
  },
  {
    category: 'Fees, Hardware & Certification',
    q: 'What is the refund policy?',
    a: 'We offer a transparent 7-day initial cooling-off period from enrolment activation during which you can request a refund if you decide the course does not meet your expectations, subject to our written refund terms and pro-rata administrative fees.',
  },
]

export default function FAQPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-3 text-primary border-primary/30">
            Got Questions?
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Clear, unambiguous answers about admissions, our AI platform, tuition, and certificates.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="border shadow-xs">
              <CardHeader className="pb-2">
                <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
                  {faq.category}
                </div>
                <CardTitle className="text-base font-bold text-foreground">
                  {faq.q}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
