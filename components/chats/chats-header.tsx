import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function ChatsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Внутренние чаты</h1>
        <p className="text-muted-foreground">Общайтесь с коллегами и командами в реальном времени</p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Новый чат
      </Button>
    </div>
  )
}

