"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Check, ChevronRight, Target } from "lucide-react"

export default function StrategyDemo() {
  const strategicGoals = [
    {
      id: "sg1",
      title: "Increase revenue by 25%",
      department: "Company",
      progress: 68,
      status: "In Progress",
      children: [
        {
          id: "okr1",
          title: "Launch 3 new products",
          department: "Product",
          progress: 66,
          status: "In Progress",
        },
        {
          id: "okr2",
          title: "Improve conversion by 15%",
          department: "Marketing",
          progress: 80,
          status: "In Progress",
        },
        {
          id: "okr3",
          title: "Expand customer base by 20%",
          department: "Sales",
          progress: 55,
          status: "In Progress",
        },
      ],
    },
    {
      id: "sg2",
      title: "Reduce operational costs by 10%",
      department: "Company",
      progress: 42,
      status: "In Progress",
      children: [
        {
          id: "okr4",
          title: "Optimize development processes",
          department: "Product",
          progress: 60,
          status: "In Progress",
        },
        {
          id: "okr5",
          title: "Automate routine tasks",
          department: "Operations",
          progress: 35,
          status: "In Progress",
        },
      ],
    },
    {
      id: "sg3",
      title: "Increase customer satisfaction to 95%",
      department: "Company",
      progress: 78,
      status: "In Progress",
      children: [
        {
          id: "okr6",
          title: "Improve support quality",
          department: "Support",
          progress: 85,
          status: "In Progress",
        },
        {
          id: "okr7",
          title: "Reduce response time by 50%",
          department: "Support",
          progress: 70,
          status: "In Progress",
        },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Company Strategy</h2>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Strategic Goals 2023</CardTitle>
              <Badge variant="outline" className="ml-2">
                Q2 2023
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {strategicGoals.map((goal) => (
                <div key={goal.id} className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Target className="h-5 w-5 shrink-0 text-blue-500 mt-0.5" />
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{goal.title}</div>
                        <Badge
                          className={`ml-2 ${
                            goal.progress >= 75 ? "bg-green-500" : goal.progress >= 50 ? "bg-amber-500" : "bg-blue-500"
                          }`}
                        >
                          {goal.progress}%
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">Responsible: {goal.department}</div>
                      <Progress value={goal.progress} className="h-2 mt-2" />

                      <div className="pt-2 ml-5 space-y-3 border-l border-dashed pl-6 mt-4">
                        {goal.children.map((okr) => (
                          <div key={okr.id} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{okr.title}</div>
                              <Badge
                                variant="outline"
                                className={`ml-2 ${
                                  okr.progress >= 75
                                    ? "border-green-500 text-green-500"
                                    : okr.progress >= 50
                                      ? "border-amber-500 text-amber-500"
                                      : "border-blue-500 text-blue-500"
                                }`}
                              >
                                {okr.progress}%
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">Responsible: {okr.department}</div>
                            <Progress value={okr.progress} className="h-1.5 mt-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Key Initiatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">International Expansion</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Enter 3 new European markets by the end of the year
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Digital Transformation</div>
                    <div className="text-sm text-muted-foreground mt-1">Convert 80% of processes to digital format</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Sustainable Development</div>
                    <div className="text-sm text-muted-foreground mt-1">Reduce company's carbon footprint by 30%</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Talent Development</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Training and upskilling for 100% of employees
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Risks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Increased Competition</div>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">New players entering key markets</div>
                  <div className="text-xs mt-1 text-blue-600">
                    Mitigation plan <ChevronRight className="inline h-3 w-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Regulatory Changes</div>
                    <Badge className="bg-amber-500">Medium</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    New requirements for data storage and processing
                  </div>
                  <div className="text-xs mt-1 text-blue-600">
                    Mitigation plan <ChevronRight className="inline h-3 w-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Technology Risks</div>
                    <Badge className="bg-amber-500">Medium</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Obsolescence of current technology platform</div>
                  <div className="text-xs mt-1 text-blue-600">
                    Mitigation plan <ChevronRight className="inline h-3 w-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Economic Instability</div>
                    <Badge variant="outline">Low</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Currency fluctuations and inflation</div>
                  <div className="text-xs mt-1 text-blue-600">
                    Mitigation plan <ChevronRight className="inline h-3 w-3" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
