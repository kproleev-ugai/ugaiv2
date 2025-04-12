import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CalendarPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Календарь</h1>
        <p className="text-muted-foreground">Планирование и управление временем</p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Календарь событий</CardTitle>
            <CardDescription>Планирование и отслеживание событий</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full bg-muted/20 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Здесь будет отображаться календарь событий</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
