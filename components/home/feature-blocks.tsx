import Link from "next/link"
import { BarChart3, CalendarDays, LineChart, ListTodo, Target } from "lucide-react"

interface FeatureBlocksProps {
  clientId: string
}

export function FeatureBlocks({ clientId }: FeatureBlocksProps) {
  const features = [
    {
      title: "Аналитика",
      description: "Анализ бизнес-показателей и визуализация данных",
      icon: BarChart3,
      href: `/${clientId}/analytics`,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      subfeatures: [
        { name: "Основной дашборд", href: `/${clientId}/analytics/maindashboard`, icon: LineChart },
        { name: "Маркетинг", href: `/${clientId}/analytics/marketing`, icon: BarChart3 },
      ],
    },
    {
      title: "OKR и KPI",
      description: "Управление целями и ключевыми показателями эффективности",
      icon: Target,
      href: `/${clientId}/okr`,
      color: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      subfeatures: [
        { name: "Цели компании", href: `/${clientId}/okr/company`, icon: Target },
        { name: "Личные цели", href: `/${clientId}/okr/personal`, icon: Target },
      ],
    },
    {
      title: "Календарь",
      description: "Планирование и управление временем",
      icon: CalendarDays,
      href: `/${clientId}/calendar`,
      color: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      subfeatures: [
        { name: "События", href: `/${clientId}/calendar/events`, icon: CalendarDays },
        { name: "Регламенты", href: `/${clientId}/calendar/regulations`, icon: CalendarDays },
      ],
    },
    {
      title: "Задачи",
      description: "Управление задачами и проектами",
      icon: ListTodo,
      href: `/${clientId}/tasks`,
      color: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
      subfeatures: [
        { name: "Канбан", href: `/${clientId}/tasks/kanban`, icon: ListTodo },
        { name: "Мои задачи", href: `/${clientId}/tasks/my`, icon: ListTodo },
      ],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature) => (
        <div key={feature.title} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${feature.color}`}>
              <feature.icon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">
                <Link href={feature.href} className="hover:underline">
                  {feature.title}
                </Link>
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>

              <div className="pt-4 space-y-2">
                {feature.subfeatures.map((subfeature) => (
                  <Link
                    key={subfeature.href}
                    href={subfeature.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <subfeature.icon className="h-4 w-4" />
                    {subfeature.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
