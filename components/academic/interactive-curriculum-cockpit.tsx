'use client'

import React, { useState } from 'react'
import {
  Search,
  BookOpen,
  FlaskConical,
  Award,
  Filter,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  SUBJECT_DEFINITIONS,
  SubjectId,
  MASTER_TIMELINE_STAGES,
  COMPETENCY_NODES,
} from '@/lib/academic/class-9-master-data'

export function InteractiveCurriculumCockpit({
  onEnrolClick,
  onTryLabClick,
}: {
  onEnrolClick?: () => void
  onTryLabClick?: () => void
}) {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter stages based on subject and search query
  const filteredStages = MASTER_TIMELINE_STAGES.map((stage) => {
    const filteredModules = stage.modules.filter((m) => {
      const matchesSubject =
        selectedSubject === 'all' ||
        m.subject.toLowerCase().includes(selectedSubject.toLowerCase())
      const matchesSearch =
        searchQuery.trim() === '' ||
        m.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.practicalLab.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSubject && matchesSearch
    })

    return {
      ...stage,
      modules: filteredModules,
    }
  }).filter((stage) => stage.modules.length > 0)

  return (
    <section className="space-y-8" id="curriculum-cockpit">
      {/* Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-primary/30 text-primary">
          Exhaustive 7-Subject Syllabus Architecture
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Explore the Complete 8-Month Foundation Curriculum
        </h2>
        <p className="text-sm text-muted-foreground">
          Every single module is systematically sequenced from Class 8 prerequisite foundations into rigorous Class 9 mastery and forward NEET/JEE competitive relevance.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto p-3 rounded-2xl bg-muted/40 border border-border">
        {/* Subject Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedSubject === 'all'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/80'
            }`}
          >
            All 7 Subjects
          </button>
          {(Object.keys(SUBJECT_DEFINITIONS) as SubjectId[]).map((sId) => {
            const subj = SUBJECT_DEFINITIONS[sId]
            const isActive = selectedSubject === sId
            return (
              <button
                key={sId}
                onClick={() => setSelectedSubject(sId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/80'
                }`}
              >
                {subj.shortTitle}
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search topics, labs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-background border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* 4 Stages Display */}
      <div className="space-y-6 max-w-5xl mx-auto">
        {filteredStages.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border bg-muted/10 space-y-3">
            <BookOpen className="h-8 w-8 text-muted-foreground mx-auto" />
            <h3 className="font-bold text-foreground">No matching modules found</h3>
            <p className="text-xs text-muted-foreground">
              Try clearing your search query or choosing another subject filter.
            </p>
          </div>
        ) : (
          filteredStages.map((stage) => (
            <div
              key={stage.stageNumber}
              className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5"
            >
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider">
                      Stage {stage.stageNumber} • {stage.monthSpan}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      ({stage.sessionCount} Sessions)
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-foreground mt-1">
                    {stage.themeTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground">{stage.tagline}</p>
                </div>

                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start sm:self-center">
                  ✦ {stage.milestoneAssessment}
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stage.modules.map((m) => (
                  <div
                    key={m.topic}
                    className="p-4 rounded-2xl border bg-muted/20 space-y-3 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                        {m.subject}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-foreground leading-snug">
                      {m.topic}
                    </h4>

                    {/* Practical Lab */}
                    <div className="flex items-start gap-2 text-xs text-muted-foreground bg-background p-2.5 rounded-xl border">
                      <FlaskConical className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Hands-on Lab: </strong>
                        <span>{m.practicalLab}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Curriculum Footer Banner */}
      <div className="max-w-5xl mx-auto p-6 rounded-3xl border border-primary/30 bg-gradient-to-r from-blue-950/20 via-indigo-950/20 to-purple-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-extrabold text-foreground">
            Want to see how this curriculum maps into future NEET & JEE exams?
          </h4>
          <p className="text-xs text-muted-foreground">
            Explore the Living Skill Radar to trace prerequisite links from Class 8 into Class 11 & 12 competitive weightages.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onTryLabClick && (
            <Button
              variant="outline"
              size="sm"
              onClick={onTryLabClick}
              className="text-xs rounded-xl"
            >
              Try Socratic Challenge
            </Button>
          )}
          {onEnrolClick && (
            <Button
              size="sm"
              onClick={onEnrolClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs rounded-xl"
            >
              Enrol in Class 9 Now <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
