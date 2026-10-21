import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Laptop, Cpu, HardDrive, Monitor, ShieldCheck, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Laptop & Technical Requirements — TalentXcel Academy',
  description: 'Recommended hardware specifications and operating system requirements.',
  alternates: {
    canonical: 'https://talentxcel.net/laptop-requirements',
  },
}

export default function LaptopRequirementsPage() {
  return (
    <div className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-3 text-primary border-primary/30">
            Technical Guide
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Laptop & System Requirements
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Ensure your computing environment is ready for hands-on software development, AI model execution, and offline PWA learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-xs">
            <CardHeader>
              <Badge variant="default" className="w-fit mb-1">Recommended Specs</Badge>
              <CardTitle className="text-lg font-bold">For AI & Software Development</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Cpu className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">Processor</div>
                  <div className="text-xs text-muted-foreground">Intel Core i5 (11th Gen+) or AMD Ryzen 5 (5000+) or Apple Silicon (M1+)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">Memory (RAM)</div>
                  <div className="text-xs text-muted-foreground">16 GB DDR4/DDR5 recommended (8 GB minimum)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HardDrive className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">Storage</div>
                  <div className="text-xs text-muted-foreground">512 GB NVMe SSD (minimum 50 GB free for tools & local environments)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Laptop className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold">Operating System</div>
                  <div className="text-xs text-muted-foreground">Windows 11 (64-bit), Ubuntu 22.04 LTS+, or macOS Ventura+</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-xs">
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-1">Minimum Specs</Badge>
              <CardTitle className="text-lg font-bold">Foundation & School Programmes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Cpu className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="font-semibold">Processor</div>
                  <div className="text-xs text-muted-foreground">Dual Core 2.0 GHz+ Intel/AMD processor</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Monitor className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="font-semibold">Memory</div>
                  <div className="text-xs text-muted-foreground">8 GB RAM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HardDrive className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="font-semibold">Storage</div>
                  <div className="text-xs text-muted-foreground">256 GB SSD</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Laptop className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <div className="font-semibold">Browser Requirements</div>
                  <div className="text-xs text-muted-foreground">Modern Chromium-based browser (Chrome, Edge, Brave) or Firefox with ServiceWorker enabled for offline learning.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hardware Fulfilment Terms */}
        <div className="p-6 rounded-2xl border bg-muted/20 space-y-3 text-xs text-muted-foreground leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Hardware Fulfilment, Warranty & Return Disclaimers</span>
          </div>
          <p>
            When enrolling in a programme with optional hardware provision:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The device model and specification will match or exceed the minimum configuration approved by TalentXcel administrators.</li>
            <li>All shipments are tracked via verified national courier services with proof of delivery confirmation.</li>
            <li>Manufacturer warranty (standard 1 to 3 years) applies directly to the device. TalentXcel coordinates manufacturer RMA support for active learners.</li>
            <li>Laptops remain non-returnable once unsealed and delivered, except in cases of verified transit damage reported within 48 hours of delivery.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
