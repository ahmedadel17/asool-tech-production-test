import React from 'react'

function RecentOrders() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="p-6 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
        <a href="dashboard-orders.php" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</a>
    </div>
    <div className="p-6">
        <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Order ID</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Total</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">ORD-2024-001234</td>
                            <td className="px-6 py-4">September 1, 2025</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                                    Delivered                                        </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="icon-riyal-symbol text-xs"></span>
                                <span>65.00</span>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-primary-600 dark:text-primary-100 hover:underline">View</a>
                            </td>
                        </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">ORD-2024-001233</td>
                            <td className="px-6 py-4">August 28, 2025</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                                    Shipped                                        </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="icon-riyal-symbol text-xs"></span>
                                <span>85.00</span>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-primary-600 dark:text-primary-100 hover:underline">View</a>
                            </td>
                        </tr>
                                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">ORD-2024-001232</td>
                            <td className="px-6 py-4">August 20, 2025</td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium rounded-full">
                                    Processing                                        </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="icon-riyal-symbol text-xs"></span>
                                <span>45.00</span>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-primary-600 dark:text-primary-100 hover:underline">View</a>
                            </td>
                        </tr>
                                            </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default RecentOrders
