import { type NextRequest, NextResponse } from "next/server"
import { hashPassword, createToken } from "@/lib/auth"
import { query } from "@/lib/db"
import { sendRegistrationEmail } from "@/lib/email"
import logger from "@/lib/logger"
import { z } from "zod"

// Схема для валидации данных регистрации
const registerSchema = z
  .object({
    email: z.string().email({ message: "Неверный email" }),
    password: z.string().min(8, { message: "Пароль должен содержать не менее 8 символов" }),
    confirmPassword: z.string(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Валидация данных с использованием Zod
    const result = registerSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Ошибка валидации", details: result.error.format() },
        { status: 400 },
      )
    }

    const { email, password, first_name, last_name } = result.data

    // Проверка наличия обязательных полей
    if (!email || !password) {
      return NextResponse.json({ error: "Email и пароль обязательны" }, { status: 400 })
    }

    // Проверка, существует ли пользователь с таким email
    const existingUser = await query("SELECT id FROM users WHERE email = $1", [email])

    if (existingUser.rows.length > 0) {
      return NextResponse.json({ error: "Пользователь с таким email уже существует" }, { status: 409 })
    }

    // Хеширование пароля
    const hashedPassword = await hashPassword(password)

    // Создание пользователя
    const dbResult = await query(
      "INSERT INTO users (email, password, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, role, first_name, last_name",
      [email, hashedPassword, first_name, last_name, "user"],
    )

    const newUser = dbResult.rows[0]

    // Создание токена
    const token = createToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
    })

    // Отправка письма для подтверждения регистрации
    const confirmationLink = `${process.env.PUBLIC_DOMAIN}/confirm-email?token=${token}`
    await sendRegistrationEmail(email, first_name || email, confirmationLink)

    // Создание ответа с токеном в cookie
    const response = NextResponse.json(
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      },
      { status: 201 },
    )

    // Установка cookie с токеном
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * Number.parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES || "60", 10), // в секундах
    })

    logger.info(`User registered: ${newUser.email}`)

    return response
  } catch (error) {
    logger.error(`Registration error: ${error.message}`)

    return NextResponse.json({ error: "Ошибка при регистрации" }, { status: 500 })
  }
}
