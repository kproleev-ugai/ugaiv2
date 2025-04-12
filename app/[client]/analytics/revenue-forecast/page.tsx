"use client"

import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RevenueForecastPage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Прогноз выручки</h1>
        <p className="text-muted-foreground">AI-прогноз выручки для {currentClient.name}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Прогноз на месяц</CardTitle>
              <CardDescription>Ожидаемая выручка</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₽1,350,000</div>
              <p className="text-sm text-green-600 mt-2">+8.4% к текущему месяцу</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Прогноз на квартал</CardTitle>
              <CardDescription>Ожидаемая выручка</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₽4,250,000</div>
              <p className="text-sm text-green-600 mt-2">+12.7% к текущему кварталу</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Прогноз на год</CardTitle>
              <CardDescription>Ожидаемая выручка</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₽16,800,000</div>
              <p className="text-sm text-green-600 mt-2">+15.2% к текущему году</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Прогноз выручки</CardTitle>
              <CardDescription>Прогноз на следующие 12 месяцев</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">График прогноза выручки</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
