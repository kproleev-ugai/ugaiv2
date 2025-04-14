"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "recharts"
import { ArrowUpRight, ArrowDownRight, GraduationCap, Users, DollarSign, BookOpen, Brain } from "lucide-react"

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

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
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
              <BarChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#3b82f6" name="Студенты" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
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
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Эффективность курсов</CardTitle>
          <CardDescription>Сравнение популярности и доходности курсов</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courseData.map((course, index) => (
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
      </Card>
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
