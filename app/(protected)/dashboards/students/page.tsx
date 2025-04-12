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
} from "recharts"
import { ArrowUpRight, ArrowDownRight, GraduationCap, Users, Clock, BookOpen, Brain } from "lucide-react"

// Данные для графиков
const enrollmentTrendData = [
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

const studentsByAgeData = [
  { name: "14-18", value: 120, color: "#3b82f6" },
  { name: "19-24", value: 250, color: "#22c55e" },
  { name: "25-34", value: 350, color: "#eab308" },
  { name: "35-44", value: 200, color: "#ef4444" },
  { name: "45+", value: 80, color: "#8b5cf6" },
]

const studentsByCourseData = [
  { name: "Программирование", students: 320 },
  { name: "Дизайн", students: 220 },
  { name: "Маркетинг", students: 180 },
  { name: "Бизнес", students: 150 },
  { name: "IT-инфраструктура", students: 130 },
]

const retentionData = [
  { name: "1 месяц", rate: 95 },
  { name: "3 месяца", rate: 85 },
  { name: "6 месяцев", rate: 75 },
  { name: "9 месяцев", rate: 65 },
  { name: "12 месяцев", rate: 60 },
]

const studentPerformanceData = [
  { name: "Отлично", value: 250, color: "#22c55e" },
  { name: "Хорошо", value: 350, color: "#3b82f6" },
  { name: "Удовлетворительно", value: 150, color: "#eab308" },
  { name: "Неудовлетворительно", value: 50, color: "#ef4444" },
]

const attendanceData = [
  { name: "Янв", rate: 92 },
  { name: "Фев", rate: 88 },
  { name: "Мар", rate: 90 },
  { name: "Апр", rate: 85 },
  { name: "Май", rate: 82 },
  { name: "Июн", rate: 80 },
]

export default function StudentsDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Всего студентов"
          value="1,000"
          change="+12%"
          trend="up"
          description="с прошлого месяца"
          icon={<GraduationCap className="h-4 w-4 text-white" />}
          color="bg-blue-600"
        />
        <MetricCard
          title="Новые студенты"
          value="85"
          change="+15%"
          trend="up"
          description="с прошлого месяца"
          icon={<Users className="h-4 w-4 text-white" />}
          color="bg-green-600"
        />
        <MetricCard
          title="Удержание"
          value="85%"
          change="+3%"
          trend="up"
          description="с прошлого месяца"
          icon={<Clock className="h-4 w-4 text-white" />}
          color="bg-purple-600"
        />
        <MetricCard
          title="Средняя успеваемость"
          value="4.2"
          change="+0.3"
          trend="up"
          description="с прошлого месяца"
          icon={<BookOpen className="h-4 w-4 text-white" />}
          color="bg-indigo-600"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="demographics">Демография</TabsTrigger>
          <TabsTrigger value="performance">Успеваемость</TabsTrigger>
          <TabsTrigger value="retention">Удержание</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
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
                  <LineChart data={enrollmentTrendData}>
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
                <CardTitle>Распределение по курсам</CardTitle>
                <CardDescription>Количество студентов по направлениям</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={studentsByCourseData}>
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
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Успеваемость студентов</CardTitle>
              <CardDescription>Распределение студентов по успеваемости</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={studentPerformanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {studentPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Возрастные группы</CardTitle>
                <CardDescription>Распределение студентов по возрасту</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={studentsByAgeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {studentsByAgeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Гендерное распределение</CardTitle>
                <CardDescription>Распределение студентов по полу</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Мужчины", value: 650, color: "#3b82f6" },
                        { name: "Женщины", value: 350, color: "#ec4899" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#ec4899" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Географическое распределение</CardTitle>
              <CardDescription>Распределение студентов по регионам</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Москва", value: 350 },
                    { name: "Санкт-Петербург", value: 250 },
                    { name: "Новосибирск", value: 120 },
                    { name: "Екатеринбург", value: 100 },
                    { name: "Казань", value: 80 },
                    { name: "Другие", value: 100 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Студенты" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Успеваемость по курсам</CardTitle>
                <CardDescription>Средний балл по различным курсам</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { name: "Программирование", value: 4.2 },
                      { name: "Дизайн", value: 4.5 },
                      { name: "Маркетинг", value: 4.3 },
                      { name: "Бизнес", value: 4.0 },
                      { name: "IT-инфраструктура", value: 3.8 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#22c55e" name="Средний балл" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Посещаемость</CardTitle>
                <CardDescription>Процент посещаемости занятий по месяцам</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[50, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} name="Посещаемость (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Выполнение заданий</CardTitle>
                  <CardDescription>Процент выполнения заданий по курсам</CardDescription>
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
              <div className="space-y-4">
                {studentsByCourseData.map((course, index) => {
                  // Рассчитываем примерный процент выполнения заданий для каждого курса
                  const completionRate = 70 + Math.floor(Math.random() * 25)
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{course.name}</span>
                        <span className="text-sm text-muted-foreground">{completionRate}% выполнено</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Показатели удержания</CardTitle>
              <CardDescription>Процент студентов, продолжающих обучение</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={retentionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rate" fill="#3b82f6" name="Удержание (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Причины отчисления</CardTitle>
                <CardDescription>Основные причины прекращения обучения</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Финансовые причины", value: 35, color: "#ef4444" },
                        { name: "Нехватка времени", value: 25, color: "#eab308" },
                        { name: "Сложность материала", value: 20, color: "#3b82f6" },
                        { name: "Смена интересов", value: 15, color: "#8b5cf6" },
                        { name: "Другое", value: 5, color: "#22c55e" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {studentsByAgeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Удержание по курсам</CardTitle>
                <CardDescription>Процент удержания студентов по курсам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentsByCourseData.map((course, index) => {
                    // Рассчитываем примерный процент удержания для каждого курса
                    const retentionRate = 70 + Math.floor(Math.random() * 20)
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{course.name}</span>
                          <span className="text-sm text-muted-foreground">{retentionRate}% удержание</span>
                        </div>
                        <Progress value={retentionRate} className="h-2" />
                      </div>
                    )
                  })}
                </div>
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
