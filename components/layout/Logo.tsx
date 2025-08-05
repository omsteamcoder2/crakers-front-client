import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="relative">
        {/* Logo Image */}
        <img 
          src="/images/logo.png" // Use the path where your logo is stored
          alt="Crakers Logo"
          className="w-12 h-12 object-contain group-hover:opacity-80 transition-opacity duration-300" 
        />
        {/* Optional red dot with animation */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
      </div>
      <div className="text-white">
        <h1 className="text-2xl font-bold tracking-tight">Crakers</h1>
        <p className="text-xs text-yellow-200 -mt-1">Premium Fireworks</p>
      </div>
    </Link>
  )
}
