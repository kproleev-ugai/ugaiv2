import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Event {
  id: string
  title: string
  date: string
  time: string
  type: "meeting" | "deadline" | "reminder"
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Еженедельное совещание команды",
    date: "Сегодня",
    time: "15:00 - 16:00",
    type: "meeting",
  },
  {
    id: "2",
    title: "Дедлайн: Сдача квартального отчета",
    date: "Завтра",
    time: "18:00",
    type: "deadline",
  },
  {
    id: "3",
    title: "Встреча с клиентом ITstep",
    date: "25 апреля",
    time: "11:30 - 12:30",
    type: "meeting",
  },
  {
    id: "4",
    title: "Напоминание: Обновить OKR",
    date: "26 апреля",
    time: "10:00",
    type: "reminder",
  },
]

function getEventBadge(type: Event["type"]) {
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
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          Напоминание
        </Badge>
      )
    default:
      return null
  }
}

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Предстоящие события</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <div key={event.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="font-medium">{event.title}</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    {event.time}
                  </div>
                </div>
                {getEventBadge(event.type)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
