import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LearnerWorkspace } from '@/components/academy/learner-workspace'
import { EcosystemDiscoveryBanner } from '@/components/ecosystem/ecosystem-discovery-banner'

export const metadata: Metadata = {
  title: 'Learner Workspace — TalentXcel Academy',
  description: 'Your personalized AI-first learning and skills workspace.',
  robots: { index: false },
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = (await supabase
    .from('profiles')
    .select('full_name, display_name, avatar_url')
    .eq('id', user.id)
    .single()) as {
    data: {
      full_name: string
      display_name: string | null
      avatar_url: string | null
    } | null
  }

  const { data: enrolments } = await supabase
    .from('learning_enrolments')
    .select('*, programmes(title, thumbnail_url)')
    .eq('learner_id', user.id)
    .eq('status', 'active')

  const displayName = profile?.display_name || profile?.full_name || user.email

  return (
    <div className="min-h-screen bg-muted/10 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <EcosystemDiscoveryBanner variant="card" currentContext="learner_dashboard" />
        <LearnerWorkspace
          user={{
            id: user.id,
            email: user.email,
            displayName,
          }}
          enrolments={enrolments || []}
          isInitialEmpty={!enrolments || enrolments.length === 0}
        />
      </div>
    </div>
  )
}
