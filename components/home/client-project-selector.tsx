"use client"

import { useState } from "react"
import { Building, FolderOpen } from "lucide-react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// Моковые данные для демонстрации
const mockClients = [
  { id: "1", name: "ITstep", logo: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Acme Inc", logo: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "TechCorp", logo: "/placeholder.svg?height=40&width=40" },
]

const mockProjects = {
  "1": [
    { id: "101", name: "Образовательная платформа" },
    { id: "102", name: "Маркетинговая кампания 2024" },
    { id: "103", name: "Набор персонала" },
  ],
  "2": [
    { id: "201", name: "Мобильное приложение" },
    { id: "202", name: "Редизайн сайта" },
  ],
  "3": [
    { id: "301", name: "CRM система" },
    { id: "302", name: "Аналитика продаж" },
  ],
}

export function ClientProjectSelector() {
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [selectedProject, setSelectedProject] = useState<string>("")

  const handleClientChange = (value: string) => {
    setSelectedClient(value)
    setSelectedProject("")
  }

  const handleProjectChange = (value: string) => {
    setSelectedProject(value)
  }

  const availableProjects = selectedClient ? mockProjects[selectedClient as keyof typeof mockProjects] : []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Выбор клиента и проекта</CardTitle>
        <CardDescription>Выберите клиента и проект для работы</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <Building className="h-4 w-4" />
              Клиент
            </label>
            <Select value={selectedClient} onValueChange={handleClientChange}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите клиента" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    <div className="flex items-center gap-2">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden">
                        <Image
                          src={client.logo || "/placeholder.svg"}
                          alt={client.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {client.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              <FolderOpen className="h-4 w-4" />
              Проект
            </label>
            <Select value={selectedProject} onValueChange={handleProjectChange} disabled={!selectedClient}>
              <SelectTrigger>
                <SelectValue placeholder={selectedClient ? "Выберите проект" : "Сначала выберите клиента"} />
              </SelectTrigger>
              <SelectContent>
                {availableProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button className="w-full mt-4" disabled={!selectedProject}>
          Перейти к проекту
        </Button>
      </CardContent>
    </Card>
  )
}
