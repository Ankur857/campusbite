"use client";

import { categoryIcons } from '@/data/menu';
import { motion } from 'framer-motion';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const mainCategories = ['Popular', 'Burger', 'Chinese', 'Sandwiches', 'Pizza', 'Momos', 'South Indian', 'Shakes'];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {mainCategories.map((category) => {
            const icon = category === 'Popular' ? '🔥' : categoryIcons[category] || '🍽️';
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-orange-600 text-white font-medium shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{icon}</span>
                <span>{category}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
