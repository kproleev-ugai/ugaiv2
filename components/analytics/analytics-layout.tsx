"use client"

import type React from "react"

import { useState } from "react"
import { SecondaryNav } from "@/components/navigation/secondary-nav"
import { FilterBar } from "@/components/analytics/filter-bar"
import { ActionSidebar } from "@/components/analytics/action-sidebar"
import { AIPanel } from "@/components/analytics/ai-panel"
import { PersonalSidebar } from "@/components/analytics/personal-sidebar"
import { useClient } from "@/contexts/client-context"
import { usePathname } from "next/navigation"
import { Home, ChevronRight } from "lucide-react"
import Link from "next/link"

export function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  const [actionSidebarCollapsed, setActionSidebarCollapsed] = useState(false)
  const [aiPanelCollapsed, setAiPanelCollapsed] = useState(true)
  const { currentClient } = useClient()
  const pathname = usePathname()

  const toggleActionSidebar = () => setActionSidebarCollapsed(!actionSidebarCollapsed)
  const toggleAiPanel = () => setAiPanelCollapsed(!aiPanelCollapsed)

  if (!currentClient) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="flex h-full bg-gray-950 text-gray-200">
      <PersonalSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Breadcrumbs */}
        <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-800 bg-gray-900 flex items-center">
          <Link href={`/${currentClient.id}`} className="hover:text-gray-200">
            <Home className="h-3.5 w-3.5" />
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1" />
          <Link href={`/${currentClient.id}`} className="hover:text-gray-200">
            {currentClient.name}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 mx-1" />
          <span className="text-gray-200">Analytics</span>
        </div>

        {/* Page Header */}
        <div className="px-6 py-3 border-b border-gray-800 bg-gray-900 flex justify-between items-center">
          <h1 className="text-lg font-medium">Analytics Dashboard</h1>
        </div>

        <SecondaryNav />
        <FilterBar />

        <div className="flex flex-1 overflow-hidden">
          <ActionSidebar collapsed={actionSidebarCollapsed} onToggle={toggleActionSidebar} />

          {/* Content Area */}
          <div className="flex-1 overflow-auto">{children}</div>

          <AIPanel collapsed={aiPanelCollapsed} onToggle={toggleAiPanel} />
        </div>
      </div>
    </div>
  )
}
