"use client"
import React, { useCallback } from 'react'
import { Formik, FormikHelpers } from 'formik';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import {getCountryDialCodeFromCountryCodeOrNameOrFlagEmoji} from "country-codes-flags-phone-codes";
import CountryPhoneInput from '../phone/countryphoneInput';
import { useTranslations } from 'next-intl';
function Registeration() {
    const t = useTranslations();
    interface RegisterFormValues {
        phone: string;
        countryCode: string;
        first_name: string;
        last_name: string;
        email: string;
        terms: boolean;
      }
      const router = useRouter();
      const phone=useSearchParams().get('phone');
      const countryCode=useSearchParams().get('country');
      
      // Memoized onChange function for CountryPhoneInput
      const handlePhoneChange = useCallback((phoneValue: string, countryCode: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => {
        handleChange({
          target: {
            name: 'phone',
            value: phoneValue
          }
        } as React.ChangeEvent<HTMLInputElement>);
        handleChange({
          target: {
            name: 'countryCode',
            value: countryCode
          }
        } as React.ChangeEvent<HTMLInputElement>);
      }, []);
      
  return (
    <div>
          {/* <!-- Registration Step (Hidden by default) --> */}
        <div id="register-step" className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 ">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Create Your Account')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('We need a few more details to get started')}</p>
            </div>

            <Formik<RegisterFormValues>
      initialValues={{ 
        phone: phone || '', 
        countryCode: countryCode || 'SA',
        first_name: '', 
        last_name: '', 
        email: '', 
        terms: false 
      }}
      validate={(values: RegisterFormValues) => {
        const errors: Partial<Record<keyof RegisterFormValues, string>> = {};
        if (!values.first_name) {
          errors.first_name = ('validation.first_name_required');
        }
        if (!values.last_name) {
          errors.last_name = ('validation.last_name_required');
        }
        if (!values.email) {
          errors.email = ('validation.email_required');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = ('validation.email_invalid');
        }
        if (!values.phone) {
          errors.phone = ('validation.phone_required');
        } else {
          // Check if phone contains only digits
          if (!/^\d+$/.test(values.phone)) {
            errors.phone = ('validation.phone_digits_only');
          } else if (values.phone.length < 7) {
            errors.phone = 'Phone number must be at least 7 digits'
          } else if (values.phone.length > 11) {
            errors.phone = 'Phone number must not exceed 11 digits'
          }
        }
        if (!values.terms) {
          errors.terms = ('validation.must_accept_terms');
        }
        return errors;
      }}
      onSubmit={async (values: RegisterFormValues, { setSubmitting, setFieldError }: FormikHelpers<RegisterFormValues>) => {
        try {
            // Get country dial code
            const phoneCode = getCountryDialCodeFromCountryCodeOrNameOrFlagEmoji(values.countryCode) || '';
            
            // Prepare the data for the API
            const registrationData = {
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              phone: `${phoneCode}${values.phone}`,
              terms_accepted: values.terms,
            };
            
            // Uncomment and use the actual API call when ready
            // const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/register", registrationData);
            // console.log('Registration response:', response.data);
            
            // Save complete registration data to localStorage
            localStorage.setItem('registrationData', JSON.stringify(registrationData));
            
            // Redirect to OTP page - the OTP page will read the complete data from localStorage
            router.push(`/auth/otp?phone=${values.phone}&country=${values.countryCode}`);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error("Axios error:", error.response?.data || error.message);
              setFieldError('email', 'Registration failed. Please try again.');
            } else {
              console.error("Unexpected error:", error);
              setFieldError('email', 'An unexpected error occurred. Please try again.');
            }
          } finally {
            setSubmitting(false);
          }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form id="register-form" className="space-y-6" onSubmit={handleSubmit}>
       <div className='flex flex-row gap-4'>
       <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t('First Name')}
            </label>
            <input
                type="text"
                id="first_name"
                name="first_name"
                required
                disabled={isSubmitting}
                className={`block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                placeholder={t('Enter your First name')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                />
                {errors.first_name && touched.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
        </div>
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                {t('Last Name')}
            </label>
            <input
                type="text"
                id="last_name"
                name="last_name"
                required
                disabled={isSubmitting}
                className={`block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                placeholder={t('Enter your Last name')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                />
                {errors.last_name && touched.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
        </div>
       </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
               {t("Email Address")} *
            </label>
            <input
                type="email"
                id="email"
                name="email"
                disabled={isSubmitting}
                className={`block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                required
                placeholder={t('Enter your email address')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                />
                {errors.email && touched.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <CountryPhoneInput
          value={values.phone}
          onChange={(phoneValue, countryCode) => handlePhoneChange(phoneValue, countryCode, handleChange)}
          onBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
          disabled={isSubmitting}
          label={`${t('Phone Number')} ${phone ? `(${t('Prefilled from login')})` : ''}`}
          required
          initialCountryCode={countryCode || 'SA'}
        />

        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    disabled={isSubmitting}
                    className={`focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.terms === true}
                    />
            </div>
            <div className="ml-3 text-sm">
                {errors.terms && touched.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
                <label htmlFor="terms" className="text-gray-700 dark:text-gray-200">
                    {t('I agree to the')} <a href="#" className="text-primary-600 hover:text-primary-500">{t('Terms of Service')}</a>
                    {t('and')} <a href="#" className="text-primary-600 hover:text-primary-500">{t('Privacy Policy')}</a>
                </label>
            </div>
        </div>

        <div className="flex space-x-4">
            <Link
                href="/auth/login"
                type="button"
                id="back-to-phone"
                className="te-btn te-btn-default">
                {t('Back')}
            </Link>
            <button
                type="submit"
                id="register-submit"
                disabled={isSubmitting}
                className={`te-btn te-btn-primary flex-1 flex justify-center items-center ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>{t('Creating Account')}...</span>
                  </>
                ) : (
                  <span>{t('Create Account')}</span>
                )}
            </button>
        </div>
    </form>
      )}
    </Formik>
           
        </div>
    </div>
  )
}

export default Registeration
