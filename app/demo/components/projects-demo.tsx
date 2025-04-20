"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, Check, Clock, MoreHorizontal, Plus, UserCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function ProjectsDemo() {
  const projects = [
    {
      id: "p1",
      name: "Website Redesign",
      description: "Update design and UX of the company's main website",
      progress: 85,
      status: "In Progress",
      priority: "High",
      dueDate: "25/06/2023",
      tasks: {
        total: 24,
        completed: 18,
      },
      team: [
        { id: "u1", name: "Alex K.", avatar: "/alaskan-landscape.png" },
        { id: "u2", name: "Maria S.", avatar: "/abstract-ms-flow.png" },
        { id: "u3", name: "David W.", avatar: "/abstract-dw.png" },
      ],
    },
    {
      id: "p2",
      name: "CRM Integration",
      description: "Implementation of new CRM system and data migration",
      progress: 45,
      status: "In Progress",
      priority: "Medium",
      dueDate: "10/07/2023",
      tasks: {
        total: 18,
        completed: 8,
      },
      team: [
        { id: "u2", name: "Maria S.", avatar: "/abstract-ms-flow.png" },
        { id: "u4", name: "Ian P.", avatar: "/placeholder.svg?height=32&width=32&query=IP" },
        { id: "u5", name: "Anna D.", avatar: "/placeholder.svg?height=32&width=32&query=AD" },
      ],
    },
    {
      id: "p3",
      name: "Q3 Marketing Campaign",
      description: "Planning and launch of Q3 marketing campaign",
      progress: 20,
      status: "In Progress",
      priority: "High",
      dueDate: "01/07/2023",
      tasks: {
        total: 30,
        completed: 6,
      },
      team: [
        { id: "u1", name: "Alex K.", avatar: "/alaskan-landscape.png" },
        { id: "u5", name: "Anna D.", avatar: "/placeholder.svg?height=32&width=32&query=AD" },
        { id: "u6", name: "Sam M.", avatar: "/placeholder.svg?height=32&width=32&query=SM" },
      ],
    },
    {
      id: "p4",
      name: "New Product Launch",
      description: "Development and market launch of new product",
      progress: 68,
      status: "In Progress",
      priority: "Critical",
      dueDate: "25/06/2023",
      tasks: {
        total: 42,
        completed: 28,
      },
      team: [
        { id: "u1", name: "Alex K.", avatar: "/alaskan-landscape.png" },
        { id: "u2", name: "Maria S.", avatar: "/abstract-ms-flow.png" },
        { id: "u3", name: "David W.", avatar: "/abstract-dw.png" },
        { id: "u4", name: "Ian P.", avatar: "/placeholder.svg?height=32&width=32&query=IP" },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Projects & Tasks</h2>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="my">My Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                      <div className="text-sm text-muted-foreground mt-1">{project.description}</div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div>Progress</div>
                        <div className="font-medium">{project.progress}%</div>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-medium">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>Due: {project.dueDate}</span>
                      </div>

                      <Badge
                        className={
                          project.priority === "Critical"
                            ? "bg-red-500"
                            : project.priority === "High"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                        }
                      >
                        {project.priority}
                      </Badge>

                      <Badge variant="outline" className="gap-1">
                        <span>Tasks:</span> {project.tasks.completed}/{project.tasks.total}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-0">
                  <div className="flex -space-x-2">
                    {project.team.map((member) => (
                      <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name.split(" ")[0][0]}
                          {member.name.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted">
                      <Plus className="h-4 w-4" />
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" className="gap-1">
                    <ArrowUp className="h-4 w-4 rotate-45" />
                    Open
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <Plus className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Create new project</p>
                <p className="mt-1 text-xs text-muted-foreground">Add a new project for your team</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my" className="mt-4">
          <div className="rounded-lg border bg-muted/50 p-8 text-center">
            <UserCircle className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Demo User Projects</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This section is not available in demo mode.
              <br />
              Register to get full access.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="rounded-lg border bg-muted/50 p-8 text-center">
            <div className="mx-auto h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Completed Projects</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This section is not available in demo mode.
              <br />
              Register to get full access.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
