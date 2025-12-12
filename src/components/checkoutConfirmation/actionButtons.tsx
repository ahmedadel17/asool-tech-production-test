import React from 'react'
import Link from 'next/link';
function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Link href="/dashboard/orders" className="te-btn te-btn-primary">
        Track Your Order
    </Link>
    <Link href="/products" className="te-btn te-btn-default">
        Continue Shopping
    </Link>
</div>
  )
}

export default ActionButtons
