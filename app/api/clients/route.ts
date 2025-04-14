import { type NextRequest, NextResponse } from "next/server"
import { getClients, createClient } from "@/lib/directus"
import { getMockClients } from "@/lib/mock-data"
import logger from "@/lib/logger"

// GET /api/clients - Получение списка клиентов
export async function GET(request: NextRequest) {
  try {
    // В режиме разработки можно использовать моковые данные
    if (process.env.DEBUG === "True") {
      const clients = await getMockClients()
      return NextResponse.json(clients)
    }

    // В продакшене используем реальные данные из Directus
    const clients = await getClients()
    return NextResponse.json(clients)
  } catch (error) {
    logger.error("Error fetching clients", { error })
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}

// POST /api/clients - Создание нового клиента
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Валидация данных
    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    // Создание клиента в Directus
    const client = await createClient(body)

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    logger.error("Error creating client", { error })
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
  }
}
