import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth-service"

// Маршруты, которые не требуют аутентификации
const publicRoutes = [
  "/login",
  "/register",
  "/reset-password",
  "/confirm-email",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/reset-password",
  "/api/system/info",
  "/api/system/directus-status",
  "/api/system/database-status",
]

// Проверка, является ли маршрут публичным
function isPublicRoute(path: string): boolean {
  return publicRoutes.some((route) => path.startsWith(route))
}

// Проверка, является ли маршрут API
function isApiRoute(path: string): boolean {
  return path.startsWith("/api/")
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Пропускаем публичные маршруты
  if (isPublicRoute(path)) {
    return NextResponse.next()
  }

  // Получаем токен из cookies
  const token = request.cookies.get("ugai_auth_token")?.value

  // Если токена нет, перенаправляем на страницу входа
  if (!token) {
    // Для API маршрутов возвращаем ошибку 401
    if (isApiRoute(path)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Для остальных маршрутов перенаправляем на страницу входа
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(loginUrl)
  }

  // Проверяем токен
  const tokenData = await verifyToken(token)

  // Если токен недействителен, перенаправляем на страницу входа
  if (!tokenData) {
    // Для API маршрутов возвращаем ошибку 401
    if (isApiRoute(path)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Для остальных маршрутов перенаправляем на страницу входа
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(loginUrl)
  }

  // Токен действителен, пропускаем запрос
  return NextResponse.next()
}

// Указываем, для каких маршрутов применять middleware
export const config = {
  matcher: [
    // Защищаем все маршруты, кроме статических файлов
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
