"use client"
import React, { createContext, useContext, useState, useEffect } from "react";

interface OrderItem {
  id: string;
  foodId: string;
  quantity: number;
  price: string;
  food?: {
    name: string;
  };
}

interface Order {
  id: string;
  userId: string;
  totalAmount: string;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered" | "cancelled";
  tokenNumber?: number | null;
  prepTime?: number | null;
  pickupDetails?: string | null;
  dailyOrderId?: number | null;
  createdAt: string;
  updatedAt: string;
  user?: { name: string; email: string };
  items?: OrderItem[];
}

interface OrdersContextType {
  orders: Order[];
  loading: boolean;
  refreshOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, newStatus: Order["status"], tokenNumber?: number, pickupDetails?: string) => Promise<void>;
  addOrder: (orderData: any) => Promise<void>;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshOrders = async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      }
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error("Failed to fetch orders", e);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  const updateOrderStatus = async (
    orderId: string, 
    newStatus: Order["status"], 
    tokenNumber?: number, 
    pickupDetails?: string
  ) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
          tokenNumber,
          pickupDetails,
        }),
      });
      if (res.ok) {
        await refreshOrders(false);
      }
    } catch (e) {
      console.error("Failed to update order", e);
    }
  };

  const addOrder = async (orderData: any) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (res.ok) {
        await refreshOrders(false);
      }
    } catch (e) {
      console.error("Failed to add order", e);
    }
  };

  useEffect(() => {
    refreshOrders(true);
    
    // Poll for new orders every 5 seconds for real-time updates without showing loader
    const interval = setInterval(() => refreshOrders(false), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, loading, refreshOrders, updateOrderStatus, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}
