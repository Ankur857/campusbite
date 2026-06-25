"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import FoodCard from "@/components/common/foodCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { menuItems } from "@/data/menuData";


const categories = [
  "All",
  "Breakfast",
  "Main Course",
  "Snacks",
  "Pizza",
  "Chinese",
  "Desserts",
  "Beverages"
];

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Explore Menu 🍔
        </h1>
        <p className="mt-1 text-muted-foreground">
          Discover your favorite food items.
        </p>
      </div>

      {/* Search */}
      <div className="sticky top-0 z-20 bg-background py-2">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <Input
              placeholder="Search dosa, pizza, ice cream..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-14 rounded-2xl border-orange-100 bg-white pl-12 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={
              selectedCategory === category
                ? "default"
                : "outline"
            }
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? "bg-orange-500 hover:bg-orange-600"
                : ""
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Results */}
      {filteredItems.length === 0 ? (
        <div className="flex h-52 items-center justify-center rounded-3xl border border-dashed">
          <p className="text-muted-foreground">
            No food items found 😔
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}