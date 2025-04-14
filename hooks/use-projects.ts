"use client"

import { useState, useEffect } from "react"
import { directusService } from "@/lib/client-directus-service"
import type { Project } from "@/lib/directus"

export function useProjects(clientId?: string) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)

      const params: any = {
        sort: ["-created_at"],
        fields: ["*", "client.name", "client.logo"],
      }

      // Если указан ID клиента, фильтруем проекты по клиенту
      if (clientId) {
        params.filter = {
          client: {
            _eq: clientId,
          },
        }
      }

      const data = await directusService.getProjects(params)

      setProjects(data)
    } catch (error) {
      console.error("Error fetching projects:", error)
      setError("Не удалось загрузить список проектов")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [clientId])

  const getProject = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const project = await directusService.getProject(id, {
        fields: ["*", "client.*", "tasks.*", "documents.*"],
      })

      return project
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error)
      setError("Не удалось загрузить данные проекта")
      return null
    } finally {
      setLoading(false)
    }
  }

  const createProject = async (data: Partial<Project>) => {
    try {
      setLoading(true)
      setError(null)

      const newProject = await directusService.createProject(data)

      // Обновляем список проектов
      await fetchProjects()

      return newProject
    } catch (error) {
      console.error("Error creating project:", error)
      setError("Не удалось создать проект")
      return null
    } finally {
      setLoading(false)
    }
  }

  const updateProject = async (id: string, data: Partial<Project>) => {
    try {
      setLoading(true)
      setError(null)

      const updatedProject = await directusService.updateProject(id, data)

      // Обновляем список проектов
      await fetchProjects()

      return updatedProject
    } catch (error) {
      console.error(`Error updating project ${id}:`, error)
      setError("Не удалось обновить данные проекта")
      return null
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      await directusService.deleteProject(id)

      // Обновляем список проектов
      await fetchProjects()

      return true
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error)
      setError("Не удалось удалить проект")
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    projects,
    loading,
    error,
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  }
}
