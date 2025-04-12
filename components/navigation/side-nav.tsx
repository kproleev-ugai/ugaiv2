"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Target,
  CheckSquare,
  Users,
  Settings,
  PlusCircle,
  ArrowLeftRight,
  TrendingUp,
  Download,
  ChevronLeft,
  DollarSign,
  ShoppingCart,
  Brain,
  Calendar,
  LayoutDashboard,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface SideNavProps {
  collapsed: boolean
  onToggle: () => void
}

export function SideNav({ collapsed, onToggle }: SideNavProps) {
  const pathname = usePathname()

  const mainNavItems = [
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "OKR & KPI", href: "/okr", icon: Target, badge: "AI" },
    { name: "Finance", href: "/finance", icon: DollarSign, badge: "AI" },
    { name: "Marketing", href: "/marketing", icon: TrendingUp, badge: "AI" },
    { name: "Sales", href: "/sales", icon: ShoppingCart, badge: "AI" },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Team", href: "/team", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  const analyticsItems = [
    { name: "Main Dashboard", href: "/analytics", icon: LayoutDashboard },
    { name: "Finance Dashboard", href: "/analytics/finance", icon: DollarSign, badge: "AI" },
    { name: "Marketing Dashboard", href: "/analytics/marketing", icon: TrendingUp, badge: "AI" },
    { name: "Sales Dashboard", href: "/analytics/sales", icon: ShoppingCart, badge: "AI" },
    { name: "Students Dashboard", href: "/analytics/students", icon: Users, badge: "AI" },
  ]

  const actionItems = [
    { name: "Create Report", icon: PlusCircle, action: () => console.log("Create Report") },
    { name: "Compare Reports", icon: ArrowLeftRight, action: () => console.log("Compare Reports") },
    { name: "Forecast Model", icon: TrendingUp, action: () => console.log("Forecast Model"), badge: "AI" },
    { name: "Download Report", icon: Download, action: () => console.log("Download Report") },
  ]

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "flex h-full flex-col border-r bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300",
          collapsed ? "w-12" : "w-56",
        )}
      >
        <div className="flex items-center justify-between p-2 border-b">
          {!collapsed && (
            <div className="flex items-center gap-1">
              <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                <Brain className="h-3.5 w-3.5" />
              </div>
              <div className="font-semibold text-sm">UGAI</div>
              <Badge
                variant="outline"
                className="text-[10px] h-4 px-1 py-0 ml-1 border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800"
              >
                AI
              </Badge>
            </div>
          )}
          {collapsed && (
            <div className="h-6 w-6 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
              <Brain className="h-3.5 w-3.5" />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className={cn(
              "absolute -right-2.5 top-3 h-5 w-5 rounded-full border bg-background shadow-sm",
              collapsed ? "rotate-180" : "",
            )}
          >
            <ChevronLeft className="h-2.5 w-2.5" />
            <span className="sr-only">{collapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
          </Button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto py-2">
          <div className="px-2 py-1">
            <h3 className={cn("mb-1 text-xs font-medium text-muted-foreground", collapsed && "sr-only")}>
              Main Navigation
            </h3>
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <NavItemWithBadge
                    key={item.href}
                    icon={<item.icon className="h-3.5 w-3.5" />}
                    label={item.name}
                    href={item.href}
                    badge={item.badge}
                    active={isActive}
                    collapsed={collapsed}
                  />
                )
              })}
            </div>
          </div>

          <Separator className="my-2" />

          <div className="px-2 py-1">
            <h3 className={cn("mb-1 text-xs font-medium text-muted-foreground", collapsed && "sr-only")}>Dashboards</h3>
            <div className="space-y-1">
              {analyticsItems.map((item, index) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <NavItemWithBadge
                    key={index}
                    icon={<item.icon className="h-3.5 w-3.5" />}
                    label={item.name}
                    href={item.href}
                    badge={item.badge}
                    active={isActive}
                    collapsed={collapsed}
                  />
                )
              })}
            </div>
          </div>

          <Separator className="my-2" />

          <div className="px-2 py-1">
            <h3 className={cn("mb-1 text-xs font-medium text-muted-foreground", collapsed && "sr-only")}>Actions</h3>
            <div className="space-y-1">
              {actionItems.map((item, index) => (
                <ActionButtonWithBadge
                  key={index}
                  icon={<item.icon className="h-3.5 w-3.5" />}
                  label={item.name}
                  badge={item.badge}
                  onClick={item.action}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="p-2 border-t">
          <div className={cn("flex items-center justify-between", collapsed && "justify-center")}>
            <div className={cn("text-xs text-muted-foreground", collapsed && "sr-only")}>
              <p>UGAI Business Performance v6.0</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span className="sr-only">Help</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Help & Support</DialogTitle>
                  <DialogDescription>Get help with using the UGAI Business Performance platform.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Quick Links</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          User Guide
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Video Tutorials
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-600 hover:underline">
                          Contact Support
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Keyboard Shortcuts</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Toggle Sidebar</div>
                      <div className="font-mono">Ctrl + B</div>
                      <div>Search</div>
                      <div className="font-mono">Ctrl + K</div>
                      <div>Create Report</div>
                      <div className="font-mono">Ctrl + N</div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  badge?: string
  active?: boolean
  collapsed: boolean
}

function NavItemWithBadge({ icon, label, href, badge, active, collapsed }: NavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            "flex items-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
            active
              ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-800 dark:hover:bg-indigo-700"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
            collapsed && "justify-center px-0",
          )}
          aria-current={active ? "page" : undefined}
        >
          <span className={collapsed ? "" : "mr-2"}>{icon}</span>
          {!collapsed && (
            <div className="flex items-center justify-between w-full">
              <span>{label}</span>
              {badge && (
                <Badge
                  variant="outline"
                  className="text-[9px] h-3.5 px-1 py-0 ml-1 border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800"
                >
                  {badge}
                </Badge>
              )}
            </div>
          )}
        </Link>
      </TooltipTrigger>
      {collapsed && (
        <TooltipContent side="right">
          {label} {badge && `(${badge})`}
        </TooltipContent>
      )}
    </Tooltip>
  )
}

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  badge?: string
  onClick: () => void
  collapsed: boolean
}

function ActionButtonWithBadge({ icon, label, badge, onClick, collapsed }: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "flex w-full items-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          <span className={collapsed ? "" : "mr-2"}>{icon}</span>
          {!collapsed && (
            <div className="flex items-center justify-between w-full">
              <span>{label}</span>
              {badge && (
                <Badge
                  variant="outline"
                  className="text-[9px] h-3.5 px-1 py-0 ml-1 border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800"
                >
                  {badge}
                </Badge>
              )}
            </div>
          )}
        </button>
      </TooltipTrigger>
      {collapsed && (
        <TooltipContent side="right">
          {label} {badge && `(${badge})`}
        </TooltipContent>
      )}
    </Tooltip>
  )
}
