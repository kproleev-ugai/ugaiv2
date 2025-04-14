"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  Users,
  FolderOpen,
  Calendar,
  Target,
  CheckSquare,
  Bell,
  LineChart,
  Briefcase,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/contexts/user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useUser()

  const mainRoutes = [
    {
      label: "Главная",
      icon: Home,
      href: "/",
      color: "text-sky-500",
    },
    {
      label: "Панель управления",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-violet-500",
    },
    {
      label: "Проекты",
      icon: FolderOpen,
      href: "/projects",
      color: "text-pink-500",
    },
    {
      label: "Документы",
      icon: FileText,
      href: "/documents",
      color: "text-orange-500",
    },
    {
      label: "Аналитика",
      icon: BarChart3,
      href: "/analytics",
      color: "text-emerald-500",
    },
    {
      label: "Пользователи",
      icon: Users,
      href: "/users",
      color: "text-blue-500",
    },
    {
      label: "Календарь",
      icon: Calendar,
      href: "/calendar",
      color: "text-rose-500",
    },
    {
      label: "Настройки",
      icon: Settings,
      href: "/settings",
      color: "text-gray-500",
    },
  ]

  const personalTools = [
    {
      label: "Мой рабочий стол",
      icon: LayoutDashboard,
      href: "/my-workspace",
      color: "text-indigo-500",
    },
    {
      label: "Мои KPI",
      icon: Target,
      href: "/my-kpi",
      color: "text-green-500",
    },
    {
      label: "Мои задачи",
      icon: CheckSquare,
      href: "/my-tasks",
      color: "text-amber-500",
    },
    {
      label: "Мои отчеты",
      icon: LineChart,
      href: "/my-reports",
      color: "text-cyan-500",
    },
    {
      label: "Мои проекты",
      icon: Briefcase,
      href: "/my-projects",
      color: "text-purple-500",
    },
    {
      label: "Уведомления",
      icon: Bell,
      href: "/notifications",
      color: "text-red-500",
    },
  ]

  return (
    <div className={cn("pb-12 h-full", className)}>
      {user && (
        <div className="flex items-center gap-2 px-4 py-2 mb-2">
          <Avatar>
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.position}</p>
          </div>
        </div>
      )}

      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Навигация</h2>
          <div className="space-y-1">
            {mainRoutes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", pathname === route.href && "bg-secondary")}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className={cn("mr-2 h-5 w-5", route.color)} />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <Separator className="mx-3" />

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Мои инструменты</h2>
          <div className="space-y-1">
            {personalTools.map((tool) => (
              <Button
                key={tool.href}
                variant={pathname === tool.href ? "secondary" : "ghost"}
                className={cn("w-full justify-start", pathname === tool.href && "bg-secondary")}
                asChild
              >
                <Link href={tool.href}>
                  <tool.icon className={cn("mr-2 h-5 w-5", tool.color)} />
                  {tool.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
