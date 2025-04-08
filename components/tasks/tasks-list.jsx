"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, MoreHorizontal, AlertCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TasksList() {
  // Демо-данные
  const initialTasks = [
    {
      id: 1,
      title: "Обновить дизайн главной страницы",
      description: "Редизайн главной страницы в соответствии с новым брендбуком",
      status: "completed",
      priority: "high",
      dueDate: "2023-06-10",
      project: "Редизайн сайта",
      assignee: {
        name: "Анна С.",
        avatar: "/placeholder-avatar.jpg",
        initials: "АС",
      },
      completed: true,
    },
    {
      id: 2,
      title: "Подготовить презентацию для клиента",
      description: "Создать презентацию о новых функциях продукта для встречи с клиентом",
      status: "in-progress",
      priority: "high",
      dueDate: "2023-06-15",
      project: "Маркетинговая кампания",
      assignee: {
        name: "Иван П.",
        avatar: "/placeholder-avatar.jpg",
        initials: "ИП",
      },
      completed: false,
    },
    {
      id: 3,
      title: "Исправить ошибки в API",
      description: "Устранить найденные баги в API для мобильного приложения",
      status: "in-progress",
      priority: "medium",
      dueDate: "2023-06-12",
      project: "Мобильное приложение",
      assignee: {
        name: "Алексей К.",
        avatar: "/placeholder-avatar.jpg",
        initials: "АК",
      },
      completed: false,
    },
    {
      id: 4,
      title: "Провести интервью с кандидатом",
      description: "Техническое собеседование с кандидатом на позицию frontend-разработчика",
      status: "todo",
      priority: "medium",
      dueDate: "2023-06-20",
      project: "HR",
      assignee: {
        name: "Мария И.",
        avatar: "/placeholder-avatar.jpg",
        initials: "МИ",
      },
      completed: false,
    },
    {
      id: 5,
      title: "Обновить документацию API",
      description: "Актуализировать документацию API после последних изменений",
      status: "review",
      priority: "low",
      dueDate: "2023-06-25",
      project: "Мобильное приложение",
      assignee: {
        name: "Елена С.",
        avatar: "/placeholder-avatar.jpg",
        initials: "ЕС",
      },
      completed: false,
    },
    {
      id: 6,
      title: "Настроить аналитику",
      description: "Интегрировать Google Analytics и настроить отслеживание событий",
      status: "todo",
      priority: "high",
      dueDate: "2023-06-18",
      project: "Аналитическая платформа",
      assignee: {
        name: "Дмитрий В.",
        avatar: "/placeholder-avatar.jpg",
        initials: "ДВ",
      },
      completed: false,
    },
  ]

  const [tasks, setTasks] = useState(initialTasks)

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Высокий
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Средний
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Низкий
          </Badge>
        )
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "todo":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            К выполнению
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            В процессе
          </Badge>
        )
      case "review":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
            На проверке
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Выполнено
          </Badge>
        )
      default:
        return null
    }
  }

  const isOverdue = (dueDate, completed) => {
    if (completed) return false
    const today = new Date()
    const due = new Date(dueDate)
    return due < today
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className={task.completed ? "opacity-70" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-start">
              <Checkbox
                id={`task-${task.id}`}
                className="mt-1 mr-2"
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className={task.completed ? "line-through text-muted-foreground" : ""}>
                      {task.title}
                    </CardTitle>
                    <CardDescription className="mt-1">{task.project}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Меню</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Действия</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Редактировать</DropdownMenuItem>
                      <DropdownMenuItem>Изменить статус</DropdownMenuItem>
                      <DropdownMenuItem>Назначить</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground ml-6">{task.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                  <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">{task.assignee.name}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-1 h-4 w-4" />
                <span className={isOverdue(task.dueDate, task.completed) ? "text-red-500" : ""}>
                  {isOverdue(task.dueDate, task.completed) && <AlertCircle className="mr-1 h-4 w-4 inline" />}
                  {new Date(task.dueDate).toLocaleDateString("ru-RU")}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              {getStatusBadge(task.status)}
              {getPriorityBadge(task.priority)}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

