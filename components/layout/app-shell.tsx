"use client"

import type { ReactNode } from "react"
import { AuthProvider } from "@/hooks/use-auth"
import { ClientProvider } from "@/contexts/client-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <ClientProvider>
          {children}
          <Toaster />
        </ClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
