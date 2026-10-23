import { PublicLayoutWrapper } from './public-layout-wrapper'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
}
