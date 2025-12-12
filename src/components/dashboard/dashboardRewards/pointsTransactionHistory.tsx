import React from 'react'

function PointTransactionHistory() {
  return (
    <div className="lg:col-span-3 space-y-8">
    {/* <!-- Header --> */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Points Transaction History</h1>
                <p className="text-gray-600 dark:text-gray-400">Complete log of all your points activities and conversions.</p>
            </div>
            <div className="mt-4 md:mt-0">
                <button onClick={()=>{}} className="te-btn te-btn-outline flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Export History
                </button>
            </div>
        </div>
    </div>

    {/* <!-- Statistics Overview --> */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">1,820</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Earned</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,800</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Converted</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">215</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Bonus Points</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</div>
        </div>
    </div>

    {/* <!-- Filters --> */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form method="GET" action="" className="space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4">
            {/* <!-- Search --> */}
            <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
                <div className="relative">
                    <input type="text" id="search" name="search" value="" placeholder="Search by ID, description, order..." className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500" />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            
            {/* <!-- Type Filter --> */}
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                <select id="type" name="type" className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                    <option value="all" selected>All Types</option>
                    <option value="earned">Points Earned</option>
                    <option value="converted">Points Converted</option>
                    <option value="expired">Points Expired</option>
                </select>
            </div>
            
            {/* <!-- Date Filter --> */}
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Period</label>
                <select id="date" name="date" className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                    <option value="all" selected>All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="quarter">Last 3 Months</option>
                </select>
            </div>
            
            {/* <!-- Filter Actions --> */}
            <div className="flex space-x-2">
                <button type="submit" className="te-btn te-btn-primary">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                    </svg>
                    Filter
                </button>
                <a href="dashboard-points-history.php" className="te-btn te-btn-outline">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Clear
                </a>
            </div>
        </form>
    </div>

    {/* <!-- Results Summary --> */}
    
    {/* <!-- Transaction History --> */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transaction History</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Page 1 of 2 (15 transactions)
            </p>
        </div>
        
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Purchase Reward - Order #ORD-001234                                            </p>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Sep 1, 2025 2:30 PM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000089                                            </span>
                                        
                                                                                        <span className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                                </svg>
                                                <a href="dashboard-orders.php?order=ORD-001234" className="text-primary-600 hover:text-primary-700">
                                                    ORD-001234                                                    </a>
                                            </span>
                                                                                    
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        +250 points
                                    </span>
                                </div>
                                
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 1,250                                    </div>
                            </div>
                        </div>
                    </div>
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Converted 500 points to wallet balance                                            </p>
                                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                🎁 Bonus
                                            </span>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Aug 28, 2025 10:15 AM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000088                                            </span>
                                        
                                                                                    
                                                                                        <span className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                                </svg>
                                                Rate: 100 points = 10.00                                                </span>
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                                        -500 points
                                    </span>
                                </div>
                                
                                                                        <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                                        +25 bonus
                                    </div>
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 1,000                                    </div>
                            </div>
                        </div>
                    </div>
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Birthday Bonus - Happy Birthday!                                            </p>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Aug 26, 2025 9:00 AM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000087                                            </span>
                                        
                                                                                    
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        +200 points
                                    </span>
                                </div>
                                
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 1,500                                    </div>
                            </div>
                        </div>
                    </div>
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Welcome Bonus - New Member                                            </p>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Aug 25, 2025 4:45 PM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000086                                            </span>
                                        
                                                                                    
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}     
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        +100 points
                                    </span>
                                </div>
                                
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 1,300                                    </div>
                            </div>
                        </div>
                    </div>
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Purchase Reward - Order #ORD-001230                                            </p>
                                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                🎁 Bonus
                                            </span>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Aug 20, 2025 11:20 AM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000085                                            </span>
                                        
                                                                                        <span className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                                </svg>
                                                <a href="dashboard-orders.php?order=ORD-001230" className="text-primary-600 hover:text-primary-700">
                                                    ORD-001230                                                    </a>
                                            </span>
                                                                                    
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        +180 points
                                    </span>
                                </div>
                                
                                                                        <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                                        +20 bonus
                                    </div>
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 1,200                                    </div>
                            </div>
                        </div>
                    </div>
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Review Bonus - Product Review                                            </p>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Aug 18, 2025 1:10 PM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000084                                            </span>
                                        
                                                                                    
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        +50 points
                                    </span>
                                </div>
                                
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 1,020                                    </div>
                            </div>
                        </div>
                    </div>
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
                                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Converted 300 points to wallet balance                                            </p>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Aug 15, 2025 8:30 AM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000083                                            </span>
                                        
                                                                                    
                                                                                        <span className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                                </svg>
                                                Rate: 100 points = 10.00                                                </span>
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                                        -300 points
                                    </span>
                                </div>
                                
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 970                                    </div>
                            </div>
                        </div>
                    </div>
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Purchase Reward - Order #ORD-001225                                            </p>
                                                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                🎁 Bonus
                                            </span>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Aug 10, 2025 5:25 PM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000082                                            </span>
                                        
                                                                                        <span className="flex items-center">
                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                                </svg>
                                                <a href="dashboard-orders.php?order=ORD-001225" className="text-primary-600 hover:text-primary-700">
                                                    ORD-001225                                                    </a>
                                            </span>
                                                                                    
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        +320 points
                                    </span>
                                </div>
                                
                                                                        <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                                        +30 bonus
                                    </div>
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 1,270                                    </div>
                            </div>
                        </div>
                    </div>
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Referral Bonus - Friend Signup                                            </p>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Aug 5, 2025 12:40 PM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000081                                            </span>
                                        
                                                                                    
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                                        +150 points
                                    </span>
                                </div>
                                
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 950                                    </div>
                            </div>
                        </div>
                    </div>
                                        <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                                {/* <!-- Transaction Icon --> */}
                                <div className="flex-shrink-0">
                                                                            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400">
                                                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"></path>
                                            </svg>
                                                                                </div>
                                </div>
                                
                                {/* <!-- Transaction Details --> */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            Points Expired - 6 months old                                            </p>
                                                                                </div>
                                    
                                    <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            Aug 1, 2025 12:00 AM                                            </span>
                                        
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                            </svg>
                                            ID: TXN-2025-000080                                            </span>
                                        
                                                                                    
                                                                                </div>
                                </div>
                            </div>
                            
                            {/* <!-- Transaction Amount --> */}
                            <div className="flex flex-col items-end text-right">
                                <div className="flex items-center space-x-2">
                                    <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                                        -100 points
                                    </span>
                                </div>
                                
                                                                    
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Balance: 800                                    </div>
                            </div>
                        </div>
                    </div>
                                </div>
                </div>

    {/* <!-- Pagination --> */}
                <div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600 sm:px-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex-1 flex justify-between sm:hidden">
                                                            <a href="?page=2" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        Next
                    </a>
                                </div>
            
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Showing <span className="font-medium">1</span> to 
                        <span className="font-medium">10</span> of 
                        <span className="font-medium">15</span> results
                    </p>
                </div>
                
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                    
                                                    
                                                                                            <span className="relative inline-flex items-center px-4 py-2 border border-primary-500 bg-primary-50 dark:bg-primary-900 text-sm font-medium text-primary-600 dark:text-primary-400">1</span>
                                                                                                                            <a href="?page=2" className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600">2</a>
                                                                                    
                        {/* <!-- Show last page if not in range --> */}
                                                    
                                                        <a href="?page=2" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <span className="sr-only">Next</span>
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                                </svg>
                            </a>
                                                </nav>
                </div>
            </div>
        </div>
    
    {/* <!-- Quick Actions --> */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="dashboard-points.php" className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                        </svg>
                    </div>
                </div>
                <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Convert Points</h4>
                    <p className="text-sm text-gray-500">Turn points into wallet balance</p>
                </div>
            </a>
            
            <a href="dashboard.php" className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                    </div>
                </div>
                <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Shop &amp; Earn</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Make purchases to earn more points</p>
                </div>
            </a>
            
            <button onClick={()=>{}} className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                        </svg>
                    </div>
                </div>
                <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Share Progress</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tell friends about your rewards</p>
                </div>
            </button>
        </div>
    </div>
</div>
  )
}

export default PointTransactionHistory
