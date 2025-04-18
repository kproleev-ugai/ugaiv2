# 🚀 UGAI Platform — Unified Growth & AI Infrastructure

UGAI — это интеллектуальная B2B-платформа нового поколения для управления стратегией, метриками, командами, задачами и аналитикой с использованием AI.

---

## 🌐 Основные разделы платформы

- `/dashboard` — Дашборд компании с KPI и AI-инсайтами
- `/okr` — Управление целями и ключевыми результатами (OKR)
- `/kpi` — Ключевые показатели эффективности
- `/tasks` — Управление задачами (канбан, календарь)
- `/projects` — Модуль проектного управления
- `/teams` — Командная структура и эффективность
- `/analytics` — Визуализация аналитики и отчётов


- `/ai` — AI-ассистент, сценарии, прогнозы
- `/profile` — Личный кабинет
- `/settings` — Системные и пользовательские настройки

---

## 🧱 Основные UI-компоненты

### Навигация и layout

- `sidebar.tsx` — Боковое меню
- `topbar.tsx` — Верхняя панель
- `breadcrumb.tsx` — Навигация по страницам
- `AIPanel.tsx` — Блок AI-ассистента

### Базовые UI (shadcn/ui)

- `card.tsx`, `button.tsx`, `input.tsx`, `select.tsx`, `tabs.tsx`, `form.tsx`, `modal.tsx`, `calendar.tsx` и др.

### Специальные компоненты

- `MetricCard.tsx`, `ChartBlock.tsx`, `FilterBar.tsx`, `ai-badge.tsx`
- `TaskKanban.tsx`, `TreeBlock.tsx`, `DrawerForm.tsx`, `PreviewPanel.tsx`

---

## 📦 Структура проекта

```
ugai/
├── app/                 # App Router страницы
│   └── [dashboard, okr, kpi, tasks, analytics, ai, profile]
├── components/
│   ├── ui/              # shadcn + кастомные элементы
│   ├── analytics/       # Компоненты аналитики
│   ├── okr/             # OKR дерево, карточки целей
│   ├── kpi/             # Таблицы и графики KPI
│   ├── tasks/           # Канбан, календарь задач
│   ├── projects/        # Карточки проектов
│   ├── teams/           # Командные карточки
│   ├── ai/              # AI-интерфейс
│   ├── profile/         # Настройки профиля
│   └── shared/          # Общее: топбар, сайдбар, хлебные крошки
├── lib/
│   ├── cn.ts            # Классы
│   ├── api.ts           # Фетчеры
│   ├── ai.ts            # AI-запросы
│   └── validation-schemas.ts
├── store/
│   └── use-app-store.ts # Zustand состояние
├── types/               # Типы KPI, OKR, Users
├── styles/              # Tailwind + gradient-border, glass-card
└── public/
```

---

## 🧪 Формы и модальные окна

- `create-objective-form.tsx`, `create-kpi-form.tsx`, `create-task-form.tsx`, `create-project-form.tsx`
- `create-*-modal.tsx` — модальные окна создания

---

## 📈 Визуализация и графики

- `kpi-radar-chart.tsx`, `project-status-chart.tsx`, `team-performance-chart.tsx`
- `okr-kpi-correlation.tsx`, `performance-heatmap.tsx`

---

## ⚙️ Основные технологии

- **Next.js 14+, App Router**
- **TypeScript 5.3+**
- **Tailwind CSS 3.4+** (custom config with glow, gradients)
- **shadcn/ui**
- **Zustand 4.5+** — state
- **React Hook Form 7.50+** + **Zod 3.22+**
- **Recharts / Nivo / React Flow**
- **Framer Motion 10+**

---

## 📘 Документация

- `/docs` — Swagger API (если подключён backend)
- `/wiki` — Бизнес-логика, UI-гайд, структура, роли
- `tailwind.config.ts` — кастомизация цветов, эффектов, gradient-text

---

## 🛠 Разработка

```bash
pnpm install
pnpm dev
```

### Команды

- `pnpm build` — сборка проекта
- `pnpm lint` — проверка кода
- `pnpm start` — запуск production-сборки

---

## 🛡 Лицензия

© 2024–2025 UGAI Platform. Все права защищены. Лицензия предоставляется по запросу.
