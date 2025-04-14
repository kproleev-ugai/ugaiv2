import NodeCache from "node-cache"

// Создание экземпляра кэша
const cache = new NodeCache({
  stdTTL: Number.parseInt(process.env.CACHE_TIMEOUT || "300", 10), // Время жизни кэша в секундах
  checkperiod: 120, // Период проверки истекших ключей в секундах
})

// Получение данных из кэша
export function get<T>(key: string): T | undefined {
  return cache.get<T>(key)
}

// Сохранение данных в кэш
export function set<T>(key: string, value: T, ttl?: number): boolean {
  return cache.set<T>(key, value, ttl)
}

// Удаление данных из кэша
export function del(key: string | string[]): number {
  return cache.del(key)
}

// Очистка всего кэша
export function flush(): void {
  cache.flushAll()
}

// Получение статистики кэша
export function stats() {
  return cache.getStats()
}

// Middleware для кэширования API ответов
export function cacheMiddleware(ttl?: number) {
  return (req: any, res: any, next: any) => {
    const key = `__express__${req.originalUrl || req.url}`
    const cachedBody = get<any>(key)

    if (cachedBody) {
      res.send(cachedBody)
      return
    }

    const originalSend = res.send

    res.send = function (body: any) {
      if (res.statusCode === 200) {
        set(key, body, ttl)
      }
      originalSend.call(this, body)
    }

    next()
  }
}

export default cache
