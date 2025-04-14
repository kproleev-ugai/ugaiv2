"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon, Clock, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function CreateTaskPage() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Имитация отправки данных на сервер
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Перенаправление на страницу задач
    router.push("/my-tasks")
  }

  return (
    <div className="container max-w-2xl py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/my-tasks">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">Создание новой задачи</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о задаче</CardTitle>
          <CardDescription>Заполните информацию о новой задаче</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="create-task-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Название задачи
              </label>
              <Input id="title" placeholder="Введите название задачи" required />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Описание
              </label>
              <Textarea id="description" placeholder="Введите описание задачи" rows={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Приоритет
                </label>
                <Select>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Выберите приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Высокий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="low">Низкий</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Статус
                </label>
                <Select defaultValue="new">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Новая</SelectItem>
                    <SelectItem value="in-progress">В работе</SelectItem>
                    <SelectItem value="review">На проверке</SelectItem>
                    <SelectItem value="done">Выполнена</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="project" className="text-sm font-medium">
                  Проект
                </label>
                <Select>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Выберите проект" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project1">Редизайн веб-сайта</SelectItem>
                    <SelectItem value="project2">Маркетинговая кампания</SelectItem>
                    <SelectItem value="project3">Обучение персонала</SelectItem>
                    <SelectItem value="project4">Обновление CRM</SelectItem>
                    <SelectItem value="project5">Интеграция API</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="assignee" className="text-sm font-medium">
                  Исполнитель
                </label>
                <Select>
                  <SelectTrigger id="assignee">
                    <SelectValue placeholder="Выберите исполнителя" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">Иван Иванов</SelectItem>
                    <SelectItem value="user2">Мария Петрова</SelectItem>
                    <SelectItem value="user3">Алексей Смирнов</SelectItem>
                    <SelectItem value="user4">Елена Козлова</SelectItem>
                    <SelectItem value="user5">Дмитрий Соколов</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="deadline" className="text-sm font-medium">
                  Срок выполнения
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ru }) : "Выберите дату"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ru} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Время
                </label>
                <div className="flex items-center">
                  <Select>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Час" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="mx-2">:</span>
                  <Select>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Мин" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 15, 30, 45].map((minute) => (
                        <SelectItem key={minute} value={minute.toString()}>
                          {minute.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                Теги
              </label>
              <Input id="tags" placeholder="Введите теги через запятую" />
              <p className="text-xs text-muted-foreground">Например: отчет, маркетинг, срочно</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/my-tasks">Отмена</Link>
          </Button>
          <Button type="submit" form="create-task-form" disabled={loading}>
            {loading ? "Создание..." : "Создать задачу"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
