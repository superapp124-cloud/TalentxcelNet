'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  Award,
  Bookmark,
  BookOpen,
  CheckCircle2,
  Compass,
  FileText,
  Flame,
  Lock,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trash2,
} from 'lucide-react'
import { toast } from 'sonner'
import { trackEvent } from '@/lib/analytics/client-tracker'
import type {
  LearnerBookmark,
  LearnerRevisionNote,
  LearnerWorkspaceData,
} from '@/lib/dashboard/learner-intelligence'

interface LearnerIntelligencePanelProps {
  workspace: LearnerWorkspaceData
  variant: 'free' | 'paid'
}

export function LearnerIntelligencePanel({
  workspace,
  variant,
}: LearnerIntelligencePanelProps) {
  const [bookmarks, setBookmarks] = useState<LearnerBookmark[]>(workspace.bookmarks)
  const [notes, setNotes] = useState<LearnerRevisionNote[]>(workspace.revisionNotes)
  const [prefs, setPrefs] = useState(workspace.preferences)
  const [editingPrefs, setEditingPrefs] = useState(false)
  const [savingPrefs, setSavingPrefs] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [addingNote, setAddingNote] = useState(false)

  const dailyTarget = prefs.dailyTargetQuestions || 10
  const todayCount = workspace.measuredStats.todayQuestionsAttempted
  const dailyPct = Math.min(100, Math.round((todayCount / dailyTarget) * 100))
  const weeklyPct = Math.min(
    100,
    Math.round((workspace.measuredStats.weeklyMinutesLogged / (prefs.weeklyGoalMinutes || 180)) * 100)
  )

  async function handleSavePreferences() {
    setSavingPrefs(true)
    try {
      const res = await fetch('/api/dashboard/workspace', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classNumber: prefs.classNumber,
          boardCode: prefs.boardCode,
          examTarget: prefs.examTarget,
          weeklyGoalMinutes: prefs.weeklyGoalMinutes,
          dailyTargetQuestions: prefs.dailyTargetQuestions,
          onboardingCompleted: true,
        }),
      })
      if (!res.ok) throw new Error('Failed to save preferences')
      setEditingPrefs(false)
      toast.success('Study preferences updated')
    } catch {
      toast.error('Could not save preferences')
    } finally {
      setSavingPrefs(false)
    }
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault()
    if (!noteTitle.trim() || !noteContent.trim()) return
    setAddingNote(true)
    try {
      const res = await fetch('/api/dashboard/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: noteTitle.trim(),
          content: noteContent.trim(),
          subjectCode: prefs.subjects[0] ?? null,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.note) throw new Error('Failed to save note')
      setNotes((prev) => [json.note, ...prev])
      setNoteTitle('')
      setNoteContent('')
      trackEvent('revision_note_create', { subject: prefs.subjects[0] ?? 'general' })
      toast.success('Revision note saved')
    } catch {
      toast.error('Could not save revision note')
    } finally {
      setAddingNote(false)
    }
  }

  async function handleDeleteNote(id: string) {
    try {
      const res = await fetch(`/api/dashboard/notes?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Delete failed')
      setNotes((prev) => prev.filter((n) => n.id !== id))
    } catch {
      toast.error('Could not delete note')
    }
  }

  async function handleDeleteBookmark(id: string) {
    try {
      const res = await fetch(`/api/dashboard/bookmarks?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Delete failed')
      setBookmarks((prev) => prev.filter((b) => b.id !== id))
    } catch {
      toast.error('Could not remove bookmark')
    }
  }

  return (
    <section className="space-y-6" aria-label="Learning Intelligence Workspace">
      {/* 1. Personalized Recommendations & Study Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Learning Intelligence — Recommended Next Steps
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Deterministic guidance from your measured attempts, spaced revision schedule, and daily goal.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
              {variant === 'paid' ? 'Paid Intelligence' : 'Free Tier'}
            </span>
          </div>

          <div className="space-y-3">
            {workspace.recommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 p-4"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                        rec.priority === 'high'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {rec.priority}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {rec.basis === 'measured_performance' ? 'Measured Data' : 'Rule-Based Plan'}
                    </span>
                  </div>
                  <p className="font-medium text-slate-900 dark:text-white text-sm">{rec.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{rec.reason}</p>
                </div>
                <Link
                  href={rec.href}
                  onClick={() =>
                    trackEvent('recommendation_click', {
                      recommendationId: rec.id,
                      category: rec.category,
                    })
                  }
                  className="shrink-0 inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium px-3.5 py-2 transition-colors"
                >
                  {rec.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Daily & Weekly Study Targets */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Daily & Weekly Goals
            </h2>
            <button
              type="button"
              onClick={() => setEditingPrefs((v) => !v)}
              className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {editingPrefs ? 'Close' : 'Edit Goals'}
            </button>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 flex flex-wrap gap-2">
            <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1">
              Class {prefs.classNumber ?? 10} · {prefs.boardCode}
            </span>
            {prefs.examTarget && (
              <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1">
                Target: {prefs.examTarget}
              </span>
            )}
            <span className="rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 px-2 py-1 inline-flex items-center gap-1">
              <Flame className="w-3 h-3" />
              {workspace.measuredStats.currentStreakDays}d streak
            </span>
          </div>

          {editingPrefs && (
            <div className="space-y-3 rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50 dark:bg-slate-950/40 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <label className="space-y-1">
                  <span className="text-slate-600 dark:text-slate-400">Class</span>
                  <input
                    type="number"
                    min={4}
                    max={12}
                    value={prefs.classNumber ?? 10}
                    onChange={(e) =>
                      setPrefs((p) => ({ ...p, classNumber: Number(e.target.value) || 10 }))
                    }
                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-slate-600 dark:text-slate-400">Board</span>
                  <input
                    type="text"
                    value={prefs.boardCode}
                    onChange={(e) => setPrefs((p) => ({ ...p, boardCode: e.target.value }))}
                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-slate-600 dark:text-slate-400">Daily Qs</span>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={prefs.dailyTargetQuestions}
                    onChange={(e) =>
                      setPrefs((p) => ({
                        ...p,
                        dailyTargetQuestions: Number(e.target.value) || 10,
                      }))
                    }
                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-slate-600 dark:text-slate-400">Weekly Mins</span>
                  <input
                    type="number"
                    min={15}
                    max={4200}
                    value={prefs.weeklyGoalMinutes}
                    onChange={(e) =>
                      setPrefs((p) => ({
                        ...p,
                        weeklyGoalMinutes: Number(e.target.value) || 180,
                      }))
                    }
                    className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1"
                  />
                </label>
              </div>
              <button
                type="button"
                disabled={savingPrefs}
                onClick={handleSavePreferences}
                className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 font-medium disabled:opacity-50"
              >
                {savingPrefs ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Today&apos;s Questions</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {todayCount} / {dailyTarget}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${dailyPct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Weekly Study Time</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {workspace.measuredStats.weeklyMinutesLogged} / {prefs.weeklyGoalMinutes} min
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all"
                  style={{ width: `${weeklyPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Today&apos;s Personalized Plan
            </p>
            {workspace.dailyPlan.map((step) => (
              <Link
                key={step.id}
                href={step.href}
                onClick={() =>
                  trackEvent('learning_plan_start', { planStepId: step.id })
                }
                className="flex items-center justify-between gap-2 text-xs rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      step.completed ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                  {step.label}
                </span>
                <span className="text-[11px] text-slate-400">{step.targetMinutes}m</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Measured Subject Mastery & Weak Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Measured Subject Mastery
          </h3>
          {workspace.subjectMastery.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No completed attempts recorded yet. Complete a diagnostic or practice set to see real subject accuracy.
            </p>
          ) : (
            <div className="space-y-3">
              {workspace.subjectMastery.map((subj) => (
                <div key={subj.subject} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {subj.subject}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {subj.masteryPercent}% ({subj.attempts} Qs)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${subj.masteryPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Weak Topic Detection
          </h3>
          {workspace.weakTopics.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No weak topics flagged below 70% accuracy yet. Keep practicing to build topic-level precision.
            </p>
          ) : (
            <div className="space-y-2.5">
              {workspace.weakTopics.map((wt) => (
                <div
                  key={wt.topicId}
                  className="flex items-center justify-between rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 px-3 py-2.5"
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white capitalize">
                      {wt.topicLabel}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {wt.subject} · {wt.accuracyPercent}% accuracy ({wt.attempts} attempts)
                    </p>
                  </div>
                  <Link
                    href={wt.recommendedHref}
                    className="text-xs font-medium text-amber-700 dark:text-amber-300 hover:underline"
                  >
                    Drill →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Bookmarks, Revision Notes & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <Bookmark className="w-4 h-4 text-indigo-500" />
            Saved Bookmarks ({bookmarks.length})
          </h3>
          {bookmarks.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Bookmark questions, formulas, or skill labs while studying for quick revision.
            </p>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="flex items-center justify-between gap-2 text-xs rounded-lg border border-slate-100 dark:border-slate-800 p-2"
                >
                  <Link href={bm.href} className="truncate font-medium text-slate-800 dark:text-slate-200 hover:underline">
                    {bm.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteBookmark(bm.id)}
                    aria-label={`Remove bookmark ${bm.title}`}
                    className="text-slate-400 hover:text-red-500 shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-emerald-500" />
            Revision Notes ({notes.length})
          </h3>
          <form onSubmit={handleAddNote} className="space-y-2 mb-3">
            <input
              type="text"
              placeholder="Note title..."
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 text-xs"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Key formula or takeaway..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 text-xs"
              />
              <button
                type="submit"
                disabled={addingNote}
                className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1.5 text-xs font-medium disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                Save
              </button>
            </div>
          </form>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {notes.map((n) => (
              <div
                key={n.id}
                className="flex items-start justify-between gap-2 text-xs rounded-lg border border-slate-100 dark:border-slate-800 p-2"
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate-800 dark:text-slate-200 truncate">{n.title}</p>
                  <p className="text-slate-500 dark:text-slate-400 line-clamp-2">{n.content}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteNote(n.id)}
                  aria-label={`Delete note ${n.title}`}
                  className="text-slate-400 hover:text-red-500 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-amber-500" />
            Achievements & XP ({workspace.measuredStats.xpTotal} XP)
          </h3>
          {workspace.achievements.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete diagnostics, keep your daily streak alive, and finish labs to unlock milestones.
            </p>
          ) : (
            <div className="space-y-2">
              {workspace.achievements.slice(0, 5).map((ach) => (
                <div
                  key={ach.id}
                  className="flex items-center justify-between text-xs rounded-lg bg-amber-50/60 dark:bg-amber-950/20 px-3 py-2"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">{ach.title}</span>
                  <span className="text-[11px] text-amber-700 dark:text-amber-300">{ach.badge}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Server-Gated Paid Intelligence OR Contextual Free Upgrade */}
      {variant === 'paid' && workspace.paidInsights ? (
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Paid Learning Intelligence & Readiness
            </h3>
            <Link
              href="/dashboard/reports"
              className="text-xs font-medium text-emerald-700 dark:text-emerald-300 hover:underline"
            >
              Open Progress Reports →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="rounded-xl bg-white dark:bg-slate-900 p-3 border border-emerald-100 dark:border-emerald-900/40">
              <p className="text-xs text-slate-500">Exam Readiness</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {workspace.paidInsights.examReadinessPercent !== null
                  ? `${workspace.paidInsights.examReadinessPercent}%`
                  : '—'}
              </p>
            </div>
            <div className="rounded-xl bg-white dark:bg-slate-900 p-3 border border-emerald-100 dark:border-emerald-900/40">
              <p className="text-xs text-slate-500">Avg Pace / Q</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {workspace.paidInsights.averagePaceSecondsPerQuestion !== null
                  ? `${workspace.paidInsights.averagePaceSecondsPerQuestion}s`
                  : '—'}
              </p>
            </div>
            <div className="rounded-xl bg-white dark:bg-slate-900 p-3 border border-emerald-100 dark:border-emerald-900/40">
              <p className="text-xs text-slate-500">Smart Revision Queue</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {workspace.paidInsights.smartRevisionQueueCount}
              </p>
            </div>
            <div className="rounded-xl bg-white dark:bg-slate-900 p-3 border border-emerald-100 dark:border-emerald-900/40">
              <p className="text-xs text-slate-500">Chapters Tracked</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {workspace.paidInsights.chapterMasterySummary.length}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-indigo-200/80 dark:border-indigo-900/50 bg-gradient-to-r from-indigo-50/80 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Free Plan Includes 5-Question Diagnostics & Core Practice
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                {workspace.lockedCapabilities.slice(0, 3).map((cap) => (
                  <li key={cap}>{cap}</li>
                ))}
              </ul>
            </div>
            <Link
              href="/pricing"
              onClick={() => trackEvent('pricing_view', { source: 'free_dashboard_upgrade' })}
              className="shrink-0 inline-flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5"
            >
              View Plans & Unlock
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
