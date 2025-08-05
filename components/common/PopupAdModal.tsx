"use client"

import { useEffect, useState, useRef } from "react"
import { X } from "lucide-react"

interface PopupAd {
  _id: string
  image: string
  isActive: boolean
}

const PopupAdModal = () => {
  const [ads, setAds] = useState<PopupAd[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [fireworks, setFireworks] = useState<Array<{id: number, x: number, y: number}>>([])
  const autoCloseRef = useRef<NodeJS.Timeout | null>(null)
  const API = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    // Check if popup was already shown during this session
    const isPopupShown = sessionStorage.getItem('popupShown');
    
    if (isPopupShown) {
      // If popup already shown, no need to fetch ads again
      return;
    }

    const fetchAds = async () => {
      try {
        const res = await fetch(`${API}/api/popupad`, { cache: "no-store" });
        const data = await res.json();
        const activeAds = (data.popupAds || []).filter((ad: any) => ad.isActive);

        if (activeAds.length > 0) {
          setAds(activeAds);
          setTimeout(() => {
            setVisible(true);
            triggerFireworks();
            // Set flag in sessionStorage once popup is shown
            sessionStorage.setItem('popupShown', 'true');
          }, 6000);
        }
      } catch (error) {
        console.error("Failed to load popup ads", error);
      }
    };

    fetchAds();
  }, [API]);

  const triggerFireworks = () => {
    const newFireworks = [];
    for (let i = 0; i < 15; i++) {
      newFireworks.push({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }
    setFireworks(newFireworks);
    setTimeout(() => setFireworks([]), 1000);
  }

  const handleClose = () => {
    if (autoCloseRef.current) clearTimeout(autoCloseRef.current)
    triggerFireworks();
    setTimeout(() => {
      if (currentIndex < ads.length - 1) {
        setCurrentIndex(prev => prev + 1)
      } else {
        setVisible(false)
      }
    }, 500);
  }

  if (!visible || ads.length === 0) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-transparent" onClick={handleClose}>

      {/* Fireworks animation */}
      {fireworks.map((fw) => (
        <div 
          key={fw.id}
          className="absolute w-2 h-2 rounded-full bg-yellow-400 animate-firework"
          style={{
            left: `${fw.x}%`,
            top: `${fw.y}%`,
          }}
        />
      ))}
      
      <div
        className={`relative w-[95vw] max-w-3xl bg-transparent transform transition-all duration-500 ease-out scale-95 opacity-0 ${
          visible ? "scale-100 opacity-100" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated border */}
        <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-75 animate-pulse pointer-events-none"></div>
        
        <div className="relative bg-white rounded-lg overflow-visible shadow-2xl">
          <button
            onClick={handleClose}
            className="absolute -top-3 -right-3 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all transform hover:scale-110 animate-bounce shadow-lg"
          >
            <X size={18} />
          </button>
          <img
            src={ads[currentIndex].image}
            alt="Popup Ad"
            className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes firework {
          0% { 
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(3);
            opacity: 0.5;
          }
          100% { 
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-firework {
          animation: firework 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default PopupAdModal
