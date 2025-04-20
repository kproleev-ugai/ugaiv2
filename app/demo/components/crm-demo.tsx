"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Building, Calendar, ChevronRight, Filter, Plus, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function CrmDemo() {
  const leads = [
    {
      id: "l1",
      name: "TechnoPro Ltd",
      contact: "Alex Johnson",
      position: "Technical Director",
      status: "New",
      source: "Website",
      value: "€45,000",
      date: "20/06/2023",
      avatar: "/placeholder.svg?height=40&width=40&query=TP",
    },
    {
      id: "l2",
      name: "MediaGroup Inc",
      contact: "Elena Smith",
      position: "Marketing Director",
      status: "Qualified",
      source: "Conference",
      value: "€120,000",
      date: "18/06/2023",
      avatar: "/placeholder.svg?height=40&width=40&query=MG",
    },
    {
      id: "l3",
      name: "Peterson Enterprises",
      contact: "Andrew Peterson",
      position: "Owner",
      status: "Negotiation",
      source: "Referral",
      value: "€35,000",
      date: "15/06/2023",
      avatar: "/placeholder.svg?height=40&width=40&query=PA",
    },
    {
      id: "l4",
      name: "BuildInvest Ltd",
      contact: "Dmitri Kozlov",
      position: "Financial Director",
      status: "Proposal",
      source: "Cold Call",
      value: "€280,000",
      date: "12/06/2023",
      avatar: "/placeholder.svg?height=40&width=40&query=SI",
    },
    {
      id: "l5",
      name: "EnergyService SA",
      contact: "Olivia Nielsen",
      position: "CEO",
      status: "Closing",
      source: "Partner",
      value: "€540,000",
      date: "10/06/2023",
      avatar: "/placeholder.svg?height=40&width=40&query=ES",
    },
  ]

  const deals = [
    {
      id: "d1",
      name: "CRM System Implementation",
      company: "TechnoPro Ltd",
      status: "Negotiation",
      value: "€45,000",
      probability: "60%",
      closeDate: "15/07/2023",
      owner: "Steven K.",
    },
    {
      id: "d2",
      name: "Q3 Marketing Campaign",
      company: "MediaGroup Inc",
      status: "Proposal",
      value: "€120,000",
      probability: "75%",
      closeDate: "30/06/2023",
      owner: "Maria V.",
    },
    {
      id: "d3",
      name: "Mobile App Development",
      company: "Peterson Enterprises",
      status: "Qualification",
      value: "€35,000",
      probability: "40%",
      closeDate: "10/08/2023",
      owner: "Alex D.",
    },
    {
      id: "d4",
      name: "Business Process Automation",
      company: "BuildInvest Ltd",
      status: "Closing",
      value: "€280,000",
      probability: "90%",
      closeDate: "25/06/2023",
      owner: "Irene S.",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">CRM & Funnels</h2>

      <Tabs defaultValue="leads">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        <TabsContent value="leads" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Leads</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search leads..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={lead.avatar || "/placeholder.svg"} alt={lead.name} />
                        <AvatarFallback>{lead.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{lead.name}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>
                            {lead.contact}, {lead.position}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge
                        className={
                          lead.status === "New"
                            ? "bg-blue-500"
                            : lead.status === "Qualified"
                              ? "bg-purple-500"
                              : lead.status === "Negotiation"
                                ? "bg-amber-500"
                                : lead.status === "Proposal"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                        }
                      >
                        {lead.status}
                      </Badge>
                      <div className="text-sm font-medium">{lead.value}</div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Deals</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search deals..." className="pl-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deals.map((deal) => (
                  <div key={deal.id} className="grid grid-cols-5 gap-4 border-b pb-4">
                    <div className="col-span-2">
                      <div className="font-medium">{deal.name}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="h-3 w-3" />
                        <span>{deal.company}</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">{deal.value}</div>
                      <div className="text-xs text-muted-foreground">Probability: {deal.probability}</div>
                    </div>

                    <div>
                      <Badge
                        className={
                          deal.status === "Qualification"
                            ? "bg-blue-500"
                            : deal.status === "Negotiation"
                              ? "bg-amber-500"
                              : deal.status === "Proposal"
                                ? "bg-purple-500"
                                : "bg-green-500"
                        }
                      >
                        {deal.status}
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {deal.closeDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="mt-4">
          <div className="rounded-lg border bg-muted/50 p-8 text-center">
            <BarChart3 className="mx-auto h-8 w-8 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Clients</h3>
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
