import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Event {
  id: string
  name: string
  category: 'Outdoor Sports' | 'Indoor Sports' | 'E-sports'
  image: string
}

const Events = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const outdoorRef = useRef<HTMLDivElement>(null)
  const indoorRef = useRef<HTMLDivElement>(null)
  const esportsRef = useRef<HTMLDivElement>(null)

  const outdoorSports: Event[] = [
    { id: '1', name: 'Cricket', category: 'Outdoor Sports', image: '/events/cricket.jpg' },
    { id: '2', name: 'Volleyball', category: 'Outdoor Sports', image: '/events/volleyball.jpg' },
    { id: '3', name: 'Basketball', category: 'Outdoor Sports', image: '/events/basketball.jpg' },
    { id: '4', name: 'Javelin Throw', category: 'Outdoor Sports', image: '/events/javelin.webp' },
    { id: '5', name: 'Shotput Throw', category: 'Outdoor Sports', image: '/events/shot-put.webp' }
  ]

  const indoorSports: Event[] = [
    { id: '6', name: 'Carrom', category: 'Indoor Sports', image: '/events/carrom.jpg' },
    { id: '7', name: 'Table Tennis', category: 'Indoor Sports', image: '/events/table-tennis.jpg' },
    { id: '8', name: 'Badminton', category: 'Indoor Sports', image: '/events/badminton.jpg' },
    { id: '9', name: 'Chess', category: 'Indoor Sports', image: '/events/chess.jpg' }
  ]

  const esports: Event[] = [
    { id: '10', name: 'FIFA', category: 'E-sports', image: '/events/fifa.jpg' },
    { id: '11', name: 'NFS Most Wanted', category: 'E-sports', image: '/events/nfs.jpg' }
  ]

  // Hero animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroTitleRef.current) {
        gsap.fromTo(heroTitleRef.current, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Section animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Outdoor Sports
      if (outdoorRef.current) {
        const cards = outdoorRef.current.children
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: outdoorRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      // Indoor Sports
      if (indoorRef.current) {
        const cards = indoorRef.current.children
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: indoorRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }

      // E-sports
      if (esportsRef.current) {
        const cards = esportsRef.current.children
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: esportsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  const EventCard = ({ event }: { event: Event }) => {
    return (
      <div className="group relative overflow-hidden rounded-2xl border-2 border-slate-800/50 bg-slate-900/30 backdrop-blur-sm hover:border-cyan-500/60 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/20">
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={event.image} 
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
          
          {/* Shine Effect on Hover */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
          <h3 className="text-xl md:text-2xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
            {event.name}
          </h3>
          <div className="w-12 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500 group-hover:w-16 transition-all duration-300"></div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 rounded-tr-2xl transition-all duration-300"></div>
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/60 rounded-bl-2xl transition-all duration-300"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 
            ref={heroTitleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
          >
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Compete, showcase, and celebrate
          </p>
        </div>
      </section>

      {/* Outdoor Sports */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-200 mb-2">
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Outdoor Sports
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500"></div>
          </div>
          <div ref={outdoorRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
            {outdoorSports.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Indoor Sports */}
      <section className="relative py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-200 mb-2">
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Indoor Sports
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500"></div>
          </div>
          <div ref={indoorRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {indoorSports.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* E-sports */}
      <section className="relative py-12 md:py-16 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-slate-200 mb-2">
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                E-sports
              </span>
            </h2>
            <div className="w-16 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500"></div>
          </div>
          <div ref={esportsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {esports.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
