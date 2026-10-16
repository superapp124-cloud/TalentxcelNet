import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Phone, Mail, Clock, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admissions CRM',
  robots: { index: false },
}

const mockLeads = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    programme: 'AI Development & Automation',
    status: 'new_enquiry',
    source: 'Website Form (Google Ads)',
    createdAt: 'Today, 10:30 AM',
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    phone: '+91 98123 45678',
    programme: 'Healthcare Technology',
    status: 'counselling_scheduled',
    source: 'Direct Website Enquiry',
    createdAt: 'Yesterday, 4:15 PM',
  },
  {
    id: '3',
    name: 'Rohan Verma',
    email: 'rohan.v@example.com',
    phone: '+91 97654 32109',
    programme: 'AI Development & Automation',
    status: 'admitted',
    source: 'Organic Search',
    createdAt: '14 Oct 2026',
  },
  {
    id: '4',
    name: 'Ananya Sen',
    email: 'ananya.sen@example.com',
    phone: '+91 99887 76655',
    programme: 'School Foundation (Class 8 → 9)',
    status: 'enrolled',
    source: 'Guardian Referral',
    createdAt: '12 Oct 2026',
  },
]

export default function AdmissionsCRMPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Admissions CRM
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Lead capture pipeline, counselling records, and enrolment approval workflow.
          </p>
        </div>
        <Button size="sm">Export Leads CSV</Button>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Active Admissions Pipeline</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                <th className="p-4">Applicant</th>
                <th className="p-4">Programme</th>
                <th className="p-4">Status</th>
                <th className="p-4">Source</th>
                <th className="p-4">Received</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-foreground">{lead.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>{lead.email}</span>
                      <span>•</span>
                      <span>{lead.phone}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-foreground">{lead.programme}</td>
                  <td className="p-4">
                    <Badge
                      variant={
                        lead.status === 'enrolled'
                          ? 'success'
                          : lead.status === 'new_enquiry'
                          ? 'default'
                          : 'secondary'
                      }
                      className="capitalize text-[11px]"
                    >
                      {lead.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">{lead.source}</td>
                  <td className="p-4 text-xs text-muted-foreground">{lead.createdAt}</td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      Counselling Note
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
