import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PrivacyPolicy = () => {
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

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 pt-24 md:pt-32">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-16 md:py-24 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section ref={contentRef} className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="prose prose-invert prose-slate max-w-none">
            <div className="space-y-8 text-slate-300">
              
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Introduction</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  SCIENTIA 6.0 ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website and participate in our annual science event.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Information We Collect</h2>
                <p className="text-base md:text-lg leading-relaxed mb-4">
                  We may collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                  <li>Name, email address, phone number, and contact information</li>
                  <li>Registration details for events and competitions</li>
                  <li>Institutional affiliation and academic details</li>
                  <li>Any other information you choose to provide</li>
                </ul>
                <p className="text-base md:text-lg leading-relaxed mt-4">
                  We may also automatically collect certain information about your device when you access our website, 
                  including IP address, browser type, operating system, and usage patterns.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">How We Use Your Information</h2>
                <p className="text-base md:text-lg leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                  <li>Process and manage event registrations</li>
                  <li>Communicate with you about events, schedules, and updates</li>
                  <li>Send administrative information and respond to inquiries</li>
                  <li>Improve our website and user experience</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Information Sharing</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information 
                  only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4 mt-4">
                  <li>With event organizers, judges, and authorized personnel for event management purposes</li>
                  <li>With service providers who assist us in operating our website and conducting events</li>
                  <li>When required by law or to protect our rights and safety</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Data Security</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
                  internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Your Rights</h2>
                <p className="text-base md:text-lg leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Rectify inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  Our website may use cookies and similar tracking technologies to enhance your experience, analyze website 
                  traffic, and understand user preferences. You can control cookie preferences through your browser settings.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Third-Party Links</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices 
                  or content of these external sites. We encourage you to review the privacy policies of any third-party 
                  sites you visit.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Changes to This Policy</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an 
                  updated revision date. We encourage you to review this policy periodically to stay informed about how 
                  we protect your information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
                  please contact us at:
                </p>
                <div className="mt-4 space-y-2 text-base md:text-lg">
                  <p>Email: <a href="mailto:scientia@aus.ac.in" className="text-cyan-400 hover:text-cyan-300 transition-colors">scientia@aus.ac.in</a></p>
                  <p>Phone: <a href="tel:+917002909568" className="text-cyan-400 hover:text-cyan-300 transition-colors">+91 7002909568</a></p>
                  <p>Address: Assam University, Silchar, Assam, India</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy

