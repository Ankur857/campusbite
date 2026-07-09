"use client";

import { useState, useMemo, useEffect } from "react";
import { FilterState, MenuItem } from "@/types/menu";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { RestaurantHeader } from "@/components/menu/RestaurantHeader";

import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { SearchBar } from "@/components/menu/SearchBar";
import { FilterBar } from "@/components/menu/FilterBar";
import { PopularCarousel } from "@/components/menu/PopularCarousel";
import { FloatingCart } from "@/components/menu/FloatingCart";
import { categoryIcons } from "@/data/menu";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    vegOnly: false,
    popularOnly: false,
    sortBy: "default",
  });
  const [menuData, setMenuData] = useState<any[]>([]);
  const [loadingFoods, setLoadingFoods] = useState(true);

  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  // Fetch foods dynamically from the database API
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoadingFoods(true);
        const res = await fetch("/api/foods?availableOnly=true");
        if (res.ok) {
          const dbFoods = await res.json();
          // Map database foods to MenuItem structure
          const mappedFoods = dbFoods.map((food: any) => ({
            id: food.id,
            name: food.name,
            price: parseFloat(food.price),
            veg: food.isVeg,
            rating: parseFloat(food.rating || "0"),
            preparationTime: `${food.prepTime || 15} min`,
            description: food.description,
            popular: food.isPopular,
            image: food.image,
            category: food.category?.name || "General"
          }));

          // Group by category name
          const categoriesMap = new Map<string, MenuItem[]>();
          mappedFoods.forEach((item: any) => {
            const cat = item.category;
            if (!categoriesMap.has(cat)) {
              categoriesMap.set(cat, []);
            }
            categoriesMap.get(cat)!.push(item);
          });

          const grouped = Array.from(categoriesMap.entries()).map(([category, items]) => ({
            category,
            items
          }));

          setMenuData(grouped);
        } else {
          console.error("Failed to fetch foods:", res.statusText);
          toast.error("Failed to load menu items");
        }
      } catch (error) {
        console.error("Failed to fetch foods:", error);
        toast.error("Failed to load menu items");
      } finally {
        setLoadingFoods(false);
      }
    };

    fetchFoods();
  }, []);

  // Get all items for popular carousel
  const allItems = useMemo(() => {
    return menuData.flatMap((cat: any) => cat.items.filter((item: any) => item.price !== null));
  }, [menuData]);

  // Filter and sort items
  const filteredMenuData = useMemo(() => {
    return menuData.map((category: any) => ({
      ...category,
      items: category.items.filter((item: any) => {
        if (item.price === null) return false;

        const matchesSearch =
          filters.searchQuery === "" ||
          item.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          (item.description?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ?? false);

        const matchesVeg = !filters.vegOnly || item.veg === true;
        const matchesPopular = !filters.popularOnly || item.popular === true;

        return matchesSearch && matchesVeg && matchesPopular;
      })
    })).filter((category: any) => category.items.length > 0);
  }, [menuData, filters]);

  // Sort items within categories
  const sortedMenuData = useMemo(() => {
    return filteredMenuData.map((category: any) => ({
      ...category,
      items: [...category.items].sort((a: any, b: any) => {
        switch (filters.sortBy) {
          case "price-low":
            return (a.price || 0) - (b.price || 0);
          case "price-high":
            return (b.price || 0) - (a.price || 0);
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          default:
            return 0;
        }
      })
    }));
  }, [filteredMenuData, filters.sortBy]);

  const getItemQuantity = (itemId: string) => {
    const cartItem = cart.find(i => i.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = async (item: MenuItem, category: string) => {
    try {
      await addToCart({
        id: item.id,
        name: item.name,
        price: item.price || 0,
        category: category,
        veg: item.veg ?? true,
        image: item.image || "",
        description: item.description,
      });
      toast.success(`Added ${item.name} to cart!`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  const handleIncreaseQuantity = async (itemId: string) => {
    try {
      const cartItem = cart.find(i => i.id === itemId);
      if (cartItem && cartItem.cartItemId) {
        await updateQuantity(cartItem.cartItemId, cartItem.quantity + 1);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  const handleDecreaseQuantity = async (itemId: string) => {
    try {
      const cartItem = cart.find(i => i.id === itemId);
      if (cartItem && cartItem.cartItemId) {
        if (cartItem.quantity <= 1) {
          await removeFromCart(cartItem.cartItemId);
          toast.success("Removed item from cart");
        } else {
          await updateQuantity(cartItem.cartItemId, cartItem.quantity - 1);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quantity");
    }
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Check if any search queries or filters are active
  const isSearching = !!filters.searchQuery || filters.vegOnly || filters.popularOnly || filters.sortBy !== "default";

  // Filter out popular/top items
  const popularItems = useMemo(() => {
    return allItems.filter((item: any) => item.popular);
  }, [allItems]);

  if (loadingFoods) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <p className="text-lg text-gray-500 dark:text-zinc-400 font-semibold mb-2 animate-pulse">Loading Green Chilli Cafe Menu...</p>
          <p className="text-sm text-gray-400 dark:text-zinc-500">Connecting to canteen database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 pb-20 text-foreground transition-colors duration-300">
      <RestaurantHeader
        name="Green Chilli Cafe"
        rating={4.5}
        deliveryTime="25-30 min"
        location="Campus Main Block"
        cuisine="North Indian, Chinese, South Indian, Fast Food"
        isOpen={true}
      />

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div>
          <SearchBar
            value={filters.searchQuery}
            onChange={(value) => handleFilterChange({ searchQuery: value })}
            placeholder="Search for dishes..."
          />
        </div>

        {/* Filter Bar */}
        <div>
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
        </div>



        {/* Popular Carousel (Only on Popular/Home view when not searching) */}
        {!isSearching && activeCategory === "Popular" && (
          <PopularCarousel
            items={allItems}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* MAIN DYNAMIC CONTENT */}
        {isSearching ? (
          // Grouped Search Results View
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-lg font-bold text-gray-500 dark:text-zinc-450 mb-2">Search Results</h2>
            {sortedMenuData.map((category: any) => {
              if (category.items.length === 0) return null;
              const icon = categoryIcons[category.category] || '🍽️';
              return (
                <div key={category.category} className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-zinc-800">
                    <span className="text-xl">{icon}</span>
                    <h3 className="font-bold text-gray-800 dark:text-white">{category.category}</h3>
                    <span className="text-xs text-gray-400 dark:text-zinc-500">({category.items.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item: any) => (
                      <MenuItemCard
                        key={item.id}
                        item={{ ...item, category: category.category }}
                        quantity={getItemQuantity(item.id)}
                        onAdd={() => handleAddToCart({ ...item, category: category.category }, category.category)}
                        onIncrease={() => handleIncreaseQuantity(item.id)}
                        onDecrease={() => handleDecreaseQuantity(item.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
            {sortedMenuData.every((cat: any) => cat.items.length === 0) && (
              <div className="flex flex-col items-center justify-center py-16">
                <p className="text-xl text-gray-500 dark:text-zinc-400 mb-2">No items found</p>
                <p className="text-sm text-gray-400 dark:text-zinc-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        ) : activeCategory === "Popular" ? (
          // Default landing dashboard view
          <div className="space-y-8 animate-fadeIn">
            {/* Top Regular Items (Favorites) */}
            {popularItems.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>🔥 Customer Favorites</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {popularItems.slice(0, 6).map((item: any) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      quantity={getItemQuantity(item.id)}
                      onAdd={() => handleAddToCart(item, item.category)}
                      onIncrease={() => handleIncreaseQuantity(item.id)}
                      onDecrease={() => handleDecreaseQuantity(item.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Browse Categories Grid */}
            <div className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>Explore Categories</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {sortedMenuData.map((cat: any) => {
                  const icon = categoryIcons[cat.category] || '🍽️';
                  return (
                    <button
                      key={cat.category}
                      onClick={() => setActiveCategory(cat.category)}
                      className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:scale-105 hover:bg-gray-50 dark:hover:bg-zinc-850/80 transition-all duration-300 group cursor-pointer"
                    >
                      <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</span>
                      <span className="font-semibold text-gray-800 dark:text-zinc-200 text-sm text-center">{cat.category}</span>
                      <span className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{cat.items.length} items</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // Selected Category View
          (() => {
            const categoryData = sortedMenuData.find((cat: any) => cat.category === activeCategory);
            if (!categoryData || categoryData.items.length === 0) {
              return (
                <div className="flex flex-col items-center justify-center py-16 animate-fadeIn">
                  <p className="text-xl text-gray-500 dark:text-zinc-400 mb-2">No items in this category</p>
                  <button
                    onClick={() => setActiveCategory("Popular")}
                    className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-xl font-medium cursor-pointer"
                  >
                    Back to categories
                  </button>
                </div>
              );
            }
            return (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{categoryIcons[activeCategory] || '🍽️'}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activeCategory}</h2>
                      <p className="text-xs text-gray-400 dark:text-zinc-500">{categoryData.items.length} dishes available</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveCategory("Popular")}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-300 text-sm font-medium rounded-full transition-all cursor-pointer"
                  >
                    ← Back to Categories
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryData.items.map((item: any) => (
                    <MenuItemCard
                      key={item.id}
                      item={{ ...item, category: categoryData.category }}
                      quantity={getItemQuantity(item.id)}
                      onAdd={() => handleAddToCart({ ...item, category: categoryData.category }, categoryData.category)}
                      onIncrease={() => handleIncreaseQuantity(item.id)}
                      onDecrease={() => handleDecreaseQuantity(item.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })()
        )}
      </div>

      <FloatingCart />
    </div>
  );
}