"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, CheckSquare, Target, EuroIcon, TrendingUp } from "lucide-react"
import type { AnalyticsStats } from "@/types/index"

export function AnalyticsCards() {
  // Демо-данные на основе предоставленных полей
  const stats: AnalyticsStats = {
    tasks: {
      value: 157,
      change: 7.2,
      trend: "up",
    },
    projects: {
      value: 42,
      change: 3.5,
      trend: "up",
    },
    revenue: {
      value: 3245000,
      change: 14.5,
      trend: "up",
    },
    conversion: {
      value: 4.8,
      change: 1.1,
      trend: "up",
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-t-4 border-t-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Задачи</CardTitle>
          <CheckSquare className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.tasks.value}</div>
          <p className="text-xs text-muted-foreground">
            {stats.tasks.trend === "up" ? (
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+{stats.tasks.change}% с прошлого периода
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                {stats.tasks.change}% с прошлого периода
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-[hsl(var(--chart-2))]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Проекты</CardTitle>
          <Target className="h-4 w-4 text-[hsl(var(--chart-2))]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.projects.value}</div>
          <p className="text-xs text-muted-foreground">
            {stats.projects.trend === "up" ? (
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+{stats.projects.change}% с прошлого периода
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                {stats.projects.change}% с прошлого периода
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-[hsl(var(--chart-3))]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
          <EuroIcon className="h-4 w-4 text-[hsl(var(--chart-3))]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.revenue.value.toLocaleString()} €</div>
          <p className="text-xs text-muted-foreground">
            {stats.revenue.trend === "up" ? (
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+{stats.revenue.change}% с прошлого периода
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                {stats.revenue.change}% с прошлого периода
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-[hsl(var(--chart-4))]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
          <TrendingUp className="h-4 w-4 text-[hsl(var(--chart-4))]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.conversion.value}%</div>
          <p className="text-xs text-muted-foreground">
            {stats.conversion.trend === "up" ? (
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+{stats.conversion.change}% с прошлого периода
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                {stats.conversion.change}% с прошлого периода
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

