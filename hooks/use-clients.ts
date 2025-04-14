"use client"

import { useState, useEffect } from "react"
import { directusService } from "@/lib/client-directus-service"
import type { Client } from "@/lib/directus"

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClients = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await directusService.getClients({
        sort: ["name"],
        filter: {
          status: {
            _eq: "active",
          },
        },
      })

      setClients(data)
    } catch (error) {
      console.error("Error fetching clients:", error)
      setError("Не удалось загрузить список клиентов")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  const getClient = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const client = await directusService.getClient(id, {
        fields: ["*", "projects.*"],
      })

      return client
    } catch (error) {
      console.error(`Error fetching client ${id}:`, error)
      setError("Не удалось загрузить данные клиента")
      return null
    } finally {
      setLoading(false)
    }
  }

  const createClient = async (data: Partial<Client>) => {
    try {
      setLoading(true)
      setError(null)

      const newClient = await directusService.createClient(data)

      // Обновляем список клиентов
      await fetchClients()

      return newClient
    } catch (error) {
      console.error("Error creating client:", error)
      setError("Не удалось создать клиента")
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateClient = async (id: string, data: Partial<Client>) => {
    try {
      setLoading(true)
      setError(null)

      const updatedClient = await directusService.updateClient(id, data)

      // Обновляем список клиентов
      await fetchClients()

      return updatedClient
    } catch (error) {
      console.error(`Error updating client ${id}:`, error)
      setError("Не удалось обновить данные клиента")
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteClient = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      await directusService.deleteClient(id)

      // Обновляем список клиентов
      await fetchClients()

      return true
    } catch (error) {
      console.error(`Error deleting client ${id}:`, error)
      setError("Не удалось удалить клиента")
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    clients,
    loading,
    error,
    fetchClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
  }
}
