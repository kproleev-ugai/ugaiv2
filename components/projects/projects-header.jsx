import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function ProjectsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Проекты</h1>
        <p className="text-muted-foreground">Управляйте своими проектами и отслеживайте их прогресс</p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Новый проект
      </Button>
    </div>
  )
}

