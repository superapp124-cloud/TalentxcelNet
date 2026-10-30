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
  Code2,
  CreditCard,
  BarChart3,
  Award,
  Bookmark,
  FileText,
  Settings,
  Crown,
  ArrowRight,
  X,
} from 'lucide-react'
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
  mobileOpen?: boolean
  onCloseMobile?: () => void
}

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | null
  badgeColor?: string
}

const navItems: NavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    id: 'question-bank',
    label: 'Question Bank',
    href: '/dashboard/question-bank',
    icon: Calculator,
    badge: '3M+',
    badgeColor:
      'bg-blue-50 text-blue-600 border border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800',
  },
  {
    id: 'diagnostic',
    label: 'Diagnostic & Mocks',
    href: '/assessment',
    icon: Target,
    badge: 'New',
    badgeColor:
      'bg-emerald-50 text-emerald-600 border border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
  },
  {
    id: 'academic',
    label: 'Academic Lessons',
    href: '/academic',
    icon: GraduationCap,
    badge: 'Classes 4-12',
    badgeColor:
      'bg-purple-50 text-purple-600 border border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800',
  },
  {
    id: 'skills',
    label: 'Skill Development',
    href: '/skills',
    icon: Sparkles,
    badge: '8 Tracks',
    badgeColor:
      'bg-indigo-50 text-indigo-600 border border-indigo-200/60 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800',
  },
  {
    id: 'projects',
    label: 'AI & Project Labs',
    href: '/courses/ai-development',
    icon: Code2,
    badge: 'Sandbox',
    badgeColor:
      'bg-purple-50 text-purple-600 border border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-800',
  },
  {
    id: 'plans',
    label: 'Plans & Passes',
    href: '/plans',
    icon: CreditCard,
    badge: 'From ₹20',
    badgeColor:
      'bg-amber-50 text-amber-700 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
  },
  {
    id: 'reports',
    label: 'Progress & Reports',
    href: '/assessment#reports',
    icon: BarChart3,
    badge: null,
  },
  {
    id: 'achievements',
    label: 'Achievements',
    href: '/dashboard#achievements',
    icon: Award,
    badge: null,
  },
  {
    id: 'bookmarks',
    label: 'My Bookmarks',
    href: '/dashboard#bookmarks',
    icon: Bookmark,
    badge: null,
  },
  {
    id: 'notes',
    label: 'Notes & Revision',
    href: '/academic',
    icon: FileText,
    badge: null,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    badge: null,
  },
]

export function DashboardSidebar({
  user,
  mobileOpen = false,
  onCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState<string>('overview')

  const isNavActive = (item: NavItem) => {
    if (item.id === 'overview') {
      return pathname === '/dashboard' && activeItem === 'overview'
    }
    if (item.id === 'settings') {
      return pathname.startsWith('/dashboard/settings')
    }
    if (item.id === 'question-bank') {
      return pathname.startsWith('/dashboard/question-bank')
    }
    if (item.id === 'diagnostic') {
      return pathname === '/assessment' && activeItem !== 'reports'
    }
    if (item.id === 'academic') {
      return pathname === '/academic' && activeItem !== 'notes'
    }
    if (item.id === 'skills') {
      return pathname.startsWith('/skills')
    }
    if (item.id === 'projects') {
      return pathname.startsWith('/courses') || pathname.startsWith('/projects')
    }
    if (item.id === 'plans') {
      return pathname.startsWith('/plans')
    }
    return activeItem === item.id
  }

  const NavLinks = () => (
    <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto" aria-label="Dashboard navigation">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isNavActive(item)

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={() => {
              setActiveItem(item.id)
              if (onCloseMobile) onCloseMobile()
            }}
            className={`group flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
              active
                ? 'bg-[#0066FF] text-white shadow-xs font-bold'
                : 'text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-900 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={`h-4 w-4 shrink-0 transition-colors ${
                  active ? 'text-white' : 'text-slate-400 dark:text-neutral-500 group-hover:text-blue-600'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </div>
            {item.badge && (
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                  active ? 'bg-white/20 text-white' : item.badgeColor
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

  const UpgradeCard = () => (
    <div className="p-3 m-3 rounded-2xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 dark:border-amber-900/30 space-y-2">
      <div className="flex items-center gap-2 text-xs font-extrabold text-amber-800 dark:text-amber-400">
        <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
        <span>Upgrade to Pro</span>
      </div>
      <p className="text-[11px] text-slate-600 dark:text-neutral-400 leading-snug">
        Unlock full question bank, AI tutor &amp; personalised learning.
      </p>
      <Link href="/plans" onClick={onCloseMobile} className="block pt-1">
        <Button
          size="sm"
          className="w-full h-8 text-xs font-bold bg-[#0066FF] hover:bg-blue-700 text-white rounded-xl gap-1.5 shadow-xs"
        >
          View Plans <ArrowRight className="w-3 h-3" />
        </Button>
      </Link>
    </div>
  )

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        >
          <aside
            className="w-72 max-w-[85vw] h-full bg-white dark:bg-neutral-950 flex flex-col shadow-2xl border-r border-slate-200 dark:border-neutral-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Menu
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-neutral-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <NavLinks />
            <UpgradeCard />
          </aside>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside
        className="hidden lg:flex w-56 xl:w-60 flex-col shrink-0 border-r border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 min-h-[calc(100vh-4rem)] sticky top-16 select-none"
        aria-label="Dashboard navigation"
      >
        <NavLinks />
        <UpgradeCard />
      </aside>
    </>
  )
}
