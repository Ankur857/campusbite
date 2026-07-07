"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MenuHeader from "./MenuHeader";
import MenuGrid from "./MenuGrid";
import AddFoodModal from "./AddFoodModal";

export default function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchFoods = async () => {
    try {
      const res = await fetch("/api/foods");
      if (res.ok) {
        const data = await res.json();
        setFoodItems(data);
      }
    } catch (err) {
      console.error("Failed to fetch foods in MenuManagement:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const filteredFoods = foodItems.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryName = typeof food.category === "object" ? food.category?.name : food.category;
    const matchesCategory = selectedCategory === "All Items" || categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8">
        <MenuHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-semibold">Loading menu items...</div>
        ) : (
          <MenuGrid 
            filteredFoods={filteredFoods} 
            onAddFoodClick={() => {
              setIsModalOpen(true);
            }}
          />
        )}
        {isModalOpen && (
          <AddFoodModal onClose={() => {
            setIsModalOpen(false);
            fetchFoods(); // Refresh menu items on modal close/add
          }} />
        )}
      </div>
    </div>
  );
}