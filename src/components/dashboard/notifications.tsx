"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import getRequest from "../../../helpers/get";
import { useUserStore } from "@/store/userStore";
import NotificationCard from "./dashboardNotifications/notificationCard";
import SettingToggle from "./dashboardNotifications/settingToggle";
interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: string;
  created_at?: string;
  read_at?: string | null;
  related_data?: {
    order_id?: number;
  };
}

export default function Notifications() {
  const t = useTranslations("Notifications");
  const { token } = useUserStore();
  const locale = useLocale();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getRequest('/customer/notifications', {'Content-Type': 'application/json'}, token, locale);
      setNotifications(response?.data?.items);
      return response?.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token, locale]);

  useEffect(() => {
    getNotifications();
  }, []);



  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
  };

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Notification Settings state
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: true,
    systemUpdates: true,
  });

  return (
    
    <div className="lg:col-span-3 space-y-8">
    {/* Notifications List */}
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
           {t('Notifications')}
          </h1>

          {notifications?.some((n) => n.unread) && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              {t('Mark all as read')}
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {isLoading ? (
          // Loading State
          <div className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">{t('Loading notifications')}...</p>
            </div>
          </div>
        ) : notifications?.length > 0 ? (
          notifications?.map((notification) => (
            <NotificationCard key={notification.id} notification={notification}  deleteNotification={deleteNotification} refetchNotifications={getNotifications} />
          ))
        ) : (
          // Empty State
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('No notifications')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('You are all caught up')}!{t('Check back later')}
            </p>
          </div>
        )}
      </div>
    </div>


  </div>

  );
}
