"use client";

import { Clock, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface RestaurantHeaderProps {
  name: string;
  rating?: number;
  deliveryTime?: string;
  location?: string;
  cuisine?: string;
  isOpen?: boolean;
}

export function RestaurantHeader({
  name,
  rating,
  deliveryTime,
  location,
  cuisine,
  isOpen = true
}: RestaurantHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 dark:from-zinc-900/40 dark:via-zinc-950/20 dark:to-zinc-900/40 border-b border-orange-100/50 dark:border-zinc-800 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          {/* Left Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍛</span>
              <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{name}</h1>
              <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${
                isOpen 
                  ? 'bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-455 border border-green-200 dark:border-green-800/30' 
                  : 'bg-red-100 dark:bg-red-950/20 text-red-700 dark:text-red-455 border border-red-200 dark:border-red-800/30'
              }`}>
                {isOpen ? 'Open Now' : 'Closed'}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-zinc-400 font-medium">{cuisine}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {rating && (
                <div className="flex items-center gap-1 bg-amber-500 text-white px-2 py-0.5 rounded-lg font-bold shadow-sm">
                  <Star size={13} fill="white" className="stroke-none" />
                  <span>{rating.toFixed(1)}</span>
                </div>
              )}
              
              {deliveryTime && (
                <div className="flex items-center gap-1 text-gray-600 dark:text-zinc-300 font-semibold bg-white dark:bg-zinc-900 border border-orange-100/80 dark:border-zinc-800/60 px-2.5 py-0.5 rounded-lg shadow-sm">
                  <Clock size={14} className="text-orange-500" />
                  <span>{deliveryTime}</span>
                </div>
              )}
              
              {location && (
                <div className="flex items-center gap-1 text-gray-500 dark:text-zinc-450 font-medium">
                  <MapPin size={14} className="text-red-500" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
