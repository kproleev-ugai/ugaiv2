"use client"

import { useState } from "react"
import { Check, ChevronDown, FolderOpen } from "lucide-react"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type Project = {
  id: string
  name: string
  category: string
}

interface ProjectSelectorProps {
  projects: Project[]
  selectedProject: Project | null
  onSelect: (project: Project) => void
  disabled?: boolean
}

export function ProjectSelector({ projects, selectedProject, onSelect, disabled = false }: ProjectSelectorProps) {
  const [open, setOpen] = useState(false)

  // Группируем проекты по категориям
  const groupedProjects = projects.reduce(
    (acc, project) => {
      if (!acc[project.category]) {
        acc[project.category] = []
      }
      acc[project.category].push(project)
      return acc
    },
    {} as Record<string, Project[]>,
  )

  return (
    <Popover open={open && !disabled} onOpenChange={(o) => !disabled && setOpen(o)}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selectedProject ? (
            <div className="flex items-center">
              <FolderOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              {selectedProject.name}
              <Badge variant="outline" className="ml-2 text-xs">
                {selectedProject.category}
              </Badge>
            </div>
          ) : (
            "Выберите проект"
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Поиск проекта..." />
          <CommandList>
            <CommandEmpty>Проекты не найдены</CommandEmpty>
            {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
              <CommandGroup key={category} heading={category}>
                {categoryProjects.map((project) => (
                  <CommandItem
                    key={project.id}
                    onSelect={() => {
                      onSelect(project)
                      setOpen(false)
                    }}
                  >
                    <FolderOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    {project.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedProject?.id === project.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
