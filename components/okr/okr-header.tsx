import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function OKRHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Цели и ключевые результаты</h1>
        <p className="text-muted-foreground">Управление целями компании и отслеживание ключевых результатов</p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Новая цель
      </Button>
    </div>
  )
}

