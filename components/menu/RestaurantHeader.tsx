"use client";

import { Clock, MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface RestaurantHeaderProps {
  name: string;
  rating?: number;
  deliveryTime?: string;
  location?: string;
  cuisine?: string;
  image?: string;
  isOpen?: boolean;
}

export function RestaurantHeader({
  name,
  rating,
  deliveryTime,
  location,
  cuisine,
  image,
  isOpen = true
}: RestaurantHeaderProps) {
  return (
    <div className="bg-white">
      {/* Restaurant Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-orange-400 to-orange-600 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Restaurant Info */}
      <div className="max-w-4xl mx-auto px-4 py-6 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                {rating && (
                  <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded">
                    <Star size={14} fill="white" />
                    <span className="font-semibold">{rating.toFixed(1)}</span>
                  </div>
                )}
                
                {deliveryTime && (
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{deliveryTime}</span>
                  </div>
                )}
                
                {cuisine && (
                  <span className="text-gray-700">{cuisine}</span>
                )}
              </div>

              {location && (
                <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                  <MapPin size={16} />
                  <span>{location}</span>
                </div>
              )}
            </div>

            <div className="ml-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isOpen 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
