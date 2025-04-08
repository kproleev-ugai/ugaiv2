"use client"

import { RegisterForm } from "@/components/auth/register-form"
import { Logo } from "@/components/common/logo"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Создание аккаунта</h1>
          <p className="text-muted-foreground">Заполните форму для регистрации на платформе</p>
        </div>

        <RegisterForm />

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Войти
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

