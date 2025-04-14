"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

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
            При загрузке отчетов произошла ошибка. Пожалуйста, попробуйте снова или обратитесь в службу поддержки.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md overflow-auto max-h-32">
            {error.message || "Неизвестная ошибка"}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={reset} className="w-full">
            Попробовать снова
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
