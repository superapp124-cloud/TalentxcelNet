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
  ShieldCheck,
  Search,
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
      label: 'Maths Question Bank',
      shortLabel: 'Maths Bank',
      badge: '36.5k Qs',
      icon: <Calculator className="w-4 h-4 text-blue-600" />,
      active: pathname.startsWith('/dashboard/question-bank'),
    },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Mark */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex flex-col group">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
              Talent<span className="text-blue-600">Xcel</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider">
              Universal Learning & Assessment
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
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
                        : 'bg-slate-100 text-slate-600'
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
              className="hidden md:flex items-center gap-1.5 text-xs font-bold border-blue-200 text-blue-700 hover:bg-blue-50 h-8.5 rounded-xl"
            >
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Growth Plan</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </Button>
          )}

          <Link
            href="/admin/growth-analytics"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>Growth Dashboard</span>
          </Link>

          <Link href="/auth/login">
            <Button
              size="sm"
              variant="outline"
              className="text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border-slate-300 shadow-2xs h-8.5 px-3.5 rounded-xl transition-all"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/assessment">
            <Button
              size="sm"
              className="bg-[#245BFF] hover:bg-[#1D4ED8] text-white text-xs font-bold h-8.5 px-3.5 rounded-xl shadow-xs hidden sm:flex transition-all"
            >
              Free Practice
            </Button>
          </Link>

          {/* Mobile Menu Button with Accessible States */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
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
              <Button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenGrowthPlan()
                }}
                variant="outline"
                className="w-full justify-start text-xs font-bold text-blue-700 border-blue-200 h-10"
              >
                <Activity className="w-4 h-4 mr-2 text-blue-600" />
                View Personalised Growth Plan
              </Button>
            )}

            <Link href="/admin/growth-analytics" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full justify-start text-xs font-semibold text-slate-700 h-10"
              >
                <TrendingUp className="w-4 h-4 mr-2 text-indigo-600" />
                Truthful Growth Telemetry
              </Button>
            </Link>

            <Link href="/assessment" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-10">
                Start Free Practice (Class 4 Diagnostic) →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
