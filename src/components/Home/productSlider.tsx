'use client'

import React, { useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import ProductCard from '../productCard'
import ProductSliderContainer from './productSliderContainer'
import { useTranslations } from 'next-intl'

function ProductSlider({products}: {products: any}) {
  const t = useTranslations('productSlider')
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    containScroll: 'trimSnaps',
    align: 'start',
    direction: typeof document !== 'undefined' ? (document.dir === 'rtl' ? 'rtl' : 'ltr') : 'ltr'
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const updateButtonStates = () => {
      const prevBtn = document.querySelector('.te-carousel .embla-prev') as HTMLButtonElement
      const nextBtn = document.querySelector('.te-carousel .embla-next') as HTMLButtonElement
      
      if (prevBtn) prevBtn.disabled = !emblaApi.canScrollPrev()
      if (nextBtn) nextBtn.disabled = !emblaApi.canScrollNext()
    }

    updateButtonStates()
    emblaApi.on('select', updateButtonStates).on('reInit', updateButtonStates)
  }, [emblaApi])

  return (
    
    <section className="te-section dark:bg-gray-900">
        <div className="container">
          <div className='te-carousel'>  
      <div className="flex items-center justify-between mb-4">

<h2 className="product-title text-2xl font-bold text-gray-900 dark:text-white">{t('Best Selling Products')}</h2>

<div className="embla-control flex gap-1 rtl:flex-row-reverse">
    <button onClick={scrollPrev} className="embla-prev bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="m15 18-6-6 6-6"></path>
        </svg>
    </button>

    <button onClick={scrollNext} className="embla-next bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="m9 18 6-6-6-6"></path>
        </svg>
    </button>
</div>
</div>
<div className="embla overflow-hidden relative" ref={emblaRef}>
        <div className="embla__container flex gap-3 lg:gap-4 py-1">
          {products?.data?.map((product: any, index: number) => (
            <ProductSliderContainer key={index}>
              <ProductCard product={product} />
            </ProductSliderContainer>
          ))}

 

   

  
   
  </div>
    </div>
</div>
</div>
    </section>
  )
}

export default ProductSlider
