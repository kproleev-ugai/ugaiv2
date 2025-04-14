import { type NextRequest, NextResponse } from "next/server"
import { getReports, createReport } from "@/lib/directus"
import { getMockReports } from "@/lib/mock-data"
import logger from "@/lib/logger"

// GET /api/reports - Получение списка отчетов
export async function GET(request: NextRequest) {
  try {
    const projectId = request.nextUrl.searchParams.get("projectId")

    // В режиме разработки можно использовать моковые данные
    if (process.env.DEBUG === "True") {
      const reports = await getMockReports(projectId || undefined)
      return NextResponse.json(reports)
    }

    // В продакшене используем реальные данные из Directus
    const reports = await getReports(projectId || undefined)
    return NextResponse.json(reports)
  } catch (error) {
    logger.error("Error fetching reports", { error })
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 })
  }
}

// POST /api/reports - Создание нового отчета
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Валидация данных
    if (!body.title || !body.content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Создание отчета в Directus
    const report = await createReport(body)

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    logger.error("Error creating report", { error })
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 })
  }
}
