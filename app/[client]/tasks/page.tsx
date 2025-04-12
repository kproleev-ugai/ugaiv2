"use client"

import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TasksPage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div className="container mx-auto py-8">Загрузка...</div>
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Задачи</h1>
        <p className="text-muted-foreground">Управление задачами и проектами {currentClient.name}</p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Канбан-доска</CardTitle>
            <CardDescription>Управление задачами в формате канбан</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Здесь будет отображаться канбан-доска с задачами</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
