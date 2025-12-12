import { useTranslations } from "next-intl"

  interface Color {
  id: string | number
  value?: string
  color?: string
}

function ProductColor({
  colors,
  selectedValueId,
  onSelect
}: {
  colors: Color[]
  attribute_id: string
  selectedValueId?: string | number
  onSelect: (valueId: string | number) => void
}) {
  const handleClick = (color: Color) => {
    onSelect(color.id)
  }
  const t = useTranslations('productDetails')
  return (
    <div className="product-color">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t('Color')}</h4>
      <div className="flex flex-wrap gap-3">
        {colors.map((color: Color) => (
          <button
            key={color.id}
            className={`color-option ${selectedValueId === color.id ? 'active' : ''}`}
            style={{ backgroundColor: color.color || '#000' }}
            data-color={color.color || '#000'}
            title={color.color || color.value || 'Color'}
            aria-label={`Select color ${color.color || color.value || 'Color'}`}
            onClick={() => handleClick(color)}
          >
            <span className="sr-only">{color.value || color.color || 'Color'}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductColor
