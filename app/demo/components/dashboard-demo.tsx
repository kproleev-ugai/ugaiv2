"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowUpIcon, ChevronRight } from "lucide-react"

// Sample data
const revenueData = [
  { month: "Jan", revenue: 45000, target: 40000 },
  { month: "Feb", revenue: 52000, target: 45000 },
  { month: "Mar", revenue: 48000, target: 50000 },
  { month: "Apr", revenue: 58000, target: 55000 },
  { month: "May", revenue: 63000, target: 60000 },
  { month: "Jun", revenue: 69000, target: 65000 },
]

const conversionData = [
  { date: "16/06", value: 2.4 },
  { date: "17/06", value: 2.2 },
  { date: "18/06", value: 2.7 },
  { date: "19/06", value: 3.1 },
  { date: "20/06", value: 3.5 },
  { date: "21/06", value: 3.2 },
  { date: "22/06", value: 3.6 },
]

const channelData = [
  { name: "Direct Traffic", value: 1300, growth: 12 },
  { name: "Search", value: 900, growth: 8 },
  { name: "Advertising", value: 700, growth: -5 },
  { name: "Social Media", value: 500, growth: 15 },
  { name: "Email", value: 300, growth: 20 },
]

export default function DashboardDemo() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">CEO Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (€)</CardTitle>
            <Badge className="bg-green-500">+12.5% MoM</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€69,000</div>
            <p className="text-xs text-muted-foreground">Target: €65,000 (106%)</p>
            <div className="h-[180px] mt-4">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                  target: {
                    label: "Target",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Bar dataKey="revenue" name="Revenue" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" name="Target" fill="var(--color-target)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion (%)</CardTitle>
            <Badge className="bg-green-500">+0.4% WoW</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.6%</div>
            <p className="text-xs text-muted-foreground">Target: 3.0% (120%)</p>
            <div className="h-[180px] mt-4">
              <ChartContainer
                config={{
                  value: {
                    label: "Conversion",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis domain={[2, 4]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Conversion"
                      stroke="var(--color-value)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
            <Badge variant="outline">June 2023</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelData.map((channel, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-[60%]">
                    <div className="text-sm font-medium">{channel.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{channel.value} visitors</div>
                  </div>
                  <div className="w-[40%] flex items-center gap-2">
                    <div className={`text-sm font-medium ${channel.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                      {channel.growth > 0 ? "+" : ""}
                      {channel.growth}%
                    </div>
                    {channel.growth > 0 ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}

              <button className="w-full flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground mt-2">
                Show all <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">CAC</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold">€320</div>
                    <Badge className="bg-green-500">-8%</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">LTV</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold">€2,450</div>
                    <Badge className="bg-green-500">+5%</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">CLTV/CAC</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold">7.6</div>
                    <Badge className="bg-green-500">+14%</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Churn Rate</div>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold">5.2%</div>
                    <Badge variant="destructive">+0.8%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">New Product Launch</div>
                  <div className="text-sm text-muted-foreground">Target: 25/06/2023</div>
                </div>
                <Badge className="bg-amber-500">In Progress</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Website Redesign</div>
                  <div className="text-sm text-muted-foreground">Target: 15/06/2023</div>
                </div>
                <Badge variant="outline" className="bg-blue-500 text-white">
                  Completed
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">CRM Integration</div>
                  <div className="text-sm text-muted-foreground">Target: 10/07/2023</div>
                </div>
                <Badge className="bg-green-500">On Track</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Q3 Marketing Campaign</div>
                  <div className="text-sm text-muted-foreground">Target: 01/07/2023</div>
                </div>
                <Badge variant="destructive">Behind</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
