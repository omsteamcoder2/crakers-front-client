import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <Sparkles className="w-8 h-8 text-yellow-300 group-hover:text-white transition-colors duration-300" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </div>
      <div className="text-white">
        <h1 className="text-2xl font-bold tracking-tight">Crakers</h1>
        <p className="text-xs text-yellow-200 -mt-1">Premium Fireworks</p>
      </div>
    </Link>
  )
}
