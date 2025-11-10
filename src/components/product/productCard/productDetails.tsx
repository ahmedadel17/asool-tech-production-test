"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useCart } from '@/app/hooks/useCart';
import { useAuth } from '@/app/hooks/useAuth';
import { setCartData } from '@/app/store/slices/cartSlice';
import { useAppDispatch } from '@/app/store/hooks';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import postRequest from '../../../../helpers/post';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { useWishlist } from '@/app/hooks/useWishlist';
import { useRouter } from 'next/navigation';
import ProductTitle from "./productTitle";
import ProductPrice from "./productPrice";
import ProductFooter from "./productFooter";
import ProductVariations from "./productVariations";
import ProductCategory from "./productCategory";

interface Badge {
  type: string;
  text: string;
}

interface Product {
  id: number;
  title: string;
  name: string;
  thumbnail: string;
  slug: string;
  price: string;
  image?: string;
  hover?: string;
  category: string;
  old_price?: string | null;
  colors?: string[];
  sizes?: string[];
  badges?: Badge[];
  variations?: Variation[];
  min_price?: string;
  price_before_discount?: string;
  price_after_discount?: string;
  default_variation_id?: string | number;
  is_favourite?: boolean;
}

interface Variation {
  id: number;
  name: string;
  values: { id: number; value: string }[];
  price_before_discount?: string | number;
  price_after_discount?: string | number;
}

interface ProductDetailsProps {
  product: Product;
}

