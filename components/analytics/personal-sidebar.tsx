"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Home,
  CheckSquare,
  Calendar,
  FileText,
  Star,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Clock,
  Bookmark,
  Bell,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useClient } from "@/contexts/client-context"

interface PersonalSidebarProps {
  className?: string
}

export function PersonalSidebar({ className }: PersonalSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { currentClient } = useClient()

  if (!currentClient) return null

  const clientId = currentClient.id

  const menuItems = [
    {
      title: "Домой",
      icon: <Home className="h-4 w-4" />,
      href: `/${clientId}`,
    },
    {
      title: "Мои задачи",
      icon: <CheckSquare className="h-4 w-4" />,
      href: `/${clientId}/tasks`,
    },
    {
      title: "Мой календарь",
      icon: <Calendar className="h-4 w-4" />,
      href: `/${clientId}/calendar`,
    },
    {
      title: "Мои отчеты",
      icon: <FileText className="h-4 w-4" />,
      href: `/${clientId}/reports`,
    },
    {
      title: "Недавние",
      icon: <Clock className="h-4 w-4" />,
      href: `/${clientId}/recent`,
    },
    {
      title: "Избранное",
      icon: <Star className="h-4 w-4" />,
      href: `/${clientId}/favorites`,
    },
    {
      title: "Закладки",
      icon: <Bookmark className="h-4 w-4" />,
      href: `/${clientId}/bookmarks`,
    },
    {
      title: "Уведомления",
      icon: <Bell className="h-4 w-4" />,
      href: `/${clientId}/notifications`,
    },
    {
      title: "Аналитика",
      icon: <BarChart3 className="h-4 w-4" />,
      href: `/${clientId}/analytics`,
      active: pathname.includes(`/${clientId}/analytics`),
    },
  ]

  const bottomMenuItems = [
    {
      title: "Настройки",
      icon: <Settings className="h-4 w-4" />,
      href: `/${clientId}/settings`,
    },
    {
      title: "Помощь",
      icon: <HelpCircle className="h-4 w-4" />,
      href: `/${clientId}/help`,
    },
  ]

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-gray-800 bg-gray-950 transition-all duration-300",
        collapsed ? "w-14" : "w-56",
        className,
      )}
    >
      <div className="flex h-12 items-center justify-between border-b border-gray-800 px-3">
        {!collapsed && <span className="text-xs font-medium text-gray-400">Личное меню</span>}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-7 w-7 text-gray-400 hover:text-gray-200", collapsed && "ml-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-2 py-3">
          <TooltipProvider delayDuration={0}>
            <nav className="flex flex-col gap-1">
              {menuItems.map((item, index) => (
                <Tooltip key={index} delayDuration={collapsed ? 0 : 999999}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-9 items-center gap-3 rounded-md px-3 text-xs font-medium transition-colors",
                        item.active ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800/50 hover:text-white",
                      )}
                    >
                      {item.icon}
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                </Tooltip>
              ))}
            </nav>
          </TooltipProvider>
        </div>
      </ScrollArea>
      <div className="border-t border-gray-800 px-2 py-3">
        <TooltipProvider delayDuration={0}>
          <nav className="flex flex-col gap-1">
            {bottomMenuItems.map((item, index) => (
              <Tooltip key={index} delayDuration={collapsed ? 0 : 999999}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="flex h-9 items-center gap-3 rounded-md px-3 text-xs font-medium text-gray-400 transition-colors hover:bg-gray-800/50 hover:text-white"
                  >
                    {item.icon}
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                </TooltipTrigger>
                {collapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
      </div>
    </div>
  )
}
