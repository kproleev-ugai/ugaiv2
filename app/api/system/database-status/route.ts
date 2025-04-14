import { NextResponse } from "next/server"
import { testConnection } from "@/lib/db"

export async function GET() {
  try {
    const result = await testConnection()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Подключено к базе данных: ${result.database}`,
        timestamp: result.timestamp,
        database: result.database,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Ошибка подключения к базе данных",
          error: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Database status check error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Ошибка при проверке статуса базы данных",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
