"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { File, Upload, X, FileText, FileImage, FileSpreadsheet, FileArchive, Check, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const formSchema = z.object({
  name: z.string().min(1, "Имя файла обязательно"),
  project: z.string().optional(),
  description: z.string().optional(),
  tags: z.string().optional(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Максимальный размер файла 10MB`)
    .refine(
      (file) =>
        [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/zip",
          "application/x-zip-compressed",
        ].includes(file.type),
      "Поддерживаемые форматы: PDF, JPEG, PNG, Excel, Word, ZIP",
    ),
})

type FormValues = z.infer<typeof formSchema>

const projects = [
  { id: "1", name: "Редизайн веб-сайта" },
  { id: "2", name: "Мобильное приложение" },
  { id: "3", name: "Маркетинговая кампания" },
  { id: "4", name: "Обновление CRM" },
  { id: "5", name: "Интеграция API" },
  { id: "6", name: "Обучение персонала" },
]

export default function DocumentUploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      project: "",
      description: "",
      tags: "",
    },
  })

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Обновляем значение в форме
    form.setValue("file", file, { shouldValidate: true })

    // Если имя файла не заполнено, используем имя загруженного файла
    if (!form.getValues("name")) {
      form.setValue("name", file.name.split(".")[0], { shouldValidate: true })
    }

    // Определяем тип файла для иконки
    if (file.type.includes("pdf")) {
      setFileType("pdf")
    } else if (file.type.includes("image")) {
      setFileType("image")
    } else if (file.type.includes("excel") || file.type.includes("spreadsheet")) {
      setFileType("spreadsheet")
    } else if (file.type.includes("word") || file.type.includes("document")) {
      setFileType("document")
    } else if (file.type.includes("zip") || file.type.includes("compressed")) {
      setFileType("archive")
    } else {
      setFileType("file")
    }

    // Создаем URL для предпросмотра, если это изображение
    if (file.type.includes("image")) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    } else {
      setPreviewUrl(null)
    }
  }

  const onSubmit = async (data: FormValues) => {
    setIsUploading(true)
    setUploadError(null)

    // Имитация загрузки с прогрессом
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 10
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    try {
      // Имитация задержки сети
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Очищаем интервал и устанавливаем прогресс в 100%
      clearInterval(interval)
      setUploadProgress(100)

      // Имитация успешной загрузки
      toast({
        title: "Документ загружен",
        description: `Файл "${data.name}" успешно загружен`,
      })

      // Перенаправляем на страницу документов после короткой задержки
      setTimeout(() => {
        router.push("/documents")
      }, 1000)
    } catch (error) {
      clearInterval(interval)
      setUploadError("Произошла ошибка при загрузке файла. Пожалуйста, попробуйте снова.")
      setUploadProgress(null)
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = () => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-12 w-12 text-red-500" />
      case "image":
        return <FileImage className="h-12 w-12 text-green-500" />
      case "spreadsheet":
        return <FileSpreadsheet className="h-12 w-12 text-emerald-500" />
      case "document":
        return <FileText className="h-12 w-12 text-blue-500" />
      case "archive":
        return <FileArchive className="h-12 w-12 text-yellow-500" />
      default:
        return <File className="h-12 w-12 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Загрузка документа</h2>
        <p className="text-muted-foreground">Загрузите новый документ в систему</p>
      </div>
      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Информация о документе</CardTitle>
            <CardDescription>Заполните информацию о загружаемом документе</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название документа</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите название документа" disabled={isUploading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="project"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Проект</FormLabel>
                      <Select disabled={isUploading} onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите проект" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Выберите проект, к которому относится документ</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Введите описание документа"
                          className="resize-none"
                          disabled={isUploading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Теги</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите теги через запятую" disabled={isUploading} {...field} />
                      </FormControl>
                      <FormDescription>Например: отчет, финансы, квартал</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Файл</FormLabel>
                      <FormControl>
                        <div className="grid w-full gap-2">
                          <Input
                            id="file"
                            type="file"
                            ref={fileInputRef}
                            onChange={onFileChange}
                            disabled={isUploading}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
                            {...fieldProps}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="w-full"
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Выбрать файл
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Поддерживаемые форматы: PDF, Word, Excel, изображения, ZIP. Максимальный размер: 10MB
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {uploadError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Ошибка</AlertTitle>
                    <AlertDescription>{uploadError}</AlertDescription>
                  </Alert>
                )}

                {uploadProgress !== null && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Загрузка</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/documents")}
                    disabled={isUploading}
                  >
                    Отмена
                  </Button>
                  <Button type="submit" disabled={isUploading || !form.formState.isValid}>
                    {isUploading ? "Загрузка..." : "Загрузить документ"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Предпросмотр</CardTitle>
            <CardDescription>Предпросмотр загружаемого документа</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
            {form.getValues("file") ? (
              <div className="flex flex-col items-center space-y-4">
                {previewUrl ? (
                  <div className="relative w-full max-w-md">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Предпросмотр"
                      className="rounded-md border object-contain max-h-[300px] w-full"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80"
                      onClick={() => {
                        setPreviewUrl(null)
                        form.resetField("file")
                        if (fileInputRef.current) fileInputRef.current.value = ""
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    {getFileIcon()}
                    <div className="text-center">
                      <p className="font-medium">{form.getValues("file")?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(form.getValues("file")?.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        form.resetField("file")
                        setFileType(null)
                        if (fileInputRef.current) fileInputRef.current.value = ""
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Удалить
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="rounded-full bg-muted p-6">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Перетащите файл сюда или выберите файл</p>
                  <p className="text-sm text-muted-foreground">
                    Поддерживаемые форматы: PDF, Word, Excel, изображения, ZIP
                  </p>
                </div>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                  Выбрать файл
                </Button>
              </div>
            )}
          </CardContent>
          {form.getValues("file") && (
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <div className="text-sm text-muted-foreground">
                {uploadProgress === 100 ? (
                  <div className="flex items-center text-green-600">
                    <Check className="mr-2 h-4 w-4" />
                    Загрузка завершена
                  </div>
                ) : (
                  "Готово к загрузке"
                )}
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
