"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, Bar, Line } from "recharts"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, ShoppingCart, Brain, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

// Enhanced data for charts
const salesData = [
  { name: "Jan", actual: 4000, target: 2400, forecast: 4200 },
  { name: "Feb", actual: 3000, target: 1398, forecast: 3200 },
  { name: "Mar", actual: 2000, target: 9800, forecast: 2100 },
  { name: "Apr", actual: 2780, target: 3908, forecast: 2900 },
  { name: "May", actual: 1890, target: 4800, forecast: 2000 },
  { name: "Jun", actual: 2390, target: 3800, forecast: 2500 },
  { name: "Jul", actual: 3490, target: 4300, forecast: 3600 },
]

const channelData = [
  { name: "Search", value: 4000, efficiency: 0.85, roi: 320 },
  { name: "Social", value: 3000, efficiency: 0.72, roi: 240 },
  { name: "Email", value: 2000, efficiency: 0.91, roi: 380 },
  { name: "Display", value: 2780, efficiency: 0.68, roi: 210 },
  { name: "Affiliate", value: 1890, efficiency: 0.79, roi: 290 },
]

const funnelData = [
  { stage: "Awareness", value: 10000, conversion: 0.5 },
  { stage: "Interest", value: 5000, conversion: 0.4 },
  { stage: "Consideration", value: 2000, conversion: 0.5 },
  { stage: "Intent", value: 1000, conversion: 0.7 },
  { stage: "Purchase", value: 700, conversion: 1.0 },
]

