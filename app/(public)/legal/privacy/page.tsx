import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — TalentXcel Academy',
  description: 'Digital Personal Data Protection Act 2023 compliant privacy policy and consent guidelines.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy & Data Protection
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Effective Date: 16 October 2026 • Compliant with the Digital Personal Data Protection Act (DPDP) 2023
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. Introduction & Scope</h2>
            <p>
              TalentXcel Academy (&quot;we&quot;, &quot;our&quot;, or &quot;the Academy&quot;) is committed to processing digital personal data in a lawful, fair, and transparent manner. This Privacy Policy details how we collect, use, store, and protect data acquired via <code>talentxcel.net</code> and <code>academy.talentxcel.net</code>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">2. Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Contact & Identification Data</strong>: Full name, verified email address, phone number, and physical city/state.</li>
              <li><strong>Enrolment & Academic Records</strong>: Course completions, assessment submissions, mentor feedback, and issued certificate records.</li>
              <li><strong>Authentication & Telemetry</strong>: Secure session tokens, IP addresses, browser types, and client-side error telemetry.</li>
              <li><strong>Financial Transactions</strong>: Transaction IDs, payment mode, and order timestamps. We <em>never</em> store raw credit/debit card numbers or CVV codes; all payment processing is handled through PCI-DSS certified gateways (Razorpay).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">3. Processing of Minor Data (Under 18 Years)</h2>
            <p>
              In accordance with Section 9 of the DPDP Act 2023:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Learners below 18 enrolling in school programmes must provide verifiable parental or legal guardian consent prior to account activation.</li>
              <li>We strictly prohibit behavioural tracking, targeted advertising, or algorithmic profiling directed at minor learners.</li>
              <li>Minor student profiles are never listed in public directories or indexed by public search engines.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">4. AI Interaction & Grounding Safeguards</h2>
            <p>
              When you interact with the TalentXcel Super AI Tutor or Coding Mentor:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Queries are used solely to generate real-time educational hints and explanations.</li>
              <li>Student personal data is never transmitted to public model providers for foundational training purposes.</li>
              <li>Conversations are retained under strict access control and may be reviewed by instructors only when an escalation flag is raised.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">5. Data Subject Rights & Grievance Mechanism</h2>
            <p>
              You have the right to request access to, correction of, or permanent deletion of your personal data. To exercise these rights, email our designated Grievance Officer at <a href="mailto:grievance@talentxcel.net" className="text-primary underline">grievance@talentxcel.net</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
