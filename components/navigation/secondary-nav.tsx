"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart2,
  DollarSign,
  TrendingUp,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  ShoppingCart,
  PieChart,
  Activity,
} from "lucide-react"
import { useClient } from "@/contexts/client-context"
import { Badge } from "@/components/ui/badge"

export function SecondaryNav() {
  const pathname = usePathname()
  const { currentClient } = useClient()

  if (!currentClient) return null

  const basePath = `/${currentClient.id}/analytics`

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const links = [
    {
      name: "Main Dashboard",
      href: `${basePath}/maindashboard`,
      icon: <BarChart2 className="h-4 w-4" />,
      ai: false,
    },
    {
      name: "Finance",
      href: `${basePath}/finance`,
      icon: <DollarSign className="h-4 w-4" />,
      ai: true,
    },
    {
      name: "Marketing",
      href: `${basePath}/marketing`,
      icon: <TrendingUp className="h-4 w-4" />,
      ai: true,
    },
    {
      name: "Sales",
      href: `${basePath}/sales`,
      icon: <ShoppingCart className="h-4 w-4" />,
      ai: true,
    },
    {
      name: "Students",
      href: `${basePath}/students`,
      icon: <GraduationCap className="h-4 w-4" />,
      ai: false,
    },
    {
      name: "Teachers",
      href: `${basePath}/teachers`,
      icon: <Users className="h-4 w-4" />,
      ai: false,
    },
    {
      name: "Courses",
      href: `${basePath}/courses`,
      icon: <BookOpen className="h-4 w-4" />,
      ai: false,
    },
    {
      name: "Schedule",
      href: `${basePath}/schedule`,
      icon: <Calendar className="h-4 w-4" />,
      ai: false,
    },
  ]

  const secondaryLinks = [
    {
      name: "Revenue Forecast",
      href: `${basePath}/revenue-forecast`,
      icon: <PieChart className="h-4 w-4" />,
      ai: true,
    },
    {
      name: "Sales Funnel",
      href: `${basePath}/sales-funnel`,
      icon: <Activity className="h-4 w-4" />,
      ai: true,
    },
    {
      name: "Marketing ROI",
      href: `${basePath}/marketing-roi`,
      icon: <TrendingUp className="h-4 w-4" />,
      ai: true,
    },
    {
      name: "Channel Efficiency",
      href: `${basePath}/channel-efficiency`,
      icon: <BarChart2 className="h-4 w-4" />,
      ai: true,
    },
  ]

  return (
    <div className="flex flex-col border-b border-gray-800">
      {/* Main Tabs */}
      <div className="px-6 py-3 border-b border-gray-800">
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-gray-800 text-white"
                    : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-gray-300",
                )}
              >
                {link.icon}
                <span>{link.name}</span>
                {link.ai && (
                  <Badge variant="outline" className="ml-1 bg-blue-900/30 text-blue-300 border-blue-700 text-[10px]">
                    AI
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Secondary Tabs */}
      <div className="px-6 py-3">
        <div className="flex flex-wrap gap-2 items-center">
          {secondaryLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-gray-300",
                )}
              >
                {link.icon}
                <span>{link.name}</span>
                {link.ai && (
                  <Badge variant="outline" className="ml-1 bg-blue-900/30 text-blue-300 border-blue-700 text-[10px]">
                    AI
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
