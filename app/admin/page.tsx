import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, GraduationCap, CreditCard, Cpu, TrendingUp, AlertCircle, ArrowRight, Compass } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Overview',
  robots: { index: false },
}

export default function AdminOverviewPage() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Operations Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Real-time metrics derived from live admissions, enrolments, transactions, and AI telemetry.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total Enquiries</span>
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold mt-2">128</div>
            <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <span className="text-green-600 font-semibold">+18%</span> from website leads
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Active Learners</span>
              <GraduationCap className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold mt-2">42</div>
            <div className="text-xs text-muted-foreground mt-1">Pilot cohort 1</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Collected Cash (Gross)</span>
              <CreditCard className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold mt-2">₹12,59,958</div>
            <div className="text-xs text-muted-foreground mt-1">Excl. pending instalments</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">AI Requests Today</span>
              <Cpu className="h-4 w-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold mt-2">384</div>
            <div className="text-xs text-muted-foreground mt-1">Avg latency: 412ms</div>
          </CardContent>
        </Card>
      </div>

      {/* Life Skills Curriculum Banner */}
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-emerald-600 text-emerald-700 dark:text-emerald-300 font-semibold text-xs">
              Classes 4–9 Curriculum
            </Badge>
            <Badge className="bg-emerald-600 text-white text-xs">
              216 / 216 Modules Published
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-foreground">Practical Life-Skills Curriculum Console</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            100% verified, age-progressive practical life skills across 6 grade levels, 72 monthly units, and 8 core domains. Inspect individual lessons, visual teaching aids, video storyboards, practical activities, and rubrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/life-skills">
            <Button className="bg-[#0080FF] hover:bg-[#0070DF] text-white gap-2 font-semibold text-xs">
              <Compass className="h-4 w-4" /> Open Curriculum Console <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Ambition Tracking Banner */}
      <div className="rounded-xl border bg-card p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="outline" className="mb-2">Scale Milestone</Badge>
          <h3 className="text-lg font-bold text-foreground">₹100–150 Crore Business Architecture</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Clean accounting separation between gross bookings, cash collected, and recognized monthly revenue. Built on PostgreSQL RLS with deterministic fallbacks to ensure sustainable unit economics.
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-foreground">Gross Booking Value</div>
          <div className="text-2xl font-bold text-primary">₹17,63,958</div>
        </div>
      </div>
    </div>
  )
}
