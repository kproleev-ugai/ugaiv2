"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  FileText,
  Download,
  Share2,
  Trash2,
  Clock,
  Tag,
  Calendar,
  ChevronLeft,
  Edit,
  Star,
  StarOff,
  Eye,
  MessageSquare,
  History,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface DocumentComment {
  id: number
  author: string
  authorAvatar: string
  date: string
  content: string
}

interface DocumentVersion {
  id: number
  version: string
  date: string
  author: string
  changes: string
}

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)
  
  // Имитация данных документа
  const document = {
    id: params.id,
    name: "Техническое задание.pdf",
    type: "pdf",
    size: "2.4 МБ",
    updatedAt: "10.04.2025",
    createdAt: "05.04.2025",
    owner: "Иван Иванов",
    ownerAvatar: "/placeholder.svg?height=32&width=32",
    project: "Редизайн веб-сайта",
    description: "Техническое задание для проекта редизайна корпоративного веб-сайта. Включает требования к дизайну, функциональности и технической реализации.",
    tags: ["документация", "веб-сайт", "дизайн"],
    viewCount: 24,
    downloadCount: 8,
    url: "#",
  }

  // Имитация комментариев
  const comments: DocumentComment[] = [
    {
      id: 1,
      author: "Мария Петрова",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      date: "12.04.2025, 14:30",
      content: "Предлагаю добавить раздел о требованиях к мобильной версии сайта."
    },
    {
      id: 2,
      author: "Алексей Смирнов",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      date: "11.04.2025, 10:15",
      content: "В разделе 3.2 нужно уточнить требования к производительности."
    }
  ]

  // Имитация версий документа
  const versions: DocumentVersion[] = [
    {
      id: 1,
      version: "1.2",
      date: "10.04.2025",
      author: "Иван Иванов",
      changes: "Добавлены требования к SEO-оптимизации"
    },
    {
      id: 2,
      version: "1.1",
      date: "07.04.2025",
      author: "Иван Иванов",
      changes: "Обновлены требования к дизайну"
    },
    {
      id: 3,
      version: "1.0",
      date: "05.04.2025",
      author: "Иван Иванов",
      changes: "Первая версия документа"
    }
  ]

  const handleDownload = () => {
    toast({
      title: "Загрузка начата",
      description: `Файл "${document.name}" загружается`,
    })
  }

  const handleShare = () => {
    toast({
      title: "Ссылка скопирована",
      description: "Ссылка на документ скопирована в буфер обмена",
    })
  }

  const handleDelete = () => {
    toast({
      title: "Документ удален",
      description: `Документ "${document.name}" был удален`,
    })
    router.push("/documents")
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Удалено из избранного" : "Добавлено в избранное",
      description: `Документ "${document.name}" ${isFavorite ? "удален из" : "добавлен в"} избранное`,
    })
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/documents")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{document.name}</h2>
            <p className="text-muted-foreground">
              {document.project && (
                <Badge variant="outline" className="mr-2">
                  {document.project}
                </Badge>
              )}
              <span>Последнее обновление: {document.updatedAt}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={toggleFavorite}>
            {isFavorite ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Поделиться
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Скачать
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие нельзя отменить. Документ будет безвозвратно удален из системы.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Separator />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Предпросмотр</TabsTrigger>
              <TabsTrigger value="comments">Комментарии ({comments.length})</TabsTrigger>
              <TabsTrigger value="versions">Версии ({versions.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <FileText className="h-24 w-24 text-red-500" />
                    <div className="text-center">
                      <p className="text-lg font-medium">{document.name}</p>
                      <p className="text-sm text-muted-foreground">{document.size}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Скачать для просмотра
                      </Button>
                      <Button variant="outline">
                        <Eye className="mr-2 h-4 w-4" />
                        Открыть в браузере
                      </Button>
                    </div>
                    <div className="w-full max-w-md rounded-md border p-4 bg-muted/30">
                      <p className="text-sm font-medium mb-2">Описание</p>
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Комментарии</CardTitle>
                  <CardDescription>Обсуждение документа</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-4 rounded-lg border p-4">
                        <Avatar>
                          <AvatarImage src={comment.authorAvatar} alt={comment.author} />
                          <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{comment.author}</p>
                            <p className="text-xs text-muted-foreground">{comment.date}</p>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Добавить комментарий
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="versions" className="mt-4">
              <Card>
                <CardHeader>
                  className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>История версий</CardTitle>
                  <CardDescription>История изменений документа</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {versions.map((version) => (
                      <div key={version.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <History className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Версия {version.version}</p>
                            <p className="text-xs text-muted-foreground">
                              {version.date} • {version.author}
                            </p>
                          </div>
                        </div>
                        <divassName="flex items-center space-x-2">
                          <Badge variant="outline">{version.changes}</Badge>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-3 w-3" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Информация</CardTitle>
              <CardDescription>Детали документа</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={document.ownerAvatar} alt={document.owner} />
                    <AvatarFallback>{document.owner.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{document.owner}</p>
                    <p className="text-xs text-muted-foreground">Владелец</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Создан</p>
                    </div>
                    <p className="text-sm">{document.createdAt}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Обновлен</p>
                    </div>
                    <p className="text-sm">{document.updatedAt}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Просмотры</p>
                    </div>
                    <p className="text-sm">{document.viewCount}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">Загрузки</p>
                    </div>
                    <p className="text-sm">{document.downloadCount}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-2">Теги</p>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Редактировать информацию
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
