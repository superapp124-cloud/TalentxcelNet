import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Laptop, Truck, RefreshCcw, AlertTriangle, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Laptop Fulfilment & Hardware Warranty Terms — TalentXcel Academy',
  description: 'Official policy on student hardware allocation, delivery tracking, manufacturer warranty, returns, and replacement eligibility.',
  alternates: {
    canonical: 'https://talentxcel.net/legal/hardware-terms',
  },
}

export default function HardwareTermsPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <Link href="/legal/terms" className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Terms of Service
        </Link>

        <div className="space-y-3">
          <Badge variant="outline" className="text-primary border-primary/30">
            Hardware Policy
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Laptop Fulfilment & Hardware Warranty Terms
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: October 16, 2026 • Governed under the TalentXcel Academy Enrolment Terms
          </p>
        </div>

        {/* Essential Disclosure */}
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-sm text-muted-foreground space-y-2">
          <div className="flex items-center gap-2 font-bold text-foreground text-amber-500">
            <AlertTriangle className="h-5 w-5" /> Mandatory Commercial Transparency Notice
          </div>
          <p>
            Hardware allocations apply solely to programmes explicitly designated as &ldquo;Laptop Included&rdquo; on the enrolled student&apos;s invoice and admission agreement. Hardware models, configurations, and brand OEM partners are finalized upon batch purchase verification. Learners enrolling in &ldquo;Bring Your Own Device (BYOD)&rdquo; plans do not receive physical hardware.
          </p>
        </div>

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Laptop className="h-5 w-5 text-primary" /> 1. Device Allocation & Specifications
            </h2>
            <p>
              1.1 Where a programme tier includes a development laptop, the device specification is engineered to satisfy the computing requirements of modern full-stack development, Docker containers, and local AI agent execution (minimum 16 GB unified/DDR memory, high-speed NVMe solid-state storage, and modern multi-core x86-64 or ARM64 architecture).
            </p>
            <p>
              1.2 Asset serial numbers are recorded in the TalentXcel Hardware Registry and mapped to the learner&apos;s verified account ID upon initial unboxing authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" /> 2. Dispatch, Tracking & Delivery Confirmation
            </h2>
            <p>
              2.1 Physical dispatch occurs within 7 to 14 business days of verified upfront milestone payment settlement or completed instalment mandate activation.
            </p>
            <p>
              2.2 Shipments are dispatched through insured tier-1 courier partners (e.g. BlueDart, DTDC). Real-time tracking numbers are updated in the Learner Portal under Hardware Management.
            </p>
            <p>
              2.3 Learners or their designated adult guardians must present government-issued photo identification (Aadhaar / Voter ID / Passport) upon delivery. Delivery receipt must be signed, and outer box seal integrity verified prior to acceptance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> 3. Manufacturer Warranty & On-Site Service
            </h2>
            <p>
              3.1 All provided laptops include a genuine Original Equipment Manufacturer (OEM) warranty (typically 3-year limited hardware warranty including on-site technician support).
            </p>
            <p>
              3.2 Warranty repairs, battery degradation claims, screen defects, and motherboard service are handled directly by the authorized OEM service center networks across India. TalentXcel operations support will assist in expediting service tickets.
            </p>
            <p>
              3.3 Accidental physical damage (liquid spill, drops, cracks), unauthorized disassembly, or third-party modifications are governed strictly by the OEM warranty exclusions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <RefreshCcw className="h-5 w-5 text-primary" /> 4. Dead-on-Arrival (DOA) & Replacement Procedure
            </h2>
            <p>
              4.1 If a device is received in an inoperable state (&ldquo;Dead-on-Arrival&rdquo;) or has evident transit damage, the learner must notify TalentXcel support within <strong>48 hours</strong> of package delivery by emailing <a href="mailto:hardware@talentxcel.net" className="text-primary underline">hardware@talentxcel.net</a> with clear unboxing photos/video.
            </p>
            <p>
              4.2 Verified DOA units are arranged for reverse pickup at zero expense to the learner and replaced with a new unit following manufacturer inspection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              5. Cancellation, Refunds & Hardware Retention
            </h2>
            <p>
              5.1 If a learner exercises their cooling-off cancellation rights under the <Link href="/legal/refunds" className="text-primary underline">Refund Policy</Link> prior to hardware dispatch, a 100% refund of the hardware component is processed.
            </p>
            <p>
              5.2 Once a physical device box seal has been broken or serial number registered, the device represents capital hardware that cannot be restocked for sanitary and electronic licensing reasons. In the event of an approved post-delivery course withdrawal, the learner retains ownership of the laptop, and the documented hardware purchase price (at cost) is deducted from any refundable tuition balance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              6. Technical Support & Grievance Contact
            </h2>
            <p>
              For questions regarding hardware tracking, warranty certificates, or driver configurations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>Hardware Fulfilment Desk: <a href="mailto:hardware@talentxcel.net" className="text-primary underline">hardware@talentxcel.net</a></li>
              <li>Admissions & Student Operations: <a href="mailto:admissions@talentxcel.net" className="text-primary underline">admissions@talentxcel.net</a></li>
              <li>General Grievances: <Link href="/accessibility" className="text-primary underline">Grievance & Accessibility Contact</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
