"use client"

import { Bell, CheckCircle2, Clock, AlertCircle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NotificationProps {
  id: number
  title: string
  message?: string
  time: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  onClick?: () => void
}

export function NotificationItem({ notification }: { notification: NotificationProps }) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div
      className={cn(
        "flex items-start p-3 hover:bg-muted/50 rounded-md cursor-pointer transition-colors",
        !notification.read && "bg-muted/30",
      )}
      onClick={notification.onClick}
    >
      <div className="mr-3 mt-0.5">{getNotificationIcon(notification.type)}</div>
      <div className="space-y-1 flex-1">
        <div className="font-medium">{notification.title}</div>
        {notification.message && <div className="text-sm text-muted-foreground">{notification.message}</div>}
        <div className="text-xs text-muted-foreground">{notification.time}</div>
      </div>
      {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />}
    </div>
  )
}
