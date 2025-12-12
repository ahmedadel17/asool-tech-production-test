import React from 'react'

function Banner() {
  return (
    <section className="bg-[linear-gradient(93.58deg,#1D1E3D_-3.17%,#B9F3F7_120.6%)] overflow-hidden">
                    <div className="container">
                        <div className="grid gap-2 md:gap-12 grid-cols-1 md:grid-cols-2 items-end">

                            {/* <!-- Image Side --> */}
                            <div className="ro order-2 ">
                                <img src="assets/images/cotton/cta.png" alt="" />
                            </div>

                            {/* <!-- Content Side --> */}
                            <div className="order-1 ">
                                <div className="py-12 md:py-16">
                                    <div className="text-sm font-semibold text-[#F1CB79] mb-3 uppercase tracking-wide">مجموعة جديدة</div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">خصومات حصرية على أفضل المنتجات لا تفوت الفرصة</h2>
                                    <p className="text-white mb-6 leading-relaxed">نص تجريبي يمكن استبداله في هذه المساحة.نص تجريبي يمكن استبداله في هذه المساحة.</p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button className="te-btn te-btn-primary">
                                            تسوق الآن
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
  )
}

export default Banner
