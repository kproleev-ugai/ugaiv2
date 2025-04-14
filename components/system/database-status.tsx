"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw, Database } from "lucide-react"

export default function DatabaseStatus() {
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading")
  const [message, setMessage] = useState<string>("Проверка статуса базы данных...")
  const [error, setError] = useState<string | null>(null)
  const [timestamp, setTimestamp] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const checkStatus = async () => {
    setLoading(true)
    setStatus("loading")
    setMessage("Проверка статуса базы данных...")
    setError(null)
    setTimestamp(null)

    try {
      const response = await fetch("/api/system/database-status")
      const data = await response.json()

      if (response.ok) {
        setStatus("ok")
        setMessage(data.message)
        setTimestamp(data.timestamp)
      } else {
        setStatus("error")
        setMessage(data.message)
        setError(data.error)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Ошибка при проверке статуса базы данных")
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
            <Database className="mr-2 h-5 w-5" />
            Статус базы данных
          </div>
          <Badge
            variant={status === "ok" ? "default" : status === "error" ? "destructive" : "outline"}
            className="ml-2"
          >
            {status === "ok" ? "Доступна" : status === "error" ? "Недоступна" : "Проверка..."}
          </Badge>
        </CardTitle>
        <CardDescription>Проверка подключения к PostgreSQL</CardDescription>
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
        {timestamp && (
          <div className="mt-2 text-sm text-muted-foreground">
            Время сервера: {new Date(timestamp).toLocaleString()}
          </div>
        )}
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
