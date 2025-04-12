"use client"

import { Brain } from "lucide-react"
import { useClient } from "@/contexts/client-context"

import { FeatureBlocks } from "@/components/home/feature-blocks"
import { UserActivity } from "@/components/home/user-activity"
import { UpcomingEvents } from "@/components/home/upcoming-events"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientHomePage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div className="container mx-auto py-8">Загрузка...</div>
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold">{currentClient.name} - Панель управления</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Управление бизнес-показателями, целями и задачами с использованием искусственного интеллекта
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4 space-y-8">
          <FeatureBlocks clientId={currentClient.id} />
        </div>

        <div className="w-full md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Проекты</CardTitle>
              <CardDescription>Активные проекты клиента</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "Маркетинговая кампания 2024", progress: 75 },
                  { name: "Редизайн сайта", progress: 45 },
                  { name: "Разработка мобильного приложения", progress: 30 },
                ].map((project, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{project.name}</span>
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
