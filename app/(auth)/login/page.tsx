"use client"

import { LoginForm } from "@/components/auth/login-form"
import { Logo } from "@/components/common/logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Вход в систему</h1>
          <p className="text-muted-foreground">Введите свои учетные данные для доступа к платформе</p>
        </div>

        <LoginForm />

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Еще нет аккаунта?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2025 AI Strategy Solutions. Все права защищены.</p>
      </div>
    </div>
  )
}

