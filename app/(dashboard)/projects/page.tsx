import { ProjectsHeader } from "@/components/projects/projects-header"
import { ProjectsList } from "@/components/projects/projects-list"
import { ProjectsFilters } from "@/components/projects/projects-filters"

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <ProjectsHeader />
      <ProjectsFilters />
      <ProjectsList />
    </div>
  )
}

