import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Prevent body scroll while loading
    document.body.style.overflow = 'hidden'

    // Hide loader after 2 seconds
    const timer = setTimeout(() => {
      gsap.to('.loader-container', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          setIsVisible(false)
          document.body.style.overflow = 'unset'
          onComplete()
        }
      })
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="loader-container fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center overflow-hidden">
      {/* Animated text strip */}
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="text-strip whitespace-nowrap flex items-center">
          {/* Multiple instances for seamless loop */}
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="inline-flex items-center mx-12 md:mx-16">
              {/* Cyan outlined text */}
              <span 
                className="text-7xl md:text-9xl lg:text-[12rem] font-black italic text-transparent"
                style={{
                  WebkitTextStroke: '2px #22d3ee',
                } as React.CSSProperties}
              >
                SCIENTIA 6
              </span>
              {/* White solid text - centered */}
              <span className="text-7xl md:text-9xl lg:text-[12rem] font-black italic text-white mx-8 md:mx-12">
                SCIENTIA 6
              </span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .text-strip {
          animation: scroll-text 20s linear infinite;
          will-change: transform;
        }

        @keyframes scroll-text {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

export default Loader

