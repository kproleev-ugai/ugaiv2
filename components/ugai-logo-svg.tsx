import { cn } from "@/lib/utils"
import Link from "next/link"

interface UGAILogoSVGProps {
  variant?: "default" | "full" | "vertical"
  className?: string
  color?: string
  secondaryColor?: string
  href?: string
}

export function UGAILogoSVG({
  variant = "default",
  className,
  color = "currentColor",
  secondaryColor = "#3742c2",
  href,
}: UGAILogoSVGProps) {
  const logoContent = (
    <svg
      viewBox={variant === "default" ? "0 0 200 200" : variant === "full" ? "0 0 500 200" : "0 0 300 300"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-auto", className)}
      aria-label="UGAI Logo"
    >
      {variant === "default" && (
        <>
          {/* U with wheat symbol */}
          <path d="M50,10 C50,10 50,10 50,10 L60,30 L50,40 L40,30 Z" fill={color} />
          <path d="M50,40 L65,45 L60,60 L45,55 Z" fill={color} />
          <path d="M50,40 L35,45 L40,60 L55,55 Z" fill={color} />
          <path d="M50,60 L65,65 L60,80 L45,75 Z" fill={color} />
          <path d="M50,60 L35,65 L40,80 L55,75 Z" fill={color} />
          <path d="M50,80 L65,85 L60,100 L45,95 Z" fill={color} />
          <path d="M50,80 L35,85 L40,100 L55,95 Z" fill={color} />
          <path
            d="M50,100 C80,100 100,130 100,170 C100,190 80,190 50,190 C20,190 0,190 0,170 C0,130 20,100 50,100 Z"
            fill={color}
          />
        </>
      )}

      {variant === "full" && (
        <>
          {/* U with wheat symbol */}
          <path d="M50,10 C50,10 50,10 50,10 L60,30 L50,40 L40,30 Z" fill={color} />
          <path d="M50,40 L65,45 L60,60 L45,55 Z" fill={color} />
          <path d="M50,40 L35,45 L40,60 L55,55 Z" fill={color} />
          <path d="M50,60 L65,65 L60,80 L45,75 Z" fill={color} />
          <path d="M50,60 L35,65 L40,80 L55,75 Z" fill={color} />
          <path d="M50,80 L65,85 L60,100 L45,95 Z" fill={color} />
          <path d="M50,80 L35,85 L40,100 L55,95 Z" fill={color} />
          <path
            d="M50,100 C80,100 100,130 100,170 C100,190 80,190 50,190 C20,190 0,190 0,170 C0,130 20,100 50,100 Z"
            fill={color}
          />

          {/* G */}
          <path
            d="M200,100 C200,60 230,40 270,40 C310,40 340,60 340,100 L340,140 L270,140 L270,120 L320,120 L320,100 C320,70 300,60 270,60 C240,60 220,70 220,100 C220,130 240,140 270,140 L270,160 C230,160 200,140 200,100 Z"
            fill={color}
          />

          {/* A */}
          <path
            d="M360,160 L400,40 L440,160 L420,160 L410,130 L390,130 L380,160 L360,160 Z M395,70 L385,110 L415,110 L405,70 L395,70 Z"
            fill={color}
          />

          {/* I */}
          <path d="M460,40 L480,40 L480,160 L460,160 L460,40 Z" fill={color} />

          {/* STRATEGY SOLUTIONS text */}
          <text x="150" y="190" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill={color}>
            STRATEGY SOLUTIONS
          </text>

          {/* artificial intelligence text */}
          <text x="150" y="210" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill={secondaryColor}>
            artificial intelligence
          </text>
        </>
      )}

      {variant === "vertical" && (
        <>
          {/* U with wheat symbol */}
          <path d="M150,10 C150,10 150,10 150,10 L160,30 L150,40 L140,30 Z" fill={color} />
          <path d="M150,40 L165,45 L160,60 L145,55 Z" fill={color} />
          <path d="M150,40 L135,45 L140,60 L155,55 Z" fill={color} />
          <path d="M150,60 L165,65 L160,80 L145,75 Z" fill={color} />
          <path d="M150,60 L135,65 L140,80 L155,75 Z" fill={color} />
          <path d="M150,80 L165,85 L160,100 L145,95 Z" fill={color} />
          <path d="M150,80 L135,85 L140,100 L155,95 Z" fill={color} />
          <path
            d="M150,100 C180,100 200,130 200,170 C200,190 180,190 150,190 C120,190 100,190 100,170 C100,130 120,100 150,100 Z"
            fill={color}
          />

          {/* AI text */}
          <text x="100" y="230" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill={secondaryColor}>
            AI
          </text>

          {/* STRATEGY SOLUTIONS text */}
          <text
            x="150"
            y="230"
            fontFamily="Arial, sans-serif"
            fontSize="24"
            fontWeight="bold"
            fill={color}
            textAnchor="start"
          >
            STRATEGY
          </text>
          <text
            x="150"
            y="260"
            fontFamily="Arial, sans-serif"
            fontSize="24"
            fontWeight="bold"
            fill={color}
            textAnchor="start"
          >
            SOLUTIONS
          </text>
        </>
      )}
    </svg>
  )

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        {logoContent}
      </Link>
    )
  }

  return logoContent
}
