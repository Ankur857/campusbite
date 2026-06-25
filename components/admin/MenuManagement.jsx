"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import MenuHeader from "./MenuHeader";
import MenuGrid from "./MenuGrid";
import AddFoodModal from "./AddFoodModal";
import { useCart } from "../../contexts/CartContext";
import { Trash2 } from "lucide-react";

const foodItems = [
 {
  id: 1,
  name: "Masala Dosa",
  category: "Breakfast",
  price: 80,
  image: "/dosa.jpg",
  available: true,
  veg: true,
},
  {
    id: 2,
    name: "Poha",
    category: "Breakfast",
    price: 50,
    image: "/poha.jpg",
    available: true,
    veg: true,
  },
  {
    id: 3,
    name: "Chole Bhature",
    category: "Main Course",
    price: 120,
    image: "/chhole.jpg",
    available: true,
    veg: true,
  },
  {
    id: 4,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 180,
    image: "/paneer.jpg",
    available: false,
    veg: true,
  },
  {
    id: 5,
    name: "Samosa",
    category: "Snacks",
    price: 20,
    image: "/samosa.jpg",
    available: true,
    veg: true,
  },
  {
    id: 6,
    name: "Vada Pav",
    category: "Snacks",
    price: 30,
    image: "/vada.jpg",
    available: true,
    veg: true,
  },
  {
    id: 7,
    name: "Masala Chai",
    category: "Beverages",
    price: 15,
    image: "/chai.jpg",
    available: true,
    veg: true,
  },
  {
    id: 8,
    name: "Jalebi",
    category: "Desserts",
    price: 40,
    image: "/jalebi.jpg",
    available: false,
    veg: true,
  },
];

export default function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, clearCart, getCartTotal, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const filteredFoods = foodItems.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Items" || food.category === selectedCategory;
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
        <MenuGrid 
          filteredFoods={filteredFoods} 
          onAddFoodClick={() => setIsModalOpen(true)}
        />
        {isModalOpen && (
          <AddFoodModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>

      {/* Cart Sidebar */}
      {cart.length > 0 && (
        <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
            <button 
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-orange-700 font-semibold">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-orange-700 text-white flex items-center justify-center text-xs"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-orange-700 text-white flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-bold text-orange-700">₹{getCartTotal()}</span>
            </div>
            <button 
              onClick={() => router.push("/admin/payment")}
              className="w-full py-3 bg-orange-700 text-white rounded-xl font-semibold hover:bg-orange-800 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}