"use client";

import { Repeat } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useCart } from "@/contexts/CartContext";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ReorderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  lastOrdered: string;
}

export default function QuickReorder() {
  const { userId } = useAuth();
  const { addToCart } = useCart();
  const [items, setItems] = useState<ReorderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchPastOrders = async () => {
      try {
        const res = await fetch(`/api/orders?userId=${userId}`);
        if (res.ok) {
          const orders = await res.json();

          // Gather unique foods recently ordered
          const itemsMap = new Map<string, ReorderItem>();

          // orders are already sorted desc by createdAt
          orders.forEach((order: any) => {
            order.items?.forEach((item: any) => {
              if (item.food && !itemsMap.has(item.food.id)) {
                const formattedDate = new Date(order.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric'
                });

                itemsMap.set(item.food.id, {
                  id: item.food.id,
                  name: item.food.name,
                  price: parseFloat(item.price),
                  image: item.food.image,
                  lastOrdered: formattedDate,
                });
              }
            });
          });

          setItems(Array.from(itemsMap.values()).slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch past orders for QuickReorder:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastOrders();
  }, [userId]);

  const handleReorder = async (item: ReorderItem) => {
    try {
      await addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        category: "",
        veg: true,
        image: item.image,
      });
      toast.success(`Added ${item.name} to cart!`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  if (loading) {
    return (
      <section className="mt-12 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 dark:bg-zinc-800 rounded-md mb-4" />
        <div className="h-10 w-48 bg-gray-200 dark:bg-zinc-800 rounded-md mb-6" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 dark:bg-zinc-900 rounded-2xl border dark:border-zinc-800" />
          ))}
        </div>
      </section>
    );
  }

  // If user has no recent orders, display a friendly placeholder or hide the section
  if (items.length === 0) {
    return null; // Hide the section if empty
  }

  return (
    <section className="mt-12">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-orange-600 dark:text-orange-400">
            <Repeat size={18} />
            <span className="text-xs font-bold uppercase tracking-[0.15em]">
              Quick
            </span>
          </div>

          <h3 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">
            Quick Reorder
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-500">
            One tap. Same bite as last time.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
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
              onClick={() => handleReorder(item)}
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
          </div>
        ))}
      </div>
    </section>
  );
}