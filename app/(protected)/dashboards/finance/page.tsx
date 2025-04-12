"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, CreditCard, Brain } from "lucide-react"

// Данные для графиков
const revenueData = [
  { name: "Янв", value: 1200000, target: 1000000 },
  { name: "Фев", value: 1350000, target: 1100000 },
  { name: "Мар", value: 1800000, target: 1500000 },
  { name: "Апр", value: 1600000, target: 1600000 },
  { name: "Май", value: 1400000, target: 1700000 },
  { name: "Июн", value: 1700000, target: 1800000 },
]

const expensesData = [
  { name: "Янв", value: 800000 },
  { name: "Фев", value: 850000 },
  { name: "Мар", value: 900000 },
  { name: "Апр", value: 950000 },
  { name: "Май", value: 1000000 },
  { name: "Июн", value: 1050000 },
]

const profitData = revenueData.map((item, index) => ({
  name: item.name,
  value: item.value - expensesData[index].value,
}))

const expenseBreakdownData = [
  { name: "Зарплаты", value: 450000, color: "#3b82f6" },
  { name: "Аренда", value: 200000, color: "#22c55e" },
  { name: "Маркетинг", value: 150000, color: "#eab308" },
  { name: "Оборудование", value: 100000, color: "#ef4444" },
  { name: "Коммунальные услуги", value: 80000, color: "#8b5cf6" },
  { name: "Прочее", value: 70000, color: "#ec4899" },
]

const revenueBySourceData = [
  { name: "Курсы программирования", value: 600000, color: "#3b82f6" },
  { name: "Курсы дизайна", value: 400000, color: "#22c55e" },
  { name: "Курсы маркетинга", value: 300000, color: "#eab308" },
  { name: "Курсы бизнеса", value: 250000, color: "#ef4444" },
  { name: "IT-инфраструктура", value: 150000, color: "#8b5cf6" },
]

const cashFlowData = [
  { name: "Янв", inflow: 1200000, outflow: 800000 },
  { name: "Фев", inflow: 1350000, outflow: 850000 },
  { name: "Мар", inflow: 1800000, outflow: 900000 },
  { name: "Апр", inflow: 1600000, outflow: 950000 },
  { name: "Май", inflow: 1400000, outflow: 1000000 },
  { name: "Июн", inflow: 1700000, outflow: 1050000 },
]

