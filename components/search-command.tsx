"use client"

import * as React from "react"
import {
  Calendar,
  CreditCard,
  Settings,
  User,
  BarChart3,
  FileText,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  CheckSquare,
  HelpCircle,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <span className="hidden lg:inline-flex">Поиск по приложению...</span>
        <span className="inline-flex lg:hidden">Поиск...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Введите команду или поисковый запрос..." />
        <CommandList>
          <CommandEmpty>Ничего не найдено.</CommandEmpty>
          <CommandGroup heading="Разделы">
            <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Аналитика</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/okr"))}>
              <Target className="mr-2 h-4 w-4" />
              <span>OKR & KPI</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/finance"))}>
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Финансы</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/marketing"))}>
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Маркетинг</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/sales"))}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Продажи</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/tasks"))}>
              <CheckSquare className="mr-2 h-4 w-4" />
              <span>Задачи</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/calendar"))}>
              <Calendar className="mr-2 h-4 w-4" />
              <span>Календарь</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/team"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Команда</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Дашборды">
            <CommandItem onSelect={() => runCommand(() => router.push("/analytics"))}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>Основной дашборд</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/analytics/finance"))}>
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Финансовый дашборд</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/analytics/marketing"))}>
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Маркетинговый дашборд</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/analytics/sales"))}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Дашборд продаж</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/analytics/students"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>Дашборд студентов</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Настройки">
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Настройки</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings/profile"))}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings/billing"))}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Биллинг</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Помощь">
            <CommandItem onSelect={() => runCommand(() => window.open("https://docs.example.com", "_blank"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Документация</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => window.open("https://support.example.com", "_blank"))}>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Поддержка</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
