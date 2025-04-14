"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw, Globe } from "lucide-react"

export default function ApiStatus() {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading")
  const [message, setMessage] = useState<string>("Проверка статуса API...")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const checkStatus = async () => {
    setLoading(true)
    setStatus("loading")
    setMessage("Проверка статуса API...")
    setError(null)

    try {
      const response = await fetch("/api/system/info")

      if (response.ok) {
        const data = await response.json()
        setStatus("ok")
        setMessage(`API доступен: ${process.env.NEXT_PUBLIC_API_URL}`)
      } else {
        setStatus("error")
        setMessage("API недоступен")
        const data = await response.json()
        setError(data.error || "Неизвестная ошибка")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Ошибка при проверке статуса API")
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
          <div className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Статус API
          </div>
          <Badge
            variant={status === "ok" ? "default" : status === "error" ? "destructive" : "outline"}
            className="ml-2"
          >
            {status === "ok" ? "Доступен" : status === "error" ? "Недоступен" : "Проверка..."}
          </Badge>
        </CardTitle>
        <CardDescription>Проверка доступности API</CardDescription>
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
