import { type NextRequest, NextResponse } from "next/server"
import { getClient, updateClient, deleteClient } from "@/lib/directus"
import { getMockClient } from "@/lib/mock-data"
import logger from "@/lib/logger"

// GET /api/clients/[id] - Получение клиента по ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // В режиме разработки можно использовать моковые данные
    if (process.env.DEBUG === "True") {
      const client = await getMockClient(id)

      if (!client) {
        return NextResponse.json({ error: "Client not found" }, { status: 404 })
      }

      return NextResponse.json(client)
    }

    // В продакшене используем реальные данные из Directus
    const client = await getClient(id)

    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error) {
    logger.error("Error fetching client", { error, id: params.id })
    return NextResponse.json({ error: "Failed to fetch client" }, { status: 500 })
  }
}

// PATCH /api/clients/[id] - Обновление клиента
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    // Обновление клиента в Directus
    const client = await updateClient(id, body)

    return NextResponse.json(client)
  } catch (error) {
    logger.error("Error updating client", { error, id: params.id })
    return NextResponse.json({ error: "Failed to update client" }, { status: 500 })
  }
}

// DELETE /api/clients/[id] - Удаление клиента
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Удаление клиента в Directus
    await deleteClient(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error("Error deleting client", { error, id: params.id })
    return NextResponse.json({ error: "Failed to delete client" }, { status: 500 })
  }
}
