import { cn } from "@/lib/utils"

interface WheatIconProps {
  className?: string
  color?: string
}

export function WheatIcon({ className, color = "currentColor" }: WheatIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200" className={cn("h-6 w-6", className)} fill={color}>
      <path d="M50,0 L60,20 L50,30 L40,20 Z" />
      <path d="M50,30 L65,35 L60,50 L45,45 Z" />
      <path d="M50,30 L35,35 L40,50 L55,45 Z" />
      <path d="M50,50 L65,55 L60,70 L45,65 Z" />
      <path d="M50,50 L35,55 L40,70 L55,65 Z" />
      <path d="M50,70 L65,75 L60,90 L45,85 Z" />
      <path d="M50,70 L35,75 L40,90 L55,85 Z" />
      <path d="M50,90 L65,95 L60,110 L45,105 Z" />
      <path d="M50,90 L35,95 L40,110 L55,105 Z" />
      <path d="M50,110 L50,200 C80,160 80,110 50,110 Z" />
      <path d="M50,110 L50,200 C20,160 20,110 50,110 Z" />
    </svg>
  )
}
