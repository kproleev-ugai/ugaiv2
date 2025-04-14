"use client"

import { useState, useEffect } from "react"

export interface Task {
  id: number
  title: string
  description: string
  status: "new" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  deadline: string
  assignee: string
  project?: string
  tags: string[]
  kpi?: string
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Имитация загрузки данных с сервера
    const fetchData = async () => {
      try {
        setLoading(true)
        // В реальном приложении здесь был бы запрос к API
        // const response = await fetch('/api/tasks');
        // const data = await response.json();

        // Имитация задержки сети
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Тестовые данные
        const mockData: Task[] = [
          {
            id: 1,
            title: "Подготовить отчет по маркетингу",
            description: "Создать ежемесячный отчет по эффективности маркетинговых кампаний",
            status: "in-progress",
            priority: "high",
            deadline: "Сегодня, 18:00",
            assignee: "Иван Иванов",
            project: "Маркетинговая аналитика",
            tags: ["отчет", "маркетинг"],
            kpi: "Конверсия лидов",
          },
          {
            id: 2,
            title: "Созвон с командой разработки",
            description: "Обсудить статус текущих задач и планы на следующую неделю",
            status: "new",
            priority: "medium",
            deadline: "Завтра, 10:30",
            assignee: "Иван Иванов",
            project: "Внутренние коммуникации",
            tags: ["встреча", "команда"],
          },
          {
            id: 3,
            title: "Обновить презентацию для клиента",
            description: "Внести правки в презентацию по результатам последней встречи",
            status: "review",
            priority: "medium",
            deadline: "12.04.2025",
            assignee: "Иван Иванов",
            project: "Проект А",
            tags: ["презентация", "клиент"],
          },
          {
            id: 4,
            title: "Ревью квартальных KPI",
            description: "Проанализировать выполнение KPI за квартал и подготовить рекомендации",
            status: "new",
            priority: "high",
            deadline: "15.04.2025",
            assignee: "Иван Иванов",
            project: "Стратегическое планирование",
            tags: ["kpi", "аналитика"],
            kpi: "Выполнение плана",
          },
          {
            id: 5,
            title: "Подготовить материалы для тренинга",
            description: "Разработать программу и материалы для тренинга новых сотрудников",
            status: "in-progress",
            priority: "medium",
            deadline: "20.04.2025",
            assignee: "Иван Иванов",
            project: "Обучение персонала",
            tags: ["тренинг", "обучение"],
          },
          {
            id: 6,
            title: "Оптимизировать воронку продаж",
            description: "Проанализировать и оптимизировать этапы воронки продаж для увеличения конверсии",
            status: "new",
            priority: "high",
            deadline: "25.04.2025",
            assignee: "Иван Иванов",
            project: "Оптимизация продаж",
            tags: ["продажи", "конверсия"],
            kpi: "Средний чек",
          },
          {
            id: 7,
            title: "Обновить документацию по продукту",
            description: "Актуализировать документацию в соответствии с последними изменениями",
            status: "done",
            priority: "low",
            deadline: "05.04.2025",
            assignee: "Иван Иванов",
            project: "Документация",
            tags: ["документация", "продукт"],
          },
          {
            id: 8,
            title: "Анализ удовлетворенности клиентов",
            description: "Провести анализ результатов опроса удовлетворенности клиентов",
            status: "done",
            priority: "medium",
            deadline: "03.04.2025",
            assignee: "Иван Иванов",
            project: "Клиентский опыт",
            tags: ["клиенты", "аналитика"],
            kpi: "NPS",
          },
        ]

        setTasks(mockData)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Неизвестная ошибка"))
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { tasks, loading, error }
}
