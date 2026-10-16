'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/brand/logo'

const navLinks = [
  { label: 'About', href: '/about' },
  {
    label: 'Programmes',
    href: '/programmes',
    children: [
      { label: 'AI Development & Automation', href: '/programmes/ai-development', badge: 'Flagship' },
      { label: 'Government & Competitive Exams', href: '/programmes/competitive-exams', badge: 'UPSC/PSC' },
      { label: 'School Foundation (Class 8 → 9)', href: '/programmes/school-foundation', badge: 'NEET/JEE' },
      { label: 'High School Integrated (9–12)', href: '/programmes/highschool-integrated-foundation', badge: '2–4 Yrs' },
      { label: 'Healthcare Technology', href: '/programmes/healthcare-tech' },
      { label: 'Entrepreneurship & Startups', href: '/programmes/entrepreneurship' },
      { label: 'Small Business & Retailers', href: '/programmes/small-business' },
      { label: 'Home Business (Women Founders)', href: '/programmes/home-business' },
      { label: 'Teachers & Trainers Track', href: '/programmes/teachers-trainers' },
      { label: 'Yoga, Fitness & Lifestyle Trainers', href: '/programmes/lifestyle-trainers' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Fees & Plans', href: '/fees' },
  { label: 'Projects', href: '/projects' },
  { label: 'Workspace', href: '/dashboard' },
  { label: 'Blog', href: '/blog' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Contact', href: '/contact' },
]

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#000000]/85 backdrop-blur-2xl transition-all">
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Official Brand Logo */}
        <Logo size="md" variant="full" href="/" className="text-white" />

        {/* Desktop Nav with Apple-like minimalism */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  className="flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  aria-expanded={openDropdown === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 opacity-60 transition-transform duration-200',
                      openDropdown === link.label && 'rotate-180'
                    )}
                  />
                </button>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[590px] rounded-2xl border border-white/[0.12] bg-[#0c0c0e]/95 backdrop-blur-2xl p-3.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                    <div className="grid grid-cols-2 gap-1.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center justify-between rounded-xl px-3 py-2 text-[12.5px] text-neutral-300 hover:bg-white/[0.08] hover:text-white transition-colors group"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className="font-medium group-hover:text-white line-clamp-1">{child.label}</span>
                          {child.badge && (
                            <span className="text-[10px] font-semibold text-[#0080FF] bg-[#0080FF]/10 px-2 py-0.5 rounded-full shrink-0 ml-1.5">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2.5 pt-2.5 border-t border-white/[0.08] flex items-center justify-between px-2 text-[11px] text-neutral-400">
                      <span>All 10 programmes include dedicated pre-loaded laptops</span>
                      <Link
                        href="/programmes"
                        className="text-[#0080FF] hover:underline font-semibold flex items-center gap-1"
                        onClick={() => setOpenDropdown(null)}
                      >
                        View Full Catalogue →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA Pill Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/auth/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-medium rounded-full text-neutral-300 hover:text-white hover:bg-white/[0.08]"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/apply">
            <Button
              size="sm"
              className="rounded-full bg-white text-black hover:bg-neutral-100 text-xs font-semibold px-4 shadow-sm"
            >
              Apply Now
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/[0.08]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-950 px-5 py-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-3 pl-3 border-l border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-1 my-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-2 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-2.5 mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08]">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full rounded-full text-xs">
                  Sign In
                </Button>
              </Link>
              <Link href="/apply" className="flex-1">
                <Button size="sm" className="w-full rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black text-xs">
                  Apply Now
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
