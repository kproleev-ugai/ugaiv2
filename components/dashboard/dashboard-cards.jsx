"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, CheckSquare, Clock } from "lucide-react"

export function DashboardCards() {
  // Демо-данные
  const stats = {
    revenue: {
      value: 24500,
      change: 12.5,
      trend: "up",
    },
    customers: {
      value: 573,
      change: 8.2,
      trend: "up",
    },
    tasks: {
      value: 12,
      total: 24,
      completed: 12,
    },
    timeTracking: {
      value: 32.5,
      change: -4.1,
      trend: "down",
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Доход</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.revenue.value.toLocaleString()} ₽</div>
          <p className="text-xs text-muted-foreground">
            {stats.revenue.trend === "up" ? (
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+{stats.revenue.change}% с прошлого месяца
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                {stats.revenue.change}% с прошлого месяца
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Клиенты</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.customers.value}</div>
          <p className="text-xs text-muted-foreground">
            {stats.customers.trend === "up" ? (
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+{stats.customers.change}% с прошлого месяца
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                {stats.customers.change}% с прошлого месяца
              </span>
            )}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Задачи</CardTitle>
          <CheckSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.tasks.completed}/{stats.tasks.total}
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(stats.tasks.completed / stats.tasks.total) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {Math.round((stats.tasks.completed / stats.tasks.total) * 100)}% выполнено
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Отработано часов</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.timeTracking.value} ч</div>
          <p className="text-xs text-muted-foreground">
            {stats.timeTracking.trend === "up" ? (
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />+{stats.timeTracking.change}% с прошлой недели
              </span>
            ) : (
              <span className="text-red-500 flex items-center">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                {stats.timeTracking.change}% с прошлой недели
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

