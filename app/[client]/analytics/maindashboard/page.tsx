"use client"

import type React from "react"

import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Bar,
  Line,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { ArrowUpRight, ArrowDownRight, EuroIcon, Users, ShoppingCart, TrendingUp, Filter } from "lucide-react"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// Данные для графика выручки
const revenueData = [
  { month: "Янв", revenue: 1250000, lastYear: 980000, forecast: 1200000 },
  { month: "Фев", revenue: 1320000, lastYear: 1050000, forecast: 1300000 },
  { month: "Мар", revenue: 1450000, lastYear: 1120000, forecast: 1400000 },
  { month: "Апр", revenue: 1380000, lastYear: 1180000, forecast: 1350000 },
  { month: "Май", revenue: 1520000, lastYear: 1250000, forecast: 1500000 },
  { month: "Июн", revenue: 1680000, lastYear: 1320000, forecast: 1650000 },
  { month: "Июл", revenue: 1580000, lastYear: 1380000, forecast: 1600000 },
  { month: "Авг", revenue: 1720000, lastYear: 1450000, forecast: 1700000 },
  { month: "Сен", revenue: 1850000, lastYear: 1520000, forecast: 1800000 },
  { month: "Окт", revenue: 1920000, lastYear: 1650000, forecast: 1900000 },
  { month: "Ноя", revenue: 2050000, lastYear: 1780000, forecast: 2000000 },
  { month: "Дек", revenue: 2250000, lastYear: 1950000, forecast: 2200000 },
]

// Данные для источников трафика
const trafficSourceData = [
  { name: "Органический поиск", value: 42, color: "#4f46e5" },
  { name: "Платная реклама", value: 28, color: "#8b5cf6" },
  { name: "Социальные сети", value: 15, color: "#ec4899" },
  { name: "Прямые переходы", value: 10, color: "#f97316" },
  { name: "Реферальные ссылки", value: 5, color: "#14b8a6" },
]

// Данные для топ продуктов (на основе CRM данных)
const topProductsData = [
  {
    id: 1,
    name: "Мала Комп'ютерна Академія",
    sales: 156,
    revenue: 312000,
    growth: 12.5,
    trend: "up",
  },
  {
    id: 2,
    name: "Розробка програмного забезпечення",
    sales: 142,
    revenue: 284000,
    growth: 8.3,
    trend: "up",
  },
  {
    id: 3,
    name: "IT-табір",
    sales: 128,
    revenue: 256000,
    growth: 15.2,
    trend: "up",
  },
  {
    id: 4,
    name: "Компьютерная графика и дизайн",
    sales: 98,
    revenue: 245000,
    growth: 6.7,
    trend: "up",
  },
  {
    id: 5,
    name: "IT Step School",
    sales: 86,
    revenue: 215000,
    growth: -2.3,
    trend: "down",
  },
]

// Данные для филиалов (на основе CRM данных)
const branchData = [
  {
    id: 1,
    name: "Берлин",
    students: 1250,
    revenue: 2500000,
    growth: 8.5,
    trend: "up",
  },
  {
    id: 2,
    name: "Мюнхен",
    students: 980,
    revenue: 1960000,
    growth: 12.3,
    trend: "up",
  },
  {
    id: 3,
    name: "Франкфурт",
    students: 620,
    revenue: 1240000,
    growth: 5.8,
    trend: "up",
  },
  {
    id: 4,
    name: "Гамбург",
    students: 580,
    revenue: 1160000,
    growth: -1.2,
    trend: "down",
  },
  {
    id: 5,
    name: "Кёльн",
    students: 450,
    revenue: 900000,
    growth: 9.7,
    trend: "up",
  },
]

// Данные для конверсии по этапам
const conversionData = [
  { stage: "Посещение сайта", value: 12500 },
  { stage: "Заявка на курс", value: 3750 },
  { stage: "Пробное занятие", value: 2250 },
  { stage: "Оплата курса", value: 1125 },
  { stage: "Завершение курса", value: 900 },
]

// Данные для типов оплаты (на основе CRM данных)
const paymentTypeData = [
  { name: "Полная оплата", value: 35 },
  { name: "9 частей в году", value: 25 },
  { name: "12 частей в году", value: 20 },
  { name: "3 части в году", value: 15 },
  { name: "Другие", value: 5 },
]

