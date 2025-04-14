"use client"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronDown, Filter, Save, Clock, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface FilterSet {
  id: string
  name: string
  filters: {
    dateRange: DateRange | undefined
    period: string
    type: string
    view: string
    branch: string
    product: string
    category: string
    manager: string
  }
}

interface FilterBarProps {
  onClose?: () => void
}

export function FilterBar({ onClose }: FilterBarProps) {
  const { toast } = useToast()
  const [expanded, setExpanded] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [filterSetName, setFilterSetName] = useState("")
  const [savedFilterSets, setSavedFilterSets] = useState<FilterSet[]>([])

  // Состояние для диапазона дат
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  // Состояние фильтров
  const [filters, setFilters] = useState({
    dateRange: date,
    period: "weekly",
    type: "all",
    view: "chart",
    branch: "all",
    product: "all",
    category: "all",
    manager: "all",
    source: "",
    campaign: "",
    device: "",
    country: "",
    showBots: false,
  })

  // Загрузка сохраненных фильтров из localStorage при монтировании
  useEffect(() => {
    const savedFilters = localStorage.getItem("savedFilterSets")
    if (savedFilters) {
      setSavedFilterSets(JSON.parse(savedFilters))
    }
  }, [])

  // Сохранение фильтров в localStorage при изменении
  useEffect(() => {
    if (savedFilterSets.length > 0) {
      localStorage.setItem("savedFilterSets", JSON.stringify(savedFilterSets))
    }
  }, [savedFilterSets])

  // Обновление фильтров при изменении диапазона дат
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      dateRange: date,
    }))
  }, [date])

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const saveFilterSet = () => {
    if (!filterSetName.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название для набора фильтров",
        variant: "destructive",
      })
      return
    }

    const newFilterSet: FilterSet = {
      id: Date.now().toString(),
      name: filterSetName,
      filters: { ...filters },
    }

    setSavedFilterSets((prev) => [...prev, newFilterSet])
    setFilterSetName("")
    setSaveDialogOpen(false)

    toast({
      title: "Фильтры сохранены",
      description: `Набор фильтров "${filterSetName}" успешно сохранен`,
    })
  }

  const loadFilterSet = (filterSet: FilterSet) => {
    setFilters(filterSet.filters)
    if (filterSet.filters.dateRange) {
      setDate(filterSet.filters.dateRange)
    }

    toast({
      title: "Фильтры загружены",
      description: `Набор фильтров "${filterSet.name}" применен`,
    })
  }

  const deleteFilterSet = (id: string, name: string) => {
    setSavedFilterSets((prev) => prev.filter((set) => set.id !== id))

    toast({
      title: "Фильтры удалены",
      description: `Набор фильтров "${name}" удален`,
    })
  }

  const resetFilters = () => {
    setFilters({
      dateRange: {
        from: new Date(),
        to: addDays(new Date(), 7),
      },
      period: "weekly",
      type: "all",
      view: "chart",
      branch: "all",
      product: "all",
      category: "all",
      manager: "all",
      source: "",
      campaign: "",
      device: "",
      country: "",
      showBots: false,
    })
    setDate({
      from: new Date(),
      to: addDays(new Date(), 7),
    })

    toast({
      title: "Фильтры сброшены",
      description: "Все фильтры сброшены до значений по умолчанию",
    })
  }

  const countActiveFilters = () => {
    const defaultFilters = {
      period: "weekly",
      type: "all",
      view: "chart",
      branch: "all",
      product: "all",
      category: "all",
      manager: "all",
    }

    return Object.entries(filters).filter(([key, value]) => {
      if (key === "dateRange") return false // Не считаем dateRange как активный фильтр
      return value !== defaultFilters[key as keyof typeof defaultFilters]
    }).length
  }

  const activeFiltersCount = countActiveFilters()

  const handleReset = () => {
    setFilters({
      ...filters,
      source: "",
      campaign: "",
      device: "",
      country: "",
      showBots: false,
    })
  }

  const handleApply = () => {
    // Применение фильтров
    console.log("Applied filters:", filters)
    onClose && onClose()
  }

  return (
    <div className="border-b bg-gray-950 dark:bg-gray-950 p-1 relative">
      <div className="absolute right-1 top-1 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-5 px-1 text-xs text-gray-400 hover:text-white"
        >
          {collapsed ? "Expand" : "Collapse"}
          <ChevronDown className={cn("ml-1 h-2.5 w-2.5 transition-transform", collapsed ? "rotate-180" : "")} />
        </Button>
      </div>

      {!collapsed && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="text-xs font-medium text-gray-300">Filters</div>
              {activeFiltersCount > 0 && (
                <Badge variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-xs px-1 py-0 h-4">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-1 mr-8">
              <div className="flex items-center gap-1">
                {/* Диапазон дат */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-6 px-2 text-xs bg-gray-900 border-gray-800 text-gray-300">
                      <Calendar className="h-3 w-3 mr-1" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "dd.MM")} - {format(date.to, "dd.MM")}
                          </>
                        ) : (
                          format(date.from, "dd.MM.yyyy")
                        )
                      ) : (
                        "Выберите дату"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800" align="start">
                    <DatePickerWithRange date={date} setDate={setDate} />
                  </PopoverContent>
                </Popover>

                <Select value={filters.period} onValueChange={(value) => handleFilterChange("period", value)}>
                  <SelectTrigger className="w-[80px] h-6 text-xs bg-gray-900 border-gray-800 text-gray-300">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800 text-gray-300">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
                  <SelectTrigger className="w-[80px] h-6 text-xs bg-gray-900 border-gray-800 text-gray-300">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800 text-gray-300">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="traffic">Traffic</SelectItem>
                    <SelectItem value="conversion">Conversion</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.view} onValueChange={(value) => handleFilterChange("view", value)}>
                  <SelectTrigger className="w-[80px] h-6 text-xs bg-gray-900 border-gray-800 text-gray-300">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800 text-gray-300">
                    <SelectItem value="chart">Chart</SelectItem>
                    <SelectItem value="table">Table</SelectItem>
                    <SelectItem value="cards">Cards</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Search className="absolute left-2 top-1.5 h-3 w-3 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search"
                  className="w-[100px] pl-6 h-6 rounded-full text-xs bg-gray-900 border-gray-800 text-gray-300 focus:border-gray-700"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-gray-400 hover:text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-xs">Saved</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-gray-300">
                  <DropdownMenuLabel>Saved Filters</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  {savedFilterSets.length === 0 ? (
                    <DropdownMenuItem disabled>No saved filters</DropdownMenuItem>
                  ) : (
                    savedFilterSets.map((filterSet) => (
                      <DropdownMenuItem key={filterSet.id} className="flex justify-between items-center">
                        <span onClick={() => loadFilterSet(filterSet)} className="flex-1 cursor-pointer">
                          {filterSet.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteFilterSet(filterSet.id, filterSet.name)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </DropdownMenuItem>
                    ))
                  )}
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem onClick={() => setSaveDialogOpen(true)}>
                    <Save className="h-3 w-3 mr-2" />
                    Save current filters
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={resetFilters}>
                    <X className="h-3 w-3 mr-2" />
                    Reset all filters
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="h-6 w-6 p-0 text-gray-400 hover:text-white"
              >
                <Filter className="h-3 w-3" />
              </Button>
            </div>
          </div>

          <div className={cn("mt-2 grid grid-cols-4 gap-2", expanded ? "block" : "hidden")}>
            <Select value={filters.branch} onValueChange={(value) => handleFilterChange("branch", value)}>
              <SelectTrigger className="h-7 text-xs bg-gray-900 border-gray-800 text-gray-300">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800 text-gray-300">
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="moscow">Moscow</SelectItem>
                <SelectItem value="spb">Saint Petersburg</SelectItem>
                <SelectItem value="kazan">Kazan</SelectItem>
                <SelectItem value="novosibirsk">Novosibirsk</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.product} onValueChange={(value) => handleFilterChange("product", value)}>
              <SelectTrigger className="h-7 text-xs bg-gray-900 border-gray-800 text-gray-300">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800 text-gray-300">
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="course1">Programming Basics</SelectItem>
                <SelectItem value="course2">Web Development</SelectItem>
                <SelectItem value="course3">Data Science</SelectItem>
                <SelectItem value="course4">Mobile Development</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger className="h-7 text-xs bg-gray-900 border-gray-800 text-gray-300">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800 text-gray-300">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.manager} onValueChange={(value) => handleFilterChange("manager", value)}>
              <SelectTrigger className="h-7 text-xs bg-gray-900 border-gray-800 text-gray-300">
                <SelectValue placeholder="Manager" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800 text-gray-300">
                <SelectItem value="all">All Managers</SelectItem>
                <SelectItem value="manager1">Ivan Petrov</SelectItem>
                <SelectItem value="manager2">Anna Ivanova</SelectItem>
                <SelectItem value="manager3">Sergey Smirnov</SelectItem>
                <SelectItem value="manager4">Elena Kozlova</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Дополнительные Фильтры</CardTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Источник</Label>
                  <Select value={filters.source} onValueChange={(value) => setFilters({ ...filters, source: value })}>
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Выберите источник" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все источники</SelectItem>
                      <SelectItem value="organic">Органический поиск</SelectItem>
                      <SelectItem value="direct">Прямые переходы</SelectItem>
                      <SelectItem value="referral">Реферальные ссылки</SelectItem>
                      <SelectItem value="social">Социальные сети</SelectItem>
                      <SelectItem value="email">Email-рассылки</SelectItem>
                      <SelectItem value="paid">Платная реклама</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="campaign">Кампания</Label>
                  <Input
                    id="campaign"
                    placeholder="Название кампании"
                    value={filters.campaign}
                    onChange={(e) => setFilters({ ...filters, campaign: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="device">Устройство</Label>
                  <Select value={filters.device} onValueChange={(value) => setFilters({ ...filters, device: value })}>
                    <SelectTrigger id="device">
                      <SelectValue placeholder="Выберите устройство" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все устройства</SelectItem>
                      <SelectItem value="desktop">Десктоп</SelectItem>
                      <SelectItem value="mobile">Мобильные</SelectItem>
                      <SelectItem value="tablet">Планшеты</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Страна</Label>
                  <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Выберите страну" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все страны</SelectItem>
                      <SelectItem value="ru">Россия</SelectItem>
                      <SelectItem value="us">США</SelectItem>
                      <SelectItem value="gb">Великобритания</SelectItem>
                      <SelectItem value="de">Германия</SelectItem>
                      <SelectItem value="fr">Франция</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="showBots"
                  checked={filters.showBots}
                  onCheckedChange={(checked) => setFilters({ ...filters, showBots: !!checked })}
                />
                <Label htmlFor="showBots">Показывать ботов</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleReset}>
                Сбросить
              </Button>
              <Button onClick={handleApply}>Применить</Button>
            </CardFooter>
          </Card>
        </>
      )}

      {/* Диалог сохранения фильтров */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800 text-gray-300">
          <DialogHeader>
            <DialogTitle>Save Filter Set</DialogTitle>
            <DialogDescription className="text-gray-400">
              Give your filter set a name to save it for future use.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm">
                Name
              </label>
              <Input
                id="name"
                value={filterSetName}
                onChange={(e) => setFilterSetName(e.target.value)}
                className="col-span-3 bg-gray-800 border-gray-700 text-gray-300"
                placeholder="My Filter Set"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSaveDialogOpen(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button onClick={saveFilterSet} className="bg-indigo-600 hover:bg-indigo-700">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
