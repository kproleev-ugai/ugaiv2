"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  CheckSquare,
  Clock,
  Filter,
  Plus,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Target,
  User,
  Tag,
  FolderOpen,
} from "lucide-react"
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

interface Task {
  id: number
  title: string
  description: string
  status: "new" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  deadline: string
  assignee: string
  project?: string
  tags: string[]
  kpi?: string
}

export default function MyTasksPage() {
  const [filter, setFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Примеры данных для задач
  const tasks: Task[] = [
    {
      id: 1,
      title: "Подготовить отчет по маркетингу",
      description: "Создать ежемесячный отчет по эффективности маркетинговых кампаний",
      status: "in-progress",
      priority: "high",
      deadline: "Сегодня, 18:00",
      assignee: "Иван Иванов",
      project: "Маркетинговая аналитика",
      tags: ["отчет", "маркетинг"],
      kpi: "Конверсия лидов",
    },
    {
      id: 2,
      title: "Созвон с командой разработки",
      description: "Обсудить статус текущих задач и планы на следующую неделю",
      status: "new",
      priority: "medium",
      deadline: "Завтра, 10:30",
      assignee: "Иван Иванов",
      project: "Внутренние коммуникации",
      tags: ["встреча", "команда"],
    },
    {
      id: 3,
      title: "Обновить презентацию для клиента",
      description: "Внести правки в презентацию по результатам последней встречи",
      status: "review",
      priority: "medium",
      deadline: "12.04.2025",
      assignee: "Иван Иванов",
      project: "Проект А",
      tags: ["презентация", "клиент"],
    },
    {
      id: 4,
      title: "Ревью квартальных KPI",
      description: "Проанализировать выполнение KPI за квартал и подготовить рекомендации",
      status: "new",
      priority: "high",
      deadline: "15.04.2025",
      assignee: "Иван Иванов",
      project: "Стратегическое планирование",
      tags: ["kpi", "аналитика"],
      kpi: "Выполнение плана",
    },
    {
      id: 5,
      title: "Подготовить материалы для тренинга",
      description: "Разработать программу и материалы для тренинга новых сотрудников",
      status: "in-progress",
      priority: "medium",
      deadline: "20.04.2025",
      assignee: "Иван Иванов",
      project: "Обучение персонала",
      tags: ["тренинг", "обучение"],
    },
    {
      id: 6,
      title: "Оптимизировать воронку продаж",
      description: "Проанализировать и оптимизировать этапы воронки продаж для увеличения конверсии",
      status: "new",
      priority: "high",
      deadline: "25.04.2025",
      assignee: "Иван Иванов",
      project: "Оптимизация продаж",
      tags: ["продажи", "конверсия"],
      kpi: "Средний чек",
    },
    {
      id: 7,
      title: "Обновить документацию по продукту",
      description: "Актуализировать документацию в соответствии с последними изменениями",
      status: "done",
      priority: "low",
      deadline: "05.04.2025",
      assignee: "Иван Иванов",
      project: "Документация",
      tags: ["документация", "продукт"],
    },
    {
      id: 8,
      title: "Анализ удовлетворенности клиентов",
      description: "Провести анализ результатов опроса удовлетворенности клиентов",
      status: "done",
      priority: "medium",
      deadline: "03.04.2025",
      assignee: "Иван Иванов",
      project: "Клиентский опыт",
      tags: ["клиенты", "аналитика"],
      kpi: "NPS",
    },
  ]

  // Фильтрация задач
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

    if (filter === "all") return matchesSearch && matchesStatus && matchesPriority
    if (filter === "today")
      return task.deadline.includes("Сегодня") && matchesSearch && matchesStatus && matchesPriority
    if (filter === "upcoming")
      return (
        !task.deadline.includes("Сегодня") &&
        task.status !== "done" &&
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      )
    if (filter === "completed") return task.status === "done" && matchesSearch && matchesStatus && matchesPriority

    return false
  })

  // Функция для отображения статуса задачи
  const getStatusBadge = (status: string) => {
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

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Мои задачи</h2>
          <p className="text-muted-foreground">Управление вашими текущими задачами и проектами</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Новая задача
        </Button>
      </div>

      <Separator />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск задач..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="new">Новые</SelectItem>
              <SelectItem value="in-progress">В работе</SelectItem>
              <SelectItem value="review">На проверке</SelectItem>
              <SelectItem value="done">Выполненные</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Приоритет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все приоритеты</SelectItem>
              <SelectItem value="high">Высокий</SelectItem>
              <SelectItem value="medium">Средний</SelectItem>
              <SelectItem value="low">Низкий</SelectItem>
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

      <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Все задачи</TabsTrigger>
          <TabsTrigger value="today">На сегодня</TabsTrigger>
          <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
          <TabsTrigger value="completed">Выполненные</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <CheckSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Нет задач</h3>
                <p className="text-sm text-muted-foreground">У вас нет задач, соответствующих выбранным фильтрам</p>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{task.title}</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuItem>Редактировать</DropdownMenuItem>
                            <DropdownMenuItem>Изменить статус</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
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
                          <User className="mr-1 h-4 w-4" />
                          <span>{task.assignee}</span>
                        </div>
                        {getStatusBadge(task.status)}
                      </div>
                      {task.project && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <FolderOpen className="mr-1 h-4 w-4" />
                          <span>{task.project}</span>
                        </div>
                      )}
                      {task.kpi && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Target className="mr-1 h-4 w-4" />
                          <span>KPI: {task.kpi}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
