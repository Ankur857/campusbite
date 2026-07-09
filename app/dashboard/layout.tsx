import BottomNav from "@/components/user/BottomNav";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "../globals.css";
import { OrdersProvider } from "@/contexts/OrdersContext";
import { CartProvider } from "@/contexts/CartContext";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CartProvider>
      <OrdersProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950 text-foreground transition-colors duration-300">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto pb-16">
            {children}
          </main>

          {/* Bottom Navigation */}
          <BottomNav />
        </div>
      </OrdersProvider>
    </CartProvider>
  );
}