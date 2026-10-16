'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Cpu,
  Stethoscope,
  Clock,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  Laptop,
  Briefcase,
  BookOpen,
  Filter,
} from 'lucide-react'
import {
  PROGRAMME_UNIVERSE,
  ProgrammeFamily,
  ProgrammeCategory,
  ProgrammeLifecycleStatus,
} from '@/lib/lms/programme-universe'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CATEGORY_TABS: Array<{
  id: ProgrammeCategory | 'all'
  label: string
  count: number
  icon: any
}> = [
  { id: 'all', label: 'All 20 Programme Families', count: 20, icon: Layers },
  { id: 'school_competitive', label: 'School & Competitive Examinations', count: 7, icon: GraduationCap },
  { id: 'technology', label: 'Technology & Future Careers', count: 5, icon: Cpu },
  { id: 'healthcare_business', label: 'Healthcare, Business & Careers', count: 8, icon: Stethoscope },
]

function getBadgeStyle(status: ProgrammeLifecycleStatus) {
  switch (status) {
    case 'open_for_enrolment':
      return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
    case 'pilot':
      return 'border-sky-500/40 bg-sky-500/10 text-sky-300'
    case 'curriculum_development':
      return 'border-amber-500/40 bg-amber-500/10 text-amber-300'
    case 'concept':
    default:
      return 'border-purple-500/30 bg-purple-500/10 text-purple-300'
  }
}

export function ProgrammeUniverseExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<ProgrammeCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'open' | 'pipeline'>('all')

  const filteredProgrammes = useMemo(() => {
    return PROGRAMME_UNIVERSE.filter((prog) => {
      // Category filter
      if (selectedCategory !== 'all' && prog.category !== selectedCategory) {
        return false
      }
      // Status filter
      if (selectedStatus === 'open' && !prog.isApprovedForEnrolment) {
        return false
      }
      if (selectedStatus === 'pipeline' && prog.isApprovedForEnrolment) {
        return false
      }
      // Text search
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase().trim()
      return (
        prog.title.toLowerCase().includes(q) ||
        prog.shortTitle.toLowerCase().includes(q) ||
        prog.subtitle.toLowerCase().includes(q) ||
        prog.tagline.toLowerCase().includes(q) ||
        prog.prerequisites.some((p) => p.toLowerCase().includes(q)) ||
        prog.learningOutcomes.some((l) => l.toLowerCase().includes(q))
      )
    })
  }, [selectedCategory, searchQuery, selectedStatus])

  return (
    <div className="w-full space-y-8">
      {/* Explorer Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-950/30">
          The 20-Family Programme Universe
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Explore Connected Worlds of Ambition
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          From Class 9 school foundations to generative AI agents, healthcare informatics, and digital business.
          Transparently categorized by development lifecycle and verified cohort availability.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon
            const isSelected = selectedCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'border border-white/[0.08] bg-white/[0.03] text-neutral-400 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-cyan-400" />
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/[0.08] text-neutral-300">
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search & Enrolment Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search universe..."
              className="w-full rounded-xl border border-white/[0.1] bg-neutral-950 px-3 pl-8 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="rounded-xl border border-white/[0.1] bg-neutral-950 px-3 py-1.5 text-xs text-neutral-300 focus:border-cyan-400 focus:outline-none"
            aria-label="Filter by enrolment status"
          >
            <option value="all">All Lifecycles</option>
            <option value="open">Admissions Open Only</option>
            <option value="pipeline">In Development Only</option>
          </select>
        </div>
      </div>

      {/* Programme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProgrammes.map((prog) => {
          return (
            <div
              key={prog.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-neutral-950/60 p-6 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_30px_rgba(0,128,255,0.12)] backdrop-blur-md"
            >
              <div className="space-y-4">
                {/* Header: Number and Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-500">
                    FAM #{String(prog.familyNumber).padStart(2, '0')}
                  </span>
                  <Badge variant="outline" className={`text-[10px] font-semibold ${getBadgeStyle(prog.lifecycleStatus)}`}>
                    {prog.statusBadge}
                  </Badge>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400/90 mt-1">{prog.tagline}</p>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">{prog.subtitle}</p>

                {/* Key Metadata Pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-300 pt-2 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                    <span>{prog.durationMonths} Months Duration</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                    <span>{prog.coreModules.length} Modules</span>
                  </div>
                </div>

                {/* Hands-on Practical Project Highlight */}
                {prog.handsOnProjects[0] && (
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-2.5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                      Flagship Project
                    </span>
                    <div className="text-xs font-semibold text-neutral-200 line-clamp-1">
                      {prog.handsOnProjects[0].title}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer: Regulatory Disclosure & Action */}
              <div className="pt-6 space-y-3">
                {prog.regulatoryDisclaimer && (
                  <p className="text-[10px] text-neutral-500 leading-relaxed italic border-t border-white/[0.06] pt-2">
                    {prog.regulatoryDisclaimer}
                  </p>
                )}

                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="text-xs">
                    {prog.isApprovedForEnrolment ? (
                      <span className="font-bold text-white">
                        ₹{prog.pricing.tuitionInr.toLocaleString('en-IN')}{' '}
                        <span className="text-[10px] text-neutral-400 font-normal">total</span>
                      </span>
                    ) : (
                      <span className="text-neutral-500 text-[11px]">Enrolment Opening Soon</span>
                    )}
                  </div>

                  <Link href={`/programmes/${prog.slug}`}>
                    <Button
                      size="sm"
                      variant={prog.isApprovedForEnrolment ? 'default' : 'outline'}
                      className={`text-xs gap-1 font-semibold ${
                        prog.isApprovedForEnrolment
                          ? 'bg-cyan-500 hover:bg-cyan-400 text-black font-bold'
                          : 'border-white/[0.15] text-neutral-300 hover:text-white'
                      }`}
                    >
                      <span>{prog.isApprovedForEnrolment ? 'Explore & Apply' : 'View Syllabus'}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredProgrammes.length === 0 && (
        <div className="text-center py-12 rounded-2xl border border-white/[0.08] bg-black/40 space-y-3">
          <AlertCircle className="h-8 w-8 text-neutral-500 mx-auto" />
          <h4 className="text-base font-bold text-white">No Programme Families Match Your Filter</h4>
          <p className="text-xs text-neutral-400">Try adjusting your search query or selecting &quot;All 20 Programme Families&quot;.</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedCategory('all')
              setSearchQuery('')
              setSelectedStatus('all')
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
