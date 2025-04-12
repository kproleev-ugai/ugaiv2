import { AnalyticsLayout } from "@/components/analytics/analytics-layout"
import type { ReactNode } from "react"

export default function AnalyticsPageLayout({ children }: { children: ReactNode }) {
  return <AnalyticsLayout>{children}</AnalyticsLayout>
}
