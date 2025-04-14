"use client"

import { useState } from "react"
import { NotificationItem, type NotificationProps } from "./notification-item"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell } from "lucide-react"

// Пример данных для уведомлений
const mockNotifications: NotificationProps[] = [
  {
    id: 1,
    title: "Новый комментарий к задаче",
    message: "Мария добавила комментарий к задаче 'Подготовить отчет по маркетингу'",
    time: "10 минут назад",
    type: "info",
    read: false,
  },
  {
    id: 2,
    title: "Срок выполнения задачи истекает",
    message: "Задача 'Созвон с командой разработки' должна быть выполнена сегодня",
    time: "1 час назад",
    type: "warning",
    read: false,
  },
  {
    id: 3,
    title: "KPI по конверсии достигнут",
    message: "Вы достигли целевого показателя по конверсии лидов (75%)",
    time: "Вчера, 15:30",
    type: "success",
    read: true,
  },
  {
    id: 4,
    title: "Новый документ добавлен в проект",
    message: "Алексей добавил документ 'Техническое задание' в проект 'Редизайн веб-сайта'",
    time: "Вчера, 12:15",
    type: "info",
    read: true,
  },
  {
    id: 5,
    title: "Ошибка при загрузке отчета",
    message: "Произошла ошибка при загрузке отчета 'Финансовые показатели'",
    time: "2 дня назад",
    type: "error",
    read: true,
  },
]

export function NotificationList() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return true
  })

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          <h2 className="text-lg font-semibold">Уведомления</h2>
          {unreadCount > 0 && (
            <div className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
              {unreadCount}
            </div>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Прочитать все
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="unread">Непрочитанные {unreadCount > 0 && `(${unreadCount})`}</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-2">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {activeTab === "unread" ? "У вас нет непрочитанных уведомлений" : "У вас нет уведомлений"}
            </div>
          ) : (
            <div className="space-y-1 max-h-[400px] overflow-y-auto">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => markAsRead(notification.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
