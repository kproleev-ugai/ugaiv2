import { type NextRequest, NextResponse } from "next/server"
import { logoutUser } from "@/lib/auth-service"

export async function POST(request: NextRequest) {
  try {
    const result = await logoutUser()

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, error: "Ошибка при выходе из системы" }, { status: 500 })
  }
}
