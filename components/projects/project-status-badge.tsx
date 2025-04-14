import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertTriangle, CircleDashed } from "lucide-react"

interface ProjectStatusBadgeProps {
  status: string
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  switch (status) {
    case "completed":
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Завершен
        </Badge>
      )
    case "active":
      return (
        <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
          <Clock className="mr-1 h-3 w-3" />
          Активный
        </Badge>
      )
    case "delayed":
      return (
        <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Отложен
        </Badge>
      )
    case "not_started":
      return (
        <Badge variant="outline" className="border-gray-300 text-muted-foreground">
          <CircleDashed className="mr-1 h-3 w-3" />
          Не начат
        </Badge>
      )
    default:
      return (
        <Badge variant="outline">
          <CircleDashed className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      )
  }
}
