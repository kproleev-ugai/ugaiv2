"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Посещение", value: 100, fill: "hsl(var(--chart-1))" },
  { name: "Просмотр товара", value: 75, fill: "hsl(var(--chart-2))" },
  { name: "Добавление в корзину", value: 50, fill: "hsl(var(--chart-3))" },
  { name: "Оформление", value: 25, fill: "hsl(var(--chart-4))" },
  { name: "Покупка", value: 15, fill: "hsl(var(--chart-5))" },
]

export function ConversionChart() {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Конверсия",
          color: "hsl(var(--chart-1))",
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
          <Bar dataKey="value" fill="var(--color-value)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
