'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { PublicNavbar } from '@/components/public/navbar'
import { PublicFooter } from '@/components/public/footer'
import { AdmissionsAssistantWidget } from '@/components/public/admissions-assistant-modal'
import { MobileBottomNav } from '@/components/navigation/mobile-bottom-nav'

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPlatformRoute =
    pathname === '/' ||
    pathname.startsWith('/assessment') ||
    pathname.startsWith('/skills') ||
    pathname.startsWith('/academic') ||
    pathname.startsWith('/plans')

  // When on primary learner platform routes ('/', '/assessment', '/skills', '/academic', '/plans'),
  // do NOT render legacy marketing navbar or footer, ensuring a clean, distraction-free learning experience
  if (isPlatformRoute) {
    return (
      <div className="flex min-h-screen flex-col overflow-x-hidden w-full max-w-full bg-[#F8FAFC]">
        <main className="flex-1 pb-16 md:pb-0" id="main-content">
          {children}
        </main>
        <MobileBottomNav />
        <AdmissionsAssistantWidget />
      </div>
    )
  }

  // On secondary marketing routes (/about, /fees, /programmes, /faculty, etc.),
  // render the standard public marketing navbar and footer
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden w-full max-w-full">
      <PublicNavbar />
      <main className="flex-1 pb-16 md:pb-0" id="main-content">
        {children}
      </main>
      <MobileBottomNav />
      <AdmissionsAssistantWidget />
      <PublicFooter />
    </div>
  )
}
