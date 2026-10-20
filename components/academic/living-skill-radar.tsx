'use client'

import React, { useState } from 'react'
import {
  Sparkles,
  GitFork,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  Award,
  ChevronRight,
  Filter,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  COMPETENCY_NODES,
  CompetencyNode,
  CompetencyStatus,
  SubjectId,
  SUBJECT_DEFINITIONS,
} from '@/lib/academic/class-9-master-data'

export function LivingSkillRadar({
  onEnrolClick,
}: {
  onEnrolClick?: () => void
}) {
  const [selectedNode, setSelectedNode] = useState<CompetencyNode>(COMPETENCY_NODES[0])
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>('all')
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')

  const filteredNodes = COMPETENCY_NODES.filter(
    (n) => subjectFilter === 'all' || n.subjectId === subjectFilter
  )

  const getStatusBadge = (status: CompetencyStatus) => {
    switch (status) {
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-3 w-3" /> Verified Mastery
          </span>
        )
      case 'demonstrated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">
            <CheckCircle2 className="h-3 w-3" /> Demonstrated
          </span>
        )
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Clock className="h-3 w-3" /> Under Learning
          </span>
        )
      case 'prerequisite_gap':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
            <AlertCircle className="h-3 w-3" /> Prerequisite Gap
          </span>
        )
    }
  }

  return (
    <section className="space-y-8" id="living-skill-matrix">
      {/* Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <Badge variant="outline" className="border-primary/30 text-primary">
          Living Competency Matrix
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Trace Every Skill from Class 8 to NEET & JEE 2029
        </h2>
        <p className="text-sm text-muted-foreground">
          Never study in the dark. See how each Class 9 concept builds upon Class 8 prerequisites and directly anchors future competitive exam weightages.
        </p>
      </div>

      {/* Filter and View Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto p-2 rounded-2xl bg-muted/40 border">
        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSubjectFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subjectFilter === 'all'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Subjects ({COMPETENCY_NODES.length})
          </button>
          {['physics', 'chemistry', 'biology', 'mathematics'].map((sId) => (
            <button
              key={sId}
              onClick={() => setSubjectFilter(sId as SubjectId)}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                subjectFilter === sId
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {sId}
            </button>
          ))}
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 border rounded-xl p-1 bg-background text-xs font-semibold">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'cards' ? 'bg-muted text-foreground' : 'text-muted-foreground'
            }`}
          >
            Interactive Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'table' ? 'bg-muted text-foreground' : 'text-muted-foreground'
            }`}
          >
            Accessible Table
          </button>
        </div>
      </div>

      {/* Main Dual Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto items-start">
          {/* Left Column: Skill Nodes Grid (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id
              const subj = SUBJECT_DEFINITIONS[node.subjectId]

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md'
                      : 'border-border bg-card hover:border-primary/40 hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-muted-foreground">
                        {node.code}
                      </span>
                      <span className="text-xs font-semibold text-primary">
                        • {node.unit}
                      </span>
                    </div>
                    {getStatusBadge(node.status)}
                  </div>

                  <h4 className="font-bold text-sm text-foreground">
                    {node.title}
                  </h4>

                  {/* Progress Meter Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Evidence: {node.evidenceCount} assessments</span>
                      <span className="font-bold text-foreground font-mono">{node.masteryScore}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          node.status === 'mastered'
                            ? 'bg-emerald-500'
                            : node.status === 'demonstrated'
                            ? 'bg-sky-500'
                            : node.status === 'learning'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${node.masteryScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Deep-Dive Competency Inspector (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-primary/30 bg-card p-6 shadow-xl space-y-5 sticky top-20">
            <div className="space-y-1 border-b pb-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-primary">
                  {selectedNode.code}
                </span>
                {getStatusBadge(selectedNode.status)}
              </div>
              <h3 className="text-lg font-black text-foreground">
                {selectedNode.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                Unit: {selectedNode.unit} • Subject: {SUBJECT_DEFINITIONS[selectedNode.subjectId].name}
              </p>
            </div>

            {/* 3-Step Journey Linkages */}
            <div className="space-y-4">
              {/* 1. Class 8 Prerequisite */}
              <div className="p-3.5 rounded-2xl bg-muted/40 border space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground block flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Step 1: Class 8 Prerequisite Foundation
                </span>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  {selectedNode.class8Prerequisite}
                </p>
              </div>

              {/* 2. Class 9 Goal */}
              <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary block flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Step 2: Class 9 Mastery Goal
                </span>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  {selectedNode.class9Goal}
                </p>
              </div>

              {/* 3. NEET/JEE Forward Link */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400 block flex items-center gap-1.5">
                  <Award className="h-3 w-3 text-amber-500" />
                  Step 3: NEET / JEE 2029 Competitive Bridge
                </span>
                <p className="text-xs text-foreground font-medium leading-relaxed">
                  {selectedNode.neetJeeConnection}
                </p>
              </div>
            </div>

            {onEnrolClick && (
              <Button
                onClick={onEnrolClick}
                className="w-full font-bold text-xs bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-10 gap-1.5"
              >
                Start Learning This Pathway <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        /* Accessible Table View */
        <div className="max-w-5xl mx-auto rounded-2xl border overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-muted text-muted-foreground uppercase text-[10px] font-bold border-b">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Subject & Unit</th>
                <th className="p-3">Skill Title</th>
                <th className="p-3">Class 8 Prerequisite</th>
                <th className="p-3">Class 9 Target</th>
                <th className="p-3">NEET / JEE Connection</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-foreground">
              {filteredNodes.map((n) => (
                <tr key={n.id} className="hover:bg-muted/30">
                  <td className="p-3 font-mono font-bold">{n.code}</td>
                  <td className="p-3 text-muted-foreground">{n.unit}</td>
                  <td className="p-3 font-semibold">{n.title}</td>
                  <td className="p-3 text-muted-foreground">{n.class8Prerequisite}</td>
                  <td className="p-3">{n.class9Goal}</td>
                  <td className="p-3 text-amber-600 dark:text-amber-400 font-medium">{n.neetJeeConnection}</td>
                  <td className="p-3">{getStatusBadge(n.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
