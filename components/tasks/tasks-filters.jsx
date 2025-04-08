"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export function TasksFilters() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-4 md:inline-flex">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="my">Мои</TabsTrigger>
          <TabsTrigger value="assigned">Назначенные</TabsTrigger>
          <TabsTrigger value="completed">Выполненные</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Поиск задач..." className="w-full pl-8" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="todo">К выполнению</SelectItem>
              <SelectItem value="in-progress">В процессе</SelectItem>
              <SelectItem value="review">На проверке</SelectItem>
              <SelectItem value="completed">Выполнено</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="newest">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Сначала новые</SelectItem>
              <SelectItem value="oldest">Сначала старые</SelectItem>
              <SelectItem value="priority">По приоритету</SelectItem>
              <SelectItem value="due-date">По сроку</SelectItem>
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
                <SheetDescription>Настройте фильтры для отображения задач</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
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
                  <h3 className="text-sm font-medium">Проекты</h3>
                  <div className="space-y-2">
                    {[
                      "Редизайн сайта",
                      "Мобильное приложение",
                      "Маркетинговая кампания",
                      "CRM интеграция",
                      "Аналитическая платформа",
                    ].map((project) => (
                      <div key={project} className="flex items-center space-x-2">
                        <Checkbox id={`project-${project}`} />
                        <Label htmlFor={`project-${project}`}>{project}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Исполнители</h3>
                  <div className="space-y-2">
                    {["Анна С.", "Иван П.", "Мария И.", "Алексей К.", "Елена С."].map((assignee) => (
                      <div key={assignee} className="flex items-center space-x-2">
                        <Checkbox id={`assignee-${assignee}`} />
                        <Label htmlFor={`assignee-${assignee}`}>{assignee}</Label>
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
    </div>
  )
}

