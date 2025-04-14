"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  FileText,
  BarChart3,
  MessageSquare,
  Calendar,
  Plus,
  ChevronLeft,
} from "lucide-react"
import Link from "next/link"
import { useProjects, type Project, type ProjectStatus } from "@/hooks/use-projects"
import { useTasks, type Task } from "@/hooks/use-tasks"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { projects } = useProjects()
  const { tasks } = useTasks()
  const [project, setProject] = useState<Project | null>(null)
  const [projectTasks, setProjectTasks] = useState<Task[]>([])

  useEffect(() => {
    // Находим проект по ID
    const foundProject = projects.find((p) => p.id === Number(id))
    if (foundProject) {
      setProject(foundProject)
    }

    // Фильтруем задачи, относящиеся к этому проекту
    const filteredTasks = tasks.filter((task) => task.project === foundProject?.name)
    setProjectTasks(filteredTasks)
  }, [id, projects, tasks])

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

  // Функция для отображения приоритета задачи
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Высокий</Badge>
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Средний
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Низкий
          </Badge>
        )
      default:
        return null
    }
  }

  // Функция для отображения статуса задачи
  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Новая
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            В работе
          </Badge>
        )
      case "review":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            На проверке
          </Badge>
        )
      case "done":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Выполнена
          </Badge>
        )
      default:
        return null
    }
  }

  if (!project) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Проект не найден</CardTitle>
            <CardDescription>Проект с указанным идентификатором не существует</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/my-projects">Вернуться к списку проектов</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/my-projects">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">{project.name}</h2>
        {getStatusBadge(project.status)}
      </div>

      <p className="text-muted-foreground">{project.description}</p>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Общая информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Прогресс</span>
                <span>{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Срок</p>
                <p className="font-medium">{project.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Роль</p>
                <p className="font-medium">{project.role}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Задачи</p>
                <p className="font-medium">
                  {project.tasks.completed}/{project.tasks.total}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Участники</p>
                <p className="font-medium">{project.members.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Команда проекта</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.members.map((member, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    {index === 0 ? (
                      <p className="text-xs text-muted-foreground">Руководитель проекта</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">Участник</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Управление командой
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Активность</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Аватар" />
                    <AvatarFallback>ИИ</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Иван Иванов</span> завершил задачу{" "}
                    <span className="font-medium">Обновить документацию</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Сегодня, 10:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Аватар" />
                    <AvatarFallback>МП</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Мария Петрова</span> добавила комментарий к задаче{" "}
                    <span className="font-medium">Подготовить презентацию</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Вчера, 15:45</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Аватар" />
                    <AvatarFallback>АС</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Алексей Смирнов</span> создал новую задачу{" "}
                    <span className="font-medium">Тестирование функционала</span>
                  </p>
                  <p className="text-xs text-muted-foreground">10.04.2025</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              Все обновления
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Separator />

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">Задачи</TabsTrigger>
          <TabsTrigger value="documents">Документы</TabsTrigger>
          <TabsTrigger value="calendar">Календарь</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Задачи проекта</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Новая задача
            </Button>
          </div>

          {projectTasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Нет задач</h3>
                <p className="text-sm text-muted-foreground">В этом проекте пока нет задач</p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Создать задачу
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {projectTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{task.title}</h3>
                          <Button variant="ghost" size="sm">
                            Подробнее
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <div className="flex justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{task.deadline}</span>
                          </div>
                          {getPriorityBadge(task.priority)}
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            <span>{task.assignee}</span>
                          </div>
                          {getTaskStatusBadge(task.status)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Документы проекта</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить документ
            </Button>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Нет документов</h3>
              <p className="text-sm text-muted-foreground">В этом проекте пока нет документов</p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Добавить документ
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Календарь проекта</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить событие
            </Button>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Нет событий</h3>
              <p className="text-sm text-muted-foreground">В этом проекте пока нет событий</p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Добавить событие
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Аналитика проекта</h3>
            <Button variant="outline">Экспорт</Button>
          </div>

          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Аналитика недоступна</h3>
              <p className="text-sm text-muted-foreground">
                Аналитика будет доступна после добавления задач и прогресса
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
