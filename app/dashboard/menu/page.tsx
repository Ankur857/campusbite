"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import FoodCard from "@/components/common/foodCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  image?: string;
  createdAt: string;
}

interface FoodItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  price: string;
  rating: string;
  ratingCount: number;
  stock: number;
  prepTime: number;
  isVeg: boolean;
  isTrending: boolean;
  isPopular: boolean;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [catRes, foodRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/foods?availableOnly=true")
      ]);

      if (catRes.ok) {
        const cats = await catRes.json();
        setCategories(cats);
      }

      if (foodRes.ok) {
        const foodsData = await foodRes.json();
        setFoods(foodsData);
      }
    } catch (e) {
      console.error("Failed to fetch data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredItems = useMemo(() => {
    return foods.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategoryId === null || item.categoryId === selectedCategoryId;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategoryId, foods]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 flex items-center justify-center h-[60vh]">
        <p className="text-lg text-gray-500">Loading menu...</p>
      </div>
    );
  }

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
        <Button
          key="all"
          variant={selectedCategoryId === null ? "default" : "outline"}
          onClick={() => setSelectedCategoryId(null)}
          className={`rounded-full whitespace-nowrap ${
            selectedCategoryId === null
              ? "bg-orange-500 hover:bg-orange-600"
              : ""
          }`}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategoryId === category.id
                ? "default"
                : "outline"
            }
            onClick={() => setSelectedCategoryId(category.id)}
            className={`rounded-full whitespace-nowrap ${
              selectedCategoryId === category.id
                ? "bg-orange-500 hover:bg-orange-600"
                : ""
            }`}
          >
            {category.name}
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
            // We'll map our FoodItem to the format FoodCard expects
            <FoodCard 
              key={item.id} 
              item={{
                id: item.id,
                name: item.name,
                price: parseFloat(item.price),
                category: item.category?.name || "",
                isVeg: item.isVeg,
                image: item.image,
                description: item.description,
                isPopular: item.isPopular,
                rating: parseFloat(item.rating)
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
}