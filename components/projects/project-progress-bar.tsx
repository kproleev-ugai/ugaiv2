import { cn } from "@/lib/utils"

interface ProjectProgressBarProps {
  progress: number
  className?: string
}

export function ProjectProgressBar({ progress, className }: ProjectProgressBarProps) {
  // Определение цвета прогресс-бара в зависимости от прогресса
  const getProgressColor = (value: number) => {
    if (value < 25) return "bg-red-500"
    if (value < 50) return "bg-amber-500"
    if (value < 75) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <div className={cn("w-full h-2 bg-muted rounded-full overflow-hidden", className)}>
      <div className={cn("h-full rounded-full", getProgressColor(progress))} style={{ width: `${progress}%` }} />
    </div>
  )
}
