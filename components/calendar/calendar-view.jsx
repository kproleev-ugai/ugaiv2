"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function CalendarView() {
  // Текущая дата для демонстрации
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Демо-данные событий
  const events = [
    {
      id: 1,
      title: "Встреча с клиентом",
      date: new Date(currentYear, currentMonth, currentDay + 1),
      type: "meeting",
    },
    {
      id: 2,
      title: "Презентация проекта",
      date: new Date(currentYear, currentMonth, currentDay + 1),
      type: "presentation",
    },
    {
      id: 3,
      title: "Дедлайн по задаче",
      date: new Date(currentYear, currentMonth, currentDay + 3),
      type: "deadline",
    },
    {
      id: 4,
      title: "Созвон с командой",
      date: new Date(currentYear, currentMonth, currentDay),
      type: "meeting",
    },
    {
      id: 5,
      title: "Обучение",
      date: new Date(currentYear, currentMonth, currentDay + 5),
      type: "training",
    },
    {
      id: 6,
      title: "Ревью кода",
      date: new Date(currentYear, currentMonth, currentDay + 2),
      type: "review",
    },
  ]

  // Функция для получения дней месяца
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Функция для получения первого дня месяца (0 - воскресенье, 1 - понедельник, и т.д.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Получаем количество дней в текущем месяце
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  // Получаем первый день месяца (0 - воскресенье, 6 - суббота)
  let firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)
  // Преобразуем для начала недели с понедельника (0 - понедельник, 6 - воскресенье)
  firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  // Создаем массив дней для отображения в календаре
  const days = []

  // Добавляем дни предыдущего месяца
  const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1)
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({
      day: prevMonthDays - firstDayOfMonth + i + 1,
      currentMonth: false,
      date: new Date(currentYear, currentMonth - 1, prevMonthDays - firstDayOfMonth + i + 1),
    })
  }

  // Добавляем дни текущего месяца
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      currentMonth: true,
      today: i === currentDay,
      date: new Date(currentYear, currentMonth, i),
    })
  }

  // Добавляем дни следующего месяца
  const remainingDays = 42 - days.length // 6 строк по 7 дней
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      currentMonth: false,
      date: new Date(currentYear, currentMonth + 1, i),
    })
  }

  // Функция для получения событий на определенную дату
  const getEventsForDate = (date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    )
  }

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
      case "review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-7 border-b">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={cn("py-2 text-center text-sm font-medium", (index === 5 || index === 6) && "text-red-500")}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-6 h-[calc(100vh-350px)] min-h-[500px]">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day.date)
            return (
              <div
                key={index}
                className={cn(
                  "border p-1 relative",
                  !day.currentMonth && "bg-muted/50 text-muted-foreground",
                  day.today && "bg-blue-50 dark:bg-blue-950",
                )}
              >
                <div
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-sm",
                    day.today && "bg-primary text-primary-foreground font-medium",
                  )}
                >
                  {day.day}
                </div>
                <div className="mt-1 space-y-1 max-h-[calc(100%-1.5rem)] overflow-y-auto">
                  {dayEvents.map((event) => (
                    <Badge
                      key={event.id}
                      variant="outline"
                      className={cn("block truncate text-xs font-normal py-0.5", getEventTypeColor(event.type))}
                    >
                      {event.title}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

