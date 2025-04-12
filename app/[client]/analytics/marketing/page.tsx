"use client"

import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MarketingAnalyticsPage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Маркетинговая аналитика</h1>
        <p className="text-muted-foreground">Анализ эффективности маркетинговых кампаний {currentClient.name}</p>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="campaigns">Кампании</TabsTrigger>
            <TabsTrigger value="channels">Каналы</TabsTrigger>
            <TabsTrigger value="audience">Аудитория</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Расходы на маркетинг</CardTitle>
                  <CardDescription>За последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽450,000</div>
                  <p className="text-sm text-red-600 mt-2">+15.3% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Лиды</CardTitle>
                  <CardDescription>За последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">128</div>
                  <p className="text-sm text-green-600 mt-2">+22.5% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Стоимость привлечения</CardTitle>
                  <CardDescription>За последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽3,515</div>
                  <p className="text-sm text-green-600 mt-2">-5.8% к прошлому периоду</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Эффективность каналов</CardTitle>
                  <CardDescription>Сравнение каналов привлечения</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">График эффективности каналов</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Маркетинговые кампании</CardTitle>
                <CardDescription>Эффективность текущих кампаний</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Таблица маркетинговых кампаний</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="channels" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Каналы привлечения</CardTitle>
                <CardDescription>Анализ каналов привлечения клиентов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Диаграмма каналов привлечения</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Анализ аудитории</CardTitle>
                <CardDescription>Демографические и поведенческие характеристики</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Графики анализа аудитории</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
