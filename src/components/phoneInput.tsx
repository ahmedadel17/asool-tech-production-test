'use client'
import React, { useState, useEffect } from 'react'
import CountryDropdown, { type Country } from './countryDropdown'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
interface PhoneInputProps {
  selectedCountry: Country
  onCountryChange: (country: Country) => void
  phone: string
  onPhoneChange: (phone: string) => void
  id?: string
  name?: string
  placeholder?: string
  required?: boolean
  label?: string
  showHelperText?: boolean
  isLoading?: boolean
  error?: string
  onValidationChange?: (isValid: boolean) => void
}

export default function PhoneInput({
  selectedCountry,
  onCountryChange,
  phone,
  onPhoneChange,
  id = 'phone',
  name = 'phone',
  placeholder = 'max 11 digits',
  required = true,
  label = 'Phone Number',
  showHelperText = true,
  isLoading = false,
  error: externalError,
  onValidationChange
}: PhoneInputProps) {
  const t = useTranslations("login")
  const [error, setError] = useState<string>('')
  const [touched, setTouched] = useState(false)
  const locale = useLocale()
  // Validate phone number
  const validatePhone = (phoneNumber: string): string => {
    if (required && !phoneNumber.trim()) {
      return t("Phone number is required")
    }
    
    // Remove any non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, '')
    
    if (digitsOnly.length === 0) {
      return required ? t("Phone number is required") : ''
    }
    
    if (digitsOnly.length < 7) {
      return t("Phone number must be at least 7 digits")
    }
    
    if (digitsOnly.length > 11) {
      return t("Phone number must not exceed 11 digits")
    }
    
    // Check if phone contains only numbers (allowing spaces, dashes, parentheses for formatting)
    const phoneRegex = /^[\d\s\-\(\)]+$/
    if (!phoneRegex.test(phoneNumber)) {
      return t("Phone number can only contain numbers")+", "+t("spaces")+", "+t("dashes")+", "+t("and")+ " "+t("parentheses")
    }
    
    return ''
  }

  // Validate on phone change
  useEffect(() => {
    if (touched || phone.length > 0) {
      const validationError = validatePhone(phone)
      setError(validationError)
      if (onValidationChange) {
        onValidationChange(!validationError && phone.length > 0)
      }
    } else if (onValidationChange && !required) {
      // If not required and empty, it's valid
      onValidationChange(true)
    } else if (onValidationChange && required) {
      // If required and empty, it's invalid
      onValidationChange(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone, touched])

  // Use external error if provided, otherwise use internal validation
  const displayError = externalError || error
  const hasError = touched && displayError

  const handleBlur = () => {
    setTouched(true)
    const validationError = validatePhone(phone)
    setError(validationError)
    if (onValidationChange) {
      onValidationChange(!validationError)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPhoneChange(e.target.value)
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        {t(label)}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1 relative">
        <CountryDropdown 
          selectedCountry={selectedCountry} 
          onCountryChange={onCountryChange}
        />
        <div className="relative">
          <input 
            type="tel" 
            id={id}  
            style={{textAlign:'center'}}
            className={`block w-full border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white ${
              hasError 
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                : 'border-gray-300 dark:border-gray-600'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder={t(placeholder)} 
            dir="ltr" 
            name={name} 
            value={phone}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            disabled={isLoading}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? `${id}-error` : undefined}
          />
          {isLoading && (
            <div className={`absolute ${locale === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2`}>
              <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
      </div>
      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600 dark:text-red-400" role="alert">
          {displayError}
        </p>
      )}
      {showHelperText && !hasError && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {t('Enter your')} {t(selectedCountry.name)} {t("Phone Number")} (7-11 {t('digits')})
        </p>
      )}
    </div>
  )
}

