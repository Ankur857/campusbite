"use client"
import React, { createContext, useContext, useState } from "react";

interface Order {
  id: string;
  customer: string;
  item: string;
  total: string;
  status: "New" | "Preparing" | "Ready" | "Delivered";
}

const initialOrders: Order[] = [
  { id: "#8291", customer: "Shilpi", item: "Dosa", total: "₹150", status: "New" },
  { id: "#8290", customer: "Shivangi", item: "Appe", total: "₹160", status: "New" },
  { id: "#8289", customer: "Akshat", item: "Chhole Kulche", total: "₹100", status: "Preparing" },
  { id: "#8288", customer: "Ankur", item: "Chhole Bhature", total: "₹120", status: "Ready" },
  { id: "#8287", customer: "Solu", item: "Wrap", total: "₹120", status: "New" },
  { id: "#8286", customer: "Shivangi", item: "Appe", total: "₹160", status: "Preparing" },
  { id: "#8285", customer: "Akshat", item: "Chhole Kulche", total: "₹100", status: "Preparing" },
  { id: "#8284", customer: "Ankur", item: "Chhole Bhature", total: "₹120", status: "Ready" },
  { id: "#8283", customer: "Ankur", item: "Chhole Bhature", total: "₹120", status: "Preparing" },
  { id: "#8282", customer: "Shilpi", item: "Dosa", total: "₹150", status: "New" },
  { id: "#8281", customer: "Akshat", item: "Chhole Kulche", total: "₹100", status: "Preparing" },
  { id: "#8280", customer: "Ankur", item: "Chhole Bhature", total: "₹120", status: "Ready" },
];

interface OrdersContextType {
  orders: Order[];
  updateOrderStatus: (orderId: string, newStatus: Order["status"]) => void;
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

  return (
    <OrdersContext.Provider value={{ orders, updateOrderStatus }}>
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
