"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Palette, Monitor, Moon, Sun, Upload, Trash2, Save, LogOut } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Имитация сохранения настроек
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Настройки</h2>
        <p className="text-muted-foreground">Управление настройками вашего аккаунта и предпочтениями</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Профиль</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Уведомления</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Внешний вид</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Безопасность</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
              <CardDescription>Управление информацией вашего профиля</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Аватар" />
                    <AvatarFallback>ИИ</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Upload className="h-3 w-3" />
                      <span>Загрузить</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Trash2 className="h-3 w-3" />
                      <span>Удалить</span>
                    </Button>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя</Label>
                      <Input id="firstName" defaultValue="Иван" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input id="lastName" defaultValue="Иванов" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="ivan@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" defaultValue="+7 (999) 123-45-67" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">О себе</Label>
                    <Textarea
                      id="bio"
                      placeholder="Расскажите о себе"
                      defaultValue="Маркетолог с 5-летним опытом работы в сфере цифрового маркетинга. Специализируюсь на анализе данных и оптимизации маркетинговых кампаний."
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Должность</Label>
                  <Input id="position" defaultValue="Маркетолог" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Отдел</Label>
                  <Input id="department" defaultValue="Маркетинг" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Местоположение</Label>
                  <Input id="location" defaultValue="Москва" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Часовой пояс</Label>
                  <Select defaultValue="europe-moscow">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Выберите часовой пояс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-moscow">Москва (GMT+3)</SelectItem>
                      <SelectItem value="europe-kaliningrad">Калининград (GMT+2)</SelectItem>
                      <SelectItem value="europe-samara">Самара (GMT+4)</SelectItem>
                      <SelectItem value="asia-yekaterinburg">Екатеринбург (GMT+5)</SelectItem>
                      <SelectItem value="asia-omsk">Омск (GMT+6)</SelectItem>
                      <SelectItem value="asia-krasnoyarsk">Красноярск (GMT+7)</SelectItem>
                      <SelectItem value="asia-irkutsk">Иркутск (GMT+8)</SelectItem>
                      <SelectItem value="asia-yakutsk">Якутск (GMT+9)</SelectItem>
                      <SelectItem value="asia-vladivostok">Владивосток (GMT+10)</SelectItem>
                      <SelectItem value="asia-magadan">Магадан (GMT+11)</SelectItem>
                      <SelectItem value="asia-kamchatka">Камчатка (GMT+12)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="language">Язык интерфейса</Label>
                <Select defaultValue="ru">
                  <SelectTrigger id="language" className="w-full md:w-[240px]">
                    <SelectValue placeholder="Выберите язык" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Выйти</span>
              </Button>
              <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                <span>{saving ? "Сохранение..." : "Сохранить изменения"}</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
              <CardDescription>Настройте предпочтения для получения уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email уведомления</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-tasks">Задачи</Label>
                      <p className="text-xs text-muted-foreground">
                        Получать уведомления о новых и обновленных задачах
                      </p>
                    </div>
                    <Switch id="email-tasks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-projects">Проекты</Label>
                      <p className="text-xs text-muted-foreground">Получать уведомления об изменениях в проектах</p>
                    </div>
                    <Switch id="email-projects" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-reports">Отчеты</Label>
                      <p className="text-xs text-muted-foreground">Получать уведомления о новых отчетах</p>
                    </div>
                    <Switch id="email-reports" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-marketing">Маркетинговые рассылки</Label>
                      <p className="text-xs text-muted-foreground">Получать новости и обновления о продукте</p>
                    </div>
                    <Switch id="email-marketing" />
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Уведомления в приложении</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-tasks">Задачи</Label>
                      <p className="text-xs text-muted-foreground">Показывать уведомления о задачах в приложении</p>
                    </div>
                    <Switch id="app-tasks" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-messages">Сообщения</Label>
                      <p className="text-xs text-muted-foreground">Показывать уведомления о новых сообщениях</p>
                    </div>
                    <Switch id="app-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-mentions">Упоминания</Label>
                      <p className="text-xs text-muted-foreground">Уведомлять, когда вас упоминают в комментариях</p>
                    </div>
                    <Switch id="app-mentions" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-system">Системные уведомления</Label>
                      <p className="text-xs text-muted-foreground">Показывать системные уведомления и обновления</p>
                    </div>
                    <Switch id="app-system" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving} className="ml-auto">
                {saving ? "Сохранение..." : "Сохранить настройки"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Внешний вид</CardTitle>
              <CardDescription>Настройте внешний вид интерфейса</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Тема</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`border rounded-md p-4 cursor-pointer flex flex-col items-center gap-2 ${theme === "light" ? "border-primary bg-primary/5" : "border-muted"}`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="h-24 w-full rounded-md bg-white border"></div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <span>Светлая</span>
                    </div>
                  </div>
                  <div
                    className={`border rounded-md p-4 cursor-pointer flex flex-col items-center gap-2 ${theme === "dark" ? "border-primary bg-primary/5" : "border-muted"}`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="h-24 w-full rounded-md bg-gray-900 border border-gray-800"></div>
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4" />
                      <span>Темная</span>
                    </div>
                  </div>
                  <div
                    className={`border rounded-md p-4 cursor-pointer flex flex-col items-center gap-2 ${theme === "system" ? "border-primary bg-primary/5" : "border-muted"}`}
                    onClick={() => setTheme("system")}
                  >
                    <div className="h-24 w-full rounded-md bg-gradient-to-br from-white to-gray-900 border"></div>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4" />
                      <span>Системная</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Язык и локализация</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">Язык интерфейса</Label>
                      <p className="text-xs text-muted-foreground">Выберите язык интерфейса приложения</p>
                    </div>
                    <Select defaultValue="ru">
                      <SelectTrigger id="language" className="w-[180px]">
                        <SelectValue placeholder="Выберите язык" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="date-format">Формат даты</Label>
                      <p className="text-xs text-muted-foreground">Выберите предпочтительный формат даты</p>
                    </div>
                    <Select defaultValue="dd.mm.yyyy">
                      <SelectTrigger id="date-format" className="w-[180px]">
                        <SelectValue placeholder="Формат даты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd.mm.yyyy">ДД.ММ.ГГГГ</SelectItem>
                        <SelectItem value="mm.dd.yyyy">ММ.ДД.ГГГГ</SelectItem>
                        <SelectItem value="yyyy.mm.dd">ГГГГ.ММ.ДД</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Дополнительные настройки</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Анимации</Label>
                      <p className="text-xs text-muted-foreground">Включить анимации интерфейса</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode">Компактный режим</Label>
                      <p className="text-xs text-muted-foreground">Уменьшить отступы и размер элементов</p>
                    </div>
                    <Switch id="compact-mode" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving} className="ml-auto">
                {saving ? "Сохранение..." : "Сохранить настройки"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Управление настройками безопасности вашего аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Изменение пароля</h3>
                <div className="space-y-2">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Текущий пароль</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Новый пароль</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Подтверждение пароля</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button className="mt-2">Изменить пароль</Button>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Двухфакторная аутентификация</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="2fa">Двухфакторная аутентификация</Label>
                      <p className="text-xs text-muted-foreground">Повысьте безопасность аккаунта с помощью 2FA</p>
                    </div>
                    <Switch id="2fa" />
                  </div>
                  <Button variant="outline" className="mt-2">
                    Настроить 2FA
                  </Button>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Сеансы</h3>
                <div className="space-y-2">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">Текущий сеанс</p>
                        <p className="text-xs text-muted-foreground">Москва, Россия • Chrome на Windows</p>
                      </div>
                      <Badge>Активен</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Последняя активность: Сегодня, 12:45</p>
                  </div>
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">Мобильное устройство</p>
                        <p className="text-xs text-muted-foreground">Москва, Россия • Приложение на iOS</p>
                      </div>
                      <Badge variant="outline">7 дней назад</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Последняя активность: 03.04.2025, 18:30</p>
                  </div>
                  <Button variant="outline" className="mt-2">
                    Завершить все другие сеансы
                  </Button>
                </div>

                <Separator />

                <h3 className="text-lg font-medium">Удаление аккаунта</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Удаление аккаунта приведет к безвозвратной потере всех ваших данных. Эта операция не может быть
                    отменена.
                  </p>
                  <Button variant="destructive">Удалить аккаунт</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={saving} className="ml-auto">
                {saving ? "Сохранение..." : "Сохранить настройки"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
