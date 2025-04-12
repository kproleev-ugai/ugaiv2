"use client"

import type React from "react"

import { SecondaryNav } from "@/components/navigation/secondary-nav"
import { FilterBar } from "@/components/analytics/filter-bar"
import { ActionSidebar } from "@/components/analytics/action-sidebar"
import { AIPanel } from "@/components/analytics/ai-panel"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ChevronRight,
  Users,
  BarChart3,
  DollarSign,
  TrendingUp,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function OKRDashboard() {
  const [actionSidebarCollapsed, setActionSidebarCollapsed] = useState(false)
  const toggleActionSidebar = () => setActionSidebarCollapsed(!actionSidebarCollapsed)

  return (
    <>
      <SecondaryNav />
      <FilterBar />
      <div className="flex flex-1 overflow-hidden">
        <ActionSidebar collapsed={actionSidebarCollapsed} onToggle={toggleActionSidebar} />
        <div className="space-y-4 p-4 flex-1 overflow-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">OKR Dashboard</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Objective
            </Button>
          </div>

          <Tabs defaultValue="objectives" className="space-y-4">
            <TabsList>
              <TabsTrigger value="objectives">Objectives</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="objectives" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Total Objectives</CardTitle>
                    <CardDescription>Current quarter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12</div>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <Target className="mr-1 h-4 w-4" />4 teams involved
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Completed</CardTitle>
                    <CardDescription>Current quarter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">5</div>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                      42% completion rate
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">In Progress</CardTitle>
                    <CardDescription>Current quarter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">6</div>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4 text-amber-500" />
                      50% of objectives
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">At Risk</CardTitle>
                    <CardDescription>Current quarter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1</div>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                      8% of objectives
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Company Objectives</h2>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">Increase Revenue by 25%</CardTitle>
                        <CardDescription>Q2 2025 • Finance</CardDescription>
                      </div>
                      <Badge className="bg-amber-500">In Progress</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium">Progress</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Key Results:</div>
                        <div className="grid gap-2">
                          <KeyResult
                            title="Achieve $2M in new sales"
                            progress={80}
                            status="on-track"
                            owner="Sales Team"
                            icon={<DollarSign className="h-4 w-4" />}
                          />
                          <KeyResult
                            title="Launch 2 new product lines"
                            progress={50}
                            status="on-track"
                            owner="Product Team"
                            icon={<BarChart3 className="h-4 w-4" />}
                          />
                          <KeyResult
                            title="Expand to 3 new markets"
                            progress={30}
                            status="at-risk"
                            owner="Marketing Team"
                            icon={<TrendingUp className="h-4 w-4" />}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">Improve Customer Satisfaction Score to 9.0</CardTitle>
                        <CardDescription>Q2 2025 • Customer Success</CardDescription>
                      </div>
                      <Badge className="bg-green-500">Completed</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium">Progress</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-medium">Key Results:</div>
                        <div className="grid gap-2">
                          <KeyResult
                            title="Reduce support response time to < 2 hours"
                            progress={100}
                            status="completed"
                            owner="Support Team"
                            icon={<Clock className="h-4 w-4" />}
                          />
                          <KeyResult
                            title="Implement new customer feedback system"
                            progress={100}
                            status="completed"
                            owner="Product Team"
                            icon={<Users className="h-4 w-4" />}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button variant="outline" className="w-full">
                  View All Objectives
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>OKR Tasks</CardTitle>
                  <CardDescription>Tasks related to objectives and key results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div className="grid gap-1">
                          <div className="font-medium">Research new market opportunities</div>
                          <div className="text-sm text-muted-foreground">Due: Jun 15, 2025</div>
                        </div>
                        <Badge>High Priority</Badge>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div className="grid gap-1">
                          <div className="font-medium">Develop sales training program</div>
                          <div className="text-sm text-muted-foreground">Due: May 30, 2025</div>
                        </div>
                        <Badge variant="outline">Medium Priority</Badge>
                      </div>
                    </div>
                    <div className="rounded-md border">
                      <div className="flex items-center justify-between p-4">
                        <div className="grid gap-1">
                          <div className="font-medium">Implement customer feedback system</div>
                          <div className="text-sm text-muted-foreground">Due: Apr 22, 2025</div>
                        </div>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>OKR Reports</CardTitle>
                  <CardDescription>Performance reports and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Q1 2025 OKR Performance Report</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Overall completion rate: 85% (17/20 key results achieved)
                      </p>
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </div>
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Team Performance Comparison</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Analysis of OKR performance across different teams
                      </p>
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </div>
                    <div className="rounded-md border p-4">
                      <h3 className="font-medium mb-2">Historical OKR Trends</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Year-over-year analysis of objective completion rates
                      </p>
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <AIPanel />
      </div>
    </>
  )
}

interface KeyResultProps {
  title: string
  progress: number
  status: "on-track" | "at-risk" | "completed"
  owner: string
  icon?: React.ReactNode
}

function KeyResult({ title, progress, status, owner, icon }: KeyResultProps) {
  return (
    <div className="flex items-center gap-4 rounded-md border p-3">
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          status === "on-track"
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
            : status === "at-risk"
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        )}
      >
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{title}</p>
          <span className="text-xs font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{owner}</span>
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              status === "on-track"
                ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
                : status === "at-risk"
                  ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
                  : "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400",
            )}
          >
            {status === "on-track" ? "On Track" : status === "at-risk" ? "At Risk" : "Completed"}
          </Badge>
        </div>
      </div>
    </div>
  )
}
