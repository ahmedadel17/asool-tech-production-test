'use client'

import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import PhoneInput from '@/components/phoneInput'
import { countries, type Country } from '@/components/countryDropdown'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
interface RegisterFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  terms: boolean
}

function Register() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneFromQuery = searchParams.get('phone') || ''
  const countryFromQuery = searchParams.get('country') || ''
  const t = useTranslations("register")

  // Define validation schema inside component to access t function
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(t('First name is required'))
      .min(2, t('First name must be at least 2 characters'))
      .max(50, t('First name must not exceed 50 characters')),
    lastName: Yup.string()
      .required(t('Last name is required'))
      .min(2, t('Last name must be at least 2 characters'))
      .max(50, t('Last name must not exceed 50 characters')),
    email: Yup.string()
      .required(t('Email is required'))
      .email(t('Please enter a valid email address')),
    phone: Yup.string()
      .required(t('Phone number is required'))
      .matches(/^[\d\s\-\(\)]+$/, t('Phone number can only contain numbers') + ', ' + t('spaces') + ', ' + t('dashes') + ', ' + t('and') + ' ' + t('parentheses'))
      .test('phone-length', t('Phone number must be between 7 and 11 digits'), function(value) {
        if (!value) return false
        const digitsOnly = value.replace(/\D/g, '')
        return digitsOnly.length >= 7 && digitsOnly.length <= 11
      }),
    terms: Yup.boolean()
      .required(t('You must agree to the terms and conditions'))
      .oneOf([true], t('You must agree to the terms and conditions'))
  })
  // Set phone and country from query params if available
  useEffect(() => {
    if (countryFromQuery) {
      const country = countries.find(c => c.code === countryFromQuery)
      if (country) {
        setSelectedCountry(country)
      }
    }
  }, [countryFromQuery])

  const initialValues: RegisterFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: phoneFromQuery && selectedCountry.dialCode ? phoneFromQuery.replace(selectedCountry.dialCode, '') : '',
    terms: false
  }

  const handleSubmit = async (
    values: RegisterFormValues, 
    { setSubmitting, setFieldError }: { setSubmitting: (isSubmitting: boolean) => void; setFieldError: (field: string, message: string) => void }
  ) => {
    try {
      // Remove leading "0" from phone number if present
      let cleanedPhone = values.phone.startsWith('0') ? values.phone.slice(1) : values.phone
      
      // Remove dial code (without +) from the beginning if phone starts with it
      const dialCodeWithoutPlus = selectedCountry.dialCode.replace('+', '')
      if (cleanedPhone.startsWith(dialCodeWithoutPlus)) {
        cleanedPhone = cleanedPhone.slice(dialCodeWithoutPlus.length)
      }
      
      const formData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        countryCode: selectedCountry.code,
        countryName: selectedCountry.name,
        dialCode: selectedCountry.dialCode,
        fullPhoneNumber: `${cleanedPhone}`,
        terms: values.terms
      }
      
      // Save registration data to localStorage
      localStorage.setItem('registeredData', JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.fullPhoneNumber,
        country_code: formData.countryCode
      }))
      
      // Navigate to OTP page
      router.push(`/auth/otp?phone=${formData.fullPhoneNumber}&country=${formData.countryCode}`)
    } catch (error: unknown) {
      console.error('Registration error:', error)
      const err = error as { response?: { data?: { message?: string } } }
      setFieldError('email', err?.response?.data?.message || t("Registration failed Please try again"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
        <div className='flex-1 flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-lg w-full space-y-8'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 '>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Create Your Account')}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{t('We need a few more details to get started')}</p></div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting, setFieldValue }) => (
          <Form id='register-form' className='space-y-6'>
            <div className='flex flex-row gap-4'>
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {t('First Name')} <span className="text-red-500">*</span>
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  disabled={isSubmitting}
                  placeholder={t('Enter your First name')}
                  className={`block w-full border rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 ${
                    errors.firstName && touched.firstName
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <ErrorMessage name="firstName" component="div" className="text-red-600 dark:text-red-400 text-xs mt-1" />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  {t('Last Name')} <span className="text-red-500">*</span>
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  disabled={isSubmitting}
                  placeholder={t('Enter your Last name')}
                  className={`block w-full border rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 ${
                    errors.lastName && touched.lastName
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <ErrorMessage name="lastName" component="div" className="text-red-600 dark:text-red-400 text-xs mt-1" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {t('Email Address')} <span className="text-red-500">*</span>
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                disabled={isSubmitting}
                placeholder={t('Enter your email address')}
                className={`block w-full border rounded-md shadow-sm bg-gray-50 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-2 ${
                  errors.email && touched.email
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              <ErrorMessage name="email" component="div" className="text-red-600 dark:text-red-400 text-xs mt-1" />
            </div>
            <PhoneInput
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              phone={values.phone}
              onPhoneChange={(value) => setFieldValue('phone', value)}
              isLoading={isSubmitting}
              error={errors.phone && touched.phone ? errors.phone : undefined}
              onValidationChange={setIsPhoneValid}
            />
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Field
                  id="terms"
                  name="terms"
                  type="checkbox"
                  disabled={isSubmitting}
                  className={`focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 ${
                    errors.terms && touched.terms ? 'border-red-500' : ''
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700 dark:text-gray-200">
                  {t('I agree to the')} <a href="#" className="text-primary-600 hover:text-primary-500">{t('Terms of Service')}</a> {t('and')} <a href="#" className="text-primary-600 hover:text-primary-500">{t('Privacy Policy')}</a>
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <ErrorMessage name="terms" component="div" className="text-red-600 dark:text-red-400 text-xs mt-1" />
              </div>
            </div>
            <div className="flex space-x-4">
              <a 
                type="button" 
                id="back-to-phone" 
                className={`te-btn te-btn-default ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`} 
                href="/auth/login"
              >
                {t('Back')}
              </a>
              <button 
                type="submit" 
                id="register-submit" 
                disabled={isSubmitting || !isPhoneValid}
                className={`te-btn te-btn-primary flex-1 flex justify-center items-center gap-2 ${isSubmitting || !isPhoneValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t('Creating Account')}...</span>
                  </>
                ) : (
                  <span>{t('Create Account')}</span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      </div>
   
      </div>
      </div>
    </div>
  )
}

export default Register
