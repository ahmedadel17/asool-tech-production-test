import React from 'react'

function GridItem() {
  return (
    <section className="te-section bg-white dark:bg-gray-800">
    <div className="container">
        {/* <!-- Main Grid Container --> */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.618fr] gap-6">

            {/* <!-- Left Column - Full Height Item --> */}
            <div className="xl:row-span-1">
                <div className="relative bg-white rounded-xl overflow-hidden group h-full">
                    {/* <!-- Discount Badge --> */}
                    <div className="absolute top-3 end-3 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
                        خصم 25%
                    </div>

                    {/* <!-- Product Image --> */}
                    <img src="assets/images/cotton/banner-2.jpg" alt="اسم المنتج" className="w-full h-full object-cover" />

                    {/* <!-- Overlay --> */}
                    <div className="absolute bottom-0 start-0 end-0 bg-black/50 text-white p-6">
                        <h3 className="font-semibold text-2xl">لباد صوف طبيعي عالي الجودة</h3>
                        <p className="text-base mt-2">استمتع بالدفء والراحة مع لبادنا المصنوع من صوف طبيعي 100%، يتميز بالنعومة والمتانة.</p>
                        <button className="mt-6 te-btn te-btn-primary">
                            تسوق الآن
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Right Column - 3 Items Layout --> */}
            <div className="grid grid-rows-2 gap-6 min-h-[500px] sm:h-full">

                {/* <!-- Top Item - Single Full Width --> */}
                <div className="relative bg-white rounded-xl overflow-hidden group min-h-[200px]">
                    {/* <!-- Discount Badge --> */}
                    <div className="absolute top-3 end-3 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
                        خصم 15%
                    </div>

                    {/* <!-- Product Image --> */}
                    <img src="assets/images/cotton/banner-1.jpg" alt="اسم المنتج" className="w-full h-full object-cover" />

                    {/* <!-- Overlay --> */}
                    <div className="absolute bottom-0 start-0 end-0 bg-black/50 text-white p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                            <div>
                                <h3 className="font-semibold text-lg">منشفة قطنية فاخرة بالشعار</h3>
                                <p className="mt-1">منشفة قطنية فاخرة بشعار، ناعمة وماصة.</p>
                            </div>
                            <button className="te-btn te-btn-primary">
                                تسوق الآن
                            </button>
                        </div>
                    </div>
                </div>

                {/* <!-- Bottom Row - 2 Items Side by Side --> */}
                <div className="grid grid-cols-2 gap-4 min-h-[180px]">

                    {/* <!-- Bottom Left Item --> */}
                    <div className="relative bg-white rounded-xl overflow-hidden group">
                        {/* <!-- Discount Badge --> */}
                        <div className="absolute top-3 end-3 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
                            خصم 10%
                        </div>

                        {/* <!-- Product Image --> */}
                        <img src="assets/images/cotton/banner-3.jpg" alt="اسم المنتج" className="object-cover w-full h-full"/>

                        {/* <!-- Overlay --> */}
                        <div className="absolute bottom-0 start-0 end-0 bg-black/50 text-white p-3">
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-base">مخدة طبية للرقبة بالذاكرة الرغوية</h3>
                                </div>
                                <button className="te-btn te-btn-sm te-btn-primary">
                                    تسوق الآن
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Bottom Right Item --> */}
                    <div className="relative bg-white rounded-xl overflow-hidden group">
                        {/* <!-- Discount Badge --> */}
                        <div className="absolute top-3 end-3 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm font-semibold z-10">
                            خصم 20%
                        </div>

                        {/* <!-- Product Image --> */}
                        <img src="assets/images/cotton/banner-3.jpg" alt="اسم المنتج" className="object-cover w-full h-full"/>

                        {/* <!-- Overlay --> */}
                        <div className="absolute bottom-0 start-0 end-0 bg-black/50 text-white p-3">
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-base">رداء قطني مطرز بالأكمام الطويلة</h3>
                                </div>
                                <button className="te-btn te-btn-sm te-btn-primary">
                                    تسوق الآن
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default GridItem
