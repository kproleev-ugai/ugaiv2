/**
 * Сервис для работы с аналитическими данными
 */

import { api } from "@/lib/api-client"
import type { AnalyticsStats, ChartDataPoint, FunnelDataPoint, PerformanceData } from "@/types/analytics"

/**
 * Получает основные статистические данные для аналитики
 */
export async function getAnalyticsStats(): Promise<AnalyticsStats> {
  return api.get<AnalyticsStats>("/analytics/stats")
}

/**
 * Получает данные для графика продаж
 * @param period - Период (month или year)
 */
export async function getSalesChartData(period: "month" | "year"): Promise<ChartDataPoint[]> {
  return api.get<ChartDataPoint[]>(`/analytics/sales-chart?period=${period}`)
}

/**
 * Получает данные для графика маркетинга
 */
export async function getMarketingChartData(): Promise<{
  sourceData: ChartDataPoint[]
  campaignData: ChartDataPoint[]
}> {
  return api.get<{
    sourceData: ChartDataPoint[]
    campaignData: ChartDataPoint[]
  }>("/analytics/marketing-chart")
}

/**
 * Получает данные для воронки конверсии
 */
export async function getConversionFunnelData(): Promise<FunnelDataPoint[]> {
  return api.get<FunnelDataPoint[]>("/analytics/conversion-funnel")
}

/**
 * Получает данные для таблицы производительности
 */
export async function getPerformanceTableData(): Promise<PerformanceData[]> {
  return api.get<PerformanceData[]>("/analytics/performance-table")
}

/**
 * Экспортирует аналитические данные в CSV
 * @param dateRange - Диапазон дат для экспорта
 */
export async function exportAnalyticsData(dateRange: { from: Date; to: Date }): Promise<Blob> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/export`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(dateRange),
  })

  if (!response.ok) {
    throw new Error("Ошибка при экспорте данных")
  }

  return await response.blob()
}

