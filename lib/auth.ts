import { sign, verify } from "jsonwebtoken"
import { hash, compare } from "bcrypt"
import { query } from "./db"

// Интерфейс для пользователя
interface User {
  id: string
  email: string
  role: string
  first_name?: string
  last_name?: string
}

// Интерфейс для JWT payload
interface JwtPayload {
  sub: string
  email: string
  role: string
  iat: number
  exp: number
}

// Создание JWT токена
export function createToken(user: User): string {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  }

  return sign(payload, process.env.SECRET_KEY || "super-secure-secret-key", {
    expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 60}m`,
    algorithm: (process.env.ALGORITHM as any) || "HS256",
  })
}

// Проверка JWT токена
export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const decoded = verify(token, process.env.SECRET_KEY || "super-secure-secret-key", {
      algorithms: [(process.env.ALGORITHM as any) || "HS256"],
    }) as JwtPayload

    return decoded
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

// Хеширование пароля
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 10)
}

// Проверка пароля
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword)
}

// Получение пользователя по email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await query("SELECT id, email, password, role, first_name, last_name FROM users WHERE email = $1", [
      email,
    ])

    if (result.rows.length === 0) {
      return null
    }

    return result.rows[0]
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

// Получение пользователя по ID
export async function getUserById(id: string): Promise<User | null> {
  try {
    const result = await query("SELECT id, email, role, first_name, last_name FROM users WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return null
    }

    return result.rows[0]
  } catch (error) {
    console.error("Error getting user by ID:", error)
    return null
  }
}

// Проверка прав доступа
export function checkPermission(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole)
}
