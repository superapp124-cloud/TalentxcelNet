import Link from 'next/link'
import { Logo } from '@/components/brand/logo'
import { EcosystemDiscoveryBanner } from '@/components/ecosystem/ecosystem-discovery-banner'

const footerLinks = {
  Programmes: [
    { label: 'AI Development & Automation', href: '/programmes/ai-development' },
    { label: 'Government & Competitive Exams', href: '/programmes/competitive-exams' },
    { label: 'School Foundation Track (8→9)', href: '/programmes/school-foundation' },
    { label: 'High School Integrated (9–12)', href: '/programmes/highschool-integrated-foundation' },
    { label: 'Healthcare Technology', href: '/programmes/healthcare-tech' },
    { label: 'Small Business & MSME Track', href: '/programmes/small-business' },
    { label: 'Explore All 10 Programmes →', href: '/programmes' },
  ],
  Admissions: [
    { label: 'Apply for Admission', href: '/apply' },
    { label: 'How Learning Works', href: '/how-it-works' },
    { label: 'Fees & Payment Plans', href: '/fees' },
    { label: 'Technical Requirements', href: '/laptop-requirements' },
    { label: 'Frequently Asked Questions', href: '/faq' },
  ],
  Platform: [
    { label: 'About TalentXcel', href: '/about' },
    { label: 'Instructors & Mentors', href: '/faculty' },
    { label: 'Student Capstones', href: '/projects' },
    { label: 'Blog & Resources', href: '/blog' },
    { label: 'Certificate Verification', href: '/verify/TXCERT-2026-DEMO01' },
    { label: 'Contact & Grievance', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy (DPDP Act)', href: '/legal/privacy' },
    { label: 'Terms & Conditions', href: '/legal/terms' },
    { label: 'Refund & Cancellation Policy', href: '/legal/refunds' },
    { label: 'Hardware Warranty Terms', href: '/legal/hardware-terms' },
    { label: 'Accessibility Statement', href: '/accessibility' },
  ],
}

export function PublicFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#000000] text-neutral-400" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <Logo size="md" variant="full" href="/" theme="dark" />
            <p className="text-xs text-neutral-400 leading-relaxed">
              Practical, career-oriented and business-oriented skills development through a modern AI-first learning platform.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 leading-normal">
              Platform-issued milestone certificates. Not an accredited university degree or regulated clinical qualification.
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                {category}
              </h3>
              <ul className="space-y-2 text-xs" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} TalentXcel.net. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/contact" className="hover:text-white transition-colors">
              Statutory Grievance Officer
            </Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Data Protection
            </Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">
              WCAG 2.1 AA
            </Link>
          </div>
        </div>
      </div>
      <EcosystemDiscoveryBanner variant="footer-strip" />
    </footer>
  )
}
