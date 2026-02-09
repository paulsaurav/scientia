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

  const departments = [
    { name: 'Pharmaceuticals', points: 0 },
    { name: 'Microbiology', points: 0 },
    { name: 'Biotechnology', points: 0 },
    { name: 'Life Science & Bioinformatics', points: 0 },
    { name: 'Ecology & Environmental Science', points: 0 },
    { name: 'Physics', points: 0 },
    { name: 'Statistics', points: 0 },
    { name: 'Chemistry', points: 0 },
    { name: 'Computer Science', points: 0 },
    { name: 'Mathematics', points: 0 },
    { name: 'Earth Science', points: 0 },
    { name: 'Education (B.Sc B.Ed)', points: 0 },
  ]

  const teamPoints = [
    { position: '1st Place', points: 15 },
    { position: '2nd Place', points: 10 },
    { position: '3rd Place', points: 7 },
    { position: '4th Place', points: 5 },
    { position: 'Participation (Played but no rank)', points: 2 },
  ]

  const individualPoints = [
    { position: '1st Place', points: 10 },
    { position: '2nd Place', points: 7 },
    { position: '3rd Place', points: 5 },
    { position: '4th Place', points: 3 },
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
                    {departments.map((row, i) => (
                      <tr key={i} className="border-b border-slate-700/30 last:border-0">
                        <td className="px-6 py-4">{row.name}</td>
                        <td className="px-6 py-4 text-right font-semibold text-white">{row.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
