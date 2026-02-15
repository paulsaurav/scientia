import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

const PointsTable = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

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
          start: 'top 80%',
          animation: gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 50 },
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

    return () => ctx.revert()
  }, [])

  // Department points (updated from event results; Team: 1st=15, 2nd=10, 3rd=7, participation=2; Individual: 1st=10, 2nd=7, 3rd=5; participation=1)
  const departments = [
    { name: 'Pharmaceutical Sciences', points: 48 },
    { name: 'Microbiology', points: 0 },
    { name: 'Biotechnology', points: 9 },
    { name: 'Life Science & Bioinformatics', points: 33 },
    { name: 'Ecology & Environmental Science', points: 28 },
    { name: 'Physics', points: 146 },
    { name: 'Statistics', points: 5 },
    { name: 'Chemistry', points: 81 },
    { name: 'Computer Science', points: 116 },
    { name: 'Mathematics', points: 0 },
    { name: 'Earth Science', points: 35 },
    { name: 'Education (B.Sc B.Ed)', points: 20 },
  ]

  // Event results with player names and event names (for display)
  const eventResults: { eventName: string; category: string; positions: { position: string; players: string; department: string; points: number }[] }[] = [
    {
      eventName: 'Carrom',
      category: "Men's Doubles",
      positions: [
        { position: '1st', players: 'Aman and Nethai', department: 'Ecology & Environmental Science', points: 10 },
        { position: '2nd', players: 'Giriraj and Pradeep', department: 'Physics', points: 7 },
        { position: '3rd', players: 'Rhishikesh and Najdid', department: 'Chemistry', points: 5 },
      ],
    },
    {
      eventName: 'Carrom',
      category: "Women's Doubles",
      positions: [
        { position: '1st', players: 'Mayashree and Rashmita', department: 'Pharmaceutical Sciences', points: 10 },
        { position: '2nd', players: 'Swagata and Sushmita', department: 'Physics', points: 7 },
        { position: '3rd', players: 'Dipanjali and Jannat', department: 'Life Science & Bioinformatics', points: 5 },
      ],
    },
    {
      eventName: 'Carrom',
      category: 'Mix Doubles',
      positions: [
        { position: '1st', players: 'Giriraj and Swagata', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Sushil and Jachobed', department: 'Computer Science', points: 7 },
        { position: '3rd', players: 'Rashmita and Deepjyoti', department: 'Pharmaceutical Sciences', points: 5 },
      ],
    },
    {
      eventName: 'Tekken',
      category: 'PC Tournament',
      positions: [
        { position: '1st', players: 'Siddhant Biswas', department: 'Computer Science', points: 10 },
        { position: '2nd', players: 'Deepak Singha', department: 'Computer Science', points: 7 },
        { position: '3rd', players: 'Amrit Dey', department: 'Earth Science', points: 5 },
      ],
    },
    {
      eventName: 'NFS-MW',
      category: 'PC Tournament',
      positions: [
        { position: '1st', players: 'Hrishikesh Sarma', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Nibir Gogoi', department: 'Earth Science', points: 7 },
        { position: '3rd', players: 'Geetaraj Dutta', department: 'Chemistry', points: 5 },
      ],
    },
    {
      eventName: 'FIFA',
      category: 'PC Tournament',
      positions: [
        { position: '1st', players: 'Siddhant Biswas', department: 'Computer Science', points: 10 },
        { position: '2nd', players: 'Debajit Paul', department: 'Computer Science', points: 7 },
        { position: '3rd', players: 'Geetaraj Dutta', department: 'Chemistry', points: 5 },
      ],
    },
    {
      eventName: 'Volleyball',
      category: "Girls",
      positions: [
        { position: '1st', players: 'Team', department: 'Chemistry', points: 15 },
        { position: '2nd', players: 'Team', department: 'Pharmaceutical Sciences', points: 10 },
        { position: '3rd', players: 'Team', department: 'Earth Science', points: 7 },
      ],
    },
    {
      eventName: 'Volleyball',
      category: "Boys",
      positions: [
        { position: '1st', players: 'Team', department: 'Pharmaceutical Sciences', points: 15 },
        { position: '2nd', players: 'Team', department: 'Computer Science', points: 10 },
        { position: '3rd', players: 'Team', department: 'Chemistry', points: 7 },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: "Women's Singles",
      positions: [
        { position: '1st', players: 'Monoswini Chakravorty', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Soraisam Brinda Dzongri', department: 'Physics', points: 7 },
        { position: '3rd', players: 'Limarika Gogoi', department: 'Chemistry', points: 5 },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: "Men's Singles",
      positions: [
        { position: '1st', players: 'Anuj Kanti Nath', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Sushil Kumar Sharma', department: 'Computer Science', points: 7 },
        { position: '3rd', players: 'Akshay Acharya Chakma', department: 'Education (B.Sc B.Ed)', points: 5 },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: "Men's Doubles",
      positions: [
        { position: '1st', players: 'Anuj Kanti Nath & Nakemuz Zaman Barbhuiya', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Sushil Kumar Sharma & Debojit Das', department: 'Computer Science', points: 7 },
        { position: '3rd', players: 'Anurag Das & Aryan Jena', department: 'Biotechnology', points: 5 },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: "Women's Doubles",
      positions: [
        { position: '1st', players: 'Soraisam Brinda Dzongri & Monoswini Chakravorty', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Monorama Kalowar & Chandana Amphi', department: 'Physics', points: 7 },
        { position: '3rd', players: 'Ankita Kumari Singh & Jackobed Klarmir Hansepi', department: 'Computer Science', points: 5 },
      ],
    },
    {
      eventName: 'Table Tennis',
      category: 'Mixed Doubles',
      positions: [
        { position: '1st', players: 'Monoswini Chakravorty & Anuj Kanti Nath', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Debojit Das & Jackobed Klarmir Hansepi', department: 'Computer Science', points: 7 },
        { position: '3rd', players: 'Sushil Kumar Sharma & Ankita Kumari Singh', department: 'Computer Science', points: 5 },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: "Girls 41–50kg",
      positions: [
        { position: '1st', players: 'Monoswini Chakravorty', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Ishika Agarwal', department: 'Pharmaceutical Sciences', points: 7 },
        { position: '3rd', players: 'Jannat', department: 'Life Science & Bioinformatics', points: 5 },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: "Girls 51–60kg",
      positions: [
        { position: '1st', players: 'Achal Chakravorty', department: 'Chemistry', points: 10 },
        { position: '2nd', players: 'Matyaben Yasmin', department: 'Chemistry', points: 7 },
        { position: '3rd', players: 'Parishmita Gogoi', department: 'Earth Science', points: 5 },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: "Girls 61–70kg",
      positions: [
        { position: '1st', players: 'Monoswini Chakravorty', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Kanchan Chettri', department: 'Earth Science', points: 7 },
        { position: '3rd', players: 'Matyaben Yasmin', department: 'Chemistry', points: 5 },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: "Girls 70kg+",
      positions: [
        { position: '1st', players: 'Monoswini Chakravorty', department: 'Physics', points: 10 },
        { position: '2nd', players: 'Simran Thapa', department: 'Ecology & Environmental Science', points: 7 },
        { position: '3rd', players: 'Nargis', department: 'Ecology & Environmental Science', points: 5 },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: "Boys 55–65kg",
      positions: [
        { position: '1st', players: 'Broteen Nath', department: 'Computer Science', points: 10 },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: "Boys 65–75kg",
      positions: [
        { position: '1st', players: 'Debasis Boruah', department: 'Chemistry', points: 10 },
        { position: '2nd', players: 'Archit Changkakoti', department: 'Physics', points: 7 },
        { position: '3rd', players: 'Akashjyoti Dutta', department: 'Chemistry', points: 5 },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: "Boys 76–85kg",
      positions: [
        { position: '1st', players: 'Sapam Dushanta Singh', department: 'Computer Science', points: 10 },
        { position: '2nd', players: 'Bhrigu Kr. Das', department: 'Physics', points: 7 },
      ],
    },
    {
      eventName: 'Powerlifting',
      category: "Boys 85kg+",
      positions: [
        { position: '1st', players: 'Debodeep Bhattacharjee', department: 'Life Science & Bioinformatics', points: 10 },
      ],
    },
    {
      eventName: 'MLBB',
      category: 'eSports Tournament',
      positions: [
        { position: '1st', players: 'Team', department: 'Education (B.Sc B.Ed)', points: 15 },
        { position: '2nd', players: 'Team', department: 'Computer Science', points: 10 },
        { position: '3rd', players: 'Team', department: 'Life Science & Bioinformatics', points: 7 },
      ],
    },
  ]

  const teamPoints = [
    { position: '1st Place', points: 15 },
    { position: '2nd Place', points: 10 },
    { position: '3rd Place', points: 7 },
    { position: 'Participation (Played but no rank)', points: 2 },
  ]

  const individualPoints = [
    { position: '1st Place', points: 10 },
    { position: '2nd Place', points: 7 },
    { position: '3rd Place', points: 5 },
    { position: 'Participation (Played but no rank)', points: 1 },
  ]

  return (
    <div className="min-h-screen bg-slate-950 pt-24 md:pt-32">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Points Table
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Quick reference for department ranking points
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="space-y-12">
            {/* Department-wise Points */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Department-wise Points
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Overall championship ranking — points updated as events conclude
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-800/50">
                      <th className="px-6 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide">Departments</th>
                      <th className="px-6 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide text-right w-28">Points</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {[...departments]
                      .sort((a, b) => b.points - a.points)
                      .map((row, i) => (
                        <tr key={i} className="border-b border-slate-700/30 last:border-0">
                          <td className="px-6 py-4">{row.name}</td>
                          <td className="px-6 py-4 text-right font-semibold text-white">{row.points}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Event Results - event names and player names */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Event Results
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Event name, position, and player names — updated as results are declared
                </p>
              </div>
              <div className="p-4 md:p-6 space-y-8">
                {eventResults.map((result, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                      {result.eventName} — {result.category}
                    </h3>
                    <div className="overflow-x-auto rounded-lg border border-slate-700/40">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-700/50 bg-slate-800/40">
                            <th className="px-4 py-2.5 font-semibold text-slate-300">Position</th>
                            <th className="px-4 py-2.5 font-semibold text-slate-300">Players</th>
                            <th className="px-4 py-2.5 font-semibold text-slate-300">Department</th>
                            <th className="px-4 py-2.5 font-semibold text-slate-300 text-right w-20">Points</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-400">
                          {result.positions.map((row, i) => (
                            <tr key={i} className="border-b border-slate-700/30 last:border-0">
                              <td className="px-4 py-3 font-medium text-white">{row.position}</td>
                              <td className="px-4 py-3">{row.players}</td>
                              <td className="px-4 py-3">{row.department}</td>
                              <td className="px-4 py-3 text-right font-medium text-cyan-400">{row.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Events */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Team Events
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Football, Cricket, Volleyball, Tug of War, Relay Race, Poster Presentation, Quiz, Model Exhibition, etc.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-800/50">
                      <th className="px-6 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide">Position</th>
                      <th className="px-6 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide text-right w-28">Points</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {teamPoints.map((row, i) => (
                      <tr key={i} className="border-b border-slate-700/30 last:border-0">
                        <td className="px-6 py-4">{row.position}</td>
                        <td className="px-6 py-4 text-right font-semibold text-white">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Individual Events */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/30">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Individual Events
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Badminton (Singles & Doubles), Table Tennis (Singles & Doubles), Power Lifting, Oral Presentation, Debate, etc.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-800/50">
                      <th className="px-6 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide">Position</th>
                      <th className="px-6 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide text-right w-28">Points</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {individualPoints.map((row, i) => (
                      <tr key={i} className="border-b border-slate-700/30 last:border-0">
                        <td className="px-6 py-4">{row.position}</td>
                        <td className="px-6 py-4 text-right font-semibold text-white">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-center text-slate-400 text-sm">
              For full rules, tie-breaking, and score calculation, see the{' '}
              <Link to="/grading-system" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Grading System
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PointsTable
