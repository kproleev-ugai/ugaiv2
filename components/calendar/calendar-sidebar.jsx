"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function CalendarSidebar() {
  // Демо-данные для предстоящих событий
  const upcomingEvents = [
    {
      id: 1,
      title: "Встреча с клиентом",
      date: "2023-06-15",
      time: "10:00 - 11:30",
      type: "meeting",
    },
    {
      id: 2,
      title: "Презентация проекта",
      date: "2023-06-15",
      time: "14:00 - 15:30",
      type: "presentation",
    },
    {
      id: 3,
      title: "Дедлайн по задаче",
      date: "2023-06-17",
      time: "18:00",
      type: "deadline",
    },
    {
      id: 4,
      title: "Созвон с командой",
      date: "2023-06-14",
      time: "11:00 - 12:00",
      type: "meeting",
    },
    {
      id: 5,
      title: "Обучение",
      date: "2023-06-19",
      time: "15:00 - 17:00",
      type: "training",
    },
  ]

  // Категории календарей
  const calendarCategories = [
    { id: "work", name: "Рабочий", color: "bg-blue-500" },
    { id: "personal", name: "Личный", color: "bg-green-500" },
    { id: "meetings", name: "Встречи", color: "bg-purple-500" },
    { id: "deadlines", name: "Дедлайны", color: "bg-red-500" },
    { id: "training", name: "Обучение", color: "bg-yellow-500" },
  ]

  // Функция для получения цвета типа события
  const getEventTypeColor = (type) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "presentation":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "training":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Предстоящие события</CardTitle>
          <CardDescription>Ваши ближайшие встречи и дедлайны</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{event.title}</h3>
                  <Badge variant="outline" className={cn("text-xs font-normal", getEventTypeColor(event.type))}>
                    {event.type === "meeting"
                      ? "Встреча"
                      : event.type === "presentation"
                        ? "Презентация"
                        : event.type === "deadline"
                          ? "Дедлайн"
                          : event.type === "training"
                            ? "Обучение"
                            : event.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.date).toLocaleDateString("ru-RU")} • {event.time}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Календари</CardTitle>
          <CardDescription>Выберите календари для отображения</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {calendarCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={`calendar-${category.id}`} defaultChecked />
                <div className={cn("h-3 w-3 rounded-full", category.color)} />
                <Label htmlFor={`calendar-${category.id}`}>{category.name}</Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

