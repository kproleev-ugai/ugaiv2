import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CommentsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Комментарии</h1>
        <p className="text-muted-foreground">Просмотр и управление комментариями к задачам и проектам</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Фильтр" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все комментарии</SelectItem>
            <SelectItem value="tasks">К задачам</SelectItem>
            <SelectItem value="projects">К проектам</SelectItem>
            <SelectItem value="documents">К документам</SelectItem>
          </SelectContent>
        </Select>
        <Button>Обновить</Button>
      </div>
    </div>
  )
}

