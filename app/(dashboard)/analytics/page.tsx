import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { AnalyticsCards } from "@/components/analytics/analytics-cards"
import { SalesChart } from "@/components/analytics/sales-chart"
import { MarketingChart } from "@/components/analytics/marketing-chart"
import { ConversionFunnel } from "@/components/analytics/conversion-funnel"
import { PerformanceTable } from "@/components/analytics/performance-table"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <AnalyticsCards />

      <div className="grid gap-6 md:grid-cols-2">
        <SalesChart />
        <MarketingChart />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <PerformanceTable />
        </div>
        <div>
          <ConversionFunnel />
        </div>
      </div>
    </div>
  )
}

