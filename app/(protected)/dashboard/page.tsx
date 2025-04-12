"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
} from "recharts"
import {
  ArrowUpRight,
  ArrowDownRight,
  GraduationCap,
  Users,
  DollarSign,
  BookOpen,
  Brain,
  Search,
  Filter,
  ArrowRight,
  Download,
  Share2,
  Printer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Данные для графиков
const enrollmentData = [
  { name: "Янв", value: 65 },
  { name: "Фев", value: 59 },
  { name: "Мар", value: 80 },
  { name: "Апр", value: 81 },
  { name: "Май", value: 56 },
  { name: "Июн", value: 55 },
  { name: "Июл", value: 40 },
  { name: "Авг", value: 70 },
  { name: "Сен", value: 90 },
  { name: "Окт", value: 75 },
  { name: "Ноя", value: 62 },
  { name: "Дек", value: 58 },
]

const courseData = [
  { name: "Программирование", students: 120, revenue: 1200000 },
  { name: "Дизайн", students: 85, revenue: 850000 },
  { name: "Маркетинг", students: 65, revenue: 650000 },
  { name: "Бизнес", students: 45, revenue: 450000 },
  { name: "IT-инфраструктура", students: 35, revenue: 350000 },
]

const studentStatusData = [
  { name: "Активные", value: 540, color: "#22c55e" },
  { name: "Приостановленные", value: 80, color: "#eab308" },
  { name: "Выпускники", value: 320, color: "#3b82f6" },
  { name: "Отчисленные", value: 60, color: "#ef4444" },
]

const revenueData = [
  { name: "Янв", value: 1200000 },
  { name: "Фев", value: 1350000 },
  { name: "Мар", value: 1800000 },
  { name: "Апр", value: 1600000 },
  { name: "Май", value: 1400000 },
  { name: "Июн", value: 1700000 },
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState("6m")
  const [showAlert, setShowAlert] = useState(true)

  // Фильтрация данных курсов на основе поискового запроса
  const filteredCourseData = courseData.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {showAlert && (
        <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800">
          <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertTitle className="text-blue-600 dark:text-blue-400">Новый раздел аналитики</AlertTitle>
          <AlertDescription className="text-blue-600 dark:text-blue-400">
            Мы обновили структуру приложения. Теперь все дашборды доступны в разделе "Analytics".
            <Button variant="link" asChild className="text-blue-600 dark:text-blue-400 p-0 h-auto font-medium">
              <Link href="/analytics" className="inline-flex items-center gap-1 ml-2">
                Перейти в новый раздел <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </AlertDescription>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full"
            onClick={() => setShowAlert(false)}
          >
            <span className="sr-only">Close</span>
            &times;
          </Button>
        </Alert>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Дашборд</h2>
          <p className="text-muted-foreground">Обзор ключевых показателей ItStep</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск..."
              className="pl-9 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Последний месяц</SelectItem>
              <SelectItem value="3m">Последние 3 месяца</SelectItem>
              <SelectItem value="6m">Последние 6 месяцев</SelectItem>
              <SelectItem value="1y">Последний год</SelectItem>
              <SelectItem value="all">Все время</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Фильтры</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Студенты"
          value="1000"
          change="+12%"
          trend="up"
          description="с прошлого месяца"
          icon={<GraduationCap className="h-4 w-4 text-white" />}
          color="bg-blue-600"
        />
        <MetricCard
          title="Преподаватели"
          value="45"
          change="+3"
          trend="up"
          description="новых преподавателей"
          icon={<Users className="h-4 w-4 text-white" />}
          color="bg-indigo-600"
        />
        <MetricCard
          title="Доход"
          value="₽8.2M"
          change="+18%"
          trend="up"
          description="с прошлого квартала"
          icon={<DollarSign className="h-4 w-4 text-white" />}
          color="bg-green-600"
        />
        <MetricCard
          title="Курсы"
          value="32"
          change="+5"
          trend="up"
          description="новых курсов"
          icon={<BookOpen className="h-4 w-4 text-white" />}
          color="bg-purple-600"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="courses">Курсы</TabsTrigger>
          <TabsTrigger value="students">Студенты</TabsTrigger>
          <TabsTrigger value="finance">Финансы</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Динамика зачислений</CardTitle>
                    <CardDescription>Количество новых студентов по месяцам</CardDescription>
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
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Новые студенты" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>Экспорт</span>
                </Button>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Поделиться</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Статус студентов</CardTitle>
                    <CardDescription>Распределение студентов по статусам</CardDescription>
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
                  <PieChart>
                    <Pie
                      data={studentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {studentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>Экспорт</span>
                </Button>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <Printer className="h-3.5 w-3.5" />
                  <span>Печать</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Популярность курсов</CardTitle>
                    <CardDescription>Количество студентов по направлениям</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredCourseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" name="Студенты" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>Экспорт</span>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Доход по месяцам</CardTitle>
                    <CardDescription>Динамика дохода за последние 6 месяцев</CardDescription>
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
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Доход"]} />
                    <Legend />
                    <Bar dataKey="value" fill="#22c55e" name="Доход" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-0">
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>Экспорт</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Эффективность курсов</CardTitle>
              <CardDescription>Сравнение популярности и доходности курсов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCourseData.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{course.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {course.students} студентов | ₽{course.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Студенты</span>
                          <span>{Math.round((course.students / 120) * 100)}%</span>
                        </div>
                        <Progress value={(course.students / 120) * 100} className="h-2" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Доход</span>
                          <span>{Math.round((course.revenue / 1200000) * 100)}%</span>
                        </div>
                        <Progress value={(course.revenue / 1200000) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Показано {filteredCourseData.length} из {courseData.length} курсов
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/analytics">
                  Подробная аналитика <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Курсы</CardTitle>
              <CardDescription>Детальная информация по курсам</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Содержимое вкладки курсов будет здесь</p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/analytics/courses">
                  Перейти к полной аналитике курсов <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Студенты</CardTitle>
              <CardDescription>Информация о студентах</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Содержимое вкладки студентов будет здесь</p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/analytics/students">
                  Перейти к полной аналитике студентов <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Финансы</CardTitle>
              <CardDescription>Финансовые показатели</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Содержимое вкладки финансов будет здесь</p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/analytics/finance">
                  Перейти к полной финансовой аналитике <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
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
