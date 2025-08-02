"use client"

import PageHeader from "@/components/common/PageHeader"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "Complete Guide to Diwali Fireworks Safety",
    excerpt: "Learn essential safety tips for a safe and joyful Diwali celebration with fireworks and crackers.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Rajesh Kumar",
    date: "2024-10-15",
    slug: "diwali-fireworks-safety-guide",
    category: "Safety",
  },
  {
    id: 2,
    title: "Best Fireworks for Wedding Celebrations",
    excerpt: "Discover the perfect fireworks to make your wedding day magical and memorable.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Priya Sharma",
    date: "2024-10-10",
    slug: "best-fireworks-wedding-celebrations",
    category: "Weddings",
  },
  {
    id: 3,
    title: "How to Choose the Right Gift Box for Festivals",
    excerpt: "A comprehensive guide to selecting the perfect fireworks gift box for your loved ones.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Murugan Selvam",
    date: "2024-10-05",
    slug: "choose-right-gift-box-festivals",
    category: "Gift Guides",
  },
  {
    id: 4,
    title: "Environmental Impact of Fireworks: What You Need to Know",
    excerpt: "Understanding the environmental aspects of fireworks and how to celebrate responsibly.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Dr. Lakshmi Devi",
    date: "2024-09-28",
    slug: "environmental-impact-fireworks",
    category: "Environment",
  },
  {
    id: 5,
    title: "Traditional vs Modern Fireworks: A Complete Comparison",
    excerpt: "Explore the differences between traditional and modern fireworks and their unique characteristics.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Rajesh Kumar",
    date: "2024-09-20",
    slug: "traditional-vs-modern-fireworks",
    category: "Education",
  },
  {
    id: 6,
    title: "Kids-Safe Fireworks: Fun Without the Fear",
    excerpt: "Discover safe and fun fireworks options that children can enjoy under proper supervision.",
    image: "/placeholder.svg?height=300&width=400",
    author: "Priya Sharma",
    date: "2024-09-15",
    slug: "kids-safe-fireworks-guide",
    category: "Safety",
  },
]

export default function BlogPage() {
  return (
    <div>
      <PageHeader
        title="Our Blog"
        subtitle="Tips, guides, and insights about fireworks and celebrations"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Featured</span>
                    <span className="text-gray-500 text-sm">{blogPosts[0].category}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{blogPosts[0].title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog/${blogPosts[0].slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div>
                  <Image
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group animate-[fadeInUp_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-colors text-lg font-semibold">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
