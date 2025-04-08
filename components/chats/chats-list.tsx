"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Users } from "lucide-react"

export function ChatsList() {
  // Демо-данные
  const chats = [
    {
      id: 1,
      name: "Команда разработки",
      lastMessage: "Когда будет готов новый релиз?",
      lastMessageTime: "10:45",
      unreadCount: 3,
      isGroup: true,
      members: [
        { name: "Иван Петров", avatar: "/placeholder-avatar.jpg", initials: "ИП" },
        { name: "Мария Иванова", avatar: "/placeholder-avatar.jpg", initials: "МИ" },
        { name: "Алексей Смирнов", avatar: "/placeholder-avatar.jpg", initials: "АС" },
      ],
    },
    {
      id: 2,
      name: "Мария Иванова",
      lastMessage: "Отправила тебе документ на проверку",
      lastMessageTime: "Вчера",
      unreadCount: 0,
      isGroup: false,
      members: [{ name: "Мария Иванова", avatar: "/placeholder-avatar.jpg", initials: "МИ" }],
    },
    {
      id: 3,
      name: "Проект X",
      lastMessage: "Встреча перенесена на завтра в 15:00",
      lastMessageTime: "Вчера",
      unreadCount: 5,
      isGroup: true,
      members: [
        { name: "Иван Петров", avatar: "/placeholder-avatar.jpg", initials: "ИП" },
        { name: "Мария Иванова", avatar: "/placeholder-avatar.jpg", initials: "МИ" },
        { name: "Алексей Смирнов", avatar: "/placeholder-avatar.jpg", initials: "АС" },
        { name: "Елена Соколова", avatar: "/placeholder-avatar.jpg", initials: "ЕС" },
      ],
    },
    {
      id: 4,
      name: "Алексей Смирнов",
      lastMessage: "Спасибо за помощь!",
      lastMessageTime: "28 мая",
      unreadCount: 0,
      isGroup: false,
      members: [{ name: "Алексей Смирнов", avatar: "/placeholder-avatar.jpg", initials: "АС" }],
    },
    {
      id: 5,
      name: "Маркетинг",
      lastMessage: "Новая кампания запущена",
      lastMessageTime: "27 мая",
      unreadCount: 0,
      isGroup: true,
      members: [
        { name: "Елена Соколова", avatar: "/placeholder-avatar.jpg", initials: "ЕС" },
        { name: "Дмитрий Волков", avatar: "/placeholder-avatar.jpg", initials: "ДВ" },
        { name: "Ольга Новикова", avatar: "/placeholder-avatar.jpg", initials: "ОН" },
      ],
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-4 lg:col-span-3">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Поиск чатов..." className="pl-8" />
          </div>
        </div>
        <div className="space-y-2">
          {chats.map((chat) => (
            <Card key={chat.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  {chat.isGroup ? (
                    <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  ) : (
                    <Avatar>
                      <AvatarImage src={chat.members[0].avatar} alt={chat.members[0].name} />
                      <AvatarFallback>{chat.members[0].initials}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{chat.name}</h3>
                      <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {chat.unreadCount}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="md:col-span-8 lg:col-span-9">
        <Card className="h-[calc(100vh-13rem)]">
          <CardContent className="p-6 h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Выберите чат для начала общения</h3>
              <p className="text-sm">Или создайте новый чат, нажав кнопку "Новый чат"</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

