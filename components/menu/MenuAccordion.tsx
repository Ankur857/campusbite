"use client";

import { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { MenuItemCard } from './MenuItemCard';
import { categoryIcons } from '@/data/menu';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuAccordionProps {
  category: string;
  items: MenuItem[];
  isExpanded: boolean;
  onToggle: () => void;
  onAddToCart: (item: MenuItem, category: string) => void;
  onIncreaseQuantity: (itemId: string) => void;
  onDecreaseQuantity: (itemId: string) => void;
  getItemQuantity: (itemId: string) => number;
}

const ITEMS_PER_PAGE = 5;

export function MenuAccordion({
  category,
  items,
  isExpanded,
  onToggle,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  getItemQuantity
}: MenuAccordionProps) {
  const [showAll, setShowAll] = useState(false);
  
  const displayItems = showAll ? items : items.slice(0, ITEMS_PER_PAGE);
  const hasMore = items.length > ITEMS_PER_PAGE;

  const icon = categoryIcons[category] || '🍽️';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
      id={`category-${category}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-xl font-bold text-gray-900">{category}</h2>
        <span className="text-sm text-gray-500">({items.length})</span>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {displayItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={{ ...item, category }}
              quantity={getItemQuantity(item.id)}
              onAdd={() => onAddToCart({ ...item, category }, category)}
              onIncrease={() => onIncreaseQuantity(item.id)}
              onDecrease={() => onDecreaseQuantity(item.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {hasMore && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-orange-600 font-medium hover:text-orange-700 transition-colors"
        >
          {showAll ? `Show Less (${items.length - ITEMS_PER_PAGE} hidden)` : `View More (${items.length - ITEMS_PER_PAGE} more)`}
        </motion.button>
      )}
    </motion.div>
  );
}
