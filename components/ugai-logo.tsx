import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface UGAILogoProps {
  variant?: "default" | "full" | "vertical"
  className?: string
  size?: "sm" | "md" | "lg"
  href?: string
}

export function UGAILogo({ variant = "default", className, size = "md", href = "/landing" }: UGAILogoProps) {
  const logoSrc =
    variant === "default" ? "/ugai-logo.png" : variant === "full" ? "/ugai-logo-full.png" : "/ugai-logo-vertical.png"

  const sizeMap = {
    sm: variant === "default" ? 32 : variant === "full" ? 120 : 80,
    md: variant === "default" ? 48 : variant === "full" ? 180 : 120,
    lg: variant === "default" ? 64 : variant === "full" ? 240 : 160,
  }

  const heightMap = {
    sm: variant === "default" ? 32 : variant === "full" ? 40 : 80,
    md: variant === "default" ? 48 : variant === "full" ? 60 : 120,
    lg: variant === "default" ? 64 : variant === "full" ? 80 : 160,
  }

  const width = sizeMap[size]
  const height = heightMap[size]

  const logo = (
    <Image
      src={logoSrc || "/placeholder.svg"}
      alt="UGAI Logo"
      width={width}
      height={height}
      className={cn("object-contain", className)}
      priority
    />
  )

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        {logo}
      </Link>
    )
  }

  return logo
}
