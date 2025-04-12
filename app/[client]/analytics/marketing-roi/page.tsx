"use client"

import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MarketingROIPage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">ROI маркетинга</h1>
        <p className="text-muted-foreground">Анализ возврата инвестиций в маркетинг для {currentClient.name}</p>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="channels">По каналам</TabsTrigger>
            <TabsTrigger value="campaigns">По кампаниям</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Общий ROI</CardTitle>
                  <CardDescription>За последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">215%</div>
                  <p className="text-sm text-green-600 mt-2">+18% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Затраты на маркетинг</CardTitle>
                  <CardDescription>За последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽450,000</div>
                  <p className="text-sm text-red-600 mt-2">+15.3% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Доход от маркетинга</CardTitle>
                  <CardDescription>За последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽967,500</div>
                  <p className="text-sm text-green-600 mt-2">+22.5% к прошлому периоду</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Динамика ROI</CardTitle>
                  <CardDescription>За последние 12 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">График динамики ROI</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="channels" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>ROI по каналам</CardTitle>
                <CardDescription>Сравнение эффективности каналов</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Диаграмма ROI по каналам</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>ROI по кампаниям</CardTitle>
                <CardDescription>Сравнение эффективности кампаний</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Таблица ROI по кампаниям</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
