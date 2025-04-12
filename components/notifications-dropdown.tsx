"use client"

import * as React from "react"
import { Bell, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "warning" | "success" | "error"
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "Новый отчет доступен",
      description: "Ежемесячный отчет по продажам за июнь готов к просмотру",
      time: "5 минут назад",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Задача назначена",
      description: "Вам назначена новая задача: 'Подготовить презентацию'",
      time: "1 час назад",
      read: false,
      type: "info",
    },
    {
      id: "3",
      title: "Предупреждение о KPI",
      description: "Показатель конверсии ниже целевого значения на 15%",
      time: "3 часа назад",
      read: false,
      type: "warning",
    },
    {
      id: "4",
      title: "Успешное завершение",
      description: "Проект 'Редизайн сайта' успешно завершен",
      time: "Вчера",
      read: true,
      type: "success",
    },
    {
      id: "5",
      title: "Ошибка интеграции",
      description: "Возникла ошибка при синхронизации данных с CRM",
      time: "2 дня назад",
      read: true,
      type: "error",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getTypeStyles = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
      case "warning":
        return "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800"
      case "error":
        return "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`${unreadCount} непрочитанных уведомлений`}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Уведомления</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={markAllAsRead}>
              Прочитать все
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">Нет уведомлений</div>
        ) : (
          <ScrollArea className="h-[300px]">
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "flex flex-col items-start p-3 focus:bg-accent",
                    !notification.read && "bg-accent/50",
                    getTypeStyles(notification.type),
                  )}
                >
                  <div className="flex w-full justify-between">
                    <span className="font-medium">{notification.title}</span>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={(e) => {
                            e.stopPropagation()
                            markAsRead(notification.id)
                          }}
                        >
                          <Check className="h-3 w-3" />
                          <span className="sr-only">Отметить как прочитанное</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Удалить</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                  <span className="text-xs text-muted-foreground mt-2">{notification.time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </ScrollArea>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="justify-center">
          <a href="/notifications" className="w-full text-center text-sm">
            Просмотреть все уведомления
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
