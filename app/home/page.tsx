import { Brain } from "lucide-react"

import { FeatureBlocks } from "@/components/home/feature-blocks"
import { ClientProjectSelector } from "@/components/home/client-project-selector"
import { UserActivity } from "@/components/home/user-activity"
import { UpcomingEvents } from "@/components/home/upcoming-events"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">UGAI Business Performance</h1>
          <Badge
            variant="outline"
            className="text-xs h-5 px-1.5 py-0 ml-1 border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800"
          >
            AI
          </Badge>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Платформа для анализа бизнес-показателей, управления целями и задачами с использованием искусственного
          интеллекта
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4 space-y-8">
          <FeatureBlocks />
        </div>

        <div className="w-full md:w-1/4 space-y-6">
          <ClientProjectSelector />
          <UpcomingEvents />
        </div>
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserActivity />
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-5 w-5" />
              <h3 className="text-xl font-semibold">AI-ассистент UGAI</h3>
            </div>
            <p className="mb-4 opacity-90">
              Используйте возможности искусственного интеллекта для анализа данных, прогнозирования и оптимизации
              бизнес-процессов
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/10 rounded p-3">
                <h4 className="font-medium mb-1">Анализ данных</h4>
                <p className="text-sm opacity-80">Автоматический анализ бизнес-показателей</p>
              </div>
              <div className="bg-white/10 rounded p-3">
                <h4 className="font-medium mb-1">Прогнозирование</h4>
                <p className="text-sm opacity-80">Предсказание трендов и результатов</p>
              </div>
              <div className="bg-white/10 rounded p-3">
                <h4 className="font-medium mb-1">Рекомендации</h4>
                <p className="text-sm opacity-80">Советы по улучшению показателей</p>
              </div>
              <div className="bg-white/10 rounded p-3">
                <h4 className="font-medium mb-1">Автоматизация</h4>
                <p className="text-sm opacity-80">Автоматизация рутинных задач</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
