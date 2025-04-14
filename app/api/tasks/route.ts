import { type NextRequest, NextResponse } from "next/server"
import { getTasks, createTask } from "@/lib/directus"
import { getMockTasks } from "@/lib/mock-data"
import logger from "@/lib/logger"

// GET /api/tasks - Получение списка задач
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")
    const projectId = request.nextUrl.searchParams.get("projectId")

    // В режиме разработки можно использовать моковые данные
    if (process.env.DEBUG === "True") {
      const tasks = await getMockTasks(userId || undefined, projectId || undefined)
      return NextResponse.json(tasks)
    }

    // В продакшене используем реальные данные из Directus
    const tasks = await getTasks(userId || undefined, projectId || undefined)
    return NextResponse.json(tasks)
  } catch (error) {
    logger.error("Error fetching tasks", { error })
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

// POST /api/tasks - Создание новой задачи
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Валидация данных
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    // Создание задачи в Directus
    const task = await createTask(body)

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    logger.error("Error creating task", { error })
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
