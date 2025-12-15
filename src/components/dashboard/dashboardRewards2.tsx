'use client'
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link'
import React, { useEffect, useState, useCallback } from 'react'
import getRequest from '../../../helpers/get';
import postRequest from '../../../helpers/post';
import { useUserStore } from '@/store/userStore';
import ConversionGridCard from './converstionGridCard';
import DashboardHeader from './DashboardHeader';

function DashboardRewards2() {
    const [pointsHistory, setPointsHistory] = useState< {
        current_points: number;
        current_wallet_balance: number;
        total_current_points_with_sar: number;
        example_rate: number;
    }>({current_points: 0, current_wallet_balance: 0, total_current_points_with_sar: 0, example_rate: 0});
    const [isLoading, setIsLoading] = useState(false);
    const [pointsToConvert, setPointsToConvert] = useState<number>(0);
    const [resultAmount, setResultAmount] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const { token } = useUserStore();
    const locale = useLocale();
    const t = useTranslations("Rewards");
    // Conversion rate: 100 points = 10 riyals (10 points per 1 riyal)
    const conversionRate = 0.01; // 1 point = 0.1 riyal
    
    const getTransactions = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getRequest('/customer/points-history', {'Content-Type': 'application/json'}, token, locale);
            setPointsHistory(response?.data ?? {current_points: 0, current_wallet_balance: 0, total_current_points_with_sar: 0, example_rate: 0});
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setIsLoading(false);
        }
    }, [token, locale]);
    
    useEffect(() => {
        getTransactions();
    }, [getTransactions]);
    
    const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const points = parseInt(e.target.value) || 0;
        setPointsToConvert(points);
        // Calculate result: points * conversion rate
        setResultAmount(points * conversionRate);
        setSubmitMessage(null);
    };
    
    const handleCardClick = (points: number) => {
        setPointsToConvert(points);
        // Calculate result: points * conversion rate
        setResultAmount(points * conversionRate);
        setSubmitMessage(null);
        // Scroll to the conversion form
        document.getElementById('conversion-section')?.scrollIntoView({ behavior: 'smooth' });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!pointsToConvert || pointsToConvert < 100) {
            setSubmitMessage({type: 'error', text: 'Minimum 100 points required for conversion'});
            return;
        }
        
        if (!token) {
            setSubmitMessage({type: 'error', text: 'Please log in to convert points'});
            return;
        }
        
        setIsSubmitting(true);
        setSubmitMessage(null);
        
        try {
            const response = await postRequest(
                '/customer/redeem-points',
                { points: pointsToConvert },
                {'Content-Type': 'application/json'},
                token,
                locale
            );
            
            if (response.status === 200 || response.status === 201) {
                setSubmitMessage({type: 'success', text: 'Points converted successfully!'});
                setPointsToConvert(0);
                setResultAmount(0);
                // Refresh transactions to update balance
                await getTransactions();
            } else {
                setSubmitMessage({type: 'error', text: response.data?.message || 'Failed to convert points'});
            }
        } catch (error: unknown) {
            let errorMessage = 'An error occurred while converting points';
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response?: { data?: { message?: string } } };
                errorMessage = axiosError.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            setSubmitMessage({type: 'error', text: errorMessage});
        } finally {
            setIsSubmitting(false);
        }
    };
  return (
    <div className="lg:col-span-3 space-y-8">
    {/* <!-- Header --> */}
    <DashboardHeader title={`${t("Rewards")} & ${t("Wallet Center")}`} description={`${t("Manage your points") }, ${t("track your progress") }, ${t("and maximize your rewards") }.`} />
   


   

    {/* <!-- Current Balances --> */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <!-- Wallet Balance --> */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg shadow-sm border border-purple-200 dark:border-purple-700 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 flex justify-center items-center bg-purple-100 dark:bg-purple-800 rounded-full">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
                    </svg>
                </div>
                <span className="text-xs font-medium text-purple-600 dark:text-purple-300 bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded-full">{t("Available")}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t("Wallet Balance")}</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                <span className="icon-riyal-symbol text-lg mr-1"></span>{pointsHistory?.current_wallet_balance || 0}             </p>
            <p className="text-sm text-purple-600 dark:text-purple-300">{t("Ready to spend")}</p>
        </div>

        {/* <!-- Reward Points --> */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg shadow-sm border border-green-200 dark:border-green-700 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 flex justify-center items-center bg-green-100 dark:bg-green-800 rounded-full">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"></path>
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-300 bg-green-200 dark:bg-green-800 px-2 py-1 rounded-full">{t("Active")}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t("Reward Points")}</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {pointsHistory?.current_points || 0}
            </p>
            <p className="text-sm text-green-600 dark:text-green-300">
                {t('Worth')} <span className="icon-riyal-symbol text-xs"></span>{pointsHistory?.total_current_points_with_sar || 0}                </p>
        </div>
    </div>

    {/* <!-- Quick Actions --> */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="#conversion-section" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center">
                <div className="w-10 h-10 flex justify-center items-center bg-primary-100 rounded-full group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                    </svg>
                </div>
                <div className="ms-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">{t("Convert Points")}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("Turn points into cash")}</p>
                </div>
            </div>
        </Link>
        <Link href="/dashboard/walletHistory" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center">
                <div className="w-10 h-10 flex justify-center items-center bg-gray-100 dark:bg-gray-900 rounded-full group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                </div>
                <div className="ms-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">{t("View Wallet History")}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("Track all transactions")}</p>
                </div>
            </div>
        </Link>
        <Link href="/dashboard/pointsHistory" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group">
            <div className="flex items-center">
                <div className="w-10 h-10 flex justify-center items-center bg-gray-100 dark:bg-gray-900 rounded-full group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                </div>
                <div className="ms-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">{t("View Points History")}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("Track all transactions")}</p>
                </div>
            </div>
        </Link>
       

       
    </div>

    {/* <!-- Conversion Options --> */}
    <div id="conversion-section" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t("Convert Points to Wallet Balance")}</h2>

        {/* <!-- Conversion Tiers --> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ConversionGridCard points={100} value={1.00} available={true} onClick={() => handleCardClick(100)} />
            <ConversionGridCard points={500} value={5.00} available={true} onClick={() => handleCardClick(500)} />
            <ConversionGridCard points={1000} value={10.00} available={true} onClick={() => handleCardClick(1000)} />
            
            
                        </div>

        {/* <!-- Custom Conversion --> */}
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">{t("Custom Amount")} </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                {submitMessage && (
                    <div className={`p-3 rounded-md ${
                        submitMessage.type === 'success' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}>
                        {submitMessage.text}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="points-to-convert" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("Points to Convert")}</label>
                        <input 
                            type="number" 
                            id="points-to-convert" 
                            name="points_to_convert" 
                            min="100" 
                            max="1250" 
                            step="10" 
                            value={pointsToConvert || ''}
                            onChange={handlePointsChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white" 
                            placeholder={t("Enter points")} 
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t("You ll Receive")}</label>
                        <div className="block w-full rounded-md border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-600 px-3 py-2 text-gray-900 dark:text-white">
                            <span className="icon-riyal-symbol text-sm mr-2"></span>
                            <span>{resultAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {typeof pointsHistory?.example_rate === 'object' && pointsHistory?.example_rate !== null
                            ? (pointsHistory.example_rate as { example?: string })?.example || '100 points = 10.00 riyals'
                            : '100 points = 10.00 riyals'}
                    </p>
                    <button 
                        type="submit" 
                        className="te-btn te-btn-primary" 
                        id="convert-btn"
                        disabled={isSubmitting || !pointsToConvert || pointsToConvert < 100}
                    >
                        {isSubmitting ? t('Converting') : t('Convert Points')}
                    </button>
                </div>
            </form>
        </div>
    </div>

   

    
</div>
  )
}

export default DashboardRewards2
