'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  ShieldCheck,
  LogOut,
  Settings,
  BookOpen,
  User,
  GraduationCap,
} from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { Button } from '@/components/ui/button'

interface DashboardTopbarProps {
  user: {
    id: string
    email?: string
    displayName?: string
    avatarUrl?: string | null
    isGoogleUser?: boolean
  }
  onOpenMobileMenu?: () => void
  selectedClass?: string
  onClassChange?: (newClass: string) => void
  onSearch?: (query: string) => void
}

export function DashboardTopbar({
  user,
  onOpenMobileMenu,
  selectedClass = 'class_10',
  onClassChange,
  onSearch,
}: DashboardTopbarProps) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [classDropdownOpen, setClassDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const name = user.displayName || user.email?.split('@')[0] || 'Arshid'
  const firstName = name.split(' ')[0] || 'Arshid'
  const initial = firstName.charAt(0).toUpperCase() || 'A'

  const classOptions = [
    { id: 'class_10', label: 'Class 10 CBSE' },
    { id: 'class_12', label: 'Class 12 CBSE' },
    { id: 'class_9', label: 'Class 9 CBSE' },
    { id: 'class_8', label: 'Class 8 CBSE' },
    { id: 'class_4_7', label: 'Classes 4–7' },
    { id: 'jee', label: 'JEE Main & Adv' },
    { id: 'neet', label: 'NEET-UG' },
    { id: 'cuet', label: 'CUET-UG' },
    { id: 'ai_skills', label: 'AI & Skill Track' },
  ]

  const currentClassLabel =
    classOptions.find((c) => c.id === selectedClass)?.label || 'Grade/Class'

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-white dark:bg-neutral-950 border-b border-slate-200/80 dark:border-neutral-800">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 gap-4">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo size="md" variant="full" href="/dashboard" />
        </div>

        {/* Center: Search Box & Grade/Class Dropdown (Desktop / Tablet) */}
        <div className="hidden md:flex items-center gap-3 flex-1 max-w-2xl mx-4">
          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 group"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subjects, exams, topics or skills..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white dark:focus:bg-neutral-950 transition-all"
            />
          </form>

          {/* Grade/Class Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setClassDropdownOpen(!classDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-neutral-200 bg-slate-50 dark:bg-neutral-900 hover:bg-slate-100 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-xl transition-colors whitespace-nowrap"
            >
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentClassLabel}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {classDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-xl z-50 text-xs"
                onClick={() => setClassDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Grade / Target
                </div>
                {classOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onClassChange && onClassChange(opt.id)}
                    className={`w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-neutral-800 flex items-center justify-between ${
                      selectedClass === opt.id
                        ? 'text-blue-600 font-bold bg-blue-50/50 dark:bg-blue-950/20'
                        : 'text-slate-700 dark:text-neutral-300'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedClass === opt.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Notifications & User Profile */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              type="button"
              className="p-2 rounded-xl text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-900 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-700 dark:text-neutral-200" />
              {/* Red unread dot with '1' */}
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-neutral-950">
                1
              </span>
            </button>
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-full sm:rounded-2xl hover:bg-slate-100 dark:hover:bg-neutral-900 border border-transparent sm:border-slate-200/80 dark:sm:border-neutral-800 transition-all"
            >
              {user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt={name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-600/20 shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
                  {initial}
                </div>
              )}
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {firstName}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-neutral-400 leading-tight">
                  Student
                </span>
              </div>
              <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 p-2 bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-xl z-50 text-xs"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="p-2 border-b border-slate-100 dark:border-neutral-800 mb-1">
                  <div className="font-bold text-slate-900 dark:text-white truncate">
                    {name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {user.email || 'learner@talentxcel.net'}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-blue-600 font-medium">
                    <ShieldCheck className="w-3 h-3" /> Google Verified
                  </div>
                </div>

                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Account Settings</span>
                </Link>

                <Link
                  href="/plans"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Passes & Credits</span>
                </Link>

                <div className="border-t border-slate-100 dark:border-neutral-800 my-1" />

                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-left transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
