"use client"

import { useClient } from "@/contexts/client-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SalesAnalyticsPage() {
  const { currentClient } = useClient()

  if (!currentClient) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Аналитика продаж</h1>
        <p className="text-muted-foreground">Показатели продаж для {currentClient.name}</p>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="products">Продукты</TabsTrigger>
            <TabsTrigger value="regions">Регионы</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Общие продажи</CardTitle>
                  <CardDescription>Объем продаж за период</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽1,245,600</div>
                  <p className="text-sm text-green-600 mt-2">+12.5% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Средний чек</CardTitle>
                  <CardDescription>Средняя сумма заказа</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽25,950</div>
                  <p className="text-sm text-red-600 mt-2">-3.1% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Количество заказов</CardTitle>
                  <CardDescription>Общее количество заказов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">48</div>
                  <p className="text-sm text-green-600 mt-2">+8.2% к прошлому периоду</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Динамика продаж</CardTitle>
                  <CardDescription>Динамика за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">График динамики продаж</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Продажи по продуктам</CardTitle>
                <CardDescription>Распределение продаж по продуктам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Таблица продаж по продуктам</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regions" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Продажи по регионам</CardTitle>
                <CardDescription>Распределение продаж по регионам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Карта продаж по регионам</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="mt-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Топ клиентов</CardTitle>
                <CardDescription>Клиенты с наибольшим объемом закупок</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-gray-800/50 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Таблица топ клиентов</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
