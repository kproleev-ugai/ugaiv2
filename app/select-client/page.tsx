"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Brain, Building } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { availableClients } from "@/contexts/client-context"

export default function SelectClientPage() {
  const router = useRouter()
  const [selectedClient, setSelectedClient] = useState<string | null>(null)

  const handleClientSelect = (clientId: string) => {
    setSelectedClient(clientId)
  }

  const handleContinue = () => {
    if (selectedClient) {
      router.push(`/${selectedClient}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
              <Brain className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">UGAI</span>
            <Badge
              variant="outline"
              className="text-xs h-5 px-1.5 py-0 ml-1 border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800"
            >
              AI
            </Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Выберите клиента</CardTitle>
            <CardDescription>Выберите клиента, с которым хотите работать</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              {availableClients.map((client) => (
                <Button
                  key={client.id}
                  variant={selectedClient === client.id ? "default" : "outline"}
                  className="justify-start h-auto py-3 px-4"
                  onClick={() => handleClientSelect(client.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {client.logo ? (
                        <Image
                          src={client.logo || "/placeholder.svg"}
                          alt={client.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Building className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{client.name}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            <Button className="w-full mt-4" disabled={!selectedClient} onClick={handleContinue}>
              Продолжить
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
