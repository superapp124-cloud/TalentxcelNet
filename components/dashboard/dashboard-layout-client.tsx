'use client'

import React, { useState } from 'react'
import { DashboardTopbar } from '@/components/dashboard/dashboard-topbar'
import { DashboardSidebar, DashboardUserProps } from '@/components/dashboard/dashboard-sidebar'
import { DashboardBottomNav } from '@/components/dashboard/dashboard-bottom-nav'

interface DashboardLayoutClientProps {
  user: DashboardUserProps
  children: React.ReactNode
}

export function DashboardLayoutClient({ user, children }: DashboardLayoutClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('class_10')

  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass)
    if (typeof window !== 'undefined') {
      localStorage.setItem('talentxcel_active_target', newClass)
      window.dispatchEvent(new Event('talentxcel_target_changed'))
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-black flex flex-col">
      {/* 1. Full-Width Top Navbar */}
      <DashboardTopbar
        user={user}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        selectedClass={selectedClass}
        onClassChange={handleClassChange}
      />

      {/* 2. Workspace Layout: Sidebar + Main Content (Compact and responsive) */}
      <div className="flex-1 flex w-full max-w-[1400px] mx-auto">
        {/* Left Sidebar */}
        <DashboardSidebar
          user={user}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area */}
        <main
          className="flex-1 min-w-0 p-3 sm:p-5 lg:p-6 pb-20 lg:pb-10 overflow-y-auto"
          id="dashboard-content"
        >
          {children}
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation Bar */}
      <DashboardBottomNav
        onOpenAiTutor={() => {
          const aiElem = document.getElementById('ai-tutor')
          if (aiElem) {
            aiElem.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      />
    </div>
  )
}
