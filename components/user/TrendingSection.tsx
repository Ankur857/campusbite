"use client";

import Image from "next/image";
import { Plus, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface FoodItem {
  id: string;
  name: string;
  price: string;
  rating: string;
  image: string;
  isVeg: boolean;
  category?: {
    name: string;
  };
}

export default function TrendingSection() {
  const { addToCart } = useCart();
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("/api/foods?availableOnly=true");
        if (res.ok) {
          const data = await res.json();
          // Filter foods that have isTrending set to true
          const trending = data.filter((food: any) => food.isTrending === true);
          setItems(trending);
        }
      } catch (error) {
        console.error("Failed to fetch trending foods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const handleAddToCart = async (item: FoodItem) => {
    try {
      await addToCart({
        id: item.id,
        name: item.name,
        price: parseFloat(item.price),
        category: item.category?.name || "",
        veg: item.isVeg,
        image: item.image,
      });
      toast.success(`Added ${item.name} to cart!`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <section className="mt-14 mb-16 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded-md mb-4" />
        <div className="h-10 w-64 bg-gray-200 rounded-md mb-6" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[4/3] bg-gray-100 rounded-[28px]" />
          ))}
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null; // Hide if no trending items
  }

  return (
    <section className="mt-14 mb-16">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-orange-600">
            <TrendingUp size={18} />

            <span className="text-xs font-bold uppercase tracking-[0.15em]">
              Trending
            </span>
          </div>

          <h3 className="text-3xl font-black">
            Trending in Main Block
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            What students are ordering today.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.id}
            onClick={() => handleAddToCart(item)}
            className="group overflow-hidden rounded-[28px] border border-orange-100 bg-white transition-all hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-600 shadow">
                {item.category?.name || "Popular"}
              </span>

              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/80 px-2 py-1 text-xs text-white">
                <Star
                  size={12}
                  fill="orange"
                />
                {parseFloat(item.rating || "0").toFixed(1)}
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 truncate max-w-[150px]">
                  {item.name}
                </h4>

                <p className="font-bold text-orange-600">
                  ₹{parseFloat(item.price).toFixed(0)}
                </p>
              </div>

              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-2 rounded-full group-hover:bg-orange-600 group-hover:text-white transition-colors">
                Add +
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}