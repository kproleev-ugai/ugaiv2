// Имитация API для демонстрационных целей
import type {
  DashboardStats,
  SalesMetrics,
  MarketingMetrics,
  Sale,
  ChartDataPoint,
  FunnelDataPoint,
} from "@/types/index"

export async function getTodayStats(): Promise<DashboardStats> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    revenue: 24500,
    revenueChange: 12.5,
    sales: 42,
    salesChange: 8.2,
    newCustomers: 12,
    customersChange: 15.3,
    conversionRate: 3.2,
    conversionChange: 1.1,
  }
}

export async function getSalesMetrics(): Promise<SalesMetrics> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    totalRevenue: 124500,
    revenueGrowth: 14.5,
    orderCount: 832,
    orderGrowth: 7.2,
    averageOrderValue: 1495,
    aovGrowth: 6.8,
    itemsSold: 1245,
    itemsGrowth: 9.3,
  }
}

export async function getSalesOverTime(): Promise<ChartDataPoint[]> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    { date: "01.01", revenue: 4000, orders: 40 },
    { date: "02.01", revenue: 3000, orders: 30 },
    { date: "03.01", revenue: 5000, orders: 50 },
    { date: "04.01", revenue: 2780, orders: 28 },
    { date: "05.01", revenue: 1890, orders: 19 },
    { date: "06.01", revenue: 2390, orders: 24 },
    { date: "07.01", revenue: 3490, orders: 35 },
    { date: "08.01", revenue: 4000, orders: 40 },
    { date: "09.01", revenue: 5000, orders: 50 },
    { date: "10.01", revenue: 6000, orders: 60 },
    { date: "11.01", revenue: 7000, orders: 70 },
    { date: "12.01", revenue: 9000, orders: 90 },
    { date: "13.01", revenue: 8000, orders: 80 },
    { date: "14.01", revenue: 7000, orders: 70 },
  ]
}

export async function getSalesFunnel(): Promise<FunnelDataPoint[]> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    { name: "Посетители", value: 5000, rate: "100%" },
    { name: "Просмотр товара", value: 3500, rate: "70%" },
    { name: "Добавление в корзину", value: 2200, rate: "44%" },
    { name: "Оформление", value: 1100, rate: "22%" },
    { name: "Покупка", value: 800, rate: "16%" },
  ]
}

export async function getRecentSales(): Promise<Sale[]> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      customer: "Иванов Иван",
      product: "Продукт A",
      amount: 12500,
      status: "completed",
      date: "10.06.2023",
    },
    {
      id: "2",
      customer: "Петрова Анна",
      product: "Продукт B",
      amount: 8700,
      status: "processing",
      date: "09.06.2023",
    },
    {
      id: "3",
      customer: "Сидоров Алексей",
      product: "Продукт C",
      amount: 14300,
      status: "completed",
      date: "08.06.2023",
    },
    {
      id: "4",
      customer: "Козлова Мария",
      product: "Продукт A",
      amount: 12500,
      status: "pending",
      date: "07.06.2023",
    },
    {
      id: "5",
      customer: "Николаев Дмитрий",
      product: "Продукт D",
      amount: 5600,
      status: "cancelled",
      date: "06.06.2023",
    },
    {
      id: "6",
      customer: "Соколова Елена",
      product: "Продукт B",
      amount: 8700,
      status: "completed",
      date: "05.06.2023",
    },
    {
      id: "7",
      customer: "Васильев Сергей",
      product: "Продукт E",
      amount: 9300,
      status: "processing",
      date: "04.06.2023",
    },
  ]
}

export async function getMarketingMetrics(): Promise<MarketingMetrics> {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    visitors: 15240,
    visitorsGrowth: 12.3,
    conversion: 3.2,
    conversionGrowth: 0.8,
    ctr: 4.5,
    ctrGrowth: 1.2,
    cpc: 32.5,
    cpcGrowth: -5.3,
  }
}

export async function getUser() {
  // Имитация задержки сети
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    avatarUrl: "/placeholder-avatar.jpg",
    role: "admin",
  }
}

