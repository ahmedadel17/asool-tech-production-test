import React from 'react'

function CartSummaryItem({attribute}: {attribute: any}) {
  return (
    <div className="flex justify-between">
    <span style={{color: attribute?.color}}>{attribute?.label}</span>
    <span className="text-gray-900 dark:text-white">
        { attribute?.show_currency&&
            <span className="icon-riyal-symbol text-xs"></span>}
        <span>{attribute.value}</span></span>
</div>
  )
}

export default CartSummaryItem
