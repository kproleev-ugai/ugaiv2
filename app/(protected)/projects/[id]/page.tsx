"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  MoreHorizontal,
  ChevronLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  FileText,
  MessageSquare,
  BarChart3,
  Download,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Task {
  id: number
  name: string
  status: "completed" | "in-progress" | "not-started" | "delayed"
  assignee: string
  assigneeAvatar: string
  dueDate: string
  priority: "high" | "medium" | "low"
}

interface TeamMember {
  id: number
  name: string
  avatar: string
  role: string
  tasksCompleted: number
  tasksTotal: number
}

interface Document {
  id: number
  name: string
  type: string
  updatedAt: string
  size: string
}

interface Activity {
  id: number
  user: string
  userAvatar: string
  action: string
  date: string
  time: string
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  // Имитация данных проекта
  const project = {
    id: Number.parseInt(params.id),
    name: "Редизайн веб-сайта",
    description: "Обновление дизайна и функциональности корпоративного веб-сайта",
    status: "in-progress" as const,
    progress: 75,
    startDate: "01.02.2025",
    dueDate: "15.05.2025",
    budget: "₽450,000",
    spent: "₽320,000",
    client: "ООО Технологии Будущего",
    manager: "Иван Иванов",
    managerAvatar: "/placeholder.svg?height=32&width=32",
  }

  // Имитация задач проекта
  const tasks: Task[] = [
    {
      id: 1,
      name: "Анализ текущего сайта",
      status: "completed",
      assignee: "Мария Петрова",
      assigneeAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "15.02.2025",
      priority: "high",
    },
    {
      id: 2,
      name: "Разработка прототипов",
      status: "completed",
      assignee: "Алексей Смирнов",
      assigneeAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "01.03.2025",
      priority: "high",
    },
    {
      id: 3,
      name: "Дизайн главной страницы",
      status: "in-progress",
      assignee: "Елена Козлова",
      assigneeAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "20.03.2025",
      priority: "medium",
    },
    {
      id: 4,
      name: "Дизайн внутренних страниц",
      status: "in-progress",
      assignee: "Елена Козлова",
      assigneeAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "10.04.2025",
      priority: "medium",
    },
    {
      id: 5,
      name: "Верстка главной страницы",
      status: "not-started",
      assignee: "Алексей Смирнов",
      assigneeAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "25.04.2025",
      priority: "medium",
    },
    {
      id: 6,
      name: "Тестирование и запуск",
      status: "not-started",
      assignee: "Мария Петрова",
      assigneeAvatar: "/placeholder.svg?height=32&width=32",
      dueDate: "10.05.2025",
      priority: "high",
    },
  ]

  // Имитация команды проекта
  const team: TeamMember[] = [
    {
      id: 1,
      name: "Иван Иванов",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Проектный менеджер",
      tasksCompleted: 5,
      tasksTotal: 8,
    },
    {
      id: 2,
      name: "Мария Петрова",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "UX Дизайнер",
      tasksCompleted: 7,
      tasksTotal: 10,
    },
    {
      id: 3,
      name: "Алексей Смирнов",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "Frontend Разработчик",
      tasksCompleted: 4,
      tasksTotal: 12,
    },
    {
      id: 4,
      name: "Елена Козлова",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "UI Дизайнер",
      tasksCompleted: 6,
      tasksTotal: 9,
    },
  ]

  // Имитация документов проекта
  const documents: Document[] = [
    {
      id: 1,
      name: "Техническое задание.pdf",
      type: "pdf",
      updatedAt: "10.02.2025",
      size: "2.4 МБ",
    },
    {
      id: 2,
      name: "Прототипы.sketch",
      type: "sketch",
      updatedAt: "28.02.2025",
      size: "15.7 МБ",
    },
    {
      id: 3,
      name: "Дизайн-макеты.zip",
      type: "zip",
      updatedAt: "15.03.2025",
      size: "34.2 МБ",
    },
  ]

  // Имитация активности проекта
  const activities: Activity[] = [
    {
      id: 1,
      user: "Елена Козлова",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "обновила дизайн главной страницы",
      date: "12.04.2025",
      time: "14:30",
    },
    {
      id: 2,
      user: "Иван Иванов",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "добавил новую задачу: Оптимизация изображений",
      date: "10.04.2025",
      time: "11:15",
    },
    {
      id: 3,
      user: "Мария Петрова",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "завершила задачу: Анализ текущего сайта",
      date: "15.02.2025",
      time: "16:45",
    },
    {
      id: 4,
      user: "Алексей Смирнов",
      userAvatar: "/placeholder.svg?height=32&width=32",
      action: "загрузил документ: Прототипы.sketch",
      date: "28.02.2025",
      time: "09:20",
    },
  ]

