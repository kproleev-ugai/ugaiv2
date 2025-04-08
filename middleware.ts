import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Пути, которые не требуют аутентификации
const publicPaths = ["/login", "/register"]

/**
 * Middleware для проверки аутентификации
 * Отключено перенаправление для неаутентифицированных пользователей
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Проверяем, является ли путь публичным
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  // Если путь публичный, не проверяем аутентификацию
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Для всех других путей просто пропускаем, не проверяя аутентификацию
  return NextResponse.next()
}

// Указываем пути, для которых должно применяться middleware
export const config = {
  matcher: [
    /*
     * Исключаем из проверки:
     * - Файлы API (они имеют свою проверку аутентификации)
     * - Статические файлы (изображения, шрифты и т.д.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}