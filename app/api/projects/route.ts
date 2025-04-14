import { type NextRequest, NextResponse } from "next/server"
import { getProjects, createProject } from "@/lib/directus"
import { getMockProjects } from "@/lib/mock-data"
import logger from "@/lib/logger"

// GET /api/projects - Получение списка проектов
export async function GET(request: NextRequest) {
  try {
    const clientId = request.nextUrl.searchParams.get("clientId")

    // В режиме разработки можно использовать моковые данные
    if (process.env.DEBUG === "True") {
      const projects = await getMockProjects(clientId || undefined)
      return NextResponse.json(projects)
    }

    // В продакшене используем реальные данные из Directus
    const projects = await getProjects(clientId || undefined)
    return NextResponse.json(projects)
  } catch (error) {
    logger.error("Error fetching projects", { error })
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

// POST /api/projects - Создание нового проекта
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Валидация данных
    if (!body.name || !body.client) {
      return NextResponse.json({ error: "Name and client are required" }, { status: 400 })
    }

    // Создание проекта в Directus
    const project = await createProject(body)

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    logger.error("Error creating project", { error })
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
