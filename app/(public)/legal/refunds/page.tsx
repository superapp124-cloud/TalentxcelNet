import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — TalentXcel Academy',
  description: 'Cooling-off windows, refund eligibility, and cancellation procedures.',
}

export default function RefundsPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Clear guidelines regarding tuition refunds, cooling-off periods, and instalment cancellation.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. 7-Day Cooling-Off Period</h2>
            <p>
              Students enrolling in any structured programme may request a full refund of tuition within seven (7) calendar days of initial course access activation, provided that:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>No more than 15% of the total programme curriculum has been consumed or marked complete.</li>
              <li>No graded assessment or milestone project has been submitted for official mentor evaluation.</li>
              <li>A nominal administrative processing charge (not exceeding 5% or ₹1,500, whichever is lower) may be deducted for payment gateway transaction costs.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">2. Hardware / Laptop Return Conditions</h2>
            <p>
              If a student enrolled in a programme option bundled with a provisioned physical laptop:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Once the courier package has been unsealed, the physical device cannot be returned for a refund due to manufacturer warranty assignment and anti-tamper security policies.</li>
              <li>In the event of a valid cancellation within the 7-day cooling-off window where the device package remains completely factory-sealed, the hardware may be returned at the learner&apos;s shipping expense following inspection.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">3. Requesting a Refund</h2>
            <p>
              To initiate a formal refund request, email <a href="mailto:finance@talentxcel.net" className="text-primary underline">finance@talentxcel.net</a> stating your Order Number, registered email, and reason for withdrawal. Approved refunds are credited to the original payment source within 7 to 10 banking days.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
