import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

// Function to dynamically discover gallery images
// This function will check for images with common naming patterns
const discoverGalleryImages = (): Promise<GalleryImage[]> => {
  return new Promise((resolve) => {
    const images: GalleryImage[] = []
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif']
    
    // Common naming patterns to check
    const baseNames: string[] = []
    
    // Try patterns: g1, g2, g3... up to 200
    // This covers common gallery naming conventions
    for (let i = 1; i <= 200; i++) {
      baseNames.push(`g${i}`)
    }
    // Also try: image1, image2, image3... up to 50
    for (let i = 1; i <= 50; i++) {
      baseNames.push(`image${i}`)
      baseNames.push(`img${i}`)
    }
    
    // Also check for any existing known images (you can add more here)
    const knownImages = ['g1', 'g2', 'g3', 'g4']
    
    const allNames = [...new Set([...knownImages, ...baseNames])]
    const checked = new Set<string>()
    let checkedCount = 0
    const totalToCheck = allNames.length * imageExtensions.length
    
    const checkImage = (baseName: string, ext: string) => {
      const src = `/gallery/${baseName}.${ext}`
      const key = `${baseName}.${ext}`
      
      if (checked.has(key)) {
        checkedCount++
        if (checkedCount >= totalToCheck) {
          // Sort and resolve
          const uniqueImages = Array.from(new Map(images.map(img => [img.src, img])).values())
          uniqueImages.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }))
          resolve(uniqueImages)
        }
        return
      }
      
      checked.add(key)
      
      const img = new Image()
      img.onload = () => {
        images.push({
          id: key,
          src,
          alt: `Gallery Image ${baseName}`,
          category: 'SCIENTIA 6.0'
        })
        checkedCount++
        if (checkedCount >= totalToCheck) {
          const uniqueImages = Array.from(new Map(images.map(img => [img.src, img])).values())
          uniqueImages.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }))
          resolve(uniqueImages)
        }
      }
      img.onerror = () => {
        checkedCount++
        if (checkedCount >= totalToCheck) {
          const uniqueImages = Array.from(new Map(images.map(img => [img.src, img])).values())
          uniqueImages.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true, sensitivity: 'base' }))
          resolve(uniqueImages)
        }
      }
      img.src = src
    }
    
    // Start checking all combinations
    for (const baseName of allNames) {
      for (const ext of imageExtensions) {
        checkImage(baseName, ext)
      }
    }
  })
}

const Gallery = () => {
  const galleryRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load gallery images on component mount
  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true)
      try {
        const images = await discoverGalleryImages()
        setGalleryImages(images)
      } catch (error) {
        console.error('Error loading gallery images:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadImages()
  }, [])

  // Animate gallery on scroll
  useEffect(() => {
    if (!galleryRef.current || !gridRef.current || isLoading) return

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
  }, [isLoading])

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

  // Bento layout pattern - varied sizes
  const getBentoClass = (index: number) => {
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
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400">Loading gallery images...</p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No images found in gallery. Add images to <code className="bg-slate-800 px-2 py-1 rounded">public/gallery/</code> folder.</p>
            </div>
          ) : (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-fr">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm cursor-pointer hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] min-h-[250px] ${getBentoClass(index)}`}
                  onClick={() => openModal(index)}
                >
                  {/* Gallery Image */}
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

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
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && galleryImages[selectedImage] && (
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
            {/* Modal Image */}
            <div className="relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50">
              <img 
                src={galleryImages[selectedImage].src} 
                alt={galleryImages[selectedImage].alt}
                className="w-full h-full max-h-[80vh] object-contain"
              />
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
