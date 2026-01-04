import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'

const Schedule = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
      }

      // Animate subtitle
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
        )
      }

      // Animate icon with pulse
      if (iconRef.current) {
        gsap.fromTo(iconRef.current,
          { opacity: 0, scale: 0.5, rotation: -180 },
          { 
            opacity: 1, 
            scale: 1, 
            rotation: 0, 
            duration: 1, 
            delay: 0.4, 
            ease: 'back.out(1.7)' 
          }
        )
        
        // Continuous pulse animation
        gsap.to(iconRef.current, {
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 1.4
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center">
      <div ref={containerRef} className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        </div>

        {/* Icon */}
        <div ref={iconRef} className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-cyan-400/50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center">
              <svg 
                className="w-16 h-16 md:w-20 md:h-20 text-cyan-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6"
        >
          <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Schedule
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-2xl md:text-3xl text-slate-300 font-semibold mb-4"
        >
          Coming Soon
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          We're working hard to bring you an amazing schedule of events. 
          Stay tuned for updates!
        </p>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse animation-delay-2000"></div>
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/50 border border-slate-800/50 text-slate-300 font-semibold rounded-full tracking-wide uppercase text-sm transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-400 hover:bg-slate-900/70"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Schedule

