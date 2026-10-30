'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Brain,
  Code,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

export function MobileBottomNav() {
  const pathname = usePathname()

  const handleOpenChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-talentxcel-ai'))
    }
  }

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      active: pathname === '/',
    },
    {
      href: '/assessment',
      label: 'Assess',
      badge: 'Free',
      icon: Brain,
      active: pathname.startsWith('/assessment'),
    },
    {
      href: '/skills',
      label: 'Skills',
      badge: '8 Tracks',
      icon: Code,
      active: pathname.startsWith('/skills'),
    },
    {
      href: '/academic',
      label: 'Academic',
      icon: GraduationCap,
      active: pathname.startsWith('/academic'),
    },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5"
      role="navigation"
      aria-label="Mobile App Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.active

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#245BFF] font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3.5 bg-blue-600 text-white text-[8px] font-extrabold px-1 py-0.2 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#245BFF] mt-0.5" />
              )}
            </Link>
          )
        })}

        {/* Ask AI Chatbot Tab */}
        <button
          onClick={handleOpenChat}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-indigo-600 hover:text-indigo-700 font-bold transition-all relative active:scale-95"
          aria-label="Open Ask TalentXcel AI Chatbot"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-extrabold text-[#245BFF]">Ask AI</span>
        </button>
      </div>
    </nav>
  )
}
