import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Phone, Mail, Clock, CheckCircle2, UserCheck, Filter, Download } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Admissions CRM — Operations Console',
  robots: { index: false },
}

const fallbackLeads = [
  {
    id: 'lead-001',
    full_name: 'Priya Sharma',
    email: 'priya.sharma@example.in',
    phone: '+91 98765 43210',
    programme_interest: 'AI Development & Automation',
    status: 'counselling_scheduled',
    source: 'Website Form (Google Ads)',
    assigned_counsellor: 'Rahul Mehta',
    created_at: '2026-10-16T10:30:00Z',
  },
  {
    id: 'lead-002',
    full_name: 'Aditya Verma',
    email: 'aditya.verma@example.com',
    phone: '+91 98112 23344',
    programme_interest: 'AI Development & Automation',
    status: 'application_submitted',
    source: 'Direct Portal Apply',
    assigned_counsellor: 'Anjali Desai',
    created_at: '2026-10-16T09:15:00Z',
  },
  {
    id: 'lead-003',
    full_name: 'Dr. Sameer Joshi',
    email: 'sameer.j@healthclinic.in',
    phone: '+91 98220 11928',
    programme_interest: 'Healthcare Technology',
    status: 'admitted',
    source: 'Referral (Alumni)',
    assigned_counsellor: 'Rahul Mehta',
    created_at: '2026-10-15T16:45:00Z',
  },
  {
    id: 'lead-004',
    full_name: 'Meenakshi Iyer',
    email: 'm.iyer@enterprises.org',
    phone: '+91 97654 32109',
    programme_interest: 'Entrepreneurship & Small-Business Digitization',
    status: 'enrolled',
    source: 'MSME Growth Summit',
    assigned_counsellor: 'Anjali Desai',
    created_at: '2026-10-14T11:20:00Z',
  },
  {
    id: 'lead-005',
    full_name: 'Kavita Sundaram (Guardian)',
    email: 'kavita.s@guardian.in',
    phone: '+91 99887 76655',
    programme_interest: 'School Foundation (Class 8 → 9)',
    status: 'counselling_completed',
    source: 'Parent Network Forum',
    assigned_counsellor: 'Deepak Rao',
    created_at: '2026-10-13T14:10:00Z',
  },
]

export default async function AdmissionsCRMPage() {
  let displayLeads = fallbackLeads

  try {
    const supabase = await createClient()
    const { data: dbLeads, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(25)

    if (!error && dbLeads && dbLeads.length > 0) {
      displayLeads = dbLeads.map((item: any) => ({
        id: item.id,
        full_name: item.full_name,
        email: item.email,
        phone: item.phone || 'Not provided',
        programme_interest: item.programme_interest || 'General Admissions',
        status: item.status || 'new_enquiry',
        source: item.source || 'Website Form',
        assigned_counsellor: item.assigned_to || 'Unassigned',
        created_at: item.created_at,
      }))
    }
  } catch (err) {
    console.warn('[Admissions CRM] Supabase read fallback active:', err)
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
            Lead capture pipeline, 13-stage workflow tracking, counsellor assignments, and verified enrolment records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Filter className="h-3.5 w-3.5" /> Filter Stages
          </Button>
          <Button size="sm" className="gap-1.5 text-xs">
            <Download className="h-3.5 w-3.5" /> Export Leads CSV
          </Button>
        </div>
      </div>

      {/* KPI Funnel Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground font-semibold">Active Prospects</div>
          <div className="text-2xl font-bold text-foreground mt-1">{displayLeads.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground font-semibold">Counselling Scheduled</div>
          <div className="text-2xl font-bold text-amber-500 mt-1">
            {displayLeads.filter((l) => l.status.includes('counselling')).length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground font-semibold">Applications Submitted</div>
          <div className="text-2xl font-bold text-indigo-500 mt-1">
            {displayLeads.filter((l) => l.status === 'application_submitted' || l.status === 'admitted').length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground font-semibold">Enrolled Cohort 1</div>
          <div className="text-2xl font-bold text-green-500 mt-1">
            {displayLeads.filter((l) => l.status === 'enrolled').length}
          </div>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Admissions Candidate Registry</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                <th className="p-4">Applicant</th>
                <th className="p-4">Programme Track</th>
                <th className="p-4">Pipeline Status</th>
                <th className="p-4">Assigned Counsellor</th>
                <th className="p-4">Lead Source</th>
                <th className="p-4">Received</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {displayLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-foreground">{lead.full_name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>{lead.email}</span>
                      <span>•</span>
                      <span>{lead.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-foreground">{lead.programme_interest}</td>
                  <td className="p-4">
                    {getStatusBadge(lead.status)}
                  </td>
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
                  <td className="p-4 text-right space-x-2">
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Schedule Call
                    </Button>
                    <Button size="sm" className="text-xs h-7">
                      Review File
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
