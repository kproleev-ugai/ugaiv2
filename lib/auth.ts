/**
 * Сервис аутентификации
 * Управляет состоянием аутентификации пользователя
 */

import { api } from "@/lib/api-client"
import type { User } from "@/types/index"

// Интерфейс для данных входа
interface LoginCredentials {
  email: string
  password: string
}

// Интерфейс для данных регистрации
interface RegisterData {
  name: string
  email: string
  password: string
}

// Интерфейс для ответа аутентификации
interface AuthResponse {
  user: User
  token: string
}

/**
 * Выполняет вход пользователя
 * @param credentials - Учетные данные пользователя
 * @returns Информация о пользователе и токен
 */
export async function login(credentials: LoginCredentials): Promise<User> {
  try {
    const response = await api.post<AuthResponse>("/auth/login", credentials)

    // Сохраняем токен в localStorage
    localStorage.setItem("auth_token", response.token)

    return response.user
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

/**
 * Регистрирует нового пользователя
 * @param data - Данные для регистрации
 * @returns Информация о пользователе и токен
 */
export async function register(data: RegisterData): Promise<User> {
  try {
    const response = await api.post<AuthResponse>("/auth/register", data)

    // Сохраняем токен в localStorage
    localStorage.setItem("auth_token", response.token)

    return response.user
  } catch (error) {
    console.error("Registration error:", error)
    throw error
  }
}

/**
 * Выполняет выход пользователя
 */
export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout", {})
    localStorage.removeItem("auth_token")
  } catch (error) {
    console.error("Logout error:", error)
    // Даже при ошибке удаляем токен
    localStorage.removeItem("auth_token")
  }
}

/**
 * Получает информацию о текущем пользователе
 * @returns Информация о пользователе
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    // Проверяем наличие токена
    const token = localStorage.getItem("auth_token")
    if (!token) return null

    return await api.get<User>("/auth/me")
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

/**
 * Проверяет, аутентифицирован ли пользователь
 * @returns true, если пользователь аутентифицирован
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

