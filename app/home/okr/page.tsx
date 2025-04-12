import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OKRPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">OKR и KPI</h1>
        <p className="text-muted-foreground">Управление целями и ключевыми показателями эффективности</p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Цели и задачи</CardTitle>
            <CardDescription>Управление целями и ключевыми результатами</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Здесь будет отображаться информация о целях и задачах</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