  const getStatusBadge = (status: "completed" | "in-progress" | "not-started" | "delayed") => {
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

  const getPriorityBadge = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">Высокий</Badge>
      case "medium":
        return <Badge className="bg-yellow-500">Средний</Badge>
      case "low":
        return <Badge className="bg-green-500">Низкий</Badge>
      default:
        return null
    }
  }

  const handleDeleteProject = () => {
    toast({
      title: "Проект удален",
      description: `Проект "${project.name}" был удален`,
    })
    router.push("/projects")
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/projects")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{project.name}</h2>
            <div className="flex items-center space-x-2">
              {getStatusBadge(project.status)}
              <span className="text-muted-foreground">Срок: {project.dueDate}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Редактировать
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие нельзя отменить. Проект будет безвозвратно удален из системы вместе со всеми связанными
                  задачами и документами.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteProject}>Удалить</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Separator />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="tasks">Задачи ({tasks.length})</TabsTrigger>
          <TabsTrigger value="team">Команда ({team.length})</TabsTrigger>
          <TabsTrigger value="documents">Документы ({documents.length})</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Информация о проекте</CardTitle>
                <CardDescription>Основные сведения о проекте</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Описание</p>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Дата начала</p>
                    <p className="text-sm text-muted-foreground">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Дата завершения</p>
                    <p className="text-sm text-muted-foreground">{project.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Бюджет</p>
                    <p className="text-sm text-muted-foreground">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Израсходовано</p>
                    <p className="text-sm text-muted-foreground">{project.spent}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Клиент</p>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Менеджер</p>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={project.managerAvatar} alt={project.manager} />
                        <AvatarFallback>{project.manager.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-muted-foreground">{project.manager}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Прогресс проекта</CardTitle>
                <CardDescription>Текущий статус выполнения проекта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Общий прогресс</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Статус задач</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center rounded-md border p-3">
                      <div className="text-2xl font-bold text-green-600">
                        {tasks.filter((task) => task.status === "completed").length}
                      </div>
                      <div className="text-xs text-muted-foreground">Завершено</div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-md border p-3">
                      <div className="text-2xl font-bold text-blue-600">
                        {tasks.filter((task) => task.status === "in-progress").length}
                      </div>
                      <div className="text-xs text-muted-foreground">В процессе</div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-md border p-3">
                      <div className="text-2xl font-bold text-gray-600">
                        {tasks.filter((task) => task.status === "not-started").length}
                      </div>
                      <div className="text-xs text-muted-foreground">Не начато</div>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-md border p-3">
                      <div className="text-2xl font-bold text-red-600">
                        {tasks.filter((task) => task.status === "delayed").length}
                      </div>
                      <div className="text-xs text-muted-foreground">Просрочено</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Бюджет</span>
                    <span>
                      {(Number.parseInt(project.spent.replace(/[^\d]/g, "")) /
                        Number.parseInt(project.budget.replace(/[^\d]/g, ""))) *
                        100}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      (Number.parseInt(project.spent.replace(/[^\d]/g, "")) /
                        Number.parseInt(project.budget.replace(/[^\d]/g, ""))) *
                      100
                    }
                    className="h-2"
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Израсходовано: {project.spent}</span>
                    <span>Бюджет: {project.budget}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Последние задачи</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-center">
                      <div className="mr-2">
                        {task.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : task.status === "in-progress" ? (
                          <Clock className="h-5 w-5 text-blue-500" />
                        ) : task.status === "delayed" ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">{task.name}</p>
                        <p className="text-xs text-muted-foreground">Срок: {task.dueDate}</p>
                      </div>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assigneeAvatar} alt={task.assignee} />
                        <AvatarFallback>{task.assignee.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("tasks")}>
                  Все задачи
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Команда проекта</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {team.slice(0, 3).map((member) => (
                    <div key={member.id} className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {member.tasksCompleted}/{member.tasksTotal}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("team")}>
                  Вся команда
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Последние документы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.slice(0, 3).map((document) => (
                    <div key={document.id} className="flex items-center">
                      <div className="mr-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">{document.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {document.updatedAt} • {document.size}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("documents")}>
                  Все документы
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Задачи проекта</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить задачу
            </Button>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        {task.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : task.status === "in-progress" ? (
                          <Clock className="h-5 w-5 text-blue-500" />
                        ) : task.status === "delayed" ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{task.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusBadge(task.status)}
                          <span className="text-xs text-muted-foreground">Срок: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assigneeAvatar} alt={task.assignee} />
                          <AvatarFallback>{task.assignee.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{task.assignee}</span>
                      </div>
                      {getPriorityBadge(task.priority)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                          <DropdownMenuItem>Редактировать</DropdownMenuItem>
                          <DropdownMenuItem>Изменить статус</DropdownMenuItem>
                          <DropdownMenuItem>Назначить</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Команда проекта</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить участника
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Выполнено задач</span>
                        <span>
                          {member.tasksCompleted}/{member.tasksTotal}
                        </span>
                      </div>
                      <Progress value={(member.tasksCompleted / member.tasksTotal) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Сообщение
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Статистика
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Документы проекта</h3>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить документ
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((document) => (
              <Card key={document.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <FileText className="h-16 w-16 text-blue-500 mb-4" />
                    <h4 className="font-medium">{document.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {document.updatedAt} • {document.size}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Просмотреть
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Скачать
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 mt-6">
          <h3 className="text-lg font-medium">Активность проекта</h3>
          <div className="space-y-4">
            {activities.map((activity) => (
              <Card key={activity.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.userAvatar} alt={activity.user} />
                      <AvatarFallback>{activity.user.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.date} в {activity.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
