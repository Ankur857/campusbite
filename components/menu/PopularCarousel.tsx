"use client";

import { MenuItem } from '@/types/menu';
import { VegBadge } from './VegBadge';
import { RatingBadge } from './RatingBadge';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface PopularCarouselProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem, category: string) => void;
}

export function PopularCarousel({ items, onAddToCart }: PopularCarouselProps) {
  const popularItems = items.filter(item => item.popular && item.price !== null).slice(0, 8);

  if (popularItems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🔥</span>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Most Ordered</h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
        {popularItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            className="flex-shrink-0 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800/80 hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="h-32 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-zinc-800 dark:to-zinc-850 flex items-center justify-center">
              <span className="text-4xl">🍽️</span>
            </div>
            
            <div className="p-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <VegBadge veg={item.veg} />
                {item.rating && <RatingBadge rating={item.rating} />}
              </div>
              
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">{item.name}</h3>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">₹{item.price}</span>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAddToCart(item, item.category || "Popular")}
                  className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-zinc-850 hover:border-green-600 dark:hover:border-green-500 w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                >
                  <Plus size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
