import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CreditCard, Download, CheckCircle, RefreshCcw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payments & Revenue',
  robots: { index: false },
}

const mockTransactions = [
  {
    orderId: 'TX-2026-8812',
    learner: 'Aarav Sharma',
    amount: '₹35,398',
    type: 'Upfront + GST (Instalment 1)',
    provider: 'Razorpay Sandbox',
    status: 'succeeded',
    date: '16 Oct 2026, 11:20 AM',
  },
  {
    orderId: 'TX-2026-8799',
    learner: 'Ananya Sen',
    amount: '₹20,058',
    type: 'Upfront + GST',
    provider: 'Razorpay Sandbox',
    status: 'succeeded',
    date: '12 Oct 2026, 03:45 PM',
  },
  {
    orderId: 'TX-2026-8742',
    learner: 'Vikram Joshi',
    amount: '₹35,398',
    type: 'Upfront + GST',
    provider: 'Razorpay Sandbox',
    status: 'refunded',
    date: '08 Oct 2026, 01:10 PM',
  },
]

export default function PaymentsAdminPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Payments & Transaction Ledger
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Idempotent transaction logs, refund processing, and merchant reconciliation.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-4 w-4" /> Export Ledger CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Payment Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                <th className="p-4">Order ID</th>
                <th className="p-4">Learner</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Type</th>
                <th className="p-4">Gateway</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockTransactions.map((tx) => (
                <tr key={tx.orderId} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-mono text-xs font-bold text-foreground">{tx.orderId}</td>
                  <td className="p-4 text-xs font-semibold">{tx.learner}</td>
                  <td className="p-4 text-xs font-bold text-foreground">{tx.amount}</td>
                  <td className="p-4 text-xs text-muted-foreground">{tx.type}</td>
                  <td className="p-4 text-xs text-muted-foreground">{tx.provider}</td>
                  <td className="p-4">
                    <Badge
                      variant={tx.status === 'succeeded' ? 'success' : 'secondary'}
                      className="capitalize text-[11px]"
                    >
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">{tx.date}</td>
                  <td className="p-4 text-right">
                    {tx.status === 'succeeded' && (
                      <Button variant="ghost" size="sm" className="text-xs h-7 text-destructive">
                        Refund
                      </Button>
                    )}
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
