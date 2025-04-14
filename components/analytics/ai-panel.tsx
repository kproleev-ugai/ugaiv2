"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Send, Brain, Sparkles, BarChart2, TrendingUp, LineChart } from "lucide-react"

interface AIPanelProps {
  onClose: () => void
}

export function AIPanel({ onClose }: AIPanelProps) {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!query.trim()) return

    setLoading(true)
    setResponse(null)

    // Имитация запроса к AI
    setTimeout(() => {
      setResponse(
        "На основе анализа данных за последние 3 месяца, я рекомендую увеличить инвестиции в маркетинговый канал 'Социальные сети', так как он показывает наилучшую конверсию (4.2%) и ROI (320%). Также стоит обратить внимание на сегмент 'Молодые профессионалы', который демонстрирует рост на 18% по сравнению с предыдущим периодом.",
      )
      setLoading(false)
    }, 2000)
  }

  const suggestions = [
    { icon: <BarChart2 className="h-4 w-4" />, text: "Проанализируй эффективность маркетинговых каналов" },
    { icon: <TrendingUp className="h-4 w-4" />, text: "Предскажи продажи на следующий квартал" },
    { icon: <LineChart className="h-4 w-4" />, text: "Найди аномалии в данных за последний месяц" },
    { icon: <Sparkles className="h-4 w-4" />, text: "Предложи стратегию для увеличения конверсии" },
  ]

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">AI-ассистент</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {response ? (
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <Brain className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Ответ AI-ассистента:</p>
                <p className="text-sm">{response}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Популярные запросы:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto py-2 px-3"
                  onClick={() => setQuery(suggestion.text)}
                >
                  <div className="flex items-center gap-2">
                    {suggestion.icon}
                    <span className="text-sm">{suggestion.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="relative">
          <Textarea
            placeholder="Задайте вопрос AI-ассистенту..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pr-10"
            rows={3}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 bottom-2"
            onClick={handleSubmit}
            disabled={!query.trim() || loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        AI-ассистент использует данные вашей аналитики для предоставления рекомендаций и прогнозов
      </CardFooter>
    </Card>
  )
}
