"use client"

import Link from "next/link"
import { Clock, ExternalLink } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type RecentProject = {
  id: string
  name: string
  company: string
  lastVisited: string
  category: string
  progress: number
}

interface RecentProjectsProps {
  projects: RecentProject[]
}

export function RecentProjects({ projects }: RecentProjectsProps) {
  if (!projects.length) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <h3 className="text-lg font-medium">Недавние проекты</h3>
        <Link href="/projects" className="ml-auto text-sm text-muted-foreground hover:text-primary flex items-center">
          Все проекты
          <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{project.name}</CardTitle>
                <Badge variant="outline">{project.category}</Badge>
              </div>
              <CardDescription>{project.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${project.progress}%` }} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                {project.lastVisited}
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/projects/${project.id}`}>Открыть</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
