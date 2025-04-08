import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { PerformanceChart } from "@/components/dashboard/performance-chart"
import { TasksOverview } from "@/components/dashboard/tasks-overview"
import { ProjectsOverview } from "@/components/dashboard/projects-overview"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <TasksOverview />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProjectsOverview />
        <RecentActivity />
      </div>
    </div>
  )
}

