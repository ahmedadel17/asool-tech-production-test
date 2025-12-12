import React from 'react'

function CustomerOpinions() {
  return (
    <section className="te-section bg-white dark:bg-gray-800">
                    <div className="te-carousel container">

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="product-title text-2xl font-bold text-gray-900 dark:text-white">أراء العملاء</h2>
                            <div className="embla-control flex gap-1 rtl:flex-row-reverse">
                                <button className="embla-prev bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                                    <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                        <path d="m15 18-6-6 6-6"></path>
                                    </svg>
                                </button>

                                <button className="embla-next bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors">
                                    <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                        <path d="m9 18 6-6-6-6"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="embla overflow-hidden relative">
                            <div className="embla__container flex gap-3 lg:gap-4 py-1" >

                                {/* <!-- Testimonial 2 --> */}
                                <div className="embla__slide flex-shrink-0 py-1 [flex:0_0_calc(100%)] lg:[flex:0_0_calc(50%-1.2rem)]" style={{transform: 'translate3d(-2467px, 0px, 0px)'}}>
                                    <div className="testimonial-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 p-6 group hover:-translate-y-1">
                                        <div className="flex items-center mb-4">
                                            <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=60&amp;h=60&amp;fit=crop&amp;crop=face" alt="عميل" className="w-12 h-12 rounded-full ml-4" />
                                            <div className="text-right">
                                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">أحمد علي</h4>
                                                <div className="flex justify-start">
                                                    <div className="flex text-yellow-400">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 italic">
                                            التجربة كانت رائعة، والمنتجات وصلت بسرعة وبجودة عالية! يتميز هذا المتجر بالالتزام بالمواعيد المحددة للتسليم، بالإضافة إلى جودة المنتجات التي تتناسب مع الأسعار المعروضة. كما أن عملية الطلب والدفع كانت سهلة وآمنة
                                        </p>
                                    </div>
                                </div>

                                {/* <!-- Testimonial 3 --> */}
                                <div className="embla__slide flex-shrink-0 py-1 [flex:0_0_calc(100%)] lg:[flex:0_0_calc(50%-1.2rem)]" style={{transform: 'translate3d(0px, 0px, 0px)'}}>
                                    <div className="testimonial-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 p-6 group hover:-translate-y-1">
                                        <div className="flex items-center mb-4">
                                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&amp;h=60&amp;fit=crop&amp;crop=face" alt="عميل" className="w-12 h-12 rounded-full ml-4"/>
                                            <div className="text-right">
                                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">ليلى محمد</h4>
                                                <div className="flex justify-start">
                                                    <div className="flex text-yellow-400">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 italic">التجربة كانت رائعة، والمنتجات وصلت بسرعة وبجودة عالية! يتميز هذا المتجر بالالتزام بالمواعيد المحددة للتسليم، بالإضافة إلى جودة المنتجات التي تتناسب مع الأسعار المعروضة. كما أن عملية الطلب والدفع كانت سهلة وآمن</p>
                                    </div>
                                </div>

                                {/* <!-- Testimonial 4 --> */}
                                <div className="embla__slide flex-shrink-0 py-1 [flex:0_0_calc(100%)] lg:[flex:0_0_calc(50%-1.2rem)]" style={{transform: 'translate3d(0px, 0px, 0px)'}}>
                                    <div className="testimonial-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 p-6 group hover:-translate-y-1">
                                        <div className="flex items-center mb-4">
                                            <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=60&amp;h=60&amp;fit=crop&amp;crop=face" alt="عميل" className="w-12 h-12 rounded-full ml-4" />
                                            <div className="text-right">
                                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">خالد يوسف</h4>
                                                <div className="flex justify-start">
                                                    <div className="flex text-yellow-400">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 italic">
                                            التجربة كانت رائعة، والمنتجات وصلت بسرعة وبجودة عالية! يتميز هذا المتجر بالالتزام بالمواعيد المحددة للتسليم، بالإضافة إلى جودة المنتجات التي تتناسب مع الأسعار المعروضة. كما أن عملية الطلب والدفع كانت سهلة وآمنة
                                        </p>
                                    </div>
                                </div>

                                {/* <!-- Testimonial 5 --> */}
                                <div className="embla__slide flex-shrink-0 py-1 [flex:0_0_calc(100%)] lg:[flex:0_0_calc(50%-1.2rem)]">
                                    <div className="testimonial-card bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 p-6 group hover:-translate-y-1">
                                        <div className="flex items-center mb-4">
                                            <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=60&amp;h=60&amp;fit=crop&amp;crop=face" alt="عميل" className="w-12 h-12 rounded-full ml-4" />
                                            <div className="text-right">
                                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">مريم عبد الله</h4>
                                                <div className="flex justify-start">
                                                    <div className="flex text-yellow-400">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 italic">التجربة كانت رائعة، والمنتجات وصلت بسرعة وبجودة عالية! يتميز هذا المتجر بالالتزام بالمواعيد المحددة للتسليم، بالإضافة إلى جودة المنتجات التي تتناسب مع الأسعار المعروضة. كما أن عملية الطلب والدفع كانت سهلة وآمنة</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </section>
  )
}

export default CustomerOpinions
