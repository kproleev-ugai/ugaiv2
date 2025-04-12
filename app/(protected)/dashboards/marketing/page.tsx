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
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Target, Globe, Brain } from "lucide-react"

// Данные для графиков
const leadSourceData = [
  { name: "Веб-сайт", value: 120, color: "#3b82f6" },
  { name: "Социальные сети", value: 85, color: "#8b5cf6" },
  { name: "Рекомендации", value: 65, color: "#22c55e" },
  { name: "Мероприятия", value: 45, color: "#eab308" },
  { name: "Email-маркетинг", value: 35, color: "#ef4444" },
]

const conversionData = [
  { name: "Посетители", value: 5000 },
  { name: "Лиды", value: 1200 },
  { name: "Заявки", value: 600 },
  { name: "Студенты", value: 300 },
]

const campaignPerformanceData = [
  { name: "Кампания 1", leads: 45, conversions: 15, cost: 50000 },
  { name: "Кампания 2", leads: 65, conversions: 25, cost: 75000 },
  { name: "Кампания 3", leads: 35, conversions: 12, cost: 40000 },
  { name: "Кампания 4", leads: 80, conversions: 30, cost: 90000 },
  { name: "Кампания 5", leads: 55, conversions: 20, cost: 60000 },
]

const channelPerformanceData = [
  { name: "Янв", website: 45, social: 30, email: 25, referral: 20, events: 15 },
  { name: "Фев", website: 50, social: 35, email: 20, referral: 25, events: 10 },
  { name: "Мар", website: 60, social: 40, email: 30, referral: 15, events: 20 },
  { name: "Апр", website: 55, social: 45, email: 35, referral: 30, events: 25 },
  { name: "Май", website: 65, social: 50, email: 30, referral: 25, events: 20 },
  { name: "Июн", website: 70, social: 55, email: 35, referral: 30, events: 25 },
]

const websiteTrafficData = [
  { name: "Янв", visitors: 3500, pageviews: 12000 },
  { name: "Фев", visitors: 4000, pageviews: 14000 },
  { name: "Мар", visitors: 4500, pageviews: 16000 },
  { name: "Апр", visitors: 4200, pageviews: 15000 },
  { name: "Май", visitors: 5000, pageviews: 18000 },
  { name: "Июн", visitors: 5500, pageviews: 20000 },
]

