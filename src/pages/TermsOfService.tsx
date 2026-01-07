import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TermsOfService = () => {
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
              Terms of Service
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
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Agreement to Terms</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  By accessing and using the SCIENTIA 6.0 website and participating in our events, you accept and agree 
                  to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, 
                  please do not use our website or services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Use License</h2>
                <p className="text-base md:text-lg leading-relaxed mb-4">
                  Permission is granted to temporarily access and use the SCIENTIA 6.0 website for personal, non-commercial 
                  transitory viewing only. This is the grant of a license, not a transfer of title, and under this license 
                  you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Event Registration and Participation</h2>
                <p className="text-base md:text-lg leading-relaxed mb-4">
                  By registering for any event or competition as part of SCIENTIA 6.0, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                  <li>Provide accurate and complete registration information</li>
                  <li>Comply with all event rules, regulations, and guidelines</li>
                  <li>Conduct yourself in a professional and respectful manner</li>
                  <li>Respect intellectual property rights of others</li>
                  <li>Abide by all applicable laws and regulations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Intellectual Property</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  All content, materials, logos, designs, and other intellectual property displayed on this website are the 
                  property of SCIENTIA 6.0 or its content suppliers and are protected by copyright and other intellectual 
                  property laws. Unauthorized copying, reproduction, or distribution of any materials from this website is 
                  strictly prohibited without explicit written permission.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">User Content</h2>
                <p className="text-base md:text-lg leading-relaxed mb-4">
                  You retain ownership of any content you submit, post, or display on or through our services. By submitting 
                  content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and 
                  display such content in connection with the operation of SCIENTIA 6.0 events and promotion.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  You represent and warrant that you have all necessary rights to grant this license and that your content 
                  does not violate any third-party rights or applicable laws.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Prohibited Conduct</h2>
                <p className="text-base md:text-lg leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg ml-4">
                  <li>Use the website in any way that violates any applicable laws or regulations</li>
                  <li>Transmit any viruses, malware, or harmful code</li>
                  <li>Attempt to gain unauthorized access to any portion of the website</li>
                  <li>Interfere with or disrupt the website or servers</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation</li>
                  <li>Collect or store personal data about other users without permission</li>
                  <li>Engage in any conduct that could damage our reputation or interests</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Disclaimer</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  The materials on the SCIENTIA 6.0 website are provided on an 'as is' basis. We make no warranties, 
                  expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, 
                  implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                  of intellectual property or other violation of rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Limitations of Liability</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  In no event shall SCIENTIA 6.0 or its organizers be liable for any damages (including, without limitation, 
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                  to use the materials on this website, even if we or an authorized representative has been notified orally 
                  or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Event Cancellation and Changes</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  We reserve the right to cancel, modify, or reschedule any event, competition, or activity at any time 
                  without prior notice. We are not liable for any costs, expenses, or damages incurred as a result of such 
                  cancellations or changes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Termination</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  We reserve the right to terminate or suspend access to our website and services immediately, without prior 
                  notice, for any conduct that we believe violates these Terms of Service or is harmful to other users, us, 
                  or third parties, or for any other reason.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Changes to Terms</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  We reserve the right to revise these Terms of Service at any time without notice. By using this website, 
                  you are agreeing to be bound by the then current version of these Terms of Service. We encourage you to 
                  review these terms periodically.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Governing Law</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  These Terms of Service shall be governed by and construed in accordance with the laws of India, without 
                  regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the 
                  exclusive jurisdiction of the courts in Assam, India.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Contact Information</h2>
                <p className="text-base md:text-lg leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService

