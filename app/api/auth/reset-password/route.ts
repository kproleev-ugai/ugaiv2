import { type NextRequest, NextResponse } from "next/server"
import { getUserByEmail, hashPassword } from "@/lib/auth"
import { query } from "@/lib/db"
import { sendPasswordResetEmail } from "@/lib/email"
import { sign, verify } from "jsonwebtoken"
import logger from "@/lib/logger"

// Запрос на сброс пароля
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email обязателен" }, { status: 400 })
    }

    // Получение пользователя по email
    const user = await getUserByEmail(email)

    // Даже если пользователь не найден, возвращаем успешный ответ
    // для предотвращения утечки информации
    if (!user) {
      return NextResponse.json(
        { message: "Если указанный email зарегистрирован, на него будет отправлена инструкция по сбросу пароля" },
        { status: 200 },
      )
    }

    // Создание токена для сброса пароля
    const resetToken = sign(
      { sub: user.id, email: user.email, type: "password_reset" },
      process.env.SECRET_KEY || "super-secure-secret-key",
      { expiresIn: "1h" },
    )

    // Отправка письма для сброса пароля
    const resetLink = `${process.env.PUBLIC_DOMAIN}/reset-password?token=${resetToken}`
    await sendPasswordResetEmail(email, user.first_name || email, resetLink)

    logger.info(`Password reset requested for: ${email}`)

    return NextResponse.json(
      { message: "Если указанный email зарегистрирован, на него будет отправлена инструкция по сбросу пароля" },
      { status: 200 },
    )
  } catch (error) {
    logger.error(`Password reset request error: ${error.message}`)

    return NextResponse.json({ error: "Ошибка при запросе сброса пароля" }, { status: 500 })
  }
}

// Установка нового пароля
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password } = body

    if (!token || !password) {
      return NextResponse.json({ error: "Токен и новый пароль обязательны" }, { status: 400 })
    }

    // Проверка токена
    try {
      const payload = verify(token, process.env.SECRET_KEY || "super-secure-secret-key") as any

      if (payload.type !== "password_reset") {
        return NextResponse.json({ error: "Недействительный токен" }, { status: 400 })
      }

      // Хеширование нового пароля
      const hashedPassword = await hashPassword(password)

      // Обновление пароля пользователя
      await query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, payload.sub])

      logger.info(`Password reset completed for user ID: ${payload.sub}`)

      return NextResponse.json({ message: "Пароль успешно изменен" }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: "Недействительный или истекший токен" }, { status: 400 })
    }
  } catch (error) {
    logger.error(`Password reset error: ${error.message}`)

    return NextResponse.json({ error: "Ошибка при сбросе пароля" }, { status: 500 })
  }
}
