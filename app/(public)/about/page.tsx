import { Metadata } from 'next'
import { GraduationCap, Target, Shield, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About TalentXcel Academy',
  description: 'Learn about TalentXcel Academy — our mission, approach to education, and commitment to practical skills development.',
  alternates: {
    canonical: 'https://talentxcel.net/about',
  },
}

export default function AboutPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-9 w-9 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">About TalentXcel Academy</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Practical, career-oriented education for the digital economy.
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>Our Mission</h2>
          <p>
            TalentXcel Academy is an AI-first education platform designed to develop practical, career-relevant and business-relevant skills. We believe that real learning happens through building real things — not by watching videos or reading textbooks alone.
          </p>

          <h2>What We Offer</h2>
          <p>
            Our programmes combine structured learning with hands-on projects, AI-assisted tutoring, and mentor feedback. Each programme is built around defined learning outcomes and assessed competencies — not just content completion.
          </p>

          <h2>Our Approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 not-prose mt-6 mb-6">
            {[
              { icon: Target, title: 'Outcomes-Focused', desc: 'Every module is tied to defined learning outcomes and competency evidence.' },
              { icon: Zap, title: 'AI-Assisted', desc: 'Supervised AI tools support learning without replacing instructor guidance.' },
              { icon: Shield, title: 'Honest and Transparent', desc: 'We clearly state what our certificates are: platform-issued completion records, not regulated qualifications.' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-xl border p-5">
                  <Icon className="h-8 w-8 text-primary mb-3" aria-hidden="true" />
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              )
            })}
          </div>

          <h2>Important Information</h2>
          <ul>
            <li>TalentXcel Academy issues platform completion certificates. These are <strong>not regulated qualifications</strong> or accreditations by any government body or university unless explicitly verified and recorded by an authorized administrator.</li>
            <li>We do not guarantee employment, salary outcomes, examination results, or business income. These depend on individual learner effort and external market factors.</li>
            <li>Healthcare Technology is a technology programme only. It does not qualify learners to diagnose, prescribe, or provide regulated clinical services.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
