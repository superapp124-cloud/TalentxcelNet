import { requireAdminPage } from '@/lib/auth/server-access'
import { getAdminIntelligenceReport } from '@/lib/analytics/admin-intelligence'
import { LearningCommandCenter } from '@/components/admin/learning-command-center'

export const dynamic = 'force-dynamic'

export default async function AdminIntelligencePage() {
  await requireAdminPage('/admin/intelligence')

  const initialReport = await getAdminIntelligenceReport({
    range: '7d',
    userPage: 1,
    userPageSize: 15,
  })

  return <LearningCommandCenter initialReport={initialReport} />
}
