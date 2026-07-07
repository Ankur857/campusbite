"use client";

import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FloatingCart() {
  const router = useRouter();
  const { cart, getCartTotal } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = getCartTotal();

  useEffect(() => {
    setIsVisible(totalItems > 0);
  }, [totalItems]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl md:hidden"
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.push('/dashboard/cart')}
            className="w-full flex items-center justify-between bg-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>₹{subtotal.toFixed(0)}</span>
              <span className="flex items-center gap-1">
                View Cart
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
