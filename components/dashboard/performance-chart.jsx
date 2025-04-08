"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function PerformanceChart() {
  const [period, setPeriod] = useState("week")

  // Демо-данные
  const weekData = [
    { name: "Пн", revenue: 4000, profit: 2400 },
    { name: "Вт", revenue: 3000, profit: 1398 },
    { name: "Ср", revenue: 2000, profit: 9800 },
    { name: "Чт", revenue: 2780, profit: 3908 },
    { name: "Пт", revenue: 1890, profit: 4800 },
    { name: "Сб", revenue: 2390, profit: 3800 },
    { name: "Вс", revenue: 3490, profit: 4300 },
  ]

  const monthData = [
    { name: "Янв", revenue: 24000, profit: 12400 },
    { name: "Фев", revenue: 21000, profit: 11398 },
    { name: "Мар", revenue: 32000, profit: 19800 },
    { name: "Апр", revenue: 28780, profit: 13908 },
    { name: "Май", revenue: 31890, profit: 14800 },
    { name: "Июн", revenue: 22390, profit: 13800 },
    { name: "Июл", revenue: 33490, profit: 14300 },
    { name: "Авг", revenue: 34000, profit: 15400 },
    { name: "Сен", revenue: 31000, profit: 14398 },
    { name: "Окт", revenue: 32000, profit: 15800 },
    { name: "Ноя", revenue: 38780, profit: 16908 },
    { name: "Дек", revenue: 41890, profit: 18800 },
  ]

  const data = period === "week" ? weekData : monthData

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Эффективность</CardTitle>
          <CardDescription>Обзор доходов и прибыли</CardDescription>
        </div>
        <Tabs defaultValue="week" value={period} onValueChange={setPeriod}>
          <TabsList>
            <TabsTrigger value="week">Неделя</TabsTrigger>
            <TabsTrigger value="month">Месяц</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="line">Линейный</TabsTrigger>
              <TabsTrigger value="bar">Столбчатый</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="line" className="h-[300px]">
            <ChartContainer
              config={{
                revenue: {
                  label: "Доход",
                  color: "hsl(var(--chart-1))",
                },
                profit: {
                  label: "Прибыль",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" name="Доход (₽)" />
                  <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" name="Прибыль (₽)" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="bar" className="h-[300px]">
            <ChartContainer
              config={{
                revenue: {
                  label: "Доход",
                  color: "hsl(var(--chart-1))",
                },
                profit: {
                  label: "Прибыль",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="Доход (₽)" />
                  <Bar dataKey="profit" fill="var(--color-profit)" name="Прибыль (₽)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

