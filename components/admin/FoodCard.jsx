"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

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
  const { cart, addToCart, updateQuantity } = useCart();

  const cartItem = cart.find(item => item.id === id);
  const quantity = cartItem?.quantity || 0;

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
        {category}
      </p>

      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-xs text-gray-500">Price</p>
          <h2 className="text-2xl font-bold text-orange-700">
            ₹{price}
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

      <div className="mt-4">
        {quantity === 0 ? (
          <button
            onClick={() => addToCart({ id, name, price, category, veg, image, description, available, bestseller: false, rating: 4.5, votes: 100, time: "15 mins" })}
            disabled={!available}
            className={`w-full py-2 rounded-xl font-semibold transition-all ${
              available
                ? "bg-orange-700 text-white hover:bg-orange-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between bg-orange-50 rounded-xl p-2">
            <button
              onClick={() => updateQuantity(id, quantity - 1)}
              className="w-8 h-8 rounded-full bg-orange-700 text-white flex items-center justify-center hover:bg-orange-800 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="font-semibold text-orange-700">{quantity}</span>
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="w-8 h-8 rounded-full bg-orange-700 text-white flex items-center justify-center hover:bg-orange-800 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}