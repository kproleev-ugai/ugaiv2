// Общие типы для всего приложения

export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "manager" | "analyst" | "user"
}

export type Client = {
  id: string
  name: string
  logo?: string
  industry?: string
  contactPerson?: string
  contactEmail?: string
  contactPhone?: string
}

export type Project = {
  id: string
  name: string
  client: Client | string
  startDate: string
  endDate?: string
  status: "active" | "completed" | "on_hold" | "cancelled"
  progress: number
  description?: string
}

export type Task = {
  id: string
  title: string
  description?: string
  dueDate?: string
  status: "todo" | "in_progress" | "review" | "completed"
  priority: "low" | "medium" | "high"
  assignedTo?: User | string
  project?: Project | string
}

export type Report = {
  id: string
  title: string
  description?: string
  createdAt: string
  updatedAt?: string
  author: User | string
  project?: Project | string
  type: "weekly" | "monthly" | "quarterly" | "custom"
  content: string
}

export type KPI = {
  id: string
  name: string
  description?: string
  target: number
  current: number
  unit: string
  period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  user?: User | string
}

export type AnalyticsFilter = {
  dateRange?: {
    start: Date
    end: Date
  }
  clients?: string[]
  projects?: string[]
  metrics?: string[]
}

export type Notification = {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
  link?: string
}

export type CalendarEvent = {
  id: string
  title: string
  start: string
  end: string
  allDay?: boolean
  description?: string
  location?: string
  project?: Project | string
  attendees?: (User | string)[]
}
