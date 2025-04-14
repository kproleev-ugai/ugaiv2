"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function DirectusStatus() {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading")
  const [message, setMessage] = useState<string>("Проверка статуса Directus CMS...")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const checkStatus = async () => {
    setLoading(true)
    setStatus("loading")
    setMessage("Проверка статуса Directus CMS...")
    setError(null)

    try {
      const response = await fetch("/api/system/directus-status")
      const data = await response.json()

      if (response.ok) {
        setStatus("ok")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message)
        setError(data.error)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Ошибка при проверке статуса Directus CMS")
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Статус Directus CMS
          <Badge
            variant={status === "ok" ? "default" : status === "error" ? "destructive" : "outline"}
            className="ml-2"
          >
            {status === "ok" ? "Доступен" : status === "error" ? "Недоступен" : "Проверка..."}
          </Badge>
        </CardTitle>
        <CardDescription>Проверка подключения к Directus CMS</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {status === "ok" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : status === "error" ? (
            <XCircle className="h-5 w-5 text-red-500" />
          ) : (
            <RefreshCw className="h-5 w-5 animate-spin" />
          )}
          <span>{message}</span>
        </div>
        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={checkStatus} disabled={loading} className="ml-auto">
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Проверка...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Проверить снова
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
