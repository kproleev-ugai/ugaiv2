import type React from "react"
import type { Metadata } from "next"
import { Sidebar } from "@/components/layout/sidebar"
import { TopNav } from "@/components/navigation/top-nav"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Дашборд - UGAI",
  description: "Управление бизнес-показателями",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar className="hidden lg:block" />
        <div className="flex w-full flex-1 flex-col">
          <TopNav>
            <MobileSidebar />
          </TopNav>
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
