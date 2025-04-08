/**
 * Клиент для работы с API
 * Централизованная точка для всех запросов к бэкенду
 */

import { toast } from "@/components/ui/use-toast"

// Базовый URL API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// Типы HTTP методов
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

// Опции запроса
interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: any
  credentials?: RequestCredentials
  cache?: RequestCache
}

// Класс ошибки API
export class ApiError extends Error {
  status: number
  data: any

  constructor(message: string, status: number, data?: any) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

/**
 * Выполняет запрос к API
 * @param endpoint - Эндпоинт API (без базового URL)
 * @param options - Опции запроса
 * @returns Результат запроса
 * @throws ApiError в случае ошибки
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  }
  
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const config: RequestInit = {
    method: options.method || "GET",
    headers,
    credentials: options.credentials || "include",
    cache: options.cache || "default",
  }

  // Добавляем тело запроса для не-GET методов
  if (options.body && config.method !== "GET") {
    config.body = JSON.stringify(options.body)
  }

  try {
    const response = await fetch(url, config)

    // Проверяем статус ответа
    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { message: "Неизвестная ошибка сервера" }
      }

      throw new ApiError(errorData.message || `Ошибка ${response.status}`, response.status, errorData)
    }

    // Для 204 No Content возвращаем null
    if (response.status === 204) {
      return null as T
    }

    // Парсим JSON ответ
    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      // Показываем уведомление об ошибке
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      })
      throw error
    }

    // Обрабатываем сетевые ошибки
    const networkError = new ApiError("Ошибка сети. Проверьте подключение к интернету.", 0)

    toast({
      variant: "destructive",
      title: "Ошибка сети",
      description: networkError.message,
    })

    throw networkError
  }
}

/**
 * Хелперы для различных HTTP методов
 */
export const api = {
  get: <T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T>(endpoint: string, data: any, options: Omit<RequestOptions, 'method'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'POST', body: data }),
    
  put: <T>(endpoint: string, data: any, options: Omit<RequestOptions, 'method'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body: data }),

  patch: <T>(endpoint: string, data: any, options: Omit<RequestOptions, 'method'> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body: data }),
    
  delete: <T>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}) => 
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
}