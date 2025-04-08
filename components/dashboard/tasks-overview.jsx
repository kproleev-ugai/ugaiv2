"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

export function TasksOverview() {
  // Демо-данные
  const tasks = [
    {
      id: 1,
      title: "Обновить дизайн главной страницы",
      status: "completed",
      dueDate: "2023-06-10",
    },
    {
      id: 2,
      title: "Подготовить презентацию для клиента",
      status: "in-progress",
      dueDate: "2023-06-15",
    },
    {
      id: 3,
      title: "Исправить ошибки в API",
      status: "in-progress",
      dueDate: "2023-06-12",
    },
    {
      id: 4,
      title: "Провести интервью с кандидатом",
      status: "overdue",
      dueDate: "2023-06-05",
    },
    {
      id: 5,
      title: "Обновить документацию",
      status: "in-progress",
      dueDate: "2023-06-20",
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Выполнено"
      case "in-progress":
        return "В процессе"
      case "overdue":
        return "Просрочено"
      default:
        return ""
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Выполнено
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            В процессе
          </Badge>
        )
      case "overdue":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Просрочено
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Задачи</CardTitle>
        <CardDescription>Ваши текущие задачи и их статус</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start space-x-3">
              {getStatusIcon(task.status)}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{task.title}</p>
                  {getStatusBadge(task.status)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Срок: {new Date(task.dueDate).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Все задачи
        </Button>
      </CardFooter>
    </Card>
  )
}

