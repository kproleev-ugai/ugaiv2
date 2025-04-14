"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Поиск", visits: 4000, conversions: 240 },
  { name: "Соцсети", visits: 3000, conversions: 139 },
  { name: "Email", visits: 2000, conversions: 980 },
  { name: "Реклама", visits: 2780, conversions: 390 },
  { name: "Прямые", visits: 1890, conversions: 490 },
]

export function ChannelPerformance() {
  return (
    <ChartContainer
      config={{
        visits: {
          label: "Визиты",
          color: "hsl(var(--chart-1))",
        },
        conversions: {
          label: "Конверсии",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="visits" fill="var(--color-visits)" />
          <Bar dataKey="conversions" fill="var(--color-conversions)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
