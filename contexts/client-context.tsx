"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

// Типы для клиента
interface Client {
  id: string
  name: string
  logo?: string
}

// Интерфейс контекста
interface ClientContextType {
  currentClient: Client | null
  setCurrentClient: (client: Client | null) => void
  availableClients: Client[]
}

// Создаем контекст
const ClientContext = createContext<ClientContextType | undefined>(undefined)

// Моковые данные клиентов
const mockClients: Client[] = [
  { id: "itstep", name: "ITStep", logo: "/logos/itstep.svg" },
  { id: "acme", name: "Acme Inc", logo: "/logos/acme.svg" },
  { id: "globex", name: "Globex", logo: "/logos/globex.svg" },
]

// Провайдер контекста
export function ClientProvider({ children }: { children: ReactNode }) {
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const pathname = usePathname()

  // Определяем клиента из URL при изменении пути
  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split("/").filter(Boolean)
      if (pathParts.length > 0) {
        const clientId = pathParts[0]
        const client = mockClients.find((c) => c.id === clientId)
        if (client) {
          setCurrentClient(client)
        }
      }
    }
  }, [pathname])

  return (
    <ClientContext.Provider
      value={{
        currentClient,
        setCurrentClient,
        availableClients: mockClients,
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

export const availableClients = mockClients
