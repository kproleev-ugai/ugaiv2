"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ProjectsOverview() {
  // Демо-данные
  const projects = [
    {
      id: 1,
      name: "Редизайн веб-сайта",
      progress: 75,
      status: "active",
      dueDate: "2023-07-15",
    },
    {
      id: 2,
      name: "Мобильное приложение",
      progress: 40,
      status: "active",
      dueDate: "2023-08-30",
    },
    {
      id: 3,
      name: "Маркетинговая кампания",
      progress: 90,
      status: "active",
      dueDate: "2023-06-20",
    },
    {
      id: 4,
      name: "Интеграция CRM",
      progress: 10,
      status: "planning",
      dueDate: "2023-09-10",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Активен
          </Badge>
        )
      case "planning":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Планирование
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
            Завершен
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Проекты</CardTitle>
        <CardDescription>Ваши текущие проекты и их прогресс</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{project.name}</h3>
                {getStatusBadge(project.status)}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Прогресс: {project.progress}%</span>
                <span>Срок: {new Date(project.dueDate).toLocaleDateString("ru-RU")}</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Все проекты
        </Button>
      </CardFooter>
    </Card>
  )
}

