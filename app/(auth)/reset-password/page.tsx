"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/use-auth"

// Схема для формы запроса сброса пароля
const requestFormSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите корректный email",
  }),
})

// Схема для формы установки нового пароля
const resetFormSchema = z
  .object({
    password: z.string().min(8, {
      message: "Пароль должен содержать не менее 8 символов",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { toast } = useToast()
  const { resetPassword, setNewPassword, loading, error } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Форма для запроса сброса пароля
  const requestForm = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      email: "",
    },
  })

  // Форма для установки нового пароля
  const resetForm = useForm<z.infer<typeof resetFormSchema>>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  // Обработчик запроса сброса пароля
  async function onRequestSubmit(values: z.infer<typeof requestFormSchema>) {
    try {
      await resetPassword(values.email)
      setIsSuccess(true)
      toast({
        title: "Запрос отправлен",
        description: "Инструкции по сбросу пароля отправлены на ваш email",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Произошла ошибка при запросе сброса пароля",
      })
    }
  }

  // Обработчик установки нового пароля
  async function onResetSubmit(values: z.infer<typeof resetFormSchema>) {
    if (!token) return

    try {
      await setNewPassword(token, values.password)
      setIsSuccess(true)
      toast({
        title: "Пароль изменен",
        description: "Ваш пароль успешно изменен. Теперь вы можете войти в систему.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Произошла ошибка при изменении пароля",
      })
    }
  }

  // Если есть токен, показываем форму для установки нового пароля
  if (token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Создание нового пароля</CardTitle>
            <CardDescription>Введите новый пароль для вашего аккаунта</CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="text-center py-4">
                <h3 className="text-lg font-medium text-green-600 mb-2">Пароль успешно изменен</h3>
                <p className="mb-4">Теперь вы можете войти в систему, используя новый пароль.</p>
                <Button asChild>
                  <Link href="/login">Войти в систему</Link>
                </Button>
              </div>
            ) : (
              <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                  <FormField
                    control={resetForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Новый пароль</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="••••••••"
                              type={showPassword ? "text" : "password"}
                              disabled={loading}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={loading}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">{showPassword ? "Скрыть пароль" : "Показать пароль"}</span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подтверждение пароля</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="••••••••"
                              type={showConfirmPassword ? "text" : "password"}
                              disabled={loading}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              disabled={loading}
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              <span className="sr-only">
                                {showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
                              </span>
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Сохранить новый пароль
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
              <Link href="/login">Вернуться на страницу входа</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Если нет токена, показываем форму для запроса сброса пароля
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Сброс пароля</CardTitle>
          <CardDescription>Введите ваш email для получения инструкций по сбросу пароля</CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="text-center py-4">
              <h3 className="text-lg font-medium text-green-600 mb-2">Запрос отправлен</h3>
              <p className="mb-4">
                Инструкции по сбросу пароля отправлены на ваш email. Пожалуйста, проверьте вашу почту.
              </p>
              <Button asChild>
                <Link href="/login">Вернуться на страницу входа</Link>
              </Button>
            </div>
          ) : (
            <Form {...requestForm}>
              <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-4">
                <FormField
                  control={requestForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" type="email" disabled={loading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Отправить инструкции
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/login">Вернуться на страницу входа</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
