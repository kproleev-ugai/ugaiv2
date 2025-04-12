import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MainDashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Основной дашборд</h1>
        <p className="text-muted-foreground">Ключевые показатели эффективности бизнеса</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₽1,245,600</div>
              <p className="text-xs text-green-600 mt-1">+12.5%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Новые клиенты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-green-600 mt-1">+8.2%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₽25,950</div>
              <p className="text-xs text-red-600 mt-1">-3.1%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8%</div>
              <p className="text-xs text-green-600 mt-1">+0.6%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Динамика выручки</CardTitle>
              <CardDescription>Сравнение с предыдущим периодом</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">График динамики выручки</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Источники трафика</CardTitle>
              <CardDescription>Распределение по каналам</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Диаграмма источников трафика</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Топ продуктов</CardTitle>
              <CardDescription>По объему продаж</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Таблица топ продуктов</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
