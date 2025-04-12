"use client"

import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FinanceAnalyticsPage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Финансовая аналитика</h1>
        <p className="text-muted-foreground">Финансовые показатели для {currentClient.name}</p>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="revenue">Доходы</TabsTrigger>
            <TabsTrigger value="expenses">Расходы</TabsTrigger>
            <TabsTrigger value="profit">Прибыль</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Доход</CardTitle>
                  <CardDescription>Общий доход за период</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽1,245,600</div>
                  <p className="text-sm text-green-600 mt-2">+12.5% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Расходы</CardTitle>
                  <CardDescription>Общие расходы за период</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽876,400</div>
                  <p className="text-sm text-red-600 mt-2">+8.3% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Прибыль</CardTitle>
                  <CardDescription>Чистая прибыль за период</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽369,200</div>
                  <p className="text-sm text-green-600 mt-2">+22.1% к прошлому периоду</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Финансовые показатели</CardTitle>
                  <CardDescription>Динамика за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">График финансовых показателей</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Структура доходов</CardTitle>
                <CardDescription>Распределение доходов по источникам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Диаграмма структуры доходов</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Структура расходов</CardTitle>
                <CardDescription>Распределение расходов по категориям</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Диаграмма структуры расходов</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profit" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Динамика прибыли</CardTitle>
                <CardDescription>Изменение прибыли по периодам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">График динамики прибыли</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
