"use client"

import { useState, useEffect } from "react"

export interface KPI {
  id: number
  name: string
  value: number
  target: number
  trend: "up" | "down" | "stable"
  change: string
  category: string
  description: string
  owner: string
  lastUpdated: string
}

export function useKPI() {
  const [kpiData, setKpiData] = useState<KPI[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Имитация загрузки данных с сервера
    const fetchData = async () => {
      try {
        setLoading(true)
        // В реальном приложении здесь был бы запрос к API
        // const response = await fetch('/api/kpi');
        // const data = await response.json();

        // Имитация задержки сети
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Тестовые данные
        const mockData: KPI[] = [
          {
            id: 1,
            name: "Конверсия лидов",
            value: 68,
            target: 75,
            trend: "up",
            change: "+5%",
            category: "sales",
            description: "Процент лидов, конвертированных в клиентов",
            owner: "Иван Иванов",
            lastUpdated: "10.04.2025",
          },
          {
            id: 2,
            name: "Средний чек",
            value: 12500,
            target: 15000,
            trend: "up",
            change: "+8%",
            category: "sales",
            description: "Средняя сумма заказа",
            owner: "Иван Иванов",
            lastUpdated: "10.04.2025",
          },
          {
            id: 3,
            name: "Удержание клиентов",
            value: 82,
            target: 85,
            trend: "down",
            change: "-3%",
            category: "customer",
            description: "Процент клиентов, совершивших повторную покупку",
            owner: "Иван Иванов",
            lastUpdated: "09.04.2025",
          },
          {
            id: 4,
            name: "Выполнение плана",
            value: 92,
            target: 100,
            trend: "up",
            change: "+12%",
            category: "performance",
            description: "Процент выполнения квартального плана продаж",
            owner: "Иван Иванов",
            lastUpdated: "08.04.2025",
          },
          {
            id: 5,
            name: "NPS",
            value: 65,
            target: 70,
            trend: "up",
            change: "+5%",
            category: "customer",
            description: "Индекс потребительской лояльности",
            owner: "Иван Иванов",
            lastUpdated: "07.04.2025",
          },
          {
            id: 6,
            name: "Время закрытия сделки",
            value: 14,
            target: 10,
            trend: "down",
            change: "-2 дня",
            category: "sales",
            description: "Среднее время от первого контакта до закрытия сделки (в днях)",
            owner: "Иван Иванов",
            lastUpdated: "05.04.2025",
          },
        ]

        setKpiData(mockData)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Неизвестная ошибка"))
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Функция для определения статуса KPI
  const getKpiStatus = (value: number, target: number) => {
    const percentage = (value / target) * 100
    if (percentage >= 90) return "success"
    if (percentage >= 70) return "warning"
    return "danger"
  }

  return { kpiData, loading, error, getKpiStatus }
}
