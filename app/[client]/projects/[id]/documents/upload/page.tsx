"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { directusService } from "@/lib/client-directus-service"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, FileUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function UploadDocumentPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const clientId = params.client as string
  const projectId = params.id as string
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("Название документа обязательно")
      return
    }

    if (!file) {
      setError("Выберите файл для загрузки")
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Создаем FormData для загрузки файла
      const formData = new FormData()
      formData.append("file", file)

      // Загружаем файл в Directus
      const response = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/files`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("directus_token")}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Ошибка при загрузке файла")
      }

      const fileData = await response.json()

      // Создаем запись о документе
      const documentData = {
        name,
        description,
        file: fileData.data.id,
        file_type: file.type,
        file_size: file.size,
        project: projectId,
      }

      await directusService.createDocument(documentData)

      setSuccess(true)
      toast({
        title: "Документ загружен",
        description: "Документ успешно загружен в проект",
        variant: "default",
      })

      // Перенаправляем на страницу проекта через 2 секунды
      setTimeout(() => {
        router.push(`/${clientId}/projects/${projectId}`)
      }, 2000)
    } catch (err) {
      console.error("Error uploading document:", err)
      setError("Не удалось загрузить документ. Пожалуйста, попробуйте еще раз.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/${clientId}/projects/${projectId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Загрузка документа</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success ? (
        <Alert className="mb-6 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Успешно</AlertTitle>
          <AlertDescription>Документ успешно загружен. Вы будете перенаправлены на страницу проекта.</AlertDescription>
        </Alert>
      ) : (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Загрузка документа</CardTitle>
              <CardDescription>Загрузите документ для проекта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название документа</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите название документа"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание (опционально)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Введите описание документа"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Файл</Label>
                <div className="flex items-center gap-2">
                  <Input id="file" type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 flex flex-col items-center justify-center border-dashed"
                  >
                    {file ? (
                      <>
                        <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {file.type} • {(file.size / 1024).toFixed(2)} KB
                        </span>
                      </>
                    ) : (
                      <>
                        <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm font-medium">Выберите файл или перетащите его сюда</span>
                        <span className="text-xs text-muted-foreground">
                          Поддерживаются файлы любого формата до 10 МБ
                        </span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/${clientId}/projects/${projectId}`}>Отмена</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Загрузка..." : "Загрузить документ"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  )
}
