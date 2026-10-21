import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — TalentXcel Academy',
  description: 'Common questions regarding admissions, curriculum, AI tutoring, fees, and certification.',
  alternates: {
    canonical: 'https://talentxcel.net/faq',
  },
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
    q: 'Can I get a refund if I change my mind?',
    a: 'Yes. You have a 14-calendar-day cooling-off period starting from admission confirmation. If you withdraw within this window before major milestone coursework is evaluated or proprietary hardware is unsealed, you are eligible for a refund according to our published refund policy.',
  },
  {
    category: 'Fees, Hardware & Certification',
    q: 'What happens to the laptop if I withdraw?',
    a: 'If dedicated hardware has been dispatched or delivered, it must be returned in its original packaging, complete with all accessories and without cosmetic or internal damage, within 7 business days of initiating withdrawal. A standard hardware inspection fee applies upon return.',
  },
  {
    category: 'Fees, Hardware & Certification',
    q: 'Are taxes included in the fee?',
    a: 'Base tuition figures (₹29,999 upfront + ₹1,500/mo or ₹41,999 full settlement) exclude statutory 18% GST. With GST included, instalment payments are approximately ₹35,399 upfront and ₹1,770 a month, and full settlement is approximately ₹49,559 (or ₹47,199 with the ₹2,000 early-payment discount).',
  },
  {
    category: 'Fees, Hardware & Certification',
    q: 'Why can’t I pay online yet?',
    a: 'Direct commerce checkouts are currently in staged rollout. Registering your interest reserves your cohort priority. You will receive an official written admission agreement with exact specifications, schedule details, and payment instructions before enrolment.',
  },
  {
    category: 'Fees, Hardware & Certification',
    q: 'Are TalentXcel completion certificates accredited as university degrees?',
    a: 'No. TalentXcel Academy issues verified platform completion certificates based on demonstrated competency. They are not accredited university degrees, government qualifications, or clinical licenses. Each certificate features a public verification link.',
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
