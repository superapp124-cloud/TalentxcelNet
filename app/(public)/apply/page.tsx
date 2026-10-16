import { Metadata } from 'next'
import { EnquiryForm } from '@/components/public/enquiry-form'

export const metadata: Metadata = {
  title: 'Apply for Admission — TalentXcel Academy',
  description: 'Start your application to TalentXcel Academy. Speak with an admissions counsellor about our programmes.',
}

export default function ApplyPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Apply for Admission
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Submit your enquiry and we&apos;ll connect you with an admissions counsellor within 2 business days.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Fields marked <span aria-hidden="true" className="text-destructive">*</span> are required.
          </p>
        </div>
        <div className="bg-card rounded-2xl border shadow-sm p-6 sm:p-8">
          <EnquiryForm />
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Submitting this form does not guarantee admission. Enrolment follows the configured admission and payment rules.
        </p>
      </div>
    </div>
  )
}
