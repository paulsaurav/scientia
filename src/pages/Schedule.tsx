import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScheduleEvent {
  programme: string
  time: string
  remarks?: string
}

interface DaySchedule {
  day: string
  events: ScheduleEvent[]
}

const Schedule = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  const scheduleData: DaySchedule[] = [
    {
      day: 'DAY 1',
      events: [
        { programme: 'Arrival of the Dignitaries to the Dias followed by felicitation programme', time: '3:00 PM - 5:00 PM' },
        { programme: 'Welcome Address by President, Scientia 6.0', time: '3:00 PM - 5:00 PM' },
        { programme: 'Brief report on three days Scientia 6 by Teacher Coordinator', time: '3:00 PM - 5:00 PM' },
        { programme: 'Address by the Guest of Honor', time: '3:00 PM - 5:00 PM' },
        { programme: 'Address by the Registrar', time: '3:00 PM - 5:00 PM' },
        { programme: 'Address by the Vice Chancellor', time: '3:00 PM - 5:00 PM' },
        { programme: 'Distinguished Top 2% Scientist felicitation', time: '3:00 PM - 5:00 PM' },
        { programme: 'Vote of Thanks by General Secretary, Scientia 6.0', time: '3:00 PM - 5:00 PM' },
        { programme: 'National Anthem', time: '3:00 PM - 5:00 PM' }
      ]
    },
    {
      day: 'DAY 2',
      events: [
        { programme: 'Lecture by the Invited Guest', time: '10:00 AM - 11:10 AM' },
        { programme: 'Science Quiz', time: '11:20 AM - 12:30 Noon' },
        { programme: 'Technical Session 1 by Scholars', time: '12:30 PM - 1:30 PM' },
        { programme: 'Scientific Model Exhibition', time: '12:30 PM - 1:45 PM' },
        { programme: 'Lunch Break', time: '1:45 PM - 2:30 PM' },
        { programme: 'Technical Session 2 by Scholars', time: '2:35 PM - 3:30 PM' },
        { programme: 'Solo Music Competition', time: '3:45 PM - 4:45 PM' },
        { programme: 'Tea Break', time: '4:45 PM - 5:00 PM' },
        { programme: 'Dance Competition', time: '5:10 PM - 7:00 PM' },
        { programme: 'Cultural Night (Band 1 Performance)', time: '7:30 PM - 10:30 PM' }
      ]
    },
    {
      day: 'DAY 3',
      events: [
        { programme: 'Lecture by the Invited Guest', time: '10:00 AM - 11:00 AM' },
        { programme: 'Poster Presentation', time: '11:00 AM - 1:00 PM' },
        { programme: 'Debate Competition', time: '12:00 Noon - 1:15 PM' },
        { programme: 'Alumni Engagement Session', time: '1:30 PM - 1:45 PM' },
        { programme: 'Lunch Break', time: '1:45 PM - 2:30 PM' },
        { programme: 'Solo Music Competition', time: '2:45 PM - 3:45 PM' },
        { programme: 'Tea Break', time: '3:45 PM - 4:00 PM' },
        { programme: 'Dance Competition', time: '4:10 PM - 5:30 PM' },
        { programme: 'Fashion Show (Mr. & Miss Scientia)', time: '5:45 PM - 7:45 PM' },
        { programme: 'Prize Distribution', time: '7:50 PM - 8:30 PM' },
        { programme: 'Cultural Night (Band 2 Performance)', time: '8:30 PM - 10:30 PM' }
      ]
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero section
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

      // Animate sections on scroll
      sectionsRef.current.forEach((section) => {
        if (section) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            animation: gsap.fromTo(
              section,
              {
                opacity: 0,
                y: 50
              },
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
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 pt-24 md:pt-32">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Schedule
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Tentative Event Schedule for SCIENTIA 6.0
          </p>
        </div>
      </section>

      {/* Schedule Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {scheduleData.map((daySchedule, dayIndex) => (
          <section
            key={daySchedule.day}
            ref={(el) => {
              sectionsRef.current[dayIndex] = el
            }}
            className="mb-16 md:mb-24"
          >
            {/* Day Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-8 md:mb-12 text-center italic">
              {daySchedule.day}
            </h2>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-700">
                    <th className="text-left py-4 px-4 md:px-6 text-slate-300 font-bold text-sm md:text-base uppercase tracking-wide">
                      Programme
                    </th>
                    <th className="text-left py-4 px-4 md:px-6 text-slate-300 font-bold text-sm md:text-base uppercase tracking-wide w-48 md:w-64">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {daySchedule.events.map((event, eventIndex) => (
                    <tr
                      key={eventIndex}
                      className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 md:px-6 text-slate-300 text-sm md:text-base">
                        {event.programme}
                      </td>
                      <td className="py-4 px-4 md:px-6 text-cyan-400 font-medium text-sm md:text-base whitespace-nowrap">
                        {event.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Schedule