// Данные для возрастных групп (на основе CRM данных)
const ageGroupData = [
  { name: "6-8 лет", students: 450 },
  { name: "9-12 лет", students: 850 },
  { name: "13-15 лет", students: 720 },
  { name: "16-18 лет", students: 580 },
  { name: "19-25 лет", students: 320 },
  { name: "26+ лет", students: 180 },
]

// Данные для динамики новых контрактов (на основе CRM данных)
const contractsData = [
  { date: "01.03", contracts: 12 },
  { date: "02.03", contracts: 15 },
  { date: "03.03", contracts: 18 },
  { date: "04.03", contracts: 14 },
  { date: "05.03", contracts: 21 },
  { date: "06.03", contracts: 25 },
  { date: "07.03", contracts: 22 },
  { date: "08.03", contracts: 18 },
  { date: "09.03", contracts: 20 },
  { date: "10.03", contracts: 24 },
  { date: "11.03", contracts: 28 },
  { date: "12.03", contracts: 30 },
  { date: "13.03", contracts: 27 },
  { date: "14.03", contracts: 25 },
  { date: "15.03", contracts: 29 },
  { date: "16.03", contracts: 32 },
  { date: "17.03", contracts: 35 },
  { date: "18.03", contracts: 38 },
  { date: "19.03", contracts: 36 },
  { date: "20.03", contracts: 40 },
  { date: "21.03", contracts: 42 },
  { date: "22.03", contracts: 45 },
  { date: "23.03", contracts: 48 },
  { date: "24.03", contracts: 50 },
  { date: "25.03", contracts: 52 },
  { date: "26.03", contracts: 55 },
  { date: "27.03", contracts: 58 },
  { date: "28.03", contracts: 60 },
]

// Последние контракты (на основе CRM данных)
const recentContractsData = [
  {
    id: 1180307,
    student: "Sîrbu Andreea",
    course: "Курс пользователя ПК (First Step in IT)",
    date: "2025-03-28",
    amount: 2390,
  },
  {
    id: 1180304,
    student: "Третяк Христина",
    course: "Табір в Болгарії",
    date: "2025-03-28",
    amount: 48760,
  },
  {
    id: 1180301,
    student: "Дургер-Шевченко Артем",
    course: "Розробка програмного забезпечення_шс",
    date: "2025-03-28",
    amount: 38740,
  },
  {
    id: 1180298,
    student: "Воробьев Харитон",
    course: "Мала Комп'ютерна Академія 9-12 років англ",
    date: "2025-03-28",
    amount: 145200,
  },
  {
    id: 1180295,
    student: "Смагулов Альтаир",
    course: "IT-табір не повного дня - 10 днів",
    date: "2025-03-28",
    amount: 25000,
  },
]

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  description: string
}

