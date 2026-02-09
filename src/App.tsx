import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Committee from './pages/Committee'
import Events from './pages/Events'
import RuleBook from './pages/RuleBook'
import GradingSystem from './pages/GradingSystem'
import PointsTable from './pages/PointsTable'
import Schedule from './pages/Schedule'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Loader from './components/Loader'

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        {isLoading && <Loader onComplete={handleLoaderComplete} />}
        {!isLoading && (
          <>
            <ScrollToTop />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/rule-book" element={<RuleBook />} />
                <Route path="/grading-system" element={<GradingSystem />} />
                <Route path="/points-table" element={<PointsTable />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/committee" element={<Committee />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
              </Routes>
            </main>
            <Footer />
            <Analytics />
          </>
        )}
      </div>
    </Router>
  )
}

export default App