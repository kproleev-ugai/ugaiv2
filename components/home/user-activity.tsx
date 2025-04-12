import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target: string
  time: string
  type: "task" | "comment" | "document" | "meeting" | "goal"
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    user: {
      name: "Анна Смирнова",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "АС",
    },
    action: "прокомментировала",
    target: "Квартальный отчет",
    time: "15 минут назад",
    type: "comment",
  },
  {
    id: "2",
    user: {
      name: "Иван Петров",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ИП",
    },
    action: "завершил задачу",
    target: "Подготовка презентации",
    time: "2 часа назад",
    type: "task",
  },
  {
    id: "3",
    user: {
      name: "Мария Иванова",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "МИ",
    },
    action: "добавила документ",
    target: "Маркетинговая стратегия",
    time: "вчера, 18:30",
    type: "document",
  },
  {
    id: "4",
    user: {
      name: "Алексей Козлов",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "АК",
    },
    action: "запланировал встречу",
    target: "Обсуждение проекта",
    time: "вчера, 15:45",
    type: "meeting",
  },
  {
    id: "5",
    user: {
      name: "Екатерина Новикова",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ЕН",
    },
    action: "обновила цель",
    target: "Увеличение продаж на 15%",
    time: "2 дня назад",
    type: "goal",
  },
]

function getActivityBadge(type: ActivityItem["type"]) {
  switch (type) {
    case "task":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Задача
        </Badge>
      )
    case "comment":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Комментарий
        </Badge>
      )
    case "document":
      return (
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          Документ
        </Badge>
      )
    case "meeting":
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Встреча
        </Badge>
      )
    case "goal":
      return (
        <Badge variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
          Цель
        </Badge>
      )
    default:
      return null
  }
}

export function UserActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Активность команды</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-medium text-sm">{activity.user.name}</span>
                  <span className="text-sm text-muted-foreground">{activity.action}</span>
                  <span className="font-medium text-sm">{activity.target}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  {getActivityBadge(activity.type)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
