import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Sparkles, BookOpen, GraduationCap } from 'lucide-react'
import { SiteHeader } from '@/components/navigation/site-header'
import { OpticsInteractiveSandbox } from '@/components/academic/optics-interactive-sandbox'

export const metadata: Metadata = {
  title: 'Interactive Optics & Ray-Tracing Lab — Class 10 Science | TalentXcel',
  description:
    'Hands-on interactive ray optics simulator, Cartesian sign convention gym, laser vault mission, and Socratic AI coach for Class 10 CBSE Chapter 10 Light.',
}

export default function OpticsLabPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/academic" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Academic Curriculum</span>
          </Link>
          <span>/</span>
          <span>Class 10 CBSE</span>
          <span>/</span>
          <span>Science (Physics)</span>
          <span>/</span>
          <span className="text-slate-900 font-bold">Ch-10 Light: Reflection &amp; Refraction</span>
        </div>

        {/* Embedded Interactive Lab Sandbox */}
        <OpticsInteractiveSandbox />
      </main>
    </div>
  )
}
