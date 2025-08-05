import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import FloatingButtons from "@/components/common/FloatingButtons"
import RocketAnimation from "@/components/common/RocketAnimation"
import PageLoader from "@/components/common/PageLoader" // Import PageLoader at the top of the file
import PopupAdModal from "@/components/common/PopupAdModal"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crakers - Premium Fireworks & Crackers Online",
  description:
    "Buy premium quality fireworks and crackers online. Best prices, safe delivery, and authentic products for Diwali, weddings, and celebrations.",
  keywords: "fireworks, crackers, diwali, celebration, sparklers, rockets, flower pots",
   icons: {
    icon: "/images/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <PopupAdModal/>
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingButtons />
        <RocketAnimation />
        <PageLoader /> {/* Render PageLoader right before the closing </body> tag */}
      </body>
    </html>
  )
}
