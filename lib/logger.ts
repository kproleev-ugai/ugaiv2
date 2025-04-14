import { createLogger, format, transports } from "winston"

// Определение уровней логирования
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// Определение цветов для уровней логирования
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
}

// Определение формата логирования
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  format.colorize({ all: true }),
  format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
)

// Создание логгера
const logger = createLogger({
  level: process.env.LOG_LEVEL?.toLowerCase() || "info",
  levels,
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({ filename: "logs/all.log" }),
  ],
})

// Добавление цветов
format.colorize().addColors(colors)

// Логирование в режиме разработки
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  )
}

// Функция для логирования HTTP запросов
export function logHttpRequest(req: any, res: any, next: any) {
  logger.http(`${req.method} ${req.url}`)
  next()
}

export default logger
