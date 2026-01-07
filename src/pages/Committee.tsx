import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CommitteeMember {
  name: string
  role: string
  image?: string
}

  const Committee = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  // Committee data
  const committeeData: Record<string, CommitteeMember[]> = {
    'Patron-in-Chief': [
      { name: 'Prof. Rajive Mohan Pant', role: 'Vice Chancellor, Assam University', image: '/team/vc.jpg' }
    ],
    'Teacher Advisor': [
      { name: 'Prof. Prodipto Das', role: 'Proctor and HoD, Computer Science, Assam University, Silchar', image: '/team/pd-sir.jpg' }
    ],
    'Chairperson': [
      { name: 'Prof. Pranab Behari Mazumder', role: 'Dean, Hargobind Khurana School of Life Sciences', image: '/team/pranab-sir.png' }
    ],
    'President': [
      { name: 'Nirmal Barman', role: 'PhD Scholar, Department of Physics', image: '/team/nirmal.jpeg' }
    ],
    'Vice-President (Male)': [
      { name: 'Abhideep Roy', role: 'PhD Scholar, Department of Life Science & Bioinformatics', image: '/team/abhideep.png' }
    ],
    'Vice-President (Female)': [
      { name: 'Arundhati Paul Chowdhury', role: 'PhD Scholar, Department of Ecology & Environmental Science', image: '/team/arundhati.jpeg' }
    ],
    'General Secretary': [
      { name: 'Saurav Paul', role: 'PhD Scholar, Department of Computer Science', image: '/team/saurav.jpg' }
    ],
    'Joint Secretaries': [
      { name: 'Shivam Nath', role: 'M. Pharm, Department of Pharmaceutical Sciences' },
      { name: 'Mishmi Roy', role: 'PhD Scholar, Department of Chemistry', image: '/team/mishmi.jpeg' },
      { name: 'Bishal Nath', role: 'M. Sc., Department of Ecology & Environmental Science', image: '/team/bishal.jpg' },
      { name: 'Bitan Kar', role: 'M. Sc., Department of Physics' },
      { name: 'Ankur Mazumdar', role: 'M. Sc., Department of Biotechnology', image: '/team/ankur.jpeg' }
    ],
    'Treasurer': [
      { name: 'Jyothishman Tamuli', role: 'PhD Scholar, Department of Life Science & Bioinformatics', image: '/team/jyotishman.jpg' }
    ]
  }

  // GSAP animations
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
              section.children,
              {
                opacity: 0,
                y: 50,
                scale: 0.9
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
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

  // Circuit board frame component with enhanced design
  const CircuitFrame = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    return (
      <div className={`relative w-full ${className}`}>
        {/* Circuit board frame with enhanced design */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 500"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Glow filter for circuit traces */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Stronger glow for highlights */}
            <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Gradient for traces */}
            <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
            
            {/* Radial gradient for connection points */}
            <radialGradient id="nodeGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.6" />
            </radialGradient>
            
            {/* Pattern for PCB texture */}
            <pattern id="pcbPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.5" fill="#22d3ee" opacity="0.1" />
            </pattern>
          </defs>
          
          {/* Background pattern */}
          <rect width="400" height="500" fill="url(#pcbPattern)" opacity="0.3" />

          {/* Outer frame - double border */}
          <path
            d="M 15 15 L 385 15 L 385 485 L 15 485 Z"
            fill="none"
            stroke="url(#traceGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          <path
            d="M 25 25 L 375 25 L 375 475 L 25 475 Z"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
          />
          
          {/* Enhanced corner designs with multiple circles */}
          <g>
            {/* Top-left corner */}
            <circle cx="15" cy="15" r="5" fill="white" filter="url(#glow)" />
            <circle cx="15" cy="15" r="3" fill="#22d3ee" />
            <circle cx="15" cy="15" r="1.5" fill="white" />
            <path d="M 15 15 L 35 15 M 15 15 L 15 35" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Top-right corner */}
            <circle cx="385" cy="15" r="5" fill="white" filter="url(#glow)" />
            <circle cx="385" cy="15" r="3" fill="#22d3ee" />
            <circle cx="385" cy="15" r="1.5" fill="white" />
            <path d="M 385 15 L 365 15 M 385 15 L 385 35" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Bottom-right corner */}
            <circle cx="385" cy="485" r="5" fill="white" filter="url(#glow)" />
            <circle cx="385" cy="485" r="3" fill="#22d3ee" />
            <circle cx="385" cy="485" r="1.5" fill="white" />
            <path d="M 385 485 L 365 485 M 385 485 L 385 465" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Bottom-left corner */}
            <circle cx="15" cy="485" r="5" fill="white" filter="url(#glow)" />
            <circle cx="15" cy="485" r="3" fill="#22d3ee" />
            <circle cx="15" cy="485" r="1.5" fill="white" />
            <path d="M 15 485 L 35 485 M 15 485 L 15 465" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          
          {/* Top edge - complex circuit pattern */}
          <g>
            {/* Main traces */}
            <path d="M 40 25 L 40 45 M 80 25 L 80 45 M 120 25 L 120 45" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            <path d="M 280 25 L 280 45 M 320 25 L 320 45 M 360 25 L 360 45" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            
            {/* Connection nodes with gradient */}
            <circle cx="40" cy="45" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="40" cy="45" r="2" fill="white" />
            <circle cx="80" cy="45" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="80" cy="45" r="2" fill="white" />
            <circle cx="120" cy="45" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="120" cy="45" r="2" fill="white" />
            <circle cx="280" cy="45" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="280" cy="45" r="2" fill="white" />
            <circle cx="320" cy="45" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="320" cy="45" r="2" fill="white" />
            <circle cx="360" cy="45" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="360" cy="45" r="2" fill="white" />
            
            {/* Horizontal connections */}
            <path d="M 40 45 L 80 45 L 120 45" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M 280 45 L 320 45 L 360 45" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            
            {/* Diagonal traces */}
            <path d="M 40 45 L 60 65 M 80 45 L 100 65 M 120 45 L 140 65" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <path d="M 280 45 L 300 65 M 320 45 L 340 65 M 360 45 L 380 65" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </g>
          
          {/* Bottom edge - complex circuit pattern */}
          <g>
            <path d="M 40 475 L 40 455 M 80 475 L 80 455 M 120 475 L 120 455" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            <path d="M 280 475 L 280 455 M 320 475 L 320 455 M 360 475 L 360 455" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            
            <circle cx="40" cy="455" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="40" cy="455" r="2" fill="white" />
            <circle cx="80" cy="455" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="80" cy="455" r="2" fill="white" />
            <circle cx="120" cy="455" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="120" cy="455" r="2" fill="white" />
            <circle cx="280" cy="455" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="280" cy="455" r="2" fill="white" />
            <circle cx="320" cy="455" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="320" cy="455" r="2" fill="white" />
            <circle cx="360" cy="455" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="360" cy="455" r="2" fill="white" />
            
            <path d="M 40 455 L 80 455 L 120 455" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M 280 455 L 320 455 L 360 455" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            
            <path d="M 40 455 L 60 435 M 80 455 L 100 435 M 120 455 L 140 435" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <path d="M 280 455 L 300 435 M 320 455 L 340 435 M 360 455 L 380 435" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </g>
          
          {/* Left edge - complex circuit pattern */}
          <g>
            <path d="M 25 60 L 45 60 M 25 100 L 45 100 M 25 140 L 45 140" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            <path d="M 25 360 L 45 360 M 25 400 L 45 400 M 25 440 L 45 440" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            
            <circle cx="45" cy="60" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="45" cy="60" r="2" fill="white" />
            <circle cx="45" cy="100" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="45" cy="100" r="2" fill="white" />
            <circle cx="45" cy="140" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="45" cy="140" r="2" fill="white" />
            <circle cx="45" cy="360" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="45" cy="360" r="2" fill="white" />
            <circle cx="45" cy="400" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="45" cy="400" r="2" fill="white" />
            <circle cx="45" cy="440" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="45" cy="440" r="2" fill="white" />
            
            <path d="M 45 60 L 45 100 L 45 140" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M 45 360 L 45 400 L 45 440" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            
            <path d="M 45 60 L 65 80 M 45 100 L 65 120 M 45 140 L 65 160" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <path d="M 45 360 L 65 380 M 45 400 L 65 420 M 45 440 L 65 460" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </g>
          
          {/* Right edge - complex circuit pattern */}
          <g>
            <path d="M 375 60 L 355 60 M 375 100 L 355 100 M 375 140 L 355 140" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            <path d="M 375 360 L 355 360 M 375 400 L 355 400 M 375 440 L 355 440" stroke="white" strokeWidth="2" strokeLinecap="round" filter="url(#glow)" />
            
            <circle cx="355" cy="60" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="355" cy="60" r="2" fill="white" />
            <circle cx="355" cy="100" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="355" cy="100" r="2" fill="white" />
            <circle cx="355" cy="140" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="355" cy="140" r="2" fill="white" />
            <circle cx="355" cy="360" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="355" cy="360" r="2" fill="white" />
            <circle cx="355" cy="400" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="355" cy="400" r="2" fill="white" />
            <circle cx="355" cy="440" r="4" fill="url(#nodeGradient)" filter="url(#strongGlow)" />
            <circle cx="355" cy="440" r="2" fill="white" />
            
            <path d="M 355 60 L 355 100 L 355 140" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M 355 360 L 355 400 L 355 440" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            
            <path d="M 355 60 L 335 80 M 355 100 L 335 120 M 355 140 L 335 160" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            <path d="M 355 360 L 335 380 M 355 400 L 335 420 M 355 440 L 335 460" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </g>
          
          {/* Inner circuit patterns - creating a grid-like PCB pattern */}
          <g opacity="0.4">
            {/* Top inner patterns */}
            <rect x="60" y="65" width="60" height="2" fill="white" rx="1" />
            <rect x="280" y="65" width="60" height="2" fill="white" rx="1" />
            
            {/* Bottom inner patterns */}
            <rect x="60" y="433" width="60" height="2" fill="white" rx="1" />
            <rect x="280" y="433" width="60" height="2" fill="white" rx="1" />
            
            {/* Left inner patterns */}
            <rect x="65" y="80" width="2" height="60" fill="white" rx="1" />
            <rect x="65" y="360" width="2" height="60" fill="white" rx="1" />
            
            {/* Right inner patterns */}
            <rect x="333" y="80" width="2" height="60" fill="white" rx="1" />
            <rect x="333" y="360" width="2" height="60" fill="white" rx="1" />
            
            {/* Small connection dots in inner area */}
            <circle cx="120" cy="66" r="2" fill="#22d3ee" />
            <circle cx="340" cy="66" r="2" fill="#22d3ee" />
            <circle cx="120" cy="434" r="2" fill="#22d3ee" />
            <circle cx="340" cy="434" r="2" fill="#22d3ee" />
            <circle cx="66" cy="140" r="2" fill="#22d3ee" />
            <circle cx="66" cy="420" r="2" fill="#22d3ee" />
            <circle cx="334" cy="140" r="2" fill="#22d3ee" />
            <circle cx="334" cy="420" r="2" fill="#22d3ee" />
          </g>
          
          {/* Additional decorative circuit elements */}
          <g opacity="0.4">
            {/* Small squares like IC chips with glow */}
            <rect x="50" y="200" width="20" height="20" fill="none" stroke="url(#traceGradient)" strokeWidth="1.5" rx="2" filter="url(#glow)" />
            <rect x="330" y="200" width="20" height="20" fill="none" stroke="url(#traceGradient)" strokeWidth="1.5" rx="2" filter="url(#glow)" />
            <rect x="50" y="280" width="20" height="20" fill="none" stroke="url(#traceGradient)" strokeWidth="1.5" rx="2" filter="url(#glow)" />
            <rect x="330" y="280" width="20" height="20" fill="none" stroke="url(#traceGradient)" strokeWidth="1.5" rx="2" filter="url(#glow)" />
            
            {/* Pins on ICs with gradient */}
            <circle cx="50" cy="210" r="2" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle cx="70" cy="210" r="2" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle cx="50" cy="290" r="2" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle cx="70" cy="290" r="2" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle cx="330" cy="210" r="2" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle cx="350" cy="210" r="2" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle cx="330" cy="290" r="2" fill="url(#nodeGradient)" filter="url(#glow)" />
            <circle cx="350" cy="290" r="2" fill="url(#nodeGradient)" filter="url(#glow)" />
            
            {/* Additional circuit traces connecting ICs */}
            <path d="M 70 200 L 80 200 L 80 190" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            <path d="M 350 200 L 340 200 L 340 190" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            <path d="M 70 300 L 80 300 L 80 310" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            <path d="M 350 300 L 340 300 L 340 310" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
          </g>
          
          {/* Central decorative elements */}
          <g opacity="0.2">
            {/* Hexagonal pattern in center */}
            <path d="M 200 250 L 210 245 L 210 235 L 200 230 L 190 235 L 190 245 Z" fill="none" stroke="url(#traceGradient)" strokeWidth="1" filter="url(#glow)" />
            <circle cx="200" cy="240" r="3" fill="url(#nodeGradient)" filter="url(#glow)" />
            
            {/* Additional small traces */}
            <path d="M 180 240 L 200 240 L 220 240" stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
            <path d="M 200 220 L 200 240 L 200 260" stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
          </g>
        </svg>
        
        {children}
      </div>
    )
  }

  // Member card component
  const MemberCard = ({ member }: { member: CommitteeMember }) => {
    return (
      <div className="relative w-full">
        <CircuitFrame className="p-4 md:p-6 min-h-[280px] md:min-h-[300px] flex flex-col">
          <div className="relative z-10 flex flex-col items-center flex-1">
            {/* Image */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg bg-slate-800/50 border-2 border-slate-700/50 mb-3 flex items-center justify-center overflow-hidden shrink-0">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-slate-600 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="text-xs text-slate-500">Image Placeholder</p>
                </div>
              )}
            </div>

            {/* Name */}
            <h3 className="text-base md:text-lg font-bold text-white mb-2 text-center">
              {member.name}
            </h3>

            {/* Role */}
            <p className="text-xs text-emerald-400 font-medium text-center leading-relaxed px-2 flex-1 flex items-center">
              {member.role}
            </p>
          </div>
        </CircuitFrame>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 md:pt-32">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Committee
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Meet the dedicated team behind SCIENTIA 6
          </p>
        </div>
      </section>

      {/* Committee Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Leadership Row - Patron-in-Chief, Teacher Advisor, Chairperson */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[0] = el
          }}
          className="mb-20 md:mb-32"
        >
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-12 md:mb-16 text-center italic">
            Leadership
          </h2>

          {/* Members Grid - 3 columns full width with larger cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            {committeeData['Patron-in-Chief'].map((member, index) => (
              <div key={`patron-${index}`} className="flex flex-col w-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
                  Patron-in-Chief
                </h3>
                <div className="w-full">
                  <CircuitFrame className="p-5 md:p-6 min-h-[400px] md:min-h-[450px] flex flex-col">
                    <div className="relative z-10 flex flex-col items-center flex-1">
                      {/* Image */}
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg bg-slate-800/50 border-2 border-slate-700/50 mb-4 flex items-center justify-center overflow-hidden shrink-0">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <svg
                              className="w-16 h-16 mx-auto text-slate-600 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <p className="text-xs text-slate-500">Image Placeholder</p>
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 text-center">
                        {member.name}
                      </h3>

                      {/* Role */}
                      <p className="text-xs md:text-sm text-emerald-400 font-medium text-center leading-relaxed px-2 flex-1 flex items-center">
                        {member.role}
                      </p>
                    </div>
                  </CircuitFrame>
                </div>
              </div>
            ))}
            {committeeData['Teacher Advisor'].map((member, index) => (
              <div key={`advisor-${index}`} className="flex flex-col w-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
                  Teacher Advisor
                </h3>
                <div className="w-full">
                  <CircuitFrame className="p-5 md:p-6 min-h-[400px] md:min-h-[450px] flex flex-col">
                    <div className="relative z-10 flex flex-col items-center flex-1">
                      {/* Image */}
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg bg-slate-800/50 border-2 border-slate-700/50 mb-4 flex items-center justify-center overflow-hidden shrink-0">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <svg
                              className="w-16 h-16 mx-auto text-slate-600 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <p className="text-xs text-slate-500">Image Placeholder</p>
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 text-center">
                        {member.name}
                      </h3>

                      {/* Role */}
                      <p className="text-xs md:text-sm text-emerald-400 font-medium text-center leading-relaxed px-2 flex-1 flex items-center">
                        {member.role}
                      </p>
                    </div>
                  </CircuitFrame>
                </div>
              </div>
            ))}
            {committeeData['Chairperson'].map((member, index) => (
              <div key={`chairperson-${index}`} className="flex flex-col w-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
                  Chairperson
                </h3>
                <div className="w-full">
                  <CircuitFrame className="p-5 md:p-6 min-h-[400px] md:min-h-[450px] flex flex-col">
                    <div className="relative z-10 flex flex-col items-center flex-1">
                      {/* Image */}
                      <div className="w-48 h-48 md:w-56 md:h-56 rounded-lg bg-slate-800/50 border-2 border-slate-700/50 mb-4 flex items-center justify-center overflow-hidden shrink-0">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <svg
                              className="w-16 h-16 mx-auto text-slate-600 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            <p className="text-xs text-slate-500">Image Placeholder</p>
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 text-center">
                        {member.name}
                      </h3>

                      {/* Role */}
                      <p className="text-xs md:text-sm text-emerald-400 font-medium text-center leading-relaxed px-2 flex-1 flex items-center">
                        {member.role}
                      </p>
                    </div>
                  </CircuitFrame>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Committee Section */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[1] = el
          }}
          className="mb-20 md:mb-32"
        >
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-12 md:mb-16 text-center italic">
            Core Committee
          </h2>

          {/* President */}
          <div className="mb-16 md:mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center">
              President
            </h3>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                {committeeData['President'].map((member, index) => (
                  <MemberCard key={`president-${index}`} member={member} />
                ))}
              </div>
            </div>
          </div>

          {/* Vice-Presidents */}
          <div className="mb-16 md:mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center">
              Vice-Presidents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
              <div>
                <h4 className="text-lg md:text-xl font-semibold text-slate-300 mb-6 text-center">
                  Vice-President (Male)
                </h4>
                {committeeData['Vice-President (Male)'].map((member, index) => (
                  <MemberCard key={`vp-male-${index}`} member={member} />
                ))}
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-semibold text-slate-300 mb-6 text-center">
                  Vice-President (Female)
                </h4>
                {committeeData['Vice-President (Female)'].map((member, index) => (
                  <MemberCard key={`vp-female-${index}`} member={member} />
                ))}
              </div>
            </div>
          </div>

          {/* General Secretary */}
          <div className="mb-16 md:mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center">
              General Secretary
            </h3>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                {committeeData['General Secretary'].map((member, index) => (
                  <MemberCard key={`gs-${index}`} member={member} />
                ))}
              </div>
            </div>
          </div>

          {/* Treasurer */}
          <div className="mb-16 md:mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center">
              Treasurer
            </h3>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                {committeeData['Treasurer'].map((member, index) => (
                  <MemberCard key={`treasurer-${index}`} member={member} />
                ))}
              </div>
            </div>
          </div>

          {/* Joint Secretaries */}
          <div className="mb-16 md:mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 text-center">
              Joint Secretaries
            </h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-6xl mx-auto">
              {committeeData['Joint Secretaries'].map((member, index) => (
                <div key={`js-${index}`} className="w-full sm:w-[calc(50%-1rem)] md:w-[280px]">
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Committee

