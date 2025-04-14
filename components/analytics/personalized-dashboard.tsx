"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

const mockAvailableCharts = [
  { id: "revenue", name: "Revenue Chart" },
  { id: "studentStatus", name: "Student Status Chart" },
  { id: "coursePopularity", name: "Course Popularity Chart" },
  { id: "monthlyRevenue", name: "Monthly Revenue Chart" },
]

export function PersonalizedDashboard() {
  const [selectedCharts, setSelectedCharts] = useState(["revenue", "studentStatus"])

  const handleChartSelection = (chartId: string) => {
    setSelectedCharts((prev) => {
      if (prev.includes(chartId)) {
        return prev.filter((id) => id !== chartId)
      } else {
        return [...prev, chartId]
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalize Dashboard</CardTitle>
        <CardDescription>Customize your dashboard by selecting the charts you want to see.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAvailableCharts.map((chart) => (
          <div key={chart.id} className="flex items-center justify-between">
            <label
              htmlFor={`chart-${chart.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed flex-1"
            >
              {chart.name}
            </label>
            <Checkbox
              id={`chart-${chart.id}`}
              checked={selectedCharts.includes(chart.id)}
              onCheckedChange={() => handleChartSelection(chart.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
