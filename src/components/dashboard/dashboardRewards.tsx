"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from '@/app/hooks/useAuth';
import getRequest from '../../../helpers/get';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import Wallet from './dashboardRewards/wallet';
import Points from "./dashboardRewards/points";
import History from "./dashboardRewards/History";
import ConversionSection from "./dashboardRewards/conversionSection";
import StatsSection from "./dashboardRewards/statsOverView";
interface ConversionTier {
  points: number;
  bonus: number;
  value: number;
  label: string;
  highlight?: boolean;
}

interface Transaction {
  type: "earned" | "converted";
  description: string;
  amount: number;
  date: string;
  balance_after: number;
}

export default function RewardsWalletCenter() {
  const { user, token } = useAuth();
  const locale = useLocale();
  const t = useTranslations();
  // Mirror dashboard wallet source
  const [walletState, setWalletState] = useState<{ balance: number, total_earned_points: number, redeemed_points: number, total_value_earned: number } | null>(null);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const[recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoadingRecentTransactions, setIsLoadingRecentTransactions] = useState(false);

  const fetchWallet = useCallback(async () => {
    if (!token) return;
    setIsLoadingWallet(true);
    try {
      
      const response = await getRequest('/customer/points-history', { 'Content-Type': 'application/json' }, token, locale);
      setWalletState(response?.data ?? null);
      setRecentTransactions(response?.data.transactions.items ?? []);
    } catch (e) {
      // noop
    } finally {
      setIsLoadingWallet(false);
    }
  }, [token, locale]);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  // Real user-based points (fallback to 0) without using any
  const authUser = (user ?? {}) as { reward_points?: number };
  const current_points = Number(authUser.reward_points ?? 0);
  
  const points_to_next_tier = 0;
  

  const conversion_tiers: ConversionTier[] = [
    { points: 100, bonus: 0, value: 10.0, label: "Basic" },
    { points: 500, bonus: 5, value: 52.5, label: "Popular", highlight: true },
    { points: 1000, bonus: 10, value: 110.0, label: "Best Value" },
  ];

 

  const [pointsToConvert, setPointsToConvert] = useState<number>(0);
  const [resultAmount, setResultAmount] = useState<number>(0);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const handleSelectTier = (tier: ConversionTier, index: number) => {
    if (tier.points > current_points) return;
    setSelectedTier(index);
    setPointsToConvert(tier.points);
    setResultAmount(tier.value);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const points = parseInt(e.target.value) || 0;
    setPointsToConvert(points);
    setResultAmount((points / 100) * 10);
    setSelectedTier(null);
  };

 

  return (
   <>
     <div className="lg:col-span-3 space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            {t("Rewards")} & {t("Wallet Center")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t("Manage your points") }, {t("track your progress") }, {t("and maximize your rewards") }.
          </p>
        </div>
        <div className="space-y-8">
      {/* Current Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wallet Balance */}
        <Wallet balance={walletState?.balance || 0} isLoadingWallet={isLoadingWallet} />
        <Points current_points={current_points} />
        
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Convert Points */}
        <a
          href="#conversion-section"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 flex justify-center items-center bg-primary-100 rounded-full group-hover:scale-110 transition-transform">
              <svg
                className="w-5 h-5 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                ></path>
              </svg>
            </div>
            <div className="ms-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {t("Convert Points")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("Turn points into cash")}
              </p>
            </div>
          </div>
        </a>

        {/* View History */}
        <Link
          href="/dashboard/points-history"
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center">
            <div className="w-10 h-10 flex justify-center items-center bg-gray-100 dark:bg-gray-900 rounded-full group-hover:scale-110 transition-transform">
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <div className="ms-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {t("View History")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("Track all transactions")}
              </p>
            </div>
          </div>
        </Link>

        {/* Earn More */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-lg shadow-sm border border-yellow-200 dark:border-yellow-700 p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 flex justify-center items-center bg-yellow-100 dark:bg-yellow-800 rounded-full">
              <svg
                className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="ms-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {t("Earn More")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("Shop & earn points")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
        {/* Loyalty Progress */}

        {/* Conversion Section */}
      <ConversionSection conversion_tiers={conversion_tiers} current_points={current_points} selectedTier={selectedTier} handleSelectTier={handleSelectTier} pointsToConvert={pointsToConvert} resultAmount={resultAmount} handleCustomChange={handleCustomChange} />
      <StatsSection totalEarnedLifetime={walletState?.total_earned_points || 0} totalConvertedLifetime={walletState?.redeemed_points || 0} totalValueEarned={walletState?.total_value_earned || 0} />
        {/* Transactions */}
      <History recent_transactions={recentTransactions} walletLoading={isLoadingWallet} />
      </div>
   </>
  );
}
