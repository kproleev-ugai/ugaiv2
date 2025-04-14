import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth-service"

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (user) {
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          avatarUrl: user.avatar ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${user.avatar}` : null,
        },
      })
    } else {
      return NextResponse.json({ success: false, error: "Пользователь не аутентифицирован" }, { status: 401 })
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return NextResponse.json({ success: false, error: "Ошибка при получении данных пользователя" }, { status: 500 })
  }
}