export default function FinanceDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Общий доход"
          value="₽8.2M"
          change="+18%"
          trend="up"
          description="с прошлого квартала"
          icon={<DollarSign className="h-4 w-4 text-white" />}
          color="bg-green-600"
        />
        <MetricCard
          title="Расходы"
          value="₽4.6M"
          change="+8%"
          trend="up"
          description="с прошлого квартала"
          icon={<CreditCard className="h-4 w-4 text-white" />}
          color="bg-red-600"
        />
        <MetricCard
          title="Прибыль"
          value="₽3.6M"
          change="+24%"
          trend="up"
          description="с прошлого квартала"
          icon={<TrendingUp className="h-4 w-4 text-white" />}
          color="bg-blue-600"
        />
        <MetricCard
          title="Маржа"
          value="43.9%"
          change="+5.2%"
          trend="up"
          description="с прошлого квартала"
          icon={<TrendingUp className="h-4 w-4 text-white" />}
          color="bg-purple-600"
        />
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Доходы</TabsTrigger>
          <TabsTrigger value="expenses">Расходы</TabsTrigger>
          <TabsTrigger value="profit">Прибыль</TabsTrigger>
          <TabsTrigger value="cashflow">Денежный поток</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Динамика доходов</CardTitle>
                    <CardDescription>Сравнение с целевыми показателями</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-2 text-[9px] h-3.5 px-1 py-0 border-indigo-200 bg-indigo-50 text-indigo-700"
                  >
                    <Brain className="mr-1 h-2 w-2" />
                    AI
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Сумма"]} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} name="Фактический доход" />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Целевой доход"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Структура доходов</CardTitle>
                <CardDescription>Распределение доходов по источникам</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueBySourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {revenueBySourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Доход"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Доход по курсам</CardTitle>
              <CardDescription>Сравнение доходности различных курсов</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueBySourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Доход"]} />
                  <Legend />
                  <Bar dataKey="value" fill="#22c55e" name="Доход" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Динамика расходов</CardTitle>
                <CardDescription>Изменение расходов по месяцам</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={expensesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Расходы"]} />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} name="Расходы" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Структура расходов</CardTitle>
                <CardDescription>Распределение расходов по категориям</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Расходы"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Расходы по категориям</CardTitle>
              <CardDescription>Сравнение расходов по различным категориям</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenseBreakdownData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Расходы"]} />
                  <Legend />
                  <Bar dataKey="value" fill="#ef4444" name="Расходы" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Динамика прибыли</CardTitle>
                  <CardDescription>Изменение прибыли по месяцам</CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="ml-2 text-[9px] h-3.5 px-1 py-0 border-indigo-200 bg-indigo-50 text-indigo-700"
                >
                  <Brain className="mr-1 h-2 w-2" />
                  AI
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Прибыль"]} />
                  <Legend />
                  <Area type="monotone" dataKey="value" fill="#3b82f6" stroke="#3b82f6" name="Прибыль" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Сравнение доходов и расходов</CardTitle>
                <CardDescription>Помесячное сравнение</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Сумма"]} />
                    <Legend />
                    <Bar dataKey="inflow" fill="#22c55e" name="Доходы" />
                    <Bar dataKey="outflow" fill="#ef4444" name="Расходы" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Маржинальность по курсам</CardTitle>
                <CardDescription>Прибыльность различных направлений</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueBySourceData.map((course, index) => {
                    // Рассчитываем примерную маржу для каждого курса (для демонстрации)
                    const margin = 30 + Math.floor(Math.random() * 25)
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{course.name}</span>
                          <span className="text-sm text-muted-foreground">Маржа: {margin}%</span>
                        </div>
                        <Progress value={margin} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cashflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Денежный поток</CardTitle>
              <CardDescription>Приток и отток денежных средств</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Сумма"]} />
                  <Legend />
                  <Area type="monotone" dataKey="inflow" stackId="1" fill="#22c55e" stroke="#22c55e" name="Приток" />
                  <Area type="monotone" dataKey="outflow" stackId="2" fill="#ef4444" stroke="#ef4444" name="Отток" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Чистый денежный поток</CardTitle>
                <CardDescription>Разница между притоком и оттоком</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={cashFlowData.map((item) => ({
                      name: item.name,
                      value: item.inflow - item.outflow,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Чистый поток"]} />
                    <Legend />
                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                      name="Чистый денежный поток"
                      // Разные цвета для положительных и отрицательных значений
                      fill={(entry) => (entry.value >= 0 ? "#22c55e" : "#ef4444")}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Прогноз денежного потока</CardTitle>
                <CardDescription>Прогноз на следующие 6 месяцев</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      ...cashFlowData,
                      // Прогнозные данные на следующие 6 месяцев
                      { name: "Июл", inflow: 1750000, outflow: 1100000 },
                      { name: "Авг", inflow: 1800000, outflow: 1150000 },
                      { name: "Сен", inflow: 2000000, outflow: 1200000 },
                      { name: "Окт", inflow: 1900000, outflow: 1250000 },
                      { name: "Ноя", inflow: 1850000, outflow: 1300000 },
                      { name: "Дек", inflow: 2100000, outflow: 1350000 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Сумма"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="inflow"
                      stroke="#22c55e"
                      name="Приток"
                      strokeWidth={2}
                      // Делаем прогнозную часть пунктирной
                      strokeDasharray={(_, index) => (index >= 6 ? "5 5" : "0")}
                    />
                    <Line
                      type="monotone"
                      dataKey="outflow"
                      stroke="#ef4444"
                      name="Отток"
                      strokeWidth={2}
                      // Делаем прогнозную часть пунктирной
                      strokeDasharray={(_, index) => (index >= 6 ? "5 5" : "0")}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
  description,
  icon,
  color,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`rounded-full p-2 ${color}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          {trend === "up" ? (
            <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}</span> {description}
        </p>
      </CardContent>
    </Card>
  )
}
