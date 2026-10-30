'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calculator,
  Target,
  GraduationCap,
  Sparkles,
  Code,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { Button } from '@/components/ui/button'

export interface DashboardUserProps {
  id: string
  email?: string
  displayName?: string
  avatarUrl?: string | null
  isGoogleUser?: boolean
}

interface DashboardSidebarProps {
  user: DashboardUserProps
}

const navItems = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: 'Question Bank',
    href: '/dashboard/question-bank',
    icon: Calculator,
    badge: '3M Qs',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
  },
  {
    label: 'Diagnostic & Mocks',
    href: '/assessment',
    icon: Target,
    badge: 'Free',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  },
  {
    label: 'Academic Lessons',
    href: '/academic',
    icon: GraduationCap,
    badge: 'Classes 4–12',
    badgeColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20',
  },
  {
    label: 'Skill Development',
    href: '/skills',
    icon: Sparkles,
    badge: '8 Tracks',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
  },
  {
    label: 'AI & Project Labs',
    href: '/courses/ai-development',
    icon: Code,
    badge: 'Sandbox',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
  },
  {
    label: 'Plans & Passes',
    href: '/plans',
    icon: CreditCard,
    badge: 'From ₹20',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    badge: null,
  },
]

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const name = user.displayName || user.email?.split('@')[0] || 'Learner'
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'LX'

  const NavLinks = () => (
    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Dashboard navigation">
      <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
        Learning Center
      </div>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive =
          item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
              isActive
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={`h-4 w-4 shrink-0 transition-colors ${
                  isActive ? 'text-white' : 'text-neutral-500 dark:text-neutral-400 group-hover:text-blue-600'
                }`}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </div>
            {item.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : item.badgeColor
                }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )

  const UserFooter = () => (
    <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/50 space-y-3">
      {/* Profile summary card */}
      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs">
        {user.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.avatarUrl}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700 shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[11px] font-bold shrink-0">
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate block">
              {name}
            </span>
            <span title="Google Authenticated">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate block">
            {user.email || 'learner@talentxcel.net'}
          </span>
        </div>
      </div>

      {/* Sign Out Action */}
      <form action="/auth/signout" method="post">
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="w-full justify-start text-xs rounded-xl text-neutral-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 h-8"
        >
          <LogOut className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
          Sign Out
        </Button>
      </form>
    </div>
  )

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40">
        <Logo size="sm" variant="full" href="/" />
        <div className="flex items-center gap-2">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt={name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
              {initials}
            </div>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-lg text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
        >
          <aside
            className="w-72 max-w-[85vw] h-full bg-white dark:bg-neutral-950 flex flex-col shadow-2xl border-r border-neutral-200 dark:border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <Logo size="sm" variant="full" href="/" />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <NavLinks />
            <UserFooter />
          </aside>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside
        className="hidden lg:flex w-64 flex-col shrink-0 border-r border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 min-h-screen sticky top-0"
        aria-label="Dashboard navigation"
      >
        <div className="p-5 border-b border-neutral-200/80 dark:border-neutral-800">
          <Logo size="md" variant="full" href="/" />
        </div>
        <NavLinks />
        <UserFooter />
      </aside>
    </>
  )
}
