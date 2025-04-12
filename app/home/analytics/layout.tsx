import type React from "react"
export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex min-h-screen flex-col">{children}</div>
}
