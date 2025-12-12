'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale } from 'next-intl'
import MainSliderSlide from './mainSliderSlide'
import MainSliderPaginationDots from './mainSliderPaginationDots'

interface SliderData {
  image?: string
  [key: string]: unknown
}

function MainSlider({sliders}: {sliders: { data?: SliderData[] }}) {
  console.log('sliders',sliders)
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const slides: SliderData[] = sliders?.data || []

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    duration: 50,
    direction: isRTL ? 'rtl' : 'ltr'
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

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
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div id="site-slider" className="relative overflow-hidden group" data-autoplay="true" data-autoplay-speed="7000" data-height-base="320px" data-height-sm="320px" data-height-md="460px" data-height-lg="560px" data-height-xl="660px" data-overlay-color="#ffffff" data-overlay-opacity="0">

    <div ref={emblaRef} className="overflow-hidden h-full">
      <div id="slides-container" className="flex relative z-10" >
        {slides?.map((slide, index) => (
          <MainSliderSlide key={index} img={slide?.image || ''} slider={slide} />
        ))}
      </div>
    </div>

    <button id="prev-slide" onClick={scrollPrev} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75 opacity-0 group-hover:opacity-100 ease-in-out duration-300 focus:outline-none z-30" aria-label="Previous Slide" style={{ display: 'flex' }}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
        </svg>
    </button>

    <button id="next-slide" onClick={scrollNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75 opacity-0 group-hover:opacity-100 ease-in-out duration-300 focus:outline-none z-30" aria-label="Next Slide" style={{ display: 'flex' }}>
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
        </svg>
    </button>

  <MainSliderPaginationDots scrollSnaps={scrollSnaps} selectedIndex={selectedIndex} scrollTo={scrollTo} />

</div>
  )
}

export default MainSlider
