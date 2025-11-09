'use client'
import { useEffect, useState, ReactNode } from 'react'
import axios from 'axios'
import { generatePaletteFromHex } from '../../tailwindPlugins/colors' // 👈 تأكد من المسار الصحيح

type Props = {
  children: ReactNode
}

export default function ColorProvider({ children }: Props) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`)
        const colors = res.data.data.settings

        const root = document.documentElement
        Object.entries(colors).forEach(([key, value]) => {
          if (
            key.endsWith('_color') ||
            key.startsWith('gradient_') ||
            key.startsWith('gray_') ||
            key.startsWith('green_') ||
            key.startsWith('red_')
          ) {
            // 👇 استخراج اسم المتغير
            let variableName = `--apicolor-${key}`
            if (key.endsWith('_color')) {
              variableName = `--apicolor-${key.replace('_color', '')}`
            }

            const colorValue = value as string
            root.style.setProperty(variableName, colorValue)

            // ✅ لو اللون الأساسي (مش gray ولا gradient)، نولّد تدرجاته
            if (key.endsWith('_color')) {
              const palette = generatePaletteFromHex(colorValue)
              Object.entries(palette).forEach(([step, shade]) => {
                root.style.setProperty(`--apicolor-${key.replace('_color', '')}_${step}`, shade as string)
              })
            }
          }
        })

        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch colors:', err)
        setLoading(false)
      }
    }

    fetchColors()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading theme...
      </div>
    )
  }

  return <>{children}</>
}
