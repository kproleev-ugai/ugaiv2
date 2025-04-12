import { redirect } from "next/navigation"

export default function AnalyticsPage({ params }: { params: { client: string } }) {
  // Перенаправляем на основной дашборд
  redirect(`/${params.client}/analytics/maindashboard`)
}
