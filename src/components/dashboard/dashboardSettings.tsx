'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useUserStore } from '@/store/userStore';
import getRequest from '../../../helpers/get';
import postRequest from '../../../helpers/post';
import { toast } from 'react-hot-toast';

function DashboardSettings() {
  const t = useTranslations('Account Settings');
  const locale = useLocale();
  const { token, user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    birth_date: '',
    gender: '',
  });

  // Fetch user profile data
  const fetchProfile = useCallback(async () => {
    if (!token) return;
    
    const response = await getRequest('/customer/get-profile', {}, token, locale);
    if (response?.data) {
      const userData = response?.data?.user;
      setFormData({
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        birth_date: userData.birth_date || '',
        gender: userData.gender || '',
      });
    }
  }, [token, locale]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast.error(t('Please login to update your profile') || 'Please login to update your profile');
      return;
    }

    setIsLoading(true);
    try {
      const response = await postRequest(
        '/customer/edit-profile',
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          birth_date: formData.birth_date,
          gender: formData.gender,
        },
        {},
        token,
        locale
      );

      if (response.data?.status) {
        toast.success(response.data.message || t('Profile updated successfully'));
        // console.log('response', response?.data?.data?.user);
        
        // Update user data in Zustand store and localStorage
        const updatedUser = response?.data?.data?.user;
        if (updatedUser) {
          // Merge with existing user data to preserve any fields not returned in response
          setUser({
            ...user,
            ...updatedUser,
            // Ensure we have the name field if it exists or construct it
            name: updatedUser.name || `${updatedUser.first_name || ''} ${updatedUser.last_name || ''}`.trim() || user?.name,
          });
        }
      
      } else {
        toast.error(response.data?.message || t('Failed to update profile') );
      }
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(errorMessage || t('Failed to update profile'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:col-span-3 space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-600">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('Account Settings')}</h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('Personal Information')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('First Name')}
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Last Name')}
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    autoComplete="family-name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Email address')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Birth Date')}
                  </label>
                  <input
                    type="date"
                    name="birth_date"
                    id="birth_date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Gender')}
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{t('Select gender')}</option>
                    <option value="male">{t('Male')}</option>
                    <option value="female">{t('Female')}</option>
                  </select>
                </div>
                {/* <div className="md:col-span-2">
                  <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Avatar')}
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                  />
                  {formData.avatar && (
                    <div className="mt-2">
                      <img src={formData.avatar} alt="Avatar preview" className="w-20 h-20 rounded-full object-cover" />
                    </div>
                  )}
                </div> */}
              </div>
            </div>

            <div className="pt-5">
              <button
                type="submit"
                disabled={isLoading}
                className="te-btn te-btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{t('Saving')}...</span>
                  </>
                ) : (
                  t('Save Changes')
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DashboardSettings;
