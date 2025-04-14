import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser } from "@/lib/auth-service"
import { z } from "zod"

// Схема валидации для входящих данных
const loginSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email",
  }),
  password: z.string().min(8, {
    message: "Пароль должен содержать не менее 8 символов",
  }),
})

export async function POST(request: NextRequest) {
  try {
    // Получение данных из запроса
    const body = await request.json()

    // Валидация данных
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Ошибка валидации", details: result.error.format() },
        { status: 400 },
      )
    }

    const { email, password } = result.data

    // Аутентификация пользователя
    const authResult = await authenticateUser(email, password)

    if (authResult.success) {
      return NextResponse.json({
        success: true,
        user: {
          id: authResult.user.id,
          email: authResult.user.email,
          firstName: authResult.user.first_name,
          lastName: authResult.user.last_name,
          role: authResult.user.role,
        },
      })
    } else {
      return NextResponse.json({ success: false, error: "Неверный email или пароль" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Ошибка при входе в систему" }, { status: 500 })
  }
}
