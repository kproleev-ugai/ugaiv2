"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const dashboardTypes = [
    { name: "Main Dashboard", href: "/analytics", icon: LayoutDashboard },
    { name: "Finance", href: "/analytics/finance", icon: DollarSign, badge: "AI" },
    { name: "Marketing", href: "/analytics/marketing", icon: TrendingUp, badge: "AI" },
    { name: "Sales", href: "/analytics/sales", icon: BarChart3, badge: "AI" },
    { name: "Students", href: "/analytics/students", icon: GraduationCap },
    { name: "Teachers", href: "/analytics/teachers", icon: Users },
    { name: "Courses", href: "/analytics/courses", icon: BookOpen },
    { name: "Schedule", href: "/analytics/schedule", icon: Calendar },
  ]

  // Определяем текущий активный дашборд для хлебных крошек
  const activeDashboard =
    dashboardTypes.find((type) => type.href === pathname || pathname.startsWith(type.href + "/")) || dashboardTypes[0]

  return (
    <div className="flex flex-col space-y-2 p-2 md:p-4">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/analytics" className="text-sm font-medium">
                Analytics
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname !== "/analytics" && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={activeDashboard.href}>{activeDashboard.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Separator className="my-1" />

      <div className="flex overflow-x-auto pb-1 hide-scrollbar">
        <div className="flex space-x-2">
          {dashboardTypes.map((type) => {
            const isActive = type.href === "/analytics" ? pathname === "/analytics" : pathname.startsWith(type.href)

            return (
              <Button
                key={type.href}
                variant={isActive ? "default" : "outline"}
                size="sm"
                asChild
                className="flex items-center h-7 text-xs"
              >
                <Link href={type.href}>
                  <type.icon className="mr-1.5 h-3.5 w-3.5" />
                  {type.name}
                  {type.badge && (
                    <Badge
                      variant="outline"
                      className="ml-1 text-[8px] h-3 px-1 py-0 border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800"
                    >
                      {type.badge}
                    </Badge>
                  )}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
