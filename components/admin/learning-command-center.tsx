'use client'

import { useState } from 'react'
import {
  Activity,
  AlertCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Compass,
  Filter,
  Globe,
  Layers,
  RefreshCw,
  Search,
  TrendingUp,
  Users,
} from 'lucide-react'
import type {
  AdminIntelligenceReport,
  DateRangePreset,
} from '@/lib/analytics/admin-intelligence'

interface LearningCommandCenterProps {
  initialReport: AdminIntelligenceReport
}

type CommandTab =
  | 'overview'
  | 'traffic'
  | 'funnel'
  | 'content'
  | 'comparison'
  | 'retention'
  | 'users'

const RANGE_OPTIONS: Array<{ value: DateRangePreset; label: string }> = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: '7d', label: 'Last 7d' },
  { value: '30d', label: 'Last 30d' },
  { value: '90d', label: 'Last 90d' },
  { value: 'custom', label: 'Custom' },
]

function formatDelta(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? '+100% vs prev' : '0% vs prev'
  const diff = ((current - previous) / previous) * 100
  const sign = diff > 0 ? '+' : ''
  return `${sign}${Math.round(diff)}% vs prev`
}

export function LearningCommandCenter({ initialReport }: LearningCommandCenterProps) {
  const [report, setReport] = useState<AdminIntelligenceReport>(initialReport)
  const [tab, setTab] = useState<CommandTab>('overview')
  const [range, setRange] = useState<DateRangePreset>(initialReport.range.preset)
  const [customFrom, setCustomFrom] = useState('')
  const [customTo, setCustomTo] = useState('')
  const [search, setSearch] = useState('')
  const [userPage, setUserPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchReport(opts?: {
    nextRange?: DateRangePreset
    nextPage?: number
    nextSearch?: string
    nextFrom?: string
    nextTo?: string
  }) {
    const r = opts?.nextRange ?? range
    const p = opts?.nextPage ?? userPage
    const s = opts?.nextSearch ?? search
    const f = opts?.nextFrom ?? customFrom
    const t = opts?.nextTo ?? customTo

    setLoading(true)
    setError(null)
    try {
      const qs = new URLSearchParams({
        range: r,
        userPage: String(p),
        userPageSize: '15',
      })
      if (s.trim()) qs.set('search', s.trim())
      if (r === 'custom' && f) qs.set('from', new Date(f).toISOString())
      if (r === 'custom' && t) qs.set('to', new Date(t).toISOString())

      const res = await fetch(`/api/admin/intelligence?${qs.toString()}`, {
        cache: 'no-store',
      })
      const json = await res.json()
      if (!res.ok || !json.report) {
        throw new Error(json.error || 'Failed to load intelligence report')
      }
      setReport(json.report)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to refresh analytics')
    } finally {
      setLoading(false)
    }
  }

  const totalUserPages = Math.max(1, Math.ceil(report.userExplorer.total / report.userExplorer.pageSize))

  return (
    <div className="space-y-6">
      {/* Header & Date Range Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Admin Learning & Growth Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            First-party visitor attribution, 7-stage conversion funnel, free vs paid cohorts, and learner activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setRange(opt.value)
                setUserPage(1)
                if (opt.value !== 'custom') {
                  void fetchReport({ nextRange: opt.value, nextPage: 1 })
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                range === opt.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
          {range === 'custom' && (
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-2 py-1 text-xs"
              />
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-2 py-1 text-xs"
              />
              <button
                type="button"
                onClick={() => void fetchReport({ nextRange: 'custom', nextPage: 1 })}
                className="rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-xs font-medium"
              >
                Apply
              </button>
            </div>
          )}
          <button
            type="button"
            disabled={loading}
            onClick={() => void fetchReport()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30 p-3 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {(
          [
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'traffic', label: 'Visitor & Traffic', icon: Globe },
            { id: 'funnel', label: 'Conversion Funnel', icon: Filter },
            { id: 'content', label: 'Content Intelligence', icon: Compass },
            { id: 'comparison', label: 'Free vs Paid', icon: Layers },
            { id: 'retention', label: 'Cohorts & Retention', icon: TrendingUp },
            { id: 'users', label: 'User Explorer', icon: Users },
          ] as const
        ).map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
                tab === item.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          )
        })}
      </div>

      {/* TAB: OVERVIEW */}
      {tab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: 'Unique Visitors',
                value: report.kpis.uniqueVisitors,
                sub: formatDelta(report.kpis.uniqueVisitors, report.previousKpis.uniqueVisitors),
              },
              {
                label: 'Sessions',
                value: report.kpis.sessions,
                sub: `${report.kpis.newVisitors} new · ${report.kpis.returningVisitors} returning`,
              },
              {
                label: 'Registrations',
                value: report.kpis.registrations,
                sub: `${report.kpis.visitorToRegRate}% visitor → reg`,
              },
              {
                label: 'Verified Revenue',
                value: `₹${report.kpis.verifiedRevenueRupees.toLocaleString('en-IN')}`,
                sub: `${report.kpis.paidLearners} active paid learners`,
              },
              {
                label: 'DAU / WAU / MAU',
                value: `${report.kpis.dau} / ${report.kpis.wau} / ${report.kpis.mau}`,
                sub: 'Authenticated active users',
              },
              {
                label: 'Active Learners',
                value: report.kpis.activeLearners,
                sub: `${report.kpis.regToActiveRate}% reg → active`,
              },
              {
                label: 'Free → Paid Rate',
                value: `${report.kpis.freeToPaidRate}%`,
                sub: formatDelta(report.kpis.paidLearners, report.previousKpis.paidLearners),
              },
              {
                label: 'Returning Visitor Rate',
                value: `${report.retention.returningSessionRatePercent}%`,
                sub: `${report.retention.multiDayLearnersCount} multi-day learners`,
              },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
              >
                <p className="text-xs text-slate-500 dark:text-slate-400">{kpi.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {kpi.value}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{kpi.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: TRAFFIC */}
      {tab === 'traffic' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Traffic Channels
            </h2>
            {report.traffic.channels.length === 0 ? (
              <p className="text-xs text-slate-500">No session attribution recorded in this window.</p>
            ) : (
              report.traffic.channels.map((ch) => (
                <div key={ch.channel} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="capitalize font-medium text-slate-800 dark:text-slate-200">
                      {ch.channel.replace('_', ' ')}
                    </span>
                    <span className="text-slate-500">
                      {ch.sessions} sessions ({ch.sharePercent}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${ch.sharePercent}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Devices, Browsers & Coarse Geo
            </h2>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Devices</p>
                {report.traffic.devices.map((d) => (
                  <p key={d.device} className="text-slate-500 capitalize">
                    {d.device}: {d.sessions}
                  </p>
                ))}
              </div>
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Browsers</p>
                {report.traffic.browsers.map((b) => (
                  <p key={b.browser} className="text-slate-500 capitalize">
                    {b.browser}: {b.sessions}
                  </p>
                ))}
              </div>
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">Countries</p>
                {report.traffic.countries.map((c) => (
                  <p key={c.countryCode} className="text-slate-500">
                    {c.countryCode}: {c.sessions}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
              Top Landing Pages
            </h2>
            {report.traffic.landingPages.length === 0 ? (
              <p className="text-xs text-slate-500">No landing pages recorded.</p>
            ) : (
              <div className="space-y-1.5 text-xs">
                {report.traffic.landingPages.map((lp) => (
                  <div key={lp.path} className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
                    <span className="font-mono text-slate-700 dark:text-slate-300">{lp.path}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{lp.sessions}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
              UTM Campaigns
            </h2>
            {report.traffic.utmCampaigns.length === 0 ? (
              <p className="text-xs text-slate-500">No UTM campaign parameters recorded in this period.</p>
            ) : (
              <div className="space-y-1.5 text-xs">
                {report.traffic.utmCampaigns.map((c) => (
                  <div key={`${c.campaign}-${c.source}`} className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
                    <span className="text-slate-700 dark:text-slate-300">
                      {c.campaign} ({c.source}/{c.medium})
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">{c.sessions}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: FUNNEL */}
      {tab === 'funnel' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            7-Stage Learner Conversion Funnel
          </h2>
          <div className="space-y-3">
            {report.funnel.map((stage, idx) => {
              const base = report.funnel[0]?.count || 1
              const widthPct = Math.min(100, Math.round((stage.count / Math.max(1, base)) * 100))
              return (
                <div key={stage.stage} className="space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {idx + 1}. {stage.label}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {stage.count} users
                      {stage.conversionFromPreviousPercent !== null
                        ? ` · ${stage.conversionFromPreviousPercent}% step conv (${stage.dropOffPercent}% drop-off)`
                        : ''}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB: CONTENT */}
      {tab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
              Top Viewed Pages
            </h2>
            {report.content.topPages.length === 0 ? (
              <p className="text-xs text-slate-500">No page views recorded in this period.</p>
            ) : (
              <div className="space-y-1.5 text-xs">
                {report.content.topPages.map((p) => (
                  <div key={p.path} className="flex justify-between border-b border-slate-100 dark:border-slate-800 py-1.5">
                    <span className="font-mono text-slate-700 dark:text-slate-300">{p.path}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{p.views}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm grid grid-cols-2 gap-3 text-xs">
            {[
              { label: 'Diagnostics Started', value: report.content.diagnosticsStarted },
              { label: 'Diagnostics Completed', value: report.content.diagnosticsCompleted },
              { label: 'Lessons Started', value: report.content.lessonsStarted },
              { label: 'Lessons Completed', value: report.content.lessonsCompleted },
              { label: 'Skill Labs Started', value: report.content.skillLabsStarted },
              { label: 'AI Tutor Opens / Usage', value: `${report.content.aiTutorOpens} / ${report.content.aiTutorUsageEvents}` },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-slate-50 dark:bg-slate-950/40 p-3 border border-slate-100 dark:border-slate-800">
                <p className="text-slate-500">{m.label}</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: FREE VS PAID */}
      {tab === 'comparison' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Free Tier Learners</h2>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{report.freeVsPaid.freeUsersCount}</p>
            <p className="text-xs text-slate-500">Avg Events / User: {report.freeVsPaid.freeAvgEventsPerUser}</p>
            <p className="text-xs text-slate-500">Avg Tests / User: {report.freeVsPaid.freeAvgTestsPerUser}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20 p-5 shadow-sm space-y-2">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Paid Learners</h2>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{report.freeVsPaid.paidUsersCount}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Avg Events / User: {report.freeVsPaid.paidAvgEventsPerUser}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Avg Tests / User: {report.freeVsPaid.paidAvgTestsPerUser}</p>
          </div>
        </div>
      )}

      {/* TAB: RETENTION */}
      {tab === 'retention' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Active Cohorts & Retention Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {report.retention.weeklyActiveCohorts.map((c) => (
              <div key={c.weekLabel} className="rounded-xl border border-slate-100 dark:border-slate-800 p-4">
                <p className="text-xs text-slate-500">{c.weekLabel}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{c.activeUsers}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: USER EXPLORER */}
      {tab === 'users' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Privacy-Conscious Learner Explorer ({report.userExplorer.total})
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setUserPage(1)
                void fetchReport({ nextPage: 1, nextSearch: search })
              }}
              className="flex gap-2"
            >
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search learner ID or tier..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 text-white px-3 py-1.5 text-xs font-medium"
              >
                Filter
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                  <th className="py-2 pr-3">Learner</th>
                  <th className="py-2 pr-3">Tier</th>
                  <th className="py-2 pr-3">Active Domains</th>
                  <th className="py-2 pr-3">Events</th>
                  <th className="py-2 pr-3">Tests</th>
                  <th className="py-2">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {report.userExplorer.items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-500">
                      No learners matched this filter.
                    </td>
                  </tr>
                ) : (
                  report.userExplorer.items.map((u) => (
                    <tr key={u.userId} className="border-b border-slate-100 dark:border-slate-800/70">
                      <td className="py-2.5 pr-3 font-medium text-slate-900 dark:text-white">
                        {u.displayLabel}
                      </td>
                      <td className="py-2.5 pr-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            u.tier === 'paid'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {u.tier}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 text-slate-600 dark:text-slate-400">
                        {u.activeDomains.length > 0 ? u.activeDomains.join(', ') : '—'}
                      </td>
                      <td className="py-2.5 pr-3">{u.eventsCount}</td>
                      <td className="py-2.5 pr-3">{u.testsCompleted}</td>
                      <td className="py-2.5 text-slate-500">
                        {u.lastActiveAt ? new Date(u.lastActiveAt).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Page {report.userExplorer.page} of {totalUserPages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={userPage <= 1 || loading}
                onClick={() => {
                  const next = Math.max(1, userPage - 1)
                  setUserPage(next)
                  void fetchReport({ nextPage: next })
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1 disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <button
                type="button"
                disabled={userPage >= totalUserPages || loading}
                onClick={() => {
                  const next = Math.min(totalUserPages, userPage + 1)
                  setUserPage(next)
                  void fetchReport({ nextPage: next })
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1 disabled:opacity-40"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
