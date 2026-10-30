'use client'

import React, { useState, useEffect } from 'react'
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
  LayoutDashboard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

interface SiteHeaderProps {
  onOpenGrowthPlan?: () => void
}

interface CurrentUser {
  id: string
  email?: string
  displayName?: string
  avatarUrl?: string | null
}

export function SiteHeader({ onOpenGrowthPlan }: SiteHeaderProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    let mounted = true
    try {
      const supabase = createClient()

      // 1. Fast local session check (instant from cookies/storage)
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (mounted && session?.user) {
          const user = session.user
          const name =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split('@')[0] ||
            'Learner'
          const avatarUrl =
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null
          setCurrentUser({
            id: user.id,
            email: user.email,
            displayName: name,
            avatarUrl,
          })
        }
      })

      // 2. Server verification check
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (mounted && user) {
          const name =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split('@')[0] ||
            'Learner'
          const avatarUrl =
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null
          setCurrentUser({
            id: user.id,
            email: user.email,
            displayName: name,
            avatarUrl,
          })
        }
      })

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (!mounted) return
          if (session?.user) {
            const user = session.user
            const name =
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              user.email?.split('@')[0] ||
              'Learner'
            const avatarUrl =
              user.user_metadata?.avatar_url ||
              user.user_metadata?.picture ||
              null
            setCurrentUser({
              id: user.id,
              email: user.email,
              displayName: name,
              avatarUrl,
            })
          } else {
            setCurrentUser(null)
          }
        }
      )

      return () => {
        mounted = false
        subscription?.unsubscribe()
      }
    } catch {
      // Fallback in environments without Supabase
    }
  }, [])

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-95"
            aria-label="TalentXcel Home"
          >
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              TX
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              talent<span className="text-blue-600 font-extrabold">Xcel</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold">
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

          {/* Dynamic Auth Button: Dashboard (if logged in) or Sign In (if logged out) */}
          {currentUser ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xs font-bold text-white bg-[#0066FF] hover:bg-blue-700 shadow-xs h-8.5 px-3.5 rounded-xl transition-all"
            >
              {currentUser.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.displayName || 'Learner'}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-white/50"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                  {currentUser.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <span>Dashboard</span>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs h-8.5 px-3.5 rounded-xl transition-all inline-flex items-center justify-center"
            >
              Sign In
            </Link>
          )}

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
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                  link.active
                    ? 'bg-blue-50 text-blue-700 font-bold'
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
            {currentUser ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs h-10 px-4 rounded-xl transition-colors shadow-2xs gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to My Dashboard ({currentUser.displayName}) →</span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs h-10 px-4 rounded-xl transition-colors shadow-2xs"
              >
                <span>Sign In to Your Account →</span>
              </Link>
            )}

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
