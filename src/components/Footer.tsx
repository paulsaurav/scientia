import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="SCIENTIA Logo" 
                className="h-16 md:h-36 lg:h-28 mb-3 object-contain"
              />
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  SCIENTIA
                </span>
                <span className="text-slate-300 ml-2">6</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
              Annual Science Event of Assam University Science Block Departments. 
              Celebrating knowledge, innovation, and cultural diversity.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-slate-800/50 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-slate-800/50 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-slate-800/50 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-slate-800/50 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-slate-200 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Events', path: '/events' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Committee', path: '/committee' },
                { name: 'Schedule', path: '/schedule' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-slate-200 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-cyan-400 mt-1 shrink-0" />
                <span className="text-slate-400 text-sm">
                  Assam University<br />
                  Silchar, Assam, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400 shrink-0" />
                <a 
                  href="mailto:scientia@aus.ac.in" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  scientia@aus.ac.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-cyan-400 shrink-0" />
                <a 
                  href="tel:+917002909568" 
                  className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-sm"
                >
                  +91 7002909568
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {new Date().getFullYear()} SCIENTIA 6. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
