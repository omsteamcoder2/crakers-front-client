"use client"

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden">
      <section
        className="relative pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-28 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(/images/fireworks-banner.png)`,
        }}
      >
        <div className="absolute inset-0 bg-black/35"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center text-white drop-shadow-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 animate-[fadeInUp_1s_ease-out]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto animate-[fadeInUp_1s_ease-out_0.3s_both]">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Curved Bottom Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-12 sm:h-20 md:h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,160 C360,320 1080,0 1440,160 L1440,320 L0,320 Z"
            />
          </svg>
        </div>


        <style jsx>{`
          @keyframes fadeInUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </section>
    </div>
  )
}