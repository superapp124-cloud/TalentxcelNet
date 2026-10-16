import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fees & Payment Options — TalentXcel Academy',
  description: 'Transparent tuition, instalment schedules, and scholarship criteria.',
}

export default function FeesPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-3 text-primary border-primary/30">
            Transparent Pricing
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Tuition Fees & Payment Plans
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Clear, honest pricing with flexible monthly instalment structures. No hidden fees.
          </p>
        </div>

        {/* Indicative Breakdown Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 border-primary/30 shadow-md">
            <CardHeader className="bg-primary/5 pb-4">
              <Badge variant="default" className="w-fit mb-2">Most Popular</Badge>
              <CardTitle className="text-xl font-bold">Instalment Plan (AI Development)</CardTitle>
              <p className="text-xs text-muted-foreground">8-Month Flagship Track</p>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <span className="text-4xl font-extrabold text-foreground">₹29,999</span>
                <span className="text-sm text-muted-foreground ml-2">upfront</span>
              </div>
              <div className="text-sm text-muted-foreground">
                + ₹1,500 / month for 8 months
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Full curriculum access & project evaluations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Super AI Tutor & Coding Mentor included
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Offline PWA lesson downloads
                </li>
              </ul>
              <Link href="/apply?programme=ai-development" className="block pt-2">
                <Button className="w-full">Apply with Instalment Plan</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border shadow-xs">
            <CardHeader className="pb-4">
              <Badge variant="secondary" className="w-fit mb-2">One-Time Payment</Badge>
              <CardTitle className="text-xl font-bold">Full Payment (Upfront)</CardTitle>
              <p className="text-xs text-muted-foreground">Save on monthly processing</p>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <span className="text-4xl font-extrabold text-foreground">₹41,999</span>
                <span className="text-sm text-muted-foreground ml-2">total tuition</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Zero recurring monthly debit
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Complete upfront settlement
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Same comprehensive mentor access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Digital certificate upon criteria completion
                </li>
              </ul>
              <Link href="/apply?programme=ai-development" className="block pt-2">
                <Button variant="outline" className="w-full">Apply with Full Payment</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Hardware Fulfilment & Tax Disclosure Notice */}
        <div className="p-6 rounded-xl border bg-muted/30 space-y-3 text-xs leading-relaxed text-muted-foreground">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span>Commercial & Regulatory Transparency Notice</span>
          </div>
          <p>
            1. <strong>Taxes</strong>: All prices quoted above are indicative base educational fees. Applicable GST (18%) is calculated during checkout per prevailing Indian taxation regulations.
          </p>
          <p>
            2. <strong>Hardware / Laptop Inclusions</strong>: While select promotional cohorts may include a managed student laptop, hardware distribution is contingent upon verified batch inventory and explicit written terms at the time of confirmed admission. Do not assume hardware is included unless explicitly selected and confirmed in your admission agreement.
          </p>
          <p>
            3. <strong>No Outcome Guarantees</strong>: TalentXcel does not guarantee employment, salary brackets, or examination results. Certificates represent verified course milestone completion only.
          </p>
        </div>
      </div>
    </div>
  )
}
