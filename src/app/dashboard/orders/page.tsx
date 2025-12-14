'use client';
import DashboardOrders from '@/components/dashboard/dashboardOrders'
import React, { useCallback, useEffect, useState } from 'react'
import getRequest from '../../../../helpers/get';
import { useUserStore } from '@/store/userStore';
import { useLocale } from 'next-intl';

interface Order {
  id: string;
  date: string;
  total: string;
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useUserStore();
  const locale = useLocale();
  const getOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getRequest('/order/orders', {'Content-Type': 'application/json'}, token, locale);
      // console.log('orders',response.data.my_orders.items);
      setOrders(response?.data?.my_orders?.items);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, [token, locale]);
  
  useEffect(() => {
    getOrders();
  }, [getOrders]);  
  return (
       <DashboardOrders orders={orders || null} isLoading={isLoading} />
  )
}

export default OrdersPage
