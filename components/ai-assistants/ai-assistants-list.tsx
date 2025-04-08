"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, MessageSquare, MoreHorizontal, Star } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AIAssistantsList() {
  // Демо-данные
  const assistants = [
    {
      id: 1,
      name: "Аналитик данных",
      description: "Анализирует данные и создает отчеты на основе ваших запросов",
      category: "Аналитика",
      rating: 4.8,
      usageCount: 245,
    },
    {
      id: 2,
      name: "Планировщик задач",
      description: "Помогает организовать задачи и создать оптимальное расписание",
      category: "Продуктивность",
      rating: 4.5,
      usageCount: 189,
    },
    {
      id: 3,
      name: "Копирайтер",
      description: "Создает тексты для маркетинговых материалов и документации",
      category: "Контент",
      rating: 4.7,
      usageCount: 312,
    },
    {
      id: 4,
      name: "Ассистент по ОКР",
      description: "Помогает формулировать цели и ключевые результаты",
      category: "Управление",
      rating: 4.6,
      usageCount: 156,
    },
    {
      id: 5,
      name: "Финансовый аналитик",
      description: "Анализирует финансовые данные и предлагает оптимизации",
      category: "Финансы",
      rating: 4.9,
      usageCount: 203,
    },
    {
      id: 6,
      name: "HR ассистент",
      description: "Помогает с задачами по управлению персоналом",
      category: "HR",
      rating: 4.4,
      usageCount: 127,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {assistants.map((assistant) => (
        <Card key={assistant.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <CardTitle>{assistant.name}</CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Меню</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Действия</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Настроить</DropdownMenuItem>
                  <DropdownMenuItem>Поделиться</DropdownMenuItem>
                  <DropdownMenuItem>Дублировать</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription>{assistant.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {assistant.category}
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{assistant.rating}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                <span>{assistant.usageCount}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button className="w-full">Начать чат</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

