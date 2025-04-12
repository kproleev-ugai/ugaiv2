"use client"

import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SalesFunnelPage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Воронка продаж</h1>
        <p className="text-muted-foreground">Анализ воронки продаж для {currentClient.name}</p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Посетители</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450</div>
              <p className="text-xs text-green-600 mt-1">100%</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Лиды</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-green-600 mt-1">10%</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Квалифицированные</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">625</div>
              <p className="text-xs text-green-600 mt-1">5%</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Возможности</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">312</div>
              <p className="text-xs text-green-600 mt-1">2.5%</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Клиенты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
              <p className="text-xs text-green-600 mt-1">1%</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Визуализация воронки продаж</CardTitle>
              <CardDescription>Конверсия на каждом этапе</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Диаграмма воронки продаж</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
