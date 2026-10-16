import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cpu, DollarSign, Zap, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Super AI Analytics',
  robots: { index: false },
}

export default function AIAnalyticsAdminPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Super AI Telemetry & Observability
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Model router usage, token quotas, latency tracking, and prompt-injection defense telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-muted-foreground text-sm font-medium">
              <span>Token Volume Today</span>
              <Cpu className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold mt-2">184,290</div>
            <div className="text-xs text-muted-foreground mt-1">Prompt: 112k | Completion: 72k</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-muted-foreground text-sm font-medium">
              <span>Est. Inference Cost</span>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-2xl font-bold mt-2">$0.42</div>
            <div className="text-xs text-muted-foreground mt-1">Budget cap: $5.00/day</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-muted-foreground text-sm font-medium">
              <span>Median Latency</span>
              <Zap className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold mt-2">412ms</div>
            <div className="text-xs text-muted-foreground mt-1">99.8% within SLA (&lt;1.5s)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between text-muted-foreground text-sm font-medium">
              <span>Security Interceptions</span>
              <ShieldCheck className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold mt-2">3</div>
            <div className="text-xs text-muted-foreground mt-1">Prompt injections neutralized</div>
          </CardContent>
        </Card>
      </div>

      {/* Model Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Configured AI Providers & Router Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">OpenAI (Primary)</span>
                <Badge variant="default" className="text-[10px]">Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Model: gpt-4o-mini for Socratic hints and coding reviews.</p>
            </div>
            <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Google Gemini (Standby)</span>
                <Badge variant="secondary" className="text-[10px]">Standby</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Model: gemini-1.5-flash for fallback and document summarization.</p>
            </div>
            <div className="p-4 rounded-xl border bg-muted/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Deterministic Engine</span>
                <Badge variant="success" className="text-[10px]">Guaranteed</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Zero-dependency fallback ensuring 100% platform uptime offline & dev.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
