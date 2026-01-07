import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { FaMicroscope, FaRocket, FaUsers, FaTrophy } from 'react-icons/fa'

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const decor1Ref = useRef<HTMLDivElement>(null)
  const decor2Ref = useRef<HTMLDivElement>(null)
  const featuresSectionRef = useRef<HTMLElement>(null)
  const featureCardsRef = useRef<HTMLDivElement>(null)
  const aboutAUSectionRef = useRef<HTMLElement>(null)
  const aboutAUTextRef = useRef<HTMLDivElement>(null)
  const aboutAUImageRef = useRef<HTMLDivElement>(null)
  const aboutScientiaSectionRef = useRef<HTMLElement>(null)
  const aboutScientiaTextRef = useRef<HTMLDivElement>(null)
  const aboutScientiaImageRef = useRef<HTMLDivElement>(null)
  const highlightsSectionRef = useRef<HTMLElement>(null)
  const highlightsItemsRef = useRef<HTMLDivElement>(null)
  const messagesSectionRef = useRef<HTMLElement>(null)
  const messagesGridRef = useRef<HTMLDivElement>(null)
  const vcImageRef = useRef<HTMLDivElement>(null)
  const vcMessageRef = useRef<HTMLDivElement>(null)
  const registrarImageRef = useRef<HTMLDivElement>(null)
  const registrarMessageRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState<Set<string>>(new Set())

  // Function to split text into words and make them interactive
  const splitIntoWords = (text: string, className: string = '') => {
    return text.split(' ').map((word, index) => (
      <span
        key={index}
        className={`word-hover inline-block cursor-pointer ${className}`}
        data-word={word}
        onMouseEnter={(e) => handleWordHover(e)}
      >
        {word}
        {index < text.split(' ').length - 1 && '\u00A0'}
      </span>
    ))
  }

  // Handle word hover with falling and breaking effect
  const handleWordHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    const wordElement = e.currentTarget
    const word = wordElement.dataset.word
    if (!word || isAnimating.has(word)) return

    setIsAnimating(prev => new Set(prev).add(word))

    // Get original position and styles
    const rect = wordElement.getBoundingClientRect()
    const originalX = rect.left
    const originalY = rect.top
    const viewportHeight = window.innerHeight
    const computedStyle = window.getComputedStyle(wordElement)
    
    // Check if element has gradient (bg-clip-text)
    const hasGradient = wordElement.classList.contains('bg-clip-text') || 
                       computedStyle.backgroundImage !== 'none'

    // Hide original temporarily
    gsap.set(wordElement, { opacity: 0 })

    // Break word into letters for shattering effect
    const letters = word.split('')
    const letterElements: HTMLElement[] = []

    letters.forEach((letter, i) => {
      const letterEl = document.createElement('span')
      letterEl.textContent = letter === ' ' ? '\u00A0' : letter
      letterEl.style.position = 'fixed'
      letterEl.style.left = `${originalX + (i * (rect.width / letters.length))}px`
      letterEl.style.top = `${originalY}px`
      letterEl.style.fontSize = computedStyle.fontSize
      letterEl.style.fontWeight = computedStyle.fontWeight
      letterEl.style.fontFamily = computedStyle.fontFamily
      letterEl.style.letterSpacing = computedStyle.letterSpacing
      letterEl.style.pointerEvents = 'none'
      letterEl.style.zIndex = '1000'
      
      // Handle gradient text
      if (hasGradient) {
        letterEl.style.background = 'linear-gradient(to right, #34d399, #22d3ee, #3b82f6)'
        letterEl.style.webkitBackgroundClip = 'text'
        letterEl.style.backgroundClip = 'text'
        letterEl.style.webkitTextFillColor = 'transparent'
        letterEl.style.color = 'transparent'
      } else {
        letterEl.style.color = computedStyle.color
      }
      
      document.body.appendChild(letterEl)
      letterElements.push(letterEl)
    })

    // Animate letters falling with gravity and breaking effect
    const fallDistance = viewportHeight - originalY + 100
    const randomX = () => (Math.random() - 0.5) * 300
    const randomRotation = () => (Math.random() - 0.5) * 360

    letterElements.forEach((letterEl, i) => {
      const delay = i * 0.03
      const xOffset = randomX()
      const rotation = randomRotation()
      const fallDuration = 0.9 + Math.random() * 0.5

      // Initial explosion outward (breaking effect)
      gsap.to(letterEl, {
        x: xOffset * 0.5,
        y: -40 + Math.random() * 30,
        rotation: rotation,
        scale: 1.3,
        duration: 0.2,
        ease: 'power3.out',
        delay: delay
      })

      // Then fall with gravity (physics-based)
      gsap.to(letterEl, {
        x: xOffset,
        y: fallDistance,
        rotation: rotation + (Math.random() - 0.5) * 1080,
        scale: 0.3,
        opacity: 0,
        duration: fallDuration,
        ease: 'power2.in',
        delay: delay + 0.2,
        onComplete: () => {
          letterEl.remove()
        }
      })
    })

    // Reset original word after animation
    setTimeout(() => {
      gsap.to(wordElement, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
      setIsAnimating(prev => {
        const newSet = new Set(prev)
        newSet.delete(word)
        return newSet
      })
    }, 2500)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for sequential animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Animate title with letter splitting effect
      if (titleRef.current) {
        const titleText = titleRef.current.querySelector('.title-text')
        const titleNumber = titleRef.current.querySelector('.title-number')
        
        if (titleText) {
          gsap.set(titleText, { opacity: 0, y: 50 })
          tl.to(titleText, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out'
          })
        }
        
        if (titleNumber) {
          gsap.set(titleNumber, { opacity: 0, scale: 0, rotation: -180 })
          tl.to(titleNumber, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
          }, '-=0.5')
        }
      }

      // Animate subtitle
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 })
        tl.to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.4')
      }

      // Animate description
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 0, y: 20 })
        tl.to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.3')
      }

      // Animate buttons with stagger
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.children
        gsap.set(buttons, { opacity: 0, scale: 0.8, y: 20 })
        tl.to(buttons, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.2)'
        }, '-=0.2')
      }

      // Animate decorative elements
      if (decor1Ref.current) {
        gsap.set(decor1Ref.current, { opacity: 0, scale: 0, rotation: -90 })
        gsap.to(decor1Ref.current, {
          opacity: 0.2,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.5
        })
      }

      if (decor2Ref.current) {
        gsap.set(decor2Ref.current, { opacity: 0, scale: 0, rotation: 45 })
        gsap.to(decor2Ref.current, {
          opacity: 0.2,
          scale: 1,
          rotation: 45,
          duration: 1.2,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.7
        })
      }

      // Floating animation for decorative elements
      if (decor1Ref.current) {
        gsap.to(decor1Ref.current, {
          y: '+=20',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.5
        })
      }

      if (decor2Ref.current) {
        gsap.to(decor2Ref.current, {
          y: '-=15',
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.7
        })
      }

      // Parallax effect on scroll
      const handleScroll = () => {
        if (heroRef.current) {
          const scrolled = window.scrollY
          gsap.to(heroRef.current, {
            y: scrolled * 0.3,
            duration: 0.5,
            ease: 'power1.out'
          })
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true })

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Animate features section on scroll
  useEffect(() => {
    if (!featuresSectionRef.current || !featureCardsRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = featureCardsRef.current?.children
            if (cards) {
              gsap.fromTo(
                Array.from(cards),
                {
                  opacity: 0,
                  y: 80,
                  scale: 0.8,
                  rotation: -5
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotation: 0,
                  duration: 1,
                  stagger: 0.15,
                  ease: 'back.out(1.2)'
                }
              )
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(featuresSectionRef.current)

    return () => {
      if (featuresSectionRef.current) {
        observer.unobserve(featuresSectionRef.current)
      }
    }
  }, [])

  // Animate About Assam University section
  useEffect(() => {
    if (!aboutAUSectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            // Animate image sliding in from left
            if (aboutAUImageRef.current) {
              gsap.set(aboutAUImageRef.current, { x: -100, opacity: 0 })
              tl.to(aboutAUImageRef.current, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out'
              })
            }

            // Animate text sliding in from right with stagger
            if (aboutAUTextRef.current) {
              const heading = aboutAUTextRef.current.querySelector('h2')
              const paragraphs = aboutAUTextRef.current.querySelectorAll('p')
              
              if (heading) {
                gsap.set(heading, { x: 100, opacity: 0 })
                tl.to(heading, {
                  x: 0,
                  opacity: 1,
                  duration: 0.8
                }, '-=0.6')
              }

              paragraphs.forEach((p) => {
                gsap.set(p, { x: 50, opacity: 0 })
                tl.to(p, {
                  x: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: 'power2.out'
                }, '-=0.4')
              })
            }

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(aboutAUSectionRef.current)

    return () => {
      if (aboutAUSectionRef.current) {
        observer.unobserve(aboutAUSectionRef.current)
      }
    }
  }, [])

  // Animate About SCIENTIA section
  useEffect(() => {
    if (!aboutScientiaSectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            // Animate image sliding in from right with rotation
            if (aboutScientiaImageRef.current) {
              gsap.set(aboutScientiaImageRef.current, { x: 100, opacity: 0, rotation: 5 })
              tl.to(aboutScientiaImageRef.current, {
                x: 0,
                opacity: 1,
                rotation: 0,
                duration: 1.2,
                ease: 'power3.out'
              })
            }

            // Animate text sliding in from left
            if (aboutScientiaTextRef.current) {
              const heading = aboutScientiaTextRef.current.querySelector('h2')
              const paragraphs = aboutScientiaTextRef.current.querySelectorAll('p')
              
              if (heading) {
                gsap.set(heading, { x: -100, opacity: 0, scale: 0.9 })
                tl.to(heading, {
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.8
                }, '-=0.6')
              }

              paragraphs.forEach((p) => {
                gsap.set(p, { x: -50, opacity: 0 })
                tl.to(p, {
                  x: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: 'power2.out'
                }, '-=0.4')
              })
            }

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(aboutScientiaSectionRef.current)

    return () => {
      if (aboutScientiaSectionRef.current) {
        observer.unobserve(aboutScientiaSectionRef.current)
      }
    }
  }, [])

  // Animate Festival Highlights section with counter animation
  useEffect(() => {
    if (!highlightsSectionRef.current || !highlightsItemsRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = highlightsItemsRef.current?.children
            if (items) {
              // Animate heading first
              const heading = highlightsSectionRef.current?.querySelector('h2')
              if (heading) {
                gsap.fromTo(heading, 
                  { opacity: 0, y: -30, scale: 0.95 },
                  { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
                )
              }

              // Counter animation for numbers
              Array.from(items).forEach((item, i) => {
                const numberElement = item.querySelector('span[data-number]') as HTMLElement
                const label = item.querySelector('h3')
                const desc = item.querySelector('p')
                
                if (numberElement) {
                  const originalText = numberElement.getAttribute('data-number') || numberElement.textContent || ''
                  const match = originalText.match(/(\d+)(\+)?/)
                  
                  if (match) {
                    const targetNumber = parseInt(match[1])
                    const hasPlus = match[2] === '+'
                    
                    // Set initial value to 0
                    numberElement.textContent = '0' + (hasPlus ? '+' : '')
                    
                    // Animate number appearance first
                    gsap.fromTo(numberElement,
                      { opacity: 0, scale: 0, rotation: -180 },
                      { 
                        opacity: 1, 
                        scale: 1, 
                        rotation: 0,
                        duration: 1,
                        ease: 'back.out(2)',
                        delay: i * 0.15,
                        onComplete: () => {
                          // Counter animation from 0 to target
                          const obj = { value: 0 }
                          gsap.to(obj, {
                            value: targetNumber,
                            duration: 2,
                            ease: 'power2.out',
                            onUpdate: () => {
                              numberElement.textContent = Math.floor(obj.value) + (hasPlus ? '+' : '')
                            }
                          })
                        }
                      }
                    )
                  } else {
                    // For non-numeric (like just "6")
                    // Set initial value to 0
                    numberElement.textContent = '0'
                    
                    gsap.fromTo(numberElement,
                      { opacity: 0, scale: 0, rotation: -180 },
                      { 
                        opacity: 1, 
                        scale: 1, 
                        rotation: 0,
                        duration: 1,
                        ease: 'back.out(2)',
                        delay: i * 0.15,
                        onComplete: () => {
                          // Counter animation from 0 to target
                          const targetNumber = parseInt(originalText) || 0
                          const obj = { value: 0 }
                          gsap.to(obj, {
                            value: targetNumber,
                            duration: 2,
                            ease: 'power2.out',
                            onUpdate: () => {
                              numberElement.textContent = Math.floor(obj.value).toString()
                            }
                          })
                        }
                      }
                    )
                  }
                }

                if (label) {
                  gsap.fromTo(label,
                    { opacity: 0, y: 20 },
                    { 
                      opacity: 1, 
                      y: 0,
                      duration: 0.6,
                      ease: 'power2.out',
                      delay: i * 0.15 + 0.3
                    }
                  )
                }

                if (desc) {
                  gsap.fromTo(desc,
                    { opacity: 0, y: 10 },
                    { 
                      opacity: 1, 
                      y: 0,
                      duration: 0.5,
                      ease: 'power2.out',
                      delay: i * 0.15 + 0.5
                    }
                  )
                }
              })
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(highlightsSectionRef.current)

    return () => {
      if (highlightsSectionRef.current) {
        observer.unobserve(highlightsSectionRef.current)
      }
    }
  }, [])

  // Animate Messages section on scroll
  useEffect(() => {
    if (!messagesSectionRef.current || !messagesGridRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = messagesGridRef.current?.children
            if (items) {
              // Animate heading first
              const heading = messagesSectionRef.current?.querySelector('h2')
              if (heading) {
                gsap.fromTo(heading,
                  { opacity: 0, y: -30, scale: 0.95 },
                  { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
                )
              }

              // Animate individual elements with more sophisticated animations
              if (vcImageRef.current) {
                gsap.fromTo(vcImageRef.current,
                  { opacity: 0, x: -80, scale: 0.9, rotationY: -15 },
                  { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 1.2, ease: 'power3.out', delay: 0.2 }
                )
              }
              
              if (vcMessageRef.current) {
                gsap.fromTo(vcMessageRef.current,
                  { opacity: 0, x: 80, scale: 0.9, rotationY: 15 },
                  { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 1.2, ease: 'power3.out', delay: 0.4 }
                )
              }
              
              if (registrarImageRef.current) {
                gsap.fromTo(registrarImageRef.current,
                  { opacity: 0, x: -80, scale: 0.9, rotationY: -15 },
                  { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
                )
              }
              
              if (registrarMessageRef.current) {
                gsap.fromTo(registrarMessageRef.current,
                  { opacity: 0, x: 80, scale: 0.9, rotationY: 15 },
                  { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 1.2, ease: 'power3.out', delay: 0.8 }
                )
              }
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(messagesSectionRef.current)

    return () => {
      if (messagesSectionRef.current) {
        observer.unobserve(messagesSectionRef.current)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section 
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div 
          ref={heroRef}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero2.jpg)' }}
        >
          {/* Minimal overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-950/15 via-slate-950/10 to-slate-950/20"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-40 text-center">
          {/* Subtle backdrop blur behind text for readability */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-2xl h-[450px] -z-10 backdrop-blur-sm bg-slate-950/10 rounded-2xl border border-slate-800/20"></div>
          {/* Main Heading */}
          <div className="mb-6">
            <h1 ref={titleRef} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.02em] mb-4">
              <span 
                className="title-text word-hover inline-block cursor-pointer bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 transition-transform duration-200"
                data-word="SCIENTIA"
                onMouseEnter={handleWordHover}
              >
                SCIENTIA
              </span>
              <span 
                className="title-number word-hover inline-block cursor-pointer text-slate-200 ml-3 font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] hover:scale-110 transition-transform duration-200"
                data-word="6"
                onMouseEnter={handleWordHover}
              >
                6
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-xl md:text-2xl lg:text-3xl text-slate-100 font-medium tracking-wide mb-6 max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {splitIntoWords('Where Science Meets Innovation', 'hover:text-cyan-400 transition-colors duration-200')}
          </p>

          {/* Description */}
          <p ref={descriptionRef} className="text-base md:text-lg text-slate-200 font-normal tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            {splitIntoWords('Join us for the 6th edition of our university festival celebrating knowledge, discovery, and the wonders of science and technology.', 'hover:text-cyan-300 transition-colors duration-200')}
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button className="group relative px-8 py-3.5 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full tracking-wide uppercase text-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]">
              <span className="relative z-10 cursor-pointer">Download Brochure</span>
              <span className="absolute inset-0 bg-linear-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            
            <Link 
              to="/schedule"
              className="group px-8 py-3.5 border-2 border-slate-600/50 text-slate-300 font-semibold rounded-full tracking-wide uppercase text-sm transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-400 hover:bg-slate-900/40 backdrop-blur-sm inline-block"
            >
              <span className="relative cursor-pointer">View Schedule</span>
            </Link>
          </div>

          {/* Decorative Elements - Subtle scientific icons */}
          <div ref={decor1Ref} className="absolute top-20 left-10 w-16 h-16 opacity-20 hidden lg:block">
            <div className="w-full h-full border-2 border-cyan-400/30 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border border-cyan-400/30 rounded-full"></div>
            </div>
          </div>
          
          <div ref={decor2Ref} className="absolute bottom-20 right-10 w-12 h-12 opacity-20 hidden lg:block">
            <div className="w-full h-full border-2 border-purple-400/30 transform rotate-45"></div>
          </div>
        </div>
      </section>

      {/* New Section - About/Highlights */}
      <section ref={featuresSectionRef} className="relative py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Experience Innovation
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              A celebration of knowledge, discovery, and cutting-edge science
            </p>
          </div>

          {/* Feature Cards */}
          <div ref={featureCardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: 'Tech Talks',
                description: 'Engage with leading scientists and innovators sharing groundbreaking research',
                icon: FaMicroscope
              },
              {
                title: 'Exhibitions',
                description: 'Discover interactive displays showcasing scientific achievements and innovations',
                icon: FaRocket
              },
              {
                title: 'Cultural Meet',
                description: 'Celebrate diversity through cultural performances, traditions, and artistic expressions',
                icon: FaUsers
              },
              {
                title: 'Sports',
                description: 'Compete and cheer in exciting sports events and athletic competitions',
                icon: FaTrophy
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon
              return (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 hover:bg-slate-900/50"
              >
                <div className="text-5xl mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300 pointer-events-none"></div>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Assam University Section */}
      <section ref={aboutAUSectionRef} className="relative py-24 md:py-32 bg-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Text Content */}
          <div ref={aboutAUTextRef} className="px-6 md:px-12 lg:px-16 flex flex-col justify-center order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                About Assam University
              </span>
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p className="text-base md:text-lg">
                Assam University is a premier institution of higher education located in the beautiful state of Assam, India. Established with a vision to promote excellence in teaching, research, and innovation, the university has been at the forefront of academic excellence.
              </p>
              <p className="text-base md:text-lg">
                The university offers a wide range of undergraduate, postgraduate, and doctoral programs across various disciplines including science, technology, arts, commerce, and social sciences. With state-of-the-art facilities and a dedicated faculty, Assam University continues to shape the future of education.
              </p>
              <p className="text-base md:text-lg">
                SCIENTIA, our Annual Science Event, brings together students, faculty, and visitors to celebrate knowledge, innovation, and cultural diversity through a series of engaging events, competitions, and exhibitions.
              </p>
            </div>
          </div>

          {/* Image Content - Full Right Side */}
          <div ref={aboutAUImageRef} className="order-1 lg:order-2 relative min-h-[400px] lg:min-h-full">
            <img 
              src="/aus.jpg" 
              alt="Assam University" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Scientia Section */}
      <section ref={aboutScientiaSectionRef} className="relative py-24 md:py-32 bg-slate-950">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Image Content - Full Left Side */}
          <div ref={aboutScientiaImageRef} className="order-1 relative min-h-[400px] lg:min-h-full">
            <img 
              src="/scientia.jpeg" 
              alt="SCIENTIA Festival" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div ref={aboutScientiaTextRef} className="px-6 md:px-12 lg:px-16 flex flex-col justify-center order-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                About SCIENTIA
              </span>
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p className="text-base md:text-lg">
                SCIENTIA is the Annual Science Event of Assam University Science Block Departments, now celebrating its 6th edition. This grand celebration brings together research scholars, students, faculty, alumni, and visitors from across the region to experience a unique blend of science, technology, culture, and sports.
              </p>
              <p className="text-base md:text-lg">
                The festival showcases the best of academic excellence through tech talks, exhibitions, presentations, and other activities while also celebrating the rich cultural diversity of our community through cultural meets and competitive sports events.
              </p>
              <p className="text-base md:text-lg">
                SCIENTIA 6 promises to be bigger and better, with innovative events, inspiring speakers, and unforgettable experiences that celebrate knowledge, creativity, and the spirit of discovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Messages Section */}
      <section ref={messagesSectionRef} id="messages" className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4">
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Messages from Leadership
              </span>
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 mx-auto rounded-full"></div>
          </div>

          {/* Messages Grid - 2 columns, 4 cells (2x2) */}
          <div ref={messagesGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Vice Chancellor - Image */}
            <div ref={vcImageRef} className="group relative overflow-hidden rounded-3xl border-2 border-slate-800/30 bg-slate-950/50 backdrop-blur-md hover:border-cyan-500/60 transition-all duration-500 shadow-2xl">
              <div className="relative h-80 md:h-96 overflow-hidden">
                <img
                  src="/team/vc.avif"
                  alt="Vice Chancellor"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-110 contrast-110 saturate-110"
                />
                {/* Gradient overlay - much lighter for better image visibility */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-slate-950/10 to-transparent z-10"></div>
                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-400/30 rounded-tr-3xl z-20"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-cyan-400/30 rounded-bl-3xl z-20"></div>
                {/* Name overlay - lighter background */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-slate-950/80 via-slate-950/50 to-transparent z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-linear-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white">Vice Chancellor</h3>
                      <p className="text-sm text-cyan-400 font-semibold mt-1">Prof. Rajive Mohan Pant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vice Chancellor - Message */}
            <div ref={vcMessageRef} className="group relative p-8 md:p-10 rounded-3xl border-2 border-slate-800/30 bg-slate-950/50 backdrop-blur-md hover:border-cyan-500/60 transition-all duration-500 flex flex-col justify-center shadow-2xl">
              {/* Decorative quote mark */}
              <div className="absolute top-6 left-6 text-6xl font-black text-cyan-400/20 leading-none">"</div>
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1">Vice Chancellor's Message</h3>
                  <div className="w-16 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500"></div>
                </div>
                <p className="text-slate-300 leading-relaxed text-base md:text-lg relative z-10">
                  It gives me immense pleasure to extend my warm greetings to all participants, organizers, and attendees of <span className="text-cyan-400 font-semibold">SCIENTIA 6</span>. This festival represents the spirit of innovation, discovery, and excellence that defines Assam University. I encourage everyone to make the most of this opportunity to learn, collaborate, and celebrate the wonders of science and technology.
                </p>
              </div>
            </div>

            {/* Registrar - Image */}
            <div ref={registrarImageRef} className="group relative overflow-hidden rounded-3xl border-2 border-slate-800/30 bg-slate-950/50 backdrop-blur-md hover:border-cyan-500/60 transition-all duration-500 shadow-2xl">
              <div className="relative h-80 md:h-96">
                <div className="absolute inset-0 bg-linear-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border-2 border-slate-600/50">
                      <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Registrar</p>
                  </div>
                </div>
                {/* When image is added, uncomment:
                <img
                  src="/team/registrar.jpg"
                  alt="Registrar"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                */}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                {/* Decorative corner accent */}
                <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-3xl"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30 rounded-br-3xl"></div>
                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-slate-950/95 to-transparent">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-8 bg-linear-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-white">Registrar</h3>
                      <p className="text-sm text-cyan-400 font-semibold mt-1">Dr. Pradosh Kiran Nath</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registrar - Message */}
            <div ref={registrarMessageRef} className="group relative p-8 md:p-10 rounded-3xl border-2 border-slate-800/30 bg-slate-950/50 backdrop-blur-md hover:border-cyan-500/60 transition-all duration-500 flex flex-col justify-center shadow-2xl">
              {/* Decorative quote mark */}
              <div className="absolute top-6 right-6 text-6xl font-black text-cyan-400/20 leading-none">"</div>
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1">Registrar's Message</h3>
                  <div className="w-16 h-0.5 bg-linear-to-r from-cyan-400 to-blue-500"></div>
                </div>
                <p className="text-slate-300 leading-relaxed text-base md:text-lg relative z-10">
                  <span className="text-cyan-400 font-semibold">SCIENTIA 6</span> is a testament to the academic excellence and vibrant culture of Assam University. As we celebrate this milestone, I commend the organizing committee and all participants for their dedication and enthusiasm. May this festival inspire innovation, foster collaboration, and create lasting memories for everyone involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Highlights Section */}
      <section ref={highlightsSectionRef} className="relative py-24 md:py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Festival Highlights
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Celebrating excellence, innovation, and community spirit
            </p>
          </div>

          {/* Highlights Grid */}
          <div ref={highlightsItemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                number: '5',
                label: 'Editions of Excellence',
                description: 'Celebrating the 6th edition of SCIENTIA'
              },
              {
                number: '20+',
                label: 'Events & Activities',
                description: 'Diverse range of competitions and showcases'
              },
              {
                number: '1000+',
                label: 'Participants',
                description: 'Students, scholars, and faculty members'
              },
              {
                number: '10+',
                label: 'Departments',
                description: 'Science block departments participating'
              }
            ].map((highlight, index) => (
              <div
                key={index}
                className="group text-center"
              >
                {/* Number */}
                <div className="mb-3">
                  <span 
                    data-number={highlight.number}
                    className="text-6xl md:text-7xl font-black bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
                  >
                    {highlight.number}
                  </span>
                </div>
                
                {/* Label */}
                <h3 className="text-xl font-semibold text-slate-200 mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {highlight.label}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

