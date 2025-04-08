import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Дашборд</h1>
        <p className="text-muted-foreground">Добро пожаловать, Иван! Вот ваш обзор на сегодня.</p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Новый проект
      </Button>
    </div>
  )
}

