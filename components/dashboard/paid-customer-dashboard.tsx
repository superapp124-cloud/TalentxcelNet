'use client'

import React from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Target,
  GraduationCap,
  Code2,
  Calculator,
  BarChart3,
  ShieldCheck,
  Flame,
  Trophy,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { EnrichedEntitlement } from '@/lib/commerce/user-entitlements'
import type { ProductDomain } from '@/packages/core/src/types'
import { LearnerIntelligencePanel } from '@/components/dashboard/learner-intelligence-sections'
import type { LearnerWorkspaceData } from '@/lib/dashboard/learner-intelligence'

export interface PaidDashboardUser {
  id: string
  email?: string
  displayName: string
  avatarUrl?: string | null
  isGoogleUser?: boolean
  streakDays?: number
  accuracyPercentage?: number
  testsCompleted?: number
}

interface PaidCustomerDashboardProps {
  user: PaidDashboardUser
  entitlements: EnrichedEntitlement[]
  workspace?: LearnerWorkspaceData
}

interface ServiceAction {
  label: string
  href: string
  primary?: boolean
}

function getDomainLabel(domain: ProductDomain): string {
  if (domain === 'assessment') return 'Assessment & Mocks'
  if (domain === 'skill') return 'Skill Development'
  return 'Academic Learning'
}

function getDomainIcon(domain: ProductDomain) {
  if (domain === 'assessment') return Target
  if (domain === 'skill') return Code2
  return GraduationCap
}

function getServiceActions(ent: EnrichedEntitlement): ServiceAction[] {
  if (ent.productId === 'prod_assess_ssb_oir_99') {
    return [
      { label: 'Launch SSB OIR Mocks', href: '/competitive/ssb', primary: true },
      { label: 'Psych Battery', href: '/competitive/ssb/psychological-battery' },
      { label: 'Reports', href: '/assessment#reports' },
    ]
  }
  if (ent.domain === 'assessment') {
    return [
      { label: 'Start Assessment', href: '/assessment', primary: true },
      { label: 'Question Bank', href: '/dashboard/question-bank' },
      { label: 'Formula Sheets', href: '/formulas' },
    ]
  }
  if (ent.domain === 'skill') {
    return [
      { label: 'Open Skill Tracks', href: '/skills', primary: true },
      { label: 'AI & Project Labs', href: '/courses/ai-development' },
    ]
  }
  return [
    { label: 'Open Academic Lessons', href: '/academic', primary: true },
    { label: 'Question Bank', href: '/dashboard/question-bank' },
    { label: 'Chapter Practice', href: '/practice' },
  ]
}

function formatValidUntil(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'Active'
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function PaidCustomerDashboard({ user, entitlements, workspace }: PaidCustomerDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Focused Paid Customer Header */}
      <section className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Active Paid Workspace • {entitlements.length} {entitlements.length === 1 ? 'Service' : 'Services'} Unlocked</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back, {user.displayName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
              Here are the services included in your active plan. Launch any service directly below.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/70 dark:border-neutral-800 text-center min-w-[82px]">
              <div className="text-xs text-slate-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-blue-600" />
                <span>Tests</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                {user.testsCompleted ?? 0}
              </div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/70 dark:border-neutral-800 text-center min-w-[82px]">
              <div className="text-xs text-slate-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Accuracy</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                {user.accuracyPercentage !== undefined ? `${user.accuracyPercentage}%` : '—'}
              </div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/70 dark:border-neutral-800 text-center min-w-[82px]">
              <div className="text-xs text-slate-500 dark:text-neutral-400 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Streak</span>
              </div>
              <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                {user.streakDays ?? 0}d
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Paid Services Grid */}
      <section aria-label="Your Active Services" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">
            Your Active Services
          </h2>
          <Link
            href="/plans"
            className="text-xs font-semibold text-[#0066FF] hover:underline inline-flex items-center gap-1"
          >
            Add Another Service <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {entitlements.map((ent) => {
            const DomainIcon = getDomainIcon(ent.domain)
            const actions = getServiceActions(ent)

            return (
              <div
                key={ent.id}
                className="rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200/80 dark:border-neutral-800 p-5 flex flex-col justify-between gap-4 shadow-xs hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-[#0066FF] flex items-center justify-center shrink-0">
                        <DomainIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-[#0066FF]">
                          {getDomainLabel(ent.domain)}
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug">
                          {ent.productTitle}
                        </h3>
                      </div>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 shrink-0">
                      Active
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-neutral-400">
                    {ent.productTagline}
                  </p>

                  {/* Entitlement Limits */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      Valid until {formatValidUntil(ent.validUntil)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300">
                      <Sparkles className="w-3.5 h-3.5" />
                      {ent.attemptsRemaining === -1
                        ? 'Unlimited access'
                        : `${ent.attemptsRemaining} ${ent.attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining`}
                    </span>
                    {ent.targetGradeLevel && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300">
                        <Calculator className="w-3.5 h-3.5" />
                        Class {ent.targetGradeLevel}
                      </span>
                    )}
                  </div>

                  {/* Inclusions */}
                  {ent.inclusions.length > 0 && (
                    <ul className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-neutral-900">
                      {ent.inclusions.slice(0, 4).map((inc) => (
                        <li
                          key={inc}
                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-neutral-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Direct Service Launch Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-neutral-900">
                  {actions.map((action) => (
                    <Link key={action.href} href={action.href}>
                      <Button
                        size="sm"
                        variant={action.primary ? 'default' : 'outline'}
                        className={
                          action.primary
                            ? 'bg-[#0066FF] hover:bg-blue-700 text-white rounded-xl text-xs font-bold gap-1.5'
                            : 'rounded-xl text-xs font-semibold'
                        }
                      >
                        {action.label}
                        {action.primary && <ArrowRight className="w-3.5 h-3.5" />}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {workspace && <LearnerIntelligencePanel workspace={workspace} variant="paid" />}
    </div>
  )
}
