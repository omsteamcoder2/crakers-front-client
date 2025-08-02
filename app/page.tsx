import Hero from "@/components/sections/Hero"
import Categories from "@/components/sections/Categories"
import Offers from "@/components/sections/Offers"
import Services from "@/components/sections/Services"
import Testimonials from "@/components/sections/Testimonials"
import WhatsAppCTA from "@/components/sections/WhatsAppCTA"

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Categories />
      <Offers />
      <Services />
      <Testimonials />
      <WhatsAppCTA />
    </div>
  )
}
