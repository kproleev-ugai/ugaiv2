"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw, Filter, Share2, Brain } from "lucide-react"
import { RevenueChart } from "./charts/revenue-chart"
import { ConversionChart } from "./charts/conversion-chart"
import { ChannelPerformance } from "./charts/channel-performance"
import { CustomerSegments } from "./charts/customer-segments"
import { KPICards } from "./kpi-cards"
import { FilterBar } from "./filter-bar"
import { AIPanel } from "./ai-panel"

interface AnalyticsDashboardProps {
  clientId: string
  analyticsData: any
}

export function AnalyticsDashboard({ clientId, analyticsData }: AnalyticsDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showFilters, setShowFilters] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  })

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Аналитика</h1>
          <p className="text-muted-foreground">Анализ ключевых показателей и метрик</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker value={dateRange} onChange={setDateRange} align="end" locale="ru" className="w-auto" />
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon" onClick={() => setShowAI(!showAI)}>
            <Brain className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showFilters && <FilterBar onClose={() => setShowFilters(false)} />}
      {showAI && <AIPanel onClose={() => setShowAI(false)} />}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-auto md:inline-grid">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="acquisition">Привлечение</TabsTrigger>
          <TabsTrigger value="behavior">Поведение</TabsTrigger>
          <TabsTrigger value="conversion">Конверсия</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <KPICards />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Доход</CardTitle>
                <CardDescription>Динамика дохода за выбранный период</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Конверсия</CardTitle>
                <CardDescription>Показатели конверсии по этапам воронки</CardDescription>
              </CardHeader>
              <CardContent>
                <ConversionChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Эффективность каналов</CardTitle>
                <CardDescription>Сравнение эффективности маркетинговых каналов</CardDescription>
              </CardHeader>
              <CardContent>
                <ChannelPerformance />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Сегменты клиентов</CardTitle>
                <CardDescription>Распределение клиентов по сегментам</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerSegments />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="acquisition" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Источники трафика</CardTitle>
              <CardDescription>Анализ источников привлечения пользователей</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Данные загружаются...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Поведение пользователей</CardTitle>
              <CardDescription>Анализ поведения пользователей на сайте</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Данные загружаются...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Воронка конверсии</CardTitle>
              <CardDescription>Анализ воронки конверсии</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Данные загружаются...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
