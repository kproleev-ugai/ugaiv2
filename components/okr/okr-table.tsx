"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, ChevronDown, ChevronUp } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { OKR } from "@/types/index"

export function OKRTable() {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})

  // Демо-данные
  const okrs: OKR[] = [
    {
      id: 1,
      objective: "Увеличить доход компании на 20%",
      progress: 75,
      keyResults: [
        {
          id: 1,
          title: "Привлечь 50 новых клиентов",
          progress: 80,
          target: 50,
          current: 40,
          unit: "клиентов",
        },
        {
          id: 2,
          title: "Увеличить средний чек на 15%",
          progress: 60,
          target: 15,
          current: 9,
          unit: "%",
        },
        {
          id: 3,
          title: "Запустить 3 новых продукта",
          progress: 100,
          target: 3,
          current: 3,
          unit: "продукта",
        },
      ],
      owner: "Иван Петров",
      quarter: "Q2 2023",
    },
    {
      id: 2,
      objective: "Повысить удовлетворенность клиентов",
      progress: 45,
      keyResults: [
        {
          id: 4,
          title: "Достичь NPS 8.5",
          progress: 70,
          target: 8.5,
          current: 7.8,
          unit: "баллов",
        },
        {
          id: 5,
          title: "Снизить время ответа на запросы до 2 часов",
          progress: 30,
          target: 2,
          current: 4.5,
          unit: "часов",
        },
        {
          id: 6,
          title: "Внедрить систему обратной связи",
          progress: 20,
          target: 100,
          current: 20,
          unit: "%",
        },
      ],
      owner: "Мария Иванова",
      quarter: "Q2 2023",
    },
    {
      id: 3,
      objective: "Оптимизировать внутренние процессы",
      progress: 90,
      keyResults: [
        {
          id: 7,
          title: "Автоматизировать 5 рутинных процессов",
          progress: 100,
          target: 5,
          current: 5,
          unit: "процессов",
        },
        {
          id: 8,
          title: "Сократить время на согласование документов на 30%",
          progress: 80,
          target: 30,
          current: 24,
          unit: "%",
        },
      ],
      owner: "Алексей Смирнов",
      quarter: "Q2 2023",
    },
  ]

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getStatusBadge = (progress: number) => {
    if (progress >= 90) {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          На цели
        </Badge>
      )
    } else if (progress >= 60) {
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
          В процессе
        </Badge>
      )
    } else if (progress >= 30) {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          Под угрозой
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
          Отстает
        </Badge>
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Цели и ключевые результаты</CardTitle>
        <CardDescription>Отслеживание прогресса по целям компании</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Цель</TableHead>
              <TableHead>Владелец</TableHead>
              <TableHead>Квартал</TableHead>
              <TableHead>Прогресс</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {okrs.map((okr) => (
              <>
                <TableRow key={okr.id} className="cursor-pointer" onClick={() => toggleRow(okr.id)}>
                  <TableCell>
                    {expandedRows[okr.id] ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{okr.objective}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={okr.owner} />
                        <AvatarFallback>
                          {okr.owner
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{okr.owner}</span>
                    </div>
                  </TableCell>
                  <TableCell>{okr.quarter}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={okr.progress} className="h-2 w-[100px]" />
                      <span className="text-sm">{okr.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(okr.progress)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Меню</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Редактировать</DropdownMenuItem>
                        <DropdownMenuItem>Поделиться</DropdownMenuItem>
                        <DropdownMenuItem>Архивировать</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                {expandedRows[okr.id] && (
                  <TableRow>
                    <TableCell colSpan={7} className="bg-muted/50 p-0">
                      <div className="p-4">
                        <h4 className="font-medium mb-2">Ключевые результаты:</h4>
                        <div className="space-y-4">
                          {okr.keyResults.map((kr) => (
                            <div key={kr.id} className="flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <span>{kr.title}</span>
                                <span className="text-sm">
                                  {kr.current} / {kr.target} {kr.unit}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Progress value={kr.progress} className="h-2 flex-1" />
                                <span className="text-sm">{kr.progress}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

