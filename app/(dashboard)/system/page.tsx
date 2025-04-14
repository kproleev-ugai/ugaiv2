import type { Metadata } from "next"
import DirectusStatus from "@/components/system/directus-status"
import DatabaseStatus from "@/components/system/database-status"
import ApiStatus from "@/components/system/api-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Системная информация | UGAI",
  description: "Информация о состоянии системы и подключениях",
}

export default function SystemPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Системная информация</h1>
        <p className="text-muted-foreground">Информация о состоянии системы и подключениях</p>
      </div>

      <Tabs defaultValue="status" className="space-y-4">
        <TabsList>
          <TabsTrigger value="status">Статус сервисов</TabsTrigger>
          <TabsTrigger value="environment">Окружение</TabsTrigger>
          <TabsTrigger value="logs">Логи</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <DirectusStatus />
            <DatabaseStatus />
            <ApiStatus />
          </div>
        </TabsContent>

        <TabsContent value="environment">
          <Card>
            <CardHeader>
              <CardTitle>Переменные окружения</CardTitle>
              <CardDescription>Текущие настройки окружения приложения</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Окружение</span>
                  <Badge variant="outline">{process.env.NEXT_PUBLIC_APP_ENV || "local"}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">API URL</span>
                  <Badge variant="outline">{process.env.NEXT_PUBLIC_API_URL}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Directus URL</span>
                  <Badge variant="outline">{process.env.NEXT_PUBLIC_DIRECTUS_URL}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Debug</span>
                  <Badge variant={process.env.DEBUG === "True" ? "default" : "outline"}>
                    {process.env.DEBUG === "True" ? "Включен" : "Выключен"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Node.js версия</span>
                  <Badge variant="outline">{process.version}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Системные логи</CardTitle>
              <CardDescription>Последние записи системных логов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-md bg-muted p-4 font-mono text-sm overflow-auto">
                <p className="text-muted-foreground">Логи недоступны в веб-интерфейсе.</p>
                <p className="text-muted-foreground">Проверьте консоль сервера или файлы логов.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
