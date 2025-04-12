"use client"

import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChannelEfficiencyPage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Эффективность каналов</h1>
        <p className="text-muted-foreground">Анализ эффективности каналов привлечения для {currentClient.name}</p>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="cac">Стоимость привлечения</TabsTrigger>
            <TabsTrigger value="conversion">Конверсия</TabsTrigger>
            <TabsTrigger value="ltv">LTV</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Органический поиск</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32%</div>
                  <p className="text-xs text-green-600 mt-1">+5.2%</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Контекстная реклама</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28%</div>
                  <p className="text-xs text-green-600 mt-1">+3.7%</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Социальные сети</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">22%</div>
                  <p className="text-xs text-red-600 mt-1">-1.5%</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Реферальный трафик</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18%</div>
                  <p className="text-xs text-green-600 mt-1">+2.3%</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Сравнение каналов</CardTitle>
                  <CardDescription>По ключевым метрикам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Диаграмма сравнения каналов</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cac" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Стоимость привлечения клиента (CAC)</CardTitle>
                <CardDescription>По каналам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Диаграмма стоимости привлечения</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Конверсия</CardTitle>
                <CardDescription>По каналам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Диаграмма конверсии</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ltv" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Пожизненная ценность клиента (LTV)</CardTitle>
                <CardDescription>По каналам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Диаграмма LTV</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
