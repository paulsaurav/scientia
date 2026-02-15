import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GradingSystem = () => {
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

  return (
    <div className="min-h-screen bg-slate-950 pt-24 md:pt-32">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Grading System
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Department Ranking Point System for Overall Championship at SCIENTIA 6.0
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="space-y-10 text-slate-300">
            {/* Intro */}
            <div className="rounded-2xl border border-slate-800/50 bg-slate-900/20 p-6 md:p-8">
              <p className="text-base md:text-lg leading-relaxed">
                This defines a transparent and unbiased point system to determine the <span className="text-white font-semibold">Best</span>, <span className="text-white font-semibold">Second Best</span>, and <span className="text-white font-semibold">Third Best Department</span> in Scientia 6. The system applies uniformly to all departments and events.
              </p>
            </div>

            {/* 1. Objective */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">1.</span> Objective
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                To ensure fair evaluation of departmental performance across all events (<span className="font-semibold text-cyan-400">academics</span>, <span className="font-semibold text-cyan-400">sports</span>, <span className="font-semibold text-cyan-400">cultural</span>) by using a standardized points structure and clearly defined tie-breaking rules.
              </p>
            </div>

            {/* 2. Event Classification */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">2.</span> Event Classification
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-6">
                All events are divided into two categories based on participation format and scale.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-3">2.1 Team Events (Group Participation Events)</h3>
              <p className="text-base md:text-lg leading-relaxed mb-3">
                The following events are considered Team Events:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4 mb-6">
                <li>Football</li>
                <li>Cricket</li>
                <li>Volleyball</li>
                <li>Tug of War</li>
                <li>Relay Race</li>
                <li>Poster Presentation</li>
                <li>Quiz</li>
                <li>Model Exhibition</li>
                <li>Any other events where a team consists of 3 or more</li>
              </ul>
              <p className="text-base md:text-lg leading-relaxed italic text-slate-400">
                Team events involve multiple participants and collective performance.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mt-8 mb-3">2.2 Individual Events (Including Singles and Doubles)</h3>
              <p className="text-base md:text-lg leading-relaxed mb-3">
                The following events are considered Individual Events:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4 mb-3">
                <li>Badminton (Singles and Doubles)</li>
                <li>Table Tennis (Singles and Doubles)</li>
                <li>Power Lifting</li>
                <li>Oral Presentation</li>
                <li>Debate</li>
                <li>Any other single-participant or pair-participant competitive event</li>
              </ul>
              <p className="text-base md:text-lg leading-relaxed italic text-slate-400">
                Note: Doubles events are treated under the Individual Event category since they involve limited participants (two per side) and are not full-department team events.
              </p>
            </div>

            {/* 3. Points Allocation */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">3.</span> Points Allocation System
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-6">
                Points will be awarded based on event classification and final position achieved.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mb-4">3.1 Team Events Points Table</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-700/50 mb-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-800/50">
                      <th className="px-4 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide">Position</th>
                      <th className="px-4 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide">Points</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-700/30"><td className="px-4 py-3">1st Place</td><td className="px-4 py-3 font-medium text-white">15</td></tr>
                    <tr className="border-b border-slate-700/30"><td className="px-4 py-3">2nd Place</td><td className="px-4 py-3 font-medium text-white">10</td></tr>
                    <tr className="border-b border-slate-700/30"><td className="px-4 py-3">3rd Place</td><td className="px-4 py-3 font-medium text-white">7</td></tr>
                    <tr><td className="px-4 py-3">Participation (Played but no rank)</td><td className="px-4 py-3 font-medium text-white">2</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-400 italic">
                Participation points will be awarded only to departments that officially compete in the event.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold text-slate-200 mt-8 mb-4">3.2 Individual Events Points Table (Singles and Doubles)</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-700/50 mb-4">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700/50 bg-slate-800/50">
                      <th className="px-4 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide">Position</th>
                      <th className="px-4 py-3 text-sm font-semibold text-cyan-400 uppercase tracking-wide">Points</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-700/30"><td className="px-4 py-3">1st Place</td><td className="px-4 py-3 font-medium text-white">10</td></tr>
                    <tr className="border-b border-slate-700/30"><td className="px-4 py-3">2nd Place</td><td className="px-4 py-3 font-medium text-white">7</td></tr>
                    <tr className="border-b border-slate-700/30"><td className="px-4 py-3">3rd Place</td><td className="px-4 py-3 font-medium text-white">5</td></tr>
                    <tr><td className="px-4 py-3">Participation (Played but no rank)</td><td className="px-4 py-3 font-medium text-white">1</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-slate-400 italic">
                Participation points will be awarded only to departments that officially compete in the event.
              </p>
            </div>

            {/* 4. Doubles Event Rule */}
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">4.</span> Doubles Event Rule <span className="text-sm font-normal text-cyan-400/80">(Important)</span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                For events such as Badminton Doubles and Table Tennis Doubles:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4 mb-4">
                <li>They will be scored using the Individual Event Points Table.</li>
                <li>Each doubles event is considered a separate event and will award points independently.</li>
                <li>A department winning both singles and doubles in the same sport will receive points for both events separately.</li>
              </ul>
              <p className="text-base md:text-lg leading-relaxed font-medium text-slate-200 mb-1">Example:</p>
              <p className="text-base md:text-lg leading-relaxed text-slate-400">
                If a department wins Badminton Singles (1st) and Badminton Doubles (2nd), total points will be: 10 + 7 = <span className="text-cyan-400 font-semibold">17 points</span>.
              </p>
            </div>

            {/* 5. Department Championship Score */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-cyan-400">5.</span> Department Championship Score Calculation
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-2">
                Each department&apos;s final score will be calculated as:
              </p>
              <p className="text-lg md:text-xl font-semibold text-cyan-400 mb-2">
                Total Department Score = Sum of all points earned in all events
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                The departments will be ranked based on their total points.
              </p>
            </div>

            {/* 6. Final Ranking */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">6.</span> Final Ranking
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                The top three departments will be awarded as follows:
              </p>
              <ul className="space-y-2 text-base md:text-lg">
                <li className="flex items-center gap-3"><span className="font-bold text-white">1.</span> Best Department (Overall Champion) – Highest Total Points</li>
                <li className="flex items-center gap-3"><span className="font-bold text-white">2.</span> Second Best Department – Second Highest Total Points</li>
                <li className="flex items-center gap-3"><span className="font-bold text-white">3.</span> Third Best Department – Third Highest Total Points</li>
              </ul>
            </div>

            {/* 7. Tie-Breaking Rules */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">7.</span> Tie-Breaking Rules <span className="text-sm font-normal text-slate-400">(If Total Points Are Equal)</span>
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                If two or more departments have the same total points, the tie will be resolved in the following order:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Higher number of 1st place finishes (Gold positions)</li>
                <li>If still tied, higher number of 2nd place finishes (Silver positions)</li>
                <li>If still tied, higher number of 3rd place finishes (Bronze positions)</li>
                <li>If still tied, higher number of total event participations</li>
                <li>If still tied, decision will be made by the organizing committee based on overall performance record</li>
              </ol>
            </div>

            {/* 8. Fairness and Non-Bias */}
            <div className="rounded-2xl border border-slate-700/50 bg-slate-900/30 p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">8.</span> Fairness and Non-Bias Assurance
              </h2>
              <p className="text-base md:text-lg leading-relaxed mb-4">
                This system is designed to ensure fairness by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                <li>Using fixed point values for all departments</li>
                <li>Separating team events and individual events appropriately</li>
                <li>Rewarding both excellence (winners) and involvement (participation points)</li>
                <li>Applying the same rules and tie-breakers to all departments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GradingSystem
