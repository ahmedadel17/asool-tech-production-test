'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useUserStore } from '@/store/userStore';
import getRequest from '../../../helpers/get';
import postRequest from '../../../helpers/post';
import axios from 'axios';
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
    avatar: null as File | null,
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
        avatar: null,
      });
      // Set avatar preview if user has an avatar
      if (userData.avatar) {
        setAvatarPreview(userData.avatar);
      }
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(t('Please select a valid image file'));
        return;
      }
      
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t('Image size must be less than 5MB'));
        return;
      }

      setFormData(prev => ({
        ...prev,
        avatar: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast.error(t('Please login to update your profile') || 'Please login to update your profile');
      return;
    }

    setIsLoading(true);
    try {
      // For file uploads, we need to use FormData and let axios set Content-Type automatically
      let response;
      if (formData.avatar) {
        const fd = new FormData();
        fd.append('first_name', formData.first_name);
        fd.append('last_name', formData.last_name);
        fd.append('email', formData.email);
        fd.append('birth_date', formData.birth_date);
        fd.append('gender', formData.gender);
        fd.append('avatar', formData.avatar);
        
        // Use axios directly for FormData to let it set Content-Type automatically
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/edit-profile`,
          fd,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept-Language': locale || 'en'
              // Don't set Content-Type - let axios set it with boundary for multipart/form-data
            }
          }
        );
      } else {
        response = await postRequest(
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
      }

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

            <div className="md:col-span-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('Avatar')}
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {avatarPreview ? (
                          <img 
                            src={avatarPreview} 
                            alt="Avatar preview" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                      </div>
                      <label
                        htmlFor="avatar"
                        className="absolute bottom-0 right-0 w-7 h-7 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors"
                        title={t('Change avatar')}
                      >
                        <input
                          type="file"
                          name="avatar"
                          id="avatar"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </label>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('Click the camera icon to change your avatar')}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {t('Image file')} {`( ${t('max')} ${5} ${t('MB')})`}
                      </p>
                    </div>
                  </div>
                </div>
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
