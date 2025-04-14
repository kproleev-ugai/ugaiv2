"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { getClients } from "@/lib/directus-service"
import type { Client } from "@/lib/directus"

// Интерфейс контекста
interface ClientContextType {
  currentClient: Client | null
  setCurrentClient: (client: Client | null) => void
  availableClients: Client[]
  loading: boolean
  error: string | null
}

// Создаем контекст
const ClientContext = createContext<ClientContextType | undefined>(undefined)

// Провайдер контекста
export function ClientProvider({ children }: { children: ReactNode }) {
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const [availableClients, setAvailableClients] = useState<Client[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  // Загрузка списка клиентов
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        const response = await getClients()
        setAvailableClients(response.data || [])
      } catch (error) {
        console.error("Error fetching clients:", error)
        setError("Ошибка при загрузке списка клиентов")
        // Используем моковые данные в случае ошибки
        setAvailableClients([
          { id: "itstep", name: "ITStep", logo: "/logos/itstep.svg" },
          { id: "acme", name: "Acme Inc", logo: "/logos/acme.svg" },
          { id: "globex", name: "Globex", logo: "/logos/globex.svg" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  // Определяем клиента из URL при изменении пути
  useEffect(() => {
    if (pathname && availableClients.length > 0) {
      const pathParts = pathname.split("/").filter(Boolean)
      if (pathParts.length > 0) {
        const clientId = pathParts[0]
        const client = availableClients.find((c) => c.id === clientId)
        if (client) {
          setCurrentClient(client)
        }
      }
    }
  }, [pathname, availableClients])

  return (
    <ClientContext.Provider
      value={{
        currentClient,
        setCurrentClient,
        availableClients,
        loading,
        error,
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

// Хук для использования контекста
export function useClient() {
  const context = useContext(ClientContext)
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider")
  }
  return context
}
