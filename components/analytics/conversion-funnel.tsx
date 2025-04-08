"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, Tooltip, FunnelChart, Funnel, LabelList, Cell } from "recharts"
import type { FunnelDataPoint } from "@/types/analytics"

export function ConversionFunnel() {
  // Демо-данные на основе предоставленных полей
  const data: FunnelDataPoint[] = [
    {
      name: "Посетители",
      value: 5000,
      rate: "100%",
    },
    {
      name: "Просмотр курса",
      value: 3500,
      rate: "70%",
    },
    {
      name: "Заявка",
      value: 2200,
      rate: "44%",
    },
    {
      name: "Оформление договора",
      value: 1100,
      rate: "22%",
    },
    {
      name: "Оплата",
      value: 800,
      rate: "16%",
    },
  ]

  const COLORS = [
    "var(--primary)",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border p-2 rounded-md shadow-md">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-sm">
            Кол-во: <span className="font-medium">{payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-sm">
            Конверсия: <span className="font-medium">{payload[0].payload.rate}</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Воронка конверсии</CardTitle>
        <CardDescription>Путь студента от посещения до оплаты</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip content={<CustomTooltip />} />
            <Funnel dataKey="value" data={data} isAnimationActive>
              <LabelList position="right" fill="#fff" stroke="none" dataKey="name" formatter={(value: any) => value} />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

