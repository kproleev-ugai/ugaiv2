"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Send, Bot, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AIMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIPanelProps {
  collapsed: boolean
  onToggle: () => void
}

export function AIPanel({ collapsed = false, onToggle }: AIPanelProps) {
  const [expanded, setExpanded] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: "assistant",
      content:
        "Привет! Я ваш AI-ассистент по аналитике. Я могу помочь вам с анализом данных, созданием отчетов и ответить на вопросы о ваших бизнес-показателях. Что вы хотели бы узнать?",
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Добавляем сообщение пользователя
    const userMessage: AIMessage = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Имитация ответа от AI
    setTimeout(() => {
      const aiResponse: AIMessage = {
        role: "assistant",
        content: `Я анализирую ваш запрос: "${input}". Для более точного ответа мне нужно больше данных. Вы можете уточнить период, продукты или другие параметры, которые вас интересуют?`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  if (collapsed) {
    return (
      <div className="border-l border-gray-800 bg-gray-900 w-10 flex flex-col items-center py-2">
        <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8 text-gray-400 hover:text-white">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white mt-2">
          <Bot className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "border-l border-gray-800 bg-gray-900 flex flex-col transition-all duration-300",
        expanded ? "w-1/2" : "w-80",
      )}
    >
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <div className="flex items-center">
          <Bot className="h-4 w-4 text-indigo-400 mr-2" />
          <span className="text-sm font-medium">AI Assistant</span>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            className="h-6 w-6 text-gray-400 hover:text-white"
          >
            {expanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-6 w-6 text-gray-400 hover:text-white">
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn("flex items-start gap-3", message.role === "assistant" ? "flex-row" : "flex-row-reverse")}
            >
              {message.role === "assistant" ? (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-indigo-600 text-white">AI</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-700 text-white">U</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg px-3 py-2 max-w-[80%]",
                  message.role === "assistant" ? "bg-gray-800 text-gray-200" : "bg-indigo-600 text-white",
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            placeholder="Задайте вопрос AI-ассистенту..."
            className="bg-gray-800 border-gray-700 text-gray-200"
          />
          <Button onClick={handleSendMessage} size="icon" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
