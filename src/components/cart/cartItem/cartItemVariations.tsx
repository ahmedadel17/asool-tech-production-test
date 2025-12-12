import React from 'react'

function CartItemVariations({variations}: {variations: string  }) {
  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
    {
        variations
    }
</div>
  )
}

export default CartItemVariations
