import { PublicNavbar } from '@/components/public/navbar'
import { PublicFooter } from '@/components/public/footer'
import { AdmissionsAssistantWidget } from '@/components/public/admissions-assistant-modal'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden w-full max-w-full">
      <PublicNavbar />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <AdmissionsAssistantWidget />
      <PublicFooter />
    </div>
  )
}
