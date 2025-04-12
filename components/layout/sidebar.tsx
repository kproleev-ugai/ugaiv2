"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileText, Home, LayoutDashboard, Settings, Users, FolderOpen, Calendar } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
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

  return (
    <div className={cn("pb-12 h-full", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Навигация</h2>
          <div className="space-y-1">
            {routes.map((route) => (
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
      </div>
    </div>
  )
}
