"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from '@/app/hooks/useAuth';
import { useLocale } from 'next-intl';
import { useWishlist } from '@/app/hooks/useWishlist';
import postRequest from '../../../helpers/post';
import toast from 'react-hot-toast';
import ProductCard2 from '@/components/product/productCard2';

const Wishlist: React.FC = () => {
  const { token } = useAuth();
  const locale = useLocale();
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { 
    products: reduxWishlistProducts, 
    loadWishlist, 
    removeProduct,
    toggleProduct,
    isLoading,
    error: wishlistError,
    fetchWishlistData
  } = useWishlist();

  useEffect(() => {
    // Load wishlist from Redux store (which loads from localStorage)
    loadWishlist();

    // Fetch favorites from API
    if (token) {
      fetchWishlistData(token, locale);
    }
  }, [token, locale, loadWishlist, fetchWishlistData]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedIds(reduxWishlistProducts.map((p) => p.id));
  };

  const deselectAll = () => {
    setSelectedIds([]);
  };

  const removeSelected = async () => {
    if (!window.confirm("Remove selected items from wishlist?")) return;
    
    for (const id of selectedIds) {
      await handleRemove(id);
    }
    setSelectedIds([]);
  };

  const clearWishlist = async () => {
    if (!window.confirm("Are you sure you want to clear your entire wishlist?"))
      return;
    
    for (const product of reduxWishlistProducts) {
      await handleRemove(product.id);
    }
    setSelectedIds([]);
  };

  const addSelectedToCart = () => {
    if (selectedIds.length === 0) return;
    alert(`Added ${selectedIds.length} items to cart!`);
    if (window.confirm("Remove these items from your wishlist?")) {
      removeSelected();
    }
  };

  const removeItem = async (id: number) => {
    if (!window.confirm("Remove this item from your wishlist?")) return;
    await handleRemove(id);
    setSelectedIds(selectedIds.filter((pid) => pid !== id));
  };

  const isAllSelected =
    selectedIds.length === reduxWishlistProducts.length &&
    reduxWishlistProducts.length > 0;

  const handleRemove = async (productId: number) => {
    // Add to removing set to show loading state
    setRemovingIds(prev => new Set(prev).add(productId));
    
    try {
      // Call API to remove from favorites
      if (token) {
        const response = await postRequest(
          `/catalog/favorites/products/${productId}/toggle`,
          {},
          {},
          token,
          locale
        );
        
        if (response.data.status) {
          // Find the product to get its full data
          const product = reduxWishlistProducts.find(p => p.id === productId);
          
          if (product) {
            // Update Redux wishlist store
            toggleProduct({
              id: product.id,
              name: product.name,
              min_price: product.min_price,
              price_after_discount: product.price_after_discount,
              default_variation_id: product.default_variation_id,
              discount: product.discount,
              is_favourite: false,
              out_of_stock: product.out_of_stock,
              rate: product.rate,
              short_description: product.short_description,
              thumbnail: product.thumbnail,
              slug: product.slug,
              category: product.category,
              variations: product.variations || []
            });
          }
          
          toast.success('Product removed from favorites!');
        } else {
          toast.error('Failed to remove from favorites');
        }
      } else {
        // If not authenticated, just remove from local storage
        removeProduct(productId);
        toast.success('Product removed from wishlist!');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast.error('Failed to remove from favorites');
      // Still remove from local storage on error
      removeProduct(productId);
    } finally {
      // Remove from removing set
      setRemovingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading wishlist...</span>
      </div>
    );
  }

  // Show error state
  if (wishlistError) {
    return (
      <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
        <p className="text-sm text-red-600 dark:text-red-400">{wishlistError}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-xs text-red-500 hover:text-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Wishlist
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {reduxWishlistProducts.length} items saved for later
        </p>
      </div>

      {reduxWishlistProducts.length > 0 ? (
        <>
          {/* Actions */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex gap-2">
              {!isAllSelected ? (
                <button onClick={selectAll} className="te-btn te-btn-default te-btn-sm">
                  Select All
                </button>
              ) : (
                <button onClick={deselectAll} className="te-btn te-btn-default te-btn-sm">
                  Deselect All
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={addSelectedToCart}
                className="te-btn te-btn-primary te-btn-sm"
                disabled={selectedIds.length === 0}
              >
                Add Selected to Cart
              </button>
              <button
                onClick={removeSelected}
                className="te-btn te-btn-danger te-btn-sm"
                disabled={selectedIds.length === 0}
              >
                Remove Selected
              </button>
              <button onClick={clearWishlist} className="te-btn te-btn-default te-btn-sm">
                Clear Wishlist
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reduxWishlistProducts.map((product) => {
              // Transform WishlistProduct to Product format for ProductCard2
              const productForCard = {
                id: product.id,
                title: product.name,
                name: product.name,
                thumbnail: product.thumbnail,
                slug: product.slug || '',
                price: product.price_after_discount.toString(),
                category: product.category || '',
                old_price: product.min_price !== product.price_after_discount ? product.min_price.toString() : null,
                min_price: product.min_price.toString(),
                price_after_discount: product.price_after_discount.toString(),
                default_variation_id: product.default_variation_id ?? undefined,
                is_favourite: product.is_favourite,
                variations: product.variations || [],
                badges: [],
                colors: [],
                sizes: []
              };

              return (
                <div key={product.id} className="relative">
                  {/* Checkbox */}
                  <div className="absolute top-3 start-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="wishlist-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(product.id)}
                    disabled={removingIds.has(product.id)}
                    className={`absolute top-3 end-3 z-10 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center transition-colors ${
                      removingIds.has(product.id) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>

                  <ProductCard2 product={productForCard} />
                </div>
              );
            })}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 text-center">
            <a href="/products" className="te-btn te-btn-primary">
              Continue Shopping
            </a>
          </div>
        </>
      ) : (
        // Empty State
        <div className="text-center py-16">
          <svg
            className="w-24 h-24 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
            />
          </svg>
          <h3 className="text-2xl font-semibold mt-4">Your wishlist is empty</h3>
          <p className="text-gray-600 mt-2">
            Save items you love by clicking the heart icon on any product.
          </p>
          <a href="/products" className="mt-4 inline-block te-btn te-btn-primary">
            Start Shopping
          </a>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
