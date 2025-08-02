import PageHeader from "@/components/common/PageHeader"
import ProductCard from "@/components/common/ProductCard"

const products = [
  {
    id: "1",
    name: "Premium Ground Chakra",
    price: 299,
    image: "/placeholder.svg?height=300&width=300",
    description: "Beautiful spinning wheel with vibrant colors",
    category: "ground-chakras",
    slug: "premium-ground-chakra",
  },
  {
    id: "2",
    name: "Golden Flower Pot",
    price: 199,
    image: "/placeholder.svg?height=300&width=300",
    description: "Stunning fountain effect with golden sparks",
    category: "flower-pots",
    slug: "golden-flower-pot",
  },
  {
    id: "3",
    name: "Electric Sparklers (10 pcs)",
    price: 149,
    image: "/placeholder.svg?height=300&width=300",
    description: "Long-lasting sparklers perfect for celebrations",
    category: "sparklers",
    slug: "electric-sparklers",
  },
  {
    id: "4",
    name: "Sky Rocket Deluxe",
    price: 399,
    image: "/placeholder.svg?height=300&width=300",
    description: "High-flying rocket with spectacular burst",
    category: "rockets",
    slug: "sky-rocket-deluxe",
  },
  {
    id: "5",
    name: "Family Gift Box",
    price: 1999,
    image: "/placeholder.svg?height=300&width=300",
    description: "Complete family pack with assorted fireworks",
    category: "gift-boxes",
    slug: "family-gift-box",
  },
  {
    id: "6",
    name: "Kids Safe Crackers",
    price: 299,
    image: "/placeholder.svg?height=300&width=300",
    description: "Safe and fun crackers designed for children",
    category: "kids-favourites",
    slug: "kids-safe-crackers",
  },
  {
    id: "7",
    name: "Rainbow Fountain",
    price: 249,
    image: "/placeholder.svg?height=300&width=300",
    description: "Multi-colored fountain with rainbow effects",
    category: "flower-pots",
    slug: "rainbow-fountain",
  },
  {
    id: "8",
    name: "Thunder Bomb",
    price: 199,
    image: "/placeholder.svg?height=300&width=300",
    description: "Loud sound cracker for grand celebrations",
    category: "sound-crackers",
    slug: "thunder-bomb",
  },
]

export default function ProductsPage() {
  return (
    <div>
      <PageHeader
        title="Our Products"
        subtitle="Discover our wide range of premium fireworks and crackers"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors">
                All Products
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition-colors">
                Ground Chakras
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition-colors">
                Flower Pots
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition-colors">
                Sparklers
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition-colors">
                Gift Boxes
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-colors text-lg font-semibold">
              Load More Products
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
