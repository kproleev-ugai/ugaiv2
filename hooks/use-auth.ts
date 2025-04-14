"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { useRouter } from "next/navigation"

// Тип для пользователя
export interface AuthUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: string
}

// Интерфейс для контекста аутентификации
interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

// Создание контекста
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Хук для использования контекста аутентификации
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Провайдер аутентификации
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Проверка аутентификации при загрузке
  useEffect(() => {
    checkAuth()
  }, [])

  // Функция для проверки аутентификации
  const checkAuth = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/auth/me")

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check error:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // Функция для входа
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        return true
      } else {
        setError(data.error || "Ошибка при входе")
        return false
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Ошибка при входе")
      return false
    } finally {
      setLoading(false)
    }
  }

  // Функция для выхода
  const logout = async () => {
    try {
      setLoading(true)

      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        setUser(null)
        router.push("/login")
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Значение контекста
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
