"use client"

import { useUser } from "@/contexts/user-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Briefcase, Building, Shield } from "lucide-react"

export function UserProfile() {
  const { user } = useUser()

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Профиль пользователя</CardTitle>
          <CardDescription>Пользователь не найден</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "master":
        return <Badge className="bg-purple-500">Master</Badge>
      case "general":
        return <Badge className="bg-blue-500">General</Badge>
      case "director":
        return <Badge className="bg-green-500">Director</Badge>
      case "manager":
        return <Badge className="bg-amber-500">Manager</Badge>
      case "visitor":
        return <Badge className="bg-gray-500">Visitor</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Профиль пользователя</CardTitle>
        <CardDescription>Информация о вашем профиле и доступе</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="text-lg">{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {getRoleBadge(user.role)}
              {user.department && <Badge variant="outline">{user.department}</Badge>}
              {user.position && <Badge variant="outline">{user.position}</Badge>}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Контактная информация</h4>
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>
            {user.position && (
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.position}</span>
              </div>
            )}
            {user.department && (
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.department}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm capitalize">Роль: {user.role}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
