import { Button } from "@/components/ui/button"
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CalendarHeader() {
  // Текущая дата для демонстрации
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("ru-RU", { month: "long" })
  const currentYear = currentDate.getFullYear()

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Календарь</h1>
        <p className="text-muted-foreground">Планируйте свои встречи и отслеживайте события</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="mx-4 font-medium">
            {currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)} {currentYear}
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Select defaultValue="month">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Вид" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">День</SelectItem>
            <SelectItem value="week">Неделя</SelectItem>
            <SelectItem value="month">Месяц</SelectItem>
            <SelectItem value="year">Год</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Событие
        </Button>
      </div>
    </div>
  )
}

