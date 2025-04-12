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

export default function DashboardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const dashboardTypes = [
    { name: "Общий обзор", href: "/dashboards", icon: LayoutDashboard },
    { name: "Финансы", href: "/dashboards/finance", icon: DollarSign },
    { name: "Маркетинг", href: "/dashboards/marketing", icon: TrendingUp },
    { name: "Продажи", href: "/dashboards/sales", icon: BarChart3 },
    { name: "Студенты", href: "/dashboards/students", icon: GraduationCap },
    { name: "Преподаватели", href: "/dashboards/teachers", icon: Users },
    { name: "Курсы", href: "/dashboards/courses", icon: BookOpen },
    { name: "Расписание", href: "/dashboards/schedule", icon: Calendar },
  ]

  return (
    <div className="flex flex-col space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Дашборды</h2>
        <p className="text-muted-foreground">Аналитика и мониторинг ключевых показателей ItStep</p>
      </div>
      <Separator />

      <div className="flex overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex space-x-2">
          {dashboardTypes.map((type) => {
            const isActive = type.href === "/dashboards" ? pathname === "/dashboards" : pathname.startsWith(type.href)

            return (
              <Button
                key={type.href}
                variant={isActive ? "default" : "outline"}
                size="sm"
                asChild
                className="flex items-center"
              >
                <Link href={type.href}>
                  <type.icon className="mr-2 h-4 w-4" />
                  {type.name}
                </Link>
              </Button>
            )
          })}
        </div>
      </div>

      {children}
    </div>
  )
}
