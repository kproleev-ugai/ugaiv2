import type React from "react"
import { Navbar } from "@/components/layout/navbar"
import { ClientProvider } from "@/contexts/client-context"

export default function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { client: string }
}) {
  return (
    <ClientProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </ClientProvider>
  )
}
