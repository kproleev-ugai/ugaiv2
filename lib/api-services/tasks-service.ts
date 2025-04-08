/**
 * Сервис для работы с задачами
 */

import { api } from "@/lib/api-client"
import type { Task } from "@/types/index"

/**
 * Получает список задач с возможностью фильтрации
 * @param filters - Фильтры для задач
 */
export async function getTasks(filters?: {
  status?: string
  priority?: string
  assignee?: string
  project?: string
}): Promise<Task[]> {
  // Формируем строку запроса из фильтров
  const queryParams = filters
    ? Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&")
    : ""

  const endpoint = queryParams ? `/tasks?${queryParams}` : "/tasks"
  return api.get<Task[]>(endpoint)
}

/**
 * Получает задачу по ID
 * @param id - ID задачи
 */
export async function getTaskById(id: number): Promise<Task> {
  return api.get<Task>(`/tasks/${id}`)
}

/**
 * Создает новую задачу
 * @param task - Данные задачи
 */
export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  return api.post<Task>("/tasks", task)
}

/**
 * Обновляет существующую задачу
 * @param id - ID задачи
 * @param task - Обновленные данные задачи
 */
export async function updateTask(id: number, task: Partial<Task>): Promise<Task> {
  return api.put<Task>(`/tasks/${id}`, task)
}

/**
 * Удаляет задачу
 * @param id - ID задачи
 */
export async function deleteTask(id: number): Promise<void> {
  return api.delete(`/tasks/${id}`)
}

/**
 * Изменяет статус задачи
 * @param id - ID задачи
 * @param status - Новый статус
 */
export async function updateTaskStatus(id: number, status: Task["status"]): Promise<Task> {
  return api.patch<Task>(`/tasks/${id}/status`, { status })
}

/**
 * Изменяет исполнителя задачи
 * @param id - ID задачи
 * @param assigneeId - ID нового исполнителя
 */
export async function updateTaskAssignee(id: number, assigneeId: number): Promise<Task> {
  return api.patch<Task>(`/tasks/${id}/assignee`, { assigneeId })
}

/**
 * Переключает состояние завершенности задачи
 * @param id - ID задачи
 * @param completed - Состояние завершенности
 */
export async function toggleTaskCompletion(id: number, completed: boolean): Promise<Task> {
  return api.patch<Task>(`/tasks/${id}/complete`, { completed })
}

