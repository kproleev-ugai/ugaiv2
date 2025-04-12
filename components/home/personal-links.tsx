"use client"

import type React from "react"

import Link from "next/link"
import { CheckSquare, FileText, Target, Calendar, Bell, Star, Clock, Bookmark } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PersonalLink {
  icon: React.ElementType
  title: string
  description: string
  href: string
  color: string
}

export function PersonalLinks() {
  const links: PersonalLink[] = [
    {
      icon: CheckSquare,
      title: "Мои задачи",
      description: "Управление текущими задачами",
      href: "/tasks",
      color: "text-blue-500",
    },
    {
      icon: FileText,
      title: "Мои отчеты",
      description: "Просмотр и создание отчетов",
      href: "/reports",
      color: "text-emerald-500",
    },
    {
      icon: Target,
      title: "Мои ОКР",
      description: "Цели и ключевые результаты",
      href: "/okr",
      color: "text-violet-500",
    },
    {
      icon: Calendar,
      title: "Мой календарь",
      description: "События и встречи",
      href: "/calendar",
      color: "text-orange-500",
    },
    {
      icon: Bell,
      title: "Уведомления",
      description: "Важные обновления",
      href: "/notifications",
      color: "text-rose-500",
    },
    {
      icon: Star,
      title: "Избранное",
      description: "Сохраненные элементы",
      href: "/favorites",
      color: "text-amber-500",
    },
    {
      icon: Clock,
      title: "Недавние",
      description: "Последние просмотры",
      href: "/recent",
      color: "text-indigo-500",
    },
    {
      icon: Bookmark,
      title: "Закладки",
      description: "Сохраненные страницы",
      href: "/bookmarks",
      color: "text-teal-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="block group">
          <Card className="h-full transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <link.icon className={cn("h-6 w-6 mb-2", link.color)} />
              <CardTitle className="text-lg group-hover:text-primary transition-colors">{link.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{link.description}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
