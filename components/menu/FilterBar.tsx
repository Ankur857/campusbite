"use client";

import { FilterState, SortOption } from '@/types/menu';
import { motion } from 'framer-motion';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap gap-3"
    >
      <button
        onClick={() => onFilterChange({ vegOnly: !filters.vegOnly })}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
          filters.vegOnly
            ? 'bg-green-600 text-white shadow-md'
            : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:border-green-600 hover:bg-green-50 dark:hover:bg-zinc-850/50'
        }`}
      >
        Veg Only
      </button>
      
      <button
        onClick={() => onFilterChange({ popularOnly: !filters.popularOnly })}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
          filters.popularOnly
            ? 'bg-orange-600 text-white shadow-md'
            : 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-zinc-850/50'
        }`}
      >
        Popular
      </button>

      <select
        value={filters.sortBy}
        onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOption })}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
      >
        <option value="default" className="dark:bg-zinc-900">Sort by</option>
        <option value="price-low" className="dark:bg-zinc-900">Price: Low to High</option>
        <option value="price-high" className="dark:bg-zinc-900">Price: High to Low</option>
        <option value="rating" className="dark:bg-zinc-900">Rating</option>
      </select>
    </motion.div>
  );
}
