"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  LineChart,
  Target,
  AlertCircle,
  ArrowUpRight,
  Bell,
} from "lucide-react"
import Link from "next/link"

export default function MyWorkspacePage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Примеры данных для персонального рабочего стола
  const kpiData = [
    { name: "Конверсия лидов", value: 68, target: 75, trend: "up", change: "+5%" },
    { name: "Средний чек", value: 12500, target: 15000, trend: "up", change: "+8%" },
    { name: "Удержание клиентов", value: 82, target: 85, trend: "down", change: "-3%" },
    { name: "Выполнение плана", value: 92, target: 100, trend: "up", change: "+12%" },
  ]

  const upcomingTasks = [
    { id: 1, title: "Подготовить отчет по маркетингу", deadline: "Сегодня, 18:00", priority: "high" },
    { id: 2, title: "Созвон с командой разработки", deadline: "Завтра, 10:30", priority: "medium" },
    { id: 3, title: "Обновить презентацию для клиента", deadline: "12.04.2025", priority: "medium" },
    { id: 4, title: "Ревью квартальных KPI", deadline: "15.04.2025", priority: "high" },
  ]

  const notifications = [
    { id: 1, title: "Новый комментарий к задаче", time: "10 минут назад", type: "info" },
    { id: 2, title: "Срок выполнения задачи истекает", time: "1 час назад", type: "warning" },
    { id: 3, title: "KPI по конверсии достигнут", time: "Вчера, 15:30", type: "success" },
    { id: 4, title: "Новый документ добавлен в проект", time: "Вчера, 12:15", type: "info" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Еженедельное совещание команды", time: "Сегодня, 15:00", type: "meeting" },
    { id: 2, title: "Презентация для клиента", time: "Завтра, 11:00", type: "presentation" },
    { id: 3, title: "Дедлайн по проекту редизайна", time: "14.04.2025", type: "deadline" },
    { id: 4, title: "Тренинг по новому продукту", time: "16.04.2025", type: "training" },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Bell className="h-4 w-4 text-blue-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "presentation":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "deadline":
        return <Clock className="h-4 w-4 text-red-500" />
      case "training":
        return <Target className="h-4 w-4 text-green-500" />
      default:
        return <Calendar className="h-4 w-4 text-blue-500" />
    }
  }

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
        return <Badge variant="outline">Обычный</Badge>
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Мой рабочий стол</h2>
        <p className="text-muted-foreground">Добро пожаловать, Иван! Вот ваша персональная сводка.</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="kpi">Мои KPI</TabsTrigger>
          <TabsTrigger value="tasks">Задачи</TabsTrigger>
          <TabsTrigger value="calendar">Календарь</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {typeof kpi.value === "number" && kpi.value > 100 ? kpi.value.toLocaleString() : `${kpi.value}%`}
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>
                        Прогресс к цели ({kpi.target}
                        {typeof kpi.target === "number" && kpi.target > 100 ? "" : "%"})
                      </span>
                      <span>{Math.round((kpi.value / kpi.target) * 100)}%</span>
                    </div>
                    <Progress value={(kpi.value / kpi.target) * 100} className="h-1" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowUpRight className="mr-1 h-3 w-3 text-red-500 rotate-180" />
                    )}
                    <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>{kpi.change}</span> с
                    прошлого месяца
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ближайшие задачи</CardTitle>
                <CardDescription>Задачи, требующие вашего внимания</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">{task.title}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {task.deadline}
                        </div>
                      </div>
                      {getPriorityBadge(task.priority)}
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-4 px-0" asChild>
                  <Link href="/my-tasks">Все задачи</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Уведомления</CardTitle>
                <CardDescription>Последние обновления и оповещения</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start">
                      <div className="mr-2 mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="space-y-1">
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground">{notification.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-4 px-0" asChild>
                  <Link href="/notifications">Все уведомления</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Календарь событий</CardTitle>
              <CardDescription>Предстоящие встречи и дедлайны</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start">
                    <div className="mr-2 mt-0.5">{getEventIcon(event.type)}</div>
                    <div className="space-y-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="link" className="mt-4 px-0" asChild>
                <Link href="/calendar">Открыть календарь</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Мои ключевые показатели</CardTitle>
              <CardDescription>Отслеживание прогресса по вашим KPI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {kpiData.map((kpi, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="mr-2 h-5 w-5 text-primary" />
                        <span className="font-medium">{kpi.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {typeof kpi.value === "number" && kpi.value > 100
                            ? kpi.value.toLocaleString()
                            : `${kpi.value}%`}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{" "}
                          {typeof kpi.target === "number" && kpi.target > 100
                            ? kpi.target.toLocaleString()
                            : `${kpi.target}%`}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={(kpi.value / kpi.target) * 100} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Прогресс: {Math.round((kpi.value / kpi.target) * 100)}%</span>
                        <span className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>
                          {kpi.trend === "up" ? "↑" : "↓"} {kpi.change}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Динамика KPI</CardTitle>
                <CardDescription>Изменение показателей за последние 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground flex flex-col items-center">
                  <LineChart className="h-10 w-10 mb-2" />
                  <p>Графики динамики KPI будут доступны здесь</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Сравнение с командой</CardTitle>
                <CardDescription>Ваши показатели относительно средних по команде</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground flex flex-col items-center">
                  <BarChart3 className="h-10 w-10 mb-2" />
                  <p>Сравнительные графики будут доступны здесь</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Мои задачи</CardTitle>
              <CardDescription>Управление вашими текущими задачами</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <div className="font-medium">{task.title}</div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {task.deadline}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(task.priority)}
                      <Button variant="outline" size="sm">
                        Выполнено
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/my-tasks">Все задачи</Link>
                </Button>
                <Button>Создать задачу</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Мой календарь</CardTitle>
              <CardDescription>Предстоящие события и встречи</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start">
                      <div className="mr-2 mt-0.5">{getEventIcon(event.type)}</div>
                      <div className="space-y-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">{event.time}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/calendar">Полный календарь</Link>
                </Button>
                <Button>Добавить событие</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
