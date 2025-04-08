"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  // Демо-данные
  const activities = [
    {
      id: 1,
      user: {
        name: "Анна Смирнова",
        avatar: "/placeholder-avatar.jpg",
        initials: "АС",
      },
      action: "создала новую задачу",
      target: "Подготовить отчет по маркетингу",
      time: "2 часа назад",
    },
    {
      id: 2,
      user: {
        name: "Иван Петров",
        avatar: "/placeholder-avatar.jpg",
        initials: "ИП",
      },
      action: "завершил задачу",
      target: "Обновить дизайн главной страницы",
      time: "3 часа назад",
    },
    {
      id: 3,
      user: {
        name: "Мария Иванова",
        avatar: "/placeholder-avatar.jpg",
        initials: "МИ",
      },
      action: "прокомментировала",
      target: "Интеграция платежной системы",
      time: "5 часов назад",
    },
    {
      id: 4,
      user: {
        name: "Алексей Козлов",
        avatar: "/placeholder-avatar.jpg",
        initials: "АК",
      },
      action: "добавил новый проект",
      target: "Мобильное приложение",
      time: "1 день назад",
    },
    {
      id: 5,
      user: {
        name: "Елена Соколова",
        avatar: "/placeholder-avatar.jpg",
        initials: "ЕС",
      },
      action: "обновила документацию",
      target: "API документация",
      time: "1 день назад",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние действия</CardTitle>
        <CardDescription>Недавняя активность в вашей команде</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Вся активность
        </Button>
      </CardFooter>
    </Card>
  )
}

