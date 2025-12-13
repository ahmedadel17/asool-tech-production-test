'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import postRequest from '../../../../helpers/post'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { useLocale, useTranslations } from 'next-intl'
import toast from 'react-hot-toast'
function OTP() {
  const searchParams = useSearchParams()
  const phone = searchParams.get('phone') || ''
  const router = useRouter()
  const t = useTranslations("otp")
  const [otp, setOtp] = useState<string[]>(['', '', '', '', ''])
  const [countdown, setCountdown] = useState(60)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const locale = useLocale()  
  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setIsResendDisabled(false)
    }
  }, [countdown])

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    
    if (/^\d{5}$/.test(pastedData)) {
      const digits = pastedData.split('')
      setOtp(digits)
      inputRefs.current[4]?.focus()
    }
  }

  const handleResend = async () => {
    if (isResendDisabled || !phone || isResending) return
    
    setIsResending(true)
    try {
      await postRequest('/auth/send-otp', { phone }, {}, null, locale)
      setCountdown(60)
      setIsResendDisabled(true)
      setOtp(['', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } catch (error) {
      toast.error(t('Failed to resend OTP'))
    } finally {
      setIsResending(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const otpCode = otp.join('')
    
   

    setIsSubmitting(true)

    try {
      // Check for registered data in localStorage
      const registeredDataStr = localStorage.getItem('registeredData')
      let registeredData = null
      
      if (registeredDataStr) {
        try {
          registeredData = JSON.parse(registeredDataStr)
        } catch (parseError) {
          toast.error(t('Error parsing registered data'))
        }
      }

      // Prepare request payload
      const payload: {
        phone: string
        otp_code: string
        first_name?: string
        last_name?: string
        email?: string
        country_code?: string
      } = {
        phone: phone,
        otp_code: otpCode
      }

      // Add registered data if available
      if (registeredData) {
        payload.first_name = registeredData.first_name
        payload.last_name = registeredData.last_name
        payload.email = registeredData.email
        payload.country_code = registeredData.country_code
      }

      const response = await postRequest(
        '/auth/login-or-register',
        payload,
        {},
        null,
        locale
      )

      // Handle success - redirect or show success message
      if (response.data?.status) {
        // Clear registered data from localStorage after successful registration
        if (registeredData) {
          localStorage.removeItem('registeredData')
        }
        
        useUserStore.getState().setUser(response.data?.data?.user)
        useUserStore.getState().setToken(response.data?.data?.token)
        router.push('/')
      }
      else{
        // console.log('response', response)
        toast.error(response.data?.message)
      }
    } catch (error) {
      
      const errorMessage = error && typeof error === 'object' && 'response' in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : t('Invalid OTP Please try again')
      toast.error(errorMessage || t('Invalid OTP Please try again'))
      setOtp(['', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-lg w-full space-y-8'>
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">{t("Welcome Back")}</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t("Sign in to your account or create a new one")}</p>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8'>
          <div className='mb-6 text-center'>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Verify Your Phone')}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t('We sent a code to your phone number')}</p>
          </div>
          <div className='container'>
            <form onSubmit={handleSubmit}>
              <div className='space-y-6'>
                <div className='flex justify-center gap-2 sm:gap-3'>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el }}
                      className={`shadow-xs flex h-12 w-12 items-center justify-center rounded-lg border-2 p-2 text-center text-2xl font-medium text-gray-900 dark:text-white outline-none sm:h-14 sm:w-14 sm:text-3xl md:h-16 md:w-16 md:text-4xl transition-colors border-gray-300 dark:border-gray-600 bg-white dark:bg-white/5 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      dir="ltr"
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      disabled={isSubmitting}
                      style={{ textAlign: 'center', direction: 'ltr' }}
                    />
                  ))}
                </div>
                <div className="text-center">
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">{t('Enter the 5 digit code sent to your phone')}</p>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    id="resend-otp"
                    onClick={handleResend}
                    disabled={isResendDisabled || isResending}
                    className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                  >
                    {isResending ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{t('Sending')}...</span>
                      </>
                    ) : isResendDisabled ? (
                      <>
                        <span id="resend-text">{t('Resend code in')} </span>
                        <span id="countdown">{countdown}</span>s
                      </>
                    ) : (
                      <span>{t('Resend code')}</span>
                    )}
                  </button>
                </div>
                <div className='mt-2'>
                  <div className="flex flex-col gap-3 sm:flex-row sm:space-x-4">
                    <a
                      id="back-to-phone-from-otp"
                      className="te-btn te-btn-default sm:flex-1"
                      href="/auth/login"
                    >
                      {t('Change Phone')}
                    </a>
                    <button
                      type="submit"
                      id="otp-submit"
                      disabled={isSubmitting || otp.join('').length !== 5}
                      className="te-btn te-btn-primary flex-1 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{t('Verifying')}...</span>
                        </>
                      ) : (
                        <span>{t('Verify & Sign In')}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTP
