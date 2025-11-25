'use client';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import React, { useState } from 'react'
import postRequest from '../../../../helpers/post';
import { useAuth } from '@/app/hooks/useAuth';

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
function NotificationCard({notification, deleteNotification, refetchNotifications}: {notification: Notification, deleteNotification: (id: number) => void, refetchNotifications: () => Promise<void>}) {
  const t = useTranslations();
  const { token } = useAuth();
  const locale = useLocale();
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);

  const markAsReadNotification = async (id: number) => {
    setIsMarkingAsRead(true);
    try {
      const response = await postRequest('/customer/mark-notification-as-read/'+id, {}, {}, token, locale);
      // Refetch notifications after successful mark as read
      await refetchNotifications();
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
    } finally {
      setIsMarkingAsRead(false);
    }
  }
  return (
    <div
    key={notification.id}
    className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
      notification.unread
        ? "bg-blue-50 dark:bg-blue-900/20"
        : ""
    }`}
  >
    <div className="flex items-start space-x-4 rtl:space-x-reverse">
      <img src={notification.icon} alt={notification.title} className="w-10 h-10" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3
            className={`text-sm font-medium text-gray-900 dark:text-white ${
              notification.unread ? "font-semibold" : ""
            }`}
          >
            {notification.title}
            {notification.unread && (
              <span className="ms-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
            )}
          </h3>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {notification.created_at}
           
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {notification.message}
        </p>

        <div className="mt-2 flex space-x-2 rtl:space-x-reverse">
          { !notification.read_at && (
            <button
              onClick={() => markAsReadNotification(notification.id)}
              disabled={isMarkingAsRead}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              {isMarkingAsRead ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-600"></div>
                  <span>{t('Marking as read')}...</span>
                </>
              ) : (
                t('Mark as read')
              )}
            </button>
          )}

          <button
            onClick={() => deleteNotification(notification.id)}
            className="text-xs text-red-600 dark:text-red-400 hover:underline"
          >
            {t('Delete')}
          </button>
         {notification?.type =='order_marketplace' && <Link
            href={`/order/${notification.related_data?.order_id}`}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t('View Order')}
          </Link>}
        </div>
      </div>
    </div>
  </div>
  )
}

export default NotificationCard
