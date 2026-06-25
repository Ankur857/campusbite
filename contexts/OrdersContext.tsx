"use client"
import React, { createContext, useContext, useState } from "react";

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  foodItem: string;
  amount: number;
  status: "new" | "preparing" | "ready" | "delivered";
  time: string;
}

const initialOrders: Order[] = [
  { id: "#8291", orderId: "order_8291", customerName: "Shilpi", foodItem: "Dosa", amount: 150, status: "new", time: "10:30 AM" },
  { id: "#8290", orderId: "order_8290", customerName: "Shivangi", foodItem: "Appe", amount: 160, status: "new", time: "10:31 AM" },
  { id: "#8289", orderId: "order_8289", customerName: "Akshat", foodItem: "Chhole Kulche", amount: 100, status: "preparing", time: "10:25 AM" },
  { id: "#8288", orderId: "order_8288", customerName: "Ankur", foodItem: "Chhole Bhature", amount: 120, status: "ready", time: "10:20 AM" },
];

interface OrdersContextType {
  orders: Order[];
  updateOrderStatus: (orderId: string, newStatus: Order["status"]) => void;
  addOrder: (order: Order) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <OrdersContext.Provider value={{ orders, updateOrderStatus, addOrder }}>
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
