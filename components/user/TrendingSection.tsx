"use client";

import { TrendingUp } from "lucide-react";
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
          // Filter foods that have isTrending set to true and limit to max 4 items
          const trending = data.filter((food: any) => food.isTrending === true);
          setItems(trending.slice(0, 4));
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
        <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md mb-4" />
        <div className="h-10 w-64 bg-gray-200 dark:bg-zinc-800 rounded-md mb-6" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800" />
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
          <div className="mb-2 flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <TrendingUp size={18} />

            <span className="text-xs font-bold uppercase tracking-[0.15em]">
              Trending
            </span>
          </div>

          <h3 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">
            Trending in Main Block
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-500">
            What students are ordering today.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-orange-100
              dark:border-zinc-800/80
              bg-white
              dark:bg-zinc-900
              p-4
              shadow-sm
              transition-all
              hover:shadow-md
            "
          >
            <h4 className="font-extrabold text-gray-800 dark:text-zinc-200 text-base truncate pr-2">
              {item.name}
            </h4>

            <button
              onClick={() => handleAddToCart(item)}
              className="
                px-3
                py-1.5
                text-xs
                font-bold
                text-orange-600
                dark:text-orange-400
                bg-orange-50
                dark:bg-orange-950/20
                hover:bg-orange-600
                dark:hover:bg-orange-600
                hover:text-white
                dark:hover:text-white
                rounded-xl
                border
                border-orange-100
                dark:border-orange-900/30
                transition-colors
                cursor-pointer
                flex-shrink-0
              "
            >
              Add +
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}