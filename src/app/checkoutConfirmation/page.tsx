'use client'
import { useEffect, useState, useCallback } from "react";
import SuccessHeader from "@/components/checkoutConfirmation/successHeader";
import OrderDetails from "@/components/checkoutConfirmation/orderDetails";
import ShippingInfo from "@/components/checkoutConfirmation/shippingInfo";
import ActionButtons from "@/components/checkoutConfirmation/actionButtons";
import { useSearchParams } from "next/navigation";
import { CartData, useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import getRequest from "../../../helpers/get";
 function Confirmation() {
  const { setCartData } = useCartStore();
    const { token } = useUserStore();
    const [orderData, setOrderData] = useState<{data?: unknown} | null>(null);
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    
    // Check if status has already been checked for this payment ID
 
    const getOrderData = useCallback(async () => {
        try {
            // Check if token exists and is valid
            if (!token) {
                console.error('No token available');
                return;
            }
            
            localStorage.removeItem('shippingAddressId');
            localStorage.removeItem('shippingMethodSlug');
            localStorage.removeItem('paymentMethodId');
            
            const orderData = await getRequest(`/order/orders/${orderId}`, { 'Content-Type': 'application/json' }, token, 'en');
            setOrderData(orderData);
            
       
               setCartData({data:{
                    id: '',
                    cart_count: 0,
                    products: [],
                    order_attributes: [],
                    shipping_address_id: '',
                    amount_to_pay: 0
               } as CartData['data'] });
        } catch (error: unknown) {
            console.error('Error fetching order data:', error);
            // Handle authentication error
            if ((error as {response?: {status?: number}})?.response?.status === 401) {
                console.error('Authentication failed - token may be invalid or expired');
            }
        }
    }, [token, orderId, setCartData ]);
    useEffect(() => {
        if (token && orderId) {
            getOrderData();
        }
    }, [token, orderId]);

  return (
    <div className='container mx-auto mt-6 mb-4' >
      
{/* <!-- Success Header --> */}
<SuccessHeader />

{/* <!-- Order Details --> */}
<OrderDetails orderData={orderData as {data?: {order_num?: string; created_at?: string; estimated_delivery?: string; products?: any[]; order_attributes?: any[]; total_amount?: string | number;}} | null}/>

{/* <!-- Shipping & Contact Info --> */}
<ShippingInfo address={(orderData?.data as {address?: unknown})?.address} />

{/* <!-- Next Steps --> */}
{/* <NextSteps /> */}

{/* <!-- Action Buttons --> */}

<ActionButtons/>
{/* <!-- Email Confirmation Notice --> */}
{/* <EmailConfirmation /> */}

    </div>
  )
}

export default Confirmation
