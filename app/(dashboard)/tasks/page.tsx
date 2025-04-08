import { TasksHeader } from "@/components/tasks/tasks-header"
import { TasksList } from "@/components/tasks/tasks-list"
import { TasksFilters } from "@/components/tasks/tasks-filters"

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <TasksHeader />
      <TasksFilters />
      <TasksList />
    </div>
  )
}

