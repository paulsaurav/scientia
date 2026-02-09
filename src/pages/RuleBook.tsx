import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type EventCategory = 'Academics' | 'Outdoor Sports' | 'Indoor Sports' | 'E-sports'

interface RuleBookEvent {
  id: string
  name: string
  category: EventCategory
  image: string
  rules?: string
}

const EVENT_SECTIONS: { title: EventCategory; events: RuleBookEvent[] }[] = [
  {
    title: 'Academics',
    events: [
      { id: '16', name: 'Quiz', category: 'Academics', image: '/events/quiz.jpg' },
      { id: '17', name: 'Oral Presentation', category: 'Academics', image: '/events/oral-presentation.jpg' },
      { id: '18', name: 'Poster Presentation', category: 'Academics', image: '/events/poster-presentation.jpg' },
      { id: '19', name: 'Model Exhibition', category: 'Academics', image: '/events/model-exhibition.jpg' },
      { id: '20', name: 'Debate', category: 'Academics', image: '/events/debate.jpg' },
    ],
  },
  {
    title: 'Outdoor Sports',
    events: [
      { id: '1', name: 'Cricket', category: 'Outdoor Sports', image: '/events/cricket.jpg' },
      { id: '2', name: 'Football', category: 'Outdoor Sports', image: '/events/football.jpg' },
      { id: '3', name: 'Relay Race', category: 'Outdoor Sports', image: '/events/relay-race.svg' },
      { id: '4', name: 'Tug of War', category: 'Outdoor Sports', image: '/events/tug-of-war.jpg' },
      { id: '5', name: 'Volleyball', category: 'Outdoor Sports', image: '/events/volleyball.jpg' },
    ],
  },
  {
    title: 'Indoor Sports',
    events: [
      { id: '6', name: 'Carrom', category: 'Indoor Sports', image: '/events/carrom.jpg' },
      { id: '7', name: 'Table Tennis', category: 'Indoor Sports', image: '/events/table-tennis.jpg' },
      { id: '8', name: 'Badminton', category: 'Indoor Sports', image: '/events/badminton.jpg' },
      { id: '9', name: 'Chess', category: 'Indoor Sports', image: '/events/chess.jpg' },
      { id: '12', name: 'Power Lifting', category: 'Indoor Sports', image: '/events/power-lifting.jpg' },
    ],
  },
  {
    title: 'E-sports',
    events: [
      { id: '10', name: 'Fifa 22/FC25', category: 'E-sports', image: '/events/fifa.jpg' },
      { id: '11', name: 'NFS MW', category: 'E-sports', image: '/events/nfs.jpg' },
      { id: '13', name: 'eFootball', category: 'E-sports', image: '/events/efootball.jpg' },
      { id: '14', name: 'Takken 7/8', category: 'E-sports', image: '/events/takken.jpg' },
      { id: '15', name: 'Moba Legends', category: 'E-sports', image: '/events/moba-legends.jpg' },
    ],
  },
]

const RuleBook = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectedEvent, setSelectedEvent] = useState<RuleBookEvent | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
          }
        )
      }

      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 85%',
          animation: gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out'
            }
          ),
          once: true
        })
      }

      sectionRefs.current.forEach((el) => {
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            animation: gsap.fromTo(
              el,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            ),
            once: true
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null)
    }
    if (selectedEvent) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [selectedEvent])

  return (
    <div className="min-h-screen bg-slate-950 pt-24 md:pt-32">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Rule Book
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Guidelines and rules for SCIENTIA 6.0 events and competitions
          </p>
        </div>
      </section>

      {/* Book-style content */}
      <section ref={contentRef} className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Intro */}
          <div className="text-center mb-12 md:mb-16">
            <p className="text-lg md:text-xl text-slate-300 font-medium">
              For each event there will be rules provided.
            </p>
            <div className="w-24 h-0.5 bg-linear-to-r from-cyan-400/50 to-blue-500/50 mx-auto mt-4" />
          </div>

          {/* Book container: spine + two "pages" on large screens */}
          <div className="relative">
            {/* Decorative spine line (visible on large screens) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-700/60 -translate-x-px" aria-hidden />

            <div className="space-y-14 md:space-y-16">
              {EVENT_SECTIONS.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  ref={(el) => { sectionRefs.current[sectionIndex] = el }}
                  className="relative"
                >
                  {/* Chapter heading */}
                  <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                      <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/50 text-cyan-400 font-mono text-sm">
                        {sectionIndex + 1}
                      </span>
                      <span className="bg-linear-to-r from-cyan-400/90 to-blue-500/90 bg-clip-text text-transparent">
                        {section.title}
                      </span>
                    </h2>
                    <div className="w-16 h-0.5 bg-cyan-400/50 mt-2 ml-13" />
                  </div>

                  {/* Event cards: book-page style, two columns on large */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {section.events.map((event) => (
                      <article
                        key={event.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedEvent(event)}
                        onKeyDown={(e) => e.key === 'Enter' && setSelectedEvent(event)}
                        className="group relative rounded-xl border border-slate-700/50 bg-slate-900/30 overflow-hidden hover:border-cyan-500/30 transition-colors duration-300 cursor-pointer"
                      >
                        {/* Page fold corner */}
                        <div className="absolute top-0 right-0 w-12 h-12 border-r border-t border-slate-600/40 rounded-tr-xl" aria-hidden />
                        <div className="flex flex-col sm:flex-row sm:items-stretch min-h-[120px]">
                          {/* Thumbnail */}
                          <div className="relative w-full sm:w-32 h-28 sm:h-auto shrink-0 overflow-hidden bg-slate-800/50">
                            <img
                              src={event.image}
                              alt=""
                              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent sm:bg-linear-to-r sm:from-slate-900/60" />
                          </div>
                          {/* Text content */}
                          <div className="flex flex-col justify-center p-4 md:p-5 flex-1">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                              {event.name}
                            </h3>
                            <p className="text-sm text-slate-400">
                              Rules will be provided for this event.
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rules Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedEvent(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="rules-modal-title"
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-slate-700/50 bg-slate-900/95 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center gap-4 p-4 md:p-6 border-b border-slate-700/50 bg-slate-800/30 shrink-0">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-600/50">
                <img src={selectedEvent.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="rules-modal-title" className="text-xl md:text-2xl font-bold text-white truncate">
                  {selectedEvent.name}
                </h2>
                <p className="text-sm text-cyan-400/90">{selectedEvent.category}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors shrink-0"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Modal body - rules content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <div className="prose prose-invert prose-slate max-w-none">
                {selectedEvent.rules ? (
                  <div className="text-slate-300 whitespace-pre-wrap text-base md:text-lg leading-relaxed">
                    {selectedEvent.rules}
                  </div>
                ) : (
                  <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                    Rules will be provided for this event.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RuleBook
