"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useState } from "react"
import type { DateRange } from "react-day-picker"
import { exportAnalyticsData } from "@/lib/api-services/analytics-service"
import { useToast } from "@/components/ui/use-toast"

export function AnalyticsHeader() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1), // Начало текущего года
    to: new Date(),
  })
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  // Обработчик экспорта данных
  const handleExport = async () => {
    if (!date?.from || !date?.to) {
      toast({
        variant: "destructive",
        title: "Ошибка экспорта",
        description: "Пожалуйста, выберите период для экспорта данных",
      })
      return
    }

    setIsExporting(true)

    try {
      const blob = await exportAnalyticsData({
        from: date.from,
        to: date.to || new Date(),
      })

      // Создаем ссылку для скачивания файла
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `analytics-export-${format(date.from, "yyyy-MM-dd")}-to-${format(
        date.to || new Date(),
        "yyyy-MM-dd",
      )}.csv`
      document.body.appendChild(a)
      a.click()

      // Очищаем ресурсы
      URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Экспорт выполнен",
        description: "Данные успешно экспортированы",
      })
    } catch (error) {
      console.error("Export error:", error)
      toast({
        variant: "destructive",
        title: "Ошибка экспорта",
        description: "Не удалось экспортировать данные. Пожалуйста, попробуйте снова.",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Аналитика</h1>
        <p className="text-muted-foreground">Анализ данных, курсов, доходов и маркетинговых кампаний</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y", { locale: ru })} - {format(date.to, "LLL dd, y", { locale: ru })}
                  </>
                ) : (
                  format(date.from, "LLL dd, y", { locale: ru })
                )
              ) : (
                <span>Выберите период</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ru}
            />
          </PopoverContent>
        </Popover>
        <Button onClick={handleExport} disabled={isExporting || !date?.from}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? "Экспорт..." : "Экспорт"}
        </Button>
      </div>
    </div>
  )
}

