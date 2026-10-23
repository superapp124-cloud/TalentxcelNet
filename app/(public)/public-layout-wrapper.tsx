'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { PublicNavbar } from '@/components/public/navbar'
import { PublicFooter } from '@/components/public/footer'
import { AdmissionsAssistantWidget } from '@/components/public/admissions-assistant-modal'

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  // When on the primary learner assessment platform homepage ('/'),
  // do NOT render the marketing navbar or marketing footer, preventing duplicate headers
  if (isHomePage) {
    return (
      <div className="flex min-h-screen flex-col overflow-x-hidden w-full max-w-full bg-[#F8FAFC]">
        <main className="flex-1" id="main-content">
          {children}
        </main>
      </div>
    )
  }

  // On secondary marketing routes (/about, /fees, /programmes, /faculty, etc.),
  // render the standard public marketing navbar and footer
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden w-full max-w-full">
      <PublicNavbar />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <AdmissionsAssistantWidget />
      <PublicFooter />
    </div>
  )
}
