"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Moon, Search, Settings, Sun, User, LogOut, BarChart2, CheckSquare, Calendar, Target } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import type { NavItem } from "@/types/index"
import { Logo } from "@/components/common/logo"
import { getCurrentUser, logout } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"

export function Header() {
  const { setTheme, theme } = useTheme()
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; avatarUrl?: string } | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  // Загружаем данные пользователя при монтировании компонента
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUser()
  }, [])

  // Обработчик выхода из системы
  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Выход выполнен",
        description: "Вы успешно вышли из системы",
      })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось выйти из системы",
      })
    }
  }

  // Основные пункты меню для горизонтальной навигации
  const mainNavItems: NavItem[] = [
    {
      title: "Аналитика",
      href: "/analytics",
      icon: BarChart2,
    },
    {
      title: "Задачи",
      href: "/tasks",
      icon: CheckSquare,
    },
    {
      title: "Календарь",
      href: "/calendar",
      icon: Calendar,
    },
    {
      title: "ОКР",
      href: "/okr",
      icon: Target,
    },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger />

      <div className="hidden md:block">
        <Logo className="h-8" />
      </div>

      <div className="flex-1 flex items-center">
        {showSearchOnMobile ? (
          <div className="absolute inset-x-0 top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setShowSearchOnMobile(false)}>
              <span className="sr-only">Закрыть поиск</span>
              <Search className="h-5 w-5" />
            </Button>
            <Input className="flex-1" placeholder="Поиск..." autoComplete="off" />
          </div>
        ) : (
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowSearchOnMobile(true)}>
            <span className="sr-only">Поиск</span>
            <Search className="h-5 w-5" />
          </Button>
        )}

        {/* Горизонтальное меню */}
        <nav className="hidden md:flex items-center space-x-4 ml-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:flex-1 md:items-center md:gap-4 lg:gap-8 ml-auto">
          <form className="flex-1 lg:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Поиск..." className="w-full md:w-64 lg:w-80 pl-8" />
            </div>
          </form>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Переключить тему</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Уведомления</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-2 p-2">
              <p className="text-center text-sm text-muted-foreground py-4">У вас нет новых уведомлений</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl || "/placeholder-avatar.jpg"} alt="Аватар" />
                <AvatarFallback>
                  {user?.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "ИП"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.name || "Иван Петров"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Профиль</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Настройки</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

