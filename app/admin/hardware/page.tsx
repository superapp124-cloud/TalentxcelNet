import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Laptop, Truck, CheckCircle2, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Hardware Fulfilment',
  robots: { index: false },
}

const mockHardware = [
  {
    serialNumber: 'TX-DEV-2026-0041',
    model: 'Core i5 12th Gen / 16GB / 512GB SSD',
    allocatedTo: 'Aarav Sharma',
    courier: 'BlueDart Air',
    trackingNumber: 'BD-889102381',
    status: 'in_transit',
    warrantyExpiry: 'Oct 2029 (3 Year On-Site)',
  },
  {
    serialNumber: 'TX-DEV-2026-0042',
    model: 'Core i5 12th Gen / 16GB / 512GB SSD',
    allocatedTo: 'Ananya Sen',
    courier: 'DTDC Express',
    trackingNumber: 'DT-441092389',
    status: 'delivered',
    warrantyExpiry: 'Oct 2029 (3 Year On-Site)',
  },
]

export default function HardwareAdminPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Hardware & Device Fulfilment
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Asset tracking, serial allocations, courier logistics, and warranty registry.
          </p>
        </div>
        <Button size="sm">Register New Batch</Button>
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-muted-foreground flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
        <span>
          <strong>Operational Policy</strong>: Devices are allocated strictly upon verified payment confirmation. Never publish an exact make or warranty claim until the batch purchase order is recorded.
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Allocated Devices</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                <th className="p-4">Serial Number</th>
                <th className="p-4">Specification</th>
                <th className="p-4">Learner</th>
                <th className="p-4">Courier & Tracking</th>
                <th className="p-4">Delivery Status</th>
                <th className="p-4">Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockHardware.map((item) => (
                <tr key={item.serialNumber} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 font-mono text-xs font-bold text-foreground">{item.serialNumber}</td>
                  <td className="p-4 text-xs">{item.model}</td>
                  <td className="p-4 text-xs font-semibold">{item.allocatedTo}</td>
                  <td className="p-4 text-xs">
                    <div>{item.courier}</div>
                    <div className="font-mono text-[11px] text-muted-foreground">{item.trackingNumber}</div>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={item.status === 'delivered' ? 'success' : 'secondary'}
                      className="capitalize text-[11px]"
                    >
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">{item.warrantyExpiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
