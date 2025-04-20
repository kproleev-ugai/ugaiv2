"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, UserCircle2, ArrowRight, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardDemo from "./components/dashboard-demo"
import StrategyDemo from "./components/strategy-demo"
import ProjectsDemo from "./components/projects-demo"
import CrmDemo from "./components/crm-demo"
import { UGAILogo } from "@/components/ugai-logo"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState<number>(0)
  const [showTip, setShowTip] = useState<boolean>(true)

  const demos = [
    {
      id: "dashboard",
      title: "CEO Dashboard",
      description: "Key company metrics in real-time",
      component: <DashboardDemo />,
    },
    {
      id: "strategy",
      title: "Company Strategy",
      description: "Strategic goals and OKRs at all levels",
      component: <StrategyDemo />,
    },
    {
      id: "projects",
      title: "Projects & Tasks",
      description: "Project and team management",
      component: <ProjectsDemo />,
    },
    {
      id: "crm",
      title: "CRM & Funnels",
      description: "Lead and client management",
      component: <CrmDemo />,
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const nextDemo = () => {
    setActiveDemo((prev) => (prev === demos.length - 1 ? 0 : prev + 1))
  }

  const prevDemo = () => {
    setActiveDemo((prev) => (prev === 0 ? demos.length - 1 : prev - 1))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold">
            <Link href="/landing" className="flex items-center gap-2">
              <UGAILogo variant="default" size="sm" />
              <span className="hidden sm:inline">StrategyAI</span>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="hidden sm:flex items-center mr-4 text-sm text-muted-foreground">
              <UserCircle2 className="h-5 w-5 mr-1.5" />
              <span>Demo User</span>
            </div>
            <Link href="/register" className="hidden sm:block">
              <Button className="bg-ugai-blue hover:bg-ugai-blue/90">
                Register <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 py-6">
                  <div className="flex items-center gap-2 text-sm">
                    <UserCircle2 className="h-5 w-5" />
                    <span>Demo User</span>
                  </div>
                  <Link href="/register">
                    <Button className="w-full bg-ugai-blue hover:bg-ugai-blue/90">
                      Register <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-4 md:py-6">
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Demo Mode</h1>
            <p className="text-muted-foreground mt-1">Explore the platform capabilities without registration</p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={prevDemo} className="px-3">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">
              {activeDemo + 1} / {demos.length}
            </div>
            <Button variant="outline" onClick={nextDemo} className="px-3">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-5">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Sections</CardTitle>
                <CardDescription>Choose functionality</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col">
                  {demos.map((demo, index) => (
                    <button
                      key={demo.id}
                      onClick={() => setActiveDemo(index)}
                      className={`flex flex-col text-left px-4 py-3 transition-colors ${
                        activeDemo === index ? "bg-ugai-blue/10 border-l-4 border-ugai-blue" : "hover:bg-muted"
                      }`}
                    >
                      <span className="font-medium">{demo.title}</span>
                      <span className="text-xs text-muted-foreground mt-1">{demo.description}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-3 lg:col-span-4 relative">
              <motion.div
                key={demos[activeDemo].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {demos[activeDemo].component}
              </motion.div>

              <AnimatePresence>
                {showTip && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 right-4 max-w-md bg-ugai-blue text-white p-4 rounded-lg shadow-lg"
                  >
                    <p className="font-medium">Tip</p>
                    <p className="text-sm mt-1">
                      This is the platform's demo mode. You can switch between sections to explore the main features.
                      Register for full access.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </AnimatePresence>
      </main>

      <div className="border-t mt-8">
        <div className="container py-4 md:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-muted-foreground">This is a demonstration version with mock data</p>
            <Link href="/register">
              <Button size="sm" className="w-full sm:w-auto bg-ugai-blue hover:bg-ugai-blue/90">
                Register for full access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
