"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageSquare, MoreHorizontal, Send } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CommentsList() {
  // Демо-данные
  const comments = [
    {
      id: 1,
      author: {
        name: "Иван Петров",
        avatar: "/placeholder-avatar.jpg",
        initials: "ИП",
      },
      content: "Предлагаю перенести дедлайн на следующую неделю, так как есть задержки с получением данных от клиента.",
      timestamp: "2 часа назад",
      likes: 5,
      replies: 2,
      target: {
        type: "task",
        name: "Подготовить отчет по проекту X",
      },
    },
    {
      id: 2,
      author: {
        name: "Мария Иванова",
        avatar: "/placeholder-avatar.jpg",
        initials: "МИ",
      },
      content: "Я закончила первую версию дизайна. Посмотрите, пожалуйста, и дайте обратную связь.",
      timestamp: "5 часов назад",
      likes: 3,
      replies: 4,
      target: {
        type: "project",
        name: "Редизайн корпоративного сайта",
      },
    },
    {
      id: 3,
      author: {
        name: "Алексей Смирнов",
        avatar: "/placeholder-avatar.jpg",
        initials: "АС",
      },
      content: "Обнаружил ошибку в расчетах. Нужно пересмотреть формулы в разделе финансового анализа.",
      timestamp: "Вчера",
      likes: 2,
      replies: 1,
      target: {
        type: "document",
        name: "Финансовый отчет Q2",
      },
    },
    {
      id: 4,
      author: {
        name: "Елена Соколова",
        avatar: "/placeholder-avatar.jpg",
        initials: "ЕС",
      },
      content: "Предлагаю добавить еще один ключевой результат для более точного измерения прогресса.",
      timestamp: "Вчера",
      likes: 7,
      replies: 3,
      target: {
        type: "okr",
        name: "Увеличить доход компании на 20%",
      },
    },
  ]

  const getTargetBadge = (type: string) => {
    switch (type) {
      case "task":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Задача
          </Badge>
        )
      case "project":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Проект
          </Badge>
        )
      case "document":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Документ
          </Badge>
        )
      case "okr":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            ОКР
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{comment.author.name}</CardTitle>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    {getTargetBadge(comment.target.type)}
                    <span className="text-sm text-muted-foreground">{comment.target.name}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Меню</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Редактировать</DropdownMenuItem>
                  <DropdownMenuItem>Копировать ссылку</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{comment.content}</p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{comment.replies}</span>
              </Button>
            </div>
            {comment.id === 1 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Вы" />
                    <AvatarFallback>ВЫ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea placeholder="Напишите ответ..." className="min-h-[80px]" />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" className="gap-1">
                        <Send className="h-4 w-4" />
                        <span>Отправить</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

