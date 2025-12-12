'use client'
import React from 'react'
import PromoCode from './cartSummary/promoCode'
import { CartOrderAttribute, useCartStore } from '@/store/cartStore'
import CartSummaryItem from './cartSummary/cartSummaryItem'
import CartSummaryTotal from './cartSummary/cartSummaryTotal'
import LinkButton from './cartSummary/linkButton'
import SecurityNoticeItem from './cartSummary/securityNoticeItem'
import CartSummaryTitle from './cartSummary/cartSummaryTitle'
import CartSummaryContainer from './cartSummary/cartSummaryContainer'
import OrderItem from './cartSummary/orderItem'
import { usePathname } from 'next/navigation'
import WalletBallanceToggler from './walletBalanceToggler'
import { useTranslations } from 'next-intl'

function CartSummary( {
    link,
    role=false,
    text   ,
    type='link',
    disabled=false,
    onClick,
}: {
    link?: string
    role?: boolean
    text: string
    type?: 'link' | 'button'
    disabled?: boolean
    onClick?: () => void
}) {
  const {cartData } = useCartStore()
  const pathname = usePathname()
  const t = useTranslations('cart')
  return (
    <CartSummaryContainer>
        
    <CartSummaryTitle title={t('Order Summary')} />

  {pathname=='/checkout/paymentMethod' && <WalletBallanceToggler />}

    {/* <!-- Promo Code --> */}
    {pathname == '/cart' && <PromoCode  />}

    {/* <!-- Summary Details --> */}
    <div className="space-y-3 mb-6">
      {  pathname !== '/cart' && <div>
        {
            cartData?.data?.products?.map((item: any) => (
                <OrderItem key={item?.id} item={item} />
            ))
        }
        </div>}
       <div className='border-t border-gray-200 dark:border-gray-600 pt-4 space-y-4'>
        {cartData?.data?.order_attributes?.map((attribute: CartOrderAttribute,index: number) => (
            <CartSummaryItem key={index} attribute={attribute} />
        ))}

       </div>
      
      <CartSummaryTotal total={cartData?.data?.amount_to_pay as number} />

        
    </div>

    {/* <!-- Checkout Button --> */}
    {
role &&
    <LinkButton href={link} text={text} type={type} disabled={disabled} onClick={onClick} />
    }

   

    {/* <!-- Security Notice --> */}
    <SecurityNoticeItem />
    </CartSummaryContainer>


   
  )
}

export default CartSummary
