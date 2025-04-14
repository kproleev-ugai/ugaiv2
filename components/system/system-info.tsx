"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Server, Cpu, MemoryStickIcon as Memory, Clock } from "lucide-react"

interface SystemInfo {
  os: {
    platform: string
    release: string
    type: string
    arch: string
    uptime: number
    totalMemory: number
    freeMemory: number
    cpus: number
  }
  node: {
    version: string
    env: string
  }
  next: {
    version: string
  }
  app: {
    name: string
    version: string
    directusUrl: string
    apiUrl: string
  }
}

export default function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSystemInfo = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/system/info")

      if (!response.ok) {
        throw new Error("Ошибка при получении системной информации")
      }

      const data = await response.json()
      setSystemInfo(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSystemInfo()
  }, [])

  // Форматирование размера в байтах в человекочитаемый формат
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  // Форматирование времени работы в человекочитаемый формат
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24))
    const hours = Math.floor((seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    return `${days}d ${hours}h ${minutes}m`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Server className="mr-2 h-5 w-5" />
          Системная информация
        </CardTitle>
        <CardDescription>Информация о системе и окружении</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="h-6 w-6 animate-spin" />
            <span className="ml-2">Загрузка информации...</span>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : systemInfo ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Приложение</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm text-muted-foreground">Название:</div>
                <div className="text-sm">{systemInfo.app.name}</div>
                <div className="text-sm text-muted-foreground">Версия:</div>
                <div className="text-sm">{systemInfo.app.version}</div>
                <div className="text-sm text-muted-foreground">Directus URL:</div>
                <div className="text-sm">{systemInfo.app.directusUrl}</div>
                <div className="text-sm text-muted-foreground">API URL:</div>
                <div className="text-sm">{systemInfo.app.apiUrl}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium flex items-center">
                <Cpu className="mr-2 h-4 w-4" />
                Операционная система
              </h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm text-muted-foreground">Платформа:</div>
                <div className="text-sm">{systemInfo.os.platform}</div>
                <div className="text-sm text-muted-foreground">Тип:</div>
                <div className="text-sm">{systemInfo.os.type}</div>
                <div className="text-sm text-muted-foreground">Релиз:</div>
                <div className="text-sm">{systemInfo.os.release}</div>
                <div className="text-sm text-muted-foreground">Архитектура:</div>
                <div className="text-sm">{systemInfo.os.arch}</div>
                <div className="text-sm text-muted-foreground">Процессоры:</div>
                <div className="text-sm">{systemInfo.os.cpus} ядер</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium flex items-center">
                <Memory className="mr-2 h-4 w-4" />
                Память
              </h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm text-muted-foreground">Всего:</div>
                <div className="text-sm">{formatBytes(systemInfo.os.totalMemory)}</div>
                <div className="text-sm text-muted-foreground">Свободно:</div>
                <div className="text-sm">{formatBytes(systemInfo.os.freeMemory)}</div>
                <div className="text-sm text-muted-foreground">Использовано:</div>
                <div className="text-sm">{formatBytes(systemInfo.os.totalMemory - systemInfo.os.freeMemory)}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Время работы
              </h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm text-muted-foreground">Время работы:</div>
                <div className="text-sm">{formatUptime(systemInfo.os.uptime)}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Окружение</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-sm text-muted-foreground">Node.js:</div>
                <div className="text-sm">{systemInfo.node.version}</div>
                <div className="text-sm text-muted-foreground">Next.js:</div>
                <div className="text-sm">{systemInfo.next.version}</div>
                <div className="text-sm text-muted-foreground">Окружение:</div>
                <div className="text-sm">{systemInfo.node.env}</div>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={fetchSystemInfo} disabled={loading} className="ml-auto">
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Обновление...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Обновить информацию
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
