import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayoutClient } from '@/components/dashboard/dashboard-layout-client'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  let profile: { full_name?: string | null; display_name?: string | null; avatar_url?: string | null } | null = null
  if (user) {
    const { data: prof } = (await supabase
      .from('profiles')
      .select('full_name, display_name, avatar_url')
      .eq('id', user.id)
      .single()) as {
      data: {
        full_name: string | null
        display_name: string | null
        avatar_url: string | null
      } | null
    }
    profile = prof
  }

  const email = user.email
  const rawName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    profile?.display_name ||
    profile?.full_name
  const displayName = rawName || email?.split('@')[0] || 'Arshid'
  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    profile?.avatar_url ||
    null

  const isGoogleUser = Boolean(
    user?.app_metadata?.provider === 'google' ||
      user?.identities?.some((id) => id.provider === 'google')
  )

  return (
    <DashboardLayoutClient
      user={{
        id: user.id,
        email,
        displayName,
        avatarUrl,
        isGoogleUser,
      }}
    >
      {children}
    </DashboardLayoutClient>
  )
}
