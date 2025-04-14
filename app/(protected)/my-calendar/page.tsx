"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight, Users, Tag, MapPin, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addWeeks, subWeeks } from "date-fns"
import { ru } from "date-fns/locale"

interface Event {
  id: number
  title: string
  description?: string
  startTime: string
  endTime: string
  date: Date
  type: "meeting" | "deadline" | "reminder" | "personal"
  location?: string
  participants?: string[]
  tags?: string[]
}

export default function MyCalendarPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("week")
  const [weekStart, setWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }))

  // Примеры данных для событий
  const events: Event[] = [
    {
      id: 1,
      title: "Еженедельное совещание команды",
      description: "Обсуждение статуса проектов и планов на неделю",
      startTime: "10:00",
      endTime: "11:00",
      date: new Date(),
      type: "meeting",
      location: "Переговорная 1",
      participants: ["Иван Иванов", "Мария Петрова", "Алексей Смирнов"],
      tags: ["команда", "планирование"],
    },
    {
      id: 2,
      title: "Встреча с клиентом",
      description: "Презентация новых функций продукта",
      startTime: "14:00",
      endTime: "15:30",
      date: addDays(new Date(), 1),
      type: "meeting",
      location: "Zoom",
      participants: ["Иван Иванов", "Клиент А"],
      tags: ["клиент", "презентация"],
    },
    {
      id: 3,
      title: "Дедлайн по проекту редизайна",
      startTime: "18:00",
      endTime: "18:00",
      date: addDays(new Date(), 2),
      type: "deadline",
      tags: ["проект", "дедлайн"],
    },
    {
      id: 4,
      title: "Тренинг по новому продукту",
      description: "Обучение команды новым функциям продукта",
      startTime: "11:00",
      endTime: "13:00",
      date: addDays(new Date(), 3),
      type: "meeting",
      location: "Конференц-зал",
      participants: ["Иван Иванов", "Команда разработки", "Команда продаж"],
      tags: ["обучение", "продукт"],
    },
    {
      id: 5,
      title: "Напоминание: подготовить отчет",
      startTime: "09:00",
      endTime: "09:00",
      date: addDays(new Date(), 4),
      type: "reminder",
      tags: ["отчет"],
    },
    {
      id: 6,
      title: "Обед с коллегами",
      startTime: "13:00",
      endTime: "14:00",
      date: addDays(new Date(), 1),
      type: "personal",
      location: "Ресторан 'У Михалыча'",
      participants: ["Иван Иванов", "Коллеги"],
      tags: ["личное"],
    },
  ]

  // Функция для получения событий на определенную дату
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date))
  }

  // Функция для получения дней недели
  const getDaysOfWeek = () => {
    return eachDayOfInterval({
      start: weekStart,
      end: endOfWeek(weekStart, { weekStartsOn: 1 }),
    })
  }

  // Функция для перехода к следующей неделе
  const nextWeek = () => {
    setWeekStart(addWeeks(weekStart, 1))
  }

  // Функция для перехода к предыдущей неделе
  const prevWeek = () => {
    setWeekStart(subWeeks(weekStart, 1))
  }

  // Функция для отображения типа события
  const getEventBadge = (type: string) => {
    switch (type) {
      case "meeting":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Встреча
          </Badge>
        )
      case "deadline":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Дедлайн
          </Badge>
        )
      case "reminder":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Напоминание
          </Badge>
        )
      case "personal":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Личное
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Мой календарь</h2>
          <p className="text-muted-foreground">Управление вашими событиями и встречами</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
            Сегодня
          </Button>
          <Select value={view} onValueChange={(value: "month" | "week" | "day") => setView(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Вид" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="day">День</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Новое событие
          </Button>
        </div>
      </div>

      <Separator />

      <Tabs
        defaultValue={view}
        value={view}
        onValueChange={(value: string) => setView(value as "month" | "week" | "day")}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="month">Месяц</TabsTrigger>
          <TabsTrigger value="week">Неделя</TabsTrigger>
          <TabsTrigger value="day">День</TabsTrigger>
        </TabsList>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{format(date, "LLLL yyyy", { locale: ru })}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
                locale={ru}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>События на {format(date, "d MMMM yyyy", { locale: ru })}</CardTitle>
              <CardDescription>Список всех событий на выбранную дату</CardDescription>
            </CardHeader>
            <CardContent>
              {getEventsForDate(date).length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <CalendarIcon className="mx-auto h-12 w-12 mb-2" />
                  <p>На выбранную дату нет событий</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getEventsForDate(date).map((event) => (
                    <div key={event.id} className="flex items-start p-3 border rounded-md">
                      <div className="mr-4 mt-1">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{event.title}</h4>
                          {getEventBadge(event.type)}
                        </div>
                        {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="mr-1 h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        )}
                        {event.participants && event.participants.length > 0 && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            <span>{event.participants.join(", ")}</span>
                          </div>
                        )}
                        {event.tags && event.tags.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            {event.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Tag className="mr-1 h-3 w-3" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                          <DropdownMenuItem>Редактировать</DropdownMenuItem>
                          <DropdownMenuItem>Поделиться</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {format(weekStart, "d MMMM", { locale: ru })} -{" "}
                  {format(endOfWeek(weekStart, { weekStartsOn: 1 }), "d MMMM yyyy", { locale: ru })}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={prevWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {getDaysOfWeek().map((day, index) => (
                  <div key={index} className="border rounded-md overflow-hidden">
                    <div
                      className={`p-2 text-center ${isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      <div className="text-xs">{format(day, "EEEE", { locale: ru })}</div>
                      <div className="font-medium">{format(day, "d", { locale: ru })}</div>
                    </div>
                    <div className="p-2 space-y-1 h-48 overflow-y-auto">
                      {getEventsForDate(day).length === 0 ? (
                        <div className="text-center text-xs text-muted-foreground h-full flex items-center justify-center">
                          Нет событий
                        </div>
                      ) : (
                        getEventsForDate(day).map((event) => (
                          <div
                            key={event.id}
                            className={`p-1 text-xs rounded cursor-pointer ${
                              event.type === "meeting"
                                ? "bg-blue-50 border-blue-200"
                                : event.type === "deadline"
                                  ? "bg-red-50 border-red-200"
                                  : event.type === "reminder"
                                    ? "bg-yellow-50 border-yellow-200"
                                    : "bg-green-50 border-green-200"
                            }`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-muted-foreground">
                              {event.startTime} - {event.endTime}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="day" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{format(date, "d MMMM yyyy, EEEE", { locale: ru })}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => setDate(addDays(date, -1))}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setDate(addDays(date, 1))}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getEventsForDate(date).length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <CalendarIcon className="mx-auto h-12 w-12 mb-2" />
                    <p>На выбранную дату нет событий</p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Добавить событие
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getEventsForDate(date)
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((event) => (
                        <div key={event.id} className="flex items-start p-4 border rounded-md">
                          <div className="mr-4 text-center min-w-[60px]">
                            <div className="text-sm font-medium">{event.startTime}</div>
                            <div className="text-xs text-muted-foreground">{event.endTime}</div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{event.title}</h4>
                              {getEventBadge(event.type)}
                            </div>
                            {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
                            <div className="flex flex-wrap gap-4 text-sm">
                              {event.location && (
                                <div className="flex items-center text-muted-foreground">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                              {event.participants && event.participants.length > 0 && (
                                <div className="flex items-center text-muted-foreground">
                                  <Users className="mr-1 h-4 w-4" />
                                  <span>{event.participants.length} участников</span>
                                </div>
                              )}
                            </div>
                            {event.tags && event.tags.length > 0 && (
                              <div className="flex items-center gap-1 mt-2">
                                {event.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    <Tag className="mr-1 h-3 w-3" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Действия</DropdownMenuLabel>
                                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                                <DropdownMenuItem>Поделиться</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
