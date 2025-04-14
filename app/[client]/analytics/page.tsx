"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { directusService } from "@/lib/client-directus-service"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function AnalyticsPage() {
  const params = useParams()
  const clientId = params.client as string
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        setLoading(true)
        setError(null)

        // Получаем аналитические данные для клиента
        const data = await directusService.getAnalytics({
          filter: {
            client: {
              _eq: clientId,
            },
          },
          fields: ["*", "metrics.*", "dimensions.*"],
        })

        setAnalyticsData(data)
      } catch (err) {
        console.error("Error fetching analytics data:", err)
        setError("Не удалось загрузить аналитические данные")
      } finally {
        setLoading(false)
      }
    }

    if (clientId) {
      fetchAnalyticsData()
    }
  }, [clientId])

  if (loading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-12 w-3/4 max-w-lg" />
        <Skeleton className="h-6 w-1/2 max-w-md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return <AnalyticsDashboard clientId={clientId} analyticsData={analyticsData} />
}
