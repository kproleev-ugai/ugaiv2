"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export function OKRCards() {
  // Демо-данные
  const stats = {
    totalObjectives: 12,
    completedObjectives: 5,
    inProgressObjectives: 6,
    atRiskObjectives: 1,
    averageProgress: 68,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-t-4 border-t-primary">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Всего целей</CardTitle>
          <Target className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalObjectives}</div>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(stats.completedObjectives / stats.totalObjectives) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {Math.round((stats.completedObjectives / stats.totalObjectives) * 100)}% выполнено
          </p>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Выполнено</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completedObjectives}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.completedObjectives / stats.totalObjectives) * 100)}% от общего числа
          </p>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">В процессе</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.inProgressObjectives}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.inProgressObjectives / stats.totalObjectives) * 100)}% от общего числа
          </p>
        </CardContent>
      </Card>

      <Card className="border-t-4 border-t-yellow-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Под угрозой</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.atRiskObjectives}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.atRiskObjectives / stats.totalObjectives) * 100)}% от общего числа
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

