import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — TalentXcel Academy',
  description: 'General terms and conditions governing platform usage, learning access, and intellectual property.',
}

export default function TermsPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms & Conditions of Service
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last Updated: 16 October 2026
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing or creating an account on TalentXcel Academy (<code>talentxcel.net</code> or <code>academy.talentxcel.net</code>), you agree to be bound by these Terms of Service. If you do not agree, do not access or use the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">2. Educational Scope & Disclaimer of Regulated Accreditation</h2>
            <p>
              TalentXcel Academy is an independent educational technology platform providing career-oriented practical skills instruction.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Certificates issued by TalentXcel represent internal milestone completion and competency evidence. They do <strong>not</strong> constitute university degrees, government diplomas, or regulated statutory qualifications.</li>
              <li>TalentXcel does not guarantee employment, job placements, salary benchmarks, or business revenues. Such outcomes depend upon individual student dedication and external market conditions.</li>
              <li>The Healthcare Technology programme is strictly an engineering and technology curriculum. It does not license or authorize any participant to practice medicine or provide regulated clinical treatments.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">3. User Conduct & Security</h2>
            <p>
              Learners must not:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Share login credentials or sub-license platform access to unauthorized third parties.</li>
              <li>Execute malicious scripts, automated scrapers, or reverse-engineering payloads against platform APIs or AI services.</li>
              <li>Attempt to override, poison, or jailbreak Super AI Tutor system prompts.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">4. Intellectual Property</h2>
            <p>
              All video lectures, reading modules, assessment question banks, and software platforms are the exclusive intellectual property of TalentXcel. Students retain full ownership of the original code and projects they write and submit as part of their capstone portfolios.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
