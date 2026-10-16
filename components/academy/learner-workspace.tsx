'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Brain,
  Sparkles,
  Play,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  FileCheck,
  Award,
  Code2,
  Download,
  Briefcase,
  Send,
  Loader2,
  ExternalLink,
  Target,
  Flame,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SkillGraph } from '@/components/academy/skill-graph'
import { getOfflineLesson } from '@/lib/offline/indexed-db'

interface LearnerWorkspaceProps {
  user: {
    id: string
    email?: string
    displayName?: string
  }
  enrolments?: unknown[]
  isInitialEmpty?: boolean
}

export function LearnerWorkspace({
  user,
  enrolments = [],
  isInitialEmpty = false,
}: LearnerWorkspaceProps) {
  // Demo mode toggle so new users can explore a populated workspace
  const [isDemoMode, setIsDemoMode] = useState<boolean>(isInitialEmpty || enrolments.length === 0)
  const [learningGoal, setLearningGoal] = useState<string>(
    'Deploy Multi-Tenant RAG Engine & Complete pgvector Verification'
  )
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false)
  const [aiQuestion, setAiQuestion] = useState<string>('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [aiSources, setAiSources] = useState<Array<{ title: string; category: string }>>([])
  const [aiLoading, setAiLoading] = useState<boolean>(false)
  const [offlineLessonsCount, setOfflineLessonsCount] = useState<number>(0)
  const [onboardingDismissed, setOnboardingDismissed] = useState<boolean>(false)

  // Check offline lessons
  useEffect(() => {
    let count = 0
    const checkLessons = async () => {
      const l1 = await getOfflineLesson('les-101')
      const l2 = await getOfflineLesson('les-102')
      if (l1) count++
      if (l2) count++
      setOfflineLessonsCount(count)
    }
    checkLessons()
  }, [])

  const handleAskAI = async (customPrompt?: string) => {
    const query = customPrompt || aiQuestion.trim()
    if (!query) return

    setAiLoading(true)
    setAiResponse(null)
    setAiSources([])

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          courseContext: 'AI Development & Automation — Module 2 RAG & pgvector',
          mode: 'hint',
          hintStep: 1,
        }),
      })

      const data = await res.json()
      if (res.ok && data.content) {
        setAiResponse(data.content)
        if (data.sources) setAiSources(data.sources)
      } else {
        setAiResponse('I am ready to help. Please ask your question regarding the curriculum.')
      }
    } catch {
      setAiResponse('Unable to connect to AI server. Please check your network connection.')
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Demo Mode Toggle & Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border bg-muted/30 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-foreground">
            {isDemoMode ? 'Demonstration Workspace Active' : 'Live Personal Workspace'}
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            • Data grounded on AI Development & Automation Track
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDemoMode(!isDemoMode)}
            className="text-xs h-7"
          >
            {isDemoMode ? 'Switch to My Empty Profile' : 'Load Complete Demo Data'}
          </Button>
          <Link href="/programmes/ai-development">
            <Button variant="ghost" size="sm" className="text-xs h-7">
              View Syllabus
            </Button>
          </Link>
        </div>
      </div>

      {/* First-Run Onboarding Banner (if no previous progress or dismissed) */}
      {!onboardingDismissed && (
        <Card className="border border-[#0080FF]/30 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent shadow-xs">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs bg-[#0080FF]">
                    Personalized Onboarding
                  </Badge>
                  <span className="text-xs font-semibold text-foreground">3-Step Accelerator</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Welcome, {user.displayName || user.email?.split('@')[0]}! Let&apos;s personalize your learning plan.
                </h3>
                <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">
                  TalentXcel tracks demonstrable engineering competencies. Take our 5-minute diagnostic to identify skill gaps, calibrate Super AI hint pacing, and set your weekly capstone schedule.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <Link href="/projects/rag-engine">
                  <Button size="sm" className="gap-1.5 text-xs bg-[#0080FF] hover:bg-[#0070E0]">
                    <Target className="h-3.5 w-3.5" />
                    Launch Diagnostic Project
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOnboardingDismissed(true)}
                  className="text-xs text-muted-foreground"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hero Welcome & Current Objective */}
      <div className="p-6 sm:p-8 rounded-3xl border bg-card shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <span>Track:</span>
              <span className="font-semibold text-foreground">AI Development & Automation (Cohort 2026)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Hello, {user.displayName || user.email?.split('@')[0]}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/60 border text-xs">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="font-semibold text-foreground">4 Day Study Streak</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted/60 border text-xs">
              <Download className="h-4 w-4 text-primary" />
              <span>{offlineLessonsCount > 0 ? `${offlineLessonsCount} Lessons Offline` : 'Offline Cache Ready'}</span>
            </div>
          </div>
        </div>

        {/* Current Objective Banner */}
        <div className="p-4 rounded-2xl border bg-primary/5 border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold text-primary uppercase tracking-wider">
                Current Learning Objective
              </div>
              {isEditingGoal ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={learningGoal}
                    onChange={(e) => setLearningGoal(e.target.value)}
                    className="text-sm font-semibold rounded-lg border bg-background px-3 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-96"
                  />
                  <Button size="sm" onClick={() => setIsEditingGoal(false)} className="text-xs h-7">
                    Save
                  </Button>
                </div>
              ) : (
                <h2 className="text-base font-bold text-foreground mt-0.5">{learningGoal}</h2>
              )}
            </div>
          </div>

          {!isEditingGoal && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingGoal(true)}
              className="text-xs h-8 shrink-0 self-start sm:self-auto"
            >
              Adjust Goal
            </Button>
          )}
        </div>

        {/* High Priority: Today's Recommended Learning Action */}
        <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-[10px] bg-emerald-600">
                Recommended Action for Today
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> ~25 mins required
              </span>
            </div>
            <h3 className="text-base font-bold text-foreground">
              Continue Task 3: Multi-Tenant Security & Cosine Similarity Filtering
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
              Your recent diagnostic identified a gap in pgvector distance thresholds. Implement tenant filtering on `knowledge_chunks` before running similarity search.
            </p>
          </div>

          <Link href="/projects/rag-engine">
            <Button size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 shadow-xs shrink-0">
              <Play className="h-3.5 w-3.5" />
              Resume Task 3
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid: Active Project & Super AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Project Card */}
        <div className="lg:col-span-7">
          <Card className="border shadow-xs h-full flex flex-col justify-between">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    In Progress Project
                  </Badge>
                  <span className="text-xs font-semibold text-primary">Active Sandbox</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Task 2 of 5 Complete
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-foreground mt-2">
                Enterprise Grounded Knowledge Retrieval Engine (pgvector)
              </CardTitle>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Build a production multi-tenant RAG retrieval engine with HNSW indexing, chunking, and tenant isolation.
              </p>
            </CardHeader>

            <CardContent className="p-6 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-muted-foreground">Milestone Progress</span>
                    <span className="text-foreground font-bold">40% Complete</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-primary transition-all duration-500"
                      style={{ width: '40%' }}
                    />
                  </div>
                </div>

                {/* Task Checklist preview */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="line-through text-muted-foreground">Task 1: Database Schema & HNSW Indexing</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="line-through text-muted-foreground">Task 2: Text Chunking with Overlap & Metadata</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center text-[10px]">
                      3
                    </div>
                    <span>Task 3: Multi-Tenant Security & Similarity Search</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">
                  Automated sandbox test runner ready
                </span>
                <Link href="/projects/rag-engine">
                  <Button size="sm" className="w-full sm:w-auto gap-1.5 text-xs">
                    Continue Project Workspace <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Embedded Super AI Quick Assistant */}
        <div className="lg:col-span-5">
          <Card className="border shadow-xs h-full flex flex-col justify-between">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Brain className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-base font-bold text-foreground">
                    Ask Super AI Tutor
                  </CardTitle>
                </div>
                <Badge variant="default" className="text-[10px] bg-emerald-600">
                  Grounded
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Context-aware Socratic assistance for your current project & lessons.
              </p>
            </CardHeader>

            <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              {/* AI Output preview */}
              <div className="flex-1 min-h-[140px] max-h-[220px] overflow-y-auto p-3 rounded-xl border bg-muted/30 text-xs leading-relaxed space-y-2">
                {aiLoading ? (
                  <div className="flex items-center gap-2 text-muted-foreground h-full justify-center">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span>Super AI is consulting curriculum...</span>
                  </div>
                ) : aiResponse ? (
                  <div>
                    <p className="whitespace-pre-wrap text-foreground">{aiResponse}</p>
                    {aiSources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-border/40 text-[10px] text-muted-foreground">
                        <strong>Source:</strong> {aiSources.map((s) => s.title).join(', ')}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-center py-6 space-y-2">
                    <Sparkles className="h-6 w-6 mx-auto text-primary/40" />
                    <p>Ask a question or pick a prompt below to receive progressive Socratic hints.</p>
                  </div>
                )}
              </div>

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Why does tenant_id filter come before cosine sort?',
                  'What is the difference between HNSW and IVFFlat?',
                  'How to test 10% chunk overlap?',
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskAI(chip)}
                    className="text-[10px] rounded-full border bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground px-2.5 py-1 text-left transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Prompt Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAskAI()
                }}
                className="flex items-center gap-2 pt-2 border-t"
              >
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask Super AI about your current task..."
                  className="flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  disabled={aiLoading}
                />
                <Button type="submit" size="sm" disabled={aiLoading || !aiQuestion.trim()} className="h-8">
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Grid: Skill Gaps & Milestone Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Skill Gaps Supported by Actual Assessment */}
        <div className="lg:col-span-6">
          <Card className="border shadow-xs">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Identified Skill Gaps (From Assessment)
                </CardTitle>
                <Badge variant="outline" className="text-xs text-amber-600 border-amber-500/30">
                  Diagnostic Grounded
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Gaps discovered during Module 2 diagnostics and automated code reviews.
              </p>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">PostgreSQL pgvector Optimization</span>
                  <span className="font-mono text-amber-600 font-semibold">Quiz Score: 65%</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Diagnostic question on HNSW construction parameters (`m` and `ef_construction`) was missed.
                </p>
                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground">Lesson 2.1 covers this concept</span>
                  <Link href="/courses/ai-development/lessons/les-201">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Review Lesson 2.1 →
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">Multi-Tenant RLS Policy Edge Cases</span>
                  <span className="font-mono text-[#0080FF] font-semibold">In Progress</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Verify that queries without active user JWTs fail closed with 0 returned rows.
                </p>
                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground">Covered in Project Task 3</span>
                  <Link href="/projects/rag-engine">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Test in Sandbox →
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestone & Evidence of Progress */}
        <div className="lg:col-span-6">
          <Card className="border shadow-xs">
            <CardHeader className="pb-3 border-b bg-muted/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
                  <Award className="h-4 w-4 text-emerald-500" />
                  Milestone & Evidence of Progress
                </CardTitle>
                <Badge variant="default" className="text-xs bg-emerald-600">
                  Milestone 2 Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                All evidence is authenticated via unit test executions and rubric scores.
              </p>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border bg-muted/20 space-y-1">
                  <div className="text-muted-foreground">Clean Architecture</div>
                  <div className="text-base font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Verified
                  </div>
                  <div className="text-[10px] text-muted-foreground">100% quiz • 8/8 tests</div>
                </div>

                <div className="p-3 rounded-xl border bg-muted/20 space-y-1">
                  <div className="text-muted-foreground">PostgreSQL & RLS</div>
                  <div className="text-base font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Verified
                  </div>
                  <div className="text-[10px] text-muted-foreground">90% quiz • 6/6 tests</div>
                </div>

                <div className="p-3 rounded-xl border bg-muted/20 space-y-1">
                  <div className="text-muted-foreground">Vector Embeddings</div>
                  <div className="text-base font-bold text-[#0080FF] flex items-center gap-1">
                    <Code2 className="h-4 w-4" /> Demonstrated
                  </div>
                  <div className="text-[10px] text-muted-foreground">85% quiz • 5/5 tests</div>
                </div>

                <div className="p-3 rounded-xl border bg-muted/20 space-y-1">
                  <div className="text-muted-foreground">pgvector & RAG</div>
                  <div className="text-base font-bold text-amber-600 flex items-center gap-1">
                    <Sparkles className="h-4 w-4" /> In Progress
                  </div>
                  <div className="text-[10px] text-muted-foreground">Task 3/5 in sandbox</div>
                </div>
              </div>

              <div className="pt-2 border-t flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Permanent Credential:</span>
                <Link
                  href="/verify/TXCERT-2026-DEMO01"
                  className="font-mono text-primary underline font-medium flex items-center gap-1"
                >
                  TXCERT-2026-DEMO01 <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Living Skill Graph Section in Workspace */}
      <div className="p-6 sm:p-8 rounded-3xl border bg-card shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[#0080FF] border-[#0080FF]/30">
              Interactive Competency Map
            </Badge>
            <span className="text-xs text-muted-foreground">Updated live from assessment results</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Your Living Skill Graph
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Click any skill node to inspect prerequisite chains, quiz evidence, and next recommended actions.
          </p>
        </div>

        <SkillGraph programmeSlug="ai-development" initialSelectedId="skill-pg-vector" />
      </div>

      {/* Grid: Deadlines, Feedback, Portfolio & Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Deadlines & Pacing */}
        <Card className="border shadow-xs">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Upcoming Deadlines & Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            <div className="p-2.5 rounded-xl border bg-muted/20 space-y-1">
              <div className="flex justify-between font-semibold text-foreground">
                <span>Capstone 1 Draft Code</span>
                <span className="text-primary font-mono">In 6 Days</span>
              </div>
              <p className="text-muted-foreground text-[11px]">Submit candidate solution for mentor review</p>
            </div>

            <div className="p-2.5 rounded-xl border bg-muted/20 space-y-1">
              <div className="flex justify-between font-semibold text-foreground">
                <span>Mentor Live Office Hours</span>
                <span className="text-emerald-600 font-mono">Thursday 6 PM IST</span>
              </div>
              <p className="text-muted-foreground text-[11px]">System architecture & pgvector benchmarking Q&A</p>
            </div>

            <div className="p-2.5 rounded-xl border bg-muted/20 space-y-1">
              <div className="flex justify-between font-semibold text-foreground">
                <span>Module 3 Agent Guardrails</span>
                <span className="text-muted-foreground font-mono">Unlocks Nov 1</span>
              </div>
              <p className="text-muted-foreground text-[11px]">Requires passing Capstone 1 with 80%+</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Feedback & Mentor Notes */}
        <Card className="border shadow-xs">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-primary" />
              Recent Rubric Evaluation Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs leading-relaxed">
            <div className="p-3 rounded-xl border bg-muted/20 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Chunking Function (Task 2)</span>
                <Badge variant="default" className="text-[10px] bg-emerald-600">
                  92/100
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px]">
                &quot;Solid sliding window implementation with boundary preservation. Make sure chunk size is configurable via environment settings.&quot;
              </p>
              <div className="text-[10px] text-muted-foreground pt-1 border-t">
                Evaluator: Super AI Mentor • 2 days ago
              </div>
            </div>

            <div className="p-3 rounded-xl border bg-muted/20 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">RLS Policy Penetration Check</span>
                <Badge variant="default" className="text-[10px] bg-emerald-600">
                  Passed
                </Badge>
              </div>
              <p className="text-muted-foreground text-[11px]">
                &quot;Zero cross-tenant data leakage observed across 100 simulated test queries.&quot;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Career & Business Opportunities */}
        <Card className="border shadow-xs">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <CardTitle className="text-sm font-bold text-foreground flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Verified Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            <div className="p-2.5 rounded-xl border bg-muted/20 space-y-1">
              <div className="flex justify-between font-semibold text-foreground">
                <span>Verified Talent Registry</span>
                <Badge variant="secondary" className="text-[10px]">Unlocks at 80%</Badge>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Publish your verified portfolio to our employer registry for AI engineer screening.
              </p>
            </div>

            <div className="p-2.5 rounded-xl border bg-muted/20 space-y-1">
              <div className="flex justify-between font-semibold text-foreground">
                <span>Open Source AI Benchmark</span>
                <Badge variant="outline" className="text-[10px] text-primary">Open</Badge>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Collaborative test suite benchmarking local LLM tool calling latency.
              </p>
            </div>

            <div className="p-2.5 rounded-xl border bg-muted/20 space-y-1">
              <div className="flex justify-between font-semibold text-foreground">
                <span>MSME Digitization Challenge</span>
                <Badge variant="outline" className="text-[10px] text-amber-600">Optional</Badge>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Build a real digital storefront and payment webhook integration for a small business.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
