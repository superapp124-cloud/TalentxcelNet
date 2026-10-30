import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Phone, Mail, Clock, CheckCircle2, UserCheck, Filter, Download, Inbox, Database } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admissions CRM — Operations Console',
  robots: { index: false },
}

interface LeadRecord {
  id: string
  full_name: string
  email: string
  phone: string
  programme_interest: string
  status: string
  source: string
  assigned_counsellor: string
  created_at: string
}

export default async function AdmissionsCRMPage() {
  let displayLeads: LeadRecord[] = []

  try {
    const supabase = await createClient()
    const { data: dbLeads, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (!error && dbLeads && dbLeads.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      displayLeads = dbLeads.map((item: any) => ({
        id: item.id,
        full_name: item.full_name || 'Enquiry Candidate',
        email: item.email || 'N/A',
        phone: item.phone || 'Not provided',
        programme_interest: item.programme_interest || 'General Admissions',
        status: item.status || 'new_enquiry',
        source: item.source || 'Website Form',
        assigned_counsellor: item.assigned_to || 'Unassigned',
        created_at: item.created_at,
      }))
    }
  } catch (err) {
    console.warn('[Admissions CRM] Supabase query failed:', err)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'enrolled':
        return <Badge variant="success" className="text-[11px] capitalize">Enrolled</Badge>
      case 'admitted':
        return <Badge variant="default" className="text-[11px] capitalize bg-blue-600">Admitted</Badge>
      case 'application_submitted':
        return <Badge variant="default" className="text-[11px] capitalize bg-indigo-600">Application Submitted</Badge>
      case 'counselling_scheduled':
        return <Badge variant="outline" className="text-[11px] capitalize text-amber-500 border-amber-500/30">Counselling Scheduled</Badge>
      case 'counselling_completed':
        return <Badge variant="outline" className="text-[11px] capitalize text-green-500 border-green-500/30">Counselling Completed</Badge>
      case 'new_enquiry':
        return <Badge variant="secondary" className="text-[11px] capitalize">New Enquiry</Badge>
      default:
        return <Badge variant="outline" className="text-[11px] capitalize">{status.replace('_', ' ')}</Badge>
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Admissions CRM & Funnel Operations
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real PostgreSQL candidate registry. Zero mock data.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 text-xs text-emerald-600 border-emerald-300 py-1">
            <Database className="w-3.5 h-3.5" />
            Live Supabase Pipeline
          </Badge>
        </div>
      </div>

      {/* KPI Funnel Overview (Real Counts) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 border border-slate-200 dark:border-neutral-800">
          <div className="text-xs text-muted-foreground font-semibold">Active Prospects</div>
          <div className="text-2xl font-black text-foreground mt-1">{displayLeads.length}</div>
        </Card>
        <Card className="p-4 border border-slate-200 dark:border-neutral-800">
          <div className="text-xs text-muted-foreground font-semibold">Counselling Scheduled</div>
          <div className="text-2xl font-black text-amber-500 mt-1">
            {displayLeads.filter((l) => l.status.includes('counselling')).length}
          </div>
        </Card>
        <Card className="p-4 border border-slate-200 dark:border-neutral-800">
          <div className="text-xs text-muted-foreground font-semibold">Applications Submitted</div>
          <div className="text-2xl font-black text-indigo-500 mt-1">
            {displayLeads.filter((l) => l.status === 'application_submitted' || l.status === 'admitted').length}
          </div>
        </Card>
        <Card className="p-4 border border-slate-200 dark:border-neutral-800">
          <div className="text-xs text-muted-foreground font-semibold">Enrolled Learners</div>
          <div className="text-2xl font-black text-emerald-500 mt-1">
            {displayLeads.filter((l) => l.status === 'enrolled').length}
          </div>
        </Card>
      </div>

      {/* Leads Table */}
      <Card className="border border-slate-200 dark:border-neutral-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Admissions Candidate Registry ({displayLeads.length} total)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {displayLeads.length > 0 ? (
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Programme Track</th>
                  <th className="p-4">Pipeline Status</th>
                  <th className="p-4">Assigned Counsellor</th>
                  <th className="p-4">Lead Source</th>
                  <th className="p-4">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {displayLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-foreground">{lead.full_name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span>{lead.email}</span>
                        {lead.phone && (
                          <>
                            <span>•</span>
                            <span>{lead.phone}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-xs font-medium text-foreground">{lead.programme_interest}</td>
                    <td className="p-4">{getStatusBadge(lead.status)}</td>
                    <td className="p-4 text-xs">
                      <span className="inline-flex items-center gap-1 font-medium text-foreground">
                        <UserCheck className="h-3.5 w-3.5 text-primary" /> {lead.assigned_counsellor}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-muted-foreground">{lead.source}</td>
                    <td className="p-4 text-xs text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-16 text-center space-y-3">
              <Inbox className="w-10 h-10 mx-auto text-slate-400" />
              <h3 className="text-base font-bold text-foreground">No Enquiry Records Yet</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                No mock data is being displayed. As soon as visitors submit applications on <code>/apply</code> or free practice tests on <code>/assessment</code>, real records will be displayed here in real time.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
