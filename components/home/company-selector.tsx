"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import Image from "next/image"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Company = {
  id: string
  name: string
  logo: string
}

interface CompanySelectorProps {
  companies: Company[]
  selectedCompany: Company | null
  onSelect: (company: Company) => void
}

export function CompanySelector({ companies, selectedCompany, onSelect }: CompanySelectorProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedCompany ? (
            <div className="flex items-center">
              <div className="w-6 h-6 mr-2 relative overflow-hidden rounded-sm">
                <Image
                  src={selectedCompany.logo || "/placeholder.svg"}
                  alt={selectedCompany.name}
                  fill
                  className="object-cover"
                />
              </div>
              {selectedCompany.name}
            </div>
          ) : (
            "Выберите компанию"
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Поиск компании..." />
          <CommandList>
            <CommandEmpty>Компании не найдены</CommandEmpty>
            <CommandGroup>
              {companies.map((company) => (
                <CommandItem
                  key={company.id}
                  onSelect={() => {
                    onSelect(company)
                    setOpen(false)
                  }}
                  className="flex items-center"
                >
                  <div className="w-6 h-6 mr-2 relative overflow-hidden rounded-sm">
                    <Image src={company.logo || "/placeholder.svg"} alt={company.name} fill className="object-cover" />
                  </div>
                  {company.name}
                  <Check
                    className={cn("ml-auto h-4 w-4", selectedCompany?.id === company.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
