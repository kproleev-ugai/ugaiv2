"use client"

import { useState } from "react"
import { SecondaryNav } from "@/components/navigation/secondary-nav"
import { FilterBar } from "@/components/analytics/filter-bar"
import { ActionSidebar } from "@/components/analytics/action-sidebar"
import { ContentArea } from "@/components/analytics/content-area"
import { AIPanel } from "@/components/analytics/ai-panel"
import { OKRDashboard } from "@/components/okr/okr-dashboard"
import { usePathname } from "next/navigation"
import { useClient } from "@/contexts/client-context"

export function AnalyticsDashboard() {
  const [actionSidebarCollapsed, setActionSidebarCollapsed] = useState(false)
  const [aiPanelCollapsed, setAiPanelCollapsed] = useState(false)
  const pathname = usePathname()
  const { currentClient } = useClient()

  const toggleActionSidebar = () => setActionSidebarCollapsed(!actionSidebarCollapsed)
  const toggleAiPanel = () => setAiPanelCollapsed(!aiPanelCollapsed)

  // Determine which content to show based on path
  const renderContent = () => {
    if (pathname === `/${currentClient?.id}/okr` || pathname.startsWith(`/${currentClient?.id}/okr/`)) {
      return <OKRDashboard />
    }

    return (
      <>
        <SecondaryNav />
        <FilterBar />
        <div className="flex flex-1 overflow-hidden">
          <ActionSidebar collapsed={actionSidebarCollapsed} onToggle={toggleActionSidebar} />
          <ContentArea />
          <AIPanel collapsed={aiPanelCollapsed} onToggle={toggleAiPanel} />
        </div>
      </>
    )
  }

  return <div className="flex flex-col flex-1 overflow-hidden">{renderContent()}</div>
}
