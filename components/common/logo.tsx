import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className || ""}`}>
      <div className="relative h-8 w-32 overflow-hidden">
        <Image
          src="/logo.png"
          alt="AI Strategy Solutions"
          width={128}
          height={32}
          className="object-contain"
          priority
        />
      </div>
    </Link>
  )
}

