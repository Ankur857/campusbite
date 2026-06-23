"use client"
import { OrdersProvider } from "@/contexts/OrdersContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrdersProvider>{children}</OrdersProvider>;
}
