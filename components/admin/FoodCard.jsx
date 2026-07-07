"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function FoodCard({
  id,
  image,
  name,
  category,
  price,
  available: initialAvailable,
  veg,
  description,
}) {
  const [available, setAvailable] = useState(initialAvailable);

  const displayCategory = typeof category === "object" ? category?.name : category;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border flex flex-col">
      <div className="flex justify-between">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full bg-gray-100 p-2 object-cover"
        />

        <div className="flex gap-3">
          <Pencil
            size={16}
            className="cursor-pointer text-orange-700"
          />
          <Trash2
            size={16}
            className="cursor-pointer text-red-500"
          />
        </div>
      </div>

      <h3 className="font-semibold mt-4 text-gray-900">{name}</h3>

      <p className="text-xs font-bold text-gray-500 uppercase">
        {displayCategory}
      </p>

      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <h2 className="text-2xl font-bold text-orange-700">
            ₹{parseFloat(price || 0).toFixed(0)}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold ${
              available
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {available ? "Available" : "Paused"}
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={available}
              onChange={() => setAvailable(!available)}
              className="sr-only peer"
            />

            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 transition-all"></div>

            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>
    </div>
  );
}