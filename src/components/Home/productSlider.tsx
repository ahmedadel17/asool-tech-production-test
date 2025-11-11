'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Product } from '@/app/dummyData/products';
import { useTranslations } from 'next-intl';
import ProductCard2 from '../product/productCard2';

interface ProductSliderProps {
  products: Product[];
  initialIsRTL?: boolean;
}

export default function ProductSlider({ products, initialIsRTL = false }: ProductSliderProps) {
  // console.log('products',products);
  const [isRTL, setIsRTL] = useState(initialIsRTL);
  const t = useTranslations();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    containScroll: 'trimSnaps',
    align: 'start',
    skipSnaps: false,
    dragFree: false,
    direction: isRTL ? 'rtl' : 'ltr',
  }, [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // RTL Detection
  useEffect(() => {
    const checkDirection = () => {
      const htmlDir = document.documentElement.getAttribute('dir');
      setIsRTL(htmlDir === 'rtl');
    };

    // Check on mount
    checkDirection();

    // Watch for changes
    const observer = new MutationObserver(checkDirection);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    });

    return () => observer.disconnect();
  }, []);

  // Reinitialize Embla when direction changes
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({
      loop: true,
      containScroll: 'trimSnaps',
      align: 'start',
      skipSnaps: false,
      dragFree: false,
      direction: isRTL ? 'rtl' : 'ltr',
    });
  }, [emblaApi, isRTL]);



  return (
    <section className="py-16  dark:bg-gray-900">
      <div className="container">
        <div className="te-products">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="product-title text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {t('Featured Products')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('Discover our carefully curated collection of premium products')}
              </p>
            </div>

            <div className="embla-control flex gap-1 rtl:flex-row-reverse">
              <button
                type="button"
                onClick={scrollPrev}
                className="embla-prev  dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label={isRTL ? "Next" : "Previous"}
              >
                <svg 
                  className="w-5 h-5 text-gray-700 dark:text-gray-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.2"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={scrollNext}
                className="embla-next  dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                aria-label={isRTL ? "Previous" : "Next"}
              >
                <svg 
                  className="w-5 h-5 text-gray-700 dark:text-gray-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Embla Carousel Wrapper */}
          <div 
            className="embla overflow-hidden relative" 
            ref={emblaRef}
          >
            <div className="embla__container flex gap-3 lg:gap-6 py-1">
              {products && (() => {
                const slides: React.ReactNode[] = [];
                
                // Process products in groups of 4
                for (let i = 0; i < products.length; i += 4) {
                  const p1 = products[i];
                  const p2 = products[i + 1];
                  const p3 = products[i + 2];
                  const p4 = products[i + 3];
                  
                  // Check how many products we have in this group
                  const hasP3 = !!p3;
                  const hasP4 = !!p4;
                  
                  // Desktop slide: shows all products (1-4) in one slide
                  // Mobile slide 1: shows p1 and p2
                  slides.push(
                    <div
                      key={`slide-${i}-desktop`}
                      className="embla__slide flex-shrink-0 py-1 w-full flex gap-3"
                    >
                      {p1 && (
                        <div className="basis-1/2 lg:basis-1/4">
                          <ProductCard2 product={p1} />
                        </div>
                      )}
                      {p2 && (
                        <div className="basis-1/2 lg:basis-1/4">
                          <ProductCard2 product={p2} />
                        </div>
                      )}
                      {/* Desktop only: show p3 and p4 */}
                      {p3 && (
                        <div className="hidden lg:block lg:basis-1/4">
                          <ProductCard2 product={p3} />
                        </div>
                      )}
                      {p4 && (
                        <div className="hidden lg:block lg:basis-1/4">
                          <ProductCard2 product={p4} />
                        </div>
                      )}
                    </div>
                  );
                  
                  // Mobile slide 2: shows p3 and p4 (hidden on desktop)
                  if (hasP3 || hasP4) {
                    slides.push(
                      <div
                        key={`slide-${i}-mobile`}
                        className="embla__slide flex-shrink-0 py-1 w-full flex gap-3 lg:hidden"
                      >
                        {p3 && (
                          <div className="basis-1/2">
                            <ProductCard2 product={p3} />
                          </div>
                        )}
                        {p4 && (
                          <div className="basis-1/2">
                            <ProductCard2 product={p4} />
                          </div>
                        )}
                      </div>
                    );
                  }
                }
                
                return slides;
              })()}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
