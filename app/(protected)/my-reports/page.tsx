"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Share2,
  Clock,
  Star,
  StarOff,
  FileText,
  MoreHorizontal,
  Plus,
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
import { Badge } from "@/components/ui/badge"

interface Report {
  id: number
  title: string
  description: string
  type: "dashboard" | "chart" | "table" | "custom"
  category: "marketing" | "sales" | "finance" | "performance" | "customers"
  lastViewed: string
  favorite: boolean
  shared: boolean
  chartType?: "bar" | "line" | "pie"
}

export default function MyReportsPage() {
  const [filter, setFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Примеры данных для отчетов
  const reports: Report[] = [
    {
      id: 1,
      title: "Маркетинговая эффективность",
      description: "Анализ эффективности маркетинговых кампаний по каналам",
      type: "dashboard",
      category: "marketing",
      lastViewed: "Сегодня, 10:30",
      favorite: true,
      shared: true,
    },
    {
      id: 2,
      title: "Динамика продаж",
      description: "Динамика продаж по месяцам с разбивкой по продуктам",
      type: "chart",
      category: "sales",
      lastViewed: "Вчера, 15:45",
      favorite: true,
      shared: false,
      chartType: "line",
    },
    {
      id: 3,
      title: "Финансовые показатели",
      description: "Ключевые финансовые показатели компании",
      type: "dashboard",
      category: "finance",
      lastViewed: "10.04.2025",
      favorite: false,
      shared: true,
    },
    {
      id: 4,
      title: "Воронка продаж",
      description: "Анализ конверсии на каждом этапе воронки продаж",
      type: "chart",
      category: "sales",
      lastViewed: "08.04.2025",
      favorite: false,
      shared: false,
      chartType: "bar",
    },
    {
      id: 5,
      title: "Сегментация клиентов",
      description: "Анализ клиентской базы по различным сегментам",
      type: "chart",
      category: "customers",
      lastViewed: "05.04.2025",
      favorite: true,
      shared: true,
      chartType: "pie",
    },
    {
      id: 6,
      title: "Выполнение KPI",
      description: "Отчет по выполнению ключевых показателей эффективности",
      type: "dashboard",
      category: "performance",
      lastViewed: "03.04.2025",
      favorite: false,
      shared: true,
    },
    {
      id: 7,
      title: "Анализ конкурентов",
      description: "Сравнительный анализ с ключевыми конкурентами",
      type: "custom",
      category: "marketing",
      lastViewed: "01.04.2025",
      favorite: false,
      shared: false,
    },
    {
      id: 8,
      title: "Прогноз продаж",
      description: "Прогнозирование объема продаж на следующий квартал",
      type: "chart",
      category: "sales",
      lastViewed: "28.03.2025",
      favorite: true,
      shared: true,
      chartType: "line",
    },
  ]

  // Фильтрация отчетов
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || report.category === categoryFilter

    if (filter === "all") return matchesSearch && matchesCategory
    if (filter === "favorites") return report.favorite && matchesSearch && matchesCategory
    if (filter === "shared") return report.shared && matchesSearch && matchesCategory
    if (filter === "recent") {
      const isRecent = report.lastViewed.includes("Сегодня") || report.lastViewed.includes("Вчера")
      return isRecent && matchesSearch && matchesCategory
    }

    return false
  })

  // Функция для отображения иконки типа отчета
  const getReportIcon = (type: string, chartType?: string) => {
    if (type === "chart") {
      switch (chartType) {
        case "bar":
          return <BarChart3 className="h-10 w-10 text-blue-500" />
        case "line":
          return <LineChart className="h-10 w-10 text-green-500" />
        case "pie":
          return <PieChart className="h-10 w-10 text-purple-500" />
        default:
          return <BarChart3 className="h-10 w-10 text-blue-500" />
      }
    }
    if (type === "dashboard") {
      return <BarChart3 className="h-10 w-10 text-indigo-500" />
    }
    if (type === "table") {
      return <FileText className="h-10 w-10 text-orange-500" />
    }
    return <FileText className="h-10 w-10 text-gray-500" />
  }

  // Функция для отображения категории отчета
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "marketing":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Маркетинг
          </Badge>
        )
      case "sales":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Продажи
          </Badge>
        )
      case "finance":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Финансы
          </Badge>
        )
      case "performance":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Эффективность
          </Badge>
        )
      case "customers":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Клиенты
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
          <h2 className="text-2xl font-bold tracking-tight">Мои отчеты</h2>
          <p className="text-muted-foreground">Управление вашими отчетами и дашбордами</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Создать отчет
        </Button>
      </div>

      <Separator />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск отчетов..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              <SelectItem value="marketing">Маркетинг</SelectItem>
              <SelectItem value="sales">Продажи</SelectItem>
              <SelectItem value="finance">Финансы</SelectItem>
              <SelectItem value="performance">Эффективность</SelectItem>
              <SelectItem value="customers">Клиенты</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Все отчеты</TabsTrigger>
          <TabsTrigger value="favorites">Избранные</TabsTrigger>
          <TabsTrigger value="shared">Общие</TabsTrigger>
          <TabsTrigger value="recent">Недавние</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map((report) => (
              <Card key={report.id} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription>{report.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Скачать
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          Поделиться
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {report.favorite ? (
                            <>
                              <StarOff className="mr-2 h-4 w-4" />
                              Убрать из избранного
                            </>
                          ) : (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              Добавить в избранное
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center py-6">
                  {getReportIcon(report.type, report.chartType)}
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {report.lastViewed}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getCategoryBadge(report.category)}
                    {report.favorite && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
