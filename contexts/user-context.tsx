"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  role: "master" | "general" | "director" | "manager" | "visitor"
  avatar?: string
  department?: string
  position?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Иван Иванов",
    email: "ivan@example.com",
    role: "manager",
    avatar: "/placeholder.svg?height=40&width=40",
    department: "Маркетинг",
    position: "Маркетолог",
  })
  const [isLoading, setIsLoading] = useState(false)

  return <UserContext.Provider value={{ user, setUser, isLoading }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
