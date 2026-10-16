'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Brain,
  CheckCircle2,
  Code2,
  Sparkles,
  Lock,
  ArrowRight,
  ChevronRight,
  Layers,
  FileCheck,
  Award,
  AlertCircle,
  Eye,
  List,
  Network,
} from 'lucide-react'
import {
  SkillNode,
  CompetencyStatus,
  AI_DEVELOPMENT_SKILL_GRAPH,
  calculateGraphMetrics,
} from '@/lib/lms/skill-graph-service'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

interface SkillGraphProps {
  skills?: SkillNode[]
  initialSelectedId?: string
  programmeTitle?: string
  programmeSlug?: string
  showProjectLink?: boolean
}

export function SkillGraph({
  skills = AI_DEVELOPMENT_SKILL_GRAPH,
  initialSelectedId = 'skill-pg-vector',
  programmeTitle = 'AI Development & Automation',
  programmeSlug = 'ai-development',
  showProjectLink = true,
}: SkillGraphProps) {
  const [selectedId, setSelectedId] = useState<string>(initialSelectedId)
  const [filter, setFilter] = useState<CompetencyStatus | 'all'>('all')
  const [viewMode, setViewMode] = useState<'graph' | 'accessible'>('graph')
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedSkill = skills.find((s) => s.id === selectedId) || skills[0]
  const metrics = calculateGraphMetrics(skills)

  const filteredSkills = filter === 'all' ? skills : skills.filter((s) => s.status === filter)

  // Keyboard navigation between skill nodes
  const handleKeyDown = (e: React.KeyboardEvent, currentId: string) => {
    const currentIndex = skills.findIndex((s) => s.id === currentId)
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % skills.length
      setSelectedId(skills[nextIndex].id)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = (currentIndex - 1 + skills.length) % skills.length
      setSelectedId(skills[prevIndex].id)
    }
  }

  const getStatusBadge = (status: CompetencyStatus) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified Competency
          </span>
        )
      case 'demonstrated':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-[#0080FF] border border-[#0080FF]/25">
            <Code2 className="h-3.5 w-3.5" />
            Demonstrated in Code
          </span>
        )
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Learning (Skill Gap Identified)
          </span>
        )
      case 'not_started':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-500/10 px-2.5 py-0.5 text-xs font-semibold text-neutral-500 border border-neutral-500/20">
            <Lock className="h-3.5 w-3.5" />
            Not Started
          </span>
        )
    }
  }

  const getTierName = (tier: number) => {
    switch (tier) {
      case 1:
        return 'Tier 1: Foundations'
      case 2:
        return 'Tier 2: Vector & Data Systems'
      case 3:
        return 'Tier 3: Supervised AI Agents'
      case 4:
        return 'Tier 4: Production CI/CD'
      default:
        return `Tier ${tier}`
    }
  }

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* Top Controls & Metrics Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl border bg-card/60 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
              Living Skill Graph
            </Badge>
            <span className="text-xs text-muted-foreground">{programmeTitle}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-foreground mt-1">
            Dynamic Competency & Prerequisite Map
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Skills are earned through runnable test suites and rubric verification — never solely through passive video views.
          </p>
        </div>

        {/* View Toggle & Metrics */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl border">
            <button
              onClick={() => setViewMode('graph')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'graph'
                  ? 'bg-background text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="View as interactive graph"
            >
              <Network className="h-3.5 w-3.5" />
              Graph
            </button>
            <button
              onClick={() => setViewMode('accessible')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'accessible'
                  ? 'bg-background text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label="View as accessible table"
            >
              <List className="h-3.5 w-3.5" />
              Accessible Table
            </button>
          </div>

          <div className="flex items-center gap-3 border-l pl-3 text-xs">
            <div>
              <span className="text-muted-foreground">Mastery: </span>
              <span className="font-bold text-[#0080FF]">{metrics.masteryPercentage}%</span>
            </div>
            <div>
              <span className="text-muted-foreground">Verified: </span>
              <span className="font-bold text-emerald-600">{metrics.verified}/{metrics.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter skills by status">
        {(['all', 'verified', 'demonstrated', 'learning', 'not_started'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === status
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border'
            }`}
            role="tab"
            aria-selected={filter === status}
          >
            {status === 'all'
              ? `All Competencies (${skills.length})`
              : status === 'verified'
              ? `Verified (${metrics.verified})`
              : status === 'demonstrated'
              ? `Demonstrated (${metrics.demonstrated})`
              : status === 'learning'
              ? `In Progress (${metrics.learning})`
              : `Not Started (${metrics.notStarted})`}
          </button>
        ))}
      </div>

      {/* View Mode 1: Interactive DAG / Tier Node Graph */}
      {viewMode === 'graph' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Visual Graph Canvas */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl border bg-muted/20">
              <div className="text-xs font-semibold text-muted-foreground mb-3 flex items-center justify-between">
                <span>Navigate skill progression tiers (Use arrow keys to jump):</span>
                <span className="text-[11px] text-primary">Click any node to inspect criteria</span>
              </div>

              {/* Tier groups */}
              <div className="space-y-4" role="tree" aria-label="Skill hierarchy">
                {[1, 2, 3, 4].map((tierNum) => {
                  const tierSkills = filteredSkills.filter((s) => s.tier === tierNum)
                  if (tierSkills.length === 0) return null

                  return (
                    <div key={tierNum} className="space-y-2">
                      <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                        {getTierName(tierNum)}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {tierSkills.map((skill) => {
                          const isSelected = skill.id === selectedId
                          return (
                            <button
                              key={skill.id}
                              onClick={() => setSelectedId(skill.id)}
                              onKeyDown={(e) => handleKeyDown(e, skill.id)}
                              className={`text-left p-3.5 rounded-xl border transition-all relative group ${
                                isSelected
                                  ? 'border-[#0080FF] ring-2 ring-[#0080FF]/25 bg-background shadow-md'
                                  : 'border-border/60 bg-card hover:border-foreground/30 hover:shadow-xs'
                              }`}
                              role="treeitem"
                              aria-selected={isSelected}
                              tabIndex={isSelected ? 0 : -1}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <span className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                  {skill.title}
                                </span>
                                {skill.status === 'verified' && (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                )}
                                {skill.status === 'demonstrated' && (
                                  <Code2 className="h-4 w-4 text-[#0080FF] shrink-0" />
                                )}
                                {skill.status === 'learning' && (
                                  <Sparkles className="h-4 w-4 text-amber-500 shrink-0 animate-pulse" />
                                )}
                                {skill.status === 'not_started' && (
                                  <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                                )}
                              </div>

                              <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                                {skill.description}
                              </p>

                              <div className="flex items-center justify-between text-[10px]">
                                <span className="text-muted-foreground">{skill.category}</span>
                                {getStatusBadge(skill.status)}
                              </div>

                              {/* Prerequisite line notice if selected */}
                              {skill.prerequisites.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-border/30 text-[10px] text-muted-foreground flex items-center gap-1">
                                  <span>Prereq:</span>
                                  <span className="font-mono text-[9px] text-foreground">
                                    {skill.prerequisites.map((p) => p.replace('skill-', '')).join(', ')}
                                  </span>
                                </div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Inspection Drawer Panel for Selected Node */}
          <div className="lg:col-span-5">
            <Card className="border shadow-md sticky top-24">
              <CardHeader className="pb-3 border-b bg-muted/20">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {selectedSkill.category}
                  </Badge>
                  {getStatusBadge(selectedSkill.status)}
                </div>
                <CardTitle className="text-lg font-bold text-foreground">
                  {selectedSkill.title}
                </CardTitle>
                <div className="text-xs text-muted-foreground">
                  {getTierName(selectedSkill.tier)}
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1">
                    Competency Description
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedSkill.description}
                  </p>
                </div>

                {/* Defined Verification Criteria */}
                <div className="rounded-xl border bg-muted/30 p-3.5 space-y-2 text-xs">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <FileCheck className="h-4 w-4 text-primary" />
                    Defined Verification Criteria
                  </div>
                  <div className="space-y-1 text-muted-foreground text-[11px]">
                    <p>
                      <strong className="text-foreground">Quiz Requirement:</strong>{' '}
                      {selectedSkill.verificationCriteria.quizRequirement} (Min {selectedSkill.verificationCriteria.minPassingScore}%)
                    </p>
                    <p>
                      <strong className="text-foreground">Project Requirement:</strong>{' '}
                      {selectedSkill.verificationCriteria.projectRequirement}
                    </p>
                  </div>
                </div>

                {/* Actual Assessment Evidence */}
                {selectedSkill.evidence && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5 space-y-2 text-xs">
                    <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <Award className="h-4 w-4" />
                      Recorded Assessment Evidence
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {selectedSkill.evidence.quizScore !== undefined && (
                        <div>
                          <span className="text-muted-foreground">Quiz Score: </span>
                          <span className="font-bold text-foreground">{selectedSkill.evidence.quizScore}%</span>
                        </div>
                      )}
                      {selectedSkill.evidence.testsPassed !== undefined && (
                        <div>
                          <span className="text-muted-foreground">Test Suite: </span>
                          <span className="font-bold text-foreground">
                            {selectedSkill.evidence.testsPassed}/{selectedSkill.evidence.totalTests} Passed
                          </span>
                        </div>
                      )}
                      {selectedSkill.evidence.rubricScore !== undefined && (
                        <div>
                          <span className="text-muted-foreground">Rubric Score: </span>
                          <span className="font-bold text-foreground">{selectedSkill.evidence.rubricScore}/100</span>
                        </div>
                      )}
                      {selectedSkill.evidence.credentialNumber && (
                        <div>
                          <span className="text-muted-foreground">Credential: </span>
                          <Link
                            href={`/verify/${selectedSkill.evidence.credentialNumber}`}
                            className="font-mono text-primary underline"
                          >
                            {selectedSkill.evidence.credentialNumber}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Prerequisites status */}
                <div>
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Prerequisite Relationships
                  </h4>
                  {selectedSkill.prerequisites.length === 0 ? (
                    <span className="text-xs text-muted-foreground">
                      Foundational skill. No prior prerequisites required.
                    </span>
                  ) : (
                    <div className="space-y-1">
                      {selectedSkill.prerequisites.map((prereqId) => {
                        const prereq = skills.find((s) => s.id === prereqId)
                        const isSatisfied = prereq?.status === 'verified' || prereq?.status === 'demonstrated'
                        return (
                          <div
                            key={prereqId}
                            className="flex items-center justify-between text-xs p-2 rounded-lg bg-muted/30 border"
                          >
                            <span className="text-foreground">{prereq?.title || prereqId}</span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                isSatisfied
                                  ? 'bg-emerald-500/10 text-emerald-600'
                                  : 'bg-amber-500/10 text-amber-600'
                              }`}
                            >
                              {isSatisfied ? 'Satisfied' : 'Pending'}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Recommended Next Step */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 space-y-2">
                  <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    Intelligent Next Step
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">
                    {selectedSkill.nextRecommendedStep}
                  </p>

                  <div className="pt-2 flex flex-col gap-2">
                    {showProjectLink && (
                      <Link href={`/projects/rag-engine`}>
                        <Button size="sm" className="w-full gap-1.5 text-xs">
                          Continue Guided Project <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    )}
                    <Link href={`/courses/${programmeSlug}`}>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Review Relevant Lesson
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* View Mode 2: Accessible Structured Table View */
        <div className="rounded-2xl border bg-card overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <caption className="sr-only">
                Structured accessible table of skills, prerequisite relationships, and verified status
              </caption>
              <thead>
                <tr className="border-b bg-muted/50 text-muted-foreground font-semibold">
                  <th scope="col" className="p-4">Skill Title & Category</th>
                  <th scope="col" className="p-4">Tier</th>
                  <th scope="col" className="p-4">Prerequisites</th>
                  <th scope="col" className="p-4">Competency Status</th>
                  <th scope="col" className="p-4">Assessment Evidence</th>
                  <th scope="col" className="p-4">Recommended Next Step</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredSkills.map((skill) => (
                  <tr
                    key={skill.id}
                    className={`hover:bg-muted/30 transition-colors ${
                      skill.id === selectedId ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-bold text-foreground text-sm">{skill.title}</div>
                      <div className="text-muted-foreground mt-0.5">{skill.category}</div>
                      <div className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                        {skill.description}
                      </div>
                    </td>
                    <td className="p-4 font-mono font-medium">{skill.tier}</td>
                    <td className="p-4">
                      {skill.prerequisites.length === 0 ? (
                        <span className="text-muted-foreground italic">None (Foundation)</span>
                      ) : (
                        <ul className="space-y-1 list-disc list-inside">
                          {skill.prerequisites.map((p) => {
                            const found = skills.find((s) => s.id === p)
                            return <li key={p}>{found?.title || p}</li>
                          })}
                        </ul>
                      )}
                    </td>
                    <td className="p-4">{getStatusBadge(skill.status)}</td>
                    <td className="p-4">
                      {skill.evidence ? (
                        <div className="space-y-1">
                          {skill.evidence.quizScore !== undefined && (
                            <div>Quiz: {skill.evidence.quizScore}%</div>
                          )}
                          {skill.evidence.testsPassed !== undefined && (
                            <div>Tests: {skill.evidence.testsPassed}/{skill.evidence.totalTests} pass</div>
                          )}
                          {skill.evidence.rubricScore !== undefined && (
                            <div>Rubric: {skill.evidence.rubricScore}/100</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground italic">No evidence recorded</span>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="mb-2 leading-relaxed">{skill.nextRecommendedStep}</p>
                      <Link href={`/projects/rag-engine`}>
                        <Button variant="outline" size="sm" className="text-xs h-7">
                          Open Project
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
