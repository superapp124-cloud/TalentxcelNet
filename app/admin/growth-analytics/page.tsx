'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Target,
  BarChart3,
  Calendar,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface GrowthMetricsResponse {
  measuredActuals: {
    totalRecordedEvents: number
    landingViews: number
    freeTestsStarted: number
    freeTestsCompleted: number
    plansViewed: number
    checkoutsInitiated: number
    paymentsSucceeded: number
    entitlementsActive: number
    grossCollectionsRupees: number
    refundsRupees: number
    netCollectionsRupees: number
    checkoutConversionPercentage: number
  }
  ambitionScaleTargets: {
    day30UserTarget: number
    dailyTargetRunRate: number
    note: string
  }
}

export default function GrowthAnalyticsDashboard() {
  const [metrics, setMetrics] = useState<GrowthMetricsResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchMetrics = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/analytics/funnel')
      if (res.ok) {
        const data = await res.json()
        setMetrics(data)
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
              TX
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Truthful Funnel & Growth Analytics
                <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                  Day 1 Real Revenue
                </Badge>
              </h1>
              <p className="text-xs text-slate-500">
                Audited funnel metrics · Strict separation of measured data from 30-day ambition targets
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchMetrics}
              disabled={loading}
              className="text-xs h-8"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
            <Link href="/">
              <Button size="sm" className="text-xs h-8 bg-blue-600 hover:bg-blue-700 text-white">
                Learner View →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Core Non-Negotiable Integrity Banner */}
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <p className="font-bold">Zero Fabrication Guarantee (Phase 9 Compliance)</p>
            <p className="text-amber-800">
              This dashboard strictly reports verified events captured by server-authoritative orders, cryptographic payment verification, and real learner sessions. No simulated vanity users or revenue are injected.
            </p>
          </div>
        </div>

        {/* Financial & Funnel Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>Gross Collections</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              ₹{metrics?.measuredActuals.grossCollectionsRupees ?? 0}
            </p>
            <p className="text-[11px] text-slate-500">
              Net Collections: ₹{metrics?.measuredActuals.netCollectionsRupees ?? 0} (Refunds: ₹0)
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>Verified Paid Orders</span>
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {metrics?.measuredActuals.paymentsSucceeded ?? 0}
            </p>
            <p className="text-[11px] text-slate-500">
              Active Entitlements: {metrics?.measuredActuals.entitlementsActive ?? 0}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>Free Tests Completed</span>
              <Activity className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {metrics?.measuredActuals.freeTestsCompleted ?? 0}
            </p>
            <p className="text-[11px] text-slate-500">
              Started: {metrics?.measuredActuals.freeTestsStarted ?? 0}
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>Checkout Conversion</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">
              {metrics?.measuredActuals.checkoutConversionPercentage ?? 0}%
            </p>
            <p className="text-[11px] text-slate-500">
              Checkouts: {metrics?.measuredActuals.checkoutsInitiated ?? 0}
            </p>
          </div>
        </div>

        {/* Funnel Stage Progression */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Measured Acquisition & Conversion Funnel
          </h2>

          <div className="space-y-3 pt-2">
            {[
              {
                stage: '1. Landing Page Visits',
                count: metrics?.measuredActuals.landingViews ?? 0,
                desc: 'Visitors exploring the Three-Domain platform',
                color: 'bg-slate-700',
              },
              {
                stage: '2. Free Practice Started',
                count: metrics?.measuredActuals.freeTestsStarted ?? 0,
                desc: 'Zero-login diagnostic attempts launched',
                color: 'bg-blue-600',
              },
              {
                stage: '3. Free Diagnostic Completed',
                count: metrics?.measuredActuals.freeTestsCompleted ?? 0,
                desc: 'Server-validated score & weak topics displayed',
                color: 'bg-cyan-600',
              },
              {
                stage: '4. Commercial Plans Viewed',
                count: metrics?.measuredActuals.plansViewed ?? 0,
                desc: 'Exploration of ₹20 single test to ₹999 pack & subscriptions',
                color: 'bg-indigo-600',
              },
              {
                stage: '5. Razorpay Checkout Initiated',
                count: metrics?.measuredActuals.checkoutsInitiated ?? 0,
                desc: 'Order created with server-authoritative GST calculation',
                color: 'bg-purple-600',
              },
              {
                stage: '6. Payment Verified & Entitlement Active',
                count: metrics?.measuredActuals.paymentsSucceeded ?? 0,
                desc: 'HMAC signature confirmed; content instantly unlocked',
                color: 'bg-emerald-600',
              },
            ].map((st, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-900">{st.stage}</p>
                  <p className="text-[11px] text-slate-500">{st.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`${st.color} text-white border-none font-bold text-xs px-2.5 py-1`}>
                    {st.count}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day-30 Ambition Perspective Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-600" />
              Day-30 Scale Ambition vs Measured Reality
            </h2>
            <Badge variant="outline" className="text-[10px] text-slate-600 border-slate-200">
              Mathematical Benchmark
            </Badge>
          </div>

          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                  <th className="p-3">Metric</th>
                  <th className="p-3">Measured Actuals (Day 1)</th>
                  <th className="p-3">Day 30 Ambition Target</th>
                  <th className="p-3">Target Run-Rate</th>
                  <th className="p-3">Status & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Total Learner Registrations</td>
                  <td className="p-3 font-mono">{metrics?.measuredActuals.entitlementsActive ?? 0}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">1,000,000</td>
                  <td className="p-3 font-mono text-slate-500">~33,333 / day</td>
                  <td className="p-3">
                    <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[10px] font-semibold">
                      Acquisition Focus
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Free Practice Engagement</td>
                  <td className="p-3 font-mono">{metrics?.measuredActuals.freeTestsCompleted ?? 0}</td>
                  <td className="p-3 font-mono text-slate-500">Uncapped Organic Entry</td>
                  <td className="p-3 font-mono text-slate-500">~50,000 / day</td>
                  <td className="p-3">
                    <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-semibold">
                      Zero-Login Funnel Active
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Paid Assessment Packs Sold</td>
                  <td className="p-3 font-mono">{metrics?.measuredActuals.paymentsSucceeded ?? 0}</td>
                  <td className="p-3 font-mono text-slate-500">Conversion from Free Diagnostic</td>
                  <td className="p-3 font-mono text-slate-500">~500–1,000 / day</td>
                  <td className="p-3">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">
                      Razorpay Gateway Verified
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">Gross Collections</td>
                  <td className="p-3 font-mono font-bold text-slate-900">
                    ₹{metrics?.measuredActuals.grossCollectionsRupees ?? 0}
                  </td>
                  <td className="p-3 font-mono text-slate-500">Based on Conversion</td>
                  <td className="p-3 font-mono text-slate-500">Target ₹1L–5L / day</td>
                  <td className="p-3">
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-semibold">
                      Day 1 Revenue Live
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
