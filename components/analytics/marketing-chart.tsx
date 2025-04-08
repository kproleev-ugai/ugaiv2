"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartDataPoint, SourceDataPoint } from "@/types/analytics"

export function MarketingChart() {
  // Демо-данные для источников трафика на основе предоставленных полей
  const sourceData: SourceDataPoint[] = [
    { name: "Поисковые системы", value: 4000 },
    { name: "Социальные сети", value: 3000 },
    { name: "Реклама", value: 2780 },
    { name: "Прямые переходы", value: 2000 },
    { name: "Партнеры", value: 1890 },
  ]

  // Демо-данные для эффективности кампаний на основе предоставленных полей
  const campaignData: ChartDataPoint[] = [
    { date: "Кампания 1", clicks: 450, cost: 23000, roas: 3.2 },
    { date: "Кампания 2", clicks: 320, cost: 18000, roas: 2.8 },
    { date: "Кампания 3", clicks: 570, cost: 31000, roas: 4.1 },
    { date: "Кампания 4", clicks: 280, cost: 15000, roas: 2.5 },
    { date: "Кампания 5", clicks: 390, cost: 22000, roas: 3.5 },
  ]

  const COLORS = [
    "var(--primary)",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Маркетинг</CardTitle>
          <CardDescription>Анализ источников трафика и эффективности кампаний</CardDescription>
        </div>
        <Tabs defaultValue="sources">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sources">Источники</TabsTrigger>
            <TabsTrigger value="campaigns">Кампании</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sources">
          <TabsContent value="sources" className="h-[300px]">
            <ChartContainer
              config={{
                value: {
                  label: "Значение",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="campaigns" className="h-[300px]">
            <ChartContainer
              config={{
                clicks: {
                  label: "Клики",
                  color: "hsl(var(--chart-1))",
                },
                cost: {
                  label: "Затраты",
                  color: "hsl(var(--chart-2))",
                },
                roas: {
                  label: "ROAS",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="clicks" fill="var(--color-clicks)" name="Клики" />
                  <Bar yAxisId="left" dataKey="cost" fill="var(--color-cost)" name="Затраты (€)" />
                  <Bar yAxisId="right" dataKey="roas" fill="var(--color-roas)" name="ROAS" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

