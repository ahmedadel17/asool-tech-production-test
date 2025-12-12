import React from 'react'

function Features() {
  return (
    <section className="te-section dark:bg-gray-900">
                    <div className="container">
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">

                            <div className="footer-box rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                                <div className="flex items-center gap-4">
                                    <div className="box-icon w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center transition-colors duration-300">
                                        <svg className="w-8 h-8 text-[#CAA34E]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                                            <path d="M15 18H9"></path>
                                            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                                            <circle cx="17" cy="18" r="2"></circle>
                                            <circle cx="7" cy="18" r="2"></circle>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">شحن سريع</h3>
                                        <p className="text-priamry-800 dark:text-gray-400 text-sm">توصيل سريع إلى باب منزلك</p>
                                    </div>
                                </div>
                            </div>

                            <div className="footer-box rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                                <div className="flex items-center gap-4">
                                    <div className="box-icon w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center transition-colors duration-300">
                                        <svg className="w-8 h-8 text-[#CAA34E]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                                            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">قطن طبيعي ناعم</h3>
                                        <p className="text-priamry-800 dark:text-gray-400 text-sm">جودة عالية وراحة دائمة</p>
                                    </div>
                                </div>
                            </div>

                            <div className="footer-box rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                                <div className="flex items-center gap-4">
                                    <div className="box-icon w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center transition-colors duration-300">
                                        <span className="icon-riyal-symbol text-2xl text-[#CAA34E]"></span>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">أسعار شفافة</h3>
                                        <p className="text-priamry-800 dark:text-gray-400 text-sm">أفضل قيمة مقابل المال</p>
                                    </div>
                                </div>
                            </div>

                            <div className="footer-box rounded-xl transition-all duration-300 p-6 group hover:-translate-y-1">
                                <div className="flex items-center gap-4">
                                    <div className="box-icon w-16 h-16 bg-white dark:bg-primary-100 rounded-full flex items-center justify-center transition-colors duration-300">

                                        <svg className="w-8 h-8 text-[#CAA34E]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                                            <line x1="2" x2="22" y1="10" y2="10"></line>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-1">دفع آمن وسريع</h3>
                                        <p className="text-priamry-800 dark:text-gray-400 text-sm">ادفع أونلاين أو عند الاستلام</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
  )
}

export default Features
