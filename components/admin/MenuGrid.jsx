"use client";

import FoodCard from "./FoodCard";
import { Plus } from "lucide-react";

export default function MenuGrid({ filteredFoods, onAddFoodClick }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">
      {filteredFoods.map((food, index) => (
        <FoodCard key={index} {...food} />
      ))}

      {/* Add Food Card */}
      <div
        onClick={onAddFoodClick}
        className="bg-white rounded-2xl p-5 shadow-sm border border-dashed border-gray-300 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center min-h-[200px]"
      >
        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-3">
          <Plus size={24} className="text-orange-700" />
        </div>
        <p className="font-semibold text-gray-700">Add New Food</p>
      </div>

      {filteredFoods.length === 0 && (
        <div className="col-span-full text-center py-10 text-gray-500">
          No food item found
        </div>
      )}
    </div>
  );
}