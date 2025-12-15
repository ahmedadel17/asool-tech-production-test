"use client";
import React, { useEffect, useState, useCallback } from "react";
import getRequest from "../../../helpers/get";
import { useUserStore } from "@/store/userStore";
import { useLocale, useTranslations } from "next-intl";
import DashboardOrders from "@/components/dashboard/dashboardOrders";

interface Order {
  id: string;
  date: string;
  status: {
    text: string;
    color: string;
  };
  total: string;
}

type Statistics = {
  total_wallet_balance: number;
  total_points: number;
  total_orders: number;
  total_wishlist_items: number;
  paid_amount: number;
  favorites_count: number;
  orders_count: number;
  latest_orders: Order[];
}

export default function Dashboard() {


  const t = useTranslations('Dashboard')
  const { token,user } = useUserStore();
  const locale = useLocale();
  // Consolidated state for better performance and organization
  const [state, setState] = useState({
    statistics: null as Statistics | null,
    isLoading: {
     statistics: false
    }
  });
  const getStatistics = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: { ...prev.isLoading, statistics: true } }));
    try {
      const response = await getRequest('/customer/statistics', {'Content-Type': 'application/json'}, token, locale);
      // console.log('wallet', response);
      setState(prev => ({ 
        ...prev, 
        statistics: response?.data,
        isLoading: { ...prev.isLoading, statistics: false }
      }));
      if (response?.status) {
        return response?.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching wallet:', error);
      setState(prev => ({ ...prev, isLoading: { ...prev.isLoading, statistics: false } }));
    }
  }, [token, locale]);




 useEffect(()=>{
  getStatistics();
 },[ getStatistics]);

  return (
  <>
   {/* Main Content */}
   <div className="lg:col-span-3 space-y-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('Welcome back')}, {user?.first_name} {user?.last_name}!</h1>
          <p className="text-gray-600 dark:text-gray-400">{t('Heres whats happening with your account')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wallet Card */}
          <StatCard
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
              </svg>
            }
            value={state.isLoading.statistics ? t("Loading") : ` ${state.statistics?.total_wallet_balance || '0'}`}
            label={t('Wallet Balance')}
            isLoading={state.isLoading.statistics}
          />

          {/* Points Card */}
          <StatCard
            color="green"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M11.051 7.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.867l-1.156-1.152a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
              </svg>
            }
            value={state.isLoading.statistics ? t("Loading") : `${state.statistics?.total_points || '0'}`}
            label={t('Reward Points')}
            isLoading={state.isLoading.statistics}
          />

          {/* Total Spent */}
          <StatCard color="purple" icon={<span className="icon-riyal-symbol"></span>} value={state.isLoading.statistics ? t("Loading") : ` ${state.statistics?.paid_amount || '0'}`} label={t('Total Spent')} />

          {/* Wishlist */}
          <StatCard color="red" icon={<HeartIcon />} value={state.isLoading.statistics ? t("Loading") : `${state.statistics?.total_wishlist_items || '0'}`} label={t('Wishlist Items')} />

          {/* Total Orders */}
          <StatCard color="blue" icon={<BagIcon />} value={state.isLoading.statistics ? t("Loading") : `${state.statistics?.total_orders || '0'}`} label={t('Total Orders')} />
        </div>


        {/* Recent Orders */}
    <DashboardOrders orders={state.statistics?.latest_orders || null} isLoading={state.isLoading.statistics} />

      
      </div>
  </>

     
  );
}

/* ========== Reusable Components ========== */

interface StatCardProps {
  color: string;
  icon: React.ReactNode;
  value: string;
  label: string;
  isLoading?: boolean;
}

function StatCard({ color, icon, value, label, isLoading = false }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center">
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900 rounded-full text-${color}-600 dark:text-${color}-400`}>
          {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-current border-t-transparent"></div>
          ) : (
            icon
          )}
        </div>
        <div className="ms-4">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      ></path>
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
    </svg>
  );
}
