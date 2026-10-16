'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const enquirySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number').optional().or(z.literal('')),
  programmeInterest: z.string().optional(),
  message: z.string().max(500, 'Message must be under 500 characters').optional(),
  consent: z.boolean().refine((v) => v === true, 'You must consent to being contacted'),
})

type EnquiryValues = z.infer<typeof enquirySchema>

const programmes = [
  { id: '', label: 'Select a programme (optional)' },
  { id: 'ai-development', label: 'AI Development & Automation' },
  { id: 'healthcare-tech', label: 'Healthcare Technology' },
  { id: 'entrepreneurship', label: 'Entrepreneurship & Digitization' },
  { id: 'school-foundation', label: 'School Foundation (Class 8 → 9)' },
  { id: 'not-sure', label: 'Not sure yet — help me choose' },
]

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { consent: false },
  })

  async function onSubmit(values: EnquiryValues) {
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: values.fullName,
          email: values.email,
          phone: values.phone || undefined,
          programmeInterest: values.programmeInterest || undefined,
          message: values.message || undefined,
          consent: values.consent,
          utmSource: new URLSearchParams(window.location.search).get('utm_source') ?? undefined,
          utmMedium: new URLSearchParams(window.location.search).get('utm_medium') ?? undefined,
          utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') ?? undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
      reset()
    } catch {
      toast.error('Unable to submit. Please check your connection and try again.')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-foreground mb-3">Enquiry Received!</h2>
        <p className="text-muted-foreground mb-2">
          Thank you for your interest in TalentXcel Academy.
        </p>
        <p className="text-muted-foreground mb-6">
          An admissions counsellor will contact you within 2 business days.
        </p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another Enquiry</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="enq-fullName" className="block text-sm font-medium text-foreground mb-1.5">
            Full name <span aria-hidden="true" className="text-destructive">*</span>
          </label>
          <input
            id="enq-fullName"
            type="text"
            autoComplete="name"
            {...register('fullName')}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Your full name"
            aria-required="true"
          />
          {errors.fullName && <p className="mt-1 text-sm text-destructive" role="alert">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="enq-phone" className="block text-sm font-medium text-foreground mb-1.5">
            Phone number
          </label>
          <input
            id="enq-phone"
            type="tel"
            autoComplete="tel"
            {...register('phone')}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="mt-1 text-sm text-destructive" role="alert">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="enq-email" className="block text-sm font-medium text-foreground mb-1.5">
          Email address <span aria-hidden="true" className="text-destructive">*</span>
        </label>
        <input
          id="enq-email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="you@example.com"
          aria-required="true"
        />
        {errors.email && <p className="mt-1 text-sm text-destructive" role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="enq-programme" className="block text-sm font-medium text-foreground mb-1.5">
          Programme interest
        </label>
        <select
          id="enq-programme"
          {...register('programmeInterest')}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {programmes.map((p) => (
            <option key={p.id} value={p.id}>{p.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="enq-message" className="block text-sm font-medium text-foreground mb-1.5">
          Message <span className="text-muted-foreground text-xs">(optional)</span>
        </label>
        <textarea
          id="enq-message"
          rows={3}
          {...register('message')}
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Tell us about your background or any questions..."
        />
        {errors.message && <p className="mt-1 text-sm text-destructive" role="alert">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2.5">
        <input
          id="enq-consent"
          type="checkbox"
          {...register('consent')}
          className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-ring"
          aria-required="true"
        />
        <label htmlFor="enq-consent" className="text-sm text-muted-foreground leading-tight">
          I consent to TalentXcel Academy contacting me about this enquiry. I understand my information will be processed in accordance with the{' '}
          <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>.
        </label>
      </div>
      {errors.consent && <p className="text-sm text-destructive" role="alert">{errors.consent.message}</p>}

      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
      </Button>
    </form>
  )
}
