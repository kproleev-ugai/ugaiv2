import { type NextRequest, NextResponse } from "next/server"
import { getKPIs, createKPI } from "@/lib/directus"
import { getMockKPIs } from "@/lib/mock-data"
import logger from "@/lib/logger"

// GET /api/kpis - Получение списка KPI
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // В режиме разработки можно использовать моковые данные
    if (process.env.DEBUG === "True") {
      const kpis = await getMockKPIs(userId)
      return NextResponse.json(kpis)
    }

    // В продакшене используем реальные данные из Directus
    const kpis = await getKPIs(userId)
    return NextResponse.json(kpis)
  } catch (error) {
    logger.error("Error fetching KPIs", { error })
    return NextResponse.json({ error: "Failed to fetch KPIs" }, { status: 500 })
  }
}

// POST /api/kpis - Создание нового KPI
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Валидация данных
    if (!body.name || !body.target || !body.user) {
      return NextResponse.json({ error: "Name, target and user are required" }, { status: 400 })
    }

    // Создание KPI в Directus
    const kpi = await createKPI(body)

    return NextResponse.json(kpi, { status: 201 })
  } catch (error) {
    logger.error("Error creating KPI", { error })
    return NextResponse.json({ error: "Failed to create KPI" }, { status: 500 })
  }
}
