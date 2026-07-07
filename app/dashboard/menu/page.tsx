"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { FilterState, MenuItem } from "@/types/menu";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { RestaurantHeader } from "@/components/menu/RestaurantHeader";
import { CategoryTabs } from "@/components/menu/CategoryTabs";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { SearchBar } from "@/components/menu/SearchBar";
import { FilterBar } from "@/components/menu/FilterBar";
import { PopularCarousel } from "@/components/menu/PopularCarousel";
import { MenuAccordion } from "@/components/menu/MenuAccordion";
import { FloatingCart } from "@/components/menu/FloatingCart";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    vegOnly: false,
    popularOnly: false,
    sortBy: "default",
  });
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Popular"]));
  const [menuData, setMenuData] = useState<any[]>([]);
  const [loadingFoods, setLoadingFoods] = useState(true);

  const { cart, loading: cartLoading, addToCart, removeFromCart, updateQuantity } = useCart();
  const categoryRefs = useRef<Map<string, HTMLDivElement>>(new Map());

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

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    
    // Expand the clicked category
    setExpandedCategories(prev => new Set([...prev, category]));
    
    // Scroll to the category
    const element = categoryRefs.current.get(category);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Auto-expand category on search
  useEffect(() => {
    if (filters.searchQuery) {
      // Find first category with matching items
      const matchingCategory = sortedMenuData.find((cat: any) => cat.items.length > 0);
      if (matchingCategory) {
        setExpandedCategories(prev => new Set([matchingCategory.category]));
        setActiveCategory(matchingCategory.category);
      }
    }
  }, [filters.searchQuery, sortedMenuData]);

  // Handle "Popular" category
  const popularCategory = {
    category: "Popular",
    items: allItems.filter((item: any) => item.popular).slice(0, 8)
  };

  const displayMenuData = activeCategory === "Popular" 
    ? [popularCategory, ...sortedMenuData.filter((cat: any) => cat.category !== "Popular")]
    : sortedMenuData;

  if (loadingFoods) {
    return (
      <div className="min-h-screen bg-[#fcfaf5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-500 font-semibold mb-2 animate-pulse">Loading Green Chilli Cafe Menu...</p>
          <p className="text-sm text-gray-400">Connecting to canteen database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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

        {/* Category Tabs */}
        <CategoryTabs
          categories={sortedMenuData.map((cat: any) => cat.category)}
          activeCategory={activeCategory}
          onCategoryChange={scrollToCategory}
        />

        {/* Popular Carousel */}
        {!filters.searchQuery && !filters.vegOnly && !filters.popularOnly && activeCategory === "Popular" && (
          <PopularCarousel
            items={allItems}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Menu Categories */}
        <div className="space-y-8">
          {displayMenuData.map((category: any) => {
            if (category.items.length === 0) return null;

            const isExpanded = expandedCategories.has(category.category);

            return (
              <div
                key={category.category}
                ref={(el) => {
                  if (el) categoryRefs.current.set(category.category, el);
                }}
                id={`category-${category.category}`}
              >
                <MenuAccordion
                  category={category.category}
                  items={category.items}
                  isExpanded={isExpanded}
                  onToggle={() => {
                    setExpandedCategories(prev => {
                      const newSet = new Set(prev);
                      if (newSet.has(category.category)) {
                        newSet.delete(category.category);
                      } else {
                        newSet.add(category.category);
                        // Collapse other categories
                        sortedMenuData.forEach((cat: any) => {
                          if (cat.category !== category.category) {
                            newSet.delete(cat.category);
                          }
                        });
                      }
                      return newSet;
                    });
                  }}
                  onAddToCart={handleAddToCart}
                  onIncreaseQuantity={handleIncreaseQuantity}
                  onDecreaseQuantity={handleDecreaseQuantity}
                  getItemQuantity={getItemQuantity}
                />
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedMenuData.every((cat: any) => cat.items.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl text-gray-500 mb-2">No items found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      <FloatingCart />
    </div>
  );
}