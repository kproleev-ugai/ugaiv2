"use client"

import type { ReactNode } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MyLayoutProps {
  children: ReactNode
}

export default function MyLayout({ children }: MyLayoutProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="border-b">
        <div className="container flex h-16 items-center px-4">
          <Tabs defaultValue={pathname} className="w-full">
            <TabsList className="grid grid-cols-6 h-10">
              <TabsTrigger value="/my-workspace" asChild>
                <Link href="/my-workspace" className={isActive("/my-workspace") ? "data-[state=active]" : ""}>
                  Рабочий стол
                </Link>
              </TabsTrigger>
              <TabsTrigger value="/my-tasks" asChild>
                <Link href="/my-tasks" className={isActive("/my-tasks") ? "data-[state=active]" : ""}>
                  Задачи
                </Link>
              </TabsTrigger>
              <TabsTrigger value="/my-kpi" asChild>
                <Link href="/my-kpi" className={isActive("/my-kpi") ? "data-[state=active]" : ""}>
                  KPI
                </Link>
              </TabsTrigger>
              <TabsTrigger value="/my-projects" asChild>
                <Link href="/my-projects" className={isActive("/my-projects") ? "data-[state=active]" : ""}>
                  Проекты
                </Link>
              </TabsTrigger>
              <TabsTrigger value="/my-reports" asChild>
                <Link href="/my-reports" className={isActive("/my-reports") ? "data-[state=active]" : ""}>
                  Отчеты
                </Link>
              </TabsTrigger>
              <TabsTrigger value="/my-calendar" asChild>
                <Link href="/my-calendar" className={isActive("/my-calendar") ? "data-[state=active]" : ""}>
                  Календарь
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
