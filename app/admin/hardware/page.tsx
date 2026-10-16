import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Laptop, Truck, CheckCircle2, AlertTriangle, Plus, Package } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Hardware Fulfilment — Operations Console',
  robots: { index: false },
}

const fallbackHardware = [
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
  {
    serialNumber: 'TX-DEV-2026-0043',
    model: 'Core i5 12th Gen / 16GB / 512GB SSD',
    allocatedTo: 'Unallocated (In Warehouse Stock)',
    courier: 'Warehouse Inventory',
    trackingNumber: 'WH-BIN-04',
    status: 'in_stock',
    warrantyExpiry: 'Pending Activation',
  },
]

export default async function HardwareAdminPage() {
  let hardwareItems = fallbackHardware

  try {
    const supabase = await createClient()
    const { data: dbItems, error } = await supabase
      .from('hardware_inventory')
      .select('id, serial_number, model, status, tracking_number, courier, warranty_expiry, profiles(full_name)')
      .limit(20)

    if (!error && dbItems && dbItems.length > 0) {
      hardwareItems = dbItems.map((item: any) => ({
        serialNumber: item.serial_number || item.id.slice(0, 8),
        model: item.model || 'Standard Development Laptop',
        allocatedTo: item.profiles?.full_name || 'In Stock',
        courier: item.courier || 'Warehouse',
        trackingNumber: item.tracking_number || 'N/A',
        status: item.status || 'in_stock',
        warrantyExpiry: item.warranty_expiry || '3-Year Limited',
      }))
    }
  } catch (err) {
    console.warn('[Hardware Admin] Supabase read fallback active:', err)
  }

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Hardware & Device Logistics
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Asset tracking, batch purchase orders, courier tracking, and OEM warranty claims.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" /> Register Batch PO
        </Button>
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-muted-foreground flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
        <span>
          <strong>Hardware Fulfilment Policy</strong>: Devices are allocated strictly upon verified payment confirmation. See <a href="/legal/hardware-terms" target="_blank" className="text-primary underline font-medium">Hardware Warranty Terms</a> for replacement criteria.
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground font-semibold">Total Inventory Acquired</div>
          <div className="text-2xl font-bold text-foreground mt-1">50 units</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground font-semibold">Dispatched / Delivered</div>
          <div className="text-2xl font-bold text-green-500 mt-1">42 units</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground font-semibold">Available Warehouse Buffer</div>
          <div className="text-2xl font-bold text-primary mt-1">8 units</div>
        </Card>
      </div>

      {/* Hardware Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Tracked Hardware Units</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-xs font-semibold text-muted-foreground uppercase">
                <th className="p-4">Serial Number</th>
                <th className="p-4">Specification</th>
                <th className="p-4">Assigned Student</th>
                <th className="p-4">Courier & Tracking</th>
                <th className="p-4">Delivery Status</th>
                <th className="p-4">Warranty</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {hardwareItems.map((item) => (
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
                      variant={
                        item.status === 'delivered'
                          ? 'success'
                          : item.status === 'in_transit'
                          ? 'default'
                          : 'secondary'
                      }
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
