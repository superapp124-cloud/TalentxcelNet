import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  Laptop,
  Cpu,
  GraduationCap,
  ArrowLeft,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Admissions CRM', href: '/admin/admissions', icon: Users },
  { label: 'Programmes & Content', href: '/admin/programmes', icon: BookOpen },
  { label: 'Payments & Revenue', href: '/admin/payments', icon: CreditCard },
  { label: 'Hardware Fulfilment', href: '/admin/hardware', icon: Laptop },
  { label: 'Super AI Analytics', href: '/admin/ai-analytics', icon: Cpu },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background">
        <div className="p-4 border-b flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm block leading-tight">TalentXcel</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Learner Portal
          </Link>
        </div>
      </aside>

      {/* Main Admin Viewport */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
