'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ClipboardCheck,
  BookOpen,
  Sparkles,
  User,
} from 'lucide-react'

interface DashboardBottomNavProps {
  onOpenAiTutor?: () => void
}

export function DashboardBottomNav({ onOpenAiTutor }: DashboardBottomNavProps) {
  const pathname = usePathname()

  const tabs = [
    {
      label: 'Home',
      href: '/dashboard',
      icon: LayoutDashboard,
      isActive: pathname === '/dashboard',
    },
    {
      label: 'Tests',
      href: '/assessment',
      icon: ClipboardCheck,
      isActive: pathname.startsWith('/assessment'),
    },
    {
      label: 'Learn',
      href: '/academic',
      icon: BookOpen,
      isActive: pathname.startsWith('/academic') || pathname.startsWith('/courses'),
    },
    {
      label: 'AI Tutor',
      href: '#ai-tutor',
      icon: Sparkles,
      isActive: false,
      onClick: (e: React.MouseEvent) => {
        if (onOpenAiTutor) {
          e.preventDefault()
          onOpenAiTutor()
        }
      },
    },
    {
      label: 'Profile',
      href: '/dashboard/settings',
      icon: User,
      isActive: pathname.startsWith('/dashboard/settings'),
    },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-t border-slate-200/80 dark:border-neutral-800 pb-safe">
      <div className="flex items-center justify-around h-14 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const active = tab.isActive

          return (
            <Link
              key={tab.label}
              href={tab.href}
              onClick={tab.onClick}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
                active
                  ? 'text-[#0066FF] font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform ${
                  active ? 'scale-110 text-[#0066FF]' : 'text-slate-500 dark:text-neutral-400'
                }`}
              />
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {tab.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
