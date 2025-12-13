'use client'

import React, { useState } from 'react'
import { countries, type Country } from '@/components/countryDropdown'
import PhoneInput from '@/components/phoneInput'
import postRequest from '../../../../helpers/post'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

function Login() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0])
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const router = useRouter()
  const t = useTranslations("login")
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    
    // Validate phone number before submitting
    const digitsOnly = phone.replace(/\D/g, '')
    if (digitsOnly.length < 7 || digitsOnly.length > 11) {
      setError('Please enter a valid phone number (7-11 digits)')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Remove leading "0" from phone number if present
      let cleanedPhone = phone.startsWith('0') ? phone.slice(1) : phone
      
      // Remove dial code (without +) from the beginning if phone starts with it
      const dialCodeWithoutPlus = selectedCountry.dialCode.replace('+', '')
      if (cleanedPhone.startsWith(dialCodeWithoutPlus)) {
        cleanedPhone = cleanedPhone.slice(dialCodeWithoutPlus.length)
      }
      
      const formData = {
        phone: phone,
        countryCode: selectedCountry.code,
        countryName: selectedCountry.name,
        dialCode: selectedCountry.dialCode,
        fullPhoneNumber: `${selectedCountry.dialCode}${cleanedPhone}`
      }
      
      const response = await postRequest(`/auth/send-otp`, {
        phone: formData.fullPhoneNumber
      }, {}, null, 'en')
      
      if (response?.data?.data?.registered) {
        router.push(`/auth/otp?phone=${formData.fullPhoneNumber}&country=${formData.countryCode}`)
      } else {
        router.push(`/auth/register?phone=${formData.fullPhoneNumber}&country=${formData.countryCode}`)
      }
    } catch (error: unknown) {
      console.error('Error sending OTP:', error)
      const err = error as { response?: { data?: { message?: string } } }
      setError(err?.response?.data?.message || t("Failed to send OTP Please try again"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className='flex-1 flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-lg w-full space-y-8'>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">{t("Welcome Back")}</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("Sign in to your account or create a new one")}</p></div>
        <div id='phone-step' className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8'>
            <form id='phone-form' className='space-y-6' onSubmit={handleSubmit}>
              <PhoneInput
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                phone={phone}
                onPhoneChange={setPhone}
                isLoading={isLoading}
                error={error}
                onValidationChange={setIsPhoneValid}
                label={`${t('Phone Number')}`}
              />
              {error && !error.includes('Phone number') && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}
              <button 
                type="submit" 
                id="phone-submit" 
                disabled={isLoading || !isPhoneValid}
                className={`te-btn te-btn-primary w-full flex justify-center items-center ${isLoading || !isPhoneValid ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{t("Sending")}...</span>
                  </>
                ) : (
                  <span>{t("Continue")}</span>
                )}
              </button>
           
            </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login
