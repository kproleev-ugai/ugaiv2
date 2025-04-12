import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Аналитика</h1>
        <p className="text-muted-foreground">Анализ бизнес-показателей и визуализация данных</p>

        <Tabs defaultValue="dashboard" className="mt-6">
          <TabsList>
            <TabsTrigger value="dashboard">Основной дашборд</TabsTrigger>
            <TabsTrigger value="finance">Финансы</TabsTrigger>
            <TabsTrigger value="marketing">Маркетинг</TabsTrigger>
            <TabsTrigger value="sales">Продажи</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Общая выручка</CardTitle>
                  <CardDescription>За последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽1,245,600</div>
                  <p className="text-sm text-green-600 mt-2">+12.5% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Новые клиенты</CardTitle>
                  <CardDescription>За последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">48</div>
                  <p className="text-sm text-green-600 mt-2">+8.2% к прошлому периоду</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Средний чек</CardTitle>
                  <CardDescription>За последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₽25,950</div>
                  <p className="text-sm text-red-600 mt-2">-3.1% к прошлому периоду</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика показателей</CardTitle>
                  <CardDescription>Сравнение ключевых метрик за последние 6 месяцев</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">График динамики показателей</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="finance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Финансовая аналитика</CardTitle>
                <CardDescription>Финансовые показатели компании</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Финансовые показатели будут отображены здесь</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="marketing" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Маркетинговая аналитика</CardTitle>
                <CardDescription>Эффективность маркетинговых кампаний</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Маркетинговые показатели будут отображены здесь</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sales" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Аналитика продаж</CardTitle>
                <CardDescription>Показатели продаж и конверсии</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Показатели продаж будут отображены здесь</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
