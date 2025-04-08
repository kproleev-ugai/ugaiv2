import type React from "react"
// Типы для аналитических данных
export interface StatItem {
  value: number
  change: number
  trend: "up" | "down"
}

export interface AnalyticsStats {
  students: StatItem
  courses: StatItem
  revenue: StatItem
  conversion: StatItem
}

export interface ChartDataPoint {
  date: string
  revenue?: number
  contracts?: number
  sales?: number
  target?: number
  clicks?: number
  cost?: number
  roas?: number
}

export interface FunnelDataPoint {
  name: string
  value: number
  rate: string
}

export interface SourceDataPoint {
  name: string
  value: number
}

export interface CoursePerformance {
  id: number
  course: string
  students: number
  revenue: number
  avgCost: number
  completionRate: number
}

// Типы для навигации
export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface NavSection {
  title: string
  items: NavItem[]
}

