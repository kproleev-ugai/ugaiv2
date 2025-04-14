"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Логирование ошибки на сервер
    console.error(error)
  }, [error])

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle>Произошла ошибка</CardTitle>
          </div>
          <CardDescription>
            При загрузке проекта произошла ошибка. Пожалуйста, попробуйте снова или обратитесь в службу поддержки.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md overflow-auto max-h-32">
            {error.message || "Неизвестная ошибка"}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={reset} className="flex-1">
            Попробовать снова
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/my-projects">К списку проектов</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
