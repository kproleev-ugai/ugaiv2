import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import { redirect } from "next/navigation"
import directus from "./directus"
import type { User } from "./directus"

// Константы для аутентификации
const TOKEN_NAME = "ugai_auth_token"
const SECRET = new TextEncoder().encode(process.env.SECRET_KEY || "supersecret123")
const EXPIRATION = process.env.ACCESS_TOKEN_EXPIRE_MINUTES
  ? Number.parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES) * 60
  : 3600 // 1 час по умолчанию

// Интерфейс для данных пользователя в токене
export interface TokenData {
  id: string
  email: string
  role: string
  exp?: number
}

/**
 * Создание JWT токена
 */
export async function createToken(data: TokenData): Promise<string> {
  const token = await new SignJWT({ ...data })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRATION}s`)
    .sign(SECRET)

  return token
}

/**
 * Проверка JWT токена
 */
export async function verifyToken(token: string): Promise<TokenData | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload as TokenData
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

/**
 * Получение текущего пользователя из токена в cookies
 */
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies()
  const token = cookieStore.get(TOKEN_NAME)?.value

  if (!token) {
    return null
  }

  const tokenData = await verifyToken(token)
  if (!tokenData) {
    return null
  }

  try {
    // Получение данных пользователя из Directus
    const user = await directus.users.readOne(tokenData.id)
    return user
  } catch (error) {
    console.error("Error fetching user from Directus:", error)
    return null
  }
}

/**
 * Аутентификация пользователя через Directus
 */
export async function authenticateUser(email: string, password: string) {
  try {
    // Аутентификация через Directus
    const auth = await directus.auth.login({ email, password })

    // Получение данных пользователя
    const user = await directus.users.me.read()

    // Создание JWT токена
    const tokenData: TokenData = {
      id: user.id,
      email: user.email,
      role: user.role,
    }

    const token = await createToken(tokenData)

    // Установка cookie
    cookies().set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: EXPIRATION,
      path: "/",
    })

    return { success: true, user }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Выход пользователя (удаление токена)
 */
export async function logoutUser() {
  try {
    // Выход из Directus
    await directus.auth.logout()

    // Удаление cookie
    cookies().delete(TOKEN_NAME)

    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Middleware для защиты маршрутов
 */
export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

/**
 * Проверка роли пользователя
 */
export async function requireRole(allowedRoles: string[]) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  if (!allowedRoles.includes(user.role)) {
    redirect("/unauthorized")
  }

  return user
}
