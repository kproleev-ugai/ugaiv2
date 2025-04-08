"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function ProjectsFilters() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Поиск проектов..." className="w-full pl-8" />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="completed">Завершенные</SelectItem>
            <SelectItem value="planning">Планирование</SelectItem>
            <SelectItem value="onhold">На паузе</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="newest">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Сначала новые</SelectItem>
            <SelectItem value="oldest">Сначала старые</SelectItem>
            <SelectItem value="name-asc">По имени (А-Я)</SelectItem>
            <SelectItem value="name-desc">По имени (Я-А)</SelectItem>
            <SelectItem value="progress">По прогрессу</SelectItem>
          </SelectContent>
        </Select>

        <Sheet open={showFilters} onOpenChange={setShowFilters}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Фильтры
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Фильтры</SheetTitle>
              <SheetDescription>Настройте фильтры для отображения проектов</SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Категории</h3>
                <div className="space-y-2">
                  {["Веб-разработка", "Мобильная разработка", "Дизайн", "Маркетинг", "Аналитика"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`category-${category}`} />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Приоритет</h3>
                <div className="space-y-2">
                  {["Высокий", "Средний", "Низкий"].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox id={`priority-${priority}`} />
                      <Label htmlFor={`priority-${priority}`}>{priority}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Команда</h3>
                <div className="space-y-2">
                  {["Разработка", "Дизайн", "Маркетинг", "Продажи", "Поддержка"].map((team) => (
                    <div key={team} className="flex items-center space-x-2">
                      <Checkbox id={`team-${team}`} />
                      <Label htmlFor={`team-${team}`}>{team}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button onClick={() => setShowFilters(false)}>Применить фильтры</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

