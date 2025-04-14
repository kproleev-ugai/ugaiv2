import { Directus } from "@directus/sdk"

// Определение типов для коллекций Directus
export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  role: string
  avatar?: string
  status: string
}

export interface Client {
  id: string
  name: string
  logo?: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  description?: string
  client: string | Client
  status: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: string
  priority: string
  due_date?: string
  assigned_to?: string | User
  project?: string | Project
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  title: string
  content: string
  project?: string | Project
  created_by: string | User
  created_at: string
  updated_at: string
}

export interface KPI {
  id: string
  name: string
  description?: string
  target: number
  current: number
  unit: string
  user?: string | User
  created_at: string
  updated_at: string
}

export interface Analytics {
  id: string
  name: string
  data: any
  client?: string | Client
  project?: string | Project
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  user: string | User
  created_at: string
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: string
  end: string
  all_day: boolean
  location?: string
  attendees?: string[]
  project?: string | Project
  created_by: string | User
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  title: string
  description?: string
  file: string
  file_type: string
  file_size: number
  project?: string | Project
  uploaded_by: string | User
  created_at: string
  updated_at: string
}

// Определение типов коллекций для Directus
interface DirectusCollections {
  users: User
  clients: Client
  projects: Project
  tasks: Task
  reports: Report
  kpis: KPI
  analytics: Analytics
  notifications: Notification
  calendar_events: CalendarEvent
  documents: Document
}

// Создание экземпляра Directus
const directus = new Directus<DirectusCollections>(process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055")

export default directus
