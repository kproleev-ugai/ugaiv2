import { getCookie } from "cookies-next"

const API_URL = process.env.NEXT_PUBLIC_API_URL || ""

// Базовая функция для выполнения запросов к API
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getCookie("auth_token")

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    // Если статус 401, возможно, токен истек
    if (response.status === 401) {
      // Здесь можно добавить логику обновления токена
      // или перенаправления на страницу входа
    }

    const error = await response.json()
    throw new Error(error.message || "Произошла ошибка при запросе к API")
  }

  return response.json()
}

// Функции для работы с API
export const api = {
  // Аутентификация
  auth: {
    login: (email: string, password: string) =>
      fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),

    register: (userData: any) =>
      fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      }),

    refreshToken: (refreshToken: string) =>
      fetchAPI("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken }),
      }),
  },

  // Клиенты
  clients: {
    getAll: () => fetchAPI("/clients"),
    getById: (id: string) => fetchAPI(`/clients/${id}`),
    create: (data: any) =>
      fetchAPI("/clients", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchAPI(`/clients/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchAPI(`/clients/${id}`, {
        method: "DELETE",
      }),
  },

  // Проекты
  projects: {
    getAll: (clientId?: string) => fetchAPI(`/projects${clientId ? `?client=${clientId}` : ""}`),
    getById: (id: string) => fetchAPI(`/projects/${id}`),
    create: (data: any) =>
      fetchAPI("/projects", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchAPI(`/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchAPI(`/projects/${id}`, {
        method: "DELETE",
      }),
  },

  // Задачи
  tasks: {
    getAll: (filters?: { userId?: string; projectId?: string }) => {
      const params = new URLSearchParams()
      if (filters?.userId) params.append("user", filters.userId)
      if (filters?.projectId) params.append("project", filters.projectId)

      return fetchAPI(`/tasks${params.toString() ? `?${params.toString()}` : ""}`)
    },
    getById: (id: string) => fetchAPI(`/tasks/${id}`),
    create: (data: any) =>
      fetchAPI("/tasks", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchAPI(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchAPI(`/tasks/${id}`, {
        method: "DELETE",
      }),
  },

  // Отчеты
  reports: {
    getAll: (projectId?: string) => fetchAPI(`/reports${projectId ? `?project=${projectId}` : ""}`),
    getById: (id: string) => fetchAPI(`/reports/${id}`),
    create: (data: any) =>
      fetchAPI("/reports", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchAPI(`/reports/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchAPI(`/reports/${id}`, {
        method: "DELETE",
      }),
  },

  // KPI
  kpis: {
    getAll: (userId?: string) => fetchAPI(`/kpis${userId ? `?user=${userId}` : ""}`),
    getById: (id: string) => fetchAPI(`/kpis/${id}`),
    create: (data: any) =>
      fetchAPI("/kpis", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchAPI(`/kpis/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchAPI(`/kpis/${id}`, {
        method: "DELETE",
      }),
  },

  // Аналитика
  analytics: {
    getDashboard: (filters?: any) =>
      fetchAPI("/analytics/dashboard", {
        method: "POST",
        body: JSON.stringify(filters),
      }),
    getMarketingData: (filters?: any) =>
      fetchAPI("/analytics/marketing", {
        method: "POST",
        body: JSON.stringify(filters),
      }),
    getFinanceData: (filters?: any) =>
      fetchAPI("/analytics/finance", {
        method: "POST",
        body: JSON.stringify(filters),
      }),
    getSalesData: (filters?: any) =>
      fetchAPI("/analytics/sales", {
        method: "POST",
        body: JSON.stringify(filters),
      }),
  },

  // Пользователи
  users: {
    getProfile: () => fetchAPI("/users/profile"),
    updateProfile: (data: any) =>
      fetchAPI("/users/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    getNotifications: () => fetchAPI("/users/notifications"),
    markNotificationAsRead: (id: string) =>
      fetchAPI(`/users/notifications/${id}/read`, {
        method: "PUT",
      }),
  },
}
