import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { GraduationCap, LayoutDashboard, BookOpen, Award, Settings, LogOut, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'My Courses', href: '/dashboard/courses', icon: BookOpen },
  { label: 'Certificates', href: '/dashboard/certificates', icon: Award },
  { label: 'AI Tutor', href: '/dashboard/ai-tutor', icon: MessageSquare },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-background" aria-label="Dashboard navigation">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2" aria-label="TalentXcel Academy home">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-foreground">TalentXcel</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Dashboard sections">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t">
          <form action="/auth/signout" method="post">
            <Button type="submit" variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1" id="dashboard-content">
        {children}
      </main>
    </div>
  )
}
