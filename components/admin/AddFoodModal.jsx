"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AddFoodModal({ onClose }) {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [status, setStatus] = useState("Available");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      foodName,
      price,
      category,
      status,
      image,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Add New Food Item
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm mb-1">
              Food Name
            </label>
            <input
              type="text"
              value={foodName}
              onChange={(e) =>
                setFoodName(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter food name"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>Breakfast</option>
              <option>Main Course</option>
              <option>Snacks</option>
              <option>Beverages</option>
              <option>Desserts</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">
              Food Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Status
            </label>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Available"
                  checked={status === "Available"}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                />
                Available
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Paused"
                  checked={status === "Paused"}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                />
                Paused
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-orange-700 text-white rounded-lg"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}