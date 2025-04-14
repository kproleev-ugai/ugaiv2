"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Янв", revenue: 4000, target: 4500 },
  { name: "Фев", revenue: 3000, target: 3500 },
  { name: "Мар", revenue: 5000, target: 4500 },
  { name: "Апр", revenue: 2780, target: 3000 },
  { name: "Май", revenue: 1890, target: 2500 },
  { name: "Июн", revenue: 2390, target: 2000 },
  { name: "Июл", revenue: 3490, target: 3000 },
  { name: "Авг", revenue: 4000, target: 3500 },
  { name: "Сен", revenue: 2780, target: 3000 },
  { name: "Окт", revenue: 1890, target: 2500 },
  { name: "Ноя", revenue: 2390, target: 2000 },
  { name: "Дек", revenue: 3490, target: 3000 },
]

export function RevenueChart() {
  return (
    <ChartContainer
      config={{
        revenue: {
          label: "Доход",
          color: "hsl(var(--chart-1))",
        },
        target: {
          label: "Цель",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
          <Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
