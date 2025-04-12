"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Имя должно содержать не менее 2 символов",
    })
    .max(30, {
      message: "Имя не должно превышать 30 символов",
    }),
  email: z.string().min(1, { message: "Это поле обязательно" }).email("Это не похоже на email"),
  bio: z.string().max(500, {
    message: "Биография не должна превышать 500 символов",
  }),
  urls: z
    .object({
      website: z.string().url({ message: "Пожалуйста, введите корректный URL" }).or(z.string().length(0)),
      github: z.string().url({ message: "Пожалуйста, введите корректный URL" }).or(z.string().length(0)),
      linkedin: z.string().url({ message: "Пожалуйста, введите корректный URL" }).or(z.string().length(0)),
    })
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "Иван Иванов",
  email: "ivan@example.com",
  bio: "Я разработчик программного обеспечения с опытом работы более 5 лет. Специализируюсь на веб-разработке и мобильных приложениях.",
  urls: {
    website: "https://example.com",
    github: "https://github.com/ivanivanov",
    linkedin: "https://linkedin.com/in/ivanivanov",
  },
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    try {
      // Здесь будет логика сохранения профиля
      console.log(data)

      // Имитация задержки сети
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Профиль обновлен",
        description: "Ваш профиль был успешно обновлен",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при обновлении профиля",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Профиль</h2>
        <p className="text-muted-foreground">Управляйте настройками своего профиля и предпочтениями</p>
      </div>
      <Separator />
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Основная информация</TabsTrigger>
          <TabsTrigger value="password">Пароль</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Аватар" />
                    <AvatarFallback>ИИ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Фото профиля</CardTitle>
                    <CardDescription>Нажмите на кнопку ниже, чтобы загрузить новое фото</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button variant="outline" type="button">
                    Загрузить фото
                  </Button>
                  <Button variant="outline" type="button">
                    Удалить фото
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Основная информация</CardTitle>
                    <CardDescription>Обновите свою личную информацию</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя</FormLabel>
                          <FormControl>
                            <Input placeholder="Ваше имя" disabled={isLoading} {...field} />
                          </FormControl>
                          <FormDescription>Это имя будет отображаться в вашем профиле</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="example@example.com" type="email" disabled={isLoading} {...field} />
                          </FormControl>
                          <FormDescription>Ваш email адрес</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>О себе</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Расскажите немного о себе"
                              className="resize-none"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Краткая информация о вас</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Ссылки</CardTitle>
                    <CardDescription>Добавьте ссылки на ваши профили в социальных сетях</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="urls.website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Веб-сайт</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com" disabled={isLoading} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urls.github"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GitHub</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/username" disabled={isLoading} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="urls.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input placeholder="https://linkedin.com/in/username" disabled={isLoading} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className="mr-2 h-4 w-4" />
                      Сохранить изменения
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Изменение пароля</CardTitle>
              <CardDescription>Обновите свой пароль для повышения безопасности</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Текущий пароль</FormLabel>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <FormLabel>Новый пароль</FormLabel>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <FormLabel>Подтверждение пароля</FormLabel>
                <Input type="password" placeholder="••••••••" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Изменить пароль
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>Настройте, какие уведомления вы хотите получать</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Содержимое настроек уведомлений будет здесь</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
