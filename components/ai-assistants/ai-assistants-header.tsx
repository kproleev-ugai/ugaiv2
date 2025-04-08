import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function AIAssistantsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ИИ ассистенты</h1>
        <p className="text-muted-foreground">Используйте ИИ ассистентов для автоматизации рутинных задач</p>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Новый ассистент
      </Button>
    </div>
  )
}

