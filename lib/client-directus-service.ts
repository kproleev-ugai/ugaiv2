"use client"

import {
  createDirectus,
  rest,
  authentication,
  readItems,
  readItem,
  createItem,
  updateItem,
  deleteItem,
} from "@directus/sdk"
import type { Client, Project, Task, Report, KPI, Analytics, Notification, CalendarEvent, Document } from "./directus"

// Типы коллекций для Directus
interface DirectusCollections {
  clients: Client
  projects: Project
  tasks: Task
  reports: Report
  kpis: KPI
  analytics: Analytics
  notifications: Notification
  calendar_events: CalendarEvent
  documents: Document
}

// Создание клиента Directus
const directus = createDirectus<DirectusCollections>(process.env.NEXT_PUBLIC_DIRECTUS_URL || "")
  .with(rest())
  .with(authentication())

// Сервис для работы с Directus API
export const directusService = {
  // Аутентификация
  async login(email: string, password: string) {
    return await directus.login(email, password)
  },

  async logout() {
    return await directus.logout()
  },

  async refreshToken() {
    return await directus.refresh()
  },

  // Клиенты
  async getClients(params = {}) {
    return await directus.request(readItems("clients", params))
  },

  async getClient(id: string, params = {}) {
    return await directus.request(readItem("clients", id, params))
  },

  async createClient(data: Partial<Client>) {
    return await directus.request(createItem("clients", data))
  },

  async updateClient(id: string, data: Partial<Client>) {
    return await directus.request(updateItem("clients", id, data))
  },

  async deleteClient(id: string) {
    return await directus.request(deleteItem("clients", id))
  },

  // Проекты
  async getProjects(params = {}) {
    return await directus.request(readItems("projects", params))
  },

  async getProject(id: string, params = {}) {
    return await directus.request(readItem("projects", id, params))
  },

  async createProject(data: Partial<Project>) {
    return await directus.request(createItem("projects", data))
  },

  async updateProject(id: string, data: Partial<Project>) {
    return await directus.request(updateItem("projects", id, data))
  },

  async deleteProject(id: string) {
    return await directus.request(deleteItem("projects", id))
  },

  // Задачи
  async getTasks(params = {}) {
    return await directus.request(readItems("tasks", params))
  },

  async getTask(id: string, params = {}) {
    return await directus.request(readItem("tasks", id, params))
  },

  async createTask(data: Partial<Task>) {
    return await directus.request(createItem("tasks", data))
  },

  async updateTask(id: string, data: Partial<Task>) {
    return await directus.request(updateItem("tasks", id, data))
  },

  async deleteTask(id: string) {
    return await directus.request(deleteItem("tasks", id))
  },

  // Отчеты
  async getReports(params = {}) {
    return await directus.request(readItems("reports", params))
  },

  async getReport(id: string, params = {}) {
    return await directus.request(readItem("reports", id, params))
  },

  async createReport(data: Partial<Report>) {
    return await directus.request(createItem("reports", data))
  },

  async updateReport(id: string, data: Partial<Report>) {
    return await directus.request(updateItem("reports", id, data))
  },

  async deleteReport(id: string) {
    return await directus.request(deleteItem("reports", id))
  },

  // KPI
  async getKPIs(params = {}) {
    return await directus.request(readItems("kpis", params))
  },

  async getKPI(id: string, params = {}) {
    return await directus.request(readItem("kpis", id, params))
  },

  async createKPI(data: Partial<KPI>) {
    return await directus.request(createItem("kpis", data))
  },

  async updateKPI(id: string, data: Partial<KPI>) {
    return await directus.request(updateItem("kpis", id, data))
  },

  async deleteKPI(id: string) {
    return await directus.request(deleteItem("kpis", id))
  },

  // Аналитика
  async getAnalytics(params = {}) {
    return await directus.request(readItems("analytics", params))
  },

  async getAnalytic(id: string, params = {}) {
    return await directus.request(readItem("analytics", id, params))
  },

  // Уведомления
  async getNotifications(params = {}) {
    return await directus.request(readItems("notifications", params))
  },

  async markNotificationAsRead(id: string) {
    return await directus.request(updateItem("notifications", id, { read: true }))
  },

  // События календаря
  async getCalendarEvents(params = {}) {
    return await directus.request(readItems("calendar_events", params))
  },

  async getCalendarEvent(id: string, params = {}) {
    return await directus.request(readItem("calendar_events", id, params))
  },

  async createCalendarEvent(data: Partial<CalendarEvent>) {
    return await directus.request(createItem("calendar_events", data))
  },

  async updateCalendarEvent(id: string, data: Partial<CalendarEvent>) {
    return await directus.request(updateItem("calendar_events", id, data))
  },

  async deleteCalendarEvent(id: string) {
    return await directus.request(deleteItem("calendar_events", id))
  },

  // Документы
  async getDocuments(params = {}) {
    return await directus.request(readItems("documents", params))
  },

  async getDocument(id: string, params = {}) {
    return await directus.request(readItem("documents", id, params))
  },

  async createDocument(data: Partial<Document>) {
    return await directus.request(createItem("documents", data))
  },

  async updateDocument(id: string, data: Partial<Document>) {
    return await directus.request(updateItem("documents", id, data))
  },

  async deleteDocument(id: string) {
    return await directus.request(deleteItem("documents", id))
  },
}
