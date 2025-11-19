'use client'
import { useEffect, ReactNode, useRef } from 'react'
import axios from 'axios'
import { generatePaletteFromHex } from '../../tailwindPlugins/colors'

const CACHE_KEY = 'app_settings_cache'
const CACHE_DURATION = 5 * 60 * 1000

export default function ColorProvider({ children }: { children: ReactNode }) {
  const fetchRef = useRef<Promise<void> | null>(null)

  useEffect(() => {
    const applyColors = (colors: Record<string, string>) => {
      const root = document.documentElement

      Object.entries(colors).forEach(([key, value]) => {
        let baseName = key.replace('_color', '')
        const cssVar = `--apicolor-${baseName}`

        root.style.setProperty(cssVar, value)

        // Generate palette shades
        if (key.endsWith('_color')) {
          const shades = generatePaletteFromHex(value)
          Object.entries(shades).forEach(([step, shade]) => {
            root.style.setProperty(`--apicolor-${baseName}_${step}`, shade)
          })
        }
      })
    }

    const fetchColors = async () => {
      let cached: any = null

      try {
        cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null')
      } catch {}

      // Use cache if fresh
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        applyColors(cached.data)
        return
      }

      if (fetchRef.current) {
        await fetchRef.current
        return
      }

      fetchRef.current = (async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`)

          const colors = res.data.data.settings

          // Cache
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ data: colors, timestamp: Date.now() })
            )
          } catch {}

          applyColors(colors)
        } catch (err) {
          console.error('Failed to fetch colors:', err)
        } finally {
          fetchRef.current = null
        }
      })()

      await fetchRef.current
    }

    fetchColors()
  }, [])

  // Always render children (no SSR mismatch)
  return <>{children}</>
}
