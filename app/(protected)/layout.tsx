"use client"

import type React from "react"
import { useState } from "react"
import { TopNav } from "@/components/navigation/top-nav"
import { SideNav } from "@/components/navigation/side-nav"
import { usePathname } from "next/navigation"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // Default to collapsed for more space
  const pathname = usePathname()

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav toggleSidebar={toggleSidebar} />
      <div className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 dark:bg-gray-800/50">
        UGAI / ItStep /{" "}
        {pathname.split("/")[1]?.charAt(0).toUpperCase() + pathname.split("/")[1]?.slice(1) || "Dashboard"}
      </div>
      <div className="flex flex-1 overflow-hidden">
        <SideNav collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
