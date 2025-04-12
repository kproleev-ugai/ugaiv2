"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal, Plus, Search, Filter, ArrowUpDown, CheckCircle2, Clock, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SecondaryNav } from "@/components/navigation/secondary-nav"

type ProjectStatus = "completed" | "in-progress" | "not-started" | "delayed"

interface Project {
  id: number
  name: string
  description: string
  status: ProjectStatus
  progress: number
  dueDate: string
  members: number
  tasks: {
    total: number
    completed: number
  }
}

const projects: Project[] = [
  {
    id: 1,
    name: "Редизайн веб-сайта",
    description: "Обновление дизайна и функциональности корпоративного веб-сайта",
    status: "in-progress",
    progress: 75,
    dueDate: "15.05.2025",
    members: 5,
    tasks: {
      total: 24,
      completed: 18,
    },
  },
  {
    id: 2,
    name: "Мобильное приложение",
    description: "Разработка мобильного приложения для iOS и Android",
    status: "in-progress",
    progress: 45,
    dueDate: "30.06.2025",
    members: 8,
    tasks: {
      total: 56,
      completed: 25,
    },
  },
  {
    id: 3,
    name: "Маркетинговая кампания",
    description: "Планирование и реализация маркетинговой кампании для нового продукта",
    status: "not-started",
    progress: 0,
    dueDate: "10.07.2025",
    members: 3,
    tasks: {
      total: 18,
      completed: 0,
    },
  },
  {
    id: 4,
    name: "Обновление CRM",
    description: "Обновление и оптимизация системы управления взаимоотношениями с клиентами",
    status: "completed",
    progress: 100,
    dueDate: "01.04.2025",
    members: 4,
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
    members: 2,
    tasks: {
      total: 15,
      completed: 5,
    },
  },
  {
    id: 6,
    name: "Обучение персонала",
    description: "Разработка и проведение обучающих программ для сотрудников",
    status: "in-progress",
    progress: 60,
    dueDate: "15.05.2025",
    members: 3,
    tasks: {
      total: 12,
      completed: 7,
    },
  },
]

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

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <>
      <SecondaryNav />
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Проекты</h2>
            <p className="text-muted-foreground">Управляйте своими проектами и отслеживайте их прогресс</p>
          </div>
          <Button asChild>
            <Link href="/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Новый проект
            </Link>
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
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Сортировка
            </Button>
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
                      <DropdownMenuItem>Редактировать проект</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Удалить проект</DropdownMenuItem>
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
                    <span className="text-muted-foreground">Участники</span>
                    <span>{project.members}</span>
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
    </>
  )
}
