import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement — TalentXcel Academy',
  description: 'Our commitment to digital accessibility, WCAG 2.1 AA conformance, and grievance contact.',
}

export default function AccessibilityPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Accessibility Statement
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Our commitment to accessible digital education for all learners.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. Conformance Standards</h2>
            <p>
              TalentXcel Academy is dedicated to providing an accessible learning platform compliant with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. We design our web pages with clear color contrast, keyboard navigability, semantic ARIA markup, and full support for screen readers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">2. Reduced Motion & Sensory Preferences</h2>
            <p>
              Our design system respects operating system <code>prefers-reduced-motion</code> settings. Animations, transitions, and pulsing UI elements are automatically minimized for learners sensitive to visual motion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">3. Feedback & Grievance Contact</h2>
            <p>
              If you experience any accessibility barrier while browsing our site or using our learning player, please contact our Accessibility Coordinator at <a href="mailto:accessibility@talentxcel.net" className="text-primary underline">accessibility@talentxcel.net</a>. We prioritize all accessibility inquiries and commit to resolving barriers promptly.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