export function MainMonitoring() {
  return (
    <div className="space-y-3 p-3">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Revenue"
          value="$45,231"
          change="+20.1%"
          trend="up"
          icon={<DollarSign className="h-3.5 w-3.5" />}
          description="vs. previous month"
          color="blue"
          aiInsight="Trending 15% above forecast"
        />
        <MetricCard
          title="Channel Efficiency"
          value="0.78"
          change="+10.1%"
          trend="up"
          icon={<Zap className="h-3.5 w-3.5" />}
          description="Marginal efficiency"
          color="indigo"
          aiInsight="Email shows highest ROI"
        />
        <MetricCard
          title="Sales Conversion"
          value="3.2%"
          change="-5.1%"
          trend="down"
          icon={<ShoppingCart className="h-3.5 w-3.5" />}
          description="Funnel conversion rate"
          color="purple"
          aiInsight="Bottleneck at consideration stage"
        />
        <MetricCard
          title="Revenue per Employee"
          value="$12,450"
          change="+2.3%"
          trend="up"
          icon={<Users className="h-3.5 w-3.5" />}
          description="Monthly average"
          color="green"
          aiInsight="7% above industry benchmark"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CardTitle className="text-sm">Revenue Forecast</CardTitle>
                <Badge
                  variant="outline"
                  className="ml-2 text-[9px] h-3.5 px-1 py-0 border-indigo-200 bg-indigo-50 text-indigo-700"
                >
                  <Brain className="mr-1 h-2 w-2" />
                  AI
                </Badge>
              </div>
              <Tabs defaultValue="weekly" className="w-[180px]">
                <TabsList className="grid w-full grid-cols-3 h-7">
                  <TabsTrigger value="weekly" className="text-xs">
                    Weekly
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="text-xs">
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger value="yearly" className="text-xs">
                    Yearly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription className="text-xs">AI-powered revenue prediction with 94% accuracy</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual",
                  color: "hsl(var(--chart-blue))",
                },
                target: {
                  label: "Target",
                  color: "hsl(var(--chart-indigo))",
                },
                forecast: {
                  label: "AI Forecast",
                  color: "hsl(var(--chart-purple))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="var(--color-target)" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="var(--color-forecast)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CardTitle className="text-sm">Channel Efficiency</CardTitle>
                <Badge
                  variant="outline"
                  className="ml-2 text-[9px] h-3.5 px-1 py-0 border-indigo-200 bg-indigo-50 text-indigo-700"
                >
                  <Brain className="mr-1 h-2 w-2" />
                  AI
                </Badge>
              </div>
              <Tabs defaultValue="efficiency" className="w-[180px]">
                <TabsList className="grid w-full grid-cols-2 h-7">
                  <TabsTrigger value="efficiency" className="text-xs">
                    Efficiency
                  </TabsTrigger>
                  <TabsTrigger value="roi" className="text-xs">
                    ROI
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription className="text-xs">Marginal Channel Efficiency analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Value",
                  color: "hsl(var(--chart-blue))",
                },
                efficiency: {
                  label: "Efficiency",
                  color: "hsl(var(--chart-green))",
                },
                roi: {
                  label: "ROI %",
                  color: "hsl(var(--chart-purple))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    stroke="var(--color-efficiency)"
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CardTitle className="text-sm">Sales Funnel</CardTitle>
              <Badge
                variant="outline"
                className="ml-2 text-[9px] h-3.5 px-1 py-0 border-indigo-200 bg-indigo-50 text-indigo-700"
              >
                <Brain className="mr-1 h-2 w-2" />
                AI
              </Badge>
            </div>
            <CardDescription className="text-xs">Conversion analysis by funnel stage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {funnelData.map((stage, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{stage.stage}</span>
                  <span>{stage.value.toLocaleString()}</span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-full bg-indigo-600 dark:bg-indigo-400"
                    style={{ width: `${(stage.value / funnelData[0].value) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Conversion: {(stage.conversion * 100).toFixed(1)}%</span>
                  {index < funnelData.length - 1 && (
                    <span>Drop-off: {((1 - funnelData[index + 1].value / stage.value) * 100).toFixed(1)}%</span>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-2 rounded-md border border-indigo-100 bg-indigo-50 p-2 dark:border-indigo-900 dark:bg-indigo-900/20">
              <div className="flex items-center text-xs">
                <Brain className="mr-1 h-3 w-3 text-indigo-600" />
                <span className="font-medium text-indigo-700 dark:text-indigo-400">AI Insight:</span>
              </div>
              <p className="mt-1 text-xs text-indigo-700 dark:text-indigo-400">
                Consideration stage shows 20% higher drop-off than industry average. Recommend adding social proof and
                testimonials.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">KPI Tracking</CardTitle>
            <CardDescription className="text-xs">Progress toward quarterly objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Revenue Growth</span>
                <span>75% of target</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-green-600 dark:bg-green-400" style={{ width: "75%" }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Customer Acquisition</span>
                <span>62% of target</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-amber-600 dark:bg-amber-400" style={{ width: "62%" }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Profit Margin</span>
                <span>92% of target</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-blue-600 dark:bg-blue-400" style={{ width: "92%" }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Customer Satisfaction</span>
                <span>88% of target</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-purple-600 dark:bg-purple-400" style={{ width: "88%" }} />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Overall OKR Progress</span>
              <span className="font-medium text-green-600 dark:text-green-400">On Track</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center">
              <CardTitle className="text-sm">Revenue per Employee</CardTitle>
              <Badge
                variant="outline"
                className="ml-2 text-[9px] h-3.5 px-1 py-0 border-indigo-200 bg-indigo-50 text-indigo-700"
              >
                <Brain className="mr-1 h-2 w-2" />
                AI
              </Badge>
            </div>
            <CardDescription className="text-xs">Productivity and efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Sales Team</span>
                <span>$18,450 / employee</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-blue-600 dark:bg-blue-400" style={{ width: "85%" }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Marketing Team</span>
                <span>$14,280 / employee</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-indigo-600 dark:bg-indigo-400" style={{ width: "65%" }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Product Team</span>
                <span>$9,120 / employee</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-purple-600 dark:bg-purple-400" style={{ width: "42%" }} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">Support Team</span>
                <span>$7,850 / employee</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className="h-full bg-green-600 dark:bg-green-400" style={{ width: "36%" }} />
              </div>
            </div>
            <div className="mt-2 rounded-md border border-indigo-100 bg-indigo-50 p-2 dark:border-indigo-900 dark:bg-indigo-900/20">
              <div className="flex items-center text-xs">
                <Brain className="mr-1 h-3 w-3 text-indigo-600" />
                <span className="font-medium text-indigo-700 dark:text-indigo-400">AI Insight:</span>
              </div>
              <p className="mt-1 text-xs text-indigo-700 dark:text-indigo-400">
                Sales team productivity is 12% above industry benchmark. Consider implementing their best practices
                across other teams.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  description: string
  color: "blue" | "indigo" | "purple" | "green" | "red" | "orange"
  aiInsight?: string
}

function MetricCard({ title, value, change, trend, icon, description, color, aiInsight }: MetricCardProps) {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    indigo: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    orange: "from-orange-500 to-orange-600",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
        <div className="flex items-center">
          <CardTitle className="text-xs font-medium">{title}</CardTitle>
          {aiInsight && (
            <Badge
              variant="outline"
              className="ml-1 text-[9px] h-3.5 px-1 py-0 border-indigo-200 bg-indigo-50 text-indigo-700"
            >
              <Brain className="mr-0.5 h-2 w-2" />
              AI
            </Badge>
          )}
        </div>
        <div className={cn("rounded-full p-1 text-white bg-gradient-to-br", colorMap[color])}>{icon}</div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="text-xl font-bold">{value}</div>
        <div className="flex items-center space-x-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3 text-green-500" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-500" />
          )}
          <p className={cn("text-xs", trend === "up" ? "text-green-500" : "text-red-500")}>{change}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        {aiInsight && (
          <div className="mt-1 flex items-center text-xs text-indigo-600 dark:text-indigo-400">
            <Brain className="mr-1 h-2.5 w-2.5" />
            <span>{aiInsight}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