export default function MarketingDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Новые лиды"
          value="245"
          change="+22%"
          trend="up"
          description="с прошлого месяца"
          icon={<Users className="h-4 w-4 text-white" />}
          color="bg-blue-600"
        />
        <MetricCard
          title="Конверсия"
          value="5.8%"
          change="+1.2%"
          trend="up"
          description="с прошлого месяца"
          icon={<TrendingUp className="h-4 w-4 text-white" />}
          color="bg-green-600"
        />
        <MetricCard
          title="Стоимость привлечения"
          value="₽2,500"
          change="-15%"
          trend="down"
          description="с прошлого месяца"
          icon={<Target className="h-4 w-4 text-white" />}
          color="bg-purple-600"
        />
        <MetricCard
          title="Посетители сайта"
          value="5,500"
          change="+10%"
          trend="up"
          description="с прошлого месяца"
          icon={<Globe className="h-4 w-4 text-white" />}
          color="bg-indigo-600"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="campaigns">Кампании</TabsTrigger>
          <TabsTrigger value="channels">Каналы</TabsTrigger>
          <TabsTrigger value="website">Веб-сайт</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Источники лидов</CardTitle>
                    <CardDescription>Распределение лидов по источникам</CardDescription>
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
                      data={leadSourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadSourceData.map((entry, index) => (
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
                <CardTitle>Воронка конверсии</CardTitle>
                <CardDescription>Путь от посетителя до студента</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={conversionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" name="Количество" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Эффективность каналов</CardTitle>
              <CardDescription>Сравнение эффективности различных маркетинговых каналов</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={channelPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="website" stackId="1" fill="#3b82f6" stroke="#3b82f6" name="Веб-сайт" />
                  <Area
                    type="monotone"
                    dataKey="social"
                    stackId="1"
                    fill="#8b5cf6"
                    stroke="#8b5cf6"
                    name="Социальные сети"
                  />
                  <Area type="monotone" dataKey="email" stackId="1" fill="#22c55e" stroke="#22c55e" name="Email" />
                  <Area
                    type="monotone"
                    dataKey="referral"
                    stackId="1"
                    fill="#eab308"
                    stroke="#eab308"
                    name="Рекомендации"
                  />
                  <Area
                    type="monotone"
                    dataKey="events"
                    stackId="1"
                    fill="#ef4444"
                    stroke="#ef4444"
                    name="Мероприятия"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Эффективность кампаний</CardTitle>
              <CardDescription>Сравнение результатов маркетинговых кампаний</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={campaignPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="leads" fill="#3b82f6" name="Лиды" />
                  <Bar yAxisId="left" dataKey="conversions" fill="#22c55e" name="Конверсии" />
                  <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#ef4444" name="Стоимость (₽)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>ROI кампаний</CardTitle>
                <CardDescription>Возврат инвестиций по кампаниям</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignPerformanceData.map((campaign, index) => {
                    // Рассчитываем примерный ROI для каждой кампании
                    const roi = ((campaign.conversions * 25000) / campaign.cost - 1) * 100
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{campaign.name}</span>
                          <span className="text-sm text-muted-foreground">ROI: {roi.toFixed(1)}%</span>
                        </div>
                        <Progress value={roi} max={300} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Стоимость привлечения</CardTitle>
                <CardDescription>Стоимость привлечения одного студента</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignPerformanceData.map((campaign, index) => {
                    // Рассчитываем стоимость привлечения для каждой кампании
                    const cac = campaign.cost / campaign.conversions
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{campaign.name}</span>
                          <span className="text-sm text-muted-foreground">CAC: ₽{cac.toLocaleString()}</span>
                        </div>
                        <Progress value={100 - (cac / 5000) * 100} max={100} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Эффективность каналов</CardTitle>
                <CardDescription>Сравнение эффективности различных каналов</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={channelPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="website" stroke="#3b82f6" name="Веб-сайт" strokeWidth={2} />
                    <Line type="monotone" dataKey="social" stroke="#8b5cf6" name="Социальные сети" strokeWidth={2} />
                    <Line type="monotone" dataKey="email" stroke="#22c55e" name="Email" strokeWidth={2} />
                    <Line type="monotone" dataKey="referral" stroke="#eab308" name="Рекомендации" strokeWidth={2} />
                    <Line type="monotone" dataKey="events" stroke="#ef4444" name="Мероприятия" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Распределение бюджета</CardTitle>
                <CardDescription>Распределение маркетингового бюджета по каналам</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Веб-сайт", value: 250000, color: "#3b82f6" },
                        { name: "Социальные сети", value: 180000, color: "#8b5cf6" },
                        { name: "Email-маркетинг", value: 120000, color: "#22c55e" },
                        { name: "Мероприятия", value: 200000, color: "#eab308" },
                        { name: "Контекстная реклама", value: 150000, color: "#ef4444" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₽${value.toLocaleString()}`, "Бюджет"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Конверсия по каналам</CardTitle>
              <CardDescription>Сравнение конверсии различных маркетинговых каналов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadSourceData.map((source, index) => {
                  // Рассчитываем примерную конверсию для каждого канала
                  const conversion = 3 + Math.floor(Math.random() * 8)
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{source.name}</span>
                        <span className="text-sm text-muted-foreground">Конверсия: {conversion}%</span>
                      </div>
                      <Progress value={conversion} max={10} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="website" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Трафик веб-сайта</CardTitle>
                  <CardDescription>Посетители и просмотры страниц</CardDescription>
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
                <LineChart data={websiteTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="#3b82f6" name="Посетители" strokeWidth={2} />
                  <Line type="monotone" dataKey="pageviews" stroke="#22c55e" name="Просмотры страниц" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Источники трафика</CardTitle>
                <CardDescription>Откуда приходят посетители</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Органический поиск", value: 2500, color: "#3b82f6" },
                        { name: "Прямые переходы", value: 1200, color: "#22c55e" },
                        { name: "Социальные сети", value: 800, color: "#8b5cf6" },
                        { name: "Реферальные ссылки", value: 600, color: "#eab308" },
                        { name: "Контекстная реклама", value: 400, color: "#ef4444" },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadSourceData.map((entry, index) => (
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
                <CardTitle>Популярные страницы</CardTitle>
                <CardDescription>Наиболее посещаемые страницы сайта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Главная страница", views: 5200 },
                    { name: "Курсы программирования", views: 3800 },
                    { name: "О компании", views: 2500 },
                    { name: "Контакты", views: 1800 },
                    { name: "Блог", views: 1500 },
                  ].map((page, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{page.name}</span>
                        <span className="text-sm text-muted-foreground">{page.views.toLocaleString()} просмотров</span>
                      </div>
                      <Progress value={(page.views / 5200) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Показатели эффективности сайта</CardTitle>
              <CardDescription>Ключевые метрики эффективности веб-сайта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="font-medium">Отказы</h3>
                  <div className="text-2xl font-bold">32.5%</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowDownRight className="mr-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500">-2.3%</span> с прошлого месяца
                  </p>
                </div>

                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="font-medium">Среднее время на сайте</h3>
                  <div className="text-2xl font-bold">3:45</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500">+0:15</span> с прошлого месяца
                  </p>
                </div>

                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="font-medium">Конверсия форм</h3>
                  <div className="text-2xl font-bold">5.8%</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500">+0.7%</span> с прошлого месяца
                  </p>
                </div>

                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="font-medium">Страниц за сессию</h3>
                  <div className="text-2xl font-bold">3.2</div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                    <span className="text-green-500">+0.3</span> с прошлого месяца
                  </p>
                </div>
              </div>
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