function ProductDetails({ product }: ProductDetailsProps) {
  // Consolidated state for better performance
  const [state, setState] = useState({
    selectedColor: null as string | null,
    selectedSize: null as string | null,
    selectedColorId: null as number | null,
    selectedSizeId: null as number | null,
    variationId: null as number | null,
    isAddingToCart: false,
    isLoadingVariation: false,
    selectedVariation: null as Variation | null,
    isFavorite: product?.is_favourite,
    isFavoriteLoading: false,
    variationData: null as Variation | null,
  });
  
  // Refs to track component mount status and cancel requests
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const { loadCartFromStorage } = useCart();
  const { token, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const locale = useLocale();   
  const t = useTranslations();
  const { toggleProduct } = useWishlist();
  const router = useRouter();

  // Reset state when product changes
  useEffect(() => {
    isMountedRef.current = true;
    // Cancel any in-flight requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Reset state for new product
    setState({
      selectedColor: null,
      selectedSize: null,
      selectedColorId: null,
      selectedSizeId: null,
      variationId: null,
      isAddingToCart: false,
      isLoadingVariation: false,
      selectedVariation: null,
      isFavorite: product?.is_favourite || false,
      isFavoriteLoading: false,
      variationData: null,
    });

    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [product.id, product?.is_favourite]);

  // Fetch variation ID when all attributes are selected
  // Memoize this function to prevent unnecessary re-renders in ProductVariations
  const fetchVariationId = useCallback(async (attributes: Record<number, number>) => {
    
    // Check if component is still mounted
    if (!isMountedRef.current) {
      return;
    }

    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setState(prev => {
      // Prevent duplicate calls if already loading
      if (prev.isLoadingVariation) {
        return prev;
      }
      return { ...prev, isLoadingVariation: true };
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/catalog/products/get-variation-by-attribute`,
        {
          product_id: product.id,
          attributes: attributes // Maps attribute_id to value_id
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          signal: abortController.signal,
        }
      );

      // Check if component is still mounted before updating state
      if (!isMountedRef.current || abortController.signal.aborted) {
        return;
      }

      if (response.data.status && response.data.data?.id) {
        setState(prev => ({
          ...prev,
          variationId: response.data.data.id,
          selectedVariation: response.data.data,
          isLoadingVariation: false,
          variationData: response.data.data,
        }));
        // console.log('variationData', response.data.data);
      } else {
        const errorMessage = response.data.message || 'Failed to fetch variation';
        if (isMountedRef.current) {
          toast.error(errorMessage);
        }
        setState(prev => ({
          ...prev,
          variationId: null,
          selectedVariation: null,
          isLoadingVariation: false,
          variationData: null
        }));
      }
    } catch (error) {
      // Don't show error if request was aborted or component unmounted
      const errorObj = error as { name?: string; code?: string };
      const isAborted = axios.isCancel(error) || 
                       errorObj?.name === 'AbortError' || 
                       errorObj?.name === 'CanceledError' ||
                       errorObj?.code === 'ERR_CANCELED' ||
                       abortController.signal.aborted;
      
      if (isAborted || !isMountedRef.current) {
        return;
      }

      console.error('Error fetching variation ID:', error);
      if (isMountedRef.current) {
        toast.error('Failed to fetch variation. Please try again.');
      }
      setState(prev => ({
        ...prev,
        variationId: null,
        selectedVariation: null,
        isLoadingVariation: false,
        variationData: null
      }));
    } finally {
      // Clear the abort controller reference if this request completed
      if (abortControllerRef.current === abortController) {
        abortControllerRef.current = null;
      }
    }
  }, [product.id]);

  // Handle selection changes
  const handleSelectionChange = (selections: Record<number, number>) => {
    // Update state based on selections for backward compatibility
    // This is optional, mainly for tracking selected values if needed
    // console.log('Selections changed:', selections);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = async () => {
    // Check authentication first
    if (!isAuthenticated) {
      toast.error('Please login first to add items to wishlist');
      router.push('/auth/login');
      return;
    }

    if (!token) {
      toast.error('Authentication required. Please login again.');
      router.push('/auth/login');
      return;
    }

    setState(prev => ({ ...prev, isFavoriteLoading: true }));
    
    try {
      const response = await postRequest(`/catalog/favorites/products/${product.id}/toggle`, {  }, {}, token, locale);
    //   console.log('fav', response.data.data);
      
      if (response.data.status) {
        const newFavoriteState = !state.isFavorite;
        setState(prev => ({ ...prev, isFavorite: newFavoriteState }));
        
        // Update Redux wishlist store with complete product data
        toggleProduct({
          id: product.id,
          name: product.name,
          min_price: parseFloat(product.price) || 0,
          price_after_discount: parseFloat(product.price_after_discount || product.price) || 0,
          default_variation_id: product.default_variation_id || null,
          discount: 0,
          is_favourite: newFavoriteState,
          out_of_stock: false,
          rate: "0.00",
          short_description: product.name,
          thumbnail: product.thumbnail || '',
          slug: product.slug || '',
          category: product.category || '',
          variations: product.variations || []
        });
        
        toast.success(state.isFavorite ? 'Product removed from favorites!' : 'Product added to favorites successfully!');
      } else {
        toast.error('Failed to update favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Failed to update favorites');
    } finally {
      setState(prev => ({ ...prev, isFavoriteLoading: false }));
    }
  };

  const handleAddToCart = async () => {
    // Check authentication first
    if (!isAuthenticated) {
      toast.error('Please login first to add items to cart');
      router.push('/auth/login');
      return;
    }

    if (!token) {
      toast.error('Authentication required. Please login again.');
      router.push('/auth/login');
      return;
    }

    // If product has default_variation_id, skip variation validation
    if (!product?.default_variation_id) {
      if (!state.variationId && !state.variationData) {
        toast.error(t('Please select all product variations'));
        return;
      }

      if (state.isLoadingVariation) {
        toast.error(t('Please wait while we process your selection'));
        return;
      }
    }

    setState(prev => ({ ...prev, isAddingToCart: true }));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/marketplace/cart/add-to-cart`,
        {
          item_id: product?.default_variation_id || state.variationId || product.id,
          qty: 1,
          customer_note: '',
          type: 'product',
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        // Update cart store directly with the response data
        // console.log('Add to cart response:', response.data);
        
        if (response.data.data) {
          // Update cart store with the new cart data from response
          dispatch(setCartData(response.data.data));
        //   console.log('Cart store updated with:', response.data.data);
        } else {
          // Fallback: reload cart from storage if no data in response
          await loadCartFromStorage();
        }
        toast.success(response.data.message);
        
      } else {
        console.error('Add to cart failed:', response.data);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('An error occurred while adding to cart');
    } finally {
      setState(prev => ({ ...prev, isAddingToCart: false }));
    }
  };

  return (
    <div className="mt-3 lg:mt-0 lg:p-3 flex flex-col flex-1">
      <div className="product-body space-y-2 mb-5">
        <ProductCategory category={product.category} />
        {/* Product Name */}
        <ProductTitle name={product.name} slug={product.slug} />
        {state.variationData && <ProductTitle name={state.variationData.name} slug={product.slug} />}
        {/* Price */}
        <ProductPrice min_price={parseFloat((state.variationData?.price_before_discount || product.price_before_discount || product.min_price || '0').toString())} price_after_discount={parseFloat((state.variationData?.price_after_discount || product.price_after_discount || product.price || '0').toString())} />
        {/* Variations */}
        {product.variations && product.variations.length > 0 && (
          <ProductVariations 
            variations={product.variations as unknown as Array<{
              attribute_id: number;
              attribute_name: string;
              attribute_type: string;
              values: Array<{ id: number; value: string; color?: string }>;
            }>} 
            onSelectionChange={handleSelectionChange}
            onVariationFetch={fetchVariationId}
          />
        )}
      </div>
      {/* Footer */}
      <ProductFooter 
        default_variation_id={product.default_variation_id} 
        isAddingToCart={state.isAddingToCart} 
        isLoadingVariation={state.isLoadingVariation} 
        hasVariation={!!state.variationId || !!state.variationData}
        handleAddToCart={handleAddToCart} 
        handleFavoriteToggle={handleFavoriteToggle} 
        isFavorite={state.isFavorite || false} 
        isFavoriteLoading={state.isFavoriteLoading} 
      />
    </div>
  );
}

export default ProductDetails;

