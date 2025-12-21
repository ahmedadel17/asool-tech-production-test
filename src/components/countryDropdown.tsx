'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
export interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
}

const countries: Country[] = [
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { code: 'JO', name: 'Jordan', dialCode: '+962', flag: '🇯🇴' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
]

interface CountryDropdownProps {
  selectedCountry: Country
  onCountryChange: (country: Country) => void
}

export default function CountryDropdown({ selectedCountry, onCountryChange }: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations("login")
  const locale = useLocale()

  // Ensure locale-dependent rendering only happens on client
  useEffect(() => {
    setIsMounted(true)
  }, [])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const filteredCountries = countries.filter((country) => {
    const englishName = country.name.toLowerCase()
    const arabicName = t(country.name).toLowerCase()
    const query = searchQuery.toLowerCase()
    
    return (
      englishName.includes(query) ||
      arabicName.includes(query) ||
      country.dialCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(query)
    )
  })

  return (
    <div className="absolute inset-y-0 start-0 ps-3 flex items-center z-20" ref={dropdownRef}>
      <div className="relative">
        <button 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto transition-colors" 
        >
          <span className="text-sm font-medium whitespace-nowrap">{selectedCountry.dialCode}</span>
          <svg className={`w-3 h-3 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {isOpen && (
          <div className={`absolute top-full  md:left-0 md:translate-x-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-30 ${isMounted && locale === 'ar' ? 'right-0' : 'left-0'}`} >
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("Search countries")}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="max-h-60 overflow-y-auto py-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      onCountryChange(country)
                      setIsOpen(false)
                      setSearchQuery('')
                    }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      selectedCountry.code === country.code 
                        ? 'bg-gray-100 dark:bg-gray-700' 
                        : ''
                    }`}
                  >
                    {/* <span className="text-lg">{country.flag}</span> */}
                    <span className="flex-1 text-gray-700 dark:text-gray-300">{t(country.name)}</span>
                    <span className="text-gray-500 dark:text-gray-400">{country.dialCode}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {t("No countries found")}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { countries }






