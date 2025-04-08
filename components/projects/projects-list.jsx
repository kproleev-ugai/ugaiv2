"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { CalendarDays, Clock, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ProjectsList() {
  // Демо-данные
  const projects = [
    {
      id: 1,
      name: "Редизайн корпоративного сайта",
      description: "Обновление дизайна и функциональности основного веб-сайта компании",
      progress: 75,
      status: "active",
      dueDate: "2023-07-15",
      category: "Веб-разработка",
      team: [
        { name: "Анна С.", avatar: "/placeholder-avatar.jpg", initials: "АС" },
        { name: "Иван П.", avatar: "/placeholder-avatar.jpg", initials: "ИП" },
        { name: "Мария И.", avatar: "/placeholder-avatar.jpg", initials: "МИ" },
      ],
    },
    {
      id: 2,
      name: "Мобильное приложение для клиентов",
      description: "Разработка нативного мобильного приложения для iOS и Android",
      progress: 40,
      status: "active",
      dueDate: "2023-08-30",
      category: "Мобильная разработка",
      team: [
        { name: "Алексей К.", avatar: "/placeholder-avatar.jpg", initials: "АК" },
        { name: "Елена С.", avatar: "/placeholder-avatar.jpg", initials: "ЕС" },
        { name: "Дмитрий В.", avatar: "/placeholder-avatar.jpg", initials: "ДВ" },
        { name: "Ольга Н.", avatar: "/placeholder-avatar.jpg", initials: "ОН" },
      ],
    },
    {
      id: 3,
      name: "Маркетинговая кампания Q3",
      description: "Планирование и реализация маркетинговой кампании на третий квартал",
      progress: 90,
      status: "active",
      dueDate: "2023-06-20",
      category: "Маркетинг",
      team: [
        { name: "Сергей Т.", avatar: "/placeholder-avatar.jpg", initials: "СТ" },
        { name: "Наталья Р.", avatar: "/placeholder-avatar.jpg", initials: "НР" },
      ],
    },
    {
      id: 4,
      name: "Интеграция CRM системы",
      description: "Внедрение и настройка новой CRM системы для отдела продаж",
      progress: 10,
      status: "planning",
      dueDate: "2023-09-10",
      category: "Интеграция",
      team: [
        { name: "Иван П.", avatar: "/placeholder-avatar.jpg", initials: "ИП" },
        { name: "Алексей К.", avatar: "/placeholder-avatar.jpg", initials: "АК" },
      ],
    },
    {
      id: 5,
      name: "Аналитическая платформа",
      description: "Разработка внутренней аналитической платформы для бизнес-аналитики",
      progress: 60,
      status: "active",
      dueDate: "2023-08-05",
      category: "Аналитика",
      team: [
        { name: "Мария И.", avatar: "/placeholder-avatar.jpg", initials: "МИ" },
        { name: "Дмитрий В.", avatar: "/placeholder-avatar.jpg", initials: "ДВ" },
        { name: "Елена С.", avatar: "/placeholder-avatar.jpg", initials: "ЕС" },
      ],
    },
    {
      id: 6,
      name: "Обновление брендинга",
      description: "Обновление визуальной идентичности бренда и маркетинговых материалов",
      progress: 100,
      status: "completed",
      dueDate: "2023-05-20",
      category: "Дизайн",
      team: [
        { name: "Наталья Р.", avatar: "/placeholder-avatar.jpg", initials: "НР" },
        { name: "Анна С.", avatar: "/placeholder-avatar.jpg", initials: "АС" },
      ],
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Активен
          </Badge>
        )
      case "planning":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Планирование
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">
            Завершен
          </Badge>
        )
      case "onhold":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            На паузе
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription className="mt-1">{project.category}</CardDescription>
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
                  <DropdownMenuItem>Редактировать</DropdownMenuItem>
                  <DropdownMenuItem>Дублировать</DropdownMenuItem>
                  <DropdownMenuItem>Архивировать</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>Прогресс: {project.progress}%</span>
                </div>
                {getStatusBadge(project.status)}
              </div>
              <Progress value={project.progress} className="h-2" />
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-1 h-4 w-4" />
                <span>Срок: {new Date(project.dueDate).toLocaleDateString("ru-RU")}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex items-center justify-between">
            <AvatarGroup>
              {project.team.map((member, i) => (
                <Avatar key={i}>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <Button variant="outline" size="sm">
              Подробнее
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

