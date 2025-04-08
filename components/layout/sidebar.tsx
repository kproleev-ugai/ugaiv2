"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Calendar,
  CheckSquare,
  Target,
  Bot,
  MessageSquare,
  MessageCircle,
  Settings,
  FileText,
} from "lucide-react"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/common/logo"
import type { NavSection } from "@/types/index"

export function Sidebar() {
  const pathname = usePathname()

  const routes: NavSection[] = [
    {
      title: "Основное",
      items: [
        {
          title: "Аналитика данных",
          href: "/analytics",
          icon: BarChart2,
        },
        {
          title: "Задачи",
          href: "/tasks",
          icon: CheckSquare,
        },
        {
          title: "Календарь",
          href: "/calendar",
          icon: Calendar,
        },
        {
          title: "ОКР система",
          href: "/okr",
          icon: Target,
        },
      ],
    },
    {
      title: "Коммуникации",
      items: [
        {
          title: "ИИ ассистенты",
          href: "/ai-assistants",
          icon: Bot,
        },
        {
          title: "Внутренние чаты",
          href: "/chats",
          icon: MessageSquare,
        },
        {
          title: "Комментарии",
          href: "/comments",
          icon: MessageCircle,
        },
      ],
    },
    {
      title: "Управление",
      items: [
        {
          title: "Отчеты",
          href: "/reports",
          icon: FileText,
        },
        {
          title: "Настройки",
          href: "/settings",
          icon: Settings,
        },
      ],
    },
  ]

  return (
    <SidebarComponent variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center h-14 px-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {routes.map((section, i) => (
          <SidebarGroup key={i}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, j) => (
                  <SidebarMenuItem key={j}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                      <Link href={item.href}>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          <p>© 2025 AI Strategy Solutions</p>
          <p>Версия 1.0.0</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </SidebarComponent>
  )
}

