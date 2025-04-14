"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingCart, TrendingUp } from "lucide-react"

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Доход</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₽1,234,567</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              12.5%
            </span>
            <span className="ml-1">по сравнению с прошлым периодом</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,345</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              8.2%
            </span>
            <span className="ml-1">по сравнению с прошлым периодом</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.2%</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="flex items-center text-rose-500">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              0.5%
            </span>
            <span className="ml-1">по сравнению с прошлым периодом</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₽4,567</div>
          <div className="flex items-center pt-1 text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              3.7%
            </span>
            <span className="ml-1">по сравнению с прошлым периодом</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
