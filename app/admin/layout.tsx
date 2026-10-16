import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CreditCard,
  Laptop,
  Cpu,
  Globe,
  ArrowLeft,
} from 'lucide-react'
import { Logo } from '@/components/brand/logo'

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Ecosystem Growth OS', href: '/admin/growth-os', icon: Globe },
  { label: 'Admissions CRM', href: '/admin/admissions', icon: Users },
  { label: 'Programmes & Content', href: '/admin/programmes', icon: BookOpen },
  { label: 'Payments & Revenue', href: '/admin/payments', icon: CreditCard },
  { label: 'Hardware Fulfilment', href: '/admin/hardware', icon: Laptop },
  { label: 'Super AI Analytics', href: '/admin/ai-analytics', icon: Cpu },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-black">
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-black/[0.06] dark:border-white/[0.08] bg-white dark:bg-neutral-950">
        <div className="p-5 border-b border-black/[0.06] dark:border-white/[0.08]">
          <Logo size="md" variant="full" href="/" />
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#0080FF] mt-1 pl-0.5">
            Operations Console
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-black dark:hover:text-white transition-colors"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-black/[0.06] dark:border-white/[0.08]">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs text-neutral-500 hover:text-black dark:hover:text-white"
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
