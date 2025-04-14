"use client"

import { useState, useEffect } from "react"

export interface Report {
  id: number
  title: string
  description: string
  type: "dashboard" | "chart" | "table" | "custom"
  category: "marketing" | "sales" | "finance" | "performance" | "customers"
  lastViewed: string
  favorite: boolean
  shared: boolean
  chartType?: "bar" | "line" | "pie"
}

export function useReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Имитация загрузки данных с сервера
    const fetchData = async () => {
      try {
        setLoading(true)
        // В реальном приложении здесь был бы запрос к API
        // const response = await fetch('/api/reports');
        // const data = await response.json();

        // Имитация задержки сети
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Тестовые данные
        const mockData: Report[] = [
          {
            id: 1,
            title: "Маркетинговая эффективность",
            description: "Анализ эффективности маркетинговых кампаний по каналам",
            type: "dashboard",
            category: "marketing",
            lastViewed: "Сегодня, 10:30",
            favorite: true,
            shared: true,
          },
          {
            id: 2,
            title: "Динамика продаж",
            description: "Динамика продаж по месяцам с разбивкой по продуктам",
            type: "chart",
            category: "sales",
            lastViewed: "Вчера, 15:45",
            favorite: true,
            shared: false,
            chartType: "line",
          },
          {
            id: 3,
            title: "Финансовые показатели",
            description: "Ключевые финансовые показатели компании",
            type: "dashboard",
            category: "finance",
            lastViewed: "10.04.2025",
            favorite: false,
            shared: true,
          },
          {
            id: 4,
            title: "Воронка продаж",
            description: "Анализ конверсии на каждом этапе воронки продаж",
            type: "chart",
            category: "sales",
            lastViewed: "08.04.2025",
            favorite: false,
            shared: false,
            chartType: "bar",
          },
          {
            id: 5,
            title: "Сегментация клиентов",
            description: "Анализ клиентской базы по различным сегментам",
            type: "chart",
            category: "customers",
            lastViewed: "05.04.2025",
            favorite: true,
            shared: true,
            chartType: "pie",
          },
          {
            id: 6,
            title: "Выполнение KPI",
            description: "Отчет по выполнению ключевых показателей эффективности",
            type: "dashboard",
            category: "performance",
            lastViewed: "03.04.2025",
            favorite: false,
            shared: true,
          },
          {
            id: 7,
            title: "Анализ конкурентов",
            description: "Сравнительный анализ с ключевыми конкурентами",
            type: "custom",
            category: "marketing",
            lastViewed: "01.04.2025",
            favorite: false,
            shared: false,
          },
          {
            id: 8,
            title: "Прогноз продаж",
            description: "Прогнозирование объема продаж на следующий квартал",
            type: "chart",
            category: "sales",
            lastViewed: "28.03.2025",
            favorite: true,
            shared: true,
            chartType: "line",
          },
        ]

        setReports(mockData)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Неизвестная ошибка"))
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { reports, loading, error }
}
