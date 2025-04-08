"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { register } from "@/lib/auth"

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const { toast } = useToast()

  // Валидация формы
  useEffect(() => {
    const newErrors: Record<string, string> = {}

    if (password && password.length < 8) {
      newErrors.password = "Пароль должен содержать не менее 8 символов"
    }

    if (confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают"
    }

    setErrors(newErrors)
  }, [password, confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Проверяем наличие ошибок валидации
    if (Object.keys(errors).length > 0) {
      return
    }

    // Проверяем согласие с условиями
    if (!agreeTerms) {
      toast({
        variant: "destructive",
        title: "Необходимо согласие",
        description: "Пожалуйста, примите условия использования для продолжения.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Вызов API для регистрации
      await register({ name, email, password })

      toast({
        title: "Регистрация успешна",
        description: "Ваш аккаунт успешно создан.",
      })

      // Перенаправляем на главную страницу
      router.push("/")
      router.refresh()
    } catch (err) {
      console.error("Registration error:", err)

      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description:
          err instanceof Error ? err.message : "Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Имя</Label>
          <Input
            id="name"
            placeholder="Иван Петров"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Пароль</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              aria-invalid={errors.password ? "true" : "false"}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">{showPassword ? "Скрыть пароль" : "Показать пароль"}</span>
            </Button>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            aria-invalid={errors.confirmPassword ? "true" : "false"}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(checked === true)}
            required
            disabled={isLoading}
          />
          <Label htmlFor="terms" className="text-sm font-normal">
            Я согласен с{" "}
            <Button variant="link" className="p-0 h-auto font-normal">
              условиями использования
            </Button>
          </Label>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading || Object.keys(errors).length > 0}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Регистрация...
          </>
        ) : (
          "Зарегистрироваться"
        )}
      </Button>
    </form>
  )
}

