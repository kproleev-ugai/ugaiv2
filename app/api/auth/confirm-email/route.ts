import { type NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { query } from "@/lib/db"
import logger from "@/lib/logger"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json({ error: "Токен обязателен" }, { status: 400 })
    }

    // Проверка токена
    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.json({ error: "Недействительный или истекший токен" }, { status: 400 })
    }

    // Обновление статуса email в базе данных
    await query("UPDATE users SET email_verified = true WHERE id = $1", [payload.sub])

    logger.info(`Email confirmed for user ID: ${payload.sub}`)

    return NextResponse.json({ message: "Email успешно подтвержден" }, { status: 200 })
  } catch (error) {
    logger.error(`Email confirmation error: ${error.message}`)

    return NextResponse.json({ error: "Ошибка при подтверждении email" }, { status: 500 })
  }
}
