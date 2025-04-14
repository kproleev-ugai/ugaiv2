"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Target, LineChart, BarChart3, Clock, ChevronUp, ChevronDown, HelpCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function MyKPIPage() {
  const [period, setPeriod] = useState("quarter")

  // Примеры данных для KPI
  const kpiData = [
    {
      id: 1,
      name: "Конверсия лидов",
      value: 68,
      target: 75,
      trend: "up",
      change: "+5%",
      category: "sales",
      description: "Процент лидов, конвертированных в клиентов",
      owner: "Иван Иванов",
      lastUpdated: "10.04.2025",
    },
    {
      id: 2,
      name: "Средний чек",
      value: 12500,
      target: 15000,
      trend: "up",
      change: "+8%",
      category: "sales",
      description: "Средняя сумма заказа",
      owner: "Иван Иванов",
      lastUpdated: "10.04.2025",
    },
    {
      id: 3,
      name: "Удержание клиентов",
      value: 82,
      target: 85,
      trend: "down",
      change: "-3%",
      category: "customer",
      description: "Процент клиентов, совершивших повторную покупку",
      owner: "Иван Иванов",
      lastUpdated: "09.04.2025",
    },
    {
      id: 4,
      name: "Выполнение плана",
      value: 92,
      target: 100,
      trend: "up",
      change: "+12%",
      category: "performance",
      description: "Процент выполнения квартального плана продаж",
      owner: "Иван Иванов",
      lastUpdated: "08.04.2025",
    },
    {
      id: 5,
      name: "NPS",
      value: 65,
      target: 70,
      trend: "up",
      change: "+5%",
      category: "customer",
      description: "Индекс потребительской лояльности",
      owner: "Иван Иванов",
      lastUpdated: "07.04.2025",
    },
    {
      id: 6,
      name: "Время закрытия сделки",
      value: 14,
      target: 10,
      trend: "down",
      change: "-2 дня",
      category: "sales",
      description: "Среднее время от первого контакта до закрытия сделки (в днях)",
      owner: "Иван Иванов",
      lastUpdated: "05.04.2025",
    },
  ]

  // Функция для определения статуса KPI
  const getKpiStatus = (value: number, target: number) => {
    const percentage = (value / target) * 100
    if (percentage >= 90) return "success"
    if (percentage >= 70) return "warning"
    return "danger"
  }

  // Функция для отображения статуса KPI
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            На цели
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Требует внимания
          </Badge>
        )
      case "danger":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Отстает
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
          <h2 className="text-2xl font-bold tracking-tight">Мои KPI</h2>
          <p className="text-muted-foreground">Отслеживание и управление вашими ключевыми показателями</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Текущий месяц</SelectItem>
              <SelectItem value="quarter">Текущий квартал</SelectItem>
              <SelectItem value="year">Текущий год</SelectItem>
              <SelectItem value="custom">Пользовательский</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Экспорт</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{kpi.name}</CardTitle>
                  <CardDescription>{kpi.description}</CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Владелец: {kpi.owner}</p>
                      <p>Обновлено: {kpi.lastUpdated}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">
                  {typeof kpi.value === "number" && kpi.value > 100
                    ? kpi.value.toLocaleString()
                    : `${kpi.value}${typeof kpi.value === "number" && kpi.value <= 100 ? "%" : ""}`}
                </div>
                <div className="flex items-center">
                  {kpi.trend === "up" ? (
                    <div className="flex items-center text-green-500">
                      <ChevronUp className="h-4 w-4" />
                      <span>{kpi.change}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500">
                      <ChevronDown className="h-4 w-4" />
                      <span>{kpi.change}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span>
                    Цель:{" "}
                    {typeof kpi.target === "number" && kpi.target > 100
                      ? kpi.target.toLocaleString()
                      : `${kpi.target}${typeof kpi.target === "number" && kpi.target <= 100 ? "%" : ""}`}
                  </span>
                  <span>{Math.round((kpi.value / kpi.target) * 100)}%</span>
                </div>
                <Progress value={(kpi.value / kpi.target) * 100} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="pt-2">{getStatusBadge(getKpiStatus(kpi.value, kpi.target))}</CardFooter>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">Таблица</TabsTrigger>
          <TabsTrigger value="charts">Графики</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Детальная информация</CardTitle>
              <CardDescription>Полная информация о ваших KPI</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Текущее</TableHead>
                    <TableHead>Цель</TableHead>
                    <TableHead>Прогресс</TableHead>
                    <TableHead>Изменение</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kpiData.map((kpi) => (
                    <TableRow key={kpi.id}>
                      <TableCell className="font-medium">{kpi.name}</TableCell>
                      <TableCell className="capitalize">{kpi.category}</TableCell>
                      <TableCell>
                        {typeof kpi.value === "number" && kpi.value > 100
                          ? kpi.value.toLocaleString()
                          : `${kpi.value}${typeof kpi.value === "number" && kpi.value <= 100 ? "%" : ""}`}
                      </TableCell>
                      <TableCell>
                        {typeof kpi.target === "number" && kpi.target > 100
                          ? kpi.target.toLocaleString()
                          : `${kpi.target}${typeof kpi.target === "number" && kpi.target <= 100 ? "%" : ""}`}
                      </TableCell>
                      <TableCell>{Math.round((kpi.value / kpi.target) * 100)}%</TableCell>
                      <TableCell className={kpi.trend === "up" ? "text-green-500" : "text-red-500"}>
                        {kpi.trend === "up" ? "↑" : "↓"} {kpi.change}
                      </TableCell>
                      <TableCell>{getStatusBadge(getKpiStatus(kpi.value, kpi.target))}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Динамика показателей</CardTitle>
                <CardDescription>Изменение KPI за выбранный период</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground flex flex-col items-center">
                  <LineChart className="h-10 w-10 mb-2" />
                  <p>Графики динамики KPI будут доступны здесь</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Сравнение с целями</CardTitle>
                <CardDescription>Текущие значения относительно целевых</CardDescription>
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

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>История изменений</CardTitle>
              <CardDescription>Отслеживание изменений ваших KPI</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {kpiData.slice(0, 3).map((kpi) => (
                  <div key={kpi.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="font-medium mb-2">{kpi.name}</div>
                    <div className="space-y-2">
                      <div className="flex items-start text-sm">
                        <div className="mr-2 mt-0.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p>
                            Значение изменено с {kpi.value - 5} на {kpi.value}
                          </p>
                          <p className="text-muted-foreground">10.04.2025, 15:30 • Иван Иванов</p>
                        </div>
                      </div>
                      <div className="flex items-start text-sm">
                        <div className="mr-2 mt-0.5">
                          <Target className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p>
                            Цель изменена с {kpi.target - 5} на {kpi.target}
                          </p>
                          <p className="text-muted-foreground">05.04.2025, 10:15 • Мария Петрова</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
