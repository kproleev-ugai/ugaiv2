"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ChevronLeft, BarChart3, LineChart, PieChart, FileText } from "lucide-react"
import Link from "next/link"

export default function CreateReportPage() {
  const router = useRouter()
  const [reportType, setReportType] = useState<string>("dashboard")
  const [chartType, setChartType] = useState<string>("bar")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Имитация отправки данных на сервер
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Перенаправление на страницу отчетов
    router.push("/my-reports")
  }

  return (
    <div className="container max-w-2xl py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/my-reports">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Создание нового отчета</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация об отчете</CardTitle>
          <CardDescription>Заполните информацию о новом отчете</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="create-report-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Название отчета
              </label>
              <Input id="title" placeholder="Введите название отчета" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Описание
              </label>
              <Textarea id="description" placeholder="Введите описание отчета" rows={3} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Тип отчета</label>
              <Tabs defaultValue={reportType} onValueChange={setReportType} className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="dashboard" className="flex flex-col items-center py-3">
                    <BarChart3 className="h-5 w-5 mb-1" />
                    <span className="text-xs">Дашборд</span>
                  </TabsTrigger>
                  <TabsTrigger value="chart" className="flex flex-col items-center py-3">
                    <LineChart className="h-5 w-5 mb-1" />
                    <span className="text-xs">График</span>
                  </TabsTrigger>
                  <TabsTrigger value="table" className="flex flex-col items-center py-3">
                    <FileText className="h-5 w-5 mb-1" />
                    <span className="text-xs">Таблица</span>
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="flex flex-col items-center py-3">
                    <PieChart className="h-5 w-5 mb-1" />
                    <span className="text-xs">Другое</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {reportType === "chart" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Тип графика</label>
                <Tabs defaultValue={chartType} onValueChange={setChartType} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="bar" className="flex flex-col items-center py-3">
                      <BarChart3 className="h-5 w-5 mb-1" />
                      <span className="text-xs">Столбчатый</span>
                    </TabsTrigger>
                    <TabsTrigger value="line" className="flex flex-col items-center py-3">
                      <LineChart className="h-5 w-5 mb-1" />
                      <span className="text-xs">Линейный</span>
                    </TabsTrigger>
                    <TabsTrigger value="pie" className="flex flex-col items-center py-3">
                      <PieChart className="h-5 w-5 mb-1" />
                      <span className="text-xs">Круговой</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Категория
                </label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Маркетинг</SelectItem>
                    <SelectItem value="sales">Продажи</SelectItem>
                    <SelectItem value="finance">Финансы</SelectItem>
                    <SelectItem value="performance">Эффективность</SelectItem>
                    <SelectItem value="customers">Клиенты</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="dataSource" className="text-sm font-medium">
                  Источник данных
                </label>
                <Select>
                  <SelectTrigger id="dataSource">
                    <SelectValue placeholder="Выберите источник" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crm">CRM</SelectItem>
                    <SelectItem value="analytics">Google Analytics</SelectItem>
                    <SelectItem value="database">База данных</SelectItem>
                    <SelectItem value="manual">Ручной ввод</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="favorite">Добавить в избранное</Label>
                  <p className="text-xs text-muted-foreground">Отчет будет добавлен в раздел избранных</p>
                </div>
                <Switch id="favorite" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shared">Общий доступ</Label>
                  <p className="text-xs text-muted-foreground">Отчет будет доступен другим пользователям</p>
                </div>
                <Switch id="shared" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/my-reports">Отмена</Link>
          </Button>
          <Button type="submit" form="create-report-form" disabled={loading}>
            {loading ? "Создание..." : "Создать отчет"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
