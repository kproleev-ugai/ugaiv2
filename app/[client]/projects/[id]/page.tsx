"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { directusService } from "@/lib/client-directus-service"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, ArrowLeft, Calendar, Clock, Edit, FileText, ListTodo, Users, Plus } from "lucide-react"
import { ProjectStatusBadge } from "@/components/projects/project-status-badge"
import { ProjectProgressBar } from "@/components/projects/project-progress-bar"
import type { Project } from "@/lib/directus"

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const clientId = params.client as string
  const projectId = params.id as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true)
        setError(null)

        const data = await directusService.getProject(projectId, {
          fields: ["*", "client.*", "team_members.*", "tasks.*", "documents.*"],
        })

        setProject(data)
      } catch (err) {
        console.error("Error fetching project:", err)
        setError("Не удалось загрузить данные проекта")
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  if (loading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-1/4" />
        </div>
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="container mx-auto py-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Проект не найден</AlertTitle>
          <AlertDescription>Запрошенный проект не существует или был удален</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/${clientId}/projects`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <ProjectStatusBadge status={project.status} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/${clientId}/projects/${projectId}/edit`}>
              <Edit className="mr-2 h-4 w-4" /> Редактировать
            </Link>
          </Button>
          <Button>Действия</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Информация о проекте</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Описание</h3>
              <p>{project.description || "Нет описания"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Статус</h3>
              <ProjectStatusBadge status={project.status} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Прогресс</h3>
              <div className="flex justify-between text-sm mb-1">
                <span>Выполнено</span>
                <span className="font-medium">{project.progress || 0}%</span>
              </div>
              <ProjectProgressBar progress={project.progress || 0} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Сроки и даты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-medium">Дата начала</h3>
                <p className="text-muted-foreground">
                  {project.start_date ? new Date(project.start_date).toLocaleDateString("ru-RU") : "Не указана"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-medium">Дата завершения</h3>
                <p className="text-muted-foreground">
                  {project.due_date ? new Date(project.due_date).toLocaleDateString("ru-RU") : "Не указана"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="text-sm font-medium">Оставшееся время</h3>
                <p className="text-muted-foreground">
                  {project.due_date
                    ? Math.ceil((new Date(project.due_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) +
                      " дней"
                    : "Не указано"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Команда проекта</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.team_members && project.team_members.length > 0 ? (
                project.team_members.map((member: any) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={member.avatar ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${member.avatar}` : ""}
                      />
                      <AvatarFallback>{member.first_name?.[0] || member.email?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {member.first_name} {member.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">{member.role || "Участник"}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Нет участников</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" /> Управление командой
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Separator />

      <Tabs defaultValue="tasks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tasks">
            <ListTodo className="h-4 w-4 mr-2" />
            Задачи
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Документы
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Задачи проекта</h2>
            <Button asChild>
              <Link href={`/${clientId}/projects/${projectId}/tasks/create`}>
                <Plus className="mr-2 h-4 w-4" /> Создать задачу
              </Link>
            </Button>
          </div>
          {project.tasks && project.tasks.length > 0 ? (
            <div className="space-y-4">
              {project.tasks.map((task: any) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{task.name}</h3>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                      <Badge variant={task.status === "completed" ? "default" : "outline"}>
                        {task.status === "completed" ? "Завершена" : "В процессе"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <ListTodo className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Нет задач</p>
                <p className="text-muted-foreground text-sm mt-1">Создайте задачи для этого проекта</p>
                <Button className="mt-4" asChild>
                  <Link href={`/${clientId}/projects/${projectId}/tasks/create`}>
                    <Plus className="mr-2 h-4 w-4" /> Создать задачу
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Документы проекта</h2>
            <Button asChild>
              <Link href={`/${clientId}/projects/${projectId}/documents/upload`}>
                <Plus className="mr-2 h-4 w-4" /> Загрузить документ
              </Link>
            </Button>
          </div>
          {project.documents && project.documents.length > 0 ? (
            <div className="space-y-4">
              {project.documents.map((document: any) => (
                <Card key={document.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{document.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {document.file_type} •{" "}
                            {document.file_size ? `${(document.file_size / 1024).toFixed(2)} KB` : "Неизвестный размер"}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={document.file ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${document.file}` : "#"}
                          target="_blank"
                        >
                          Скачать
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Нет документов</p>
                <p className="text-muted-foreground text-sm mt-1">Загрузите документы для этого проекта</p>
                <Button className="mt-4" asChild>
                  <Link href={`/${clientId}/projects/${projectId}/documents/upload`}>
                    <Plus className="mr-2 h-4 w-4" /> Загрузить документ
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
