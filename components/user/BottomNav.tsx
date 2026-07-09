"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ShoppingCart, ReceiptText, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Menu", href: "/dashboard/menu", icon: Compass },
    { name: "Cart", href: "/dashboard/cart", icon: ShoppingCart },
    { name: "Orders", href: "/dashboard/orders", icon: ReceiptText },
    { name: "Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-gray-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-2 py-1 shadow-lg transition-colors duration-300">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.href === "/dashboard" 
          ? pathname === "/dashboard" 
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-300 ${
              isActive
                ? "bg-orange-55/90 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/30 shadow-sm font-bold scale-105"
                : "text-gray-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50/30 dark:hover:bg-orange-950/10 font-bold"
            }`}
          >
            <Icon size={18} className={isActive ? "stroke-[2.5]" : "stroke-[2]"} />
            <span className="text-xs font-semibold sm:text-sm">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}