"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const departments = [
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales" },
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "finance", label: "Finance" },
  { id: "hr", label: "HR" },
  { id: "operations", label: "Operations" },
  { id: "support", label: "Support" },
  { id: "legal", label: "Legal" },
]

const formSchema = z.object({
  structureType: z.string({
    required_error: "Please select a structure type.",
  }),
  departments: z.array(z.string()).min(1, {
    message: "Please select at least one department.",
  }),
})

type StructureSetupFormProps = {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
}

export default function StructureSetupForm({ formData, updateFormData, onNext }: StructureSetupFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      structureType: formData.structureType || "",
      departments: formData.departments || [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFormData(values)
    onNext()
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="structureType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Structure Type</FormLabel>
                  <FormDescription>Select the appropriate organizational structure type</FormDescription>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select structure type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="functional">Functional</SelectItem>
                      <SelectItem value="divisional">Divisional</SelectItem>
                      <SelectItem value="matrix">Matrix</SelectItem>
                      <SelectItem value="flatStructure">Flat Structure</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departments"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Departments</FormLabel>
                    <FormDescription>Select departments that exist in your company</FormDescription>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {departments.map((department) => (
                      <FormField
                        key={department.id}
                        control={form.control}
                        name="departments"
                        render={({ field }) => {
                          return (
                            <FormItem key={department.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(department.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, department.id])
                                      : field.onChange(field.value?.filter((value) => value !== department.id))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{department.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-2">
              <Button type="submit" className="w-full">
                Complete Setup
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
