import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const Gallery = () => {
  const galleryRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Placeholder images - replace with actual images later
  const galleryImages = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    src: null, // Will be replaced with actual image paths like `/gallery/image-${i + 1}.jpg`
    alt: `Gallery Image ${i + 1}`,
    category: ['Tech Talks', 'Exhibitions', 'Cultural Meet', 'Sports'][i % 4]
  }))

  // Animate gallery on scroll
  useEffect(() => {
    if (!galleryRef.current || !gridRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = gridRef.current?.children
            if (items) {
              gsap.fromTo(
                Array.from(items),
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
                  stagger: 0.1,
                  ease: 'power3.out'
                }
              )
            }
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(galleryRef.current)

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current)
      }
    }
  }, [])

  const openModal = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  // Keyboard navigation for modal
  useEffect(() => {
    if (selectedImage === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft' && selectedImage > 0) {
        setSelectedImage(selectedImage - 1)
      } else if (e.key === 'ArrowRight' && selectedImage < galleryImages.length - 1) {
        setSelectedImage(selectedImage + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, galleryImages.length])

  return (
    <div className="min-h-screen bg-slate-950 pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Capturing moments from SCIENTIA 6 - A visual journey through our festival
          </p>
        </div>
      </section>

      {/* Gallery Grid - Bento Style */}
      <section ref={galleryRef} id="gallery" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Bento Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-fr">
            {galleryImages.map((image, index) => {
              // Bento layout pattern - varied sizes
              const getBentoClass = () => {
                const patterns = [
                  'md:col-span-2 md:row-span-2', // Large square
                  'md:col-span-2', // Wide
                  'md:col-span-2', // Wide
                  'md:col-span-2 md:row-span-2', // Large square
                  'md:col-span-2', // Wide
                  'md:col-span-2', // Wide
                  'md:col-span-2 md:row-span-2', // Large square
                  'md:col-span-2', // Wide
                  'md:col-span-2', // Wide
                  'md:col-span-2 md:row-span-2', // Large square
                  'md:col-span-2', // Wide
                  'md:col-span-2', // Wide
                  'md:col-span-2 md:row-span-2', // Large square
                  'md:col-span-2', // Wide
                  'md:col-span-2', // Wide
                  'md:col-span-2 md:row-span-2', // Large square
                ]
                return patterns[index % patterns.length] || 'md:col-span-2'
              }

              return (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm cursor-pointer hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] min-h-[250px] ${getBentoClass()}`}
                  onClick={() => openModal(index)}
                >
                  {/* Placeholder Image */}
                  <div className="absolute inset-0 bg-linear-to-br from-slate-800 via-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-slate-600/50 flex items-center justify-center group-hover:bg-slate-600/70 transition-colors duration-300">
                        <svg className="w-8 h-8 text-slate-500 group-hover:text-cyan-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-slate-500 font-medium group-hover:text-cyan-400 transition-colors duration-300">{image.category}</p>
                    </div>
                  </div>

                  {/* When image is added, uncomment this:
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  */}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 md:p-6 w-full">
                      <p className="text-sm md:text-base font-medium text-white mb-1">{image.alt}</p>
                      <p className="text-xs text-slate-300">{image.category}</p>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 pointer-events-none"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center z-10 hover:scale-110"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage - 1)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center z-10 hover:scale-110"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {selectedImage < galleryImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(selectedImage + 1)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center z-10 hover:scale-110"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Placeholder for modal image */}
            <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-lg bg-slate-700/50 flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-400">{galleryImages[selectedImage]?.alt}</p>
                  <p className="text-sm text-slate-500 mt-2">{galleryImages[selectedImage]?.category}</p>
                </div>
              </div>
              {/* When image is added, uncomment:
              <img 
                src={galleryImages[selectedImage]?.src} 
                alt={galleryImages[selectedImage]?.alt}
                className="w-full h-full object-contain"
              />
              */}
            </div>
            
            {/* Image counter */}
            <div className="text-center mt-4">
              <p className="text-sm text-slate-400">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery

