"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Clock, CheckCircle2, AlertCircle, MoreHorizontal, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

type ProjectStatus = "completed" | "in-progress" | "not-started" | "delayed"

interface Project {
  id: number
  name: string
  description: string
  status: ProjectStatus
  progress: number
  dueDate: string
  role: string
  members: {
    name: string
    avatar?: string
  }[]
  tasks: {
    total: number
    completed: number
  }
}

export default function MyProjectsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Примеры данных для проектов
  const projects: Project[] = [
    {
      id: 1,
      name: "Редизайн веб-сайта",
      description: "Обновление дизайна и функциональности корпоративного веб-сайта",
      status: "in-progress",
      progress: 75,
      dueDate: "15.05.2025",
      role: "Маркетолог",
      members: [
        { name: "Иван Иванов", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Мария Петрова", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Алексей Смирнов", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Елена Козлова", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Дмитрий Соколов", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: {
        total: 24,
        completed: 18,
      },
    },
    {
      id: 2,
      name: "Маркетинговая кампания",
      description: "Планирование и реализация маркетинговой кампании для нового продукта",
      status: "not-started",
      progress: 0,
      dueDate: "10.07.2025",
      role: "Руководитель проекта",
      members: [
        { name: "Иван Иванов", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Мария Петрова", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Алексей Смирнов", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: {
        total: 18,
        completed: 0,
      },
    },
    {
      id: 3,
      name: "Обучение персонала",
      description: "Разработка и проведение обучающих программ для сотрудников",
      status: "in-progress",
      progress: 60,
      dueDate: "15.05.2025",
      role: "Тренер",
      members: [
        { name: "Иван Иванов", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Мария Петрова", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Елена Козлова", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: {
        total: 12,
        completed: 7,
      },
    },
    {
      id: 4,
      name: "Обновление CRM",
      description: "Обновление и оптимизация системы управления взаимоотношениями с клиентами",
      status: "completed",
      progress: 100,
      dueDate: "01.04.2025",
      role: "Аналитик",
      members: [
        { name: "Иван Иванов", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Алексей Смирнов", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Елена Козлова", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Дмитрий Соколов", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: {
        total: 32,
        completed: 32,
      },
    },
    {
      id: 5,
      name: "Интеграция API",
      description: "Интеграция сторонних API для расширения функциональности платформы",
      status: "delayed",
      progress: 35,
      dueDate: "20.03.2025",
      role: "Консультант",
      members: [
        { name: "Иван Иванов", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Дмитрий Соколов", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: {
        total: 15,
        completed: 5,
      },
    },
  ]

  // Фильтрация проектов
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Функция для отображения статуса проекта
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Завершен
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="mr-1 h-3 w-3" />В процессе
          </Badge>
        )
      case "not-started":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <Clock className="mr-1 h-3 w-3" />
            Не начат
          </Badge>
        )
      case "delayed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Просрочен
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Мои проекты</h2>
          <p className="text-muted-foreground">Проекты, в которых вы участвуете</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Новый проект
        </Button>
      </div>

      <Separator />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск проектов..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Все статусы" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="completed">Завершенные</SelectItem>
              <SelectItem value="in-progress">В процессе</SelectItem>
              <SelectItem value="not-started">Не начатые</SelectItem>
              <SelectItem value="delayed">Просроченные</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
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
                    <DropdownMenuItem>Просмотреть детали</DropdownMenuItem>
                    <DropdownMenuItem>Задачи проекта</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Выйти из проекта</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-3 flex-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Прогресс</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Задачи</span>
                  <span>
                    {project.tasks.completed}/{project.tasks.total}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Срок</span>
                  <span>{project.dueDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Роль</span>
                  <span>{project.role}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Команда</span>
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 4).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 4 && (
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
                        +{project.members.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-3">
              <div className="flex items-center justify-between w-full">
                {getStatusBadge(project.status)}
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/projects/${project.id}`}>Открыть</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
