'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'
import EmblaGallerySlide from './gallerySlider/emblaGallerySlide'
import ThumbnailGallery from './gallerySlider/thumbnailGallery'
import SaleBadge from './gallerySlider/saleBadge'
import WishList from './gallerySlider/wishlist'

interface ProductGalleryImage {
  original_url?: string
  [key: string]: unknown
}

interface ProductData {
  thumbnail?: ProductGalleryImage | string
  gallery?: Array<ProductGalleryImage | string>
}

function LeftSide({product}: {product: ProductData}) {
 
  const galleryImages = [product?.thumbnail, ...(product?.gallery || [])]
  const normalizedImages = galleryImages
    .map((img) => (typeof img === 'string' ? img : img?.original_url || ''))
    .filter(Boolean) as string[]
 
  const locale = useLocale()

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'start',
    direction: locale === 'ar' ? 'rtl' : 'ltr'
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className='sticky top-8 space-y-6'>
      <div className='space-y-4'>
      <div className="product-gallery relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {normalizedImages.map((img, index) => (
                <EmblaGallerySlide key={index} img={img} />
              ))}
            </div>
        </div>

        {/* <!-- Navigation Arrows --> */}
       {galleryImages?.length > 1 && <button onClick={scrollPrev} className="embla__prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors" >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
        </button>}

        {galleryImages?.length > 1 && <button onClick={scrollNext} className="embla__next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors" >
            <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </button>}

        {/* <!-- Sale Badge --> */}
          
        <SaleBadge />

        {/* <!-- Wishlist Button --> */}
       
        <WishList />
    </div>
      <ThumbnailGallery 
      images={normalizedImages}
      selectedIndex={selectedIndex}
      onThumbClick={scrollTo}
    />    
      </div>
    </div>
  )
}

export default LeftSide
