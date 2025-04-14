import { Directus } from "@directus/sdk"
import type {
  User,
  Client,
  Project,
  Task,
  Report,
  KPI,
  Analytics,
  Notification,
  CalendarEvent,
  Document,
} from "./directus"

// Определение типов коллекций Directus
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

// Аутентификация с использованием статического токена
export async function initDirectus() {
  try {
    await directus.auth.static(process.env.DIRECTUS_API_TOKEN || "")
    console.log("Directus initialized successfully")
    return directus
  } catch (error) {
    console.error("Failed to initialize Directus:", error)
    throw error
  }
}

// Получение экземпляра Directus с аутентификацией
export async function getDirectus() {
  try {
    return await initDirectus()
  } catch (error) {
    console.error("Error getting Directus instance:", error)
    throw error
  }
}

// Функции для работы с клиентами
export async function getClients() {
  const directusInstance = await getDirectus()
  return directusInstance.items("clients").readByQuery({
    sort: ["name"],
    filter: { status: { _eq: "active" } },
  })
}

export async function getClient(id: string) {
  const directusInstance = await getDirectus()
  return directusInstance.items("clients").readOne(id)
}

// Функции для работы с проектами
export async function getProjects(clientId?: string) {
  const directusInstance = await getDirectus()
  const query: any = {
    sort: ["-created_at"],
  }

  if (clientId) {
    query.filter = { client: { _eq: clientId } }
  }

  return directusInstance.items("projects").readByQuery(query)
}

export async function getProject(id: string) {
  const directusInstance = await getDirectus()
  return directusInstance.items("projects").readOne(id)
}

// Функции для работы с задачами
export async function getTasks(userId?: string, projectId?: string) {
  const directusInstance = await getDirectus()
  const query: any = {
    sort: ["-created_at"],
  }

  const filters = []
  if (userId) {
    filters.push({ assigned_to: { _eq: userId } })
  }

  if (projectId) {
    filters.push({ project: { _eq: projectId } })
  }

  if (filters.length > 0) {
    query.filter = { _and: filters }
  }

  return directusInstance.items("tasks").readByQuery(query)
}

export async function getTask(id: string) {
  const directusInstance = await getDirectus()
  return directusInstance.items("tasks").readOne(id)
}

// Функции для работы с отчетами
export async function getReports(projectId?: string) {
  const directusInstance = await getDirectus()
  const query: any = {
    sort: ["-created_at"],
  }

  if (projectId) {
    query.filter = { project: { _eq: projectId } }
  }

  return directusInstance.items("reports").readByQuery(query)
}

export async function getReport(id: string) {
  const directusInstance = await getDirectus()
  return directusInstance.items("reports").readOne(id)
}

// Функции для работы с KPI
export async function getKPIs(userId?: string) {
  const directusInstance = await getDirectus()
  const query: any = {
    sort: ["name"],
  }

  if (userId) {
    query.filter = { user: { _eq: userId } }
  }

  return directusInstance.items("kpis").readByQuery(query)
}

export async function getKPI(id: string) {
  const directusInstance = await getDirectus()
  return directusInstance.items("kpis").readOne(id)
}

// Функции для работы с аналитикой
export async function getAnalytics(clientId?: string, projectId?: string) {
  const directusInstance = await getDirectus()
  const query: any = {
    sort: ["name"],
  }

  const filters = []
  if (clientId) {
    filters.push({ client: { _eq: clientId } })
  }

  if (projectId) {
    filters.push({ project: { _eq: projectId } })
  }

  if (filters.length > 0) {
    query.filter = { _and: filters }
  }

  return directusInstance.items("analytics").readByQuery(query)
}

// Функции для работы с уведомлениями
export async function getNotifications(userId: string, read?: boolean) {
  const directusInstance = await getDirectus()
  const query: any = {
    sort: ["-created_at"],
    filter: { user: { _eq: userId } },
  }

  if (read !== undefined) {
    query.filter.read = { _eq: read }
  }

  return directusInstance.items("notifications").readByQuery(query)
}

// Функции для работы с календарем
export async function getCalendarEvents(userId?: string, projectId?: string) {
  const directusInstance = await getDirectus()
  const query: any = {
    sort: ["start"],
  }

  const filters = []
  if (userId) {
    filters.push({ attendees: { _contains: userId } })
  }

  if (projectId) {
    filters.push({ project: { _eq: projectId } })
  }

  if (filters.length > 0) {
    query.filter = { _and: filters }
  }

  return directusInstance.items("calendar_events").readByQuery(query)
}

// Функции для работы с документами
export async function getDocuments(projectId?: string) {
  const directusInstance = await getDirectus()
  const query: any = {
    sort: ["-created_at"],
  }

  if (projectId) {
    query.filter = { project: { _eq: projectId } }
  }

  return directusInstance.items("documents").readByQuery(query)
}

export async function getDocument(id: string) {
  const directusInstance = await getDirectus()
  return directusInstance.items("documents").readOne(id)
}
