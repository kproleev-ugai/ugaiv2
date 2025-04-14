import type { User, Client, Project, Task, Report, KPI } from "./directus"

// Примеры пользователей
export const mockUsers: User[] = [
  {
    id: "1",
    first_name: "Иван",
    last_name: "Иванов",
    email: "ivan@ugai.tech",
    role: "admin",
    avatar: "https://cms.ugai.tech/assets/avatars/ivan.jpg",
  },
  {
    id: "2",
    first_name: "Мария",
    last_name: "Петрова",
    email: "maria@ugai.tech",
    role: "manager",
    avatar: "https://cms.ugai.tech/assets/avatars/maria.jpg",
  },
  {
    id: "3",
    first_name: "Алексей",
    last_name: "Сидоров",
    email: "alexey@ugai.tech",
    role: "analyst",
    avatar: "https://cms.ugai.tech/assets/avatars/alexey.jpg",
  },
]

// Примеры клиентов
export const mockClients: Client[] = [
  {
    id: "1",
    name: 'ООО "Технологии будущего"',
    logo: "https://cms.ugai.tech/assets/logos/tech-future.png",
    description: "Компания, специализирующаяся на разработке инновационных технологий",
  },
  {
    id: "2",
    name: 'АО "ФинансГрупп"',
    logo: "https://cms.ugai.tech/assets/logos/fingroup.png",
    description: "Финансовая компания, предоставляющая широкий спектр услуг",
  },
  {
    id: "3",
    name: "ИП Смирнов",
    logo: "https://cms.ugai.tech/assets/logos/smirnov.png",
    description: "Индивидуальный предприниматель в сфере розничной торговли",
  },
]

// Примеры проектов
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Разработка CRM системы",
    client: "1",
    description: "Разработка и внедрение CRM системы для автоматизации процессов продаж",
    status: "active",
  },
  {
    id: "2",
    name: "Финансовый анализ",
    client: "2",
    description: "Проведение финансового анализа и оптимизация расходов",
    status: "completed",
  },
  {
    id: "3",
    name: "Маркетинговая стратегия",
    client: "3",
    description: "Разработка маркетинговой стратегии для выхода на новые рынки",
    status: "on_hold",
  },
]

// Примеры задач
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Анализ требований",
    description: "Провести анализ требований к CRM системе",
    due_date: "2025-05-15",
    status: "completed",
    project: "1",
    assigned_to: "1",
  },
  {
    id: "2",
    title: "Разработка прототипа",
    description: "Разработать прототип интерфейса CRM системы",
    due_date: "2025-05-30",
    status: "in_progress",
    project: "1",
    assigned_to: "3",
  },
  {
    id: "3",
    title: "Финансовый отчет",
    description: "Подготовить финансовый отчет за первый квартал",
    due_date: "2025-04-20",
    status: "todo",
    project: "2",
    assigned_to: "2",
  },
]

// Примеры отчетов
export const mockReports: Report[] = [
  {
    id: "1",
    title: "Отчет по анализу требований",
    content: "Содержание отчета по анализу требований к CRM системе...",
    created_at: "2025-04-10T10:00:00Z",
    project: "1",
    created_by: "1",
  },
  {
    id: "2",
    title: "Финансовый отчет за Q1 2025",
    content: "Содержание финансового отчета за первый квартал 2025 года...",
    created_at: "2025-04-15T14:30:00Z",
    project: "2",
    created_by: "2",
  },
]

// Примеры KPI
export const mockKPIs: KPI[] = [
  {
    id: "1",
    name: "Выполнение задач",
    target: 100,
    current: 75,
    unit: "%",
    user: "1",
  },
  {
    id: "2",
    name: "Привлечение клиентов",
    target: 10,
    current: 7,
    unit: "клиентов",
    user: "2",
  },
  {
    id: "3",
    name: "Завершение проектов",
    target: 5,
    current: 3,
    unit: "проектов",
    user: "3",
  },
]

// Функция для имитации задержки API
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Функции для получения данных с имитацией API
export async function getMockClients() {
  await delay(500)
  return mockClients
}

export async function getMockClient(id: string) {
  await delay(300)
  return mockClients.find((client) => client.id === id) || null
}

export async function getMockProjects(clientId?: string) {
  await delay(500)
  if (clientId) {
    return mockProjects.filter((project) => project.client === clientId)
  }
  return mockProjects
}

export async function getMockProject(id: string) {
  await delay(300)
  return mockProjects.find((project) => project.id === id) || null
}

export async function getMockTasks(userId?: string, projectId?: string) {
  await delay(500)
  let filteredTasks = [...mockTasks]

  if (userId) {
    filteredTasks = filteredTasks.filter((task) => task.assigned_to === userId)
  }

  if (projectId) {
    filteredTasks = filteredTasks.filter((task) => task.project === projectId)
  }

  return filteredTasks
}

export async function getMockReports(projectId?: string) {
  await delay(500)
  if (projectId) {
    return mockReports.filter((report) => report.project === projectId)
  }
  return mockReports
}

export async function getMockKPIs(userId: string) {
  await delay(500)
  return mockKPIs.filter((kpi) => kpi.user === userId)
}
