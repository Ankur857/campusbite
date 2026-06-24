"use client"
import { useState } from "react";
import MenuHeader from "./MenuHeader";
import MenuGrid from "./MenuGrid";
import AddFoodModal from "./AddFoodModal";

const foodItems = [
 {
  name: "Masala Dosa",
  category: "Breakfast",
  price: 80,
  image: "/dosa.jpg",
  available: true,
},
  {
    name: "Poha",
    category: "Breakfast",
    price: 50,
    image: "/poha.jpg",
    available: true,
  },
  {
    name: "Chole Bhature",
    category: "Main Course",
    price: 120,
    image: "/chhole.jpg",
    available: true,
  },
  {
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 180,
    image: "/paneer.jpg",
    available: false,
  },
  {
    name: "Samosa",
    category: "Snacks",
    price: 20,
    image: "/samosa.jpg",
    available: true,
  },
  {
    name: "Vada Pav",
    category: "Snacks",
    price: 30,
    image: "/vada.jpg",
    available: true,
  },
  {
    name: "Masala Chai",
    category: "Beverages",
    price: 15,
    image: "/chai.jpg",
    available: true,
  },
  {
    name: "Jalebi",
    category: "Desserts",
    price: 40,
    image: "/jalebi.jpg",
    available: false,
  },
];

export default function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <MenuGrid 
        filteredFoods={filteredFoods} 
        onAddFoodClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <AddFoodModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}