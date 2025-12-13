'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'أحمد علي',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    text: 'التجربة كانت رائعة، والمنتجات وصلت بسرعة وبجودة عالية! يتميز هذا المتجر بالالتزام بالمواعيد المحددة للتسليم، بالإضافة إلى جودة المنتجات التي تتناسب مع الأسعار المعروضة. كما أن عملية الطلب والدفع كانت سهلة وآمنة.'
  },
  {
    id: 2,
    name: 'ليلى محمد',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    text: 'التجربة كانت رائعة، والمنتجات وصلت بسرعة وبجودة عالية! يتميز هذا المتجر بالالتزام بالمواعيد المحددة للتسليم، بالإضافة إلى جودة المنتجات التي تتناسب مع الأسعار المعروضة. كما أن عملية الطلب والدفع كانت سهلة وآمنة.'
  },
  {
    id: 3,
    name: 'خالد يوسف',
    image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    text: 'التجربة كانت رائعة، والمنتجات وصلت بسرعة وبجودة عالية! يتميز هذا المتجر بالالتزام بالمواعيد المحددة للتسليم، بالإضافة إلى جودة المنتجات التي تتناسب مع الأسعار المعروضة. كما أن عملية الطلب والدفع كانت سهلة وآمنة.'
  },
  {
    id: 4,
    name: 'مريم عبد الله',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=60&h=60&fit=crop&crop=face',
    rating: 5,
    text: 'التجربة كانت رائعة، والمنتجات وصلت بسرعة وبجودة عالية! يتميز هذا المتجر بالالتزام بالمواعيد المحددة للتسليم، بالإضافة إلى جودة المنتجات التي تتناسب مع الأسعار المعروضة. كما أن عملية الطلب والدفع كانت سهلة وآمنة.'
  }
];

function CustomersOpinion() {
  const [mounted, setMounted] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      containScroll: 'trimSnaps',
      align: 'start',
      direction: isRTL ? 'rtl' : 'ltr',
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    setMounted(true);
    setIsRTL(document.documentElement.getAttribute('dir') === 'rtl');
  }, []);

  useEffect(() => {
    if (!mounted || !emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [mounted, emblaApi, onSelect]);

  useEffect(() => {
    if (!mounted || !emblaApi) return;
    emblaApi.reInit({
      loop: true,
      containScroll: 'trimSnaps',
      align: 'start',
      direction: isRTL ? 'rtl' : 'ltr',
    });
  }, [mounted, emblaApi, isRTL]);
const t = useTranslations('customerOpinions');
  return (
    <section className="te-section bg-white dark:bg-gray-800">
      <div className="te-carousel container">
        <div className="flex items-center justify-between mb-4">
        <h2 className="product-title text-2xl font-bold text-gray-900 dark:text-white">
          {t("Customer Opinions")}
        </h2>
         
          <div className="embla-control flex gap-1 rtl:flex-row-reverse">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="embla-next bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="embla-next bg-white dark:bg-gray-900 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="embla overflow-hidden relative" ref={emblaRef}>
          <div className="embla__container flex gap-3 lg:gap-4 py-1 px-2">

            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="embla__slide flex-shrink-0 py-1 [flex:0_0_calc(100%)] lg:[flex:0_0_calc(50%-1.2rem)]">
                <div className="testimonial-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 p-6 group hover:-translate-y-1">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full ml-4 rtl:ml-0 rtl:mr-4" 
                    />
                    <div className="text-right rtl:text-right">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</h4>
                      <div className="flex justify-start rtl:justify-start">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 italic">&quot;{testimonial.text}&quot;</p>
                </div>
              </div>
            ))}

            </div>
        </div>

    </div>
</section>
  )
}

export default CustomersOpinion
