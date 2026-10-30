'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Brain,
  Code,
  GraduationCap,
  CreditCard,
  TrendingUp,
  Activity,
  Menu,
  X,
  Calculator,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SiteHeaderProps {
  onOpenGrowthPlan?: () => void
}

export function SiteHeader({ onOpenGrowthPlan }: SiteHeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    {
      href: '/assessment',
      label: 'Assessment & Intelligence',
      shortLabel: 'Assessment',
      badge: 'Free Practice',
      icon: <Brain className="w-4 h-4 text-blue-600" />,
      active: pathname.startsWith('/assessment'),
    },
    {
      href: '/skills',
      label: 'Skill Development',
      shortLabel: 'Skills',
      badge: '8 Tracks',
      icon: <Code className="w-4 h-4 text-indigo-600" />,
      active: pathname.startsWith('/skills'),
    },
    {
      href: '/academic',
      label: 'Academic Learning',
      shortLabel: 'Academic',
      badge: 'Classes 4–12',
      icon: <GraduationCap className="w-4 h-4 text-emerald-600" />,
      active: pathname.startsWith('/academic'),
    },
    {
      href: '/plans',
      label: 'Plans & Pricing',
      shortLabel: 'Plans',
      badge: 'From ₹20',
      icon: <CreditCard className="w-4 h-4 text-amber-600" />,
      active: pathname.startsWith('/plans'),
    },
    {
      href: '/dashboard/question-bank',
      label: 'Universal Question Bank',
      shortLabel: 'Question Bank',
      badge: '3M Qs',
      icon: <Calculator className="w-4 h-4 text-blue-600" />,
      active: pathname.startsWith('/dashboard/question-bank'),
    },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Mark */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group focus:outline-none" aria-label="TalentXcel Home">
            <img
              src="/brand/talentxcel-logo.png"
              alt="talentXcel"
              width={140}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.active ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
                  link.active
                    ? 'bg-slate-100 text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.icon}
                <span>{link.shortLabel}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      link.active
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions: Growth Plan, Analytics, Auth & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          {onOpenGrowthPlan && (
            <Button
              onClick={onOpenGrowthPlan}
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-1.5 text-xs font-bold border-blue-200 text-blue-700 hover:bg-blue-50 h-8.5 rounded-xl cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Growth Plan</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Button>
          )}

          <Link
            href="/admin/growth-analytics"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>Growth Dashboard</span>
          </Link>

          <Link
            href="/auth/login"
            className="text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs h-8.5 px-3.5 rounded-xl transition-all inline-flex items-center justify-center"
          >
            Sign In
          </Link>

          <Link
            href="/assessment"
            className="bg-[#245BFF] hover:bg-[#1D4ED8] text-white text-xs font-bold h-8.5 px-3.5 rounded-xl shadow-xs hidden sm:inline-flex items-center justify-center transition-all"
          >
            Free Practice
          </Link>

          {/* Mobile Menu Button with Accessible States */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={mobileMenuOpen ? 'Close main navigation menu' : 'Open main navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <img
              src="/brand/talentxcel-logo.png"
              alt="talentXcel"
              width={120}
              height={28}
              className="h-7 w-auto object-contain"
            />
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Navigation</span>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={link.active ? 'page' : undefined}
                className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                  link.active
                    ? 'bg-blue-50 text-blue-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {onOpenGrowthPlan && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenGrowthPlan()
                }}
                className="w-full flex items-center justify-start text-xs font-bold text-blue-700 border border-blue-200 bg-white hover:bg-blue-50 h-10 px-4 rounded-xl transition-colors"
              >
                <Activity className="w-4 h-4 mr-2 text-blue-600" />
                <span>View Personalised Growth Plan</span>
              </button>
            )}

            <Link
              href="/admin/growth-analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-start text-xs font-semibold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 h-10 px-4 rounded-xl transition-colors"
            >
              <TrendingUp className="w-4 h-4 mr-2 text-indigo-600" />
              <span>Truthful Growth Telemetry</span>
            </Link>

            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center bg-[#245BFF] hover:bg-[#1D4ED8] text-white font-bold text-xs h-10 px-4 rounded-xl transition-colors shadow-2xs"
            >
              <span>Start Free Practice (Class 4 Diagnostic) →</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
