"use client"
import { useState } from "react";
import MenuHeader from "./MenuHeader";
import MenuGrid from "./MenuGrid";

const foodItems = [
  {
    name: "Masala Dosa",
    category: "Breakfast",
    price: 80,
    image: "/foods/dosa.png",
    available: true,
  },
  {
    name: "Poha",
    category: "Breakfast",
    price: 50,
    image: "/foods/poha.png",
    available: true,
  },
  {
    name: "Chole Bhature",
    category: "Main Course",
    price: 120,
    image: "/foods/chole.png",
    available: true,
  },
  {
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 180,
    image: "/foods/paneer.png",
    available: false,
  },
  {
    name: "Samosa",
    category: "Snacks",
    price: 20,
    image: "/foods/samosa.png",
    available: true,
  },
  {
    name: "Vada Pav",
    category: "Snacks",
    price: 30,
    image: "/foods/vadapav.png",
    available: true,
  },
  {
    name: "Masala Chai",
    category: "Beverages",
    price: 15,
    image: "/foods/chai.png",
    available: true,
  },
  {
    name: "Jalebi",
    category: "Desserts",
    price: 40,
    image: "/foods/jalebi.png",
    available: false,
  },
];

export default function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Items");

  const filteredFoods = foodItems.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Items" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <MenuHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <MenuGrid filteredFoods={filteredFoods} />
    </div>
  );
}