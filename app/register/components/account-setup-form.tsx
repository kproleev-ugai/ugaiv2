"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  phone: z.string().optional(),
})

type AccountSetupFormProps = {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export default function AccountSetupForm({ formData, updateFormData, onNext }: AccountSetupFormProps) {
  const [initials, setInitials] = useState<string>("JD")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: formData.name || "",
      position: formData.position || "",
      phone: formData.phone || "",
    },
  })

  useEffect(() => {
    const name = form.watch("name")
    if (name) {
      const nameParts = name.split(" ")
      let calculatedInitials = ""

      if (nameParts.length >= 2) {
        calculatedInitials = `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      } else if (nameParts.length === 1) {
        calculatedInitials = `${nameParts[0][0]}`.toUpperCase()
      }

      if (calculatedInitials) {
        setInitials(calculatedInitials)
      }
    }
  }, [form.watch("name")])

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFormData(values)
    onNext()
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm">
            Upload photo
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input placeholder="CEO / Director" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
