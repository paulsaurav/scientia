import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Set active path based on current route
  const activePath = location.pathname

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Subtle glassmorphism */}
      <div className="absolute inset-0 backdrop-blur-md bg-slate-950/40 border-b border-slate-800/30"></div>

      <nav className="relative max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-5">
        <div className="flex items-center justify-between">
          {/* Logo - Funky but subtle */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <img 
              src="/logo.png" 
              alt="SCIENTIA Logo" 
              className="h-8 md:h-10 lg:h-12 object-contain"
            />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[-0.02em] relative">
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient">
                SCIENTIA
              </span>
            </h1>
            {/* Funky accent dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors duration-300"></span>
            <span className="text-sm md:text-base font-semibold text-slate-400 tracking-wider ml-1">
              6
            </span>
          </Link>

          {/* Navigation Links - Clean and modern */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <Link
              to="/"
              className={`relative text-xs font-medium transition-colors duration-200 tracking-wide uppercase ${
                activePath === '/' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Home
            </Link>

            {/* Events dropdown */}
            <div className="relative group">
              <Link
                to="/events"
                className={`relative text-xs font-medium transition-colors duration-200 tracking-wide uppercase flex items-center gap-1 ${
                  ['/events', '/rule-book', '/grading-system', '/points-table'].includes(activePath)
                    ? 'text-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Events
                <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800/50 rounded-lg py-2 min-w-[180px] shadow-xl">
                  <Link
                    to="/events"
                    className={`block px-4 py-2.5 text-sm uppercase tracking-wide transition-colors ${
                      activePath === '/events' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    Events
                  </Link>
                  <Link
                    to="/rule-book"
                    className={`block px-4 py-2.5 text-sm uppercase tracking-wide transition-colors ${
                      activePath === '/rule-book' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    Rule Book
                  </Link>
                  <Link
                    to="/grading-system"
                    className={`block px-4 py-2.5 text-sm uppercase tracking-wide transition-colors ${
                      activePath === '/grading-system' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    Grading System
                  </Link>
                  <Link
                    to="/points-table"
                    className={`block px-4 py-2.5 text-sm uppercase tracking-wide transition-colors ${
                      activePath === '/points-table' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                  >
                    Points Table
                  </Link>
                </div>
              </div>
            </div>

            {[
              { name: 'Gallery', path: '/gallery' },
              { name: 'Committee', path: '/committee' },
              { name: 'Schedule', path: '/schedule' },
            ].map((item) => {
              const isActive = activePath === item.path
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-xs font-medium transition-colors duration-200 tracking-wide uppercase ${
                    isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button - Minimalist */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute top-0 left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-2' : ''
                }`}
              ></span>
              <span
                className={`absolute top-2 left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`absolute top-4 left-0 w-full h-[1.5px] bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu - Clean dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-down">
            <div className="flex flex-col gap-1 pt-4 border-t border-slate-800/40">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 rounded-md transition-all duration-200 text-sm font-medium uppercase tracking-wide"
              >
                Home
              </Link>
              <div className="pl-4 border-l border-slate-700/50 space-y-1 my-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider py-1.5">Events</p>
                <Link to="/events" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 rounded-md text-sm font-medium uppercase tracking-wide">Events</Link>
                <Link to="/rule-book" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 rounded-md text-sm font-medium uppercase tracking-wide">Rule Book</Link>
                <Link to="/grading-system" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 rounded-md text-sm font-medium uppercase tracking-wide">Grading System</Link>
                <Link to="/points-table" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 rounded-md text-sm font-medium uppercase tracking-wide">Points Table</Link>
              </div>
              {[
                { name: 'Gallery', path: '/gallery' },
                { name: 'Committee', path: '/committee' },
                { name: 'Schedule', path: '/schedule' },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 rounded-md transition-all duration-200 text-sm font-medium uppercase tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

