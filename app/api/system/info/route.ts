import { type NextRequest, NextResponse } from "next/server"
import os from "os"
import { version } from "next/package.json"
import logger from "@/lib/logger"

export async function GET(request: NextRequest) {
  try {
    const systemInfo = {
      os: {
        platform: os.platform(),
        release: os.release(),
        type: os.type(),
        arch: os.arch(),
        uptime: os.uptime(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        cpus: os.cpus().length,
      },
      node: {
        version: process.version,
        env: process.env.NODE_ENV,
      },
      next: {
        version,
      },
      app: {
        name: "UGAI",
        version: "1.0.0",
        directusUrl: process.env.NEXT_PUBLIC_DIRECTUS_URL,
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
      },
    }

    return NextResponse.json(systemInfo, { status: 200 })
  } catch (error) {
    logger.error(`System info error: ${error.message}`)

    return NextResponse.json({ error: "Ошибка при получении системной информации" }, { status: 500 })
  }
}
