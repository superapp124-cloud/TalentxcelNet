'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '/about' },
  {
    label: 'Programmes',
    href: '/programmes',
    children: [
      { label: 'AI Development & Automation', href: '/programmes/ai-development' },
      { label: 'Healthcare Technology', href: '/programmes/healthcare-tech' },
      { label: 'Entrepreneurship & Digitization', href: '/programmes/entrepreneurship' },
      { label: 'School Foundation (Class 8→9)', href: '/programmes/school-foundation' },
    ],
  },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Fees', href: '/fees' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="TalentXcel Academy home">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight tracking-tight text-foreground">TalentXcel</span>
            <span className="text-[10px] font-medium text-muted-foreground leading-tight">Academy</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  aria-expanded={openDropdown === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown className={cn('h-4 w-4 transition-transform', openDropdown === link.label && 'rotate-180')} />
                </button>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 rounded-xl border bg-popover p-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/apply">
            <Button size="sm">Apply Now</Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-4 pb-4" role="dialog" aria-label="Mobile navigation">
          <nav className="mt-2 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 flex flex-col gap-0.5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-border">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
              </Link>
              <Link href="/apply" className="flex-1">
                <Button size="sm" className="w-full">Apply Now</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
