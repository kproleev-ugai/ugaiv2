"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainMonitoring } from "@/components/analytics/main-monitoring"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ContentArea() {
  return (
    <div className="flex-1 overflow-auto p-2 bg-gray-950">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <Card className="bg-gray-900 border-gray-800 shadow-sm">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <CardDescription className="text-xs text-gray-500">Monthly revenue overview</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1">
            <div className="text-2xl font-bold text-gray-200">$45,231.89</div>
            <div className="text-xs text-green-500 mt-1">+20.1% from last month</div>
          </CardContent>
          <CardFooter className="p-2 pt-0 flex justify-end">
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-sm">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-300">Subscriptions</CardTitle>
            <CardDescription className="text-xs text-gray-500">Active subscriptions</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1">
            <div className="text-2xl font-bold text-gray-200">+2350</div>
            <div className="text-xs text-red-500 mt-1">-4.5% from last month</div>
          </CardContent>
          <CardFooter className="p-2 pt-0 flex justify-end">
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gray-900 border-gray-800 shadow-sm">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
            <CardDescription className="text-xs text-gray-500">Daily active users</CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-1">
            <div className="text-2xl font-bold text-gray-200">+573</div>
            <div className="text-xs text-green-500 mt-1">+12.4% from yesterday</div>
          </CardContent>
          <CardFooter className="p-2 pt-0 flex justify-end">
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-2">
        <Card className="bg-gray-900 border-gray-800 shadow-sm">
          <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium text-gray-300">Overview</CardTitle>
              <CardDescription className="text-xs text-gray-500">Monthly performance metrics</CardDescription>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
                <Printer className="h-3 w-3 mr-1" />
                Print
              </Button>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400 hover:text-white">
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800 text-gray-300">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem>Download PDF</DropdownMenuItem>
                  <DropdownMenuItem>Email Report</DropdownMenuItem>
                  <DropdownMenuItem>Schedule Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-gray-800 text-gray-400">
                <TabsTrigger
                  value="overview"
                  className="text-xs data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="text-xs data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="text-xs data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Reports
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="text-xs data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-2">
                <MainMonitoring />
              </TabsContent>
              <TabsContent value="analytics" className="mt-2">
                <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
                  Analytics content will be displayed here
                </div>
              </TabsContent>
              <TabsContent value="reports" className="mt-2">
                <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
                  Reports content will be displayed here
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="mt-2">
                <div className="h-[300px] flex items-center justify-center text-gray-500 text-sm">
                  Notifications content will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
