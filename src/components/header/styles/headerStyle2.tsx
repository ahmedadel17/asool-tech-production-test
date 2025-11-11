import React from 'react'

function headerStyle2() {
  return (
    <nav className="te-navbar whitespace-nowrap mx-auto shadow-sm w-full relative bg-white dark:bg-gray-800" role="navigation" aria-label="Main Navigation">

    <div className="te-navbar-container container">

        <div className="te-navbar-content flex justify-between items-center min-h-20 relative">

            {/* <!-- Logo/Brand Section --> */}
            <div className="te-navbar-brand">
                <a href="index.php" className="flex items-center gap-3 no-underline">
                    <img className="dark:hidden" src="assets/svg/cotton-logo.svg" alt="logo" />
                    <img className="hidden dark:block" src="assets/svg/cotton-logo-light.svg" alt="logo" />
                </a>
            </div>

            {/* <!-- Header Search --> */}
            <div className="hidden lg:block w-96">
                <div className="relative">

                    <svg className="absolute start-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m21 21-4.34-4.34"></path>
                        <circle cx="11" cy="11" r="8"></circle>
                    </svg>

                        <input type="text" id="navbar-search-ecommerce" name="product_search" className="ps-10 pe-12 text-sm rounded-lg" placeholder="بحث عن المنتجات..." autoComplete="off" aria-label="Search products" />

                    <button className="hs-btn absolute end-1 top-1/2 transform -translate-y-1/2 p-2 bg-primary-200 hover:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-300 text-white rounded-lg  transition-colors duration-200" aria-label="Search">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m21 21-4.34-4.34"></path>
                            <circle cx="11" cy="11" r="8"></circle>
                        </svg>
                    </button>

                </div>
            </div>

            {/* <!-- Header Actions --> */}
            <div className="header-actions flex items-center gap-1 lg:gap-6 w-auto shrink-0">

                <div className="items-center hidden lg:flex gap-2">

                    {/* <!-- Notification --> */}
                    <div className="te-navbar-dropdown">
<a href="dashboard-notification.php" className="header-notification relative flex items-center gap-3 cursor-pointer">
<div className="cart-icon">
    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
        </svg>

        {/* <!-- Badge --> */}
        <span className="header-notification-item absolute -top-1 -right-1 bg-primary-200 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
            5
        </span>
    </div>
</div>
</a>
</div>
                    {/* <!-- Wishlist --> */}
                    <div className="te-navbar-dropdown">
<a href="wishlist.php" className="header-wishlist relative flex items-center gap-3 cursor-pointer">
<div className="cart-icon">
    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
        </svg>
        {/* <!-- Badge --> */}
        <span className="header-wishlist-item absolute -top-1 -right-1 bg-primary-200 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
            3
        </span>
    </div>
</div>
</a>
</div>
                    {/* <!-- Account --> */}
                    <div className="te-navbar-dropdown">
                        <div className="header-account relative flex items-center gap-3 cursor-pointer" data-dropdown="account">

                            <div className="account-icon">
                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="8" r="5"></circle>
                                        <path d="M20 21a8 8 0 0 0-16 0"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="account-drop-down te-navbar-dropdown-content">

                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 mb-2 bg-white dark:bg-gray-800">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">أحمد</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">john@example.com</div>
                                </div>

                                
                                <div className="grid gap-1">

                                                                                    <a href="dashboard.php" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>                                                    </svg>
                                            لوحة التحكم                                                </a>
                                                                                    <a href="dashboard-points.php" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"></path>
                <circle cx="12" cy="12" r="10"></circle>
            </svg>                                                    </svg>
                                            مكافآتي                                                </a>
                                                                                    <a href="dashboard-orders.php" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>                                                    </svg>
                                            طلباتي                                                </a>
                                                                                    <a href="dashboard-track.php" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>                                                    </svg>
                                            تتبع الطلب                                                </a>
                                                                                    <a href="dashboard-returns.php" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>                                                    </svg>
                                            إرجاع المنتجات                                                </a>
                                                                                    <a href="dashboard-wishlist.php" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>                                                    </svg>
                                            قائمة الرغبات                                                </a>
                                                                                    <a href="dashboard-addresses.php" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>                                                    </svg>
                                            عناويني                                                </a>
                                                                                    <a href="dashboard-settings.php" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>                                                    </svg>
                                            إعدادات الحساب                                                </a>
                                                                                    <a href="logout.php" className="flex gap-2 items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>                                                    </svg>
                                            تسجيل الخروج                                                </a>
                                    
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* <!-- Cart --> */}
                    <div className="te-navbar-dropdown">
                        <div className="header-cart relative flex items-center gap-3 cursor-pointer" data-dropdown="cart">
                            <div className="cart-icon">
                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900 flex justify-center items-center rounded-full relative">

                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"></path>
                                        <path d="M8 11V6a4 4 0 0 1 8 0v5"></path>
                                    </svg>

                                    {/* <!-- Badge --> */}      
                                    <span className="header-cart-item absolute -top-1 -right-1 bg-primary-200 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                                        0
                                    </span>

                                </div>

                            </div>

                            <div className="grid">
                                <span className="text-gray-600 dark:text-gray-400 text-sm">سلة التسوق</span>
                                <span className="text-gray-900 dark:text-gray-100 text-sm font-medium">300 <span className="icon-riyal-symbol"></span></span>
                            </div>

                        </div>

                        <div className="cart-drop-down te-navbar-dropdown-content px-4 py-4 bg-white dark:bg-gray-800 max-w-[200px]">

                            <div className="text-sm font-medium text-gray-900 dark:text-white mb-3">سلة التسوق</div>

                                                                    <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700">
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0">
                                                                                            <img src="assets/images/cotton/cotton-pro-1.jpg" alt="رداء قطني مطرز بالأكمام الطويلة" className="w-full h-full object-cover rounded-md"/>
                                                                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-normal break-words">
                                            <a href="#" className="hover:text-primary-400">رداء قطني مطرز بالأكمام الطويلة</a>
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            الكمية: 1 ×
                                            <span className="icon-riyal-symbol text-xs"></span>
                                            <span>99.00</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                                                                    <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700">
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0">
                                                                                            <img src="assets/images/cotton/cotton-pro-2.jpg" alt="لباد صوف طبيعي عالي الجودة" className="w-full h-full object-cover rounded-md" />
                                                                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-normal break-words">
                                            <a href="#" className="hover:text-primary-400">لباد صوف طبيعي عالي الجودة</a>
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            الكمية: 2 ×
                                            <span className="icon-riyal-symbol text-xs"></span>
                                            <span>120.00</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                                                                    <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700">
                                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0">
                                                                                            <img src="assets/images/cotton/cotton-pro-3.jpg" alt="مخدة طبية للرقبة بالذاكرة الرغوية" className="w-full h-full object-cover rounded-md" />
                                                                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-normal break-words">
                                            <a href="#" className="hover:text-primary-400">مخدة طبية للرقبة بالذاكرة الرغوية</a>
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            الكمية: 1 ×
                                            <span className="icon-riyal-symbol text-xs"></span>
                                            <span>150.00</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            
                            {/* <!-- Cart Total --> */}
                            <div className="mt-6">
                                <div className="flex justify-between items-center font-medium mb-3 text-gray-900 dark:text-white">
                                    <span>الأجمالي:</span>
                                    <span><span className="icon-riyal-symbol mr-1"></span>219.00</span>
                                </div>

                                <div className="grid gap-2">
                                    <a href="cart.php" className="w-full te-btn te-btn-default text-center block">
                                        عرض السلة
                                    </a>
                                    <a href="checkout.php" className="w-full te-btn te-btn-primary text-center block">
                                        الدفع
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* <!-- Dark Mode Toggle Button --> */}
                <div className="flex items-center">
