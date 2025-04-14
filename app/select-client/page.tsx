"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useClients } from "@/hooks/use-clients"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Building2, LogOut } from "lucide-react"

export default function SelectClientPage() {
  const { clients, loading, error } = useClients()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  // Фильтрация клиентов по поисковому запросу
  const filteredClients = clients.filter((client) => client.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Обработчик выбора клиента
  const handleSelectClient = (clientId: string) => {
    router.push(`/${clientId}`)
  }

  // Если пользователь не аутентифицирован, перенаправляем на страницу входа
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login")
    }
  }, [user, loading, router])

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="flex flex-1 items-center gap-2">
          <Building2 className="h-6 w-6" />
          <h1 className="text-lg font-semibold">UGAI</h1>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.firstName || user.email} />
                <AvatarFallback>{user.firstName ? user.firstName[0] : user.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user.firstName || user.email}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => logout()}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Выйти</span>
            </Button>
          </div>
        )}
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Выберите клиента</h1>
            <p className="text-muted-foreground">Выберите клиента для работы с его данными и аналитикой</p>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск клиентов..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                  <CardFooter className="p-4">
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">{error}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                  Попробовать снова
                </Button>
              </CardContent>
            </Card>
          ) : filteredClients.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Клиенты не найдены. Попробуйте изменить поисковый запрос."
                    : "Клиенты не найдены. Добавьте клиентов в систему."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClients.map((client) => (
                <Card key={client.id} className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={client.logo || ""} alt={client.name} />
                        <AvatarFallback>{client.name[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                    </div>
                    <CardDescription>{client.description || "Нет описания"}</CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4">
                    <Button className="w-full" onClick={() => handleSelectClient(client.id)}>
                      Выбрать
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