function MetricCard({ title, value, change, trend, icon, description }: MetricCardProps) {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-gray-200">{title}</CardTitle>
        <div className="rounded-full p-1 text-white bg-gradient-to-br from-indigo-500 to-indigo-600">{icon}</div>
      </CardHeader>
      <CardContent className="pt-0 px-4 pb-4">
        <div className="text-lg font-bold text-gray-100">{value}</div>
        <div className="flex items-center space-x-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3 text-green-500" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-500" />
          )}
          <p className={cn("text-xs", trend === "up" ? "text-green-500" : "text-red-500")}>{change}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MainDashboardPage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div>Загрузка...</div>
  }

  // Форматирование числа с разделителями тысяч и символом валюты
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Форматирование числа с разделителями тысяч
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("de-DE").format(value)
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Основной дашборд</h1>
            <p className="text-gray-400 text-sm">Ключевые показатели эффективности бизнеса {currentClient.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="last12months">
              <SelectTrigger className="h-8 w-[180px] bg-gray-900 border-gray-700 text-xs">
                <SelectValue placeholder="Выберите период" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="last7days">Последние 7 дней</SelectItem>
                <SelectItem value="last30days">Последние 30 дней</SelectItem>
                <SelectItem value="last12months">Последние 12 месяцев</SelectItem>
                <SelectItem value="thisYear">Этот год</SelectItem>
                <SelectItem value="lastYear">Прошлый год</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="allBranches">
              <SelectTrigger className="h-8 w-[180px] bg-gray-900 border-gray-700 text-xs">
                <SelectValue placeholder="Выберите филиал" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="allBranches">Все филиалы</SelectItem>
                <SelectItem value="berlin">Берлин</SelectItem>
                <SelectItem value="munich">Мюнхен</SelectItem>
                <SelectItem value="frankfurt">Франкфурт</SelectItem>
                <SelectItem value="hamburg">Гамбург</SelectItem>
                <SelectItem value="cologne">Кёльн</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="h-8 bg-gray-900 border-gray-700 text-xs">
              <Filter className="h-3.5 w-3.5 mr-1" />
              Дополнительные фильтры
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-2">
          <MetricCard
            title="Общая выручка"
            value={formatCurrency(24560000)}
            change="+12.5%"
            trend="up"
            icon={<EuroIcon className="h-3.5 w-3.5" />}
            description="vs. прошлый год"
          />
          <MetricCard
            title="Новые студенты"
            value={formatNumber(3842)}
            change="+8.2%"
            trend="up"
            icon={<Users className="h-3.5 w-3.5" />}
            description="vs. прошлый год"
          />
          <MetricCard
            title="Средний чек"
            value={formatCurrency(6392)}
            change="-3.1%"
            trend="down"
            icon={<ShoppingCart className="h-3.5 w-3.5" />}
            description="vs. прошлый год"
          />
          <MetricCard
            title="Конверсия"
            value="9.8%"
            change="+0.6%"
            trend="up"
            icon={<TrendingUp className="h-3.5 w-3.5" />}
            description="vs. прошлый год"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          <Card className="col-span-2 bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-sm">Динамика выручки</CardTitle>
                  <CardDescription className="text-gray-400 text-xs">Сравнение с предыдущим периодом</CardDescription>
                </div>
                <Tabs defaultValue="monthly" className="w-[240px]">
                  <TabsList className="grid w-full grid-cols-3 h-7 bg-gray-800">
                    <TabsTrigger value="weekly" className="text-xs data-[state=active]:bg-gray-700">
                      Неделя
                    </TabsTrigger>
                    <TabsTrigger value="monthly" className="text-xs data-[state=active]:bg-gray-700">
                      Месяц
                    </TabsTrigger>
                    <TabsTrigger value="yearly" className="text-xs data-[state=active]:bg-gray-700">
                      Год
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Выручка",
                    color: "hsl(var(--chart-1))",
                  },
                  lastYear: {
                    label: "Прошлый год",
                    color: "hsl(var(--chart-2))",
                  },
                  forecast: {
                    label: "Прогноз",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={10} />
                    <YAxis
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      stroke="#9ca3af"
                      fontSize={10}
                    />
                    <ChartTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-800 border border-gray-700 rounded-md shadow-md p-2">
                              <p className="font-medium text-white text-xs">{label}</p>
                              {payload.map((entry, index) => (
                                <p key={index} style={{ color: entry.color }} className="text-xs">
                                  {entry.name}: {formatCurrency(entry.value as number)}
                                </p>
                              ))}
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="lastYear"
                      stroke="var(--color-lastYear)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="var(--color-forecast)"
                      strokeWidth={2}
                      strokeDasharray="3 3"
                      dot={{ r: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Динамика новых контрактов</CardTitle>
              <CardDescription className="text-gray-400 text-xs">Март 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={contractsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} />
                    <YAxis stroke="#9ca3af" fontSize={10} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-800 border border-gray-700 rounded-md shadow-md p-2">
                              <p className="font-medium text-white text-xs">{label}</p>
                              <p className="text-xs text-blue-400">Контракты: {payload[0].value}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area type="monotone" dataKey="contracts" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Распределение по курсам</CardTitle>
              <CardDescription className="text-gray-400 text-xs">Топ-5 курсов по выручке</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topProductsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="revenue"
                      nameKey="name"
                      label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                      fontSize={10}
                    >
                      {topProductsData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#4f46e5", "#8b5cf6", "#ec4899", "#f97316", "#14b8a6"][index % 5]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-800 border border-gray-700 rounded-md shadow-md p-2">
                              <p className="font-medium text-white text-xs">{payload[0].name}</p>
                              <p className="text-xs">Выручка: {formatCurrency(payload[0].value as number)}</p>
                              <p className="text-xs">
                                Продажи: {topProductsData.find((item) => item.name === payload[0].name)?.sales}
                              </p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {topProductsData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: ["#4f46e5", "#8b5cf6", "#ec4899", "#f97316", "#14b8a6"][index % 5] }}
                    ></div>
                    <span className="text-xs text-gray-300 truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Типы оплаты</CardTitle>
              <CardDescription className="text-gray-400 text-xs">Распределение по способам оплаты</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                      fontSize={10}
                    >
                      {paymentTypeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={["#4f46e5", "#8b5cf6", "#ec4899", "#f97316", "#14b8a6"][index % 5]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-800 border border-gray-700 rounded-md shadow-md p-2">
                              <p className="font-medium text-white text-xs">{payload[0].name}</p>
                              <p className="text-xs">Доля: {payload[0].value}%</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {paymentTypeData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: ["#4f46e5", "#8b5cf6", "#ec4899", "#f97316", "#14b8a6"][index % 5] }}
                    ></div>
                    <span className="text-xs text-gray-300 truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Возрастные группы</CardTitle>
              <CardDescription className="text-gray-400 text-xs">Распределение студентов по возрасту</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageGroupData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" fontSize={10} />
                    <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={10} width={50} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-800 border border-gray-700 rounded-md shadow-md p-2">
                              <p className="font-medium text-white text-xs">{label}</p>
                              <p className="text-xs text-blue-400">Студенты: {payload[0].value}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="students" fill="#4f46e5" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Показатели по филиалам</CardTitle>
              <CardDescription className="text-gray-400 text-xs">Сравнение эффективности</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                    <YAxis
                      yAxisId="left"
                      orientation="left"
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      stroke="#9ca3af"
                      fontSize={10}
                    />
                    <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={10} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-800 border border-gray-700 rounded-md shadow-md p-2">
                              <p className="font-medium text-white text-xs">{label}</p>
                              <p className="text-xs text-blue-400">
                                Выручка: {formatCurrency(payload[0].value as number)}
                              </p>
                              <p className="text-xs text-pink-400">Студенты: {payload[1].value}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                    <Bar yAxisId="left" dataKey="revenue" name="Выручка" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="students"
                      name="Студенты"
                      stroke="#ec4899"
                      strokeWidth={2}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Последние контракты</CardTitle>
              <CardDescription className="text-gray-400 text-xs">Недавно заключенные договоры</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-300 text-xs">ID</TableHead>
                      <TableHead className="text-gray-300 text-xs">Студент</TableHead>
                      <TableHead className="text-gray-300 text-xs">Курс</TableHead>
                      <TableHead className="text-right text-gray-300 text-xs">Сумма</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentContractsData.map((contract) => (
                      <TableRow key={contract.id} className="border-gray-800">
                        <TableCell className="font-medium text-gray-200 text-xs">{contract.id}</TableCell>
                        <TableCell className="text-gray-300 text-xs">{contract.student}</TableCell>
                        <TableCell className="text-gray-300 text-xs truncate max-w-[150px]">
                          {contract.course}
                        </TableCell>
                        <TableCell className="text-right text-gray-300 text-xs">
                          {formatCurrency(contract.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Воронка конверсии</CardTitle>
              <CardDescription className="text-gray-400 text-xs">
                Путь клиента от первого контакта до покупки
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversionData.map((stage, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-gray-200">{stage.stage}</span>
                      <span className="text-gray-300">{formatNumber(stage.value)}</span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-800">
                      <div
                        className="h-full bg-indigo-600"
                        style={{ width: `${(stage.value / conversionData[0].value) * 100}%` }}
                      />
                    </div>
                    {index < conversionData.length - 1 && (
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Конверсия: {((conversionData[index + 1].value / stage.value) * 100).toFixed(1)}%</span>
                        <span>Отток: {((1 - conversionData[index + 1].value / stage.value) * 100).toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-2 rounded-md border border-indigo-900 bg-indigo-900/20 p-2">
                  <p className="text-xs text-indigo-400">
                    <span className="font-medium">Инсайт:</span> Наибольший отток происходит на этапе перехода от заявки
                    к пробному занятию (40%). Рекомендуется улучшить процесс назначения пробных занятий и напоминаний.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
