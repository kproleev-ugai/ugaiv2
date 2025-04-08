"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartDataPoint } from "@/types/analytics"

export function SalesChart() {
  const [period, setPeriod] = useState<"month" | "year">("month")

  // Демо-данные на основе предоставленных полей
  const monthData: ChartDataPoint[] = [
    { date: "01.01", revenue: 240000, contracts: 12 },
    { date: "02.01", revenue: 180000, contracts: 9 },
    { date: "03.01", revenue: 320000, contracts: 16 },
    { date: "04.01", revenue: 260000, contracts: 13 },
    { date: "05.01", revenue: 190000, contracts: 10 },
    { date: "06.01", revenue: 240000, contracts: 12 },
    { date: "07.01", revenue: 350000, contracts: 18 },
    { date: "08.01", revenue: 280000, contracts: 14 },
    { date: "09.01", revenue: 320000, contracts: 16 },
    { date: "10.01", revenue: 380000, contracts: 19 },
    { date: "11.01", revenue: 420000, contracts: 21 },
    { date: "12.01", revenue: 460000, contracts: 23 },
    { date: "13.01", revenue: 400000, contracts: 20 },
    { date: "14.01", revenue: 350000, contracts: 18 },
  ]

  const yearData: ChartDataPoint[] = [
    { date: "Янв", revenue: 1240000, contracts: 62 },
    { date: "Фев", revenue: 1080000, contracts: 54 },
    { date: "Мар", revenue: 1320000, contracts: 66 },
    { date: "Апр", revenue: 1460000, contracts: 73 },
    { date: "Май", revenue: 1590000, contracts: 80 },
    { date: "Июн", revenue: 1240000, contracts: 62 },
    { date: "Июл", revenue: 1350000, contracts: 68 },
    { date: "Авг", revenue: 1480000, contracts: 74 },
    { date: "Сен", revenue: 1520000, contracts: 76 },
    { date: "Окт", revenue: 1680000, contracts: 84 },
    { date: "Ноя", revenue: 1820000, contracts: 91 },
    { date: "Дек", revenue: 1960000, contracts: 98 },
  ]

  const data = period === "month" ? monthData : yearData

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Доходы</CardTitle>
          <CardDescription>Динамика доходов и количества контрактов</CardDescription>
        </div>
        <Tabs defaultValue="month" value={period} onValueChange={(value) => setPeriod(value as "month" | "year")}>
          <TabsList>
            <TabsTrigger value="month">Месяц</TabsTrigger>
            <TabsTrigger value="year">Год</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="line">Линейный</TabsTrigger>
              <TabsTrigger value="area">Область</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="line" className="h-[300px]">
            <ChartContainer
              config={{
                revenue: {
                  label: "Доход",
                  color: "hsl(var(--chart-1))",
                },
                contracts: {
                  label: "Контракты",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    name="Доход (€)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="contracts"
                    stroke="var(--color-contracts)"
                    name="Контракты"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="area" className="h-[300px]">
            <ChartContainer
              config={{
                revenue: {
                  label: "Доход",
                  color: "hsl(var(--chart-1))",
                },
                contracts: {
                  label: "Контракты",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    fill="var(--color-revenue)"
                    stroke="var(--color-revenue)"
                    name="Доход (€)"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="contracts"
                    fill="var(--color-contracts)"
                    stroke="var(--color-contracts)"
                    fillOpacity={0.2}
                    name="Контракты"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

