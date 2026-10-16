'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Brain,
  Code2,
  Network,
  Sparkles,
  Play,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Loader2,
  Award,
  Layers,
  ChevronRight,
  FileCheck,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function HeroProductDemo() {
  const [activeTab, setActiveTab] = useState<'tutor' | 'project' | 'skillgraph' | 'recommendation'>('tutor')

  // Super AI interactive state
  const [tutorQuery, setTutorQuery] = useState('')
  const [tutorMessages, setTutorMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string; sources?: string[] }>
  >([
    {
      role: 'user',
      content: 'How should I structure the tenant filter in pgvector so vectors are never leaked across users?',
    },
    {
      role: 'assistant',
      content:
        '💡 **Socratic Guidance**:\nIn PostgreSQL pgvector, enforce `WHERE tenant_id = current_tenant` **prior** to the cosine distance `<=>` operator. By filtering at the relational query level with Row Level Security (RLS), the database engine rejects unauthorized rows before calculating vector similarities.\n\nWould you like a progressive hint on the SQL migration syntax or the TypeScript RPC caller?',
      sources: ['Enterprise pgvector Indexing & Performance', 'PostgreSQL RLS Multi-Tenant Architecture'],
    },
  ])
  const [isAiLoading, setIsAiLoading] = useState(false)

  // Project sandbox state
  const [testRunStatus, setTestRunStatus] = useState<'idle' | 'running' | 'passed'>('idle')

  const handleAskDemoTutor = async (promptText?: string) => {
    const q = promptText || tutorQuery.trim()
    if (!q) return

    setTutorMessages((prev) => [...prev, { role: 'user', content: q }])
    setTutorQuery('')
    setIsAiLoading(true)

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          courseContext: 'AI Development & Automation — Module 2 RAG Systems & pgvector',
          mode: 'hint',
          hintStep: 1,
        }),
      })

      const data = await res.json()
      if (res.ok && data.content) {
        setTutorMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.content,
            sources: data.sources?.map((s: any) => s.title),
          },
        ])
      } else {
        setTutorMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              'Super AI is ready to guide you. Focus on system boundaries and test your assumptions in the project sandbox.',
          },
        ])
      }
    } catch {
      setTutorMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Network connection interrupted. Please try asking again.',
        },
      ])
    } finally {
      setIsAiLoading(false)
    }
  }

  const handleRunDemoTests = () => {
    setTestRunStatus('running')
    setTimeout(() => {
      setTestRunStatus('passed')
    }, 900)
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-white/[0.14] bg-neutral-950/90 text-white shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Top Banner: Clearly Labeled Demonstration Mode */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.08] text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-neutral-300">
            DEMONSTRATION MODE: Live Interactive Product Experience
          </span>
          <span className="text-neutral-500 hidden sm:inline">• Sample Track: AI Development & Automation</span>
        </div>
        <div className="text-[11px] text-neutral-400">
          Showing real system surfaces with verified demo state
        </div>
      </div>

      {/* Interactive Navigation Tabs */}
      <div className="flex flex-wrap items-center border-b border-white/[0.08] bg-black/40 px-3 pt-2 gap-1 text-xs">
        <button
          onClick={() => setActiveTab('tutor')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
            activeTab === 'tutor'
              ? 'bg-neutral-900 text-white border-t-2 border-[#0080FF] font-semibold'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Brain className="h-4 w-4 text-[#0080FF]" />
          <span>1. Super AI Tutor</span>
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-white/20 text-neutral-300">
            Live Socratic
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab('project')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
            activeTab === 'project'
              ? 'bg-neutral-900 text-white border-t-2 border-[#0080FF] font-semibold'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Code2 className="h-4 w-4 text-emerald-400" />
          <span>2. Practical Project</span>
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-white/20 text-neutral-300">
            Sandbox
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab('skillgraph')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
            activeTab === 'skillgraph'
              ? 'bg-neutral-900 text-white border-t-2 border-[#0080FF] font-semibold'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Network className="h-4 w-4 text-cyan-400" />
          <span>3. Living Skill Graph</span>
          <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-white/20 text-neutral-300">
            DAG
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab('recommendation')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
            activeTab === 'recommendation'
              ? 'bg-neutral-900 text-white border-t-2 border-[#0080FF] font-semibold'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
          }`}
        >
          <Target className="h-4 w-4 text-amber-400" />
          <span>4. Next-Step Engine</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-4 sm:p-6 bg-neutral-900/60 min-h-[380px] flex flex-col justify-between">
        {/* TAB 1: Super AI Socratic Chat */}
        {activeTab === 'tutor' && (
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {tutorMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#0080FF] text-white'
                        : 'bg-black/60 border border-white/[0.1] text-neutral-200'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/[0.08] text-[10px] text-neutral-400 space-y-0.5">
                        <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[9px]">
                          Curriculum Sources:
                        </span>
                        {msg.sources.map((s, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex items-center gap-2 text-xs text-neutral-400 py-1">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0080FF]" />
                  <span>Super AI is consulting verified curriculum knowledge...</span>
                </div>
              )}
            </div>

            {/* Prompt Chips & Input */}
            <div className="pt-2 border-t border-white/[0.08] space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-neutral-400">Try asking:</span>
                {[
                  'Give me Hint #1 for the chunking task',
                  'Explain HNSW index parameters',
                  'Why does TalentXcel withhold full solutions?',
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskDemoTutor(chip)}
                    className="text-[11px] rounded-full border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-0.5 text-neutral-300 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAskDemoTutor()
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={tutorQuery}
                  onChange={(e) => setTutorQuery(e.target.value)}
                  placeholder="Ask Super AI a question or request a hint..."
                  className="flex-1 rounded-xl border border-white/[0.15] bg-black/60 px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-[#0080FF]"
                  disabled={isAiLoading}
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={isAiLoading || !tutorQuery.trim()}
                  className="bg-[#0080FF] hover:bg-[#0070E0] h-8 px-4 text-xs font-semibold"
                >
                  <Send className="h-3.5 w-3.5 mr-1" />
                  Ask
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: Practical Project Sandbox */}
        {activeTab === 'project' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
              <div>
                <div className="text-xs font-semibold text-emerald-400">Capstone Project 1</div>
                <h4 className="text-sm font-bold text-white">
                  Enterprise Grounded Knowledge Retrieval Engine (pgvector)
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handleRunDemoTests}
                  disabled={testRunStatus === 'running'}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs h-8 gap-1.5"
                >
                  <Play className="h-3.5 w-3.5" />
                  {testRunStatus === 'running' ? 'Running 4 Test Assertions...' : 'Run Sandboxed Tests'}
                </Button>
                <Link href="/projects/rag-engine">
                  <Button variant="outline" size="sm" className="border-white/20 text-white text-xs h-8">
                    Open Full IDE
                  </Button>
                </Link>
              </div>
            </div>

            {/* Code & Assertion Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Code preview */}
              <div className="rounded-xl border border-white/[0.1] bg-black/70 p-3.5 font-mono text-[11px] space-y-1 text-neutral-300 overflow-x-auto">
                <div className="text-neutral-500 pb-1 border-b border-white/[0.08] flex justify-between">
                  <span>solution.ts</span>
                  <span>TypeScript 5.8</span>
                </div>
                <pre className="text-neutral-200">
{`export function matchTenantDocuments(
  chunks: Chunk[],
  queryEmbedding: number[],
  targetTenantId: string,
  threshold = 0.75
): MatchResult[] {
  // Enforce tenant boundary first
  const isolated = chunks.filter(
    (c) => c.tenantId === targetTenantId
  );
  return isolated
    .map(c => ({ chunk: c, similarity: 0.88 }))
    .filter(res => res.similarity >= threshold);
}`}
                </pre>
              </div>

              {/* Test assertions result */}
              <div className="rounded-xl border border-white/[0.1] bg-black/50 p-3.5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-400">
                  <span>ISOLATED SANDBOX RUNNER</span>
                  <span className="font-mono text-emerald-400">
                    {testRunStatus === 'passed' ? '4/4 PASS • 92/100 RUBRIC' : 'READY TO RUN'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  {[
                    'Text chunker preserves 10% overlap without fracturing words',
                    'Multi-tenant security boundary isolates by tenant_id',
                    'Cosine similarity threshold rejects low-confidence matches',
                    'Type safety verified without privileged code evaluation',
                  ].map((assertion, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px]"
                    >
                      {testRunStatus === 'passed' ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <div className="h-3.5 w-3.5 rounded-full border border-neutral-600 shrink-0" />
                      )}
                      <span className={testRunStatus === 'passed' ? 'text-neutral-200' : 'text-neutral-400'}>
                        {assertion}
                      </span>
                    </div>
                  ))}
                </div>

                {testRunStatus === 'passed' && (
                  <div className="pt-2 border-t border-white/[0.08] text-[11px] text-emerald-400 font-semibold flex items-center justify-between">
                    <span>✓ Eligible for Permanent Portfolio Credential</span>
                    <Link href="/verify/TXCERT-2026-DEMO01" className="underline text-white font-normal">
                      Verify Standard →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Living Skill Graph Preview */}
        {activeTab === 'skillgraph' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Living Skill Graph: Prerequisite Chains & Competency States
                </h4>
                <p className="text-xs text-neutral-400">
                  Competencies are confirmed by code assertions and rubric evaluation, not passive clicks.
                </p>
              </div>
              <Badge variant="outline" className="text-xs text-[#0080FF] border-[#0080FF]/30">
                Data-Driven DAG
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { title: 'Python Architecture', status: 'verified', tier: 'Tier 1', desc: '100% quiz • 8/8 tests pass' },
                { title: 'PostgreSQL & RLS', status: 'verified', tier: 'Tier 1', desc: '90% quiz • RLS leakage test pass' },
                { title: 'Vector Embeddings', status: 'demonstrated', tier: 'Tier 2', desc: 'Chunk overlap demonstrated' },
                { title: 'pgvector Optimization', status: 'learning', tier: 'Tier 2', desc: '65% quiz • Diagnostic gap' },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    s.status === 'verified'
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : s.status === 'demonstrated'
                      ? 'border-[#0080FF]/40 bg-[#0080FF]/5'
                      : 'border-amber-500/40 bg-amber-500/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                    <span>{s.tier}</span>
                    <span
                      className={`font-semibold capitalize ${
                        s.status === 'verified'
                          ? 'text-emerald-400'
                          : s.status === 'demonstrated'
                          ? 'text-[#0080FF]'
                          : 'text-amber-400'
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-white mb-1">{s.title}</div>
                  <div className="text-[11px] text-neutral-400">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-xs">
              <span className="text-neutral-400">
                Explore the complete interactive graph with keyboard navigation and accessible table view:
              </span>
              <a href="#skill-graph-section" className="text-[#0080FF] hover:underline font-semibold flex items-center gap-1">
                View Full Graph <ChevronRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 4: Next-Step Recommendation */}
        {activeTab === 'recommendation' && (
          <div className="space-y-4">
            <div className="border-b border-white/[0.08] pb-3">
              <h4 className="text-sm font-bold text-white">Personalized Next-Step Engine</h4>
              <p className="text-xs text-neutral-400">
                AI and assessment data continuously calculate your highest-leverage next action.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[#0080FF]/30 bg-gradient-to-r from-[#0080FF]/10 via-[#0080FF]/5 to-transparent space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs bg-[#0080FF]">
                  Highest Leverage Action
                </Badge>
                <span className="text-xs text-neutral-400">Pacing: On Track for Cohort Milestone</span>
              </div>

              <h3 className="text-base font-bold text-white">
                Complete Task 3 of Enterprise Grounded RAG (Tenant-Isolated Similarity)
              </h3>

              <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                Bridging this task unlocks verified status for your pgvector competency and advances you toward the Capstone 1 milestone credential.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link href="/projects/rag-engine">
                  <Button size="sm" className="bg-[#0080FF] hover:bg-[#0070E0] text-white font-semibold text-xs h-8 gap-1.5">
                    Launch Task 3 <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="border-white/20 text-white text-xs h-8">
                    View Learner Workspace
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar with value propositions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] border-t border-white/[0.08] bg-black/60 text-xs text-neutral-400 text-center py-3">
        <div className="px-4 py-1.5 flex items-center justify-center gap-2">
          <Brain className="h-4 w-4 text-[#0080FF]" />
          <span>Curriculum-grounded AI Tutor</span>
        </div>
        <div className="px-4 py-1.5 flex items-center justify-center gap-2">
          <Code2 className="h-4 w-4 text-emerald-400" />
          <span>Practical capstones with tests</span>
        </div>
        <div className="px-4 py-1.5 flex items-center justify-center gap-2">
          <Award className="h-4 w-4 text-cyan-400" />
          <span>Cryptographically verifiable proof</span>
        </div>
      </div>
    </div>
  )
}
