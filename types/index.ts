import type React from "react"

// Общие типы для всего приложения
export interface User {
  id: number
  name: string
  email: string
  avatarUrl: string
  role: string
}

// Типы для аутентификации
export interface AuthResponse {
  success: boolean
  user?: User
  message?: string
}

// Типы для аналитических данных
export interface StatItem {
  value: number
  change: number
  trend: "up" | "down"
}

export interface DashboardStats {
  revenue: number
  revenueChange: number
  sales: number
  salesChange: number
  newCustomers: number
  customersChange: number
  conversionRate: number
  conversionChange: number
}

export interface SalesMetrics {
  totalRevenue: number
  revenueGrowth: number
  orderCount: number
  orderGrowth: number
  averageOrderValue: number
  aovGrowth: number
  itemsSold: number
  itemsGrowth: number
}

export interface MarketingMetrics {
  visitors: number
  visitorsGrowth: number
  conversion: number
  conversionGrowth: number
  ctr: number
  ctrGrowth: number
  cpc: number
  cpcGrowth: number
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
  profit?: number
  name?: string
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

export interface PerformanceData {
  id: number
  name: string
  value: number
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

// Типы для проектов
export interface Project {
  id: number
  name: string
  description: string
  progress: number
  status: "active" | "planning" | "completed" | "onhold"
  dueDate: string
  category: string
  team: TeamMember[]
}

export interface TeamMember {
  name: string
  avatar: string
  initials: string
}

// Типы для задач
export interface Task {
  id: number
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "completed"
  priority: "high" | "medium" | "low"
  dueDate: string
  project: string
  assignee: TeamMember
  completed: boolean
}

// Типы для календаря
export interface CalendarEvent {
  id: number
  title: string
  date: Date
  type: "meeting" | "presentation" | "deadline" | "training" | "review"
  time?: string
}

// Типы для ОКР
export interface OKR {
  id: number
  objective: string
  progress: number
  keyResults: KeyResult[]
  owner: string
  quarter: string
}

export interface KeyResult {
  id: number
  title: string
  progress: number
  target: number
  current: number
  unit: string
}

export interface Sale {
  id: string
  customer: string
  product: string
  amount: number
  status: "completed" | "processing" | "pending" | "cancelled"
  date: string
}

