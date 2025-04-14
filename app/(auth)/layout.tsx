import type React from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export const metadata: Metadata = {
  title: "Аутентификация - UGAI",
  description: "Войдите в систему или зарегистрируйтесь",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="UGAI Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-xl font-bold">UGAI</span>
        </Link>
        <ModeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">{children}</div>
      </main>
      <footer className="border-t py-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} UGAI. Все права защищены.
      </footer>
    </div>
  )
}
