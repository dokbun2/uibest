'use client'

import { useState, useEffect, useRef, forwardRef } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

const carouselVariants = cva(
  'relative w-full overflow-hidden rounded-2xl',
  {
    variants: {
      variant: {
        default: 'bg-zinc-900/50',
        card: 'bg-zinc-900/50 border border-zinc-800/50',
        fullscreen: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface CarouselSlide {
  id: string
  image?: string
  title?: string
  description?: string
  content?: React.ReactNode
  link?: {
    href: string
    label: string
  }
}

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof carouselVariants> {
  slides: CarouselSlide[]
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  showControls?: boolean
  pauseOnHover?: boolean
  onChange?: (index: number) => void
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      variant,
      slides,
      autoPlay = false,
      interval = 5000,
      showIndicators = true,
      showControls = true,
      pauseOnHover = true,
      onChange,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(autoPlay)
    const [isPaused, setIsPaused] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const goToPrevious = () => {
      const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1
      setCurrentIndex(newIndex)
      onChange?.(newIndex)
    }

    const goToNext = () => {
      const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
      onChange?.(newIndex)
    }

    const goToSlide = (index: number) => {
      setCurrentIndex(index)
      onChange?.(index)
    }

    useEffect(() => {
      if (isPlaying && !isPaused && slides.length > 1) {
        intervalRef.current = setInterval(() => {
          goToNext()
        }, interval)
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }, [currentIndex, isPlaying, isPaused, interval, slides.length])

    const handleMouseEnter = () => {
      if (pauseOnHover && isPlaying) {
        setIsPaused(true)
      }
    }

    const handleMouseLeave = () => {
      if (pauseOnHover && isPlaying) {
        setIsPaused(false)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    return (
      <div
        ref={ref}
        className={carouselVariants({ variant, className })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Carousel"
        aria-roledescription="carousel"
        {...props}
      >
        {/* Slides Container */}
        <div className="relative h-full w-full">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className="min-w-full h-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${index + 1} of ${slides.length}`}
              >
                {slide.image ? (
                  <div className="relative h-full w-full">
                    <img
                      src={slide.image}
                      alt={slide.title || `Slide ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {(slide.title || slide.description) && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        {slide.title && (
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {slide.title}
                          </h3>
                        )}
                        {slide.description && (
                          <p className="text-zinc-200">
                            {slide.description}
                          </p>
                        )}
                        {slide.link && (
                          <a
                            href={slide.link.href}
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                          >
                            {slide.link.label}
                            <ChevronRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ) : slide.content ? (
                  <div className="flex h-full items-center justify-center p-8">
                    {slide.content}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <div className="text-center">
                      {slide.title && (
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {slide.title}
                        </h3>
                      )}
                      {slide.description && (
                        <p className="text-zinc-400">
                          {slide.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        {showControls && slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {autoPlay && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors mr-2"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
            )}
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${currentIndex === index 
                    ? 'w-8 bg-white' 
                    : 'w-2 bg-white/50 hover:bg-white/70'
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

Carousel.displayName = 'Carousel'

export { Carousel, carouselVariants }