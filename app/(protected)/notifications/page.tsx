"use client"

import { useState } from "react"
import {
  Bell,
  Check,
  Clock,
  AlertCircle,
  FileText,
  Users,
  MessageSquare,
  Calendar,
  Filter,
  MoreHorizontal,
  CheckCheck,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Notification {
  id: number
  type: "info" | "warning" | "success" | "error"
  title: string
  description: string
  time: string
  date: string
  read: boolean
  category: "system" | "task" | "project" | "message" | "calendar"
  user?: {
    name: string
    avatar: string
  }
  action?: string
}

export default function NotificationsPage() {
  const { toast } = useToast()
  const [filter, setFilter] = useState<string>("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "info",
      title: "Новый комментарий",
      description: "Мария Петрова оставила комментарий к задаче 'Дизайн главной страницы'",
      time: "10:30",
      date: "Сегодня",
      read: false,
      category: "task",
      user: {
        name: "Мария Петрова",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "Просмотреть комментарий",
    },
    {
      id: 2,
      type: "success",
      title: "Задача завершена",
      description: "Алексей Смирнов завершил задачу 'Разработка прототипов'",
      time: "09:15",
      date: "Сегодня",
      read: false,
      category: "task",
      user: {
        name: "Алексей Смирнов",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "Просмотреть задачу",
    },
    {
      id: 3,
      type: "warning",
      title: "Приближается срок",
      description: "Срок выполнения задачи 'Верстка главной страницы' истекает через 2 дня",
      time: "14:45",
      date: "Вчера",
      read: true,
      category: "task",
      action: "Просмотреть задачу",
    },
    {
      id: 4,
      type: "info",
      title: "Новый документ",
      description: "Елена Козлова загрузила новый документ 'Дизайн-макеты.zip'",
      time: "11:20",
      date: "Вчера",
      read: true,
      category: "project",
      user: {
        name: "Елена Козлова",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "Просмотреть документ",
    },
    {
      id: 5,
      type: "error",
      title: "Просроченная задача",
      description: "Задача 'Оптимизация изображений' просрочена на 3 дня",
      time: "09:30",
      date: "12.04.2025",
      read: false,
      category: "task",
      action: "Просмотреть задачу",
    },
    {
      id: 6,
      type: "info",
      title: "Новое сообщение",
      description: "У вас новое сообщение от Ивана Иванова",
      time: "16:45",
      date: "10.04.2025",
      read: true,
      category: "message",
      user: {
        name: "Иван Иванов",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "Ответить",
    },
    {
      id: 7,
      type: "info",
      title: "Напоминание о встрече",
      description: "Встреча 'Обсуждение дизайна' состоится завтра в 14:00",
      time: "10:00",
      date: "09.04.2025",
      read: true,
      category: "calendar",
      action: "Просмотреть встречу",
    },
    {
      id: 8,
      type: "success",
      title: "Проект создан",
      description: "Проект 'Мобильное приложение' успешно создан",
      time: "11:30",
      date: "05.04.2025",
      read: true,
      category: "project",
      action: "Открыть проект",
    },
    {
      id: 9,
      type: "info",
      title: "Обновление системы",
      description: "Система была обновлена до версии 2.5.0",
      time: "03:15",
      date: "01.04.2025",
      read: true,
      category: "system",
      action: "Подробнее",
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Bell className="h-5 w-5 text-blue-500" />
      case "warning":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "task":
        return <FileText className="h-4 w-4 text-muted-foreground" />
      case "project":
        return <Users className="h-4 w-4 text-muted-foreground" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />
      case "calendar":
        return <Calendar className="h-4 w-4 text-muted-foreground" />
      case "system":
        return <Bell className="h-4 w-4 text-muted-foreground" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.category === filter
  })

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    toast({
      title: "Уведомление прочитано",
      description: "Уведомление отмечено как прочитанное",
    })
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "Все уведомления прочитаны",
      description: "Все уведомления отмечены как прочитанные",
    })
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
    toast({
      title: "Уведомление удалено",
      description: "Уведомление было удалено",
    })
  }

  const clearAllNotifications = () => {
    setNotifications([])
    toast({
      title: "Уведомления очищены",
      description: "Все уведомления были удалены",
    })
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Уведомления</h2>
          <p className="text-muted-foreground">Управляйте своими уведомлениями</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Отметить все как прочитанные
          </Button>
          <Button variant="outline" onClick={clearAllNotifications}>
            <X className="mr-2 h-4 w-4" />
            Очистить все
          </Button>
        </div>
      </div>
      <Separator />

      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-[400px]" onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">
              Все
              {unreadCount > 0 && <Badge className="ml-2 bg-indigo-600">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="unread">Непрочитанные</TabsTrigger>
            <TabsTrigger value="task">Задачи</TabsTrigger>
            <TabsTrigger value="project">Проекты</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Сначала новые</SelectItem>
              <SelectItem value="oldest">Сначала старые</SelectItem>
              <SelectItem value="unread">Сначала непрочитанные</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Нет уведомлений</h3>
              <p className="text-sm text-muted-foreground">У вас нет уведомлений, соответствующих выбранным фильтрам</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} className={notification.read ? "bg-background" : "bg-muted/20"}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {notification.date}, {notification.time}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            {!notification.read && (
                              <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                Отметить как прочитанное
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => deleteNotification(notification.id)}>
                              <X className="mr-2 h-4 w-4" />
                              Удалить уведомление
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-sm">{notification.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        {notification.user ? (
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                              <AvatarFallback>{notification.user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{notification.user.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            {getCategoryIcon(notification.category)}
                            <span className="text-xs capitalize">{notification.category}</span>
                          </div>
                        )}
                      </div>
                      {notification.action && (
                        <Button variant="link" size="sm" className="h-6 p-0">
                          {notification.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Настройки уведомлений</CardTitle>
          <CardDescription>Настройте, какие уведомления вы хотите получать</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Уведомления о задачах</div>
                <div className="text-xs text-muted-foreground">Получать уведомления о новых и обновленных задачах</div>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Уведомления о проектах</div>
                <div className="text-xs text-muted-foreground">Получать уведомления о новых и обновленных проектах</div>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Уведомления о сообщениях</div>
                <div className="text-xs text-muted-foreground">Получать уведомления о новых сообщениях</div>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Уведомления о календаре</div>
                <div className="text-xs text-muted-foreground">Получать напоминания о встречах и событиях</div>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <div className="space-y-0.5">
                <div className="text-sm font-medium">Системные уведомления</div>
                <div className="text-xs text-muted-foreground">Получать уведомления о системных обновлениях</div>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Сохранить настройки</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
