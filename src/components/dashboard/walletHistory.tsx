'use client';
import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import getRequest from '../../../helpers/get';
import { useUserStore } from '@/store/userStore';
import { useLocale, useTranslations } from 'next-intl';
import PointsStatsCard from './pointsStatsCard';
import PointsHistoryPagination from './pointsHistoryPagination';
import TransactionHistoryTableWrapper from './TransactionHistoryTableWrapper';
import DashboardHeader from './DashboardHeader';

interface TransactionsResponse {
  items?: Array<{
    id: string | number;
    description: string;
    amount: number;
    created_at: string;
    type: string;
  }>;
  paginate?: {
    current_page: number;
    total_pages: number;
    total: number;
    per_page: number;
  };
}

function WalletHistory() {
    const [transactionsData, setTransactionsData] = useState<TransactionsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useUserStore();
    const locale = useLocale();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Get current page from URL or default to 1
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const getTransactions = useCallback(async (page: number = 1) => {
        setIsLoading(true);
        try {
            // Build query params with page
            const queryParams = new URLSearchParams();
            queryParams.set('page', page.toString());
            
            const response = await getRequest(
                `/customer/wallet?${queryParams.toString()}`,
                {'Content-Type': 'application/json'},
                token,
                locale
            );
            
            // Store the full response data structure
            setTransactionsData(response?.data?.transactions || null);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setTransactionsData(null);
        } finally {
            setIsLoading(false);
        }
    }, [token, locale]);

    useEffect(() => {
        getTransactions(currentPage);
    }, [currentPage, getTransactions]);

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`);
    };

    // Extract pagination data from response
    const paginationData = transactionsData?.paginate;
    const currentPageFromAPI = paginationData?.current_page || currentPage;
    const totalPages = paginationData?.total_pages || 0;
    const totalItems = paginationData?.total || 0;
    const itemsPerPage = paginationData?.per_page || 10;
    const transactions = transactionsData?.items || [];
    const t = useTranslations("Wallet History");
  return (
    <div className="lg:col-span-3 space-y-8">
        {/* <!-- Header --> */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Points Transaction History</h1>
                    <p className="text-gray-600 dark:text-gray-400">Complete log of all your points activities and conversions.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button className="te-btn te-btn-outline flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Export History
                    </button>
                </div>
            </div>
        </div> */}
        <DashboardHeader title={t("Wallet Transaction History")} description={t("Complete log of all your Wallet activities")} />

        {/* <!-- Statistics Overview -->
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
        </div> */}

        {/* <!-- Filters --> */}
        {/* <FiltersHeader /> */}

        {/* <!-- Results Summary --> */}
        
        {/* <!-- Transaction History --> */}
        {isLoading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center py-12">
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">{t("Loading transactions")}...</p>
              </div>
            </div>
          </div>
        ) : (
          <TransactionHistoryTableWrapper currentPage={currentPageFromAPI} totalPages={totalPages} perPage={itemsPerPage}>
            {transactions?.map((transaction) => (
              <PointsStatsCard 
                cardType="wallet" 
                key={transaction.id} 
                description={transaction.description} 
                amount={transaction.amount} 
                created_at={transaction.created_at} 
                type={transaction.type} 
              />
            ))}
          </TransactionHistoryTableWrapper>
        )}
        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Transaction History</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Page {transactions.paginate.current_page} of {transactions.paginate.total_pages} ({transactions.paginate.per_page} transactions)
                </p>
            </div>
            
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                             
                     
                            
                                    </div>
                    </div> */}

        {/* <!-- Pagination --> */}
        <PointsHistoryPagination
          currentPage={currentPageFromAPI}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        {/* <!-- Quick Actions --> */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
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
                
                <button  className="flex items-center p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
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
        </div> */}
    </div>
  )
}

export default WalletHistory
