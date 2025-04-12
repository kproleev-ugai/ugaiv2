"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  File,
  FileText,
  FileImage,
  FileSpreadsheet,
  FileArchive,
  Download,
  Share2,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { SecondaryNav } from "@/components/navigation/secondary-nav"

type DocumentType = "pdf" | "doc" | "image" | "spreadsheet" | "archive"

interface Document {
  id: number
  name: string
  type: DocumentType
  size: string
  updatedAt: string
  owner: string
  project?: string
}

const documents: Document[] = [
  {
    id: 1,
    name: "Техническое задание.pdf",
    type: "pdf",
    size: "2.4 МБ",
    updatedAt: "10.04.2025",
    owner: "Иван Иванов",
    project: "Редизайн веб-сайта",
  },
  {
    id: 2,
    name: "Презентация проекта.pdf",
    type: "pdf",
    size: "5.7 МБ",
    updatedAt: "05.04.2025",
    owner: "Мария Петрова",
    project: "Мобильное приложение",
  },
  {
    id: 3,
    name: "Дизайн макеты.zip",
    type: "archive",
    size: "34.2 МБ",
    updatedAt: "01.04.2025",
    owner: "Алексей Смирнов",
    project: "Редизайн веб-сайта",
  },
  {
    id: 4,
    name: "Отчет по маркетингу.doc",
    type: "doc",
    size: "1.8 МБ",
    updatedAt: "28.03.2025",
    owner: "Елена Козлова",
    project: "Маркетинговая кампания",
  },
  {
    id: 5,
    name: "Бюджет проекта.xlsx",
    type: "spreadsheet",
    size: "0.9 МБ",
    updatedAt: "25.03.2025",
    owner: "Иван Иванов",
    project: "Обновление CRM",
  },
  {
    id: 6,
    name: "Логотип компании.png",
    type: "image",
    size: "3.2 МБ",
    updatedAt: "20.03.2025",
    owner: "Мария Петрова",
    project: "Редизайн веб-сайта",
  },
  {
    id: 7,
    name: "План интеграции.pdf",
    type: "pdf",
    size: "1.5 МБ",
    updatedAt: "15.03.2025",
    owner: "Алексей Смирнов",
    project: "Интеграция API",
  },
  {
    id: 8,
    name: "Обучающие материалы.zip",
    type: "archive",
    size: "45.6 МБ",
    updatedAt: "10.03.2025",
    owner: "Елена Козлова",
    project: "Обучение персонала",
  },
  {
    id: 9,
    name: "Руководство пользователя.doc",
    type: "doc",
    size: "2.1 МБ",
    updatedAt: "05.03.2025",
    owner: "Иван Иванов",
    project: "Обновление CRM",
  },
]

const getDocumentIcon = (type: DocumentType) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-8 w-8 text-red-500" />
    case "doc":
      return <FileText className="h-8 w-8 text-blue-500" />
    case "image":
      return <FileImage className="h-8 w-8 text-green-500" />
    case "spreadsheet":
      return <FileSpreadsheet className="h-8 w-8 text-emerald-500" />
    case "archive":
      return <FileArchive className="h-8 w-8 text-yellow-500" />
    default:
      return <File className="h-8 w-8 text-gray-500" />
  }
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [projectFilter, setProjectFilter] = useState<string>("all")

  const filteredDocuments = documents.filter((document) => {
    const matchesSearch = document.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || document.type === typeFilter
    const matchesProject =
      projectFilter === "all" || (document.project && document.project.toLowerCase() === projectFilter.toLowerCase())
    return matchesSearch && matchesType && matchesProject
  })

  // Получаем уникальные проекты для фильтра
  const uniqueProjects = Array.from(new Set(documents.map((doc) => doc.project).filter(Boolean)))

  return (
    <>
      <SecondaryNav />
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Документы</h2>
            <p className="text-muted-foreground">Управляйте документами и файлами проектов</p>
          </div>
          <Button asChild>
            <Link href="/documents/upload">
              <Plus className="mr-2 h-4 w-4" />
              Загрузить документ
            </Link>
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск документов..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Все типы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">Документы</SelectItem>
                <SelectItem value="image">Изображения</SelectItem>
                <SelectItem value="spreadsheet">Таблицы</SelectItem>
                <SelectItem value="archive">Архивы</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Все проекты" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все проекты</SelectItem>
                {uniqueProjects.map((project) => (
                  <SelectItem key={project} value={project as string}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Сортировка
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((document) => (
            <Card key={document.id} className="flex flex-col">
              <CardHeader className="pb-3 flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {getDocumentIcon(document.type)}
                  <div>
                    <CardTitle className="text-base">{document.name}</CardTitle>
                    {document.project && (
                      <Badge variant="outline" className="mt-1">
                        {document.project}
                      </Badge>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Меню</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Скачать
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Поделиться
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pb-3 flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Размер</span>
                    <span>{document.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Обновлено</span>
                    <span>{document.updatedAt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Владелец</span>
                    <span>{document.owner}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-3">
                <div className="flex items-center justify-between w-full">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/documents/${document.id}`}>Просмотреть</Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
