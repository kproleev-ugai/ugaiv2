import { NextResponse } from "next/server"
import directus from "@/lib/directus"

export async function GET() {
  try {
    // Проверка подключения к Directus
    const serverInfo = await directus.server.info()

    return NextResponse.json({
      success: true,
      message: `Подключено к Directus: ${process.env.NEXT_PUBLIC_DIRECTUS_URL}`,
      url: process.env.NEXT_PUBLIC_DIRECTUS_URL,
      version: serverInfo.project?.project_version || "Unknown",
    })
  } catch (error) {
    console.error("Directus connection error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Ошибка подключения к Directus",
        error: error.message,
        url: process.env.NEXT_PUBLIC_DIRECTUS_URL,
      },
      { status: 500 },
    )
  }
}
