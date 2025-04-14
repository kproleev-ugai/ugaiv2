import { Pool } from "pg"

// Создание пула соединений с базой данных
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number.parseInt(process.env.POSTGRES_PORT || "5432"),
  database: process.env.POSTGRES_DB,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Проверка соединения с базой данных
export async function testConnection() {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT NOW()")
    client.release()
    return { success: true, timestamp: result.rows[0].now, database: process.env.POSTGRES_DB }
  } catch (error) {
    console.error("Database connection error:", error)
    return { success: false, error: error.message }
  }
}

// Выполнение SQL запроса
export async function query(text: string, params?: any[]) {
  try {
    const start = Date.now()
    const result = await pool.query(text, params)
    const duration = Date.now() - start

    if (process.env.DEBUG === "True") {
      console.log("Executed query", { text, duration, rows: result.rowCount })
    }

    return result
  } catch (error) {
    console.error("Query error:", error)
    throw error
  }
}

// Получение одной записи
export async function getOne(text: string, params?: any[]) {
  const result = await query(text, params)
  return result.rows[0]
}

// Получение нескольких записей
export async function getMany(text: string, params?: any[]) {
  const result = await query(text, params)
  return result.rows
}

// Транзакция
export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

// Закрытие пула соединений
export async function closePool() {
  await pool.end()
}

// Экспорт пула для прямого использования
export { pool }
