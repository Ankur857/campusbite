"use client";

import { MenuItem } from '@/types/menu';
import { VegBadge } from './VegBadge';
import { RatingBadge } from './RatingBadge';
import { QuantitySelector } from './QuantitySelector';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const MenuItemCard = memo(function MenuItemCard({ item, quantity, onAdd, onIncrease, onDecrease }: MenuItemCardProps) {
  if (item.price === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <VegBadge veg={item.veg} />
            {item.popular && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium"
              >
                Popular
              </motion.span>
            )}
          </div>
          
          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
          
          {item.description && (
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>
          )}
          
          <div className="flex items-center gap-3 mb-3">
            {item.rating && <RatingBadge rating={item.rating} />}
            {item.preparationTime && (
              <span className="text-xs text-gray-500">{item.preparationTime}</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
            
            {quantity > 0 ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                key={`quantity-${quantity}`}
              >
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                />
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAdd}
                className="flex items-center gap-2 bg-white border border-gray-300 text-green-600 hover:bg-green-50 hover:border-green-600 px-4 py-2 rounded-lg font-medium transition-all"
              >
                <Plus size={18} />
                <span>Add</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
