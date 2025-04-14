"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { directusService } from "@/lib/client-directus-service"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CreateProjectPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const clientId = params.client as string
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "not_started",
    start_date: "",
    due_date: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError("Название проекта обязательно")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const projectData = {
        ...formData,
        client: clientId,
        progress: 0,
      }

      await directusService.createProject(projectData)

      setSuccess(true)
      toast({
        title: "Проект создан",
        description: "Проект успешно создан",
        variant: "default",
      })

      // Перенаправляем на страницу проектов через 2 секунды
      setTimeout(() => {
        router.push(`/${clientId}/projects`)
      }, 2000)
    } catch (err) {
      console.error("Error creating project:", err)
      setError("Не удалось создать проект. Пожалуйста, попробуйте еще раз.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/${clientId}/projects`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Создание проекта</h1>
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
          <AlertDescription>Проект успешно создан. Вы будете перенаправлены на страницу проектов.</AlertDescription>
        </Alert>
      ) : (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Создание проекта</CardTitle>
              <CardDescription>Заполните информацию о новом проекте</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название проекта</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введите название проекта"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Введите описание проекта"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not_started">Не начат</SelectItem>
                    <SelectItem value="active">Активный</SelectItem>
                    <SelectItem value="delayed">Отложен</SelectItem>
                    <SelectItem value="completed">Завершен</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Дата начала</Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due_date">Дата завершения</Label>
                  <Input id="due_date" name="due_date" type="date" value={formData.due_date} onChange={handleChange} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/${clientId}/projects`}>Отмена</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Создание..." : "Создать проект"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  )
}
