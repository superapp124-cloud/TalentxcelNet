import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

const footerLinks = {
  Programmes: [
    { label: 'AI Development', href: '/programmes/ai-development' },
    { label: 'Healthcare Tech', href: '/programmes/healthcare-tech' },
    { label: 'Entrepreneurship', href: '/programmes/entrepreneurship' },
    { label: 'School Foundation', href: '/programmes/school-foundation' },
  ],
  Admissions: [
    { label: 'Apply Now', href: '/apply' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Fees & Payment', href: '/fees' },
    { label: 'FAQs', href: '/faq' },
  ],
  Academy: [
    { label: 'About Us', href: '/about' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Student Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms & Conditions', href: '/legal/terms' },
    { label: 'Refund Policy', href: '/legal/refunds' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Contact', href: '/contact' },
  ],
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted/30" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="TalentXcel Academy">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="font-bold text-foreground">TalentXcel</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Practical, career-oriented education for the digital economy.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Platform-issued completion certificates. Not a regulated qualification or accreditation.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-3">{category}</h3>
              <ul className="space-y-2" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} TalentXcel Academy. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Grievance Officer:{' '}
            <Link href="/contact" className="underline hover:text-foreground">Contact us</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
