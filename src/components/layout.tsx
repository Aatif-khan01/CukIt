import { ReactNode } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { NoticesTicker } from "@/components/notices-ticker"
import { ScrollToTop } from "@/components/scroll-to-top"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-surface">
      <Navigation />
      <NoticesTicker />
      <main className="pt-20">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}