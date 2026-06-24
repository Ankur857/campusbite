"use client";

import FoodCard from "./FoodCard";

export default function MenuGrid({ filteredFoods }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-8">
      {filteredFoods.map((food, index) => (
        <FoodCard key={index} {...food} />
      ))}

      {filteredFoods.length === 0 && (
        <div className="col-span-full text-center py-10 text-gray-500">
          No food item found
        </div>
      )}
    </div>
  );
}