"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface FoodItem {
  id: string;
  name: string;
  price: number;
  category: string;
  veg: boolean;
  image: string;
  description?: string;
  available?: boolean;
  bestseller?: boolean;
  rating?: number;
  votes?: number;
  time?: string;
}

interface CartItem extends FoodItem {
  quantity: number;
  cartItemId?: string;
}

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (item: FoodItem) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart");
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (item: FoodItem) => {
    try {
      console.log("Adding to cart:", item);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodId: item.id, quantity: 1 }),
      });
      console.log("Add to cart response:", res.status);
      if (res.ok) {
        const data = await res.json();
        console.log("Add to cart data:", data);
        await refreshCart();
      } else {
        const error = await res.json();
        console.error("Add to cart error:", error);
        throw new Error(error.error || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const res = await fetch(`/api/cart?cartItemId=${cartItemId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await refreshCart();
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId, quantity }),
      });
      if (res.ok) {
        await refreshCart();
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
      });
      if (res.ok) {
        setCart([]);
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getCartTotal,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
