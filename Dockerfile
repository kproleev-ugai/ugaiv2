FROM node:20-alpine

# Установка pnpm
RUN npm install -g pnpm

# Рабочая директория
WORKDIR /app

# Копируем манифесты
COPY package.json pnpm-lock.yaml ./

# Устанавливаем зависимости
RUN pnpm install

# Копируем весь проект (включая frontend)
COPY . .

# Открываем порт
EXPOSE 3000

# Запуск dev-сервера
CMD ["pnpm", "dev"]