<button id="darkModeToggle" className="te-navbar-icon-button" aria-label="Toggle Dark Mode">

{/* <!-- Sun Icon --> */}
<div className="sun absolute  w-6 h-6 text-amber-500 opacity-100 rotate-0 dark:opacity-0 dark:rotate-180">
    <svg fill="currentColor" viewBox="0 0 24 24" className="-translate-x-0.25 w-full h-full">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
    </svg>
</div>

{/* <!-- Moon Icon --> */}
<div className="moon absolute w-6 h-6 text-slate-300 opacity-0 dark:opacity-100 dark:rotate-0 scale-75">
    <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
        <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"></path>
    </svg>
</div>

</button>

<span id="dark-mode-description" className="sr-only">
Toggle between light and dark themes </span>
</div>
                {/* <!-- Mobile Menu Toggle Button --> */}
                <button className="te-navbar-toggle te-navbar-icon-button lg:hidden" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-navigation">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>

                {/* <!-- Mobile Navigation Menu --> */}
                <div className="te-navbar-nav-mobile" id="mobile-navigation" aria-label="Mobile Navigation">
                    <div className="flex flex-col">

                        <a href="index.php" className="te-navbar-link-mobile te-navbar-link-active">الرئيسية</a>
                        <div className="te-navbar-dropdown">
                            <a href="#" className="te-navbar-link-mobile te-navbar-link-mobile-has-submenu">الفئات</a>
                            <div className="te-navbar-submenu-mobile">
                                <a href="#" className="te-navbar-submenu-mobile-link">أرواب ومناشف</a>
                                <a href="#" className="te-navbar-submenu-mobile-link">لباد</a>
                                <a href="#" className="te-navbar-submenu-mobile-link">مخدات</a>
                                <a href="#" className="te-navbar-submenu-mobile-link">واقي مراتب</a>
                                <a href="#" className="te-navbar-submenu-mobile-link">ملابس احرام رجالي</a>
                                <a href="#" className="te-navbar-submenu-mobile-link">سجاد صلاة</a>
                                <a href="#" className="te-navbar-submenu-mobile-link">دواسات</a>
                            </div>
                        </div>{/* <!-- .te-navbar-dropdown --> */}
                        <a href="index.php" className="te-navbar-link-mobile">عروض رمضان</a>
                        <a href="index.php" className="te-navbar-link-mobile">الأكثر مبيعا</a>
                        <a href="index.php" className="te-navbar-link-mobile">المضافة حديثا</a>
                        <a href="index.php" className="te-navbar-link-mobile">قسم الجملة</a>
                    </div>
                </div>

            </div>{/* <!-- header-actions --> */}

        </div>{/* <!-- te-navbar-content --> */}

        {/* <!-- Desktop Navigation Menu --> */}
        <div className="te-navbar-nav te-navbar-nav-desktop border-t border-gray-100 dark:border-gray-700 justify-center hidden lg:flex">
            <a href="index.php" className="te-navbar-link te-navbar-link-active">الرئيسية</a>
            <div className="te-navbar-dropdown">
                <a href="#" className="te-navbar-link te-navbar-link-has-submenu">الفئات</a>
                <div className="te-navbar-submenu-content">
                    <a href="#" className="te-navbar-submenu-link">أرواب ومناشف</a>
                    <a href="#" className="te-navbar-submenu-link">لباد</a>
                    <a href="#" className="te-navbar-submenu-link">مخدات</a>
                    <a href="#" className="te-navbar-submenu-link">واقي مراتب</a>
                    <a href="#" className="te-navbar-submenu-link">ملابس احرام رجالي</a>
                    <a href="#" className="te-navbar-submenu-link">سجاد صلاة</a>
                    <a href="#" className="te-navbar-submenu-link">دواسات</a>
                </div>
            </div>{/* <!-- .te-navbar-dropdown --> */}
            <a href="index.php" className="te-navbar-link">عروض رمضان</a>
            <a href="index.php" className="te-navbar-link">الأكثر مبيعا</a>
            <a href="index.php" className="te-navbar-link">المضافة حديثا</a>
            <a href="index.php" className="te-navbar-link">قسم الجملة</a>
        </div>

    </div>
</nav>
  )
}

export default headerStyle2
