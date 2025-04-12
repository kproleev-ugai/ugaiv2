"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Brain, ChevronDown, Search, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { MobileSidebar } from "@/components/layout/mobile-sidebar"
import { Badge } from "@/components/ui/badge"
import { useClient, availableClients } from "@/contexts/client-context"
import Image from "next/image"

const getNavItems = (clientId: string) => [
  { name: "Главная", href: `/${clientId}` },
  { name: "Аналитика", href: `/${clientId}/analytics` },
  { name: "OKR", href: `/${clientId}/okr` },
  { name: "Календарь", href: `/${clientId}/calendar` },
  { name: "Задачи", href: `/${clientId}/tasks` },
]

export function Navbar() {
  const pathname = usePathname()
  const { currentClient } = useClient()
  const clientId = currentClient?.id || ""

  const navItems = getNavItems(clientId)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <MobileSidebar />
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
              <Brain className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">UGAI</span>
            <Badge
              variant="outline"
              className="text-xs h-5 px-1.5 py-0 ml-1 border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800"
            >
              AI
            </Badge>
          </Link>

          {currentClient && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2">
                  <div className="flex items-center gap-2">
                    {currentClient.logo && (
                      <div className="relative w-5 h-5 rounded-full overflow-hidden">
                        <Image
                          src={currentClient.logo || "/placeholder.svg"}
                          alt={currentClient.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span>{currentClient.name}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Выбрать клиента</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {availableClients.map((client) => (
                  <DropdownMenuItem key={client.id} asChild>
                    <Link href={`/${client.id}`} className="flex items-center gap-2">
                      {client.logo && (
                        <div className="relative w-5 h-5 rounded-full overflow-hidden">
                          <Image
                            src={client.logo || "/placeholder.svg"}
                            alt={client.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      {client.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {currentClient && (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-full max-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Поиск..." className="w-full pl-8" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {currentClient && (
                <>
                  <DropdownMenuItem asChild>
                    <Link href={`/${currentClient.id}/profile`}>Профиль</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${currentClient.id}/settings`}>Настройки</Link>
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login">Выйти</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
