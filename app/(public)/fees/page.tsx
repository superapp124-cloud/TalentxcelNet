import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ProgrammePricingPlans } from '@/components/public/programme-pricing-plans'
import { AlertCircle, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fees & Payment Plans — TalentXcel Academy',
  description: 'Transparent tuition, instalment schedules, laptop inclusions, and refund policy.',
}

export default function FeesPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="outline" className="text-primary border-primary/30">
            Transparent Tuition
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Tuition Fees & Payment Plans
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Clear, honest pricing with flexible monthly instalment structures across all delivered programmes. No hidden charges.
          </p>
        </div>

        {/* Dynamic Pricing Plans with Course Selector */}
        <ProgrammePricingPlans showProgrammeSelector={true} />

        {/* Matching FAQ on Refunds, Cooling-Off & Laptop Returns */}
        <div className="space-y-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold text-foreground">
              Frequently Asked Questions on Fees & Laptop Returns
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted-foreground">
            <div className="p-5 rounded-2xl border bg-card space-y-2">
              <h4 className="font-bold text-sm text-foreground">
                When does the 14-day cooling-off refund policy apply?
              </h4>
              <p className="leading-relaxed">
                You have a 14-calendar-day cooling-off period starting from the date of admission confirmation. If you withdraw within this window before major milestone coursework is evaluated or proprietary hardware is unsealed, you are eligible for a refund according to our published refund terms.
              </p>
            </div>

            <div className="p-5 rounded-2xl border bg-card space-y-2">
              <h4 className="font-bold text-sm text-foreground">
                How does laptop return work if I withdraw during cooling-off?
              </h4>
              <p className="leading-relaxed">
                If dedicated hardware has been dispatched or delivered, it must be returned in its original packaging, complete with all accessories and without cosmetic or internal damage, within 7 business days of initiating a withdrawal. A standard hardware inspection fee applies upon return.
              </p>
            </div>

            <div className="p-5 rounded-2xl border bg-card space-y-2">
              <h4 className="font-bold text-sm text-foreground">
                Are payments currently live on the platform?
              </h4>
              <p className="leading-relaxed">
                Direct commerce checkouts are currently in staged rollout. Registering your interest reserves your cohort priority. You will receive an official written admission agreement with exact specifications and payment instructions prior to enrolment.
              </p>
            </div>

            <div className="p-5 rounded-2xl border bg-card space-y-2">
              <h4 className="font-bold text-sm text-foreground">
                Is GST included in the base tuition figure?
              </h4>
              <p className="leading-relaxed">
                Base figures (₹29,999 upfront + ₹1,500/mo or ₹41,999 full settlement) exclude statutory 18% GST. With GST included, instalment payments are approximately ₹35,399 upfront + ₹1,770/mo, and full settlement is approximately ₹49,559 (or ₹47,199 with early-payment discount).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
