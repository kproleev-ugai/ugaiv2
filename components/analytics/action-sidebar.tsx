"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { RefreshCw, Plus, Save, Download, BarChart2, Zap, MessageSquare, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function ActionSidebar({ collapsed, onToggle }: ActionSidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "border-r bg-gradient-to-b from-gray-900/95 to-gray-950 dark:from-gray-900 dark:to-gray-950 transition-all duration-300",
          "w-8", // Fixed width to be very compact
        )}
      >
        <div className="flex items-center justify-center p-1 border-b border-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-5 w-5 rounded-full text-gray-400 hover:text-white"
          >
            <ChevronRight className="h-2.5 w-2.5" />
          </Button>
        </div>

        <div className="p-1 grid grid-cols-1 gap-1">
          <ActionButton icon={<RefreshCw className="h-3 w-3" />} label="Update" />
          <ActionButton icon={<Star className="h-3 w-3" />} label="Add favourite" />
          <ActionButton icon={<Plus className="h-3 w-3" />} label="Add remain" />
          <ActionButton icon={<Save className="h-3 w-3" />} label="Save report" />
          <ActionButton icon={<Download className="h-3 w-3" />} label="Download" />
          <ActionButton icon={<BarChart2 className="h-3 w-3" />} label="Compare" />
          <ActionButton icon={<Zap className="h-3 w-3" />} label="Forecast" />
          <ActionButton icon={<MessageSquare className="h-3 w-3" />} label="Add comment" />
        </div>
      </div>
    </TooltipProvider>
  )
}

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="h-5 w-5 p-1 text-gray-400 hover:text-white hover:bg-gray-800">
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}
