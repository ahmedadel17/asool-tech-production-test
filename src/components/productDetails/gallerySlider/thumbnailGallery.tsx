'use client'

import React, { useCallback, useEffect } from 'react'
import { useLocale } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'

interface ThumbnailGalleryProps {
  images: string[]
  selectedIndex: number
  onThumbClick: (index: number) => void
}

function ThumbnailGallery({ images, selectedIndex, onThumbClick }: ThumbnailGalleryProps) {
  const locale = useLocale()
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    direction: locale === 'ar' ? 'rtl' : 'ltr'
  })

  const onThumbClickHandler = useCallback((index: number) => {
    if (!emblaThumbsApi) return
    emblaThumbsApi.scrollTo(index)
    onThumbClick(index)
  }, [emblaThumbsApi, onThumbClick])

  useEffect(() => {
    if (!emblaThumbsApi) return
    emblaThumbsApi.scrollTo(selectedIndex)
  }, [selectedIndex, emblaThumbsApi])

  return (
    <div>
      <div className="product-thumbnail embla-thumbs overflow-hidden" ref={emblaThumbsRef}>
        <div className="embla-thumbs__container flex gap-3">
            {images.map((img, index) => (
              <div 
                key={index} 
                className={`embla-thumbs__slide flex-none ${index === selectedIndex ? 'embla-thumbs__slide--selected' : ''}`}
              >
                <button 
                  type="button" 
                  className="block"
                  onClick={() => onThumbClickHandler(index)}
                >
                  <img 
                    className={`embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 hover:border-primary-300 hover:opacity-80 transition-all duration-200 ${
                      index === selectedIndex 
                        ? 'border-primary-500 opacity-100' 
                        : 'border-transparent opacity-60'
                    }`}
                    src={img} 
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              </div>
            ))}
        </div>
    </div>
    </div>
  )
}

export default ThumbnailGallery
