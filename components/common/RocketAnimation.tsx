"use client"

import { useEffect, useState } from "react"

interface Rocket {
  id: number
  delay: number
  startX: number
  startY: number
  endX: number
  endY: number
  color: string
  trailColor: string
  burstColor: string
  trajectory: string
}

export default function RocketAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const [rockets, setRockets] = useState<Rocket[]>([])

  const colors = [
    { rocket: "from-red-500 to-yellow-400", trail: "from-orange-400", burst: "red" },
    { rocket: "from-blue-500 to-cyan-400", trail: "from-blue-400", burst: "blue" },
    { rocket: "from-green-500 to-lime-400", trail: "from-green-400", burst: "green" },
    { rocket: "from-purple-500 to-pink-400", trail: "from-purple-400", burst: "purple" },
    { rocket: "from-orange-500 to-red-400", trail: "from-red-400", burst: "orange" },
  ]

  const generateRockets = (): Rocket[] => {
    return Array.from({ length: 5 }, (_, i) => {
      const colorSet = colors[i % colors.length]
      const startPositions = [
        { x: 10, y: 100 }, // bottom-left
        { x: 25, y: 100 }, // bottom-left-center
        { x: 50, y: 100 }, // bottom-center
        { x: 75, y: 100 }, // bottom-right-center
        { x: 90, y: 100 }, // bottom-right
      ]

      const startPos = startPositions[i]
      const endX = Math.random() * 60 + 20 // 20% to 80% across screen
      const endY = Math.random() * 30 + 10 // 10% to 40% from top

      return {
        id: i,
        delay: Math.random() * 3000 + 500, // 0.5s to 3.5s delay
        startX: startPos.x,
        startY: startPos.y,
        endX,
        endY,
        color: colorSet.rocket,
        trailColor: colorSet.trail,
        burstColor: colorSet.burst,
        trajectory: `rocket-path-${i}`,
      }
    })
  }

  useEffect(() => {
    const startAnimation = () => {
      const newRockets = generateRockets()
      setRockets(newRockets)
      setIsVisible(true)

      // Hide animation after 8 seconds
      setTimeout(() => setIsVisible(false), 8000)
    }

    // Start first animation after 2 seconds
    const initialTimeout = setTimeout(startAnimation, 2000)

    // Repeat every 12 seconds
    const interval = setInterval(startAnimation, 13000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {rockets.map((rocket) => (
        <div key={rocket.id}>
          {/* Rocket */}
          {/* <div
            className={`absolute w-1 h-5 bg-gradient-to-t ${rocket.color} rounded-t-full shadow-lg`}
            style={{
              left: `${rocket.startX}%`,
              bottom: `${100 - rocket.startY}%`,
              animation: `${rocket.trajectory} 4s ease-out forwards`,
              animationDelay: `${rocket.delay}ms`,
            }}
          >
            Rocket Fins
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-gray-600 rounded-b-sm"></div>
            </div>

            Rocket Nose
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-silver rounded-full"></div>
          </div> */}

          {/* Spark Trail */}
          {/* <div
            className={`absolute`}
            style={{
              left: `${rocket.startX}%`,
              bottom: `${100 - rocket.startY}%`,
              animation: `trail-${rocket.id} 4s ease-out forwards`,
              animationDelay: `${rocket.delay}ms`,
            }}
          >
            <div className={`w-1 h-12 bg-gradient-to-t ${rocket.trailColor} to-transparent animate-pulse`}></div>

            <div
              className={`absolute -left-1 bottom-2 w-1 h-6 bg-gradient-to-t ${rocket.trailColor} to-transparent animate-pulse`}
              style={{ animationDelay: "100ms" }}
            ></div>
            <div
              className={`absolute -right-1 bottom-1 w-1 h-8 bg-gradient-to-t ${rocket.trailColor} to-transparent animate-pulse`}
              style={{ animationDelay: "200ms" }}
            ></div>

            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-${rocket.burstColor}-400 rounded-full animate-pulse`}
                style={{
                  left: `${Math.random() * 8 - 4}px`,
                  bottom: `${Math.random() * 20 + 5}px`,
                  animationDelay: `${Math.random() * 300}ms`,
                }}
              ></div>
            ))}
          </div> */}

{/* burst */}
          <div
            className={`absolute opacity-0`}
            style={{
              left: `${rocket.endX}%`,
              top: `${rocket.endY}%`,
              animation: `burst-${rocket.id} 1.5s ease-out 3.5s forwards`,
              animationDelay: `${rocket.delay}ms`,
            }}
          >
            <div
              className={`absolute top-1/2 left-1/2 w-6 h-6 bg-${rocket.burstColor}-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping`}
            ></div>
            <div
              className={`absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse`}
            ></div>

            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className={`absolute top-1/2 left-1/2 w-1 h-16 bg-gradient-to-t from-${rocket.burstColor}-400 via-${rocket.burstColor}-300 to-transparent origin-bottom animate-pulse`}
                style={{
                  transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                  animationDelay: `${i * 50}ms`,
                }}
              ></div>
            ))}

            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={`particle-${i}`}
                className={`absolute w-2 h-2 bg-${rocket.burstColor}-300 rounded-full animate-bounce`}
                style={{
                  left: `${Math.cos((i * 18 * Math.PI) / 180) * 40 + 20}px`,
                  top: `${Math.sin((i * 18 * Math.PI) / 180) * 40 + 20}px`,
                  animationDelay: `${i * 30}ms`,
                  animationDuration: "0.8s",
                }}
              ></div>
            ))}

            <div
              className={`absolute top-1/2 left-1/2 w-24 h-24 border-4 border-${rocket.burstColor}-300 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping opacity-60`}
              style={{ animationDelay: "200ms" }}
            ></div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes rocket-path-0 {
          0% {
            transform: translateY(0) translateX(0) rotate(15deg);
            opacity: 1;
          }
          70% {
            transform: translateY(-70vh) translateX(10vw) rotate(15deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-70vh) translateX(10vw) rotate(15deg);
            opacity: 0;
          }
        }
        
        @keyframes rocket-path-1 {
          0% {
            transform: translateY(0) translateX(0) rotate(-10deg);
            opacity: 1;
          }
          70% {
            transform: translateY(-75vh) translateX(15vw) rotate(-10deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-75vh) translateX(15vw) rotate(-10deg);
            opacity: 0;
          }
        }
        
        @keyframes rocket-path-2 {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          70% {
            transform: translateY(-80vh) translateX(0vw) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-80vh) translateX(0vw) rotate(0deg);
            opacity: 0;
          }
        }
        
        @keyframes rocket-path-3 {
          0% {
            transform: translateY(0) translateX(0) rotate(10deg);
            opacity: 1;
          }
          70% {
            transform: translateY(-72vh) translateX(-12vw) rotate(10deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-72vh) translateX(-12vw) rotate(10deg);
            opacity: 0;
          }
        }
        
        @keyframes rocket-path-4 {
          0% {
            transform: translateY(0) translateX(0) rotate(-15deg);
            opacity: 1;
          }
          70% {
            transform: translateY(-68vh) translateX(-18vw) rotate(-15deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-68vh) translateX(-18vw) rotate(-15deg);
            opacity: 0;
          }
        }
        
        @keyframes trail-0 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          70% {
            transform: translateY(-70vh) translateX(10vw);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-70vh) translateX(10vw);
            opacity: 0;
          }
        }
        
        @keyframes trail-1 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          70% {
            transform: translateY(-75vh) translateX(15vw);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-75vh) translateX(15vw);
            opacity: 0;
          }
        }
        
        @keyframes trail-2 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          70% {
            transform: translateY(-80vh) translateX(0vw);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80vh) translateX(0vw);
            opacity: 0;
          }
        }
        
        @keyframes trail-3 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          70% {
            transform: translateY(-72vh) translateX(-12vw);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-72vh) translateX(-12vw);
            opacity: 0;
          }
        }
        
        @keyframes trail-4 {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          70% {
            transform: translateY(-68vh) translateX(-18vw);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-68vh) translateX(-18vw);
            opacity: 0;
          }
        }
        
        @keyframes burst-0 {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          20% {
            opacity: 1;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.8);
          }
        }
        
        @keyframes burst-1 {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          25% {
            opacity: 1;
            transform: scale(0.6);
          }
          60% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            transform: scale(2);
          }
        }
        
        @keyframes burst-2 {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          30% {
            opacity: 1;
            transform: scale(0.7);
          }
          70% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(2.2);
          }
        }
        
        @keyframes burst-3 {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          15% {
            opacity: 1;
            transform: scale(0.4);
          }
          45% {
            opacity: 1;
            transform: scale(0.9);
          }
          100% {
            opacity: 0;
            transform: scale(1.6);
          }
        }
        
        @keyframes burst-4 {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          35% {
            opacity: 1;
            transform: scale(0.8);
          }
          75% {
            opacity: 1;
            transform: scale(1.3);
          }
          100% {
            opacity: 0;
            transform: scale(2.4);
          }
        }
        
        @media (max-width: 768px) {
          @keyframes rocket-path-0 {
            0% {
              transform: translateY(0) translateX(0) rotate(15deg);
              opacity: 1;
            }
            70% {
              transform: translateY(-60vh) translateX(8vw) rotate(15deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-60vh) translateX(8vw) rotate(15deg);
              opacity: 0;
            }
          }
          
          @keyframes rocket-path-1 {
            0% {
              transform: translateY(0) translateX(0) rotate(-10deg);
              opacity: 1;
            }
            70% {
              transform: translateY(-65vh) translateX(12vw) rotate(-10deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-65vh) translateX(12vw) rotate(-10deg);
              opacity: 0;
            }
          }
          
          @keyframes rocket-path-2 {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg);
              opacity: 1;
            }
            70% {
              transform: translateY(-70vh) translateX(0vw) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-70vh) translateX(0vw) rotate(0deg);
              opacity: 0;
            }
          }
          
          @keyframes rocket-path-3 {
            0% {
              transform: translateY(0) translateX(0) rotate(10deg);
              opacity: 1;
            }
            70% {
              transform: translateY(-62vh) translateX(-10vw) rotate(10deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-62vh) translateX(-10vw) rotate(10deg);
              opacity: 0;
            }
          }
          
          @keyframes rocket-path-4 {
            0% {
              transform: translateY(0) translateX(0) rotate(-15deg);
              opacity: 1;
            }
            70% {
              transform: translateY(-58vh) translateX(-15vw) rotate(-15deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-58vh) translateX(-15vw) rotate(-15deg);
              opacity: 0;
            }
          }
        }
      `}</style>
    </div>
  )
}