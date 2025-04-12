"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, Plus, Trash2, Save, ArrowLeft } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Название цели должно содержать не менее 5 символов",
  }),
  description: z.string().min(10, {
    message: "Описание должно содержать не менее 10 символов",
  }),
  category: z.string({
    required_error: "Пожалуйста, выберите категорию",
  }),
  owner: z.string({
    required_error: "Пожалуйста, выберите владельца",
  }),
  startDate: z.date({
    required_error: "Пожалуйста, выберите дату начала",
  }),
  endDate: z.date({
    required_error: "Пожалуйста, выберите дату окончания",
  }),
  keyResults: z
    .array(
      z.object({
        title: z.string().min(5, {
          message: "Название ключевого результата должно содержать не менее 5 символов",
        }),
        targetValue: z.string().min(1, {
          message: "Пожалуйста, укажите целевое значение",
        }),
        unit: z.string().min(1, {
          message: "Пожалуйста, укажите единицу измерения",
        }),
        startValue: z.string(),
      }),
    )
    .min(1, {
      message: "Добавьте хотя бы один ключевой результат",
    }),
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: Partial<FormValues> = {
  title: "",
  description: "",
  category: "",
  owner: "",
  keyResults: [
    {
      title: "",
      targetValue: "",
      unit: "",
      startValue: "0",
    },
  ],
}

const categories = [
  { id: "finance", name: "Финансы" },
  { id: "customers", name: "Клиенты" },
  { id: "internal", name: "Внутренние процессы" },
  { id: "learning", name: "Обучение и рост" },
]

const owners = [
  { id: "1", name: "Иван Иванов" },
  { id: "2", name: "Мария Петрова" },
  { id: "3", name: "Алексей Смирнов" },
  { id: "4", name: "Елена Козлова" },
]

export default function CreateOKRPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = form.useFieldArray({
    name: "keyResults",
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)

    try {
      // Имитация задержки сети
      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log(data)

      toast({
        title: "Цель создана",
        description: "Цель и ключевые результаты успешно созданы",
      })

      router.push("/okr")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при создании цели",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => router.push("/okr")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Создание новой цели</h2>
          <p className="text-muted-foreground">Создайте новую цель и ключевые результаты</p>
        </div>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Информация о цели</CardTitle>
              <CardDescription>Основная информация о цели</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Название цели</FormLabel>
                    <FormControl>
                      <Input placeholder="Например: Увеличить выручку на 25%" {...field} />
                    </FormControl>
                    <FormDescription>Краткое и ясное название цели</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Опишите цель подробнее..."
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Подробное описание цели и ее значимости</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Категория</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Категория цели в рамках BSC</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ответственный</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите ответственного" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {owners.map((owner) => (
                            <SelectItem key={owner.id} value={owner.id}>
                              {owner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Сотрудник, ответственный за достижение цели</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Дата начала</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "dd.MM.yyyy") : <span>Выберите дату</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Дата начала периода цели</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Дата окончания</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "dd.MM.yyyy") : <span>Выберите дату</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Дата окончания периода цели</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ключевые результаты</CardTitle>
                  <CardDescription>Измеримые результаты для достижения цели</CardDescription>
                </div>
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      title: "",
                      targetValue: "",
                      unit: "",
                      startValue: "0",
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить результат
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-md relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      if (fields.length > 1) {
                        remove(index)
                      } else {
                        toast({
                          variant: "destructive",
                          title: "Ошибка",
                          description: "Должен быть хотя бы один ключевой результат",
                        })
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <FormField
                    control={form.control}
                    name={`keyResults.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название результата</FormLabel>
                        <FormControl>
                          <Input placeholder="Например: Достичь объема продаж в 1 млн рублей" {...field} />
                        </FormControl>
                        <FormDescription>Что именно нужно достичь</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`keyResults.${index}.startValue`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Начальное значение</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormDescription>Текущее значение показателя</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`keyResults.${index}.targetValue`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Целевое значение</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="100" {...field} />
                          </FormControl>
                          <FormDescription>Значение, которое нужно достичь</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`keyResults.${index}.unit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Единица измерения</FormLabel>
                          <FormControl>
                            <Input placeholder="Например: рублей, штук, процентов" {...field} />
                          </FormControl>
                          <FormDescription>В чем измеряется результат</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}

              {form.formState.errors.keyResults?.message && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.keyResults?.message}</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/okr")}>
                Отмена
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Сохранение..."
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Создать цель
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
